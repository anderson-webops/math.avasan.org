import { pathToFileURL } from "node:url";
import {
	containsGraphSketcherRuntimeMarkers,
	pageAssetUrls,
	runProductionGraphSketcherSmoke
} from "./production-graph-sketcher-smoke.mjs";

const productionOrigin = process.env.MATH_SITE_ORIGIN || "https://math.avasan.org";
const expectedRelease = process.env.MATH_EXPECTED_RELEASE?.replace(/^v/, "");
const expectedRevision = process.env.MATH_EXPECTED_REVISION;
const verifyUsageProxy = process.env.MATH_VERIFY_USAGE_PROXY?.toLowerCase() === "true";
const timeoutMs = Number(process.env.MATH_SITE_SMOKE_TIMEOUT_MS || 15_000);

const courseTitles = [
	"Early Elementary A: Numbers, Operations, and Measurement",
	"Early Elementary B: Arithmetic, Fractions, and Geometry",
	"Late Elementary A: Multiplication, Division, and Geometry",
	"Late Elementary B: Fractions, Decimals, Units, and Coordinates",
	"Pre-Algebra A",
	"Pre-Algebra B",
	"Algebra 1A",
	"Algebra 1B",
	"Geometry A",
	"Geometry B",
	"Algebra 2A",
	"Algebra 2B",
	"Pre-Calculus and Trigonometry A",
	"Pre-Calculus and Trigonometry B",
	"AP Calculus"
];

function assertion(condition, message) {
	if (!condition) throw new Error(message);
}

async function request(path, init = {}) {
	const url = new URL(path, productionOrigin);
	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), timeoutMs);

	try {
		return await fetch(url, {
			...init,
			cache: "no-store",
			signal: controller.signal
		});
	} finally {
		clearTimeout(timeout);
	}
}

async function requiredText(path) {
	const response = await request(path);
	assertion(response.ok, `${path} returned HTTP ${response.status}`);
	return {
		response,
		text: await response.text()
	};
}

function verifySecurityHeaders(response) {
	const contentSecurityPolicy = response.headers.get("content-security-policy") || "";
	assertion(
		contentSecurityPolicy.includes("frame-ancestors 'none'"),
		"The homepage is missing its frame-ancestors policy."
	);
	assertion(
		contentSecurityPolicy.includes("script-src 'self'"),
		"The homepage is missing its same-origin script policy."
	);
	assertion(
		response.headers.get("x-content-type-options") === "nosniff",
		"The homepage is missing X-Content-Type-Options."
	);
	assertion(
		response.headers.get("strict-transport-security")?.includes("max-age=31536000"),
		"The homepage is missing HSTS."
	);
}

async function verifyReleaseIdentity() {
	const response = await request("/release.json");
	assertion(response.ok, `/release.json returned HTTP ${response.status}`);
	assertion(response.headers.get("cache-control")?.includes("no-store"), "/release.json must not be cached.");

	const metadata = await response.json();
	assertion(
		metadata &&
			typeof metadata === "object" &&
			typeof metadata.classroomUsageEnabled === "boolean" &&
			/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.test(metadata.version) &&
			/^(?:[0-9a-f]{40}|unknown)$/.test(metadata.revision),
		"/release.json did not contain valid release metadata."
	);
	if (expectedRelease) {
		assertion(
			metadata.version === expectedRelease,
			`Expected release ${expectedRelease}, received ${metadata.version}.`
		);
	}
	if (expectedRevision) {
		assertion(
			metadata.revision === expectedRevision,
			`Expected revision ${expectedRevision}, received ${metadata.revision}.`
		);
	}
	assertion(
		metadata.classroomUsageEnabled === verifyUsageProxy,
		`Expected classroom usage enabled=${verifyUsageProxy}, received ${metadata.classroomUsageEnabled}.`
	);
}

async function verifyAdminHandoff() {
	const response = await request("/admin", { redirect: "manual" });
	assertion(response.status === 302, `/admin returned HTTP ${response.status} instead of 302.`);
	assertion(
		response.headers.get("location") === "https://cs.avasan.org/admin",
		"/admin did not hand off to the protected CS Admin."
	);
	assertion(
		response.headers.get("x-robots-tag")?.toLowerCase().includes("noindex"),
		"/admin is missing its noindex response header."
	);
}

async function verifyUnknownRouteBoundary() {
	const unknownPaths = [
		"/__math-deployment-probe-missing",
		"/__math-deployment-probe-missing/",
		"/courses/__math-deployment-probe-missing"
	];

	for (const path of unknownPaths) {
		const response = await request(path, {
			redirect: "manual"
		});
		assertion(
			response.status === 404,
			`${path} returned HTTP ${response.status} instead of 404.`
		);
		assertion(
			response.headers.get("set-cookie") === null,
			`${path} returned a cookie.`
		);
	}
}

