import { describe, expect, it } from "vitest";
import { releaseMetadata } from "../scripts/write-release-metadata.mjs";

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
				"1.0.0"
			)
		).toEqual({
			classroomUsageEnabled: false,
			revision: "unknown",
			version: "1.0.0"
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
		]
	])("rejects ambiguous release metadata", (environment, message) => {
		expect(() => releaseMetadata(environment)).toThrow(message);
	});
});
