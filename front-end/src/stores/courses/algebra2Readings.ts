import type { RawCourse } from "./types";
import {
	groupAlgebraReadings,
	preserveAlgebraSourceItems,
	requireAlgebraCourse,
	requireAlgebraItem,
	requireAlgebraModule
} from "./algebraBaselineBindings";

export const algebra2ReadingMethods = [
	{
		moduleTitle: "ALA1 Complex Numbers",
		target: "Imaginary Numbers and Powers of i",
		methods:
			"The imaginary unit satisfies i^2=-1. For real a>=0, the principal complex square root of -a is i×sqrt(a); solving z^2=-a also permits its negative. For a nonnegative integer exponent n, write n=4q+r with 0<=r<4 and use i^n=i^r. The real-number product rule for square roots cannot be applied freely to two negative radicands.",
		worked: "i^118=i^(4×29+2)=i^2=-1. Also sqrt(-12)=2sqrt(3)i. The product sqrt(-4)×sqrt(-9)=(2i)(3i)=-6, whereas sqrt((-4)(-9))=sqrt(36)=6; combining those two complex radicals with the real product rule changes the value.",
		courseId: "algebra-2a"
	},
	{
		moduleTitle: "ALA1 Complex Numbers",
		target: "The Complex Plane",
		methods:
			"For real a,b, the complex number a+bi corresponds to the point (a,b). Its modulus is sqrt(a^2+b^2), and its conjugate is a-bi. The distance between a+bi and c+di is sqrt((a-c)^2+(b-d)^2). A horizontal and a vertical segment form the perpendicular base and height of a right triangle on this plane.",
		worked: "The points 2-4i and 7+3i differ by 5 horizontally and 7 vertically, so their distance is sqrt(25+49)=sqrt(74). The triangle with vertices (-3,-2),(5,4),(5,-2) has perpendicular legs 8 and 6, giving area 8×6/2=24.",
		courseId: "algebra-2a"
	},
	{
		moduleTitle: "ALA1 Complex Numbers",
		target: "Operations with Complex Numbers",
		methods:
			"Combine real and imaginary parts separately for addition. Distribute products and replace i^2 by -1. For division by c+di, multiply numerator and denominator by c-di; c and d are real and cannot both be zero. The denominator becomes c^2+d^2. Thus (a+bi)/(c+di)=((ac+bd)+(bc-ad)i)/(c^2+d^2).",
		worked: "(3+2i)/(1-i)=((3+2i)(1+i))/((1-i)(1+i))=(1+5i)/2. Multiplying (1/2+5i/2)(1-i) gives 3+2i, checking the quotient against the original numerator.",
		courseId: "algebra-2a"
	},
	{
		moduleTitle: "ALA2 Quadratic Functions",
		target: "Factoring Quadratics and Solving for Zeros",
		methods:
			"For ax^2+bx+c=0 with a!=0, first remove a common factor if possible. To factor using integers, find two integers whose product is ac and whose sum is b, split the middle term and group. If a product of factors is zero, at least one factor is zero. A repeated factor gives a repeated root. Algebraic roots and physically permitted values are checked separately.",
		worked: "For 2x^2-7x-4, the numbers -8 and 1 multiply to -8 and add to -7. Rewrite 2x^2-8x+x-4=2x(x-4)+(x-4)=(2x+1)(x-4), so x=-1/2 or x=4. Substitution makes the original polynomial zero at each root.",
		courseId: "algebra-2a"
	},
	{
		moduleTitle: "ALA2 Quadratic Functions",
		target: "Completing the Square and the Quadratic Formula",
		methods:
			"Divide a quadratic equation by its nonzero leading coefficient before completing the square. For x^2+px=q, add (p/2)^2 to both sides to obtain (x+p/2)^2=q+(p/2)^2. The quadratic formula for ax^2+bx+c=0 is x=(-b plus or minus sqrt(b^2-4ac))/(2a). With real coefficients, discriminant D>0 gives two distinct real roots, D=0 a repeated real root and D<0 a complex-conjugate pair.",
		worked: "x^2+4x-1=0 becomes x^2+4x=1, then (x+2)^2=5, so x=-2 plus or minus sqrt(5). The quadratic formula uses D=4^2-4(1)(-1)=20 and gives the same result. For x^2-x+10=0, D=-39, giving (1 plus or minus i sqrt(39))/2.",
		courseId: "algebra-2a"
	},
	{
		moduleTitle: "ALA3 Graphing Quadratic Functions",
		target: "Vertex Form, Standard Form, and Intercept Form",
		methods:
			"A quadratic has nonzero a. In standard form ax^2+bx+c, its vertex input is h=-b/(2a), its vertex height is k=f(h), its symmetry line is x=h and its y-intercept is c. Completing the square produces a(x-h)^2+k. Factoring produces a(x-r)(x-s) when the roots are available; only real roots appear as x-intercepts on the real coordinate plane.",
		worked: "2x^2+8x+5=2(x^2+4x)+5=2((x+2)^2-4)+5=2(x+2)^2-3. The vertex is (-2,-3), the axis is x=-2, the y-intercept is 5 and the parabola opens upward. Setting the vertex form equal to zero gives roots -2 plus or minus sqrt(3/2).",
		courseId: "algebra-2a"
	},
	{
		moduleTitle: "ALA3 Graphing Quadratic Functions",
		target: "Applications and Parabola Geometry",
		methods:
			"Use t=-b/(2a) for the vertex time of at^2+bt+c, then substitute to find height. A physical interpretation also needs a time interval and a height reference. For a vertical-axis parabola (x-h)^2=4p(y-k), p!=0, the vertex is (h,k), focus (h,k+p) and directrix y=k-p. The formula expresses equal distance from the focus and the directrix.",
		worked: "Focus (2,3) and directrix y=1 place the vertex halfway between them at (2,2), with p=1. Therefore (x-2)^2=4(y-2), or y=x^2/4-x+3. For h(t)=-4t^2+36t-72 on 3<=t<=6, the vertex time is 4.5 seconds and h(4.5)=9 feet.",
		courseId: "algebra-2a"
	},
	{
		moduleTitle: "ALA4 Higher Degree Polynomials",
		target: "Transformations and the Location Principle",
		methods:
			"A polynomial is continuous at every real input. If f(a) and f(b) have opposite signs for a<b, at least one real zero lies strictly between them. The conclusion does not give an exact root or prove there is only one. Equal endpoint signs do not rule out roots inside the interval. For transformations, reflection across the y-axis replaces x by -x; reflection across the x-axis negates the output.",
		worked: "For f(x)=2x^5-2x^2-9, f(1)=-9 and f(2)=47, so a real root lies in (1,2). By contrast, x^2-1 has value 3 at both -2 and 2 yet has roots -1 and 1 between them. Endpoint signs provide a sufficient sign-change test, not a complete root count.",
		courseId: "algebra-2a"
	},
	{
		moduleTitle: "ALA5 Polynomial Division",
		target: "Long Division and Synthetic Division",
		methods:
			"Arrange all powers in descending order, including zero coefficients. Divide leading terms, multiply the divisor by that quotient term, subtract and repeat until the remainder degree is smaller than the divisor degree. The check is dividend=divisor×quotient+remainder. Synthetic division uses the coefficients and c for a divisor x-c. The rational quotient still excludes zeros of the original divisor.",
		worked: "For (x^3+6x^2+9x+2)/(x+2), use c=-2 and coefficients 1,6,9,2. Bring down 1; multiply by -2 and add to 6 to get 4; multiply 4 by -2 and add to 9 to get 1; multiply 1 by -2 and add to 2 to get remainder 0. The quotient is x^2+4x+1, and (x+2)(x^2+4x+1) reconstructs the dividend. The original quotient requires x!=-2.",
		courseId: "algebra-2a"
	},
	{
		moduleTitle: "ALA6 Zeros of Polynomials",
		target: "Rational Root Theorem, Descartes, and Bounds",
		methods:
			"For an integer-coefficient polynomial with nonzero leading and constant coefficients, a rational zero p/q in lowest terms has p dividing the constant term and q dividing the leading coefficient. Test candidates by substitution or synthetic division. Descartes counts positive real roots by sign changes in f(x), and negative real roots by sign changes in f(-x), subtracting an even number from each count and counting multiplicity. A degree-n nonconstant polynomial has n complex roots counted with multiplicity. The bound 1+max(abs(a_k/a_n)) over the nonleading coefficients bounds the modulus of every complex root; its real roots lie within the corresponding symmetric interval.",
		worked: "For 2x^3-2x^2-20x-16, the coefficient-ratio bound is 1+10=11. Testing candidates gives 2(x+2)(x+1)(x-4), with roots -2,-1,4. There is one sign change in f(x) and two in f(-x), agreeing with one positive and two negative roots. The quartic x^4-9x^2+4x+12=(x+3)(x+1)(x-2)^2 has three distinct zeros but four roots counted with multiplicity.",
		courseId: "algebra-2a"
	},
	{
		moduleTitle: "ALA7 Graphing Polynomials",
		target: "End Behavior, Turning Points, and Multiplicity",
		methods:
			"For large positive or negative x, the leading nonzero term determines polynomial end behavior. A degree-n polynomial has at most n-1 turning points. A root with odd multiplicity changes the sign of the polynomial; even multiplicity preserves the sign near that root. Turning-point coordinates alone do not generally determine a global range: a full formula or sufficient global behavior is needed.",
		worked: "For f(x)=(3/2)(x^2-1)^2+1/2, the square is nonnegative, so the minimum is 1/2, attained at x=-1 and x=1. The range is [1/2,infinity), with a local maximum at (0,2) between those minima. Its degree is 4 and it has three turning points, meeting the upper bound of 4-1.",
		courseId: "algebra-2a"
	},
	{
		moduleTitle: "ALA7 Graphing Polynomials",
		target: "Feature-Based Graphing",
		methods:
			"Start with factors for the required roots, then use a known nonzero function value to find the scale factor. Verify every stated intercept and end behavior against the resulting formula. Roots and one intercept determine the scale of a chosen factored model but do not by themselves certify arbitrary turning-point claims.",
		worked: "Choose f(x)=a(x+2)(x-1)(x-6). Since f(0)=12a=3, a=1/4. This cubic crosses at -2,1,6 and rises to the right. Its local maximum is at (-2/3,100/27), approximately (-0.67,3.70), and its local minimum is (4,-9). Those features belong to the same concrete function.",
		courseId: "algebra-2a"
	},
	{
		moduleTitle: "ALA8 Rational Functions",
		target: "Asymptotes and Removable Discontinuities",
		methods:
			"For a rational function P(x)/Q(x), first retain all original exclusions Q(x)=0. After full factor cancellation, a remaining denominator zero gives a vertical asymptote; an original excluded input with a finite simplified value gives a hole at that value. Horizontal asymptotes describe behavior as x tends to positive or negative infinity and can be crossed. Polynomial division gives a linear slant asymptote when the numerator degree is exactly one higher than the denominator degree.",
		worked: "f(x)=x/(x^2+1) approaches y=0 as x tends to either infinity but crosses that horizontal asymptote at (0,0). Also (x^2+1)/(x-1)=x+1+2/(x-1), so y=x+1 is a slant asymptote and x=1 a vertical asymptote. In (x+3)(x-9)/(x+3), the hole is (-3,-12), because the original input remains excluded.",
		courseId: "algebra-2a"
	},
	{
		moduleTitle: "ALA9 Rational Function Operations",
		target: "Adding, Subtracting, and Solving Rational Equations",
		methods:
			"For an equation involving rational expressions, record every original denominator exclusion before multiplying through by a least common denominator. Multiply every term by that denominator, solve the resulting equation, then substitute candidates in the original expression. Clearing a denominator is reversible only at allowed inputs.",
		worked: "For (x-3)/(x+3)=(x+2)/(x-1), exclude x=-3 and x=1. Multiplication gives (x-3)(x-1)=(x+2)(x+3), or x^2-4x+3=x^2+5x+6. Thus -9x=3 and x=-1/3, which is allowed and satisfies the original equation.",
		courseId: "algebra-2a"
	},
	{
		moduleTitle: "ALA10 Radical Functions",
		target: "Solving Radical Equations",
		methods:
			"For real square roots, impose nonnegative radicands and remember that the principal root is nonnegative. Isolate a radical before squaring; an isolated nonnegative root also imposes a sign condition on the other side. Squaring can introduce candidates, so substitute in the unsquared equation. Odd real roots accept negative inputs.",
		worked: "Rewrite sqrt(x+1)=sqrt(2x)-1 as sqrt(2x)=sqrt(x+1)+1. Squaring gives x-2=2sqrt(x+1), requiring x>=2. Squaring again gives x^2-8x=0, whose algebraic candidates are 0 and 8. Only 8 meets the retained condition and the original equation: sqrt(9)=sqrt(16)-1=3. Direct substitution rejects 0.",
		courseId: "algebra-2a"
	},
	{
		moduleTitle: "ALA11 Piecewise Functions",
		target: "Evaluating and Graphing Piecewise Functions",
		methods:
			"Test the input against the interval conditions before selecting a rule. At a boundary, a non-strict inequality includes the point and uses a filled dot; a strict inequality excludes it and uses an open dot. The floor of x is the greatest integer <=x, while the ceiling is the least integer >=x, including for negative x.",
		worked: "For f(x)=x-1 when x<0 and f(x)=3x when x>=0, f(0)=0 from the second rule. The left-hand values approach -1, so the graph has an open dot at (0,-1) and a filled dot at (0,0). Also floor(-1.2)=-2 and ceiling(-1.2)=-1; rounding toward zero is not the floor rule.",
		courseId: "algebra-2a"
	},
	{
		moduleTitle: "ALA11 Piecewise Functions",
		target: "Piecewise Models and Continuity",
		methods:
			"A tiered rate accumulates completed tiers before adding the charge for the current tier. Define the permitted inputs, such as nonnegative hours or whole-number bag counts. Continuity at a boundary requires the left and right limiting values and the function value there to agree. An all-unit quantity discount can lower the total price at a threshold; it differs from an incremental discount.",
		worked: "Alex earns 30 dollars per hour for the first 40 hours and 50 for each additional hour, so at 45 hours pay is 30×40+50×5=1450, agreeing with 50×45-800. For x^2+2c on x<=3 and 2cx+1 on x>3, continuity gives 9+2c=6c+1, so c=2 and both boundary values are 13.",
		courseId: "algebra-2a"
	},
	{
		moduleTitle: "ALB1 Introduction to Logarithms",
		target: "Logarithm Properties and Change of Base",
		methods:
			"To solve A×b^t=C with positive A,C and b>0, b!=1, first divide by A, take a logarithm of both positive sides and use the power rule: t=ln(C/A)/ln(b). A logarithm equation also retains every original argument restriction. Expanding or condensing cannot silently enlarge that domain.",
		worked: "1300=110(1.24)^t gives 1300/110=(1.24)^t, then ln(1300/110)=t×ln(1.24), so t=ln(1300/110)/ln(1.24), approximately 11.48. For ln(x)+ln(x-2)=ln(3), the original domain is x>2. Combining gives x(x-2)=3, with candidates -1 and 3; only x=3 satisfies the logarithms.",
		courseId: "algebra-2b"
	},
	{
		moduleTitle: "ALB2 Exponential and Logarithmic Functions",
		target: "Logarithmic Graphs and Growth Models",
		methods:
			"A real logarithm requires a positive argument and a positive base other than 1. Apply that argument restriction after every horizontal transformation. Discrete growth A(1+r)^t uses a positive base 1+r; continuous growth A e^(rt) uses a rate r in reciprocal time units. To solve for time, isolate the exponential and take logarithms, retaining the model domain.",
		worked: "For y=log_4(-x), the condition -x>0 gives x<0. Reflecting log_4(x) across the y-axis gives points (-1,0),(-4,1),(-1/4,-1), with vertical asymptote x=0. For 10000=40e^(0.35t), division gives 250=e^(0.35t), so t=ln(250)/0.35, approximately 15.78 time units.",
		courseId: "algebra-2b"
	},
	{
		moduleTitle: "ALB4 Geometric Sequences",
		target: "Geometric Sums and Infinite Series",
		methods:
			"For n positive whole-number terms, S_n=a_1(1-r^n)/(1-r) when r!=1; if r=1, S_n=n×a_1. For a nonzero first term, an infinite geometric series converges exactly when abs(r)<1, with sum a_1/(1-r); an all-zero series has sum zero. For a ball dropped from height H and retaining a fraction 0<r<1 of its height after each bounce, the path is H+2Hr/(1-r), since every rebound is traveled upward and downward.",
		worked: "For 3+6+12+24+48+96+192, n=7 and r=2, so S_7=3(1-2^7)/(1-2)=381. With initial drop H=20 feet and r=0.83, the first rebound is 16.6 feet, and the idealized infinite path is 20+2×20×0.83/(1-0.83), approximately 215.29 feet. The model assumes the same retention fraction on every bounce.",
		courseId: "algebra-2b"
	},
	{
		moduleTitle: "ALB5 Matrix Operations",
		target: "Matrix Basics, Addition, and Multiplication",
		methods:
			"An m-by-n matrix has m rows and n columns. Addition or subtraction requires matching dimensions. Multiplying an m-by-n matrix A by an n-by-p matrix B gives an m-by-p matrix: entry (i,j) is the sum of A row i times B column j term by term. Matrix multiplication is generally not commutative, so exchanging the factors can change the result or make the dimensions invalid.",
		worked: "For A=[[1,2],[3,4]] and B=[[2,0],[-1,5]], the first result entry is 1×2+2×(-1)=0 and the next is 1×0+2×5=10. The second row gives 3×2+4×(-1)=2 and 3×0+4×5=20, so AB=[[0,10],[2,20]]. In contrast, BA=[[2,4],[14,18]], confirming that AB and BA differ.",
		courseId: "algebra-2b"
	},
	{
		moduleTitle: "ALB5 Matrix Operations",
		target: "Inverses and Matrix Division",
		methods:
			"For a 2-by-2 matrix, determinant ad-bc must be nonzero for an inverse. Verify both A×A^(-1) and A^(-1)×A equal the identity matrix. There is no ordinary matrix division operation. In this course A/B denotes right multiplication A×B^(-1), requiring square invertible B and compatible dimensions. Left multiplication B^(-1)×A is generally different; the side matters when solving AX=C or XB=A.",
		worked: "For B=[[3,0],[1,2]], the determinant is 6 and B^(-1)=[[1/3,0],[-1/6,1/2]]. With A=[[4,7],[2,6]], right multiplication gives A×B^(-1)=[[4/3-7/6,7/2],[2/3-1,3]]=[[1/6,7/2],[-1/3,3]]. Multiplying this result by B on the right recovers A.",
		courseId: "algebra-2b"
	},
	{
		moduleTitle: "ALB6 Probability",
		target: "Probability Rules and Sample Spaces",
		methods:
			"A finite equally likely sample space gives P(A)=number of favorable outcomes/number of possible outcomes. For P(A)>0, P(A and B)=P(A)×P(B given A). If A and B are independent, this reduces to P(A)P(B). If P(A)=0, their joint probability is zero. For a union, P(A or B)=P(A)+P(B)-P(A and B); disjoint events have no overlap. The complement rule is P(not A)=1-P(A). State fairness, independence and replacement conditions before choosing a rule.",
		worked: "A bag contains two red counters and one blue counter. Two uniformly random draws without replacement give P(red then red)=(2/3)(1/2)=1/3. With replacement and remixing, the second probability remains 2/3 and the result is 4/9. For one fair die, the event even or greater than 4 has outcomes {2,4,5,6}, so its probability is 4/6; adding 3/6 and 2/6 requires subtracting the shared outcome 6.",
		courseId: "algebra-2b"
	},
	{
		moduleTitle: "ALB6 Probability",
		target: "Two-Way Tables, Permutations, and Combinations",
		methods:
			"In a two-way table, a joint probability divides a cell count by the full listed population, while P(A given B) divides the overlap count by the B subgroup total. For n distinct objects and an integer 0<=r<=n, ordered selection without replacement has P(n,r)=n!/(n-r)!, and unordered selection has C(n,r)=n!/(r!(n-r)!), with 0!=1. With replacement and n choices on each of r independent selection stages, there are n^r ordered strings.",
		worked: "Use the listed table: Discord has 40 dog and 210 cat responses; Skype has 78 dog and 105 cat responses. Among Discord responses, the cat proportion is 210/250=84%. Among cat responses, the Discord proportion is 210/315=2/3. Across all 433 listed responses, the joint Discord-and-cat proportion is 210/433. Choosing 2 of 7 distinct friends without ordering gives C(7,2)=7×6/(2×1)=21.",
		courseId: "algebra-2b"
	},
	{
		moduleTitle: "ALB7 Data and Statistics",
		target: "Correlation and Interpreting Scatter Plots",
		methods:
			"For n paired observations with n>=2, calculate means xbar and ybar. Define Sxx=sum((x-xbar)^2), Syy=sum((y-ybar)^2) and Sxy=sum((x-xbar)(y-ybar)). Pearson correlation is r=Sxy/sqrt(Sxx×Syy), provided Sxx>0 and Syy>0. If either variable is constant, r is undefined. Otherwise -1<=r<=1. A nonhorizontal line with varying x gives abs(r)=1; two distinct observations alone also give a perfect fit and provide little evidence of a general pattern. A nonlinear relationship can have r=0 without being unrelated.",
		worked: "For (1,2),(2,4),(3,3),(4,5), the means are xbar=2.5 and ybar=3.5. The centered sums are Sxx=5, Syy=5 and Sxy=4, so r=4/sqrt(25)=0.8. The upward association does not establish causation. For (-2,4),(-1,1),(0,0),(1,1),(2,4), the centered cross-products sum to zero, so r=0 even though y=x^2 describes all five points.",
		courseId: "algebra-2b"
	},
	{
		moduleTitle: "ALB7 Data and Statistics",
		target: "Least-Squares Regression and r^2",
		methods:
			"For ordinary unweighted least-squares regression with an intercept and Sxx>0, slope m=Sxy/Sxx and intercept b=ybar-m×xbar give predictions yhat=mx+b. A residual is observed y minus predicted yhat. Let SSE=sum((y-yhat)^2) and SST=sum((y-ybar)^2). If SST>0, R^2=1-SSE/SST; for this same fitted line it equals Pearson r^2. It describes variation of the observed y values accounted for by that linear fit, not a causal percentage or the fraction of points lying exactly on the line. Retain precision until the final reported values.",
		worked: "For (1,2),(2,4),(3,3),(4,5), Sxx=5 and Sxy=4 give m=0.8, then b=3.5-0.8×2.5=1.5. Predictions are 2.3,3.1,3.9,4.7, so residuals are -0.3,0.9,-0.9,0.3. SSE=1.8 and SST=5, giving R^2=1-1.8/5=0.64. This equals 0.8^2, using the correlation computed from the same four records.",
		courseId: "algebra-2b"
	},
	{
		moduleTitle: "ALB8 Trigonometry Basics",
		target: "Right-Triangle Ratios, Radians, and the Unit Circle",
		methods:
			"In a right triangle, the hypotenuse is opposite the right angle. Opposite and adjacent sides depend on the chosen acute angle. Convert degrees to radians by multiplying by π/180, and radians to degrees by 180/π. On the unit circle, angles start at the positive x-axis and increase counterclockwise; the coordinates are (cos(theta),sin(theta)). Tangent is sin(theta)/cos(theta), defined when cosine is nonzero. To recover an acute triangle angle, use an inverse trig function with the intended degree or radian units.",
		worked: "For vertices (0,0),(24,0),(24,10), the hypotenuse is 26. Choose theta at (0,0), opposite the side of length 10. Then sin(theta)=5/13 and theta=arcsin(5/13), approximately 22.62 degrees. Also 150 degrees×π/180=5π/6, whose unit-circle coordinates are (-sqrt(3)/2,1/2).",
		courseId: "algebra-2b"
	},
	{
		moduleTitle: "ALB8 Trigonometry Basics",
		target: "Trig Identities and Function Values",
		methods:
			"Reciprocal identities retain their denominator restrictions: cosecant and cotangent require sin(theta)!=0, while secant and tangent require cos(theta)!=0. The identity sin^2(theta)+cos^2(theta)=1 holds for every real angle. When recovering a sign from a squared value, use the quadrant. Keep exact special-angle values through intermediate steps and round only the final decimal.",
		worked: "At 60 degrees, sin(theta)=sqrt(3)/2 and cos(theta)=1/2, so tan(theta)=sqrt(3), csc(theta)=2/sqrt(3), sec(theta)=2 and cot(theta)=1/sqrt(3). To three decimal places these are 1.732,1.155,2.000 and 0.577. Using degrees, tan(-37 degrees) is approximately -0.754.",
		courseId: "algebra-2b"
	},
	{
		moduleTitle: "ALB9 Graphing Trigonometric Functions",
		target: "Transformations of Trig Graphs",
		methods:
			"For real nonzero a,b, write a sine or cosine transformation as y=a sin(b(x-h))+d or y=a cos(b(x-h))+d. Amplitude is abs(a), period 2π/abs(b), phase shift h and range [d-abs(a),d+abs(a)]. In the form bx+c, factor b to obtain h=-c/b. Tangent has period π/abs(b), no amplitude and vertical asymptotes where b(x-h)=π/2+kπ for integer k. Angles are in radians unless degrees are specified.",
		worked: "4sin(2x+π)+5=4sin(2(x+π/2))+5 has amplitude 4, period π, phase shift -π/2 and midline 5. One cycle passes through (-π/2,5),(-π/4,9),(0,5),(π/4,1),(π/2,5). Its maximum is 9 and minimum 1; the coefficient inside the sine controls the horizontal scale.",
		courseId: "algebra-2b"
	}
];

