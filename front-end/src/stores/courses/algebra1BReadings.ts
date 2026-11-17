import type { RawCourse } from "./types";
import { applyAuthoredAlgebraMethods } from "./algebra1Readings";
import {
	groupAlgebraReadings,
	preserveAlgebraSourceItems,
	requireAlgebraCourse,
	requireAlgebraModule
} from "./algebraBaselineBindings";

export const algebra1BReadingMethods = [
	{
		moduleTitle: "AB1 Introduction to Polynomials",
		target: "Polynomial Vocabulary and Simplifying Like Terms",
		method: "A polynomial is a finite sum of terms with nonnegative integer powers of its variables. A coefficient multiplies the variable part; like terms have exactly the same variables and exponents. In one variable, write descending powers to identify the leading term and its coefficient. A nonzero constant has degree 0; the zero polynomial has no defined degree here. For a multivariable term, add its exponents to find total degree.",
		worked: "In 4x^4-3x^3+2x+20, the degree is 4 and the leading coefficient is 4. Combining 3x^3+10x^2-3x^2-10y^2 gives 3x^3+7x^2-10y^2; the y^2 term does not combine with x^2. The term 5/z=5z^(-1) has a negative variable exponent and lies outside this polynomial definition."
	},
	{
		moduleTitle: "AB1 Introduction to Polynomials",
		target: "Adding and Subtracting Polynomials",
		method: "Remove parentheses by distributing any preceding sign to every term. Collect matching variable powers, add their coefficients and retain the variable part. A subtraction changes every sign in the polynomial being subtracted. Evaluate the original and simplified forms at a test input to check the arithmetic.",
		worked: "(12x^2-13x+6)-(3x^2-8x+5)=12x^2-13x+6-3x^2+8x-5=9x^2-5x+1. At x=1 the original difference is 5-0=5 and the simplified form is 9-5+1=5."
	},
	{
		moduleTitle: "AB2 Multiplying Polynomials",
		target: "Multiplying by Constants and Single Terms",
		method: "Distribute the multiplier to every term. Multiply coefficients and add exponents when multiplying powers of the same variable: x^m×x^n=x^(m+n). Keep signs with their coefficients and combine like terms only after all products are written. An area model additionally requires valid nonnegative lengths.",
		worked: "9y(2y^2-5)=(9×2)y^(1+2)-45y=18y^3-45y. For rectangle sides 3x+5 and 2x+3, distribution gives 6x^2+9x+10x+15=6x^2+19x+15, for inputs making both lengths positive."
	},
	{
		moduleTitle: "AB2 Multiplying Polynomials",
		target: "FOIL and Special Binomials",
		method: "Multiply every term of the first binomial by every term of the second. FOIL names the four resulting products; it is the distributive law. The identities (a+b)^2=a^2+2ab+b^2 and (a-b)(a+b)=a^2-b^2 follow from combining the middle products. A binomial square generally includes a middle term.",
		worked: "(z-3)(2z+4)=2z^2+4z-6z-12=2z^2-2z-12. Also (x-7)^2=x^2-7x-7x+49=x^2-14x+49; the two cross-products account for the middle term."
	},
	{
		moduleTitle: "AB2 Multiplying Polynomials",
		target: "Complex Polynomial Multiplication",
		method: "For longer polynomial products, distribute each whole term across the other polynomial, then collect equal powers. With m terms in one factor and n in the other, record m×n partial products before combining. A missing power has coefficient zero; keep its place when organizing columns.",
		worked: "(x^2-2x+9)(2x+1) gives 2x^3+x^2-4x^2-2x+18x+9. Combining like powers yields 2x^3-3x^2+16x+9. At x=0 both the original product and expansion equal 9, checking the constant term."
	},
	{
		moduleTitle: "AB3 Fractions with Polynomials",
		target: "Fractions Warm-Up and Least Common Denominators",
		method: "A fraction requires a nonzero denominator. Factor each denominator and choose a common multiple containing every required factor to its highest power. Multiply numerator and denominator by the same missing factor before adding or subtracting numerators. Restrictions from every original denominator remain even if a factor later cancels.",
		worked: "For x/2-5/x^2 with x!=0, use denominator 2x^2: x/2=x^3/(2x^2) and 5/x^2=10/(2x^2), giving (x^3-10)/(2x^2). At x=2 the original value is 1-5/4=-1/4, matching (8-10)/8."
	},
	{
		moduleTitle: "AB3 Fractions with Polynomials",
		target: "Fractions with Polynomial Denominators",
		method: "Factor polynomial denominators first and list their excluded inputs. Build a common denominator, scale each entire numerator, and distribute any subtraction across its whole numerator. Simplify only after combining; cancellation removes common multiplicative factors, not separate added terms.",
		worked: "For (x-3)/(x+2)+(x+3)/(x-4), exclude x=-2 and x=4. The common numerator is (x-3)(x-4)+(x+3)(x+2)=(x^2-7x+12)+(x^2+5x+6)=2x^2-2x+18. Divide by (x+2)(x-4), retaining both original exclusions."
	},
	{
		moduleTitle: "AB5 Solving Quadratics by Factoring",
		target: "Simple Polynomial Factoring",
		method: "Factoring reverses distribution. Find the greatest common numerical factor and the lowest shared power of each variable, divide every term by that common factor, and write the resulting expression as a product. Multiply the factors back out to check that no term or sign was lost.",
		worked: "In 8x^3-12x^2, both terms contain 4x^2, giving 4x^2(2x-3). Expanding produces 8x^3-12x^2 again. Dividing an equation by x^2 instead would require checking x=0 separately, because division by a variable expression can remove solutions."
	},
	{
		moduleTitle: "AB5 Solving Quadratics by Factoring",
		target: "Factoring Quadratics and Solving by Factoring",
		method: "Write the equation as a product equal to zero. A product is zero only when at least one factor is zero. For x^2+bx+c, seek two numbers whose sum is b and product is c. Remove any common factor first, set each variable factor equal to zero and check every root in the original equation and its context.",
		worked: "5x^2-20x+15=0 becomes 5(x^2-4x+3)=5(x-1)(x-3)=0, since -1 and -3 sum to -4 and multiply to 3. The roots are 1 and 3. Each makes the original polynomial zero; the constant factor 5 contributes no root."
	},
	{
		moduleTitle: "AB6 Special Factorizations",
		target: "Perfect Squares and Difference of Squares",
		method: "Recognize a^2-b^2=(a-b)(a+b) and a^2 plus or minus 2ab+b^2=(a plus or minus b)^2. For a perfect square, both outer terms must be squares and the middle term must be twice the product of their roots, with the correct sign. Remove a common factor before selecting an identity.",
		worked: "4t^2-16t+16 has roots of its outer terms 2t and 4, with middle term -2(2t)(4)=-16t, so it equals (2t-4)^2. Separately, x^3+6x^2+9x=x(x^2+6x+9)=x(x+3)^2. Expanding each result verifies all terms."
	},
	{
		moduleTitle: "AB7 Solving Quadratics by Completing the Square",
		target: "Completing the Square",
		method: "For ax^2+bx+c=0 with a!=0, divide by a before completing the square. Move the constant, then add (half the x-coefficient)^2 to both sides. Rewrite the trinomial as a square and use both real square-root branches when the other side is positive. A negative square value gives no real solution.",
		worked: "x^2-10x-24=0 becomes x^2-10x=24. Add (-10/2)^2=25 to both sides: (x-5)^2=49. Thus x-5=7 or -7, giving x=12 or -2. Substitution gives 144-120-24=0 and 4+20-24=0."
	},
	{
		moduleTitle: "AB8 Quadratic Formula",
		target: "Quadratic Formula Review",
		method: "First write ax^2+bx+c=0 with a!=0 and retain each coefficient's sign. Compute D=b^2-4ac. For real coefficients, D>0 gives two real roots, D=0 one repeated real root and D<0 no real roots. Use x=(-b plus or minus sqrt(D))/(2a), with the entire numerator divided by 2a. Context restrictions determine which algebraic roots are usable.",
		worked: "For 5t^2-12t-9=0, a=5, b=-12 and c=-9 give D=144+180=324. The roots are (12+18)/10=3 and (12-18)/10=-3/5. Both solve the polynomial; if t is elapsed time starting at zero, only the nonnegative root belongs to that model."
	},
	{
		moduleTitle: "AB10 Graphing Vertex Form",
		target: "Graphing from Vertex Form",
		method: "For y=a(x-h)^2+k with a!=0, the vertex is (h,k) and the symmetry axis is x=h. Positive a opens upward; negative a opens downward. Compared at the same horizontal distance from the vertex, larger abs(a) gives larger vertical displacement. Substitute symmetric inputs to locate checked points before sketching the parabola.",
		worked: "For y=1.5(x-30)^2+3, the vertex is (30,3). At x=29 and x=31, y=1.5(1)+3=4.5, giving symmetric points (29,4.5) and (31,4.5). The minimum is 3 on the unrestricted real domain because a>0 and a square is nonnegative."
	},
	{
		moduleTitle: "AB11 Graphing Standard Form",
		target: "From Standard Form Back to Structure",
		method: "For y=ax^2+bx+c with a!=0, the vertex input is h=-b/(2a); substitute it to find k. The y-intercept is (0,c). Find real x-intercepts by solving the equation with y=0. Completing the square or expanding vertex form verifies that the two representations describe the same function.",
		worked: "For y=1.5x^2-90x+1353, h=90/3=30 and k=1.5(900)-2700+1353=3. Expanding 1.5(x-30)^2+3 gives 1.5x^2-90x+1353. Its minimum value is 3, so this unrestricted graph has no real x-intercept."
	},
	{
		moduleTitle: "AB12 Transformations",
		target: "Shifts, Reflections, and Stretches",
		method: "For y=f(x), f(x-h)+k shifts the graph right h and up k; f(-x) reflects across the y-axis and -f(x) across the x-axis. Multiplying the entire output by a scales every output term, including any constant. State the order when combining transformations and check a reference point after each change.",
		worked: "Starting with f(x)=x^2-3, a vertical scale of 1/4 gives (1/4)f(x)=x^2/4-3/4. For f(x)=(x-1)^2+2, y-axis reflection gives f(-x)=(-x-1)^2+2=(x+1)^2+2; its vertex changes from (1,2) to (-1,2)."
	},
	{
		moduleTitle: "AB14 Introduction to Functions",
		target: "Function Definitions and Notation",
		method: "A function assigns exactly one output to each allowed input. Its domain lists permitted inputs and its range lists outputs actually reached. To evaluate f(a), substitute a for every input occurrence, retaining parentheses. A graph represents y as a function of x when each vertical line meets it at most once. A context can restrict an otherwise valid algebraic domain.",
		worked: "For C(h)=175h+50 with h>=0 hours, C(4)=175(4)+50=750 calories in this classroom model. The domain is [0,infinity) and the range is [50,infinity). The relation containing both (2,3) and (2,5) does not assign one output to input 2, so it is not a function of that input."
	},
	{
		moduleTitle: "AB14 Introduction to Functions",
		target: "Function Behavior from a Graph",
		method: "Read a graph from left to right to identify increasing, decreasing or constant intervals. State intervals using input values; an extremum includes both its input and output. Absolute extrema compare the whole stated domain, while local extrema compare nearby inputs. A domain restriction can change the range and whether an extremum is attained.",
		worked: "For f(x)=0.5(x-3)^2 on all real x, the square is minimized at x=3, giving the absolute minimum (3,0), range [0,infinity), decrease on (-infinity,3) and increase on (3,infinity). Restricting the domain to x>=5 instead gives minimum f(5)=2 and range [2,infinity)."
	},
	{
		moduleTitle: "AB15 Function Composition and Inverse Functions",
		target: "Composition",
		method: "Evaluate (f composed with g)(x)=f(g(x)) from the inner function outward. The input must lie in g's domain and its output must lie in f's domain. Reversing the order generally changes the result. For price models, restrict inputs so each intermediate price obeys the stated discount assumptions.",
		worked: "With sale f(p)=0.9p and coupon c(p)=p-2, a 20-dollar price gives f(c(20))=0.9(18)=16.20 dollars, while c(f(20))=18-2=16 dollars. Requiring nonnegative intermediate and final prices gives p>=2 for coupon-then-sale and p>=20/9 for sale-then-coupon."
	},
	{
		moduleTitle: "AB15 Function Composition and Inverse Functions",
		target: "Inverse Functions",
		method: "An inverse function reverses an input-output pairing. A function must be one-to-one on its chosen domain to have an inverse function. Write y=f(x), solve for x and exchange the input/output names. The inverse's domain is the original range. Check both compositions on their respective domains; the notation f^(-1) denotes this inverse.",
		worked: "For F(C)=9C/5+32, solve C=5(F-32)/9. Then applying the inverse to 9C/5+32 gives C, and applying F to 5(F-32)/9 gives F. The function x^2 is not one-to-one on all real inputs; on x>=0 it has inverse sqrt(x), also with nonnegative domain and range."
	},
	{
		moduleTitle: "AB17 Absolute Value and Exponential Functions",
		target: "Absolute Value Equations",
		method: "Absolute value is distance from zero. Isolate abs(u) before solving. If abs(u)=b with b>0, solve u=b and u=-b; b=0 needs only u=0, while b<0 has no real solution. A coefficient outside the absolute value must be undone before choosing branches. Verify all candidates in the original equation.",
		worked: "For -3abs(2x-1)+2=-1, subtract 2 and divide by -3 to obtain abs(2x-1)=1. The branches 2x-1=1 and 2x-1=-1 give x=1 and x=0. Both original left sides are -1."
	},
	{
		moduleTitle: "AB17 Absolute Value and Exponential Functions",
		target: "Absolute Value Graph Gallery",
		method: "The graph y=a abs(x-h)+k with a!=0 has vertex (h,k). It opens upward for a>0 and downward for a<0. Its two linear arms have slopes -a and a. Obtain a sketch by plotting the vertex and a pair of equally spaced inputs on either side; range follows from the opening direction and vertex height.",
		worked: "For y=2abs(x-3)-1, the vertex is (3,-1). Inputs 2 and 4 both give 1, so the arms pass through (2,1) and (4,1). The domain is all real numbers and the range is [-1,infinity)."
	},
	{
		moduleTitle: "AB17 Absolute Value and Exponential Functions",
		target: "More Absolute Value Transformations",
		method: "Factor the inner expression to identify an absolute-value graph's shift, using abs(cu)=abs(c)abs(u). A negative outer coefficient reflects the graph vertically; a positive input factor changes its width. Evaluate a vertex and one point on each side to check a combined transformation.",
		worked: "-abs(0.5x+5)+4=-0.5abs(x+10)+4, so the vertex is (-10,4) and the graph opens downward. At x=-12 and x=-8, the output is 3. Its maximum is 4 and its unrestricted range is (-infinity,4]."
	},
	{
		moduleTitle: "AB17 Absolute Value and Exponential Functions",
		target: "Piecewise-Style Absolute Value Example",
		method: "Rewrite abs(u) as u when u>=0 and -u when u<0. For a sum of absolute values, locate every input where an inner expression is zero and use those breakpoints to form intervals. Simplify separately on each interval and check the boundary values. The result describes the same function without absolute-value bars.",
		worked: "For abs(x+3)+abs(x-2), the breakpoints are -3 and 2. The rule is -2x-1 for x<-3, 5 for -3<=x<=2, and 2x+1 for x>2. Both boundaries give 5, while x=-4 and x=3 give 7. Thus the minimum 5 occurs throughout [-3,2]."
	},
	{
		moduleTitle: "AB17 Absolute Value and Exponential Functions",
		target: "Exponential Functions and Growth/Decay",
		method: "In A b^t with A>0, b>1 gives growth and 0<b<1 gives decay. A percent increase r uses b=1+r; a percent decrease r uses b=1-r, with r written as a decimal. The time step must match the rate period. To estimate an exponent before logarithms are introduced, bracket it between known powers, then test decimal inputs with a calculator or graph.",
		worked: "For 2^x=6, 2^2=4 and 2^3=8 give 2<x<3. Testing 2.58 and 2.59 gives approximately 5.98 and 6.02, bracketing the root near 2.585. A weekly 12% growth model starting at 0.4 grams gives 0.4(1.12)^6 approximately 0.790 grams after six weeks."
	},
	{
		moduleTitle: "AB18 Direct and Inverse Variation",
		target: "Direct Variation",
		method: "Direct variation has form y=kx, so y/x is constant wherever x!=0. Find k from a supplied nonzero input-output pair, then substitute it into the model to predict other values. A direct-variation line passes through the origin; a nonzero additive offset describes a different relationship. Preserve the units of the proportionality constant.",
		worked: "If y=35 at x=-5, k=35/(-5)=-7, giving y=-7x. Substitution at x=-5 returns 35. If 42 cookies require 3.5 cups of sugar, k=3.5/42=1/12 cup per cookie, so 150 cookies require 150/12=12.5 cups."
	},
	{
		moduleTitle: "AB18 Direct and Inverse Variation",
		target: "Inverse Variation",
		method: "Inverse variation has form y=k/x with x!=0, so the product xy stays constant. Find k from one pair and solve using the same product at a second input. A rate-time model assumes the total work or distance stays fixed; convert units before finding the product. Doubling a nonzero input halves the output in this model.",
		worked: "For x=6 and y=5, k=30. If y becomes 3, x=30/3=10. A pool filled at 6 liters per minute for 7 hours has volume 6×420=2520 liters. At 4 liters per minute, time is 2520/4=630 minutes=10.5 hours."
	}
] as const;

export function applyAlgebra1BReadings(course: RawCourse) {
	requireAlgebraCourse(course, "algebra-1b");
	preserveAlgebraSourceItems(course, "algebra-1b");
	applyAuthoredAlgebraMethods(course, algebra1BReadingMethods);
	const module = requireAlgebraModule(course, "AB2 Multiplying Polynomials");
	groupAlgebraReadings(
		module,
		"algebra-1b",
		algebra1BReadingMethods
			.filter(entry => entry.moduleTitle === module.title)
			.map(entry => entry.target),
		"Multiplying Polynomials Core Concepts"
	);
	for (const unit of course.modules) {
		for (const item of unit.curriculum) {
			if (
				item.title === "Photon Count Graph and Modeling Notes" ||
				(unit.title === "Check-In #1" &&
					item.title === "Review Targets")
			) {
				item.contentKind = "reading";
				item.preserveAssignment = true;
			}
		}
	}
}
