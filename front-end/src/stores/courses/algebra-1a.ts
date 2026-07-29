import type { RawCourse } from "./types";
import { configureMathCourseFlow } from "./mathCourseFlow";
import { pendingStaticMediaNotice, staticMediaUrl } from "./staticMedia";

const MEDIA_BASE = "https://static.classes.jacobdanderson.net/algebra-1a";

const media = {
	kickoffDeliveryMap: `${MEDIA_BASE}/kickoff-delivery-map.svg`,
	kickoffDeliveriesGrowth: `${MEDIA_BASE}/kickoff-deliveries-growth.svg`,
	communityDataAnalysis: `${MEDIA_BASE}/aa7-community-data-analysis.svg`,
	graphingInequality: `${MEDIA_BASE}/aa10-graphing-inequality.svg`,
	checkIn2CoordinatePlane: `${MEDIA_BASE}/checkin-2-coordinate-plane.svg`,
	checkIn2Line: `${MEDIA_BASE}/checkin-2-line-y-3x-minus-2.svg`,
	checkIn2PeaProduction: `${MEDIA_BASE}/checkin-2-pea-production.svg`,
	checkIn2Inequality: `${MEDIA_BASE}/checkin-2-inequality-y-lte-negx-plus-7.svg`,
	systemsGraphing: `${MEDIA_BASE}/aa12-systems-graphing.svg`,
	checkIn3ParabolaLine: `${MEDIA_BASE}/checkin-3-parabola-line.svg`
} as const;

const sourceStaticFilenames = [
	"aa4_pset1_0.png",
	"aa5_pset2_0.png",
	"aa5_pset2_1.png",
	"aa5_pset2_2.png",
	"aa5_pset2_3.png",
	"aa5_pset2_4.png",
	"aa5_pset2_5.png",
	"aa5_pset2_6.png",
	"aa5_pset2_7.png",
	"aa5_pset2_8.png",
	"aa5_pset2_9.png",
	"aa5_pset2_10.png",
	"aa5_pset2_11.png",
	"aa5_pset2_12.png",
	"aa6_pset1_0.png",
	"aa6_pset1_1.png",
	"aa6_pset1_2.png",
	"aa6_pset1_3.png",
	"aa6_pset1_4.png",
	"aa6_pset2_0.png",
	"aa6_pset2_1.png",
	"aa6_pset2_2.png",
	"aa6_pset2_3.png",
	"aa6_pset2_4.png",
	"aa7_0.png",
	"aa7_pset1_0.png",
	"aa7_pset1_1.png",
	"aa7_pset1_2.png",
	"aa7_pset1_3.png",
	"aa7_pset1_4.png",
	"aa8_pset1_0.png",
	"aa8_pset1_1.png",
	"aa8_pset2_0.png",
	"aa8_pset2_sol0.png",
	"aa11_0.png",
	"aa11_1.png",
	"aa11_2.png",
	"aa11_3.png",
	"aa11_4.png",
	"checkin2_app_0.png",
	"checkin2_app_2.png",
	"checkin2_forms_0.png",
	"checkin2_inequalities_1.png",
	"checkin3_graphing_1.png"
] as const;

function createLesson(title: string, content: string, mediaLink?: string) {
	return mediaLink ? { title, content, mediaLink } : { title, content };
}

function createModule(
	title: string,
	curriculum: Array<ReturnType<typeof createLesson>>
) {
	return {
		title,
		curriculum,
		supplementalProjects: []
	};
}

function sourceMediaReferences() {
	return sourceStaticFilenames
		.map(
			filename =>
				`- \`${filename}\` -> ${staticMediaUrl(filename)}\n\n${pendingStaticMediaNotice(filename)}`
		)
		.join("\n\n");
}

