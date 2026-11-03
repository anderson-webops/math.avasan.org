import { renderToString } from "katex";
import { describe, expect, it } from "vitest";

describe("current KaTeX compatibility and trust boundary", () => {
	it("renders ordinary mathematical notation", () => {
		const html = renderToString("\\frac{1}{2} + x^2", {
			throwOnError: true
		});
		const document = new DOMParser().parseFromString(html, "text/html");
		expect(document.querySelector(".katex")).not.toBeNull();
		expect(document.querySelector("math")).not.toBeNull();
	});

	it.each([
		"\\href{javascript:alert(1)}{label}",
		"\\includegraphics{https://unapproved.invalid/image.png}",
		"\\htmlClass{unapproved}{x}"
	])("rejects untrusted HTML-producing input: %s", expression => {
		const html = renderToString(expression, {
			throwOnError: false,
			trust: false
		});
		const document = new DOMParser().parseFromString(html, "text/html");
		expect(
			document.querySelector("a, img, script, .unapproved")
		).toBeNull();
	});

	it("keeps default trust disabled when the object prototype is polluted", () => {
		const original = Object.getOwnPropertyDescriptor(
			Object.prototype,
			"trust"
		);
		Object.defineProperty(Object.prototype, "trust", {
			configurable: true,
			enumerable: false,
			value: true,
			writable: true
		});
		try {
			const html = renderToString(
				"\\href{https://unapproved.invalid}{label}",
				{ throwOnError: false }
			);
			const document = new DOMParser().parseFromString(html, "text/html");
			expect(document.querySelector("a")).toBeNull();
		} finally {
			if (original)
				Object.defineProperty(Object.prototype, "trust", original);
			else Reflect.deleteProperty(Object.prototype, "trust");
		}
	});
});
