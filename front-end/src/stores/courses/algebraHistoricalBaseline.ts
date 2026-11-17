import type { RawCourse, RawCourseModuleItem } from "./types";
import { algebra2CheckInFocus } from "./algebra2CheckInFocus";
import broadTitleHistory from "./algebra-broad-title-progress-history.json";
import algebraHistory from "./algebra-progress-history.json";
import { mathCourseSlugify } from "./mathCourseFlow";

const courseIds = new Set([
	"algebra-1a",
	"algebra-1b",
	"algebra-2a",
	"algebra-2b"
]);
const history: Record<string, Record<string, string[]>> = algebraHistory;
const broadHistory: Record<
	string,
	Record<string, string[]>
> = broadTitleHistory;

export function applyAlgebraHistoricalBaseline(
	courseId: string,
	course: RawCourse,
	source: RawCourse
) {
	if (!courseIds.has(courseId)) return;
	for (const original of source.modules) {
		const modules = course.modules.filter(
			module =>
				module.title === original.title ||
				(!!original.id && module.id === original.id)
		);
		if (modules.length !== 1) {
			throw new Error(
				`Missing unique Algebra source module ${original.title}`
			);
		}
		const module = modules[0];
		const items = [...module.curriculum, ...module.supplementalProjects];
		for (const sourceItem of [
			...original.curriculum,
			...original.supplementalProjects
		]) {
			const checkIn = original.title.match(/^Check-In #(\d+)$/);
			const checkInTitle = checkIn
				? `${course.name} Check-In ${checkIn[1]} ${sourceItem.title}`
				: undefined;
			const candidates = items.filter(
				item =>
					(!!sourceItem.id && item.id === sourceItem.id) ||
					item.title === sourceItem.title ||
					item.title === checkInTitle ||
					(sourceItem.title ===
						"Course Reflection and Presentation" &&
						item.title ===
							"Course Reflection and Presentation Reflection Prompt")
			);
			if (candidates.length !== 1) {
				throw new Error(
					`Missing unique Algebra source binding ${original.title}: ${sourceItem.title}`
				);
			}
			const item = candidates[0];
			item.content = sourceItem.content;
			item.preserveInstructions = true;
			if (sourceItem.contentKind)
				item.contentKind = sourceItem.contentKind;
			if (sourceItem.preserveAssignment) item.preserveAssignment = true;
			item.aliases = [
				...new Set([
					...(item.aliases ?? []),
					...(sourceItem.aliases ?? [])
				])
			];
		}
	}
	for (const module of course.modules) {
		const moduleId =
			module.id ?? mathCourseSlugify(`${courseId}-${module.title}`);
		for (const section of ["curriculum", "supplementalProjects"] as const) {
			for (const item of module[section]) {
				if (item.contentKind === "reading")
					item.preserveAssignment = false;
				const generatedId = mathCourseSlugify(
					`${moduleId}-${section === "curriculum" ? "curriculum" : "supplemental"}-${item.title}`
				);
				const keys = [
					item.id ?? generatedId,
					generatedId,
					...(item.aliases ?? [])
				];
				const aliases = keys.flatMap(key => [
					...(history[courseId]?.[key] ?? []),
					...(broadHistory[courseId]?.[key] ?? [])
				]);
				item.aliases = [
					...new Set([...(item.aliases ?? []), ...aliases])
				];
			}
		}
		const focus = algebra2CheckInFocus(courseId, module.title);
		if (!focus) continue;
		for (const item of module.supplementalProjects) {
			if (item.title.includes("Standards Practice Set")) {
				appendFocus(
					item,
					`**Evidence focus:** ${focus.routine}. Use ${focus.representation}. Check by ${focus.check}.`
				);
			} else if (item.title.includes("Modeling or Error Analysis")) {
				appendFocus(
					item,
					`**Evidence focus:** Analyze ${focus.model}. Diagnose ${focus.error}. Check for ${focus.trap}, then verify by ${focus.check}.`
				);
			}
		}
	}
	for (const [canonical, aliases] of Object.entries(
		history[courseId] ?? {}
	)) {
		const matches = course.modules.flatMap(module => {
			const moduleIds = [
				module.id,
				mathCourseSlugify(`${courseId}-${module.title}`)
			].filter((value): value is string => !!value);
			return moduleIds.some(moduleId =>
				canonical.startsWith(`${moduleId}-supplemental-`)
			)
				? module.supplementalProjects.filter(item => {
						if (/-standards-practice-set(?:-|$)/.test(canonical)) {
							return (
								item.title.includes("Standards Practice Set") ||
								(courseId === "algebra-1b" &&
									item.title ===
										"Project 1: Amusement Park Shenanigans")
							);
						}
						return (
							item.title.includes("Modeling or Error Analysis") ||
							(courseId === "algebra-1b" &&
								item.title ===
									"Project 2: Ride Paths and Snack Break")
						);
					})
				: [];
		});
		if (matches.length !== 1) {
			throw new Error(
				`Missing unique Algebra progress binding ${canonical}`
			);
		}
		matches[0].aliases = [
			...new Set([...(matches[0].aliases ?? []), canonical, ...aliases])
		];
	}
}

function appendFocus(item: RawCourseModuleItem, content: string) {
	item.content += `\n\n${content}`;
	item.preserveInstructions = true;
}
