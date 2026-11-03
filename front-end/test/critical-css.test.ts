import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { createCriticalCssRenderer } from "../scripts/critical-css.mts";

let directory: string;
const stylesheet = ".graph{color:red}.course{color:blue}.dialog{display:grid}";

beforeEach(async () => {
	directory = await mkdtemp(join(tmpdir(), "math-critical-css-"));
	await writeFile(join(directory, "styles.css"), stylesheet);
});

afterEach(async () => {
	if (directory) await rm(directory, { recursive: true });
});

function documentFor(className: string) {
	return `<!doctype html><html lang="en"><head><title>Math</title><link rel="stylesheet" href="/styles.css"><style>.interactive{display:grid}</style><script defer src="/app.js"></script></head><body><main class="${className}">Math</main></body></html>`;
}

describe("independent modern critical CSS rendering", () => {
	it("inlines matching CSS while retaining the complete stylesheet", async () => {
		const rendered = await createCriticalCssRenderer(directory)(
			documentFor("graph")
		);
		const document = new DOMParser().parseFromString(rendered, "text/html");
		const styles = [...document.querySelectorAll("style")]
			.map(style => style.textContent)
			.join("");
		expect(styles).toContain(".graph{color:red}");
		expect(styles).not.toContain(".course{");
		expect(styles).toContain(".interactive{display:grid}");
		expect(
			document
				.querySelector('link[rel="stylesheet"]')
				?.getAttribute("href")
		).toBe("/styles.css");
		expect(await readFile(join(directory, "styles.css"), "utf8")).toBe(
			stylesheet
		);
	});

	it("requires no inline scripts or event handlers and works without JavaScript", async () => {
		const rendered = await createCriticalCssRenderer(directory)(
			documentFor("course")
		);
		const document = new DOMParser().parseFromString(rendered, "text/html");
		expect(
			[...document.querySelectorAll("script")].every(script =>
				Boolean(script.src)
			)
		).toBe(true);
		expect(
			[...document.querySelectorAll("*")].some(element =>
				[...element.attributes].some(attribute =>
					/^on/i.test(attribute.name)
				)
			)
		).toBe(false);
		expect(
			document.body.querySelector('link[rel="stylesheet"]')
		).not.toBeNull();
		expect(document.querySelector("main")?.textContent).toBe("Math");
	});

	it("isolates critical styles between concurrently rendered routes", async () => {
		const render = createCriticalCssRenderer(directory);
		const [graph, course] = await Promise.all([
			render(documentFor("graph")),
			render(documentFor("course"))
		]);
		const parse = (html: string) =>
			new DOMParser().parseFromString(html, "text/html");
		const styles = (html: string) =>
			[...parse(html).querySelectorAll("style")]
				.map(style => style.textContent)
				.join("");
		expect(styles(graph)).toContain(".graph{color:red}");
		expect(styles(graph)).not.toContain(".course{");
		expect(styles(course)).toContain(".course{color:blue}");
		expect(styles(course)).not.toContain(".graph{");
		expect(await readFile(join(directory, "styles.css"), "utf8")).toBe(
			stylesheet
		);
	});

	it("fails the build when a required stylesheet is missing", async () => {
		await rm(join(directory, "styles.css"));
		const render = createCriticalCssRenderer(directory);
		await expect(render(documentFor("graph"))).rejects.toThrow(
			"Critical CSS generation failed"
		);
		await expect(render(documentFor("graph"))).rejects.toThrow(
			"Critical CSS generation failed"
		);
	});
});