interface AlgebraReading {
	courseId: string;
	moduleTitle: string;
	section: "curriculum" | "supplementalProjects";
	target?: string;
	groupTitles?: string[];
	id: string;
	title: string;
	aliases: string[];
}

export const algebra2Readings: AlgebraReading[] = [
	{
		courseId: "algebra-2a",
		moduleTitle: "ALA1 Complex Numbers",
		section: "curriculum",
		target: "Imaginary Numbers and Powers of i",
		id: "algebra-2a-ala1-complex-numbers-curriculum-imaginary-numbers-and-powers-of-i",
		title: "Imaginary Numbers and Powers of i",
		aliases: []
	},
	{
		courseId: "algebra-2a",
		moduleTitle: "ALA1 Complex Numbers",
		section: "curriculum",
		target: "The Complex Plane",
		id: "algebra-2a-ala1-complex-numbers-curriculum-the-complex-plane",
		title: "The Complex Plane",
		aliases: []
	},
	{
		courseId: "algebra-2a",
		moduleTitle: "ALA1 Complex Numbers",
		section: "curriculum",
		target: "Operations with Complex Numbers",
		id: "algebra-2a-ala1-complex-numbers-curriculum-operations-with-complex-numbers",
		title: "Operations with Complex Numbers",
		aliases: []
	},
	{
		courseId: "algebra-2a",
		moduleTitle: "ALA2 Quadratic Functions",
		section: "curriculum",
		id: "algebra-2a-ala2-quadratic-functions-curriculum-quadratic-functions-core-concepts",
		title: "Quadratic Functions Core Concepts",
		aliases: [
			"algebra-2a-ala2-quadratic-functions-curriculum-core-concepts-and-learning-sequence",
			"core-concepts",
			"algebra-2a-ala2-quadratic-functions-curriculum-core-concepts"
		],
		groupTitles: [
			"Factoring Quadratics and Solving for Zeros",
			"Special Factorizations",
			"Completing the Square and the Quadratic Formula"
		]
	},
	{
		courseId: "algebra-2a",
		moduleTitle: "ALA3 Graphing Quadratic Functions",
		section: "curriculum",
		target: "Vertex Form, Standard Form, and Intercept Form",
		id: "algebra-2a-ala3-graphing-quadratic-functions-curriculum-vertex-form-standard-form-and-intercept-form",
		title: "Vertex Form, Standard Form, and Intercept Form",
		aliases: []
	},
	{
		courseId: "algebra-2a",
		moduleTitle: "ALA3 Graphing Quadratic Functions",
		section: "curriculum",
		target: "Transformations of Parabolas",
		id: "algebra-2a-ala3-graphing-quadratic-functions-curriculum-transformations-of-parabolas",
		title: "Transformations of Parabolas",
		aliases: []
	},
	{
		courseId: "algebra-2a",
		moduleTitle: "ALA3 Graphing Quadratic Functions",
		section: "curriculum",
		target: "Applications and Parabola Geometry",
		id: "algebra-2a-ala3-graphing-quadratic-functions-curriculum-applications-and-parabola-geometry",
		title: "Applications and Parabola Geometry",
		aliases: []
	},
	{
		courseId: "algebra-2a",
		moduleTitle: "ALA3 Graphing Quadratic Functions",
		section: "supplementalProjects",
		target: "Graph Prompt Reference",
		id: "algebra-2a-ala3-graphing-quadratic-functions-curriculum-graph-prompt-reference",
		title: "Graph Prompt Reference",
		aliases: [
			"algebra-2a-ala3-graphing-quadratic-functions-supplemental-graph-prompt-reference"
		]
	},
	{
		courseId: "algebra-2a",
		moduleTitle: "Check-In #1",
		section: "curriculum",
		target: "Review Targets",
		id: "algebra-2a-check-in-1-curriculum-algebra-2a-check-in-1-review-targets",
		title: "Algebra 2A Check-In 1 Review Targets",
		aliases: [
			"review-targets",
			"algebra-2a-check-in-1-curriculum-review-targets"
		]
	},
	{
		courseId: "algebra-2a",
		moduleTitle: "ALA4 Higher Degree Polynomials",
		section: "curriculum",
		target: "Polynomial Operations and Factoring",
		id: "algebra-2a-ala4-higher-degree-polynomials-curriculum-polynomial-operations-and-factoring",
		title: "Polynomial Operations and Factoring",
		aliases: []
	},
	{
		courseId: "algebra-2a",
		moduleTitle: "ALA4 Higher Degree Polynomials",
		section: "curriculum",
		target: "Transformations and the Location Principle",
		id: "algebra-2a-ala4-higher-degree-polynomials-curriculum-transformations-and-the-location-principle",
		title: "Transformations and the Location Principle",
		aliases: []
	},
	{
		courseId: "algebra-2a",
		moduleTitle: "ALA5 Polynomial Division",
		section: "curriculum",
		target: "Long Division and Synthetic Division",
		id: "algebra-2a-ala5-polynomial-division-curriculum-long-division-and-synthetic-division",
		title: "Long Division and Synthetic Division",
		aliases: []
	},
	{
		courseId: "algebra-2a",
		moduleTitle: "ALA6 Zeros of Polynomials",
		section: "curriculum",
		target: "Rational Root Theorem, Descartes, and Bounds",
		id: "algebra-2a-ala6-zeros-of-polynomials-curriculum-rational-root-theorem-descartes-and-bounds",
		title: "Rational Root Theorem, Descartes, and Bounds",
		aliases: []
	},
	{
		courseId: "algebra-2a",
		moduleTitle: "ALA7 Graphing Polynomials",
		section: "curriculum",
		target: "End Behavior, Turning Points, and Multiplicity",
		id: "algebra-2a-ala7-graphing-polynomials-curriculum-end-behavior-turning-points-and-multiplicity",
		title: "End Behavior, Turning Points, and Multiplicity",
		aliases: []
	},
	{
		courseId: "algebra-2a",
		moduleTitle: "ALA7 Graphing Polynomials",
		section: "curriculum",
		target: "Feature-Based Graphing",
		id: "algebra-2a-ala7-graphing-polynomials-curriculum-feature-based-graphing",
		title: "Feature-Based Graphing",
		aliases: []
	},
	{
		courseId: "algebra-2a",
		moduleTitle: "Check-In #2",
		section: "curriculum",
		target: "Review Targets",
		id: "algebra-2a-check-in-2-curriculum-algebra-2a-check-in-2-review-targets",
		title: "Algebra 2A Check-In 2 Review Targets",
		aliases: [
			"review-targets",
			"algebra-2a-check-in-2-curriculum-review-targets"
		]
	},
	{
		courseId: "algebra-2a",
		moduleTitle: "ALA8 Rational Functions",
		section: "curriculum",
		target: "Asymptotes and Removable Discontinuities",
		id: "algebra-2a-ala8-rational-functions-curriculum-asymptotes-and-removable-discontinuities",
		title: "Asymptotes and Removable Discontinuities",
		aliases: []
	},
	{
		courseId: "algebra-2a",
		moduleTitle: "ALA8 Rational Functions",
		section: "curriculum",
		target: "Graphing and Roots of Rational Functions",
		id: "algebra-2a-ala8-rational-functions-curriculum-graphing-and-roots-of-rational-functions",
		title: "Graphing and Roots of Rational Functions",
		aliases: []
	},
	{
		courseId: "algebra-2a",
		moduleTitle: "ALA8 Rational Functions",
		section: "supplementalProjects",
		target: "Rational Graph References",
		id: "algebra-2a-ala8-rational-functions-curriculum-rational-graph-references",
		title: "Rational Graph References",
		aliases: [
			"algebra-2a-ala8-rational-functions-supplemental-rational-graph-references"
		]
	},
	{
		courseId: "algebra-2a",
		moduleTitle: "ALA9 Rational Function Operations",
		section: "curriculum",
		target: "Multiplying, Dividing, and Simplifying Rational Expressions",
		id: "algebra-2a-ala9-rational-function-operations-curriculum-multiplying-dividing-and-simplifying-rational-expressions",
		title: "Multiplying, Dividing, and Simplifying Rational Expressions",
		aliases: []
	},
	{
		courseId: "algebra-2a",
		moduleTitle: "ALA9 Rational Function Operations",
		section: "curriculum",
		target: "Adding, Subtracting, and Solving Rational Equations",
		id: "algebra-2a-ala9-rational-function-operations-curriculum-adding-subtracting-and-solving-rational-equations",
		title: "Adding, Subtracting, and Solving Rational Equations",
		aliases: []
	},
	{
		courseId: "algebra-2a",
		moduleTitle: "ALA10 Radical Functions",
		section: "curriculum",
		target: "Graphing Radical Functions",
		id: "algebra-2a-ala10-radical-functions-curriculum-graphing-radical-functions",
		title: "Graphing Radical Functions",
		aliases: []
	},
	{
		courseId: "algebra-2a",
		moduleTitle: "ALA10 Radical Functions",
		section: "curriculum",
		target: "Solving Radical Equations",
		id: "algebra-2a-ala10-radical-functions-curriculum-solving-radical-equations",
		title: "Solving Radical Equations",
		aliases: []
	},
	{
		courseId: "algebra-2a",
		moduleTitle: "ALA11 Piecewise Functions",
		section: "curriculum",
		target: "Evaluating and Graphing Piecewise Functions",
		id: "algebra-2a-ala11-piecewise-functions-curriculum-evaluating-and-graphing-piecewise-functions",
		title: "Evaluating and Graphing Piecewise Functions",
		aliases: []
	},
	{
		courseId: "algebra-2a",
		moduleTitle: "ALA11 Piecewise Functions",
		section: "curriculum",
		target: "Piecewise Models and Continuity",
		id: "algebra-2a-ala11-piecewise-functions-curriculum-piecewise-models-and-continuity",
		title: "Piecewise Models and Continuity",
		aliases: []
	},
	{
		courseId: "algebra-2a",
		moduleTitle: "Check-In #3",
		section: "curriculum",
		target: "Review Targets",
		id: "algebra-2a-check-in-3-curriculum-algebra-2a-check-in-3-review-targets",
		title: "Algebra 2A Check-In 3 Review Targets",
		aliases: [
			"review-targets",
			"algebra-2a-check-in-3-curriculum-review-targets"
		]
	},
	{
		courseId: "algebra-2a",
		moduleTitle: "Check-In #3",
		section: "supplementalProjects",
		target: "Check-In Visual References",
		id: "algebra-2a-check-in-3-curriculum-check-in-visual-references",
		title: "Check-In Visual References",
		aliases: [
			"algebra-2a-check-in-3-supplemental-check-in-visual-references"
		]
	},
	{
		courseId: "algebra-2b",
		moduleTitle: "ALB1 Introduction to Logarithms",
		section: "curriculum",
		target: "Logarithms, Bases, and Rewriting Forms",
		id: "algebra-2b-alb1-introduction-to-logarithms-curriculum-logarithms-bases-and-rewriting-forms",
		title: "Logarithms, Bases, and Rewriting Forms",
		aliases: []
	},
	{
		courseId: "algebra-2b",
		moduleTitle: "ALB1 Introduction to Logarithms",
		section: "curriculum",
		target: "Logarithm Properties and Change of Base",
		id: "algebra-2b-alb1-introduction-to-logarithms-curriculum-logarithm-properties-and-change-of-base",
		title: "Logarithm Properties and Change of Base",
		aliases: []
	},
	{
		courseId: "algebra-2b",
		moduleTitle: "ALB2 Exponential and Logarithmic Functions",
		section: "curriculum",
		target: "Exponential Graphs and Transformations",
		id: "algebra-2b-alb2-exponential-and-logarithmic-functions-curriculum-exponential-graphs-and-transformations",
		title: "Exponential Graphs and Transformations",
		aliases: []
	},
	{
		courseId: "algebra-2b",
		moduleTitle: "ALB2 Exponential and Logarithmic Functions",
		section: "curriculum",
		target: "Logarithmic Graphs and Growth Models",
		id: "algebra-2b-alb2-exponential-and-logarithmic-functions-curriculum-logarithmic-graphs-and-growth-models",
		title: "Logarithmic Graphs and Growth Models",
		aliases: []
	},
	{
		courseId: "algebra-2b",
		moduleTitle: "ALB3 Arithmetic Sequences",
		section: "curriculum",
		target: "Arithmetic Sequences and nth Terms",
		id: "algebra-2b-alb3-arithmetic-sequences-curriculum-arithmetic-sequences-and-nth-terms",
		title: "Arithmetic Sequences and nth Terms",
		aliases: []
	},
	{
		courseId: "algebra-2b",
		moduleTitle: "ALB3 Arithmetic Sequences",
		section: "curriculum",
		target: "Arithmetic Series and Application Problems",
		id: "algebra-2b-alb3-arithmetic-sequences-curriculum-arithmetic-series-and-application-problems",
		title: "Arithmetic Series and Application Problems",
		aliases: []
	},
	{
		courseId: "algebra-2b",
		moduleTitle: "ALB4 Geometric Sequences",
		section: "curriculum",
		target: "Geometric Sequences and Exponential Patterns",
		id: "algebra-2b-alb4-geometric-sequences-curriculum-geometric-sequences-and-exponential-patterns",
		title: "Geometric Sequences and Exponential Patterns",
		aliases: []
	},
	{
		courseId: "algebra-2b",
		moduleTitle: "ALB4 Geometric Sequences",
		section: "curriculum",
		target: "Geometric Sums and Infinite Series",
		id: "algebra-2b-alb4-geometric-sequences-curriculum-geometric-sums-and-infinite-series",
		title: "Geometric Sums and Infinite Series",
		aliases: []
	},
	{
		courseId: "algebra-2b",
		moduleTitle: "ALB5 Matrix Operations",
		section: "curriculum",
		target: "Matrix Basics, Addition, and Multiplication",
		id: "algebra-2b-alb5-matrix-operations-curriculum-matrix-basics-addition-and-multiplication",
		title: "Matrix Basics, Addition, and Multiplication",
		aliases: []
	},
	{
		courseId: "algebra-2b",
		moduleTitle: "ALB5 Matrix Operations",
		section: "curriculum",
		target: "Inverses and Matrix Division",
		id: "algebra-2b-alb5-matrix-operations-curriculum-inverses-and-matrix-division",
		title: "Inverses and Matrix Division",
		aliases: []
	},
	{
		courseId: "algebra-2b",
		moduleTitle: "Check-In #1",
		section: "curriculum",
		target: "Review Targets",
		id: "algebra-2b-check-in-1-curriculum-algebra-2b-check-in-1-review-targets",
		title: "Algebra 2B Check-In 1 Review Targets",
		aliases: [
			"review-targets",
			"algebra-2b-check-in-1-curriculum-review-targets"
		]
	},
	{
		courseId: "algebra-2b",
		moduleTitle: "ALB6 Probability",
		section: "curriculum",
		target: "Probability Rules and Sample Spaces",
		id: "algebra-2b-alb6-probability-curriculum-probability-rules-and-sample-spaces",
		title: "Probability Rules and Sample Spaces",
		aliases: []
	},
	{
		courseId: "algebra-2b",
		moduleTitle: "ALB6 Probability",
		section: "curriculum",
		target: "Two-Way Tables, Permutations, and Combinations",
		id: "algebra-2b-alb6-probability-curriculum-two-way-tables-permutations-and-combinations",
		title: "Two-Way Tables, Permutations, and Combinations",
		aliases: []
	},
	{
		courseId: "algebra-2b",
		moduleTitle: "ALB7 Data and Statistics",
		section: "curriculum",
		target: "Correlation and Interpreting Scatter Plots",
		id: "algebra-2b-alb7-data-and-statistics-curriculum-correlation-and-interpreting-scatter-plots",
		title: "Correlation and Interpreting Scatter Plots",
		aliases: []
	},
	{
		courseId: "algebra-2b",
		moduleTitle: "ALB7 Data and Statistics",
		section: "curriculum",
		target: "Least-Squares Regression and r^2",
		id: "algebra-2b-alb7-data-and-statistics-curriculum-least-squares-regression-and-r-2",
		title: "Least-Squares Regression and r^2",
		aliases: []
	},
	{
		courseId: "algebra-2b",
		moduleTitle: "ALB7 Data and Statistics",
		section: "supplementalProjects",
		target: "Data Visual References",
		id: "algebra-2b-alb7-data-and-statistics-curriculum-data-visual-references",
		title: "Data Visual References",
		aliases: [
			"algebra-2b-alb7-data-and-statistics-supplemental-data-visual-references"
		]
	},
	{
		courseId: "algebra-2b",
		moduleTitle: "ALB8 Trigonometry Basics",
		section: "curriculum",
		target: "Right-Triangle Ratios, Radians, and the Unit Circle",
		id: "algebra-2b-alb8-trigonometry-basics-curriculum-right-triangle-ratios-radians-and-the-unit-circle",
		title: "Right-Triangle Ratios, Radians, and the Unit Circle",
		aliases: []
	},
	{
		courseId: "algebra-2b",
		moduleTitle: "ALB8 Trigonometry Basics",
		section: "curriculum",
		target: "Trig Identities and Function Values",
		id: "algebra-2b-alb8-trigonometry-basics-curriculum-trig-identities-and-function-values",
		title: "Trig Identities and Function Values",
		aliases: []
	},
	{
		courseId: "algebra-2b",
		moduleTitle: "ALB8 Trigonometry Basics",
		section: "supplementalProjects",
		target: "Triangle Diagram References",
		id: "algebra-2b-alb8-trigonometry-basics-curriculum-triangle-diagram-references",
		title: "Triangle Diagram References",
		aliases: [
			"algebra-2b-alb8-trigonometry-basics-supplemental-triangle-diagram-references"
		]
	},
	{
		courseId: "algebra-2b",
		moduleTitle: "ALB9 Graphing Trigonometric Functions",
		section: "curriculum",
		target: "Sine, Cosine, and Tangent Graph Features",
		id: "algebra-2b-alb9-graphing-trigonometric-functions-curriculum-sine-cosine-and-tangent-graph-features",
		title: "Sine, Cosine, and Tangent Graph Features",
		aliases: []
	},
	{
		courseId: "algebra-2b",
		moduleTitle: "ALB9 Graphing Trigonometric Functions",
		section: "curriculum",
		target: "Transformations of Trig Graphs",
		id: "algebra-2b-alb9-graphing-trigonometric-functions-curriculum-transformations-of-trig-graphs",
		title: "Transformations of Trig Graphs",
		aliases: []
	},
	{
		courseId: "algebra-2b",
		moduleTitle: "Check-In #2",
		section: "curriculum",
		target: "Review Targets",
		id: "algebra-2b-check-in-2-curriculum-algebra-2b-check-in-2-review-targets",
		title: "Algebra 2B Check-In 2 Review Targets",
		aliases: [
			"review-targets",
			"algebra-2b-check-in-2-curriculum-review-targets"
		]
	}
];

