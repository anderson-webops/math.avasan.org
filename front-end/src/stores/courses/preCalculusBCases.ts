import type { RawCourse } from "./types";
import { slugMarkdownHeading } from "@/modules/courseAssetPreview";
import { calculusCourseAssetViewerUrl as courseAssetViewerUrl } from "@/modules/courseAssetSourcesCalculus";
import {
	insertCalculusText,
	requireCalculusBinding,
	requireCalculusModule,
	retainCalculusSources
} from "./calculusBaselineBindings";

export const preCalculusBCases = [
	{
		code: "PCTB1",
		title: "Trigonometry Basics",
		example:
			"**Exact values from triangles.** In a right triangle, `sin(theta) = opposite/hypotenuse`, `cos(theta) = adjacent/hypotenuse`, and `tan(theta) = opposite/adjacent`. Splitting an equilateral triangle of side 2 produces a 30-60-90 triangle with sides `1, sqrt(3), 2`; the side opposite 30 degrees has length 1. Thus `sin(30 degrees) = 1/2` and `cos(30 degrees) = sqrt(3)/2`. A right triangle with legs 1 has hypotenuse `sqrt(2)`, giving sine and cosine `sqrt(2)/2` at 45 degrees. On the unit circle these are the y- and x-coordinates.\n\nFor 150 degrees, the reference angle is 30 degrees and the point is in quadrant II: `(-sqrt(3)/2, 1/2)`. Therefore `tan(150 degrees) = -sqrt(3)/3`. Convert using `180 degrees = pi radians`; adding `2pi` radians preserves the point. Reciprocal ratios are `sec = 1/cos`, `csc = 1/sin`, and `cot = cos/sin`, wherever the denominators are nonzero.\n\n**Triangle laws.** Sides a, b, c are opposite angles A, B, C. The law of sines is `a/sin(A) = b/sin(B) = c/sin(C)`. The law of cosines is `a^2 = b^2 + c^2 - 2bc cos(A)`. With `b = 5, c = 7, A = 60 degrees`, the included-angle calculation gives `a^2 = 25 + 49 - 70(1/2) = 39`, so `a = sqrt(39)`.\n\nFor the side-side-angle data `A = 30 degrees, a = 5, b = 8`, the sine law gives `sin(B) = 4/5`. Both `B approx 53.130 degrees` and `B approx 126.870 degrees` leave a positive third angle, so there are two triangles. Their third angles are approximately 96.870 and 23.130 degrees; their third sides are `3 + 4sqrt(3)` and `4sqrt(3) - 3`. Always test the supplementary angle instead of accepting just the calculator's first answer.",
		problems:
			"1. Convert 225 degrees to radians and `-pi/3` radians to degrees. Give one positive coterminal angle for each.\n2. Find the reference angle and exact sine, cosine, and tangent of 225 degrees and `-pi/3`. Explain their signs from coordinates.\n3. Evaluate `sec(pi)`, `csc(pi/6)`, and `cot(pi/4)`. Explain why `tan(pi/2)` and `csc(0)` are undefined.\n4. A right triangle has hypotenuse 10 and acute angle 30 degrees. Find the opposite and adjacent sides.\n5. In a triangle, `b = 4, c = 6`, and the included angle `A = 60 degrees`. Find a using the law of cosines.\n6. With `A = 30 degrees` and `b = 8`, determine the number of triangles for each opposite side `a = 3, 5, 10`. Use the sine law and angle-sum test, including both candidate B angles where possible."
	},
	{
		code: "PCTB2",
		title: "Graphs of Sine and Cosine",
		example:
			"Angles in the formulas below use radians. For nonzero A and B in `y = A sin[B(x - C)] + D` or the corresponding cosine form, amplitude is `|A|`, period is `2pi/|B|`, midline is `y = D`, and the horizontal shift is C. A negative A reflects the graph across its midline.\n\nFor `f(x) = 2sin[(pi/2)(x - 1)] + 3`, the amplitude is 2, period 4, midline 3, and shift 1 to the right. Divide the period into quarters: x values `1, 2, 3, 4, 5` give y values `3, 5, 3, 1, 3`. Plot these points and repeat the pattern; the range is `[1, 5]`.",
		problems:
			"1. For `g(x) = -3cos[2(x + pi/4)] + 1`, identify amplitude, period, midline, shift, and range. Compute five quarter-cycle points beginning at `x = -pi/4`, then sketch one period.\n2. A periodic curve has these consecutive quarter-cycle points: `(0, 1), (pi/2, 3), (pi, 1), (3pi/2, -1), (2pi, 1)`. Give one sine equation that fits, and verify all five values.\n3. A height model is `h(t) = 1.5cos(pi t/6) + 2` meters, where t is hours and `0 <= t <= 12`. Find the period, maximum and minimum heights and their times, and the height at t = 3. Explain what the midline represents."
	},
	{
		code: "PCTB3",
		title: "Other Trigonometric Graphs",
		example:
			"The tangent graph has period pi; `tan(x) = sin(x)/cos(x)` is undefined when `cos(x) = 0`. Thus `tan(2x)` has period `pi/2` and vertical asymptotes `x = pi/4 + kpi/2` for integer k. Between `-pi/4` and `pi/4`, the points `(-pi/8, -1), (0, 0), (pi/8, 1)` anchor an increasing branch.\n\nReciprocal graphs use division, not inverse functions: `sec = 1/cos`, `csc = 1/sin`, and `cot = cos/sin`. Zeros in the relevant denominator create exclusions and asymptotes. A secant or cosecant output cannot lie strictly between -1 and 1.\n\nInverse functions restrict the original trig function to one-to-one intervals. The principal ranges are `[-pi/2, pi/2]` for arcsin, `[0, pi]` for arccos, and `(-pi/2, pi/2)` for arctan. Their domains are `[-1, 1]`, `[-1, 1]`, and all reals, respectively.",
		problems:
			"1. Sketch one branch of `y = 2tan(x - pi/4)`, giving its period, adjacent asymptotes, zero, and values at `x = 0, pi/4, pi/2`.\n2. State domains, periods, and ranges of `sec(x)`, `csc(x)`, and `cot(x)`; sketch one period of each using sine or cosine as a guide. Evaluate `sec(pi)`, `csc(pi/6)`, and `cot(pi/4)`, and identify their denominator-zero exclusions.\n3. Evaluate the principal values `arcsin(-sqrt(3)/2)`, `arccos(-1/2)`, `arctan(1)`, and `arcsin(sin(5pi/6))`. Explain why the last answer is not `5pi/6`."
	},
	{
		code: "PCTB4",
		title: "Trigonometric Equations and Identities",
		example:
			"Use `sin^2(x) + cos^2(x) = 1`, `1 + tan^2(x) = sec^2(x)`, and `1 + cot^2(x) = csc^2(x)` on their original domains. For example, `(1 - cos^2(x))/sin(x) = sin^2(x)/sin(x) = sin(x)` requires `sin(x) != 0`; cancellation does not restore excluded angles.\n\nAngle formulas are `sin(a +/- b) = sin(a)cos(b) +/- cos(a)sin(b)` and `cos(a +/- b) = cos(a)cos(b) -/+ sin(a)sin(b)`. Also `sin(2x) = 2sin(x)cos(x)` and `cos(2x) = 1 - 2sin^2(x) = 2cos^2(x) - 1`. The tangent sum formula is `(tan(a) + tan(b))/(1 - tan(a)tan(b))` wherever the original tangents and final denominator are defined.\n\nHalf-angle formulas use `sin(x/2) = +/-sqrt[(1 - cos(x))/2]` and `cos(x/2) = +/-sqrt[(1 + cos(x))/2]`; choose signs from the quadrant of x/2. To solve `2sin(x) = 1` on `[0, 2pi)`, use the reference angle pi/6 and the positive-sine quadrants: `x = pi/6, 5pi/6`.",
		problems:
			"1. Simplify `(sec^2(x) - 1)/tan(x)` and state the common domain of the original and simplified expressions.\n2. Using degree measure, find exact `sin(75 degrees)`, `cos(75 degrees)`, and `tan(75 degrees)` from 45 and 30 degrees.\n3. Find exact sine and cosine of 22.5 degrees using half-angle formulas. Explain the signs.\n4. Solve each equation on `0 <= x < 2pi`: (a) `2cos^2(x) - 1 = 0`; (b) `sin(2x) = sin(x)`. Keep all factor-zero cases and check the answers."
	},
	{
		code: "PCTB5",
		title: "Polar Coordinates",
		example:
			"Convert with `x = r cos(theta)`, `y = r sin(theta)`, and `r^2 = x^2 + y^2`. The point `(r, theta) = (2, pi/3)` is `(1, sqrt(3))` in rectangular coordinates. A negative radius reverses direction: `(-2, pi/3)` is `(-1, -sqrt(3))`, also represented by `(2, 4pi/3)`.\n\nFor `r = 4sin(theta)`, multiply by r to get `x^2 + y^2 = 4y`, hence `x^2 + (y - 2)^2 = 4`: a circle centered at `(0, 2)` with radius 2. Check points rather than relying only on the equation's appearance.\n\nWrite a nonzero complex number as `z = r[cos(theta) + i sin(theta)]`, with modulus r > 0. Angles add in multiplication, and De Moivre's rule gives `z^n = r^n[cos(n theta) + i sin(n theta)]` for integer n. For `z = 2[cos(pi/6) + i sin(pi/6)]`, its cube is `8i`.",
		problems:
			"1. Convert `(-2, pi/3)` to rectangular coordinates, then give an equivalent representation with positive radius.\n2. Convert `r = 4cos(theta)` to a rectangular equation and identify the curve. Make a polar table for `theta = 0, pi/4, pi/2, 3pi/4, pi`; use the resulting points to check the sketch.\n3. Write `1 + i` in polar form and compute its cube by De Moivre's rule; check by ordinary multiplication.\n4. Find all three complex solutions of `z^3 = 8i`. Explain why considering only the principal argument of 8i would miss solutions."
	},
	{
		code: "PCTB6",
		title: "Parametric Equations",
		example:
			"For `x = 2t + 1`, `y = 3t - 2`, `0 <= t <= 2`, a table at t = 0, 1, 2 gives `(1, -2), (3, 1), (5, 4)`. The arrows point from the first to the last point.\n\nSolving `t = (x - 1)/2` gives `y = (3/2)x - 7/2`, but only for `1 <= x <= 5`. The unrestricted line would include points never reached by the parameter. If t is seconds and coordinates are meters, each one-second step has displacement `(2, 3)` and length `sqrt(13)` m, so the speed is constant `sqrt(13)` m/s.",
		problems:
			"1. For `x = t^2`, `y = t + 1`, `-2 <= t <= 2`, make a table for integer t, eliminate t, and state the resulting y restriction. Sketch the path with arrows and explain why equal x values can correspond to different points.\n2. For `x = 3cos(t)`, `y = 2sin(t)`, `0 <= t <= 2pi`, plot the quarter-period points, eliminate t, identify the curve, and give the direction of travel. Which parameter values repeat the starting point on this interval?"
	},
	{
		code: "PCTB7",
		title: "Vectors",
		example:
			"Vector magnitude is the square root of the sum of squared components. The displacement from `A = (-1, 2)` to `B = (2, 6)` is `u = B - A = (3, 4)`, of magnitude `sqrt(3^2 + 4^2) = 5` and direction `arctan(4/3) approx 53.130 degrees` counterclockwise from the positive x-axis. Both components are positive; in other quadrants, use the coordinate signs to choose the angle rather than relying on an arctangent of the component ratio alone.\n\nWith `v = (-2, 1)`, component arithmetic gives `u + v = (1, 5)`, `u - v = (5, 3)`, and `-2v = (4, -2)`. The dot product is `u dot v = 3(-2) + 4(1) = -2`. For nonzero vectors, `cos(theta) = (u dot v)/(|u||v|)`, so this angle is obtuse. The vector projection of u onto v is `[(u dot v)/(v dot v)]v = (-2/5)v = (4/5, -2/5)`; projection onto the zero vector is undefined.",
		problems:
			"1. Let `p = (4, -3)` and `q = (3, 4)`. Find both magnitudes, `p + q`, `2p - q`, their dot product, the angle between them, and the vector projection of p onto q.\n2. A displacement has components 3 km east and 4 km north. Find its magnitude and direction, and explain why adding the component magnitudes does not give the straight-line distance.\n3. In three dimensions, find the magnitude of `(1, 2, -2)` and its dot product with `(-2, 1, 0)`. What does the result imply about the angle?"
	},
	{
		code: "PCTB8",
		title: "Matrices Review",
		example:
			"Write rows explicitly: `M = [[2, 1], [1, 1]]`. In matrix multiplication, entry `(i, j)` is row i dotted with column j; inner dimensions must match. Addition and subtraction require equal dimensions.\n\nFor a 2-by-2 matrix `[[a, b], [c, d]]`, determinant is `ad - bc`; when nonzero its inverse is `(1/(ad - bc))[[d, -b], [-c, a]]`. Here det(M) = 1, so `M^(-1) = [[1, -1], [-1, 2]]`. Multiplying gives `[[2 - 1, -2 + 2], [1 - 1, -1 + 2]] = [[1, 0], [0, 1]]`. An inverse is a matrix product inverse, not the entrywise reciprocal.",
		problems:
			"Use `A = [[1, 2], [3, 4]]`, `B = [[2, 0], [-1, 3]]`, and `C = [[1, 0, 2], [0, 1, -1]]`.\n\n1. Compute `A + B`, `A - B`, and `2A`.\n2. Compute AB and BA. Are matrix products commutative in this example?\n3. Find det(A), its inverse, and a product check. Decide whether `N = [[2, 4], [1, 2]]` has an inverse.\n4. State the dimensions of AC and CA, explaining any undefined product. Compute AC when valid."
	},
	{
		code: "PCTB9",
		title: "Applications of Matrices",
		example:
			"For `2x + y = 5` and `x - y = 1`, the augmented matrix is `[[2, 1 | 5], [1, -1 | 1]]`.\n\n1. Swap rows: `[[1, -1 | 1], [2, 1 | 5]]`.\n2. Replace R2 by `R2 - 2R1`: `[[1, -1 | 1], [0, 3 | 3]]`.\n3. Divide R2 by 3, then add R2 to R1. The reduced rows give `x = 2, y = 1`; both original equations check.\n\nAllowed row operations swap rows, multiply a row by a nonzero constant, or add a multiple of another row. A row `[0, 0 | nonzero]` is inconsistent. A zero row with a free variable can produce infinitely many solutions. For an invertible square coefficient matrix A, the system `A v = b` also has solution `v = A^(-1)b`.",
		problems:
			"1. Solve `x + y + z = 6`, `2x - y + z = 3`, `x + 2y - z = 2` using an augmented matrix and row operations. Check all equations.\n2. Classify and solve if possible: `2x + 4y = 6`, `x + 2y = 4`.\n3. Classify `x - 2y = 3`, `2x - 4y = 6`; describe every solution with a parameter.\n4. Use the inverse of `M = [[2, 1], [1, 1]]` from the preceding unit to solve `M [x, y]^T = [5, 3]^T`. Verify the result."
	},
	{
		code: "PCTB10",
		title: "Partial Fraction Decomposition",
		example:
			"For `(3x + 5)/[(x + 1)(x + 2)]`, write `A/(x + 1) + B/(x + 2)`. Clearing denominators gives `3x + 5 = A(x + 2) + B(x + 1)`, so `A + B = 3` and `2A + B = 5`. Therefore A = 2, B = 1. Recombining `2/(x + 1) + 1/(x + 2)` reproduces the original expression for `x != -1, -2`.\n\nDivide first when the numerator's degree is at least the denominator's. For a repeated linear factor `(x - a)^m`, include terms for every power from 1 to m. For an irreducible quadratic factor, use a linear numerator `Bx + C` rather than a constant alone. Keep all original denominator restrictions.",
		problems:
			"Decompose and verify each result by recombining. State the real domain restrictions.\n\n1. `3x/[(x - 2)(x + 1)]`.\n2. `(x^2 + x + 2)/[(x - 1)^2(x + 1)]`, including all repeated-factor terms.\n3. `(x^2 + 2x + 3)/[(x + 1)(x^2 + 1)]`, starting with the full linear numerator for the quadratic factor.\n4. `(x^2 + 1)/(x - 1)`, performing division before decomposition."
	},
	{
		code: "PCTB11",
		title: "Counting and Probability",
		example:
			"A bag contains 3 red and 2 blue counters. Draw two without replacement. The probability both are red is `(3/5)(2/4) = 3/10`; the second probability changes because one red counter is gone. Equivalently, count unordered pairs: `C(3,2)/C(5,2) = 3/10`. The probability of at least one blue is the complement, `1 - 3/10 = 7/10`.\n\nFor a positive integer n, `n!` is the product of the integers from 1 through n; `0! = 1`. For n distinct objects, ordered selections of r without replacement number `P(n,r) = n!/(n-r)!`; unordered selections number `C(n,r) = n!/[r!(n-r)!]`. For equally likely outcomes, probability is favorable outcomes divided by total outcomes. Use `P(A union B) = P(A) + P(B) - P(A intersection B)` and `P(A|B) = P(A intersection B)/P(B)` for P(B) > 0. Independence requires `P(A intersection B) = P(A)P(B)`; it does not mean the events cannot overlap.",
		problems:
			"1. A group contains 5 members of team A and 3 of team B. Choose an unordered 3-person committee uniformly. Count all committees and find the probability of exactly two A members and one B member.\n2. A four-digit code uses digits 0 through 9, allows leading zero, and cannot repeat digits. How many codes are possible? Compare with repetition allowed.\n3. Roll a fair six-sided die. Let A mean an even result and B mean a result greater than 3. Find `P(A union B)`, `P(A intersection B)`, and `P(A|B)`. Are the events independent or mutually exclusive?\n4. In the worked counter example, replace the first counter before the second draw. Find the probability of two red counters and explain why it differs from the without-replacement result."
	},
	{
		code: "PCTB12",
		title: "Limits and Continuity",
		example:
			"For `f(x) = (x^2 - 4)/(x - 2)`, the original domain excludes 2. Away from 2, factoring gives `f(x) = x + 2`. Inputs `1.9, 1.99, 2.01, 2.1` give outputs `3.9, 3.99, 4.01, 4.1`; both sides approach 4. Thus `lim_(x -> 2) f(x) = 4`, although f(2) is undefined. Defining f(2) = 4 would fill the hole.\n\nA two-sided finite limit exists when the left and right limits agree. Continuity at a point additionally requires a defined function value equal to that limit. At infinity, divide numerator and denominator by the highest relevant power: `(3x^2 - 1)/(2x^2 + 5) = (3 - 1/x^2)/(2 + 5/x^2)` approaches `3/2` as x grows without bound.",
		problems:
			"1. Find `lim_(x -> 3) (x^2 - 9)/(x - 3)`, and distinguish the limit from the original function value at 3. Show a table with two inputs on each side.\n2. Let h(x) = x + 1 for x < 1, h(1) = 4, and h(x) = 2x for x > 1. Find both one-sided limits, the two-sided limit, and h(1). Is h continuous, and how could it be repaired?\n3. Let j(x) = x^2 for x <= 0 and j(x) = x + 1 for x > 0. Find the one-sided limits at 0 and decide whether a two-sided limit exists.\n4. Describe the one-sided behavior of `1/(x - 1)` as x approaches 1. Explain why a finite two-sided limit does not exist."
	},
	{
		code: "PCTB13",
		title: "Rates of Change",
		example:
			"For position `s(t) = t^2` meters with t in seconds and t >= 0, the average rate on `[1, 3]` is `[s(3) - s(1)]/(3 - 1) = (9 - 1)/2 = 4 m/s`. This is a secant slope across an interval.\n\nAt t = 2, the difference quotient is `[s(2 + h) - s(2)]/h = (4h + h^2)/h = 4 + h` for h != 0. Letting h approach 0 gives the instantaneous rate `s'(2) = 4 m/s`, a tangent slope. The tangent line is `s - 4 = 4(t - 2)`. The agreement with the earlier average is particular to this example, not a general rule. Derivative notation records a limiting rate; fuller derivative rules follow in calculus.",
		problems:
			"1. Let `p(t) = t^3` meters for t >= 0 seconds. Find the average rate on `[1, 2]` and the instantaneous rate at 1 by expanding `[p(1 + h) - p(1)]/h`. Write the tangent-line equation at 1.\n2. A temperature model is `T(t) = 5t + 10` degrees Celsius, with t in minutes. Find the average rate on `[0, 3]` and the instantaneous rate at 2. Explain why these agree.\n3. A position table gives times `0, 1, 2, 3` seconds and distances `0, 3, 8, 15` meters. Find the average rate on `[1, 3]` and use it to estimate the instantaneous rate at 2. Explain why the table alone does not determine that instantaneous rate exactly."
	}
];
export const preCalculusBCheckIns = [
	{
		code: "check-in-1-trigonometry",
		title: "Check-In 1: Trigonometry Fundamentals",
		moduleTitle: "Check-In #1: Trigonometry and Coordinate Models",
		itemTitle: "Trigonometry Fundamentals Review",
		problems:
			"1. Convert 225 degrees to radians and give its exact sine, cosine, and tangent.\n2. A triangle has b = 4, c = 6 and included angle A = 60 degrees. Find a and name the law used.\n3. For `f(x) = 3cos[2(x - pi/4)] - 1`, give amplitude, period, midline, shift, range, and five quarter-cycle points.\n4. Solve `2sin^2(x) - sin(x) - 1 = 0` on `[0, 2pi)`. Also verify `sin(x)/(1 + cos(x)) = (1 - cos(x))/sin(x)` on the common domain, stating exclusions."
	},
	{
		code: "check-in-1-coordinates",
		title: "Check-In 1: Polar and Parametric Models",
		moduleTitle: "Check-In #1: Trigonometry and Coordinate Models",
		itemTitle: "Polar and Parametric Review",
		problems:
			"1. Convert `(-2, pi/3)` to rectangular coordinates. Write `1 + i` in polar form and compute its cube.\n2. For `x = 2t`, `y = 1 - t`, `-1 <= t <= 2`, eliminate t, retain the path restriction, and give the start, end, and direction."
	},
	{
		code: "check-in-2-linear-algebra",
		title: "Check-In 2: Vectors, Matrices, and Partial Fractions",
		moduleTitle: "Check-In #2 and Pre-Calculus B Capstone",
		itemTitle: "Vectors, Matrices, and Partial Fractions Review",
		problems:
			"1. For `u = (1, 2)` and `v = (2, -1)`, find `2u - v`, the dot product, and the angle between the vectors.\n2. Use an inverse matrix to solve `x + y = 5`, `2x + 3y = 13`; verify the solution.\n3. Decompose `(5x + 4)/[(x - 1)(x + 2)]`, retaining original exclusions."
	},
	{
		code: "check-in-2-readiness",
		title: "Check-In 2: Probability, Limits, and Rates",
		moduleTitle: "Check-In #2 and Pre-Calculus B Capstone",
		itemTitle: "Probability, Limits, and Rates Review",
		problems:
			"1. A bag contains 4 red and 3 blue counters. Draw two without replacement. Find the probability of exactly one of each color by counting unordered pairs.\n2. A function equals `(x^2 - 1)/(x - 1)` for x != 1 and equals 3 at x = 1. Find the limit at 1, decide continuity, and give a repair if possible.\n3. Let k(x) = 2x for x <= 1 and k(x) = x + 2 for x > 1. Find the one-sided limits and function value at 1; classify continuity.\n4. For `p(t) = t^2 + 3t` meters, t >= 0 seconds, find the average rate on `[0, 2]` and the instantaneous rate at 2 using a difference quotient. Write the tangent line."
	}
];

