import type { RawCourse, RawCourseModuleItem } from "./types";
import {
	courseAssetViewerUrl,
	slugMarkdownHeading
} from "@/modules/courseAssetSourcesPrealgebra";
import { assertMathCourseBindings } from "./prealgebraGeometryBindings";

export const geometryCaseTracks = {
	a: {
		cases: [
			{
				code: "GEOA1",
				title: "Objects, Notation and Angle Relationships",
				reading:
					"A point names a location. A line extends indefinitely in both directions; a ray begins at its first named endpoint and extends through its second point; a segment includes its two endpoints and the points between them. Thus segment AB equals segment BA as a set, but ray AB generally differs from ray BA. Collinear means on one line; coplanar means in one plane. An acute angle is between 0 and 90 degrees, a right angle is 90 degrees, an obtuse angle is between 90 and 180 degrees, and a straight angle is 180 degrees. Complementary angles sum to 90 degrees; supplementary angles sum to 180 degrees. Vertical angles are opposite angles made by two intersecting lines and are congruent. Adjacent angles share a vertex and side with disjoint interiors. A linear pair is adjacent with opposite outer rays, so it is supplementary.",
				worked: "Place A=(0,0), B=(2,0), C=(5,0), D=(2,3). Points A, B and C are collinear with B between the others; AB=2, BC=3 and AC=5. Rays BA and BC point in opposite directions. Ray BD is perpendicular to their line, so angles ABD and DBC are each 90 degrees and together form the straight angle ABC. The coordinates justify these facts independently of a drawing's proportions.",
				problems: [
					"Using the worked coordinates, give the endpoint and direction of rays AB and BA, and explain whether they name the same set.",
					"Classify angles measuring 35, 90, 125 and 180 degrees. Find the complement and supplement of 35 degrees.",
					"Two lines intersect with one angle measuring 68 degrees. Find the vertical angle and both adjacent angles, naming the relationship used.",
					"Using the worked coordinates, distinguish the length AB from the set of points in segment AB. Decide whether B lies on segment AC and whether all four points are coplanar."
				]
			},
			{
				code: "GEOA2",
				title: "Conditionals, Counterexamples and Deduction",
				reading:
					"For propositions P and Q, the conditional P implies Q is false only when P is true and Q is false. Its converse is Q implies P; its inverse is not P implies not Q; its contrapositive is not Q implies not P. A conditional is logically equivalent to its contrapositive. The converse and inverse are equivalent to each other, but need not follow from the original conditional. One counterexample disproves a universal claim. Induction suggests a pattern; deduction establishes a conclusion from stated definitions and valid rules. From P implies Q and P, conclude Q. From P implies Q and not Q, conclude not P. Knowing Q alone does not establish P.",
				worked: "For integers, let P mean divisible by 4 and Q mean even. Every multiple of 4 is even, so P implies Q is true. The converse fails at 6: it is even but not divisible by 4. The inverse fails at the same value. The contrapositive says an odd integer is not divisible by 4 and is equivalent to the original statement.",
				problems: [
					"Under the inclusive definition that an isosceles triangle has at least two congruent sides, state the converse of 'Every equilateral triangle is isosceles.' Decide its truth with side-length evidence.",
					"Assess the conjecture that n^2+n is odd for every positive integer n. Then prove the corrected parity claim for every integer by factoring.",
					"Complete the truth table for P implies Q for (P,Q)=(true,true),(true,false),(false,true),(false,false).",
					"A statement says 'If a quadrilateral is a rectangle, it has four right angles.' Is knowing one right angle sufficient to conclude it is a rectangle? Explain the missing evidence."
				]
			},
			{
				code: "GEOA3",
				title: "Proofs and First Invalid Steps",
				reading:
					"A proof consists of statements justified by givens, definitions, algebraic properties, postulates or established theorems. If B lies between A and C, segment addition gives AB+BC=AC. A midpoint lies on a segment and divides it into two congruent segments. An angle bisector divides an angle into two congruent angles. Substitution replaces equal quantities; the addition, subtraction, multiplication and nonzero-division properties preserve an equation when applied to both sides. A two-column proof, paragraph proof and flow proof require the same logical support. A claim drawn only from appearance is an unsupported visual assumption.",
				worked: "Given B between A and C, AB=2x+3, BC=x+8 and AC=26, segment addition gives (2x+3)+(x+8)=26. Combining terms gives 3x+11=26; subtracting 11 gives 3x=15; dividing by 3 gives x=5. Then AB=13 and BC=13, which sum to 26. Since B is on AC and the two pieces are congruent, B is its midpoint.",
				problems: [
					"A solution to the worked equation has lines 3x+11=26, 3x=15, x=15. Identify the first invalid transition, repair it, and check the original lengths.",
					"M is the midpoint of segment AB, AM=4x+3 and AB=12x-4. Find x, AM, MB and AB, with a reason for the equation used.",
					"Ray BD bisects angle ABC, which measures 84 degrees. Give the two resulting angle measures and a short proof using the bisector definition and angle addition.",
					"Given AB=CD and CD=EF, explain why AB=EF. Does that alone prove the three segments lie on the same line?"
				]
			},
			{
				code: "GEOA4",
				title: "Parallel Lines and Transversals",
				reading:
					"For distinct parallel lines cut by a transversal, corresponding angles and alternate interior or alternate exterior angles are congruent; same-side interior angles are supplementary. Vertical angles are congruent whether or not another pair of lines is parallel. Conversely, congruent corresponding or alternate interior angles, or supplementary same-side interior angles, can establish parallel lines. The angle positions and a stated parallel relationship matter; an unmarked drawing alone cannot establish equality.",
				worked: "Suppose two parallel lines are crossed by a transversal, with corresponding angle measures 3x+10 and 5x-30 degrees. Set them equal: 3x+10=5x-30, so x=20 and each angle is 70 degrees. An adjacent linear-pair angle is 110 degrees. The equation depends on the stated corresponding positions and parallel lines.",
				problems: [
					"In the worked configuration, explain why both vertical angles to the corresponding 70-degree angles also measure 70 degrees.",
					"Two same-side interior angles between parallel lines measure 2x+15 and 3x+40 degrees. Find x and both measures.",
					"Two lines cut by a transversal have corresponding angles measuring 63 degrees each. What conclusion follows? Would two vertical angles of 63 degrees establish that conclusion by themselves?"
				]
			},
			{
				code: "GEOA5",
				title: "Coordinate Distance, Midpoint and Slope",
				reading:
					"For points (x1,y1) and (x2,y2), distance is sqrt((x2-x1)^2+(y2-y1)^2); the midpoint is ((x1+x2)/2,(y1+y2)/2). When x2!=x1, slope is (y2-y1)/(x2-x1). A vertical line has undefined slope, while a horizontal line has slope 0. Distinct nonvertical lines with equal slopes are parallel. Two nonvertical lines are perpendicular when their slopes multiply to -1; a vertical and horizontal line are also perpendicular. A line through (a,b) with finite slope m has equation y-b=m(x-a).",
				worked: "For A=(-1,2) and B=(5,10), coordinate differences are 6 and 8. Distance is sqrt(36+64)=10, midpoint is (2,6), and slope is 8/6=4/3. A perpendicular line through the midpoint has slope -3/4 and equation y-6=-(3/4)(x-2). Its points are equidistant from A and B because it is the perpendicular bisector.",
				problems: [
					"For C=(1,-2) and D=(7,6), find distance, midpoint, slope and the equation of line CD.",
					"Classify the relationship between y=2x+1 and y=2x-4; then between y=2x+1 and y=-(1/2)x+3. Explain why distinctness matters for the first pair.",
					"Give equations for the horizontal and vertical lines through (3,-1), and describe their slopes and relationship."
				]
			},
			{
				code: "GEOA6",
				title: "Triangle Classification and Angle Sums",
				reading:
					"A nondegenerate triangle has three positive side lengths and interior angles totaling 180 degrees. Scalene means all side lengths differ; isosceles means at least two are congruent, and equilateral means all three are congruent. An equilateral triangle has three 60-degree angles. An acute triangle has all angles below 90 degrees, a right triangle has one 90-degree angle, and an obtuse triangle has one above 90 degrees. Angles opposite congruent sides are congruent, and conversely. An exterior angle formed by extending a side equals the sum of the two remote interior angles.",
				worked: "A triangle has angles 2x+10, 3x+20 and x+30 degrees. Their sum gives 6x+60=180, so x=20 and the angles are 50,80,50 degrees. It is acute and isosceles: the sides opposite the two 50-degree angles are congruent. The side opposite 80 degrees is the longest.",
				problems: [
					"Two triangle angles are 42 and 68 degrees. Find the third and classify the triangle by angle type.",
					"An isosceles triangle has vertex angle 36 degrees. Find the two base angles and the exterior angle adjacent to one base angle.",
					"A triangle has sides 5,5,6. Name every side-based category justified by those lengths. Does a rough drawing supply an additional right-angle claim?"
				]
			},
			{
				code: "GEOA7",
				title: "Triangle Congruence and Correspondence",
				reading:
					"Congruent triangles have equal corresponding lengths and angles. SSS uses three side pairs.\n\nSAS uses two sides and the included angle.\n\nASA uses two angles and their included side.\n\nAAS uses two angles and a corresponding nonincluded side. HL applies to right triangles with congruent hypotenuse and one corresponding leg. A congruence statement fixes correspondence by letter order. AAA establishes shape but not size. General SSA data need not establish congruence because the specified angle is not between the two sides.",
				worked: "Given AB=DE=4, BC=EF=6 and angles ABC=DEF=50 degrees, triangles ABC and DEF are congruent by SAS: each given angle lies between the two stated sides. The correspondence is A to D, B to E, C to F. Consequently AC=DF and angle BAC equals angle EDF.",
				problems: [
					"Triangles ABC and PQR have AB=PQ=3, BC=QR=4 and AC=PR=5. State the congruence rule and the correspondence, then name the angle corresponding to ACB.",
					"Two right triangles have hypotenuse 13 and a leg of length 5. State the congruence rule and find the other leg.",
					"Two triangles each have angles 40,60,80 degrees, but one has a side twice the corresponding side of the other. Are they congruent? Explain what the angle data do establish."
				]
			},
			{
				code: "GEOA8",
				title: "Similarity and Indirect Measurement",
				reading:
					"Similar triangles have congruent corresponding angles and one common positive ratio for corresponding side lengths. AA, proportional SSS, or proportional SAS with the included angles congruent establish triangle similarity. Record the correspondence before making a proportion. A scale factor k multiplies lengths and perimeter by k and area by k^2. In a shadow model, using the same sun angle and vertical objects on level ground creates similar right triangles; those assumptions justify the height-to-shadow proportion.",
				worked: "Triangle ABC has sides AB=6, BC=8, AC=10; triangle XYZ has XY=9, YZ=12, XZ=15. The corresponding ratios are all 3/2, so SSS similarity applies with A to X, B to Y, C to Z. The perimeter grows from 24 to 36, and the area factor is (3/2)^2=9/4.",
				problems: [
					"For triangles ABC and XYZ known to be similar in that order, AB=4, BC=7 and XY=10. Find YZ and the scale factor.",
					"At the same time, a 1.5-meter vertical post casts a 2-meter shadow and a vertical tree casts a 12-meter shadow on the same level ground. Find the tree's height, naming the similarity assumptions.",
					"Two triangles share angles of 35 and 65 degrees. Find the remaining angle and state the similarity test. Does that alone determine a numerical scale factor?"
				]
			},
			{
				code: "GEOA9",
				title: "Right Triangles and Exact Ratios",
				reading:
					"In a right triangle, legs a and b and hypotenuse c satisfy a^2+b^2=c^2. The hypotenuse is opposite the right angle and is the longest side. Conversely, a valid triangle with longest side c is right when that equality holds. A 45-45-90 triangle has side ratio 1:1:sqrt(2), in leg-leg-hypotenuse order. A 30-60-90 triangle has ratio 1:sqrt(3):2, in side-opposite-30, side-opposite-60, hypotenuse order.",
				worked: "A right triangle with legs 9 and 12 has hypotenuse sqrt(81+144)=15. A 30-60-90 triangle with short leg 4 has long leg 4sqrt(3) and hypotenuse 8. The ratios identify which side is which; treating every given side as the short leg would change the problem.",
				problems: [
					"A right triangle has hypotenuse 17 and one leg 8. Find the other leg and verify the equality.",
					"An isosceles right triangle has legs 5. Find the hypotenuse exactly and approximately to two decimals.",
					"A 30-60-90 triangle has hypotenuse 10. Find both legs and state the angle opposite each."
				]
			},
			{
				code: "GEOA10",
				title: "Bisectors and Equal-Distance Centers",
				reading:
					"A perpendicular bisector passes through a segment's midpoint at a right angle. Every point on it is equidistant from the two endpoints, and conversely. A point on an angle bisector is equidistant from the two sides, with distance measured perpendicularly. The three perpendicular bisectors of a triangle meet at its circumcenter, equidistant from the vertices. Its three internal angle bisectors meet at the incenter, equidistant from its sides. The incenter lies inside every nondegenerate triangle. The circumcenter is inside an acute triangle, at the hypotenuse midpoint of a right triangle, and outside an obtuse triangle.",
				worked: "For A=(0,0) and B=(8,0), the midpoint is (4,0) and the perpendicular bisector is x=4. Point X=(4,3) is distance sqrt(16+9)=5 from both A and B. For the triangle with C=(0,6), X is also distance sqrt(16+9)=5 from C, making it the circumcenter; it is the midpoint of the hypotenuse BC.",
				problems: [
					"Point P lies on the perpendicular bisector of AB, with PA=3x+1 and PB=5x-7. Find x and both distances.",
					"Ray BD bisects an angle with parts 2x+5 and 3x-10 degrees. Find x, each part and the whole angle.",
					"For a right triangle, distinguish the circumcenter's location from the incenter's location. Which equal-distance property defines each?"
				]
			},
			{
				code: "GEOA11",
				title: "Medians, Altitudes and Centers",
				reading:
					"A median joins a vertex to the midpoint of the opposite side. The medians meet at the centroid, which divides each median in a 2:1 ratio from the vertex; its coordinates are the averages of the three vertex coordinates. An altitude is perpendicular from a vertex to the opposite side's line. The altitudes meet at the orthocenter, inside an acute triangle, at the right-angle vertex of a right triangle, and outside an obtuse triangle. A median need not be perpendicular, and an altitude need not bisect its opposite side.",
				worked: "For A=(0,0), B=(6,0), C=(0,9), the centroid is G=((0+6+0)/3,(0+0+9)/3)=(2,3). The midpoint of BC is M=(3,9/2); G lies two-thirds of the way from A to M. Because AB is horizontal and AC vertical, these legs are also altitudes, so the orthocenter is A, distinct from G.",
				problems: [
					"A median has total length 18. Find the vertex-to-centroid and centroid-to-midpoint lengths.",
					"Find the centroid of vertices (1,2), (7,2), (4,8).",
					"In the worked triangle, find the altitude from C to line AB and its foot. Does the foot have to be the midpoint of AB?"
				]
			},
			{
				code: "GEOA12",
				title: "Triangle Inequalities",
				reading:
					"Three positive lengths form a nondegenerate triangle exactly when each pair sums to more than the third. For two fixed sides a and b, the third x satisfies abs(a-b)<x<a+b. Within a triangle the larger angle lies opposite the longer side. For a valid triangle with longest side c, compare c^2 with a^2+b^2: equality means right, a smaller c^2 means acute, and a larger c^2 means obtuse. Check the triangle inequality before using that angle classification.",
				worked: "With fixed sides 4 and 7, the third length satisfies 3<x<11. The endpoints are excluded because they would collapse the triangle. A triangle with sides 4,5,6 is acute because 6^2=36<4^2+5^2=41, and all triangle inequalities hold.",
				problems: [
					"List every integer third-side length that can accompany sides 4 and 7.",
					"Classify side sets (3,4,5), (2,3,4), and (2,3,5) as right, acute, obtuse or impossible, checking existence first.",
					"A triangle has angles 40,60,80 degrees. Order the opposite sides from shortest to longest and explain the rule."
				]
			},
			{
				code: "GEOA13",
				title: "Right-Triangle Trigonometry",
				reading:
					"Relative to an acute reference angle in a right triangle, sin(theta)=opposite/hypotenuse, cos(theta)=adjacent/hypotenuse and tan(theta)=opposite/adjacent. Changing the reference angle changes the opposite and adjacent labels. Inverse sine, cosine or tangent recovers an angle from the appropriate ratio; use degree mode when angles are specified in degrees. A stated exact radical or ratio need not be rounded until a requested measurement approximation.",
				worked: "In a right triangle with legs 5 and 12 and hypotenuse 13, let theta be opposite the length-5 leg. Then sin(theta)=5/13, cos(theta)=12/13 and tan(theta)=5/12. The other acute angle swaps the roles of the two legs. An angle can be recovered as theta=arctan(5/12), approximately 22.62 degrees.",
				problems: [
					"For a right triangle with legs 8 and 15, let alpha be opposite the length-8 leg. Find the hypotenuse and all three trigonometric ratios.",
					"A hypothetical 10-unit segment meets level ground at 60 degrees and reaches a vertical wall. Find its vertical and horizontal components exactly.",
					"A right triangle has opposite leg 7 and adjacent leg 10 for angle beta. Write an inverse-trigonometric expression for beta and approximate it to two decimal degrees."
				]
			}
		],
		reviews: [
			{
				moduleTitle: "Check-In #1: Foundations and Lines",
				title: "Foundations and Lines Review",
				problems: [
					"A=(0,0),B=(3,0),C=(7,0),D=(3,4). State which named points are collinear, the lengths AB,BC,AC, and whether rays BA and BC are opposite. Explain whether the coordinate data prove BD perpendicular to AC.",
					"For integers, write the converse and contrapositive of 'If n is divisible by 6, n is divisible by 3.' Decide which are true, giving a counterexample where needed.",
					"M is the midpoint of AB. AM=2x+1 and MB=5x-8. Find x and AB, showing the definition used.",
					"Two parallel lines are cut by a transversal. Corresponding angles are 4x+8 and 6x-24 degrees. Find x, each corresponding angle and an adjacent linear-pair angle.",
					"For P=(-2,1),Q=(4,9), find slope, length and midpoint. Give a perpendicular line through the midpoint."
				]
			},
			{
				moduleTitle: "Check-In #2: Triangle Relationships",
				title: "Triangle Relationships Review",
				problems: [
					"A triangle has angles x+20,2x+10,3x degrees. Find x and all angles, then classify it by angle type.",
					"Triangles ABC and DEF have AB=DE=5, AC=DF=7 and angle BAC=EDF=40 degrees. State the congruence test, correspondence and one other resulting side equality.",
					"Under similarity ABC~XYZ, AB=8,BC=10 and XY=12. Find YZ and the area scale factor from ABC to XYZ.",
					"A right triangle has hypotenuse 25 and one leg 7. Find the other leg. Separately, give both legs of a 45-45-90 triangle with hypotenuse 10.",
					"Explain the flaw in 'Two matching angles prove two triangles congruent.' Give a concrete pair of triangle side sets that demonstrates the distinction."
				]
			},
			{
				moduleTitle: "Check-In #3 and Geometry A Capstone",
				title: "Centers, Inequalities and Trigonometry Review",
				problems: [
					"A triangle has vertices (0,0),(8,0),(0,6). Find its centroid, orthocenter and circumcenter, with the defining construction for each.",
					"A point on a perpendicular bisector has endpoint distances 2x+6 and 5x-3. Find x and the distances. Explain how this differs from being equidistant from two angle sides.",
					"For fixed sides 5 and 8, give the open interval for the third side. Classify valid side sets 5,5,8 and 5,8,9 by angle type using the longest-side comparison.",
					"A right triangle has legs 9 and 12. For the acute angle opposite 9, find sine, cosine and tangent. A second right triangle has hypotenuse 20 and an acute angle 30 degrees; find the two legs.",
					"A median has length 21. Find its two centroid pieces and identify which lies next to the vertex."
				]
			}
		],
		modules: [
			{
				id: "geometry-a-geometry-a-foundations-definitions-logic-and-proofs",
				title: "Geometry A Foundations: Definitions, Logic, and Proofs",
				kind: "module",
				curriculum: [
					{
						id: "geometry-a-geometry-a-foundations-definitions-logic-and-proofs-curriculum-definitions-logic-and-proofs-core-concepts",
						title: "Definitions, Logic, and Proofs Core Concepts",
						aliases: [
							"core-concepts",
							"geometry-a-geometry-a-foundations-definitions-logic-and-proofs-curriculum-core-concepts"
						]
					}
				]
			},
			{
				id: "geometry-a-geoa4-geoa5-lines-angles-and-coordinate-geometry",
				title: "GEOA4-GEOA5 Lines, Angles, and Coordinate Geometry",
				kind: "module",
				curriculum: [
					{
						id: "geometry-a-geoa4-geoa5-lines-angles-and-coordinate-geometry-curriculum-geoa4-parallel-and-perpendicular-lines",
						title: "GEOA4 Parallel and Perpendicular Lines",
						aliases: []
					},
					{
						id: "geometry-a-geoa4-geoa5-lines-angles-and-coordinate-geometry-curriculum-geoa5-coordinate-geometry",
						title: "GEOA5 Coordinate Geometry",
						aliases: []
					}
				]
			},
			{
				id: "geometry-a-check-in-1-foundations-and-lines",
				title: "Check-In #1: Foundations and Lines",
				kind: "module",
				curriculum: [
					{
						id: "geometry-a-check-in-1-foundations-and-lines-curriculum-foundations-readiness-check",
						title: "Foundations Readiness Check",
						aliases: []
					}
				]
			},
			{
				id: "geometry-a-geoa6-geoa9-triangles-congruence-similarity-and-right-triangles",
				title: "GEOA6-GEOA9 Triangles, Congruence, Similarity, and Right Triangles",
				kind: "module",
				curriculum: [
					{
						id: "geometry-a-geoa6-geoa9-triangles-congruence-similarity-and-right-triangles-curriculum-triangles-congruence-similarity-and-right-triangles-core-concepts",
						title: "Triangles, Congruence, Similarity, and Right Triangles Core Concepts",
						aliases: [
							"core-concepts",
							"geometry-a-geoa6-geoa9-triangles-congruence-similarity-and-right-triangles-curriculum-core-concepts"
						]
					}
				]
			},
			{
				id: "geometry-a-check-in-2-triangle-relationships",
				title: "Check-In #2: Triangle Relationships",
				kind: "module",
				curriculum: [
					{
						id: "geometry-a-check-in-2-triangle-relationships-curriculum-triangle-readiness-check",
						title: "Triangle Readiness Check",
						aliases: []
					}
				]
			},
			{
				id: "geometry-a-geoa10-geoa13-triangle-centers-inequalities-and-trigonometry",
				title: "GEOA10-GEOA13 Triangle Centers, Inequalities, and Trigonometry",
				kind: "module",
				curriculum: [
					{
						id: "geometry-a-geoa10-geoa13-triangle-centers-inequalities-and-trigonometry-curriculum-triangle-centers-inequalities-and-trigonometry-core-concepts",
						title: "Triangle Centers, Inequalities, and Trigonometry Core Concepts",
						aliases: [
							"core-concepts",
							"geometry-a-geoa10-geoa13-triangle-centers-inequalities-and-trigonometry-curriculum-core-concepts"
						]
					}
				]
			},
			{
				id: "geometry-a-check-in-3-and-geometry-a-capstone",
				title: "Check-In #3 and Geometry A Capstone",
				kind: "module",
				curriculum: [
					{
						id: "geometry-a-check-in-3-and-geometry-a-capstone-curriculum-final-readiness-check",
						title: "Final Readiness Check",
						aliases: []
					},
					{
						id: "geometry-a-check-in-3-and-geometry-a-capstone-supplemental-capstone-geometry-a-design-defense",
						title: "Capstone: Geometry A Design Defense",
						aliases: [
							"geometry-a-check-in-3-and-geometry-a-capstone-curriculum-capstone-geometry-a-design-defense"
						]
					}
				]
			}
		]
	},
	b: {
		cases: [
			{
				code: "GEOB1",
				title: "Quadrilaterals and Trapezoids",
				reading:
					"A simple quadrilateral has interior angles totaling 360 degrees. A kite has two pairs of congruent adjacent sides. This course uses the exclusive trapezoid definition: exactly one pair of parallel sides, called bases. Other books may use an inclusive definition; keep the stated convention fixed within a classification. A trapezoid's midsegment is parallel to its bases and has length (b1+b2)/2. Its area is (b1+b2)h/2, where h is the perpendicular height. An isosceles trapezoid has congruent legs, congruent angles along each base, and congruent diagonals.",
				worked: "An isosceles trapezoid has horizontal bases of lengths 6 and 10, centered above each other with perpendicular height 3. Its midsegment is 8 and its area is 8×3=24 square units. Each leg spans horizontal distance 2 and vertical distance 3, so its length is sqrt(13); using that slanted length as the area height would give the wrong quantity.",
				problems: [
					"A quadrilateral has interior angles 80,95,110 and x degrees. Find x.",
					"A trapezoid has bases 7 and 13 and perpendicular height 5. Find its midsegment and area.",
					"An isosceles trapezoid has a lower-base angle of 72 degrees. Find its other three angles. Is a parallelogram also a trapezoid under this course's definition?"
				]
			},
			{
				code: "GEOB2",
				title: "The Parallelogram Family",
				reading:
					"A parallelogram has two pairs of parallel opposite sides; opposite sides and angles are congruent, consecutive angles are supplementary, and the diagonals bisect each other. A rectangle is a parallelogram with four right angles and congruent diagonals. A rhombus has four congruent sides, perpendicular diagonals and diagonals bisecting its opposite angles. A square is both a rectangle and a rhombus. These are inclusive family relationships: every square is a rectangle, rhombus and parallelogram. Congruent diagonals alone do not make an arbitrary quadrilateral a rectangle.",
				worked: "A rhombus has diagonals of lengths 6 and 8. Their perpendicular halves have lengths 3 and 4, making each side sqrt(3^2+4^2)=5. Its perimeter is 20, and area is half the diagonal product, 24 square units. The unequal diagonals show that this rhombus is not a square.",
				problems: [
					"Opposite sides of a parallelogram measure 3x+2 and 5x-10. Consecutive angles measure 2y+10 and 3y+20 degrees. Find x,y and the two angle measures.",
					"A rectangle has side lengths 3 and 4. Find its diagonal and each half of that diagonal.",
					"A square has diagonal 10. Find its side, perimeter and area exactly, and list its parallelogram-family classifications."
				]
			},
			{
				code: "GEOB3",
				title: "Polygon Angles and Composite Areas",
				reading:
					"For a simple n-sided polygon, the interior-angle sum is 180(n-2) degrees. In a regular polygon, each interior angle equals that sum divided by n. Equal angles alone do not establish regularity: a nonsquare rectangle has four equal 90-degree angles but unequal adjacent sides. A convex polygon's exterior turning angles sum to 360 degrees; each regular exterior angle is 360/n. A rectangle has area base times height, a triangle has half base times perpendicular height, and a parallelogram has base times perpendicular height. For a regular polygon, area is half its perimeter times its apothem, the perpendicular distance from center to a side. Composite areas add disjoint pieces or subtract removed regions.",
				worked: "A regular octagon has interior-angle sum 180(8-2)=1080 degrees. Each interior angle is 135 degrees, each exterior angle is 45 degrees, and 8×45=360 confirms one turn. Regularity justifies dividing the angle sum equally; it is not implied by having eight sides alone.",
				problems: [
					"A regular polygon has each interior angle 150 degrees. Find its exterior angle and number of sides.",
					"A hexagon has five angles of 100,110,120,130,140 degrees. Find the sixth. Is it regular?",
					"Remove a 3-by-2 rectangular corner from a 10-by-6 rectangle, with the cut edges parallel to the original edges. Find the remaining area and boundary perimeter."
				]
			},
			{
				code: "GEOB4",
				title: "Circle Lengths, Sectors and Chords",
				reading:
					"A circle of radius r has diameter 2r, circumference 2pi×r and area pi×r^2. For a central angle theta in degrees, arc length is (theta/360)×2pi×r and sector area is (theta/360)×pi×r^2. Length and area have different units. A perpendicular from the center to a chord bisects the chord; radius, perpendicular distance and half-chord length then form a right triangle. For an annulus, subtract the smaller disc area from the larger one.",
				worked: "For radius 6 and a 120-degree central angle, the arc is one-third of the circumference, giving 4pi units. The sector is one-third of the disc, giving 12pi square units. If a chord is distance 3 from the center, its half-length is sqrt(36-9)=3sqrt(3), so its full length is 6sqrt(3).",
				problems: [
					"A circle has diameter 10. Find radius, circumference and area.",
					"A radius-8 circle has a 45-degree sector. Find its arc length and area.",
					"In a radius-5 circle, a chord has length 8. Find its perpendicular distance from the center. Separately, find the annulus area between concentric radii 5 and 3."
				]
			},
			{
				code: "GEOB5",
				title: "Circle Angles and Tangents",
				reading:
					"A central angle equals the measure of its intercepted arc. An inscribed angle is half the intercepted arc not containing its vertex. Two chords intersecting inside a circle form angles equal to half the sum of the arcs intercepted by the angle and its vertical partner. For two secants, two tangents, or a secant and tangent meeting outside, the angle is half the larger intercepted arc minus the smaller arc. A radius to a tangent point is perpendicular to the tangent. Tangent segments from one external point have equal lengths.",
				worked: "An inscribed angle intercepting a 110-degree arc measures 55 degrees. An interior chord-intersection angle intercepting arcs of 70 and 100 degrees measures (70+100)/2=85 degrees. An external angle intercepting arcs of 160 and 60 degrees measures (160-60)/2=50 degrees. The vertex location determines whether the arcs are halved, added or subtracted.",
				problems: [
					"An inscribed angle intercepts a semicircle. Find the angle and justify it.",
					"Two tangents from P touch the circle at A and B. Their lengths are PA=x+5 and PB=2x-1. Find x and both lengths.",
					"A circle has center O, radius 3 and external point P with OP=5. If PA is tangent at A, find PA.",
					"Two tangents form an external angle of 80 degrees. Find the minor and major intercepted arc measures."
				]
			},
			{
				code: "GEOB6",
				title: "Combined Circle Relationships",
				reading:
					"For chords meeting at an interior point E, the products of the two segments of each chord are equal. For two secants from an exterior point P, external length times whole secant length is equal for both secants; the whole includes the external segment. A tangent from P has squared length equal to that same external-times-whole product. These length-product rules differ from the arc-angle rules. Label the vertex location, tangent point, segments and whole lengths before selecting one.",
				worked: "From an external point, one secant has external length 3 and whole length 12, so its product is 36. A second secant with external length 4 has whole length 9 and inside length 5. A tangent from the same point has length sqrt(36)=6. The first secant's inside portion is 9, not 12.",
				problems: [
					"Two chords intersect inside a circle. One has segment lengths 3 and x; the other has lengths 4 and 9. Find x.",
					"A secant from P has external length 2 and inside length 7. Find the tangent length from P exactly.",
					"A circle has radius 5 and OP=13 for an external point P. Find a tangent length from P. If a secant through the center is also drawn, find its external and whole lengths and verify the product."
				]
			},
			{
				code: "GEOB7",
				title: "Translations and Coordinate Rotations",
				reading:
					"A translation by (a,b) maps (x,y) to (x+a,y+b). Around the origin, counterclockwise rotations through 90,180,270 degrees map (x,y) to (-y,x),(-x,-y),(y,-x), respectively. A clockwise 90-degree turn equals a counterclockwise 270-degree turn. For another rotation center, subtract the center coordinates, rotate, then add the center back. Rotations and translations preserve lengths, angles, area and orientation. The order of a composition can change the image.",
				worked: "For P=(2,-3), a 90-degree counterclockwise rotation gives (3,2). Translating P first by (3,-1) gives (5,-4), whose rotated image is (4,5). Reversing the order gives rotated P=(3,2), then translated image=(6,1). The two compositions differ.",
				problems: [
					"Translate triangle A=(0,0),B=(4,0),C=(0,3) by (2,-1). Give all image vertices and compare its area with the original.",
					"Rotate P=(2,-3) counterclockwise by 180 and 270 degrees about the origin.",
					"Rotate P=(3,2) counterclockwise by 90 degrees about C=(1,1), showing the translated coordinate calculation."
				]
			},
			{
				code: "GEOB8",
				title: "Reflections, Dilations and Composition",
				reading:
					"Reflections across the x-axis, y-axis, y=x and y=-x send (x,y) to (x,-y),(-x,y),(y,x),(-y,-x), respectively. Reflections preserve lengths, angles and area but reverse orientation. A dilation with center C and positive factor k maps P to C+k(P-C). Lengths and perimeter scale by k and area by k^2. For positive factors other than 1, the image is similar but is not generally congruent to the original.",
				worked: "Dilate P=(5,4) about C=(1,2) by factor 1/2. The relative vector is (4,2); halving gives (2,1), and adding the center yields P'=(3,3). Using (5/2,2) instead would incorrectly dilate about the origin rather than the stated center.",
				problems: [
					"Reflect P=(2,-3) across each of the four lines named in the reading.",
					"A 3-4-5 right triangle is dilated by factor 3. Find its image side lengths, perimeter and area, comparing the length and area scale factors.",
					"For P=(2,-3), compare reflection in the x-axis followed by translation (0,1) with those operations in reverse order."
				]
			},
			{
				code: "GEOB9",
				title: "Prisms, Pyramids and Surface Area",
				reading:
					"For a convex polyhedron without holes, vertices minus edges plus faces equals 2. A prism has volume Bh, where B is base area and h is perpendicular separation of its bases. A right prism has total surface area 2B+Ph, where P is base perimeter. A pyramid has volume Bh/3 using vertical height. A regular pyramid's total surface area is B+P×l/2, where l is a face's slant height. A net identifies the actual faces counted; vertical height and slant height serve different formulas.",
				worked: "A regular square pyramid has base side 6 and vertical height 4. From the base center to a side midpoint is 3, so slant height is sqrt(4^2+3^2)=5. Volume is 36×4/3=48 cubic units. The four triangular faces total (24×5)/2=60 square units; adding the base gives total surface area 96 square units.",
				problems: [
					"A rectangular prism has dimensions 2,3,4. Find its volume and total surface area.",
					"A right triangular prism has a 3-4-5 right-triangle base and prism height 10. Find base area, volume and total surface area.",
					"A triangular prism has 6 vertices, 9 edges and 5 faces. Check Euler's relation. Explain why a curved sphere is not itself a polyhedron."
				]
			},
			{
				code: "GEOB10",
				title: "Cylinders, Cones, Spheres and Composites",
				reading:
					"A right circular cylinder has volume pi×r^2×h, lateral area 2pi×r×h and total closed area 2pi×r^2+2pi×r×h. A right circular cone has volume pi×r^2×h/3 and total area pi×r^2+pi×r×l, where l=sqrt(r^2+h^2). A sphere has volume 4pi×r^3/3 and area 4pi×r^2. A hemisphere has half the sphere's volume and half its curved area, plus a disc only when its flat face is exposed. Composite surfaces count exposed faces; internal joining faces are not exposed.",
				worked: "Join a hemisphere of radius 3 atop a cylinder of radius 3 and height 4. The hemisphere contributes volume 18pi and the cylinder 36pi, totaling 54pi cubic units. Exposed area includes the cylinder's bottom 9pi, its lateral area 24pi and the hemisphere's curved area 18pi, totaling 51pi square units. The joining disc is internal.",
				problems: [
					"For a closed cylinder with radius 3 and height 4, find volume and total surface area.",
					"For a cone with radius 3 and vertical height 4, find slant height, volume and total surface area.",
					"An open-top cylindrical container has radius 2 and height 5. Find its exposed area including its bottom, and its capacity.",
					"A sphere has radius 3. Find area and volume. If its radius doubles, give the area and volume scale factors."
				]
			}
		],
		reviews: [
			{
				moduleTitle:
					"Check-In #1: Quadrilaterals, Polygons, and Circles",
				title: "Quadrilaterals, Polygons and Circles Review",
				problems: [
					"A rhombus has perpendicular diagonals 10 and 24. Find side length, perimeter and area. Which further property would establish that a rhombus is a square?",
					"A trapezoid has bases 8 and 14 and perpendicular height 4. Find its midsegment and area, distinguishing a height from a slanted leg.",
					"A regular polygon has exterior angle 24 degrees. Find its number of sides, each interior angle and interior-angle sum.",
					"A radius-9 circle has an 80-degree sector. Find its arc length and sector area. An inscribed angle intercepts an arc of 80 degrees; find the angle.",
					"A tangent from P has length 8. A secant from P has external length 4. Find its whole length and inside length, then check the product relation."
				]
			},
			{
				moduleTitle: "Check-In #2 and Geometry B Capstone",
				title: "Transformations and Solids Review",
				problems: [
					"Rotate P=(-1,4) clockwise by 90 degrees about the origin, then translate by (2,-3). Give both intermediate and final images. Does this composition preserve orientation?",
					"Reflect Q=(3,-2) in y=x, then dilate about the origin by factor 2. Give both images and the length and area scale factors.",
					"A right triangular prism has a 6-8-10 right-triangle base and perpendicular prism height 5. Find volume and total surface area.",
					"A regular square pyramid has base side 8 and vertical height 3. Find its face slant height, volume and total surface area.",
					"A right cone has radius 5 and vertical height 12. Find its slant height, volume and total surface area. If all dimensions double, give the surface-area and volume factors."
				]
			}
		],
		modules: [
			{
				id: "geometry-b-geob1-geob2-quadrilaterals-and-parallelograms",
				title: "GEOB1-GEOB2 Quadrilaterals and Parallelograms",
				kind: "module",
				curriculum: [
					{
						id: "geometry-b-geob1-geob2-quadrilaterals-and-parallelograms-curriculum-quadrilaterals-and-parallelograms-core-concepts",
						title: "Quadrilaterals and Parallelograms Core Concepts",
						aliases: [
							"core-concepts",
							"geometry-b-geob1-geob2-quadrilaterals-and-parallelograms-curriculum-core-concepts"
						]
					}
				]
			},
			{
				id: "geometry-b-geob3-geob4-polygons-and-circle-measurement",
				title: "GEOB3-GEOB4 Polygons and Circle Measurement",
				kind: "module",
				curriculum: [
					{
						id: "geometry-b-geob3-geob4-polygons-and-circle-measurement-curriculum-geob3-properties-and-area-of-polygons",
						title: "GEOB3 Properties and Area of Polygons",
						aliases: []
					},
					{
						id: "geometry-b-geob3-geob4-polygons-and-circle-measurement-curriculum-geob4-circumference-arcs-chords-areas-and-sectors",
						title: "GEOB4 Circumference, Arcs, Chords, Areas, and Sectors",
						aliases: []
					}
				]
			},
			{
				id: "geometry-b-geob5-geob6-circle-theorems-and-challenge-problems",
				title: "GEOB5-GEOB6 Circle Theorems and Challenge Problems",
				kind: "module",
				curriculum: [
					{
						id: "geometry-b-geob5-geob6-circle-theorems-and-challenge-problems-curriculum-geob5-inscribed-central-internal-and-external-angles",
						title: "GEOB5 Inscribed, Central, Internal, and External Angles",
						aliases: []
					},
					{
						id: "geometry-b-geob5-geob6-circle-theorems-and-challenge-problems-curriculum-geob5-tangents",
						title: "GEOB5 Tangents",
						aliases: []
					},
					{
						id: "geometry-b-geob5-geob6-circle-theorems-and-challenge-problems-curriculum-geob6-challenge-circle-problems",
						title: "GEOB6 Challenge Circle Problems",
						aliases: []
					}
				]
			},
			{
				id: "geometry-b-check-in-1-quadrilaterals-polygons-and-circles",
				title: "Check-In #1: Quadrilaterals, Polygons, and Circles",
				kind: "module",
				curriculum: [
					{
						id: "geometry-b-check-in-1-quadrilaterals-polygons-and-circles-curriculum-quadrilateral-polygon-and-circle-readiness-check",
						title: "Quadrilateral, Polygon, and Circle Readiness Check",
						aliases: []
					}
				]
			},
			{
				id: "geometry-b-geob7-geob8-transformations",
				title: "GEOB7-GEOB8 Transformations",
				kind: "module",
				curriculum: [
					{
						id: "geometry-b-geob7-geob8-transformations-curriculum-geob7-translations-and-rotations",
						title: "GEOB7 Translations and Rotations",
						aliases: []
					},
					{
						id: "geometry-b-geob7-geob8-transformations-curriculum-geob8-reflections-and-dilations",
						title: "GEOB8 Reflections and Dilations",
						aliases: []
					}
				]
			},
			{
				id: "geometry-b-geob9-geob10-polyhedra-and-round-solids",
				title: "GEOB9-GEOB10 Polyhedra and Round Solids",
				kind: "module",
				curriculum: [
					{
						id: "geometry-b-geob9-geob10-polyhedra-and-round-solids-curriculum-geob9-polyhedra-prisms-and-pyramids",
						title: "GEOB9 Polyhedra, Prisms, and Pyramids",
						aliases: []
					},
					{
						id: "geometry-b-geob9-geob10-polyhedra-and-round-solids-curriculum-geob10-cylinders-cones-and-spheres",
						title: "GEOB10 Cylinders, Cones, and Spheres",
						aliases: []
					}
				]
			},
			{
				id: "geometry-b-check-in-2-and-geometry-b-capstone",
				title: "Check-In #2 and Geometry B Capstone",
				kind: "module",
				curriculum: [
					{
						id: "geometry-b-check-in-2-and-geometry-b-capstone-curriculum-transformations-and-solids-readiness-check",
						title: "Transformations and Solids Readiness Check",
						aliases: []
					},
					{
						id: "geometry-b-check-in-2-and-geometry-b-capstone-curriculum-geometry-b-capstone-synthesis",
						title: "Geometry B Capstone Synthesis",
						aliases: []
					},
					{
						id: "geometry-b-check-in-2-and-geometry-b-capstone-supplemental-capstone-geometry-b-design-defense",
						title: "Capstone: Geometry B Design Defense",
						aliases: [
							"geometry-b-check-in-2-and-geometry-b-capstone-curriculum-capstone-geometry-b-design-defense"
						]
					}
				]
			}
		]
	}
};

