import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const distDir = path.resolve(
	path.dirname(new URL(import.meta.url).pathname),
	"../dist"
);

async function htmlFiles(directory) {
	const entries = await readdir(directory, { withFileTypes: true });
	const files = await Promise.all(
		entries.map(entry => {
			const target = path.join(directory, entry.name);
			if (entry.isDirectory()) return htmlFiles(target);
			return entry.isFile() && entry.name.endsWith(".html")
				? [target]
				: [];
		})
	);
	return files.flat();
}

const failures = [];
for (const file of await htmlFiles(distDir)) {
	const html = await readFile(file, "utf8");
	if (html.includes("window.__INITIAL_STATE__")) {
		failures.push(`${path.relative(distDir, file)} embeds initial state`);
	}
	if (/<script(?![^>]*\bsrc=)[^>]*>/i.test(html)) {
		failures.push(`${path.relative(distDir, file)} contains an inline script`);
	}
}

if (failures.length > 0) {
	throw new Error(
		`Built pages violate the production script policy:\n${failures.join("\n")}`
	);
}

console.log("[verify-built-security] all built scripts are external");
