import type { RawCourse } from "./types";
import { slugMarkdownHeading } from "@/modules/courseAssetPreview";
import { calculusCourseAssetViewerUrl as courseAssetViewerUrl } from "@/modules/courseAssetSourcesCalculus";
import {
	insertCalculusText,
	requireCalculusBinding
} from "./calculusBaselineBindings";

export const preCalculusACases = [
	{
		code: "PCTA1",
		title: "Piecewise Functions",
		example:
			"For `g(x) = 2x + 1` when `x < 2`, and `g(x) = x + 3` when `x >= 2`:\n\n1. Choose the interval before substituting: `g(1) = 3`, `g(2) = 5`, and `g(4) = 7`. The second rule owns `x = 2`.\n2. Draw `y = 2x + 1` only to the left of 2, with an open endpoint at `(2, 5)`. Draw `y = x + 3` from the closed endpoint `(2, 5)` to the right.\n3. Both rules approach 5 at the boundary, and `g(2) = 5`, so the graph is continuous there. Its domain and range are all real numbers.",
		problems:
			"Use `f(x) = x + 2` for `x < 0`, `f(x) = x^2` for `0 <= x < 2`, and `f(x) = 5` for `x >= 2`.\n\n1. Find `f(-3)`, `f(0)`, `f(1)`, and `f(2)`, naming the selected rule each time.\n2. Sketch all three pieces. Label every open and closed endpoint at 0 and 2.\n3. Compare the one-sided boundary values with the function values. State where the graph has jumps and where it increases or stays constant."
	},
	{
		code: "PCTA2",
		title: "Higher-Degree Polynomials",
		example:
			"Factor `x^3 + 2x^2 - x - 2` by grouping:\n\n1. Group terms: `x^2(x + 2) - (x + 2)`.\n2. Take out the common binomial: `(x + 2)(x^2 - 1)`.\n3. Use the difference of squares: `(x + 2)(x - 1)(x + 1)`. Multiplying back gives the original cubic, with leading coefficient 1 and zeros `-2, -1, 1`.",
		problems:
			"Let `A(x) = x^3 - 2x^2 + 3` and `B(x) = 2x^3 + x^2 - x + 4`.\n\n1. Find `A + B` and `A - B` in standard form.\n2. Expand `(x^2 + 1)(x^2 - 4)` and state its degree and leading coefficient.\n3. Factor `x^4 - 5x^2 + 4` completely over the reals, using `u = x^2`. Find its zeros, multiply back, and check both forms at `x = 3`."
	},
	{
		code: "PCTA3",
		title: "Polynomial Division",
		example:
			"Divide `2x^3 - 3x^2 - 11x + 6` by `x - 3`. Synthetic division uses 3 with coefficients `2, -3, -11, 6`.\n\n1. Bring down 2. Multiply by 3 and add to the next coefficient: `-3 + 6 = 3`.\n2. Repeat: `-11 + 9 = -2`, then `6 - 6 = 0`.\n3. The quotient is `2x^2 + 3x - 2` and the remainder is 0. Check: `(x - 3)(2x^2 + 3x - 2) = 2x^3 - 3x^2 - 11x + 6`.\n\nFor a higher-degree divisor, use long division: divide leading terms, multiply the entire divisor, subtract, and repeat until the remainder has lower degree than the divisor.",
		problems:
			"1. Use long division for `(x^4 + 2x^3 + 3x^2 + 4x + 5) / (x^2 + 1)`.\n2. Use synthetic division for `(x^3 - 4x^2 + x + 6) / (x - 2)`.\n3. Divide `x^3 - 8` by `x - 2`, including placeholders for the missing terms.\n4. For each result, verify `dividend = divisor * quotient + remainder`. For the linear divisors, also compare the remainder with the dividend evaluated at 2."
	},
	{
		code: "PCTA4",
		title: "Zeros of Polynomials",
		example:
			"For `P(x) = x^3 - 4x^2 + x + 6`, the rational root theorem gives candidates `+/-1, +/-2, +/-3, +/-6`: factors of the constant divided by factors of the leading coefficient.\n\n1. `P(2) = 8 - 16 + 2 + 6 = 0`, so `x - 2` is a factor.\n2. Division gives `x^2 - 2x - 3 = (x - 3)(x + 1)`.\n3. All zeros are `2, 3, -1`. Factoring the cubic completely checks that none have been missed.\n\nFor real-coefficient polynomials, nonreal zeros come in conjugate pairs. A sign change across an interval guarantees a real zero inside because polynomials are continuous.",
		problems:
			"1. List the rational candidates for `Q(x) = x^4 - x^3 - x^2 - x - 2`. Find all real and complex zeros by factoring; verify the factorization.\n2. Find all zeros of `R(x) = 2x^3 + x^2 - 5x + 2`, allowing rational candidates with denominator 2.\n3. Evaluate `S(x) = x^3 - x - 1` at 1 and 2. Explain what this proves about a real zero. Decide whether S has a rational zero; an exact radical formula is not required."
	},
	{
		code: "PCTA5",
		title: "Graphing Polynomials",
		example:
			"Sketch `p(x) = (x + 2)(x - 1)^2` from its factors.\n\n1. Degree 3 with positive leading coefficient means the left end falls and the right end rises.\n2. The zero -2 has odd multiplicity, so the graph crosses there. The zero 1 has even multiplicity, so the graph touches and turns there.\n3. `p(0) = 2` gives the y-intercept. Since the square factor is positive away from 1, the sign is negative to the left of -2 and positive to its right, except at the zeros.\n4. Draw a smooth curve through those features. Degree 3 allows at most 2 turning points; multiplicity and sign checks constrain the sketch without locating exact turning points.",
		problems:
			"For `q(x) = -(x + 1)^2(x - 2)(x - 3)`:\n\n1. State degree, leading coefficient, both ends, every zero's multiplicity, and the y-intercept.\n2. Build a sign chart using the intervals separated by -1, 2, and 3. State which zeros cross and which touch.\n3. Compute `q(-2)`, `q(5/2)`, and `q(4)` to anchor the sketch. Draw the graph consistently with the signs, and state the maximum possible number of turning points."
	},
	{
		code: "PCTA6",
		title: "Arithmetic and Geometric Sequences",
		example:
			"For an arithmetic sequence, `a_n = a_1 + (n - 1)d` and `S_n = n(a_1 + a_n)/2`. With `a_1 = 5` and `d = 3`, `a_n = 3n + 2`, `a_10 = 32`, and `S_10 = 10(5 + 32)/2 = 185`.\n\nFor a geometric sequence, `b_n = b_1 r^(n - 1)` and `S_n = b_1(1 - r^n)/(1 - r)` when `r != 1`. With `b_1 = 2` and `r = 3`, `b_5 = 162` and `S_5 = 2(1 - 3^5)/(1 - 3) = 242`. When `r = 1`, the finite sum is `n b_1`.\n\nAn infinite geometric series converges only when `|r| < 1`, and its sum is `b_1/(1 - r)`. The example with `r = 3` diverges; its finite sums are still defined.",
		problems:
			"1. For `8, 5, 2, -1, ...`, state the common difference, explicit and recursive rules (including the first term), `a_12`, and `S_12`.\n2. For `81, 27, 9, 3, ...`, state the common ratio, explicit and recursive rules, `b_6`, and `S_6`. Check the sum by adding its six terms.\n3. Does the second sequence's infinite series converge? State the condition and find the sum if it does."
	},
	{
		code: "PCTA7",
		title: "Area Under a Curve",
		example:
			"Approximate the area under `f(x) = x + 1` on `[0, 2]` with 4 equal rectangles. The width is `delta x = (2 - 0)/4 = 1/2`.\n\n1. Left endpoints are `0, 1/2, 1, 3/2`, with heights `1, 3/2, 2, 5/2`. Thus `L_4 = (1/2)(1 + 3/2 + 2 + 5/2) = 7/2`.\n2. Right endpoints are `1/2, 1, 3/2, 2`, with heights `3/2, 2, 5/2, 3`. Thus `R_4 = 9/2`.\n3. Because f increases, the left estimate is below and the right estimate above the area. For this straight line, the trapezoid formula gives the exact area `(2)(1 + 3)/2 = 4`, also `(L_4 + R_4)/2`.\n\nMidpoint rectangles use each interval's midpoint as the height input. For equal widths the trapezoid estimate is `(L_n + R_n)/2`; it need not be exact for a curved graph.",
		problems:
			"Use `g(x) = x^2` on `[0, 2]`.\n\n1. For `n = 4`, list the endpoint heights and calculate `L_4` and `R_4`. Explain which is the lower bound.\n2. Use the midpoints `1/4, 3/4, 5/4, 7/4` to calculate `M_4`. Also find the trapezoid estimate `T_4`.\n3. Repeat the left and right sums with `n = 8`. Compare the gaps `R_n - L_n` for 4 and 8 rectangles. Explain what refining the partition changes without assuming an exact integral formula."
	},
	{
		code: "PCTA8",
		title: "The Binomial Theorem",
		example:
			"In `(a + b)^n`, term k is `C(n,k) a^(n-k) b^k`, for `k = 0, ..., n`, where `C(n,k) = n!/[k!(n-k)!]`. For a positive integer n, `n!` is the product of the integers from 1 through n; `0! = 1`.\n\nFor `(x + 2)^4`, the coefficients from Pascal's triangle are `1, 4, 6, 4, 1`. Substitution gives `x^4 + 4x^3(2) + 6x^2(2^2) + 4x(2^3) + 2^4`, or `x^4 + 8x^3 + 24x^2 + 32x + 16`. Exponents in each term add to 4; the powers of 2 must be included as well as the binomial coefficients.",
		problems:
			"1. Expand `(2x - 1)^4` and check the result at `x = 0` and `x = 1`.\n2. Find just the coefficient of `x^3` in `(2x - 1)^5`, identifying the needed value of k.\n3. Find the coefficient of `x^2` in `(x + 3)^6` without expanding the whole expression."
	},
	{
		code: "PCTA9",
		title: "Rational Functions",
		example:
			"Analyze `f(x) = (x + 1)/[(x - 2)(x + 1)]`.\n\n1. The original denominator excludes `x = -1, 2`. Cancellation gives `1/(x - 2)` only on that original domain.\n2. At -1 the simplified denominator is nonzero, so there is a hole at `(-1, -1/3)`. At 2 it remains zero, giving a vertical asymptote `x = 2`.\n3. The numerator's degree is less than the denominator's, so the horizontal asymptote is `y = 0`. The y-intercept is `(0, -1/2)`. There are no x-intercepts: the original numerator's only zero is excluded.\n4. Sketch the reciprocal branches using these features and mark the missing point. Always test candidate intercepts against the original domain.",
		problems:
			"1. For `g(x) = (x - 1)^2/[(x - 1)(x + 2)]`, find the domain, simplified form, holes, vertical and horizontal asymptotes, and both intercept types. Sketch the graph.\n2. Repeat for `h(x) = (x - 1)/(x - 1)^2`. Explain why canceling a common factor does not necessarily create a hole."
	},
	{
		code: "PCTA10",
		title: "Rational Function Operations",
		example:
			"Simplify `(x^2 - 4)/(x^2 - 1)` divided by `(x - 2)/(x - 1)`.\n\n1. Original denominators exclude `x = -1, 1`. Division also requires the entire divisor to be nonzero, excluding 2.\n2. Factor and multiply by the reciprocal: `[(x - 2)(x + 2)/((x - 1)(x + 1))] * [(x - 1)/(x - 2)]`.\n3. Cancel factors to obtain `(x + 2)/(x + 1)`, retaining `x != -1, 1, 2`. At 3 both forms give `5/4`. At 2 the simplified formula exists, but the original quotient does not.\n\nFor addition, use a common denominator before combining numerators. For equations, clear denominators only after listing restrictions, then check candidate solutions in the original equation.",
		problems:
			"1. Add `1/(x - 1) + 2/(x + 1)`, with all original restrictions.\n2. Solve `1/(x - 1) = 2/(x + 1)` and check the solution by substitution.\n3. Solve `(x + 1)/(x - 1) = 2/(x - 1)`. Explain what happens to the candidate obtained after clearing denominators."
	},
	{
		code: "PCTA11",
		title: "Logarithms and Exponents",
		example:
			"For real logarithms, the base b satisfies `b > 0`, `b != 1`, and each argument is positive. Product and quotient rules require positive arguments; the power rule `log_b(u^r) = r log_b(u)` requires `u > 0`.\n\n1. `2^(x + 1) = 16 = 2^4` gives `x + 1 = 4`, so `x = 3`.\n2. To solve `log_2(x - 1) + log_2(x + 1) = 3`, first require `x > 1`.\n3. Combine the logs: `log_2[(x - 1)(x + 1)] = 3`, so `x^2 - 1 = 8`. The algebraic candidates are 3 and -3, but only 3 is in the original domain. Substitution gives `log_2(2) + log_2(4) = 1 + 2 = 3`.\n\nWhen bases cannot be matched, take a logarithm: `a^u = v` gives `u = ln(v)/ln(a)` for valid positive a and v, with `a != 1`.",
		problems:
			"1. Solve `3^(2t) = 20` exactly, then approximate to three decimal places.\n2. Solve `log_3(x - 2) + log_3(x) = 1`, recording restrictions before combining logs.\n3. A model is `P(t) = 500(1.08)^t` for `t >= 0` years. Find the exact and approximate time when P reaches 1000. If measurements occur only at whole years, find the first such year and check the neighboring year."
	},
	{
		code: "PCTA12",
		title: "Function Inverses and Composition",
		example:
			"For `f(x) = 3x - 4` and `g(x) = x^2`, order matters: `f(g(x)) = 3x^2 - 4`, while `g(f(x)) = (3x - 4)^2`.\n\nTo invert f, write `y = 3x - 4`, interchange x and y, and solve `x = 3y - 4` for `y = (x + 4)/3`. Thus `f^(-1)(x) = (x + 4)/3`; both compositions give x on all real numbers.\n\nThe square function is not one-to-one on all reals because opposite inputs have the same output. Restricting g to `x >= 0` gives inverse `sqrt(x)`, with domain and range `[0, infinity)`. An inverse reverses the original function's domain and range; `f^(-1)` does not mean `1/f`.",
		problems:
			"1. Find the inverse of `h(x) = (2x + 1)/(x - 3)`. State domains and ranges of h and its inverse, and verify both compositions on their permitted domains.\n2. For `f(x) = sqrt(x - 1)` and `g(x) = 2x + 3`, find `f(g(x))` and `g(f(x))` with their domains. Use the inner function's outputs to justify the first domain."
	},
	{
		code: "PCTA13",
		title: "Circles and Ellipses",
		example:
			"A circle has form `(x - h)^2 + (y - k)^2 = r^2`. Convert `x^2 + y^2 - 4x + 6y - 12 = 0` by grouping and completing squares:\n\n1. `x^2 - 4x + y^2 + 6y = 12`.\n2. Add 4 and 9 to both sides: `(x - 2)^2 + (y + 3)^2 = 25`.\n3. The center is `(2, -3)` and radius 5. Points `(7, -3)` and `(2, 2)` both satisfy the equation and lie 5 units from the center.\n\nFor a horizontal ellipse, `(x - h)^2/a^2 + (y - k)^2/b^2 = 1` with `a > b > 0`. Vertices are a units horizontally from the center, co-vertices b units vertically, and foci c units horizontally, where `c^2 = a^2 - b^2`. The larger denominator determines the major-axis direction; swap x and y roles for a vertical major axis.",
		problems:
			"1. Convert `x^2 + y^2 + 6x - 8y = 0` to circle standard form. State center and radius, and verify `(2, 4)` by substitution.\n2. For `(x - 1)^2/9 + (y + 2)^2/4 = 1`, state center, axis direction, vertices, co-vertices, foci, domain, and range. Sketch and label these features; check a vertex in the equation."
	},
	{
		code: "PCTA14",
		title: "Parabolas and Hyperbolas",
		example:
			"For `(x - h)^2 = 4p(y - k)`, the vertex is `(h, k)`, focus `(h, k + p)`, directrix `y = k - p`, and latus rectum length `|4p|`. A positive p opens upward. For `(y - k)^2 = 4p(x - h)`, the focus is `(h + p, k)` and directrix `x = h - p`; positive p opens rightward.\n\nIn `(x - 2)^2 = 8(y + 1)`, `4p = 8`, so p is 2. The vertex is `(2, -1)`, focus `(2, 1)`, directrix `y = -3`, axis `x = 2`, and opening upward. The latus rectum has length 8, with endpoints `(-2, 1), (6, 1)`.\n\nA horizontal hyperbola has `(x - h)^2/a^2 - (y - k)^2/b^2 = 1`: vertices `(h +/- a, k)`, foci `(h +/- c, k)` with `c^2 = a^2 + b^2`, and asymptotes `y - k = +/-(b/a)(x - h)`. For a vertical hyperbola, the y term is positive and the axis roles reverse. To find intersections, substitute one equation into the other and check every resulting point in both originals.",
		problems:
			"1. For `(y + 1)^2 = -12(x - 2)`, identify vertex, p, focus, directrix, axis, opening, and latus rectum length. Sketch the parabola.\n2. For `(x + 1)^2/16 - (y - 2)^2/9 = 1`, find center, vertices, foci, asymptotes, domain, and range. Sketch the two branches.\n3. Find every intersection of the circle `x^2 + y^2 = 8` and the line `y = x`. Check both original equations."
	}
];

