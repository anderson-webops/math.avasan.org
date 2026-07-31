import { describe, expect, it } from "vitest";
import { serializeJsonLd } from "@/modules/serializeJsonLd";

describe("serializeJsonLd", () => {
	it("neutralizes HTML termination and JavaScript line separators", () => {
		const serialized = serializeJsonLd({
			text: "</script><script>alert(1)</script>\u2028\u2029"
		});

		expect(serialized).not.toContain("<");
		expect(serialized).not.toContain("\u2028");
		expect(serialized).not.toContain("\u2029");
		expect(serialized).toContain("\\u003c/script>");
	});
});
