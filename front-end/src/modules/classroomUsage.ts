export type MathClassroomUsageEvent = "course-open" | "graph-open";

const MATH_SITE_ID = "math";
const allowedCourseIds = new Set([
	"early-elementary-a-math",
	"early-elementary-b-math",
	"late-elementary-a-math",
	"late-elementary-b-math",
	"pre-algebra-a",
	"pre-algebra-b",
	"algebra-1a",
	"algebra-1b",
	"geometry-a",
	"geometry-b",
	"algebra-2a",
	"algebra-2b",
	"pre-calculus-a",
	"pre-calculus-b",
	"ap-calculus"
]);
const storageKeyPrefix = "math-avasan:classroom-usage";

interface PrivacyAwareNavigator extends Navigator {
	globalPrivacyControl?: boolean;
	msDoNotTrack?: string | null;
}

interface PrivacyAwareWindow extends Window {
	doNotTrack?: string | null;
}

function usageCollectionIsEnabled() {
	return (
		import.meta.env.VITE_CLASSROOM_USAGE_ENABLED?.trim().toLowerCase() ===
		"true"
	);
}

function privacySignalIsEnabled() {
	if (typeof navigator === "undefined") return true;

	const privacyNavigator = navigator as PrivacyAwareNavigator;
	if (privacyNavigator.globalPrivacyControl === true) return true;

	const signals = [
		privacyNavigator.doNotTrack,
		privacyNavigator.msDoNotTrack,
		typeof window === "undefined"
			? null
			: (window as PrivacyAwareWindow).doNotTrack
	];

	return signals.some(signal => {
		const normalized = signal?.toLowerCase();
		return normalized === "1" || normalized === "yes";
	});
}

function allowedCourseId(courseId?: string | null) {
	const normalized = courseId?.trim() ?? "";
	return allowedCourseIds.has(normalized) ? normalized : undefined;
}

function utcDate() {
	return new Date().toISOString().slice(0, 10);
}

function reportStorageKey(event: MathClassroomUsageEvent, courseId?: string) {
	return [storageKeyPrefix, utcDate(), event, courseId ?? "none"].join(":");
}

/**
 * Reports at most one anonymous aggregate count per tab, event, course, and
 * UTC date. The payload has no student, account, graph, page, device, or
 * referrer data. Reporting is disabled unless the classroom explicitly opts
 * in, and browser privacy signals always win.
 */
export async function reportMathClassroomUsage(
	event: MathClassroomUsageEvent,
	courseId?: string | null
) {
	if (
		typeof window === "undefined" ||
		typeof globalThis.fetch !== "function" ||
		!usageCollectionIsEnabled()
	) {
		return;
	}

	try {
		if (privacySignalIsEnabled()) return;
	} catch {
		return;
	}

	const safeCourseId = allowedCourseId(courseId);
	if (event === "course-open" && !safeCourseId) return;

	const storageKey = reportStorageKey(event, safeCourseId);
	try {
		if (window.sessionStorage.getItem(storageKey)) return;
		window.sessionStorage.setItem(storageKey, "1");
	} catch {
		return;
	}

	const payload = {
		siteID: MATH_SITE_ID,
		event,
		...(safeCourseId ? { courseId: safeCourseId } : {})
	};

	try {
		await globalThis.fetch("/api/classroom-usage", {
			body: JSON.stringify(payload),
			cache: "no-store",
			credentials: "omit",
			headers: {
				"Content-Type": "application/json",
				"X-Classroom-Request": "1"
			},
			keepalive: true,
			method: "POST",
			mode: "same-origin",
			redirect: "error",
			referrerPolicy: "no-referrer"
		});
	} catch {
		// Aggregate reporting must never interrupt Graph Sketcher or a course.
	}
}
