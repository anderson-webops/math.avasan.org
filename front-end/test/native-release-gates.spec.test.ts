import { execFileSync, spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { afterEach, describe, expect, it } from "vitest";

const repositoryRoot = resolve(process.cwd(), "..");
const releaseSourceGate = resolve(
	repositoryRoot,
	"deploy/direct/verify-release-source.sh"
);
const nginxSnippetGate = resolve(
	repositoryRoot,
	"deploy/direct/verify-nginx-snippet-dump.sh"
);
const tempDirs: string[] = [];

function git(cwd: string, ...args: string[]) {
	return execFileSync("git", args, {
		cwd,
		encoding: "utf8",
		stdio: ["ignore", "pipe", "pipe"]
	}).trim();
}

function runGate(script: string, args: string[]) {
	return spawnSync("bash", [script, ...args], {
		encoding: "utf8"
	});
}

async function createReleaseRepository() {
	const directory = await mkdtemp(join(tmpdir(), "math-release-gate-"));
	tempDirs.push(directory);
	git(directory, "init", "--quiet", "--initial-branch=main");
	git(directory, "config", "user.email", "release-gate@example.invalid");
	git(directory, "config", "user.name", "Release Gate Test");

	await writeFile(join(directory, "release.txt"), "base\n");
	git(directory, "add", "release.txt");
	git(directory, "commit", "--quiet", "-m", "Base");

	await writeFile(join(directory, "release.txt"), "release\n");
	git(directory, "add", "release.txt");
	git(directory, "commit", "--quiet", "-m", "Release");
	git(
		directory,
		"remote",
		"add",
		"origin",
		"git@github.com:anderson-webops/math.avasan.org.git"
	);
	git(directory, "update-ref", "refs/remotes/origin/main", "HEAD");
	git(directory, "tag", "--annotate", "v1.2.3", "-m", "v1.2.3");
	return directory;
}

afterEach(async () => {
	await Promise.all(
		tempDirs.splice(0).map(directory =>
			rm(directory, {
				force: true,
				recursive: true
			})
		)
	);
});

describe("native release source gate", () => {
	it("accepts only the annotated package tag at exact origin/main", async () => {
		const repository = await createReleaseRepository();
		const commit = git(repository, "rev-parse", "HEAD");
		const result = runGate(releaseSourceGate, [
			repository,
			"1.2.3",
			commit
		]);

		expect(result.status).toBe(0);
		expect(result.stdout).toContain(
			`Verified annotated v1.2.3 at exact origin/main and expected revision ${commit}`
		);
	});

	it("rejects a lightweight release tag", async () => {
		const repository = await createReleaseRepository();
		git(repository, "tag", "--delete", "v1.2.3");
		git(repository, "tag", "v1.2.3");

		const result = runGate(releaseSourceGate, [
			repository,
			"1.2.3",
			git(repository, "rev-parse", "HEAD")
		]);
		expect(result.status).not.toBe(0);
		expect(result.stderr).toContain("must exist as an annotated tag");
	});

	it("rejects a candidate that is not exact origin/main", async () => {
		const repository = await createReleaseRepository();
		git(repository, "update-ref", "refs/remotes/origin/main", "HEAD^");

		const result = runGate(releaseSourceGate, [
			repository,
			"1.2.3",
			git(repository, "rev-parse", "HEAD")
		]);
		expect(result.status).not.toBe(0);
		expect(result.stderr).toContain("not the exact fetched origin/main");
	});

	it("rejects a checkout from another origin", async () => {
		const repository = await createReleaseRepository();
		git(
			repository,
			"remote",
			"set-url",
			"origin",
			"git@github.com:instruction-material/classes.jacobdanderson.net.git"
		);

		const result = runGate(releaseSourceGate, [
			repository,
			"1.2.3",
			git(repository, "rev-parse", "HEAD")
		]);
		expect(result.status).not.toBe(0);
		expect(result.stderr).toContain(
			"origin is not anderson-webops/math.avasan.org"
		);
	});

	it("rejects a candidate that differs from the independently expected revision", async () => {
		const repository = await createReleaseRepository();
		const result = runGate(releaseSourceGate, [
			repository,
			"1.2.3",
			git(repository, "rev-parse", "HEAD^")
		]);

		expect(result.status).not.toBe(0);
		expect(result.stderr).toContain(
			"does not match the independently expected commit"
		);
	});
});

describe("privileged static artifact boundary", () => {
	it("promotes only CI-attested artifacts through installed root-owned helpers", () => {
		const promoter = readFileSync(
			resolve(repositoryRoot, "deploy/direct/promote-static-release.sh"),
			"utf8"
		);
		const installer = readFileSync(
			resolve(repositoryRoot, "deploy/direct/install-trusted-helpers.sh"),
			"utf8"
		);
		const transaction = readFileSync(
			resolve(
				repositoryRoot,
				"deploy/direct/static-promotion-transaction.sh"
			),
			"utf8"
		);

		expect(promoter).toContain("/usr/bin/gh attestation verify");
		expect(promoter).toContain('--source-ref "refs/tags/v$version"');
		expect(promoter).toContain("--deny-self-hosted-runners");
		expect(promoter).toContain('--version "$version"');
		expect(promoter).toContain("/usr/local/libexec");
		expect(promoter).not.toContain("verify-release-source.sh");
		expect(promoter).not.toMatch(/\bnode\s+-[ep]\b/);
		expect(promoter).not.toContain("git -C");
		expect(installer).toContain("trusted-paths.py");
		expect(installer).toContain("gh-config");
		expect(promoter).toContain('. "$transaction_library"');
		expect(transaction).toContain("promote_candidate");
	});

	it("reuses a sealed legacy rollback only through the legacy verifier", () => {
		const transaction = readFileSync(
			resolve(repositoryRoot, "deploy/direct/promote-static-release.sh"),
			"utf8"
		);
		const transactionSource = readFileSync(
			resolve(
				repositoryRoot,
				"deploy/direct/static-promotion-transaction.sh"
			),
			"utf8"
		);

		expect(transaction).toContain(
			'previous_profile="$(legacy_recovery_profile'
		);
		expect(transactionSource).toContain("legacy-v1.0.16");
		expect(transactionSource).toContain("legacy_v1_family_matches");
		expect(transactionSource).toContain(
			'wait_for_previous_target "$previous_target" "$previous_profile"'
		);
		expect(transactionSource).toMatch(
			/verify_legacy_tree[^]*?\|\| return 1[^]*?install_release_policies/
		);
	});

	it("builds only the exact tracked revision with a fixed production origin", () => {
		const prepare = readFileSync(
			resolve(repositoryRoot, "deploy/direct/prepare-static-release.sh"),
			"utf8"
		);

		expect(prepare).toContain("EXPECTED_SOURCE_REVISION");
		expect(prepare).toContain("git -C \"$candidate\" archive");
		expect(prepare).toContain("export VITE_SITE_URL=https://math.avasan.org");
		expect(prepare).toContain('cd -- "$build_root"');
		expect(prepare).not.toContain('cd -- "$candidate"');
	});
});

describe("effective Nginx snippet gate", () => {
	const snippets = [
		"/etc/nginx/snippets/math.avasan.org-http-maps.conf",
		"/etc/nginx/snippets/math.avasan.org-server-policy.conf",
		"/etc/nginx/snippets/math.avasan.org-classroom-usage.inc"
	];

	async function writeDump(lines: string[]) {
		const directory = await mkdtemp(join(tmpdir(), "math-nginx-gate-"));
		tempDirs.push(directory);
		const dump = join(directory, "nginx-T.txt");
		await writeFile(dump, `${lines.join("\n")}\n`);
		return dump;
	}

	it("accepts each required snippet exactly once", async () => {
		const dump = await writeDump(
			snippets.flatMap(snippet => [
				`# configuration file ${snippet}:`,
				"# tested configuration"
			])
		);
		const result = runGate(nginxSnippetGate, [dump, ...snippets]);

		expect(result.status).toBe(0);
		expect(result.stdout).toContain("loaded exactly once");
	});

	it.each(["missing", "duplicate"])(
		"rejects a %s required snippet",
		async problem => {
			const markers = snippets.map(
				snippet => `# configuration file ${snippet}:`
			);
			if (problem === "missing") markers.pop();
			if (problem === "duplicate") markers.push(markers[0]);
			const dump = await writeDump(markers);
			const result = runGate(nginxSnippetGate, [dump, ...snippets]);

			expect(result.status).not.toBe(0);
			expect(result.stderr).toContain("exactly once");
		}
	);
});
