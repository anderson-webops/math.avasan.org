import { describe, expect, it } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useCoursesStore } from "@/stores/courses";
import {
	preAlgebraACaseData,
	preAlgebraAReviewData,
	addPreAlgebraACases
} from "@/stores/courses/preAlgebraACases";
import { preAlgebraASupplementalData } from "@/stores/courses/preAlgebraASupplementalPractice";
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
		).toEqual(["Pre-Algebra A Reference Archive", "Pending Static Assets"]);
	});

	it("adds pacing, concept targets, and explicit learning paths", () => {
		for (const module of preAlgebraACourse.modules.filter(
			candidate => candidate.kind !== "appendix"
		)) {
			expect(module.estimatedTime, module.title).toMatch(/session/);
			expect(
				module.keyBlocks?.length,
				module.title
			).toBeGreaterThanOrEqual(5);
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

describe("complete pre-algebra-a baseline", () => {
	it("retains every supplied method, worked example, problem and mixed review in the public course", async () => {
		setActivePinia(createPinia());
		const course =
			(await useCoursesStore().loadCourseById("pre-algebra-a"))!;
		for (const unit of preAlgebraACaseData) {
			const module = course.modules.find(
				module => module.title === unit.moduleTitle
			)!;
			const reading = module.curriculum.find(
				item => item.title === unit.target
			)!;
			expect(reading.contentKind).toBe("reading");
			expect(reading.content).toContain(unit.methods);
			expect(reading.content).toContain(unit.worked);
			const practice = module.curriculum.filter(
				item => item.title === `Practice: ${unit.title}`
			);
			expect(practice).toHaveLength(1);
			for (const problem of unit.problems)
				expect(practice[0].content).toContain(problem);
			expect(practice[0].content).toContain(unit.checks);
			expect(practice[0].learningPath).toBe("core");
		}
		for (const review of preAlgebraAReviewData) {
			const module = course.modules.find(
				module => module.title === review.moduleTitle
			)!;
			const corpus = module.curriculum
				.map(item => item.content)
				.join("\n");
			for (const problem of review.problems)
				expect(corpus).toContain(problem);
		}

		for (const unit of preAlgebraASupplementalData) {
			const module = course.modules.find(
				module => module.title === unit.module
			)!;
			const item = module.supplementalProjects.find(
				item => item.title === unit.title
			)!;
			expect(item, unit.title).toBeDefined();
			for (const problem of unit.problems)
				expect(item.content).toContain(problem);
			expect(item.content).toContain(unit.checks);
			expect(item.learningPath ?? "choice").toBe("choice");
		}
		const corpus = course.modules
			.flatMap(module => [
				...module.curriculum,
				...module.supplementalProjects
			])
			.map(item => item.content)
			.join("\n");
		expect(corpus).toContain("per item: succulent $8");
		expect(corpus).toContain("fictional, dimensionless");
		expect(corpus).toContain(
			"one calculation from each major course strand"
		);
	});
	it("rejects missing and duplicate authored bindings", () => {
		const missing = structuredClone(preAlgebraACourse);
		const first = preAlgebraACaseData[0];
		missing.modules.find(
			module => module.title === first.moduleTitle
		)!.curriculum = [];
		expect(() => addPreAlgebraACases(missing)).toThrow("Missing");
		const duplicate = structuredClone(preAlgebraACourse);
		duplicate.modules.push(structuredClone(duplicate.modules[0]));
		expect(() => addPreAlgebraACases(duplicate)).toThrow("Duplicate");
	});
});
