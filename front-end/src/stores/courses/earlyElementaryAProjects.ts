import type { RawCourse } from "./types";
import { earlyElementaryAMaterials } from "./earlyElementaryAMaterials";
import { applyElementaryCourseMaterials } from "./elementaryCourseMaterials";

export function applyEarlyElementaryAProjects(
	course: RawCourse,
	raw: RawCourse
) {
	applyElementaryCourseMaterials(
		course,
		raw,
		"early-elementary-a-math",
		"/course-assets/early-elementary-a/practice-checks-v2.md",
		earlyElementaryAMaterials
	);
}
