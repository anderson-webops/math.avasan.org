import type { CourseDefinition, RawCourse } from "@/stores/courses/types";
import { expect } from "vitest";
import { mathCourseSlugify } from "@/stores/courses/mathCourseFlow";

export function expectAuthoredCalculusContent(
	courseId: string,
	source: RawCourse,
	published: CourseDefinition
) {
	for (const module of source.modules.filter(
		item => item.kind !== "appendix"
	)) {
		const target = published.modules.find(
			item => item.title === module.title
		);
		expect(target, module.title).toBeDefined();
		expect(target?.estimatedTime).toBe(module.estimatedTime);
		expect(target?.keyBlocks).toEqual(module.keyBlocks);
		for (const section of ["curriculum", "supplementalProjects"] as const) {
			for (const item of module[section]) {
				const identity =
					item.id ??
					mathCourseSlugify(
						`${courseId}-${module.title}-${section === "curriculum" ? "curriculum" : "supplemental"}-${item.title}`
					);
				const matches = [
					...target!.curriculum,
					...target!.supplementalProjects
				].filter(
					candidate =>
						candidate.id === identity ||
						candidate.aliases?.includes(identity)
				);
				expect(matches, identity).toHaveLength(1);
				expect(matches[0].preserveInstructions, identity).toBe(true);
				expect(matches[0].learningPath, identity).toBe(
					item.learningPath
				);
				let offset = 0;
				for (const paragraph of item.content.split(/\n{2,}/)) {
					const position = matches[0].content.indexOf(
						paragraph,
						offset
					);
					expect(
						position,
						`${identity}: ${paragraph}`
					).toBeGreaterThanOrEqual(offset);
					offset = position + paragraph.length;
				}
			}
		}
	}
}
