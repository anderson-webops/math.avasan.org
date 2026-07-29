import type {
	CourseDevelopmentMetadata,
	RawCourse,
	RawCourseModule,
	RawCourseModuleItem
} from "./types";

export interface MathModuleSupplementalAppend {
	index: number;
	moduleTitle: string;
	expectedExistingCount: number;
	items: RawCourseModuleItem[];
}

export interface MathCoursePatch {
	expectedModuleCount: number;
	developmentMetadata?: CourseDevelopmentMetadata;
	moduleSupplementalAppends?: MathModuleSupplementalAppend[];
	addedModules?: RawCourseModule[];
}

export type MathCoursePatchMap = Readonly<
	Partial<Record<string, MathCoursePatch>>
>;

function cloneItem(item: RawCourseModuleItem): RawCourseModuleItem {
	return {
		...item,
		...(item.aliases ? { aliases: [...item.aliases] } : {})
	};
}

function cloneModule(module: RawCourseModule): RawCourseModule {
	return {
		...module,
		...(module.aliases ? { aliases: [...module.aliases] } : {}),
		...(module.keyBlocks ? { keyBlocks: [...module.keyBlocks] } : {}),
		curriculum: module.curriculum.map(cloneItem),
		supplementalProjects: module.supplementalProjects.map(cloneItem)
	};
}

function cloneDevelopmentMetadata(
	metadata: CourseDevelopmentMetadata
): CourseDevelopmentMetadata {
	return {
		...metadata,
		standards: [...metadata.standards],
		assessmentCadence: [...metadata.assessmentCadence],
		toolchain: [...metadata.toolchain],
		safetyPolicy: [...metadata.safetyPolicy],
		courseBoundaries: [...metadata.courseBoundaries],
		capstoneExpectations: [...metadata.capstoneExpectations],
		recommendedNextWork: [...metadata.recommendedNextWork]
	};
}

export function applyMathCoursePatch(
	courseId: string,
	course: RawCourse,
	patches: MathCoursePatchMap
) {
	const patch = patches[courseId];
	if (!patch) return;

	if (course.modules.length !== patch.expectedModuleCount) {
		throw new Error(
			`Math enrichment patch for ${courseId} expected ${patch.expectedModuleCount} modules, but found ${course.modules.length}.`
		);
	}

	if (patch.developmentMetadata) {
		course.developmentMetadata = cloneDevelopmentMetadata(
			patch.developmentMetadata
		);
	}

	for (const append of patch.moduleSupplementalAppends ?? []) {
		const module = course.modules[append.index];
		if (!module || module.title !== append.moduleTitle) {
			throw new Error(
				`Math enrichment patch for ${courseId} could not find module ${append.moduleTitle} at index ${append.index}.`
			);
		}
		if (
			module.supplementalProjects.length !== append.expectedExistingCount
		) {
			throw new Error(
				`Math enrichment patch for ${courseId}/${append.moduleTitle} expected ${append.expectedExistingCount} supplemental projects, but found ${module.supplementalProjects.length}.`
			);
		}

		module.supplementalProjects.push(...append.items.map(cloneItem));
	}

	for (const module of patch.addedModules ?? []) {
		if (course.modules.some(existing => existing.title === module.title)) {
			throw new Error(
				`Math enrichment patch for ${courseId} would duplicate module ${module.title}.`
			);
		}
		course.modules.push(cloneModule(module));
	}
}
