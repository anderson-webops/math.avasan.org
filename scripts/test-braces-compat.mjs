import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import test from "node:test";

const pluginRequire = createRequire(
	new URL("../front-end/node_modules/vite-plugin-vue-layouts-next/package.json", import.meta.url)
);
const globRequire = createRequire(pluginRequire.resolve("fast-glob"));
const micromatchRequire = createRequire(globRequire.resolve("micromatch"));
const braces = micromatchRequire("braces");
const micromatch = globRequire("micromatch");

test("build-tool dependency chain resolves the guarded local package", async () => {
	const lock = JSON.parse(await readFile(new URL("../package-lock.json", import.meta.url), "utf8"));
	assert.equal(lock.packages["node_modules/braces"].resolved, "vendor/braces");
	assert.equal(lock.packages["node_modules/braces"].link, true);
	assert.equal(lock.packages["vendor/braces"].version, "3.0.4-webops.1");
	for (const [name, entry] of Object.entries(lock.packages)) {
		if (name.endsWith("/braces") && entry.version) assert.equal(entry.version, "3.0.4-webops.1");
	}
	const manifest = JSON.parse(await readFile(micromatchRequire.resolve("braces/package.json"), "utf8"));
	assert.equal(manifest.version, "3.0.4-webops.1");
});

test("ordinary patterns retain compile, expand, stringify, and glob behavior", () => {
	assert.deepEqual(braces("a/{b,c}/d"), ["a/(b|c)/d"]);
	assert.deepEqual(braces.expand("a/{b,c}/d"), ["a/b/d", "a/c/d"]);
	assert.deepEqual(braces.expand("item-{1..3}"), ["item-1", "item-2", "item-3"]);
	assert.equal(braces.stringify("a/{b,c}/d"), "a/{b,c}/d");
	assert.deepEqual(micromatch(["foo-a", "foo-b", "foo-c"], "foo-{a,b}"), ["foo-a", "foo-b"]);
	assert.ok(braces.parse(`${"{".repeat(256)}x${"}".repeat(256)}`));
	assert.ok(braces.parse(`${"(".repeat(101)}x${")".repeat(101)}`));
});

test("deep strings are rejected before recursive walkers exhaust the stack", () => {
	for (const input of [
		`${"{".repeat(4000)}x${"}".repeat(4000)}`,
		`${"(".repeat(4000)}x${")".repeat(4000)}`
	]) {
		for (const operation of [braces.parse, braces.compile, braces.expand, braces.stringify, braces]) {
			assert.throws(() => operation(input), {
				name: "SyntaxError",
				message: "Brace pattern exceeds maximum nesting depth (256)"
			});
		}
	}
});

test("direct AST entry points cannot bypass the depth limit", () => {
	for (const operation of [braces.compile, braces.expand, braces.stringify]) {
		const ast = { type: "root", nodes: [] };
		let current = ast;
		for (let depth = 0; depth < 257; depth += 1) {
			const child = { type: "brace", nodes: [], parent: current };
			current.nodes.push(child);
			current = child;
		}
		current.nodes.push({ type: "text", value: "x", parent: current });
		assert.throws(() => operation(ast), {
			name: "SyntaxError",
			message: "Brace pattern exceeds maximum nesting depth (256)"
		});
	}
});

test("iterable AST nodes cannot bypass recursive walker guards", () => {
	const ast = { type: "root", nodes: new Set() };
	let current = ast;
	for (let depth = 0; depth < 257; depth += 1) {
		const child = { type: "brace", nodes: new Set(), parent: current };
		current.nodes.add(child);
		current = child;
	}
	current.nodes.add({ type: "text", value: "x", parent: current });
	for (const operation of [braces.compile, braces.stringify]) {
		assert.throws(() => operation(ast), {
			name: "SyntaxError",
			message: "Brace pattern exceeds maximum nesting depth (256)"
		});
	}
});
