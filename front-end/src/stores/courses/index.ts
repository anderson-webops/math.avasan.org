import type { CourseSummary, RawCourse } from "./types";
import { normalizeRawCourse } from "./normalization";

export interface CourseCatalogEntry extends CourseSummary {
	load: () => Promise<RawCourse>;
	normalizeAs?: string;
}

export const courseCatalog: CourseCatalogEntry[] = [
	{
		id: "early-elementary-a-math",
		name: "Early Elementary A: Numbers, Operations, and Measurement",
		load: () =>
			import("./elementary-math-courses").then(
				({ earlyElementaryMathACourse }) => earlyElementaryMathACourse
			)
	},
	{
		id: "early-elementary-b-math",
		name: "Early Elementary B: Arithmetic, Fractions, and Geometry",
		load: () =>
			import("./elementary-math-courses").then(
				({ earlyElementaryMathBCourse }) => earlyElementaryMathBCourse
			)
	},
	{
		id: "late-elementary-a-math",
		name: "Late Elementary A: Multiplication, Division, and Geometry",
		load: () =>
			import("./elementary-math-courses").then(
				({ lateElementaryMathACourse }) => lateElementaryMathACourse
			)
	},
	{
		id: "late-elementary-b-math",
		name: "Late Elementary B: Fractions, Decimals, Units, and Coordinates",
		load: () =>
			import("./elementary-math-courses").then(
				({ lateElementaryMathBCourse }) => lateElementaryMathBCourse
			)
	},
	{
		id: "pre-algebra-a",
		name: "Pre-Algebra A",
		load: () =>
			import("./pre-algebra-a").then(
				({ preAlgebraACourse }) => preAlgebraACourse
			)
	},
	{
		id: "pre-algebra-b",
		name: "Pre-Algebra B",
		load: () =>
			import("./pre-algebra-b").then(
				({ preAlgebraBCourse }) => preAlgebraBCourse
			)
	},
	{
		id: "algebra-1a",
		name: "Algebra 1A",
		load: () =>
			import("./algebra-1a").then(
				({ algebra1ACourse }) => algebra1ACourse
			)
	},
	{
		id: "algebra-1b",
		name: "Algebra 1B",
		load: () =>
			import("./algebra-1b").then(
				({ algebra1BCourse }) => algebra1BCourse
			)
	},
	{
		id: "geometry-a",
		name: "Geometry A",
		load: () =>
			import("./geometry-a").then(
				({ geometryACourse }) => geometryACourse
			)
	},
	{
		id: "geometry-b",
		name: "Geometry B",
		load: () =>
			import("./geometry-b").then(
				({ geometryBCourse }) => geometryBCourse
			)
	},
	{
		id: "algebra-2a",
		name: "Algebra 2A",
		load: () =>
			import("./algebra-2a").then(
				({ algebra2ACourse }) => algebra2ACourse
			)
	},
	{
		id: "algebra-2b",
		name: "Algebra 2B",
		load: () =>
			import("./algebra-2b").then(
				({ algebra2BCourse }) => algebra2BCourse
			)
	},
	{
		id: "pre-calculus-a",
		name: "Pre-Calculus and Trigonometry A",
		load: () =>
			import("./pre-calculus-a").then(
				({ preCalculusACourse }) => preCalculusACourse
			)
	},
	{
		id: "pre-calculus-b",
		name: "Pre-Calculus and Trigonometry B",
		load: () =>
			import("./pre-calculus-b").then(
				({ preCalculusBCourse }) => preCalculusBCourse
			)
	},
	{
		id: "ap-calculus",
		name: "AP Calculus",
		load: () =>
			import("./ap-calculus").then(
				({ apCalculusCourse }) => apCalculusCourse
			)
	}
];

export const archivedCourseCatalog: CourseCatalogEntry[] = [];

const courseCatalogById = new Map(
	[...courseCatalog, ...archivedCourseCatalog].map(entry => [entry.id, entry])
);

export function getCourseCatalogEntry(id: string) {
	return courseCatalogById.get(id) ?? null;
}

export async function loadRawCourse(id: string) {
	const entry = getCourseCatalogEntry(id);
	const rawCourse = await entry?.load();
	if (!entry || !rawCourse) return null;

	const course = normalizeRawCourse(entry.normalizeAs ?? id, rawCourse);
	return {
		...course,
		id: entry.id,
		name: entry.name
	};
}
