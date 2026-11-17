import { describe, expect, it } from "vitest";
import { apCalculusCourse } from "@/stores/courses/ap-calculus";
import { createPinia, setActivePinia } from "pinia";
import { useCoursesStore } from "@/stores/courses";
import {
	apCalculusCases,
	apCalculusPortfolios,
	apCalculusRootExtension
} from "@/stores/courses/apCalculusCases";
import { applyCalculusBaseline } from "@/stores/courses/calculusBaseline";
import { normalizeRawCourse } from "@/stores/courses/normalization";
import { expectAuthoredCalculusContent } from "./calculusBaselineAssertions";

const AB_ROUTE_TITLES = [
	"APCA0 Preparing for AP Calculus",
	"APC1 Introduction to Limits",
	"APC2 Calculating Limits",
	"APC3 Continuity",
	"APC4 Limits and Continuity Topic Review",
	"APC5 Introduction to Derivatives",
	"APC6 Derivative Rules",
	"APC7 Derivatives of Trigonometric and Other Functions",
	"APC8 Derivatives of Composite, Implicit, and Inverse Functions",
	"APC9 Differentiation Topic Review",
	"APC10 Contextual Applications of Differentiation",
	"APC11 Analytical Applications of Differentiation",
	"APC12 A Function and Its Derivatives",
	"APC13 Applications of Derivatives Topic Review",
	"APC14 Accumulation of Change",
	"APC15 Integrals",
	"APC16 Integration and Accumulation of Change Topic Review",
	"APC17 Introduction to Differential Equations",
	"APC18 Solutions to Differential Equations",
	"APC19 Differential Equations Topic Review",
	"APC20 Interpreting Context for Definite Integrals",
	"APC21 Volumes of Solids Using Integrals",
	"APC22 Applications of Integration Topic Review"
];

const BC_EXTENSION_TITLES = [
	"APC23 Parametric Equations, Polar Coordinates, and Vector-Valued Functions",
	"APC24 Parametric Equations, Polar Coordinates, and Vector-Valued Functions Topic Review",
	"APC25 Infinite Series",
	"APC26 Infinite Sums and Representing Infinite Series",
	"APC27 Infinite Sequences and Series Topic Review"
];

function requireModule(title: string) {
	const module = apCalculusCourse.modules.find(
		candidate => candidate.title === title
	);
	if (!module) throw new Error(`Expected AP Calculus module ${title}.`);
	return module;
}

