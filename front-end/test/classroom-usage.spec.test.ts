import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { MathClassroomUsageEvent } from "@/modules/classroomUsage";
import {
	MATH_CLASSROOM_USAGE_COURSE_IDS,
	reportMathClassroomUsage
} from "@/modules/classroomUsage";
import { courseCatalog } from "@/stores/courses/index";

vi.mock("@/config/classroom-usage.json", () => ({
	default: { classroomUsageEnabled: true }
}));

function setNavigatorPrivacySignal(
	name: "doNotTrack" | "globalPrivacyControl" | "msDoNotTrack",
	value: boolean | string | null
) {
	Object.defineProperty(navigator, name, {
		configurable: true,
		value
	});
}

function setWindowPrivacySignal(value: string | null) {
	Object.defineProperty(window, "doNotTrack", {
		configurable: true,
		value
	});
}

describe("privacy-first Math classroom usage", () => {
	beforeEach(() => {
		vi.useFakeTimers();
		vi.setSystemTime(new Date("2026-07-29T20:15:00.000Z"));
		window.sessionStorage.clear();
		setNavigatorPrivacySignal("doNotTrack", null);
		setNavigatorPrivacySignal("msDoNotTrack", null);
		setNavigatorPrivacySignal("globalPrivacyControl", false);
		setWindowPrivacySignal(null);
		vi.stubGlobal(
			"fetch",
			vi.fn().mockResolvedValue(new Response(null, { status: 204 }))
		);
	});

	afterEach(() => {
		vi.unstubAllGlobals();
		vi.restoreAllMocks();
		vi.useRealTimers();
		window.sessionStorage.clear();
	});

	it("sends only the fixed site, event, and whitelisted course", async () => {
		await reportMathClassroomUsage("course-open", "algebra-1a");
		await reportMathClassroomUsage("course-open", "algebra-1a");

		expect(fetch).toHaveBeenCalledOnce();
		expect(fetch).toHaveBeenCalledWith(
			"/api/classroom-usage",
			expect.objectContaining({
				body: JSON.stringify({
					siteID: "math",
					event: "course-open",
					courseId: "algebra-1a"
				}),
				credentials: "omit",
				method: "POST",
				mode: "same-origin",
				redirect: "error",
				referrerPolicy: "no-referrer"
			})
		);
	});

	it("reports only a coarse graph-open event", async () => {
		await reportMathClassroomUsage("graph-open", "algebra-1a");

		const request = vi.mocked(fetch).mock.calls[0];
		expect(JSON.parse(String(request?.[1]?.body))).toEqual({
			siteID: "math",
			event: "graph-open"
		});
		expect(String(request?.[1]?.body)).not.toContain("algebra-1a");
	});

	it("drops an unsupported runtime event", async () => {
		await reportMathClassroomUsage(
			"student-name" as MathClassroomUsageEvent,
			"algebra-1a"
		);

		expect(fetch).not.toHaveBeenCalled();
		expect(window.sessionStorage.length).toBe(0);
	});

	it("drops an unknown course instead of sending arbitrary data", async () => {
		await reportMathClassroomUsage("course-open", "student-name");

		expect(fetch).not.toHaveBeenCalled();
		expect(window.sessionStorage.length).toBe(0);
	});

	it("keeps its course allowlist equal to the public catalog", () => {
		expect([...MATH_CLASSROOM_USAGE_COURSE_IDS]).toEqual(
			courseCatalog.map(course => course.id)
		);
	});

	it.each([
		["Do Not Track", "doNotTrack", "1"],
		["legacy Do Not Track", "msDoNotTrack", "yes"],
		["Global Privacy Control", "globalPrivacyControl", true]
	] as const)(
		"does not report when %s is enabled",
		async (_label, key, value) => {
			setNavigatorPrivacySignal(key, value);

			await reportMathClassroomUsage("graph-open");

			expect(fetch).not.toHaveBeenCalled();
			expect(window.sessionStorage.length).toBe(0);
		}
	);

	it("does not report when window Do Not Track is enabled", async () => {
		setWindowPrivacySignal("1");

		await reportMathClassroomUsage("graph-open");

		expect(fetch).not.toHaveBeenCalled();
		expect(window.sessionStorage.length).toBe(0);
	});

	it("fails closed when tab-local deduplication is unavailable", async () => {
		vi.spyOn(Storage.prototype, "getItem").mockImplementationOnce(() => {
			throw new Error("storage unavailable");
		});

		await reportMathClassroomUsage("graph-open");

		expect(fetch).not.toHaveBeenCalled();
	});

	it("fails silently when the aggregate endpoint is unavailable", async () => {
		vi.mocked(fetch).mockRejectedValueOnce(new Error("offline"));

		await expect(
			reportMathClassroomUsage("graph-open")
		).resolves.toBeUndefined();
		expect(window.sessionStorage.length).toBe(1);
	});

	it("does not retry after an unsuccessful response", async () => {
		vi.mocked(fetch)
			.mockResolvedValueOnce(new Response(null, { status: 503 }))
			.mockResolvedValueOnce(new Response(null, { status: 204 }));

		await reportMathClassroomUsage("graph-open");
		await reportMathClassroomUsage("graph-open");
		await reportMathClassroomUsage("graph-open");

		expect(fetch).toHaveBeenCalledOnce();
		expect(window.sessionStorage.length).toBe(1);
		expect(window.sessionStorage.key(0)).toContain(
			":2026-07-29:graph-open:none"
		);
		expect(
			window.sessionStorage.getItem(window.sessionStorage.key(0) ?? "")
		).toBe("attempted");
	});

	it("deduplicates concurrent reports while delivery is pending", async () => {
		let finishRequest: ((response: Response) => void) | undefined;
		vi.mocked(fetch).mockImplementationOnce(
			() =>
				new Promise<Response>(resolve => {
					finishRequest = resolve;
				})
		);

		const firstReport = reportMathClassroomUsage("graph-open");
		await reportMathClassroomUsage("graph-open");

		expect(fetch).toHaveBeenCalledOnce();
		finishRequest?.(new Response(null, { status: 204 }));
		await firstReport;

		expect(window.sessionStorage.length).toBe(1);
	});

	it("does not retry after a marker written by an earlier version", async () => {
		window.sessionStorage.setItem(
			"math-avasan:classroom-usage:2026-07-29:graph-open:none",
			`pending:${Date.now() - 30_001}`
		);

		await reportMathClassroomUsage("graph-open");

		expect(fetch).not.toHaveBeenCalled();
	});

	it("allows a new attempt on the next UTC day", async () => {
		await reportMathClassroomUsage("graph-open");
		vi.setSystemTime(new Date("2026-07-30T00:00:01.000Z"));
		await reportMathClassroomUsage("graph-open");

		expect(fetch).toHaveBeenCalledTimes(2);
		expect(window.sessionStorage.length).toBe(2);
	});

	it("does not retry after a static HTML fallback", async () => {
		vi.mocked(fetch).mockResolvedValueOnce(
			new Response("<!doctype html>", {
				headers: { "Content-Type": "text/html" },
				status: 200
			})
		);

		await reportMathClassroomUsage("graph-open");
		await reportMathClassroomUsage("graph-open");

		expect(fetch).toHaveBeenCalledOnce();
		expect(window.sessionStorage.length).toBe(1);
	});
});
