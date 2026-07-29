import type { RawCourse } from "./types";
import { configureMathCourseFlow } from "./mathCourseFlow";
import {
	pendingStaticMediaNotice,
	preCalculusAStaticFilenames,
	staticMediaUrl
} from "./staticMedia";

function lesson(title: string, content: string) {
	return { title, content };
}

function module(
	title: string,
	curriculum: ReturnType<typeof lesson>[],
	supplementalProjects: ReturnType<typeof lesson>[] = [],
	kind?: "module" | "appendix"
) {
	return {
		...(kind ? { kind } : {}),
		title,
		curriculum,
		supplementalProjects
	};
}

function sourceMediaReferences() {
	return preCalculusAStaticFilenames
		.map(
			filename =>
				`- \`${filename}\` -> ${staticMediaUrl(filename)}\n\n${pendingStaticMediaNotice(filename)}`
		)
		.join("\n\n");
}

function overview({
	check,
	concepts,
	practice,
	title
}: {
	check: string;
	concepts: string[];
	practice: string;
	title: string;
}) {
	return [
		`**Concept path:** ${title}`,
		`**Core ideas:**\n${concepts.map(concept => `- ${concept}`).join("\n")}`,
		`**Practice model:** ${practice}`,
		`**Evidence check:** ${check}`
	].join("\n\n");
}

function practiceSet({
	checkpoints,
	extension,
	goal,
	outcome,
	steps
}: {
	checkpoints: string[];
	extension: string;
	goal: string;
	outcome: string;
	steps: string[];
}) {
	return [
		`**Goal:** ${goal}`,
		`**Work path:**\n${steps.map((step, index) => `${index + 1}. ${step}`).join("\n")}`,
		`**Outcome:** ${outcome}`,
		`**Checkpoints:**\n${checkpoints.map(checkpoint => `- ${checkpoint}`).join("\n")}`,
		`**Extension:** ${extension}`
	].join("\n\n");
}

function checkIn({
	check,
	focus,
	tasks
}: {
	check: string;
	focus: string;
	tasks: string[];
}) {
	return [
		`**Focus:** ${focus}`,
		`**Review tasks:**\n${tasks.map(task => `- ${task}`).join("\n")}`,
		`**Mastery check:** ${check}`
	].join("\n\n");
}

