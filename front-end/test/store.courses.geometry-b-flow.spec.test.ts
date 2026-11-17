import { describe, expect, it } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useCoursesStore } from "@/stores/courses";
import {
	geometryCaseTracks,
	addGeometryCases
} from "@/stores/courses/geometryCases";
import { geometryBCourse } from "@/stores/courses/geometry-b";

const EXPECTED_MODULE_SEQUENCE = [
	"GEOB1-GEOB2 Quadrilaterals and Parallelograms",
	"GEOB3-GEOB4 Polygons and Circle Measurement",
	"GEOB5-GEOB6 Circle Theorems and Challenge Problems",
	"Check-In #1: Quadrilaterals, Polygons, and Circles",
	"GEOB7-GEOB8 Transformations",
	"GEOB9-GEOB10 Polyhedra and Round Solids",
	"Check-In #2 and Geometry B Capstone"
];

function requireModule(title: string) {
	const module = geometryBCourse.modules.find(
		candidate => candidate.title === title
	);
	if (!module) throw new Error(`Expected Geometry B module ${title}.`);
	return module;
}

describe("Geometry B learner flow", () => {
	it("keeps the two-dimensional-to-solid spine ahead of appendices", () => {
		expect(
			geometryBCourse.modules
				.filter(module => module.kind !== "appendix")
				.map(module => module.title)
		).toEqual(EXPECTED_MODULE_SEQUENCE);
		expect(
			geometryBCourse.modules
				.filter(module => module.kind === "appendix")
				.map(module => module.title)
		).toEqual(["Geometry B Reference Archive", "Pending Static Assets"]);
	});

	it("adds pacing, evidence targets, flow notes, and explicit paths", () => {
		for (const module of geometryBCourse.modules.filter(
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

	it("keeps deeper theorem and design routes optional", () => {
		expect(
			requireModule(
				"GEOB5-GEOB6 Circle Theorems and Challenge Problems"
			).supplementalProjects.find(
				item => item.title === "Project: Circle Challenge Walkthrough"
			)?.learningPath
		).toBe("challenge");
		expect(
			requireModule(
				"GEOB9-GEOB10 Polyhedra and Round Solids"
			).supplementalProjects.find(
				item => item.title === "Project: Packaging Design Optimization"
			)?.learningPath
		).toBe("challenge");
	});

	it("promotes the design defense and documents the two real gates", () => {
		const capstone = requireModule("Check-In #2 and Geometry B Capstone");
		expect(capstone.curriculum.map(item => item.title)).toEqual([
			"Transformations and Solids Readiness Check",
			"Geometry B Capstone Synthesis",
			"Capstone: Geometry B Design Defense"
		]);
		expect(
			geometryBCourse.developmentMetadata?.assessmentCadence
		).toHaveLength(2);
		expect(capstone.curriculum[0]?.content).toContain("required capstone");
	});
});

describe("complete Geometry B baseline", () => {
	it("retains all topic methods, examples, supplied exercises and capstone changed cases", async () => {
		setActivePinia(createPinia());
		const course = (await useCoursesStore().loadCourseById("geometry-b"))!;
		const corpus = course.modules
			.flatMap(module => [
				...module.curriculum,
				...module.supplementalProjects
			])
			.map(item => item.content)
			.join("\n");
		for (const unit of geometryCaseTracks.b.cases) {
			for (const piece of unit.reading.split(
				/(?=This course uses|A radius to a tangent)/
			))
				expect(corpus).toContain(piece.trim());
			expect(corpus).toContain(unit.worked);
			for (const problem of unit.problems)
				expect(corpus).toContain(problem);
		}
		for (const review of geometryCaseTracks.b.reviews) {
			for (const problem of review.problems)
				expect(corpus).toContain(problem);
		}
		const capstone = course.modules.find(module =>
			module.title.includes("and Geometry B Capstone")
		)!;
		const optional = capstone.supplementalProjects.find(item =>
			item.title.endsWith("Changed-Case Review")
		)!;
		expect(optional.learningPath ?? "choice").toBe("choice");
		expect(optional.content).toContain("A sign has vertices A=(0,0)");
		expect(corpus).not.toContain("http:");
	});
	it("fails missing topics and duplicate module bindings", () => {
		const missing = structuredClone(geometryBCourse);
		missing.modules[0].curriculum = [];
		expect(() => addGeometryCases(missing, "b")).toThrow("Missing");
		const duplicate = structuredClone(geometryBCourse);
		duplicate.modules.push(structuredClone(duplicate.modules[0]));
		expect(() => addGeometryCases(duplicate, "b")).toThrow("Duplicate");
		const duplicateReview = structuredClone(geometryBCourse);
		const reviewModule = duplicateReview.modules.find(module =>
			module.curriculum.some(item =>
				item.title.endsWith("Readiness Check")
			)
		)!;
		const original = reviewModule.curriculum.find(item =>
			item.title.endsWith("Readiness Check")
		)!;
		reviewModule.curriculum.push({
			...original,
			id: "duplicate-review",
			title: "Duplicate Readiness Check"
		});
		expect(() => addGeometryCases(duplicateReview, "b")).toThrow(
			"duplicate Geometry review"
		);
	});
});
