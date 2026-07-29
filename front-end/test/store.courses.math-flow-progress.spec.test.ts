import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it } from "vitest";
import { useCoursesStore } from "@/stores/courses";

interface MovedItemExpectation {
	courseId: string;
	moduleTitle: string;
	location: "curriculum" | "supplementalProjects";
	itemTitle: string;
	stableId: string;
	currentAlias: string;
}

const MOVED_ITEM_EXPECTATIONS: MovedItemExpectation[] = [
	{
		courseId: "pre-algebra-a",
		moduleTitle: "Pre-Algebra A Kick-Off",
		location: "supplementalProjects",
		itemTitle: "Project: Starting a Gardening Business",
		stableId:
			"pre-algebra-a-pre-algebra-a-kick-off-curriculum-project-starting-a-gardening-business",
		currentAlias:
			"pre-algebra-a-pre-algebra-a-kick-off-supplemental-project-starting-a-gardening-business"
	},
	{
		courseId: "pre-algebra-b",
		moduleTitle: "Pre-Algebra B Kick-Off",
		location: "supplementalProjects",
		itemTitle: "Project: Pre-Algebra B Readiness Map",
		stableId:
			"pre-algebra-b-pre-algebra-b-kick-off-curriculum-project-pre-algebra-b-readiness-map",
		currentAlias:
			"pre-algebra-b-pre-algebra-b-kick-off-supplemental-project-pre-algebra-b-readiness-map"
	},
	{
		courseId: "algebra-1a",
		moduleTitle: "Algebra 1A Kick-Off and Placement",
		location: "supplementalProjects",
		itemTitle: "Project 1: Managing a Restaurant",
		stableId:
			"algebra-1a-algebra-1a-kick-off-projects-curriculum-project-1-managing-a-restaurant",
		currentAlias:
			"algebra-1a-algebra-1a-kick-off-and-placement-supplemental-project-1-managing-a-restaurant"
	},
	{
		courseId: "algebra-1a",
		moduleTitle:
			"AA3 Module Project: Movie Star Status (with Maddie Van Beek)",
		location: "supplementalProjects",
		itemTitle: "Answer Key and Open-Ended Checks",
		stableId:
			"algebra-1a-aa3-module-project-movie-star-status-with-maddie-van-beek-curriculum-answer-key-and-open-ended-checks",
		currentAlias:
			"algebra-1a-aa3-module-project-movie-star-status-with-maddie-van-beek-supplemental-answer-key-and-open-ended-checks"
	},
	{
		courseId: "algebra-1b",
		moduleTitle: "Algebra 1B Kick-Off and Placement",
		location: "supplementalProjects",
		itemTitle: "Project 1: Amusement Park Shenanigans",
		stableId:
			"algebra-1b-algebra-1b-kick-off-project-curriculum-project-1-amusement-park-shenanigans",
		currentAlias:
			"algebra-1b-algebra-1b-kick-off-and-placement-supplemental-project-1-amusement-park-shenanigans"
	},
	{
		courseId: "geometry-a",
		moduleTitle: "Check-In #3 and Geometry A Capstone",
		location: "curriculum",
		itemTitle: "Capstone: Geometry A Design Defense",
		stableId:
			"geometry-a-check-in-3-and-geometry-a-capstone-supplemental-capstone-geometry-a-design-defense",
		currentAlias:
			"geometry-a-check-in-3-and-geometry-a-capstone-curriculum-capstone-geometry-a-design-defense"
	},
	{
		courseId: "geometry-b",
		moduleTitle: "Check-In #2 and Geometry B Capstone",
		location: "curriculum",
		itemTitle: "Capstone: Geometry B Design Defense",
		stableId:
			"geometry-b-check-in-2-and-geometry-b-capstone-supplemental-capstone-geometry-b-design-defense",
		currentAlias:
			"geometry-b-check-in-2-and-geometry-b-capstone-curriculum-capstone-geometry-b-design-defense"
	},
	{
		courseId: "algebra-2a",
		moduleTitle: "ALA3 Graphing Quadratic Functions",
		location: "supplementalProjects",
		itemTitle: "Graph Prompt Reference",
		stableId:
			"algebra-2a-ala3-graphing-quadratic-functions-curriculum-graph-prompt-reference",
		currentAlias:
			"algebra-2a-ala3-graphing-quadratic-functions-supplemental-graph-prompt-reference"
	},
	{
		courseId: "algebra-2b",
		moduleTitle: "ALB7 Data and Statistics",
		location: "supplementalProjects",
		itemTitle: "Data Visual References",
		stableId:
			"algebra-2b-alb7-data-and-statistics-curriculum-data-visual-references",
		currentAlias:
			"algebra-2b-alb7-data-and-statistics-supplemental-data-visual-references"
	},
	{
		courseId: "pre-calculus-a",
		moduleTitle: "Check-In #2 and Pre-Calculus A Capstone",
		location: "curriculum",
		itemTitle: "Capstone: Pre-Calculus A Modeling Portfolio",
		stableId:
			"pre-calculus-a-check-in-2-and-pre-calculus-a-capstone-supplemental-capstone-pre-calculus-a-modeling-portfolio",
		currentAlias:
			"pre-calculus-a-check-in-2-and-pre-calculus-a-capstone-curriculum-capstone-pre-calculus-a-modeling-portfolio"
	},
	{
		courseId: "pre-calculus-b",
		moduleTitle: "Check-In #2 and Pre-Calculus B Capstone",
		location: "curriculum",
		itemTitle: "Capstone: Pre-Calculus B Modeling Portfolio",
		stableId:
			"pre-calculus-b-check-in-2-and-pre-calculus-b-capstone-supplemental-capstone-pre-calculus-b-modeling-portfolio",
		currentAlias:
			"pre-calculus-b-check-in-2-and-pre-calculus-b-capstone-curriculum-capstone-pre-calculus-b-modeling-portfolio"
	}
];

