import { describe, expect, it } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useCoursesStore } from "@/stores/courses";
import {
	preAlgebraBCaseData,
	preAlgebraBReviewData,
	addPreAlgebraBCases
} from "@/stores/courses/preAlgebraBCases";
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

describe("complete pre-algebra-b baseline", () => {
	it("retains every supplied method, worked example, problem and mixed review in the public course", async () => {
		setActivePinia(createPinia());
		const course =
			(await useCoursesStore().loadCourseById("pre-algebra-b"))!;
		for (const unit of preAlgebraBCaseData) {
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
		for (const review of preAlgebraBReviewData) {
			const module = course.modules.find(
				module => module.title === review.moduleTitle
			)!;
			const corpus = module.curriculum
				.map(item => item.content)
				.join("\n");
			for (const problem of review.problems)
				expect(corpus).toContain(problem);
		}

		const corpus = course.modules
			.flatMap(module => [
				...module.curriculum,
				...module.supplementalProjects
			])
			.map(item => item.content)
			.join("\n");
		expect(corpus).toContain("Turns are 351, 372 and 365 degrees");
		expect(corpus).toContain(
			"Route A joins (0,0), (4,0), (4,3), (2,5), (0,3)"
		);
		expect(corpus).toContain("fictional planar exercise routes");
		const route = course.modules
			.flatMap(module => [
				...module.curriculum,
				...module.supplementalProjects
			])
			.find(item => item.title === "Project: Uber Internship Challenge")!;
		expect(route.content).toContain("**Pending media:**");
		expect(route.content).toContain("pab14_0.png");
	});
	it("rejects missing and duplicate authored bindings", () => {
		const missing = structuredClone(preAlgebraBCourse);
		const first = preAlgebraBCaseData[0];
		missing.modules.find(
			module => module.title === first.moduleTitle
		)!.curriculum = [];
		expect(() => addPreAlgebraBCases(missing)).toThrow("Missing");
		const duplicate = structuredClone(preAlgebraBCourse);
		duplicate.modules.push(structuredClone(duplicate.modules[0]));
		expect(() => addPreAlgebraBCases(duplicate)).toThrow("Duplicate");
	});
});
