import type { RawCourse, RawCourseModule, RawCourseModuleItem } from "./types";
import { mathCourseSlugify } from "./mathCourseFlow";

export function requireAlgebraCourse(course: RawCourse, courseId: string) {
	const names: Record<string, string> = {
		"algebra-1a": "Algebra 1A",
		"algebra-1b": "Algebra 1B",
		"algebra-2a": "Algebra 2A",
		"algebra-2b": "Algebra 2B"
	};
	const name = names[courseId];
	if (!name || course.name !== name) {
		throw new Error(
			`Unexpected Algebra course ${courseId}: ${course.name}`
		);
	}
}

export function requireAlgebraModule(course: RawCourse, title: string) {
	const matches = course.modules.filter(module => module.title === title);
	if (matches.length !== 1)
		throw new Error(`Missing unique ${course.name} module ${title}`);
	return matches[0];
}

export function requireAlgebraItem(
	module: RawCourseModule,
	title: string,
	section: "curriculum" | "supplementalProjects" = "curriculum"
) {
	const matches = module[section].filter(item => item.title === title);
	if (matches.length !== 1) {
		throw new Error(
			`Missing unique Algebra reading ${module.title}: ${title}`
		);
	}
	return matches[0];
}

export function preserveAlgebraSourceItems(
	course: RawCourse,
	courseId: string
) {
	requireAlgebraCourse(course, courseId);
	for (const module of course.modules) {
		for (const item of [
			...module.curriculum,
			...module.supplementalProjects
		])
			item.preserveInstructions = true;
	}
}

export function groupAlgebraReadings(
	module: RawCourseModule,
	courseId: string,
	titles: readonly string[],
	title: string
) {
	if (new Set(titles).size !== titles.length)
		throw new Error(`Duplicate Algebra reading group ${title}`);
	const parts = titles.map(target => requireAlgebraItem(module, target));
	const moduleId =
		module.id ?? mathCourseSlugify(`${courseId}-${module.title}`);
	const reading: RawCourseModuleItem = {
		id: mathCourseSlugify(`${moduleId}-curriculum-${title}`),
		title,
		aliases: [
			...new Set(
				parts.flatMap(item => [
					item.id ??
						mathCourseSlugify(
							`${moduleId}-curriculum-${item.title}`
						),
					...(item.aliases ?? [])
				])
			)
		],
		content: parts
			.map(item => `### ${item.title}\n\n${item.content}`)
			.join("\n\n"),
		contentKind: "reading",
		preserveInstructions: true,
		preserveAssignment: true,
		learningPath: "core"
	};
	const first = module.curriculum.findIndex(item => parts.includes(item));
	module.curriculum = module.curriculum.filter(item => !parts.includes(item));
	module.curriculum.splice(first, 0, reading);
	return reading;
}
