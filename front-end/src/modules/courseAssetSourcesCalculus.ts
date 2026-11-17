export const CALCULUS_COURSE_IDS = [
	"pre-calculus-a",
	"pre-calculus-b",
	"ap-calculus"
] as const;

export const CALCULUS_ASSET_LOADERS: Record<string, () => Promise<string>> = {
	"/course-assets/pre-calculus-a/practice-checks-v2.md": () =>
		import("../course-assets/pre-calculus-a/practice-checks-v2.md?raw").then(
			module => module.default
		),
	"/course-assets/pre-calculus-b/practice-checks-v1.md": () =>
		import("../course-assets/pre-calculus-b/practice-checks-v1.md?raw").then(
			module => module.default
		),
	"/course-assets/ap-calculus/practice-checks-v1.md": () =>
		import("../course-assets/ap-calculus/practice-checks-v1.md?raw").then(
			module => module.default
		)
};

export const CALCULUS_ASSET_COURSES: Record<string, string> = {
	"/course-assets/pre-calculus-a/practice-checks-v2.md": "pre-calculus-a",
	"/course-assets/pre-calculus-b/practice-checks-v1.md": "pre-calculus-b",
	"/course-assets/ap-calculus/practice-checks-v1.md": "ap-calculus"
};

export function calculusCourseAssetViewerUrl(
	value: string,
	label = "",
	courseId?: string
) {
	const parts = value.split("#");
	const owner = Object.hasOwn(CALCULUS_ASSET_COURSES, parts[0])
		? CALCULUS_ASSET_COURSES[parts[0]]
		: undefined;
	if (
		value.length > 512 ||
		parts.length > 2 ||
		!owner ||
		!Object.hasOwn(CALCULUS_ASSET_LOADERS, parts[0]) ||
		!/^[a-z0-9-]*$/.test(parts[1] ?? "") ||
		(courseId !== undefined && courseId !== owner)
	) {
		throw new Error("Unsupported calculus course resource.");
	}
	const query = new URLSearchParams({ asset: value, course: owner });
	if (label.trim()) query.set("label", label.trim().slice(0, 160));
	return `/courses/?${query}`;
}
