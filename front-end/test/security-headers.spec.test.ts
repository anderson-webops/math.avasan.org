import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const requiredPolicy =
	"default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; media-src 'self' blob: https:; font-src 'self' data:; connect-src 'self'; worker-src 'self' blob:; frame-src 'none'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'";

describe("production browser security policy", () => {
	it("keeps executable scripts external and compatible with the CSP", () => {
		const html = readFileSync(
			resolve(process.cwd(), "index.html"),
			"utf8"
		);
		const themeScript = readFileSync(
			resolve(process.cwd(), "public/theme.js"),
			"utf8"
		);

		expect(html).toContain('<script src="/theme.js"></script>');
		expect(html).not.toMatch(/<script(?![^>]*\bsrc=)[^>]*>\s*\S/i);
		expect(themeScript).not.toMatch(/\b(?:fetch|XMLHttpRequest|sendBeacon)\b/);
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

	it("uses the same restrictive frame and script policy on both hosts", () => {
		const nginx = readFileSync(
			resolve(process.cwd(), "../nginx/default.conf"),
			"utf8"
		);
		const netlify = readFileSync(
			resolve(process.cwd(), "../netlify.toml"),
			"utf8"
		);

		for (const configuration of [nginx, netlify]) {
			expect(configuration).toContain(requiredPolicy);
			expect(configuration).toContain(
				"Strict-Transport-Security"
			);
			expect(configuration).not.toContain("frame-src 'self'");
			expect(configuration).not.toContain("script-src 'unsafe-inline'");
		}
	});

	it("proxies only anonymous aggregate usage and strips credentials", () => {
		const nginx = readFileSync(
			resolve(process.cwd(), "../nginx/default.conf"),
			"utf8"
		);

		expect(nginx).toContain("location = /api/classroom-usage");
		expect(nginx).toContain('proxy_set_header Cookie "";');
		expect(nginx).toContain('proxy_set_header Authorization "";');
		expect(nginx).toContain("proxy_hide_header Set-Cookie;");
		expect(nginx).toContain("access_log off;");
		expect(nginx).not.toMatch(/location\s+[~^*=\s]*\/api\/\s*\{/);
	});
});
