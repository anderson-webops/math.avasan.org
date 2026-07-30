import { describe, expect, it } from "vitest";
import {
	gitSourceRevision,
	releaseMetadata
} from "../scripts/write-release-metadata.mjs";

describe("release metadata", () => {
	it("normalizes a release tag and records the exact source revision", () => {
		expect(
			releaseMetadata({
				MATH_RELEASE_VERSION: "v1.2.3",
				SOURCE_REVISION: "a".repeat(40)
			}, "", true)
		).toEqual({
			classroomUsageEnabled: true,
			revision: "a".repeat(40),
			version: "1.2.3"
		});
	});

	it("uses reproducible local-build defaults", () => {
		expect(
			releaseMetadata(
				{ VITE_CLASSROOM_USAGE_ENABLED: "true" },
				"1.0.2",
				false,
				"b".repeat(40)
			)
		).toEqual({
			classroomUsageEnabled: false,
			revision: "b".repeat(40),
			version: "1.0.2"
		});
	});

	it.each([
		[
			{ MATH_RELEASE_VERSION: "latest", SOURCE_REVISION: "a".repeat(40) },
			"MATH_RELEASE_VERSION"
		],
		[
			{ MATH_RELEASE_VERSION: "1.2.3", SOURCE_REVISION: "short" },
			"SOURCE_REVISION"
		],
		[
			{ MATH_RELEASE_VERSION: "1.0.1", SOURCE_REVISION: "a".repeat(40) },
			"root package version",
			"1.0.2"
		],
		[
			{ MATH_RELEASE_VERSION: "1.0.2", SOURCE_REVISION: "unknown" },
			"SOURCE_REVISION",
			"1.0.2"
		]
	])("rejects ambiguous release metadata", (environment, message, defaultVersion = "") => {
		expect(() => releaseMetadata(environment, defaultVersion)).toThrow(message);
	});

	it("derives a full revision from the current Git checkout", () => {
		expect(gitSourceRevision()).toMatch(/^[0-9a-f]{40}$/);
	});
});
