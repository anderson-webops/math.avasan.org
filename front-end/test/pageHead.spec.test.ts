import { describe, expect, it } from "vitest";
import {
	INDEX_ROBOTS,
	NOINDEX_ROBOTS,
	canonicalUrlForPath,
	pageRobotsForPath,
	pageTitleForPath
} from "@/modules/pageHead";

describe("page head helpers", () => {
	it.each([
		["/", "Math with Julio"],
		["/courses", "Math Courses | Math with Julio"],
		["/graph-sketcher", "Graph Sketcher | Math with Julio"],
		["/course-resource", "Page Not Found | Math with Julio"],
		["/python-ide", "Page Not Found | Math with Julio"],
		["/student-privacy", "Page Not Found | Math with Julio"],
		["/admin", "Teacher Admin | Math with Julio"],
		["/not-a-real-page", "Page Not Found | Math with Julio"]
	])("returns a useful title for %s", (path, title) => {
		expect(pageTitleForPath(path)).toBe(title);
	});

	it.each([
		"/about",
		"/profile",
		"/signup",
		"/payment",
		"/zoom",
		"/pathways"
	])("does not preserve a product title for removed route %s", path => {
		expect(pageTitleForPath(path)).toBe("Page Not Found | Math with Julio");
	});

	it("indexes only the graphing tool and math-course catalog", () => {
		expect(pageRobotsForPath("/")).toBe(INDEX_ROBOTS);
		expect(pageRobotsForPath("/courses")).toBe(INDEX_ROBOTS);
		expect(pageRobotsForPath("/graph-sketcher")).toBe(INDEX_ROBOTS);

		for (const path of [
			"/admin",
			"/course-resource",
			"/python-ide",
			"/student-privacy",
			"/not-a-real-page"
		]) {
			expect(pageRobotsForPath(path)).toBe(NOINDEX_ROBOTS);
		}
	});

	it("builds stable canonical URLs that match production routing", () => {
		expect(canonicalUrlForPath("/")).toBe("https://math.avasan.org/");
		expect(canonicalUrlForPath("/courses/")).toBe(
			"https://math.avasan.org/courses/"
		);
		expect(canonicalUrlForPath("/graph-sketcher")).toBe(
			"https://math.avasan.org/"
		);
		expect(canonicalUrlForPath("/not-a-real-page?query=ignored")).toBe(
			"https://math.avasan.org/not-a-real-page"
		);
	});
});
