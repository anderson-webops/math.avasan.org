// Copy edits apply to prose. Supplied code, including comments and strings,
// must remain the same program students read in the source repository.
export function mapMarkdownProse(
	text: string,
	transform: (prose: string) => string
) {
	function copyProse(prose: string) {
		if (!prose.trim()) return prose;
		const leading = prose.match(/^\s*/)?.[0] ?? "";
		const trailing = prose.match(/\s*$/)?.[0] ?? "";
		return leading + transform(prose).trim() + trailing;
	}

	function inlineProse(prose: string) {
		const spans = [...prose.matchAll(/`+/g)];
		const literals: Array<[string, string]> = [];
		let prefix = "\uE000";
		while (prose.includes(prefix)) prefix += "\uE000";
		let masked = "";
		let start = 0;
		for (let index = 0; index < spans.length; index++) {
			const opening = spans[index];
			const closingIndex = spans.findIndex(
				(span, candidate) => candidate > index && span[0] === opening[0]
			);
			if (closingIndex < 0) continue;
			const end = spans[closingIndex].index! + opening[0].length;
			const marker = `\`${prefix}${literals.length}\uE001\``;
			literals.push([marker, prose.slice(opening.index, end)]);
			masked += prose.slice(start, opening.index) + marker;
			start = end;
			index = closingIndex;
		}
		// Keep the whole prose sentence available to copy rules that span a
		// literal, then restore every code span exactly.
		let result = copyProse(masked + prose.slice(start));
		for (const [marker, literal] of literals)
			result = result.replaceAll(marker, () => literal);
		return result;
	}

	let result = "";
	let prose = "";
	let fence = "";
	let indented = false;
	for (const line of text.match(/[^\n]*(?:\n|$)/g) ?? []) {
		if (fence) {
			result += line;
			const closing = line.match(/^[ \t]*(`+|~+)[ \t]*\r?(?:\n|$)/);
			if (
				closing?.[1][0] === fence[0] &&
				closing[1].length >= fence.length
			) {
				fence = "";
			}
			continue;
		}
		if (indented) {
			if (/^(?: {4}|\t)/.test(line) || line.trim() === "") {
				result += line;
				continue;
			}
			indented = false;
		}
		const opening = line.match(/^[ \t]*(`{3,}|~{3,})/);
		if (opening) {
			result += inlineProse(prose) + line;
			prose = "";
			fence = opening[1];
		} else if (
			/^(?: {4}|\t)/.test(line) &&
			(prose === "" || /\n[ \t]*\n$/.test(prose))
		) {
			result += inlineProse(prose) + line;
			prose = "";
			indented = true;
		} else {
			prose += line;
		}
	}
	return result + inlineProse(prose);
}
