import type { RawCourse } from "./types";
import readings from "./algebra1ACourseReadingsData.json";

export function applyAlgebra1ACourseReadings(
	course: RawCourse,
	progressId: (value: string) => string
) {
	for (const module of course.modules) {
		const previousTitle = module.title;
		module.id ??= progressId(`algebra-1a-${previousTitle}`);
		if (module.kind === "appendix" && previousTitle !== "Standards Map") {
			module.internal = true;
			continue;
		}
		if (previousTitle === "Standards Map") {
			module.id ??= progressId(`algebra-1a-${previousTitle}`);
			module.aliases = [
				...new Set([...(module.aliases ?? []), previousTitle])
			];
			module.title = "Algebra 1A Reference";
		}
		for (const item of [
			...module.curriculum,
			...(module.supplementalProjects ?? [])
		]) {
			const entry = readings.find(
				candidate =>
					candidate.module === previousTitle &&
					candidate.title === item.title
			);
			if (entry) {
				item.content = entry.content;
				item.preserveInstructions = true;
				if (entry.displayTitle) {
					item.id ??= progressId(
						`${module.id}-${module.curriculum.includes(item) ? "curriculum" : "supplemental"}-${item.title}`
					);
					item.aliases = [
						...new Set([...(item.aliases ?? []), item.title])
					];
					item.title = entry.displayTitle;
					item.contentKind = "reading";
				}
			}
			const tail = item.content.search(
				/\n\n\*\*(?:Concept path|Quick check|Goal):\*\*/
			);
			if (tail > 0) item.content = item.content.slice(0, tail).trim();
		}
	}
}
