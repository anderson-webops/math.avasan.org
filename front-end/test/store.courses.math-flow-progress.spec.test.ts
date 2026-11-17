import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it } from "vitest";
import { useCoursesStore } from "@/stores/courses";
import { isLessonLearningItem } from "@/modules/courseLessonPresentation";
import algebraBroadTitleHistory from "@/stores/courses/algebra-broad-title-progress-history.json";
import algebraHistory from "@/stores/courses/algebra-progress-history.json";
import { courseCatalog, loadRawCourse } from "@/stores/courses/index";
import { mathCourseSlugify } from "@/stores/courses/mathCourseFlow";
import priorCatalog from "./fixtures/math-v1027-identities.json";
import baselineProgress from "./fixtures/prealgebra-geometry-progress.json";
import {
	courseAssetViewerUrl,
	prealgebraCourseAssetCourses,
	prealgebraCourseAssetSources
} from "@/modules/courseAssetSourcesPrealgebra";
import { extractMarkdownSection } from "@/modules/courseAssetPreview";

interface MovedItemExpectation {
	courseId: string;
	moduleTitle: string;
	location: "curriculum" | "supplementalProjects";
	itemTitle: string;
	stableId: string;
	currentAlias: string;
}

describe("algebra historical progress aliases", () => {
	it("binds all 126 historical entries and five Math-only broad-title aliases without replacing Math IDs", async () => {
		setActivePinia(createPinia());
		expect(Object.keys(algebraHistory)).toEqual([
			"algebra-1a",
			"algebra-1b",
			"algebra-2a",
			"algebra-2b"
		]);
		expect(
			Object.values(algebraHistory).flatMap(entries =>
				Object.entries(entries)
			)
		).toHaveLength(126);
		expect(
			Object.values(algebraBroadTitleHistory)
				.flatMap(entries => Object.values(entries))
				.flat()
		).toHaveLength(5);
		for (const courseId of Object.keys(algebraHistory)) {
			const course = (await useCoursesStore().loadCourseById(courseId))!;
			const items = course.modules.flatMap(module => [
				...module.curriculum,
				...module.supplementalProjects
			]);
			const sources: Array<Record<string, Record<string, string[]>>> = [
				algebraHistory,
				algebraBroadTitleHistory
			];
			const raw = (await loadRawCourse(courseId))!;
			for (const module of raw.modules.filter(
				module => !module.internal
			)) {
				for (const section of [
					"curriculum",
					"supplementalProjects"
				] as const) {
					for (const item of module[section].filter(
						item => item.preserveInstructions
					)) {
						const itemId =
							item.id ??
							mathCourseSlugify(
								`${courseId}-${module.title}-${section === "curriculum" ? "curriculum" : "supplemental"}-${item.title}`
							);
						expect(
							items.find(candidate => candidate.id === itemId)
								?.content,
							item.title
						).toBe(item.content);
					}
				}
			}
			for (const source of sources) {
				for (const [canonical, aliases] of Object.entries(
					source[courseId] ?? {}
				)) {
					const matches = items.filter(
						item =>
							item.id === canonical ||
							item.aliases?.includes(canonical)
					);
					expect(matches, canonical).toHaveLength(1);
					for (const alias of aliases)
						expect(matches[0].aliases, canonical).toContain(alias);
				}
			}
		}
	});
});

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
	it("retains every prior Pre-Algebra and Geometry identity, alias and learning path", async () => {
		const store = useCoursesStore();
		for (const [courseId, previousModules] of Object.entries(
			baselineProgress.courses
		)) {
			const course = (await store.loadCourseById(courseId))!;
			expect(course.modules.map(module => module.title)).toEqual(
				previousModules.map(module => module.title)
			);
			for (const previous of previousModules) {
				const module = course.modules.find(
					module => module.id === previous.id
				)!;
				expect(module, previous.id).toBeDefined();
				for (const alias of previous.aliases)
					expect(module.aliases ?? []).toContain(alias);
				for (const section of [
					"curriculum",
					"supplementalProjects"
				] as const) {
					for (const item of previous[section]) {
						const matches = module[section].filter(
							candidate =>
								candidate.id === item.id ||
								candidate.aliases?.includes(item.id)
						);
						expect(matches, item.id).toHaveLength(1);
						for (const alias of item.aliases)
							expect([
								matches[0].id,
								...(matches[0].aliases ?? [])
							]).toContain(alias);
						expect(matches[0].learningPath, item.id).toBe(
							item.learningPath
						);
					}
				}
			}
		}
	});

	it("bundles each declared pack and resolves every supplied section within its course", async () => {
		for (const [path, loader] of Object.entries(
			prealgebraCourseAssetSources
		)) {
			const markdown = await loader();
			expect(
				new TextEncoder().encode(markdown).byteLength
			).toBeLessThanOrEqual(64 * 1024);
			const courseId = prealgebraCourseAssetCourses[path];
			const course = (await loadRawCourse(courseId))!;
			const corpus = JSON.stringify(course);
			const links = [...corpus.matchAll(/\/courses\/\?[^\s"\\)]+/g)].map(
				match => new URL(match[0], "https://math.avasan.org")
			);
			const selected = links.filter(
				url => url.searchParams.get("asset")?.split("#")[0] === path
			);
			expect(selected.length, path).toBeGreaterThan(10);
			for (const url of selected) {
				expect(url.searchParams.get("course")).toBe(courseId);
				const hash = url.searchParams.get("asset")!.split("#")[1];
				expect(
					extractMarkdownSection(markdown, hash).length
				).toBeGreaterThan(80);
			}
		}
		expect(() =>
			courseAssetViewerUrl("https://example.invalid/file.md")
		).toThrow("Unsupported");
		expect(() =>
			courseAssetViewerUrl(
				"/course-assets/pre-algebra-a/practice-checks-v1.md#../private"
			)
		).toThrow("Unsupported");
	});
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
		const fractions = course?.modules.find(
			module => module.title === "AB3 Fractions with Polynomials"
		);
		const warmup = fractions?.curriculum.find(
			item =>
				item.title === "Fractions Warm-Up and Least Common Denominators"
		);

		expect(warmup?.aliases).toContain(
			"algebra-1b-ab3-fractions-with-polynomials-curriculum-fractions-with-polynomials-core-concepts"
		);
	});
	it("keeps every configured Math sequence through public-store normalization", async () => {
		const store = useCoursesStore();
		for (const entry of courseCatalog) {
			const configured = await entry.load();
			const normalized = await loadRawCourse(entry.id);
			const published = await store.loadCourseById(entry.id);
			if (/^algebra-[12][ab]$/.test(entry.id)) {
				for (const module of published!.modules) {
					for (const item of [
						...module.curriculum,
						...module.supplementalProjects
					]) {
						if (item.contentKind)
							expect(isLessonLearningItem(item), item.id).toBe(
								item.contentKind === "reading"
							);
					}
				}
			}
			const prior = priorCatalog.courses.find(
				course => course.id === entry.id
			);
			expect(prior, entry.id).toBeDefined();
			for (const oldModule of prior!.modules) {
				const modules = published?.modules.filter(
					candidate =>
						candidate.id === oldModule.id ||
						candidate.aliases?.includes(oldModule.id)
				);
				expect(modules, oldModule.id).toHaveLength(1);
				const module = modules![0];
				for (const alias of oldModule.aliases)
					expect(
						[module.id, ...(module.aliases ?? [])],
						oldModule.id
					).toContain(alias);
				expect(module?.estimatedTime ?? null, oldModule.id).toBe(
					oldModule.estimatedTime
				);
				expect(module?.keyBlocks ?? null, oldModule.id).toEqual(
					oldModule.keyBlocks
				);
				for (const oldItem of oldModule.items) {
					const items =
						module &&
						[
							...module.curriculum,
							...module.supplementalProjects
						].filter(
							candidate =>
								candidate.id === oldItem.id ||
								candidate.aliases?.includes(oldItem.id)
						);
					expect(items, oldItem.id).toHaveLength(1);
					const item = items![0];
					for (const alias of oldItem.aliases)
						expect(
							[item?.id, ...(item?.aliases ?? [])],
							oldItem.id
						).toContain(alias);
				}
			}
			const coreKeys = configured.modules
				.filter(module => module.kind !== "appendix")
				.map(
					module =>
						module.id ??
						mathCourseSlugify(`${entry.id}-${module.title}`)
				);
			expect(
				normalized?.modules
					.filter(module => module.kind !== "appendix")
					.map(
						module =>
							module.id ??
							mathCourseSlugify(`${entry.id}-${module.title}`)
					),
				entry.id
			).toEqual(coreKeys);
			expect(
				published?.modules
					.filter(module => module.kind !== "appendix")
					.map(module => module.id),
				entry.id
			).toEqual(coreKeys);
		}
	});

	it("retains historical reference-archive and capstone bookmark identities", async () => {
		const store = useCoursesStore();
		for (const courseId of [
			"pre-algebra-a",
			"pre-algebra-b",
			"algebra-1a",
			"algebra-1b",
			"geometry-a",
			"geometry-b",
			"algebra-2a",
			"algebra-2b",
			"pre-calculus-a",
			"pre-calculus-b"
		]) {
			const course = await store.loadCourseById(courseId);
			const archive = course?.modules.find(module =>
				module.title.includes("Reference Archive")
			);
			expect(archive?.aliases, courseId).toContain(
				`${courseId}-source-activity-archive`
			);
			const scenario = archive?.curriculum.find(
				item => item.title === "Project Scenario and Context Links"
			);
			if (scenario)
				expect(scenario.aliases, courseId).toContain(
					`${courseId}-source-activity-archive-curriculum-project-scenario-and-context-links`
				);
		}
		const preAlgebra = await store.loadCourseById("pre-algebra-a");
		const capstone = preAlgebra?.modules.find(
			module => module.title === "Check-In #2 and Capstone"
		);
		const reference = capstone?.curriculum.find(
			item => item.title === "Pre-Algebra A Capstone Reference Map"
		);
		expect(reference?.aliases).toContain(
			"pre-algebra-a-check-in-2-and-capstone-curriculum-source-activity-anchors-pre-algebra-a-capstone"
		);
	});
});
