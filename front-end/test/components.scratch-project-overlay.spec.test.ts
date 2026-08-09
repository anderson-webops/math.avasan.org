import { enableAutoUnmount, flushPromises, mount } from "@vue/test-utils";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import ScratchProjectOverlay from "@/components/ScratchProjectOverlay.vue";
import {
	coordinateScratchGame,
	MATH_SCRATCH_INTERACTIVES
} from "@/config/math-interactives";

const originalShowModal = Object.getOwnPropertyDescriptor(
	HTMLDialogElement.prototype,
	"showModal"
);
const originalClose = Object.getOwnPropertyDescriptor(
	HTMLDialogElement.prototype,
	"close"
);

function installDialogMethod(name: "close" | "showModal", value: () => void) {
	Object.defineProperty(HTMLDialogElement.prototype, name, {
		configurable: true,
		value,
		writable: true
	});
}

function restoreDialogMethod(
	name: "close" | "showModal",
	descriptor: PropertyDescriptor | undefined
) {
	if (descriptor) {
		Object.defineProperty(HTMLDialogElement.prototype, name, descriptor);
		return;
	}

	delete (HTMLDialogElement.prototype as unknown as Record<string, unknown>)[
		name
	];
}

function mountOverlay() {
	return mount(ScratchProjectOverlay, {
		attachTo: document.body,
		props: coordinateScratchGame
	});
}

enableAutoUnmount(afterEach);

beforeAll(() => {
	installDialogMethod("showModal", function showModal(
		this: HTMLDialogElement
	) {
		this.setAttribute("open", "");
	});
	installDialogMethod("close", function close(this: HTMLDialogElement) {
		this.removeAttribute("open");
	});
});

afterAll(() => {
	restoreDialogMethod("showModal", originalShowModal);
	restoreDialogMethod("close", originalClose);
});

describe("ScratchProjectOverlay", () => {
	it("keeps one reviewed Math project unloaded until the student opens it", async () => {
		expect(MATH_SCRATCH_INTERACTIVES).toHaveLength(1);
		expect(MATH_SCRATCH_INTERACTIVES[0].projectId).toBe("1367463968");

		const wrapper = mountOverlay();
		const trigger = wrapper.get(".scratch-project-trigger");

		expect(trigger.text()).toBe("Play coordinate game on Scratch");
		expect(trigger.attributes("aria-haspopup")).toBe("dialog");
		expect(trigger.attributes("aria-expanded")).toBe("false");
		expect(wrapper.find("dialog").exists()).toBe(false);
		expect(wrapper.find("iframe").exists()).toBe(false);
		expect(wrapper.find("a").exists()).toBe(false);

		await trigger.trigger("click");
		await flushPromises();

		const dialog = wrapper.get("dialog");
		const frame = wrapper.get("iframe");
		expect(dialog.attributes("open")).toBe("");
		expect(dialog.attributes("aria-modal")).toBe("true");
		expect(frame.attributes("src")).toBe(
			"https://scratch.mit.edu/projects/1367463968/embed"
		);
		expect(frame.attributes("referrerpolicy")).toBe("no-referrer");
		expect(frame.attributes("sandbox")).toBe(
			"allow-scripts allow-same-origin"
		);
		expect(frame.attributes("allow")).toBe("fullscreen");
		expect(frame.attributes("allowfullscreen")).toBe("");
		expect(frame.attributes("allowtransparency")).toBe("true");
		expect(frame.attributes("width")).toBe("485");
		expect(frame.attributes("height")).toBe("402");
		expect(wrapper.find("a").exists()).toBe(false);
		expect(document.activeElement).toBe(
			wrapper.get(".scratch-project-close").element
		);

		const footerClose = wrapper.get(".scratch-project-close--footer");
		expect(
			frame.element.compareDocumentPosition(footerClose.element) &
				Node.DOCUMENT_POSITION_FOLLOWING
		).toBeTruthy();
		await footerClose.trigger("click");
		await flushPromises();

		expect(wrapper.find("dialog").exists()).toBe(false);
		expect(wrapper.find("iframe").exists()).toBe(false);
		expect(document.activeElement).toBe(trigger.element);
	});

	it("closes from the backdrop or Escape without closing from panel clicks", async () => {
		const wrapper = mountOverlay();
		const trigger = wrapper.get(".scratch-project-trigger");

		await trigger.trigger("click");
		await flushPromises();
		await wrapper.get(".scratch-project-panel").trigger("click");
		expect(wrapper.find("iframe").exists()).toBe(true);

		await wrapper.get("dialog").trigger("click");
		await flushPromises();
		expect(wrapper.find("iframe").exists()).toBe(false);
		expect(document.activeElement).toBe(trigger.element);

		await trigger.trigger("click");
		await flushPromises();
		const cancelEvent = new Event("cancel", { cancelable: true });
		wrapper.get("dialog").element.dispatchEvent(cancelEvent);
		await flushPromises();

		expect(cancelEvent.defaultPrevented).toBe(true);
		expect(wrapper.find("iframe").exists()).toBe(false);
		expect(document.activeElement).toBe(trigger.element);
	});
});
