import { describe, expect, it } from "vitest";
import { geometryACourse } from "@/stores/courses/geometry-a";

const EXPECTED_MODULE_SEQUENCE = [
	"Geometry A Foundations: Definitions, Logic, and Proofs",
	"GEOA4-GEOA5 Lines, Angles, and Coordinate Geometry",
	"Check-In #1: Foundations and Lines",
	"GEOA6-GEOA9 Triangles, Congruence, Similarity, and Right Triangles",
	"Check-In #2: Triangle Relationships",
	"GEOA10-GEOA13 Triangle Centers, Inequalities, and Trigonometry",
	"Check-In #3 and Geometry A Capstone"
];

function requireModule(title: string) {
	const module = geometryACourse.modules.find(
		candidate => candidate.title === title
	);
	if (!module) throw new Error(`Expected Geometry A module ${title}.`);
	return module;
}

describe("Geometry A learner flow", () => {
	it("keeps the proof-to-trigonometry spine ahead of appendices", () => {
		expect(
			geometryACourse.modules
				.filter(module => module.kind !== "appendix")
				.map(module => module.title)
		).toEqual(EXPECTED_MODULE_SEQUENCE);
		expect(
			geometryACourse.modules
				.filter(module => module.kind === "appendix")
				.map(module => module.title)
		).toEqual(["Geometry A Reference Archive", "Pending Static Assets"]);
	});

	it("adds pacing, evidence targets, flow notes, and explicit paths", () => {
		for (const module of geometryACourse.modules.filter(
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

	it("keeps proof and theorem challenges optional", () => {
		expect(
			requireModule(
				"Geometry A Foundations: Definitions, Logic, and Proofs"
			).supplementalProjects.find(
				item => item.title === "Project: Proof Repair Lab"
			)?.learningPath
		).toBe("challenge");
		expect(
			requireModule("Check-In #2: Triangle Relationships")
				.supplementalProjects.find(
					item => item.title === "Project: Pythagorean Error Repair"
				)?.learningPath
		).toBe("challenge");
	});

	it("promotes the design defense into the required capstone path", () => {
		const capstone = requireModule(
			"Check-In #3 and Geometry A Capstone"
		);
		expect(capstone.curriculum.map(item => item.title)).toEqual([
			"Final Readiness Check",
			"Capstone: Geometry A Design Defense"
		]);
		expect(capstone.supplementalProjects).toEqual([
			expect.objectContaining({
				learningPath: "choice",
				title: "Project: Geometry A Portfolio Audit"
			})
		]);
		expect(capstone.curriculum[0]?.content).toContain(
			"The capstone is required"
		);
	});
});
