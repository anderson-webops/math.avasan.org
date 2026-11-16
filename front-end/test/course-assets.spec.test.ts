import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
	courseAssetViewerUrl,
	extractMarkdownSection,
	loadCourseAssetSection,
	parseCourseAssetUrl,
	resetCourseAssetPreviewCache,
	slugMarkdownHeading
} from "@/modules/courseAssetPreview";
import { algebraErrorAnalysisCases } from "@/stores/courses/algebraErrorAnalysisCases";
import practice from "@/stores/courses/algebra1APracticeData.json";

describe("local Math self-check resources", () => {
	beforeEach(resetCourseAssetPreviewCache);
	afterEach(() => {
		vi.restoreAllMocks();
	});

	it("bundles all authored self-checks with complete, byte-matching answer sections", async () => {
		const network = vi
			.spyOn(globalThis, "fetch")
			.mockRejectedValue(
				new Error("Self-check data must use the compiled application.")
			);
		const paths = [
			"/course-assets/algebra-1/practice-checks-v1.md",
			"/course-assets/algebra-1a/practice-checks-v1.md"
		];
		for (const path of paths) {
			const source = readFileSync(
				resolve(process.cwd(), "src", path.slice(1))
			);
			expect(source.byteLength).toBeLessThanOrEqual(64 * 1024);
			expect((await loadCourseAssetSection(path)).content).toBe(
				source.toString("utf8").trim()
			);
		}
		expect(practice).toHaveLength(28);
		for (const entry of practice) {
			expect(entry.questions).toHaveLength(3);
			expect(entry.answers).toHaveLength(3);
			const asset =
				"/course-assets/algebra-1a/practice-checks-v1.md#" +
				slugMarkdownHeading(entry.heading);
			const section = await loadCourseAssetSection(asset);
			expect(section.title).toBe(entry.heading);
			for (const answer of entry.answers)
				expect(section.content).toContain(answer);
			const target = new URL(
				courseAssetViewerUrl(asset),
				"https://math.avasan.org"
			);
			expect(target.pathname).toBe("/courses/");
			expect(target.searchParams.get("asset")).toBe(asset);
		}
		for (const entry of algebraErrorAnalysisCases) {
			const asset =
				"/course-assets/algebra-1/practice-checks-v1.md#" +
				slugMarkdownHeading(entry.heading);
			const section = await loadCourseAssetSection(asset);
			expect(section.title).toBe(entry.heading);
			expect(section.content.length).toBeGreaterThan(100);
			expect(
				new URL(
					courseAssetViewerUrl(asset, "", entry.course),
					"https://math.avasan.org"
				).searchParams.get("course")
			).toBe(entry.course);
		}
		expect(network).not.toHaveBeenCalled();
		expect(() =>
			extractMarkdownSection("# Resource", "missing-section")
		).toThrow("could not be found");
	});

	it("rejects unapproved resource identities without a file or network request", async () => {
		const network = vi.spyOn(globalThis, "fetch");
		for (const value of [
			"https://example.invalid/file.md",
			"//example.invalid/file.md",
			"/api/private.md",
			"/course-assets/../private.md",
			"/course-assets/%2e%2e/private.md",
			"/course-assets/algebra-1a/other.md",
			"/course-assets/algebra-1a/practice-checks-v1.md?redirect=/api",
			"/course-assets/algebra-1a/practice-checks-v1.md#bad#section",
			"a".repeat(513)
		]) {
			expect(parseCourseAssetUrl(value)).toBeNull();
			await expect(loadCourseAssetSection(value)).rejects.toThrow(
				"unavailable"
			);
		}
		expect(network).not.toHaveBeenCalled();
	});
});
