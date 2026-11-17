import { describe, expect, it } from "vitest";
import {
	algebra2Checkpoint,
	algebra2Checkpoints
} from "@/stores/courses/algebra2Checkpoints";
import {
	algebra2ReadingMethods,
	algebra2Readings,
	applyAlgebra2Readings
} from "@/stores/courses/algebra2Readings";
import { algebra2ACourse } from "@/stores/courses/algebra-2a";
import { loadRawCourse } from "@/stores/courses/index";

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

describe("algebra 2A learner flow", () => {
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
		expect(
			capstone.supplementalProjects.map(item => item.learningPath)
		).toEqual(["choice", "challenge"]);
		expect(capstone.curriculum[0]?.content).toContain("Algebra 2B");
	});
});

describe("algebra 2A historical baseline", () => {
	it("retains seventeen methods, twenty-seven classified readings and three complete checkpoints", async () => {
		const course = (await loadRawCourse("algebra-2a"))!;
		const methods = algebra2ReadingMethods.filter(
			entry => entry.courseId === "algebra-2a"
		);
		const readings = algebra2Readings.filter(
			entry => entry.courseId === "algebra-2a"
		);
		expect(methods).toHaveLength(17);
		expect(readings).toHaveLength(27);
		for (const entry of methods) {
			const module = course.modules.find(
				module => module.title === entry.moduleTitle
			)!;
			expect(
				module.curriculum.filter(
					item =>
						item.content.includes(entry.methods) &&
						item.content.includes(entry.worked)
				),
				entry.target
			).toHaveLength(1);
		}
		for (const entry of readings) {
			const module = course.modules.find(
				module => module.title === entry.moduleTitle
			)!;
			const item = module[entry.section].find(
				item => item.id === entry.id
			)!;
			expect(item, entry.title).toBeDefined();
			expect(item.contentKind).toBe("reading");
			expect(item.preserveInstructions).toBe(true);
		}
		const checkpoints = algebra2Checkpoints.filter(
			entry => entry.course === "algebra-2a"
		);
		expect(checkpoints).toHaveLength(3);
		for (const entry of checkpoints) {
			const module = course.modules.find(
				module => module.title === entry.moduleTitle
			)!;
			const review = module.curriculum.find(item =>
				item.title.includes("Representative Review Problems")
			)!;
			expect(review.content).toBe(
				algebra2Checkpoint(entry.course, entry.moduleTitle)
			);
			for (const problem of entry.problems)
				expect(review.content).toContain(problem);
			expect(review.content).toContain("course=algebra-2a");
		}
	});

	it("fails missing or duplicate bindings and keeps its adapter course-gated", () => {
		const course = structuredClone(algebra2ACourse);
		const module = course.modules.find(
			module => module.title === "ALA1 Complex Numbers"
		)!;
		module.curriculum.push({ ...module.curriculum[0] });
		expect(() => applyAlgebra2Readings(course, "algebra-2a")).toThrow(
			"Missing unique Algebra reading"
		);
		const unrelated = { name: "Unrelated", modules: [] };
		applyAlgebra2Readings(unrelated, "geometry-a");
		expect(unrelated).toEqual({ name: "Unrelated", modules: [] });
	});
});
