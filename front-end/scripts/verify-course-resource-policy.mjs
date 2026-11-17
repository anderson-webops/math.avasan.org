import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const frontendRoot = fileURLToPath(new URL("../", import.meta.url));
const sourceServer = await createServer({
	appType: "custom",
	configFile: false,
	root: frontendRoot,
	optimizeDeps: { include: [], noDiscovery: true },
	resolve: {
		alias: { "@": fileURLToPath(new URL("../src", import.meta.url)) }
	},
	server: { hmr: false, middlewareMode: true, watch: null }
});

try {
	const { verifyPublishedCourseResources } = await sourceServer.ssrLoadModule(
		"/scripts/verify-course-resource-policy.mts"
	);
	await verifyPublishedCourseResources();
	console.log(
		"[verify-course-resource-policy] published course links use HTTPS"
	);
} finally {
	await sourceServer.close();
}