export const preCalculusACourse: RawCourse = {
	name: "Pre-Calculus and Trigonometry A",
	modules: [
		module(
			"PCTA1 Piecewise Functions",
			[
				lesson(
					"Concept: Piecewise Functions",
					overview({
						title: "Piecewise functions use different rules on different parts of the input domain.",
						concepts: [
							"A piecewise definition pairs each formula with a domain condition, so the first task is deciding which condition contains the input.",
							"Endpoint notation matters: open and closed circles, inequalities, and interval notation all communicate whether a boundary value belongs to a piece.",
							"Graphing a piecewise function means graphing each rule only on its assigned interval rather than drawing every formula everywhere.",
							"Continuity, jumps, and removable gaps are visible only after the endpoint behavior of adjacent pieces is compared."
						],
						practice:
							"Evaluate several inputs, mark the matching condition for each input, then graph every piece with explicit endpoint decisions.",
						check: "A complete solution names the selected interval, substitutes into the correct formula, and explains the endpoint status."
					})
				),
				lesson(
					"Problem Set: Piecewise Functions",
					practiceSet({
						goal: "Evaluate, graph, and interpret piecewise functions from formulas, tables, and graphs.",
						steps: [
							"Rewrite each condition as an interval and mark whether the endpoints are included.",
							"Evaluate values by choosing the matching interval before substituting.",
							"Graph each piece separately and use open or closed circles at boundaries.",
							"Identify discontinuities, jumps, and intervals where the function is increasing, decreasing, or constant."
						],
						outcome:
							"Piecewise work becomes a domain decision followed by ordinary function evaluation or graphing.",
						checkpoints: [
							"Every boundary point has exactly one stated inclusion decision.",
							"No formula is graphed outside its assigned interval.",
							"Graph observations match the original domain restrictions."
						],
						extension:
							"Create a real-world step function such as a shipping rate, tax bracket, or parking fee model."
					})
				)
			],
			[
				lesson(
					"Project: Piecewise Model Builder",
					practiceSet({
						goal: "Build a piecewise model for a real pricing, speed, distance, or scoring rule.",
						steps: [
							"Choose a situation with at least three ranges where the rule changes.",
							"Write each formula and its interval condition.",
							"Evaluate at least one input from each interval and one boundary input.",
							"Create a graph or table that makes the change points visible.",
							"Write one sentence explaining whether the model is continuous at each boundary."
						],
						outcome:
							"The final model connects formulas, intervals, graph behavior, and context.",
						checkpoints: [
							"Intervals cover the intended domain without overlap.",
							"Boundary values are handled explicitly.",
							"The context explanation matches the graph behavior."
						],
						extension:
							"Revise the model so one boundary becomes continuous and explain what changed."
					})
				)
			]
		),
		module(
			"PCTA2 Higher-Degree Polynomials",
			[
				lesson(
					"Concept: Polynomial Operations and Factoring",
					overview({
						title: "Higher-degree polynomial work extends algebraic structure from quadratics to expressions with many terms and many possible factors.",
						concepts: [
							"Standard form organizes terms by descending exponent so degree, leading coefficient, and end behavior are visible.",
							"Addition and subtraction combine like terms; multiplication uses distribution, area models, or organized tables to avoid missing products.",
							"Factoring starts with common factors, grouping, special products, and recognizable quadratic patterns inside larger expressions.",
							"A factored form reveals candidate zeros, while expanded form is often easier for degree, leading term, and long-term behavior."
						],
						practice:
							"Move between expanded and factored forms, then state what each form makes easier to see.",
						check: "A reliable answer can be checked by re-expanding the factors or substituting a test value into both forms."
					})
				),
				lesson(
					"Problem Set: Polynomial Operations and Factoring",
					practiceSet({
						goal: "Add, subtract, multiply, factor, and verify higher-degree polynomial expressions.",
						steps: [
							"Identify degree, leading coefficient, and standard form.",
							"Use distribution or a table for polynomial multiplication.",
							"Factor by common factor, grouping, special products, or quadratic form.",
							"Check a factored expression by multiplying it back out.",
							"Interpret what the chosen form reveals about the polynomial."
						],
						outcome:
							"Polynomial manipulation becomes organized form selection rather than symbol juggling.",
						checkpoints: [
							"Like terms are combined only when exponents match.",
							"Every factor can be verified by multiplication.",
							"The final form matches the question being answered."
						],
						extension:
							"Find two different polynomial forms that are equivalent but useful for different questions."
					})
				)
			],
			[
				lesson(
					"Project: Polynomial Toolbox",
					practiceSet({
						goal: "Create a worked reference page for polynomial forms, operations, and factoring strategies.",
						steps: [
							"Choose one cubic and one quartic polynomial with at least two useful forms.",
							"Show expanded form, partially factored form, and fully factored form when possible.",
							"Label degree, leading coefficient, end behavior, and candidate zeros.",
							"Include one multiplication check and one substitution check.",
							"Write a short guide explaining when to use each form."
						],
						outcome:
							"The toolbox becomes a study reference for later polynomial division, zeros, and graphing.",
						checkpoints: [
							"Every form is algebraically equivalent.",
							"At least one factorization is verified two ways.",
							"The guide connects form choice to a specific mathematical question."
						],
						extension:
							"Add a polynomial that does not factor nicely over the integers and explain how that changes the strategy."
					})
				)
			]
		),
		module(
			"PCTA3 Polynomial Division",
			[
				lesson(
					"Concept: Polynomial Long Division and Synthetic Division",
					overview({
						title: "Polynomial division rewrites a polynomial in quotient-plus-remainder form and connects directly to factors and zeros.",
						concepts: [
							"Long division follows the same structure as numeric division: divide leading terms, multiply, subtract, and bring down the next term.",
							"Synthetic division is a compressed method for dividing by a linear factor of the form x - c.",
							"The remainder theorem states that dividing P(x) by x - c leaves remainder P(c).",
							"The factor theorem states that x - c is a factor exactly when P(c) = 0."
						],
						practice:
							"Use long division for general divisors and synthetic division for linear divisors, then verify each remainder by substitution.",
						check: "A complete division answer states quotient and remainder and can be recombined as divisor times quotient plus remainder."
					})
				),
				lesson(
					"Problem Set: Polynomial Division",
					practiceSet({
						goal: "Divide polynomials using long division and synthetic division and interpret the remainder.",
						steps: [
							"Insert missing zero-coefficient terms before dividing.",
							"Carry out long division with aligned powers.",
							"Use synthetic division only when the divisor is linear in the correct form.",
							"Verify the remainder using direct substitution.",
							"Use a zero remainder to identify a factor."
						],
						outcome:
							"Division becomes a tool for simplifying rational expressions and finding polynomial zeros.",
						checkpoints: [
							"Missing terms are represented by zero coefficients.",
							"Remainders agree with P(c).",
							"The recombination check reconstructs the original polynomial."
						],
						extension:
							"Compare long division and synthetic division on the same valid linear divisor and explain which steps correspond."
					})
				)
			],
			[
				lesson(
					"Project: Division Diagnostics",
					practiceSet({
						goal: "Diagnose common polynomial division errors and write corrected solutions.",
						steps: [
							"Prepare three flawed division examples: missing zero coefficient, sign error, and incorrect synthetic setup.",
							"Identify the first invalid step in each example.",
							"Repair the work and verify the quotient and remainder.",
							"Write a short checklist for preventing that error in future work."
						],
						outcome:
							"The diagnostic report turns division mistakes into reusable debugging rules.",
						checkpoints: [
							"The first invalid step is named, not just the final wrong answer.",
							"Every repair includes a recombination or substitution check.",
							"The final checklist is specific enough to use on a new problem."
						],
						extension:
							"Add a case where the divisor is not linear and explain why synthetic division is not appropriate."
					})
				)
			]
		),
		module(
			"PCTA4 Zeros of Polynomials",
			[
				lesson(
					"Concept: Zeros, Factors, and Polynomial Structure",
					overview({
						title: "Zeros connect x-intercepts, factors, solutions, and polynomial structure.",
						concepts: [
							"The degree gives the maximum number of complex zeros counted with multiplicity.",
							"Real zeros appear as x-intercepts on the graph, while non-real complex zeros occur in conjugate pairs for polynomials with real coefficients.",
							"Multiplicity controls how the graph behaves at a zero: odd multiplicity crosses, even multiplicity touches and turns.",
							"Rational root candidates come from factors of the constant term divided by factors of the leading coefficient."
						],
						practice:
							"List possible rational zeros, test candidates with synthetic division, factor the polynomial, and connect each zero to graph behavior.",
						check: "A complete zero analysis accounts for degree, multiplicity, remaining factors, and graph behavior."
					})
				),
				lesson(
					"Problem Set: Finding and Interpreting Zeros",
					practiceSet({
						goal: "Find zeros of polynomial functions and explain what each zero says about the graph.",
						steps: [
							"Use degree and leading coefficient to predict the number of zeros and end behavior.",
							"Apply rational root candidates when factoring is not immediate.",
							"Use synthetic division to reduce the polynomial after a zero is found.",
							"Factor the remaining polynomial completely over the requested number system.",
							"Classify each zero by multiplicity and graph behavior."
						],
						outcome:
							"Zeros become connected evidence rather than isolated numbers.",
						checkpoints: [
							"The number of zeros counted with multiplicity matches the degree.",
							"Complex zeros appear in conjugate pairs when coefficients are real.",
							"Graph behavior at each real zero matches multiplicity."
						],
						extension:
							"Create two polynomials with the same zeros but different leading coefficients and compare their graphs."
					})
				)
			],
			[
				lesson(
					"Project: Polynomial Zero Map",
					practiceSet({
						goal: "Build a zero map that connects factors, roots, multiplicity, and graph behavior for one polynomial.",
						steps: [
							"Choose or create a polynomial with at least three zeros counting multiplicity.",
							"Show the factored form and expanded form.",
							"Create a table of zeros, multiplicities, and cross-or-touch behavior.",
							"Sketch or describe the graph using end behavior and zero behavior.",
							"Verify one zero with substitution and one with synthetic division."
						],
						outcome:
							"The zero map explains how algebraic structure predicts graph shape.",
						checkpoints: [
							"Each factor has a matching zero.",
							"Multiplicity is explicitly counted.",
							"The graph description matches both zeros and end behavior."
						],
						extension:
							"Revise the polynomial so one zero changes multiplicity and describe the graph change."
					})
				)
			]
		),
		module(
			"PCTA5 Graphing Polynomials",
			[
				lesson(
					"Concept: Polynomial Graph Features",
					overview({
						title: "Polynomial graphs combine end behavior, zeros, multiplicity, turning points, and transformations.",
						concepts: [
							"End behavior depends on degree parity and the sign of the leading coefficient.",
							"Zeros and multiplicity explain where the graph crosses or touches the x-axis.",
							"A degree n polynomial has at most n - 1 turning points.",
							"Transformations such as shifts, stretches, and reflections change the graph predictably without changing every structural feature."
						],
						practice:
							"Start every sketch with end behavior and zeros, then refine using multiplicity, y-intercept, and transformation information.",
						check: "A graph explanation is complete when every major visual feature is linked to an algebraic fact."
					})
				),
				lesson(
					"Problem Set: Polynomial Graphs and Transformations",
					practiceSet({
						goal: "Sketch and interpret polynomial graphs from equations, factors, and transformations.",
						steps: [
							"Identify degree, leading coefficient, and end behavior.",
							"Find real zeros and classify multiplicity.",
							"Calculate the y-intercept.",
							"Apply transformations in a stated order.",
							"Use a table or graphing tool only after predicting major features."
						],
						outcome:
							"Graphing becomes evidence-based prediction rather than point plotting alone.",
						checkpoints: [
							"End behavior agrees with degree and leading coefficient.",
							"Each intercept is labeled with the algebra that produced it.",
							"The graph does not show more turning points than the degree allows."
						],
						extension:
							"Compare two transformed versions of the same base polynomial and identify what stays invariant."
					})
				)
			],
			[
				lesson(
					"Project: Polynomial Graph Portfolio",
					practiceSet({
						goal: "Create a portfolio of polynomial graphs that demonstrates multiple graph behaviors.",
						steps: [
							"Include one even-degree and one odd-degree polynomial.",
							"Include at least one repeated zero and one transformed graph.",
							"For each graph, write the algebraic evidence for end behavior, intercepts, and turning-point limits.",
							"Add one graph created from a verbal description and then write a possible equation.",
							"Compare predicted features to a graphing-tool check."
						],
						outcome:
							"The portfolio shows how polynomial structure controls graph behavior.",
						checkpoints: [
							"Every graph has an equation and feature explanation.",
							"At least one graph includes a repeated zero.",
							"Technology is used as a check, not as the only source of reasoning."
						],
						extension:
							"Add a parameter to one equation and describe how changing it affects the graph."
					})
				)
			]
		),
		module(
			"PCTA6 Arithmetic and Geometric Sequences",
			[
				lesson(
					"Concept: Sequences and Sums",
					overview({
						title: "Sequences model ordered patterns, and sums measure accumulated pattern totals.",
						concepts: [
							"Arithmetic sequences add a constant difference; geometric sequences multiply by a constant ratio.",
							"Explicit formulas find a term directly, while recursive formulas define each term from previous terms.",
							"Finite arithmetic and geometric sums turn repeated addition into compact formulas.",
							"Infinite geometric sums converge only when the absolute value of the common ratio is less than 1."
						],
						practice:
							"Identify the pattern type, write both recursive and explicit forms when useful, then choose the correct sum formula.",
						check: "A sequence solution identifies the first term, index convention, common difference or ratio, and whether a sum is finite or infinite."
					})
				),
				lesson(
					"Problem Set: Arithmetic, Geometric, and Infinite Geometric Sequences",
					practiceSet({
						goal: "Write formulas, compute terms, and evaluate finite or infinite sequence sums.",
						steps: [
							"Classify each sequence as arithmetic, geometric, neither, or not enough information.",
							"Write explicit and recursive formulas for arithmetic and geometric sequences.",
							"Compute requested terms using the most direct formula.",
							"Evaluate finite sums with the correct series formula.",
							"Determine whether an infinite geometric series converges and calculate its sum when valid."
						],
						outcome:
							"Sequence work becomes a pattern-classification problem followed by formula selection.",
						checkpoints: [
							"The index convention is stated clearly.",
							"Arithmetic and geometric formulas are not mixed.",
							"Infinite sums include a convergence check before calculation."
						],
						extension:
							"Model a savings plan, depreciation pattern, or bouncing-height scenario with a sequence and sum."
					})
				)
			],
			[
				lesson(
					"Project: Sequence Model Comparison",
					practiceSet({
						goal: "Compare arithmetic and geometric models for two real or fictional repeated-change situations.",
						steps: [
							"Choose one situation with constant addition and one with constant multiplication.",
							"Create a table for the first six terms of each model.",
							"Write explicit formulas and finite-sum formulas.",
							"Graph or describe how the long-term behavior differs.",
							"Write a recommendation explaining which model fits each situation."
						],
						outcome:
							"The comparison distinguishes linear accumulation from multiplicative growth or decay.",
						checkpoints: [
							"Each model has a clear first term and change rule.",
							"Tables, formulas, and graph behavior agree.",
							"The recommendation uses mathematical evidence."
						],
						extension:
							"Add an infinite geometric model and decide whether its total amount converges."
					})
				)
			]
		),
		module(
			"PCTA7 Area Under a Curve",
			[
				lesson(
					"Concept: Area Under a Curve",
					overview({
						title: "Area under a curve can be approximated by splitting an interval into rectangles or trapezoids.",
						concepts: [
							"A Riemann sum partitions an interval and adds rectangle areas to estimate accumulated quantity.",
							"Left, right, and midpoint sums use different sample points and can overestimate or underestimate depending on graph behavior.",
							"Smaller subintervals usually improve the approximation because the rectangles follow the curve more closely.",
							"Units matter: if the vertical axis is a rate, the area has accumulated units."
						],
						practice:
							"Partition an interval, calculate subinterval width, choose sample heights, add areas, and interpret the units.",
						check: "A complete approximation states interval, number of subintervals, width, sample rule, total area, and units."
					})
				),
				lesson(
					"Problem Set: Riemann Sums",
					practiceSet({
						goal: "Approximate area under curves from graphs, tables, and formulas.",
						steps: [
							"Find the interval length and subinterval width.",
							"Choose left, right, midpoint, or trapezoid sample values.",
							"Multiply each width by the matching height or average height.",
							"Add the pieces and label the accumulated units.",
							"Compare estimates when the sample rule changes."
						],
						outcome:
							"Area approximation becomes preparation for definite integrals in calculus.",
						checkpoints: [
							"The sample rule is named before calculating.",
							"Every rectangle or trapezoid uses the same width unless the table requires otherwise.",
							"The final answer includes units and an over/under estimate discussion when possible."
						],
						extension:
							"Use a spreadsheet or graphing tool to compare estimates as the number of subintervals increases."
					})
				)
			],
			[
				lesson(
					"Project: Accumulation Approximation Lab",
					practiceSet({
						goal: "Use Riemann sums to estimate an accumulated quantity from a rate table or graph.",
						steps: [
							"Choose a context such as speed over time, water flow, energy use, or population change rate.",
							"Create or use a table with at least six input values and matching rate values.",
							"Compute left, right, and midpoint estimates when the data supports them.",
							"Compare which estimate is likely larger or smaller based on graph behavior.",
							"Write a final interpretation with accumulated units."
						],
						outcome:
							"The lab connects area under a curve to total change in a context.",
						checkpoints: [
							"Rate units and accumulated units are both named.",
							"At least two approximation methods are compared.",
							"The final interpretation answers a context question, not only a calculation."
						],
						extension:
							"Add a curve sketch and explain how the sketch supports the estimate comparison."
					})
				)
			]
		),
		module(
			"PCTA8 The Binomial Theorem",
			[
				lesson(
					"Concept: The Binomial Theorem",
					overview({
						title: "The binomial theorem expands powers of binomials using coefficients from combinations or Pascal's triangle.",
						concepts: [
							"The expansion of (a + b)^n contains n + 1 terms.",
							"Coefficients match rows of Pascal's triangle or combinations C(n, k).",
							"Exponents on the first term decrease while exponents on the second term increase.",
							"Specific terms can be found without expanding the entire expression."
						],
						practice:
							"Write the coefficient pattern, track both exponent patterns, and verify with a small power before handling a larger one.",
						check: "A correct expansion has the right number of terms, total exponent n in each term, and matching binomial coefficients."
					})
				),
				lesson(
					"Problem Set: Binomial Expansions",
					practiceSet({
						goal: "Expand binomials and find selected terms using Pascal's triangle and combination notation.",
						steps: [
							"Identify n and write the coefficient row.",
							"Track descending powers of the first term and ascending powers of the second term.",
							"Include signs carefully when the binomial uses subtraction.",
							"Find selected terms using C(n, k) without expanding every term.",
							"Check small cases by direct multiplication."
						],
						outcome:
							"Binomial expansions become pattern-driven rather than repeated multiplication.",
						checkpoints: [
							"The expansion has n + 1 terms.",
							"Every term has total degree n before simplification.",
							"Negative signs are attached to the correct powers."
						],
						extension:
							"Use a binomial expansion to approximate a value such as (1.02)^5 and discuss the approximation."
					})
				)
			],
			[
				lesson(
					"Project: Binomial Pattern Case File",
					practiceSet({
						goal: "Create a visual and algebraic explanation of the binomial theorem.",
						steps: [
							"Build Pascal's triangle through at least row 7.",
							"Choose two binomial expansions and match each coefficient to Pascal's triangle and C(n, k).",
							"Explain the exponent pattern in words.",
							"Find one middle term without expanding the full expression.",
							"Include one subtraction case and track the signs."
						],
						outcome:
							"The case file explains why binomial expansions have predictable coefficients and exponents.",
						checkpoints: [
							"Coefficient, exponent, and sign patterns are all explained.",
							"At least one selected-term shortcut is shown.",
							"The subtraction case does not lose alternating signs."
						],
						extension:
							"Connect one row of Pascal's triangle to a counting problem."
					})
				)
			]
		),
		module(
			"Check-In #1: Polynomial and Sequence Foundations",
			[
				lesson(
					"Check-In #1",
					checkIn({
						focus: "Higher-degree polynomials, zeros, graphing, arithmetic and geometric sequences, Riemann sums, and the binomial theorem.",
						tasks: [
							"Evaluate and graph a piecewise function with boundary points.",
							"Factor or divide a polynomial and use the result to find or verify a zero.",
							"Sketch a polynomial from degree, leading coefficient, zeros, and multiplicities.",
							"Write arithmetic and geometric sequence formulas and compute a finite or infinite sum.",
							"Approximate area under a curve with a stated Riemann-sum rule.",
							"Expand a binomial or find a selected term using Pascal's triangle or C(n, k)."
						],
						check: "Readiness is demonstrated when the method is named, the relevant formula or theorem is applied correctly, and the result is checked against the context or graph behavior."
					})
				)
			],
			[
				lesson(
					"Additional Practice: Mixed Algebra Review",
					practiceSet({
						goal: "Strengthen the topics from PCTA1-PCTA8 through mixed problems instead of isolated worksheets.",
						steps: [
							"Solve one polynomial factoring or division problem.",
							"Solve one zeros or graphing problem.",
							"Solve one sequence or series problem.",
							"Solve one Riemann-sum or binomial theorem problem.",
							"Write one error-analysis note describing a likely mistake and its correction."
						],
						outcome:
							"The review identifies which topic needs targeted practice before moving into rational, logarithmic, and conic topics.",
						checkpoints: [
							"Each solution names the topic and method.",
							"At least one answer is checked by substitution, graph behavior, or a formula condition.",
							"The error-analysis note is specific."
						],
						extension:
							"Create a one-page study map linking the first eight modules together."
					})
				),
				lesson(
					"Project: Polynomial and Sequence Error Analysis",
					practiceSet({
						goal: "Diagnose and repair common mistakes from polynomial, sequence, area-approximation, and binomial-theorem work.",
						steps: [
							"Write or choose one flawed polynomial factoring, division, or zeros solution.",
							"Write or choose one flawed sequence, series, Riemann-sum, or binomial expansion solution.",
							"Mark the first invalid step in each solution.",
							"Repair the work and check the corrected answer with substitution, graph behavior, or a small case.",
							"Write a prevention note that names the rule or representation that catches the mistake."
						],
						outcome:
							"The review connects correctness to evidence rather than relying on answer matching.",
						checkpoints: [
							"The first invalid step is identified before the correction begins.",
							"Each repaired solution includes a check.",
							"The prevention note uses precise vocabulary."
						],
						extension:
							"Create a third flawed example involving endpoint notation, multiplicity, or index notation."
					})
				)
			]
		),
		module(
			"PCTA9 Rational Functions",
			[
				lesson(
					"Concept: Graphing Rational Functions",
					overview({
						title: "Rational functions are ratios of polynomials, so domain restrictions and asymptotes guide the graph.",
						concepts: [
							"Zeros of the denominator create excluded x-values before any cancellation is considered.",
							"Vertical asymptotes occur at non-canceled denominator zeros; holes occur when a common factor cancels.",
							"Horizontal or slant asymptotes depend on polynomial degree comparison or division.",
							"Roots of rational functions come from numerator zeros that remain in the simplified expression."
						],
						practice:
							"Factor numerator and denominator, identify restrictions, simplify carefully, then map zeros, holes, and asymptotes before graphing.",
						check: "A rational graph is complete when restrictions, intercepts, holes, vertical asymptotes, and end behavior are all accounted for."
					})
				),
				lesson(
					"Problem Set: Rational Function Graphs and Roots",
					practiceSet({
						goal: "Analyze rational functions from equations and graphs.",
						steps: [
							"Factor numerator and denominator completely when possible.",
							"List domain restrictions from the original denominator.",
							"Identify holes, vertical asymptotes, and intercepts.",
							"Use degree comparison or division for long-term behavior.",
							"Sketch or interpret the graph using the collected evidence."
						],
						outcome:
							"Rational graphing becomes a checklist of algebraic features tied to visible behavior.",
						checkpoints: [
							"Domain restrictions come from the original expression.",
							"Holes and vertical asymptotes are not confused.",
							"End behavior is justified by degree comparison or division."
						],
						extension:
							"Create two rational functions with the same vertical asymptote but different holes or intercepts."
					})
				)
			],
			[
				lesson(
					"Project: Rational Graph Audit",
					practiceSet({
						goal: "Audit a rational-function graph by matching every visible feature to algebraic evidence.",
						steps: [
							"Choose or create a rational function with at least one restriction and one asymptote.",
							"Factor the expression and list domain restrictions.",
							"Identify holes, vertical asymptotes, horizontal or slant asymptotes, and intercepts.",
							"Sketch the graph and annotate each feature.",
							"Write a short audit explaining how the original expression controls the graph."
						],
						outcome:
							"The audit prevents graph features from being guessed or copied from technology without explanation.",
						checkpoints: [
							"Every feature on the graph has an algebraic source.",
							"Original restrictions are preserved even after simplification.",
							"The graph agrees with intercept and asymptote evidence."
						],
						extension:
							"Design a second function with the same denominator but a different numerator and compare the graph changes."
					})
				)
			]
		),
		module(
			"PCTA10 Rational Function Operations",
			[
				lesson(
					"Concept: Rational Expressions and Equations",
					overview({
						title: "Operations with rational expressions combine fraction arithmetic with polynomial factoring and domain restrictions.",
						concepts: [
							"Multiplying and dividing rational expressions require factoring, canceling common factors, and carrying original restrictions.",
							"Adding and subtracting rational expressions require a common denominator before combining numerators.",
							"Solving rational equations often uses a common denominator to clear fractions, but excluded values still matter.",
							"Extraneous solutions can appear when a proposed answer makes an original denominator zero."
						],
						practice:
							"Factor first, state restrictions, perform the operation, simplify, and test candidate equation solutions against the original denominators.",
						check: "A correct rational-expression answer includes simplified form and domain restrictions."
					})
				),
				lesson(
					"Problem Set: Rational Operations and Equations",
					practiceSet({
						goal: "Simplify rational expressions and solve rational equations with restrictions.",
						steps: [
							"Factor all polynomial numerators and denominators.",
							"Record excluded values before simplifying.",
							"Multiply, divide, add, or subtract using fraction rules.",
							"Solve rational equations after clearing denominators.",
							"Reject any solution that violates an original restriction."
						],
						outcome:
							"Rational work stays mathematically honest by preserving restrictions through simplification and solving.",
						checkpoints: [
							"Restrictions are stated before cancellation.",
							"Common denominators are valid for addition and equation solving.",
							"Final solutions are checked in the original equation."
						],
						extension:
							"Write a flawed rational-equation solution and annotate where an extraneous solution enters."
					})
				)
			],
			[
				lesson(
					"Project: Rational Expression Repair Lab",
					practiceSet({
						goal: "Repair incorrect rational-expression work and explain the restriction or operation error.",
						steps: [
							"Create or use four flawed examples: canceling terms, losing restrictions, adding without common denominator, and accepting an extraneous solution.",
							"Mark the first invalid step in each example.",
							"Rewrite the correct solution with restrictions.",
							"Check at least one result by substitution.",
							"Create a prevention checklist."
						],
						outcome:
							"The repair lab builds reliable habits for rational expressions and equations.",
						checkpoints: [
							"Each error type is named correctly.",
							"Every corrected solution preserves original restrictions.",
							"The checklist distinguishes canceling factors from canceling terms."
						],
						extension:
							"Add a rational inequality and explain how its solution requires sign intervals."
					})
				)
			]
		),
		module(
			"PCTA11 Logarithms and Exponents",
			[
				lesson(
					"Concept: Logarithms, Identities, and Graphs",
					overview({
						title: "Logarithms undo exponential relationships and make multiplicative growth easier to solve and interpret.",
						concepts: [
							"The statement b^x = y is equivalent to log_b(y) = x when b is positive and not 1.",
							"Product, quotient, and power identities turn multiplication, division, and exponents into log sums, differences, and coefficients.",
							"Exponential and logarithmic graphs are inverses when they use the same base.",
							"Domain restrictions for logarithms come from the requirement that the log argument is positive."
						],
						practice:
							"Rewrite between exponential and logarithmic form, use identities deliberately, and connect graph transformations to inverse behavior.",
						check: "A log solution states the base, preserves positive-argument restrictions, and verifies by converting back to exponential form."
					})
				),
				lesson(
					"Problem Set: Logarithmic and Exponential Functions",
					practiceSet({
						goal: "Solve and graph logarithmic and exponential relationships.",
						steps: [
							"Convert between log form and exponential form.",
							"Evaluate exact log values when the base and argument are powers of the same number.",
							"Expand or condense logs using identities.",
							"Solve exponential and logarithmic equations with domain checks.",
							"Graph exponential and logarithmic transformations and identify asymptotes."
						],
						outcome:
							"Logs become a reversible language for exponents, graphs, and growth models.",
						checkpoints: [
							"Every logarithm has a valid positive argument.",
							"Identities are applied only to valid products, quotients, and powers.",
							"Graph asymptotes and domains match the equation."
						],
						extension:
							"Fit a simple exponential growth or decay model to a small table and solve for a target value."
					})
				)
			],
			[
				lesson(
					"Project: Growth Model Brief",
					practiceSet({
						goal: "Use exponential and logarithmic tools to model growth, decay, or repeated percentage change.",
						steps: [
							"Choose a context such as population, investment, depreciation, temperature change, or half-life style decay.",
							"Create or use at least four data points.",
							"Write an exponential model with clear variables.",
							"Use logarithms to solve when the model reaches a target value.",
							"Explain the domain and one limitation of the model."
						],
						outcome:
							"The brief connects exponential functions, logarithmic solving, and real-world interpretation.",
						checkpoints: [
							"The growth or decay factor matches the context.",
							"Logarithms are used to solve for an exponent.",
							"The final answer has units and a limitation note."
						],
						extension:
							"Compare two models with different growth factors and identify when one overtakes the other."
					})
				)
			]
		),
		module(
			"PCTA12 Function Inverses and Composition",
			[
				lesson(
					"Concept: Function Composition and Inverses",
					overview({
						title: "Composition chains functions together, while inverses reverse a function's input-output relationship when that reversal is valid.",
						concepts: [
							"Composition f(g(x)) means g acts first and f acts on the result.",
							"The domain of a composition depends on both the inner function and the outer function after substitution.",
							"An inverse swaps input and output; one-to-one behavior is required for an inverse to be a function.",
							"Inverse functions can be checked by composition: f(f^-1(x)) = x and f^-1(f(x)) = x on the appropriate domains."
						],
						practice:
							"Evaluate compositions from formulas, tables, and graphs, then find inverse formulas by swapping x and y and solving carefully.",
						check: "A valid inverse answer states any domain restriction needed to make the original function one-to-one."
					})
				),
				lesson(
					"Problem Set: Composition and Inverses",
					practiceSet({
						goal: "Evaluate compositions, find inverse functions, and verify inverse relationships.",
						steps: [
							"Evaluate f(g(x)) and g(f(x)) separately because order can change the result.",
							"Track domain restrictions through compositions.",
							"Use horizontal-line reasoning to decide whether an inverse is a function.",
							"Find inverse formulas by swapping variables and solving.",
							"Verify inverse formulas with composition."
						],
						outcome:
							"Function operations become input-output reasoning rather than memorized notation.",
						checkpoints: [
							"Composition order is stated clearly.",
							"Domain restrictions are not ignored after substitution.",
							"Inverse claims are checked by composition or graph symmetry."
						],
						extension:
							"Restrict the domain of a non-one-to-one function and find an inverse on that restricted domain."
					})
				)
			],
			[
				lesson(
					"Project: Function Pipeline",
					practiceSet({
						goal: "Design a function pipeline and analyze how composition and inversion affect inputs and outputs.",
						steps: [
							"Create two or three functions that transform an input in a meaningful context.",
							"Compute the result of at least two different composition orders.",
							"Identify the domain restrictions created by the pipeline.",
							"Find an inverse for one reversible step or explain why it is not reversible.",
							"Represent the pipeline with equations, a table, or a diagram."
						],
						outcome:
							"The pipeline makes composition and inverse reasoning concrete.",
						checkpoints: [
							"Function order is visible in the diagram or table.",
							"At least one domain restriction is stated.",
							"The inverse discussion includes verification or a clear reason it fails."
						],
						extension:
							"Add a non-reversible step and describe what information is lost."
					})
				)
			]
		),
		module(
			"PCTA13 Circles and Ellipses",
			[
				lesson(
					"Concept: Circles and Ellipses",
					overview({
						title: "Conic sections use equations to describe geometric distance relationships.",
						concepts: [
							"A circle contains points at a fixed distance from a center and has standard form (x - h)^2 + (y - k)^2 = r^2.",
							"Completing the square converts many circle equations into center-radius form.",
							"An ellipse contains points whose distances to two foci have a constant sum.",
							"Ellipse standard form reveals center, major axis, minor axis, vertices, co-vertices, and foci."
						],
						practice:
							"Convert equations to standard form, identify geometric features, and sketch the conic with labeled axes or radius.",
						check: "A conic solution is complete when the equation, key features, and graph all match the same center and scale."
					})
				),
				lesson(
					"Problem Set: Circles and Ellipses",
					practiceSet({
						goal: "Write, interpret, and graph equations of circles and ellipses.",
						steps: [
							"Identify the conic type from equation structure.",
							"Complete the square when needed.",
							"Find the center and radius for circles.",
							"Find the center, axes, vertices, co-vertices, and foci for ellipses.",
							"Sketch the conic and label features."
						],
						outcome:
							"Circle and ellipse equations become geometric descriptions rather than only algebraic objects.",
						checkpoints: [
							"Completed-square form is algebraically equivalent to the original equation.",
							"Graph labels match the equation's center and scale.",
							"Ellipse major-axis direction matches the larger denominator."
						],
						extension:
							"Write a circle or ellipse equation from a graph or feature list."
					})
				)
			],
			[
				lesson(
					"Project: Conic Evidence Cards",
					practiceSet({
						goal: "Create a set of evidence cards that classify and graph circle and ellipse equations.",
						steps: [
							"Choose at least two circle equations and two ellipse equations.",
							"Convert each equation to standard form when necessary.",
							"Create a card listing conic type, center, key measurements, and graph features.",
							"Add one card where the conic type is easy to misidentify and explain the trap.",
							"Check one graph with technology or a carefully constructed table."
						],
						outcome:
							"The card set supports faster conic recognition and graphing.",
						checkpoints: [
							"Every card includes equation and graph evidence.",
							"At least one equation requires completing the square.",
							"The misidentification trap is explained."
						],
						extension:
							"Add a real-world design example such as a circular coverage zone or elliptical track."
					})
				)
			]
		),
		module(
			"PCTA14 Parabolas and Hyperbolas",
			[
				lesson(
					"Concept: Parabolas, Hyperbolas, and Conic Intersections",
					overview({
						title: "Parabolas and hyperbolas complete the conic family and extend graph-equation reasoning.",
						concepts: [
							"A parabola contains points equidistant from a focus and directrix; standard forms reveal vertex, axis, focus, and directrix.",
							"A hyperbola contains points whose distances to two foci have a constant difference.",
							"Hyperbola standard form reveals center, transverse axis, vertices, foci, and asymptotes.",
							"Intersections of conics are solved by combining equations and then checking all candidate points."
						],
						practice:
							"Identify conic type, convert to standard form when needed, extract graph features, and verify intersections algebraically.",
						check: "A conic analysis is complete when each feature on the graph comes from the equation and any intersection point satisfies both equations."
					})
				),
				lesson(
					"Problem Set: Parabolas, Hyperbolas, and Intersections",
					practiceSet({
						goal: "Analyze, graph, and solve problems involving parabolas, hyperbolas, and conic intersections.",
						steps: [
							"Identify conic type from equation structure.",
							"Put equations into standard form where possible.",
							"Find vertex, focus, directrix, center, axes, vertices, foci, and asymptotes as relevant.",
							"Solve intersection systems using substitution, elimination, or graph-supported algebra.",
							"Check candidate intersection points in both original equations."
						],
						outcome:
							"Conic work becomes a unified equation-to-geometry translation process.",
						checkpoints: [
							"Parabola orientation matches the squared variable.",
							"Hyperbola asymptotes match the standard-form denominators.",
							"Intersection answers are checked in both equations."
						],
						extension:
							"Create two conics with zero, one, two, or more intersections and explain the graph behavior."
					})
				)
			],
			[
				lesson(
					"Project: Conic Design Brief",
					practiceSet({
						goal: "Use conic equations to design or analyze a path, reflector, orbit-style model, or architectural shape.",
						steps: [
							"Choose a design context that can be modeled by a circle, ellipse, parabola, or hyperbola.",
							"Write an equation in standard form and label the important features.",
							"Sketch the design and connect each feature to the equation.",
							"Add one constraint such as size, center location, or intersection with another curve.",
							"Explain what the conic model captures and what it leaves out."
						],
						outcome:
							"The design brief connects conic algebra to geometric modeling.",
						checkpoints: [
							"The equation and graph represent the same conic.",
							"At least one real constraint is included.",
							"The model limitation is stated clearly."
						],
						extension:
							"Add a second conic and solve or estimate intersection points."
					})
				)
			]
		),
		module(
			"Check-In #2 and Pre-Calculus A Capstone",
			[
				lesson(
					"Check-In #2",
					checkIn({
						focus: "Rational functions, rational operations, logarithms, exponential functions, composition, inverses, and conics.",
						tasks: [
							"Analyze a rational function for restrictions, holes, asymptotes, and intercepts.",
							"Simplify or solve a rational expression or equation while preserving restrictions.",
							"Solve an exponential or logarithmic equation and state domain requirements.",
							"Evaluate a function composition and verify an inverse relationship.",
							"Classify and graph a conic from standard form or by completing the square.",
							"Solve or check a conic-intersection problem."
						],
						check: "Readiness is demonstrated when answers include restrictions, feature evidence, algebraic checks, and graph or context interpretation."
					})
				)
			],
			[
				lesson(
					"Capstone: Pre-Calculus A Modeling Portfolio",
					practiceSet({
						goal: "Build a portfolio that uses functions, polynomials, sequences, rational expressions, logarithms, and conics to answer connected modeling questions.",
						steps: [
							"Choose a theme such as design, business, motion, population, game mechanics, or architecture.",
							"Include one polynomial or piecewise model, one sequence or accumulation model, one rational or logarithmic model, and one conic model.",
							"For each model, provide equation, graph or table, key features, and one checked calculation.",
							"Add one error-analysis page that repairs a realistic mistake.",
							"Write a final reflection explaining which representation was most useful for each model."
						],
						outcome:
							"The portfolio demonstrates readiness for trigonometry-heavy pre-calculus and later calculus foundations.",
						checkpoints: [
							"Every model has an equation and a representation.",
							"At least one model includes domain restrictions.",
							"At least one answer is checked by substitution, graph behavior, or unit/context reasoning.",
							"The final reflection names strengths and remaining review targets."
						],
						extension:
							"Add a brief preview showing how a Riemann-sum or rate-of-change idea connects the portfolio to calculus."
					})
				),
				lesson(
					"Project: Rational, Logarithmic, and Conic Defense",
					practiceSet({
						goal: "Create a short defense that compares rational, logarithmic, inverse/composition, and conic reasoning across related examples.",
						steps: [
							"Choose one rational-function example and state its domain restrictions, asymptotes, or holes.",
							"Choose one logarithmic or exponential equation and state the domain or base requirement.",
							"Choose one composition, inverse, or conic example and identify the feature that controls the solution.",
							"Compare which representation made each example easiest to verify.",
							"Write one paragraph explaining how restrictions prevent plausible but invalid answers."
						],
						outcome:
							"The defense demonstrates that final answers are tied to restrictions, feature evidence, and verification.",
						checkpoints: [
							"Each example includes a stated restriction or feature.",
							"At least one answer is verified by substitution.",
							"The comparison names why one representation is stronger than another."
						],
						extension:
							"Add a conic-intersection or inverse-domain problem that produces an extraneous or rejected value."
					})
				),
				lesson(
					"Challenge: Portfolio Model Stress Test",
					practiceSet({
						goal: "Test whether one capstone conclusion survives a meaningful change to its assumptions or constraints.",
						steps: [
							"Choose one polynomial, sequence, rational, logarithmic, or conic model from the portfolio.",
							"Change one domain boundary, parameter, data value, or geometric constraint.",
							"Recalculate the affected result and update its graph, table, or feature list.",
							"Compare the original and changed conclusions.",
							"Explain which assumption controls the model's reliability."
						],
						outcome:
							"The stress test distinguishes a stable mathematical conclusion from one that depends heavily on a chosen assumption.",
						checkpoints: [
							"The changed condition is stated before recalculation.",
							"Both versions use the same variables and units.",
							"The comparison identifies what stayed stable and what changed."
						],
						extension:
							"Test a second model from a different function family and compare sensitivity."
					})
				)
			]
		),
		module(
			"Pre-Calculus A Reference Archive",
			[
				lesson(
					"Pre-Calculus A Reference Map",
					[
						"This reference map summarizes Pre-Calculus and Trigonometry A topic coverage and static media slots without embedding diagram files that are still pending in the class asset library.",
						[
							"**Course concept map**",
							"- Piecewise functions: conditional definitions, open and closed endpoints, discontinuities, absolute value as a piecewise function, step functions, floor and ceiling behavior, domain, and range.",
							"- Higher-degree polynomials: operations, standard form, factoring by common factors, grouping, special products, quadratic form, polynomial long division, synthetic division, remainders, and factor checks.",
							"- Polynomial zeros and graphs: number of zeros, rational zero candidates, multiplicity, end behavior, turning-point limits, graph transformations, and technology as a verification tool.",
							"- Sequences and accumulation: arithmetic sequences, geometric sequences, finite sums, infinite geometric sums, convergence conditions, Riemann sums, rectangle estimates, trapezoid estimates, and units for accumulated quantities.",
							"- Binomial theorem: Pascal's triangle, combination notation, coefficient patterns, exponent patterns, selected-term shortcuts, and sign tracking in subtraction cases.",
							"- Rational functions and expressions: holes, vertical asymptotes, horizontal or slant behavior, roots, restrictions, multiplying, dividing, adding, subtracting, equation solving, and extraneous-value checks.",
							"- Logarithms and exponents: exponential-log equivalence, log identities, graph transformations, inverse graph relationships, base requirements, positive-argument domains, and exponential growth modeling.",
							"- Composition, inverses, and conics: function pipelines, inverse verification, horizontal-line reasoning, circles, ellipses, parabolas, hyperbolas, completing the square, foci, directrices, asymptotes, and conic intersections."
						].join("\n"),
						[
							"**Reference links**",
							"- Riemann sum visualization: https://www.geogebra.org/m/RCVce5W4",
							"- Desmos area-under-curve prompt: https://www.desmos.com/calculator/tgyr42ezjq",
							"- Desmos graphing calculator for exponential/log modeling: https://www.desmos.com/calculator",
							"- Rational-function graph reference: https://www.desmos.com/calculator/auz2qerbgj"
						].join("\n"),
						"**Static-media note:** Legacy static diagrams are not embedded directly while those files are pending. The appendix lists stable static media URLs by original filename so diagrams can be added later without changing course references."
					].join("\n\n")
				)
			],
			[],
			"appendix"
		),
		module(
			"Pending Static Assets",
			[
				lesson(
					"Pre-Calculus A Pending Static Assets",
					sourceMediaReferences()
				)
			],
			[],
			"appendix"
		)
	],
	developmentMetadata: {
		priority: "urgent",
		standards: [
			"Higher-degree polynomial operations, factoring, division, zeros, and graphing",
			"Arithmetic, geometric, and infinite geometric sequences and series",
			"Riemann-sum area approximation and binomial theorem expansion",
			"Rational functions, rational operations, logarithms, exponentials, composition, and inverses",
			"Conic sections: circles, ellipses, parabolas, hyperbolas, and intersections"
		],
		sourcePolicy:
			"Built from the Pre-Calculus and Trigonometry A sequence with neutral wording, course-native explanations, and no legacy platform operations.",
		assessmentCadence: [
			"Check-In #1 after piecewise functions, polynomials, sequences, area approximation, and binomial theorem.",
			"Check-In #2 after rational functions, logarithms, inverses, composition, and conics.",
			"Capstone portfolio after the second check-in."
		],
		toolchain: [
			"Notebook or shared document",
			"Graphing calculator or Desmos-style graphing tool when visual behavior is being checked",
			"Optional spreadsheet for Riemann-sum and sequence tables"
		],
		safetyPolicy: [
			"No physical materials are required for core work.",
			"External graphing tools remain optional when school policy requires a specific calculator."
		],
		courseBoundaries: [
			"Pre-Calculus A emphasizes polynomial, rational, logarithmic, sequence, introductory accumulation, and conic foundations.",
			"Trigonometry, vectors, matrices, probability, limits, and rates of change are reserved for Pre-Calculus and Trigonometry B."
		],
		capstoneExpectations: [
			"A final modeling portfolio includes multiple function families, at least one restriction or domain argument, checked calculations, and a representation comparison."
		],
		recommendedNextWork: [
			"Use Pre-Calculus and Trigonometry B to continue the trigonometry, vectors, limits, and rates-of-change bridge into AP Calculus.",
			"Add source-safe graph cards or course assets for conics, rational functions, and polynomial graph behavior.",
			"Align the Algebra 2B handoff evidence with the first Pre-Calculus A checkpoint."
		]
	}
};

