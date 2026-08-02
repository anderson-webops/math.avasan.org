import { describe, expect, it, vi } from "vitest";
import {
	fetchWithRetry,
	requestStaticMedia
} from "../../scripts/static-media-request.mjs";

function response(status: number) {
	return {
		body: null,
		ok: status >= 200 && status < 300,
		status
	} as Response;
}

function queuedFetch(results: Array<Error | Response>) {
	const fetchImpl = vi.fn(async () => {
		const result = results.shift();
		if (result instanceof Error) throw result;
		if (!result) throw new Error("No queued fetch result");
		return result;
	});

	return fetchImpl;
}

function freshSignals() {
	const signals: AbortSignal[] = [];
	const signalFactory = vi.fn(() => {
		const signal = new AbortController().signal;
		signals.push(signal);
		return signal;
	});

	return { signalFactory, signals };
}

describe("static media requests", () => {
	it("retries a network exception with a fresh signal", async () => {
		const fetchImpl = queuedFetch([
			new TypeError("temporary network failure"),
			response(200)
		]);
		const delays: number[] = [];
		const { signalFactory, signals } = freshSignals();

		const result = await fetchWithRetry(
			"https://static.example/course.pdf",
			{ method: "HEAD" },
			{
				fetchImpl,
				signalFactory,
				sleep: async delayMs => delays.push(delayMs)
			}
		);

		expect(result.status).toBe(200);
		expect(fetchImpl).toHaveBeenCalledTimes(2);
		expect(delays).toEqual([250]);
		expect(signalFactory).toHaveBeenCalledTimes(2);
		expect(fetchImpl.mock.calls[0]?.[1]?.signal).toBe(signals[0]);
		expect(fetchImpl.mock.calls[1]?.[1]?.signal).toBe(signals[1]);
		expect(signals[0]).not.toBe(signals[1]);
	});

	it("retries only HTTP 429 and 5xx with bounded backoff", async () => {
		const fetchImpl = queuedFetch([
			response(429),
			response(503),
			response(206)
		]);
		const delays: number[] = [];

		const result = await fetchWithRetry(
			"https://static.example/course.zip",
			{ method: "GET" },
			{
				fetchImpl,
				sleep: async delayMs => delays.push(delayMs)
			}
		);

		expect(result.status).toBe(206);
		expect(fetchImpl).toHaveBeenCalledTimes(3);
		expect(delays).toEqual([250, 500]);
	});

	it.each([400, 401, 404, 408, 422])(
		"does not retry the genuine HTTP %i client response",
		async clientStatus => {
			const fetchImpl = queuedFetch([response(clientStatus)]);
			const sleep = vi.fn();

			const result = await requestStaticMedia(
				"https://static.example/missing.pdf",
				{ fetchImpl, sleep }
			);

			expect(result.status).toBe(clientStatus);
			expect(fetchImpl).toHaveBeenCalledTimes(1);
			expect(fetchImpl.mock.calls[0]?.[1]).toEqual({ method: "HEAD" });
			expect(sleep).not.toHaveBeenCalled();
		}
	);

	it.each([403, 405])(
		"preserves the range GET fallback after HTTP %i",
		async headStatus => {
			const fetchImpl = queuedFetch([
				response(headStatus),
				response(206)
			]);
			const { signalFactory, signals } = freshSignals();

			const result = await requestStaticMedia(
				"https://static.example/course.mp4",
				{ fetchImpl, signalFactory }
			);

			expect(result.status).toBe(206);
			expect(fetchImpl).toHaveBeenCalledTimes(2);
			expect(fetchImpl.mock.calls[0]?.[1]).toEqual({
				method: "HEAD",
				signal: signals[0]
			});
			expect(fetchImpl.mock.calls[1]?.[1]).toEqual({
				headers: { Range: "bytes=0-0" },
				method: "GET",
				signal: signals[1]
			});
		}
	);

	it("stops after three consecutive network failures", async () => {
		const fetchImpl = queuedFetch([
			new TypeError("network failure 1"),
			new TypeError("network failure 2"),
			new TypeError("network failure 3")
		]);
		const delays: number[] = [];
		const { signalFactory } = freshSignals();

		await expect(
			fetchWithRetry(
				"https://static.example/course.pdf",
				{ method: "HEAD" },
				{
					fetchImpl,
					signalFactory,
					sleep: async delayMs => delays.push(delayMs)
				}
			)
		).rejects.toThrow("network failure 3");
		expect(fetchImpl).toHaveBeenCalledTimes(3);
		expect(signalFactory).toHaveBeenCalledTimes(3);
		expect(delays).toEqual([250, 500]);
	});
});
