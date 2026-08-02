export const SITE_TITLE = "Math with Julio";
export const SITE_URL = "https://math.avasan.org";
export const SITE_DESCRIPTION =
	"Graph, explore, and learn with a browser-based Graph Sketcher and math courses from elementary through AP Calculus.";
export const INDEX_ROBOTS =
	"index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1";
export const NOINDEX_ROBOTS = "noindex,nofollow";

const ROUTE_TITLES = new Map([
	["/", SITE_TITLE],
	["/admin", "Teacher Admin"],
	["/courses", "Math Courses"],
	["/graph-sketcher", "Graph Sketcher"]
]);

export function normalizePagePath(path: string) {
	const normalized = path.trim().split(/[?#]/, 1)[0] || "/";
	if (normalized === "/") return normalized;
	return normalized.replace(/\/+$/g, "");
}

export function pageTitleForPath(path: string) {
	const matchedTitle =
		ROUTE_TITLES.get(normalizePagePath(path)) ?? "Page Not Found";

	return matchedTitle === SITE_TITLE
		? SITE_TITLE
		: `${matchedTitle} | ${SITE_TITLE}`;
}

export function pageRobotsForPath(path: string) {
	return ["/", "/courses", "/graph-sketcher"].includes(
		normalizePagePath(path)
	)
		? INDEX_ROBOTS
		: NOINDEX_ROBOTS;
}

export function canonicalUrlForPath(path: string, siteUrl = SITE_URL) {
	const normalizedPath = normalizePagePath(path);
	const canonicalPath =
		normalizedPath === "/graph-sketcher"
			? "/"
			: normalizedPath === "/courses"
				? "/courses/"
				: normalizedPath;
	return new URL(canonicalPath, `${siteUrl}/`).toString();
}
