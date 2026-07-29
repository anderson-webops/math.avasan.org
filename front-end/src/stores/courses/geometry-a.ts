import type { RawCourse } from "./types";
import { configureMathCourseFlow } from "./mathCourseFlow";
import {
	geometryAStaticFilenames,
	pendingStaticMediaNotice,
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
	return geometryAStaticFilenames
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

function project({
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

export const geometryACourse: RawCourse = {
	name: "Geometry A",
	modules: [
		module(
			"Geometry A Foundations: Definitions, Logic, and Proofs",
			[
				lesson(
					"GEOA1 Definitions and Notation",
					overview({
						title: "Geometry begins with precise names for objects and relationships before any calculation or proof is reliable.",
						concepts: [
							"Points name exact locations, lines extend forever in two directions, rays extend forever in one direction, and segments have two endpoints.",
							"Collinear points lie on the same line, coplanar points lie on the same plane, and intersections describe where objects share points.",
							"Angles are classified by measure: acute, right, obtuse, straight, complementary, supplementary, vertical, adjacent, and linear-pair relationships all carry different evidence.",
							"Notation matters because a point, segment, ray, line, angle, and plane can use the same letters while referring to different geometric objects."
						],
						practice:
							"Start from a labeled diagram, list every point-line-plane relationship visible, then translate the same diagram into formal notation and plain-language descriptions.",
						check: "A reliable explanation distinguishes the object being named from the letters used to name it and avoids claiming relationships that are not marked or implied."
					})
				),
				lesson(
					"GEOA2 Logical Reasoning",
					overview({
						title: "Logical reasoning turns observations into conditional statements, counterexamples, and valid deductions.",
						concepts: [
							"Inductive reasoning notices patterns and forms conjectures, but one counterexample can disprove a conjecture.",
							"Deductive reasoning uses definitions, postulates, theorems, and previously proven facts to reach a conclusion that follows from the given information.",
							"Conditional statements have hypotheses and conclusions; converse, inverse, and contrapositive statements do not always preserve truth in the same way.",
							"Truth tables, Venn-style category reasoning, and counterexample searches keep logic from becoming a guessing exercise."
						],
						practice:
							"Rewrite a geometric claim as an if-then statement, test its converse, and decide whether a diagram proves the claim or only suggests it.",
						check: "A complete reasoning chain names the given fact, the rule being used, and the conclusion that follows without relying on how a diagram happens to look."
					})
				),
				lesson(
					"GEOA3 Proofs",
					overview({
						title: "Proofs organize reasons so each statement follows from givens, definitions, algebraic properties, or earlier geometry facts.",
						concepts: [
							"Algebraic proofs use equality properties such as addition, subtraction, multiplication, division, substitution, and transitive reasoning.",
							"Geometric proofs use definitions of congruent segments, angle bisectors, midpoints, perpendicular lines, and supplementary or complementary relationships.",
							"Two-column, paragraph, and flow proofs are different formats for the same requirement: every statement has a valid reason.",
							"Proof repair is often easier than proof creation because the first invalid jump usually reveals the missing definition or theorem."
						],
						practice:
							"Build a proof backward from the target conclusion, list the facts needed immediately before it, then fill the proof forward from the givens.",
						check: "A proof is ready when every row changes exactly one piece of information or cites a rule that justifies combining multiple known facts."
					})
				)
			],
			[
				lesson(
					"Project: Geometry Notation Reference Map",
					project({
						goal: "Create a reference map that connects diagrams, notation, vocabulary, and example statements for the opening Geometry A concepts.",
						steps: [
							"Draw or describe one diagram containing at least five points, two lines, one ray, two segments, and two angles.",
							"Write the formal notation for each object and a plain-language description of what the notation names.",
							"Add at least six relationship statements, such as collinear, coplanar, intersecting, adjacent, complementary, supplementary, or vertical.",
							"Mark one tempting but unsupported statement and explain why the diagram does not prove it."
						],
						outcome:
							"The reference map becomes a reusable guide for translating between diagrams and formal geometry language.",
						checkpoints: [
							"Every symbol in the map has a plain-language meaning.",
							"At least one statement depends on marked information rather than visual estimation.",
							"One unsupported inference is identified and corrected."
						],
						extension:
							"Add a second diagram with the same labels arranged differently, then identify which statements remain true and which no longer have enough evidence."
					})
				),
				lesson(
					"Project: Proof Repair Lab",
					project({
						goal: "Diagnose and repair a flawed algebraic or geometric proof by locating the first unsupported step.",
						steps: [
							"Choose a short proof about segment addition, angle addition, midpoint, bisector, or complementary angles.",
							"Insert one realistic error: skipped substitution, wrong definition, unsupported congruence, or a conclusion based only on the drawing.",
							"Label each proof line as given, definition, algebra property, theorem, or invalid.",
							"Rewrite the proof so the corrected version reaches the same conclusion with complete reasons."
						],
						outcome:
							"The final artifact includes the flawed proof, the first invalid step, and a corrected proof with reasons.",
						checkpoints: [
							"The error is specific enough to fix, not merely marked as wrong.",
							"The corrected proof uses definitions or properties by name.",
							"The conclusion follows from the repaired chain rather than from the diagram alone."
						],
						extension:
							"Convert the repaired two-column proof into a paragraph proof without losing any required reasons."
					})
				)
			]
		),
		module(
			"GEOA4-GEOA5 Lines, Angles, and Coordinate Geometry",
			[
				lesson(
					"GEOA4 Parallel and Perpendicular Lines",
					overview({
						title: "Parallel and perpendicular lines connect visual angle relationships with proof statements.",
						concepts: [
							"Parallel lines cut by a transversal create corresponding, alternate interior, alternate exterior, same-side interior, and vertical angle relationships.",
							"Perpendicular lines create right angles, and all right angles are congruent.",
							"Angle relationships can prove lines parallel, and known parallel lines can prove angle congruence or supplementary angle pairs.",
							"Proofs involving parallel lines rely on the exact angle relationship being named, not on a diagram looking symmetric."
						],
						practice:
							"Given two lines and a transversal, classify angle pairs, solve for unknown angle measures, and write one proof that uses the named relationship.",
						check: "A line-angle argument is complete when the angle pair type, the relationship, and the resulting equation or proof step are all named."
					})
				),
				lesson(
					"GEOA5 Coordinate Geometry",
					overview({
						title: "Coordinate geometry uses algebra to prove geometric facts about distance, midpoint, slope, and line relationships.",
						concepts: [
							"Slope measures steepness and direction; equal slopes indicate parallel lines when the lines are distinct.",
							"Perpendicular non-vertical lines have slopes whose product is -1.",
							"The distance formula comes from the Pythagorean theorem, and the midpoint formula averages coordinates.",
							"Coordinate proofs translate a geometric claim into calculations that can be checked without relying on a drawing."
						],
						practice:
							"Place a quadrilateral or triangle on a coordinate plane, calculate slopes, side lengths, and midpoints, then use those results to classify the shape.",
						check: "A coordinate proof cites the formula used, shows the arithmetic, and links the numerical result back to the geometric claim."
					})
				)
			],
			[
				lesson(
					"Project: Coordinate Line Design",
					project({
						goal: "Design a coordinate-plane figure whose line relationships can be proven with slope, distance, and midpoint calculations.",
						steps: [
							"Choose coordinates for a triangle, quadrilateral, or small map with at least four labeled points.",
							"Calculate at least two slopes and explain whether the relevant lines are parallel, perpendicular, or neither.",
							"Calculate one distance and one midpoint, then state what each result proves about the figure.",
							"Write a final classification claim and support it with the computed evidence."
						],
						outcome:
							"The finished design includes coordinates, calculations, and a defensible classification or relationship claim.",
						checkpoints: [
							"Slope calculations include direction and line labels.",
							"Distance and midpoint calculations are connected to a geometry fact.",
							"The final claim is narrower than the evidence when the evidence does not prove a stronger classification."
						],
						extension:
							"Move one point and update the calculations to preserve one relationship while breaking another."
					})
				),
				lesson(
					"Project: Parallel-Line Proof Case File",
					project({
						goal: "Build a case file that proves an angle measure or line relationship using parallel-line theorems.",
						steps: [
							"Create a diagram with two lines, a transversal, and at least three labeled angle measures or expressions.",
							"Identify each relevant angle pair by name before writing any equation.",
							"Solve for an unknown angle or variable using the relationship that matches the angle pair.",
							"Write a short proof explaining why the calculation is valid."
						],
						outcome:
							"The case file contains a diagram, named angle relationships, an equation, and a proof explanation.",
						checkpoints: [
							"Corresponding, alternate interior, same-side interior, and vertical angle pairs are not mixed up.",
							"The equation matches the relationship: congruent pairs are set equal, while supplementary pairs sum to 180.",
							"The proof states whether parallel lines are given or proven."
						],
						extension:
							"Rewrite the case so the angle relationship proves the lines are parallel instead of using parallel lines as a given fact."
					})
				)
			]
		),
		module(
			"Check-In #1: Foundations and Lines",
			[
				lesson(
					"Foundations Readiness Check",
					[
						"Check-In #1 covers definitions and notation, inductive and deductive reasoning, proof structure, parallel-line angle relationships, and coordinate geometry.",
						"A strong response uses the correct object name, explains why a statement follows, and separates observed diagram features from proven facts. The same check can combine diagram labeling, conditional statements, a short proof, and a coordinate calculation.",
						"Common repair targets include using a line symbol for a segment, treating the converse of a conditional as automatically true, skipping proof reasons, mixing up angle-pair names, or using a coordinate formula without linking the result back to geometry."
					].join("\n\n")
				)
			],
			[
				lesson(
					"Project: Foundations Mixed Review",
					project({
						goal: "Create a mixed review set that combines notation, logic, proof, parallel lines, and coordinate geometry.",
						steps: [
							"Write one diagram-labeling question with at least four correct notation answers.",
							"Write one conditional statement and test its converse with a counterexample or proof.",
							"Write one short proof with a missing reason, then supply the missing reason.",
							"Write one coordinate problem that uses slope, distance, or midpoint to prove a relationship."
						],
						outcome:
							"The mixed review set contains answer explanations rather than only final answers.",
						checkpoints: [
							"Each question targets a different Geometry A foundation skill.",
							"The answer key explains the reason behind each answer.",
							"The coordinate problem includes a final geometry sentence."
						],
						extension:
							"Add one distractor answer for each question and explain why it is tempting but incorrect."
					})
				),
				lesson(
					"Project: Conditional Statement Sort",
					project({
						goal: "Sort geometry statements by hypothesis, conclusion, converse, counterexample, and proof status.",
						steps: [
							"Write six if-then statements using geometry vocabulary from the first five modules.",
							"For each statement, identify the hypothesis and conclusion.",
							"Write the converse and decide whether the converse is true, false, or not yet proven.",
							"Provide a counterexample or a short proof for at least three statements."
						],
						outcome:
							"The final sort makes logical structure visible before any proof format is chosen.",
						checkpoints: [
							"Hypotheses and conclusions are not swapped.",
							"False statements include a concrete counterexample.",
							"True statements cite a definition, postulate, or theorem."
						],
						extension:
							"Add contrapositive statements for two of the conditionals and compare their truth values with the original statements."
					})
				)
			]
		),
		module(
			"GEOA6-GEOA9 Triangles, Congruence, Similarity, and Right Triangles",
			[
				lesson(
					"GEOA6 Classifying Triangles",
					overview({
						title: "Triangles can be classified by side lengths, angle measures, and the relationships created inside the triangle.",
						concepts: [
							"Scalene, isosceles, and equilateral describe side-length relationships.",
							"Acute, right, obtuse, and equiangular describe angle relationships.",
							"Triangle angle sums, exterior angles, and isosceles-base-angle relationships are common sources of equations.",
							"Classification claims require enough evidence: one right-angle mark proves a right triangle, but a drawing that looks equal does not prove equal sides."
						],
						practice:
							"Classify triangles from diagrams, coordinate data, and algebraic expressions, then write the minimum evidence needed for each classification.",
						check: "A classification answer is complete when it names both side and angle type where possible and states the evidence used."
					})
				),
				lesson(
					"GEOA7-GEOA8 Congruence and Similarity",
					overview({
						title: "Congruence preserves size and shape, while similarity preserves shape and scale relationships.",
						concepts: [
							"Triangle congruence can be proven by SSS, SAS, ASA, AAS, and HL when the matching parts are identified correctly.",
							"SSA and AAA do not prove triangle congruence.",
							"Similar triangles have proportional corresponding sides and congruent corresponding angles.",
							"Similarity supports scale factors, indirect measurement, and proportional reasoning across diagrams."
						],
						practice:
							"Mark corresponding sides and angles first, choose the valid congruence or similarity rule, then solve for a missing side, angle, or scale factor.",
						check: "A congruence or similarity argument is complete when the correspondence order is correct and the chosen rule matches the marked evidence."
					})
				),
				lesson(
					"GEOA9 Right Triangles",
					overview({
						title: "Right triangles connect side-length formulas, special ratios, and proof tools.",
						concepts: [
							"The Pythagorean theorem applies only to right triangles and connects legs and hypotenuse by a^2 + b^2 = c^2.",
							"The converse of the Pythagorean theorem can prove a triangle is right when side lengths fit the relationship.",
							"Special right triangles, including 45-45-90 and 30-60-90 triangles, provide exact side ratios.",
							"Right-triangle reasoning appears again in distance formula, coordinate proofs, trigonometry, and triangle inequality work."
						],
						practice:
							"Decide which right-triangle tool fits the information given, then solve and check that the hypotenuse is the longest side.",
						check: "A right-triangle solution names the right angle, labels legs and hypotenuse, and checks whether the answer is exact, approximate, or impossible."
					})
				)
			],
			[
				lesson(
					"Project: Triangle Case File",
					project({
						goal: "Build a case file that classifies triangles and proves congruence, similarity, or right-triangle relationships.",
						steps: [
							"Create three triangle cases: one classification case, one congruence or similarity case, and one right-triangle case.",
							"For each case, list the given information and the exact relationship being proven or calculated.",
							"Choose the theorem or rule that fits the evidence and explain why competing rules do not apply.",
							"Solve for one missing side, angle, or scale factor in each case."
						],
						outcome:
							"The case file shows how different triangle tools are selected from the available evidence.",
						checkpoints: [
							"Each case has a different target skill.",
							"The correspondence order is correct for congruent or similar triangles.",
							"The right-triangle case labels the hypotenuse correctly."
						],
						extension:
							"Add one ambiguous case where the given information is not enough and explain what extra fact would make the case solvable."
					})
				),
				lesson(
					"Project: Similarity Scale Plan",
					project({
						goal: "Use similar triangles to model an indirect measurement problem.",
						steps: [
							"Choose a measurable scenario such as shadows, map scale, a ramp, a photograph, or a small model.",
							"Draw two triangles and label corresponding sides and angles.",
							"Write a proportion using the correct corresponding sides.",
							"Solve for the unknown measurement and explain the scale factor."
						],
						outcome:
							"The plan demonstrates how similarity turns a hard measurement into a proportion.",
						checkpoints: [
							"Corresponding sides are matched before the proportion is written.",
							"The scale factor has a clear direction from one triangle to the other.",
							"The final measurement includes units and a reasonableness check."
						],
						extension:
							"Use the same scale factor to predict a second measurement and compare whether the result remains realistic."
					})
				)
			]
		),
		module(
			"Check-In #2: Triangle Relationships",
			[
				lesson(
					"Triangle Readiness Check",
					[
						"Check-In #2 reviews triangle classification, triangle congruence, triangle similarity, right triangles, Pythagorean reasoning, and special right-triangle ratios.",
						"A complete response names the theorem or relationship before calculating. The most common mistakes are using a congruence rule when only similarity is known, assuming SSA proves congruence, forgetting correspondence order, or applying the Pythagorean theorem to a triangle that has not been proven right.",
						"A strong check includes at least one classification prompt, one proof prompt, one proportional-reasoning prompt, and one right-triangle calculation with units or exact radical form where appropriate."
					].join("\n\n")
				)
			],
			[
				lesson(
					"Project: Triangle Theorem Decision Tree",
					project({
						goal: "Create a decision tree that chooses between classification, congruence, similarity, and right-triangle tools.",
						steps: [
							"List the main evidence types: side lengths, angle measures, parallel lines, proportional sides, right-angle marks, and hypotenuse-leg information.",
							"Create branches that lead to classification, SSS, SAS, ASA, AAS, HL, similarity, Pythagorean theorem, or special right-triangle ratios.",
							"Attach one example problem to at least four branches.",
							"Add one warning branch for evidence that is not enough to prove the desired conclusion."
						],
						outcome:
							"The decision tree supports theorem selection before calculation begins.",
						checkpoints: [
							"Every branch starts from evidence, not from a desired answer.",
							"Invalid shortcuts such as SSA for congruence are marked clearly.",
							"Examples include both proof-style and calculation-style tasks."
						],
						extension:
							"Convert the decision tree into a short quiz where each prompt asks for the best theorem and a one-sentence reason."
					})
				),
				lesson(
					"Project: Pythagorean Error Repair",
					project({
						goal: "Repair common right-triangle mistakes involving leg labels, hypotenuse labels, radicals, and converse reasoning.",
						steps: [
							"Write or collect four flawed right-triangle solutions.",
							"Classify each error as wrong triangle type, wrong hypotenuse, arithmetic mistake, radical simplification issue, or unsupported converse claim.",
							"Correct each solution and explain the check that catches the mistake.",
							"Create one final mixed problem that requires deciding whether the Pythagorean theorem applies."
						],
						outcome:
							"The repair log makes right-triangle reasoning more reliable by naming the error pattern.",
						checkpoints: [
							"Every repair includes the original error and the corrected calculation.",
							"The hypotenuse is identified before substituting into the formula.",
							"At least one repair distinguishes theorem from converse."
						],
						extension:
							"Add a special right-triangle case and compare the ratio method with the Pythagorean method."
					})
				)
			]
		),
		module(
			"GEOA10-GEOA13 Triangle Centers, Inequalities, and Trigonometry",
			[
				lesson(
					"GEOA10 Bisectors",
					overview({
						title: "Bisectors create equal parts and locate important centers inside or around triangles.",
						concepts: [
							"A segment bisector divides a segment into two congruent pieces, while a perpendicular bisector creates right angles and equal distances from endpoints.",
							"Angle bisectors divide angles into two congruent angles and connect to points equidistant from the sides of an angle.",
							"The circumcenter is where perpendicular bisectors meet, and the incenter is where angle bisectors meet.",
							"Triangle centers have location patterns: some stay inside all triangles, while others move depending on whether the triangle is acute, right, or obtuse."
						],
						practice:
							"Use bisector definitions to write equations, locate centers, and explain why equal-distance claims follow from the construction.",
						check: "A bisector argument is complete when it states what is being divided, what becomes congruent, and which center or distance relationship follows."
					})
				),
				lesson(
					"GEOA11 Medians and Altitudes",
					overview({
						title: "Medians and altitudes add two more triangle-center systems: centroid and orthocenter.",
						concepts: [
							"A median connects a vertex to the midpoint of the opposite side.",
							"The three medians meet at the centroid, which divides each median in a 2:1 ratio from the vertex.",
							"An altitude is perpendicular from a vertex to the opposite side or its extension.",
							"The three altitudes meet at the orthocenter, whose location depends on the triangle type."
						],
						practice:
							"Identify medians and altitudes from diagrams, calculate missing segment lengths, and compare centroid, circumcenter, incenter, and orthocenter behavior.",
						check: "A triangle-center explanation names the construction used and does not confuse midpoint, perpendicular, and angle-bisector conditions."
					})
				),
				lesson(
					"GEOA12-GEOA13 Inequalities and Basic Trigonometry",
					overview({
						title: "The final Geometry A topics connect triangle size comparisons with trigonometric ratios.",
						concepts: [
							"Side-angle relationships compare larger sides with larger opposite angles.",
							"The triangle inequality theorem states that the sum of any two side lengths in a triangle must be greater than the third side.",
							"SOH-CAH-TOA defines sine, cosine, and tangent in right triangles through opposite, adjacent, and hypotenuse ratios.",
							"Unit-circle ideas connect trigonometry to coordinates and prepare the transition into later Geometry B, Algebra 2, and Pre-Calculus material."
						],
						practice:
							"Compare side and angle sizes, test whether side lengths can form a triangle, then solve right-triangle measurements using the correct trigonometric ratio.",
						check: "A trigonometry answer labels the reference angle, opposite side, adjacent side, and hypotenuse before choosing sine, cosine, or tangent."
					})
				)
			],
			[
				lesson(
					"Project: Triangle Center Blueprint",
					project({
						goal: "Create a blueprint that compares circumcenter, incenter, centroid, and orthocenter across different triangle types.",
						steps: [
							"Choose or draw one acute triangle, one right triangle, and one obtuse triangle.",
							"For each triangle, describe how to construct or locate each center.",
							"Record whether each center lies inside, on, or outside the triangle.",
							"Explain which construction depends on perpendicular bisectors, angle bisectors, medians, or altitudes."
						],
						outcome:
							"The blueprint separates four triangle centers by construction method and location behavior.",
						checkpoints: [
							"Each center is tied to the correct construction.",
							"Location claims account for acute, right, and obtuse triangles.",
							"The centroid ratio is stated correctly when medians are discussed."
						],
						extension:
							"Add one coordinate triangle and calculate a midpoint, slope, or median length that supports one center claim."
					})
				),
				lesson(
					"Project: Trigonometry Measurement Plan",
					project({
						goal: "Use right-triangle trigonometry to solve a measurement problem and explain the ratio choice.",
						steps: [
							"Choose a height, distance, ramp, shadow, sightline, or navigation scenario that forms a right triangle.",
							"Draw the right triangle and mark the reference angle, opposite side, adjacent side, and hypotenuse.",
							"Choose sine, cosine, or tangent based on the sides known and unknown.",
							"Solve the equation and include units, rounding, and a reasonableness check."
						],
						outcome:
							"The plan shows how a trigonometric ratio models a real measurement question.",
						checkpoints: [
							"The reference angle is identified before side labels are assigned.",
							"The selected ratio matches the known and unknown sides.",
							"The final answer includes units and a note about rounding or exactness."
						],
						extension:
							"Solve the same scenario from a different reference angle and compare how the ratio changes while the physical measurement stays consistent."
					})
				)
			]
		),
		module(
			"Check-In #3 and Geometry A Capstone",
			[
				lesson(
					"Final Readiness Check",
					[
						"Check-In #3 reviews bisectors, medians, altitudes, triangle centers, triangle inequalities, Pythagorean inequality reasoning, and basic trigonometry.",
						"A complete response can move between diagram evidence, algebraic setup, theorem selection, and final explanation. The highest-value review problems combine more than one idea: for example, a triangle-center construction with a coordinate calculation, or a trigonometry problem that begins with triangle inequality or right-triangle verification.",
						"The final review target is transfer. A geometry method is ready when it can be selected from the given evidence, explained without relying on the picture alone, and checked for impossible or unsupported cases."
					].join("\n\n")
				)
			],
			[
				lesson(
					"Capstone: Geometry A Design Defense",
					project({
						goal: "Create a geometry design or scenario and defend at least five claims using Geometry A tools.",
						steps: [
							"Design a map, structure, game board, logo, route system, or measurement scenario with labeled points, lines, angles, and triangles.",
							"Write five claims that use different parts of the course, such as notation, parallel lines, coordinate geometry, congruence, similarity, right triangles, triangle centers, inequalities, or trigonometry.",
							"Support each claim with calculation, proof reasoning, theorem selection, or a clear diagram annotation.",
							"Add one limitation: a claim that looks plausible from the drawing but is not proven by the available evidence."
						],
						outcome:
							"The capstone demonstrates Geometry A as a connected toolkit rather than a list of disconnected rules.",
						checkpoints: [
							"At least five different Geometry A ideas appear in the defense.",
							"Claims are supported by evidence, formulas, definitions, or theorems.",
							"One unsupported visual assumption is explicitly rejected."
						],
						extension:
							"Create a second version of the design that preserves three claims and breaks two claims, then explain exactly what changed."
					})
				),
				lesson(
					"Project: Geometry A Portfolio Audit",
					project({
						goal: "Review the course portfolio and identify the strongest evidence for each major Geometry A strand.",
						steps: [
							"Create a checklist for notation, logic, proof, lines, coordinate geometry, triangles, similarity, right triangles, centers, inequalities, and trigonometry.",
							"Choose one completed problem or project artifact for each strand.",
							"Write a short explanation of why each artifact proves readiness for that strand.",
							"Identify two strands that need more practice and write one targeted problem for each."
						],
						outcome:
							"The portfolio audit turns course completion into a specific map of strengths and review targets.",
						checkpoints: [
							"Every major Geometry A strand has at least one evidence artifact.",
							"Review targets name a concept, not just a module number.",
							"Targeted problems include answer reasoning or a checking method."
						],
						extension:
							"Rank the strands from most confident to least confident and connect the bottom two to a Geometry B preview topic."
					})
				)
			]
		),
		module(
			"Geometry A Reference Archive",
			[
				lesson(
					"Geometry A Reference Map",
					[
						"This reference map summarizes Geometry A topic coverage and static media slots without embedding diagram files that are still pending in the class asset library.",
						[
							"**Course concept map**",
							"- Geometry foundations: points, lines, rays, segments, planes, angle notation, collinearity, coplanarity, and diagram-supported versus unsupported claims.",
							"- Logical reasoning: inductive and deductive reasoning, conditional statements, converse/inverse/contrapositive comparisons, counterexamples, and proof readiness.",
							"- Proofs: algebraic proof properties, segment and angle addition, midpoint and bisector definitions, vertical angles, complementary and supplementary relationships, and proof repair.",
							"- Lines and angles: parallel and perpendicular lines, transversals, corresponding angles, alternate interior and exterior angles, same-side interior angles, and construction references.",
							"- Coordinate geometry: slope, distance, midpoint, parallel and perpendicular line tests, coordinate-plane classification, and evidence-backed shape claims.",
							"- Triangle work: classification, triangle sum, exterior angles, congruence shortcuts, similarity, right-triangle reasoning, Pythagorean theorem, triangle centers, inequalities, and introductory trigonometry."
						].join("\n"),
						[
							"**Reference links**",
							"- Perpendicular-line construction: https://www.khanacademy.org/math/geometry-home/geometric-constructions/geo-bisectors/v/constructing-a-perpendicular-line-using-a-compass-and-straightedge?modal=1",
							"- Perpendicular-bisector construction: https://www.khanacademy.org/math/geometry-home/geometric-constructions/geo-bisectors/v/constructing-a-perpendicular-line-using-a-compass-and-straightedge?modal=1",
							"- Equilateral-triangle construction: https://www.khanacademy.org/math/geometry-home/geometric-constructions/polygons-inscribed-in-circles/v/constructing-equilateral-triangle-inscribed-in-circle?modal=1",
							"- Trigonometry table reference: http://math2.org/math/trig/tables.htm",
							"- Scientific calculator reference: https://www.desmos.com/scientific"
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
					"Geometry A Pending Static Assets",
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
			"Geometry foundations",
			"Reasoning and proof",
			"Lines and angles",
			"Coordinate geometry",
			"Triangle congruence and similarity",
			"Right triangles and trigonometry"
		],
		sourcePolicy:
			"Built from the Geometry A sequence with neutral wording and no direct legacy static image embeds.",
		assessmentCadence: [
			"Check-In #1 after definitions, logic, proofs, lines, and coordinate geometry.",
			"Check-In #2 after triangle classification, congruence, similarity, and right triangles.",
			"Check-In #3 after triangle centers, inequalities, and trigonometry."
		],
		toolchain: [
			"Paper or shared diagram sketches",
			"Optional graphing or dynamic geometry workspace",
			"Coordinate-plane calculations"
		],
		safetyPolicy: [
			"No physical measurement setup is required for core work.",
			"Any optional measurement project can be replaced by a diagram, map, photograph, or provided dimensions."
		],
		courseBoundaries: [
			"Geometry A stops before the Geometry B focus on quadrilaterals, polygons, circles, transformations, and three-dimensional solids.",
			"Trigonometry coverage is introductory and right-triangle focused."
		],
		capstoneExpectations: [
			"A final design or portfolio defense includes multiple Geometry A strands, evidence for each claim, and one rejected visual assumption."
		],
		recommendedNextWork: [
			"Keep the Geometry B entry map aligned with the proof, triangle, coordinate, and trigonometry evidence in this capstone.",
			"Replace legacy diagrams with owned or source-safe static.classes assets where diagrams materially improve the lesson.",
			"Add dynamic-geometry optional resources for proofs, triangle centers, and transformations."
		]
	}
};

configureMathCourseFlow(geometryACourse, {
	courseId: "geometry-a",
	modules: [
		{
			title: "Geometry A Foundations: Definitions, Logic, and Proofs",
			estimatedTime: "4–5 sessions · 50–65 minutes each",
			keyBlocks: [
				"definition / notation",
				"conditional statement",
				"counterexample",
				"deductive reason",
				"proof chain"
			],
			flowNote:
				"Move from precise object names to conditionals and then to short proofs. A diagram suggests possibilities, while marks, definitions, postulates, and theorems establish claims. Choose the notation map for structured practice or the proof-repair lab for a deeper challenge.",
			challengeSupplementalTitles: ["Project: Proof Repair Lab"]
		},
		{
			title: "GEOA4-GEOA5 Lines, Angles, and Coordinate Geometry",
			estimatedTime: "3–4 sessions · 50–65 minutes each",
			keyBlocks: [
				"parallel / perpendicular",
				"transversal angle pair",
				"slope",
				"distance / midpoint",
				"coordinate proof"
			],
			flowNote:
				"Name each line or angle relationship before writing an equation, then use slope, distance, and midpoint as proof evidence rather than isolated calculations. The coordinate design is supported transfer; the parallel-line case file is a proof challenge.",
			challengeSupplementalTitles: [
				"Project: Parallel-Line Proof Case File"
			]
		},
		{
			title: "Check-In #1: Foundations and Lines",
			estimatedTime: "1–2 sessions · 50–65 minutes each",
			keyBlocks: [
				"notation",
				"logic",
				"proof reason",
				"line-angle relationship",
				"coordinate evidence"
			],
			flowNote:
				"Complete one notation, conditional, proof, line-angle, and coordinate task without notes. Correct the first unsupported inference and select only the mixed review or logic sort that matches the evidence gap.",
			challengeSupplementalTitles: ["Project: Conditional Statement Sort"]
		},
		{
			title: "GEOA6-GEOA9 Triangles, Congruence, Similarity, and Right Triangles",
			estimatedTime: "4–5 sessions · 50–65 minutes each",
			keyBlocks: [
				"triangle classification",
				"congruence criterion",
				"similarity / correspondence",
				"Pythagorean theorem",
				"special right triangle"
			],
			flowNote:
				"Classify from marked evidence, keep correspondence order consistent, and choose a theorem only after listing what is known. Use the triangle case file for broad transfer or the scale plan for an indirect-measurement challenge.",
			challengeSupplementalTitles: ["Project: Similarity Scale Plan"]
		},
		{
			title: "Check-In #2: Triangle Relationships",
			estimatedTime: "1–2 sessions · 50–65 minutes each",
			keyBlocks: [
				"classification evidence",
				"congruence / similarity",
				"correspondence",
				"right-triangle tool",
				"exact / approximate result"
			],
			flowNote:
				"Choose and defend the theorem before calculating, include one insufficient-evidence case, and correct one correspondence or hypotenuse error. The decision tree is supported review; the error-repair log is the challenge route.",
			challengeSupplementalTitles: ["Project: Pythagorean Error Repair"]
		},
		{
			title: "GEOA10-GEOA13 Triangle Centers, Inequalities, and Trigonometry",
			estimatedTime: "4 sessions · 50–65 minutes each",
			keyBlocks: [
				"bisector / median / altitude",
				"triangle center",
				"triangle inequality",
				"sine / cosine / tangent",
				"diagram-based ratio"
			],
			flowNote:
				"Link each triangle center to its construction, test side and angle constraints before solving, and label opposite, adjacent, and hypotenuse from a stated reference angle. The measurement plan is a challenge after the core right-triangle ratio work.",
			challengeSupplementalTitles: [
				"Project: Trigonometry Measurement Plan"
			]
		},
		{
			title: "Check-In #3 and Geometry A Capstone",
			estimatedTime: "3 sessions · 50–65 minutes each",
			keyBlocks: [
				"theorem-selection gate",
				"five geometry claims",
				"proof / calculation evidence",
				"unsupported visual assumption",
				"Geometry B handoff"
			],
			flowNote:
				"Pass the final theorem-selection check before building the design defense. The capstone is required and supports five claims from different Geometry A strands; the portfolio audit remains choose-one review for organizing evidence and Geometry B targets.",
			coreSupplementalTitles: ["Capstone: Geometry A Design Defense"]
		}
	],
	appendixTitles: ["Geometry A Reference Archive", "Pending Static Assets"]
});
