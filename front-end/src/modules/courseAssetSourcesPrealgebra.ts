import geometryCompassBisectorUrl from "../course-assets/geometry-a/compass-bisector.svg?url&no-inline";

export { geometryCompassBisectorUrl };

export function slugMarkdownHeading(value: string) {
	return value
		.replace(/`([^`]+)`/g, "$1")
		.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
		.replace(/[*_~]/g, "")
		.trim()
		.toLowerCase()
		.replace(/[^a-z0-9\s-]/g, "")
		.trim()
		.replace(/\s+/g, "-");
}

export const prealgebraCourseIds = [
	"pre-algebra-a",
	"pre-algebra-b",
	"geometry-a",
	"geometry-b"
] as const;

export type PrealgebraCourseId = (typeof prealgebraCourseIds)[number];

export const prealgebraCourseAssetCourses: Record<string, PrealgebraCourseId> =
	{
		"/course-assets/pre-algebra-a/practice-checks-v1.md": "pre-algebra-a",
		"/course-assets/pre-algebra-b/practice-checks-v1.md": "pre-algebra-b",
		"/course-assets/geometry-a/practice-checks-v1.md": "geometry-a",
		"/course-assets/geometry-b/practice-checks-v1.md": "geometry-b"
	};

export const prealgebraCourseAssetSources: Record<
	string,
	() => Promise<string>
> = {
	"/course-assets/pre-algebra-a/practice-checks-v1.md": () =>
		import("../course-assets/pre-algebra-a/practice-checks-v1.md?raw").then(
			module => module.default
		),
	"/course-assets/pre-algebra-b/practice-checks-v1.md": () =>
		import("../course-assets/pre-algebra-b/practice-checks-v1.md?raw").then(
			module => module.default
		),
	"/course-assets/geometry-a/practice-checks-v1.md": () =>
		import("../course-assets/geometry-a/practice-checks-v1.md?raw").then(
			module => module.default
		),
	"/course-assets/geometry-b/practice-checks-v1.md": () =>
		import("../course-assets/geometry-b/practice-checks-v1.md?raw").then(
			module => module.default
		)
};

export const prealgebraCourseImageUrls = {
	"/course-assets/geometry-a/compass-bisector.svg": geometryCompassBisectorUrl
};

export function courseAssetViewerUrl(value: string, label = "") {
	const [path, hash = "", ...extra] = value.split("#");
	if (
		value.length > 512 ||
		extra.length ||
		!Object.hasOwn(prealgebraCourseAssetSources, path) ||
		!/^[a-z0-9-]*$/.test(hash)
	) {
		throw new Error("Unsupported Pre-Algebra or Geometry resource.");
	}
	const query = new URLSearchParams({
		asset: value,
		course: prealgebraCourseAssetCourses[path]
	});
	if (label.trim()) query.set("label", label.trim().slice(0, 160));
	return `/courses/?${query}`;
}
