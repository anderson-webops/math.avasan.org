import type { RawCourse } from "./types";
import { applyElementaryCourseMaterials } from "./elementaryCourseMaterials";
import { lateElementaryAMaterials } from "./lateElementaryAMaterials";

export function applyLateElementaryAProjects(
	course: RawCourse,
	raw: RawCourse
) {
	applyElementaryCourseMaterials(
		course,
		raw,
		"late-elementary-a-math",
		"/course-assets/late-elementary-a/practice-checks-v1.md",
		lateElementaryAMaterials
	);
}
