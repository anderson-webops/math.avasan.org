import type { RawCourse, RawCourseModule } from "./types";
import { courseAssetViewerUrl } from "@/modules/courseAssetPreview";
import { mathCourseSlugify } from "./mathCourseFlow";

interface ElementaryTask {
	title?: string;
	prompt: string;
	anchor: string;
}

export interface ElementaryMaterial {
	code: string;
	method: string;
	worked: string;
	tasks: ElementaryTask[];
	practice: ElementaryTask;
	challenge: ElementaryTask;
}

function moduleCode(title: string) {
	const checkpoint = /^check-in\s*#(\d+)$/iu.exec(title);
	if (checkpoint) return `check-${checkpoint[1]}`;
	return /^(?:EEA|EEB|LEA|LEB)\d+\b/u.exec(title)?.[0];
}

function uniqueMatch<Item>(
	items: Item[],
	matches: (item: Item) => boolean,
	identity: string
): Item {
	const found = items.filter(matches);
	if (found.length !== 1) {
		throw new Error(
			`Expected one Elementary binding for ${identity}; found ${found.length}.`
		);
	}
	return found[0];
}

function retainedSection(content: string, label: string) {
	const marker = `**${label}:**`;
	const start = content.indexOf(marker);
	if (start < 0) return "";
	const body = content.slice(start + marker.length).trimStart();
	const end = body.search(/\n\s*\n/u);
	return `${marker}\n${end < 0 ? body.trim() : body.slice(0, end).trim()}`;
}

function preserveItemIds(courseId: string, module: RawCourseModule) {
	const moduleId = mathCourseSlugify(`${courseId}-${module.title}`);
	module.id ??= moduleId;
	for (const section of ["curriculum", "supplementalProjects"] as const) {
		for (const item of module[section]) {
			item.id ??= mathCourseSlugify(
				`${moduleId}-${section === "curriculum" ? "curriculum" : "supplemental"}-${item.title}`
			);
		}
	}
}

export function applyElementaryCourseMaterials(
	course: RawCourse,
	raw: RawCourse,
	courseId: string,
	asset: string,
	materials: ElementaryMaterial[]
) {
	if (
		materials.length !== raw.modules.length ||
		new Set(raw.modules.map(module => moduleCode(module.title))).size !==
			raw.modules.length ||
		new Set(materials.map(material => material.code)).size !==
			materials.length
	) {
		throw new Error(
			`Elementary material/module coverage differs for ${courseId}.`
		);
	}
	for (const original of raw.modules) {
		const code = moduleCode(original.title);
		if (!code) {
			throw new Error(
				`Missing Elementary module code: ${original.title}.`
			);
		}
		const material = uniqueMatch(
			materials,
			item => item.code === code,
			`${courseId}/${code} material`
		);
		const displayed = uniqueMatch(
			course.modules,
			module => moduleCode(module.title) === code,
			`${courseId}/${code} module`
		);
		const reading = displayed.curriculum[0];
		if (!reading || !original.curriculum[0])
			throw new Error(`Missing Elementary reading: ${courseId}/${code}.`);
		if (courseId === "early-elementary-a-math" && code === "EEA4") {
			reading.id ??= mathCourseSlugify(
				`${courseId}-${displayed.title}-curriculum-Escape the Game Core Concepts`
			);
		}
		preserveItemIds(courseId, displayed);
		const selfCheck = (anchor: string) =>
			`[Project self-check](${courseAssetViewerUrl(`${asset}#${anchor}`, "Practice self-check", courseId)})`;
		const rawProjects = original.curriculum.slice(1);
		if (
			new Set(rawProjects.map(item => item.title)).size !==
			rawProjects.length
		) {
			throw new Error(
				`Duplicate Elementary source tasks: ${courseId}/${code}.`
			);
		}
		for (const supplied of material.tasks) {
			uniqueMatch(
				rawProjects,
				item => item.title === supplied.title,
				`${courseId}/${code}/${supplied.title}`
			);
		}
		const projects = rawProjects.map(item => {
			const supplied = material.tasks.filter(
				task => task.title === item.title
			);
			if (
				supplied.length !== 1 &&
				!(
					supplied.length === 0 &&
					courseId === "early-elementary-a-math" &&
					code === "EEA4" &&
					item.preserveInstructions &&
					item.preserveAssignment
				)
			) {
				throw new Error(
					`Missing or duplicate Elementary task inputs: ${courseId}/${code}/${item.title}.`
				);
			}
			const previous = displayed.curriculum.filter(
				candidate =>
					candidate !== reading && candidate.title === item.title
			);
			if (previous.length > 1) {
				throw new Error(
					`Duplicate existing Elementary task: ${courseId}/${code}/${item.title}.`
				);
			}
			const existing = previous[0];
			const id =
				existing?.id ??
				item.id ??
				mathCourseSlugify(
					`${courseId}-${displayed.title}-curriculum-${item.title}`
				);
			const aliases = [
				...new Set([
					...(existing?.aliases ?? []),
					...(item.aliases ?? []),
					...(item.id && item.id !== id ? [item.id] : [])
				])
			];
			return {
				...item,
				...existing,
				id,
				...(aliases.length ? { aliases } : {}),
				content: supplied.length
					? [
							"**Problems**",
							supplied[0].prompt,
							retainedSection(
								item.content,
								"Completion evidence"
							),
							selfCheck(supplied[0].anchor)
						]
							.filter(Boolean)
							.join("\n\n")
					: item.content,
				contentKind: "assignment" as const,
				learningPath: item.learningPath ?? ("core" as const),
				preserveAssignment: true,
				preserveInstructions: true
			};
		});
		const projectIds = new Set(projects.map(item => item.id));
		reading.aliases = reading.aliases?.filter(
			alias => !projectIds.has(mathCourseSlugify(alias))
		);
		reading.contentKind = "reading";
		reading.preserveInstructions = true;
		reading.content = [
			"**Method**",
			material.method,
			"**Worked example**",
			material.worked,
			retainedSection(original.curriculum[0].content, "Course flow"),
			retainedSection(
				original.curriculum[0].content,
				"Evidence checklist"
			)
		]
			.filter(Boolean)
			.join("\n\n");
		const retained = displayed.curriculum.filter(
			item =>
				item !== reading &&
				!projects.some(project => project.id === item.id)
		);
		displayed.curriculum = [reading, ...projects, ...retained];
		for (const [prefix, task] of [
			["Practice Map:", material.practice],
			["Extension Review:", material.challenge]
		] as const) {
			const item = uniqueMatch(
				displayed.supplementalProjects,
				candidate => candidate.title.startsWith(prefix),
				`${courseId}/${code}/${prefix}`
			);
			const source = uniqueMatch(
				original.supplementalProjects,
				candidate => candidate.title.startsWith(prefix),
				`${courseId}/${code}/${prefix} source`
			);
			item.content = [
				"**Problems**",
				task.prompt,
				retainedSection(source.content, "Completion evidence"),
				selfCheck(task.anchor)
			]
				.filter(Boolean)
				.join("\n\n");
			item.contentKind = "assignment";
			item.preserveAssignment = true;
			item.preserveInstructions = true;
		}
	}
}