export const algebra1ACourse: RawCourse = {
	name: "Algebra 1A",
	modules: [
		createModule("Algebra 1A Kick-Off and Placement", [
			createLesson(
				"Kick-Off Overview",
				`
Use the kick-off sequence to find the right starting point in the course without turning the opening checkpoint into a formal test.

- Project 1 targets early equation skills: AA1, AA2, and AA4.
- Project 2 targets graphing skills: AA6, AA8, AA9, and AA10.
- Project 3 targets systems of equations: AA12, AA13, and AA14.
- If a question stalls, move straight into the matching module instead of forcing the full project in order.
- Use the stopping point to choose targeted follow-up practice when appropriate.
				`.trim()
			),
			createLesson(
				"Project 1: Managing a Restaurant",
				`
Create a restaurant menu with up to three choices in each category, then work through the algebra questions below.

**Key questions**

- Two families paid the same total bill. One family bought \`$27\` of food and tipped \`$5.50\`. The other family tipped \`$6\`. How much was the second meal?
- Three friends ordered \`3\` main courses, \`3\` beverages, \`1\` dessert, and \`S\` sides. Their item count is modeled by \`1 + 3 + 3 + S = 5 + 4\`. Solve for \`S\`.
- Ten people split \`$56\` of dessert evenly. What was the price per plate?
- A side dish includes \`sqrt(9)\` pieces. How many pieces come with one order?
- A restaurant starts with \`150\` to-go boxes and uses \`20\` per day. More boxes must be ordered once the total is under \`30\`. Solve \`150 - 20x < 30\`.

**Answer key**

- Second meal: \`$26.50\`
- Sides purchased: \`2\`
- Dessert price per plate: \`$5.60\`
- Pieces per side order: \`3\`
- Inequality: \`150 - 20x < 30\`, maximum wait: \`6\` days
				`.trim()
			),
			createLesson(
				"Project 2A: Delivery Map",
				`
Two deliveries must be made to points shown on the graph. Use the coordinates to locate both drop-off points. If the driver can only move along the street grid, decide which point is closer. Then compute the slope of the line joining the two locations if the driver could travel directly.

**Answer key**

- \`A = (-3, 5)\`
- \`B = (4, 6)\`
- Closer point by street-grid distance: \`A\`
- Slope from \`A\` to \`B\`: \`(6 - 5) / (4 - (-3)) = 1/7\`
				`.trim(),
				media.kickoffDeliveryMap
			),
			createLesson(
				"Project 2B: Weekly Deliveries and Competition",
				`
The restaurant tracks deliveries over time with a straight-line graph.

**Questions and answers**

- In what week were \`45\` deliveries made? \`Week 3\`
- Write the slope-intercept equation for the trend. \`y = 15x\`
- Use the equation to predict week \`6\`. \`90 deliveries\`
- Write one possible point-slope form using \`(3, 45)\`. \`y - 45 = 15(x - 3)\`
- Convert that same relationship to standard form. \`15x - y = 0\`
- Model the statement "our deliveries are more than twice the competition plus five." \`y > 2x + 5\`
				`.trim(),
				media.kickoffDeliveriesGrowth
			),
			createLesson(
				"Project 3: Chef's Special",
				`
Use systems of equations to answer the restaurant scenario questions.

**Answer key**

- Tortilla graphing problem: the two cooks match after \`5\` hours at \`65\` tortillas each.
- Appetizer substitution problem: small appetizer = \`$1.50\`, large appetizer = \`$5.00\`
- Chef's Special elimination problem: \`90\` adults and \`30\` children
				`.trim()
			)
		]),
		createModule("AA1 Algebraic Properties", [
			createLesson(
				"Balancing Equations",
				`
Variables stand for unknown values, and equations stay true only when both sides remain balanced. The central rule for this module is simple: do the same operation to both sides.

**Selected checks**

- \`4 + 11 = 15\` and \`4 + 11 + 2 = 15 + 2\` -> \`True\`
- \`6 + 5 = 10 + 1\` and \`6 + 5 - 8 = 10 + 1 - 8\` -> \`True\`
- \`7 - 3 = 1 - 15 + 18\` and \`2 * 7 - 3 = 2 * 1 - 15 + 18\` -> \`False\`
- \`3 * (12 - 1) = 3 * (7 + 4)\` -> \`True\`

**In words**

- To turn \`3 + 4 = 7\` into an equation with right side \`17\`, add \`10\` to both sides.
- To turn \`8 * 3 = 24\` into an equation with right side \`6\`, divide both sides by \`4\`.
- To turn \`45 - 37 = 8\` into an equation with right side \`64\`, square both sides or multiply both sides by \`8\`.
				`.trim()
			),
			createLesson(
				"Guessing and Checking",
				`
Guess-and-check is slow, but it is a useful bridge to formal solving. Make a reasonable guess, substitute it, and keep only the value that makes both sides equal.

**Representative solutions**

- \`x + 7 = 16\` -> \`9\`
- \`13 + y = 10\` -> \`-3\`
- \`9 + 5 + z = 4\` -> \`-10\`
- \`3x = 9\` -> \`3\`
- \`4z - 7 = 17\` -> \`6\`
- \`4 = x / 11\` -> \`44\`
- \`x^3 = 125\` -> \`5\`
- \`sqrt(z) = 1\` -> \`1\`
- \`4x^2 = 100\` -> \`5\` or \`-5\`

**Word problems**

- \`12 + d = 29\` -> Max earned \`17\` dollars selling lemonade.
- \`56 - c = 37\` -> Sofia gave away \`19\` pieces of candy.
- \`b + 3b = 56\` -> Joe owns \`14\` books.
- \`(1/5)c = 20\` -> Matt owns \`100\` baseball cards.
- \`s^2 = 144\` -> The wall length is \`12\` feet.
				`.trim()
			)
		]),
		createModule("AA2 Solving Single-Step Linear Equations", [
			createLesson(
				"Addition and Subtraction",
				`
To isolate a variable, undo the operation attached to it.

**Representative solutions**

- \`x + 7 = 16\` -> \`9\`
- \`x + 3 = 24\` -> \`21\`
- \`13 + y = 10\` -> \`-3\`
- \`4 + x + 7 = 24\` -> \`13\`
- \`y - 8 = 31\` -> \`39\`
- \`16 + x - 3 = 4 + 5\` -> \`-4\`
- \`30 - x = -5\` -> \`35\`
- \`15 - x = -2x\` -> \`-15\`

**Word problems**

- \`14 + d = 25\` -> Max earned \`11\` dollars.
- \`110 - c = 73\` -> Sofia gave away \`37\` candies.
- \`1/2 + 3/4 + c = 1 3/4\` -> Lily still needs \`1/2\` cup of flour.
- \`5 + 9 + g = 38\` -> John's team won \`24\` games.
- \`7 - 2 + 3 - 4 + c = 9\` -> The train picked up \`5\` carriages.
				`.trim()
			),
			createLesson(
				"Multiplication and Division",
				`
When multiplication or division is attached to a variable, use the inverse operation on both sides.

**Representative solutions**

- \`3x = 9\` -> \`3\`
- \`28 = 7y\` -> \`4\`
- \`22 = 5y - 3y\` -> \`11\`
- \`2x + 8x = 90\` -> \`9\`
- \`y / 5 = 6\` -> \`30\`
- \`x / 11 = 4\` -> \`44\`
- \`y / 3 = 21\` -> \`63\`
- \`z / 6 + z / 3 = 21\` -> \`42\`

**Word problems**

- \`d * 8 * 0.5 = 20\` -> Oliver has \`5\` days of corn.
- \`13d = 39\` -> Each giant lemonade costs \`$3\`.
- \`3b + b = 48\` -> Joe owns \`12\` books.
- \`11c = 16.5\` -> Jessica earns \`$1.50\` per chore.
- \`(1/8)a = 6\` -> Matt owns \`48\` stuffed animals.
				`.trim()
			),
			createLesson(
				"Exponents and Roots",
				`
If a variable is raised to a power, use the matching root. If a root is applied to a variable, raise both sides to the matching power.

**Representative solutions**

- \`x^3 = 125\` -> \`5\`
- \`x^2 = 4\` -> \`2\` or \`-2\`
- \`y^2 = 25\` -> \`5\` or \`-5\`
- \`x^3 = -125\` -> \`-5\`
- \`z^5 = 1024\` -> \`4\`
- \`sqrt(z) = 1\` -> \`1\`
- \`cube_root(y) = 7\` -> \`343\`
- \`z^2 = 63\` -> \`plus or minus 3sqrt(7)\`

**Word problems**

- \`w^2 = 121\` -> wall length \`11\` feet
- \`sqrt(b) = 9\` -> \`81\` bouncy balls
- \`f^2 = 1024\` -> \`32\` feet per fence side
- \`h^3 = 27\` -> pool height \`3\` meters
- \`sqrt(s) = 16\` -> Justin has \`256\` stamps
				`.trim()
			)
		]),
		createModule(
			"AA3 Module Project: Movie Star Status (with Maddie Van Beek)",
			[
				createLesson(
					"Movie Star Status Project Brief",
					`
Build a film-production budget from expressions, equations, and unit-rate calculations.

**Mission 1**

- Choose a film concept and list likely costs for the script, producers, editing, marketing, props, and wardrobes.
- Write algebraic expressions for repeated purchases.
- Decide how much editing will cost and write an equation showing the remaining budget after editing and script costs.
- Estimate the spending represented by \`3000 - c = 2086\`.

**Mission 2**

- Use hourly rates for actors, directors, food, cameras, lights, sound equipment, and location.
- Write equations from fixed totals for actors and cameras.
- Compute the total when the remaining spending equals the cost of food cubed.
				`.trim()
				),
				createLesson(
					"Answer Key and Open-Ended Checks",
					`
**Closed-answer pieces**

- Producers expression: \`150p\`
- Props expression: \`25r\`
- Marketing expression: \`32.5m\`
- Actors equation: \`50a = 250\`, so \`a = 5\`
- Cameras equation: \`35c = 105\`, so \`c = 3\`
- Food cubed: \`10^3 = 1000\`

The rest of the project is intentionally open ended. A strong response justifies the budget choices, keeps units attached to each cost, and checks whether the selected numbers stay inside the total budget. If a student's plan goes over budget, revise one variable at a time and explain which constraint changed. If the plan stays under budget, identify the unused amount and describe whether that leftover money is savings, contingency, or room for a justified upgrade.
				`.trim()
				)
			]
		),
		createModule("AA4 Solving Multi-Step Linear Equations", [
			createLesson(
				"Two-Step and Multi-Step Equations",
				`
When solving multi-step equations, undo operations in the reverse order from the order of operations.

**Representative prompts**

- First step for \`6x + 17 = 47\` -> subtract \`17\`
- First step for \`sqrt(x) - 12 = -7\` -> add \`12\`
- \`2x - 5 = 13\` -> \`9\`
- \`32 + 6x = 80\` -> \`8\`
- \`19x = 15x - 32\` -> \`-8\`
- \`(5 + x)^2 = 196\` style word problem -> solve after isolating the square first
- \`3x - 10 = 8 + 5x\` -> \`-9\`
- \`34 - (2x - 5) = 9\` -> \`15\`
- \`7(x - 8) = 3(x - 4)\` -> \`11\`
- \`(13y - 2)^2 = 64\` -> \`-6/13\` or \`10/13\`
				`.trim()
			),
			createLesson(
				"Problems with Multiple Variables",
				`
One equation with more than one variable usually does not determine a single ordered pair. Instead, solve one variable in terms of the others.

**Representative results**

- \`3z = 6a\` -> \`z = 2a\`
- \`7b + 2y + 2z - 2a = 4y + b\` -> \`z = a - 3b + y\`
- \`4 - z - b = 2 + 3b\` -> \`z = -4b + 2\`
- \`13y + 9x = 9y - 15x\` -> \`y = -6x\`
- \`8x + 4y - 13 = 7\` -> \`y = 5 - 2x\`
- \`3x - 2y - 5 = 7x - 3y\` -> \`y = 4x + 5\`

**Word problems**

- \`0.25q + 0.05n = 2.30\` -> \`n = -5q + 46\`
- \`3c + 9a + 6s = 762\` -> \`c = -3a - 2s + 254\`
				`.trim()
			),
			createLesson(
				"Solving Inequalities",
				`
Addition and subtraction keep the inequality direction the same. Multiplying or dividing by a negative number reverses the inequality.

**Representative solutions**

- \`x + 5 > 8\` -> \`x > 3\`
- \`-2x >= 8\` -> \`x <= -4\`
- \`x^2 > 144\` -> \`x > 12\` or \`x < -12\`
- \`2y + 3 > 11\` -> \`y > 4\`
- \`-5y + 7 >= 2\` -> \`y <= 1\`
- \`-(3/2)y - 6 <= 9\` -> \`y >= -10\`
- \`3z >= 12a\` -> \`z >= 4a\`
- \`4c - 3b > 2z + 8\` -> \`z < 2c - (3/2)b - 4\`

**Word problems**

- \`135 - 18d >= 27\` -> Dave can wait at most \`6\` days before ordering more bananas.
- \`4s + 7 * 3 >= 45\` -> Anna needs at least \`6\` shirts.
				`.trim()
			)
		]),
		createModule("AA5 Module Project: Free Swag! (with Amisha Sisodiya)", [
			createLesson(
				"Free Swag Project Brief",
				`
Model a marketing campaign with algebraic expressions, equations, and inequalities.

**Mission 1**

- Design four swag items with production prices of \`$4\`, \`$5\`, \`$10\`, and \`$2\`.
- Choose two items for day one and write a cost equation totaling \`$1000\`.
- Decide how many of each item to make and compare whether a different pair would produce more total pieces for the same budget.

**Mission 2**

- Decide the minimum number of promotional emails needed for the campaign to count as a success.
- The booth hands out \`6\` swag items per hour.
- Use an inequality to determine the minimum amount of time needed to hit the target based on the number of items produced.
				`.trim()
			),
			createLesson(
				"Open-Ended Guidance",
				`
This project is intentionally open ended. The key deliverables are:

- clear variable definitions for the chosen swag counts
- a correct production-cost equation totaling \`$1000\`
- a defensible comparison between two product mixes
- an inequality that converts "items per hour" into the minimum booth time needed

Explain why their chosen swag is likely to perform well, not just compute a correct total.
				`.trim()
			)
		]),
		createModule("Check-In #1", [
			createLesson(
				"Review Set",
				`
This rebuilt review keeps the same skill focus from AA1 through AA5: balanced equations, one-step equations, multi-step equations, inequalities, and equation-based word problems.

**Suggested problems**

- Balance-check true or false: \`12 - 1 = 7 + 4\` and \`3(12 - 1) = 3(7 + 4)\` -> \`True\`
- Solve \`4 + x + 7 = 24\` -> \`13\`
- Solve \`12x + 5x = 85\` -> \`5\`
- Solve \`45 - 4y = 11y - 60\` -> \`7\`
- Solve \`13y + 9x = 9y - 15x\` for \`y\` -> \`y = -6x\`
- Solve \`-2x - 11 > 17\` -> \`x < -14\`
- Word problem: \`29 + 3p = 74\` -> \`p = 15\`
- Word problem: \`3c + 0.75c - 25 = 50\` -> \`c = 20\`

This review is a placement checkpoint rather than a timed exam.
				`.trim()
			)
		]),
		createModule("AA6 Slope and Rate of Change", [
			createLesson(
				"Slope Basics",
				`
Slope measures how much \`y\` changes for each change in \`x\`. In graphing language, slope is \`rise / run\`.

**Representative results**

- Between \`(-8, 6)\` and \`(-4, -6)\`, slope = \`(-6 - 6) / (-4 - (-8)) = -12 / 4 = -3\`
- For \`6x - y = 4 + x\`, rewrite as \`y = 5x - 4\`, so the slope is \`5\`
- Parallel lines have equal slopes.
- Perpendicular lines have slopes that are negative reciprocals.

Tie every slope computation back to a real rate such as deliveries per week, height per day, or cost per month.
				`.trim()
			)
		]),
		createModule(
			"AA7 Module Project: Community Data Analysis (with Davin Lee)",
			[
				createLesson(
					"Community Data Analysis Project Brief",
					`
This project uses community data to reason about rate of change, graph trends, and make a recommendation from the evidence.

**Suggested project flow**

- Choose a community metric such as park attendance, recycling participation, tutoring visits, or library checkouts.
- Plot at least four ordered pairs on a coordinate plane.
- Compute the slope between two meaningful points.
- Compare two groups or two time periods and explain which trend is growing faster.
- Write a recommendation based on the data, not just the arithmetic.

The final explanation connects the slope calculation to what is happening in the community context.
				`.trim(),
					media.communityDataAnalysis
				)
			]
		),
		createModule("AA8 Slope-Intercept Form", [
			createLesson(
				"Reading and Writing y = mx + b",
				`
Slope-intercept form is \`y = mx + b\`, where \`m\` is the slope and \`b\` is the y-intercept.

**Representative models**

- Pea plants that sprout after \`2\` weeks and grow \`3\` inches per week: \`y = 3x - 6\`
- Delivery growth from the kick-off project: \`y = 15x\`
- If a line has slope \`5\` and goes through \`(1, 8)\`, then \`y = 5x + 3\`

The graph reading target is to identify the intercept and explain what the slope means in context.
				`.trim()
			)
		]),
		createModule("AA9 Point-Slope Form", [
			createLesson(
				"Writing Lines from a Point and a Slope",
				`
Point-slope form is \`y - y1 = m(x - x1)\`. It is especially useful when the slope and a point are given directly.

**Representative results**

- For slope \`3\` through \`(6, 8)\`: \`y - 8 = 3(x - 6)\`
- Converted to slope-intercept form: \`y = 3x - 10\`
- If slope is \`5\` and the line goes through \`(1, 8)\`, one point-slope form is \`y - 8 = 5(x - 1)\`
- Converting \`y - 8 = 5(x - 1)\` to standard form gives \`-5x + y = 3\`

Practice moving between point-slope, slope-intercept, and standard form until the three representations feel interchangeable.
				`.trim()
			)
		]),
		createModule("AA10 Graphing Inequalities", [
			createLesson(
				"Graphing Linear Inequalities",
				`
Graph the boundary line first. Then decide whether the boundary is solid or dashed, and shade the side that satisfies the inequality.

**Representative results**

- \`x + 5 > 8\` -> \`x > 3\`
- \`-x/6 < 7\` -> \`x > -42\`
- \`x^3 <= 27\` -> \`x <= 3\`
- \`sqrt(y) >= 7\` -> \`y >= 49\`
- \`2 + 5 + 1.5b >= 10\` -> \`b >= 2\`, so at least \`2\` bags of chips

The provided graph shows \`y > 2x + 5\`: shade the region above the dashed boundary line.
				`.trim(),
				media.graphingInequality
			)
		]),
		createModule(
			"AA11 Module Project: Predicting Avalanches (with Ruby Lee)",
			[
				createLesson(
					"Avalanche Prediction Project Brief",
					`
This project combines slope classification with avalanche-risk interpretation.

**Mission 1**

- Classify ski runs by steepness.
- Compare grade percentages to resort difficulty labels.
- Use the graph or table provided by the project to justify each classification.

**Mission 2**

- Compare avalanche risk after storms of different sizes.
- Decide how long slopes stay closed if the resort reopens once avalanche probability drops below \`40%\`.
- Explain why snow-slab risk can change over time.
				`.trim()
				),
				createLesson(
					"Reference Visual",
					`
Use the project graph or table to compare avalanche-risk curves. If a specific chart is unavailable, reconstruct the comparison from the given storm sizes, days, and risk percentages.

Read the visual by naming the axes first, then compare one storm curve at a time. The important evidence is not only which curve is highest, but how quickly each risk drops below the reopening threshold. A complete interpretation identifies the day range where closure is still justified, explains any curve crossing, and notes that the graph represents a model of risk rather than a guarantee of mountain safety.
				`.trim()
				),
				createLesson(
					"Reference Notes",
					`
Reference results for checking the interpretation:

- Ski-run classification prompt: all listed sites were \`Black Diamond\`.
- Between days \`2\` and \`4\`, the \`100 cm\` storm had the sharpest decline in avalanche probability.
- Average slopes listed in the answer key:
  - \`50 cm\` storm -> \`13.36\`
  - \`100 cm\` storm -> \`15\`
  - \`150 cm\` storm -> \`5.83\`
- One recommended closure window was between \`3\` and \`5\` days, because the \`50 cm\` and \`150 cm\` curves crossed below \`40%\` after about day \`4\`.
- Qualitative explanation: over time, snow packs down and becomes denser, making slabs less likely to shear off.
				`.trim()
				)
			]
		),
		createModule("Check-In #2", [
			createLesson(
				"Graphing Linear Equations: Coordinate Plane Review",
				`
Plot the points \`(2, 1)\`, \`(-3, 7)\`, \`(5, -3)\`, \`(6, 2)\`, and \`(-7, -4)\` on a labeled coordinate plane.

Use the plotted graph to review:

- quadrants
- axis labels
- positive and negative coordinates
- the difference between x-values and y-values
				`.trim(),
				media.checkIn2CoordinatePlane
			),
			createLesson(
				"Graphing Linear Equations: y = 3x - 2",
				`
Using the equation \`y = 3x - 2\`, find and plot at least five points, then draw the line.

**Related answers from the check-in**

- Slope between \`(-8, 6)\` and \`(-4, -6)\` -> \`-3\`
- \`y - 3 = (1/2)x\` and \`2y + 2x = -4 + y\` -> the lines are \`perpendicular\`
- Through \`(-78, 56)\`:
  - slope \`0\` -> \`y = 56\`
  - undefined slope -> \`x = -78\`
				`.trim(),
				media.checkIn2Line
			),
			createLesson(
				"Linear Forms",
				`
This check-in focuses on moving comfortably between slope-intercept, point-slope, and standard form.

**Selected answers**

- Pea plants sprouting at week \`2\` and growing \`3\` inches per week -> \`y = 3x - 6\`
- Matt's peas, same growth rate, \`8\` inches tall at week \`6\` -> \`y - 8 = 3(x - 6)\`
- Converted to slope-intercept form -> \`y = 3x - 10\`
- For the provided pea graph:
  - slope-intercept form -> \`y = 5x + 3\`
  - one point-slope form -> \`y - 8 = 5(x - 1)\`
  - standard form -> \`-5x + y = 3\`
				`.trim(),
				media.checkIn2PeaProduction
			),
			createLesson(
				"Graphing Inequalities",
				`
**Selected answers**

- \`-x/3 - 1 >= 5\` -> \`x <= -18\`
- \`(2/3)x < (4/3)y + 6\` -> \`y > 2x - 8\`
- Selected graphed inequality: \`y <= -x + 7\`
- Convenience-store word problem:
  - \`2 + 5 + 1.5b >= 10\`
  - minimum bags of chips: \`2\`
				`.trim(),
				media.checkIn2Inequality
			),
			createLesson(
				"Additional Practice",
				`
Use these practice results to extend the check-in:

- \`y = 2x - 1\` -> graph five points and draw the line
- Slope between \`(-6, 2)\` and \`(2, -4)\` -> \`-3/4\`
- Through \`(4, -3)\` with undefined slope -> \`x = 4\`
- Through \`(-5, 6)\` with slope \`0\` -> \`y = 6\`
- Parallel to \`y = -4x + 6\` through \`(-1, 1)\` -> \`y = -4x - 3\`
- Convert \`3x - 4y = 16\`:
  - slope-intercept form -> \`y = (3/4)x - 4\`
  - one point-slope form -> \`y + 1 = (3/4)(x - 4)\`
- Graphed inequality answer: \`y < 3x - 4\`
				`.trim()
			)
		]),
		createModule("AA12 Solving Linear Systems by Graphing", [
			createLesson(
				"Concept and Special Cases",
				`
To solve a system by graphing, find the point that lies on both graphs.

**Core example**

- \`y = 3x + 2\`
- \`y = -x + 6\`
- Intersection: \`(1, 5)\`

**Special cases**

- Parallel lines -> \`no solution\`
- The exact same line written two ways -> \`infinite solutions\`

The provided graph shows the classic intersection at \`(1, 5)\`.
				`.trim(),
				media.systemsGraphing
			),
			createLesson(
				"Representative Problem Set",
				`
Use these problems to practice reading the meaning of an intersection, not just locating a point on a graph. A solution to a system is any point that makes both equations true. When the lines cross once, the system has one solution. When the graphs are parallel, the system has no solution. When the two equations describe the same line, every point on that line works and the system has infinitely many solutions.

For graphing practice, estimate the intersection first, then substitute the coordinates back into both equations to confirm the result. For nonlinear systems, expect zero, one, or two intersections depending on how the line and curve meet.

**Selected answers**

- \`y = 4x - 3\` and \`y = -2x + 9\` -> \`(2, 5)\`
- \`y = -5x\` and \`y = x + 3\` -> \`(-1/2, 5/2)\`
- \`y - 8 = -(x + 3)\` and \`y = -x + 4\` -> \`no solution\`
- \`y = 4x + 3\` and \`y + 5 = 4(x + 2)\` -> \`infinite solutions\`
- \`y = -4/3 x + 4\` and \`y = 8x + 4\` -> \`(0, 4)\`
- \`y = x^2 + 2\` and \`y = 3\` -> \`(-1, 3)\` and \`(1, 3)\`
- \`y = x^2 - 3\` and \`y = 2x\` -> \`(-1, -2)\` and \`(3, 6)\`

**Word problems**

- Jen vs. Blake subscription plans:
  - \`y = 6x + 35\`
  - \`y = 8x + 25\`
  - equal after \`5\` months at \`$65\`
- Apples and bananas:
  - \`2a + 2b = 6\`
  - \`5a + 2b = 12\`
  - apple = \`$2\`, banana = \`$1\`
				`.trim()
			),
			createLesson(
				"Systems of Inequalities by Graphing",
				`
To solve a system of inequalities, graph every boundary and keep only the region that satisfies all inequalities at once.

**Selected prompts**

- \`y > -x + 7\` and \`y > 9x\`
- \`y <= 2x - 2\` and \`y >= 2x + 9\`
- \`y <= (1/2)x + 4\` and \`y < -4x + 1\`
- \`y > 5x\` and \`y < 3x\`
- \`y >= (3/4)x - 1\` and \`y <= (1/2)x + 3\`

**Word-problem systems**

- Bob's pet shop:
  - \`h + g <= 11\`
  - \`h >= 4\`
- Recipient 13's jobs:
  - \`6x + 9y >= 120\`
  - \`x <= 12\`
  - \`x >= 5\`
- Bennie's party food:
  - \`6x + 4y < 50\`
  - \`x >= 3\`
  - \`y >= 2\`
				`.trim()
			)
		]),
		createModule("AA13 Solving Linear Systems by Substitution", [
			createLesson(
				"Substitution Method",
				`
Rewrite one equation so a variable is isolated, substitute that expression into the other equation, then solve the remaining one-variable equation.

Substitution works best when one equation already gives \`x =\` or \`y =\`, or when a variable has coefficient \`1\` or \`-1\`. After substitution, the two-variable system becomes a one-variable equation. A normal numeric answer gives one ordered pair. A contradiction such as \`0 = 2\` means no solution. An identity such as \`0 = 0\` means the two equations represent the same line and there are infinitely many solutions.

The final step is always to substitute the solved value back into one original equation, not only into the rewritten equation, so the ordered pair is checked against the given system.

**Representative results**

- \`6x + 2y = 28\`, \`y = 4x\` -> \`(2, 8)\`
- \`y = 4x - 4\`, \`x = -y + 6\` -> \`(2, 4)\`
- \`3x - y = 2\`, \`y = 3x - 4\` -> \`no solution\`
- \`2x + 2y = 4\`, \`y = -x + 2\` -> \`infinite solutions\`
- \`3y - 2x = 4\`, \`y = -x\` -> \`(-4/5, 4/5)\`
- \`y = 7x + 6\`, \`2x - 3y = 1\` -> \`(-1, -1)\`
- \`4 - y = 5x\`, \`21x + 7y = 14\` -> \`(1, -1)\`
				`.trim()
			),
			createLesson(
				"Word Problems by Substitution",
				`
**Selected answers**

- Logan's coins:
  - \`n + q = 13\`
  - \`0.05n + 0.25q = 1.45\`
  - \`n = 9\`, \`q = 4\`
- Flour bags:
  - \`4s + 3l = 21\`
  - \`7s + 2l = 20.5\`
  - \`s = 1.5\`, \`l = 5\`
- Farm animals:
  - \`c + p = 45\`
  - \`2c + 4p = 126\`
  - \`c = 27\`, \`p = 18\`
				`.trim()
			)
		]),
		createModule("AA14 Solving Linear Systems by Elimination", [
			createLesson(
				"Elimination Method",
				`
Add or subtract equations so one variable disappears. If needed, multiply one or both equations first so the coefficients line up.

Elimination is strongest when the equations are already in standard form or when matching coefficients can be created with small multipliers. Choose the variable that is easiest to cancel, then add or subtract the equations carefully. Keep signs attached to their terms, especially when subtracting an entire equation. If both variables disappear, read the remaining statement: a true statement means infinitely many solutions, while a false statement means no solution.

After finding one variable, substitute back into either original equation to find the other value. The answer is complete only when it is written as an ordered pair and both original equations have been checked.

**Representative results**

- \`y = -2x + 3\`, \`y = 2x - 1\` -> \`(1, 1)\`
- \`0.5x - 1.5y = 12\`, \`x = 3y + 4\` -> \`no solution\`
- \`y = -x - 1\`, \`y = 7x + 8\` -> \`(-9/8, 1/8)\`
- \`4x + 3y = 8\`, \`5x - 4y = 10\` -> \`(2, 0)\`
- \`2x + 2y = 4\`, \`y = -x + 2\` -> \`infinite solutions\`
- \`6x - 5y = 3\`, \`4x + 2y = -3\` -> \`(-9/32, -15/16)\`
- \`11x - y = 5\`, \`5y + x = 3\` -> \`(1/2, 1/2)\`
				`.trim()
			),
			createLesson(
				"Word Problems by Elimination",
				`
**Selected answers**

- Potency mixture:
  - corrected system: \`x + y = 2\` and \`0.30x + 0.02y = 0.16\`
  - corrected solution: \`x = 3/7\` and \`y = 11/7\`
- Movie tickets:
  - \`c + a = 315\`
  - \`3c + 7a = 1981\`
  - \`c = 56\`, \`a = 259\`
- Number pair:
  - \`x + y = 27\`
  - \`x - y = 13\`
  - \`x = 20\`, \`y = 7\`

This module closes Algebra 1A and connects directly to the Algebra 1B sequence.
				`.trim()
			)
		]),
		createModule(
			"AA15 Module Project: Cytogenetics Quest (with Dr. Renu Bajaj)",
			[
				createLesson(
					"Cytogenetics Quest Project Brief",
					`
This project applies systems of equations to genetics-themed scenarios.

**Mission 1: Chromosomal Stability**

- Let \`L\` and \`R\` represent the number of the two chromosome labels used in the historical model.
- Total chromosomes: \`L + R = 46\`
- Stability condition: \`(2/3)L + (1/4)R = 24\`
- Solve the system.

**Mission 2: Oncology Testing**

- Participants: malignant, benign, and tumorless
- Total participants: \`500\`
- Budget: \`$4146\`
- Costs:
  - malignant = \`$10\`
  - benign = \`$7\`
  - tumorless = \`$5\`
- First solve the case where tumorless participants are fixed at \`100\`.
- Then design a different valid distribution and discuss possible bias.
				`.trim()
				),
				createLesson(
					"Answer Key",
					`
**Mission 1**

- \`L + R = 46\`
- \`(2/3)L + (1/4)R = 24\`
- Solution: \`L = 30\`, \`R = 16\`

**Mission 2 with \`TL = 100\`**

- \`M + B + TL = 500\`
- \`10M + 7B + 5TL = 4146\`
- \`TL = 100\`, \`M = 282\`, \`B = 118\`

The answer key is strongest when the numeric solution is checked in the original constraints. Mission 1 adds to \`46\` and satisfies the stability equation. Mission 2 adds all participant groups to \`500\` and recomputes the budget total. The open-ended distribution can differ, but it needs stated assumptions, the same total participant count, and an explanation of why the redesigned sample may reduce or introduce bias.
				`.trim()
				)
			]
		),
		createModule(
			"AA16 Module Project: Battle of the Publications (with Konstantin Kaganovsky)",
			[
				createLesson(
					"Battle of the Publications Project Brief",
					`
This project connects linear models and systems of equations to research output.

**Mission 1**

- Konstantin: \`p1(t) = 3t + 2\`
- Rick: \`p2(t) = 2t + 1\`
- Professor Jin: \`p3(t) = 7t + 4\`
- Build the total publication model \`P(t)\`.
- Evaluate the lab total after \`10\` years.
- Describe a competing lab model \`P'(t)\` that always stays below the current lab's output.

**Mission 2**

- The lab has \`30\` total papers.
- Konstantin and Rick have \`17\` together.
- Rick and Professor Jin have \`22\` together.
- Determine whether each researcher meets the grant quota.
				`.trim()
				),
				createLesson(
					"Answer Key",
					`
**Mission 1**

- Total function: \`P(t) = 12t + 7\`
- After \`10\` years: \`127\` publications
- Competing lab inequality: \`P'(t) < 12t + 7\`

**Mission 2**

- \`K + R + D = 30\`
- \`K + R = 17\`
- \`R + D = 22\`
- Solution: \`K = 8\`, \`R = 9\`, \`D = 13\`
- The lab qualifies because the quota check is satisfied.

Check the result by substituting the three values into every relationship, not only the total equation. The competing-lab model in Mission 1 is open ended, but it must stay below \`12t + 7\` over the intended time interval. A strong explanation distinguishes exact systems of equations from modeling choices: the quota calculation has one fixed answer, while the comparison model needs a defended inequality and a clear domain.
				`.trim()
				)
			]
		),
		createModule("AA17 Master Project: Algebra 1A", [
			createLesson(
				"Course Reflection and Presentation Reflection Prompt",
				`
The master project closes the course with a short independent explanation.

**Reflection task**

- Choose one concept from Algebra 1A that felt especially challenging or especially satisfying.
- Explain what the concept is for.
- Describe at least one real-world use.
- Design and solve at least two original problems.
- Record a short presentation that explains the explanation clearly and concisely.

	This project is a short capstone reflection rather than another worksheet.
					`.trim()
			)
		]),
		createModule("Check-In #3", [
			createLesson(
				"Graphing Review",
				`
**Selected answers**

- \`2x - y = 1\` and \`y = -x + 2\` -> \`(1, 1)\`
- \`y = 3x + 2\` and \`6x - 2y = 10\` -> \`no solution\`
- System of inequalities \`y > 2x\`, \`y < -x + 3\` -> shade the overlap region
- \`y = x^2\` and \`y = -x + 2\` -> \`(-2, 4)\` and \`(1, 1)\`
				`.trim(),
				media.checkIn3ParabolaLine
			),
			createLesson(
				"Substitution Review",
				`
**Selected answers**

- \`2y - 4 = 2x - 5\`, \`y + 4 = 2x\` -> \`(7/2, 3)\`
- \`(1/3)y - 2x = 2 - x\`, \`y - 6 = 3x\` -> \`infinite solutions\`
- Coin problem:
  - \`d + q = 19\`
  - \`0.1d + 0.25q = 2.65\`
  - \`d = 14\`, \`q = 5\`
				`.trim()
			),
			createLesson(
				"Elimination Review",
				`
**Selected answers**

- \`-3x + 4y = 9\`, \`3x - 7y = 18\` -> \`(-15, -9)\`
- \`2y - 4 = 3x - 5\`, \`y + 4 = 2x\` -> \`(7, 10)\`
- \`3x + 5 = 2y + x\`, \`6x + 7 = 4y + 2x\` -> \`no solution\`
				`.trim()
			),
			createLesson(
				"Additional Practice",
				`
Use the remaining selected answers for a compact end-of-course review. Choose a method deliberately: graphing for visual interpretation, substitution when a variable is already isolated, and elimination when terms can cancel cleanly. Check each answer in both original equations. When the result is \`no solution\` or \`infinite solutions\`, explain the line relationship instead of treating the answer like a missing ordered pair.

**Selected answers**

- \`y = 5x\` and \`y = -(1/3)x + 4\` -> \`(3/4, 15/4)\`
- \`y = x^2\` and \`y = -2x\` -> \`(0, 0)\` and \`(-2, 4)\`
- \`2y = -x + 4\`, \`(1/2)x = y\` -> \`(2, 1)\`
- \`5y = 10x - 20\`, \`2y = 6(x + 3) - y\` -> \`no solution\`
- \`y = 5x + 4\`, \`6x - 7y = 1\` -> \`(-1, -1)\`
- \`7x - y = 0\`, \`7y = 3x - 23\` -> \`(-1/2, -7/2)\`
- \`8x + 6y = 16\`, \`10x - 8y = 20\` -> \`(2, 0)\`
- \`12y = 6x - 3\`, \`4x - 8y = 2\` -> \`infinite solutions\`
- \`x - y = -1\`, \`3y = -5x + 7\` -> \`(1/2, 3/2)\`
- Sugar bags:
  - \`5s + 2l = 22\`
  - \`8s + 3l = 34\`
  - \`s = 2\`, \`l = 6\`
- Potency mixture:
  - \`x + y = 3\`
  - \`0.11x + 0.05y = 0.27\`
  - \`x = 2\`, \`y = 1\`
				`.trim()
			)
		]),
		createModule("Reference Archive: Algebra 1A", [
			createLesson(
				"Project Scenario and Context Links",
				`
**Algebra 1A Reference Map**

**Reference details:**

- Kick-off restaurant project: menu budgeting, delivery-coordinate interpretation, delivery-growth modeling, and systems of equations for kitchen scenarios.
- Delivery graph links: [delivery locations](https://www.geogebra.org/geometry/gvdvu8g9) and [weekly delivery growth](https://www.geogebra.org/geometry/nwcaepuc).
- Movie Star Status: film-production budgeting with expressions, one-step equations, unit rates, and open-ended budget justification.
- Free Swag: marketing-campaign modeling with production-cost equations, item mix comparisons, and booth-time inequalities.
- Community Data Analysis: rate-of-change interpretation from community data, including a local visual replacement at ${media.communityDataAnalysis}.
- Predicting Avalanches: slope classification, storm-risk curves, reopening thresholds, and the [slope-angle comparison graph](https://www.desmos.com/calculator/zhckru7sxb).
- Cytogenetics Quest: systems of equations in chromosome-count and oncology-testing contexts.
- Battle of the Publications: publication-count functions, competing-lab inequalities, and quota systems.
- Master project: choose one Algebra 1A concept, explain its purpose, connect it to a real use, create two self-authored problems, and present the explanation.

**Context-note links:**

- Movie Star Status context note: https://drive.google.com/file/d/1YBd552y9UR7QltUlogW00t9BRMtmb22s/view?usp=sharing
- Free Swag context note: https://drive.google.com/file/d/1gFQfsZln3pWHTImAB4AkQHI-qEVZZ6VS/view?usp=sharing
- Community Data Analysis context note: https://drive.google.com/file/d/1hLFimt1FZjRwrAqT3uIiRC3W4VKGNv70/view?usp=drive_link
- Predicting Avalanches context note: https://drive.google.com/file/d/1pmYvw-cg50bdr1ZFfYueCbK4lqlnAzEJ/view?usp=drive_link
- Cytogenetics Quest context note: https://drive.google.com/file/d/1gRJe5gYW8DupcXgAI1OqnrC5GALR-jB4/view?usp=drive_link
- Battle of the Publications context note: https://drive.google.com/file/d/1y5h6nw4yjbxRGTZKGQ3sY5nIDn4G5fnq/view?usp=drive_link

**Evidence record:**

- The course keeps the restaurant, film-budget, marketing, community-data, avalanche-risk, cytogenetics, publication, and capstone scenarios visible.
- External graph links are retained as links, not attempted image embeds.
- Static image references are represented separately as pending static media when the file is not yet available.
				`.trim()
			),
			createLesson(
				"Pending Static Assets",
				`
These static images are not currently available in the site static repository. Each filename has a reserved class-host URL so the asset can be uploaded later without changing course links.

${sourceMediaReferences()}
				`.trim()
			)
		])
	]
};

