import type { RawCourse } from "./types";

export function assertMathCourseBindings(course: RawCourse) {
	const modules = new Set<string>();
	for (const module of course.modules) {
		if (modules.has(module.title))
			throw new Error(`Duplicate Math module binding: ${module.title}`);
		modules.add(module.title);
		const identities = new Set<string>();
		for (const section of ["curriculum", "supplementalProjects"] as const) {
			const titles = new Set<string>();
			for (const item of module[section]) {
				if (titles.has(item.title)) {
					throw new Error(
						`Duplicate Math item binding: ${module.title}: ${item.title}`
					);
				}
				titles.add(item.title);
				if (item.id && identities.has(item.id))
					throw new Error(`Duplicate Math identity: ${item.id}`);
				if (item.id) identities.add(item.id);
			}
		}
	}
}
