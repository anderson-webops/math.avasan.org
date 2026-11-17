import type { RawCourse, RawCourseModuleItem } from "./types";
import { slugMarkdownHeading } from "@/modules/courseAssetPreview";
import { calculusCourseAssetViewerUrl as courseAssetViewerUrl } from "@/modules/courseAssetSourcesCalculus";
import {
	requireCalculusBinding,
	requireCalculusModule,
	retainCalculusSources
} from "./calculusBaselineBindings";

export const apCalculusCases = [
	{
		code: "APCA0",
		title: "Prerequisite Functions and Rates",
		reading:
			"A function assigns one output to each allowed input. Its domain is the set of allowed inputs; its range is the set of resulting outputs. A denominator cannot be zero. Cancelling a common factor changes the formula used near an excluded point but does not restore that point to the original domain. Average rate of change is (output change)/(input change), with units from those quantities. Radian measure uses pi radians for a half-turn.",
		worked: "For h(x)=(x^2-4)/(x-2), factor the numerator as (x-2)(x+2). For x not equal to 2, h(x)=x+2. Thus h(3)=5, but h(2) is undefined in the original function. Its graph follows the line y=x+2 with the point (2, 4) omitted.",
		problems: [
			"Let p(x)=x^2-4x+1. Complete the square, state its vertex, domain and range, and find its real zeros.",
			"Let q(x)=(x^2-9)/(x-3). State the original domain, simplify on that domain, and evaluate q(0). Explain whether the simplified formula supplies an original value at x=3.",
			"Angles are in radians. Evaluate sin(pi/6), cos(pi/3), and tan(pi/4).",
			"A moving object has the following measured distances: at t=0, 1, 2 seconds, d=0, 3, 8 meters. Find the average rates on [0, 2] and [1, 2]. Explain whether those three measurements determine the exact instantaneous rate at t=2."
		],
		published: {
			moduleId: "ap-calculus-apca0-preparing-for-ap-calculus",
			id: "ap-calculus-apca0-preparing-for-ap-calculus-curriculum-preparing-for-ap-calculus-core-concepts",
			title: "Preparing for AP Calculus Core Concepts",
			aliases: [
				"core-concepts",
				"ap-calculus-apca0-preparing-for-ap-calculus-curriculum-core-concepts"
			]
		}
	},
	{
		code: "APC1",
		title: "Limits and One-Sided Behavior",
		reading:
			"The notation lim as x approaches a of f(x)=L means f(x) can be made arbitrarily close to L by taking x sufficiently close to, but different from, a. A two-sided finite limit exists when the left and right limits exist and equal the same finite number. The value f(a) is a separate fact. Tables can suggest limiting behavior; finitely many table values alone do not establish behavior arbitrarily close to a.",
		worked: "Define g(x)=x+2 when x is not 1 and g(1)=10. As x approaches 1, values such as g(0.99)=2.99 and g(1.01)=3.01 suggest 3. The defining formula g(x)=x+2 on a punctured neighborhood establishes that the limit is 3. The different point value g(1)=10 does not change that limit.",
		problems: [
			"Define f(x)=(x^2-4)/(x-2) for x not 2 and f(2)=7. Find the limit as x approaches 2 and the function value at 2. Justify the distinction.",
			"Define h(x)=2x+1 for x<0 and h(x)=x^2-1 for x>=0. Find the left limit, right limit, function value, and two-sided limit at 0.",
			"A table lists x=0.9, 0.99, 1.01, 1.1 and y=1.9, 1.99, 2.01, 2.1. Give a plausible estimate for the limit as x approaches 1. State what the finite table cannot establish without more information about the function.",
			"Compare 1/x and 1/x^2 as x approaches 0 from each side. State which have a two-sided limit of positive infinity and whether that is a finite real limit."
		],
		published: {
			moduleId: "ap-calculus-apc1-introduction-to-limits",
			id: "ap-calculus-apc1-introduction-to-limits-curriculum-introduction-to-limits-core-concepts",
			title: "Introduction to Limits Core Concepts",
			aliases: [
				"core-concepts",
				"ap-calculus-apc1-introduction-to-limits-curriculum-core-concepts"
			]
		}
	},
	{
		code: "APC2",
		title: "Calculating Limits",
		reading:
			"Limit laws combine finite limits for sums, differences and products. A quotient law also requires a nonzero limiting denominator. Substitution works for a function continuous at the target. An expression of 0/0 is indeterminate, so rewrite the expression on a punctured neighborhood before taking its limit. The standard limit sin(u)/u=1 as u approaches 0 assumes radians. For rational expressions at infinity, dividing numerator and denominator by the highest denominator power exposes terms that vanish. The squeeze theorem states that if g(x)<=f(x)<=h(x) near a, except possibly at a, and both bounding functions tend to L, then f also tends to L.",
		worked: "For the limit of (x^2-9)/(x-3) as x approaches 3, substitution produces 0/0. Factoring gives (x-3)(x+3)/(x-3)=x+3 for x not 3. The rewritten expression approaches 6, so the limit is 6 even though the original quotient is undefined at 3.",
		problems: [
			"Evaluate the limit of (sqrt(x)-2)/(x-4) as x approaches 4. State the algebraic rewrite and the domain restriction used near 4.",
			"With x measured in radians, evaluate the limit of sin(3x)/x as x approaches 0. Show the factor that connects it to the standard sine limit.",
			"Evaluate the limit of (3x^2-x)/(2x^2+5) as x approaches positive infinity by dividing by x^2.",
			"Define f(x)=x+1 for x<2 and f(x)=x^2-1 for x>=2. Find both one-sided limits, f(2), and the two-sided limit at 2.",
			"Define f(x)=x^2*sin(1/x) for x!=0, with radian input. Use a two-sided bound to find its limit at 0 without dividing by sin(1/x)."
		],
		published: {
			moduleId: "ap-calculus-apc2-calculating-limits",
			id: "ap-calculus-apc2-calculating-limits-curriculum-calculating-limits-core-concepts",
			title: "Calculating Limits Core Concepts",
			aliases: [
				"core-concepts",
				"ap-calculus-apc2-calculating-limits-curriculum-core-concepts"
			]
		}
	},
	{
		code: "APC3",
		title: "Continuity and Discontinuities",
		reading:
			"Continuity at a requires f(a) to be defined, the finite limit at a to exist, and that limit to equal f(a). A removable gap can be repaired by assigning the limiting value. A jump has unequal finite one-sided limits; an infinite discontinuity has unbounded one-sided behavior. The Intermediate Value Theorem requires continuity on a closed interval and guarantees every value between the endpoint outputs, with an interior input for a value strictly between them. It does not by itself establish uniqueness. At an interval endpoint, continuity uses the one-sided limit within that interval.",
		worked: "Define f(x)=(x^2-1)/(x-1) for x not 1 and f(1)=k. Near 1 the formula equals x+1, so the limit is 2. All three continuity conditions hold exactly when k=2.",
		problems: [
			"Define g(x)=abs(x)/x for x not 0 and g(0)=0. Find the one-sided limits at 0, classify the discontinuity, and explain whether changing only g(0) can restore continuity.",
			"For F(x)=x^3+x-1 on [0, 1], use the Intermediate Value Theorem to justify a root in (0, 1). State the hypotheses and whether that theorem alone proves uniqueness.",
			"Classify the behavior of q(x)=1/(x-2) at 2. Give both one-sided infinite limits and explain whether a point-value assignment can repair it.",
			"With angles in radians, for h(x)=sin(1/x) when x not 0, compare x_n=1/(pi/2+2pi*n) and y_n=1/(3pi/2+2pi*n) for positive integers n. Explain why assigning h(0)=0 does not make h continuous at 0."
		],
		published: {
			moduleId: "ap-calculus-apc3-continuity",
			id: "ap-calculus-apc3-continuity-curriculum-continuity-core-concepts",
			title: "Continuity Core Concepts",
			aliases: [
				"core-concepts",
				"ap-calculus-apc3-continuity-curriculum-core-concepts"
			]
		}
	},
	{
		code: "APC4",
		title: "Limits and Continuity Review",
		reading:
			"A limit calculation and a continuity claim answer different questions. Evaluate one-sided behavior at a piecewise boundary, retain excluded inputs when simplifying, and check a theorem's interval hypotheses before using it. A finite table supplies estimates; an exact formula or another justified argument establishes the limiting conclusion. An infinite limit describes unbounded behavior and has no finite real value.",
		worked: "Define f(x)=x^2 for x<1, f(x)=2x-1 for x>1, and f(1)=c. The left expression approaches 1 and the right expression also approaches 1. The two-sided limit is 1, so f is continuous at 1 exactly when c=1.",
		problems: [
			"Evaluate the limit of (sqrt(1+x)-1)/x as x approaches 0. Identify the indeterminate form and show the rationalized expression.",
			"A graph follows y=x+2 for x<0, ending with an open point at (0, 2), and y=3-x for x>=0, with a filled point at (0, 3). Find both one-sided limits and the point value. Decide whether changing the point value alone can make the function continuous.",
			"Let F(x)=x^3-2 on [1, 2]. Compute the endpoint values and use IVT to establish a root in (1, 2), with all hypotheses stated.",
			"For h(x)=(2x^2+1)/(x^2-9), find its domain, its limit as x approaches positive infinity, and both one-sided limits at 3. Justify the signs near 3."
		],
		published: {
			moduleId: "ap-calculus-apc4-limits-and-continuity-topic-review",
			id: "ap-calculus-apc4-limits-and-continuity-topic-review-curriculum-limits-and-continuity-topic-review-core-concepts",
			title: "Limits and Continuity Topic Review Core Concepts",
			aliases: [
				"core-concepts",
				"ap-calculus-apc4-limits-and-continuity-topic-review-curriculum-core-concepts"
			]
		}
	},
	{
		code: "APC5",
		title: "Derivative Definitions and Tangent Lines",
		reading:
			"For a function defined near `a`, the derivative is `f'(a) = lim as h approaches 0 of [f(a+h)-f(a)]/h`, when that limit is finite. The quotient is used for `h != 0`. It is the slope of a secant line before the limit and the tangent slope after the limit. The tangent line is `y-f(a)=f'(a)(x-a)`. A derivative has output units per input unit. Differentiability implies continuity; continuity alone does not ensure a finite derivative, as corners and vertical tangents illustrate.",
		worked: "For `f(x)=x^2` at `a=3`, the difference quotient is `[(3+h)^2-9]/h = 6+h` for nonzero h. Its limit is 6, so `f'(3)=6`. The tangent passes through `(3,9)` and has equation `y-9=6(x-3)`.",
		problems: [
			"Use the difference quotient to find the derivative function for `f(x)=x^2+3x`, then evaluate `f'(-1)`.",
			"For `g(x)=abs(x)`, compute the left and right difference-quotient limits at 0. Decide separately whether g is continuous and differentiable there.",
			"Starting from the difference quotient for `q(x)=1/x`, find its derivative at `x=2` and the tangent line through `(2,1/2)`. Retain the domain restriction.",
			"A position model is `s(t)=t^2+1` meters, with t in seconds. A table records `s(1.9)=4.61`, `s(2)=5`, and `s(2.1)=5.41`. Find both adjacent secant rates and the exact instantaneous rate at 2. Explain what the table alone would establish without the model."
		],
		published: {
			moduleId: "ap-calculus-apc5-introduction-to-derivatives",
			id: "ap-calculus-apc5-introduction-to-derivatives-curriculum-introduction-to-derivatives-core-concepts",
			title: "Introduction to Derivatives Core Concepts",
			aliases: [
				"core-concepts",
				"ap-calculus-apc5-introduction-to-derivatives-curriculum-core-concepts"
			]
		}
	},
	{
		code: "APC6",
		title: "Power, Product and Quotient Rules",
		reading:
			"Constants differentiate to 0. The power rule is `(x^n)'=n*x^(n-1)` at inputs where the real-valued function is differentiable. Derivatives distribute over sums and constant multiples. The product rule is `(uv)'=u'v+uv'`. The quotient rule is `(u/v)'=(u'v-uv')/v^2` where `v != 0`. Simplifying an expression can reduce work, but the original function's excluded inputs remain excluded unless a new extension is explicitly defined.",
		worked: "For `p(x)=(x^2+1)(x^3-2)`, the product rule gives `p'(x)=2x(x^3-2)+3x^2(x^2+1)=5x^4+3x^2-4x`. Expanding p first gives `x^5+x^3-2x^2-2`, whose termwise derivative agrees.",
		problems: [
			"Differentiate `p(x)=3x^5-2x^(-2)+7`, and state its domain.",
			"For `q(x)=(x^2+1)/(x-1)`, use the quotient rule, simplify the result, and find `q'(0)` with the original domain retained.",
			"For `r(x)=(x^2-1)/(x-1)`, simplify before differentiating. Describe its graph near x=1 and decide whether the original function has a derivative at 1.",
			"At x=2, a value-and-slope table gives `u=3`, `u'=-1`, `v=4`, and `v'=2`. Compute the derivatives of `uv` and `u/v` at that input."
		],
		published: {
			moduleId: "ap-calculus-apc6-derivative-rules",
			id: "ap-calculus-apc6-derivative-rules-curriculum-derivative-rules-core-concepts",
			title: "Derivative Rules Core Concepts",
			aliases: [
				"core-concepts",
				"ap-calculus-apc6-derivative-rules-curriculum-core-concepts"
			]
		}
	},
	{
		code: "APC7",
		title: "Trigonometric, Exponential and Logarithmic Derivatives",
		reading:
			"With angles in radians: `(sin x)'=cos x`, `(cos x)'=-sin x`, `(tan x)'=sec^2 x`, `(sec x)'=sec x*tan x`, `(csc x)'=-csc x*cot x`, and `(cot x)'=-csc^2 x`, on the original functions' domains. Exponential rules are `(e^x)'=e^x` and `(a^x)'=a^x*ln(a)` for a>0. Logarithmic rules are `(ln x)'=1/x` for x>0 and `(ln abs(x))'=1/x` for x!=0. For `a>0` and `a!=1`, `(log_a x)'=1/[x*ln(a)]` on x>0. The sign of a derivative describes increasing or decreasing behavior, not the function's height.",
		worked: "For `f(x)=2sin(x)+e^x-3ln(x)`, the domain is x>0 and `f'(x)=2cos(x)+e^x-3/x`. Each term uses its own rule; the logarithm's positive-input restriction remains part of the result.",
		problems: [
			"Differentiate `f(x)=3cos(x)-2tan(x)` and state the exclusions inherited from tangent.",
			"For `g(x)=4^x+log_2(x)`, find g' and its value at x=1.",
			"Differentiate `h(x)=sec(x)+csc(x)` on its domain and evaluate its derivative at `pi/4`.",
			"Sketch the sign of the derivative of `s(x)=sin(x)` on `[0,2pi]`. State the intervals of increase and decrease and the two interior stationary points.",
			"Find the derivative of `ln(abs(x))` at x=-2. Explain why the real function `ln(x)` cannot be used at that input."
		],
		published: {
			moduleId:
				"ap-calculus-apc7-derivatives-of-trigonometric-and-other-functions",
			id: "ap-calculus-apc7-derivatives-of-trigonometric-and-other-functions-curriculum-derivatives-of-trigonometric-and-other-functions-core-concepts",
			title: "Derivatives of Trigonometric and Other Functions Core Concepts",
			aliases: [
				"core-concepts",
				"ap-calculus-apc7-derivatives-of-trigonometric-and-other-functions-curriculum-core-concepts"
			]
		}
	},
	{
		code: "APC8",
		title: "Chain Rule, Implicit and Inverse Derivatives",
		reading:
			"The chain rule is `(f(g(x)))'=f'(g(x))*g'(x)` when the component derivatives exist. In an implicit relation, differentiating a term involving y also requires y', as in `(y^2)'=2y*y'`. If `f(a)=b` and a differentiable local inverse exists with `f'(a)!=0`, then `(f^(-1))'(b)=1/f'(a)`: slopes are reciprocal at corresponding, swapped points. In radians, `(arcsin x)'=1/sqrt(1-x^2)` and `(arccos x)'=-1/sqrt(1-x^2)` for -1<x<1, while `(arctan x)'=1/(1+x^2)` for all real x. The second derivative is the derivative of the first; for position it represents acceleration.",
		worked: "On `x^2+y^2=25`, differentiation gives `2x+2y*y'=0`, so `y'=-x/y` where y!=0. At `(3,4)` the slope is -3/4. Differentiating again gives `2+2(y')^2+2y*y''=0`, hence `y''=-25/y^3=-25/64` at that point.",
		problems: [
			"Differentiate `(3x^2+1)^4`, showing both chain-rule factors.",
			"For `xy+y^2=6`, find the slope and tangent line at `(1,2)`. Check that the point satisfies the relation.",
			"Suppose `f(2)=5`, `f'(2)=3`, and f has a differentiable local inverse h. Find `h'(5)` and explain why the given data do not directly determine `h'(2)`.",
			"For position `s(t)=t^3-3t^2+2t` meters with t in seconds, find velocity and acceleration at t=2 and decide whether speed is increasing near that instant.",
			"Find the derivatives of arcsin and arccos at x=1/2 and of arctan at x=1. State the finite-derivative restriction for arcsin and arccos."
		],
		published: {
			moduleId:
				"ap-calculus-apc8-derivatives-of-composite-implicit-and-inverse-functions",
			id: "ap-calculus-apc8-derivatives-of-composite-implicit-and-inverse-functions-curriculum-derivatives-of-composite-implicit-and-inverse-functions-core-concepts",
			title: "Derivatives of Composite, Implicit, and Inverse Functions Core Concepts",
			aliases: [
				"core-concepts",
				"ap-calculus-apc8-derivatives-of-composite-implicit-and-inverse-functions-curriculum-core-concepts"
			]
		}
	},
	{
		code: "APC9",
		title: "Mixed Differentiation Review",
		reading:
			"For a product with a composite factor, use both the product rule and the chain rule. For inverse derivatives, swap the point coordinates before taking a reciprocal slope. Derivative signs indicate direction, while absolute velocity gives speed. At a corner, continuity may hold even though the left and right tangent slopes differ. These distinctions remain necessary when several rules appear in one expression.",
		worked: "For `y=(x^2+1)e^(2x)`, the derivative is `2x*e^(2x)+(x^2+1)*2e^(2x)=2e^(2x)(x^2+x+1)`. The first term comes from differentiating the polynomial; the second includes the inner derivative 2 of the exponential's input.",
		problems: [
			"Find the first and second derivatives of `f(x)=ln(1+x^2)`, and give the domain.",
			"Find the implicit slope of `x^2+xy+y^2=7` at `(1,2)`.",
			"Suppose f has a differentiable local inverse h, with `f(0)=1` and `f'(0)=2`. Find the inverse derivative supported by these data and assess the claim `h'(0)=1/2`.",
			"A graph consists of `y=-2x` for x<0 and `y=x` for x>=0. State continuity, the two one-sided slopes, and differentiability at 0.",
			"A particle has `s(t)=t^3-6t^2+9t` meters on `[0,4]` seconds. Find its turning times, intervals of forward and backward motion, displacement, and total distance using the positions at the turns."
		],
		published: {
			moduleId: "ap-calculus-apc9-differentiation-topic-review",
			id: "ap-calculus-apc9-differentiation-topic-review-curriculum-differentiation-topic-review-core-concepts",
			title: "Differentiation Topic Review Core Concepts",
			aliases: [
				"core-concepts",
				"ap-calculus-apc9-differentiation-topic-review-curriculum-core-concepts"
			]
		}
	},
	{
		code: "APC10",
		title: "Related Rates, Linearization and L'Hopital's Rule",
		reading:
			"Related rates begin with an equation linking changing quantities; differentiate with respect to time before substituting a single instant's values. A tangent approximation is `L(x)=f(a)+f'(a)(x-a)`. On an interval of concavity down, the tangent lies above the function; for concavity up it lies below. L'Hopital's rule applies to a quotient with a 0/0 or infinite/infinite limiting form when the numerator and denominator are differentiable near the limit point, the denominator derivative is nonzero there, the original quotient is defined on that punctured interval, and the derivative quotient has a limit that is finite or positive or negative infinity. It uses the ratio `f'/g'`, not the derivative of `f/g`. A finite nonzero denominator calls for ordinary limit rules instead.",
		worked: "A circle has radius r centimeters, with `A=pi*r^2`. Differentiate with respect to time: `dA/dt=2pi*r*(dr/dt)`. When r=3 cm and dr/dt=2 cm/s, the area grows at `12pi cm^2/s`. The instantaneous radius is substituted after differentiation, so it is not accidentally treated as a fixed constant.",
		problems: [
			"A 10-foot ladder rests against a vertical wall. Its bottom is 6 feet from the wall and moves away at 1 ft/s. Find the height and the top's vertical rate at that instant.",
			"Use a tangent line at x=4 to approximate sqrt(4.1). Use concavity to decide whether the estimate is above or below the exact value.",
			"A tank has `V(3)=20` liters, `V'(3)=-2` L/min and `V''(3)=0.5` L/min^2. Interpret both derivatives and estimate V(3.1) with a tangent line.",
			"Use L'Hopital's rule, with the hypotheses stated, for the limits of `(e^(2x)-1)/x` as x approaches 0 and `ln(x)/x` as x approaches positive infinity.",
			"Assess a proposed use of L'Hopital's rule on `(x^2+1)/(x+1)` as x approaches 2. Give the actual limit and explain why replacing the quotient by `2x/1` is invalid here."
		],
		published: {
			moduleId:
				"ap-calculus-apc10-contextual-applications-of-differentiation",
			id: "ap-calculus-apc10-contextual-applications-of-differentiation-curriculum-contextual-applications-of-differentiation-core-concepts",
			title: "Contextual Applications of Differentiation Core Concepts",
			aliases: [
				"core-concepts",
				"ap-calculus-apc10-contextual-applications-of-differentiation-curriculum-core-concepts"
			]
		}
	},
	{
		code: "APC11",
		title: "Function Theorems and Sign Charts",
		reading:
			"The Extreme Value Theorem guarantees an attained minimum and maximum for a function continuous on a closed bounded interval. For the Mean Value Theorem, continuity is required on `[a,b]` and differentiability on `(a,b)`; then some interior c satisfies `f'(c)=[f(b)-f(a)]/(b-a)`. An interior critical number is a point in the function's domain where f' is zero or does not exist. A first-derivative change from positive to negative gives a local maximum, and negative to positive a local minimum. The signs of f'' describe concavity; an inflection point requires a change in concavity. At a stationary point, f''>0 gives a local minimum and f''<0 a local maximum; f''=0 is inconclusive. Absolute extrema require comparing all domain-relevant critical candidates and endpoints. Rolle's theorem is the MVT special case with equal endpoint values, producing an interior zero derivative under the same hypotheses.",
		worked: "For `f(x)=x^3-3x` on `[-2,2]`, `f'=3(x^2-1)` has critical numbers -1 and 1. The candidate values are `f(-2)=-2`, `f(-1)=2`, `f(1)=-2`, `f(2)=2`. The absolute maximum is 2 at -1 and 2; the absolute minimum is -2 at -2 and 1. Since `f''=6x`, concavity changes at the inflection point `(0,0)`.",
		problems: [
			"Apply MVT to `f(x)=x^2` on `[1,3]`, checking its hypotheses and finding c.",
			"Apply EVT to `g(x)=abs(x)` on `[-1,1]`. Explain why MVT does not apply there and check whether any existing derivative equals the average slope.",
			"Compare `u(x)=x^4` and `v(x)=x^3` at 0. In each case f''(0)=0; use other evidence to classify extrema and concavity.",
			"A derivative graph is given exactly by `f'(x)=(x-1)(x+2)`, and f(0)=4. Make derivative sign and concavity charts, identify local-extremum and inflection inputs, and sketch a consistent f through (0,4)."
		],
		published: {
			moduleId:
				"ap-calculus-apc11-analytical-applications-of-differentiation",
			id: "ap-calculus-apc11-analytical-applications-of-differentiation-curriculum-analytical-applications-of-differentiation-core-concepts",
			title: "Analytical Applications of Differentiation Core Concepts",
			aliases: [
				"core-concepts",
				"ap-calculus-apc11-analytical-applications-of-differentiation-curriculum-core-concepts"
			]
		}
	},
	{
		code: "APC12",
		title: "Optimization and Derivative Graphs",
		reading:
			"Optimization requires an objective, a constraint, a feasible domain and a comparison of candidate values. Critical numbers alone do not prove an absolute optimum; endpoint or limiting behavior also matters. It is often easier to minimize a squared distance because square root preserves order for nonnegative inputs. For a relation, a horizontal tangent has zero dy/dx, while a vertical tangent may be handled by writing x locally as a function of y. A whole relation can fail the vertical-line test and still have well-defined local tangent lines.",
		worked: "A rectangle with perimeter 20 m has sides x and 10-x, so `A(x)=10x-x^2`. On the closed comparison interval `[0,10]`, endpoints represent collapsed rectangles and have area 0. The only interior critical number is x=5; it gives area 25 m^2. Thus the maximizing rectangle is a 5-by-5 square.",
		problems: [
			"An open-top box is formed by cutting squares of side x from every corner of a 12-by-12 cm sheet. On `[0,6]`, maximize `V(x)=x(12-2x)^2`, including the collapsed endpoints in the comparison.",
			"Find the point on `y=2x+1` closest to the origin by minimizing squared distance. State why the candidate is a global minimum.",
			"For `x^2+y^2=25`, find the tangent lines at `(0,5)` and `(5,0)`. Explain why one derivative formula cannot represent the entire circle as a single function y=f(x).",
			"On `[0,2]`, a derivative table comes from the exact rule `f'(x)=4-x`, with entries 4,3,2 at x=0,1,2 and f(0)=1. Which shape fits f: A, increasing with decreasing slopes; B, decreasing with increasing slopes; or C, increasing with increasing slopes? Justify using both derivatives."
		],
		published: {
			moduleId: "ap-calculus-apc12-a-function-and-its-derivatives",
			id: "ap-calculus-apc12-a-function-and-its-derivatives-curriculum-a-function-and-its-derivatives-core-concepts",
			title: "A Function and Its Derivatives Core Concepts",
			aliases: [
				"core-concepts",
				"ap-calculus-apc12-a-function-and-its-derivatives-curriculum-core-concepts"
			]
		}
	},
	{
		code: "APC13",
		title: "Derivative Applications Review",
		reading:
			"Signed velocity and nonnegative speed answer different questions. Related-rates equations connect quantities at the same instant and carry time units through differentiation. A valid optimization conclusion names its feasible interval and compares the relevant candidates. A theorem's conclusion is justified only after its hypotheses are checked. For repeated use of L'Hopital's rule, recheck the indeterminate form at each stage before differentiating again.",
		worked: "For `f(x)=x^3-3x^2` on `[0,3]`, `f'=3x(x-2)`. Candidate values at 0,2,3 are 0,-4,0, so the absolute minimum is -4 at 2 and the maximum is 0 at both endpoints. Since `f''=6x-6`, the inflection point is `(1,-2)`. The graph decreases until 2 and then increases.",
		problems: [
			"A spherical balloon has radius 2 cm, increasing at 3 cm/s. Starting with `V=4pi*r^3/3`, find its volume rate at that instant.",
			"A rectangular field beside a straight river needs fencing on only three sides. With 100 m of fencing, let x be each side perpendicular to the river. Find the dimensions and maximum area, with the feasible domain stated.",
			"Apply MVT to `f(x)=x^3` on `[0,2]` and find every c in the required interval.",
			"Given the exact derivative `f'(x)=x^2-4` on `[-3,3]`, identify intervals of increase/decrease, local-extremum inputs, concavity intervals and the inflection input.",
			"Evaluate the limit of `(1-cos(x))/x^2` as x approaches 0 in radians. Show and justify each use of L'Hopital's rule."
		],
		published: {
			moduleId:
				"ap-calculus-apc13-applications-of-derivatives-topic-review",
			id: "ap-calculus-apc13-applications-of-derivatives-topic-review-curriculum-applications-of-derivatives-topic-review-core-concepts",
			title: "Applications of Derivatives Topic Review Core Concepts",
			aliases: [
				"core-concepts",
				"ap-calculus-apc13-applications-of-derivatives-topic-review-curriculum-core-concepts"
			]
		}
	},
	{
		code: "APC14",
		title: "Accumulation and the Fundamental Theorem",
		reading:
			"A definite integral is the limit of signed rectangle sums `sum f(x_i*)*delta_x_i` as the largest interval width approaches 0. Continuous functions are integrable on closed bounded intervals. Regions below the horizontal axis contribute negatively. Reversing bounds changes the sign, and splitting an interval adds its integrals. If f is continuous and `F'=f`, then `integral from a to b of f(x) dx = F(b)-F(a)`. An accumulation `A(x)=integral from a to x of f(t) dt` has `A'(x)=f(x)`. With a moving upper bound g(x), the derivative is `f(g(x))*g'(x)`; with two moving bounds u and v, it is `f(v(x))*v'(x)-f(u(x))*u'(x)`.",
		worked: "A velocity is `v(t)=2t-2` m/s on [0,3] seconds. Its integral is `[t^2-2t] from 0 to 3 = 3 m` of signed displacement. The graph has a negative triangle of area 1 on [0,1] and a positive triangle of area 4 on [1,3]. Total distance is therefore `1+4=5 m`, rather than the signed displacement 3 m.",
		problems: [
			"A continuous increasing flow rate has values 2,3,6,11 L/min at times 0,1,2,3 minutes. Using the three unit intervals, find left, right and trapezoid estimates for accumulated flow. State which estimates bound the exact integral and whether the table makes any estimate exact.",
			"For `v(t)=t-1` m/s on [0,3], compute displacement and total distance, showing the interval split.",
			"Let `G(x)=integral from 1 to x^2 of (1+t^3) dt`. Find G' and evaluate it at x=2.",
			"For `H(x)=integral from 0 to x of cos(t) dt`, find H', H(0), H(pi/2), and H(pi). Describe H's increase and decrease on [0,pi], with radians understood.",
			"Express the integral of x^2 on [0,1] as a right Riemann-sum limit and evaluate it. The identity `sum of k^2 from k=1 to n = n(n+1)(2n+1)/6` may be used."
		],
		published: {
			moduleId: "ap-calculus-apc14-accumulation-of-change",
			id: "ap-calculus-apc14-accumulation-of-change-curriculum-accumulation-of-change-core-concepts",
			title: "Accumulation of Change Core Concepts",
			aliases: [
				"core-concepts",
				"ap-calculus-apc14-accumulation-of-change-curriculum-core-concepts"
			]
		}
	},
	{
		code: "APC15",
		title: "Antiderivatives and Integration Methods",
		bcFrom: 5,
		reading:
			"An indefinite integral describes a family of antiderivatives and includes `+C`. For `p!=-1`, integrate `x^p` as `x^(p+1)/(p+1)` on intervals where the expression is defined. Basic antiderivatives include `1/x -> ln(abs(x))`, `e^x -> e^x`, `sin(x) -> -cos(x)`, `cos(x) -> sin(x)`, `sec^2(x) -> tan(x)`, `1/(1+x^2) -> arctan(x)`, and `1/sqrt(1-x^2) -> arcsin(x)` on their appropriate intervals. Substitution uses `u=g(x)` and `du=g'(x)dx`; transform both definite bounds into u-values or return the antiderivative to x before evaluating. Polynomial division and completing the square can expose a basic form. BC methods include integration by parts, `integral u dv = uv - integral v du`, and partial fractions. An improper integral uses a limit at an infinite bound or a singular endpoint. Each side of an interior singularity must converge separately; cancellation of divergent sides does not produce an ordinary integral. For power integrals, the tail from 1 to infinity of x^(-p) converges exactly when p>1; the endpoint integral from 0 to 1 converges exactly when p<1.",
		worked: "For the integral of `2x*e^(x^2)` from 0 to 1, set `u=x^2` and `du=2x dx`. The bounds remain 0 and 1 in u, so the integral becomes the integral of e^u and equals `e-1`. Differentiating `e^(x^2)` checks the antiderivative.",
		problems: [
			"Find an antiderivative of `3x^2-4x+2` and its definite integral on [0,2].",
			"Use substitution to evaluate the integral of `2x/(1+x^2)` from 1 to 3.",
			"Find antiderivatives of `1/x`, `1/(x^2+4)`, and `1/(x^2+2x+2)`, with the relevant domains stated.",
			"A graph is exactly the line `f(x)=2x` on [0,2]. Use geometry and FTC to find its integral, then give the reversed-bounds integral and the integral of 3f on the same interval.",
			"Use integration by parts to integrate `x*e^x`, and verify the result by differentiation.",
			"Use partial fractions to integrate `1/[(x-1)(x+1)]`. State the intervals on which the antiderivative applies.",
			"Evaluate the improper integrals of `1/x^2` on [1,infinity), `1/sqrt(x)` on (0,1], and `1/x` across [-1,1]. Show the limiting interpretation and explain the last result."
		],
		published: {
			moduleId: "ap-calculus-apc15-integrals",
			id: "ap-calculus-apc15-integrals-curriculum-integrals-core-concepts",
			title: "Integrals Core Concepts",
			aliases: [
				"core-concepts",
				"ap-calculus-apc15-integrals-curriculum-core-concepts"
			]
		}
	},
	{
		code: "APC16",
		title: "Integration and Accumulation Review",
		reading:
			"A table-based quadrature result is an estimate unless enough information makes the interpolation exact. Integrating a rate gives a change; add an initial amount to obtain a final amount. A signed integral and total unsigned area differ when the integrand changes sign. Differentiating an accumulation with a composite bound requires the chain-rule factor. For a definite integral, antiderivative constants cancel in the endpoint difference rather than becoming part of the numerical answer.",
		worked: "For `A(x)=integral from 0 to x of (t^2-1) dt`, `A(x)=x^3/3-x` and `A'(x)=x^2-1`. On nonnegative inputs A decreases until x=1, then increases; its minimum there is -2/3. From 0 to 2 the signed integral is 2/3, while the unsigned areas 2/3 and 4/3 sum to 2.",
		problems: [
			"A continuous increasing rate Q' has values 1,3,7 L/hour at times 0,2,5 hours, with Q(0)=10 L. Use the unequal intervals to find left, right and trapezoid change estimates and the trapezoid estimate of Q(5).",
			"Find the derivative of `F(x)=integral from 2 to 3x of (1+t^2) dt`, evaluate F'(1), and find an x for which the two integration bounds coincide.",
			"Use the graphs `y=abs(x)` and `y=x` on [-1,1] to compare their integrals. Explain the role of signed area.",
			"Evaluate the integral of `3x^2+2` on [0,2], give an indefinite antiderivative, and state the reversed-bounds value."
		],
		published: {
			moduleId:
				"ap-calculus-apc16-integration-and-accumulation-of-change-topic-review",
			id: "ap-calculus-apc16-integration-and-accumulation-of-change-topic-review-curriculum-integration-and-accumulation-of-change-topic-review-core-concepts",
			title: "Integration and Accumulation of Change Topic Review Core Concepts",
			aliases: [
				"core-concepts",
				"ap-calculus-apc16-integration-and-accumulation-of-change-topic-review-curriculum-core-concepts"
			]
		}
	},
	{
		code: "APC17",
		title: "Differential Equations and Slope Fields",
		bcFrom: 5,
		reading:
			"A solution of `y'=F(x,y)` is a differentiable function satisfying that relation throughout its stated interval. An initial condition selects a point on its graph. A differential equation may have infinitely many solutions; for example, every `y=x^2+C` solves `y'=2x`. In a slope field, the segment at (x,y) has slope F(x,y). A zero slope is horizontal; its sign describes increase or decrease as x increases. A BC Euler step uses `x_next=x+h` and `y_next=y+h*F(x,y)`, with each new slope evaluated at the latest approximate point. An Euler result is an approximation, not a verified exact solution.",
		worked: "For `y'=x-y`, the function `y=x-1+2e^(-x)` has derivative `1-2e^(-x)`, which equals x-y. It also satisfies y(0)=1. Its initial slope is -1, so its tangent there is `y=1-x`. Substitution verifies a whole solution rather than only one segment.",
		problems: [
			"Verify that `y=x^2+3` solves `y'=2x` with y(0)=3. Assess `y=x^2+4` separately against the equation and the initial condition.",
			"For the slope field `y'=x-y`, calculate and sketch segments at x=-1,0,1 on each of the rows y=0 and y=1. Identify the line of horizontal segments.",
			"For `y'=3-y`, find the equilibrium and the signs of slopes above and below it. Describe the initial direction of a solution starting at y(0)=1.",
			"Match `y'=2x`, y(0)=-1 to the candidates `A: y=x^2-1`, `B: y=2x-1`, and `C: y=x^2+1`. Check both conditions.",
			"For `y'=x+y`, y(0)=1, approximate y(1) using Euler steps h=1/2 and h=1/4. Compare both with the exact function `y=2e^x-x-1`, verifying that exact function first."
		],
		published: {
			moduleId:
				"ap-calculus-apc17-introduction-to-differential-equations",
			id: "ap-calculus-apc17-introduction-to-differential-equations-curriculum-introduction-to-differential-equations-core-concepts",
			title: "Introduction to Differential Equations Core Concepts",
			aliases: [
				"core-concepts",
				"ap-calculus-apc17-introduction-to-differential-equations-curriculum-core-concepts"
			]
		}
	},
	{
		code: "APC18",
		title: "Separable, Exponential and Logistic Equations",
		bcFrom: 5,
		reading:
			"For `y'=g(x)h(y)`, separation gives `dy/h(y)=g(x)dx` where h(y) is nonzero. Integrate both sides, apply the initial condition, and retain the solution interval containing that initial point. Check equilibrium solutions h(y)=0 separately because division can lose them. The model `P'=kP` has solutions `P=C e^(kt)`, with k carrying inverse-time units. BC logistic models `P'=kP(1-P/K)` have equilibrium levels 0 and K. For k>0 and initial population between them, the population increases toward K; the growth-rate quadratic is largest at P=K/2.",
		worked: "For `y'=2xy` with y(0)=3, separation on the positive solution gives `ln(y)=x^2+C`, hence `y=3e^(x^2)`. Differentiation and the initial value verify it. The equilibrium y=0 also solves the differential equation, but not this initial condition.",
		problems: [
			"Solve `y'=3y`, y(0)=2, and verify the result.",
			"Solve `y'=y^2`, y(0)=1. Give the maximal interval containing the initial input and identify the equilibrium omitted by dividing by y^2.",
			"A hypothetical population satisfies `P'=kP`, P(0)=100 and P(2)=200, with time in hours. Find k, P(3), and P'(2), including units.",
			"For `y'=-2xy^2`, treat the initial conditions y(0)=0 and y(0)=1 separately. Explain why division by y^2 cannot handle both at once.",
			"A BC logistic model is `P'=0.2P(1-P/1000)` with P(0)=100 and time in hours. Verify `P(t)=1000/[1+9e^(-0.2t)]`, identify its limiting level, and find the maximum growth rate and the time at which it occurs."
		],
		published: {
			moduleId: "ap-calculus-apc18-solutions-to-differential-equations",
			id: "ap-calculus-apc18-solutions-to-differential-equations-curriculum-solutions-to-differential-equations-core-concepts",
			title: "Solutions to Differential Equations Core Concepts",
			aliases: [
				"core-concepts",
				"ap-calculus-apc18-solutions-to-differential-equations-curriculum-core-concepts"
			]
		}
	},
	{
		code: "APC19",
		title: "Differential Equations Review",
		bcFrom: 5,
		reading:
			"Checking a differential equation requires an identity on an interval, not agreement at a few sampled points. An implicit solution can be sufficient if differentiating its relation recovers the equation and it satisfies the initial condition. Equilibria must survive the solution process, and a finite-time singularity restricts the interval of an initial-value solution. Exact symbolic solutions and numerical slope steps provide different kinds of evidence.",
		worked: "The initial-value problem `y'=-2y`, y(0)=5 has solution `y=5e^(-2x)`. It is positive, decreasing, and concave up because its first derivative is negative and its second derivative is `20e^(-2x)>0`. The zero equilibrium belongs to the differential equation's solution family but not this initial-value problem.",
		problems: [
			"Verify `y=2+x+x^2/2` for `y'=1+x`, y(0)=2. State the general solution family.",
			"Solve `y'=x/(1+y^2)`, y(0)=0 in implicit form. Recover the derivative by differentiating that relation and find the initial tangent slope.",
			"A mathematical tank model uses y liters and t minutes, with `dy/dt=4-0.5y`, y(0)=2. Verify `y=8-6e^(-0.5t)` and identify the equilibrium and initial direction.",
			"For `y'=x+y`, test the proposed curve y=x^2 at x=0,1,2. Explain why a few matching slope-field points do not verify a solution.",
			"Use two Euler steps of size 0.1 for `y'=-2y`, y(0)=5, and compare with the exact value at 0.2. Separately, for `P'=P(1-P/20)`, compare growth rates at P=5 and P=15 and find the population with the greatest growth rate."
		],
		published: {
			moduleId: "ap-calculus-apc19-differential-equations-topic-review",
			id: "ap-calculus-apc19-differential-equations-topic-review-curriculum-differential-equations-topic-review-core-concepts",
			title: "Differential Equations Topic Review Core Concepts",
			aliases: [
				"core-concepts",
				"ap-calculus-apc19-differential-equations-topic-review-curriculum-core-concepts"
			]
		}
	},
	{
		code: "APC20",
		title: "Net Change, Average Value and Area",
		reading:
			"Integrating a rate Q' on [a,b] gives `Q(b)-Q(a)`; the final amount also requires Q(a). Integrating velocity gives displacement, while integrating its absolute value gives total distance. A function's average value is its integral divided by the interval length. Area between curves is the integral of top minus bottom, or right minus left for horizontal slices, with intervals split where the ordering changes. Intersections and the stated domain determine the bounds.",
		worked: "The curves y=x and y=x^2 meet at x=0 and x=1. On [0,1], x is the upper curve, so their enclosed area is the integral of `x-x^2`, giving `1/2-1/3=1/6` square units. The sign and the intersections justify the setup before evaluation.",
		problems: [
			"A tank initially contains 10 L. On [0,2] minutes, its inflow is `3+t` L/min and outflow is 1 L/min. Find total inflow, net change and final volume.",
			"A particle has velocity `v(t)=t-2` m/s on [0,5]. Find displacement, total distance, average velocity and average speed.",
			"For y=x and y=x^3 on [-1,1], find every intersection, the signed integral of x-x^3, and the total enclosed area.",
			"Find the area between `x=y^2` and `x=2y`, using horizontal slices and their intersections.",
			"Find the average value of f(x)=x^2 on [0,3] and the input in that interval where f equals its average. State the continuity fact supporting existence."
		],
		published: {
			moduleId:
				"ap-calculus-apc20-interpreting-context-for-definite-integrals",
			id: "ap-calculus-apc20-interpreting-context-for-definite-integrals-curriculum-interpreting-context-for-definite-integrals-core-concepts",
			title: "Interpreting Context for Definite Integrals Core Concepts",
			aliases: [
				"core-concepts",
				"ap-calculus-apc20-interpreting-context-for-definite-integrals-curriculum-core-concepts"
			]
		}
	},
	{
		code: "APC21",
		title: "Cross Sections, Washers and Arc Length",
		bcFrom: 5,
		reading:
			"A solid with cross-section area A(x) has volume `integral A(x) dx` over its stated bounds. If a slice has width s, square, equilateral-triangle and semicircle areas are `s^2`, `sqrt(3)*s^2/4`, and `pi*s^2/8`, respectively. A disc has area `pi*R^2`; a washer has area `pi*(R^2-r^2)` with `0<=r<=R`. Radii are distances to the actual rotation axis, so an offset axis changes both expressions. Horizontal slices use y-bounds and dy. For BC, the length of a continuously differentiable graph y=f(x) is the integral of `sqrt(1+[f'(x)]^2)` over the interval, not the area under the graph.",
		worked: "Rotate the region between y=x and y=x^2 on [0,1] about the x-axis. The outer radius is x and the inner radius is x^2. Washers give `pi*integral from 0 to 1 of (x^2-x^4) dx = 2pi/15` cubic units.",
		problems: [
			"The base is `0<=y<=x`, `0<=x<=2`. Cross sections perpendicular to the x-axis are squares with side equal to the base's vertical width. Find the volume, then the volume if the same widths instead form equilateral triangles.",
			"Rotate the region under y=sqrt(x), above y=0, from x=0 to x=4 about the x-axis. Define the radius and find the volume.",
			"Rotate the region between y=x and y=x^2 on [0,1] about y=2. Identify both radii and evaluate the washer integral.",
			"Rotate `0<=x<=y^2`, `0<=y<=1` about the y-axis. Use horizontal discs to find the volume.",
			"Find the arc length of `y=(2/3)x^(3/2)` on [0,3]. Also find the length of y=3x on [0,2], and distinguish these calculations from an area integral."
		],
		published: {
			moduleId: "ap-calculus-apc21-volumes-of-solids-using-integrals",
			id: "ap-calculus-apc21-volumes-of-solids-using-integrals-curriculum-volumes-of-solids-using-integrals-core-concepts",
			title: "Volumes of Solids Using Integrals Core Concepts",
			aliases: [
				"core-concepts",
				"ap-calculus-apc21-volumes-of-solids-using-integrals-curriculum-core-concepts"
			]
		}
	},
	{
		code: "APC22",
		title: "Integration Applications Review",
		reading:
			"For a rate model, identify the initial amount and separate total change from the final state. For motion, split at velocity sign changes before summing distance. For an enclosed area, solve intersections and identify which curve is above; for a solid of revolution, state radius distances to the axis. A table estimate retains its nonuniform interval widths and its estimate label. A route-end portfolio combines corrected work from all six AB strands rather than using one strong topic as a substitute for another.",
		worked: "A quantity starts at Q(0)=5 L and changes at `Q'(t)=4-t` L/min on [0,3]. Its change is `12-9/2=15/2 L`; the final amount is `25/2 L`. The average rate is `(15/2)/3=5/2 L/min`. The initial amount affects the final state but not the accumulated change.",
		problems: [
			"Find the area enclosed by y=2x and y=x^2, with intersections and curve ordering justified.",
			"Rotate the region below y=x+1 and above y=0 on [0,1] about the x-axis. Give the radius and volume.",
			"For velocity `v(t)=2-t` m/s on [0,4], find displacement and total distance, showing why the answers differ.",
			"A continuous increasing inflow rate has values 1,2,4 L/min at times 0,1,3, with initial volume 20 L and no outflow. Find trapezoid, left and right change estimates, and estimate the final volume.",
			"Find the average value of f(x)=3x^2 on [0,2] and an input where that value occurs. Explain the area of the corresponding average-height rectangle."
		],
		published: {
			moduleId:
				"ap-calculus-apc22-applications-of-integration-topic-review",
			id: "ap-calculus-apc22-applications-of-integration-topic-review-curriculum-applications-of-integration-topic-review-core-concepts",
			title: "Applications of Integration Topic Review Core Concepts",
			aliases: [
				"core-concepts",
				"ap-calculus-apc22-applications-of-integration-topic-review-curriculum-core-concepts"
			]
		}
	},
	{
		code: "APC23",
		title: "Parametric, Polar and Vector Calculus",
		reading:
			"For `x=x(t)` and `y=y(t)`, the slope is `(dy/dt)/(dx/dt)` when dx/dt is nonzero. The second x-derivative is the t-derivative of that slope divided by dx/dt again. For position `r=(x,y)`, velocity is `r'`, acceleration is `r''`, speed is `sqrt((x')^2+(y')^2)`, displacement is the endpoint difference, and total distance is the integral of speed. In polar coordinates `x=r*cos(theta)` and `y=r*sin(theta)`, so `dy/dx=[r'*sin(theta)+r*cos(theta)]/[r'*cos(theta)-r*sin(theta)]` when its denominator is nonzero. Polar area is `(1/2)*integral r^2 dtheta` over a region traced once. The angle bounds and repeated tracing must be checked, rather than assuming every full-turn integral describes the intended region once.",
		worked: "For `r(t)=(t^2,t^3)` at t=1, velocity is (2,3), speed is sqrt(13), and acceleration is (2,6). The graph slope is `3t^2/(2t)=3t/2` for t!=0, giving 3/2 at 1. Differentiating that quotient with respect to t and dividing by 2t gives the second x-derivative `3/(4t)`, equal to 3/4 at 1. A zero denominator at t=0 would require separate tangent analysis.",
		problems: [
			"For `x=t^2+1`, `y=t^3-t`, find the point, tangent slope, second x-derivative, and tangent line at t=1. Also determine the tangent at t=0 using the parameter derivatives.",
			"Velocity is `(2t,3t^2)`, with initial position (1,-1) at t=0. Find position at t=2, displacement over [0,2], and speed at t=1. Then find total distance on [0,1].",
			"For `x=3t`, `y=4t`, t in [0,2], compute total distance and compare it with displacement magnitude.",
			"For `r=2cos(theta)` on `[-pi/2,pi/2]`, find the point and tangent slope at theta=pi/4, and the total enclosed area. Interpret the curve in rectangular coordinates to check that the angle interval traces it once.",
			"Find the area enclosed by `r=1+cos(theta)` over one full trace, theta in [0,2pi]. State why the area formula uses r^2."
		],
		published: {
			moduleId:
				"ap-calculus-apc23-parametric-equations-polar-coordinates-and-vector-valued-functions",
			id: "ap-calculus-apc23-parametric-equations-polar-coordinates-and-vector-valued-functions-curriculum-parametric-equations-polar-coordinates-and-vector-valued-functions-core-concepts",
			title: "Parametric Equations, Polar Coordinates, and Vector-Valued Functions Core Concepts",
			aliases: [
				"core-concepts",
				"ap-calculus-apc23-parametric-equations-polar-coordinates-and-vector-valued-functions-curriculum-core-concepts"
			]
		}
	},
	{
		code: "APC24",
		title: "Parametric and Polar Applications Review",
		reading:
			"Position, displacement and distance must retain their different meanings in a curved path. Parameter derivatives use the parameter as the independent variable, while a requested graph slope or second x-derivative requires division by dx/dt. A polar slope comes from differentiating its rectangular coordinate formulas. For a region between nonnegative polar radii, subtract the inner squared radius from the outer squared radius over angle intervals where that ordering is valid.",
		worked: "On `r(t)=(3cos(t),3sin(t))`, t from 0 to pi/2, velocity is `(-3sin(t),3cos(t))` and speed is 3. Distance is `3pi/2`. Displacement is (-3,3), with magnitude `3sqrt(2)`, a shorter straight chord. The constant speed does not make the curved path's distance equal to its displacement magnitude.",
		problems: [
			"For `x=t^2`, `y=2t`, find the point, graph slope and second x-derivative at t=1.",
			"A moving point has velocity `(1,2t)` and initial position (0,1). Find position and speed at t=2, displacement over [0,2], and an exact total-distance integral. A closed-form antiderivative is not required.",
			"For `r=1+sin(theta)`, find the tangent slope at theta=pi/2 and the area swept for theta from 0 to pi. Give the rectangular point at that angle.",
			"Find the area of `1<=r<=2` in the first quadrant, stating the angle bounds and inner/outer radii.",
			"Assess the claim that distance equals displacement magnitude for `r(t)=(cos(t),sin(t))` on [0,pi]. Compute both and explain the geometry."
		],
		published: {
			moduleId:
				"ap-calculus-apc24-parametric-equations-polar-coordinates-and-vector-valued-functions-topic-review",
			id: "ap-calculus-apc24-parametric-equations-polar-coordinates-and-vector-valued-functions-topic-review-curriculum-parametric-equations-polar-coordinates-and-vector-valued-functions-topic-review-core-concepts",
			title: "Parametric Equations, Polar Coordinates, and Vector-Valued Functions Topic Review Core Concepts",
			aliases: [
				"core-concepts",
				"ap-calculus-apc24-parametric-equations-polar-coordinates-and-vector-valued-functions-topic-review-curriculum-core-concepts"
			]
		}
	},
	{
		code: "APC25",
		title: "Series Convergence and Error Bounds",
		reading:
			"For a nonnegative integer n, n! is the product of the positive integers through n, with 0!=1. A convergent series must have terms approaching 0; that condition alone is insufficient. A geometric series starting at n=0 with terms `a*r^n` sums to `a/(1-r)` when abs(r)<1. A p-series of `1/n^p` converges exactly when p>1. For nonnegative terms, direct comparison with a convergent larger series proves convergence, while comparison with a divergent smaller series proves divergence. Limit comparison with positive comparison terms applies when the term ratio approaches a finite positive constant. The integral test requires a positive continuous decreasing function agreeing with the terms; its tail integrals bound the remainder. The absolute-value ratio test gives absolute convergence for L<1 and divergence for L>1; L=1 is inconclusive. An alternating series converges when its term magnitudes decrease to 0, with error at most the next omitted magnitude. Absolute convergence means the absolute-value series converges; conditional convergence means the original series converges while that absolute-value series diverges.",
		worked: "For the series `sum 3^n/n!` from n=1 onward, successive positive terms have ratio `3/(n+1)`, which tends to 0. The ratio test therefore proves absolute convergence. Initial terms can increase without contradicting a test whose conclusion depends on eventual behavior; no exact sum is needed for this classification.",
		problems: [
			"Classify the series `sum 3*(1/2)^n` from n=0, `sum 1/n` from n=1, and `sum 1/n^2` from n=1. Give the geometric sum where it exists.",
			"Use limit comparison for `sum (2n+1)/(n^3+1)` and direct comparison for `sum 1/(n^2+5)`, both from n=1. Check the sign and comparison conditions.",
			"Use the integral test for `sum 1/[n*ln(n)]` from n=2. Then bound the remainder after the first 10 terms of `sum 1/n^3` using appropriate tail integrals.",
			"Use the ratio test to classify `sum n!/3^n` and `sum 3^n/n!`, both from n=1. Show the successive-term ratios.",
			"Classify `sum (-1)^(n+1)/n` and `sum (-1)^n/n^2` from n=1 as absolute, conditional or divergent. Bound the error of the first series after 10 terms and decide whether that partial sum is above or below the limit.",
			"Explain why ratio-test limit 1 does not classify either `sum 1/n` or `sum 1/n^2`. Use the term test to classify `sum n/(n+1)`."
		],
		published: {
			moduleId: "ap-calculus-apc25-infinite-series",
			id: "ap-calculus-apc25-infinite-series-curriculum-infinite-series-core-concepts",
			title: "Infinite Series Core Concepts",
			aliases: [
				"core-concepts",
				"ap-calculus-apc25-infinite-series-curriculum-core-concepts"
			]
		}
	},
	{
		code: "APC26",
		title: "Power Series and Taylor Approximations",
		reading:
			"A Taylor polynomial about a is `P_N(x)=sum from k=0 to N of f^(k)(a)*(x-a)^k/k!`, with `0!=1`. The infinite Taylor series represents f where its remainder tends to 0; convergence of a formal series alone is not that identification. The radius of a power series can be 0 (only the center), infinite (all real inputs), or a finite positive R. In the last case the open interval is (a-R,a+R), and each endpoint must be tested separately. Differentiation and integration term by term preserve the radius inside that interval, not automatic endpoint behavior. Basic Maclaurin series are `1/(1-x)=sum x^n` for abs(x)<1; `e^x=sum x^n/n!`; `sin(x)=sum (-1)^n*x^(2n+1)/(2n+1)!`; `cos(x)=sum (-1)^n*x^(2n)/(2n)!`; `ln(1+x)=sum (-1)^(n+1)*x^n/n`; and `arctan(x)=sum (-1)^n*x^(2n+1)/(2n+1)`. The geometric, exponential, sine, cosine and arctangent sums start at n=0; the logarithm sum starts at n=1. The exponential and trig series converge for all real x. The log and arctangent formulas first follow on abs(x)<1, with endpoints checked separately. If f has continuous derivatives through order N+1 and the absolute (N+1)st derivative is bounded by M between a and x, Taylor error is at most `M*abs(x-a)^(N+1)/(N+1)!`. An applicable alternating-series bound can be sharper.",
		worked: "The cubic Maclaurin polynomial of e^x is `1+x+x^2/2+x^3/6`. At x=0.1 it equals `6631/6000`, about 1.10516667. Using the valid bound `e^t<=6/5` on [0,0.1], the fourth-derivative error bound is `(6/5)*(1/10)^4/24=1/200000`. Thus the approximation is accompanied by a justified error bound, not merely a decimal comparison.",
		problems: [
			"At x=1/3, sum the first four terms of the geometric representation of 1/(1-x). Give its exact infinite value and the omitted tail.",
			"Find the center, radius and complete interval of convergence of `sum (x-2)^n/(n*2^n)` from n=1. Test both endpoints explicitly.",
			"Use the cubic Maclaurin polynomial of ln(1+x) to approximate ln(1.2). Use the alternating remainder bound and determine the direction of the error.",
			"Use the degree-5 Maclaurin polynomial of sin(x) at x=1/2 and bound its error by the next omitted term. Differentiate that polynomial and compare it with the degree-4 cosine polynomial.",
			"Build the degree-2 Taylor polynomial for ln(x) about x=1 and approximate ln(1.1). Bound the error using the third derivative on [1,1.1]."
		],
		published: {
			moduleId:
				"ap-calculus-apc26-infinite-sums-and-representing-infinite-series",
			id: "ap-calculus-apc26-infinite-sums-and-representing-infinite-series-curriculum-infinite-sums-and-representing-infinite-series-core-concepts",
			title: "Infinite Sums and Representing Infinite Series Core Concepts",
			aliases: [
				"core-concepts",
				"ap-calculus-apc26-infinite-sums-and-representing-infinite-series-curriculum-core-concepts"
			]
		}
	},
	{
		code: "APC27",
		title: "Series and Approximation Review",
		reading:
			"A series classification includes the test and its hypotheses; a convergence interval includes separate endpoint conclusions. A finite sum can approximate a function only after identifying the appropriate function series and justifying its convergence there. Error statements need a valid remainder bound, with the first omitted term or derivative order stated. Geometric and telescoping structures can supply exact sums, while an integral test usually settles convergence or bounds rather than giving the exact series sum.",
		worked: "The series `sum (-1)^n*(1/2)^(2n+1)/(2n+1)` from n=0 represents arctan(1/2). Its absolute term ratio tends to 1/4, proving absolute convergence. The first two terms give `1/2-1/24=11/24`; the next term is positive with magnitude 1/160. The alternating bound puts the value between `11/24` and `11/24+1/160`, distinguishing an approximation from an exact equality.",
		problems: [
			"Use the term test for `sum n/(n+1)`, and find the exact sum of `sum 1/[n(n+1)]`, both from n=1. Show a finite partial sum before taking its limit.",
			"Classify `sum 1/[n*(ln(n))^2]` from n=2 using an improper integral. Explain why that integral's value is not automatically the series sum.",
			"For `sum (-1)^n/(2n+1)` from n=0, establish conditional convergence and use the first five terms to bound its limit. Identify the represented arctangent value.",
			"Find the center, radius and complete interval of convergence of `sum (x+1)^n/n^2` from n=1, with endpoint evidence.",
			"Approximate cos(1/2) with its degree-4 Maclaurin polynomial. Give the exact polynomial value, the next-term error bound, and the direction of the error.",
			"Classify `sum n^2/3^n` from n=1 by the ratio test. Contrast that conclusion with a ratio limit of 1 for `sum 1/n^2`."
		],
		published: {
			moduleId:
				"ap-calculus-apc27-infinite-sequences-and-series-topic-review",
			id: "ap-calculus-apc27-infinite-sequences-and-series-topic-review-curriculum-infinite-sequences-and-series-topic-review-core-concepts",
			title: "Infinite Sequences and Series Topic Review Core Concepts",
			aliases: [
				"core-concepts",
				"ap-calculus-apc27-infinite-sequences-and-series-topic-review-curriculum-core-concepts"
			]
		}
	}
];
export const apCalculusPortfolios = [
	{
		code: "APC22",
		track: "AB",
		title: "AP Calculus AB Exam Readiness Portfolio",
		guideTitle: "APC22 AB Readiness Portfolio",
		problems: [
			"Find the limit of `(x^2+x-6)/(x-2)` as x approaches 2, with a justified algebraic rewrite.",
			"For `h(x)=sin(x^2)` in radians, find h' and evaluate it at x=sqrt(pi).",
			"A rectangle has perimeter 28 m. Find its maximum area and dimensions, including boundary comparison.",
			"Let `F(x)=integral from 1 to x^3 of (t^2+1) dt`. Find F' and its value at x=1.",
			"Solve `y'=4xy`, y(0)=2, and verify the solution.",
			"Find the area enclosed by y=3x and y=x^2. Use graphing technology to check the intersections, then give the analytical setup and exact answer."
		],
		rubric: [
			"Retain one corrected entry from each AB strand: limits/continuity, differentiation, derivative applications, integration, differential equations and integration applications.",
			"For each entry, identify the representation and the rule or theorem with its relevant hypotheses, show the calculation, and state a conclusion with domains or units.",
			"Complete the six-question mixed set, recording a time limit before starting and the actual elapsed time. Use no calculator for 1–5; use graphing technology to check 6.",
			"Use the answer reasoning to classify and repair every missed step as concept, setup, calculation, justification or communication. A final answer alone does not satisfy the reasoning criterion.",
			"Name three specific review actions from that evidence and record whether the route ends at AB or continues with APC23–APC27 for BC. This course checklist is not an official AP exam score."
		]
	},
	{
		code: "APC27",
		track: "BC",
		title: "AP Calculus BC Exam Readiness Portfolio",
		guideTitle: "APC27 BC Readiness Portfolio",
		problems: [
			"For `r(t)=(t^2,t^3)`, find the graph slope, second x-derivative, velocity, speed and acceleration at t=2.",
			"Find the area enclosed by `r=3cos(theta)` on `[-pi/2,pi/2]`, checking its trace with graphing technology and using an exact integral.",
			"Classify `sum (2/5)^n` from n=0 and `sum (-1)^(n+1)/sqrt(n)` from n=1. Give the geometric sum and justify the second classification.",
			"Find the center, radius and full interval of convergence of `sum (x-1)^n/n` from n=1.",
			"Use the degree-2 Maclaurin polynomial for e^x to approximate e^(0.1). For an error bound, the valid bound `e^t<=6/5` on [0,0.1] may be used.",
			"Evaluate the integral of `x*e^x` on [0,1] by parts and the improper integral of `1/x^3` on [1,infinity). Then use two Euler steps of size 1/2 for `y'=y`, y(0)=1, to estimate y(1)."
		],
		rubric: [
			"Retain the AB portfolio or one corrected item from every AB strand, then add parametric/vector, polar, convergence and power/Taylor-series evidence.",
			"Identify the parameter, angle, domain or interval and representation-specific formula before each calculation. Series evidence includes test hypotheses, endpoint behavior and a valid error bound where requested.",
			"Complete the six-question BC mixed set with a time limit recorded before starting. Use graphing technology for 2 and show analytical work for every item.",
			"Check earlier BC methods as well as the final representation and series units: integration by parts, partial fractions, improper integrals, Euler steps, logistic models and arc length.",
			"Repair each missed step and choose one AB dependency and one BC-specific review target. This local portfolio review does not assign an official AP exam score."
		]
	}
];
export const apCalculusRootExtension = {
	title: "APC25 Root Test Extension",
	reading:
		"When `L=lim abs(a_n)^(1/n)` exists, the root test proves absolute convergence for L<1 and divergence for L>1; L=1 is inconclusive. This additional method is an optional extension.",
	problem:
		"Apply the root test to `sum [n/(2n+1)]^n` from n=1. State the nth-root limit and the resulting classification."
};

