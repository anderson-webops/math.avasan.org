import { describe, expect, it } from "vitest";
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
		const capstone = requireModule(
			"Check-In #2 and Geometry B Capstone"
		);
		expect(capstone.curriculum.map(item => item.title)).toEqual([
			"Transformations and Solids Readiness Check",
			"Geometry B Capstone Synthesis",
			"Capstone: Geometry B Design Defense"
		]);
		expect(
			geometryBCourse.developmentMetadata?.assessmentCadence
		).toHaveLength(2);
		expect(capstone.curriculum[0]?.content).toContain(
			"required capstone"
		);
	});
});
