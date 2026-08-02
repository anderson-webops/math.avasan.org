#!/usr/bin/env node

import { spawn } from "node:child_process";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import process from "node:process";

const staticMediaRequestModuleUrl = new URL(
	"./static-media-request.mjs",
	import.meta.url
).href;

const auditSource = String.raw`
import {
	existsSync,
	readFileSync,
	readdirSync,
	statSync
} from "node:fs";
import {
	extname,
	join,
	relative,
	resolve,
	sep
} from "node:path";
import {
	courseCatalog,
	loadRawCourse
} from "@/stores/courses/index";
import {
	KNOWN_PENDING_STATIC_MEDIA_FILENAMES,
	canonicalStaticMediaUrl,
	hasPendingStaticMediaNotice,
	staticMediaFilename,
	staticMediaUrlsFromText
} from "@/stores/courses/staticMedia";
import {
	fetchWithRetry,
	requestStaticMedia
} from ${JSON.stringify(staticMediaRequestModuleUrl)};

const knownPending = new Set(KNOWN_PENDING_STATIC_MEDIA_FILENAMES);
const localMirrorRoot = process.env.STATIC_COURSE_MEDIA_MIRROR
	? resolve(process.env.STATIC_COURSE_MEDIA_MIRROR)
	: "";
const urls = new Map();
const scanRoots = [
	"front-end/public",
	"front-end/src",
	"package.json"
];
const ignoredPathParts = new Set([
	"__snapshots__",
	"coverage",
	"dist",
	"node_modules",
	"playwright-report",
	"test-results"
]);
const textFileExtensions = new Set([
	".css",
	".env",
	".example",
	".html",
	".js",
	".json",
	".md",
	".mjs",
	".ts",
	".tsx",
	".vue"
]);
const staticAssetPathPattern =
	/\.(?:avif|csv|gif|jpe?g|json|md|mov|mp4|pdf|png|svg|webm|zip)(?:[?#].*)?$/i;

function add(url, reference) {
	if (!url) return;
	const canonicalUrl = canonicalStaticMediaUrl(url);
	if (!canonicalUrl) return;
	const references = urls.get(canonicalUrl) ?? [];
	references.push({
		...reference,
		...(canonicalUrl !== url ? { originalUrl: url } : {})
	});
	urls.set(canonicalUrl, references);
}

function isScannableStaticAssetUrl(url) {
	try {
		return staticAssetPathPattern.test(new URL(url).pathname);
	} catch {
		return false;
	}
}

function shouldSkipPath(path) {
	return path
		.split("/")
		.some(part => ignoredPathParts.has(part)) ||
		/\.(?:spec|test)\.[cm]?[jt]sx?$/.test(path);
}

function isTextFile(path) {
	return textFileExtensions.has(extname(path).toLowerCase());
}

function scanFile(path) {
	if (!isTextFile(path) || shouldSkipPath(path)) return;

	const content = readFileSync(path, "utf8");
	const sourcePath = relative(process.cwd(), path);

	for (const url of staticMediaUrlsFromText(content)) {
		if (!isScannableStaticAssetUrl(url)) continue;

		const line = content.slice(0, content.indexOf(url)).split("\n").length;
		add(url, {
			content,
			key: "source-file",
			source: sourcePath + ":" + line
		});
	}
}

function scanPath(path) {
	if (!existsSync(path) || shouldSkipPath(path)) return;

	const stats = statSync(path);
	if (stats.isDirectory()) {
		for (const entry of readdirSync(path)) {
			scanPath(join(path, entry));
		}
		return;
	}

	if (stats.isFile()) scanFile(path);
}

for (const entry of courseCatalog) {
	const course = await loadRawCourse(entry.id);
	if (!course) continue;

	for (const module of course.modules) {
		const items = [
			...module.curriculum,
			...module.supplementalProjects
		];

		for (const item of items) {
			const source = [entry.id, module.title, item.title].join(" / ");
			add(item.mediaLink, {
				content: item.content,
				key: "mediaLink",
				source
			});
			add(item.datasetLink, {
				content: item.content,
				key: "datasetLink",
				source
			});
			add(item.projectLink, {
				content: item.content,
				key: "projectLink",
				source
			});
			add(item.solutionLink, {
				content: item.content,
				key: "solutionLink",
				source
			});
			for (const url of staticMediaUrlsFromText(item.content)) {
				add(url, {
					content: item.content,
					key: "content",
					source
				});
			}
		}
	}
}

for (const root of scanRoots) {
	scanPath(join(process.cwd(), root));
}

const missing = [];
const available = [];
const requestTimeoutMs = 15_000;
const requestConcurrency = 4;
const originProbeAttempts = 3;
const transportFailureLimit = 12;
const totalAuditTimeoutMs = 7 * 60_000;
const auditDeadline = Date.now() + totalAuditTimeoutMs;
const unreachableOrigins = new Map();
const transportFailures = new Map();
const sortedUrls = [...urls].sort(([left], [right]) =>
	left.localeCompare(right)
);
const results = new Array(sortedUrls.length);
let nextUrlIndex = 0;
let auditTimedOut = false;

function requestSignal() {
	const remainingMs = auditDeadline - Date.now();
	if (remainingMs <= 0) {
		auditTimedOut = true;
		return AbortSignal.abort(
			new Error("Static media audit reached its total time limit.")
		);
	}
	return AbortSignal.timeout(Math.min(requestTimeoutMs, remainingMs));
}

function recordTransportSuccess(origin) {
	transportFailures.delete(origin);
}

function recordTransportFailure(origin, error) {
	const failureCount = (transportFailures.get(origin) ?? 0) + 1;
	transportFailures.set(origin, failureCount);
	if (failureCount >= transportFailureLimit) {
		unreachableOrigins.set(
			origin,
			"Origin circuit breaker opened after " +
				failureCount +
				" consecutive transport failures: " +
				error
		);
	}
}

async function probeOrigins() {
	if (localMirrorRoot) return;

	const representativeUrls = new Map();
	for (const [url] of sortedUrls) {
		const origin = new URL(url).origin;
		if (!representativeUrls.has(origin)) representativeUrls.set(origin, url);
	}

	for (const [origin, url] of representativeUrls) {
		try {
			await fetchWithRetry(
				url,
				{ method: "HEAD" },
				{
					maxAttempts: originProbeAttempts,
					signalFactory: requestSignal
				}
			);
			recordTransportSuccess(origin);
		} catch (err) {
			const lastError = err instanceof Error ? err.message : String(err);
			unreachableOrigins.set(
				origin,
				"Origin stayed unreachable across " +
					originProbeAttempts +
					" sequential network probes: " +
					lastError
			);
		}
	}
}

async function inspectUrl(url, references) {
	let status = 0;
	let ok = false;
	let error = "";
	const origin = new URL(url).origin;
	const blockedOriginError = unreachableOrigins.get(origin);

	if (localMirrorRoot) {
		const relativeAssetPath = decodeURIComponent(
			new URL(url).pathname
		).replace(/^\/+/, "");
		const localAssetPath = resolve(localMirrorRoot, relativeAssetPath);
		const isInsideMirror =
			localAssetPath.startsWith(localMirrorRoot + sep);
		ok =
			isInsideMirror &&
			existsSync(localAssetPath) &&
			statSync(localAssetPath).isFile();
		status = ok ? 200 : 404;
		if (!isInsideMirror) {
			error = "Static media URL escaped the configured local mirror.";
		}
	} else if (blockedOriginError) {
		error = blockedOriginError;
	} else {
		try {
			const response = await requestStaticMedia(url, {
				signalFactory: requestSignal
			});
			recordTransportSuccess(origin);
			status = response.status;
			ok = response.ok || response.status === 206;
		} catch (err) {
			error = err instanceof Error ? err.message : String(err);
			recordTransportFailure(origin, error);
		}
	}

	const filename = staticMediaFilename(url);
	const sourceIssues = references.flatMap(reference => {
		if (hasPendingStaticMediaNotice(reference.content, filename)) {
			return [];
		}

		return [
			{
				key: reference.key,
				source: reference.source
			}
		];
	});
	const row = {
		filename,
		isKnownPending: knownPending.has(filename),
		sourceCount: new Set(references.map(reference => reference.source))
			.size,
		sources: [...new Set(references.map(reference => reference.source))],
		status,
		url,
		...(sourceIssues.length ? { sourceIssues } : {}),
		...(error ? { error } : {})
	};

	return { ok, row };
}

async function inspectNextUrl() {
	while (true) {
		if (Date.now() >= auditDeadline) {
			auditTimedOut = true;
			return;
		}
		const index = nextUrlIndex;
		nextUrlIndex += 1;
		if (index >= sortedUrls.length) return;

		const [url, references] = sortedUrls[index];
		results[index] = await inspectUrl(url, references);
	}
}

await probeOrigins();

await Promise.all(
	Array.from(
		{ length: Math.min(requestConcurrency, sortedUrls.length) },
		() => inspectNextUrl()
	)
);

for (const result of results) {
	if (!result) continue;
	if (result.ok) available.push(result.row);
	else missing.push(result.row);
}

const uncheckedCount = results.filter(result => !result).length;
const unknownMissing = missing.filter(row => !row.isKnownPending);
const unnotedPending = missing.filter(
	row => row.isKnownPending && row.sourceIssues?.length
);
const outputIssueLimit = 100;
console.log(
	JSON.stringify(
		{
			availableCount: available.length,
			checkedCount: urls.size,
			knownPendingMissingCount:
				missing.filter(row => row.isKnownPending).length,
			missingCount: missing.length,
			mediaSource: localMirrorRoot || "live HTTPS",
			unnotedPending: unnotedPending.slice(0, outputIssueLimit),
			unnotedPendingCount: unnotedPending.length,
			uncheckedCount,
			unknownMissing: unknownMissing.slice(0, outputIssueLimit),
			unknownMissingCount: unknownMissing.length,
			unreachableOrigins: [...unreachableOrigins.entries()].map(
				([origin, error]) => ({ error, origin })
			)
		},
		null,
		2
	)
);

if (
	auditTimedOut ||
	uncheckedCount > 0 ||
	unknownMissing.length > 0 ||
	unnotedPending.length > 0
) {
	process.exitCode = 1;
}
`;

const tempDir = await mkdtemp(join(tmpdir(), "classes-static-media-"));
const auditFile = join(tempDir, "audit.mts");

try {
	await writeFile(auditFile, auditSource);

	const hardTimeoutMs = 8 * 60_000;
	const child = spawn(
		"npm",
		[
			"exec",
			"--",
			"tsx",
			"--tsconfig",
			"front-end/tsconfig.json",
			auditFile
		],
		{ stdio: "inherit" }
	);
	let forceKill;
	const hardTimeout = setTimeout(() => {
		console.error(
			"Static media audit exceeded its eight-minute hard time limit."
		);
		child.kill("SIGTERM");
		forceKill = setTimeout(() => child.kill("SIGKILL"), 5_000);
	}, hardTimeoutMs);

	const exitCode = await new Promise((resolve, reject) => {
		child.once("error", reject);
		child.once("exit", code => resolve(code ?? 1));
	});
	clearTimeout(hardTimeout);
	if (forceKill) clearTimeout(forceKill);

	process.exitCode = exitCode;
}
finally {
	await rm(tempDir, { force: true, recursive: true });
}
