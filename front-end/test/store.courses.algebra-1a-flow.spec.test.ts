import { describe, expect, it } from "vitest";
import { algebra1ACourse } from "@/stores/courses/algebra-1a";

const EXPECTED_MODULE_SEQUENCE = [
	"Algebra 1A Kick-Off and Placement",
	"AA1 Algebraic Properties",
	"AA2 Solving Single-Step Linear Equations",
	"AA3 Module Project: Movie Star Status (with Maddie Van Beek)",
	"AA4 Solving Multi-Step Linear Equations",
	"AA5 Module Project: Free Swag! (with Amisha Sisodiya)",
	"Check-In #1",
	"AA6 Slope and Rate of Change",
	"AA7 Module Project: Community Data Analysis (with Davin Lee)",
	"AA8 Slope-Intercept Form",
	"AA9 Point-Slope Form",
	"AA10 Graphing Inequalities",
	"AA11 Module Project: Predicting Avalanches (with Ruby Lee)",
	"Check-In #2",
	"AA12 Solving Linear Systems by Graphing",
	"AA13 Solving Linear Systems by Substitution",
	"AA14 Solving Linear Systems by Elimination",
	"AA15 Module Project: Cytogenetics Quest (with Dr. Renu Bajaj)",
	"AA16 Module Project: Battle of the Publications (with Konstantin Kaganovsky)",
	"Check-In #3",
	"AA17 Master Project: Algebra 1A"
];

function requireModule(title: string) {
	const module = algebra1ACourse.modules.find(
		candidate => candidate.title === title
	);
	if (!module) throw new Error(`Expected Algebra 1A module ${title}.`);
	return module;
}

describe("Algebra 1A learner flow", () => {
	it("places the systems checkpoint before the final project", () => {
		expect(
			algebra1ACourse.modules
				.filter(module => module.kind !== "appendix")
				.map(module => module.title)
		).toEqual(EXPECTED_MODULE_SEQUENCE);
		expect(
			algebra1ACourse.modules.find(
				module => module.title === "Reference Archive: Algebra 1A"
			)?.kind
		).toBe("appendix");
	});

	it("adds pacing, targets, flow notes, and explicit paths", () => {
		for (const module of algebra1ACourse.modules.filter(
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

	it("turns kickoff projects into a placement menu", () => {
		const kickoff = requireModule("Algebra 1A Kick-Off and Placement");
		expect(kickoff.curriculum.map(item => item.title)).toEqual([
			"Kick-Off Overview"
		]);
		expect(
			kickoff.supplementalProjects.map(item => item.learningPath)
		).toEqual(["choice", "choice", "challenge", "challenge"]);
		expect(kickoff.curriculum[0]?.content).toContain(
			"rather than completing four opening projects"
		);
	});

	it("keeps answer material optional and gates the capstone", () => {
		for (const title of [
			"AA3 Module Project: Movie Star Status (with Maddie Van Beek)",
			"AA15 Module Project: Cytogenetics Quest (with Dr. Renu Bajaj)",
			"AA16 Module Project: Battle of the Publications (with Konstantin Kaganovsky)"
		]) {
			expect(
				requireModule(title).supplementalProjects.some(
					item =>
						item.learningPath === "choice" &&
						/answer/i.test(item.title)
				)
			).toBe(true);
		}
		expect(
			requireModule("AA17 Master Project: Algebra 1A").curriculum[0]
				?.content
		).toContain("Begin only after the systems checkpoint");
	});
});
