import { describe, expect, it } from "vitest";
import { preAlgebraACourse } from "@/stores/courses/pre-algebra-a";

const EXPECTED_MODULE_SEQUENCE = [
	"Pre-Algebra A Kick-Off",
	"PAA1-PAA2 Arithmetic Foundations",
	"PAA3-PAA7 Fractions and Arithmetic",
	"PAA8-PAA12 Decimals, Percents, Ratios, and Rates",
	"Check-In #1",
	"PAA13-PAA17 Expressions and Sequences",
	"PAA18-PAA23 Exponents, Roots, and Scientific Notation",
	"Check-In #2 and Capstone"
];

function requireModule(title: string) {
	const module = preAlgebraACourse.modules.find(
		candidate => candidate.title === title
	);
	if (!module) throw new Error(`Expected Pre-Algebra A module ${title}.`);
	return module;
}

describe("Pre-Algebra A learner flow", () => {
	it("keeps a paced arithmetic-to-algebra spine before the appendices", () => {
		expect(
			preAlgebraACourse.modules
				.filter(module => module.kind !== "appendix")
				.map(module => module.title)
		).toEqual(EXPECTED_MODULE_SEQUENCE);
		expect(
			preAlgebraACourse.modules
				.filter(module => module.kind === "appendix")
				.map(module => module.title)
		).toEqual([
			"Pre-Algebra A Reference Archive",
			"Pending Static Assets"
		]);
	});

	it("adds pacing, concept targets, and explicit learning paths", () => {
		for (const module of preAlgebraACourse.modules.filter(
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

	it("uses one readiness inventory before optional kickoff applications", () => {
		const kickoff = requireModule("Pre-Algebra A Kick-Off");
		expect(kickoff.curriculum.map(item => item.title)).toEqual([
			"Course Map and Readiness Check"
		]);
		expect(
			kickoff.supplementalProjects.map(item => ({
				path: item.learningPath,
				title: item.title
			}))
		).toEqual([
			{
				path: "choice",
				title: "Project: Starting a Gardening Business"
			},
			{
				path: "challenge",
				title: "Project: Growing the Gardening Business"
			}
		]);
		expect(kickoff.curriculum[0]?.content).toContain(
			"completing both projects is not required"
		);
	});

	it("makes checkpoints gate the next strand and the capstone handoff", () => {
		expect(requireModule("Check-In #1").curriculum[0]?.content).toContain(
			"assign only the smallest review strand"
		);
		expect(
			requireModule("Check-In #2 and Capstone").curriculum[0]?.content
		).toContain("Pre-Algebra B");
		expect(
			requireModule(
				"PAA8-PAA12 Decimals, Percents, Ratios, and Rates"
			).supplementalProjects.find(
				item =>
					item.title === "Challenge: Rate-Time-Distance Route Plan"
			)?.learningPath
		).toBe("challenge");
	});
});
