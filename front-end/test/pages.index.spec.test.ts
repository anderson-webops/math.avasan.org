import { flushPromises, mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import { createMemoryHistory, createRouter } from "vue-router";
import TeacherAdminRedirectPage from "@/pages/admin.vue";
import HomePage from "@/pages/index.vue";
import MathCoursesPage from "@/pages/courses.vue";
import { courseCatalog } from "@/stores/courses/index";

vi.mock("@unhead/vue", () => ({
	useHead: vi.fn()
}));

describe("public home page", () => {
	it("opens Graph Sketcher as the primary homepage", async () => {
		const wrapper = mount(HomePage, {
			global: {
				stubs: {
					GraphSketcherWorkspace: {
						template:
							'<section data-testid="graph-sketcher"><h1>Graph Sketcher</h1></section>'
					}
				}
			}
		});

		await flushPromises();

		expect(wrapper.get("h1").text()).toBe("Graph Sketcher");
		expect(wrapper.get('[data-testid="graph-sketcher"]').exists()).toBe(
			true
		);
		expect(wrapper.find('[data-testid="course-explorer"]').exists()).toBe(
			false
		);
	});

	it("keeps the math catalog on its secondary page", async () => {
		const router = createRouter({
			history: createMemoryHistory(),
			routes: [{ path: "/courses/", component: MathCoursesPage }]
		});
		await router.push("/courses/");
		await router.isReady();
		const wrapper = mount(MathCoursesPage, {
			global: {
				plugins: [router],
				stubs: {
					CourseAssetReader: {
						props: ["asset", "course"],
						template:
							'<section data-testid="course-self-check" :data-asset="asset" :data-course="course"></section>'
					},
					CourseExplorer: {
						template:
							'<div data-testid="course-explorer">Course explorer</div>'
					}
				}
			}
		});

		await flushPromises();

		expect(wrapper.get("h1").text()).toBe("Math courses");
		expect(wrapper.get('[data-testid="course-explorer"]').exists()).toBe(
			true
		);
		expect(wrapper.text()).not.toMatch(/Log in|Sign up|Book a Class/i);
		const metadata = wrapper.get(
			'[itemtype="https://schema.org/ItemList"]'
		);
		expect(metadata.attributes()).toHaveProperty("hidden");
		const entries = metadata.findAll(
			'[itemtype="https://schema.org/Course"]'
		);
		expect(entries).toHaveLength(15);
		expect(
			entries.map(entry =>
				entry.get('meta[itemprop="name"]').attributes("content")
			)
		).toEqual(courseCatalog.map(course => course.name));
		entries.forEach((entry, index) => {
			expect(
				entry.get('meta[itemprop="position"]').attributes("content")
			).toBe(String(index + 1));
			const provider = entry.get('[itemprop="provider"]');
			expect(provider.attributes("itemtype")).toBe(
				"https://schema.org/Person"
			);
			expect(
				provider.get('meta[itemprop="name"]').attributes("content")
			).toBe("Julio");
			expect(
				provider.get('meta[itemprop="jobTitle"]').attributes("content")
			).toBe("Grade-school teacher");
		});
		expect(wrapper.find("script").exists()).toBe(false);
		const asset =
			"/course-assets/algebra-1/practice-checks-v1.md#checking-both-inverse-directions";
		await router.push({
			path: "/courses/",
			query: { asset, course: "algebra-1b" }
		});
		await flushPromises();
		expect(
			wrapper
				.get('[data-testid="course-self-check"]')
				.attributes("data-asset")
		).toBe(asset);
		expect(
			wrapper
				.get('[data-testid="course-self-check"]')
				.attributes("data-course")
		).toBe("algebra-1b");
		expect(wrapper.find('[data-testid="course-explorer"]').exists()).toBe(
			false
		);
		await router.push("/courses/");
		await flushPromises();
		expect(wrapper.get('[data-testid="course-explorer"]').exists()).toBe(
			true
		);
		wrapper.unmount();
	});

	it("hands /admin to the existing protected classroom Admin", () => {
		const wrapper = mount(TeacherAdminRedirectPage);
		const link = wrapper.get("a");

		expect(wrapper.get("h1").text()).toBe("Julio’s Admin");
		expect(link.attributes("href")).toBe("https://cs.avasan.org/admin");
		expect(link.attributes("rel")).toBe("noreferrer");
		expect(wrapper.text()).not.toMatch(/password|username|access code/i);
	});
});
