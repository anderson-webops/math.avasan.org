import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { createRequire } from "node:module";
import puppeteer from "puppeteer";

const require = createRequire(import.meta.url);
const axeSourcePath = require.resolve("axe-core/axe.min.js");
const frontendPort = Number(process.env.A11Y_FRONTEND_PORT || 3334);
const baseUrl = `http://127.0.0.1:${frontendPort}`;
const isCi = process.env.CI === "true";
const runFullMatrix = process.env.A11Y_FULL === "true" || !isCi;
const routes = runFullMatrix ? ["/", "/graph-sketcher/", "/courses/", "/admin"] : ["/", "/courses/"];
const viewports = runFullMatrix
	? [
			{ height: 900, name: "mobile", width: 390 },
			{ height: 1000, name: "tablet", width: 768 },
			{ height: 1000, name: "desktop", width: 1280 }
		]
	: [
			{ height: 900, name: "mobile", width: 390 },
			{ height: 1000, name: "desktop", width: 1280 }
		];
const mediaScenarios = [
	{
		colorScheme: "light",
		name: "light",
		prefersReducedMotion: "no-preference",
		storedTheme: "light"
	},
	{
		colorScheme: "dark",
		name: "dark-reduced-motion",
		prefersReducedMotion: "reduce",
		storedTheme: "dark"
	}
];

const chromeCandidates = [
	process.env.PUPPETEER_EXECUTABLE_PATH,
	"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
	"/Applications/Chromium.app/Contents/MacOS/Chromium",
	"/usr/bin/google-chrome-stable",
	"/usr/bin/google-chrome",
	"/usr/bin/chromium-browser",
	"/usr/bin/chromium"
].filter(Boolean);
const chromePath = chromeCandidates.find(candidate => existsSync(candidate));
if (chromePath) process.env.PUPPETEER_EXECUTABLE_PATH = chromePath;

function writeServerLine(prefix, data) {
	const text = data.toString().trim();
	if (text) process.stderr.write(`[${prefix}] ${text}\n`);
}

async function waitForHttp(url, timeoutMs = 30_000) {
	const start = Date.now();
	let lastError;
	while (Date.now() - start < timeoutMs) {
		try {
			const response = await fetch(url);
			if (response.ok) return;
			lastError = new Error(`${url} returned ${response.status}`);
		} catch (error) {
			lastError = error;
		}
		await new Promise(resolve => setTimeout(resolve, 400));
	}
	throw lastError || new Error(`Timed out waiting for ${url}`);
}

function startVite() {
	const child = spawn(
		"npm",
		[
			"exec",
			"-w",
			"front-end",
			"--",
			"vite",
			"--host",
			"127.0.0.1",
			"--port",
			String(frontendPort),
			"--strictPort"
		],
		{
			detached: process.platform !== "win32",
			env: { ...process.env, BROWSER: "none" },
			stdio: ["ignore", "pipe", "pipe"]
		}
	);
	child.stdout.on("data", data => writeServerLine("vite", data));
	child.stderr.on("data", data => writeServerLine("vite", data));
	return child;
}

function killChild(child, signal) {
	if (!child.pid) return;
	if (process.platform === "win32") {
		child.kill(signal);
		return;
	}
	try {
		process.kill(-child.pid, signal);
	} catch {
		child.kill(signal);
	}
}

function waitForChildExit(child) {
	return new Promise(resolve => {
		if (child.exitCode !== null || child.signalCode) {
			resolve();
			return;
		}
		child.once("exit", resolve);
	});
}

async function stopChild(child) {
	if (child.exitCode !== null || child.signalCode) return;
	killChild(child, "SIGTERM");
	const exited = await Promise.race([
		waitForChildExit(child).then(() => true),
		new Promise(resolve => setTimeout(() => resolve(false), 5_000))
	]);
	if (exited) return;
	killChild(child, "SIGKILL");
	await Promise.race([waitForChildExit(child), new Promise(resolve => setTimeout(resolve, 2_000))]);
}

const transientNavigationError =
	/Execution context was destroyed|Cannot find context with specified id|Navigating frame was detached|Navigation timeout/i;

async function runAxeAudit(page, url) {
	for (let attempt = 1; attempt <= 3; attempt += 1) {
		try {
			await page.goto(url, {
				timeout: 30_000,
				waitUntil: "domcontentloaded"
			});
			await page.waitForSelector("body", { timeout: 10_000 });
			await page.waitForFunction(() => document.body.innerText.trim().length > 0, { timeout: 10_000 });
			await page.waitForFunction(() => document.querySelector("#app")?.hasAttribute("data-v-app"), {
				timeout: 10_000
			});
			await new Promise(resolve => setTimeout(resolve, 250));
			await page.addScriptTag({ path: axeSourcePath });
			return await page.evaluate(async () => {
				return await axe.run(document, {
					resultTypes: ["violations"],
					runOnly: {
						type: "tag",
						values: ["wcag2a", "wcag2aa"]
					}
				});
			});
		} catch (error) {
			if (attempt === 3 || !(error instanceof Error) || !transientNavigationError.test(error.message)) {
				throw error;
			}
			console.warn(`a11y retrying after a development-server reload: ${url}`);
		}
	}
	throw new Error(`Unable to audit ${url}.`);
}

const viteProcess = startVite();
let browser;

try {
	await waitForHttp(baseUrl);
	browser = await puppeteer.launch({
		executablePath: chromePath,
		headless: "new",
		args: ["--no-sandbox", "--disable-dev-shm-usage"]
	});

	const failures = [];
	for (const route of routes) {
		for (const viewport of viewports) {
			for (const media of mediaScenarios) {
				const url = `${baseUrl}${route}`;
				const page = await browser.newPage();
				try {
					console.log(`a11y checking: ${url} (${viewport.name}, ${media.name})`);
					page.setDefaultNavigationTimeout(30_000);
					await page.setViewport({
						deviceScaleFactor: 1,
						height: viewport.height,
						width: viewport.width
					});
					await page.emulateMediaFeatures([
						{
							name: "prefers-color-scheme",
							value: media.colorScheme
						},
						{
							name: "prefers-reduced-motion",
							value: media.prefersReducedMotion
						}
					]);
					await page.evaluateOnNewDocument(storedTheme => {
						window.localStorage.setItem("vueuse-color-scheme", storedTheme);
					}, media.storedTheme);
					const result = await runAxeAudit(page, url);
					const violations = result.violations.filter(violation => violation.id !== "frame-tested");
					if (violations.length) {
						failures.push({
							context: `${viewport.name}/${media.name}`,
							url,
							violations
						});
						continue;
					}
					console.log(`a11y ok: ${url} (${viewport.name}, ${media.name})`);
				} finally {
					await page.close().catch(() => {});
				}
			}
		}
	}

	if (failures.length) {
		for (const failure of failures) {
			console.error(`\nAccessibility issues for ${failure.url} (${failure.context})`);
			for (const violation of failure.violations) {
				console.error(`- [${violation.impact ?? "unknown"}] ${violation.id}: ${violation.help}`);
				console.error(`  ${violation.helpUrl}`);
				for (const node of violation.nodes) {
					console.error(`  ${node.target.join(", ")}`);
				}
			}
		}
		process.exitCode = 1;
	}
} finally {
	if (browser) await browser.close();
	await stopChild(viteProcess);
}
