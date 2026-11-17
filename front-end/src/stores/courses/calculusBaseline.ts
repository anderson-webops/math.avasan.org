import type { RawCourse } from "./types";
import { addAPCalculusCases } from "./apCalculusCases";
import {
	calculusItemId,
	requireCalculusBinding,
	requireCalculusModule,
	retainCalculusSources
} from "./calculusBaselineBindings";
import { mathCourseSlugify } from "./mathCourseFlow";
import { addPreCalculusACases } from "./preCalculusACases";
import { addPreCalculusBCases } from "./preCalculusBCases";

const CALCULUS_OVERLAYS: Record<
	string,
	(course: RawCourse, source: RawCourse) => void
> = {
	"pre-calculus-a": addPreCalculusACases,
	"pre-calculus-b": addPreCalculusBCases,
	"ap-calculus": addAPCalculusCases
};

export function applyCalculusBaseline(
	courseId: string,
	course: RawCourse,
	source: RawCourse
) {
	if (!Object.hasOwn(CALCULUS_OVERLAYS, courseId)) return;
	for (const module of course.modules.filter(
		item => item.kind !== "appendix"
	)) {
		const original = requireCalculusModule(source, module.title);
		module.id ??= mathCourseSlugify(`${courseId}-${module.title}`);
		for (const section of ["curriculum", "supplementalProjects"] as const) {
			for (const item of module[section]) {
				const matches = original[section].filter(
					candidate => candidate.title === item.title
				);
				if (!matches.length) continue;
				const authored = requireCalculusBinding(
					matches,
					() => true,
					`${module.title}: ${item.title}`
				);
				retainCalculusSources(
					courseId,
					module,
					item,
					[authored],
					item.title.startsWith("Concept:")
						? "reading"
						: "assignment",
					section
				);
			}
		}
	}
	CALCULUS_OVERLAYS[courseId](course, source);
	for (const module of course.modules.filter(
		item => item.kind !== "appendix"
	)) {
		const original = requireCalculusModule(source, module.title);
		for (const section of ["curriculum", "supplementalProjects"] as const) {
			for (const authored of original[section]) {
				const identity = calculusItemId(
					courseId,
					original,
					authored,
					section
				);
				const bound = requireCalculusBinding(
					[...module.curriculum, ...module.supplementalProjects],
					item =>
						item.id === identity ||
						(item.aliases ?? []).includes(identity),
					identity
				);
				let offset = 0;
				for (const paragraph of authored.content.split(/\n{2,}/)) {
					const position = bound.content.indexOf(paragraph, offset);
					if (position < 0) {
						throw new Error(
							`Incomplete authored calculus content for ${identity}.`
						);
					}
					offset = position + paragraph.length;
				}
			}
		}
	}
}
