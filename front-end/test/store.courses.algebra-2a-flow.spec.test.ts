import { describe, expect, it } from "vitest";
import { algebra2ACourse } from "@/stores/courses/algebra-2a";

const EXPECTED_MODULE_SEQUENCE = [
	"ALA1 Complex Numbers",
	"ALA2 Quadratic Functions",
	"ALA3 Graphing Quadratic Functions",
	"Check-In #1",
	"ALA4 Higher Degree Polynomials",
	"ALA5 Polynomial Division",
	"ALA6 Zeros of Polynomials",
	"ALA7 Graphing Polynomials",
	"Check-In #2",
	"ALA8 Rational Functions",
	"ALA9 Rational Function Operations",
	"ALA10 Radical Functions",
	"ALA11 Piecewise Functions",
	"Check-In #3",
	"ALA12 Algebra 2A Function Family Capstone"
];

function requireModule(title: string) {
	const module = algebra2ACourse.modules.find(
		candidate => candidate.title === title
	);
	if (!module) throw new Error(`Expected Algebra 2A module ${title}.`);
	return module;
}

describe("Algebra 2A learner flow", () => {
	it("adds a synthesis capstone after all three readiness gates", () => {
		expect(
			algebra2ACourse.modules
				.filter(module => module.kind !== "appendix")
				.map(module => module.title)
		).toEqual(EXPECTED_MODULE_SEQUENCE);
		expect(
			algebra2ACourse.modules.find(
				module => module.title === "Reference Archive: Algebra 2A"
			)?.kind
		).toBe("appendix");
	});

	it("adds pacing, targets, flow notes, and explicit paths", () => {
		for (const module of algebra2ACourse.modules.filter(
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

	it("keeps graph references optional", () => {
		expect(
			requireModule("ALA3 Graphing Quadratic Functions")
				.supplementalProjects[0]
		).toEqual(
			expect.objectContaining({
				learningPath: "choice",
				title: "Graph Prompt Reference"
			})
		);
		expect(
			requireModule("ALA8 Rational Functions").supplementalProjects[0]
		).toEqual(
			expect.objectContaining({
				learningPath: "choice",
				title: "Rational Graph References"
			})
		);
	});

	it("requires a cross-family model comparison and limits extensions", () => {
		const capstone = requireModule(
			"ALA12 Algebra 2A Function Family Capstone"
		);
		expect(capstone.curriculum[0]?.content).toContain(
			"Build and justify two candidate models"
		);
		expect(capstone.supplementalProjects.map(item => item.learningPath)).toEqual(
			["choice", "challenge"]
		);
		expect(capstone.curriculum[0]?.content).toContain("Algebra 2B");
	});
});
