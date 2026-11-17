import type { RawCourse } from "./types";
import {
	courseAssetViewerUrl,
	slugMarkdownHeading
} from "@/modules/courseAssetSourcesPrealgebra";
import { assertMathCourseBindings } from "./prealgebraGeometryBindings";

export const preAlgebraBCaseData = [
	{
		code: "statistics",
		target: "Range, Median, Mode, and Mean",
		title: "Statistics and Ordered Data",
		methods:
			"For n recorded numerical values, sort the values before locating the median. The mean is the sum divided by n, where n>0; with even n the median averages the two middle values. Range is maximum minus minimum. A mode has the greatest frequency; report tied modes when some values repeat, and no mode when every value occurs once. These lessons use the median-of-halves quartile convention: omit the overall median when n is odd, then take the median of each half as Q1 and Q3. The interquartile range is IQR=Q3-Q1. Different quartile conventions can give different results, so state the convention. Counts in a frequency table weight each value by how often it occurs.",
		worked: "For 2,4,4,6,14, the sum is 30, mean 6, median 4, mode 4 and range 12. Omitting the median leaves halves 2,4 and 6,14, giving Q1=3, Q3=10 and IQR=7. Replacing 14 with 44 raises the mean to 12 and range to 42 but leaves the median 4; the unusually large value affects these summaries differently.",
		problems: [
			"For 1,3,3,5,8,10, calculate mean, median, mode, range, Q1, Q3 and IQR using the stated convention. Then replace 10 with 40 and recalculate mean, median and range. Identify which of those three changes least.",
			"Compare 2,2,7,7 with 1,2,3,4. Name every mode under the stated convention and find each median. Explain why a list need not have exactly one mode, and why a median need not be a recorded value.",
			"Two tasks each take 12 minutes and one task takes 18 minutes. Find the mean time across the three tasks using frequencies. Compare this result with averaging only 12 and 18, and explain which denominator counts the actual tasks."
		],
		checks: "Calculations retain the original observations and their frequencies. Sorting precedes positional statistics, and the quartile convention is named. The explanation distinguishes center from spread and checks whether an unusual value changes the conclusion, rather than choosing a statistic only because it is easy to calculate.",
		moduleTitle: "PAB1-PAB5 Data, Averages, and Graphs",
		moduleId: "pre-algebra-b-pab1-pab5-data-averages-and-graphs",
		readingId:
			"pre-algebra-b-pab1-pab5-data-averages-and-graphs-curriculum-range-median-mode-and-mean",
		aliases: []
	},
	{
		code: "graphs",
		target: "Single-Variable and Multivariable Graphs",
		title: "Graph Choice, Scales and Rates",
		methods:
			"A dot plot locates each numerical observation on a number line. A histogram counts numerical values in nonoverlapping intervals; specify which endpoints belong to each interval. A bar graph compares categorical counts, with separate bars for categories. A box plot displays minimum, Q1, median, Q3 and maximum using the stated quartile convention. A scatter plot pairs two numerical variables; a line graph can connect successive measurements of a changing quantity. Label variables, units and scale intervals. A line segment on a distance-time graph has rate change in distance/change in time. A trend in observational data alone does not establish that one variable causes the other. A truncated vertical axis can exaggerate visual differences.",
		worked: "For times 0,1,2,3 hours and distances 0,4,8,12 kilometers, plot (0,0),(1,4),(2,8),(3,12). Each interval has rate 4 kilometers per hour; straight segments represent a constant-rate assumption between measurements. Favorite-color counts A=3, B=5, C=2 instead call for categorical bars totaling 10 responses, not a continuous line suggesting intermediate colors.",
		problems: [
			"Place 0,1,1,2,3,5 into histogram intervals [0,2), [2,4) and [4,6), where [a,b) includes a and excludes b. Give all three counts, a numerical-axis label and a count-axis label. Explain why each observation belongs to exactly one interval.",
			"Study-hour and score pairs are (1,50),(2,62),(3,59),(4,74). Choose a graph, identify the overall association and the interval that breaks a strictly increasing pattern. Explain why these four observations cannot by themselves prove that an extra hour causes a fixed score increase.",
			"A cumulative-distance graph joins (0 minutes,0 miles), (15 minutes,2 miles) and (30 minutes,5 miles) with straight segments. Find the rate on each segment and the average rate for the whole trip in miles per hour. State the interpretation of the straight segments."
		],
		checks: "Every plotted value comes from a labeled record. Bins are mutually exclusive and counts match the sample size. Rates use differences in cumulative measurements and compatible units. Interpretations separate observed association, interpolation assumptions and causal claims, with enough axis information for another reader to reconstruct the display.",
		moduleTitle: "PAB1-PAB5 Data, Averages, and Graphs",
		moduleId: "pre-algebra-b-pab1-pab5-data-averages-and-graphs",
		readingId:
			"pre-algebra-b-pab1-pab5-data-averages-and-graphs-curriculum-single-variable-and-multivariable-graphs",
		aliases: []
	},
	{
		code: "angles-triangles",
		target: "Points, Lines, Angles, and Triangle Relationships",
		title: "Angles and Right Triangles",
		methods:
			"A segment has two endpoints; a ray extends from one endpoint; a line extends both ways. Angles measure turns: acute means 0<angle<90 degrees, right means 90, obtuse means 90<angle<180, straight means 180 and a full turn means 360. Complementary angles sum to 90; supplementary angles sum to 180. Opposite angles formed by intersecting lines are equal, and adjacent angles on a straight line sum to 180. With parallel lines cut by a transversal, corresponding and alternate interior angles are equal; same-side interior angles sum to 180. A triangle has interior-angle sum 180. In a right triangle, legs a,b and opposite hypotenuse c satisfy a^2+b^2=c^2. This side equation requires a right angle; a square-root length is nonnegative.",
		worked: "If two angles of a triangle are 35 and 65 degrees, the third is 180-35-65=80 degrees. A right triangle with legs 9 and 12 meters has hypotenuse sqrt(9^2+12^2)=sqrt(225)=15 meters. For gymnastics turns of 351,372 and 365 degrees, comparison with 360 gives 9 degrees short, 12 degrees over and 5 degrees over, respectively.",
		problems: [
			"Two lines intersect, forming an angle of 127 degrees. Find its opposite angle and either adjacent angle. Separately, find the third angle of a triangle whose first two angles are 41 and 67 degrees, naming the sum used.",
			"A right triangle has legs 6 and 8 centimeters. Find the hypotenuse. Another right triangle has hypotenuse 13 centimeters and one leg 5 centimeters; find its other leg. Identify the hypotenuse before choosing addition or subtraction.",
			"Parallel lines are cut by a transversal. One corresponding angle is 64 degrees. Find its corresponding partner and a same-side interior angle paired with it. Then find the complement of a separate 28-degree angle; distinguish the 90-degree and 180-degree totals."
		],
		checks: "The diagram labels the relevant angle pair or right triangle. Angle totals are chosen from the stated relationship, while the hypotenuse stays opposite the right angle. Lengths keep linear units, squared lengths are used inside the theorem, and a full rotation is compared with 360 degrees rather than 180.",
		moduleTitle: "PAB6-PAB9 Lines, Angles, Triangles, and Similarity",
		moduleId:
			"pre-algebra-b-pab6-pab9-lines-angles-triangles-and-similarity",
		readingId:
			"pre-algebra-b-pab6-pab9-lines-angles-triangles-and-similarity-curriculum-points-lines-angles-and-triangle-relationships",
		aliases: []
	},
	{
		code: "similarity",
		target: "Congruence, Similarity, and Scale",
		title: "Correspondence and Scale",
		methods:
			"Congruent figures have equal corresponding lengths and angles. Similar figures have equal corresponding angles and one positive scale factor k relating every corresponding length in the same direction. Write the vertex correspondence before forming ratios. For triangles, equal corresponding angles establish similarity; proportional triples of sides also do. For general polygons, proportional sides alone do not establish matching angles. A similarity scales perimeter by k, area by k^2 and volume of similar solids by k^3. A drawing or map scale compares matching units after conversion. A scale factor of 1 describes congruent similar figures, including rotations and reflections.",
		worked: "Triangle ABC has sides AB=3, BC=4, AC=5 centimeters. Similar triangle DEF has DE=7.5 centimeters with A corresponding to D, B to E and C to F. The factor is 7.5/3=2.5, so EF=10 and DF=12.5 centimeters; the perimeter changes from 12 to 30. Its area is multiplied by 2.5^2=6.25, not by 2.5.",
		problems: [
			"Triangles with corresponding sides 4,6,8 and 6,9,12 centimeters are similar. Find the scale factor from the first to the second, both perimeters and the area multiplier. Check the same factor against every side.",
			"A rectangle is 4 by 7 meters. A similar enlarged rectangle uses scale factor 3. Find its dimensions, perimeter and area, and compare the perimeter and area multipliers with the original rectangle.",
			"A square and a rhombus each have four sides of length 5 centimeters. The rhombus has angles 60,120,60,120 degrees. Are the figures congruent or similar? Explain why four equal side ratios alone do not establish similarity for these quadrilaterals."
		],
		checks: "Correspondence is explicit and every ratio uses the same direction. Linear, area and volume scaling are treated separately. The conclusion uses both shape and size evidence, rather than inferring all geometric relationships from equal side lengths or from the appearance of an unscaled sketch.",
		moduleTitle: "PAB6-PAB9 Lines, Angles, Triangles, and Similarity",
		moduleId:
			"pre-algebra-b-pab6-pab9-lines-angles-triangles-and-similarity",
		readingId:
			"pre-algebra-b-pab6-pab9-lines-angles-triangles-and-similarity-curriculum-congruence-similarity-and-scale",
		aliases: []
	},
	{
		code: "polygons",
		target: "Quadrilaterals, Polygons, Perimeter, and Area",
		title: "Polygon Measurements",
		methods:
			"Perimeter P is the sum of all boundary sides. Rectangle area is lw and perimeter 2(l+w); a square of side s has area s^2 and perimeter 4s. Triangle area is bh/2, and parallelogram area bh, with h perpendicular to the chosen base b. A trapezoid with parallel bases b1,b2 has area (b1+b2)h/2. A rhombus has area bh or d1×d2/2 for its perpendicular diagonals. A regular polygon with perimeter P and apothem a has area Pa/2; the apothem is perpendicular from center to a side. A simple n-sided polygon has interior-angle sum (n-2)×180 degrees; a regular polygon divides this total equally among n angles. Split a composite region into nonoverlapping simpler shapes and add or subtract their areas. Length, area and volume use linear, square and cubic units.",
		worked: "An isosceles trapezoid has parallel bases 8 and 14 meters, perpendicular height 4 meters and legs 5 meters. Its area is (8+14)×4/2=44 square meters, while perimeter is 8+14+5+5=32 meters. The slanted leg is not the perpendicular height. A pentagon has interior-angle sum (5-2)×180=540 degrees, so each angle of a regular pentagon is 108 degrees.",
		problems: [
			"A rectangle measures 8 by 3 centimeters. Find area and perimeter. A right triangle occupies half of that rectangle along a diagonal; find its area and explain why its area units differ from the rectangle perimeter units.",
			"A rhombus has perpendicular diagonals 6 and 8 centimeters and side length 5 centimeters. Find its area and perimeter. A parallelogram has base 9, adjacent side 6 and perpendicular height 4 centimeters; find its area and perimeter without using the slanted side as height.",
			"A regular hexagon has side length 4 centimeters and apothem 2sqrt(3) centimeters. Find perimeter, exact area, interior-angle sum and each interior angle. Name the role of the apothem in the area formula."
		],
		checks: "The requested measurement is named before substitution. Bases, perpendicular heights, slanted sides and diagonals retain different roles. Boundary sides are counted once, composite areas do not overlap, and regular-polygon formulas are used only with the regularity assumption. Each answer includes units appropriate to a length or an area.",
		moduleTitle: "PAB10-PAB14 Polygons, Area, Circles, and Solids",
		moduleId: "pre-algebra-b-pab10-pab14-polygons-area-circles-and-solids",
		readingId:
			"pre-algebra-b-pab10-pab14-polygons-area-circles-and-solids-curriculum-quadrilaterals-polygons-perimeter-and-area",
		aliases: []
	},
	{
		code: "circles-solids",
		target: "Circles and Three-Dimensional Shapes",
		title: "Circles, Surface Area and Volume",
		methods:
			"For radius r, diameter d=2r, circumference C=2πr=πd and circle area A=πr^2. A rectangular prism has volume lwh and total surface area 2(lw+lh+wh); a cube of side s has volume s^3 and surface area 6s^2. A right prism has volume Bh and total surface area 2B+Ph, where B and P are base area and perimeter and h is perpendicular height. A closed right circular cylinder has volume πr^2h and total surface area 2πr^2+2πrh. A pyramid has volume Bh/3; for a regular pyramid with slant height s, total surface area is B+Ps/2. A right circular cone has volume πr^2h/3 and total surface area πr^2+πrs, where s is slant height. A sphere has volume 4πr^3/3 and surface area 4πr^2. These surface-area formulas include every base of the closed solid. An open container omits its missing faces. Keep exact π values unless a decimal approximation is requested.",
		worked: "A closed cylinder with r=3 and h=4 centimeters has circumference 6π centimeters, base area 9π square centimeters, volume 36π cubic centimeters and total surface area 2×9π+2π×3×4=42π square centimeters. A 2 by 3 by 4 centimeter rectangular prism instead has volume 24 cubic centimeters and total surface area 2(6+8+12)=52 square centimeters.",
		problems: [
			"A circle has diameter 10 centimeters. Find its radius, circumference and area in exact form. Explain the different units for its boundary and its interior, and why substituting the diameter for the radius in πr^2 would give the wrong area.",
			"A closed rectangular prism measures 7 by 3 by 4 feet. Find its volume and total surface area. Then remove its 7-by-3 top face to model an open box and recalculate surface area without changing the volume enclosed up to the rim.",
			"A cone and a closed cylinder each have radius 3 and perpendicular height 4 centimeters; the cone slant height is 5 centimeters. Find both volumes and total surface areas. Also find volume and surface area of a sphere with radius 3, and compare its volume with the cylinder."
		],
		checks: "The figure, radius or diameter, perpendicular height and any slant height are labeled. Surface area includes exactly the faces present, while volume measures enclosed space. Exact π values remain distinct from approximations, and formulas for closed solids are adjusted when a face is explicitly removed from the model.",
		moduleTitle: "PAB10-PAB14 Polygons, Area, Circles, and Solids",
		moduleId: "pre-algebra-b-pab10-pab14-polygons-area-circles-and-solids",
		readingId:
			"pre-algebra-b-pab10-pab14-polygons-area-circles-and-solids-curriculum-circles-and-three-dimensional-shapes",
		aliases: []
	},
	{
		code: "factors-primes",
		target: "Multiples, Factors, Divisibility, and Primes",
		title: "Divisibility and Prime Factorization",
		methods:
			"For positive integers, a factor divides evenly with remainder zero, and a multiple is a whole-number product. A prime is an integer greater than 1 with exactly two positive factors; 0 and 1 are not prime, and 2 is the only even prime. Divisibility by 2 requires an even last digit; by 3 or 9 requires the digit sum to be divisible by 3 or 9; by 5 requires last digit 0 or 5; by 10 requires last digit 0. For 4 test the last two digits, for 8 the last three digits, and for 6 require both the 2 and 3 tests. Repeatedly divide by prime factors and multiply the factors back to verify a factorization. To establish primality, it suffices to test prime divisors no larger than the square root: a composite number must have at least one factor at or below that bound.",
		worked: "360 ends in 0 and has digit sum 9, so it is divisible by 2,3,5,9 and 10. Dividing by primes gives 360=2^3×3^2×5. In contrast, 91=7×13 is composite even though it fails the 2,3 and 5 tests; failure of a few quick tests is not a proof of primality.",
		problems: [
			"For 378, decide divisibility by 2,3,5,9 and 10 using the digit tests, then find its prime factorization. Verify the product and explain why a number can fail some tests while still being composite.",
			"List all positive factor pairs of 84 and use them to list its positive factors. Separately, list every prime no larger than 20, explaining why 1 is absent and why even numbers above 2 are absent.",
			"Decide whether 91 and 97 are prime. For each, identify the prime divisors that need testing using the square-root bound, and supply either a factorization or the completed finite set of tests."
		],
		checks: "Prime claims include the complete required tests, while composite claims supply a nontrivial factor. Factor pairs use positive integers, divisibility tests are applied to the correct digits, and every prime factorization multiplies back to its starting value. The special cases 0,1 and 2 are handled explicitly.",
		moduleTitle: "PAB15-PAB19 Factors, Multiples, and Number Structure",
		moduleId:
			"pre-algebra-b-pab15-pab19-factors-multiples-and-number-structure",
		readingId:
			"pre-algebra-b-pab15-pab19-factors-multiples-and-number-structure-curriculum-multiples-factors-divisibility-and-primes",
		aliases: []
	},
	{
		code: "gcf-lcm",
		target: "GCF and LCM",
		title: "Common Factors and Repeating Cycles",
		methods:
			"For positive integers, the GCF is their greatest shared positive factor and the LCM their least shared positive multiple. In prime factorizations, give a missing prime exponent 0. GCF uses the minimum exponent of each prime across all inputs; LCM uses the maximum. List methods provide a second check for small values. For exactly two positive integers a,b, GCF(a,b)×LCM(a,b)=a×b. Largest identical groups using every item require a GCF; the first positive time when repeated cycles coincide requires an LCM, provided the cycles start together and keep constant periods. Interpret the computed divisor or multiple in the original units.",
		worked: "72=2^3×3^2 and 120=2^3×3×5. Minimum exponents give GCF=2^3×3=24; maximum exponents give LCM=2^3×3^2×5=360. Making the largest number of identical packs from 72 red and 120 blue items gives 24 packs containing 3 red and 5 blue each. Cycles lasting 72 and 120 minutes first meet again after 360 minutes if they start together.",
		problems: [
			"Find GCF and LCM of 48 and 180 using prime exponents. Check their product against 48×180 and explain the effect of a prime missing from one factorization.",
			"Use all 18 red and 24 blue tokens to make the largest possible number of identical packs. Find the number of packs and contents of each. Separately, two signals start together and repeat every 18 and 24 minutes; find the first positive reunion time and each signal count.",
			"For 12,18 and 30, find the GCF and LCM by comparing prime exponents across all three inputs. Test whether their GCF times LCM equals the product 12×18×30, and explain why the two-input identity cannot simply be extended to three inputs."
		],
		checks: "Prime exponents include zero for missing primes. The conclusion identifies whether a shared divisor or a shared multiple answers the question, names the resulting packs or time, and verifies all original quantities or cycle periods. A formula with two inputs is not assumed to apply unchanged to a longer list.",
		moduleTitle: "PAB15-PAB19 Factors, Multiples, and Number Structure",
		moduleId:
			"pre-algebra-b-pab15-pab19-factors-multiples-and-number-structure",
		readingId:
			"pre-algebra-b-pab15-pab19-factors-multiples-and-number-structure-curriculum-gcf-and-lcm",
		aliases: []
	},
	{
		code: "probability",
		target: "Counting Strategies and Probability",
		title: "Sample Spaces and Probability",
		methods:
			"List outcomes so each occurs exactly once; order matters when positions or successive trials are distinguished. The multiplication principle counts stages by multiplying available choices, or by adding branch counts when later choices depend on earlier ones. In a finite equally likely sample space, probability is favorable outcomes divided by total outcomes. Without equal likelihood, outcome counts alone do not give probability. Probabilities lie from 0 to 1; impossible events have 0 and certain events 1. P(not A)=1-P(A). Add disjoint event probabilities; for overlapping events subtract the overlap once. Multiply probabilities for independent events. Without independence, use the probability of each next event given the earlier events. Sampling without replacement changes counts; replacing and remixing can preserve them. Experimental probability is observed successes divided by trials and can differ from a theoretical model.",
		worked: "A bag contains 3 red and 2 blue counters. Two random draws with replacement and remixing give P(red then red)=(3/5)^2=9/25. Without replacement the second red probability after a red draw is 2/4, giving (3/5)(2/4)=3/10. The sample spaces and conditions differ. A fair die has six equally likely outcomes, so P(not 6)=5/6.",
		problems: [
			"Roll two independent fair six-sided dice. Use ordered pairs to count outcomes with sum at least 10, then find that probability. Also find the probability that at least one die is 6 by counting the complement or carefully removing double-counting.",
			"An outfit uses one of 3 shirts, one of 2 trousers and one of 2 hats. Count all outfits. If shirt A permits only hat 1, while shirts B and C permit either hat, count valid outfits by branches and explain why 3×2×2 no longer applies without adjustment.",
			"A game model gives win probability 1/2 on each independent trial. In 20 trials there are 8 wins. Find the experimental win proportion and the model probability of winning the next two trials. Explain why 8 wins do not force the next result, and name an impossible event for a single fair-die roll."
		],
		checks: "The sample space and equal-likelihood assumption are explicit. Ordered outcomes are counted once, restrictions change branch counts, and replacement conditions determine whether multiplication uses independent or conditional probabilities. Experimental frequencies describe the observed trials; predictions retain the model assumptions and do not turn a short streak into a guaranteed future outcome.",
		moduleTitle: "PAB20-PAB23 Counting, Probability, and Applied Modeling",
		moduleId:
			"pre-algebra-b-pab20-pab23-counting-probability-and-applied-modeling",
		readingId:
			"pre-algebra-b-pab20-pab23-counting-probability-and-applied-modeling-curriculum-counting-strategies-and-probability",
		aliases: []
	},
	{
		code: "models",
		target: "Applied Data Models and Dashboards",
		title: "Data Models and Decisions",
		methods:
			"Start a model by defining the question, variables, units and assumptions. A table records one entity or observation per row and one field per column; missing measurements are different from measured zeros. A rate divides an outcome by the relevant exposure or denominator. Combining groups uses total outcomes/total exposure, not an unweighted average of group percentages when group sizes differ. A fixed-plus-variable model has form total=fixed amount+rate×quantity. Compare candidate models at the same input, and locate where their predicted totals agree. A dashboard can show counts, rates and a graph for the decision, but a visual pattern is evidence about the observed data rather than proof of causation or future performance.",
		worked: "Two fictional service plans cost A(n)=20+3n and B(n)=50+2n dollars for n items, with n a nonnegative whole number. At n=20 their costs are 80 and 90 dollars, so A is cheaper at that input. Equality gives 20+3n=50+2n, hence n=30 with both costs 110. B is cheaper for n>30 within this model; the conclusion assumes the stated prices and excludes unspecified fees.",
		problems: [
			"Two fictional plans use A(n)=4+2n and B(n)=10+n dollars for nonnegative whole-number n. Compare costs at n=4 and n=8, then find where they agree. State the choice on either side of that input and the assumption that keeps the comparison valid.",
			"A blue design receives 9 favorable responses out of 12 and a red design 12 out of 24. Calculate both proportions and the combined favorable proportion. Explain why averaging the two percentages gives the wrong combined result and why these records alone cannot prove that color caused the difference.",
			"A table records 12 items at $6 each and 5 items at $9 each. Calculate total items, total cost and average cost per item as an exact fraction and to the nearest cent. A third row has an unknown quantity; explain why recording that missing quantity as zero would change the meaning of the data."
		],
		checks: "Every comparison uses common units and the same stated input. Rates retain their denominators, totals reconcile with rows, and rounded values remain distinct from exact fractions. Recommendations name the assumptions and data limitations that could change the result; missing entries remain visibly missing instead of being silently converted to measured zeros.",
		moduleTitle: "PAB20-PAB23 Counting, Probability, and Applied Modeling",
		moduleId:
			"pre-algebra-b-pab20-pab23-counting-probability-and-applied-modeling",
		readingId:
			"pre-algebra-b-pab20-pab23-counting-probability-and-applied-modeling-curriculum-applied-data-models-and-dashboards",
		aliases: []
	}
];
export const preAlgebraBReviewData = [
	{
		moduleTitle: "Pre-Algebra B Kick-Off",
		target: "Course Map and Readiness Check",
		title: "Pre-Algebra B Entry Review",
		problems: [
			"Evaluate -6+4×3 and abs(-8). State the operation order and distinguish a signed result from distance.",
			"Compute 3/4+1/6 as an exact fraction and find 25% of 80. Identify the denominator used for each calculation.",
			"For the ordered data 2,4,4,10, find mean and median, writing the total and the two central values.",
			"A rectangle is 5 by 3 centimeters. Find its perimeter and area, with the correct units.",
			"A fair six-sided die is rolled once. List the even outcomes and find their probability using the total number of equally likely outcomes."
		]
	},
	{
		moduleTitle: "Check-In #1: Pre-Algebra B Data and Graphing",
		target: "Data and Graphing Readiness Check",
		title: "Data and Graphing Review",
		problems: [
			"For 2,4,4,6,9,11, find mean, median, mode, range, Q1, Q3 and IQR using median-of-halves quartiles.",
			"The categories A,B,C have counts 4,7,3. Name an appropriate graph and give the total count and most frequent category.",
			"Place 1,2,2,4,6 into intervals [0,3), [3,6), [6,9). State all counts and which interval contains 6.",
			"A distance-time graph goes from (0 hours,0 kilometers) to (2 hours,10 kilometers). Find the segment rate and state the assumption made by connecting the endpoints with a straight segment.",
			"Paired values generally increase together. Explain why that observation alone does not establish causation and name one possible alternative explanation."
		]
	},
	{
		moduleTitle: "Check-In #2: Pre-Algebra B Geometry",
		target: "Geometry Readiness Check",
		title: "Pre-Algebra B Geometry Review",
		problems: [
			"A triangle has angles 48 and 57 degrees. Find the third. A separate angle is supplementary to 136 degrees; find it.",
			"A right triangle has legs 5 and 12 meters. Find its hypotenuse and the corresponding hypotenuse in a similar triangle enlarged by factor 2.",
			"A trapezoid has parallel bases 6 and 10 centimeters and perpendicular height 3 centimeters. Find its area and state why the height must be perpendicular.",
			"A circle has radius 4 centimeters. Find exact circumference and area, with units.",
			"A closed cylinder has radius 2 and height 5 centimeters. Find exact volume and total surface area; identify the two base faces in the calculation."
		]
	},
	{
		moduleTitle: "Check-In #3 and Capstone: Pre-Algebra B",
		target: "Number Structure, Probability, and Modeling Readiness Check",
		title: "Number Structure and Probability Review",
		problems: [
			"Find the prime factorization of 126 and state whether it is divisible by 2,3,5 and 9.",
			"Find GCF and LCM of 36 and 60. Explain which answers the first positive coincidence of 36-minute and 60-minute cycles that start together.",
			"A round-robin event has 6 players and each unordered pair plays once. Count games without counting the two player orders as separate games.",
			"A bag has 4 green and 2 yellow counters. Find the probability of two green draws without replacement, then with replacement and remixing.",
			"One group records 3 successes in 5 trials and another 2 in 10. Find the combined success proportion and explain why an unweighted average of the two group percentages is unsuitable."
		]
	}
];

