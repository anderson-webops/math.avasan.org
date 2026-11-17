import { slugMarkdownHeading } from "@/modules/courseAssetPreview";
import { algebraCourseAssetViewerUrl } from "@/modules/courseAssetSourcesAlgebra";

export const algebra2Checkpoints = [
	{
		course: "algebra-2a",
		moduleTitle: "Check-In #1",
		title: "Complex Numbers and Quadratics",
		problems: [
			"Simplify sqrt(-25)+4i^27 using the principal complex square root and the four-step power cycle. Distinguish that principal root from both solutions of z^2=-25.",
			"Simplify (4-3i)(2-i)/(-5i). Show the product in the numerator and the conjugate or reciprocal used to make the denominator real.",
			"Solve x^2+3x-10=0 by factoring and substitute both roots into the original polynomial.",
			"Solve 2x^2-5x-12=0, showing the two factors or a quadratic-formula calculation.",
			"Factor x^2-20x+100 and state the root with its multiplicity. Expand the factors to verify all coefficients.",
			"Solve x^2-10x+26=8 by completing the square, retaining exact radical values.",
			"For y=-(1/2)x^2, give vertex, opening direction, width relative to y=x^2, real domain and range.",
			"Start with y=x^2-5, reflect the entire graph across the x-axis and then shift right by 3. Give the final equation and its vertex."
		]
	},
	{
		course: "algebra-2a",
		moduleTitle: "Check-In #2",
		title: "Polynomials, Division and Graph Features",
		problems: [
			"Find the degree and leading term of 7x-36x^2+2x^7 after arranging terms in descending powers.",
			"Factor 12x^4+2x^3-30x-5 by grouping and verify the result by multiplication.",
			"Factor 8x^3-200x completely over the real numbers. State its zeros, their multiplicities and the resulting crossing behavior.",
			"Divide -9x^4-6x^3+x^2+2 by x+1, giving quotient, remainder and the exclusion for the original rational expression. Reconstruct the dividend.",
			"Factor 2x^3-2x^2-20x-16, list all roots with multiplicity and compare the positive/negative counts with the sign changes in f(x) and f(-x).",
			"For f(x)=x^3-2x+1, write the reflected functions across the y-axis and the x-axis, keeping the operations separate.",
			"For f(x)=(3/2)(x^2-1)^2+1/2, find the global minimum and real range directly from the square. State the degree and the maximum possible number of turning points, then compare the listed turning points (-1,1/2),(0,2),(1,1/2)."
		]
	},
	{
		course: "algebra-2a",
		moduleTitle: "Check-In #3",
		title: "Rational, Radical and Piecewise Functions",
		problems: [
			"Explain whether a graph can cross a horizontal asymptote. Use f(x)=x/(x^2+1) to identify its horizontal asymptote and one point where the graph meets it.",
			"For f(x)=(x-2)/(4x+1), give the real domain, vertical and horizontal asymptotes, x-intercept and y-intercept.",
			"For f(x)=(x^2-3x-10)/(x^2-4x-5), factor fully and find original exclusions, hole coordinates, vertical asymptote and valid zero.",
			"For f(x)=(x^2-x-2)/(x^2-4), find original exclusions and the valid real zero. Explain why a cancelled numerator zero is not automatically a root of the original function.",
			"Solve sqrt(x+1)=sqrt(2x)-1 over the real numbers. Check the algebraic candidates 0 and 8 in the original equation.",
			"For a nonnegative whole-number count x of candy bags, let C(x)=3.50x if x<5 and C(x)=2.75x if x>=5. Find the bag count costing $22, then compare C(4) with C(5) and explain the all-unit discount.",
			"Let f(x)=x^2+2c for x<=3 and f(x)=2cx+1 for x>3. Find c so the pieces meet continuously at x=3 and compute the shared boundary value.",
			"Simplify (a^2-4)/(4a^2-1) divided by (a-2)/(2a-1), retaining every original exclusion and explaining the condition at a=2."
		]
	},
	{
		course: "algebra-2b",
		moduleTitle: "Check-In #1",
		title: "Logarithms, Sequences and Matrices",
		problems: [
			"Rewrite 7^x=378 using a logarithm, and rewrite log_3.7(x)=28 in exponential form. State the logarithm argument restriction.",
			"Solve 4200=500e^(0.23t) exactly for t by isolating the exponential before taking logarithms.",
			"Use the given approximations log_7(2)≈0.356 and log_7(6)≈0.921 to estimate log_7(24) and log_7(3). Name the properties used.",
			"Express log_2.89(8.3) using change of base and round its value to two decimal places.",
			"For 3,7,11,15,... with a_1=3, give the difference, next three terms, a_10 and S_10.",
			"For 3,21,147,... with a_1=3, give the ratio, next three terms and sum of the first four terms.",
			"Write 0.777777... as an infinite geometric series and find its exact fraction, stating the convergence condition.",
			"Multiply [[1,2],[3,4]] by [[2,0],[-1,5]] in the stated order. Show one row-by-column calculation and give the result dimensions.",
			"Find the inverse of [[2,1],[5,3]], calculate its determinant and verify the product with its inverse is the identity.",
			"For f(x)=2^(x-2)+1, give shifts, horizontal asymptote, real domain and range, f(2), and the inverse function with its domain."
		]
	},
	{
		course: "algebra-2b",
		moduleTitle: "Check-In #2",
		title: "Probability, Regression and Trigonometry",
		problems: [
			"Flip a fair coin three independent times, then independently draw one uniformly random card from a standard 52-card deck. Find P(HHT and an even black card), counting ranks 2,4,6,8,10 as even.",
			"Draw twice without replacement from a bag containing 3 blue, 9 red and 6 green counters. Find P(green then blue), keeping the order and updated denominator explicit.",
			"Calculate P(11,11) and C(7,2), and explain the difference between arranging eleven distinct items and selecting two of seven distinct items without ordering.",
			"The listed table contains Discord responses: 40 dog,210 cat; Skype responses: 78 dog,105 cat. Find P(cat given Discord), P(Discord given cat) and the joint proportion P(Discord and cat) within all listed responses.",
			"For (1,2),(2,4),(3,3),(4,5), calculate Pearson r, the least-squares line with an intercept and R^2 using centered sums. State whether the association proves causation.",
			"Given reported ordinary least-squares output yhat=0.28x+3.61 and r=0.78, interpret slope and intercept and calculate r^2. Explain what the explained-variation percentage refers to; this question uses the output as given rather than asking for a fit to an absent table.",
			"Convert π/6 radians to degrees and give the unit-circle coordinates and exact tangent value at that angle.",
			"If x=sin(y), express sin(-y) in terms of x. State the corresponding even-function identity for cosine.",
			"For y=2cos(πx)+7, give amplitude, period, midline, range and the values at x=0,1,2.",
			"For y=4sin(2x+π)+5, factor the inner expression to find phase shift, amplitude, period, midline and range.",
			"Using degrees, evaluate tan(-37 degrees) and csc(60 degrees) to three decimal places. Give the exact special-angle cosecant before rounding.",
			"Find all angles theta with 0<=theta<2π satisfying sin(theta)=1/2. Use the signs and unit-circle positions to explain why there are two solutions."
		]
	}
];

export function algebra2Checkpoint(courseId: string, moduleTitle: string) {
	const matches = algebra2Checkpoints.filter(
		item => item.course === courseId && item.moduleTitle === moduleTitle
	);
	if (matches.length !== 1) {
		throw new Error(
			`Missing Algebra 2 checkpoint ${courseId}: ${moduleTitle}`
		);
	}
	const review = matches[0];
	const url = algebraCourseAssetViewerUrl(
		`/course-assets/${courseId}/practice-checks-v1.md#${slugMarkdownHeading(review.title)}`,
		`${review.title} self-check`,
		courseId
	);
	return `**Problems:**\n\n${review.problems.map((problem, index) => `${index + 1}. ${problem}`).join("\n")}\n\n**Checkpoints:**\n\nEach result retains the stated domain, units and probability or modeling assumptions. Substitution, expansion, an independent representation or the listed observations verify the result. Exact values precede final rounding.\n\n[Check answers and reasoning](${url})`;
}
