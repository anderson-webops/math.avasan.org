import assert from "node:assert/strict";
import { execFileSync, spawn } from "node:child_process";
import { cp, mkdir, mkdtemp, readFile, realpath, rm } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath, pathToFileURL } from "node:url";
import { loadNativeLock, verifyNativePackageMetadata } from "./verify-native-lock.mjs";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
export async function verifyPlatformToolchain(entrypoint = process.env.npm_execpath) {
	assert.ok(entrypoint, "Run platform qualification through the selected locked npm profile.");
	const npmExecPath = await realpath(entrypoint);
	const npmPrefix = path.resolve(path.dirname(npmExecPath), "../../..");
	assert.equal(npmExecPath, path.join(npmPrefix, "node_modules/npm/bin/npm-cli.js"), "Platform qualification requires the locked profile's npm JavaScript entrypoint.");
	const { nodeIdentity, verifyReusableToolchain } = await import("./build-toolchain-cache.mjs");
	const receipt = verifyReusableToolchain(npmPrefix, nodeIdentity());
	assert.equal(process.version, "v26.13.1");
	assert.equal(receipt.node, "26.13.1");
	assert.equal(receipt.versions.npm, "12.2.2");
	assert.equal(receipt.profile, "webops-locked-npm-v1");
	return npmExecPath;
}

async function ownedDirectory(directory, runsRoot) {
	const destination = path.resolve(directory);
	const relative = path.relative(runsRoot, destination);
	assert.ok(relative && !relative.startsWith(`..${path.sep}`) && relative !== ".." && !path.isAbsolute(relative), "Platform temporary files and cache must remain under the owning repository's .ai-work/runs.");
	let ancestor = destination;
	while (true) {
		try {
			assert.equal(await realpath(ancestor), ancestor, "Platform scratch and cache ancestors must not redirect through symlinks.");
			break;
		}
		catch (error) {
			if (error.code !== "ENOENT") throw error;
			ancestor = path.dirname(ancestor);
		}
	}
	await mkdir(destination, { recursive: true, mode: 0o700 });
	assert.equal(await realpath(destination), destination);
	return destination;
}

function run(npmExecPath, args, cwd, cacheDirectory, temporaryDirectory) {
	return new Promise((resolveRun, reject) => {
		const environment = {
			...process.env,
			CYPRESS_INSTALL_BINARY: "0",
			npm_config_cache: cacheDirectory,
			NPM_CONFIG_CACHE: cacheDirectory,
			PUPPETEER_SKIP_DOWNLOAD: "true",
			TMPDIR: temporaryDirectory,
			TMP: temporaryDirectory,
			TEMP: temporaryDirectory
		};
		delete environment.npm_config_global_ignore_file;
		delete environment.NPM_CONFIG_GLOBAL_IGNORE_FILE;
		const child = spawn(process.execPath, [npmExecPath, ...args], { cwd, env: environment, stdio: "inherit" });
		child.once("error", reject);
		child.once("exit", (code, signal) =>
			code === 0
				? resolveRun()
				: reject(new Error(`Locked npm exited with ${signal || code}.`)));
	});
}

export async function verifyInstalledNativePackages(temporaryRoot, requirements) {
	const consumers = new Set();
	for (const requirement of requirements) {
		if (requirement.consumer && !consumers.has(requirement.consumer)) {
			const consumer = JSON.parse(await readFile(path.join(temporaryRoot, requirement.consumer, "package.json"), "utf8"));
			assert.equal(consumer.version, requirement.consumerVersion, `Installed native consumer differs: ${requirement.consumer}`);
			consumers.add(requirement.consumer);
		}
		const entry = JSON.parse(await readFile(path.join(temporaryRoot, requirement.location, "package.json"), "utf8"));
		assert.equal(entry.name, requirement.dependency, `Installed native package name differs: ${requirement.location}`);
		verifyNativePackageMetadata(entry, requirement);
	}
}

async function verifyTarget(architecture, libc, nativeLock, npmExecPath, temporaryDirectory, cacheDirectory) {
	const temporaryRoot = await mkdtemp(path.join(temporaryDirectory, `math-linux-${architecture}-${libc}-`));
	try {
		await mkdir(path.join(temporaryRoot, "front-end"), {
			recursive: true
		});
		await mkdir(path.join(temporaryRoot, "vendor"), {
			recursive: true
		});
		await Promise.all([
			cp(path.join(repositoryRoot, "package.json"), path.join(temporaryRoot, "package.json")),
			cp(path.join(repositoryRoot, "package-lock.json"), path.join(temporaryRoot, "package-lock.json")),
			cp(path.join(repositoryRoot, ".npmrc"), path.join(temporaryRoot, ".npmrc")),
			cp(path.join(repositoryRoot, "front-end/package.json"), path.join(temporaryRoot, "front-end/package.json")),
			cp(
				path.join(repositoryRoot, "vendor/brace-expansion-compat"),
				path.join(temporaryRoot, "vendor/brace-expansion-compat"),
				{ recursive: true }
			)
		]);
		await run(
			npmExecPath,
			[
				"ci",
				"--ignore-scripts",
				"--include=dev",
				"--include=optional",
				"--no-audit",
				"--no-fund",
				"--os=linux",
				`--cpu=${architecture}`,
				`--libc=${libc}`
			],
			temporaryRoot,
			cacheDirectory,
			temporaryDirectory
		);

		const expected = [
			...nativeLock.requirements,
			...nativeLock.pins
		].filter(
			requirement => requirement.architecture === architecture && (!requirement.libc || requirement.libc === libc)
		);
		assert.ok(expected.length, `No consumer-required native coverage for Linux ${architecture} ${libc}.`);
		await verifyInstalledNativePackages(temporaryRoot, expected);
		const locations = new Set(expected.map(requirement => requirement.location));
		process.stdout.write(`Verified Linux ${architecture} ${libc} installed metadata (${locations.size} native packages; scripts ignored, native execution untested).\n`);
	}
	finally {
		await rm(temporaryRoot, { force: true, recursive: true });
	}
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
	const npmExecPath = await verifyPlatformToolchain();
	const nativeLock = await loadNativeLock(repositoryRoot);
	const gitCommonDirectory = execFileSync("git", ["rev-parse", "--path-format=absolute", "--git-common-dir"], { cwd: repositoryRoot, encoding: "utf8" }).trim();
	const owningRoot = path.dirname(await realpath(gitCommonDirectory));
	const runsRoot = path.join(owningRoot, ".ai-work/runs");
	const scratchRoot = path.join(runsRoot, "platform-install");
	const temporaryDirectory = await ownedDirectory(process.env.MATH_PLATFORM_TMPDIR || path.join(scratchRoot, "tmp"), runsRoot);
	const cacheDirectory = await ownedDirectory(process.env.MATH_PLATFORM_CACHE || path.join(scratchRoot, "npm-cache"), runsRoot);
	for (const architecture of ["arm64", "x64"]) {
		for (const libc of ["glibc", "musl"]) {
			await verifyTarget(architecture, libc, nativeLock, npmExecPath, temporaryDirectory, cacheDirectory);
		}
	}
}