describe("math course progress compatibility", () => {
	beforeEach(() => {
		setActivePinia(createPinia());
	});

	it("keeps prior IDs when activities move between learning paths", async () => {
		const store = useCoursesStore();

		for (const expectation of MOVED_ITEM_EXPECTATIONS) {
			const course = await store.loadCourseById(expectation.courseId);
			const module = course?.modules.find(
				candidate => candidate.title === expectation.moduleTitle
			);
			const item = module?.[expectation.location].find(
				candidate => candidate.title === expectation.itemTitle
			);

			expect(item?.id, expectation.itemTitle).toBe(expectation.stableId);
			expect(item?.aliases, expectation.itemTitle).toContain(
				expectation.currentAlias
			);
		}
	});

	it("keeps renamed Algebra kickoff module and item IDs", async () => {
		const store = useCoursesStore();

		for (const expectation of [
			{
				courseId: "algebra-1a",
				moduleTitle: "Algebra 1A Kick-Off and Placement",
				stableModuleId: "algebra-1a-algebra-1a-kick-off-projects",
				currentModuleAlias:
					"algebra-1a-algebra-1a-kick-off-and-placement",
				stableOverviewId:
					"algebra-1a-algebra-1a-kick-off-projects-curriculum-kick-off-overview",
				currentOverviewAlias:
					"algebra-1a-algebra-1a-kick-off-and-placement-curriculum-kick-off-overview"
			},
			{
				courseId: "algebra-1b",
				moduleTitle: "Algebra 1B Kick-Off and Placement",
				stableModuleId: "algebra-1b-algebra-1b-kick-off-project",
				currentModuleAlias:
					"algebra-1b-algebra-1b-kick-off-and-placement",
				stableOverviewId:
					"algebra-1b-algebra-1b-kick-off-project-curriculum-kick-off-overview",
				currentOverviewAlias:
					"algebra-1b-algebra-1b-kick-off-and-placement-curriculum-kick-off-overview"
			}
		]) {
			const course = await store.loadCourseById(expectation.courseId);
			const module = course?.modules.find(
				candidate => candidate.title === expectation.moduleTitle
			);
			const overview = module?.curriculum.find(
				item => item.title === "Kick-Off Overview"
			);

			expect(module?.id).toBe(expectation.stableModuleId);
			expect(module?.aliases).toContain(expectation.currentModuleAlias);
			expect(overview?.id).toBe(expectation.stableOverviewId);
			expect(overview?.aliases).toContain(
				expectation.currentOverviewAlias
			);
		}
	});

	it("maps the replaced Algebra 1B overview to its first new lesson", async () => {
		const course = await useCoursesStore().loadCourseById("algebra-1b");
		const warmup = course?.modules
			.find(module => module.title === "AB3 Fractions with Polynomials")
			?.curriculum.find(
				item =>
					item.title ===
					"Fractions Warm-Up and Least Common Denominators"
			);

		expect(warmup?.aliases).toContain(
			"algebra-1b-ab3-fractions-with-polynomials-curriculum-fractions-with-polynomials-core-concepts"
		);
	});
});
