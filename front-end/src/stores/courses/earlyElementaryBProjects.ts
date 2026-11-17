import type { RawCourse } from "./types";
import { earlyElementaryBMaterials } from "./earlyElementaryBMaterials";
import { applyElementaryCourseMaterials } from "./elementaryCourseMaterials";

export function applyEarlyElementaryBProjects(
	course: RawCourse,
	raw: RawCourse
) {
	applyElementaryCourseMaterials(
		course,
		raw,
		"early-elementary-b-math",
		"/course-assets/early-elementary-b/practice-checks-v1.md",
		earlyElementaryBMaterials
	);
}