function selfCheck(heading: string) {
	return `[Check answers and reasoning](${courseAssetViewerUrl(
		`/course-assets/pre-calculus-b/practice-checks-v1.md#${slugMarkdownHeading(heading)}`,
		`${heading} self-check`
	)})`;
}

export function addPreCalculusBCases(course: RawCourse, source: RawCourse) {
	const basics = requireCalculusBinding(
		course.modules,
		module => module.title.startsWith("PCTB1 "),
		"PCTB1"
	);
	const original = requireCalculusModule(source, basics.title);
	const circle = requireCalculusBinding(
		original.curriculum,

		item => item.title === "Concept: The Unit Circle",
		"PCTB1 unit circle"
	);
	const triangles = requireCalculusBinding(
		original.curriculum,

		item =>
			item.title ===
			"Concept: Trigonometric Ratios and Non-Right Triangles",
		"PCTB1 triangles"
	);
	const authoredPractice = requireCalculusBinding(
		original.curriculum,

		item => item.title === "Problem Set: Unit Circle Reasoning",
		"PCTB1 practice"
	);
	const reading = requireCalculusBinding(
		basics.curriculum,

		item => item.title === "Trigonometry Basics Core Concepts",
		"PCTB1 reading"
	);
	retainCalculusSources(
		"pre-calculus-b",
		basics,
		reading,
		[circle, triangles],
		"reading"
	);
	reading.learningPath = "core";
	reading.aliases = [
		...new Set([
			...(reading.aliases ?? []),
			"core-concepts",
			"pre-calculus-b-pctb1-trigonometry-basics-curriculum-core-concepts"
		])
	];
	const practice = { ...authoredPractice, learningPath: "core" as const };
	retainCalculusSources(
		"pre-calculus-b",
		basics,
		practice,
		[authoredPractice],
		"assignment"
	);
	basics.curriculum.push(practice);
	for (const unit of preCalculusBCases) {
		const module = requireCalculusBinding(
			course.modules,
			candidate => candidate.title.startsWith(`${unit.code} `),
			unit.code
		);
		const concept =
			unit.code === "PCTB1"
				? reading
				: requireCalculusBinding(
						module.curriculum,
						item => item.title.startsWith("Concept:"),
						`${unit.code} concept`
					);
		const problems = requireCalculusBinding(
			module.curriculum,
			item => item.title.startsWith("Problem Set:"),
			`${unit.code} practice`
		);
		concept.content += `\n\n**Worked example:**\n\n${unit.example}`;
		insertCalculusText(
			problems,
			"**Work path:**",
			`**Problems:**\n\n${unit.problems}\n\n${selfCheck(`${unit.code} ${unit.title}`)}`
		);
	}
	for (const check of preCalculusBCheckIns) {
		const reviewModule = requireCalculusModule(course, check.moduleTitle);
		const item = requireCalculusBinding(
			reviewModule.curriculum,

			candidate => candidate.title === check.itemTitle,
			check.code
		);
		item.content += `\n\n**Problems:**\n\n${check.problems}\n\n${selfCheck(check.title)}`;
	}
}
