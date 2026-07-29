import { describe, expect, it } from "vitest";
import { loadRawCourse } from "@/stores/courses/index";
import { earlyElementaryMathBCourse } from "@/stores/courses/elementary-math-courses";

const EXPECTED_MODULE_SEQUENCE = [
	"EEB1 Adding and Subtracting within 1000",
	"EEB2 Strategies to Add and Subtract within 1000",
	"EEB3 Multiplying and Dividing within 100",
	"EEB4 Properties of Multiplication and Division",
	"EEB5 Multiplication and Division Word Problems",
	"EEB6 Applying the Four Operations",
	"EEB7 Multiples of 10",
	"EEB8 Module Project: Using Science For Good",
	"Check-in #1",
	"EEB9 Units of Measurement",
	"EEB10 Area",
	"EEB11 Module Project: Investing for the Future",
	"EEB12 Partitioning Shapes",
	"EEB13 Fractions as Numbers",
	"EEB14 Represent and Interpret Data",
	"EEB15 Perimeter",
	"EEB16 Quadrilaterals",
	"EEB17 Module Project: 2001: A Warehouse Odyssey",
	"Check-in #2"
];

function requireModule(title: string) {
	const module = earlyElementaryMathBCourse.modules.find(
		candidate => candidate.title === title
	);
	if (!module)
		throw new Error(`Expected Early Elementary B module ${title}.`);
	return module;
}

describe("Early Elementary B math learner flow", () => {
	it("keeps the operation-to-geometry progression without asset bookkeeping", () => {
		expect(
			earlyElementaryMathBCourse.modules.map(module => module.title)
		).toEqual(EXPECTED_MODULE_SEQUENCE);
		expect(
			earlyElementaryMathBCourse.modules.some(
				module => module.title === "Pending Static Assets"
			)
		).toBe(false);
	});

	it("gives every module pacing, representation targets, and explicit paths", () => {
		for (const module of earlyElementaryMathBCourse.modules) {
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
		const requiredCount = earlyElementaryMathBCourse.modules.reduce(
			(total, module) => total + module.curriculum.length,
			0
		);
		const optionCount = earlyElementaryMathBCourse.modules.reduce(
			(total, module) => total + module.supplementalProjects.length,
			0
		);

		expect(requiredCount).toBe(42);
		expect(optionCount).toBe(38);
		expect(
			requireModule(
				"EEB8 Module Project: Using Science For Good"
			).curriculum.map(item => item.title)
		).toEqual([
			"Concepts: Using Science For Good",
			"Fritz Four-Week Dosage Budget",
			"Fritz Updated Dosage Plan"
		]);
		expect(
			requireModule("EEB17 Module Project: 2001: A Warehouse Odyssey")
				.curriculum.slice(1)
				.every(item =>
					item.content.includes("**Completion evidence:**")
				)
		).toBe(true);
	});

	it("keeps health and investment contexts inside safe math boundaries", () => {
		expect(
			requireModule("EEB8 Module Project: Using Science For Good")
				.curriculum[0]?.content
		).toContain("Do not infer, recommend, or apply any dosage");
		expect(
			requireModule("EEB11 Module Project: Investing for the Future")
				.curriculum[0]?.content
		).toContain("not real investment advice");
	});

	it("keeps unavailable source-image bookkeeping out of the learner flow", async () => {
		const course = await loadRawCourse("early-elementary-b-math");
		expect(course).not.toBeNull();

		const text = JSON.stringify(
			course!.modules.filter(module => module.kind !== "appendix")
		);
		for (const filename of [
			"checkin2_app_0.png",
			"checkin2_gm_4.png",
			"mfb10_concept1_0.png",
			"mfb14_pset1_4.png",
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
