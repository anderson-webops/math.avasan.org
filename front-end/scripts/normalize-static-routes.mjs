import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, "../dist");

export async function normalizeStaticRoutes(targetDistDir = distDir) {
	await Promise.all([
		fs.rm(path.join(targetDistDir, ".vite"), {
			force: true,
			recursive: true
		}),
		fs.rm(path.join(targetDistDir, "404"), {
			force: true,
			recursive: true
		})
	]);

	const entries = await fs.readdir(targetDistDir, { withFileTypes: true });

	for (const entry of entries) {
		if (!entry.isFile() || !entry.name.endsWith(".html")) {
			continue;
		}

		const routeName = entry.name.slice(0, -".html".length);
		if (routeName === "index" || routeName === "404") {
			continue;
		}

		const sourcePath = path.join(targetDistDir, entry.name);
		const routeDirectory = path.join(targetDistDir, routeName);
		const targetIndexPath = path.join(routeDirectory, "index.html");

		await fs.mkdir(routeDirectory, { recursive: true });
		await fs.copyFile(sourcePath, targetIndexPath);
		await fs.rm(sourcePath);
		console.log(
			`[normalize-static-routes] moved ${entry.name} to ${path.relative(targetDistDir, targetIndexPath)}`
		);
	}
}

if (
	process.argv[1] &&
	import.meta.url === pathToFileURL(process.argv[1]).href
) {
	await normalizeStaticRoutes();
}
