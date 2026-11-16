import { describe, expect, it } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useCoursesStore } from "@/stores/courses";
import { algebra1ACourse } from "@/stores/courses/algebra-1a";
import { applyAlgebra1APractice } from "@/stores/courses/algebra1APractice";
import practice from "@/stores/courses/algebra1APracticeData.json";
import readings from "@/stores/courses/algebra1ACourseReadingsData.json";
import { mathCourseSlugify } from "@/stores/courses/mathCourseFlow";
import { loadRawCourse } from "@/stores/courses/index";

const EXPECTED_MODULE_SEQUENCE = [
	"Algebra 1A Kick-Off and Placement",
	"AA1 Algebraic Properties",
	"AA2 Solving Single-Step Linear Equations",
	"AA3 Module Project: Movie Star Status (with Maddie Van Beek)",
	"AA4 Solving Multi-Step Linear Equations",
	"AA5 Module Project: Free Swag! (with Amisha Sisodiya)",
	"Check-In #1",
	"AA6 Slope and Rate of Change",
	"AA7 Module Project: Community Data Analysis (with Davin Lee)",
	"AA8 Slope-Intercept Form",
	"AA9 Point-Slope Form",
	"AA10 Graphing Inequalities",
	"AA11 Module Project: Predicting Avalanches (with Ruby Lee)",
	"Check-In #2",
	"AA12 Solving Linear Systems by Graphing",
	"AA13 Solving Linear Systems by Substitution",
	"AA14 Solving Linear Systems by Elimination",
	"AA15 Module Project: Cytogenetics Quest (with Dr. Renu Bajaj)",
	"AA16 Module Project: Battle of the Publications (with Konstantin Kaganovsky)",
	"Check-In #3",
	"AA17 Master Project: Algebra 1A"
];

function requireModule(title: string) {
	const module = algebra1ACourse.modules.find(
		candidate => candidate.title === title
	);
	if (!module) throw new Error(`Expected Algebra 1A module ${title}.`);
	return module;
}

describe("Algebra 1A learner flow", () => {
	it("places the systems checkpoint before the final project", () => {
		expect(
			algebra1ACourse.modules
				.filter(module => module.kind !== "appendix")
				.map(module => module.title)
		).toEqual(EXPECTED_MODULE_SEQUENCE);
		expect(
			algebra1ACourse.modules.find(
				module => module.title === "Reference Archive: Algebra 1A"
			)?.kind
		).toBe("appendix");
	});

	it("adds pacing, targets, flow notes, and explicit paths", () => {
		for (const module of algebra1ACourse.modules.filter(
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

	it("turns kickoff projects into a placement menu", () => {
		const kickoff = requireModule("Algebra 1A Kick-Off and Placement");
		expect(kickoff.curriculum.map(item => item.title)).toEqual([
			"Kick-Off Overview"
		]);
		expect(
			kickoff.supplementalProjects.map(item => item.learningPath)
		).toEqual(["choice", "choice", "challenge", "challenge"]);
		expect(kickoff.curriculum[0]?.content).toContain(
			"rather than completing four opening projects"
		);
	});

	it("keeps answer material optional and gates the capstone", () => {
		for (const title of [
			"AA3 Module Project: Movie Star Status (with Maddie Van Beek)",
			"AA15 Module Project: Cytogenetics Quest (with Dr. Renu Bajaj)",
			"AA16 Module Project: Battle of the Publications (with Konstantin Kaganovsky)"
		]) {
			expect(
				requireModule(title).supplementalProjects.some(
					item =>
						item.learningPath === "choice" &&
						/answer/i.test(item.title)
				)
			).toBe(true);
		}
		expect(
			requireModule("AA17 Master Project: Algebra 1A").curriculum[0]
				?.content
		).toContain("Begin only after the systems checkpoint");
	});
	it("publishes every authored reading and complete practice task without losing prior identities", async () => {
		setActivePinia(createPinia());
		const course = await useCoursesStore().loadCourseById("algebra-1a");
		if (!course) throw new Error("Expected public Algebra 1A.");
		expect(readings).toHaveLength(26);
		for (const entry of readings) {
			const module = course.modules.find(
				module =>
					module.title === entry.module ||
					module.id ===
						mathCourseSlugify(`algebra-1a-${entry.module}`)
			);
			const item =
				module &&
				[...module.curriculum, ...module.supplementalProjects].find(
					item => item.title === (entry.displayTitle ?? entry.title)
				);
			const expectedContent = entry.content
				.split(/\n\n\*\*(?:Concept path|Quick check|Goal):\*\*/, 1)[0]
				.trim();
			expect(item?.content, entry.title).toBe(expectedContent);
			expect(item?.preserveInstructions, entry.title).toBe(true);
			if (entry.displayTitle) {
				expect(item?.contentKind).toBe("reading");
				expect(item?.id).toBe(
					mathCourseSlugify(
						`${module?.id}-${module?.curriculum.includes(item!) ? "curriculum" : "supplemental"}-${entry.title}`
					)
				);
			}
		}
		for (const entry of practice) {
			const module = course.modules.find(
				module => module.title === entry.module
			);
			const item = module?.supplementalProjects.find(item =>
				item.title.includes(
					entry.kind === "practice"
						? "Standards Practice Set"
						: "Modeling or Error Analysis"
				)
			);
			expect(item?.contentKind).toBe("assignment");
			expect(item?.preserveAssignment).toBe(true);
			for (const question of entry.questions)
				expect(item?.content, entry.heading).toContain(question);
			expect(item?.content).toContain(
				"[Project self-check](/courses/?asset="
			);
		}
		expect(
			course.modules
				.flatMap(module => [
					...module.curriculum,
					...module.supplementalProjects
				])
				.filter(item => item.preserveInstructions)
		).toHaveLength(61);
		const raw = await loadRawCourse("algebra-1a");
		if (!raw) throw new Error("Expected Algebra practice fixture.");
		const altered = structuredClone(raw);
		const target = altered.modules.find(
			module =>
				module.title === "AA2 Solving Single-Step Linear Equations"
		)!;
		target.supplementalProjects = target.supplementalProjects.filter(
			item => !item.title.includes("Standards Practice Set")
		);
		expect(() => applyAlgebra1APractice(altered)).toThrow(
			"Missing Algebra 1A practice task"
		);
	});
});
