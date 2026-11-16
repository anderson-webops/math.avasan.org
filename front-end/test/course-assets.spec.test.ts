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
		vi.useRealTimers();
	});

	it("resolves all authored self-checks with their complete answers", async () => {
		const fetcher = vi.fn<typeof fetch>(
			async value =>
				new Response(
					readFileSync(
						resolve(
							process.cwd(),
							"public",
							String(value).slice(1)
						),
						"utf8"
					)
				)
		);
		expect(practice).toHaveLength(28);
		for (const entry of practice) {
			expect(entry.questions).toHaveLength(3);
			expect(entry.answers).toHaveLength(3);
			const asset = `/course-assets/algebra-1a/practice-checks-v1.md#${slugMarkdownHeading(entry.heading)}`;
			const section = await loadCourseAssetSection(asset, fetcher);
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
			const asset = `/course-assets/algebra-1/practice-checks-v1.md#${slugMarkdownHeading(entry.heading)}`;
			const section = await loadCourseAssetSection(asset, fetcher);
			expect(section.title).toBe(entry.heading);
			expect(section.content.length).toBeGreaterThan(100);
			expect(
				new URL(
					courseAssetViewerUrl(asset, "", entry.course),
					"https://math.avasan.org"
				).searchParams.get("course")
			).toBe(entry.course);
		}
		expect(fetcher).toHaveBeenCalledTimes(2);
		expect(fetcher).toHaveBeenCalledWith(
			"/course-assets/algebra-1a/practice-checks-v1.md",
			expect.objectContaining({ credentials: "omit", redirect: "error" })
		);
		expect(() =>
			extractMarkdownSection("# Resource", "missing-section")
		).toThrow("could not be found");
	});

	it("rejects unapproved paths before any request", async () => {
		const fetcher = vi.fn<typeof fetch>();
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
			await expect(
				loadCourseAssetSection(value, fetcher)
			).rejects.toThrow("unavailable");
		}
		expect(fetcher).not.toHaveBeenCalled();
	});

	it("bounds streamed responses and permits a failed resource to recover", async () => {
		const fetcher = vi
			.fn<typeof fetch>()
			.mockResolvedValueOnce(new Response("x".repeat(65 * 1024)))
			.mockResolvedValueOnce(new Response("# Recovered\n\nAnswer"));
		const asset = "/course-assets/algebra-1a/practice-checks-v1.md";
		await expect(loadCourseAssetSection(asset, fetcher)).rejects.toThrow(
			"supported size"
		);
		await expect(
			loadCourseAssetSection(asset, fetcher)
		).resolves.toMatchObject({ title: "Recovered" });
		expect(fetcher).toHaveBeenCalledTimes(2);
	});

	it("aborts a stalled resource request", async () => {
		vi.useFakeTimers();
		const fetcher = vi.fn<typeof fetch>(
			(_value, options) =>
				new Promise((_resolve, reject) => {
					options?.signal?.addEventListener(
						"abort",
						() => reject(new Error("Request aborted")),
						{ once: true }
					);
				})
		);
		const assertion = expect(
			loadCourseAssetSection(
				"/course-assets/algebra-1a/practice-checks-v1.md",
				fetcher
			)
		).rejects.toThrow("Request aborted");
		await vi.advanceTimersByTimeAsync(10_001);
		await assertion;
	});
});
