import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { flushPromises, mount } from "@vue/test-utils";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
	courseAssetViewerUrl,
	extractMarkdownSection,
	loadCourseAssetSection,
	parseCourseAssetUrl,
	resetCourseAssetPreviewCache,
	resolveCourseAssetImages,
	slugMarkdownHeading
} from "@/modules/courseAssetPreview";
import { algebraErrorAnalysisCases } from "@/stores/courses/algebraErrorAnalysisCases";
import practice from "@/stores/courses/algebra1APracticeData.json";
import { elementaryCourseAssetSources } from "@/modules/courseAssetSourcesElementary";
import CourseMarkdownContent from "@/components/CourseMarkdownContent.vue";
import upstreamAssets from "./fixtures/elementary-upstream-assets.json";
import {
	CALCULUS_ASSET_COURSES,
	CALCULUS_ASSET_LOADERS,
	CALCULUS_COURSE_IDS,
	calculusCourseAssetViewerUrl
} from "@/modules/courseAssetSourcesCalculus";
import { loadRawCourse } from "@/stores/courses/index";

describe("local Math self-check resources", () => {
	it("bundles all three calculus guides and resolves all 64 answer bindings without fetching", async () => {
		const network = vi
			.spyOn(globalThis, "fetch")
			.mockRejectedValue(new Error("Compiled resources only"));
		expect(Object.keys(CALCULUS_ASSET_LOADERS)).toHaveLength(3);
		expect(Object.keys(CALCULUS_ASSET_COURSES)).toEqual(
			Object.keys(CALCULUS_ASSET_LOADERS)
		);
		const documents = new Map<string, string>();
		for (const [path, load] of Object.entries(CALCULUS_ASSET_LOADERS)) {
			const markdown = await load();
			const source = readFileSync(
				resolve(process.cwd(), "src", path.slice(1)),
				"utf8"
			);
			expect(markdown).toBe(source);
			expect(
				new TextEncoder().encode(markdown).byteLength
			).toBeLessThanOrEqual(64 * 1024);
			const slugs = [...markdown.matchAll(/^## (.+)$/gm)].map(match =>
				slugMarkdownHeading(match[1])
			);
			expect(new Set(slugs).size).toBe(slugs.length);
			documents.set(path, markdown);
		}
		const bindings = new Set<string>();
		for (const courseId of CALCULUS_COURSE_IDS) {
			const course = await loadRawCourse(courseId);
			for (const item of course!.modules.flatMap(module => [
				...module.curriculum,
				...module.supplementalProjects
			])) {
				for (const match of item.content.matchAll(
					/\/courses\/\?[^\s)]+/g
				)) {
					const url = new URL(match[0], "https://math.avasan.org");
					const asset = url.searchParams.get("asset")!;
					const [path, hash] = asset.split("#");
					expect(url.searchParams.get("course")).toBe(courseId);
					expect(CALCULUS_ASSET_COURSES[path]).toBe(courseId);
					expect(
						extractMarkdownSection(documents.get(path)!, hash)
							.length
					).toBeGreaterThan(100);
					bindings.add(asset);
				}
			}
		}
		expect(bindings.size).toBe(64);
		expect(network).not.toHaveBeenCalled();
	});

	it("rejects unlisted calculus resources and cross-course bindings", () => {
		for (const asset of [
			"https://example.invalid/practice.md",
			"/course-assets/pre-calculus-a/../private.md",
			"/course-assets/pre-calculus-a/practice-checks-v2.md#bad#section",
			"/course-assets/pre-calculus-a/practice-checks-v2.md?redirect=/api",
			"/course-assets/toString",
			"a".repeat(513)
		])
			expect(() => calculusCourseAssetViewerUrl(asset)).toThrow(
				"Unsupported"
			);
		expect(() =>
			calculusCourseAssetViewerUrl(
				"/course-assets/pre-calculus-a/practice-checks-v2.md",
				"",
				"ap-calculus"
			)
		).toThrow("Unsupported");
	});

	beforeEach(resetCourseAssetPreviewCache);
	afterEach(() => {
		vi.restoreAllMocks();
	});

	it("bundles all authored self-checks with complete, byte-matching answer sections", async () => {
		for (const asset of upstreamAssets.files) {
			const bytes = readFileSync(resolve(process.cwd(), asset.path));
			expect(
				createHash("sha256").update(bytes).digest("hex"),
				asset.path
			).toBe(asset.sha256);
		}
		const network = vi
			.spyOn(globalThis, "fetch")
			.mockRejectedValue(
				new Error("Self-check data must use the compiled application.")
			);
		const paths = [
			"/course-assets/algebra-1/practice-checks-v1.md",
			"/course-assets/algebra-1a/practice-checks-v1.md",
			...Object.keys(elementaryCourseAssetSources.markdown)
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
		const imageMarkdown = Object.keys(elementaryCourseAssetSources.images)
			.map((path) => `![Supplied course diagram](${path})`)
			.join("\n\n");
		const resolved = await resolveCourseAssetImages(imageMarkdown);
		expect(resolved).not.toContain("](/course-assets/");
		const wrapper = mount(CourseMarkdownContent, {
			props: { content: imageMarkdown }
		});
		await flushPromises();
		await vi.waitFor(() => expect(wrapper.findAll("img")).toHaveLength(6));
		for (const image of wrapper.findAll("img"))
			expect(image.attributes("src")).toMatch(
				/^\/(?:src\/course-assets|assets)\//u
			);
		wrapper.unmount();
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
