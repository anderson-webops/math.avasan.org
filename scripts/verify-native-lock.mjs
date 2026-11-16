import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath, pathToFileURL } from "node:url";

function nativeTarget(dependency) {
	const match = /linux-(arm64|x64)(?:-(gnu|musl))?$/u.exec(dependency);
	if (!match) return undefined;
	return {
		architecture: match[1],
		libc: match[2] === "gnu"
			? "glibc"
			: match[2] || null,
		family: dependency.slice(0, match.index)
	};
}

function resolvePackage(packages, consumer, dependency) {
	let directory = consumer;
	while (true) {
		if (path.posix.basename(directory) !== "node_modules") {
			const location = path.posix.join(directory, "node_modules", dependency);
			if (Object.hasOwn(packages, location)) return location;
		}
		if (!directory) return undefined;
		const parent = path.posix.dirname(directory);
		directory = parent === "."
			? ""
			: parent;
	}
}

function reachablePackages(packages) {
	const reached = new Set();
	const pending = ["", "front-end"];
	while (pending.length) {
		const location = pending.pop();
		if (reached.has(location) || !packages[location]) continue;
		reached.add(location);
		const entry = packages[location];
		if (entry.link) {
			pending.push(entry.resolved);
			continue;
		}
		for (const dependency of Object.keys({
			...entry.peerDependencies,
			...entry.devDependencies,
			...entry.dependencies,
			...entry.optionalDependencies
		})) {
			const resolved = resolvePackage(packages, location, dependency);
			if (resolved) pending.push(resolved);
		}
	}
	return reached;
}

export function verifyNativePackageMetadata(entry, requirement) {
	const identity = `${requirement.dependency}@${requirement.version} at ${requirement.location}`;
	assert.equal(entry.version, requirement.version, `Native version mismatch: ${identity}`);
	assert.ok(entry.os?.includes("linux"), `Native package must support Linux: ${identity}`);
	assert.ok(entry.cpu?.includes(requirement.architecture), `Native CPU mismatch: ${identity}`);
	if (requirement.libc) {
		assert.ok(entry.libc?.includes(requirement.libc), `Native libc mismatch: ${identity}`);
	}
}

export function verifyNativeLock(lock, frontendManifest) {
	const packages = lock.packages || {};
	assert.ok(lock.lockfileVersion >= 3, "package-lock.json must use lockfile version 3 or newer.");
	assert.deepEqual(packages[""]?.workspaces, ["front-end"], "The lockfile must contain only the frontend workspace.");
	assert.ok(packages["front-end"], "The frontend workspace must be locked.");
	assert.equal(
		Object.keys(packages).some(location => /(?:^|\/)back-end(?:\/|$)/u.test(location)),
		false,
		"A backend package unexpectedly remains in the static-site lockfile."
	);
	const requirements = [];
	for (const consumer of reachablePackages(packages)) {
		if (!consumer || consumer === "front-end" || packages[consumer].link) continue;
		const entry = packages[consumer];
		const families = new Map();
		for (const [dependency, version] of Object.entries({
			...entry.dependencies,
			...entry.optionalDependencies
		})) {
			const target = nativeTarget(dependency);
			if (!target) continue;
			assert.match(version, /^\d+\.\d+\.\d+(?:-[\dA-Za-z.-]+)?(?:\+[\dA-Za-z.-]+)?$/u, `Native consumer must require an exact version: ${consumer} -> ${dependency}`);
			const location = resolvePackage(packages, consumer, dependency);
			assert.ok(location, `Missing producer-required native package: ${consumer} -> ${dependency}@${version}`);
			const requirement = {
				consumer,
				consumerVersion: entry.version,
				dependency,
				version,
				location,
				...target
			};
			verifyNativePackageMetadata(packages[location], requirement);
			requirements.push(requirement);
			const family = `${target.family}:${target.libc ? "libc" : "any"}`;
			if (!families.has(family)) families.set(family, new Set());
			families.get(family).add(`${target.architecture}:${target.libc || "any"}`);
		}
		for (const [family, targets] of families) {
			const libcs = family.endsWith(":libc")
				? ["glibc", "musl"]
				: ["any"];
			const expected = ["arm64", "x64"].flatMap(architecture => libcs.map(libc => `${architecture}:${libc}`));
			assert.deepEqual([...targets].sort(), expected.sort(), `Incomplete Linux ARM64/x64 native coverage: ${consumer} (${family})`);
		}
	}
	assert.ok(requirements.length, "Expected native packages required by actual locked consumers.");
	const linuxPins = manifest => Object.fromEntries(
		Object.entries(manifest.optionalDependencies || {}).filter(([dependency]) => dependency.includes("linux-"))
	);
	const explicit = linuxPins(frontendManifest);
	assert.deepEqual(linuxPins(packages["front-end"]), explicit, "Frontend native pins differ from the lockfile.");
	const pins = [];
	for (const [dependency, version] of Object.entries(explicit)) {
		const target = nativeTarget(dependency);
		assert.ok(target, `Unsupported explicit Linux native pin: ${dependency}`);
		assert.ok(
			requirements.some(requirement => requirement.dependency === dependency && requirement.version === version),
			`Unconsumed explicit native pin: ${dependency}@${version}`
		);
		const location = resolvePackage(packages, "front-end", dependency);
		assert.ok(location, `Missing explicit native pin: ${dependency}@${version}`);
		const pin = {
			dependency,
			version,
			location,
			...target
		};
		verifyNativePackageMetadata(packages[location], pin);
		pins.push(pin);
	}
	for (const requirement of requirements) {
		assert.ok(Object.hasOwn(explicit, requirement.dependency), `Missing explicit native pin required by ${requirement.consumer}: ${requirement.dependency}@${requirement.version}`);
	}
	return { requirements, pins };
}

export async function loadNativeLock(repositoryRoot) {
	const lock = JSON.parse(await readFile(path.join(repositoryRoot, "package-lock.json"), "utf8"));
	const frontendManifest = JSON.parse(await readFile(path.join(repositoryRoot, "front-end/package.json"), "utf8"));
	return verifyNativeLock(lock, frontendManifest);
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
	const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
	const { requirements, pins } = await loadNativeLock(repositoryRoot);
	process.stdout.write(`Verified ${pins.length} explicit Linux native pins and ${requirements.length} consumer-required bindings.\n`);
}