const completionChecks: Record<string, string> = {
	GEOA1: "Notation identifies a geometric set or a length without mixing them. Angle relationships follow from endpoints, collinearity and right-angle information rather than a diagram's apparent shape.",
	GEOA2: "A false converse includes one explicit side-length counterexample. Each deduction identifies the conditional's hypothesis and conclusion; neither a true converse nor a visual pattern is assumed.",
	GEOA3: "Each proof step cites a given, definition or valid equality property. The first unsupported step is identified, and the replacement argument preserves every original hypothesis.",
	GEOA4: "Each angle calculation names its angle relationship and states where parallelism is given or proved. A converse argument supplies a valid condition before concluding that lines are parallel.",
	GEOA5: "Distance retains exact radicals and length units; a midpoint has both coordinates. Slope calculations separate vertical lines from ordinary numeric slopes and justify each parallel or perpendicular conclusion.",
	GEOA6: "Side and angle classifications remain separate, with inclusive isosceles terminology. Every interior-angle calculation totals 180 degrees, and an exterior-angle equation uses the two remote interior angles.",
	GEOA7: "Triangle names keep corresponding vertices in order. The congruence argument identifies the included angle when needed and separates valid criteria from AAA and unrestricted SSA.",
	GEOA8: "Each proportion compares corresponding lengths in a consistent order. The model states its common-angle or parallel-line assumptions, and a length scale factor is squared when comparing areas.",
	GEOA9: "The hypotenuse is identified before substitution. Exact radicals are retained, side ratios follow their opposite angles, and the longest side is checked when applying the converse.",
	GEOA10: "The explanation distinguishes equal distances to vertices from equal perpendicular distances to sides. Each center is tied to its defining bisectors, with uniqueness limited to the stated geometric conditions.",
	GEOA11: "Median and altitude constructions use the correct opposite side relationship. A centroid calculation records the 2:1 vertex-to-midpoint direction, while an orthocenter location follows the triangle's angle classification.",
	GEOA12: "Triangle existence is established before classifying its angles. The third-side interval has strict endpoints, and angle ordering is justified by the lengths of opposite sides.",
	GEOA13: "The reference angle fixes opposite and adjacent sides before selecting a ratio. Length units and degree mode remain consistent, with rounding applied only after the final calculation.",
	GEOB1: "The classification uses the stated exclusive trapezoid convention. Area uses perpendicular height rather than leg length, and each pair of base angles agrees with the stated isosceles condition.",
	GEOB2: "Every property is justified by the most specific given quadrilateral class. Reverse implications are checked separately; a rhombus or rectangle is not silently assumed to be a square.",
	GEOB3: "Angle totals distinguish arbitrary polygons from regular ones. Composite areas account for overlaps or removed regions once, and all area calculations use perpendicular dimensions with squared units.",
	GEOB4: "Central-angle fractions are applied to the matching full circumference or disc area. Chord calculations use a perpendicular bisector, and every result distinguishes length units from area units.",
	GEOB5: "The angle formula matches the vertex's position relative to the circle. Tangent-length arguments identify perpendicular radii or equal external tangents, and intercepted arcs are the intended arcs.",
	GEOB6: "Each secant product uses an external length and the complete secant length. The written diagram labels distinguish interior chord segments, tangent lengths and exterior distances before substitution.",
	GEOB7: "The rule specifies the rotation center and direction. Coordinate substitutions follow the stated order, and distance and orientation checks distinguish a rotation or translation from a reflection.",
	GEOB8: "The transformation sequence is recorded in order, with the dilation center explicit. Coordinate results are checked against orientation and the separate length and area scale factors.",
	GEOB9: "Base area, base perimeter and perpendicular height are identified separately. Pyramid surface area uses face slant height, and an exposed-face count prevents missing or double-counting surfaces.",
	GEOB10: "Volume and exposed surface area use different formulas and units. Any joined face is removed from the outer area, and scaling distinguishes squared areas from cubed volumes."
};