describe("AP Calculus learner flow", () => {
	it("preserves authored instructions and supplies every AB and BC unit", async () => {
		setActivePinia(createPinia());
		const course = (await useCoursesStore().loadCourseById("ap-calculus"))!;
		expectAuthoredCalculusContent("ap-calculus", apCalculusCourse, course);
		expect(apCalculusCases).toHaveLength(28);
		for (const unit of apCalculusCases) {
			const module = course.modules.find(item =>
				item.title.startsWith(`${unit.code} `)
			)!;
			const reading = module.curriculum.find(
				item => item.id === unit.published.id
			)!;
			expect(reading.content).toContain(unit.reading);
			expect(reading.content).toContain(unit.worked);
			for (const alias of unit.published.aliases)
				expect(reading.aliases).toContain(alias);
			const practice = module.curriculum.find(item =>
				item.id.endsWith(`-practice-${unit.code.toLowerCase()}`)
			)!;
			expect(practice.preserveAssignment).toBe(true);
			for (const problem of unit.problems)
				expect(practice.content).toContain(problem);
			if (typeof unit.bcFrom === "number")
				expect(practice.content).toContain(
					`AB route: problems 1–${unit.bcFrom - 1}. BC route: all problems.`
				);
		}
		for (const portfolio of apCalculusPortfolios) {
			const project = course.modules
				.flatMap(module => module.curriculum)
				.find(item => item.title === portfolio.title)!;
			expect(project.learningPath).toBe("core");
			for (const text of [...portfolio.problems, ...portfolio.rubric])
				expect(project.content).toContain(text);
		}
		const rootMatches = course.modules
			.flatMap(module => [
				...module.curriculum,
				...module.supplementalProjects
			])
			.filter(item =>
				item.content.includes(apCalculusRootExtension.problem)
			);
		expect(rootMatches).toHaveLength(1);
		expect(rootMatches[0].learningPath).toBe("challenge");
		expect(rootMatches[0].content).toContain(
			apCalculusRootExtension.reading
		);
	});

	it("fails closed for missing portfolios and optional challenge bindings", () => {
		for (const title of [
			"AP Calculus AB Exam Readiness Portfolio",
			"APC25 AP Practice Plan"
		]) {
			const missing = structuredClone(apCalculusCourse);
			for (const module of missing.modules) {
				module.curriculum = module.curriculum.filter(
					item => item.title !== title
				);
				module.supplementalProjects =
					module.supplementalProjects.filter(
						item => item.title !== title
					);
			}
			expect(() => normalizeRawCourse("ap-calculus", missing)).toThrow(
				"found 0"
			);
		}
		const unrelated = structuredClone(apCalculusCourse);
		const before = JSON.stringify(unrelated);
		applyCalculusBaseline("algebra-2a", unrelated, apCalculusCourse);
		expect(JSON.stringify(unrelated)).toBe(before);
	});

	it("keeps the complete AB route before the BC extension", () => {
		const activeTitles = apCalculusCourse.modules
			.filter(module => module.kind !== "appendix")
			.map(module => module.title);
		expect(activeTitles).toEqual([
			...AB_ROUTE_TITLES,
			...BC_EXTENSION_TITLES
		]);
		expect(
			apCalculusCourse.modules
				.filter(module => module.kind === "appendix")
				.map(module => module.title)
		).toEqual(["AP Calculus Reference Archive", "Pending Static Assets"]);
	});

	it("states the AB and BC routes in the diagnostic module", () => {
		const setupText = requireModule("APCA0 Preparing for AP Calculus")
			.curriculum.map(item => item.content)
			.join("\n");
		expect(setupText).toContain(
			"The AB route runs from APCA0 through APC22"
		);
		expect(setupText).toContain(
			"The BC route completes the AB core, continues through APC23–APC27"
		);
	});

	it("adds pacing, targets, flow notes, and explicit practice paths", () => {
		for (const module of apCalculusCourse.modules.filter(
			candidate => candidate.kind !== "appendix"
		)) {
			expect(module.kind, module.title).toBe("module");
			expect(module.estimatedTime, module.title).toMatch(/session/);
			expect(module.keyBlocks?.length, module.title).toBe(5);
			expect(
				module.curriculum.every(item => item.learningPath === "core"),
				module.title
			).toBe(true);
			expect(
				module.supplementalProjects.map(item => item.learningPath)
			).toEqual(["choice", "challenge"]);
			expect(module.curriculum[0]?.content, module.title).toContain(
				"**Course flow:**"
			);
		}
	});

	it("places required readiness portfolios at both route endpoints", () => {
		const abEndpoint = requireModule(
			"APC22 Applications of Integration Topic Review"
		);
		const bcEndpoint = requireModule(
			"APC27 Infinite Sequences and Series Topic Review"
		);

		expect(abEndpoint.curriculum.at(-1)).toEqual(
			expect.objectContaining({
				learningPath: "core",
				title: "AP Calculus AB Exam Readiness Portfolio"
			})
		);
		expect(bcEndpoint.curriculum.at(-1)).toEqual(
			expect.objectContaining({
				learningPath: "core",
				title: "AP Calculus BC Exam Readiness Portfolio"
			})
		);
		expect(abEndpoint.curriculum.at(-1)?.content).toContain(
			"continue with APC23–APC27 for BC"
		);
		expect(bcEndpoint.curriculum.at(-1)?.content).toContain(
			"distinguishes AB foundations from BC extensions"
		);
	});
});
