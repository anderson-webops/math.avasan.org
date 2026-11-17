import type { RawCourse, RawCourseModuleItem } from "./types";
import { geometryAChangedCaseReview } from "./geometry-a";
import { geometryBChangedCaseReview } from "./geometry-b";
import { addGeometryCases } from "./geometryCases";
import { mathCourseSlugify } from "./mathCourseFlow";
import { addPreAlgebraACases } from "./preAlgebraACases";
import { addPreAlgebraASupplementalPractice } from "./preAlgebraASupplementalPractice";
import { addPreAlgebraBCases } from "./preAlgebraBCases";
import { assertMathCourseBindings } from "./prealgebraGeometryBindings";

function mergeIdentity(
	item: RawCourseModuleItem,
	previous?: RawCourseModuleItem
) {
	const id = previous?.id ?? item.id;
	const aliases = [
		...new Set([
			...(previous?.aliases ?? []),
			...(item.aliases ?? []),
			...(item.id && item.id !== id ? [item.id] : [])
		])
	].filter(alias => alias !== id);
	const notices = (previous?.content ?? "")
		.split(/\n\s*\n/)
		.filter(paragraph => paragraph.includes("**Pending media:**"))
		.filter(paragraph => !item.content.includes(paragraph));
	return {
		...item,
		content: [item.content, ...notices].join("\n\n"),
		...(id ? { id } : {}),
		...(aliases.length ? { aliases } : {}),
		learningPath: previous ? previous.learningPath : item.learningPath,
		preserveInstructions: true,
		...(item.contentKind === "reading" ? {} : { preserveAssignment: true }),
		...(item.title.startsWith("Practice:")
			? { contentKind: "assignment" as const }
			: {})
	};
}

function previousBinding(
	items: RawCourseModuleItem[],
	item: RawCourseModuleItem
) {
	const identities = new Set(
		[item.id, ...(item.aliases ?? [])].filter(Boolean)
	);
	const matches = items.filter(
		previous =>
			(previous.id && identities.has(previous.id)) ||
			previous.title === item.title
	);
	if (matches.length > 1)
		throw new Error(`Ambiguous Math identity binding: ${item.title}`);
	return matches[0];
}

export function applyPrealgebraGeometryBaseline(
	courseId: string,
	course: RawCourse,
	rawCourse: RawCourse
) {
	if (
		![
			"pre-algebra-a",
			"pre-algebra-b",
			"geometry-a",
			"geometry-b"
		].includes(courseId)
	) {
		return;
	}
	assertMathCourseBindings(course);
	assertMathCourseBindings(rawCourse);
	const authored: RawCourse = {
		...rawCourse,
		modules: rawCourse.modules.map(module => ({
			...module,
			curriculum: module.curriculum.map(item => ({ ...item })),
			supplementalProjects: module.supplementalProjects.map(item => ({
				...item
			}))
		}))
	};
	if (courseId === "pre-algebra-a") {
		addPreAlgebraACases(authored);
		addPreAlgebraASupplementalPractice(authored);
	} else if (courseId === "pre-algebra-b") {
		addPreAlgebraBCases(authored);
	} else {
		addGeometryCases(authored, courseId === "geometry-a" ? "a" : "b");
		const review =
			courseId === "geometry-a"
				? geometryAChangedCaseReview
				: geometryBChangedCaseReview;
		const matches = authored.modules.filter(
			module =>
				module.title ===
				(courseId === "geometry-a"
					? "Check-In #3 and Geometry A Capstone"
					: "Check-In #2 and Geometry B Capstone")
		);
		if (matches.length !== 1)
			throw new Error(`Missing unique ${courseId} capstone.`);
		matches[0].supplementalProjects.push({ ...review });
	}
	assertMathCourseBindings(authored);
	for (const source of authored.modules) {
		const targets = course.modules.filter(
			module => module.title === source.title
		);
		if (targets.length !== 1) {
			throw new Error(
				`Missing unique Math overlay module: ${source.title}`
			);
		}
		const target = targets[0];
		const oldItems = target.curriculum;
		const retained = new Set<RawCourseModuleItem>();
		const curriculum = source.curriculum.map(item => {
			const previous = previousBinding(oldItems, item);
			if (previous) retained.add(previous);
			return mergeIdentity(item, previous);
		});
		for (const item of oldItems.filter(item => !retained.has(item))) {
			const reading = curriculum.find(
				candidate => candidate.contentKind === "reading"
			);
			if (
				reading &&
				/core concepts|application check|concept path/i.test(item.title)
			) {
				reading.aliases = [
					...new Set([
						...(reading.aliases ?? []),
						...(item.id ? [item.id] : []),
						...(item.aliases ?? [])
					])
				];
			} else {
				curriculum.push(mergeIdentity(item));
			}
		}
		target.curriculum = curriculum;
		for (const item of source.supplementalProjects) {
			const previous = previousBinding(target.supplementalProjects, item);
			const updated = mergeIdentity(item, previous);
			updated.id ??= mathCourseSlugify(
				`${target.id ?? `${courseId}-${target.title}`}-supplemental-${item.title}`
			);
			if (previous) {
				target.supplementalProjects[
					target.supplementalProjects.indexOf(previous)
				] = updated;
			} else {
				target.supplementalProjects.push(updated);
			}
		}
	}
	assertMathCourseBindings(course);
}