function numbered(items: string[]) {
	return items
		.map((item, index) => `${String(index + 1)}. ${item}`)
		.join("\n");
}

function selfCheck(track: "a" | "b", heading: string) {
	return `[Check answers and reasoning](${courseAssetViewerUrl(
		`/course-assets/geometry-${
			track
		}/practice-checks-v1.md#${slugMarkdownHeading(heading)}`,
		`${heading} self-check`
	)})`;
}

export function addGeometryCases(course: RawCourse, track: "a" | "b") {
	assertMathCourseBindings(course);
	const data = geometryCaseTracks[track];
	const boundTopics = new Set<string>();
	if (track === "b") {
		for (const title of [
			"GEOB1 Introduction to Quadrilaterals",
			"GEOB1 Trapezoids",
			"GEOB5 Inscribed, Central, Internal, and External Angles",
			"GEOB5 Tangents"
		]) {
			const bindings = course.modules
				.flatMap(module => module.curriculum)
				.filter(item => item.title === title);
			if (bindings.length !== 1)
				throw new Error(`Missing unique Geometry reading ${title}`);
		}
	}
	for (const published of data.modules) {
		const module = course.modules.find(
			item => item.title === published.title
		);
		if (!module)
			throw new Error(`Missing Geometry module ${published.title}`);
		module.id = published.id;
		const topics = new Set<string>();
		const readings: RawCourseModuleItem[] = [];
		for (const original of module.curriculum) {
			const previous = published.curriculum.find(
				item => item.title === original.title
			);
			if (previous) {
				original.id = previous.id;
				original.aliases = [...previous.aliases];
			}
			const codes = original.title.match(/GEO[AB]\d+/g) ?? [];
			for (const code of codes) {
				topics.add(code);
				boundTopics.add(code);
			}
			if (
				!codes.length ||
				original.title === "GEOB6 Challenge Circle Problems"
			) {
				if (original.title === "Geometry B Capstone Synthesis")
					original.contentKind = "reading";
				continue;
			}
			const methods = codes
				.map(code => {
					const unit = data.cases.find(item => item.code === code);
					if (!unit)
						throw new Error(`Missing Geometry topic ${code}`);
					let reading = unit.reading;
					let worked = unit.worked;
					if (
						original.title ===
						"GEOB1 Introduction to Quadrilaterals"
					) {
						reading = reading.split("This course uses")[0].trim();
						worked = "";
					} else if (original.title === "GEOB1 Trapezoids") {
						reading = `This course uses${
							reading.split("This course uses")[1]
						}`;
					} else if (
						original.title ===
						"GEOB5 Inscribed, Central, Internal, and External Angles"
					) {
						reading = reading
							.split("A radius to a tangent")[0]
							.trim();
					} else if (original.title === "GEOB5 Tangents") {
						const combined = data.cases.find(
							item => item.code === "GEOB6"
						);
						if (!combined)
							throw new Error("Missing combined circle methods.");
						reading = `A radius to a tangent${
							reading.split("A radius to a tangent")[1]
						}\n\n${combined.reading}`;
						worked = combined.worked;
					}
					return `${
						codes.length > 1
							? `### ${unit.code} ${unit.title}\n\n`
							: ""
					}**Methods and definitions:**\n\n${
						reading
					}${worked ? `\n\n**Worked example:**\n\n${worked}` : ""}`;
				})
				.join("\n\n");
			readings.push({
				...original,
				content: `${original.content
					.split("**Practice model:**")[0]
					.trim()}\n\n${methods}`,
				contentKind: "reading",
				preserveInstructions: true
			});
		}
		const grouped = published.curriculum.find(item =>
			item.title.endsWith("Core Concepts")
		);
		if (grouped && readings.length) {
			module.curriculum = [
				{
					...grouped,
					aliases: [...grouped.aliases],
					contentKind: "reading",
					preserveInstructions: true,
					learningPath: "core",
					content: readings
						.map(item => `## ${item.title}\n\n${item.content}`)
						.join("\n\n")
				},
				...module.curriculum.filter(
					item =>
						!readings.some(reading => reading.title === item.title)
				)
			];
		} else {
			module.curriculum = module.curriculum.map(
				item =>
					readings.find(reading => reading.title === item.title) ??
					item
			);
		}
		for (const unit of data.cases.filter(item => topics.has(item.code))) {
			const heading = `${unit.code} ${unit.title}`;
			const content = `**Problems:**\n\n${numbered(
				unit.problems
			)}\n\n**Checkpoints:**\n\n${completionChecks[unit.code]}\n\n${selfCheck(track, heading)}`;
			if (unit.code === "GEOB6") {
				const original = module.curriculum.find(
					item => item.title === "GEOB6 Challenge Circle Problems"
				);
				if (!original) throw new Error("Missing circle challenge.");
				original.content = content;
				original.preserveInstructions = true;
			} else {
				module.curriculum.push({
					id: `${
						published.id
					}-curriculum-practice-${unit.code.toLowerCase()}`,
					title: `Practice: ${heading}`,
					content,
					preserveInstructions: true,
					learningPath: "core"
				});
			}
		}
		const review = data.reviews.find(
			item => item.moduleTitle === module.title
		);
		if (review) {
			const bindings = module.curriculum.filter(item =>
				item.title.endsWith("Readiness Check")
			);
			if (bindings.length !== 1) {
				throw new Error(
					`Missing or duplicate Geometry review ${module.title}`
				);
			}
			const original = bindings[0];
			original.content += `\n\n**Mixed set:**\n\n${numbered(
				review.problems
			)}\n\n${selfCheck(track, review.title)}`;
			original.preserveInstructions = true;
		}
	}
	for (const unit of data.cases) {
		if (!boundTopics.has(unit.code))
			throw new Error(`Missing Geometry topic binding ${unit.code}`);
	}
}
