import { describe, expect, it } from "vitest";
import {
	plainHttpUrls,
	publishedPlainHttpReferences
} from "../scripts/verify-course-resource-policy.mts";

describe("published course transport policy", () => {
	it("contains no student-facing plain HTTP navigation or media target", async () => {
		expect(await publishedPlainHttpReferences()).toEqual([]);
	});

	it("detects an unsafe course reference in a negative fixture", () => {
		expect(
			plainHttpUrls("Reference: http://example.test/course/table.html")
		).toEqual(["http://example.test/course/table.html"]);
	});

	it("detects every plain HTTP reference in one value", () => {
		expect(
			plainHttpUrls(
				"http://one.example/a and http://two.example/b?image=1"
			)
		).toEqual([
			"http://one.example/a",
			"http://two.example/b?image=1"
		]);
	});
});
