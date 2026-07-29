import type { CourseDefinition } from "@/stores/courses";
import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it } from "vitest";
import { useCoursesStore } from "@/stores/courses";
import { courseCatalog } from "@/stores/courses/index";

const SOLUTION_PATH_RE =
	/(?:^|\/)solutions?(?:\/|$)|(?:^|[-_])solutions?(?:[-_]|$)/i;
const COURSE_SWEEP_TIMEOUT = 180000;

function items(course: CourseDefinition) {
	return course.modules.flatMap(module => [
		...module.curriculum,
		...module.supplementalProjects
	]);
}

function publicSolutionLeaks(course: CourseDefinition) {
	return items(course).flatMap(item => {
		const leaks: string[] = [];
		if (item.solutionLink) {
			leaks.push(`${item.title} exposes ${item.solutionLink}`);
		}
		if (item.projectLink && SOLUTION_PATH_RE.test(item.projectLink)) {
			leaks.push(`${item.title} links to ${item.projectLink}`);
		}
		return leaks;
	});
}

describe("course solution visibility", () => {
	beforeEach(() => {
		setActivePinia(createPinia());
	});

	it(
		"hides solution material from the anonymous public catalog",
		async () => {
			const coursesStore = useCoursesStore();
			const leaks: string[] = [];

			for (const { id } of courseCatalog) {
				const course = await coursesStore.loadCourseById(id);
				if (!course) {
					leaks.push(`${id} failed to load`);
					continue;
				}
				leaks.push(
					...publicSolutionLeaks(course).map(leak => `${id}: ${leak}`)
				);
			}

			expect(leaks).toEqual([]);
		},
		COURSE_SWEEP_TIMEOUT
	);
});
