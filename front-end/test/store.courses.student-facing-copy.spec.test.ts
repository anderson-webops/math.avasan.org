import { describe, expect, it } from "vitest";
import { courseCatalog, loadRawCourse } from "@/stores/courses/index";

const INTERNAL_COPY_RE =
	/\b(?:admin dashboard|book a class|create an account|freelance|instructor note|log in|scheduler|sign up|student account|tutor|zoom)\b/i;
const ALLOWED_MEDIA_HOSTS = new Set([
	"static.classes.jacobdanderson.net",
	"www.youtube.com",
	"youtu.be"
]);
const COURSE_SWEEP_TIMEOUT = 180000;

describe("student-facing math course copy", () => {
	it(
		"keeps internal product and teacher-management language out of lessons",
		async () => {
			const failures: string[] = [];

			for (const entry of courseCatalog) {
				const course = await loadRawCourse(entry.id);
				if (!course) {
					failures.push(`${entry.id}: failed to load`);
					continue;
				}

				for (const module of course.modules) {
					for (const item of [
						...module.curriculum,
						...module.supplementalProjects
					]) {
						const visibleCopy = `${module.title}\n${item.title}\n${item.content}`;
						if (INTERNAL_COPY_RE.test(visibleCopy)) {
							failures.push(
								`${entry.id} / ${module.title} / ${item.title}`
							);
						}
					}
				}
			}

			expect(failures).toEqual([]);
		},
		COURSE_SWEEP_TIMEOUT
	);

	it(
		"publishes only the image and video resources used by the math catalog",
		async () => {
			const failures: string[] = [];

			for (const entry of courseCatalog) {
				const course = await loadRawCourse(entry.id);
				if (!course) continue;

				for (const module of course.modules) {
					for (const item of [
						...module.curriculum,
						...module.supplementalProjects
					]) {
						if (
							item.projectLink ||
							item.solutionLink ||
							item.datasetLink
						) {
							failures.push(
								`${entry.id} / ${item.title}: unexpected project, solution, or dataset link`
							);
						}

						if (!item.mediaLink) continue;
						const hostname = new URL(item.mediaLink).hostname;
						if (!ALLOWED_MEDIA_HOSTS.has(hostname)) {
							failures.push(
								`${entry.id} / ${item.title}: unexpected media host ${hostname}`
							);
						}
					}
				}
			}

			expect(failures).toEqual([]);
		},
		COURSE_SWEEP_TIMEOUT
	);
});