configureMathCourseFlow(algebra1ACourse, {
	courseId: "algebra-1a",
	modules: [
		{
			title: "Algebra 1A Kick-Off and Placement",
			legacyTitle: "Algebra 1A Kick-Off Projects",
			estimatedTime: "1–2 sessions · 50–65 minutes each",
			keyBlocks: [
				"placement sample",
				"equation",
				"linear graph",
				"system of equations",
				"practice goal"
			],
			flowNote:
				"Use the overview to choose one diagnostic route rather than completing four opening projects. Managing a Restaurant checks equation readiness, Delivery Map checks coordinate and slope readiness, and the weekly-delivery or Chef's Special routes challenge an already secure foundation.",
			choiceCurriculumTitles: [
				"Project 1: Managing a Restaurant",
				"Project 2A: Delivery Map"
			],
			challengeCurriculumTitles: [
				"Project 2B: Weekly Deliveries and Competition",
				"Project 3: Chef's Special"
			]
		},
		{
			title: "AA1 Algebraic Properties",
			estimatedTime: "1–2 sessions · 50–65 minutes each",
			keyBlocks: [
				"equality",
				"balance",
				"inverse operation",
				"substitution check",
				"equivalent statement"
			],
			flowNote:
				"Treat an equation as a balance, record the same operation on both sides, and verify each result by substitution. Guess-and-check is a bridge to formal solving, not the final method."
		},
		{
			title: "AA2 Solving Single-Step Linear Equations",
			estimatedTime: "2 sessions · 50–65 minutes each",
			keyBlocks: [
				"addition / subtraction",
				"multiplication / division",
				"exponent / root",
				"isolate the variable",
				"substitution check"
			],
			flowNote:
				"Name the operation attached to the variable, apply its inverse to both sides, and substitute the result into the original equation. Keep context units attached to the final answer."
		},
		{
			title: "AA3 Module Project: Movie Star Status (with Maddie Van Beek)",
			estimatedTime: "2 sessions · 50–65 minutes each",
			keyBlocks: [
				"variable definition",
				"budget equation",
				"unit rate",
				"one-step equation",
				"decision evidence"
			],
			flowNote:
				"Build one film-budget model from named variables and units, solve it with the AA1–AA2 process, and defend one budget decision. Open the answer checks only after preserving the independent attempt.",
			choiceCurriculumTitles: ["Answer Key and Open-Ended Checks"]
		},
		{
			title: "AA4 Solving Multi-Step Linear Equations",
			estimatedTime: "3 sessions · 50–65 minutes each",
			keyBlocks: [
				"distribute",
				"combine like terms",
				"variables on both sides",
				"inequality reversal",
				"solution classification"
			],
			flowNote:
				"Simplify each side before moving terms, record why an inequality sign reverses, and distinguish one solution, no solution, and infinitely many solutions from the resulting statement."
		},
		{
			title: "AA5 Module Project: Free Swag! (with Amisha Sisodiya)",
			estimatedTime: "2 sessions · 50–65 minutes each",
			keyBlocks: [
				"cost equation",
				"product mix",
				"inequality",
				"whole-number constraint",
				"written justification"
			],
			flowNote:
				"Define each product count before writing the cost equation, test that the mix satisfies the budget, and use an inequality to connect production rate with event time. Use the guidance only after recording the first model.",
			choiceCurriculumTitles: ["Open-Ended Guidance"]
		},
		{
			title: "Check-In #1",
			estimatedTime: "1 session · 50–65 minutes",
			keyBlocks: [
				"balanced equation",
				"single-step equation",
				"multi-step equation",
				"inequality",
				"word-model check"
			],
			flowNote:
				"Complete the mixed equation and inequality sample without notes, correct one error by naming the broken equivalence step, and revisit only the smallest unstable equation family before beginning linear graphs."
		},
		{
			title: "AA6 Slope and Rate of Change",
			estimatedTime: "2 sessions · 50–65 minutes each",
			keyBlocks: [
				"rise / run",
				"ordered pair",
				"rate of change",
				"parallel slope",
				"perpendicular slope"
			],
			flowNote:
				"Calculate slope from two points, interpret its sign and units in context, and distinguish equal slopes from negative reciprocals before writing line equations."
		},
		{
			title: "AA7 Module Project: Community Data Analysis (with Davin Lee)",
			estimatedTime: "2 sessions · 50–65 minutes each",
			keyBlocks: [
				"ordered-pair dataset",
				"coordinate graph",
				"slope calculation",
				"trend comparison",
				"evidence-based recommendation"
			],
			flowNote:
				"Plot one transparent classroom or fictional dataset, calculate and interpret a meaningful slope, compare two trends, and keep the final recommendation within what the selected data supports."
		},
		{
			title: "AA8 Slope-Intercept Form",
			estimatedTime: "2 sessions · 50–65 minutes each",
			keyBlocks: [
				"y = mx + b",
				"slope",
				"y-intercept",
				"table / graph / equation",
				"context interpretation"
			],
			flowNote:
				"Move among table, graph, equation, and context while keeping slope and initial value distinct. Verify the model against at least two points."
		},
		{
			title: "AA9 Point-Slope Form",
			estimatedTime: "2 sessions · 50–65 minutes each",
			keyBlocks: [
				"point-slope form",
				"given point",
				"given slope",
				"equivalent linear forms",
				"substitution check"
			],
			flowNote:
				"Build point-slope form directly from one point and one slope, then convert it to slope-intercept and standard form. Substitute the original point to verify every representation."
		},
		{
			title: "AA10 Graphing Inequalities",
			estimatedTime: "2 sessions · 50–65 minutes each",
			keyBlocks: [
				"boundary line",
				"solid / dashed",
				"test point",
				"shaded region",
				"context constraint"
			],
			flowNote:
				"Graph the boundary first, decide whether equality includes it, test one point, and shade only the satisfying region. Translate the final region back into the context constraint."
		},
		{
			title: "AA11 Module Project: Predicting Avalanches (with Ruby Lee)",
			estimatedTime: "2 sessions · 50–65 minutes each",
			keyBlocks: [
				"slope classification",
				"risk curve",
				"inequality threshold",
				"model limitation",
				"evidence-based decision"
			],
			flowNote:
				"Read axes and units before comparing modeled risk curves, use the stated threshold to justify a closure interval, and label the result as a classroom model rather than a real-world safety forecast. Reference notes are for post-attempt checking.",
			choiceCurriculumTitles: ["Reference Notes"]
		},
		{
			title: "Check-In #2",
			estimatedTime: "1–2 sessions · 50–65 minutes each",
			keyBlocks: [
				"coordinate plane",
				"slope",
				"linear form",
				"inequality graph",
				"representation check"
			],
			flowNote:
				"Complete one coordinate, slope, line-form, and inequality task without notes. Explain the same line in two representations, correct one graphing error, and use Additional Practice only for the diagnosed gap.",
			choiceCurriculumTitles: ["Additional Practice"]
		},
		{
			title: "AA12 Solving Linear Systems by Graphing",
			estimatedTime: "3 sessions · 50–65 minutes each",
			keyBlocks: [
				"intersection",
				"one / none / infinite solutions",
				"graphing system",
				"system of inequalities",
				"substitution check"
			],
			flowNote:
				"Predict the number of solutions from line relationships, graph both constraints, and verify every intersection in the original equations. For inequalities, interpret the overlap as the feasible region."
		},
		{
			title: "AA13 Solving Linear Systems by Substitution",
			estimatedTime: "2 sessions · 50–65 minutes each",
			keyBlocks: [
				"isolate a variable",
				"substitute expression",
				"solve one variable",
				"ordered pair",
				"system check"
			],
			flowNote:
				"Choose substitution when one variable is already isolated or inexpensive to isolate, preserve parentheses around the substituted expression, and check the ordered pair in both original equations."
		},
		{
			title: "AA14 Solving Linear Systems by Elimination",
			estimatedTime: "2 sessions · 50–65 minutes each",
			keyBlocks: [
				"align equations",
				"opposite coefficients",
				"add / subtract equations",
				"ordered pair",
				"method selection"
			],
			flowNote:
				"Choose the variable with the simplest cancellation path, multiply whole equations when needed, and track signs carefully. Compare graphing, substitution, and elimination before selecting a method."
		},
		{
			title: "AA15 Module Project: Cytogenetics Quest (with Dr. Renu Bajaj)",
			estimatedTime: "2 sessions · 50–65 minutes each",
			keyBlocks: [
				"define variables",
				"system from constraints",
				"substitution / elimination",
				"constraint check",
				"model assumption"
			],
			flowNote:
				"Treat every biological detail as a simplified classroom scenario, translate only the stated numerical constraints, and check the solved values in every original equation before comparing assumptions. The answer key is post-attempt support.",
			choiceCurriculumTitles: ["Answer Key"]
		},
		{
			title: "AA16 Module Project: Battle of the Publications (with Konstantin Kaganovsky)",
			estimatedTime: "2 sessions · 50–65 minutes each",
			keyBlocks: [
				"linear function",
				"combined model",
				"system of equations",
				"inequality comparison",
				"domain / limitation"
			],
			flowNote:
				"Build and combine the publication models, solve the relationship system, and distinguish the fixed algebraic solution from the open-ended comparison model. Open the answer key after preserving calculations and assumptions.",
			choiceCurriculumTitles: ["Answer Key"]
		},
		{
			title: "Check-In #3",
			estimatedTime: "1–2 sessions · 50–65 minutes each",
			keyBlocks: [
				"graphing method",
				"substitution method",
				"elimination method",
				"special solution case",
				"method defense"
			],
			flowNote:
				"Solve one system by each method, explain one no-solution or infinite-solution case, and defend the most efficient method for a changed system. Additional Practice follows only if a named method remains unreliable.",
			choiceCurriculumTitles: ["Additional Practice"]
		},
		{
			title: "AA17 Master Project: Algebra 1A",
			estimatedTime: "2–3 sessions · 50–65 minutes each",
			keyBlocks: [
				"independent concept",
				"real-world model",
				"two original problems",
				"multiple representations",
				"Algebra 1B handoff"
			],
			flowNote:
				"Begin only after the systems checkpoint. Build a concise portfolio artifact with one Algebra 1A concept, a real use, two original solved problems, and at least two representations; finish by naming the evidence that supports readiness for Algebra 1B."
		}
	],
	appendixTitles: ["Reference Archive: Algebra 1A"]
});
