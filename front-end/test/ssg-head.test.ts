import { useHead } from "@unhead/vue";
import { renderToString } from "@vue/server-renderer";
import { describe, expect, it, vi } from "vitest";
import { createApp, createSSRApp, h, ref } from "vue";
import { createMemoryHistory, createRouter } from "vue-router";
import App from "../src/App.vue";
import {
	SITE_DESCRIPTION,
	SITE_TITLE,
	SITE_URL
} from "../src/modules/pageHead";
import {
	createClientSsgHeadBridge,
	createServerSsgHeadBridge,
	installSsgHeadBridge,
	renderSsgDocumentHead
} from "../src/utils/ssgHead";

async function renderRoute(title: string) {
	const app = createSSRApp({
		setup() {
			useHead({
				title,
				htmlAttrs: { lang: "en" },
				meta: [
					{ name: "description", content: `${title} description` }
				],
				link: [
					{
						rel: "canonical",
						href: "https://math.avasan.org/courses/"
					}
				],
				script: [
					{
						key: "product-data",
						type: "application/ld+json",
						innerHTML: JSON.stringify({
							"@type": "Product",
							name: title
						})
					}
				]
			});
			return () => h("main", title);
		}
	});
	const context = installSsgHeadBridge({ app }, createServerSsgHeadBridge());
	const body = await renderToString(app);
	const initialState =
		'<script id="state" type="application/json">{"safe":"\\u003c"}</script>';
	const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Old title</title><meta name="description" content="Old description"><script src="/color-mode.js"></script></head><body><div id="app">${body}</div>${initialState}</body></html>`;
	return {
		context,
		html: renderSsgDocumentHead(html, context),
		body,
		initialState
	};
}

describe("Unhead 3 SSG integration", () => {
	it("preserves site structured metadata without adding any inline script", async () => {
		const app = createSSRApp(App);
		const router = createRouter({
			history: createMemoryHistory(),
			routes: [
				{
					path: "/",
					component: { render: () => h("main", "Graph Sketcher") }
				}
			]
		});
		app.use(router);
		const context = installSsgHeadBridge(
			{ app },
			createServerSsgHeadBridge()
		);
		await router.push("/");
		await router.isReady();
		const body = await renderToString(app);
		const html = renderSsgDocumentHead(
			`<!doctype html><html><head></head><body>${body}</body></html>`,
			context
		);
		const document = new DOMParser().parseFromString(html, "text/html");
		const metadata = document.querySelector(
			'[itemtype="https://schema.org/WebSite"]'
		);
		expect(metadata?.hasAttribute("itemscope")).toBe(true);
		expect(metadata?.hasAttribute("hidden")).toBe(true);
		expect(
			metadata
				?.querySelector('[itemprop="name"]')
				?.getAttribute("content")
		).toBe(SITE_TITLE);
		expect(
			metadata
				?.querySelector('[itemprop="description"]')
				?.getAttribute("content")
		).toBe(SITE_DESCRIPTION);
		expect(
			metadata?.querySelector('[itemprop="url"]')?.getAttribute("href")
		).toBe(SITE_URL);
		expect(document.querySelectorAll("script")).toHaveLength(0);
		expect(document.title).toBe(SITE_TITLE);
	});
	it("renders Vue metadata without passing the head to the legacy renderer", async () => {
		const rendered = await renderRoute("Graphs & courses");
		const document = new DOMParser().parseFromString(
			rendered.html,
			"text/html"
		);
		expect(rendered.context.head).toBeUndefined();
		expect(document.title).toBe("Graphs & courses");
		expect(document.querySelectorAll("title")).toHaveLength(1);
		expect(
			document.querySelectorAll('meta[name="description"]')
		).toHaveLength(1);
		expect(
			document
				.querySelector('meta[name="description"]')
				?.getAttribute("content")
		).toBe("Graphs & courses description");
		expect(document.documentElement.lang).toBe("en");
		expect(
			document
				.querySelector('link[rel="canonical"]')
				?.getAttribute("href")
		).toBe("https://math.avasan.org/courses/");
		expect(
			JSON.parse(
				document.querySelector('script[type="application/ld+json"]')
					?.textContent || "{}"
			)
		).toEqual({ "@type": "Product", name: "Graphs & courses" });
	});

	it("preserves static assets, body markup and inert initial state", async () => {
		const rendered = await renderRoute("Graph");
		const document = new DOMParser().parseFromString(
			rendered.html,
			"text/html"
		);
		expect(document.querySelectorAll('meta[charset="utf-8"]')).toHaveLength(
			1
		);
		expect(
			document.querySelectorAll('script[src="/color-mode.js"]')
		).toHaveLength(1);
		expect(rendered.html).toContain(`<div id="app">${rendered.body}</div>`);
		expect(rendered.html).toContain(rendered.initialState);
		expect(rendered.html).toMatch(/^<!doctype html>/i);
	});

	it("isolates metadata between independently rendered routes", async () => {
		const [first, second] = await Promise.all([
			renderRoute("First graph"),
			renderRoute("Second graph")
		]);
		expect(first.html).toContain("First graph");
		expect(first.html).not.toContain("Second graph");
		expect(second.html).toContain("Second graph");
		expect(second.html).not.toContain("First graph");
	});

	it("rejects an already installed legacy head", () => {
		expect(() =>
			installSsgHeadBridge(
				{ app: createSSRApp({}), head: {} },
				createServerSsgHeadBridge()
			)
		).toThrow("Disable the legacy SSG head");
	});

	it.each([null, undefined, {}, { renderDocumentHead: "not a function" }])(
		"fails closed when the document renderer is missing: %s",
		context => {
			expect(() =>
				renderSsgDocumentHead("<html></html>", context)
			).toThrow("Missing SSG document head renderer");
		}
	);

	it("rejects a renderer that does not return HTML", () => {
		expect(() =>
			renderSsgDocumentHead("<html></html>", {
				renderDocumentHead: () => undefined
			})
		).toThrow("must return HTML");
	});

	it("does not serialize browser state as a server document", () => {
		expect(() =>
			createClientSsgHeadBridge().renderDocumentHead("<html></html>")
		).toThrow("requires a server context");
	});

	it("updates and removes reactive browser head entries", async () => {
		const title = ref("Initial graph");
		const app = createApp({
			setup() {
				useHead(() => ({
					title: title.value,
					meta: [{ name: "bridge-description", content: title.value }]
				}));
				return () => h("main", title.value);
			}
		});
		const container = document.createElement("div");
		document.body.append(container);
		installSsgHeadBridge({ app }, createClientSsgHeadBridge());
		try {
			app.mount(container);
			await vi.waitFor(() =>
				expect(document.title).toBe("Initial graph")
			);
			title.value = "Updated graph";
			await vi.waitFor(() => {
				expect(document.title).toBe("Updated graph");
				expect(
					document
						.querySelector('meta[name="bridge-description"]')
						?.getAttribute("content")
				).toBe("Updated graph");
			});
		} finally {
			app.unmount();
			container.remove();
		}
		await vi.waitFor(() =>
			expect(
				document.querySelector('meta[name="bridge-description"]')
			).toBeNull()
		);
	});
});
