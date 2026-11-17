export const elementaryCourseAssetSources = {
	courseIds: [
		"early-elementary-a-math",
		"early-elementary-b-math",
		"late-elementary-a-math",
		"late-elementary-b-math"
	] as const,
	markdown: {
		"/course-assets/early-elementary-a/practice-checks-v1.md": () =>
			import("../course-assets/early-elementary-a/practice-checks-v1.md?raw").then(
				module => module.default
			),
		"/course-assets/early-elementary-a/practice-checks-v2.md": () =>
			import("../course-assets/early-elementary-a/practice-checks-v2.md?raw").then(
				module => module.default
			),
		"/course-assets/early-elementary-b/practice-checks-v1.md": () =>
			import("../course-assets/early-elementary-b/practice-checks-v1.md?raw").then(
				module => module.default
			),
		"/course-assets/late-elementary-a/practice-checks-v1.md": () =>
			import("../course-assets/late-elementary-a/practice-checks-v1.md?raw").then(
				module => module.default
			),
		"/course-assets/late-elementary-b/practice-checks-v1.md": () =>
			import("../course-assets/late-elementary-b/practice-checks-v1.md?raw").then(
				module => module.default
			)
	},
	images: {
		"/course-assets/early-elementary-a/clock-0830-v1.svg": () =>
			import("../course-assets/early-elementary-a/clock-0830-v1.svg?url&no-inline").then(
				module => module.default
			),
		"/course-assets/early-elementary-a/clock-0945-v1.svg": () =>
			import("../course-assets/early-elementary-a/clock-0945-v1.svg?url&no-inline").then(
				module => module.default
			),
		"/course-assets/early-elementary-a/equal-array-v1.svg": () =>
			import("../course-assets/early-elementary-a/equal-array-v1.svg?url&no-inline").then(
				module => module.default
			),
		"/course-assets/early-elementary-a/equal-shares-v1.svg": () =>
			import("../course-assets/early-elementary-a/equal-shares-v1.svg?url&no-inline").then(
				module => module.default
			),
		"/course-assets/late-elementary-a/light-rotation-v1.svg": () =>
			import("../course-assets/late-elementary-a/light-rotation-v1.svg?url&no-inline").then(
				module => module.default
			),
		"/course-assets/late-elementary-a/triangle-groups-v1.svg": () =>
			import("../course-assets/late-elementary-a/triangle-groups-v1.svg?url&no-inline").then(
				module => module.default
			)
	}
};