export const preCalculusACheckIns = [
	{
		code: "check-in-1",
		title: "Check-In 1: Polynomial and Sequence Foundations",
		problems:
			"1. For `h(x) = x^2` when `x <= 1` and `h(x) = 2x - 1` when `x > 1`, find `h(-2), h(1), h(2)` and decide whether the graph is continuous at 1.\n2. Factor `x^3 - 9x` and find its zeros.\n3. Divide `x^3 + 1` by `x + 1`, giving quotient and remainder with a reconstruction check.\n4. Find all real and complex zeros of `x^4 - 1`.\n5. For `-(x + 2)^2(x - 1)`, state both ends, intercepts, and which zeros cross or touch.\n6. For the arithmetic sequence `1, 5, 9, ...`, find `a_15, S_15`. For the geometric sequence `3, 6, 12, ...`, find `b_6, S_6`.\n7. For `f(x) = 2x` on `[0, 1]` with 2 equal subintervals, find left and right rectangle sums. Compare with the exact triangle area.\n8. Find the coefficient of `x^2` in `(x - 2)^4` and show the relevant binomial term."
	},
	{
		code: "check-in-2",
		title: "Check-In 2: Rational Functions through Conics",
		problems:
			"1. Analyze `r(x) = (x^2 - 4)/[(x - 2)(x + 3)]`: domain, holes, vertical and horizontal asymptotes, and intercepts.\n2. Simplify `[(x + 2)/(x - 1)]` divided by `[(x + 2)/(x + 1)]`, preserving every restriction. Explain what happens at `x = -2`.\n3. Solve `log_2(x) + log_2(x - 2) = 3`, checking original arguments.\n4. Solve `5^t = 12` exactly and approximately. State why a logarithm is useful here.\n5. Find the inverse and domain/range of `f(x) = 4x + 7`. Then find the domain of `sqrt(f(x) - 3)`.\n6. Convert `x^2 + y^2 - 2x + 4y - 4 = 0` to circle standard form. For `x^2/4 + y^2/9 = 1`, find vertices and foci.\n7. Identify vertex, focus, and directrix of `x^2 = -8y`. Find the vertices and asymptotes of `y^2/9 - x^2/4 = 1`.\n8. Find the intersections of `x^2 + y^2 = 25` with `y = 3`. Verify each point in both equations."
	}
];

