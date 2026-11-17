import type { RawCourse } from "./types";
import { algebraCourseImageUrls } from "@/modules/courseAssetSourcesAlgebra";
import { algebra2Checkpoint } from "./algebra2Checkpoints";
import { applyAlgebra2Readings } from "./algebra2Readings";
import { configureMathCourseFlow } from "./mathCourseFlow";
import { pendingStaticMediaNotice, staticMediaUrl } from "./staticMedia";

const media = {
	complexPlane:
		algebraCourseImageUrls[
			"/course-assets/algebra-2a/complex-plane-v2.svg"
		],
	quadraticForms:
		algebraCourseImageUrls[
			"/course-assets/algebra-2a/quadratic-forms-v2.svg"
		],
	quadraticTransforms:
		algebraCourseImageUrls[
			"/course-assets/algebra-2a/quadratic-transformations-v2.svg"
		],
	polynomialBehavior:
		algebraCourseImageUrls[
			"/course-assets/algebra-2a/polynomial-behavior-v2.svg"
		],
	rationalFunctions:
		algebraCourseImageUrls[
			"/course-assets/algebra-2a/rational-functions-v2.svg"
		],
	radicalFunctions:
		algebraCourseImageUrls[
			"/course-assets/algebra-2a/radical-functions-v2.svg"
		],
	piecewiseFunctions:
		algebraCourseImageUrls[
			"/course-assets/algebra-2a/piecewise-functions-v2.svg"
		]
} as const;

