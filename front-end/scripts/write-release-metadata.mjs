import { readFileSync } from "node:fs";
import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const releaseVersionPattern =
	/^(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)(?:-[0-9A-Za-z.-]+)?$/;
const sourceRevisionPattern = /^(?:[0-9a-f]{40}|unknown)$/;

export function committedClassroomUsageState() {
	const configuration = JSON.parse(
		readFileSync(
			resolve(process.cwd(), "src/config/classroom-usage.json"),
			"utf8"
		)
	);
	if (typeof configuration.classroomUsageEnabled !== "boolean") {
		throw new TypeError(
			"classroom-usage.json must contain a boolean classroomUsageEnabled value."
		);
	}
	return configuration.classroomUsageEnabled;
}

export function releaseMetadata(
	environment = process.env,
	defaultVersion = "",
	classroomUsageEnabled = committedClassroomUsageState()
) {
	const version = (
		environment.MATH_RELEASE_VERSION || defaultVersion
	).replace(/^v/, "");
	const revision = environment.SOURCE_REVISION || "unknown";
	if (!releaseVersionPattern.test(version)) {
		throw new Error(
			"MATH_RELEASE_VERSION must be a semantic version such as 1.0.1."
		);
	}
	if (!sourceRevisionPattern.test(revision)) {
		throw new Error(
			"SOURCE_REVISION must be a full lowercase Git commit SHA."
		);
	}

	return {
		classroomUsageEnabled,
		revision,
		version
	};
}

export async function writeReleaseMetadata(
	target = new URL("../dist/release.json", import.meta.url),
	environment = process.env,
	defaultVersion = ""
) {
	const metadata = releaseMetadata(environment, defaultVersion);
	await writeFile(target, `${JSON.stringify(metadata, null, 2)}\n`, "utf8");
	return metadata;
}

const invokedUrl = process.argv[1] ? pathToFileURL(process.argv[1]).href : "";
if (import.meta.url === invokedUrl) {
	const rootPackage = JSON.parse(
		readFileSync(new URL("../../package.json", import.meta.url), "utf8")
	);
	await writeReleaseMetadata(undefined, process.env, rootPackage.version);
}