function selfCheck(heading: string) {
	const url = courseAssetViewerUrl(
		`/course-assets/pre-calculus-a/practice-checks-v2.md#${slugMarkdownHeading(heading)}`,
		`${heading} self-check`
	);
	return `[Check answers and reasoning](${url})`;
}

export function addPreCalculusACases(course: RawCourse) {
	for (const unit of preCalculusACases) {
		const module = requireCalculusBinding(
			course.modules,
			candidate => candidate.title.startsWith(`${unit.code} `),
			unit.code
		);
		const concept = requireCalculusBinding(
			module.curriculum,
			item => item.title.startsWith("Concept:"),
			`${unit.code} concept`
		);
		const practice = requireCalculusBinding(
			module.curriculum,
			item => item.title.startsWith("Problem Set:"),
			`${unit.code} practice`
		);
		insertCalculusText(
			concept,
			"**Practice model:**",
			`**Worked example:**\n\n${unit.example}`
		);
		insertCalculusText(
			practice,
			"**Work path:**",
			`**Problems:**\n\n${unit.problems}\n\n${selfCheck(`${unit.code} ${unit.title}`)}`
		);
	}
	for (const [index, check] of preCalculusACheckIns.entries()) {
		const item = requireCalculusBinding(
			course.modules.flatMap(module => module.curriculum),
			candidate => candidate.title === `Check-In #${index + 1}`,

			check.code
		);
		item.content += `\n\n**Problems:**\n\n${check.problems}\n\n${selfCheck(check.title)}`;
	}
}
