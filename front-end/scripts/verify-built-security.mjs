import { access, readdir, readFile } from "node:fs/promises";
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

async function pathExists(target) {
	try {
		await access(target);
		return true;
	} catch {
		return false;
	}
}

const failures = [];
for (const file of await htmlFiles(distDir)) {
	const html = await readFile(file, "utf8");
	if (html.includes("window.__INITIAL_STATE__")) {
		failures.push(`${path.relative(distDir, file)} embeds initial state`);
	}
	if (/<script(?![^>]*\bsrc=)[^>]*>/i.test(html)) {
		failures.push(
			`${path.relative(distDir, file)} contains an inline script`
		);
	}
}

if (failures.length > 0) {
	throw new Error(
		`Built pages violate the production script policy:\n${failures.join("\n")}`
	);
}

const requiredFiles = [
	"404.html",
	"admin/index.html",
	"courses/index.html",
	"graph-sketcher/index.html",
	"index.html",
	"release.json",
	"sitemap.xml"
];
const forbiddenArtifacts = [
	".vite",
	"404/index.html",
	"admin.html",
	"courses.html",
	"graph-sketcher.html"
];
for (const relativePath of requiredFiles) {
	if (!(await pathExists(path.join(distDir, relativePath)))) {
		failures.push(`missing required static route artifact ${relativePath}`);
	}
}
for (const relativePath of forbiddenArtifacts) {
	if (await pathExists(path.join(distDir, relativePath))) {
		failures.push(
			`contains undeclared static route artifact ${relativePath}`
		);
	}
}

const sitemap = await readFile(path.join(distDir, "sitemap.xml"), "utf8");
const sitemapLocations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
	match => match[1]
);
const expectedSitemapLocations = [
	"https://math.avasan.org/",
	"https://math.avasan.org/courses/"
];
if (
	sitemapLocations.length !== expectedSitemapLocations.length ||
	!expectedSitemapLocations.every(location =>
		sitemapLocations.includes(location)
	)
) {
	failures.push(
		`contains unexpected sitemap routes: ${sitemapLocations.join(", ")}`
	);
}

if (failures.length > 0) {
	throw new Error(
		`Built pages violate the production route policy:\n${failures.join("\n")}`
	);
}

console.log(
	"[verify-built-security] built scripts and canonical static routes are verified"
);
