import type { RawCourse } from "./types";
import { courseAssetViewerUrl } from "@/modules/courseAssetSourcesPrealgebra";
import { assertMathCourseBindings } from "./prealgebraGeometryBindings";

export const preAlgebraASupplementalData = [
	{
		module: "Pre-Algebra A Kick-Off",
		title: "Checkpoint: Pre-Algebra A Kick-Off",
		code: "readiness-operations",
		problems: [
			"Evaluate -8+3×5 and (-8+3)×5. Show which operation is performed first in each expression.",
			"Find 3/4+1/6 as a simplified exact fraction. State the common denominator.",
			"Find 15% of 60 and the distance from -8 to zero on a number line. Keep the percent result separate from the distance."
		],
		checks: "The operation order is explicit, equal-sized fraction parts share a denominator, and signed position is distinguished from distance."
	},
	{
		module: "Pre-Algebra A Kick-Off",
		title: "Transfer Practice: Pre-Algebra A Kick-Off",
		code: "readiness-scaling",
		problems: [
			"A batch of 6 bars uses 3/4 cup of oats. Find the oats needed for 10 bars at the same recipe ratio.",
			"The ingredients for 6 bars cost $18. At the same cost per bar, find the cost of 10 bars.",
			"With 2 cups of oats and no other ingredient limit, find the greatest whole number of bars possible. Verify that one additional bar would exceed the oats available."
		],
		checks: "Both the recipe and the budget retain a constant per-bar rate. The capacity answer is a whole number checked against the original limit."
	},
	{
		module: "PAA1-PAA2 Arithmetic Foundations",
		title: "Transfer Practice: Arithmetic Foundations",
		code: "elevator-displacement",
		problems: [
			"An elevator starts at level -7, rises 12 levels and then descends 9 levels. Record its level after each move.",
			"Find the total distance traveled in levels and the signed displacement from start to finish. Explain why they differ.",
			"Repeat the same two moves starting at level 7. Compare the final level, total distance and displacement with the first trip."
		],
		checks: "Intermediate signed levels are shown. Total distance adds move magnitudes; displacement uses final minus initial position."
	},
	{
		module: "PAA3-PAA7 Fractions and Arithmetic",
		title: "Transfer Practice: Fractions and Arithmetic",
		code: "ribbon-whole-pieces",
		problems: [
			"A ribbon is 7/8 meter long. Each piece must be 3/16 meter long. Find the exact quotient and the greatest number of complete pieces.",
			"Find the ribbon remaining after cutting that many complete pieces. Check that the remainder is shorter than one piece.",
			"Double the available ribbon to 7/4 meter while keeping the piece length fixed. Find the new complete-piece count and remainder, then explain why the count need not be twice the old count."
		],
		checks: "The exact quotient is separated from a whole-piece count. Used length plus leftover reconstructs the available ribbon in each case."
	},
	{
		module: "Check-In #1",
		title: "Checkpoint: Check-In #1",
		code: "arithmetic-ratio-checkpoint",
		problems: [
			"An $80 item has a 15% discount. Sales tax is 5% of the discounted price. Find the price after discount, the tax and the final price.",
			"A walk covers 2.5 kilometers in 40 minutes at a constant rate. Find the speed in kilometers per hour.",
			"A recipe for 4 servings uses 3/5 cup of rice. Find the rice needed for 10 servings at the same ratio."
		],
		checks: "The percent base, time conversion and recipe scale factor are stated before calculating. Each result carries its appropriate unit."
	},
	{
		module: "Check-In #1",
		title: "Check-In #1 Changed-Case Review",
		code: "percent-changes",
		problems: [
			"Increase $50 by 20%, then decrease the new amount by 20%. Find the final amount and the overall percent change from $50.",
			"Reverse the order: decrease $50 by 20%, then increase the new amount by 20%. Compare the final amounts and explain whether either sequence restores $50.",
			"After a 20% decrease from $50, what percent increase takes the reduced amount back to $50? State the base of that increase."
		],
		checks: "Each percent is applied to its current base. Equal percentage increases and decreases are distinguished from inverse operations."
	},
	{
		module: "PAA13-PAA17 Expressions and Sequences",
		title: "Transfer Practice: Expressions and Sequences",
		code: "sequence-shift",
		problems: [
			"Rows contain 5, 9, 13 and 17 tiles. The row number n starts at 1. Find an expression for the tiles in row n and use it to predict row 10.",
			"Find the total number of tiles in the first 10 rows. Show either paired first/last terms or the arithmetic-series formula.",
			"Change the first row to 3 tiles and keep the increase of 4 tiles per row. Find the new row-n expression and first-10-row total. Explain the difference between the two totals without listing every row."
		],
		checks: "The row index starts at 1, the constant difference is retained, and a single-row count is distinguished from a sum."
	},
	{
		module: "Check-In #2 and Capstone",
		title: "Checkpoint: Check-In #2 and Capstone",
		code: "exponent-root-checkpoint",
		problems: [
			"Evaluate 2^(-3)×4^2 exactly. Rewrite the factors using a common base or as fractions.",
			"Find sqrt(49), then solve x^2=49 over the real numbers. Explain why these answer sets differ.",
			"Calculate (3×10^5)×(4×10^(-3)) and write the result in normalized scientific notation."
		],
		checks: "Negative exponents mean reciprocals of nonzero bases, principal roots are distinguished from equation solutions, and scientific notation has a normalized coefficient."
	},
	{
		module: "Check-In #2 and Capstone",
		title: "Check-In #2 and Capstone Changed-Case Review",
		code: "exponent-counterexamples",
		problems: [
			"Check the claim (2^3)^2=2^(3+2) by evaluating both sides. State the correct rule for raising a power to another power.",
			"Check the claim x^(-2)=-x^2 at x=2. State the correct reciprocal rule and its domain restriction.",
			"Check the claim sqrt(a^2)=a at a=-5. State the identity that holds for every real a and explain it using the principal square root."
		],
		checks: "Each supplied counterexample evaluates both sides. Corrected rules state where they apply and retain grouping and signs."
	}
] as const;

export function addPreAlgebraASupplementalPractice(course: RawCourse) {
	assertMathCourseBindings(course);
	for (const unit of preAlgebraASupplementalData) {
		const module = course.modules.find(
			module => module.title === unit.module
		);
		if (!module)
			throw new Error(`Missing Pre-Algebra A module ${unit.module}`);
		const slugify = (text: string) =>
			text
				.toLowerCase()
				.replace(/[^a-z0-9]+/g, "-")
				.replace(/^-|-$/g, "");
		const moduleId = module.id ?? slugify(`pre-algebra-a-${module.title}`);
		const slug = slugify(unit.title);
		module.supplementalProjects.push({
			id: `${moduleId}-supplemental-${slug}`,
			aliases: unit.title.startsWith("Checkpoint:")
				? []
				: ["Applied Challenge"],
			title: unit.title,
			contentKind: "assignment",
			preserveInstructions: true,
			learningPath: "choice",
			content: `**Problems:**\n\n${unit.problems.map((problem, index) => `${index + 1}. ${problem}`).join("\n")}\n\n**Checkpoints:**\n\n${unit.checks}\n\n[Check answers and reasoning](${courseAssetViewerUrl(`/course-assets/pre-algebra-a/practice-checks-v1.md#optional-${unit.code}`, `${unit.title} self-check`)})`
		});
	}
}
