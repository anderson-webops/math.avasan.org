import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { reportMathClassroomUsage } from "@/modules/classroomUsage";

function setNavigatorPrivacySignal(
	name: "doNotTrack" | "globalPrivacyControl" | "msDoNotTrack",
	value: boolean | string | null
) {
	Object.defineProperty(navigator, name, {
		configurable: true,
		value
	});
}

describe("privacy-first Math classroom usage", () => {
	beforeEach(() => {
		vi.useFakeTimers();
		vi.setSystemTime(new Date("2026-07-29T20:15:00.000Z"));
		vi.stubEnv("VITE_CLASSROOM_USAGE_ENABLED", "true");
		window.sessionStorage.clear();
		setNavigatorPrivacySignal("doNotTrack", null);
		setNavigatorPrivacySignal("msDoNotTrack", null);
		setNavigatorPrivacySignal("globalPrivacyControl", false);
		vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(null)));
	});

	afterEach(() => {
		vi.unstubAllGlobals();
		vi.unstubAllEnvs();
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
		await reportMathClassroomUsage(
			"graph-open",
			"untrusted graph expression"
		);

		const request = vi.mocked(fetch).mock.calls[0];
		expect(JSON.parse(String(request?.[1]?.body))).toEqual({
			siteID: "math",
			event: "graph-open"
		});
		expect(String(request?.[1]?.body)).not.toContain("untrusted");
	});

	it("drops an unknown course instead of sending arbitrary data", async () => {
		await reportMathClassroomUsage("course-open", "student-name");

		expect(fetch).not.toHaveBeenCalled();
		expect(window.sessionStorage.length).toBe(0);
	});

	it.each([
		["Do Not Track", "doNotTrack", "1"],
		["legacy Do Not Track", "msDoNotTrack", "yes"],
		["Global Privacy Control", "globalPrivacyControl", true]
	] as const)("does not report when %s is enabled", async (_label, key, value) => {
		setNavigatorPrivacySignal(key, value);

		await reportMathClassroomUsage("graph-open");

		expect(fetch).not.toHaveBeenCalled();
		expect(window.sessionStorage.length).toBe(0);
	});

	it("does not report until collection is explicitly enabled", async () => {
		vi.stubEnv("VITE_CLASSROOM_USAGE_ENABLED", "false");

		await reportMathClassroomUsage("graph-open");

		expect(fetch).not.toHaveBeenCalled();
		expect(window.sessionStorage.length).toBe(0);
	});

	it("fails silently when the aggregate endpoint is unavailable", async () => {
		vi.mocked(fetch).mockRejectedValueOnce(new Error("offline"));

		await expect(
			reportMathClassroomUsage("graph-open")
		).resolves.toBeUndefined();
	});
});
