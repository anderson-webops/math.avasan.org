import { describe, expect, it } from "vitest";
import { loadRawCourse } from "@/stores/courses/index";
import { lateElementaryMathBCourse } from "@/stores/courses/elementary-math-courses";

const EXPECTED_MODULE_SEQUENCE = [
	"LEB1 Equivalent Fractions",
	"LEB2 Comparing and Ordering Fractions",
	"LEB3 Adding and Subtracting Fractions",
	"LEB4 Multiplying Fractions",
	"LEB5 Dividing Fractions",
	"LEB6 Module Project: Saving the Environment One Cake at a Time",
	"LEB7 Place Value with Decimals",
	"LEB8 Comparing and Rounding Decimals",
	"LEB9 Decimal Operations",
	"LEB10 Module Project: From Facebook to YouTube",
	"Check-in #1",
	"LEB11 Customary and Metric Units",
	"LEB12 Module Project: From Factory Line to Test Drive",
	"LEB13 Numerical Expressions",
	"LEB14 Multiplying by Two and Three Digit Numbers",
	"LEB15 Dividing by Two Digit Numbers",
	"LEB16 The Coordinate Plane",
	"LEB17 Patterns, Figures and Shapes in the Coordinate Plane",
	"LEB18 Module Project: Chanh's Space Adventure",
	"Check-in #2"
];

function requireModule(title: string) {
	const module = lateElementaryMathBCourse.modules.find(
		candidate => candidate.title === title
	);
	if (!module) throw new Error(`Expected Late Elementary B module ${title}.`);
	return module;
}

describe("Late Elementary B math learner flow", () => {
	it("keeps the fractions-to-coordinate progression without asset bookkeeping", () => {
		expect(
			lateElementaryMathBCourse.modules.map(module => module.title)
		).toEqual(EXPECTED_MODULE_SEQUENCE);
		expect(
			lateElementaryMathBCourse.modules.some(
				module => module.title === "Pending Static Assets"
			)
		).toBe(false);
		expect(EXPECTED_MODULE_SEQUENCE.indexOf("Check-in #1")).toBe(
			EXPECTED_MODULE_SEQUENCE.indexOf(
				"LEB11 Customary and Metric Units"
			) - 1
		);
	});

	it("gives every module pacing, representation targets, and explicit paths", () => {
		for (const module of lateElementaryMathBCourse.modules) {
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
		const requiredCount = lateElementaryMathBCourse.modules.reduce(
			(total, module) => total + module.curriculum.length,
			0
		);
		const optionCount = lateElementaryMathBCourse.modules.reduce(
			(total, module) => total + module.supplementalProjects.length,
			0
		);

		expect(requiredCount).toBe(46);
		expect(optionCount).toBe(40);
		expect(
			requireModule(
				"LEB10 Module Project: From Facebook to YouTube"
			).curriculum.map(item => item.title)
		).toEqual([
			"Concepts: From Facebook to YouTube",
			"Rahul YouTube Views Table",
			"Facebook Sharing Growth Goal",
			"Video Demographics Fraction Analysis"
		]);
		expect(
			requireModule("LEB18 Module Project: Chanh's Space Adventure")
				.curriculum.slice(1)
				.every(item =>
					item.content.includes("**Completion evidence:**")
				)
		).toBe(true);
	});

	it("marks supplied data and simulations with their instructional limits", () => {
		expect(
			requireModule(
				"LEB6 Module Project: Saving the Environment One Cake at a Time"
			).curriculum[0]?.content
		).toContain(
			"fixed classroom dataset rather than current factual claims"
		);
		expect(
			requireModule("LEB10 Module Project: From Facebook to YouTube")
				.curriculum[0]?.content
		).toContain("no account, posting, sharing, platform access");
		expect(
			requireModule("LEB18 Module Project: Chanh's Space Adventure")
				.curriculum[0]?.content
		).toContain("simplified toy model");
	});

	it("keeps unavailable source-image bookkeeping out of the learner flow", async () => {
		const course = await loadRawCourse("late-elementary-b-math");
		expect(course).not.toBeNull();

		const text = JSON.stringify(
			course!.modules.filter(module => module.kind !== "appendix")
		);
		for (const filename of [
			"checkin1_fractions_0.png",
			"checkin1_fractions_1.png",
			"leb16_concept1_0.png",
			"leb16_pset1_3.png",
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
