import { describe, expect, it } from "vitest";
import { algebra1BCourse } from "@/stores/courses/algebra-1b";

const EXPECTED_MODULE_SEQUENCE = [
	"Algebra 1B Kick-Off and Placement",
	"AB1 Introduction to Polynomials",
	"AB2 Multiplying Polynomials",
	"AB3 Fractions with Polynomials",
	"AB4 Module Project: Smart and Elegant (with Amy Katz)",
	"AB5 Solving Quadratics by Factoring",
	"AB6 Special Factorizations",
	"AB7 Solving Quadratics by Completing the Square",
	"AB8 Quadratic Formula",
	"AB9 Module Project: The Half-Court Challenge (with Ian Kennedy)",
	"Check-In #1",
	"AB10 Graphing Vertex Form",
	"AB11 Graphing Standard Form",
	"AB12 Transformations",
	"AB13 Module Project: Put Me in Coach! (with Tom Dethlefs)",
	"AB14 Introduction to Functions",
	"AB15 Function Composition and Inverse Functions",
	"AB16 Module Project: J.T. Phone Home",
	"AB17 Absolute Value and Exponential Functions",
	"AB18 Direct and Inverse Variation",
	"AB19 Data Modeling",
	"AB20 Module Project: The Mysteries of Light (with Blake Eaton)",
	"AB21 Module Project: Radiofungi (with Sunanda Sharma)",
	"Check-In #2",
	"AB22 Master Project: Algebra 1B"
];

function requireModule(title: string) {
	const module = algebra1BCourse.modules.find(
		candidate => candidate.title === title
	);
	if (!module) throw new Error(`Expected Algebra 1B module ${title}.`);
	return module;
}

describe("Algebra 1B learner flow", () => {
	it("places the comprehensive checkpoint before the capstone", () => {
		expect(
			algebra1BCourse.modules
				.filter(module => module.kind !== "appendix")
				.map(module => module.title)
		).toEqual(EXPECTED_MODULE_SEQUENCE);
		expect(
			algebra1BCourse.modules.find(
				module => module.title === "Reference Archive: Algebra 1B"
			)?.kind
		).toBe("appendix");
	});

	it("adds pacing, targets, flow notes, and explicit paths", () => {
		for (const module of algebra1BCourse.modules.filter(
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

	it("uses the kickoff as a two-route placement menu", () => {
		const kickoff = requireModule("Algebra 1B Kick-Off and Placement");
		expect(kickoff.curriculum.map(item => item.title)).toEqual([
			"Kick-Off Overview"
		]);
		expect(
			kickoff.supplementalProjects.map(item => item.learningPath)
		).toEqual(["choice", "challenge"]);
		expect(kickoff.curriculum[0]?.content).toContain(
			"rather than completing both long amusement-park projects"
		);
	});

	it("keeps advanced and answer material optional", () => {
		expect(
			requireModule("AB3 Fractions with Polynomials")
				.supplementalProjects[0]
		).toEqual(
			expect.objectContaining({
				learningPath: "challenge",
				title: "Rationalizing Denominators"
			})
		);
		expect(
			requireModule(
				"AB4 Module Project: Smart and Elegant (with Amy Katz)"
			).supplementalProjects[0]
		).toEqual(
			expect.objectContaining({
				learningPath: "choice",
				title: "Answer Key and Profit Models"
			})
		);
		expect(
			requireModule("AB22 Master Project: Algebra 1B").curriculum[0]
				?.content
		).toContain("Begin after the comprehensive checkpoint");
	});
});