configureMathCourseFlow(preCalculusACourse, {
	courseId: "pre-calculus-a",
	modules: [
		{
			title: "PCTA1 Piecewise Functions",
			estimatedTime: "2–3 sessions · 50–65 minutes each",
			keyBlocks: [
				"domain condition",
				"piece selection",
				"open / closed endpoint",
				"piecewise graph",
				"continuity"
			],
			flowNote:
				"Choose the interval before evaluating, graph each rule only on its stated domain, and use endpoint evidence to describe continuity or a jump."
		},
		{
			title: "PCTA2 Higher-Degree Polynomials",
			estimatedTime: "2–3 sessions · 50–65 minutes each",
			keyBlocks: [
				"degree / leading term",
				"polynomial operation",
				"factor structure",
				"special product",
				"algebraic check"
			],
			flowNote:
				"Keep terms in standard form, track degree and leading coefficient through operations, and verify a factorization by multiplication."
		},
		{
			title: "PCTA3 Polynomial Division",
			estimatedTime: "2 sessions · 50–65 minutes each",
			keyBlocks: [
				"long division",
				"synthetic division",
				"divisor form",
				"quotient / remainder",
				"reconstruction check"
			],
			flowNote:
				"Select a division method from the divisor, include zero coefficients where terms are missing, and reconstruct the dividend to check quotient and remainder."
		},
		{
			title: "PCTA4 Zeros of Polynomials",
			estimatedTime: "3 sessions · 50–65 minutes each",
			keyBlocks: [
				"factor / remainder theorem",
				"rational-zero candidate",
				"multiplicity",
				"complex zero",
				"factorization check"
			],
			flowNote:
				"Use polynomial structure and theorems to narrow candidates, test each candidate efficiently, and record multiplicity before verifying the complete factorization."
		},
		{
			title: "PCTA5 Graphing Polynomials",
			estimatedTime: "3 sessions · 50–65 minutes each",
			keyBlocks: [
				"end behavior",
				"zero / multiplicity",
				"turning point",
				"sign interval",
				"feature-based sketch"
			],
			flowNote:
				"Build a feature table from degree, leading coefficient, zeros, and multiplicities before sketching, then use technology only to verify the algebraic prediction."
		},
		{
			title: "PCTA6 Arithmetic and Geometric Sequences",
			estimatedTime: "3 sessions · 50–65 minutes each",
			keyBlocks: [
				"difference / ratio",
				"recursive rule",
				"explicit rule",
				"finite sum",
				"infinite convergence"
			],
			flowNote:
				"Classify the sequence from its repeated operation, distinguish a requested term from a requested total, and justify infinite-series convergence before applying a sum formula."
		},
		{
			title: "PCTA7 Area Under a Curve",
			estimatedTime: "2–3 sessions · 50–65 minutes each",
			keyBlocks: [
				"partition",
				"left / right / midpoint rule",
				"rectangle area",
				"approximation error",
				"accumulation units"
			],
			flowNote:
				"State the partition and sample-point rule, show how each rectangle contributes to the sum, and interpret the approximation with units and an over-or-under estimate.",
			challengeSupplementalTitles: [
				"Project: Accumulation Approximation Lab"
			]
		},
		{
			title: "PCTA8 The Binomial Theorem",
			estimatedTime: "2 sessions · 50–65 minutes each",
			keyBlocks: [
				"Pascal's triangle",
				"combination coefficient",
				"exponent pattern",
				"sign pattern",
				"selected term"
			],
			flowNote:
				"Write coefficient, exponent, and sign patterns separately before combining terms, and check a selected term or small expansion independently."
		},
		{
			title: "Check-In #1: Polynomial and Sequence Foundations",
			estimatedTime: "1–2 sessions · 50–65 minutes each",
			keyBlocks: [
				"piecewise boundary",
				"polynomial zero / graph",
				"sequence / series",
				"area approximation",
				"binomial pattern"
			],
			flowNote:
				"Complete one task from each major strand without notes, identify the first unsupported step, and use targeted practice or error analysis before moving to rational and logarithmic functions.",
			challengeSupplementalTitles: [
				"Project: Polynomial and Sequence Error Analysis"
			]
		},
		{
			title: "PCTA9 Rational Functions",
			estimatedTime: "3 sessions · 50–65 minutes each",
			keyBlocks: [
				"source restriction",
				"hole / asymptote",
				"intercept",
				"end behavior",
				"feature-based graph"
			],
			flowNote:
				"Record excluded values before cancellation, distinguish holes from vertical asymptotes, and build the graph from algebraic features before checking it with technology."
		},
		{
			title: "PCTA10 Rational Function Operations",
			estimatedTime: "3 sessions · 50–65 minutes each",
			keyBlocks: [
				"factor / simplify",
				"common denominator",
				"source restriction",
				"rational equation",
				"extraneous solution"
			],
			flowNote:
				"Carry source restrictions through every operation, use a valid common denominator, and test every equation solution in the original expression."
		},
		{
			title: "PCTA11 Logarithms and Exponents",
			estimatedTime: "3 sessions · 50–65 minutes each",
			keyBlocks: [
				"exponential / logarithmic form",
				"log identity",
				"positive argument",
				"inverse graph",
				"growth / decay model"
			],
			flowNote:
				"Translate forms before solving, preserve base and positive-argument requirements, and connect the algebraic result to graph behavior or a bounded model."
		},
		{
			title: "PCTA12 Function Inverses and Composition",
			estimatedTime: "2–3 sessions · 50–65 minutes each",
			keyBlocks: [
				"composition order",
				"composite domain",
				"one-to-one condition",
				"inverse formula",
				"composition check"
			],
			flowNote:
				"Track which function acts first, carry domain restrictions through the pipeline, and verify every inverse claim by composition on the stated domain."
		},
		{
			title: "PCTA13 Circles and Ellipses",
			estimatedTime: "3 sessions · 50–65 minutes each",
			keyBlocks: [
				"standard form",
				"complete the square",
				"center / radius",
				"axis / vertex",
				"focus"
			],
			flowNote:
				"Convert to standard form, extract features with their geometric meanings, and check that every labeled point or distance agrees with the equation."
		},
		{
			title: "PCTA14 Parabolas and Hyperbolas",
			estimatedTime: "3 sessions · 50–65 minutes each",
			keyBlocks: [
				"conic classification",
				"focus / directrix",
				"center / vertex",
				"asymptote",
				"intersection check"
			],
			flowNote:
				"Classify the conic from equation structure, translate standard-form parameters into graph features, and verify every intersection in both original equations.",
			challengeSupplementalTitles: ["Project: Conic Design Brief"]
		},
		{
			title: "Check-In #2 and Pre-Calculus A Capstone",
			estimatedTime: "4–5 sessions · 50–65 minutes each",
			keyBlocks: [
				"readiness check",
				"multi-family portfolio",
				"restriction / domain",
				"representation comparison",
				"Pre-Calculus B handoff"
			],
			flowNote:
				"Use the check-in to select final review, then complete the required modeling portfolio with checked representations and an explicit Pre-Calculus B readiness note. The shorter defense remains an optional alternative artifact.",
			coreSupplementalTitles: [
				"Capstone: Pre-Calculus A Modeling Portfolio"
			],
			challengeSupplementalTitles: [
				"Challenge: Portfolio Model Stress Test"
			]
		}
	],
	appendixTitles: [
		"Pre-Calculus A Reference Archive",
		"Pending Static Assets"
	]
});
