import { mapMarkdownProse } from "../stores/courses/markdownProse";

function expandLabeledSteps(line: string) {
	const labeledSteps = line.match(
		/^(\*\*[^*\n]{1,80}:\*\*|[^:\n]{1,80}:)[ \t]+(1\.[ \t]+\S.*)$/u
	);
	if (!labeledSteps) return line;

	const [, label, steps] = labeledSteps;
	let nextStep = 2;
	let cursor = 0;
	let expanded = "";
	// Compact steps follow a label and a sequence of complete instructions.
	// A value at the end of a sentence is still part of that instruction.
	for (const marker of steps.matchAll(
		/(?<=[.;!?])[ \t]+(\d+)\.[ \t]+(?=\S)/gu
	)) {
		if (Number(marker[1]) !== nextStep) continue;
		expanded += `${steps.slice(cursor, marker.index)}\n${marker[1]}. `;
		cursor = marker.index + marker[0].length;
		nextStep++;
	}
	return nextStep > 2 ? `${label}\n${expanded}${steps.slice(cursor)}` : line;
}

function normalizeProse(prose: string) {
	return prose
		.split(/\r?\n/)
		.map(line => {
			if (/^(?: {4}|\t)/.test(line)) {
				return line;
			}

			let normalized = line
				.replace(/^([ \t]*)•\s+/, "$1- ")
				.replace(
					/(\S)\s+(\*\*[^*\n]{1,80}:\*\*)/g,
					(
						match,
						prefix: string,
						label: string,
						offset: number,
						source: string
					) => {
						const textBeforeLabel = source
							.slice(0, offset + prefix.length)
							.trim();
						if (/^(?:[-*+]|\d+[.)])$/u.test(textBeforeLabel))
							return match;
						return `${prefix}\n\n${label}`;
					}
				)
				.split("\n")
				.map(expandLabeledSteps)
				.join("\n")
				.replace(
					/(\*\*[^*\n]{1,80}:\*\*)\s+(?=(?:\d+\.|[-*])\s)/g,
					"$1\n"
				);
			const bulletMarkerCount = (
				normalized.match(/(?:^|[:.;!?]\s+)[-*]\s+\S/gm) ?? []
			).length;

			if (bulletMarkerCount >= 2) {
				normalized = normalized.replace(
					/([:.;!?])\s+([-*])\s+(?=\S)/g,
					"$1\n$2 "
				);
			}

			return normalized;
		})
		.join("\n");
}

export function normalizeInlineCourseMarkdown(content: string) {
	return mapMarkdownProse(content, normalizeProse);
}