export function applyAlgebra2Readings(course: RawCourse, courseId: string) {
	if (courseId !== "algebra-2a" && courseId !== "algebra-2b") return;
	requireAlgebraCourse(course, courseId);
	preserveAlgebraSourceItems(course, courseId);
	const methods = algebra2ReadingMethods
		.filter(entry => entry.courseId === courseId)
		.map(entry => ({
			entry,
			item: requireAlgebraItem(
				requireAlgebraModule(course, entry.moduleTitle),
				entry.target
			)
		}));
	for (const { entry, item } of methods) {
		item.content += `\n\n**Methods and definitions:**\n\n${entry.methods}\n\n**Worked example:**\n\n${entry.worked}`;
	}
	for (const reading of algebra2Readings.filter(
		entry => entry.courseId === courseId
	)) {
		const module = requireAlgebraModule(course, reading.moduleTitle);
		const item = reading.groupTitles
			? groupAlgebraReadings(
					module,
					courseId,
					reading.groupTitles,
					reading.title
				)
			: requireAlgebraItem(module, reading.target!, reading.section);
		item.id ??= reading.id;
		item.aliases = [
			...new Set([
				...(item.aliases ?? []),
				reading.id,
				...reading.aliases
			])
		].filter(alias => alias !== item.id);
		item.contentKind = "reading";
		item.preserveInstructions = true;
		item.preserveAssignment = true;
	}
}