async function verifyApiBoundary() {
	const disallowed = await request("/api/not-a-public-route", {
		redirect: "manual"
	});
	assertion(disallowed.status === 404, `An undeclared API route returned HTTP ${disallowed.status}.`);

	const wrongMethod = await request("/api/classroom-usage", {
		method: "GET",
		redirect: "manual"
	});
	const expectedWrongMethodStatus = verifyUsageProxy ? 405 : 404;
	assertion(
		wrongMethod.status === expectedWrongMethodStatus,
		`The usage endpoint returned HTTP ${wrongMethod.status}; expected ${expectedWrongMethodStatus}.`
	);
	assertion(wrongMethod.headers.get("set-cookie") === null, "The usage endpoint returned a cookie.");

	const invalidPayload = JSON.stringify({
		event: "post-deploy-invalid-event",
		siteID: "math"
	});

	if (!verifyUsageProxy) {
		const disabledProxy = await request("/api/classroom-usage", {
			body: invalidPayload,
			headers: {
				"Content-Type": "application/json",
				"Origin": "https://math.avasan.org",
				"Sec-Fetch-Site": "same-origin",
				"X-Classroom-Request": "1"
			},
			method: "POST",
			redirect: "manual"
		});
		assertion(
			disabledProxy.status === 404,
			`The disabled usage proxy returned HTTP ${disabledProxy.status}.`
		);
		return;
	}

	const missingClassroomHeader = await request("/api/classroom-usage", {
		body: invalidPayload,
		headers: {
			"Content-Type": "application/json",
			"Origin": "https://math.avasan.org",
			"Sec-Fetch-Site": "same-origin"
		},
		method: "POST",
		redirect: "manual"
	});
	assertion(
		missingClassroomHeader.status === 403,
		`The enabled proxy accepted a request without its classroom header with HTTP ${missingClassroomHeader.status}.`
	);

	const missingFetchSite = await request("/api/classroom-usage", {
		body: invalidPayload,
		headers: {
			"Content-Type": "application/json",
			"Origin": "https://math.avasan.org",
			"X-Classroom-Request": "1"
		},
		method: "POST",
		redirect: "manual"
	});
	assertion(
		missingFetchSite.status === 403,
		`The enabled proxy accepted a request without Sec-Fetch-Site with HTTP ${missingFetchSite.status}.`
	);

	const crossOriginRequest = await request("/api/classroom-usage", {
		body: invalidPayload,
		headers: {
			"Content-Type": "application/json",
			"Origin": "https://example.invalid",
			"Sec-Fetch-Site": "cross-site",
			"X-Classroom-Request": "1"
		},
		method: "POST",
		redirect: "manual"
	});
	assertion(
		crossOriginRequest.status === 403,
		`The enabled proxy accepted a cross-origin request with HTTP ${crossOriginRequest.status}.`
	);

	const invalidEvent = await request("/api/classroom-usage", {
		body: invalidPayload,
		headers: {
			"Content-Type": "application/json",
			"Origin": "https://math.avasan.org",
			"Sec-Fetch-Site": "same-origin",
			"X-Classroom-Request": "1"
		},
		method: "POST",
		redirect: "manual"
	});
	assertion(
		invalidEvent.status === 400,
		`The bounded CS proxy returned HTTP ${invalidEvent.status} instead of the expected validation error.`
	);
	assertion(invalidEvent.headers.get("set-cookie") === null, "The bounded CS proxy returned a cookie.");
}

export async function runPostDeploySmoke() {
	const homepage = await requiredText("/");
	verifySecurityHeaders(homepage.response);
	assertion(
		containsGraphSketcherRuntimeMarkers(homepage.text) ||
			pageAssetUrls(homepage.text, new URL("/", productionOrigin)).length > 0,
		"The homepage did not contain or load the Graph Sketcher application."
	);

	const alias = await requiredText("/graph-sketcher");
	assertion(alias.text.includes("Graph Sketcher"), "/graph-sketcher is not the compatible Grapher alias.");

	const courses = await requiredText("/courses");
	for (const title of courseTitles) {
		assertion(courses.text.includes(title), `/courses is missing ${title}.`);
	}

	await runProductionGraphSketcherSmoke();
	await verifyReleaseIdentity();
	await verifyAdminHandoff();
	await verifyUnknownRouteBoundary();
	await verifyApiBoundary();
	console.log(`OK: ${productionOrigin} passed Math production relationship checks.`);
}

const invokedUrl = process.argv[1] ? pathToFileURL(process.argv[1]).href : "";
if (import.meta.url === invokedUrl) {
	runPostDeploySmoke().catch(error => {
		console.error(error instanceof Error ? error.message : error);
		process.exitCode = 1;
	});
}
