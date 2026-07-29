import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { flushPromises, mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import CourseExplorer from "@/components/CourseExplorer.vue";
import { useCoursesStore } from "@/stores/courses";

const expectedCourses = [
	[
		"early-elementary-a-math",
		"Early Elementary A: Numbers, Operations, and Measurement"
	],
	[
		"early-elementary-b-math",
		"Early Elementary B: Arithmetic, Fractions, and Geometry"
	],
	[
		"late-elementary-a-math",
		"Late Elementary A: Multiplication, Division, and Geometry"
	],
	[
		"late-elementary-b-math",
		"Late Elementary B: Fractions, Decimals, Units, and Coordinates"
	],
	["pre-algebra-a", "Pre-Algebra A"],
	["pre-algebra-b", "Pre-Algebra B"],
	["algebra-1a", "Algebra 1A"],
	["algebra-1b", "Algebra 1B"],
	["geometry-a", "Geometry A"],
	["geometry-b", "Geometry B"],
	["algebra-2a", "Algebra 2A"],
	["algebra-2b", "Algebra 2B"],
	["pre-calculus-a", "Pre-Calculus and Trigonometry A"],
	["pre-calculus-b", "Pre-Calculus and Trigonometry B"],
	["ap-calculus", "AP Calculus"]
];
const expectedCourseGroups = [
	"Elementary",
	"Pre-Algebra",
	"Algebra and Geometry",
	"Advanced"
];

function installLocalStorageStub() {
	const values = new Map<string, string>();
	Object.defineProperty(window, "localStorage", {
		configurable: true,
		value: {
			clear: () => values.clear(),
			getItem: (key: string) => values.get(key) ?? null,
			removeItem: (key: string) => values.delete(key),
			setItem: (key: string, value: string) => values.set(key, value)
		}
	});
}

function courseDefinition(id: string, name: string) {
	return {
		id,
		name,
		modules: [
			{
				id: `${id}-module`,
				title: "First steps",
				curriculum: [
					{
						id: `${id}-lesson`,
						title: "Try one idea",
						content: "Build a small project and test what happens."
					}
				],
				supplementalProjects: [
					{
						id: `${id}-project`,
						title: "Project: Make it yours",
						content: "Change one detail and run the project again."
					}
				]
			},
			{
				id: `${id}-next`,
				kind: "transition",
				title: "Where to go next",
				curriculum: [
					{
						id: `${id}-next-lesson`,
						title: "Choose the next course",
						content: "Review the next course when you are ready."
					}
				],
				supplementalProjects: []
			},
			{
				id: `${id}-reference`,
				kind: "appendix",
				title: "Reference",
				curriculum: [
					{
						id: `${id}-reference-item`,
						title: "Quick reference",
						content: "Keep these ideas nearby."
					}
				],
				supplementalProjects: []
			}
		]
	};
}

describe("CourseExplorer public catalog", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		installLocalStorageStub();
		window.localStorage.clear();
		window.history.replaceState({}, "", "/courses");
	});

	afterEach(() => {
		window.localStorage.clear();
		window.history.replaceState({}, "", "/courses");
		vi.restoreAllMocks();
	});

	async function mountPublicCatalog() {
		const pinia = createPinia();
		setActivePinia(pinia);
		const coursesStore = useCoursesStore();
		const loadCourse = vi
			.spyOn(coursesStore, "loadCourseById")
			.mockImplementation(async id => {
				const summary = [
					...coursesStore.courses,
					...coursesStore.archivedCourses
				].find(course => course.id === id);
				return summary
					? (courseDefinition(summary.id, summary.name) as any)
					: null;
			});

		const wrapper = mount(CourseExplorer, {
			global: {
				plugins: [pinia],
				stubs: {
					LazyMarkdownContent: {
						props: ["content"],
						template: "<p>{{ content }}</p>"
					}
				}
			}
		});
		await flushPromises();
		return { loadCourse, wrapper };
	}

	it("offers exactly the fifteen math courses in four groups", async () => {
		const { loadCourse, wrapper } = await mountPublicCatalog();
		const options = wrapper
			.findAll("#course-select option")
			.map(option => [option.attributes("value"), option.text()]);
		const groups = wrapper.findAll("#course-select optgroup");

		expect(options).toEqual(expectedCourses);
		expect(groups.map(group => group.attributes("label"))).toEqual(
			expectedCourseGroups
		);
		expect(groups.map(group => group.findAll("option").length)).toEqual([
			4, 2, 6, 3
		]);
		expect(wrapper.text()).toContain(
			"Early Elementary A: Numbers, Operations, and Measurement"
		);
		expect(wrapper.text()).toContain("AP Calculus");
		expect(wrapper.text()).not.toContain("Course preview");
		expect(wrapper.find(".course-stats").exists()).toBe(false);
		expect(wrapper.find("#learner-select").exists()).toBe(false);
		expect(
			wrapper.findAll(".outline-section-label").map(label => label.text())
		).toEqual(["Modules", "Next Steps", "References"]);
		expect(wrapper.find(".outline-button.is-transition").exists()).toBe(
			true
		);
		expect(wrapper.text()).not.toMatch(
			/assigned courses|learner context|log in|sign up/i
		);
		expect(wrapper.text()).not.toContain("Done");
		expect(loadCourse).toHaveBeenCalledWith("early-elementary-a-math");
	});

	it("switches directly between public courses", async () => {
		const { loadCourse, wrapper } = await mountPublicCatalog();

		await wrapper.get("#course-select").setValue("ap-calculus");
		await flushPromises();

		expect(loadCourse).toHaveBeenCalledWith("ap-calculus");
		expect(wrapper.get(".course-hero h2").text()).toBe("AP Calculus");
		expect(wrapper.text()).not.toContain("Course preview");
		expect(wrapper.text()).not.toContain("Use the browser workspace");
	});

	it("contains no account, API, or Python IDE imports", () => {
		const source = readFileSync(
			resolve(process.cwd(), "src/components/CourseExplorer.vue"),
			"utf8"
		);

		expect(source).not.toContain('from "@/api"');
		expect(source).not.toContain('from "@/stores/app"');
		expect(source).not.toContain('from "@/modules/pythonIde"');
		expect(source).not.toContain("learner");
		expect(source).not.toContain("progress");
		expect(source).not.toContain("solution");
		expect(source).not.toContain("CodePreview");
	});
});
