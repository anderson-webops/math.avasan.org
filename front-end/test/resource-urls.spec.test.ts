import { describe, expect, it } from "vitest";
import {
	isInstructionMaterialResourceUrl,
	isYouTubeVideoUrl
} from "@/modules/resourceUrls";

describe("resource URL classification", () => {
	it.each([
		"https://github.com/instruction-material/algebra-1",
		"https://scratch.mit.edu/projects/123456789/",
		"https://static.junilearning.com/math/example.pdf",
		"https://static.cs.avasan.org/course/example.py",
		"https://static.classes.jacobdanderson.net/algebra-1a"
	])("accepts an exact instruction-material URL: %s", url => {
		expect(isInstructionMaterialResourceUrl(url)).toBe(true);
	});

	it.each([
		"http://static.classes.jacobdanderson.net/algebra-1a",
		"https://static.classes.jacobdanderson.net/",
		"https://static.classes.jacobdanderson.net.evil.example/algebra-1a",
		"https://static.classes.jacobdanderson.net@evil.example/algebra-1a",
		"https://evil.example/static.classes.jacobdanderson.net/algebra-1a",
		"https://github.com/evil/instruction-material/algebra-1",
		"https://github.com/instruction-material",
		"https://scratch.mit.edu/projects/not-a-project/"
	])("rejects a lookalike or incomplete instruction-material URL: %s", url => {
		expect(isInstructionMaterialResourceUrl(url)).toBe(false);
	});

	it.each([
		"https://www.youtube.com/watch?v=FJDWHm_ZjoM",
		"https://m.youtube.com/watch?v=eJTfcV1ZceE",
		"https://youtube.com/embed/2lbABbfU6Zc",
		"https://youtube.com/shorts/2lbABbfU6Zc",
		"https://youtu.be/2lbABbfU6Zc"
	])("accepts an exact YouTube video URL: %s", url => {
		expect(isYouTubeVideoUrl(url)).toBe(true);
	});

	it.each([
		"http://www.youtube.com/watch?v=FJDWHm_ZjoM",
		"https://www.youtube.com/watch",
		"https://youtube.com.evil.example/watch?v=FJDWHm_ZjoM",
		"https://www.youtube.com@evil.example/watch?v=FJDWHm_ZjoM",
		"https://evil.example/watch?next=https://youtube.com/watch?v=FJDWHm_ZjoM",
		"https://youtu.be/"
	])("rejects a lookalike or incomplete YouTube URL: %s", url => {
		expect(isYouTubeVideoUrl(url)).toBe(false);
	});
});
