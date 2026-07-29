import { describe, expect, it } from "vitest";
import {
	STATIC_MEDIA_BASE,
	canonicalStaticMediaUrl,
	normalizeStaticMediaUrlsInText,
	pendingStaticMediaNotice
} from "../src/stores/courses/staticMedia";

describe("math course static media", () => {
	it("keeps current links on the shared class host and rewrites legacy links", () => {
		expect(STATIC_MEDIA_BASE).toBe(
			"https://static.classes.jacobdanderson.net"
		);
		expect(
			canonicalStaticMediaUrl(
				"https://static.classes.jacobdanderson.net/example.gif"
			)
		).toBe("https://static.classes.jacobdanderson.net/example.gif");
		expect(
			canonicalStaticMediaUrl(
				"https://static.junilearning.com/example.gif"
			)
		).toBe("https://static.classes.jacobdanderson.net/example.gif");
		expect(
			normalizeStaticMediaUrlsInText(
				"Demo: https://static.junilearning.com/example.gif"
			)
		).toBe(
			"Demo: https://static.classes.jacobdanderson.net/example.gif"
		);
		expect(pendingStaticMediaNotice("example.gif")).toContain(
			"**Pending media:**"
		);
		expect(pendingStaticMediaNotice("example.gif")).toContain(
			"https://static.classes.jacobdanderson.net/example.gif"
		);
	});
});
