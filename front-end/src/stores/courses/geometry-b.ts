import type { RawCourse } from "./types";
import { configureMathCourseFlow } from "./mathCourseFlow";
import {
	geometryBStaticFilenames,
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
	return geometryBStaticFilenames
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

export const geometryBCourse: RawCourse = {
	name: "Geometry B",
	modules: [
		module(
			"GEOB1-GEOB2 Quadrilaterals and Parallelograms",
			[
				lesson(
					"GEOB1 Introduction to Quadrilaterals",
					overview({
						title: "Quadrilateral work starts with classification, angle sums, diagonals, and the difference between a broad category and a special case.",
						concepts: [
							"A quadrilateral has four sides, four vertices, and four interior angles whose measures sum to 360 degrees.",
							"Convex quadrilaterals keep every interior angle below 180 degrees, while concave quadrilaterals contain an inward angle greater than 180 degrees.",
							"A diagonal connects opposite vertices and splits a quadrilateral into two triangles, which explains the 360 degree interior-angle total.",
							"Trapezoids, kites, parallelograms, rectangles, rhombi, and squares are not interchangeable; each classification depends on side, angle, and parallel-line evidence."
						],
						practice:
							"Classify several four-sided figures from marked evidence, calculate missing angle measures, and write the narrowest name that is fully supported.",
						check: "A reliable classification names both the required properties and the evidence visible in the diagram or problem statement."
					})
				),
				lesson(
					"GEOB1 Trapezoids",
					overview({
						title: "Trapezoids connect parallel bases, legs, base angles, medians, and area into a focused quadrilateral family.",
						concepts: [
							"In this course, a trapezoid has exactly one pair of parallel sides; those parallel sides are the bases.",
							"An isosceles trapezoid has congruent legs, congruent base angles, and congruent diagonals.",
							"The median or midsegment of a trapezoid is parallel to the bases and has length equal to the average of the base lengths.",
							"Trapezoid area uses A = ((b1 + b2) / 2)h, so height must be perpendicular distance between the bases, not a slanted side."
						],
						practice:
							"Use angle sums, base-angle relationships, median formulas, and area formulas to solve trapezoid problems from labeled diagrams.",
						check: "A trapezoid solution identifies which sides are bases and distinguishes height from a leg before calculating area."
					})
				),
				lesson(
					"GEOB2 Parallelograms, Rhombi, Rectangles, and Squares",
					overview({
						title: "Parallelogram-family problems use side, angle, and diagonal properties to classify shapes and solve for unknowns.",
						concepts: [
							"A parallelogram has two pairs of parallel opposite sides; opposite sides and opposite angles are congruent, consecutive angles are supplementary, and diagonals bisect each other.",
							"A rhombus is a parallelogram with four congruent sides; its diagonals are perpendicular and bisect opposite angles.",
							"A rectangle is a parallelogram with four right angles; its diagonals are congruent.",
							"A square is both a rectangle and a rhombus, so it inherits right angles, congruent sides, congruent diagonals, perpendicular diagonals, and angle-bisecting diagonals."
						],
						practice:
							"Build a property table for the parallelogram family, then solve mixed problems that require choosing the correct property before writing an equation.",
						check: "The strongest solution names the exact quadrilateral family being used and does not apply square-only properties to every parallelogram."
					})
				)
			],
			[
				lesson(
					"Project: Quadrilateral Classification Case File",
					project({
						goal: "Create a case file that classifies quadrilaterals from evidence rather than appearance.",
						steps: [
							"Create or describe at least six quadrilaterals with marked side, angle, parallel-line, or diagonal information.",
							"For each figure, list every classification supported by the evidence, from broadest to narrowest.",
							"Mark one tempting classification that is not proven and explain what extra evidence would be needed.",
							"Solve one missing-angle, median, diagonal, or area question from the same set."
						],
						outcome:
							"The case file separates visual guesses from evidence-backed classification and includes at least one calculation.",
						checkpoints: [
							"Every classification cites a property such as parallel sides, congruent sides, right angles, or diagonal behavior.",
							"At least one figure has more than one valid name.",
							"At least one rejected name includes the missing evidence that would make it valid."
						],
						extension:
							"Add coordinate points for one figure and verify the classification with slope or distance calculations."
					})
				),
				lesson(
					"Project: Parallelogram Property Decision Tree",
					project({
						goal: "Build a decision tree that chooses the right parallelogram-family property for a given problem.",
						steps: [
							"List the core properties for parallelograms, rhombi, rectangles, and squares.",
							"Turn those properties into yes-or-no questions about sides, angles, diagonals, and parallel lines.",
							"Run at least eight sample prompts through the decision tree and record the selected property.",
							"Revise any branch that gives a property too broad or too narrow for the evidence."
						],
						outcome:
							"The decision tree becomes a reference for solving classification, angle, side-length, and diagonal problems.",
						checkpoints: [
							"Rhombus and rectangle properties are kept separate until a square is proven.",
							"Diagonal facts are matched to the correct shape family.",
							"Each sample prompt ends with a named property and a short reason."
						],
						extension:
							"Add a coordinate-geometry branch that uses slope and distance to prove one shape type."
					})
				)
			]
		),
		module(
			"GEOB3-GEOB4 Polygons and Circle Measurement",
			[
				lesson(
					"GEOB3 Properties and Area of Polygons",
					overview({
						title: "Polygon problems generalize angle sums, exterior angles, regularity, and area decomposition beyond triangles and quadrilaterals.",
						concepts: [
							"A polygon is a closed figure made of line segments; regular polygons have all sides congruent and all angles congruent.",
							"The interior angle sum of an n-gon is 180(n - 2), and a single interior angle in a regular n-gon is 180(n - 2) / n.",
							"The exterior angle sum of any convex polygon is 360 degrees, and a single exterior angle in a regular n-gon is 360 / n.",
							"Area work often decomposes complex polygons into triangles, rectangles, trapezoids, or other familiar pieces."
						],
						practice:
							"Calculate angle sums, individual angles, side counts, and composite areas from several polygons, then explain which formula or decomposition applies.",
						check: "A polygon solution states whether the polygon is regular before using a single-angle formula."
					})
				),
				lesson(
					"GEOB4 Circumference, Arcs, Chords, Areas, and Sectors",
					overview({
						title: "Circle measurement connects radius, diameter, circumference, arc length, area, and sectors through proportional reasoning.",
						concepts: [
							"Radius measures from center to circle, diameter passes through the center and equals 2r, circumference is C = 2 pi r or C = pi d, and area is A = pi r^2.",
							"Arc length is a fraction of circumference: arc length = (central angle / 360) times 2 pi r.",
							"Sector area is a fraction of circle area: sector area = (central angle / 360) times pi r^2.",
							"Chords, radii, and perpendicular distances create right triangles that can connect circle measurement back to the Pythagorean theorem."
						],
						practice:
							"Solve mixed circle problems that require deciding between full circumference, arc length, full area, sector area, and chord relationships.",
						check: "The calculation is complete when the radius or diameter is identified correctly and the answer is labeled as a length or area."
					})
				)
			],
			[
				lesson(
					"Project: Polygon Formula Field Guide",
					project({
						goal: "Create a field guide that chooses the correct polygon formula from the information given.",
						steps: [
							"Make entries for interior angle sum, regular polygon interior angle, exterior angle sum, regular polygon exterior angle, and composite area.",
							"For each entry, include the required input values and one sample problem.",
							"Add one warning about a common misuse, such as applying a regular polygon formula to an irregular polygon.",
							"Solve a mixed set of at least six polygon prompts using the guide."
						],
						outcome:
							"The field guide shows when each formula applies and how to detect unsupported assumptions.",
						checkpoints: [
							"Every formula includes units or angle labels where relevant.",
							"Regular and irregular polygon cases are separated.",
							"Composite area work includes a diagram description or decomposition plan."
						],
						extension:
							"Add one coordinate-plane polygon and calculate its area by decomposition."
					})
				),
				lesson(
					"Project: Circle Measurement Design Brief",
					project({
						goal: "Design a circular object or map feature and calculate its major measurements.",
						steps: [
							"Choose a circular object, sign, garden, track, wheel, or game map with a clear radius or diameter.",
							"Calculate circumference and area, then explain what each measurement means in context.",
							"Add one arc or sector and calculate its length or area using a central angle.",
							"Include one unit check that distinguishes linear units from square units."
						],
						outcome:
							"The design brief applies circle formulas to a context and explains the meaning of each result.",
						checkpoints: [
							"Radius and diameter are not swapped.",
							"Arc and sector calculations use the correct fraction of 360 degrees.",
							"Length and area answers use different units."
						],
						extension:
							"Add a chord and use a right triangle to find an unknown distance inside the circle."
					})
				)
			]
		),
		module(
			"GEOB5-GEOB6 Circle Theorems and Challenge Problems",
			[
				lesson(
					"GEOB5 Inscribed, Central, Internal, and External Angles",
					overview({
						title: "Circle angle problems depend on where the vertex sits and which arcs are intercepted.",
						concepts: [
							"A central angle has vertex at the center and has the same measure as its intercepted arc.",
							"An inscribed angle has vertex on the circle and measures half its intercepted arc.",
							"Two chords intersecting inside a circle create angle measures equal to half the sum of the intercepted arcs.",
							"Two secants, two tangents, or a secant and tangent outside a circle create angle measures equal to half the difference of the intercepted arcs."
						],
						practice:
							"Classify the vertex location first, identify intercepted arcs second, then choose the matching circle-angle relationship.",
						check: "A circle-angle solution is not ready until it names the angle type and the arcs used in the formula."
					})
				),
				lesson(
					"GEOB5 Tangents",
					overview({
						title: "Tangent problems use perpendicular radius relationships, equal tangent lengths, and circle-line contact at exactly one point.",
						concepts: [
							"A tangent line touches a circle at exactly one point, called the point of tangency.",
							"A radius drawn to the point of tangency is perpendicular to the tangent line.",
							"Tangent segments drawn from the same external point are congruent.",
							"Tangent, secant, and chord relationships often combine algebra, right triangles, and circle-angle facts in one problem."
						],
						practice:
							"Identify tangent points, draw the radius to create a right angle, then use congruent tangent segments or the Pythagorean theorem to solve for unknowns.",
						check: "The tangent claim is supported by a marked tangent point or stated tangent relationship, not by a line merely appearing to touch the circle."
					})
				),
				lesson(
					"GEOB6 Challenge Circle Problems",
					overview({
						title: "Challenge circle problems combine multiple relationships and require a strategy before calculation.",
						concepts: [
							"Complex circle problems can include arcs, chords, secants, tangents, triangles, quadrilaterals, and algebra in the same diagram.",
							"A useful first step is to label known arcs, equal segments, perpendicular radii, and angle relationships directly on a clean diagram.",
							"Many challenge problems become smaller when a hidden right triangle, supplementary angle pair, or equal tangent pair is identified.",
							"Back-solving from the desired quantity helps decide which intermediate value is worth finding."
						],
						practice:
							"Annotate a circle diagram, list candidate theorems, choose one chain of relationships, and write a short explanation after the calculation.",
						check: "A challenge solution includes a theorem chain, not only final arithmetic."
					})
				)
			],
			[
				lesson(
					"Project: Circle Theorem Sort",
					project({
						goal: "Build a sorting system that maps circle diagrams to the correct theorem family.",
						steps: [
							"Create cards for central angles, inscribed angles, internal chord intersections, external secant or tangent angles, tangent-radius right angles, and equal tangent segments.",
							"For each card, list the diagram clue, the formula or relationship, and one sample equation.",
							"Sort at least twelve prompts into theorem families and solve six of them.",
							"Record two prompts that look similar but require different formulas."
						],
						outcome:
							"The sort makes circle theorem selection visible before algebra begins.",
						checkpoints: [
							"Vertex location is used to distinguish central, inscribed, internal, and external angle cases.",
							"Tangent-radius and tangent-segment facts are not confused.",
							"Each solved prompt includes the theorem name and equation."
						],
						extension:
							"Add a mixed challenge prompt that requires two theorem families in sequence."
					})
				),
				lesson(
					"Project: Circle Challenge Walkthrough",
					project({
						goal: "Write a complete walkthrough for a multi-step circle challenge problem.",
						steps: [
							"Choose or design a circle diagram with at least three given values and two relationships.",
							"Annotate all known values, equalities, perpendicular relationships, and arc relationships before solving.",
							"Write the theorem chain in order, then complete the algebra.",
							"Add a final paragraph explaining why a different tempting theorem does not apply."
						],
						outcome:
							"The walkthrough demonstrates theorem selection, calculation, and rejection of an unsupported shortcut.",
						checkpoints: [
							"Every equation has a named geometric reason.",
							"The desired quantity is connected to at least one intermediate value.",
							"The rejected shortcut is plausible enough to be useful."
						],
						extension:
							"Create a second version of the diagram where the same theorem no longer applies, then explain the change."
					})
				)
			]
		),
		module(
			"Check-In #1: Quadrilaterals, Polygons, and Circles",
			[
				lesson(
					"Quadrilateral, Polygon, and Circle Readiness Check",
					[
						"Check-In #1 covers quadrilateral classification, trapezoids, parallelogram-family properties, polygon angle sums, polygon area, circle circumference and area, arcs, sectors, circle angles, tangents, and challenge circle reasoning.",
						"A strong response identifies the figure type, chooses the relevant property or formula, sets up the equation with units or angle labels, and explains why the chosen relationship applies. The same check can combine a classification question, a missing-measure calculation, and a theorem-selection explanation.",
						"Common repair targets include using a square property on a generic parallelogram, applying regular-polygon formulas without regularity, swapping circumference and area, using arc length when sector area is needed, or choosing a circle-angle formula without checking vertex location."
					].join("\n\n")
				)
			],
			[
				lesson(
					"Project: First-Half Geometry Review Set",
					project({
						goal: "Create a review set that mixes quadrilaterals, polygons, and circles without grouping questions by topic.",
						steps: [
							"Write or collect at least ten prompts covering classification, angle sums, area, circumference, arc or sector measurement, and circle-angle facts.",
							"Solve each prompt and tag the exact property or formula used.",
							"Add two wrong-but-plausible solutions and explain the first invalid step in each.",
							"Create a short answer key that includes reasoning, not only final values."
						],
						outcome:
							"The review set checks theorem selection under mixed conditions.",
						checkpoints: [
							"Prompts are not grouped in the same order as the modules.",
							"Every solution names the property or formula used.",
							"At least two explanations diagnose a likely misconception."
						],
						extension:
							"Convert two prompts into coordinate-plane versions and solve them again with slope, distance, or midpoint evidence."
					})
				),
				lesson(
					"Project: Formula and Theorem Error Clinic",
					project({
						goal: "Build an error clinic for first-half Geometry B formula and theorem mistakes.",
						steps: [
							"Choose five common error types from quadrilateral, polygon, and circle work.",
							"For each error, write a flawed solution, identify the first invalid step, and write the corrected version.",
							"Include at least one unit error, one classification error, one angle-theorem error, and one area or circumference error.",
							"Summarize how to detect each error before calculation goes too far."
						],
						outcome:
							"The clinic turns mistakes into a reusable diagnostic guide.",
						checkpoints: [
							"The first invalid step is identified precisely.",
							"Corrections cite formulas or theorems by name.",
							"Each error type includes a prevention cue."
						],
						extension:
							"Add a challenge circle error that combines two theorem families."
					})
				)
			]
		),
		module(
			"GEOB7-GEOB8 Transformations",
			[
				lesson(
					"GEOB7 Translations and Rotations",
					overview({
						title: "Rigid transformations move figures without changing size or shape, so congruence is preserved.",
						concepts: [
							"A translation slides every point the same horizontal and vertical amount, often written as (x, y) -> (x + a, y + b).",
							"A rotation turns every point around a center by a fixed angle and direction.",
							"Common coordinate rotations around the origin include 90 degrees, 180 degrees, and 270 degrees with predictable coordinate rules.",
							"Translations and rotations preserve side lengths, angle measures, perimeter, and area."
						],
						practice:
							"Transform several points and figures on a coordinate plane, then compare original and image coordinates to describe the rule.",
						check: "A transformation answer includes the rule, the direction or angle when needed, and the image coordinates."
					})
				),
				lesson(
					"GEOB8 Reflections and Dilations",
					overview({
						title: "Reflections preserve congruence, while dilations preserve shape but change size by a scale factor.",
						concepts: [
							"A reflection flips a figure across a line; common coordinate reflections use the x-axis, y-axis, y = x, or y = -x.",
							"Reflections preserve side lengths and angle measures but reverse orientation.",
							"A dilation from a center multiplies distances by a scale factor; scale factors greater than 1 enlarge and between 0 and 1 reduce.",
							"Dilations create similar figures: angle measures stay equal, side lengths scale, perimeter scales by the same factor, and area scales by the square of the factor."
						],
						practice:
							"Apply reflection and dilation rules to figures, then decide whether the image is congruent or similar to the original.",
						check: "A dilation solution names the center, scale factor, and which measurements scale linearly or by area."
					})
				)
			],
			[
				lesson(
					"Project: Transformation Rule Gallery",
					project({
						goal: "Create a gallery of coordinate transformation rules with original and image points.",
						steps: [
							"Choose one figure with at least four points.",
							"Apply a translation, rotation, reflection, and dilation to the same original figure.",
							"Record the coordinate rule and image coordinates for each transformation.",
							"State whether each image is congruent, similar, or neither, and justify the decision."
						],
						outcome:
							"The gallery makes transformation rules and preserved properties visible side by side.",
						checkpoints: [
							"Every image coordinate follows the stated rule.",
							"Rigid transformations and dilations are classified differently.",
							"Orientation change is noted for reflections."
						],
						extension:
							"Compose two transformations and compare whether order changes the final image."
					})
				),
				lesson(
					"Project: Logo Transformation Redesign",
					project({
						goal: "Use transformations to redesign a simple logo or geometric pattern while documenting the rules.",
						steps: [
							"Create a base shape or point set that can be transformed cleanly.",
							"Use at least three transformations, including one rigid transformation and one dilation.",
							"Write the coordinate rule or geometric description for each move.",
							"Explain which properties are preserved and which measurements change."
						],
						outcome:
							"The redesigned logo or pattern includes a transformation log that verifies the geometry.",
						checkpoints: [
							"Transformations are intentional rather than random redraws.",
							"Scale factor effects are explained for length and area.",
							"Original and final figures can be matched through the listed rules."
						],
						extension:
							"Add symmetry analysis by identifying a line or rotational symmetry in the finished design."
					})
				)
			]
		),
		module(
			"GEOB9-GEOB10 Polyhedra and Round Solids",
			[
				lesson(
					"GEOB9 Polyhedra, Prisms, and Pyramids",
					overview({
						title: "Three-dimensional geometry starts with faces, edges, vertices, nets, surface area, and volume.",
						concepts: [
							"A polyhedron is a solid with flat polygonal faces; faces meet at edges, and edges meet at vertices.",
							"Euler's formula V - E + F = 2 connects vertices, edges, and faces for many convex polyhedra.",
							"Prism volume is base area times height, and prism surface area is the total area of all faces or the area represented by a net.",
							"Pyramid volume is (1/3) times base area times height; slant height belongs to lateral area, while vertical height belongs to volume."
						],
						practice:
							"Identify the base shape, sketch or describe a net, calculate surface area, and calculate volume for prisms and pyramids.",
						check: "A solid-geometry solution separates base area, lateral area, total surface area, vertical height, and slant height."
					})
				),
				lesson(
					"GEOB10 Cylinders, Cones, and Spheres",
					overview({
						title: "Round solids extend area and volume reasoning to circular bases and curved surfaces.",
						concepts: [
							"Cylinder volume is pi r^2 h, and cylinder surface area combines two circular bases with a rectangular lateral wrap.",
							"Cone volume is (1/3) pi r^2 h, and cone surface area uses base area plus lateral area involving slant height.",
							"Sphere volume is (4/3) pi r^3, and sphere surface area is 4 pi r^2.",
							"Composite solid problems require identifying which parts are exposed, removed, or combined before applying formulas."
						],
						practice:
							"Calculate surface area and volume for cylinders, cones, spheres, and simple composites, keeping radius, diameter, height, and slant height distinct.",
						check: "The answer includes correct units, a clear formula choice, and an explanation of which surfaces or volumes are included."
					})
				)
			],
			[
				lesson(
					"Project: Solid Geometry Formula Lab",
					project({
						goal: "Create a formula lab for prisms, pyramids, cylinders, cones, and spheres.",
						steps: [
							"Build a table with formulas for surface area and volume, required inputs, and common traps.",
							"Solve one prism, one pyramid, one cylinder, one cone, and one sphere problem.",
							"Add a unit explanation for each answer.",
							"Include one composite solid and explain how the component pieces are combined or subtracted."
						],
						outcome:
							"The formula lab becomes a reference for choosing and applying solid-geometry formulas.",
						checkpoints: [
							"Slant height and vertical height are not mixed.",
							"Radius and diameter are identified before formulas are used.",
							"Composite work explains included and excluded surfaces or volumes."
						],
						extension:
							"Compare two containers with equal volume but different surface areas and explain which is more material-efficient."
					})
				),
				lesson(
					"Project: Packaging Design Optimization",
					project({
						goal: "Design packaging for an object using surface area, volume, and constraints.",
						steps: [
							"Choose an object or product that can be approximated by a prism, cylinder, cone, sphere, or composite solid.",
							"Set at least two constraints, such as minimum volume, maximum height, material limit, or shipping shape.",
							"Calculate the surface area and volume of one proposed design.",
							"Revise one dimension and compare the new design to the first."
						],
						outcome:
							"The design brief uses solid geometry to justify a packaging decision.",
						checkpoints: [
							"Assumptions are stated before calculations.",
							"Every dimension has units.",
							"The comparison uses both volume and surface area, not only appearance."
						],
						extension:
							"Add cost per square unit of material and estimate total material cost for both designs."
					})
				)
			]
		),
		module(
			"Check-In #2 and Geometry B Capstone",
			[
				lesson(
					"Transformations and Solids Readiness Check",
					[
						"Check-In #2 covers translations, rotations, reflections, dilations, transformation notation, congruence versus similarity, polyhedra, prisms, pyramids, cylinders, cones, spheres, formulas, and applications.",
						"A strong response states the transformation rule, computes image coordinates accurately, identifies preserved and changed measurements, chooses the correct three-dimensional formula, and labels all units.",
						"Common repair targets include rotating in the wrong direction, reflecting across the wrong line, treating a dilation as congruent, using slant height as vertical height, using diameter as radius, or including hidden surfaces in a surface-area calculation."
					].join("\n\n")
				),
				lesson(
					"Geometry B Capstone Synthesis",
					overview({
						title: "The capstone ties quadrilaterals, polygons, circles, transformations, and solids into a single design-and-defense task.",
						concepts: [
							"Two-dimensional classification and measurement provide the base evidence for many three-dimensional designs.",
							"Transformations can create repeated structures, symmetry, scale models, and similar figures.",
							"Circle and polygon formulas support both flat layouts and solid-geometry surface calculations.",
							"A complete defense names assumptions, formulas, theorem choices, calculations, units, and limitations."
						],
						practice:
							"Design a small park, game board, package, sculpture, room layout, or logo system that uses at least three Geometry B topic families.",
						check: "The final explanation connects each calculation or theorem to a design decision rather than listing disconnected answers."
					})
				)
			],
			[
				lesson(
					"Capstone: Geometry B Design Defense",
					project({
						goal: "Create and defend a design that uses quadrilaterals, polygons, circles, transformations, and solids.",
						steps: [
							"Choose a design context with measurable two-dimensional and three-dimensional parts.",
							"Use at least one quadrilateral or polygon calculation, one circle relationship, one transformation, and one solid-geometry formula.",
							"Show the calculations with units and explain how each result affects the design.",
							"Write a short defense that names assumptions and one limitation of the model."
						],
						outcome:
							"The capstone demonstrates connected geometric reasoning across the full Geometry B sequence.",
						checkpoints: [
							"At least three Geometry B topic families are used meaningfully.",
							"Every formula or theorem is named before it is used.",
							"Limitations distinguish model simplifications from calculation errors."
						],
						extension:
							"Add a cost, material, or scale constraint and revise the design accordingly."
					})
				),
				lesson(
					"Project: Geometry B Portfolio Audit",
					project({
						goal: "Audit the Geometry B portfolio for evidence of classification, theorem selection, transformation reasoning, and measurement accuracy.",
						steps: [
							"Select one artifact from each major topic family: quadrilaterals, polygons or circles, transformations, and solids.",
							"For each artifact, write the core concept, the formula or theorem used, and the evidence that verifies the answer.",
							"Revise one artifact by improving notation, units, theorem naming, or explanation.",
							"Create a final checklist for future geometry problem solving."
						],
						outcome:
							"The portfolio audit turns completed work into a concise study and transfer guide.",
						checkpoints: [
							"Every selected artifact includes a named property, theorem, or formula.",
							"At least one artifact is revised based on a concrete weakness.",
							"The final checklist applies beyond a single problem type."
						],
						extension:
							"Add a Geometry A connection by identifying where coordinate geometry, similarity, or right triangles reappear in Geometry B."
					})
				)
			]
		),
		module(
			"Geometry B Reference Archive",
			[
				lesson(
					"Geometry B Reference Map",
					[
						"This reference map summarizes Geometry B topic coverage and static media slots without embedding diagram files that are still pending in the class asset library.",
						[
							"**Course concept map**",
							"- Quadrilateral foundations: convex and concave quadrilaterals, trapezoids, kites, parallelograms, rectangles, rhombi, squares, angle sums, medians, diagonals, and classification from evidence.",
							"- Polygon work: interior and exterior angle sums, regular-polygon angle formulas, area decomposition, composite regions, and formula selection based on the given information.",
							"- Circle measurement: circumference, area, arc length, sector area, chords, central angles, inscribed angles, internal chord angles, external secant or tangent angles, and tangent-radius relationships.",
							"- Transformations: translations, rotations, reflections, dilations, coordinate rules, orientation changes, congruence, similarity, scale factor, and transformation composition.",
							"- Three-dimensional solids: polyhedra, prisms, pyramids, cylinders, cones, spheres, nets, Euler's formula, surface area, volume, slant height, vertical height, and composite solid modeling.",
							"- Review and capstone work: mixed theorem selection, error diagnosis, design defense, portfolio audit, and cumulative geometry modeling across two-dimensional and three-dimensional settings."
						].join("\n"),
						[
							"**Reference links**",
							"- Pyramid volume visualization: http://pythagoreanmath.com/wp-content/uploads/2014/08/deriving-the-volume-of-a-pyramid.png",
							"- Sphere volume comparison visual: https://ds055uzetaobb.cloudfront.net/brioche/uploads/Fv9rxkzWWN-90675.svg?width=350",
							"- Sphere surface-area comparison visual: https://www.mathsisfun.com/geometry/images/sphere-cylinder-area2.svg"
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
					"Geometry B Pending Static Assets",
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
			"Quadrilateral and polygon classification",
			"Polygon angle sums and polygon area",
			"Circle circumference, area, arcs, sectors, angles, and tangents",
			"Transformations, congruence, similarity, and scale factor",
			"Polyhedra, surface area, volume, and composite solids"
		],
		sourcePolicy:
			"Built from the Geometry B sequence with neutral wording and no direct legacy static image embeds.",
		assessmentCadence: [
			"Check-In #1 after quadrilaterals, polygons, circle measurement, and circle theorems.",
			"Check-In #2 after transformations and solids, immediately before the cumulative design defense."
		],
		toolchain: [
			"Paper or shared diagram sketches",
			"Optional dynamic geometry workspace",
			"Calculator for area, circumference, surface-area, and volume checks"
		],
		safetyPolicy: [
			"No physical measurement setup is required for core work.",
			"Any optional design task can be completed from provided dimensions, diagrams, or drawings."
		],
		courseBoundaries: [
			"Geometry B assumes basic lines, angles, triangles, coordinate geometry, and right-triangle reasoning from Geometry A.",
			"Transformations focus on geometric reasoning and composition rather than proof-heavy matrix notation."
		],
		capstoneExpectations: [
			"A final Geometry B portfolio includes quadrilaterals, polygons or circles, transformations, and three-dimensional measurement evidence."
		],
		recommendedNextWork: [
			"Replace legacy diagrams with owned or source-safe static.classes assets when available.",
			"Add optional dynamic-geometry exploration links for transformations and circle theorems.",
			"Keep the Algebra 2 and Pre-Calculus handoff map aligned with transformation, conic, measurement, and modeling evidence from Geometry A and B."
		]
	}
};

configureMathCourseFlow(geometryBCourse, {
	courseId: "geometry-b",
	modules: [
		{
			title: "GEOB1-GEOB2 Quadrilaterals and Parallelograms",
			estimatedTime: "4 sessions · 50–65 minutes each",
			keyBlocks: [
				"quadrilateral hierarchy",
				"parallel / congruent evidence",
				"trapezoid",
				"diagonal property",
				"classification proof"
			],
			flowNote:
				"Classify from marked properties rather than appearance, list every valid family name, and use the narrowest supported name in the final claim. The case file is supported transfer; the property decision tree is the challenge route.",
			challengeSupplementalTitles: [
				"Project: Parallelogram Property Decision Tree"
			]
		},
		{
			title: "GEOB3-GEOB4 Polygons and Circle Measurement",
			estimatedTime: "3–4 sessions · 50–65 minutes each",
			keyBlocks: [
				"polygon angle sum",
				"regularity condition",
				"composite area",
				"arc / sector",
				"linear / square units"
			],
			flowNote:
				"State whether a polygon is regular before using a single-angle formula, decompose composite regions visibly, and distinguish full-circle, arc, sector, length, and area questions before calculating. The circle design brief is the challenge application.",
			challengeSupplementalTitles: [
				"Project: Circle Measurement Design Brief"
			]
		},
		{
			title: "GEOB5-GEOB6 Circle Theorems and Challenge Problems",
			estimatedTime: "3–4 sessions · 50–65 minutes each",
			keyBlocks: [
				"vertex location",
				"intercepted arc",
				"tangent / secant / chord",
				"theorem chain",
				"rejected shortcut"
			],
			flowNote:
				"Classify the angle from its vertex, mark the intercepted arcs, and name every theorem before writing an equation. Use the theorem sort for supported selection practice and the full walkthrough for a multi-step challenge.",
			challengeSupplementalTitles: [
				"Project: Circle Challenge Walkthrough"
			]
		},
		{
			title: "Check-In #1: Quadrilaterals, Polygons, and Circles",
			estimatedTime: "1–2 sessions · 50–65 minutes each",
			keyBlocks: [
				"classification",
				"formula selection",
				"circle theorem",
				"unit / angle label",
				"error diagnosis"
			],
			flowNote:
				"Complete a mixed classification, measurement, and theorem-selection set without topic labels. Correct the first invalid property or formula choice; choose the broad review set or the deeper error clinic based on that evidence.",
			challengeSupplementalTitles: [
				"Project: Formula and Theorem Error Clinic"
			]
		},
		{
			title: "GEOB7-GEOB8 Transformations",
			estimatedTime: "3 sessions · 50–65 minutes each",
			keyBlocks: [
				"translation / rotation",
				"reflection",
				"dilation",
				"coordinate rule",
				"congruence / similarity"
			],
			flowNote:
				"Predict image coordinates before graphing, record one rule per transformation, and identify which lengths, angles, orientation, perimeter, and area are preserved or scaled. The logo redesign is the composition challenge.",
			challengeSupplementalTitles: [
				"Project: Logo Transformation Redesign"
			]
		},
		{
			title: "GEOB9-GEOB10 Polyhedra and Round Solids",
			estimatedTime: "3–4 sessions · 50–65 minutes each",
			keyBlocks: [
				"net / exposed face",
				"surface area",
				"volume",
				"vertical / slant height",
				"composite solid"
			],
			flowNote:
				"Sketch or describe the solid and exposed surfaces before selecting formulas, keep vertical and slant height distinct, and attach square or cubic units. Packaging optimization is the challenge after the formula lab is reliable.",
			challengeSupplementalTitles: [
				"Project: Packaging Design Optimization"
			]
		},
		{
			title: "Check-In #2 and Geometry B Capstone",
			estimatedTime: "3 sessions · 50–65 minutes each",
			keyBlocks: [
				"transformation / solid gate",
				"two-dimensional evidence",
				"three-dimensional evidence",
				"design defense",
				"model limitation"
			],
			flowNote:
				"Pass the transformation-and-solids readiness check, use the synthesis map to choose connected topic families, and complete the design defense as the required capstone. The portfolio audit remains optional evidence organization.",
			coreSupplementalTitles: ["Capstone: Geometry B Design Defense"]
		}
	],
	appendixTitles: ["Geometry B Reference Archive", "Pending Static Assets"]
});
