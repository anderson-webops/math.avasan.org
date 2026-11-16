import type { RawCourse } from "./types";
import {
	courseAssetViewerUrl,
	slugMarkdownHeading
} from "@/modules/courseAssetPreview";
import practiceData from "./algebra1APracticeData.json";

export function applyAlgebra1APractice(course: RawCourse) {
	const kickoff = course.modules.find(
		module => module.title === "Algebra 1A Kick-Off and Placement"
	);
	if (!kickoff) throw new Error("Missing Algebra 1A placement module.");
	for (const title of [
		"Standards Practice Set: Algebra 1A Placement",
		"Modeling or Error Analysis: Algebra 1A Placement"
	]) {
		if (!kickoff.supplementalProjects.some(item => item.title === title)) {
			kickoff.supplementalProjects.push({
				title,
				content: "",
				learningPath: "choice"
			});
		}
	}
	for (const entry of practiceData) {
		const module = course.modules.find(item => item.title === entry.module);
		const item = module?.supplementalProjects?.find(candidate =>
			entry.kind === "practice"
				? candidate.title.includes("Standards Practice Set")
				: candidate.title.includes("Modeling or Error Analysis")
		);
		if (!item) {
			throw new Error(
				`Missing Algebra 1A ${entry.kind} task in ${entry.module}.`
			);
		}
		const opening =
			entry.kind === "practice"
				? ["**Worked example**", entry.workedExample]
				: [entry.given, "**Flawed solution**", entry.flawed];
		const questions = entry.questions.map(
			(question, index) => `${String(index + 1)}. ${question}`
		);
		const selfCheck = courseAssetViewerUrl(
			`/course-assets/algebra-1a/practice-checks-v1.md#${slugMarkdownHeading(
				entry.heading
			)}`,
			`${entry.heading} self-check`
		);
		item.content = [
			...opening,
			"**Practice**",
			questions.join("\n"),
			`[Project self-check](${selfCheck})`
		].join("\n\n");
		item.contentKind = "assignment";
		item.preserveInstructions = true;
		item.preserveAssignment = true;
	}
}
