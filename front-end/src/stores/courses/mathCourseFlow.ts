import type {
	CourseItemLearningPath,
	RawCourse,
	RawCourseModule,
	RawCourseModuleItem
} from "./types";

export interface MathCourseModuleFlow {
	title: string;
	legacyTitle?: string;
	estimatedTime: string;
	keyBlocks: string[];
	flowNote: string;
	kind?: "module" | "transition";
	choiceCurriculumTitles?: string[];
	challengeCurriculumTitles?: string[];
	coreSupplementalTitles?: string[];
	challengeSupplementalTitles?: string[];
}

interface MathCourseFlowOptions {
	appendixTitles: string[];
	courseId: string;
	modules: MathCourseModuleFlow[];
}

const COMBINING_MARKS_RE = /[\u0300-\u036F]/g;
const NON_ALPHANUMERIC_RE = /[^a-z0-9]+/g;
const LEADING_HYPHENS_RE = /^-+/;
const TRAILING_HYPHENS_RE = /-+$/;

function mathCourseSlugify(value: string) {
	return value
		.toLowerCase()
		.normalize("NFKD")
		.replace(COMBINING_MARKS_RE, "")
		.replace(NON_ALPHANUMERIC_RE, "-")
		.replace(LEADING_HYPHENS_RE, "")
		.replace(TRAILING_HYPHENS_RE, "");
}

function generatedModuleId(courseId: string, moduleTitle: string) {
	return mathCourseSlugify(`${courseId}-${moduleTitle}`);
}

function preserveItemId(
	item: RawCourseModuleItem,
	moduleId: string,
	location: "curriculum" | "supplemental"
) {
	item.id ??= mathCourseSlugify(`${moduleId}-${location}-${item.title}`);
}

function requireTitles(
	items: RawCourseModuleItem[],
	titles: string[],
	moduleTitle: string,
	location: "curriculum" | "supplemental"
) {
	const availableTitles = new Set(items.map(item => item.title));
	for (const title of titles) {
		if (!availableTitles.has(title)) {
			throw new Error(
				`Expected ${moduleTitle} ${location} item ${title}.`
			);
		}
	}
}

function moveItems(
	source: RawCourseModuleItem[],
	destination: RawCourseModuleItem[],
	titles: string[],
	learningPath: CourseItemLearningPath,
	moduleId: string,
	sourceLocation: "curriculum" | "supplemental"
) {
	const selectedTitles = new Set(titles);
	const moved: RawCourseModuleItem[] = [];
	const retained: RawCourseModuleItem[] = [];

	for (const item of source) {
		if (selectedTitles.has(item.title)) {
			preserveItemId(item, moduleId, sourceLocation);
			moved.push({ ...item, learningPath });
		} else {
			retained.push(item);
		}
	}

	source.splice(0, source.length, ...retained);
	destination.push(...moved);
}

function configureModule(
	module: RawCourseModule,
	flow: MathCourseModuleFlow,
	courseId: string
) {
	const legacyModuleId = generatedModuleId(
		courseId,
		flow.legacyTitle ?? module.title
	);

	if (flow.legacyTitle) {
		module.id ??= legacyModuleId;
		for (const item of module.curriculum) {
			preserveItemId(item, legacyModuleId, "curriculum");
		}
		for (const item of module.supplementalProjects) {
			preserveItemId(item, legacyModuleId, "supplemental");
		}
	}

	const choiceCurriculumTitles = flow.choiceCurriculumTitles ?? [];
	const challengeCurriculumTitles = flow.challengeCurriculumTitles ?? [];
	const coreSupplementalTitles = flow.coreSupplementalTitles ?? [];

	requireTitles(
		module.curriculum,
		[...choiceCurriculumTitles, ...challengeCurriculumTitles],
		module.title,
		"curriculum"
	);
	requireTitles(
		module.supplementalProjects,
		coreSupplementalTitles,
		module.title,
		"supplemental"
	);

	moveItems(
		module.curriculum,
		module.supplementalProjects,
		choiceCurriculumTitles,
		"choice",
		legacyModuleId,
		"curriculum"
	);
	moveItems(
		module.curriculum,
		module.supplementalProjects,
		challengeCurriculumTitles,
		"challenge",
		legacyModuleId,
		"curriculum"
	);
	moveItems(
		module.supplementalProjects,
		module.curriculum,
		coreSupplementalTitles,
		"core",
		legacyModuleId,
		"supplemental"
	);

	if (!module.curriculum.length) {
		throw new Error(`Math course module ${module.title} has no core item.`);
	}

	module.kind = flow.kind ?? "module";
	module.estimatedTime = flow.estimatedTime;
	module.keyBlocks = [...flow.keyBlocks];
	module.curriculum = module.curriculum.map((item, index) => ({
		...item,
		content:
			index === 0 && !item.content.includes("**Course flow:**")
				? `**Course flow:** ${flow.flowNote}\n\n${item.content}`
				: item.content,
		learningPath: "core"
	}));

	const challengeTitles = new Set(flow.challengeSupplementalTitles ?? []);
	module.supplementalProjects = module.supplementalProjects.map(item => ({
		...item,
		learningPath:
			item.learningPath === "challenge" || challengeTitles.has(item.title)
				? "challenge"
				: "choice"
	}));
}

function configureAppendix(module: RawCourseModule) {
	module.kind = "appendix";
	module.estimatedTime ??= "Optional reference";
	module.keyBlocks ??= [
		"source reference",
		"worked example",
		"evidence check",
		"targeted review",
		"transfer"
	];
	module.curriculum = module.curriculum.map(item => ({
		...item,
		learningPath: "choice"
	}));
	module.supplementalProjects = module.supplementalProjects.map(item => ({
		...item,
		learningPath: item.learningPath ?? "choice"
	}));
}

export function configureMathCourseFlow(
	course: RawCourse,
	options: MathCourseFlowOptions
) {
	const modulesByTitle = new Map(
		course.modules.map(module => [module.title, module])
	);
	const appendixTitles = new Set(options.appendixTitles);
	const expectedTitles = new Set([
		...options.modules.map(flow => flow.title),
		...options.appendixTitles
	]);

	const unexpectedModules = course.modules.filter(
		module => !expectedTitles.has(module.title)
	);
	if (unexpectedModules.length) {
		throw new Error(
			`Unconfigured ${course.name} modules: ${unexpectedModules
				.map(module => module.title)
				.join(", ")}.`
		);
	}

	const orderedModules = options.modules.map(flow => {
		const module = modulesByTitle.get(flow.title);
		if (!module) {
			throw new Error(`Expected ${course.name} module ${flow.title}.`);
		}
		configureModule(module, flow, options.courseId);
		return module;
	});

	const appendices = options.appendixTitles.map(title => {
		const module = modulesByTitle.get(title);
		if (!module) {
			throw new Error(`Expected ${course.name} appendix ${title}.`);
		}
		configureAppendix(module);
		return module;
	});

	for (const title of appendixTitles) {
		if (options.modules.some(flow => flow.title === title)) {
			throw new Error(
				`${course.name} module ${title} cannot also be an appendix.`
			);
		}
	}

	course.modules = [...orderedModules, ...appendices];
}
