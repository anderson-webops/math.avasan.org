import assert from "node:assert/strict";
import process from "node:process";
import test from "node:test";
import { verifyNativeLock, verifyNativePackageMetadata } from "./verify-native-lock.mjs";
import { verifyInstalledNativePackages, verifyPlatformToolchain } from "./verify-platform-install.mjs";

function fixture() {
	const optionalDependencies = {};
	const packages = {
		"": {
			workspaces: ["front-end"],
			devDependencies: { rolldown: "1.2.19" }
		},
		"front-end": {
			optionalDependencies,
			devDependencies: { esbuild: "0.28.2" }
		},
		"node_modules/rolldown": { version: "1.2.19", optionalDependencies: {} },
		"node_modules/esbuild": { version: "0.28.2", optionalDependencies: {} }
	};
	for (const architecture of ["arm64", "x64"]) {
		for (const libc of ["gnu", "musl"]) {
			const dependency = `@rolldown/binding-linux-${architecture}-${libc}`;
			optionalDependencies[dependency] = "1.2.19";
			packages["node_modules/rolldown"].optionalDependencies[dependency] = "1.2.19";
			packages[`node_modules/${dependency}`] = {
				version: "1.2.19",
				os: ["linux"],
				cpu: [architecture],
				libc: [
					libc === "gnu"
						? "glibc"
						: "musl"
				]
			};
		}
		const dependency = `@esbuild/linux-${architecture}`;
		optionalDependencies[dependency] = "0.28.2";
		packages["node_modules/esbuild"].optionalDependencies[dependency] = "0.28.2";
		packages[`node_modules/${dependency}`] = {
			version: "0.28.2",
			os: ["linux"],
			cpu: [architecture]
		};
	}
	return {
		lock: { lockfileVersion: 3, packages },
		frontend: { optionalDependencies }
	};
}

test("native requirements follow every reachable consumer and nested version", () => {
	const { lock, frontend } = fixture();
	assert.equal(verifyNativeLock(lock, frontend).pins.length, 6);
	const older = structuredClone(lock.packages["node_modules/rolldown"]);
	older.version = "1.2.18";
	for (const dependency of Object.keys(older.optionalDependencies)) {
		older.optionalDependencies[dependency] = "1.2.18";
		lock.packages[`node_modules/older/node_modules/${dependency}`] = {
			...lock.packages[`node_modules/${dependency}`],
			version: "1.2.18"
		};
	}
	lock.packages[""].devDependencies.older = "npm:rolldown@1.2.18";
	lock.packages["node_modules/older"] = older;
	const verified = verifyNativeLock(lock, frontend);
	assert.equal(verified.requirements.length, 10);
	assert.equal(verified.requirements.filter(requirement => requirement.version === "1.2.18").length, 4);
	delete lock.packages["node_modules/older/node_modules/@rolldown/binding-linux-arm64-gnu"];
	assert.throws(() => verifyNativeLock(lock, frontend), /Native version mismatch/u);
	delete lock.packages["node_modules/@rolldown/binding-linux-arm64-gnu"];
	assert.throws(() => verifyNativeLock(lock, frontend), /Missing producer-required native package/u);
});

test("stale, zero-consumer and missing explicit pins fail without a stale count floor", () => {
	const stale = fixture();
	for (const dependency of Object.keys(stale.lock.packages["node_modules/rolldown"].optionalDependencies)) {
		stale.lock.packages[`node_modules/rolldown/node_modules/${dependency}`] = structuredClone(stale.lock.packages[`node_modules/${dependency}`]);
		stale.lock.packages[`node_modules/${dependency}`].version = "1.2.16";
		stale.frontend.optionalDependencies[dependency] = "1.2.16";
	}
	assert.throws(() => verifyNativeLock(stale.lock, stale.frontend), /Unconsumed explicit native pin/u);
	const unconsumed = fixture();
	unconsumed.frontend.optionalDependencies["@oxc-parser/binding-linux-arm64-gnu"] = "0.140.0";
	unconsumed.lock.packages["node_modules/oxc-parser"] = {
		version: "0.140.0",
		optionalDependencies: { "@oxc-parser/binding-linux-arm64-gnu": "0.140.0" }
	};
	assert.throws(() => verifyNativeLock(unconsumed.lock, unconsumed.frontend), /Unconsumed explicit native pin/u);
	const missing = fixture();
	delete missing.frontend.optionalDependencies["@rolldown/binding-linux-arm64-gnu"];
	assert.throws(() => verifyNativeLock(missing.lock, missing.frontend), /Missing explicit native pin/u);
	const empty = fixture();
	delete empty.lock.packages[""].devDependencies;
	delete empty.lock.packages["front-end"].devDependencies;
	assert.throws(() => verifyNativeLock(empty.lock, empty.frontend), /actual locked consumers/u);
});

test("frontend-only shape, complete targets and native metadata remain mandatory", () => {
	const { lock, frontend } = fixture();
	lock.packages[""].workspaces.push("back-end");
	assert.throws(() => verifyNativeLock(lock, frontend), /only the frontend workspace/u);
	lock.packages[""].workspaces.pop();
	lock.packages["back-end/node_modules/example"] = {};
	assert.throws(() => verifyNativeLock(lock, frontend), /backend package/u);
	delete lock.packages["back-end/node_modules/example"];
	const dependency = "@rolldown/binding-linux-x64-musl";
	delete lock.packages["node_modules/rolldown"].optionalDependencies[dependency];
	assert.throws(() => verifyNativeLock(lock, frontend), /Incomplete Linux ARM64\/x64/u);
	lock.packages["node_modules/rolldown"].optionalDependencies[dependency] = "1.2.19";
	const requirement = verifyNativeLock(lock, frontend).requirements.find(entry => entry.dependency === dependency);
	const entry = lock.packages[requirement.location];
	assert.throws(() => verifyNativePackageMetadata({ ...entry, version: "1.2.16" }, requirement), /version mismatch/u);
	assert.throws(() => verifyNativePackageMetadata({
		...entry,
		cpu: ["arm64"]
	}, requirement), /CPU mismatch/u);
	assert.throws(() => verifyNativePackageMetadata({
		...entry,
		libc: ["glibc"]
	}, requirement), /libc mismatch/u);
	assert.throws(() => verifyNativeLock(lock, { optionalDependencies: {} }), /pins differ from the lockfile/u);
});

test("platform qualification rejects unverified npm and preserves native read errors", async () => {
	await assert.rejects(verifyPlatformToolchain(""), /selected locked npm profile/u);
	await assert.rejects(verifyPlatformToolchain(process.execPath), /npm JavaScript entrypoint/u);
	await assert.rejects(verifyInstalledNativePackages(process.execPath, [
		{ location: "node_modules/native" }
	]), { code: "ENOTDIR" });
});
