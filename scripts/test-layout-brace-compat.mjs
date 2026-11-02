import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import test from "node:test";

const frontendRequire = createRequire(new URL("../front-end/package.json", import.meta.url));
const pluginRequire = createRequire(frontendRequire.resolve("vite-plugin-vue-layouts-next/package.json"));

test("layout plugin resolves the guarded local compatibility package", async () => {
	const lock = JSON.parse(await readFile(new URL("../package-lock.json", import.meta.url), "utf8"));
	assert.equal(lock.packages["node_modules/vite-plugin-vue-layouts-next"].version, "3.3.1");
	assert.equal(lock.packages["node_modules/brace-expansion"].resolved, "vendor/brace-expansion-compat");
	assert.equal(lock.packages["node_modules/brace-expansion"].link, true);
	assert.equal(lock.packages["node_modules/brace-expansion-core"].version, "5.0.12");
	assert.equal(lock.packages["vendor/brace-expansion-compat"].version, "5.0.12+webops.1");
	for (const [name, entry] of Object.entries(lock.packages)) {
		if (name.endsWith("/brace-expansion") && entry.version) {
			assert.equal(entry.version, "5.0.12+webops.1");
		}
	}
});

test("default import preserves ordinary layout brace expansion", async () => {
	const module = await import(pluginRequire.resolve("brace-expansion"));
	assert.equal(module.default, module.expand);
	assert.deepEqual(module.default("src/layouts/{default,admin}.vue"), [
		"src/layouts/default.vue",
		"src/layouts/admin.vue"
	]);
	assert.deepEqual(module.default("src/layouts/{1..3}.vue"), [
		"src/layouts/1.vue",
		"src/layouts/2.vue",
		"src/layouts/3.vue"
	]);
});
