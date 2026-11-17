import { describe, expect, it } from "vitest";
import { extractMarkdownSection } from "@/modules/courseAssetPreview";
import {
	algebraCourseAssetSources,
	algebraCourseAssetViewerUrl
} from "@/modules/courseAssetSourcesAlgebra";
import {
	algebra2Checkpoint,
	algebra2Checkpoints
} from "@/stores/courses/algebra2Checkpoints";
import {
	algebra2ReadingMethods,
	algebra2Readings
} from "@/stores/courses/algebra2Readings";
import { algebra2BCourse } from "@/stores/courses/algebra-2b";
import { loadRawCourse } from "@/stores/courses/index";

const EXPECTED_MODULE_SEQUENCE = [
	"ALB1 Introduction to Logarithms",
	"ALB2 Exponential and Logarithmic Functions",
	"ALB3 Arithmetic Sequences",
	"ALB4 Geometric Sequences",
	"ALB5 Matrix Operations",
	"Check-In #1",
	"ALB6 Probability",
	"ALB7 Data and Statistics",
	"ALB8 Trigonometry Basics",
	"ALB9 Graphing Trigonometric Functions",
	"Check-In #2",
	"ALB10 Algebra 2B Modeling Capstone"
];

function requireModule(title: string) {
	const module = algebra2BCourse.modules.find(
		candidate => candidate.title === title
	);
	if (!module) throw new Error(`Expected Algebra 2B module ${title}.`);
	return module;
}

describe("algebra 2B learner flow", () => {
	it("adds a synthesis capstone after both readiness gates", () => {
		expect(
			algebra2BCourse.modules
				.filter(module => module.kind !== "appendix")
				.map(module => module.title)
		).toEqual(EXPECTED_MODULE_SEQUENCE);
		expect(
			algebra2BCourse.modules.find(
				module => module.title === "Reference Archive: Algebra 2B"
			)?.kind
		).toBe("appendix");
	});

	it("adds pacing, targets, flow notes, and explicit paths", () => {
		for (const module of algebra2BCourse.modules.filter(
			candidate => candidate.kind !== "appendix"
		)) {
			expect(module.estimatedTime, module.title).toMatch(/session/);
			expect(
				module.keyBlocks?.length,
				module.title
			).toBeGreaterThanOrEqual(5);
			expect(
				module.curriculum.every(item => item.learningPath === "core"),
				module.title
			).toBe(true);
			expect(
				module.supplementalProjects.every(item =>
					["choice", "challenge"].includes(item.learningPath ?? "")
				),
				module.title
			).toBe(true);
			expect(module.curriculum[0]?.content, module.title).toContain(
				"**Course flow:**"
			);
		}
	});

	it("keeps data and triangle visual references optional", () => {
		expect(
			requireModule("ALB7 Data and Statistics").supplementalProjects[0]
		).toEqual(
			expect.objectContaining({
				learningPath: "choice",
				title: "Data Visual References"
			})
		);
		expect(
			requireModule("ALB8 Trigonometry Basics").supplementalProjects[0]
		).toEqual(
			expect.objectContaining({
				learningPath: "choice",
				title: "Triangle Diagram References"
			})
		);
	});

	it("requires a cross-strand model comparison and limits extensions", () => {
		const capstone = requireModule("ALB10 Algebra 2B Modeling Capstone");
		expect(capstone.curriculum[0]?.content).toContain(
			"connects at least three Algebra 2B strands"
		);
		expect(capstone.curriculum[0]?.content).toContain("Pre-Calculus");
		expect(
			capstone.supplementalProjects.map(item => item.learningPath)
		).toEqual(["choice", "challenge"]);
	});
});

describe("algebra 2B historical baseline", () => {
	it("retains twelve methods, twenty-two classified readings and both complete checkpoints", async () => {
		const course = (await loadRawCourse("algebra-2b"))!;
		const methods = algebra2ReadingMethods.filter(
			entry => entry.courseId === "algebra-2b"
		);
		const readings = algebra2Readings.filter(
			entry => entry.courseId === "algebra-2b"
		);
		expect(methods).toHaveLength(12);
		expect(readings).toHaveLength(22);
		for (const entry of methods) {
			const module = course.modules.find(
				module => module.title === entry.moduleTitle
			)!;
			expect(
				module.curriculum.filter(
					item =>
						item.content.includes(entry.methods) &&
						item.content.includes(entry.worked)
				),
				entry.target
			).toHaveLength(1);
		}
		for (const entry of readings) {
			const module = course.modules.find(
				module => module.title === entry.moduleTitle
			)!;
			expect(
				module[entry.section].find(item => item.id === entry.id)
					?.contentKind,
				entry.title
			).toBe("reading");
		}
		const checkpoints = algebra2Checkpoints.filter(
			entry => entry.course === "algebra-2b"
		);
		expect(checkpoints).toHaveLength(2);
		for (const entry of checkpoints) {
			const module = course.modules.find(
				module => module.title === entry.moduleTitle
			)!;
			const review = module.curriculum.find(item =>
				item.title.includes("Representative Review Problems")
			)!;
			expect(review.content).toBe(
				algebra2Checkpoint(entry.course, entry.moduleTitle)
			);
			for (const problem of entry.problems)
				expect(review.content).toContain(problem);
			expect(review.content).toContain("course=algebra-2b");
		}
	});

	it("loads the exact finite Markdown sources and binds every self-check to its own course", async () => {
		expect(Object.keys(algebraCourseAssetSources)).toHaveLength(2);
		for (const [path, load] of Object.entries(algebraCourseAssetSources)) {
			const markdown = await load();
			expect(new TextEncoder().encode(markdown).byteLength).toBeLessThan(
				65536
			);
			const courseId = path.split("/")[2];
			const heading =
				courseId === "algebra-2a"
					? "capstone-domain-stress-test"
					: "capstone-growth-stress-test";
			expect(extractMarkdownSection(markdown, heading)).toContain(
				"Capstone"
			);
			expect(
				algebraCourseAssetViewerUrl(path, "Check", courseId)
			).toContain(`course=${courseId}`);
			expect(() =>
				algebraCourseAssetViewerUrl(
					path,
					"Check",
					courseId === "algebra-2a" ? "algebra-2b" : "algebra-2a"
				)
			).toThrow("Unsupported Algebra course resource");
		}
	});
});
