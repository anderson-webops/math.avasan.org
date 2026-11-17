import type { RawCourse, RawCourseModule, RawCourseModuleItem } from "./types";
import { mathCourseSlugify } from "./mathCourseFlow";

export function requireCalculusBinding<T>(
	items: T[],
	predicate: (item: T) => boolean,
	label: string
): T {
	const matches = items.filter(predicate);
	if (matches.length !== 1) {
		throw new Error(
			`Expected exactly one calculus binding for ${label}; found ${matches.length}.`
		);
	}
	return matches[0];
}

export function calculusItemId(
	courseId: string,
	module: RawCourseModule,
	item: RawCourseModuleItem,
	section: "curriculum" | "supplementalProjects" = "curriculum"
) {
	return (
		item.id ??
		mathCourseSlugify(
			`${courseId}-${module.title}-${section === "curriculum" ? "curriculum" : "supplemental"}-${item.title}`
		)
	);
}

export function retainCalculusSources(
	courseId: string,
	module: RawCourseModule,
	item: RawCourseModuleItem,
	sources: RawCourseModuleItem[],
	kind: "reading" | "assignment",
	section: "curriculum" | "supplementalProjects" = "curriculum"
) {
	if (!sources.length)
		throw new Error(`Missing authored calculus content for ${item.title}.`);
	item.id ??= calculusItemId(courseId, module, item, section);
	item.aliases = [
		...new Set([
			...(item.aliases ?? []),
			...sources.flatMap(source => [
				calculusItemId(courseId, module, source, section),
				...(source.aliases ?? [])
			])
		])
	].filter(alias => alias !== item.id);
	item.content = sources
		.map(source =>
			sources.length === 1
				? source.content
				: `**${source.title}**\n\n${source.content}`
		)
		.join("\n\n");
	item.contentKind = kind;
	item.preserveInstructions = true;
	item.preserveAssignment = kind === "assignment";
}

export function requireCalculusModule(course: RawCourse, title: string) {
	return requireCalculusBinding(
		course.modules,
		module => module.title === title,
		title
	);
}

export function insertCalculusText(
	item: RawCourseModuleItem,
	marker: string,
	content: string
) {
	if (item.content.split(marker).length !== 2)
		throw new Error(`Expected exactly one ${marker} in ${item.title}.`);
	item.content = item.content.replace(marker, `${content}\n\n${marker}`);
}
