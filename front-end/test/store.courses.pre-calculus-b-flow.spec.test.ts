import { describe, expect, it } from "vitest";
import { preCalculusBCourse } from "@/stores/courses/pre-calculus-b";

const EXPECTED_MODULE_SEQUENCE = [
	"PCTB1 Trigonometry Basics",
	"PCTB2 Graphs of Sine and Cosine",
	"PCTB3 Other Trigonometric Graphs",
	"PCTB4 Trigonometric Equations and Identities",
	"PCTB5 Polar Coordinates",
	"PCTB6 Parametric Equations",
	"Check-In #1: Trigonometry and Coordinate Models",
	"PCTB7 Vectors",
	"PCTB8 Matrices Review",
	"PCTB9 Applications of Matrices",
	"PCTB10 Partial Fraction Decomposition",
	"PCTB11 Probability",
	"PCTB12 Limits",
	"PCTB13 Rates of Change",
	"Check-In #2 and Pre-Calculus B Capstone"
];

function requireModule(title: string) {
	const module = preCalculusBCourse.modules.find(
		candidate => candidate.title === title
	);
	if (!module) throw new Error(`Expected Pre-Calculus B module ${title}.`);
	return module;
}

describe("Pre-Calculus B learner flow", () => {
	it("progresses from trigonometry into calculus readiness", () => {
		expect(
			preCalculusBCourse.modules
				.filter(module => module.kind !== "appendix")
				.map(module => module.title)
		).toEqual(EXPECTED_MODULE_SEQUENCE);
		expect(
			preCalculusBCourse.modules
				.filter(module => module.kind === "appendix")
				.map(module => module.title)
		).toEqual([
			"Pre-Calculus B Reference Archive",
			"Pending Static Assets"
		]);
	});

	it("adds pacing, targets, flow notes, and explicit paths", () => {
		for (const module of preCalculusBCourse.modules.filter(
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

	it("promotes the modeling portfolio while keeping planning optional", () => {
		const finalModule = requireModule(
			"Check-In #2 and Pre-Calculus B Capstone"
		);
		expect(finalModule.curriculum.map(item => item.title)).toEqual([
			"Vectors, Matrices, and Partial Fractions Review",
			"Probability, Limits, and Rates Review",
			"Capstone: Pre-Calculus B Modeling Portfolio"
		]);
		expect(finalModule.curriculum[2]?.learningPath).toBe("core");
		expect(
			finalModule.supplementalProjects.map(item => [
				item.title,
				item.learningPath
			])
		).toEqual([
			["Project: AP Calculus Readiness Map", "choice"],
			["Challenge: Timed Readiness Defense", "challenge"]
		]);
	});

	it("reserves selected multi-representation extensions for challenge work", () => {
		expect(
			requireModule("PCTB5 Polar Coordinates").supplementalProjects[0]
				?.learningPath
		).toBe("challenge");
		expect(
			requireModule("PCTB9 Applications of Matrices")
				.supplementalProjects[0]?.learningPath
		).toBe("challenge");
	});
});