function numbered(items: string[]) {
	return items
		.map((item, index) => `${String(index + 1)}. ${item}`)
		.join("\n");
}
function selfCheck(heading: string) {
	return `[Check answers and reasoning](${courseAssetViewerUrl(
		`/course-assets/pre-algebra-b/practice-checks-v1.md#${slugMarkdownHeading(
			heading
		)}`,
		`${heading} self-check`
	)})`;
}
export function addPreAlgebraBCases(course: RawCourse) {
	assertMathCourseBindings(course);
	for (const unit of preAlgebraBCaseData) {
		const module = course.modules.find(
			item => item.title === unit.moduleTitle
		);
		const reading = module?.curriculum.find(
			item => item.title === unit.target
		);
		if (!module || !reading)
			throw new Error(`Missing Pre-Algebra B reading ${unit.target}`);
		module.id = unit.moduleId;
		reading.id = unit.readingId;
		reading.aliases = [...unit.aliases];
		reading.content = `${reading.content
			.split("**Practice model:**")[0]
			.trim()}\n\n**Methods and definitions:**\n\n${
			unit.methods
		}\n\n**Worked example:**\n\n${unit.worked}`;
		reading.contentKind = "reading";
		reading.preserveInstructions = true;
		module.curriculum.push({
			id: `${unit.moduleId}-curriculum-practice-${unit.code}`,
			title: `Practice: ${unit.title}`,
			content: `**Problems:**\n\n${numbered(
				unit.problems
			)}\n\n**Checkpoints:**\n\n${unit.checks}\n\n${selfCheck(
				unit.title
			)}`,
			learningPath: "core",
			preserveInstructions: true
		});
	}
	for (const review of preAlgebraBReviewData) {
		const module = course.modules.find(
			item => item.title === review.moduleTitle
		);
		const item = module?.curriculum.find(
			item => item.title === review.target
		);
		if (!item)
			throw new Error(`Missing Pre-Algebra B review ${review.target}`);
		item.content += `\n\n**Mixed set:**\n\n${numbered(
			review.problems
		)}\n\n${selfCheck(review.title)}`;
		item.preserveInstructions = true;
	}
}
