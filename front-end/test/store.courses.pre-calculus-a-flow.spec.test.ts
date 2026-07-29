import { describe, expect, it } from "vitest";
import { preCalculusACourse } from "@/stores/courses/pre-calculus-a";

const EXPECTED_MODULE_SEQUENCE = [
	"PCTA1 Piecewise Functions",
	"PCTA2 Higher-Degree Polynomials",
	"PCTA3 Polynomial Division",
	"PCTA4 Zeros of Polynomials",
	"PCTA5 Graphing Polynomials",
	"PCTA6 Arithmetic and Geometric Sequences",
	"PCTA7 Area Under a Curve",
	"PCTA8 The Binomial Theorem",
	"Check-In #1: Polynomial and Sequence Foundations",
	"PCTA9 Rational Functions",
	"PCTA10 Rational Function Operations",
	"PCTA11 Logarithms and Exponents",
	"PCTA12 Function Inverses and Composition",
	"PCTA13 Circles and Ellipses",
	"PCTA14 Parabolas and Hyperbolas",
	"Check-In #2 and Pre-Calculus A Capstone"
];

function requireModule(title: string) {
	const module = preCalculusACourse.modules.find(
		candidate => candidate.title === title
	);
	if (!module) throw new Error(`Expected Pre-Calculus A module ${title}.`);
	return module;
}

describe("Pre-Calculus A learner flow", () => {
	it("keeps the two-stage sequence and separates reference appendices", () => {
		expect(
			preCalculusACourse.modules
				.filter(module => module.kind !== "appendix")
				.map(module => module.title)
		).toEqual(EXPECTED_MODULE_SEQUENCE);
		expect(
			preCalculusACourse.modules
				.filter(module => module.kind === "appendix")
				.map(module => module.title)
		).toEqual([
			"Pre-Calculus A Reference Archive",
			"Pending Static Assets"
		]);
	});

	it("adds pacing, targets, flow notes, and explicit paths", () => {
		for (const module of preCalculusACourse.modules.filter(
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

	it("promotes the modeling portfolio to required capstone work", () => {
		const finalModule = requireModule(
			"Check-In #2 and Pre-Calculus A Capstone"
		);
		expect(finalModule.curriculum.map(item => item.title)).toEqual([
			"Check-In #2",
			"Capstone: Pre-Calculus A Modeling Portfolio"
		]);
		expect(finalModule.curriculum[1]?.learningPath).toBe("core");
		expect(
			finalModule.supplementalProjects.map(item => [
				item.title,
				item.learningPath
			])
		).toEqual([
			["Project: Rational, Logarithmic, and Conic Defense", "choice"],
			["Challenge: Portfolio Model Stress Test", "challenge"]
		]);
	});

	it("reserves the most complex extensions for the challenge path", () => {
		expect(
			requireModule("PCTA7 Area Under a Curve").supplementalProjects[0]
				?.learningPath
		).toBe("challenge");
		expect(
			requireModule("PCTA14 Parabolas and Hyperbolas")
				.supplementalProjects[0]?.learningPath
		).toBe("challenge");
	});
});
