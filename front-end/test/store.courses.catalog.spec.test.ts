import { describe, expect, it } from "vitest";
import {
	courseCatalog,
	getCourseCatalogEntry,
	loadRawCourse
} from "@/stores/courses/index";

const expectedCatalog: Array<{
	id: string;
	name: string;
}> = [
	{
		id: "early-elementary-a-math",
		name: "Early Elementary A: Numbers, Operations, and Measurement"
	},
	{
		id: "early-elementary-b-math",
		name: "Early Elementary B: Arithmetic, Fractions, and Geometry"
	},
	{
		id: "late-elementary-a-math",
		name: "Late Elementary A: Multiplication, Division, and Geometry"
	},
	{
		id: "late-elementary-b-math",
		name: "Late Elementary B: Fractions, Decimals, Units, and Coordinates"
	},
	{ id: "pre-algebra-a", name: "Pre-Algebra A" },
	{ id: "pre-algebra-b", name: "Pre-Algebra B" },
	{ id: "algebra-1a", name: "Algebra 1A" },
	{ id: "algebra-1b", name: "Algebra 1B" },
	{ id: "geometry-a", name: "Geometry A" },
	{ id: "geometry-b", name: "Geometry B" },
	{ id: "algebra-2a", name: "Algebra 2A" },
	{ id: "algebra-2b", name: "Algebra 2B" },
	{
		id: "pre-calculus-a",
		name: "Pre-Calculus and Trigonometry A"
	},
	{
		id: "pre-calculus-b",
		name: "Pre-Calculus and Trigonometry B"
	},
	{ id: "ap-calculus", name: "AP Calculus" }
];

describe("math.avasan.org course catalog", () => {
	it("publishes exactly the fifteen canonical math courses", () => {
		expect(
			courseCatalog.map(({ id, name }) => ({
				id,
				name
			}))
		).toEqual(expectedCatalog.map(({ id, name }) => ({ id, name })));
		expect(getCourseCatalogEntry("scratch-level-1")).toBeNull();
		expect(getCourseCatalogEntry("python-level-1")).toBeNull();
		expect(getCourseCatalogEntry("elementary-science")).toBeNull();
	});

	it("loads every published course", async () => {
		const courses = await Promise.all(
			expectedCatalog.map(({ id }) => loadRawCourse(id))
		);

		expect(courses.map(course => course?.name)).toEqual(
			expectedCatalog.map(course => course.name)
		);
	});
});
