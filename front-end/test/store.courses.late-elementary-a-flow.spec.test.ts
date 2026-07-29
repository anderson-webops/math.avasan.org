import { describe, expect, it } from "vitest";
import { loadRawCourse } from "@/stores/courses/index";
import { lateElementaryMathACourse } from "@/stores/courses/elementary-math-courses";

const EXPECTED_MODULE_SEQUENCE = [
	"LEA1 Place Value",
	"LEA2 Comparing and Rounding",
	"LEA3 Addition and Subtraction",
	"LEA4 Module Project: Soccer Season",
	"LEA5 Factors and Multiples",
	"LEA6 Multiplication by One-Digit Numbers",
	"LEA7 Multiplication by Two-Digit Numbers",
	"LEA8 Division by One-Digit Numbers",
	"LEA9 Module Project: Invest-a-thon",
	"Check-in #1",
	"LEA10 Lines",
	"LEA11 Angles",
	"LEA12 Triangles",
	"LEA13 Module Project: An Obtuse Life",
	"LEA14 Polygons and Perimeter",
	"LEA15 Quadrilaterals",
	"LEA16 Area and Volume",
	"LEA17 Module Project: The LA River Master Plan",
	"Check-in #2"
];

function requireModule(title: string) {
	const module = lateElementaryMathACourse.modules.find(
		candidate => candidate.title === title
	);
	if (!module) throw new Error(`Expected Late Elementary A module ${title}.`);
	return module;
}

describe("Late Elementary A math learner flow", () => {
	it("keeps separate operations and geometry arcs without asset bookkeeping", () => {
		expect(
			lateElementaryMathACourse.modules.map(module => module.title)
		).toEqual(EXPECTED_MODULE_SEQUENCE);
		expect(
			lateElementaryMathACourse.modules.some(
				module => module.title === "Pending Static Assets"
			)
		).toBe(false);
		expect(EXPECTED_MODULE_SEQUENCE.indexOf("Check-in #1")).toBe(
			EXPECTED_MODULE_SEQUENCE.indexOf("LEA10 Lines") - 1
		);
	});

	it("gives every module pacing, model targets, and explicit paths", () => {
		for (const module of lateElementaryMathACourse.modules) {
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

	it("preserves every authored activity while making extensions optional", () => {
		const requiredCount = lateElementaryMathACourse.modules.reduce(
			(total, module) => total + module.curriculum.length,
			0
		);
		const optionCount = lateElementaryMathACourse.modules.reduce(
			(total, module) => total + module.supplementalProjects.length,
			0
		);

		expect(requiredCount).toBe(43);
		expect(optionCount).toBe(38);
		expect(
			requireModule("LEA9 Module Project: Invest-a-thon").curriculum.map(
				item => item.title
			)
		).toEqual([
			"Concepts: Invest-a-thon",
			"Arielle Investment Stage Split",
			"Arielle Company Portfolio Choice",
			"Arielle Reinvestment Growth Plan"
		]);
		expect(
			requireModule("LEA17 Module Project: The LA River Master Plan")
				.curriculum.slice(1)
				.every(item =>
					item.content.includes("**Completion evidence:**")
				)
		).toBe(true);
	});

	it("keeps project contexts safe and instructional", () => {
		expect(
			requireModule("LEA9 Module Project: Invest-a-thon").curriculum[0]
				?.content
		).toContain("not investment advice");
		expect(
			requireModule("LEA13 Module Project: An Obtuse Life").curriculum[0]
				?.content
		).toContain("no one needs to photograph people or private spaces");
	});

	it("keeps unavailable source-image bookkeeping out of the learner flow", async () => {
		const course = await loadRawCourse("late-elementary-a-math");
		expect(course).not.toBeNull();

		const text = JSON.stringify(
			course!.modules.filter(module => module.kind !== "appendix")
		);
		for (const filename of [
			"check_in_1_multiplication_0.png",
			"check_in_2_lines_5.png",
			"maa7_pset1_10.png",
			"maa7_pset3_9.png",
			"module_example.png"
		]) {
			expect(text).not.toContain(filename);
		}
		expect(
			course!.modules.find(
				module => module.title === "Pending Source Media Inventory"
			)?.kind
		).toBe("appendix");
	});
});
