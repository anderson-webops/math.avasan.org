import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const requiredPolicy =
	"default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; media-src 'self' blob: https:; font-src 'self' data:; connect-src 'self'; worker-src 'self' blob:; frame-src 'none'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'";

describe("production browser security policy", () => {
	it("keeps executable scripts external and compatible with the CSP", () => {
		const html = readFileSync(resolve(process.cwd(), "index.html"), "utf8");
		const themeScript = readFileSync(
			resolve(process.cwd(), "public/theme.js"),
			"utf8"
		);

		expect(html).toContain('<script src="/theme.js"></script>');
		expect(html).not.toMatch(/<script(?![^>]*\bsrc=)[^>]*>\s*\S/i);
		expect(themeScript).not.toMatch(
			/\b(?:fetch|XMLHttpRequest|sendBeacon)\b/
		);
	});

	it("does not require inline state scripts in the production build", () => {
		const piniaModule = readFileSync(
			resolve(process.cwd(), "src/modules/pinia.ts"),
			"utf8"
		);
		const packageManifest = JSON.parse(
			readFileSync(resolve(process.cwd(), "package.json"), "utf8")
		) as { scripts: Record<string, string> };

		expect(piniaModule).not.toContain("initialState");
		expect(packageManifest.scripts.build).toContain(
			"verify-built-security.mjs"
		);
	});

	it("ships a small branded page for true 404 responses", () => {
		const notFound = readFileSync(
			resolve(process.cwd(), "public/404.html"),
			"utf8"
		);

		expect(notFound).toContain("Page not found");
		expect(notFound).toContain("Math with Julio");
		expect(notFound).toContain('href="/"');
		expect(notFound).not.toMatch(/<script\b/i);
	});

	it("uses the restrictive frame and script policy on the native host", () => {
		const nginx = readFileSync(
			resolve(process.cwd(), "../deploy/nginx/server-policy.conf"),
			"utf8"
		);

		expect(nginx).toContain(requiredPolicy);
		expect(nginx).toContain("Strict-Transport-Security");
		expect(nginx).toContain('Cross-Origin-Opener-Policy "same-origin"');
		expect(nginx).toContain('Cross-Origin-Resource-Policy "same-origin"');
		expect(nginx).toContain("includeSubDomains");
		expect(nginx).not.toContain("frame-src 'self'");
		expect(nginx).not.toContain("script-src 'unsafe-inline'");
	});

	it("keeps one production build and excludes unsupported deploy configurations", () => {
		const repositoryRoot = resolve(process.cwd(), "..");

		expect(existsSync(resolve(repositoryRoot, "netlify.toml"))).toBe(false);
		expect(existsSync(resolve(repositoryRoot, "Dockerfile"))).toBe(false);
		expect(existsSync(resolve(repositoryRoot, ".dockerignore"))).toBe(
			false
		);
		expect(
			existsSync(
				resolve(
					repositoryRoot,
					".github/workflows/release-container.yml"
				)
			)
		).toBe(false);
		expect(
			existsSync(
				resolve(
					repositoryRoot,
					"deploy/direct/prepare-static-release.sh"
				)
			)
		).toBe(true);
		expect(
			existsSync(
				resolve(
					repositoryRoot,
					"deploy/direct/promote-static-release.sh"
				)
			)
		).toBe(true);
	});

	it("keeps direct host-static serving equivalent and collection-disabled", () => {
		const repositoryRoot = resolve(process.cwd(), "..");
		const deploymentGuide = readFileSync(
			resolve(repositoryRoot, "docs/production-deployment.md"),
			"utf8"
		);
		const postDeploySmoke = readFileSync(
			resolve(repositoryRoot, "scripts/post-deploy-smoke.mjs"),
			"utf8"
		);

		expect(deploymentGuide).toContain(
			"one reviewed static build output: `front-end/dist`"
		);
		expect(deploymentGuide).toMatch(
			/The native host is\s+the only supported production serving path/
		);
		expect(deploymentGuide).toContain("`classroomUsageEnabled`");
		expect(deploymentGuide).toContain("use `try_files $uri $uri/ =404;`");
		expect(deploymentGuide).toContain(
			"return `404` for `/api`, every `/api/` path"
		);
		expect(deploymentGuide).not.toContain(
			"The container is the only supported production artifact"
		);
		expect(postDeploySmoke).toContain("/__math-deployment-probe-missing/");
		expect(postDeploySmoke).toContain(
			"/courses/__math-deployment-probe-missing"
		);
		for (const undeclaredArtifact of [
			"/404/",
			"/admin.html",
			"/courses.html",
			"/graph-sketcher.html",
			"/.vite/ssr-manifest.json"
		]) {
			expect(postDeploySmoke).toContain(undeclaredArtifact);
		}
	});

	it("pins every action used to validate and publish this artifact", () => {
		const repositoryRoot = resolve(process.cwd(), "..");
		const workflowDirectory = resolve(repositoryRoot, ".github/workflows");
		const workflowPaths = readdirSync(workflowDirectory)
			.filter(path => /\.ya?ml$/.test(path))
			.map(path => resolve(workflowDirectory, path));

		for (const workflowPath of workflowPaths) {
			const workflow = readFileSync(workflowPath, "utf8");
			const actionReferences = [
				...workflow.matchAll(/\buses:\s+\S+@([^\s#]+)/g)
			].map(match => match[1]);

			expect(actionReferences.length).toBeGreaterThan(0);
			expect(
				actionReferences.every(reference =>
					/^[0-9a-f]{40}$/.test(reference)
				)
			).toBe(true);
		}
	});

	it("keeps the optional usage route isolated and source-controlled", () => {
		const nginx = readFileSync(
			resolve(process.cwd(), "../deploy/nginx/server-policy.conf"),
			"utf8"
		);
		const enabledProxy = readFileSync(
			resolve(
				process.cwd(),
				"../deploy/nginx/classroom-usage-enabled.inc"
			),
			"utf8"
		);

		expect(nginx).toContain("location = /api/classroom-usage");
		expect(nginx).toContain(
			"include /etc/nginx/snippets/math.avasan.org-classroom-usage.inc;"
		);
		expect(enabledProxy).not.toContain("resolver 127.0.0.11");
		expect(enabledProxy).toContain(
			"proxy_pass https://cs.avasan.org/api/classroom-usage;"
		);
		expect(enabledProxy).toContain("proxy_next_upstream off;");
	});

	it("verifies the upstream certificate and strips credentials", () => {
		const nginx = readFileSync(
			resolve(process.cwd(), "../deploy/nginx/server-policy.conf"),
			"utf8"
		);
		const enabledProxy = readFileSync(
			resolve(
				process.cwd(),
				"../deploy/nginx/classroom-usage-enabled.inc"
			),
			"utf8"
		);

		expect(enabledProxy).toContain("proxy_ssl_verify on;");
		expect(enabledProxy).toContain("proxy_ssl_name cs.avasan.org;");
		expect(enabledProxy).toContain(
			"proxy_ssl_trusted_certificate /etc/ssl/certs/ca-certificates.crt;"
		);
		expect(enabledProxy).toContain("proxy_pass_request_headers off;");
		expect(enabledProxy).toContain('if ($http_x_classroom_request != "1")');
		expect(enabledProxy).toContain(
			'if ($http_origin != "https://math.avasan.org")'
		);
		expect(enabledProxy).toContain(
			'if ($http_sec_fetch_site != "same-origin")'
		);
		expect(enabledProxy).toContain(
			'if ($http_content_type != "application/json")'
		);
		expect(enabledProxy).toContain('if ($args != "")');
		expect(enabledProxy).toContain(
			'proxy_set_header X-Classroom-Request "1";'
		);
		expect(enabledProxy).toContain('proxy_set_header Cookie "";');
		expect(enabledProxy).toContain('proxy_set_header Authorization "";');
		expect(enabledProxy).toContain(
			'proxy_set_header Proxy-Authorization "";'
		);
		expect(enabledProxy).toContain(
			'proxy_set_header X-Classroom-Analytics-Key "";'
		);
		expect(enabledProxy).toContain('proxy_set_header X-Forwarded-For "";');
		expect(enabledProxy).not.toContain("proxy_set_header Sec-Fetch-Site");
		expect(enabledProxy).toContain("proxy_hide_header Set-Cookie;");
		expect(nginx).toContain("access_log off;");
		expect(nginx).toContain("location ^~ /api/");
		expect(nginx).toContain("return 404;");
		expect(nginx).toContain("try_files $uri $uri/ =404;");
		expect(nginx).not.toContain("try_files $uri $uri/ /index.html;");
		expect(enabledProxy.match(/\bproxy_pass\b/g)).toHaveLength(1);
		expect(nginx).toContain("location = /api");
	});

	it("bakes the usage proxy state into the same immutable native release", () => {
		const repositoryRoot = resolve(process.cwd(), "..");
		const prepareRelease = readFileSync(
			resolve(repositoryRoot, "deploy/direct/prepare-static-release.sh"),
			"utf8"
		);
		const deploymentConfig = JSON.parse(
			readFileSync(
				resolve(
					repositoryRoot,
					"front-end/src/config/classroom-usage.json"
				),
				"utf8"
			)
		) as { classroomUsageEnabled: unknown };
		const disabledProxy = readFileSync(
			resolve(
				repositoryRoot,
				"deploy/nginx/classroom-usage-disabled.inc"
			),
			"utf8"
		);

		expect(deploymentConfig.classroomUsageEnabled).toBe(false);
		expect(prepareRelease).toContain(
			"front-end/src/config/classroom-usage.json"
		);
		expect(prepareRelease).toContain(
			"deploy/nginx/classroom-usage-${usage_mode}.inc"
		);
		expect(prepareRelease).toContain(".math-classroom-usage.inc");
		expect(prepareRelease).toContain(".math-static-release.json");
		expect(disabledProxy.trim()).toBe("return 404;");
		expect(disabledProxy).not.toContain("proxy_pass");
		expect(prepareRelease).not.toContain("VITE_CLASSROOM_USAGE_ENABLED");
	});

	it("requires exact release provenance and effective Nginx policy inclusion", () => {
		const repositoryRoot = resolve(process.cwd(), "..");
		const prepareRelease = readFileSync(
			resolve(repositoryRoot, "deploy/direct/prepare-static-release.sh"),
			"utf8"
		);
		const promoteRelease = readFileSync(
			resolve(repositoryRoot, "deploy/direct/promote-static-release.sh"),
			"utf8"
		);
		const sourceGate = readFileSync(
			resolve(repositoryRoot, "deploy/direct/verify-release-source.sh"),
			"utf8"
		);
		const snippetGate = readFileSync(
			resolve(
				repositoryRoot,
				"deploy/direct/verify-nginx-snippet-dump.sh"
			),
			"utf8"
		);

		expect(prepareRelease).toContain("verify-release-source.sh");
		expect(sourceGate).toContain("refs/remotes/origin/main");
		expect(sourceGate).toContain('tag_type" != "tag"');
		expect(sourceGate).toContain("anderson-webops/math\\.avasan\\.org");
		expect(promoteRelease).toContain("nginx -T");
		expect(promoteRelease).toContain("verify-nginx-snippet-dump.sh");
		expect(snippetGate).toContain("grep -Fxc");
		expect(snippetGate).toContain("exactly once");
	});

	it("derives CI release identity from the package and rejects unknown revisions", () => {
		const repositoryRoot = resolve(process.cwd(), "..");
		const continuousIntegration = readFileSync(
			resolve(repositoryRoot, ".github/workflows/ci.yml"),
			"utf8"
		);
		const releaseWriter = readFileSync(
			resolve(
				repositoryRoot,
				"front-end/scripts/write-release-metadata.mjs"
			),
			"utf8"
		);
		const postDeploySmoke = readFileSync(
			resolve(repositoryRoot, "scripts/post-deploy-smoke.mjs"),
			"utf8"
		);

		expect(continuousIntegration).toContain(
			"SOURCE_REVISION: ${{ github.sha }}"
		);
		expect(continuousIntegration).not.toContain(
			"MATH_RELEASE_VERSION=1.0.0"
		);
		expect(releaseWriter).toContain(
			"MATH_RELEASE_VERSION must match the root package version."
		);
		expect(releaseWriter).not.toContain(
			"sourceRevisionPattern = /^(?:[0-9a-f]{40}|unknown)$/"
		);
		expect(postDeploySmoke).not.toContain("[0-9a-f]{40}|unknown");
	});

	it("marks the Admin handoff noindex in the redirect response", () => {
		const serverPolicy = readFileSync(
			resolve(process.cwd(), "../deploy/nginx/server-policy.conf"),
			"utf8"
		);
		const maps = readFileSync(
			resolve(process.cwd(), "../deploy/nginx/http-maps.conf"),
			"utf8"
		);

		expect(maps).toContain('/admin "noindex, nofollow, noarchive";');
		expect(maps).toContain('/admin "no-store";');
		expect(serverPolicy).toContain("add_header X-Robots-Tag");
		expect(serverPolicy).toContain("add_header Cache-Control");
		expect(serverPolicy).toContain(
			"return 302 https://cs.avasan.org/admin;"
		);
	});

	it("rejects generated legacy route artifacts through the branded 404", () => {
		const serverPolicy = readFileSync(
			resolve(process.cwd(), "../deploy/nginx/server-policy.conf"),
			"utf8"
		);
		const maps = readFileSync(
			resolve(process.cwd(), "../deploy/nginx/http-maps.conf"),
			"utf8"
		);

		expect(maps).toContain("$math_legacy_artifact_request");
		expect(maps).toContain("graph-sketcher");
		expect(maps).toContain("index\\.html");
		expect(serverPolicy).toContain("if ($math_legacy_artifact_request)");
		expect(serverPolicy).toContain("error_page 404 /404.html;");
	});

	it("serves release identity without caching it", () => {
		const serverPolicy = readFileSync(
			resolve(process.cwd(), "../deploy/nginx/server-policy.conf"),
			"utf8"
		);
		const maps = readFileSync(
			resolve(process.cwd(), "../deploy/nginx/http-maps.conf"),
			"utf8"
		);

		expect(maps).toContain('/release.json "no-store";');
		expect(serverPolicy).toContain("add_header Cache-Control");
		expect(serverPolicy).toContain("location = /release.json");
		expect(serverPolicy).toContain("error_page 404 /404.html;");
		expect(serverPolicy).toContain("internal;");
	});
});
