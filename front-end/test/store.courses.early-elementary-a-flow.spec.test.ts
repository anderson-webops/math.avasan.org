import { describe, expect, it } from "vitest";
import { earlyElementaryAMaterials } from "@/stores/courses/earlyElementaryAMaterials";
import { applyEarlyElementaryAProjects } from "@/stores/courses/earlyElementaryAProjects";
import { expectElementaryMaterials } from "./elementaryMaterialAssertions";
import { loadRawCourse } from "@/stores/courses/index";
import { earlyElementaryMathACourse } from "@/stores/courses/elementary-math-courses";

const EXPECTED_MODULE_SEQUENCE = [
	"EEA1 Addition and Subtraction within 20",
	"EEA2 Addition and Subtraction within 100",
	"EEA3 Representing Word Problems",
	"EEA4 Module Project: Escape the Game",
	"EEA5 Measuring and Estimating Length in Standard Units",
	"EEA6 Relating Addition and Subtraction to Length",
	"EEA7 Module Project: The Longest Sandwich in California",
	"EEA8 Understanding Place Value",
	"EEA9 Adding and Subtracting within 200",
	"EEA10 Representing Advanced Word Problems",
	"EEA11 Adding and Subtracting within 1000",
	"EEA12 Strategies to Add and Subtract within 1000",
	"EEA13 Module Project: Going TikTok Famous",
	"Check-in #1",
	"EEA14 Working with Equal Groups",
	"EEA15 Partitioning Rectangles",
	"EEA16 Time",
	"EEA17 Money",
	"EEA18 Visualizing Data",
	"EEA19 Polygons and Circles",
	"EEA20 Module Project: The Next Hit iPhone",
	"Check-in #2"
];

function requireModule(title: string) {
	const module = earlyElementaryMathACourse.modules.find(
		(candidate) => candidate.title === title
	);
	if (!module)
		throw new Error(`Expected Early Elementary A module ${title}.`);
	return module;
}

describe("Early Elementary A math learner flow", () => {
	it("keeps the original mathematical progression without asset bookkeeping", () => {
		expect(
			earlyElementaryMathACourse.modules.map((module) => module.title)
		).toEqual(EXPECTED_MODULE_SEQUENCE);
		expect(
			earlyElementaryMathACourse.modules.some(
				(module) => module.title === "Pending Static Assets"
			)
		).toBe(false);
	});

	it("gives every module pacing, visual strategy targets, and explicit paths", () => {
		for (const module of earlyElementaryMathACourse.modules) {
			expect(module.estimatedTime, module.title).toMatch(/session/);
			expect(
				module.keyBlocks?.length,
				module.title
			).toBeGreaterThanOrEqual(5);
			expect(
				module.curriculum.every((item) => item.learningPath === "core"),
				module.title
			).toBe(true);
			expect(
				module.supplementalProjects.every((item) =>
					["choice", "challenge"].includes(item.learningPath ?? "")
				),
				module.title
			).toBe(true);
			expect(module.curriculum[0]?.content, module.title).toContain(
				"**Course flow:**"
			);
		}
	});

	it("preserves every authored activity while making extensions optional", async () => {
		await expectElementaryMaterials(
			"early-elementary-a-math",
			earlyElementaryMathACourse,
			earlyElementaryAMaterials
		);
		const normalized = (await loadRawCourse("early-elementary-a-math"))!;
		const aliased = structuredClone(earlyElementaryMathACourse);
		aliased.modules[0].curriculum[1].id = "authored-ladybug-task";
		aliased.modules[0].curriculum[1].aliases = ["historical-ladybug-task"];
		const retainedIdentity = structuredClone(normalized);
		const previousId = retainedIdentity.modules[0].curriculum[1].id;
		applyEarlyElementaryAProjects(retainedIdentity, aliased);
		expect(retainedIdentity.modules[0].curriculum[1].id).toBe(previousId);
		expect(retainedIdentity.modules[0].curriculum[1].aliases).toEqual(
			expect.arrayContaining([
				"authored-ladybug-task",
				"historical-ladybug-task"
			])
		);
		const duplicate = structuredClone(normalized);
		duplicate.modules.push(structuredClone(duplicate.modules[0]));
		expect(() =>
			applyEarlyElementaryAProjects(duplicate, earlyElementaryMathACourse)
		).toThrow("Expected one Elementary binding");
		const missing = structuredClone(earlyElementaryMathACourse);
		const duplicatedSource = structuredClone(earlyElementaryMathACourse);
		duplicatedSource.modules[0].curriculum.push(
			structuredClone(duplicatedSource.modules[0].curriculum[1])
		);
		expect(() =>
			applyEarlyElementaryAProjects(
				structuredClone(normalized),
				duplicatedSource
			)
		).toThrow("Duplicate Elementary source tasks");
		missing.modules[0].curriculum.splice(1, 1);
		expect(() =>
			applyEarlyElementaryAProjects(structuredClone(normalized), missing)
		).toThrow("Expected one Elementary binding");
		const requiredCount = earlyElementaryMathACourse.modules.reduce(
			(total, module) => total + module.curriculum.length,
			0
		);
		const optionCount = earlyElementaryMathACourse.modules.reduce(
			(total, module) => total + module.supplementalProjects.length,
			0
		);

		expect(requiredCount).toBe(48);
		expect(optionCount).toBe(44);
		expect(
			requireModule(
				"EEA4 Module Project: Escape the Game"
			).curriculum.map((item) => item.title)
		).toEqual([
			"Concepts: Escape the Game",
			"Escape the Game Character Budget",
			"Liang Escape Route Grid"
		]);
		expect(
			requireModule("EEA4 Module Project: Escape the Game")
				.curriculum.slice(1)
				.every((item) =>
					item.content.includes("**Completion evidence:**")
				)
		).toBe(true);
	});

	it("frames familiar scenarios as neutral math contexts", () => {
		expect(
			requireModule("EEA13 Module Project: Going TikTok Famous")
				.curriculum[0]?.content
		).toContain("no social-media account or platform use is needed");
		expect(
			requireModule("EEA20 Module Project: The Next Hit iPhone")
				.curriculum[0]?.content
		).toContain("not a purchase endorsement");
	});

	it("keeps unavailable source-image bookkeeping out of the learner flow", async () => {
		const course = await loadRawCourse("early-elementary-a-math");
		expect(course).not.toBeNull();

		const text = JSON.stringify(
			course!.modules.filter((module) => module.kind !== "appendix")
		);
		for (const filename of [
			"check_in_1_length_0.png",
			"check_in_2_money_1.png",
			"mfa18_pset1_0.png",
			"module_example.png"
		]) {
			expect(text).not.toContain(filename);
		}
		expect(
			course!.modules.find(
				(module) => module.title === "Pending Source Media Inventory"
			)?.kind
		).toBe("appendix");
	});
});
