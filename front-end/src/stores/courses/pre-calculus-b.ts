import type { RawCourse } from "./types";
import { configureMathCourseFlow } from "./mathCourseFlow";
import {
	pendingStaticMediaNotice,
	preCalculusBStaticFilenames,
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
	return preCalculusBStaticFilenames
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

export const preCalculusBCourse: RawCourse = {
	name: "Pre-Calculus and Trigonometry B",
	modules: [
		module(
			"PCTB1 Trigonometry Basics",
			[
				lesson(
					"Concept: The Unit Circle",
					overview({
						title: "The unit circle turns trigonometry into coordinates, angles, and repeating patterns.",
						concepts: [
							"Angles can be measured in degrees or radians. Radians connect angle measure to arc length, with 2pi radians representing one full turn.",
							"The unit circle has radius 1 and center at the origin. A point on the circle has coordinates (cos theta, sin theta).",
							"Reference angles connect angles in different quadrants to familiar acute-angle values.",
							"Signs depend on quadrant: cosine is the x-coordinate, sine is the y-coordinate, and tangent is sine divided by cosine when cosine is nonzero.",
							"Special angles such as 30, 45, and 60 degrees provide exact values that reappear across graphs, equations, and identities."
						],
						practice:
							"Convert between degrees and radians, place angles on the unit circle, name reference angles, and write exact sine, cosine, and tangent values.",
						check: "A complete answer names the quadrant, the reference angle, the coordinate sign pattern, and the exact value."
					})
				),
				lesson(
					"Problem Set: Unit Circle Reasoning",
					practiceSet({
						goal: "Use the unit circle to evaluate trigonometric expressions and explain angle relationships.",
						steps: [
							"Convert standard angles between degrees and radians.",
							"Sketch each angle in standard position and identify its quadrant.",
							"Find the reference angle and exact unit-circle coordinates.",
							"Evaluate sine, cosine, and tangent from the coordinates.",
							"Compare coterminal and negative angles by tracing full rotations."
						],
						outcome:
							"Unit-circle values become coordinate evidence rather than memorized isolated facts.",
						checkpoints: [
							"Radians are written in terms of pi when exact form is expected.",
							"Quadrant signs match the coordinate position.",
							"Tangent is undefined when the cosine coordinate is zero."
						],
						extension:
							"Create a one-page unit-circle map that explains one angle from each quadrant."
					})
				),
				lesson(
					"Concept: Trigonometric Ratios and Non-Right Triangles",
					overview({
						title: "Trigonometric ratios begin in right triangles and extend to oblique triangles through general laws.",
						concepts: [
							"Right-triangle sine, cosine, and tangent compare side lengths relative to an angle.",
							"Reciprocal ratios cosecant, secant, and cotangent are connected to sine, cosine, and tangent through division by 1.",
							"The law of sines relates side lengths to opposite angle sines and works when enough side-angle pairs are known.",
							"The law of cosines generalizes the Pythagorean theorem and works when two sides and the included angle, or all three sides, are known.",
							"Ambiguous cases require checking whether the given information creates zero, one, or two valid triangles."
						],
						practice:
							"Choose the ratio or law based on the information provided, then check whether the result is geometrically possible.",
						check: "A strong solution names the known side-angle relationship before substituting into a formula."
					})
				)
			],
			[
				lesson(
					"Project: Unit Circle Field Guide",
					practiceSet({
						goal: "Build a reference guide that explains exact trigonometric values from geometry and coordinates.",
						steps: [
							"Select at least eight common angles across all four quadrants.",
							"Show each angle in radians and degrees.",
							"Write the reference angle and unit-circle coordinate for each selected angle.",
							"Evaluate sine, cosine, tangent, and one reciprocal ratio for each example.",
							"Add a short note explaining one sign mistake that the guide helps prevent."
						],
						outcome:
							"The guide becomes a reusable exact-value reference for later graphing and identity work.",
						checkpoints: [
							"Every angle includes degree and radian form.",
							"Coordinates match the quadrant.",
							"At least one undefined tangent or reciprocal case is explained."
						],
						extension:
							"Add a non-right-triangle example that uses the law of sines or law of cosines."
					})
				)
			]
		),
		module(
			"PCTB2 Graphs of Sine and Cosine",
			[
				lesson(
					"Concept: Graphing Sine and Cosine",
					overview({
						title: "Sine and cosine graphs show periodic motion, not just repeated waves.",
						concepts: [
							"Amplitude measures distance from the midline to a maximum or minimum.",
							"Period measures the horizontal length of one complete cycle.",
							"Midline shifts the center of oscillation up or down.",
							"Phase shift moves the graph left or right and changes where the cycle begins.",
							"Sine and cosine share the same shape but begin at different key points on the cycle."
						],
						practice:
							"Start from the parent graph, identify transformations, mark five key points, and then draw one full cycle before extending.",
						check: "A complete graph labels amplitude, period, midline, phase shift, and five key points."
					})
				),
				lesson(
					"Problem Set: Sine and Cosine Features",
					practiceSet({
						goal: "Graph sine and cosine equations and recover equations from graph features.",
						steps: [
							"Identify amplitude, period, midline, and phase shift from an equation.",
							"Calculate the x-spacing between quarter-cycle key points.",
							"Plot maximum, minimum, midline, and intercept key points.",
							"Write an equation that matches a given graph.",
							"Explain how each parameter changes the parent function."
						],
						outcome:
							"Graphing becomes a feature checklist tied to the equation parameters.",
						checkpoints: [
							"One full period is visible and labeled.",
							"The midline is drawn before maxima and minima are placed.",
							"The written equation reproduces the same period and vertical range."
						],
						extension:
							"Model a tide, temperature, Ferris wheel, or seasonal daylight pattern with a sinusoidal equation."
					})
				)
			],
			[
				lesson(
					"Project: Periodic Phenomenon Model",
					practiceSet({
						goal: "Use sine or cosine to model a repeating real-world quantity.",
						steps: [
							"Choose a periodic context such as height, temperature, sound, tide level, or circular motion.",
							"Estimate or choose maximum, minimum, period, and starting position.",
							"Write a sine or cosine model and label every parameter.",
							"Create a graph or table for at least two cycles.",
							"Interpret one maximum, one minimum, and one midline crossing in context."
						],
						outcome:
							"The final model connects equation features to observable repeated behavior.",
						checkpoints: [
							"Amplitude equals half the vertical range.",
							"The period matches the context's repeat length.",
							"Context interpretation matches the graph."
						],
						extension:
							"Revise the model with a phase shift and explain why the starting point changed."
					})
				)
			]
		),
		module(
			"PCTB3 Other Trigonometric Graphs",
			[
				lesson(
					"Concept: Tangent, Reciprocal, and Inverse Trigonometric Graphs",
					overview({
						title: "Other trigonometric graphs emphasize asymptotes, restricted domains, and inverse relationships.",
						concepts: [
							"Tangent repeats every pi radians and has vertical asymptotes where cosine equals zero.",
							"Cotangent, secant, and cosecant are reciprocal functions, so their asymptotes are tied to zeros of sine or cosine.",
							"Reciprocal graphing starts by graphing the related sine, cosine, or tangent guide curve.",
							"Inverse trigonometric functions require restricted domains so each input has one output.",
							"Transformations still affect vertical scale, period, and shifts, but asymptotes and domain restrictions require separate attention."
						],
						practice:
							"Draw the guide curve, mark zeros or restricted intervals, place asymptotes, and then sketch the target function.",
						check: "A reliable graph labels asymptotes or domain restrictions before tracing the curve."
					})
				),
				lesson(
					"Problem Set: Tangent, Reciprocal, and Inverse Graphs",
					practiceSet({
						goal: "Graph tangent, cotangent, secant, cosecant, and inverse trigonometric functions with correct restrictions.",
						steps: [
							"Identify the parent function and transformation parameters.",
							"Mark period, vertical scale, phase shift, and vertical shift.",
							"Find asymptote locations or inverse-function domain and range restrictions.",
							"Sketch a guide curve when working with reciprocal functions.",
							"Check whether sample points match the graph behavior."
						],
						outcome:
							"Graphing includes restrictions and asymptotes instead of relying only on wave shape.",
						checkpoints: [
							"Asymptotes occur at the correct transformed x-values.",
							"Inverse graphs respect the stated domain and range.",
							"Sample points agree with the equation."
						],
						extension:
							"Compare a secant graph with its cosine guide curve and explain every asymptote."
					})
				)
			],
			[
				lesson(
					"Project: Trigonometric Graph Gallery",
					practiceSet({
						goal: "Create a gallery that compares sine, cosine, tangent, reciprocal, and inverse trigonometric graphs.",
						steps: [
							"Choose one transformed example from at least four trig graph families.",
							"Label amplitude or vertical scale, period, shifts, restrictions, and asymptotes when relevant.",
							"Add one sample-point check for each graph.",
							"Write a short comparison explaining which features are shared and which are unique.",
							"Include one common graphing error and its correction."
						],
						outcome:
							"The gallery becomes a visual reference for recognizing trig graph families.",
						checkpoints: [
							"At least one graph includes vertical asymptotes.",
							"At least one graph includes inverse-domain restrictions.",
							"Each graph has a calculation that supports one plotted point."
						],
						extension:
							"Add a real-world interpretation for one graph whose range or asymptote matters."
					})
				)
			]
		),
		module(
			"PCTB4 Trigonometric Equations and Identities",
			[
				lesson(
					"Concept: Trigonometric Identities and Equations",
					overview({
						title: "Trigonometric identities rewrite expressions without changing their value, while equations ask which angles make a statement true.",
						concepts: [
							"Reciprocal, quotient, and Pythagorean identities connect the six trigonometric functions.",
							"An identity proof transforms one side into the other using valid algebraic and trigonometric replacements.",
							"Angle-sum, angle-difference, double-angle, and half-angle identities reveal exact values and equation strategies.",
							"Solving trigonometric equations requires finding all angles in the requested interval, not only one reference angle.",
							"Extraneous values can appear when squaring or dividing by an expression that may be zero."
						],
						practice:
							"Separate identity proofs from equation solving, write each transformation step, and check final angle values in the original equation.",
						check: "A complete solution names the identity used and verifies every solution in the requested interval."
					})
				),
				lesson(
					"Problem Set: Identities, Angle Formulas, and Equations",
					practiceSet({
						goal: "Prove identities and solve trigonometric equations using identities and interval reasoning.",
						steps: [
							"Rewrite reciprocal and quotient relationships using sine and cosine.",
							"Use Pythagorean identities to replace squared trig expressions.",
							"Apply sum, difference, double-angle, or half-angle formulas when an angle is combined or doubled.",
							"Solve equations by finding reference angles and quadrant positions.",
							"Substitute proposed solutions back into the original equation."
						],
						outcome:
							"Identity work becomes a sequence of justified transformations, and equation work becomes interval-based solution collection.",
						checkpoints: [
							"Every identity proof changes only one side at a time or clearly explains equivalent transformations.",
							"Solutions include all values in the requested interval.",
							"Values that make a denominator zero are rejected."
						],
						extension:
							"Create a false identity, find a counterexample, and explain why one tempting step fails."
					})
				)
			],
			[
				lesson(
					"Project: Identity Proof Notebook",
					practiceSet({
						goal: "Build a proof notebook that explains identity strategies and equation checks.",
						steps: [
							"Select at least four identities using different strategy types.",
							"Write each proof as a sequence of labeled transformations.",
							"Include one solved trigonometric equation that uses an identity.",
							"Check every equation solution in the original equation.",
							"Add a strategy note explaining when to convert everything to sine and cosine."
						],
						outcome:
							"The notebook documents proof logic rather than only final simplified expressions.",
						checkpoints: [
							"Every transformation is reversible or clearly justified.",
							"At least one proof uses a Pythagorean identity.",
							"At least one equation solution is rejected or explicitly checked."
						],
						extension:
							"Add an angle-sum or double-angle exact-value derivation."
					})
				)
			]
		),
		module(
			"PCTB5 Polar Coordinates",
			[
				lesson(
					"Concept: Polar Coordinates and Complex Numbers",
					overview({
						title: "Polar coordinates describe position by distance and angle instead of horizontal and vertical displacement.",
						concepts: [
							"A polar point (r, theta) moves r units from the origin at angle theta.",
							"The same point can have multiple polar representations because angles can rotate by full turns and r can be negative.",
							"Conversion between polar and rectangular forms uses x = r cos theta and y = r sin theta.",
							"Polar graphs can represent circles, roses, limacons, spirals, and other curves that are awkward in rectangular form.",
							"Complex numbers in polar form use modulus and argument to represent multiplication, division, and powers geometrically."
						],
						practice:
							"Plot polar points, convert coordinates, identify equivalent forms, and compare rectangular and polar graph descriptions.",
						check: "A complete response distinguishes point location from one particular coordinate representation."
					})
				),
				lesson(
					"Problem Set: Polar Graphs and Complex Polar Form",
					practiceSet({
						goal: "Work with polar points, polar equations, and complex numbers in polar form.",
						steps: [
							"Plot polar points with positive and negative radius values.",
							"Convert points between polar and rectangular coordinates.",
							"Sketch simple polar equations by making a table of theta and r values.",
							"Write complex numbers in rectangular and polar form.",
							"Use modulus and argument to interpret complex-number products or powers."
						],
						outcome:
							"Polar representation becomes a purposeful alternative to rectangular coordinates.",
						checkpoints: [
							"Equivalent polar coordinates land on the same point.",
							"Conversions preserve distance from the origin.",
							"Complex-number angle and magnitude are both identified."
						],
						extension:
							"Compare a polar graph and rectangular graph that represent the same circle."
					})
				)
			],
			[
				lesson(
					"Project: Polar Design Studio",
					practiceSet({
						goal: "Design and analyze a polar graph using tables, equations, and coordinate conversion.",
						steps: [
							"Choose a polar equation that creates a circle, rose, limacon, spiral, or custom curve.",
							"Build a table of theta and r values for one complete pattern.",
							"Sketch or graph the design and label symmetry or repeated features.",
							"Convert at least three polar points into rectangular coordinates.",
							"Write a short explanation of why polar form fits this design better than rectangular form."
						],
						outcome:
							"The design connects visual features to equation structure.",
						checkpoints: [
							"The chosen theta interval captures the full pattern.",
							"Converted points match the graph location.",
							"Symmetry or repetition is explained from the equation."
						],
						extension:
							"Add a complex-number polar-form calculation connected to one plotted point."
					})
				)
			]
		),
		module(
			"PCTB6 Parametric Equations",
			[
				lesson(
					"Concept: Parametric Equations",
					overview({
						title: "Parametric equations describe x and y separately as functions of a shared parameter.",
						concepts: [
							"A parameter such as t can represent time, angle, or another hidden input that controls both coordinates.",
							"Parametric form can show direction and speed along a path, information that a rectangular equation may hide.",
							"Eliminating the parameter can produce a rectangular equation, but the parameter interval still affects the traced curve.",
							"Tables of t, x(t), and y(t) reveal motion order and repeated points.",
							"Parametric equations are useful for projectiles, circular motion, animation paths, and curves with loops."
						],
						practice:
							"Make a t-table, plot ordered points, trace direction, and compare the parametric path with any rectangular form.",
						check: "A complete graph includes direction arrows and respects the parameter interval."
					})
				),
				lesson(
					"Problem Set: Parametric Paths",
					practiceSet({
						goal: "Graph, interpret, and convert parametric equations.",
						steps: [
							"Create a table of parameter values and ordered coordinate pairs.",
							"Plot points in order and mark direction of motion.",
							"Eliminate the parameter when algebraically possible.",
							"Compare the rectangular equation with the actual parameter-restricted path.",
							"Interpret starting point, ending point, speed change, or repeated location in context."
						],
						outcome:
							"Parametric equations are read as motion or ordered generation, not just another way to write y in terms of x.",
						checkpoints: [
							"Direction arrows follow increasing parameter values.",
							"The plotted interval matches the stated parameter domain.",
							"Any rectangular equation keeps the original restrictions."
						],
						extension:
							"Model a moving object with two different parameter speeds and compare the traces."
					})
				)
			],
			[
				lesson(
					"Project: Motion Path Model",
					practiceSet({
						goal: "Build a parametric model for a moving object or drawing path.",
						steps: [
							"Choose a context such as a thrown ball, robot path, orbit, game object, or animation curve.",
							"Define x(t) and y(t), including a realistic parameter interval.",
							"Create a table and graph of the path.",
							"Mark direction and key moments such as start, end, maximum height, or repeated position.",
							"Explain what information would be lost if the model were converted to rectangular form."
						],
						outcome:
							"The model uses the parameter to communicate motion and timing.",
						checkpoints: [
							"The parameter has a stated meaning.",
							"Graph direction matches increasing parameter values.",
							"At least one contextual event is identified from the model."
						],
						extension:
							"Add a second object with a different parametric path and identify an intersection or near-collision."
					})
				)
			]
		),
		module(
			"Check-In #1: Trigonometry and Coordinate Models",
			[
				lesson(
					"Trigonometry Fundamentals Review",
					checkIn({
						focus: "Unit-circle values, trigonometric ratios, non-right-triangle laws, graph features, identities, and equations.",
						tasks: [
							"Evaluate exact sine, cosine, tangent, and reciprocal values for angles in all quadrants.",
							"Choose law of sines or law of cosines for non-right-triangle information.",
							"Graph a sine, cosine, tangent, or reciprocal function with transformations and restrictions.",
							"Prove one identity and solve one trigonometric equation over a stated interval."
						],
						check: "The review demonstrates exact-value reasoning, graph-feature control, and interval-complete equation solving."
					})
				),
				lesson(
					"Polar and Parametric Review",
					checkIn({
						focus: "Polar points, equivalent coordinates, complex polar form, and parametric motion paths.",
						tasks: [
							"Convert between polar and rectangular coordinates.",
							"Identify two polar representations of the same point.",
							"Plot or describe a simple polar graph using a theta table.",
							"Graph a parametric path with direction arrows and parameter restrictions."
						],
						check: "The review separates location from representation and preserves parameter or angle restrictions."
					})
				)
			],
			[
				lesson(
					"Project: Trigonometry Error Audit",
					practiceSet({
						goal: "Diagnose and repair common mistakes across unit-circle, graphing, identity, polar, and parametric work.",
						steps: [
							"Collect or create five flawed solutions, each from a different topic.",
							"Identify the earliest incorrect step in each solution.",
							"Write the corrected reasoning and final answer.",
							"Name the misconception: sign, period, asymptote, identity misuse, equivalent coordinate, or parameter restriction.",
							"Add a prevention note for each error."
						],
						outcome:
							"The audit turns review into transferable diagnostic habits.",
						checkpoints: [
							"Every correction includes the original mistake and repaired reasoning.",
							"At least one graphing and one equation mistake are included.",
							"Prevention notes are specific enough to use later."
						],
						extension:
							"Turn the audit into a short mixed quiz with an answer key."
					})
				),
				lesson(
					"Project: Coordinate Model Comparison",
					practiceSet({
						goal: "Compare rectangular, polar, and parametric representations for the same mathematical relationship or motion pattern.",
						steps: [
							"Choose a curve, motion path, or repeated-angle pattern that can be represented in more than one form.",
							"Create at least two representations, such as a rectangular equation, polar equation, parametric equation, table, or graph.",
							"Identify what each representation makes easy to see.",
							"Identify what each representation hides or makes more difficult.",
							"Write a recommendation for which representation fits one specific question best."
						],
						outcome:
							"The comparison treats representations as tools with different strengths rather than as interchangeable notation.",
						checkpoints: [
							"Each representation describes the same object, path, or relationship.",
							"The comparison names at least one strength and one limitation for each representation.",
							"The recommendation is tied to a specific question such as location, direction, symmetry, or repeated behavior."
						],
						extension:
							"Add a third representation and explain whether it changes the recommendation."
					})
				)
			]
		),
		module(
			"PCTB7 Vectors",
			[
				lesson(
					"Concept: Introduction to Vectors",
					overview({
						title: "Vectors describe quantities with both magnitude and direction.",
						concepts: [
							"A vector can be represented geometrically as an arrow or algebraically as components.",
							"Magnitude measures vector length, often found with the Pythagorean theorem.",
							"Direction can be represented with an angle, a unit vector, or component signs.",
							"Vector addition combines displacement or force components, and scalar multiplication changes magnitude and possibly direction.",
							"Dot products connect vectors to projection, angle, and perpendicularity."
						],
						practice:
							"Move between arrows, component notation, magnitude, direction angle, sums, scalar multiples, and dot products.",
						check: "A complete answer identifies both magnitude and direction or explains why a scalar alone is insufficient."
					})
				),
				lesson(
					"Problem Set: Vector Operations and Graphing",
					practiceSet({
						goal: "Represent, add, scale, and interpret vectors geometrically and algebraically.",
						steps: [
							"Convert vector diagrams into component form.",
							"Find magnitude and direction from components.",
							"Add and subtract vectors by components and by head-to-tail diagrams.",
							"Multiply vectors by scalars and interpret the effect on direction.",
							"Use a dot product to identify angle behavior or projection."
						],
						outcome:
							"Vector operations become coordinate-level statements about direction and magnitude.",
						checkpoints: [
							"Component signs match the quadrant or direction.",
							"Magnitude is nonnegative.",
							"Geometric and algebraic addition agree."
						],
						extension:
							"Model combined wind, current, walking, or force vectors and interpret the resultant."
					})
				)
			],
			[
				lesson(
					"Project: Vector Navigation Map",
					practiceSet({
						goal: "Use vectors to model a navigation, force, or movement problem.",
						steps: [
							"Choose a context with at least three vector quantities.",
							"Draw each vector and write its component form.",
							"Compute a resultant vector and its magnitude.",
							"Interpret the direction and size of the resultant in context.",
							"Check the result with a diagram or alternative component calculation."
						],
						outcome:
							"The final map links vector arithmetic to a real direction-and-distance decision.",
						checkpoints: [
							"Every vector has units or contextual meaning.",
							"Components are added consistently.",
							"The resultant interpretation matches the diagram."
						],
						extension:
							"Add a constraint such as maximum speed, wind drift, or desired final position."
					})
				)
			]
		),
		module(
			"PCTB8 Matrices Review",
			[
				lesson(
					"Concept: Matrix Operations",
					overview({
						title: "Matrices organize numbers in rows and columns so operations can represent data transformations.",
						concepts: [
							"Matrix dimensions are written rows by columns and determine which operations are possible.",
							"Addition and subtraction require matching dimensions and operate entry by entry.",
							"Scalar multiplication multiplies every entry by the same number.",
							"Matrix multiplication combines rows of the first matrix with columns of the second matrix; order matters.",
							"Not every matrix has a multiplicative inverse, and inverse operations depend on determinant or row-reduction conditions."
						],
						practice:
							"State dimensions first, then perform each operation only when the dimensions allow it.",
						check: "A reliable matrix solution includes a dimension check before the arithmetic."
					})
				),
				lesson(
					"Problem Set: Adding, Subtracting, Multiplying, and Inverting Matrices",
					practiceSet({
						goal: "Perform matrix operations and explain when an operation is undefined.",
						steps: [
							"Identify dimensions for every matrix.",
							"Add and subtract matrices entry by entry when dimensions match.",
							"Multiply by scalars and interpret scale changes.",
							"Multiply matrices with row-by-column products.",
							"Check whether an inverse exists in small cases and use it when valid."
						],
						outcome:
							"Matrix work becomes structure checking followed by organized arithmetic.",
						checkpoints: [
							"Undefined operations are named rather than forced.",
							"Matrix multiplication dimensions match inner-to-outer rules.",
							"Inverse use is justified by invertibility."
						],
						extension:
							"Use a matrix to encode a transformation of points in the coordinate plane."
					})
				)
			],
			[
				lesson(
					"Project: Matrix Operation Explainer",
					practiceSet({
						goal: "Create a matrix reference that explains operation rules through examples and non-examples.",
						steps: [
							"Choose example matrices with at least three different dimension pairings.",
							"Show one valid addition or subtraction and one invalid operation.",
							"Show one valid matrix product and explain the row-by-column calculation.",
							"Include one inverse or determinant-based example when possible.",
							"Write a short rule summary for deciding whether an operation is defined."
						],
						outcome:
							"The reference emphasizes dimension logic rather than rote arithmetic.",
						checkpoints: [
							"Each example states matrix dimensions.",
							"At least one non-example is correctly rejected.",
							"Matrix multiplication order is explained."
						],
						extension:
							"Add a geometric transformation matrix and show its effect on three points."
					})
				)
			]
		),
		module(
			"PCTB9 Applications of Matrices",
			[
				lesson(
					"Concept: Linear Systems with Matrices",
					overview({
						title: "Matrices can represent and solve systems of linear equations compactly.",
						concepts: [
							"A system of equations can be written as a coefficient matrix, variable vector, and constant vector.",
							"Augmented matrices combine coefficients and constants for row operations.",
							"Row operations preserve solution sets when performed correctly.",
							"Reduced row-echelon form reveals one solution, no solution, or infinitely many solutions.",
							"Matrix inverses can solve Ax = b when A is square and invertible."
						],
						practice:
							"Translate equations into matrix form, solve using row operations or inverses, and interpret the solution type.",
						check: "A complete solution connects the final matrix row pattern to the system's solution behavior."
					})
				),
				lesson(
					"Problem Set: Matrix Systems",
					practiceSet({
						goal: "Represent and solve linear systems using matrices.",
						steps: [
							"Write a system as a coefficient matrix and augmented matrix.",
							"Use row operations to simplify the augmented matrix.",
							"Identify one solution, no solution, or infinitely many solutions from the row pattern.",
							"Solve a square invertible system with an inverse when appropriate.",
							"Check the solution in the original equations."
						],
						outcome:
							"Matrix methods become a second representation for system-solving and consistency analysis.",
						checkpoints: [
							"Equation order and variable order stay consistent.",
							"Row operations are recorded clearly.",
							"Final solutions satisfy the original equations."
						],
						extension:
							"Build a three-variable context and solve it with an augmented matrix."
					})
				)
			],
			[
				lesson(
					"Project: Linear System Case File",
					practiceSet({
						goal: "Use matrices to solve and explain an applied linear-system scenario.",
						steps: [
							"Choose a context such as mixtures, tickets, production, budgeting, or rates.",
							"Define variables and write a system of at least three equations.",
							"Translate the system into an augmented matrix.",
							"Use row operations or inverse matrices to solve.",
							"Check the solution and explain what each variable means."
						],
						outcome:
							"The case file demonstrates translation, computation, and contextual interpretation.",
						checkpoints: [
							"Variables are defined before equations are written.",
							"The matrix matches the equation order.",
							"The final values make sense in context."
						],
						extension:
							"Modify one constant and compare how the solution changes."
					})
				)
			]
		),
		module(
			"PCTB10 Partial Fraction Decomposition",
			[
				lesson(
					"Concept: Partial Fraction Decomposition",
					overview({
						title: "Partial fraction decomposition rewrites a rational expression as simpler rational pieces.",
						concepts: [
							"The denominator must be factored before the decomposition form can be chosen.",
							"Distinct linear factors, repeated linear factors, and irreducible quadratic factors use different template terms.",
							"Coefficients are found by clearing denominators and matching like terms or substituting strategic values.",
							"The decomposition is useful for integration preparation, algebraic simplification, and inverse operations.",
							"Improper rational expressions require polynomial division before decomposition."
						],
						practice:
							"Factor the denominator, choose the correct template, solve for coefficients, and verify by recombining the fractions.",
						check: "A complete decomposition recombines to the original rational expression."
					})
				),
				lesson(
					"Problem Set: Partial Fractions",
					practiceSet({
						goal: "Decompose rational expressions into simpler fractions and verify the result.",
						steps: [
							"Check whether the expression is proper or requires division first.",
							"Factor the denominator completely over the intended number system.",
							"Write the decomposition template for each factor type.",
							"Clear denominators and solve for coefficients.",
							"Recombine the result to verify the original expression."
						],
						outcome:
							"Partial fractions become a controlled template-and-verification process.",
						checkpoints: [
							"Repeated factors receive a term for each power.",
							"Irreducible quadratics use a linear numerator.",
							"Verification confirms the decomposition."
						],
						extension:
							"Connect one decomposition to an antiderivative preview without turning the module into a full calculus lesson."
					})
				)
			],
			[
				lesson(
					"Project: Rational Expression Decomposition Lab",
					practiceSet({
						goal: "Build a worked collection of partial fraction cases.",
						steps: [
							"Choose one expression with distinct linear factors.",
							"Choose one expression with a repeated factor.",
							"Choose one expression with an irreducible quadratic or an improper rational expression.",
							"Write the setup, coefficient solving, and verification for each case.",
							"Compare which setup was easiest to solve and why."
						],
						outcome:
							"The lab shows how denominator structure controls the decomposition strategy.",
						checkpoints: [
							"Every example has a different factor structure.",
							"Every coefficient is solved or justified.",
							"Every decomposition is checked by recombination."
						],
						extension:
							"Create a flawed decomposition and repair it."
					})
				)
			]
		),
		module(
			"PCTB11 Probability",
			[
				lesson(
					"Concept: Probability, Permutations, and Combinations",
					overview({
						title: "Probability compares favorable outcomes with possible outcomes, while counting methods define the sample space.",
						concepts: [
							"Simple probability is favorable outcomes divided by total possible outcomes when outcomes are equally likely.",
							"Compound probability depends on whether events are independent, dependent, mutually exclusive, or overlapping.",
							"Permutations count arrangements where order matters.",
							"Combinations count selections where order does not matter.",
							"Complement strategies can simplify probability when the direct event is complicated."
						],
						practice:
							"Define the sample space, decide whether order matters, choose the counting method, and then compute probability.",
						check: "A complete probability answer names the denominator and justifies how it was counted."
					})
				),
				lesson(
					"Problem Set: Counting and Probability",
					practiceSet({
						goal: "Solve probability, permutation, and combination problems with clear sample-space reasoning.",
						steps: [
							"Identify the event and the sample space.",
							"Decide whether order matters.",
							"Choose direct counting, complement counting, permutations, or combinations.",
							"Compute probability and simplify when appropriate.",
							"Explain whether events are independent, dependent, overlapping, or mutually exclusive."
						],
						outcome:
							"Probability calculations become counting arguments rather than formula matching.",
						checkpoints: [
							"The sample space is explicitly stated.",
							"Order-matters decisions are justified.",
							"Final probability is between 0 and 1."
						],
						extension:
							"Create a game rule and calculate whether the game is fair."
					})
				)
			],
			[
				lesson(
					"Project: Probability Game Audit",
					practiceSet({
						goal: "Design or analyze a game of chance using probability and counting methods.",
						steps: [
							"Define the game, possible outcomes, and winning event.",
							"Count the sample space using a tree, table, permutation, combination, or complement.",
							"Compute the probability of winning and losing.",
							"Decide whether the game is fair based on expected behavior or payout rules.",
							"Revise one rule and explain how the probability changes."
						],
						outcome:
							"The audit connects probability to game design and fairness.",
						checkpoints: [
							"All outcomes are counted once.",
							"Order assumptions match the game rules.",
							"The fairness claim is supported by calculation."
						],
						extension:
							"Simulate the game with a spreadsheet or small program and compare experimental results with theoretical probability."
					})
				)
			]
		),
		module(
			"PCTB12 Limits",
			[
				lesson(
					"Concept: Introduction to Limits and Continuity",
					overview({
						title: "Limits describe what a function approaches, not necessarily what the function equals at a point.",
						concepts: [
							"A limit asks about nearby input behavior as x approaches a value from the left and right.",
							"Tables and graphs can estimate limits, while algebra can confirm exact limiting behavior.",
							"One-sided limits must agree for a two-sided limit to exist.",
							"Continuity at a point requires the function value to exist, the limit to exist, and those values to match.",
							"Holes, jumps, vertical asymptotes, and oscillation create different types of limit or continuity failures."
						],
						practice:
							"Use tables, graphs, and algebraic simplification to compare function value, left-hand limit, right-hand limit, and two-sided limit.",
						check: "A complete limit answer separates approached value from actual function value."
					})
				),
				lesson(
					"Problem Set: Limits and Continuity",
					practiceSet({
						goal: "Estimate and evaluate limits and classify continuity behavior.",
						steps: [
							"Create a table of values approaching the target from both sides.",
							"Read left-hand and right-hand behavior from a graph.",
							"Simplify algebraic expressions when direct substitution creates an indeterminate form.",
							"State whether the two-sided limit exists.",
							"Classify continuity at the target point."
						],
						outcome:
							"Limit reasoning becomes evidence from nearby behavior, not just substitution.",
						checkpoints: [
							"Left and right behavior are checked separately.",
							"The function value is not confused with the limit.",
							"Continuity claims address all required conditions."
						],
						extension:
							"Create a piecewise function with a removable discontinuity and repair it by redefining one value."
					})
				)
			],
			[
				lesson(
					"Project: Limit Evidence Portfolio",
					practiceSet({
						goal: "Compare table, graph, and algebraic evidence for limit behavior.",
						steps: [
							"Choose four functions showing different limit behaviors: continuous, removable, jump, and infinite or nonexistent.",
							"Create a small left-right table for each target point.",
							"Sketch or graph each function near the target.",
							"Use algebraic simplification for at least one removable discontinuity.",
							"Write a conclusion for each case naming the limit and continuity status."
						],
						outcome:
							"The portfolio prepares for calculus by connecting limits to multiple forms of evidence.",
						checkpoints: [
							"Every case distinguishes limit from function value.",
							"At least one case has no two-sided limit.",
							"At least one case is repaired or redefined."
						],
						extension:
							"Add an epsilon-style informal explanation of what 'approaches' means in one example."
					})
				)
			]
		),
		module(
			"PCTB13 Rates of Change",
			[
				lesson(
					"Concept: Average Rate of Change and Derivative Preview",
					overview({
						title: "Rates of change connect secant slopes, tangent slopes, and the first big idea of calculus.",
						concepts: [
							"Average rate of change measures change in output divided by change in input over an interval.",
							"A secant line connects two points on a graph and has slope equal to average rate of change.",
							"Instantaneous rate of change is approached by shrinking the interval around a point.",
							"A derivative represents the tangent slope function when the limit exists.",
							"Units matter because rate describes one quantity changing with respect to another."
						],
						practice:
							"Compute average rates, compare secant slopes over shrinking intervals, and interpret positive, negative, zero, and changing rates in context.",
						check: "A complete rate answer includes units, interval, and interpretation."
					})
				),
				lesson(
					"Problem Set: Rates of Change and Derivatives",
					practiceSet({
						goal: "Calculate and interpret average rates of change and derivative-preview slopes.",
						steps: [
							"Compute average rate of change from tables, graphs, and formulas.",
							"Draw secant lines and estimate tangent slopes.",
							"Use smaller intervals to approximate instantaneous rate of change.",
							"Apply basic derivative notation as a preview of calculus language.",
							"Interpret slopes with correct units and context."
						],
						outcome:
							"Rate of change becomes a bridge from algebraic function behavior to calculus.",
						checkpoints: [
							"Input and output units appear in the rate.",
							"Average and instantaneous rates are not treated as identical unless justified.",
							"Graphical slope estimates match numerical trends."
						],
						extension:
							"Compare rates for two models and identify where one is increasing faster."
					})
				)
			],
			[
				lesson(
					"Project: Rate of Change Case Study",
					practiceSet({
						goal: "Analyze a changing quantity using average rates, graphical slopes, and derivative-preview reasoning.",
						steps: [
							"Choose a context such as distance, cost, population, temperature, height, or velocity.",
							"Create or find a table, graph, or formula for the quantity.",
							"Calculate average rates over at least three intervals.",
							"Estimate one instantaneous rate using nearby values or graph behavior.",
							"Write a conclusion explaining what the rates reveal about the situation."
						],
						outcome:
							"The case study shows why calculus begins with limits of rates of change.",
						checkpoints: [
							"Every rate includes units.",
							"At least two intervals are compared.",
							"The instantaneous estimate is labeled as an estimate or limit-based preview."
						],
						extension:
							"Use a graphing tool or spreadsheet to refine the instantaneous-rate estimate."
					})
				)
			]
		),
		module(
			"Check-In #2 and Pre-Calculus B Capstone",
			[
				lesson(
					"Vectors, Matrices, and Partial Fractions Review",
					checkIn({
						focus: "Vector operations, matrix arithmetic, linear-system matrices, and rational decomposition.",
						tasks: [
							"Represent vector magnitude and direction in component and geometric form.",
							"Perform matrix operations only after checking dimensions.",
							"Solve a linear system using an augmented matrix or inverse matrix when valid.",
							"Set up and verify a partial fraction decomposition."
						],
						check: "The review shows structure checks before computation: dimensions, factor types, row patterns, and verification."
					})
				),
				lesson(
					"Probability, Limits, and Rates Review",
					checkIn({
						focus: "Counting methods, probability reasoning, limits, continuity, and rate-of-change interpretation.",
						tasks: [
							"Define a sample space and choose permutations, combinations, complement, or direct counting.",
							"Evaluate left-hand, right-hand, and two-sided limits from multiple representations.",
							"Classify continuity behavior at a target point.",
							"Compute and interpret average rate of change with units."
						],
						check: "The review demonstrates correct representation choice and clear distinction between value, limit, and rate."
					})
				)
			],
			[
				lesson(
					"Capstone: Pre-Calculus B Modeling Portfolio",
					practiceSet({
						goal: "Build a portfolio that connects trigonometry, polar or parametric representation, vectors or matrices, probability, limits, and rates of change.",
						steps: [
							"Choose one unifying theme such as motion, navigation, game design, engineering, finance, biology, or data modeling.",
							"Include one trigonometric graph or equation with exact-value or identity evidence.",
							"Include one polar or parametric representation and explain what it reveals.",
							"Include one vector, matrix, probability, or partial-fraction component.",
							"Include one limit or rate-of-change analysis that previews calculus readiness.",
							"Write a final reflection comparing which representation was strongest for each question."
						],
						outcome:
							"The portfolio demonstrates readiness for AP Calculus or a rigorous applied-math sequence.",
						checkpoints: [
							"At least four course strands appear in the portfolio.",
							"Every model includes a calculation and a representation.",
							"One section explicitly distinguishes exact answer, estimate, and interpretation.",
							"The final reflection names remaining review targets before calculus."
						],
						extension:
							"Add a short oral or written defense that answers three challenge questions about assumptions and limitations."
					})
				),
				lesson(
					"Project: AP Calculus Readiness Map",
					practiceSet({
						goal: "Create a transition map from Pre-Calculus B topics into calculus ideas.",
						steps: [
							"Connect unit-circle and graph transformations to function fluency.",
							"Connect polar, parametric, vector, and matrix work to representation choice.",
							"Connect probability and partial fractions to later modeling or integration contexts.",
							"Connect limits and rates of change to derivatives.",
							"List three strengths and three review targets before beginning calculus."
						],
						outcome:
							"The readiness map identifies what transfers directly into calculus and what requires review.",
						checkpoints: [
							"Every connection names a specific earlier topic.",
							"At least one limit and one rate example are included.",
							"Review targets are concrete enough to practice."
						],
						extension:
							"Add one sample AP-style prompt and identify the prerequisite skill behind it."
					})
				),
				lesson(
					"Challenge: Timed Readiness Defense",
					practiceSet({
						goal: "Use timed evidence to defend a focused AP Calculus readiness plan.",
						steps: [
							"Select one trigonometry or coordinate task and one limit or rate-of-change task.",
							"Complete both under a stated time limit without notes.",
							"Classify every missed or uncertain step as concept, setup, calculation, representation, or explanation.",
							"Correct the work and name the prerequisite that controls each correction.",
							"Present a short readiness defense with two secure skills and two targeted review actions."
						],
						outcome:
							"The defense turns a general readiness impression into a specific evidence-based review plan.",
						checkpoints: [
							"Timed and corrected work are both retained.",
							"Each correction names the controlling prerequisite.",
							"Review actions identify a topic and a concrete practice task."
						],
						extension:
							"Add one calculator-active task and compare its setup demands with a no-calculator task."
					})
				)
			]
		),
		module(
			"Pre-Calculus B Reference Archive",
			[
				lesson(
					"Pre-Calculus B Reference Map",
					[
						"This reference map summarizes Pre-Calculus and Trigonometry B topic coverage and static media slots without embedding diagram files that are still pending in the class asset library.",
						[
							"**Course concept map**",
							"- Trigonometry basics: radians and degrees, unit-circle coordinates, reference angles, exact trigonometric values, reciprocal ratios, law of sines, law of cosines, and non-right-triangle cases.",
							"- Trigonometric graphs: sine, cosine, tangent, reciprocal, and inverse-trigonometric graph behavior; amplitude, period, midline, phase shift, asymptotes, restricted domains, and graph transformations.",
							"- Trigonometric equations and identities: reciprocal, quotient, and Pythagorean identities; identity proofs; equation solving; interval-complete solutions; and extraneous-solution checks.",
							"- Coordinate representations: polar points, equivalent polar coordinates, rectangular-polar conversion, polar graphs, complex numbers in polar form, parametric equations, parameter restrictions, and traced direction.",
							"- Linear-algebra previews: vector components, magnitude, direction, scalar multiplication, dot products, matrix dimensions, matrix operations, inverse matrices, row operations, augmented matrices, and solution-type interpretation.",
							"- Probability and calculus readiness: sample spaces, permutations, combinations, complements, compound probability, one-sided and two-sided limits, continuity, average rate of change, secant slopes, derivative notation, and units."
						].join("\n"),
						[
							"**Reference links**",
							"- Geogebra trigonometric-ratio exploration: https://www.geogebra.org/m/keqhdkaj",
							"- Desmos sine and cosine exploration: https://www.desmos.com/calculator/ombx9pxa7j",
							"- Desmos trigonometric graph transformations: https://www.desmos.com/calculator/y3xtkmytl4",
							"- Desmos parametric circle example: https://www.desmos.com/calculator/shd1bivrff",
							"- Desmos parametric pattern example: https://www.desmos.com/calculator/dyz4iw3ioi",
							"- Matrix calculator reference: https://matrixcalc.org/en/",
							"- Geogebra derivative demonstration: https://www.geogebra.org/m/nzv8jj9g"
						].join("\n"),
						"**Reference note:** Earlier planning notes cited a published AP Calculus practice book for selected rate-of-change and derivative-preview problems. No proprietary book content is reproduced in this course.",
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
					"Pre-Calculus B Pending Static Assets",
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
			"Unit-circle trigonometry, trigonometric ratios, non-right-triangle trigonometry, and exact values",
			"Sine, cosine, tangent, reciprocal, and inverse trigonometric graphs with transformations and restrictions",
			"Trigonometric identities, equations, polar coordinates, complex numbers in polar form, and parametric equations",
			"Vectors, matrix operations, matrix systems, and partial fraction decomposition",
			"Probability, permutations, combinations, limits, continuity, average rates of change, and derivative previews"
		],
		sourcePolicy:
			"Built from the Pre-Calculus and Trigonometry B sequence with neutral wording, course-native explanations, and no legacy platform operations.",
		assessmentCadence: [
			"Check-In #1 after trigonometry basics, graphing, identities, polar coordinates, and parametric equations.",
			"Check-In #2 after vectors, matrices, partial fractions, probability, limits, and rates of change.",
			"Capstone portfolio after the second check-in."
		],
		toolchain: [
			"Notebook or shared document",
			"Graphing calculator or Desmos-style graphing tool for trigonometric, polar, parametric, limit, and rate visual checks",
			"Optional spreadsheet for probability simulations, parametric tables, and rate-of-change approximations"
		],
		safetyPolicy: [
			"No physical materials are required for core work.",
			"External graphing tools remain optional when school policy requires a specific calculator."
		],
		courseBoundaries: [
			"Pre-Calculus B completes trigonometry, coordinate representation, linear algebra preview, probability, limits, and rates of change.",
			"Full derivative rules, integrals, and AP exam pacing belong in AP Calculus."
		],
		capstoneExpectations: [
			"A final modeling portfolio includes multiple representation types, exact and approximate reasoning, checked calculations, and a calculus-readiness reflection."
		],
		recommendedNextWork: [
			"Use AP Calculus to continue from limits and rates of change into derivative and integral reasoning.",
			"Add source-safe graph cards or course assets for trig graphs, polar curves, parametric paths, matrix systems, and limits.",
			"Add a cumulative Algebra 2B through Pre-Calculus B readiness checkpoint for accelerated learners."
		]
	}
};

configureMathCourseFlow(preCalculusBCourse, {
	courseId: "pre-calculus-b",
	modules: [
		{
			title: "PCTB1 Trigonometry Basics",
			estimatedTime: "3 sessions · 50–65 minutes each",
			keyBlocks: [
				"degree / radian",
				"unit-circle coordinate",
				"reference angle",
				"quadrant sign",
				"triangle solution"
			],
			flowNote:
				"Locate the angle and reference angle before evaluating, derive exact values from coordinates, and label known sides or angles before selecting a triangle relationship."
		},
		{
			title: "PCTB2 Graphs of Sine and Cosine",
			estimatedTime: "3 sessions · 50–65 minutes each",
			keyBlocks: [
				"parent cycle",
				"amplitude",
				"period",
				"midline",
				"phase shift"
			],
			flowNote:
				"Identify every transformation before plotting a cycle, place quarter-period landmarks, and verify the graph's range, midline, and repetition against the equation."
		},
		{
			title: "PCTB3 Other Trigonometric Graphs",
			estimatedTime: "3 sessions · 50–65 minutes each",
			keyBlocks: [
				"tangent period",
				"vertical asymptote",
				"reciprocal graph",
				"restricted inverse domain",
				"graph transformation"
			],
			flowNote:
				"Build tangent and reciprocal graphs from zeros and asymptotes, then connect inverse-trigonometric domains and ranges to the restrictions that make inversion valid."
		},
		{
			title: "PCTB4 Trigonometric Equations and Identities",
			estimatedTime: "3–4 sessions · 50–65 minutes each",
			keyBlocks: [
				"reciprocal / quotient identity",
				"Pythagorean identity",
				"algebraic transformation",
				"interval solution",
				"extraneous check"
			],
			flowNote:
				"Transform only one side when proving an identity, solve for a base trig value before listing interval solutions, and check candidates in the original equation."
		},
		{
			title: "PCTB5 Polar Coordinates",
			estimatedTime: "3 sessions · 50–65 minutes each",
			keyBlocks: [
				"polar point",
				"equivalent coordinate",
				"rectangular conversion",
				"polar graph",
				"complex polar form"
			],
			flowNote:
				"Plot radius and angle together, explain equivalent coordinates through rotation or a negative radius, and verify conversions in both coordinate systems.",
			challengeSupplementalTitles: ["Project: Polar Design Studio"]
		},
		{
			title: "PCTB6 Parametric Equations",
			estimatedTime: "2–3 sessions · 50–65 minutes each",
			keyBlocks: [
				"parameter table",
				"traced direction",
				"parameter elimination",
				"restricted path",
				"motion interpretation"
			],
			flowNote:
				"Build a parameter table before sketching, mark direction and domain restrictions, and distinguish the full rectangular curve from the portion actually traced."
		},
		{
			title: "Check-In #1: Trigonometry and Coordinate Models",
			estimatedTime: "1–2 sessions · 50–65 minutes each",
			keyBlocks: [
				"exact trig value",
				"transformed graph",
				"identity / equation",
				"polar conversion",
				"parametric path"
			],
			flowNote:
				"Complete one task from each trigonometric and coordinate strand without notes, repair the first unsupported transformation or graph feature, and use the optional comparison work only for targeted review.",
			challengeSupplementalTitles: [
				"Project: Coordinate Model Comparison"
			]
		},
		{
			title: "PCTB7 Vectors",
			estimatedTime: "2–3 sessions · 50–65 minutes each",
			keyBlocks: [
				"component form",
				"magnitude / direction",
				"vector operation",
				"dot product",
				"navigation interpretation"
			],
			flowNote:
				"Move deliberately between geometric and component forms, check magnitude and direction, and interpret vector operations or dot products in the original context."
		},
		{
			title: "PCTB8 Matrices Review",
			estimatedTime: "2 sessions · 50–65 minutes each",
			keyBlocks: [
				"matrix dimension",
				"entry operation",
				"row-by-column product",
				"determinant / inverse",
				"identity check"
			],
			flowNote:
				"Check dimensions before calculating, show representative row-by-column work, and verify an inverse by recovering the identity matrix."
		},
		{
			title: "PCTB9 Applications of Matrices",
			estimatedTime: "3 sessions · 50–65 minutes each",
			keyBlocks: [
				"system representation",
				"augmented matrix",
				"row operation",
				"solution type",
				"context check"
			],
			flowNote:
				"Translate the system into a labeled matrix, preserve equivalence through row operations, and interpret unique, none, or infinitely many solutions in context.",
			challengeSupplementalTitles: ["Project: Linear System Case File"]
		},
		{
			title: "PCTB10 Partial Fraction Decomposition",
			estimatedTime: "2–3 sessions · 50–65 minutes each",
			keyBlocks: [
				"proper rational expression",
				"denominator factor",
				"decomposition form",
				"coefficient system",
				"recombination check"
			],
			flowNote:
				"Divide first when needed, choose terms from the denominator's factor types, solve the coefficient system, and recombine the result to verify the source expression."
		},
		{
			title: "PCTB11 Probability",
			estimatedTime: "2–3 sessions · 50–65 minutes each",
			keyBlocks: [
				"sample space",
				"permutation / combination",
				"compound probability",
				"complement",
				"fairness claim"
			],
			flowNote:
				"Define outcomes and order assumptions before counting, select a probability rule from the event structure, and support any fairness claim with a calculation."
		},
		{
			title: "PCTB12 Limits",
			estimatedTime: "3 sessions · 50–65 minutes each",
			keyBlocks: [
				"left-hand limit",
				"right-hand limit",
				"function value",
				"algebraic simplification",
				"continuity"
			],
			flowNote:
				"Compare table, graph, and algebra evidence from both sides, keep approached value separate from function value, and test all continuity conditions explicitly."
		},
		{
			title: "PCTB13 Rates of Change",
			estimatedTime: "3 sessions · 50–65 minutes each",
			keyBlocks: [
				"average rate",
				"secant slope",
				"shrinking interval",
				"tangent estimate",
				"rate units"
			],
			flowNote:
				"Compute and interpret average rates over stated intervals, compare secant slopes as intervals shrink, and label instantaneous-rate results as estimates or limit-based previews."
		},
		{
			title: "Check-In #2 and Pre-Calculus B Capstone",
			estimatedTime: "4–5 sessions · 50–65 minutes each",
			keyBlocks: [
				"readiness review",
				"multi-representation portfolio",
				"exact / approximate reasoning",
				"limit / rate evidence",
				"AP Calculus handoff"
			],
			flowNote:
				"Use both review sections to select final practice, then complete the required modeling portfolio with checked representations and a calculus-readiness reflection. The readiness map remains optional planning.",
			coreSupplementalTitles: [
				"Capstone: Pre-Calculus B Modeling Portfolio"
			],
			challengeSupplementalTitles: ["Challenge: Timed Readiness Defense"]
		}
	],
	appendixTitles: [
		"Pre-Calculus B Reference Archive",
		"Pending Static Assets"
	]
});
