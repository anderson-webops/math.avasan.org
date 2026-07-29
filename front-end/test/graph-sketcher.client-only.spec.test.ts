import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

describe("Graph Sketcher runtime boundary", () => {
	it("loads the editor and runtime only from the frontend bundle", () => {
		const route = readFileSync(
			resolve(process.cwd(), "src/pages/graph-sketcher.vue"),
			"utf8"
		);
		const appShell = readFileSync(
			resolve(process.cwd(), "src/App.vue"),
			"utf8"
		);
		const component = readFileSync(
			resolve(process.cwd(), "src/components/GraphSketcherWorkspace.vue"),
			"utf8"
		);
		const runtime = [
			"graphSketcher.ts",
			"graphSketcherArchive.ts",
			"graphSketcherFiles.ts",
			"graphSketcherSafety.ts"
		]
			.map(file =>
				readFileSync(
					resolve(process.cwd(), "src/modules", file),
					"utf8"
				)
			)
			.join("\n");
		const worker = readFileSync(
			resolve(
				process.cwd(),
				"src/workers/graphSketcherArchive.worker.ts"
			),
			"utf8"
		);

		expect(route).toContain(
			'import("@/components/GraphSketcherWorkspace.vue")'
		);
		expect(component).toContain("All rendering, imports, and");
		expect(component).toContain("exports run in this browser.");
		expect(`${component}\n${runtime}\n${worker}`).not.toMatch(
			/\b(?:fetch|XMLHttpRequest|sendBeacon|WebSocket|EventSource)\s*\(|\baxios\b|\/api\//
		);
		expect(appShell).not.toContain("cdn.jsdelivr.net");
		expect(runtime).not.toMatch(/\beval\s*\(|\bnew\s+Function\b/);
	});

	it("has no backend workspace or development API proxy", () => {
		const rootPackage = JSON.parse(
			readFileSync(resolve(process.cwd(), "../package.json"), "utf8")
		) as { scripts: Record<string, string>; workspaces: string[] };
		const viteConfig = readFileSync(
			resolve(process.cwd(), "vite.config.mts"),
			"utf8"
		);
		const dockerfile = readFileSync(
			resolve(process.cwd(), "../Dockerfile"),
			"utf8"
		);

		expect(rootPackage.workspaces).toEqual(["front-end"]);
		expect(rootPackage.scripts).not.toHaveProperty("server");
		expect(viteConfig).not.toContain('"/api"');
		expect(viteConfig).not.toContain("VITE_API_PROXY_TARGET");
		expect(dockerfile).not.toContain("back-end");
	});
});
