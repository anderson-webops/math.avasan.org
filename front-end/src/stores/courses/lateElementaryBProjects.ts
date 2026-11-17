import type { RawCourse } from "./types";
import { applyElementaryCourseMaterials } from "./elementaryCourseMaterials";
import { lateElementaryBMaterials } from "./lateElementaryBMaterials";

export function applyLateElementaryBProjects(
	course: RawCourse,
	raw: RawCourse
) {
	applyElementaryCourseMaterials(
		course,
		raw,
		"late-elementary-b-math",
		"/course-assets/late-elementary-b/practice-checks-v1.md",
		lateElementaryBMaterials
	);
}
