import { execFileSync, spawnSync } from "node:child_process";
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
		const result = runGate(releaseSourceGate, [repository, "1.2.3"]);

		expect(result.status).toBe(0);
		expect(result.stdout).toContain(
			"Verified annotated v1.2.3 at exact origin/main revision"
		);
	});

	it("rejects a lightweight release tag", async () => {
		const repository = await createReleaseRepository();
		git(repository, "tag", "--delete", "v1.2.3");
		git(repository, "tag", "v1.2.3");

		const result = runGate(releaseSourceGate, [repository, "1.2.3"]);
		expect(result.status).not.toBe(0);
		expect(result.stderr).toContain("must exist as an annotated tag");
	});

	it("rejects a candidate that is not exact origin/main", async () => {
		const repository = await createReleaseRepository();
		git(repository, "update-ref", "refs/remotes/origin/main", "HEAD^");

		const result = runGate(releaseSourceGate, [repository, "1.2.3"]);
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

		const result = runGate(releaseSourceGate, [repository, "1.2.3"]);
		expect(result.status).not.toBe(0);
		expect(result.stderr).toContain(
			"origin is not anderson-webops/math.avasan.org"
		);
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
