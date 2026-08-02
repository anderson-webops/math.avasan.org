import { mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import TheHeader from "@/components/TheHeader.vue";

vi.mock("vue-router", () => ({
	useRoute: () => ({ path: "/" })
}));

describe("TheHeader.vue", () => {
	function mountHeader() {
		return mount(TheHeader, {
			global: {
				stubs: {
					RouterLink: {
						props: ["to"],
						template: '<a :href="to"><slot /></a>'
					}
				}
			}
		});
	}

	it("shows only Graph Sketcher and math-course navigation", () => {
		const wrapper = mountHeader();
		const links = wrapper
			.findAll(".site-nav__link")
			.map(link => [link.text(), link.attributes("href")]);

		expect(wrapper.text()).toContain("Math with Julio");
		expect(wrapper.get(".site-brand").attributes("aria-label")).toBe(
			"Math with Julio home"
		);
		expect(links).toEqual([
			["Graph Sketcher", "/"],
			["Math courses", "/courses/"]
		]);
		expect(wrapper.text()).not.toMatch(
			/Admin|Log out|Student|Python IDE|Student privacy/
		);
		expect(wrapper.find(".site-nav__actions").exists()).toBe(false);
		expect(wrapper.text()).not.toMatch(
			/Sign up|Book a Class|Tuition|Zoom|Pathways|Teaching/
		);
	});
});