const sourceStaticFilenames = [
	"ala1_concept2_0.png",
	"ala1_concept2_1.png",
	"ala1_concept3_0.png",
	"ala1_pset2_16.png",
	"ala1_pset2_17.png",
	"ala1_pset4_1.png",
	"ala1_pset4_2.png",
	"ala2_concept1_0.png",
	"ala4_pset1_0.png",
	"ala4_pset1_1.png",
	"ala4_pset1_2.png",
	"ala4_pset1_3.png",
	"ala4_pset1_4.png",
	"ala6_pset1_0.png",
	"ala7_concept1_0.png",
	"ala7_concept1_1.png",
	"ala7_concept1_2.png",
	"ala7_concept1_3.png",
	"ala7_concept1_4.png",
	"ala7_concept1_5.png",
	"ala7_concept1_6.png",
	"ala7_concept1_7.png",
	"ala7_concept2_0.png",
	"ala7_concept2_1.png",
	"ala7_pset1_0.png",
	"ala7_pset1_1.png",
	"ala7_pset1_3.png",
	"ala7_pset1_4.png",
	"ala7_pset1_11.png",
	"ala7_pset1_12.png",
	"ala7_pset1_13.png",
	"ala7_pset1_14.png",
	"ala7_pset2_0.png",
	"ala7_pset2_1.png",
	"ala7_pset2_2.png",
	"ala8_concept1_0.png",
	"ala8_concept1_1.png",
	"ala8_concept1_2.png",
	"ala8_concept1_3.png",
	"ala8_concept1_4.png",
	"ala8_concept1_5.png",
	"ala8_concept1_6.png",
	"ala8_concept1_7.png",
	"ala8_concept1_8.png",
	"ala8_pset1_0.png",
	"ala8_pset1_1.png",
	"ala8_pset1_2.png",
	"ala8_pset1_3.png",
	"ala8_pset1_4.png",
	"ala8_pset2_0.png",
	"ala8_pset2_1.png",
	"ala8_pset2_2.png",
	"ala8_pset2_3.png",
	"ala8_pset2_4.png",
	"ala9_concept3_0.png",
	"ala10_concept1_0.png",
	"ala10_concept1_1.png",
	"ala10_concept1_2.png",
	"ala10_concept1_3.png",
	"ala10_concept1_4.png",
	"ala10_concept1_5.png",
	"ala10_concept1_6.png",
	"ala10_concept2_0.png",
	"ala10_pset2_0.png",
	"ala10_pset2_1.png",
	"ala10_pset2_2.png",
	"ala10_pset2_3.png",
	"ala10_pset2_4.png",
	"ala10_pset2_5.png",
	"ala10_pset2_7.png",
	"ala10_pset2_8.png",
	"ala10_pset2_9.png",
	"ala11_concept1_0.png",
	"ala11_concept1_1.png",
	"ala11_concept1_2.png",
	"ala11_concept1_3.png",
	"ala11_pset1_10.png",
	"ala11_pset1_11(1).png",
	"ala11_pset1_12.png",
	"ala11_pset1_13.png",
	"ala11_pset1_14(1).png",
	"checkin1_complex_0.png",
	"checkin2_gp_0.png",
	"checkin3_app_1.png",
	"checkin3_piecewise_1.png",
	"checkin3_rational_0.png"
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

export const algebra2ACourse: RawCourse = {
	name: "Algebra 2A",
	modules: [
		createModule("ALA1 Complex Numbers", [
			createLesson(
				"Imaginary Numbers and Powers of i",
				`
Complex numbers extend the real-number system so square roots of negatives make sense. Use \`i = sqrt(-1)\`, and remember the power cycle \`1, i, -1, -i\`.

**Representative examples**

- \`sqrt(-9) = 3i\`
- \`sqrt(-16) = 4i\`
- \`sqrt(-24) = 2sqrt(6)i\`
- \`4sqrt(-32) = 16sqrt(2)i\`
- \`sqrt(-49) = 7i\`
- \`sqrt(-100) = 10i\`
- \`i^17 = i\`
- \`i^43 = -i\`
- \`i^112 = 1\`
- \`i^118 = -1\`
- \`8i + 3i = 11i\`
- \`4i + 4i^3 + 4i = 4i\`
- \`(3i)^2 = -9\`
- \`(-9i)^2 = -81\`
- \`i^3 * i^2 = i\`
- \`8 * i * i^2 = -8i\`
- \`x^2 = -16\` -> \`x = plus or minus 4i\`
- \`x^2 + 23 = -2\` -> \`x = plus or minus 5i\`

Use the remainder after dividing the exponent by \`4\` whenever a power of \`i\` looks too large to evaluate directly.
				`.trim()
			),
			createLesson(
				"The Complex Plane",
				`
Write a complex number as \`a + bi\`. Plot it as the point \`(a, b)\`, where the horizontal axis is the real part and the vertical axis is the imaginary part.

**Representative points**

- \`3 + 2i\` -> \`(3, 2)\`
- \`-2 - 5i\` -> \`(-2, -5)\`
- \`2 - i\` -> \`(2, -1)\`
- \`-5 + 3i\` -> \`(-5, 3)\`
- \`7\` -> \`(7, 0)\`
- \`-3i\` -> \`(0, -3)\`
- \`4 - 2i\` -> \`(4, -2)\`
- \`7 + sqrt(-1)\` -> \`7 + i\`
- \`-3 - sqrt(-16)\` -> \`-3 - 4i\`
- \`7 - sqrt(25)\` -> \`2\`
- \`4 + sqrt(-9)\` -> \`4 + 3i\`
- \`4 + i^2\` -> \`3\`
- \`3 - 3i^3\` -> \`3 + 3i\`
- \`1 - (2i)^3\` -> \`1 + 8i\`
- \`3 + 3i^21\` -> \`3 + 3i\`
- \`-4 + 2i^15\` -> \`-4 - 2i\`

**Geometry on the complex plane**

- Distance from \`2 - 4i\` to \`7 + 3i\`: \`sqrt(74)\`
- Triangle with vertices \`-3 - 2i\`, \`5 + 4i\`, and \`5 - 2i\` has area \`24\`
				`.trim(),
				media.complexPlane
			),
			createLesson(
				"Operations with Complex Numbers",
				`
Add and subtract by combining real parts with real parts and imaginary parts with imaginary parts. Multiply with distribution or FOIL. Divide by multiplying numerator and denominator by the conjugate.

**Representative examples**

- \`(5i + 13) - (6i + 3) = 10 - i\`
- \`(4i + 9) - 5i(4i + 2) = 29 - 6i\`
- \`5i - 2(i + 3) + 4(i + i^2) = -10 + 7i\`
- \`9i - 9 + 9i^5 - 9i^3 = 27i - 9\`
- \`(2 + 4i)^2 = -12 + 16i\`
- \`(7 - 2i)(2 + 10i) = 34 + 66i\`
- \`(1 + i)^3 = -2 + 2i\`

**Structure fact**

If \`(a + bi)(a + ci)\` is real and \`a != 0\`, then \`c = -b\`, so the product becomes \`(a + bi)(a - bi) = a^2 + b^2\`.
				`.trim()
			)
		]),
		createModule("ALA2 Quadratic Functions", [
			createLesson(
				"Factoring Quadratics and Solving for Zeros",
				`
Start by moving every term to one side so the equation is in the form \`ax^2 + bx + c = 0\`. Then factor when possible.

**Quadratic-form examples**

- \`7x + 3 = 2x^2 - 1\` -> \`2x^2 - 7x - 4 = 0\`
- \`(3x + 2)(2x - 3) = 3x + 3\` -> \`6x^2 - 8x - 9 = 0\`
- \`x(4 + 3x) + 3 = 21 - 2x^2\` -> \`5x^2 + 4x - 18 = 0\`
- \`3x + 7x^2 - 3 = 7x - 4x^2 + 2\` -> \`11x^2 - 4x - 5 = 0\`

**Solving examples**

- \`(x + 2)(x - 4) = 0\` -> \`x = -2, 4\`
- \`x^2 + 4x + 4 = 0\` -> \`x = -2\`
- \`z^2 + 5z + 4 = 0\` -> \`z = -4, -1\`
- \`z^2 - 5z + 4 = 0\` -> \`z = 1, 4\`
- \`z^2 + 2z - 15 = 0\` -> \`z = -5, 3\`
- \`y^2 - 5y - 50 = 0\` -> \`y = -5, 10\`
- \`x^2 - 7x - 44 = 0\` -> \`x = -4, 11\`

**Application checks**

- Triangle with area \`12\` square feet and base two feet longer than its positive height: base \`6\` feet and height \`4\` feet
- Rocket modeled by \`-4t^2 + 8t + 96\` hits the ground at \`t = 6\`
- A penny dropped from rest at \`64\` feet follows \`h(t)=64-16t^2\` when air resistance is neglected and gravity is \`32\` feet per second squared. For \`t>=0\`, it reaches the ground at \`t=2\` seconds
`.trim()
			),
			createLesson(
				"Special Factorizations",
				`
Two high-value patterns repeat constantly in Algebra 2:

- perfect square trinomials: \`a^2 + 2ab + b^2 = (a + b)^2\`
- difference of squares: \`a^2 - b^2 = (a + b)(a - b)\`

**Representative simplifications**

- \`(x + 4)^2 = x^2 + 8x + 16\`
- \`(y - 6)^2 = y^2 - 12y + 36\`
- \`(2x + 1)^2 = 4x^2 + 4x + 1\`
- \`(4x - 9)^2 = 16x^2 - 72x + 81\`
- \`(x - 1)(x + 1) = x^2 - 1\`
- \`(z + 12)(z - 12) = z^2 - 144\`
- \`(8x + 11)(8x - 11) = 64x^2 - 121\`

**Representative factorizations**

- \`y^2 + 6y + 9 = (y + 3)^2\`
- \`z^2 - 18z + 81 = (z - 9)^2\`
- \`16x^2 - 72x + 81 = (4x - 9)^2\`
- \`x^2 - 16 = (x + 4)(x - 4)\`
- \`4x^2 - 81 = (2x - 9)(2x + 9)\`
- \`16x^2 - 9y^2 = (4x - 3y)(4x + 3y)\`

**Application**

- \`4t^2 - 24t + 36 = 0\` factors as \`(2t - 6)^2 = 0\`, so the airplane lands at \`t = 3\`
				`.trim()
			),
			createLesson(
				"Completing the Square and the Quadratic Formula",
				`
When factoring is awkward or impossible, turn the quadratic into a perfect square or apply the quadratic formula directly.

**Completing-the-square examples**

- \`x^2 + 4x - 1 = 0\` -> \`x = -2 - sqrt(5), -2 + sqrt(5)\`
- \`y^2 - 20y + 50 = 0\` -> \`y = 10 - sqrt(50), 10 + sqrt(50)\`
- \`9y^2 - 72y + 9 = 90\` -> \`y = -1, 9\`
- \`17y^2 + 68y + 187 = 272\` -> \`y = -5, 1\`
- \`4x^2 - 32x + 5 = -50\` -> \`x = 5/2, 11/2\`

**Quadratic-formula examples**

- \`x^2 - 6x + 5 = 0\` -> \`x = 1, 5\`
- \`7z^2 - 10z + 3 = 0\` -> \`z = 3/7, 1\`
- \`5z^2 + 2z - 7 = 0\` -> \`z = -7/5, 1\`
- \`2x^2 - 11x + 9 = 0\` -> \`x = 1, 9/2\`

**Non-real roots**

- \`y^2 + 4y + 8 = 0\` -> \`y = -2 plus or minus 2i\`
- \`y^2 - 6y + 34 = 0\` -> \`y = 3 plus or minus 5i\`
- \`x^2 - x + 10 = 0\` -> \`x = (1 plus or minus i sqrt(39)) / 2\`

Use the discriminant \`b^2 - 4ac\` to tell the difference between two real roots, one repeated real root, and two non-real roots.
`.trim()
			)
		]),
		createModule("ALA3 Graphing Quadratic Functions", [
			createLesson(
				"Vertex Form, Standard Form, and Intercept Form",
				`
Graphing is fastest when you recognize the form of the equation.

- Vertex form: \`y = a(x - h)^2 + k\`
- Standard form: \`y = ax^2 + bx + c\`
- Intercept form: \`y = a(x - r)(x - s)\`

**Feature checks**

- \`y = 2(x + 5)^2 - 4\` -> vertex \`(-5, -4)\`
- \`y = -(x - 7)^2 + 5\` -> vertex \`(7, 5)\`
- \`y = (1/2)x^2 - 3\` -> vertex \`(0, -3)\`
- \`y = -(x - 9)^2\` -> vertex \`(9, 0)\`
- \`y = 5(x + 1)(x + 2)\` -> x-intercepts \`-2, -1\`
- \`y = (1/5)(x - 13)(x + 7)\` -> x-intercepts \`-7, 13\`
- \`y = x^2 + 1\` -> no real x-intercepts
- \`y = -x^2 + 1\` -> x-intercepts \`-1, 1\`

Convert between forms when one view of the parabola is easier to read than another.
				`.trim(),
				media.quadraticForms
			),
			createLesson(
				"Transformations of Parabolas",
				`
Quadratic transformations are predictable:

- \`y = ax^2\`: sign gives the opening direction, and \`|a|\` controls width
- \`(x - h)\`: horizontal shift
- \`+ k\`: vertical shift
- a negative outside the square reflects across the x-axis

**Representative descriptions**

- \`y = 2x^2\` -> up, narrower
- \`y = -12x^2\` -> down, narrower
- \`y = (1/2)x^2\` -> up, wider
- \`y = -2x^2\` -> down, narrower
- Reflect \`y = x^2\` across the x-axis -> \`y = -x^2\`
- Reflect \`y = (x - 4)^2 + 2\` across the x-axis -> \`y = -(x - 4)^2 - 2\`
- Reflect \`y = (x - 2)^2\` across the y-axis -> \`y = (-x - 2)^2\`
- Shift \`y = 2x^2 + 3\` left \`2\` -> \`y = 2(x + 2)^2 + 3\`
- Flip \`y = 2x^2 + 3\` across the x-axis and then shift up \`3\` -> \`y = -2x^2\`
- Scale \`y = 2x^2 + 3\` by \`3\`, shift left \`4\`, shift up \`2\` -> \`y = 6(x + 4)^2 + 11\`

The comparison graph below provides a clean reusable reference for transformation questions that depend on visual comparison.
				`.trim(),
				media.quadraticTransforms
			),
			createLesson(
				"Applications and Parabola Geometry",
				`
Quadratics model arcs, projectiles, and symmetric structures.

**Application answers**

- Cannonball path \`y = -(x - 4)(x - 10)\` on \`4<=x<=10\`, between its ground-level endpoints: horizontal distance \`6\` units
- Jill's ball \`h = -4t^2 + 36t - 72\` feet on \`3<=t<=6\`, with ground height zero and the release at clock time \`t=3\` seconds:
  - thrown at \`t = 3\`
  - lands at \`t = 6\`
  - stays in the air \`3\` seconds
  - reaches a maximum height of \`9\` feet
- Gannet dive \`h = 2t^2 - 32t + 110\` feet on \`0<=t<=16\` seconds, with sea level at height zero:
  - initial height \`110\` feet
  - reaches the water at \`5\` seconds
  - stays underwater \`6\` seconds
  - returns to starting height at \`16\` seconds
  - dives \`18\` feet below sea level

**Optional advanced topic**

If the directrix is \`y = 1\` and the focus is \`(2, 3)\`, then the parabola is
\`y = (1/4)x^2 - x + 3\`.
`.trim()
			),
			createLesson(
				"Graph Prompt Reference",
				`
Compare \`y=x^2\` with \`y=2(x-1)^2-3\`. Their vertices are \`(0,0)\` and \`(1,-3)\`; the second has axis \`x=1\`, opens upward and has twice the vertical scale. Check its points \`(0,-1),(1,-3),(2,-1)\`.

For focus \`(2,3)\` and directrix \`y=1\`, the vertex is \`(2,2)\` and \`(x-2)^2=4(y-2)\`. At \`(0,3)\`, the distance to the focus and the distance to the directrix are both \`2\`. These equations and coordinates determine the sketches.
`.trim(),
				media.quadraticTransforms
			)
		]),
		createModule("Check-In #1", [
			createLesson(
				"Review Targets",
				`
This check-in is a guided review of the first three modules, not a formal exam.

**Skills to revisit**

- simplifying with \`i\`
- plotting and reading complex numbers
- factoring quadratics
- completing the square
- using the quadratic formula
- graphing quadratics in multiple forms

If work stalls, stop and revisit the specific method immediately.
				`.trim()
			),
			createLesson(
				"Representative Review Problems",
				algebra2Checkpoint("algebra-2a", "Check-In #1"),
				media.complexPlane
			)
		]),
		createModule("ALA4 Higher Degree Polynomials", [
			createLesson(
				"Polynomial Operations and Factoring",
				`
This module moves from quadratics to higher-degree polynomials and tracks structure more deliberately.

**Representative skills**

- degree of \`7x - 36x^2 + 2x^7\` is \`7\`
- perimeter of a rectangle with side lengths \`2x^3 - x\` and \`7x^4 + 3x + 1\`:
  - \`14x^4 + 4x^3 + 4x + 2\`
- area of that same rectangle:
  - \`14x^7 - 7x^5 + 6x^4 + 2x^3 - 3x^2 - x\`
- grouping:
  - \`12x^4 + 2x^3 - 30x - 5 = (6x + 1)(2x^3 - 5)\`
- complete factoring:
  - \`8x^3 - 200x = 8x(x - 5)(x + 5)\`

The main upgrade here is organization: sort terms, factor out a greatest common factor first, and only then look for deeper patterns.
				`.trim()
			),
			createLesson(
				"Transformations and the Location Principle",
				`
Higher-degree polynomial graphs still respond predictably to shifts, reflections, and scaling.

**Transformation checks**

- Reflect \`f(x) = x^5 - 2x^2 + 3\` across the y-axis:
  - \`g(x) = -x^5 - 2x^2 + 3\`
- Scale \`f(x) = 5x^4 - 3x^2 + 2\` vertically by \`3\`:
  - \`g(x) = 15x^4 - 9x^2 + 6\`
- Shift \`f(x) = x^4 + 2x - 1\` right \`1\`, down \`3\`, and reflect across the y-axis:
  - \`g(x) = (-x - 1)^4 + 2(-x - 1) - 4\`

**Location-principle example**

For \`f(x) = 2x^5 - 2x^2 - 9\` with sample values

- \`f(1) = -9\`
- \`f(2) = 47\`

there is at least one real root between \`x = 1\` and \`x = 2\` because the sign changes.
				`.trim()
			)
		]),
		createModule("ALA5 Polynomial Division", [
			createLesson(
				"Long Division and Synthetic Division",
				`
Polynomial division works best when every degree is represented, even if that means writing missing degrees as zero-coefficient terms.

**Worked examples**

- \`(-9x^4 - 6x^3 + x^2 + 2) / (x + 1) = -9x^3 + 3x^2 - 2x + 2\`
- \`(x^3 + 6x^2 + 9x + 2) / (x + 2) = x^2 + 4x + 1\`
- \`(2x^4 - 3x^3 + 5x^2 + 1) / (x^2 - 1) = 2x^2 - 3x + 7 + (-3x + 8)/(x^2 - 1)\`

**Process reminder**

- arrange terms in descending powers
- include missing powers explicitly
- divide the leading term first
- multiply back and subtract
- repeat until the remainder has lower degree than the divisor

Synthetic division is the faster version when the divisor is linear and written as \`x - c\`.
				`.trim()
			)
		]),
		createModule("ALA6 Zeros of Polynomials", [
			createLesson(
				"Rational Root Theorem, Descartes, and Bounds",
				`
Finding polynomial zeros is usually a process of narrowing the search before dividing.

**Core example**

Let \`f(x) = 2x^3 - 2x^2 - 20x - 16\`.

- Possible rational roots:
  - \`plus or minus 1\`
  - \`plus or minus 1/2\`
  - \`plus or minus 2, 4, 8, 16\`
- Total roots by the Fundamental Theorem of Algebra: \`3\`
- Possible positive real roots by Descartes' Rule of Signs: at most \`1\`
- Possible negative real roots: at most \`2\`
- Actual roots: \`-2, -1, 4\`

**Additional examples**

- \`2x^3 - 7x^2 + x + 10\` -> roots \`-1, 2, 5/2\`
- \`x^4 - 9x^2 + 4x + 12\` -> roots \`-3, -1, 2\`, with \`2\` repeated twice

The goal is not to guess blindly. Use the theorem list, sign patterns, and intervals first, then divide to confirm.
`.trim()
			)
		]),
		createModule("ALA7 Graphing Polynomials", [
			createLesson(
				"End Behavior, Turning Points, and Multiplicity",
				`
Polynomial graphs are controlled mainly by degree, leading coefficient, and zero multiplicity.

**Representative features**

- \`f(x) = -5x^5 + x^3 + 9x\`
  - as \`x -> infinity\`, \`f(x) -> -infinity\`
  - as \`x -> -infinity\`, \`f(x) -> infinity\`
  - the function is odd
- The polynomial \`f(x)=(3/2)(x^2-1)^2+1/2\`, with turning points at \`(-1, 1/2)\`, \`(0, 2)\`, and \`(1, 1/2)\`, has
  - domain \`(-infinity, infinity)\`
  - range \`[1/2, infinity)\`

**Sketch logic**

- odd degree + positive leading coefficient -> falls left, rises right
- odd degree + negative leading coefficient -> rises left, falls right
- even degree + positive leading coefficient -> rises on both ends
- even degree + negative leading coefficient -> falls on both ends
- odd multiplicity crosses the x-axis
- even multiplicity touches and bounces
`.trim(),
				media.polynomialBehavior
			),
			createLesson(
				"Feature-Based Graphing",
				`
Sometimes a prompt gives graph features instead of a full equation. Those features still determine much of the graph.

**Example sketch prompt**

Use the concrete cubic \`f(x)=(1/4)(x+2)(x-1)(x-6)\`. Its features are:

- positive leading coefficient
- odd degree
- roots at \`-2\`, \`1\`, and \`6\`
- y-intercept \`(0, 3)\`
- local max at \`(-2/3, 100/27)\`, approximately \`(-0.67, 3.70)\`
- local min at \`(4, -9)\`

That feature set forces a graph that crosses the x-axis three times, rises to the right, and includes at least two turning points. The explicit equation supplies the graph even when a general reference graphic uses a different polynomial.
`.trim(),
				media.polynomialBehavior
			)
		]),
		createModule("Check-In #2", [
			createLesson(
				"Review Targets",
				`
This check-in revisits higher-degree polynomial skills rather than introducing new theory.

**Focus areas**

- degree and leading-term identification
- factoring with grouping and difference of squares
- long division and synthetic division
- rational-root screening
- graph sketches from end behavior and zeros

Treat the results as planning data for the next few sessions.
				`.trim()
			),
			createLesson(
				"Representative Review Problems",
				algebra2Checkpoint("algebra-2a", "Check-In #2"),
				media.polynomialBehavior
			)
		]),
		createModule("ALA8 Rational Functions", [
			createLesson(
				"Asymptotes and Removable Discontinuities",
				`
Rational functions can have two kinds of breaks:

- vertical asymptotes at zeros of the denominator after full cancellation
- removable discontinuities (holes) at excluded inputs where the fully simplified denominator is nonzero

Keep the original domain restrictions. Partial cancellation alone does not establish a hole: \`(x - 1)/(x - 1)^2 = 1/(x - 1)\` for \`x != 1\`, so \`x = 1\` remains a vertical asymptote.

**Representative examples**

- \`[(x - 1)(x + 4)] / [(x - 1)(x - 2)]\` -> removable discontinuity at \`x = 1\`
- \`(x^2 - 4) / [(x - 2)(x + 2)]\` -> removable discontinuities at \`x = -2, 2\`
- \`(3x^2 + 5x - 12) / (x^2 - 9)\` -> removable discontinuity at \`x = -3\`
- \`(x + 3)(x - 9) / (x + 3)\` -> hole at \`x = -3\`, graph behaves like \`y = x - 9\` except for the missing point

**Horizontal asymptote rules**

- numerator degree smaller than denominator degree -> \`y = 0\`
- equal degrees -> ratio of leading coefficients
- numerator degree larger -> no horizontal asymptote

Always factor first. It is the fastest way to tell a hole from an asymptote.
				`.trim(),
				media.rationalFunctions
			),
			createLesson(
				"Graphing and Roots of Rational Functions",
				`
To find a zero of a rational function, set the numerator equal to zero and then reject any value that also makes the denominator zero.

**Representative examples**

- \`(x^2 - 1)/(x^2 - 3x - 4)\`
  - numerator zeros: \`-1, 1\`
  - denominator zeros: \`-1, 4\`
  - valid real root: \`1\`
- \`(x - 2)/(x^2 + 4)\`
  - denominator never reaches zero
  - real root: \`2\`
- \`(3x^2 - 21)/(5x^2 - 35x)\`
  - numerator zeros: \`plus or minus sqrt(7)\`
  - denominator zeros: \`0, 7\`
  - valid roots: \`plus or minus sqrt(7)\`

**Application**

If a basketball player has made \`7\` of the last \`13\` shots, their updated average after making \`x\` more shots is
\`(7 + x)/(13 + x)\`.

To reach \`70%\`, solve
\`(7 + x)/(13 + x) = 0.7\`,
which gives \`x = 7\`.
`.trim(),
				media.rationalFunctions
			),
			createLesson(
				"Rational Graph References",
				`
For \`f(x)=(x^2-1)/(x^2-3x-4)\`, factor and simplify to \`(x-1)/(x-4)\`, retaining exclusions \`x=-1,4\`. The hole is \`(-1,2/5)\`, the vertical asymptote is \`x=4\`, the horizontal asymptote is \`y=1\`, and the valid zero is \`x=1\`.

For \`g(x)=(x^2+1)/(x-1)=x+1+2/(x-1)\`, the vertical asymptote is \`x=1\` and the slant asymptote is \`y=x+1\`. There are no real zeros because \`x^2+1>0\`. These formulas supply every feature needed to draw both graphs.
`.trim(),
				media.rationalFunctions
			)
		]),
		createModule("ALA9 Rational Function Operations", [
			createLesson(
				"Multiplying, Dividing, and Simplifying Rational Expressions",
				`
Factor first and record every zero of an original denominator. For division, also exclude values that make the entire divisor zero, then multiply by its reciprocal. Cancel common factors and keep all original restrictions in the final answer.

**Representative simplifications**

- \`(6x^3 - 12x)/(3x^2) = 2(x^2 - 2)/x\`
  - retain \`x != 0\`
- \`(x^2 + 4x + 3)/(x^2 - 3x - 18) = (x + 1)/(x - 6)\`
  - retain \`x != -3, 6\`
- \`(x^3 + 5x^2 - 14x)/(x^2 - 3x + 2) = x(x + 7)/(x - 1)\`
  - retain \`x != 1, 2\`
- \`(a^2 - 4)/(4a^2 - 1)\` divided by \`(a - 2)/(2a - 1)\` simplifies to \`(a + 2)/(2a + 1)\`
  - retain \`a != -1/2, 1/2, 2\`; at 2 the original divisor is zero

**Representative products and quotients**

- \`z/(z^2 - 16) * (z^2 - z - 12)/(z^2 - 4z) = (z + 3)/(z^2 - 16)\`
  - retain \`z != -4, 0, 4\`
- \`(2x + 6)/(x^2 - 16) * (x - 4)/(x + 3) = 2/(x + 4)\`
  - retain \`x != -4, -3, 4\`
- \`(y^2 + 2y - 8)/15\` divided by \`(y - 2)/(5y)\` simplifies to \`y(y + 4)/3\`
  - retain \`y != 0, 2\`
- \`(x^2 - 10x + 25)/(x^2 - 16)\` divided by \`(x^2 - 3x - 10)/(3x - 12)\` simplifies to \`3(x - 5)/[(x + 4)(x + 2)]\`
  - retain \`x != -4, -2, 4, 5\`; the divisor is zero at 5 and -2

**Application**

Triangle area with

- base \`(x^2 - 9)/(x^2 + 13x + 12)\`
- height \`(x^2 - 3x - 4)/(x - 3)\`

becomes
\`[(x - 4)(x + 3)] / [2(x + 12)]\`
after factoring and canceling.

Retain the original algebraic restrictions \`x != -12, -1, 3\`; a triangle model also requires positive base and height.
				`.trim()
			),
			createLesson(
				"Adding, Subtracting, and Solving Rational Equations",
				`
For addition and subtraction, find a least common denominator first. For equations, multiply every term by the LCD and then check for excluded values.

**Representative equation solves**

- \`(x + 1)/6 = (x - 1)/9\` -> \`x = -5\`
- \`(x - 3)/(x + 3) = (x + 2)/(x - 1)\` -> \`x = -1/3\`
- \`1/x + 1/2 = 3/4\` -> \`x = 4\`
- \`1 - 3/(x + 1) = 1/4\` -> \`x = 3\`

**Mixture model**

\`0.03 = (4 + 0.01x)/(100 + x)\`

means \`x = 50\`, so adding \`50\` milliliters of the \`1%\` solution brings \`100\` milliliters of \`4%\` solution down to \`3%\`.

**Average-grade model**

If Penny starts with one \`60%\` test and then scores \`90%\` on each new test, solve
\`(60 + 90x)/(x + 1) = 80\`
to get \`x = 2\`.
				`.trim()
			)
		]),
		createModule("ALA10 Radical Functions", [
			createLesson(
				"Graphing Radical Functions",
				`
Even roots and odd roots behave differently.

- \`sqrt(x)\`, \`x^(1/4)\`, and other even-root functions require a nonnegative radicand
- \`x^(1/3)\`, \`x^(1/5)\`, and other odd-root functions accept all real inputs

**Domain and range examples**

- \`y = sqrt(x - 2)\` -> domain \`x >= 2\`, range \`y >= 0\`
- \`y = -2sqrt(10 - 2x)\` -> domain \`x <= 5\`, range \`y <= 0\`
- \`y = 4 + sqrt(x - 3)\` -> domain \`x >= 3\`, range \`y >= 4\`
- \`y = sqrt(x + 3) - 5\` -> domain \`x >= -3\`, range \`y >= -5\`
- \`y = x^(1/7)\` -> domain all real numbers, range all real numbers

**Comparison fact**

\`x^(1/3)\` and \`x^(1/5)\` have the same domain and range, but the \`1/5\` power grows more slowly for large positive \`x\`.
				`.trim(),
				media.radicalFunctions
			),
			createLesson(
				"Solving Radical Equations",
				`
Isolate the radical, square or raise both sides carefully, and always check for extraneous solutions.

**Representative solves**

- \`sqrt(x + 2) = 5\` -> \`x = 23\`
- \`sqrt(x) = sqrt(1 - x)\` -> \`x = 1/2\`
- \`sqrt(x) + 1 = -sqrt(x)\` -> no solution
- \`3sqrt(x - 4) = sqrt(x)\` -> \`x = 9/2\`
- \`sqrt(x + 1) = sqrt(2x) - 1\` -> \`x = 8\`
- \`2sqrt(x + 2) = 4sqrt(x - 3)\` -> \`x = 14/3\`
- \`x^(1/3) = x^(1/5)\` -> \`x = -1, 0, 1\`

The last step matters: many radical equations create extra algebraic answers that do not satisfy the original domain restrictions.
				`.trim(),
				media.radicalFunctions
			)
		]),
		createModule("ALA11 Piecewise Functions", [
			createLesson(
				"Evaluating and Graphing Piecewise Functions",
				`
A piecewise function changes its rule depending on the input interval.

**Representative evaluations**

- \`f(x) = { x - 1 if x < 0; 3x if x >= 0 }\`
  - \`f(0) = 0\`
  - \`f(1) = 3\`
  - \`f(2) = 6\`
- \`f(x) = { x^2 if x <= 1; 1 if x > 1 }\`
  - \`f(0) = 0\`
  - \`f(1) = 1\`
  - \`f(2) = 1\`
- \`f(x) = { -5 if x <= -1; -x^2 - 4 if x > -1 }\`
  - \`f(0) = -4\`
  - \`f(1) = -5\`
  - \`f(2) = -8\`

**Step-function reminder**

- floor rounds down
- ceiling rounds up
- both have domain all real numbers and range all integers
				`.trim(),
				media.piecewiseFunctions
			),
			createLesson(
				"Piecewise Models and Continuity",
				`
Piecewise functions show up naturally in pricing and pay-rate problems. Here hours are nonnegative real inputs, and candy-bag counts are nonnegative whole numbers. Each pay formula accumulates earlier tiers; the candy price instead applies its stated rate to every bag in the order.

**Representative models**

- Alex's pay:
  - \`A(x) = 30x\` for \`0 <= x <= 40\`
  - \`A(x) = 50x - 800\` for \`x > 40\`
- Barbara's pay:
  - \`B(x) = 22x\` for \`0 <= x <= 20\`
  - \`B(x) = 40x - 360\` for \`20 < x <= 30\`
  - \`B(x) = 60x - 960\` for \`x > 30\`
- Candy bags:
  - \`C(x) = 3.50x\` for \`x < 5\`
  - \`C(x) = 2.75x\` for \`x >= 5\`
  - spending \`22\` dollars means \`8\` bags
- Xavier's overtime:
  - \`f(x) = 10.50x\` for \`x <= 20\`
  - \`f(x) = 15.75x - 105\` for \`x > 20\`
  - earning \`257.25\` means \`23\` hours

**Continuity example**

For
\`f(x) = { x^2 + 2c if x <= 3; 2cx + 1 if x > 3 }\`,
continuity at \`x = 3\` requires \`2c + 9 = 6c + 1\`, so \`c = 2\`.
`.trim(),
				media.piecewiseFunctions
			)
		]),
		createModule("Check-In #3", [
			createLesson(
				"Review Targets",
				`
This check-in closes the course by revisiting rational functions, rational operations, radical equations, and piecewise models.

**Review stance**

- Try the question independently first
	- use hints before a full review is needed
- use the results to decide whether to spiral back or move on
				`.trim()
			),
			createLesson(
				"Representative Review Problems",
				algebra2Checkpoint("algebra-2a", "Check-In #3"),
				media.rationalFunctions
			),
			createLesson(
				"Check-In Visual References",
				`
Use \`f(x)=(x^2-1)/((x-1)(x-2))\`. It simplifies to \`(x+1)/(x-2)\` with original exclusions \`x=1,2\`, a hole at \`(1,-2)\`, vertical asymptote \`x=2\` and horizontal asymptote \`y=1\`.

For the piecewise graph \`g(x)=x-1\` on \`x<0\` and \`g(x)=3x\` on \`x>=0\`, mark an open dot at \`(0,-1)\` and a filled dot at \`(0,0)\`. For \`h(x)=floor(x-1)+2\`, each integer \`k\` gives value \`k+2\` on \`[k+1,k+2)\`, including the left endpoint and excluding the right.
`.trim(),
				media.piecewiseFunctions
			)
		]),
		createModule(
			"ALA12 Algebra 2A Function Family Capstone",
			[
				createLesson(
					"Capstone: Function Family Model Portfolio",
					`
Build one coherent portfolio that compares how Algebra 2A function families represent structure, change, restrictions, and graph behavior.

**Required build**

1. Choose one applied question with a bounded classroom or fictional dataset.
2. Build and justify two candidate models from different families: quadratic, higher-degree polynomial, rational, radical, or piecewise.
3. Include an equation, graph or feature table, domain, intercept or zero analysis, and one transformed or equivalent form for each model.
4. Compare where each model is defined, what its key features mean, and which model better fits the stated question.
5. Include one rejected value, discontinuity, extraneous solution, or interval boundary and explain how the restriction is detected.
6. End with a limitation and an Algebra 2B handoff note naming the next logarithm, sequence, matrix, statistics, or trigonometry target.

**Completion evidence**

- Both function families are represented correctly and checked with at least two inputs.
- Graph features agree with the algebraic structure and domain restrictions.
- The model choice is supported by evidence rather than appearance alone.
- The conclusion identifies one limitation and one next-course readiness target.
					`.trim()
				)
			],
			[
				createLesson(
					"Choice: Portfolio Evidence Audit",
					`
Select one completed artifact from each of six topics: complex numbers, quadratics, polynomials, rational functions, radicals, and piecewise functions. Build a six-row table naming the original question, the representation used, an independent verification, and any correction needed.

- Verify a complex-number result by multiplication or coordinates, and a quadratic or polynomial result by expansion or substitution.
- Retain original exclusions for rational expressions, check radical solutions in the original equation, and test both sides of a piecewise boundary.
- When a result is already correct, record the successful check instead of inventing an error.
- Use the table to choose the two function families for the capstone and explain which existing evidence supports that choice.
					`.trim()
				),
				createLesson(
					"Challenge: Cross-Family Model Stress Test",
					`
Compare f(x)=(x^2-1)/(x-1) with g(x)=x+1. Initially restrict inputs to [-2,2]. Evaluate both at x=0,1,2, then change the allowed interval to [1,3] and evaluate at x=1,2,3. Factor before cancelling and retain exclusions from the original expression.

- Give each model's domain before and after the interval change.
- Make a table distinguishing a numerical value from an undefined value.
- Explain why matching outputs at shared valid inputs do not make the two domains identical.
- Apply the same comparison method to one changed domain boundary, intercept, or continuity condition in the capstone's own two models. State which conclusion changes and support it with two checked inputs.

[Project self-check](/courses/?course=algebra-2a&asset=%2Fcourse-assets%2Falgebra-2a%2Fpractice-checks-v1.md%23capstone-domain-stress-test&label=Capstone+domain+stress+test)
					`.trim()
				)
			]
		),
		createModule("Reference Archive: Algebra 2A", [
			createLesson(
				"Project Scenario and Context Links",
				`
**Algebra 2A Reference Map**

**Reference details:**

- Complex numbers: visual prompts include plotting \`a + bi\`, interpreting distance and area on the complex plane, and connecting repeated powers of \`i\` to a four-step cycle.
- Quadratics: review material covers factoring, special products, completing the square, non-real roots, discriminant reasoning, and a quadratic-formula song reference at https://www.youtube.com/watch?v=2lbABbfU6Zc&feature=youtu.be.
- Graphing quadratics: reference explorations include GeoGebra transformation work at https://www.geogebra.org/calculator/py7khf9c and Desmos comparison work at https://www.desmos.com/calculator/250ny4ueuq.
- Higher-degree polynomials: course prompts include polynomial operations, polynomial long division, synthetic division, the Fundamental Theorem of Algebra, rational zeros, Descartes' Rule of Signs, bounds on zeros, and end-behavior sketches.
- Rational functions: the analysis graph is retained as a Desmos link at https://www.desmos.com/calculator/auz2qerbgj.
- Radical and piecewise functions: visual prompts include square-root and odd-root domain/range comparisons, radical-equation checks for extraneous solutions, floor and ceiling functions, pay-rate models, candy-pricing models, and continuity constraints.

**Evidence record:**

- External YouTube, GeoGebra, and Desmos resources are retained as links, not attempted image embeds.
- Static image references are represented separately as pending static media when the file is not yet available.
- Algebra 1B graph images reused in this Algebra 2A reference set are already tracked as Algebra 1B pending static assets.
				`.trim()
			),
			createLesson(
				"Pending Static Assets",
				`
These static images are not currently available in the site static repository. Each filename has a reserved class-host URL so the asset can be uploaded later without changing course links.

${sourceMediaReferences()}
				`.trim()
			)
		])
	]
};

configureMathCourseFlow(algebra2ACourse, {
	courseId: "algebra-2a",
	modules: [
		{
			title: "ALA1 Complex Numbers",
			estimatedTime: "3 sessions · 50–65 minutes each",
			keyBlocks: [
				"powers of i",
				"a + bi",
				"complex plane",
				"complex operation",
				"conjugate"
			],
			flowNote:
				"Use the four-step power cycle before computing large powers, connect a + bi to coordinates, and verify arithmetic by separating real and imaginary parts. Division is complete only after the denominator is real."
		},
		{
			title: "ALA2 Quadratic Functions",
			estimatedTime: "3–4 sessions · 50–65 minutes each",
			keyBlocks: [
				"factor / zero",
				"complete the square",
				"quadratic formula",
				"discriminant",
				"complex root"
			],
			flowNote:
				"Choose a solving method from the equation structure, predict the root type from the discriminant, and check every real or complex result in the original equation."
		},
		{
			title: "ALA3 Graphing Quadratic Functions",
			estimatedTime: "3 sessions · 50–65 minutes each",
			keyBlocks: [
				"vertex / standard / intercept form",
				"axis of symmetry",
				"zero / intercept",
				"transformation",
				"graph-feature check"
			],
			flowNote:
				"Read the easiest features from each form, convert forms to verify the same parabola, and predict transformations before graphing. The graph prompt reference is optional visual support.",
			choiceCurriculumTitles: ["Graph Prompt Reference"]
		},
		{
			title: "Check-In #1",
			estimatedTime: "1–2 sessions · 50–65 minutes each",
			keyBlocks: [
				"complex arithmetic",
				"quadratic method",
				"discriminant",
				"quadratic form",
				"graph interpretation"
			],
			flowNote:
				"Solve one complex-number operation, one quadratic by a defended method, and one quadratic graph from two forms. Correct the first sign, coefficient, or feature mismatch before advancing to higher-degree polynomials."
		},
		{
			title: "ALA4 Higher Degree Polynomials",
			estimatedTime: "2–3 sessions · 50–65 minutes each",
			keyBlocks: [
				"polynomial operation",
				"factor structure",
				"degree / leading term",
				"transformation",
				"location principle"
			],
			flowNote:
				"Track degree and leading term through operations, factor where structure permits, and connect sign changes or interval evidence to the existence of real zeros without assuming their exact locations."
		},
		{
			title: "ALA5 Polynomial Division",
			estimatedTime: "2 sessions · 50–65 minutes each",
			keyBlocks: [
				"long division",
				"synthetic division",
				"quotient / remainder",
				"divisor condition",
				"multiplication check"
			],
			flowNote:
				"Choose synthetic division only for a linear divisor in the needed form, record every coefficient including zeros, and verify quotient and remainder by reconstructing the dividend."
		},
		{
			title: "ALA6 Zeros of Polynomials",
			estimatedTime: "3 sessions · 50–65 minutes each",
			keyBlocks: [
				"factor / remainder theorem",
				"rational root theorem",
				"Descartes' rule",
				"bounds",
				"multiplicity"
			],
			flowNote:
				"Use theorems to narrow candidates, test candidates efficiently, and distinguish possible counts from proven roots. Record multiplicity and verify the resulting factorization."
		},
		{
			title: "ALA7 Graphing Polynomials",
			estimatedTime: "3 sessions · 50–65 minutes each",
			keyBlocks: [
				"end behavior",
				"zero / multiplicity",
				"turning point",
				"sign interval",
				"feature-based sketch"
			],
			flowNote:
				"Predict end behavior from degree and leading coefficient, mark zeros with multiplicity behavior, test intervals, and sketch only after the feature table is internally consistent."
		},
		{
			title: "Check-In #2",
			estimatedTime: "1–2 sessions · 50–65 minutes each",
			keyBlocks: [
				"polynomial structure",
				"division",
				"zero theorem",
				"multiplicity",
				"feature-based graph"
			],
			flowNote:
				"Factor or divide one polynomial, locate and verify its zeros, and build a graph from end behavior and multiplicity. Continue when the algebra, feature table, and sketch agree."
		},
		{
			title: "ALA8 Rational Functions",
			estimatedTime: "3 sessions · 50–65 minutes each",
			keyBlocks: [
				"domain restriction",
				"vertical / horizontal asymptote",
				"removable discontinuity",
				"intercept",
				"rational graph"
			],
			flowNote:
				"Factor first, record excluded values from the source expression, distinguish holes from asymptotes, and build the graph from algebraic features. Rational graph references are optional visual support.",
			choiceCurriculumTitles: ["Rational Graph References"]
		},
		{
			title: "ALA9 Rational Function Operations",
			estimatedTime: "3 sessions · 50–65 minutes each",
			keyBlocks: [
				"factor / simplify",
				"least common denominator",
				"excluded value",
				"rational equation",
				"extraneous solution"
			],
			flowNote:
				"Carry source-domain restrictions through every operation, factor before canceling, and test every rational-equation solution against original denominators."
		},
		{
			title: "ALA10 Radical Functions",
			estimatedTime: "2–3 sessions · 50–65 minutes each",
			keyBlocks: [
				"radical domain / range",
				"graph transformation",
				"isolate radical",
				"raise to a power",
				"extraneous check"
			],
			flowNote:
				"State the real domain before graphing or solving, isolate one radical at a time, and check every candidate in the unsquared equation to reject extraneous values."
		},
		{
			title: "ALA11 Piecewise Functions",
			estimatedTime: "2–3 sessions · 50–65 minutes each",
			keyBlocks: [
				"interval condition",
				"open / closed endpoint",
				"piecewise evaluation",
				"step function",
				"continuity"
			],
			flowNote:
				"Select the rule from the input interval before evaluating, graph endpoint inclusion precisely, and compare left and right behavior when testing continuity or a pricing boundary."
		},
		{
			title: "Check-In #3",
			estimatedTime: "1–2 sessions · 50–65 minutes each",
			keyBlocks: [
				"rational feature",
				"domain restriction",
				"radical equation",
				"piecewise interval",
				"extraneous / endpoint check"
			],
			flowNote:
				"Complete one rational, radical, and piecewise task without notes, explain one excluded or extraneous value, and use graph references only when the prompt depends on a visual.",
			choiceCurriculumTitles: ["Check-In Visual References"]
		},
		{
			title: "ALA12 Algebra 2A Function Family Capstone",
			estimatedTime: "3–4 sessions · 50–65 minutes each",
			keyBlocks: [
				"two function families",
				"equation / graph / feature table",
				"domain / restriction",
				"model comparison",
				"Algebra 2B handoff"
			],
			flowNote:
				"Build the two candidate models from independently verified course methods, compare their features and restrictions, and choose from evidence. The portfolio audit is optional organization; the stress test is a challenge.",
			challengeSupplementalTitles: [
				"Challenge: Cross-Family Model Stress Test"
			]
		}
	],
	appendixTitles: ["Reference Archive: Algebra 2A"]
});

applyAlgebra2Readings(algebra2ACourse, "algebra-2a");