function numbered(items: string[]) {
	return items.map((item, index) => `${index + 1}. ${item}`).join("\n");
}

function selfCheck(heading: string) {
	return `[Check answers and reasoning](${courseAssetViewerUrl(
		`/course-assets/ap-calculus/practice-checks-v1.md#${slugMarkdownHeading(heading)}`,
		`${heading} self-check`
	)})`;
}

export function addAPCalculusCases(course: RawCourse, source: RawCourse) {
	for (const unit of apCalculusCases) {
		const module = requireCalculusBinding(
			course.modules,
			candidate => candidate.title.startsWith(`${unit.code} `),
			unit.code
		);
		const original = requireCalculusModule(source, module.title);
		const path = requireCalculusBinding(
			original.curriculum,

			item => item.title === "Concept Path",
			`${unit.code} concept path`
		);
		const reasoning = requireCalculusBinding(
			original.curriculum,

			item => item.title === "Worked Reasoning Map",
			`${unit.code} reasoning`
		);
		const assignment = requireCalculusBinding(
			original.curriculum,

			item => item.title === "Module Problem Set",
			`${unit.code} assignment`
		);
		const reading = requireCalculusBinding(
			module.curriculum,

			item => item.title === unit.published.title,
			`${unit.code} reading`
		);
		retainCalculusSources(
			"ap-calculus",
			module,
			reading,
			[path, reasoning],
			"reading"
		);
		reading.learningPath = "core";
		reading.aliases = [
			...new Set([...(reading.aliases ?? []), ...unit.published.aliases])
		];
		reading.content += `\n\n**Methods and definitions:**\n\n${unit.reading}\n\n**Worked example:**\n\n${unit.worked}`;
		const moduleId = module.id;
		if (
			moduleId !== unit.published.moduleId ||
			reading.id !== unit.published.id
		) {
			throw new Error(
				`Unexpected AP Calculus identity for ${unit.code}.`
			);
		}
		const route =
			typeof unit.bcFrom === "number"
				? `AB route: problems 1–${unit.bcFrom - 1}. BC route: all problems.\n\n`
				: "";
		const practice: RawCourseModuleItem = {
			id: `${moduleId}-curriculum-practice-${unit.code.toLowerCase()}`,
			title: `Practice: ${unit.title}`,
			learningPath: "core",
			content: ""
		};
		retainCalculusSources(
			"ap-calculus",
			module,
			practice,
			[assignment],
			"assignment"
		);
		practice.content += `\n\n${route}**Problems:**\n\n${numbered(unit.problems)}\n\n${selfCheck(`${unit.code} ${unit.title}`)}`;
		module.curriculum.push(practice);
		const portfolio = apCalculusPortfolios.find(
			item => item.code === unit.code
		);
		if (portfolio) {
			const authored = requireCalculusBinding(
				original.curriculum,

				item => item.title === portfolio.title,
				`${unit.code} portfolio`
			);
			const project: RawCourseModuleItem = {
				...authored,
				learningPath: "core"
			};
			retainCalculusSources(
				"ap-calculus",
				module,
				project,
				[authored],
				"assignment"
			);
			project.aliases = [
				...new Set([
					...(project.aliases ?? []),
					portfolio.title,
					`${moduleId}-curriculum-portfolio-${portfolio.track.toLowerCase()}`
				])
			];
			project.content += `\n\n**Mixed set:**\n\n${numbered(portfolio.problems)}\n\n**Portfolio rubric:**\n\n${numbered(portfolio.rubric)}\n\n${selfCheck(portfolio.guideTitle)}`;
			module.curriculum.push(project);
		}
		if (unit.code === "APC25") {
			const challenge = requireCalculusBinding(
				module.supplementalProjects,

				item => item.title === "APC25 AP Practice Plan",
				"APC25 optional series challenge"
			);
			challenge.preserveInstructions = true;
			challenge.content += `\n\n**Optional root test:**\n\n${apCalculusRootExtension.reading}\n\n${apCalculusRootExtension.problem}\n\n${selfCheck(apCalculusRootExtension.title)}`;
		}
	}
}
