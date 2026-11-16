import courseAssets from "@/config/course-assets.json";

export interface ParsedCourseAssetUrl {
	hash: string;
	path: string;
}

const COURSE_ASSETS = new Set(courseAssets);
const MAX_ASSET_BYTES = 64 * 1024;
const assetCache = new Map<string, Promise<string>>();

function cleanHeadingText(value: string) {
	return value
		.replace(/`([^`]+)`/g, "$1")
		.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
		.replace(/[*_~]/g, "")
		.trim();
}

export function slugMarkdownHeading(value: string) {
	return cleanHeadingText(value)
		.toLowerCase()
		.replace(/[^a-z0-9\s-]/g, "")
		.trim()
		.replace(/\s+/g, "-");
}

export function parseCourseAssetUrl(
	value: string
): ParsedCourseAssetUrl | null {
	if (value.length > 512) return null;
	const parts = value.split("#");
	if (parts.length > 2 || !COURSE_ASSETS.has(parts[0])) return null;
	const hash = parts[1] ?? "";
	if (!/^[a-z0-9-]*$/.test(hash)) return null;
	return { path: parts[0], hash };
}

export function courseAssetViewerUrl(
	value: string,
	label = "",
	courseId = "algebra-1a"
) {
	if (!parseCourseAssetUrl(value))
		throw new Error("Unsupported course resource.");
	if (!["algebra-1a", "algebra-1b"].includes(courseId))
		throw new Error("Unsupported self-check course.");
	const query = new URLSearchParams({ asset: value });
	query.set("course", courseId);
	if (label.trim()) query.set("label", label.trim().slice(0, 160));
	return `/courses/?${query}`;
}

function markdownHeading(line: string) {
	let level = 0;
	while (line[level] === "#") level += 1;
	if (level < 1 || level > 6 || ![" ", "\t"].includes(line[level]))
		return null;
	let title = line.slice(level + 1).trim();
	while (title.endsWith("#")) title = title.slice(0, -1).trimEnd();
	return title ? { level, title: cleanHeadingText(title) } : null;
}

export function extractMarkdownSection(markdown: string, hash: string) {
	if (!hash) return markdown.trim();
	const lines = markdown.split(/\r?\n/);
	let start = -1;
	let level = 0;
	for (const [index, line] of lines.entries()) {
		const heading = markdownHeading(line);
		if (heading && slugMarkdownHeading(heading.title) === hash) {
			start = index;
			level = heading.level;
			break;
		}
	}
	if (start < 0)
		throw new Error("This self-check section could not be found.");
	let end = lines.length;
	for (let index = start + 1; index < lines.length; index += 1) {
		const heading = markdownHeading(lines[index]);
		if (heading && heading.level <= level) {
			end = index;
			break;
		}
	}
	return lines.slice(start, end).join("\n").trim();
}

async function fetchAsset(path: string, fetcher: typeof fetch) {
	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), 10_000);
	try {
		const response = await fetcher(path, {
			credentials: "omit",
			redirect: "error",
			signal: controller.signal
		});
		if (!response.ok || !response.body)
			throw new Error("This self-check could not be loaded.");
		const reader = response.body.getReader();
		const decoder = new TextDecoder();
		let content = "";
		let bytes = 0;
		try {
			while (true) {
				const { done, value } = await reader.read();
				if (done) break;
				bytes += value.byteLength;
				if (bytes > MAX_ASSET_BYTES) {
					await reader.cancel();
					throw new Error(
						"This self-check exceeds the supported size."
					);
				}
				content += decoder.decode(value, { stream: true });
			}
			return content + decoder.decode();
		} finally {
			reader.releaseLock();
		}
	} finally {
		clearTimeout(timeout);
	}
}

export async function loadCourseAssetSection(
	value: string,
	fetcher: typeof fetch = fetch
) {
	const asset = parseCourseAssetUrl(value);
	if (!asset) throw new Error("This course resource is unavailable.");
	let pending = assetCache.get(asset.path);
	if (!pending) {
		pending = fetchAsset(asset.path, fetcher).catch(error => {
			assetCache.delete(asset.path);
			throw error;
		});
		assetCache.set(asset.path, pending);
	}
	const content = extractMarkdownSection(await pending, asset.hash);
	const heading = markdownHeading(content.split("\n", 1)[0]);
	return { content, title: heading?.title ?? "Self-check" };
}

export function resetCourseAssetPreviewCache() {
	assetCache.clear();
}
