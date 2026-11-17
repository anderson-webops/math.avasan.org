import type { RawCourse, RawCourseModuleItem } from "./types";

const priorMathArchiveCourses = new Set([
	"algebra-1a",
	"algebra-1b",
	"algebra-2a",
	"algebra-2b",
	"geometry-a",
	"geometry-b",
	"pre-algebra-a",
	"pre-algebra-b",
	"pre-calculus-a",
	"pre-calculus-b"
]);

function historicalCourseProgressId(value: string) {
	return value
		.toLowerCase()
		.normalize("NFKD")
		.replace(/[\u0300-\u036F]/g, "")
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "");
}

export function preserveMathArchiveProgress(
	course: RawCourse,
	courseId: string
) {
	if (!priorMathArchiveCourses.has(courseId)) return;
	const archive = course.modules.find(module =>
		module.title.includes("Reference Archive")
	);
	if (!archive) return;
	const previousModuleId = `${courseId}-source-activity-archive`;
	const archiveSubject = archive.title
		.replace(/^Reference Archive: /u, "")
		.replace(/ Reference Archive$/u, "");
	archive.aliases = [
		...new Set([...(archive.aliases ?? []), previousModuleId])
	];
	const preserveItem = (
		item: RawCourseModuleItem,
		moduleId: string,
		section: "curriculum" | "supplemental",
		previousTitle: string
	) => {
		const previousId = historicalCourseProgressId(
			`${moduleId}-${section}-${previousTitle}`
		);
		item.aliases = [...new Set([...(item.aliases ?? []), previousId])];
	};

	for (const item of archive.curriculum) {
		let previousTitle: string | undefined;
		if (item.title === "Project Scenario and Context Links") {
			previousTitle = item.title;
		} else if (item.title === "Pending Static Assets") {
			previousTitle = "Pending Static Asset Placeholders";
		} else if (item.title.endsWith("Reference Map")) {
			previousTitle = courseId.startsWith("pre-algebra-")
				? `${archiveSubject} Source Anchors`
				: `Source Activity Anchors: ${archiveSubject}`;
		}
		if (previousTitle) {
			preserveItem(item, previousModuleId, "curriculum", previousTitle);
		}
	}
	for (const item of archive.supplementalProjects) {
		const purpose = [
			"Standards Practice Set",
			"Modeling or Error Analysis"
		].find(label => item.title.startsWith(`${label}:`));
		if (purpose) {
			preserveItem(
				item,
				previousModuleId,
				"supplemental",
				`${purpose}: Source Activity Archive`
			);
		}
	}
	if (courseId === "pre-algebra-a") {
		const capstone = course.modules.find(
			module => module.title === "Check-In #2 and Capstone"
		);
		const referenceMap = capstone?.curriculum.find(
			item => item.title === "Pre-Algebra A Capstone Reference Map"
		);
		if (referenceMap) {
			preserveItem(
				referenceMap,
				`${courseId}-check-in-2-and-capstone`,
				"curriculum",
				"Source Activity Anchors: Pre-Algebra A Capstone"
			);
		}
	}
}
