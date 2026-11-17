import { courseCatalog, loadRawCourse } from "@/stores/courses/index";

const PLAIN_HTTP_URL = /\bhttp:\/\/[^\s<>"')\]]+/gi;

export function plainHttpUrls(value: string) {
	return [...value.matchAll(PLAIN_HTTP_URL)].map(match => match[0]);
}

function collectPlainHttpReferences(
	value: unknown,
	path: string,
	findings: string[]
) {
	if (typeof value === "string") {
		for (const url of plainHttpUrls(value)) {
			findings.push(`${path}: ${url}`);
		}
		return;
	}
	if (Array.isArray(value)) {
		value.forEach((entry, index) =>
			collectPlainHttpReferences(entry, `${path}[${index}]`, findings)
		);
		return;
	}
	if (value && typeof value === "object") {
		for (const [key, entry] of Object.entries(value)) {
			collectPlainHttpReferences(entry, `${path}.${key}`, findings);
		}
	}
}

export async function publishedPlainHttpReferences() {
	const findings: string[] = [];

	for (const entry of courseCatalog) {
		const course = await loadRawCourse(entry.id);
		if (!course) throw new Error(`Missing published course ${entry.id}`);
		collectPlainHttpReferences(course, entry.id, findings);
	}

	return findings;
}

export async function verifyPublishedCourseResources() {
	const findings = await publishedPlainHttpReferences();
	if (findings.length) {
		throw new Error(
			`Published course resources must use authenticated HTTPS or remain inert text:\n${findings.join("\n")}`
		);
	}
}
