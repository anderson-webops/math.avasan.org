import type { RawCourse } from "./types";
import { algebraCourseImageUrls } from "@/modules/courseAssetSourcesAlgebra";
import { algebra2Checkpoint } from "./algebra2Checkpoints";
import { applyAlgebra2Readings } from "./algebra2Readings";
import { configureMathCourseFlow } from "./mathCourseFlow";
import { pendingStaticMediaNotice, staticMediaUrl } from "./staticMedia";

const media = {
	logReference:
		algebraCourseImageUrls[
			"/course-assets/algebra-2b/logarithms-reference-v1.svg"
		],
	expLogFamilies:
		algebraCourseImageUrls[
			"/course-assets/algebra-2b/exp-log-families-v2.svg"
		],
	arithmeticReference:
		algebraCourseImageUrls[
			"/course-assets/algebra-2b/arithmetic-sequences-v2.svg"
		],
	geometricReference:
		algebraCourseImageUrls[
			"/course-assets/algebra-2b/geometric-sequences-v2.svg"
		],
	matrixWorkflow:
		algebraCourseImageUrls[
			"/course-assets/algebra-2b/matrix-operations-v2.svg"
		],
	probabilityTables:
		algebraCourseImageUrls[
			"/course-assets/algebra-2b/probability-tables-v2.svg"
		],
	statisticsRegression:
		algebraCourseImageUrls[
			"/course-assets/algebra-2b/statistics-regression-v2.svg"
		],
	unitCircleTrig:
		algebraCourseImageUrls[
			"/course-assets/algebra-2b/unit-circle-trig-v2.svg"
		],
	trigGraphs:
		algebraCourseImageUrls["/course-assets/algebra-2b/trig-graphs-v2.svg"]
} as const;

const sourceStaticFilenames = [
	"alb1_concept1_0.png",
	"alb2_concept1_0.png",
	"alb2_concept1_1.png",
	"alb2_concept1_2.png",
	"alb2_concept2_0.png",
	"alb2_concept2_1.png",
	"alb2_pset1_12.png",
	"alb2_pset2_12.png",
	"alb4_concept1_0.png",
	"alb4_concept3_0.png",
	"alb7_concept1_0.png",
	"alb7_concept1_1.png",
	"alb7_concept1_2.png",
	"alb7_concept2_0.png",
	"alb7_concept2_1.png",
	"alb7_concept2_2.png",
	"alb7_pset1_0.png",
	"alb7_pset1_1.png",
	"alb7_pset1_2.png",
	"alb7_pset1_3.png",
	"alb7_pset1_4.png",
	"alb7_pset1_5.png",
	"alb7_pset1_6.png",
	"alb7_pset1_7.png",
	"alb7_pset1_8.png",
	"alb7_pset1_9.png",
	"alb7_pset2_0.png",
	"alb7_pset2_1.png",
	"alb7_pset2_2.png",
	"alb7_pset2_3.png",
	"alb7_pset2_4.png",
	"alb8_concept1_0.png",
	"alb8_concept1_1.png",
	"alb8_concept1_2.png",
	"alb8_concept1_3.png",
	"alb8_concept1_4.png",
	"alb8_concept1_5.png",
	"alb8_concept1_6.png",
	"alb8_concept1_7.png",
	"alb8_concept1_8.png",
	"alb8_concept2_0.png",
	"alb8_pset1_0.png",
	"alb8_pset1_1.png",
	"alb8_pset1_2.png",
	"alb8_pset1_3.png",
	"alb9_concept1_0.png",
	"checkin2_app_0.png",
	"checkin2_ds_0.png",
	"checkin2_ds_1.png",
	"checkin1_app_0.png",
	"checkin1_trig_0.png",
	"checkin1_trig_1.png"
] as const;

function createLesson(title: string, content: string, mediaLink?: string) {
	return mediaLink ? { title, content, mediaLink } : { title, content };
}

function createModule(
	title: string,
	curriculum: Array<ReturnType<typeof createLesson>>,
	supplementalProjects: Array<ReturnType<typeof createLesson>> = []
) {
	return {
		title,
		curriculum,
		supplementalProjects
	};
}

function sourceMediaReferences() {
	return sourceStaticFilenames
		.map(
			filename =>
				`- \`${filename}\` -> ${staticMediaUrl(filename)}\n\n${pendingStaticMediaNotice(filename)}`
		)
		.join("\n\n");
}

