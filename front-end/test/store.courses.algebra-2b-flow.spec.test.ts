import { describe, expect, it } from "vitest";
import { algebra2BCourse } from "@/stores/courses/algebra-2b";

const EXPECTED_MODULE_SEQUENCE = [
	"ALB1 Introduction to Logarithms",
	"ALB2 Exponential and Logarithmic Functions",
	"ALB3 Arithmetic Sequences",
	"ALB4 Geometric Sequences",
	"ALB5 Matrix Operations",
	"Check-In #1",
	"ALB6 Probability",
	"ALB7 Data and Statistics",
	"ALB8 Trigonometry Basics",
	"ALB9 Graphing Trigonometric Functions",
	"Check-In #2",
	"ALB10 Algebra 2B Modeling Capstone"
];

function requireModule(title: string) {
	const module = algebra2BCourse.modules.find(
		candidate => candidate.title === title
	);
	if (!module) throw new Error(`Expected Algebra 2B module ${title}.`);
	return module;
}

describe("Algebra 2B learner flow", () => {
	it("adds a synthesis capstone after both readiness gates", () => {
		expect(
			algebra2BCourse.modules
				.filter(module => module.kind !== "appendix")
				.map(module => module.title)
		).toEqual(EXPECTED_MODULE_SEQUENCE);
		expect(
			algebra2BCourse.modules.find(
				module => module.title === "Reference Archive: Algebra 2B"
			)?.kind
		).toBe("appendix");
	});

	it("adds pacing, targets, flow notes, and explicit paths", () => {
		for (const module of algebra2BCourse.modules.filter(
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

	it("keeps data and triangle visual references optional", () => {
		expect(
			requireModule("ALB7 Data and Statistics").supplementalProjects[0]
		).toEqual(
			expect.objectContaining({
				learningPath: "choice",
				title: "Data Visual References"
			})
		);
		expect(
			requireModule("ALB8 Trigonometry Basics").supplementalProjects[0]
		).toEqual(
			expect.objectContaining({
				learningPath: "choice",
				title: "Triangle Diagram References"
			})
		);
	});

	it("requires a cross-strand model comparison and limits extensions", () => {
		const capstone = requireModule("ALB10 Algebra 2B Modeling Capstone");
		expect(capstone.curriculum[0]?.content).toContain(
			"connects at least three Algebra 2B strands"
		);
		expect(capstone.curriculum[0]?.content).toContain("Pre-Calculus");
		expect(capstone.supplementalProjects.map(item => item.learningPath)).toEqual(
			["choice", "challenge"]
		);
	});
});
