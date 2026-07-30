const STATIC_INSTRUCTION_HOSTS = new Set([
	"static.junilearning.com",
	"static.cs.avasan.org",
	"static.classes.jacobdanderson.net"
]);
const YOUTUBE_HOSTS = new Set([
	"youtube.com",
	"www.youtube.com",
	"m.youtube.com"
]);
const YOUTUBE_PATH_PREFIXES = new Set(["embed", "live", "shorts"]);
const SCRATCH_PROJECT_ID_RE = /^\d+$/;

function parsePublicHttpsUrl(value: string) {
	try {
		const parsed = new URL(value);
		if (
			parsed.protocol !== "https:" ||
			parsed.username ||
			parsed.password ||
			parsed.port
		) {
			return null;
		}
		return parsed;
	} catch {
		return null;
	}
}

function pathSegments(url: URL) {
	return url.pathname.split("/").filter(Boolean);
}

export function isInstructionMaterialResourceUrl(value: string) {
	const parsed = parsePublicHttpsUrl(value);
	if (!parsed) return false;

	const segments = pathSegments(parsed);
	if (parsed.hostname === "github.com") {
		return (
			segments[0]?.toLowerCase() === "instruction-material" &&
			Boolean(segments[1])
		);
	}

	if (parsed.hostname === "scratch.mit.edu") {
		return (
			segments[0] === "projects" &&
			SCRATCH_PROJECT_ID_RE.test(segments[1] ?? "")
		);
	}

	return STATIC_INSTRUCTION_HOSTS.has(parsed.hostname) && segments.length > 0;
}

export function isYouTubeVideoUrl(value: string) {
	const parsed = parsePublicHttpsUrl(value);
	if (!parsed) return false;

	const segments = pathSegments(parsed);
	if (parsed.hostname === "youtu.be") {
		return Boolean(segments[0]);
	}
	if (!YOUTUBE_HOSTS.has(parsed.hostname)) {
		return false;
	}
	if (segments[0] === "watch") {
		return Boolean(parsed.searchParams.get("v"));
	}

	return YOUTUBE_PATH_PREFIXES.has(segments[0] ?? "") && Boolean(segments[1]);
}