export const algebra2BCourse: RawCourse = {
	name: "Algebra 2B",
	modules: [
		createModule("ALB1 Introduction to Logarithms", [
			createLesson(
				"Logarithms, Bases, and Rewriting Forms",
				`
Logarithms undo exponentials. If \`b^x = a\`, then \`log_b(a) = x\`. The base stays the same; the answer to the exponent becomes the logarithm value.

For real logarithms, the base satisfies \`b > 0\`, \`b != 1\`, and the argument satisfies \`a > 0\`.

**Conversion examples**

- \`3^x = 47\` -> \`x = log_3(47)\`
- \`2^x = 13\` -> \`x = log_2(13)\`
- \`0.5^x = 2\` -> \`x = log_0.5(2)\`
- \`e^x = 5\` -> \`x = ln(5)\`
- \`log_2(4) = x\` -> \`2^x = 4\`
- \`log_5(3) = x\` -> \`5^x = 3\`
- \`log_7(152) = 0.5x\` -> \`7^(0.5x) = 152\`
- \`ln(65) = x\` -> \`e^x = 65\`

**Evaluation reminders**

- \`log_b(1) = 0\`
- \`log_3(27) = 3\`
- \`log_2(128) = 7\`
- \`log_5(125) = 3\`
- \`log_10(10000) = 4\`
- \`log_3(1/9) = -2\`
- \`log_125(5) = 1/3\`

Common logarithms use base \`10\`, and natural logarithms use base \`e\`. The graph-and-table reference below provides a reusable visual for comparing logarithmic growth.
				`.trim(),
				media.logReference
			),
			createLesson(
				"Logarithm Properties and Change of Base",
				`
Three identities do most of the work in this module:

Use a real base \`b > 0\`, \`b != 1\`. In the product and quotient rules, \`m > 0\` and \`n > 0\`. In the power rule, \`m > 0\` and the exponent \`r\` may be any real number.

- product rule: \`log_b(mn) = log_b(m) + log_b(n)\`
- quotient rule: \`log_b(m/n) = log_b(m) - log_b(n)\`
- power rule: \`log_b(m^r) = r log_b(m)\`

**Expansion and condensation examples**

Assume \`x > 0\` and \`y > 0\` wherever they occur below. Keep the original restrictions when condensing; a combined expression may otherwise appear to allow additional inputs.

- \`log_5(2x) = log_5(2) + log_5(x)\`
- \`ln(2x^3) = ln(2) + 3ln(x)\`
- \`ln(5x^7 / y) = ln(5) + 7ln(x) - ln(y)\`
- \`ln(8) - ln(4) = ln(2)\`
- \`log_2(x) + 4log_2(y) = log_2(xy^4)\`
- \`5ln(x) + 4ln(y) - 3ln(x) = ln(x^2y^4)\`
- \`log_3(4) + 2log_3(1/2) - log_3(x) = log_3(1/x)\`

For example, \`ln(x^2) = 2ln|x|\` for \`x != 0\`. The expression \`2ln(x)\` requires \`x > 0\`, even after condensing it to \`ln(x^2)\`.

**Change of base**

Use
\`log_a(x) = log_b(x) / log_b(a)\`
when your calculator only gives \`log\` or \`ln\`.

Here \`a > 0\`, \`b > 0\`, neither base is 1, and \`x > 0\`, so the logarithms exist and the denominator is nonzero.

Representative calculator values:

- \`log_4(6) = log(6) / log(4) approx 1.29\`
- \`log_3(19) = log(19) / log(3) approx 2.68\`
- \`log_2(12) = log(12) / log(2) approx 3.58\`

This is also the cleanest way to solve exponential growth equations such as \`1300 = 110(1.24)^t\`, which gives \`t approx 11.5\`.
				`.trim()
			)
		]),
		createModule("ALB2 Exponential and Logarithmic Functions", [
			createLesson(
				"Exponential Graphs and Transformations",
				`
The parent exponential family is \`y = b^x\` for \`b > 0\` and \`b != 1\`.

**Core graph facts**

- domain: \`(-infinity, infinity)\`
- range: \`(0, infinity)\`
- horizontal asymptote: \`y = 0\`
- if \`b > 1\`, the graph grows from left to right
- if \`0 < b < 1\`, the graph decays from left to right

**Representative point tables**

For \`y = 3^x\`:

- \`(-2, 1/9)\`
- \`(-1, 1/3)\`
- \`(0, 1)\`
- \`(1, 3)\`
- \`(2, 9)\`

For \`y = 2^(x + 1)\`:

- \`(-2, 1/2)\`
- \`(-1, 1)\`
- \`(0, 2)\`
- \`(1, 4)\`
- \`(2, 8)\`

**Transformation language**

- \`2^x + 3\` -> shift up \`3\`
- \`-(2^x)\` -> reflect across the x-axis
- \`3 * 2^x - 2\` -> vertical stretch by \`3\`, then shift down \`2\`
- \`2^(x - 2) + 1\` -> shift right \`2\`, up \`1\`
- \`2^(2x)\` -> horizontal shrink by factor \`1/2\`
- \`2^(-x)\` -> reflect across the y-axis

The provided reference supports graph-feature comparison and color-coded solution review.
				`.trim(),
				media.expLogFamilies
			),
			createLesson(
				"Logarithmic Graphs and Growth Models",
				`
The parent logarithmic family is \`y = log_b(x)\`. It is the inverse of \`y = b^x\`.

**Core graph facts**

- domain: \`(0, infinity)\`
- range: \`(-infinity, infinity)\`
- vertical asymptote: \`x = 0\`
- points on \`y = log_4(x)\`: \`(1/4, -1)\`, \`(1, 0)\`, \`(4, 1)\`, \`(16, 2)\`

**Representative transformations**

- \`log_10(x - 1) + 3\` -> right \`1\`, up \`3\`
- \`log_10(x + 1) - 4\` -> left \`1\`, down \`4\`
- \`-log_4(x)\` -> reflect across the x-axis
- \`log_4(-x)\` -> reflect across the y-axis
- \`2log_3(x) - 4\` -> vertical stretch by \`2\`, down \`4\`

**Modeling reminders**

- Exponential growth: \`f(t) = a(1 + r)^t\`
- Continuous growth: \`P = P_0 e^(rt)\`

Representative applications:

- \`10000 = 40e^(0.35t)\` -> \`t = ln(250) / 0.35 approx 16\`
- \`1800 = 300e^(0.18t)\` -> \`ln(6) = 0.18t\`
- \`2.3 = 0.7(1.1)^t\` -> \`t = log_1.1(2.3 / 0.7)\`

Some graph-reading prompts are easier to rebuild directly from the available equation, table, or transformation description.
				`.trim()
			)
		]),
		createModule("ALB3 Arithmetic Sequences", [
			createLesson(
				"Arithmetic Sequences and nth Terms",
				`
An arithmetic sequence changes by a constant difference \`d\`. The nth-term formula is
\`a_n = a_1 + d(n - 1)\`.

**Representative examples**

- \`4, 7, 10, 13, ...\` has \`d = 3\`; next terms: \`16, 19, 22\`
- \`2.7, 3.1, 3.5, 3.9, ...\` has \`d = 0.4\`
- \`100, 90, 80, 70, ...\` has \`d = -10\`
- \`2, -7, -16, -25, ...\` has \`d = -9\`

**Missing-term examples**

- \`1, 6, _, 16, 21, ...\` -> missing term \`11\`
- \`4, _, -4, _, -12, ...\` -> missing terms \`0, -8\`
- \`0.1, _, _, 1, ...\` -> missing terms \`0.4, 0.7\`
- \`_, _, 0, 3, ...\` -> missing terms \`-6, -3\`

**nth-term examples**

- In \`4, 1, -2, -5, ...\`, \`a_21 = -56\`
- If \`a_1 = 5\`, \`d = 3\`, and \`a_n = 38\`, then \`n = 12\`
- If \`a_1 = -0.25\`, \`d = 0.5\`, and \`a_n = 9.75\`, then \`n = 21\`

The sequence reference combines plotted terms with the sum-pairing pattern so both term-by-term and series reasoning are visible in one place.
				`.trim(),
				media.arithmeticReference
			),
			createLesson(
				"Arithmetic Series and Application Problems",
				`
The sum of the first \`n\` terms of an arithmetic sequence is
\`S_n = n(a_1 + a_n) / 2\`.

**Representative sums**

- \`13, 10, 7, ..., -14\` -> \`n = 10\`, so \`S_n = -5\`
- \`-17, -15, -13, ..., 1\` -> \`n = 10\`, so \`S_n = -80\`
- \`14, 24, ..., 44\` -> \`n = 4\`, so \`S_n = 116\`
- \`-6, -51, ..., -141\` -> \`n = 4\`, so \`S_n = -294\`

**Applications**

- A theater starts with \`30\` seats and gains \`2\` per row, so the fifth row has \`38\` seats.
- Jogging starts at \`12\` minutes per day and increases by \`6\` each week, so \`60\` minutes happens in week \`9\`.
- Quiz scores \`54, 58, 62, ...\` reach \`90\` on the tenth quiz; with the first quiz on Monday and one quiz each weekday, with no holidays, the tenth quiz lands on Friday.
- Summing \`-9 + 7 + 23 + 39 + ... + 279\` gives \`2565\`.

Keep the nth-term and sum formulas separate: one locates a single term, while the other totals an entire run of terms.
`.trim()
			)
		]),
		createModule("ALB4 Geometric Sequences", [
			createLesson(
				"Geometric Sequences and Exponential Patterns",
				`
A geometric sequence changes by a constant ratio \`r\`. The nth-term formula is
\`a_n = a_1 r^(n - 1)\`.

**Identification examples**

- \`0.5, 1.5, 4.5, 13.5, ...\` -> geometric with \`r = 3\`
- \`-5, 8, 21, ...\` -> arithmetic, not geometric
- \`100, 25, 6.25, ...\` -> geometric with \`r = 1/4\`
- \`-5, -7.5, -11.25, ...\` -> geometric with \`r = 3/2\`

**Representative nth-term examples**

- \`1, 3, 9, ...\` -> \`a_7 = 729\`
- \`4, 28, 196, ...\` -> \`a_7 = 470596\`
- \`1875, 375, 75, 15, 3, ...\` -> \`a_7 = 0.12\`
- \`0.9, 0.45, 0.225, ...\` -> \`a_7 approx 0.014\`

**Applications**

- Salary growth: \`45600(1.06)^7 approx 68566\`
- Car depreciation after six years: \`32000(0.75)^6 approx 5695\`
- Savings after ten years: \`500(1.05)^10 approx 814\`
- Let \`h_n=20(0.83)^(n-1)\` feet with \`n=1\` the initial drop height. The first rebound is \`h_2=16.6\` feet; each later rebound retains \`83%\` of the preceding height

The provided graphic combines geometric-sequence plots with the rebound table used for application practice.
`.trim(),
				media.geometricReference
			),
			createLesson(
				"Geometric Sums and Infinite Series",
				`
For a finite geometric series with \`r != 1\`,
\`S_n = a_1(1 - r^n) / (1 - r)\`.

If \`|r| < 1\`, the infinite series converges to
\`S = a_1 / (1 - r)\`.

**Representative finite sums**

- \`sum_(n=1)^10 2 * 2^(n - 1) = 2046\`
- \`sum_(n=1)^3 0.5 * 6^(n - 1) = 21.5\`
- \`3, 6, ..., 192\` has sum \`381\`
- \`2, 4, ..., 512\` has sum \`1022\`

**Representative infinite-series facts**

- \`3, 16.5, 90.75, ...\` diverges
- \`-0.7, -0.49, -0.343, ...\` converges
- \`0.1, 0.05, 0.025, 0.0125, ...\` converges to \`0.2\`
- \`0.333333...\` = \`1/3\`
- \`0.444444...\` = \`4/9\`

**Applications**

- Multiplier effect: \`1000 + 800 + 640 + ... = 5000\`
- Bouncing ball total path: initial drop plus an infinite rebound series

The reference image includes a convergence panel that connects shrinking geometric pieces to the infinite-series formula.
				`.trim()
			)
		]),
		createModule("ALB5 Matrix Operations", [
			createLesson(
				"Matrix Basics, Addition, and Multiplication",
				`
Add and subtract matrices entry by entry, and only when the dimensions match.

**Representative operations**

- \`[[2, -3], [5, 7]] + [[7, 1], [6.5, -4]] = [[9, -2], [11.5, 3]]\`
- \`[[4, 7], [-1, 0]] - [[3, -2], [5, 8]] = [[1, 9], [-6, -8]]\`
- \`3 * [[1, -2], [4, 0]] = [[3, -6], [12, 0]]\`

For multiplication, the inner dimensions must match. A \`2 x 3\` matrix times a \`3 x 2\` matrix produces a \`2 x 2\` matrix.

**Representative products**

- \`[[1, 2], [3, 4]] [[2, 0], [-1, 5]] = [[0, 10], [2, 20]]\`
- \`[[2, -1, 3], [0, 4, 5]] [[1, 2], [3, 0], [-2, 1]] = [[-7, 7], [2, 5]]\`

The matrix workflow reference summarizes dimension rules, row-by-column multiplication, and the inverse process used in the check-in set.
				`.trim(),
				media.matrixWorkflow
			),
			createLesson(
				"Inverses and Matrix Division",
				`
For a \`2 x 2\` matrix
\`A = [[a, b], [c, d]]\`,
the inverse exists when \`ad - bc != 0\`, and
\`A^(-1) = 1 / (ad - bc) * [[d, -b], [-c, a]]\`.

**Representative inverse examples**

- \`[[3, 0], [1, 2]]^(-1) = (1/6)[[2, 0], [-1, 3]]\`
- \`[[2, 1], [5, 3]]^(-1) = [[3, -1], [-5, 2]]\`

In this course, the quotient notation specifies right multiplication by an invertible matrix, rather than an ordinary division operation:

- \`A / B = A * B^(-1)\`

Example:

- If \`A = [[4, 7], [2, 6]]\` and \`B = [[3, 0], [1, 2]]\`, then
  \`A / B = A * B^(-1) = [[1/6, 3.5], [-1/3, 3]]\`

This covers the matrix-inverse and quotient work needed for Check-in #1.
`.trim()
			)
		]),
		createModule("Check-In #1", [
			createLesson(
				"Review Targets",
				`
This check-in is a guided review rather than a formal exam.

**Focus areas**

- converting between exponential and logarithmic form
- applying log properties and change of base
- graphing and transforming exponential and logarithmic functions
- arithmetic and geometric sequences
- matrix operations

If work stalls, stop and revisit the specific skill instead of pressing through the full set.
				`.trim()
			),
			createLesson(
				"Representative Review Problems",
				algebra2Checkpoint("algebra-2b", "Check-In #1"),
				media.expLogFamilies
			)
		]),
		createModule("ALB6 Probability", [
			createLesson(
				"Probability Rules and Sample Spaces",
				`
Probability measures how likely an event is, on a scale from \`0\` to \`1\`.

**Core language**

- sample space: every possible outcome
- event: the outcomes that match a condition
- independent events: one outcome does not affect the other
- dependent events: the first outcome changes the second probability

**Representative sample spaces**

- One die: \`{1, 2, 3, 4, 5, 6}\`
- Three coin flips: \`{HHH, HHT, HTH, HTT, THH, THT, TTH, TTT}\`
- Two dice: \`36\` ordered outcomes

**Core rules**

- and: \`P(A and B)=P(A)P(B given A)\` for \`P(A)>0\`; use \`P(A)P(B)\` when the events are independent
- or: add probabilities when the events are disjoint
- not: subtract from \`1\`

**Worked examples**

Dice and coins here are fair, repeated rolls and flips are independent, and a counter is selected uniformly from the bag.

- Even number on a die: \`3/6 = 1/2\`
- Blue marble from a bag with \`4\` red, \`7\` blue, \`8\` green, \`2\` purple:
  \`7/21 = 1/3\`
- Four heads in a row: \`(1/2)^4 = 1/16\`
- Not rolling a \`5\`: \`1 - 1/6 = 5/6\`
- Multiple of three and then a \`4\`: \`(2/6)(1/6) = 1/18\`

The provided reference supports sample-space sketches, Venn-style overlap prompts, and table-based probability review.
`.trim(),
				media.probabilityTables
			),
			createLesson(
				"Two-Way Tables, Permutations, and Combinations",
				`
Two-way tables organize one group of data by two different categories. Use row or column conditionals when you want percentages within a subgroup instead of out of the grand total.

**Representative table reading**

- If dog-preferring Discord users are \`40\` and cat-preferring Discord users are \`210\`, then among Discord users the cat preference is \`210 / 250 = 84%\`.
- If dog-preferring Skype users are \`78\` and cat-preferring Skype users are \`105\`, then among Skype users the cat preference is \`105 / 183 approx 57%\`.

**Counting rules**

- permutation: order matters
- combination: order does not matter

Formulas:

- \`P(n, r) = n! / (n - r)!\`
- \`C(n, r) = n! / (r!(n - r)!)\`

**Representative examples**

- \`P(11, 11) = 11! = 39,916,800\`
- Choosing \`2\` friends from \`7\`: \`C(7, 2) = 21\`
- Reordering the letters of PHONE: \`P(5, 5) = 5!\`
- Picking \`4\` distinct marbles from \`16\` without replacement or ordering: \`C(16, 4)\`
- In a hypothetical ten-digit string with independent uniform digits and leading zeros allowed, the probability of starting with \`615\` is \`10^7 / 10^10 = 1/1000\`. Actual assigned phone numbers do not follow this model

This module focuses on probability notation, sample spaces, permutations, combinations, and interpreting results in context.
`.trim()
			)
		]),
		createModule("ALB7 Data and Statistics", [
			createLesson(
				"Correlation and Interpreting Scatter Plots",
				`
Statistics helps you summarize data, notice trends, and decide how trustworthy a prediction might be.

**Core ideas**

- positive correlation: larger \`x\` values tend to accompany larger \`y\` values; individual pairs can depart from the trend
- negative correlation: larger \`x\` values tend to accompany smaller \`y\` values
- stronger correlations have \`r\` values closer to \`1\` or \`-1\`
- no linear correlation means \`r\` is close to \`0\`
- correlation is not the same thing as causation

**Representative interpretations**

- A nearly upward-sloping line can be described as strong positive correlation, such as \`r approx 0.9\`
- A scattered downward trend might be low negative correlation, such as \`r approx -0.49\`
- Points on a nonhorizontal line with varying \`x\` give \`r = 1\` or \`r = -1\`; a constant \`x\` or constant \`y\` makes Pearson correlation undefined
- A curved data set can still have \`r approx 0\` even though a non-linear pattern is visible

**Hand-calculation examples**

- For \`(1, 2), (2, 4), (3, 3), (4, 5)\`, \`r approx 0.8\`
- For \`(1, 3), (4, 0), (5, 5), (8, 1)\`, \`r approx -0.23\`
- For \`(3, 10), (5, 9), (8, 8), (9, 5), (10, 3)\`, \`r approx -0.91\`

The scatter-plot reference includes positive, negative, and weak examples so correlation strength and direction can be compared visually.
`.trim(),
				media.statisticsRegression
			),
			createLesson(
				"Least-Squares Regression and r^2",
				`
Ordinary least squares with an intercept fits predictions \`yhat = mx + b\` by minimizing the sum of squared vertical residuals. The slope \`m\` estimates average change in \`y\` for each increase of \`1\` in \`x\`.

**Key interpretation**

- \`r\` tells you direction and strength
- For this fitted line with an intercept and nonconstant \`y\`, \`r^2\` is the proportion of observed \`y\` variation accounted for by the linear fit

**Representative results**

- An illustrative positive-slope model \`yhat = 0.62x + 1.4\` predicts a rise of \`0.62\` in \`y\` for a one-unit increase in \`x\`
- An illustrative negative-slope model \`yhat = -2x + 11\` predicts a fall of \`2\` in \`y\` for a one-unit increase in \`x\`
- For \`(2, 3), (6, 5), (9, 6)\`, the least-squares line is \`yhat = (16/37)x + 82/37\`, approximately \`yhat = 0.432432x + 2.216216\`, with \`r=16/sqrt(259) approx 0.99419\`
- For \`(3, 5), (8, 2)\`, the line is \`y = -0.6x + 6.8\` with \`r = -1\`
- For interpretation practice, take the reported regression output \`yhat = 0.28x + 3.61\` and \`r=0.78\` as given. Then \`r^2=0.6084\`, approximately \`0.61\`; this reported output supplies no original data table to refit

**Tooling note**

Desmos is an appropriate calculator for the larger tables in this module. Use a table, then enter \`y_1 ~ mx_1 + b\` to recover the regression line and the \`r\` values quickly.
`.trim()
			),
			createLesson(
				"Data Visual References",
				`
Plot the complete paired dataset \`(1,2),(2,4),(3,3),(4,5)\`. Label the axes \`x\` and \`y\`, retain all four observations and draw the fitted line \`yhat=0.8x+1.5\`. Its centered sums are \`Sxx=5,Syy=5,Sxy=4\`, giving \`r=0.8\` and \`R^2=0.64\`.

Compare the nonlinear dataset \`(-2,4),(-1,1),(0,0),(1,1),(2,4)\`. These five points satisfy \`y=x^2\`, while the centered cross-product sum is zero and Pearson \`r=0\`. The equations and listed points are sufficient to reconstruct both displays.
`.trim(),
				media.statisticsRegression
			)
		]),
		createModule("ALB8 Trigonometry Basics", [
			createLesson(
				"Right-Triangle Ratios, Radians, and the Unit Circle",
				`
The three basic trig ratios are:

- \`sin(theta) = opposite / hypotenuse\`
- \`cos(theta) = adjacent / hypotenuse\`
- \`tan(theta) = opposite / adjacent\`

**Representative triangle values**

- For a right triangle with sides \`10, 24, 26\`, choose the acute angle \`theta\` opposite the side of length \`10\`. Then
  - \`sin(theta) = 10/26 = 5/13\`
  - \`cos(theta) = 24/26 = 12/13\`
  - \`tan(theta) = 10/24 = 5/12\`

**Unit-circle reminders**

- point on the unit circle: \`(cos(theta), sin(theta))\`
- \`60\` degrees = \`pi/3\` -> point \`(1/2, sqrt(3)/2)\`
- \`45\` degrees = \`pi/4\` -> point \`(sqrt(2)/2, sqrt(2)/2)\`
- \`150\` degrees = \`5pi/6\` -> point \`(-sqrt(3)/2, 1/2)\`
- \`270\` degrees = \`3pi/2\` -> point \`(0, -1)\`

**Degree-radian conversions**

- \`45\` degrees -> \`pi/4\`
- \`90\` degrees -> \`pi/2\`
- \`180\` degrees -> \`pi\`
- \`1.5pi\` radians -> \`270\` degrees
- \`0.875pi\` radians -> \`157.5\` degrees

The unit-circle reference connects angle position, coordinates, special triangles, and common sine/cosine values.
`.trim(),
				media.unitCircleTrig
			),
			createLesson(
				"Trig Identities and Function Values",
				`
Useful identities:

- \`csc(theta) = 1 / sin(theta)\`
- \`sec(theta) = 1 / cos(theta)\`
- \`cot(theta) = cos(theta) / sin(theta)\`
- \`sin^2(theta) + cos^2(theta) = 1\`
- \`sin(-theta) = -sin(theta)\`
- \`cos(-theta) = cos(theta)\`
- \`tan(-theta) = -tan(theta)\`

**Representative evaluations**

- If \`x = cos(y)\`, then \`cos(-y) = x\`
- If \`x = tan(y)\`, then \`tan(-y) = -x\`
- \`sin(-42 degrees) approx -0.669\`
- \`cos(238 degrees) approx -0.530\`
- \`tan(-37 degrees) approx -0.754\`

**Representative reciprocal values**

- Using the exact value \`sin(60 degrees)=sqrt(3)/2\`, approximately \`0.866\`, gives
  - \`cos(60 degrees) = 0.5\`
  - \`tan(60 degrees) approx 1.732\`
  - \`csc(60 degrees)=2/sqrt(3) approx 1.155\`
  - \`sec(60 degrees) = 2\`
  - \`cot(60 degrees) approx 0.577\`

**Triangle-solving reminder**

In a right triangle, the two acute angles are complementary. That is why \`sin(A) = cos(B)\` whenever \`A + B = 90\` degrees.
`.trim()
			),
			createLesson(
				"Triangle Diagram References",
				`
Draw a triangle with vertices \`O=(0,0),A=(24,0),B=(24,10)\`. The right angle is at \`A\`; \`OB=26\`. Choose \`theta\` at \`O\`, so its opposite leg is \`AB=10\` and adjacent leg is \`OA=24\`. Then \`sin(theta)=5/13\`, \`cos(theta)=12/13\` and \`tan(theta)=5/12\`.

On a unit circle centered at the origin, measure positive angles counterclockwise from the positive x-axis. At \`pi/6\` the point is \`(sqrt(3)/2,1/2)\`; at \`pi/3\`, \`(1/2,sqrt(3)/2)\`; at \`5pi/6\`, \`(-sqrt(3)/2,1/2)\`. The x-coordinate is cosine and the y-coordinate is sine.
`.trim(),
				media.unitCircleTrig
			)
		]),
		createModule("ALB9 Graphing Trigonometric Functions", [
			createLesson(
				"Sine, Cosine, and Tangent Graph Features",
				`
For the parent functions:

- \`y = sin(x)\` and \`y = cos(x)\` have domain \`(-infinity, infinity)\`
- both have range \`[-1, 1]\`
- both have amplitude \`1\`
- both have period \`2pi\`
- tangent has period \`pi\`, no amplitude, and vertical asymptotes where \`cos(x) = 0\`

**Reference tables**

For \`y = sin(x)\` at
\`-2pi, -3pi/2, -pi, -pi/2, 0, pi/2, pi, 3pi/2, 2pi\`:

- \`0, 1, 0, -1, 0, 1, 0, -1, 0\`

For \`y = cos(x)\` at the same x-values:

- \`1, 0, -1, 0, 1, 0, -1, 0, 1\`

**Feature summary**

- local max of \`sin(x)\`: \`(pi/2, 1)\`
- local min of \`sin(x)\`: \`(3pi/2, -1)\`
- local max of \`cos(x)\`: \`(0, 1)\`
- local min of \`cos(x)\`: \`(pi, -1)\`
- roots of \`tan(x)\`: integer multiples of \`pi\`

The provided graph pack gives clean sine, cosine, tangent, and tangent-table references.
				`.trim(),
				media.trigGraphs
			),
			createLesson(
				"Transformations of Trig Graphs",
				`
For real nonzero \`a,b\` in \`y = a sin(bx) + d\` or \`y = a cos(bx) + d\`, with angles in radians:

- amplitude = \`|a|\`
- period = \`2pi / |b|\`
- midline = \`y = d\`

For \`y = a tan(bx) + d\`:

- period = \`pi / |b|\`
- midline = \`y = d\`
- there is no amplitude

**Worked examples**

- \`-5sin(x) + 3\` -> max \`8\`, min \`-2\`
- \`4cos(x/3)\` -> amplitude \`4\`, period \`6pi\`
- \`2tan(x/5)\` -> period \`5pi\`
- \`2sin(x) - 4\` -> midline \`y = -4\`, amplitude \`2\`
- \`0.5sin(x) + 8\` -> midline \`y = 8\`, amplitude \`0.5\`
- \`4sin(x + pi/2)\` -> left shift by \`pi/2\`, amplitude \`4\`
- \`4sin(2x + pi) + 5\` -> amplitude \`4\`, period \`pi\`, midline \`y = 5\`
- \`2cos(pi x) + 7\` -> amplitude \`2\`, period \`2\`, midline \`y = 7\`
- \`-3cos(2x) + 1.5\` -> amplitude \`3\`, period \`pi\`, midline \`y = 1.5\`

The provided trig-graph reference covers the standard parent graphs. For any transformation prompt, rebuild the graph from the equation by identifying amplitude, period, midline, phase shift, and reflection first.
`.trim(),
				media.trigGraphs
			)
		]),
		createModule("Check-In #2", [
			createLesson(
				"Review Targets",
				`
This check-in revisits the second half of the course.

**Focus areas**

- compound probability
- two-way tables and counting methods
- correlation, regression, and interpreting \`r^2\`
- trig ratios, radians, and unit-circle coordinates
- graphing transformed trig functions

	Treat the check-in as planning data for future review, not as a formal exam.
					`.trim()
			),
			createLesson(
				"Representative Review Problems",
				algebra2Checkpoint("algebra-2b", "Check-In #2"),
				media.trigGraphs
			)
		]),
		createModule(
			"ALB10 Algebra 2B Modeling Capstone",
			[
				createLesson(
					"Capstone: Compare, Model, and Defend",
					`
Build one evidence-based model comparison that connects at least three Algebra 2B strands.

**Required build**

1. Choose a bounded classroom or fictional question involving change over time, repeated patterns, or a periodic measurement.
2. Represent the situation with an exponential or logarithmic model and either a sequence or trigonometric model.
3. Include a table, equation, graph or feature sketch, and a clearly labeled domain for each model.
4. Use one probability, regression, or matrix calculation to organize evidence or evaluate the model.
5. Compare what each representation explains well, identify one assumption or limitation, and defend the model that best answers the question.
6. End with a Pre-Calculus handoff note naming the function, sequence, trigonometry, or rate-of-change idea that needs deeper study.

**Completion evidence**

- Every representation uses consistent variables, units, and input values.
- At least two calculations are checked with substitution, technology, or an independent method.
- The conclusion distinguishes association from causation when data is involved.
- The final model choice follows from stated evidence and includes one limitation.
					`.trim()
				)
			],
			[
				createLesson(
					"Choice: Course Evidence Audit",
					`
Select one completed artifact from each of five strands: logarithms, sequences, matrices, probability or statistics, and trigonometry. Make a five-row table naming the question, representation, assumptions, independent verification, and any correction needed.

- Check a logarithm through its exponential form and a sequence through listed terms or partial sums.
- Check matrix dimensions before an operation and verify an inverse by multiplication when applicable.
- Identify the sample space or dataset behind a probability or statistics result; distinguish association from causation.
- Check a trigonometric result against its triangle, unit-circle position, or graph features.
- For correct work, record the successful check. Use the table to justify the capstone's selection of at least three strands.
					`.trim()
				),
				createLesson(
					"Challenge: Model Stress Test",
					`
For nonnegative integer n, compare the exponential model E(n)=100(1.10)^n with the arithmetic sequence S(n)=100+10n. Compute both at n=0,1,2. Change only the exponential growth rate from 10% to 20%, giving E_new(n)=100(1.20)^n, and repeat the table while retaining S.

- Show the original and revised predictions, with the change in each prediction.
- Explain why agreement at the first two inputs does not prove that the original models agree for all inputs.
- Distinguish sensitivity to the changed parameter from evidence that either model fits a real dataset.
- Change one growth rate, sequence ratio, data point, matrix entry, probability assumption, or trigonometric parameter in the capstone. Recalculate both models and support the revised conclusion with checked values.

[Project self-check](/courses/?course=algebra-2b&asset=%2Fcourse-assets%2Falgebra-2b%2Fpractice-checks-v1.md%23capstone-growth-stress-test&label=Capstone+growth+stress+test)
					`.trim()
				)
			]
		),
		createModule("Reference Archive: Algebra 2B", [
			createLesson(
				"Algebra 2B Reference Map",
				`
This reference map summarizes Algebra 2B topic coverage and static media slots without embedding diagram files that are still pending in the class asset library.

**Course concept map**

- Logarithms and the natural logarithm: the reference uses \`y = (1 + 1/x)^x\`, a value table approaching \`e\`, and the \`ln\` notation contrast with \`log_e\`.
- Exponential and logarithmic graphing: the reference compares growth and decay families, horizontal and vertical shifts, vertical and horizontal stretch factors, reflections, and asymptotes.
- Growth applications: the Mars-colony prompt uses a \`75%\` annual growth model and Desmos to estimate when population reaches \`7.6\` billion.
- Matrix operations: the reference names MatrixCalc for larger inverse calculations after determinant and inverse workflows become tedious by hand.
- Statistics and regression: the reference includes scatter-plot interpretation, correlation strength, least-squares regression, \`r\`, \`r^2\`, and a lemonade-sales regression example.
- Trigonometry: the reference includes unit-circle diagrams, special-angle coordinates, right-triangle ratios, reciprocal identities, and transformed sine, cosine, and tangent graphs.

**Reference links**

- Desmos Graphing Calculator: https://www.desmos.com/calculator
- Least-squares regression visualization: https://www.desmos.com/calculator/lywhybetzt
- Matrix calculator reference: https://matrixcalc.org/en/
- Unit-circle angle diagram: https://www.geogebra.org/geometry/harzmnkp
- Unit-circle coordinate diagram: https://www.geogebra.org/geometry/grcqk5kt

**Static-media note**

Legacy static media is not embedded directly while those files are pending. Each filename below keeps the intended static media URL so the asset can be added later without changing course references.
				`.trim()
			),
			createLesson("Pending Static Assets", sourceMediaReferences())
		])
	]
};

