import type { RawCourse } from "@/stores/courses/types";
import type { ElementaryMaterial } from "@/stores/courses/elementaryCourseMaterials";
import { createPinia, setActivePinia } from "pinia";
import { expect } from "vitest";
import { loadCourseAssetSection } from "@/modules/courseAssetPreview";
import { useCoursesStore } from "@/stores/courses";
import { mathCourseSlugify } from "@/stores/courses/mathCourseFlow";
import identities from "./fixtures/elementary-identities.json";

export async function expectElementaryMaterials(
	courseId: string,
	raw: RawCourse,
	materials: ElementaryMaterial[]
) {
	setActivePinia(createPinia());
	const course = await useCoursesStore().loadCourseById(courseId);
	if (!course) throw new Error(`Missing Elementary course ${courseId}.`);
	const identity = identities.courses.find((entry) => entry.id === courseId)!;
	for (const previousModule of identity.modules) {
		const module = course.modules.find(
			(entry) => entry.id === previousModule.id
		);
		expect(module, previousModule.id).toBeDefined();
		for (const alias of previousModule.aliases)
			expect(module?.aliases).toContain(alias);
		for (const previous of previousModule.items) {
			const item = [
				...module!.curriculum,
				...module!.supplementalProjects
			].find((entry) => entry.id === previous.id);
			expect(item, previous.id).toBeDefined();
			for (const alias of previous.aliases)
				expect(item?.aliases).toContain(alias);
		}
	}
	for (const original of raw.modules) {
		const code = /^check-in #/iu.test(original.title)
			? `check-${original.title.slice(-1)}`
			: original.title.split(" ")[0];
		const material = materials.find((entry) => entry.code === code)!;
		const module = course.modules.find(
			(entry) =>
				entry.id === mathCourseSlugify(`${courseId}-${original.title}`)
		)!;
		expect(module.estimatedTime).toBe(original.estimatedTime);
		expect(module.keyBlocks).toEqual(original.keyBlocks);
		const reading = module.curriculum[0];
		expect(reading.contentKind).toBe("reading");
		expect(reading.preserveInstructions).toBe(true);
		expect(reading.content).toContain(material.method);
		expect(reading.content).toContain(material.worked);
		expect(reading.content).toContain(
			original.curriculum[0].content.split("**Course flow:**")[1].trim()
		);
		for (const source of original.curriculum.slice(1)) {
			const matching = module.curriculum.filter(
				(item) => item.title === source.title
			);
			expect(matching, source.title).toHaveLength(1);
			const item = matching[0];
			expect(item.contentKind).toBe("assignment");
			expect(item.preserveInstructions).toBe(true);
			expect(item.preserveAssignment).toBe(true);
			expect(item.learningPath).toBe(source.learningPath);
			expect(item.content).toContain(
				source.content.split("**Completion evidence:**")[1].trim()
			);
			const supplied = material.tasks.find(
				(task) => task.title === source.title
			);
			if (supplied) expect(item.content).toContain(supplied.prompt);
			else expect(item.content).toBe(source.content);
		}
		for (const [index, task] of [
			material.practice,
			material.challenge
		].entries()) {
			const item = module.supplementalProjects[index];
			expect(item.learningPath).toBe(
				original.supplementalProjects[index].learningPath
			);
			expect(item.contentKind).toBe("assignment");
			expect(item.content).toContain(task.prompt);
		}
		for (const item of [
			...module.curriculum.slice(1),
			...module.supplementalProjects
		]) {
			const links = [
				...item.content.matchAll(/\[Project self-check\]\(([^)]+)\)/gu)
			];
			expect(links, item.title).toHaveLength(1);
			const target = new URL(links[0][1], "https://math.avasan.org");
			expect(target.pathname).toBe("/courses/");
			expect(target.searchParams.get("course")).toBe(courseId);
			const section = await loadCourseAssetSection(
				target.searchParams.get("asset")!
			);
			expect(section.content, item.title).not.toBe("");
		}
	}
	const itemIds = course.modules.flatMap((module) =>
		[...module.curriculum, ...module.supplementalProjects].map(
			(item) => item.id
		)
	);
	expect(new Set(itemIds).size).toBe(itemIds.length);
}
