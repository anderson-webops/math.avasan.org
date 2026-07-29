import { describe, expect, it } from "vitest";
import { preAlgebraBCourse } from "@/stores/courses/pre-algebra-b";

const EXPECTED_MODULE_SEQUENCE = [
	"Pre-Algebra B Kick-Off",
	"PAB1-PAB5 Data, Averages, and Graphs",
	"Check-In #1: Pre-Algebra B Data and Graphing",
	"PAB6-PAB9 Lines, Angles, Triangles, and Similarity",
	"PAB10-PAB14 Polygons, Area, Circles, and Solids",
	"Check-In #2: Pre-Algebra B Geometry",
	"PAB15-PAB19 Factors, Multiples, and Number Structure",
	"PAB20-PAB23 Counting, Probability, and Applied Modeling",
	"Check-In #3 and Capstone: Pre-Algebra B"
];

function requireModule(title: string) {
	const module = preAlgebraBCourse.modules.find(
		candidate => candidate.title === title
	);
	if (!module) throw new Error(`Expected Pre-Algebra B module ${title}.`);
	return module;
}

describe("Pre-Algebra B learner flow", () => {
	it("keeps the data-to-modeling progression and separates references", () => {
		expect(
			preAlgebraBCourse.modules
				.filter(module => module.kind !== "appendix")
				.map(module => module.title)
		).toEqual(EXPECTED_MODULE_SEQUENCE);
		expect(
			preAlgebraBCourse.modules
				.filter(module => module.kind === "appendix")
				.map(module => module.title)
		).toEqual(["Pre-Algebra B Reference Archive"]);
	});

	it("adds pacing, concept targets, and explicit learning paths", () => {
		for (const module of preAlgebraBCourse.modules.filter(
			candidate => candidate.kind !== "appendix"
		)) {
			expect(module.estimatedTime, module.title).toMatch(/session/);
			expect(module.keyBlocks?.length, module.title).toBeGreaterThanOrEqual(
				5
			);
			expect(
				module.curriculum.every(item => item.learningPath === "core"),
				module.title
			).toBe(true);
			expect(
				module.supplementalProjects.every(item =>
					["choice", "challenge"].includes(item.learningPath ?? "")
				),
				module.title
			).toBe(true);
			expect(module.curriculum[0]?.content, module.title).toContain(
				"**Course flow:**"
			);
		}
	});

	it("makes the kickoff project optional instead of a second prerequisite", () => {
		const kickoff = requireModule("Pre-Algebra B Kick-Off");
		expect(kickoff.curriculum.map(item => item.title)).toEqual([
			"Course Map and Readiness Check"
		]);
		expect(kickoff.supplementalProjects).toEqual([
			expect.objectContaining({
				learningPath: "choice",
				title: "Project: Pre-Algebra B Readiness Map"
			})
		]);
		expect(kickoff.curriculum[0]?.content).toContain(
			"not another required unit"
		);
	});

	it("uses one applied model and an evidence-based next-course handoff", () => {
		const modeling = requireModule(
			"PAB20-PAB23 Counting, Probability, and Applied Modeling"
		);
		expect(
			modeling.supplementalProjects.find(
				item => item.title === "Project: eSmash"
			)?.learningPath
		).toBe("choice");
		expect(
			modeling.supplementalProjects.find(
				item => item.title === "Project: Airtable Revamped"
			)?.learningPath
		).toBe("challenge");
		expect(
			requireModule("Check-In #3 and Capstone: Pre-Algebra B")
				.curriculum[0]?.content
		).toContain("Algebra 1A or Geometry A");
	});
});