configureMathCourseFlow(algebra2BCourse, {
	courseId: "algebra-2b",
	modules: [
		{
			title: "ALB1 Introduction to Logarithms",
			estimatedTime: "2–3 sessions · 50–65 minutes each",
			keyBlocks: [
				"exponential / logarithmic form",
				"base / exponent",
				"log property",
				"change of base",
				"equation check"
			],
			flowNote:
				"Translate between exponential and logarithmic forms before applying properties, state domain restrictions, and check equations by returning to exponential form."
		},
		{
			title: "ALB2 Exponential and Logarithmic Functions",
			estimatedTime: "3 sessions · 50–65 minutes each",
			keyBlocks: [
				"growth / decay",
				"inverse functions",
				"domain / range",
				"asymptote",
				"transformation / model"
			],
			flowNote:
				"Connect each logarithmic graph to its exponential inverse, predict asymptotes and transformations before graphing, and interpret parameters only within the model's stated domain."
		},
		{
			title: "ALB3 Arithmetic Sequences",
			estimatedTime: "2 sessions · 50–65 minutes each",
			keyBlocks: [
				"common difference",
				"recursive rule",
				"explicit rule",
				"nth term",
				"finite sum"
			],
			flowNote:
				"Identify the constant difference, move between recursive and explicit descriptions, and choose the nth-term or series formula based on whether the question asks for one term or a total."
		},
		{
			title: "ALB4 Geometric Sequences",
			estimatedTime: "2–3 sessions · 50–65 minutes each",
			keyBlocks: [
				"common ratio",
				"explicit rule",
				"exponential connection",
				"finite series",
				"convergence"
			],
			flowNote:
				"Verify a constant ratio before using a geometric formula, connect repeated multiplication to exponential behavior, and justify convergence from the magnitude of the ratio."
		},
		{
			title: "ALB5 Matrix Operations",
			estimatedTime: "2–3 sessions · 50–65 minutes each",
			keyBlocks: [
				"matrix dimension",
				"entry operation",
				"row-by-column product",
				"determinant / inverse",
				"operation check"
			],
			flowNote:
				"Check dimensions before every operation, show one row-by-column product in full, and verify inverse work by multiplying back to the identity matrix."
		},
		{
			title: "Check-In #1",
			estimatedTime: "1–2 sessions · 50–65 minutes each",
			keyBlocks: [
				"logarithmic form",
				"function feature",
				"sequence model",
				"series decision",
				"matrix verification"
			],
			flowNote:
				"Complete one logarithm, function, sequence or series, and matrix task without notes. Correct the first representation or verification mismatch before advancing to probability and data."
		},
		{
			title: "ALB6 Probability",
			estimatedTime: "2–3 sessions · 50–65 minutes each",
			keyBlocks: [
				"sample space",
				"and / or / not",
				"conditional probability",
				"permutation",
				"combination"
			],
			flowNote:
				"Define the sample space first, decide whether order and replacement matter, and explain the denominator used for each simple, compound, or conditional probability."
		},
		{
			title: "ALB7 Data and Statistics",
			estimatedTime: "3 sessions · 50–65 minutes each",
			keyBlocks: [
				"scatter plot",
				"correlation direction / strength",
				"regression line",
				"r / r²",
				"association / causation"
			],
			flowNote:
				"Describe the scatter plot before calculating, interpret slope and r² in context, and separate prediction or association from any unsupported causal claim. The visual reference is optional support.",
			choiceCurriculumTitles: ["Data Visual References"]
		},
		{
			title: "ALB8 Trigonometry Basics",
			estimatedTime: "3 sessions · 50–65 minutes each",
			keyBlocks: [
				"right-triangle ratio",
				"degree / radian",
				"unit-circle coordinate",
				"reciprocal identity",
				"quadrant sign"
			],
			flowNote:
				"Move from a labeled right triangle to unit-circle coordinates, convert units explicitly, and check signs from the angle's quadrant. The triangle diagram reference is optional support.",
			choiceCurriculumTitles: ["Triangle Diagram References"]
		},
		{
			title: "ALB9 Graphing Trigonometric Functions",
			estimatedTime: "3 sessions · 50–65 minutes each",
			keyBlocks: [
				"parent graph",
				"amplitude",
				"period",
				"midline / phase shift",
				"feature-based graph"
			],
			flowNote:
				"Identify amplitude, period, midline, shift, and reflection before plotting a cycle, then check key points and asymptotes against the transformed equation."
		},
		{
			title: "Check-In #2",
			estimatedTime: "1–2 sessions · 50–65 minutes each",
			keyBlocks: [
				"probability structure",
				"regression interpretation",
				"unit-circle value",
				"trigonometric feature",
				"evidence-based correction"
			],
			flowNote:
				"Complete one probability, regression, unit-circle, and transformed-graph task without notes. Use errors to select targeted review before beginning the synthesis capstone."
		},
		{
			title: "ALB10 Algebra 2B Modeling Capstone",
			estimatedTime: "3–4 sessions · 50–65 minutes each",
			keyBlocks: [
				"two mathematical models",
				"table / equation / graph",
				"data or matrix evidence",
				"assumption / limitation",
				"Pre-Calculus handoff"
			],
			flowNote:
				"Build and verify two models from course methods, choose between them from evidence, and state the limits of the conclusion. The evidence audit is optional organization; the stress test is a challenge.",
			challengeSupplementalTitles: ["Challenge: Model Stress Test"]
		}
	],
	appendixTitles: ["Reference Archive: Algebra 2B"]
});

applyAlgebra2Readings(algebra2BCourse, "algebra-2b");
