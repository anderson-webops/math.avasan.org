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

	it("uses the restrictive frame and script policy on the container host", () => {
		const nginx = readFileSync(
			resolve(process.cwd(), "../nginx/default.conf"),
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
		const dockerIgnore = readFileSync(
			resolve(repositoryRoot, ".dockerignore"),
			"utf8"
		);
		const dockerfile = readFileSync(
			resolve(repositoryRoot, "Dockerfile"),
			"utf8"
		);

		expect(existsSync(resolve(repositoryRoot, "netlify.toml"))).toBe(false);
		expect(dockerIgnore).toContain("**/.env");
		expect(dockerIgnore).toContain(".git");
		expect(dockerIgnore).toContain("**/node_modules");
		expect(dockerfile.match(/^FROM .+@sha256:[0-9a-f]{64}/gm)).toHaveLength(
			2
		);
		expect(dockerfile).toContain("ARG SOURCE_REVISION\n");
		expect(dockerfile).not.toContain("SOURCE_REVISION=unknown");
		expect(dockerfile).toContain(`require("./package.json").version`);
		expect(dockerfile).toContain(
			`declaredVersion.replace(/^v/, "") !== packageVersion`
		);
		expect(dockerfile).toContain("/^[0-9a-f]{40}$/");
		expect(dockerfile).toContain("\nUSER 101\n");
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
		expect(deploymentGuide).toContain(
			"Direct host-static serving is supported only while the committed"
		);
		expect(deploymentGuide).toContain(
			"`classroomUsageEnabled` value is `false`"
		);
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

	it("keeps the optional usage proxy isolated from static-site startup", () => {
		const nginx = readFileSync(
			resolve(process.cwd(), "../nginx/default.conf"),
			"utf8"
		);
		const enabledProxy = readFileSync(
			resolve(process.cwd(), "../nginx/classroom-usage-enabled.inc"),
			"utf8"
		);

		expect(nginx).toContain("location = /api/classroom-usage");
		expect(nginx).toContain(
			"include /etc/nginx/conf.d/classroom-usage.inc;"
		);
		expect(enabledProxy).toContain("resolver 127.0.0.11");
		expect(enabledProxy).toContain("resolver_timeout 2s;");
		expect(enabledProxy).toContain(
			"proxy_pass $classroom_usage_origin/api/classroom-usage;"
		);
		expect(enabledProxy).not.toContain(
			"proxy_pass https://cs.avasan.org/api/classroom-usage;"
		);
		expect(enabledProxy).toContain("proxy_next_upstream off;");
	});

	it("verifies the upstream certificate and strips credentials", () => {
		const nginx = readFileSync(
			resolve(process.cwd(), "../nginx/default.conf"),
			"utf8"
		);
		const enabledProxy = readFileSync(
			resolve(process.cwd(), "../nginx/classroom-usage-enabled.inc"),
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

	it("bakes the usage proxy state into the same immutable image metadata", () => {
		const repositoryRoot = resolve(process.cwd(), "..");
		const dockerfile = readFileSync(
			resolve(repositoryRoot, "Dockerfile"),
			"utf8"
		);
		const releaseWorkflow = readFileSync(
			resolve(repositoryRoot, ".github/workflows/release-container.yml"),
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
			resolve(repositoryRoot, "nginx/classroom-usage-disabled.inc"),
			"utf8"
		);

		expect(deploymentConfig.classroomUsageEnabled).toBe(false);
		expect(dockerfile).toContain(
			"front-end/src/config/classroom-usage.json"
		);
		expect(dockerfile).toContain(
			"nginx/classroom-usage-${usage_proxy_mode}.inc"
		);
		expect(dockerfile).toContain("/etc/nginx/conf.d/classroom-usage.inc");
		expect(disabledProxy.trim()).toBe("return 404;");
		expect(disabledProxy).not.toContain("proxy_pass");
		expect(dockerfile).not.toContain("ARG VITE_CLASSROOM_USAGE_ENABLED");
		expect(releaseWorkflow).not.toContain(
			"vars.MATH_CLASSROOM_USAGE_ENABLED"
		);
		expect(releaseWorkflow).toContain("group: math-production-release");
		expect(releaseWorkflow).not.toContain(
			"math-production-release-${{ github.ref }}"
		);
		expect(releaseWorkflow).toContain("flavor: latest=false");
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
			`node -p "require('./package.json').version"`
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
		const nginx = readFileSync(
			resolve(process.cwd(), "../nginx/default.conf"),
			"utf8"
		);

		expect(nginx).toContain('/admin "noindex, nofollow, noarchive";');
		expect(nginx).toContain("add_header X-Robots-Tag");
		expect(nginx).toContain("return 302 https://cs.avasan.org/admin;");
	});

	it("serves release identity without caching it", () => {
		const nginx = readFileSync(
			resolve(process.cwd(), "../nginx/default.conf"),
			"utf8"
		);

		expect(nginx).toContain('/release.json "no-store";');
		expect(nginx).toContain("add_header Cache-Control");
		expect(nginx).toContain("location = /release.json");
	});
});
