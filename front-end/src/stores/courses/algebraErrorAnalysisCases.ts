import type { RawCourse } from "./types";
import {
	courseAssetViewerUrl,
	slugMarkdownHeading
} from "@/modules/courseAssetPreview";

export const algebraErrorAnalysisCases = [
	{
		course: "algebra-1a",
		module: "Algebra 1A Kick-Off and Placement",
		heading: "Delivery Grid Distances",
		given: "A delivery starts at (0,0). Drop-offs are A=(-3,5) and B=(4,6), in city blocks. Movement follows horizontal and vertical streets. Compare the shortest grid distances to the two drop-offs, then find the slope of the direct line from A to B.",
		flawed: "Distance to A is abs(-3+5)=2 blocks and distance to B is abs(4+6)=10 blocks. Therefore A needs only 2 blocks of travel.",
		questions: [
			"Identify the first incorrect distance expression and explain how opposite coordinate signs affected it.",
			"Calculate both grid distances by counting horizontal and vertical movement separately. State which destination is closer and by how many blocks.",
			"Calculate the direct A-to-B line's slope. Explain why that ratio answers a different question from the driver's travel distance."
		]
	},
	{
		course: "algebra-1a",
		module: "AA1 Algebraic Properties",
		heading: "Balancing Both Sides",
		given: "Solve 3x+4=19 over the real numbers. Each line of a solution must preserve exactly the same solutions as the original equation, and the final value must make the original left and right sides equal.",
		flawed: "Subtract 4 from the left side to get 3x=19. Divide by 3 to get x=19/3. The variable is isolated, so the solution is finished.",
		questions: [
			"Mark the first invalid equality and name the balancing operation that was only partly applied.",
			"Repair the solution, recording the same operation on both sides at every step.",
			"Substitute both the proposed value 19/3 and the corrected value into the original equation. Use those results to explain why an isolated variable alone does not establish a correct solution."
		]
	},
	{
		course: "algebra-1a",
		module: "AA4 Solving Multi-Step Linear Equations",
		heading: "Distributing Whole Products",
		given: "Solve 7(x-8)=3(x-4). The parentheses represent whole quantities multiplied by 7 and 3, respectively. Keep all coefficients and signs visible before collecting variable terms.",
		flawed: "Expand to 7x-8=3x-4. Subtract 3x and add 8 to obtain 4x=4, so x=1.",
		questions: [
			"Identify the first incorrect expansion and explain which products are missing.",
			"Expand both sides correctly, solve the repaired linear equation, and show the intermediate equation before dividing by the variable's coefficient.",
			"Evaluate both original sides at x=1 and at the corrected solution. Explain why correct operations after an invalid expansion cannot repair the earlier change to the equation."
		]
	},
	{
		course: "algebra-1a",
		module: "AA5 Module Project: Free Swag! (with Amisha Sisodiya)",
		heading: "Budget and Booth Hours",
		given: "A classroom campaign has a $1,000 budget. One swag item costs $4 per piece and another costs $5. Let x and y be their whole-number quantities. Fix x=100 and spend the full budget. A booth can distribute at most 6 items per hour and must book a whole number of hours sufficient for all produced pieces.",
		flawed: "Use 4(x+y)=1000, so x+y=250. With x=100, choose y=150. There are 250 pieces and the budget is fully used.",
		questions: [
			"Explain which price assumption in the proposed cost equation is incorrect.",
			"Write the correct budget equation and solve for y when x=100. Compare the true cost of the flawed mix with the budget.",
			"Find the repaired total item count and the minimum whole-hour booth booking. Verify that one fewer hour has insufficient capacity."
		]
	},
	{
		course: "algebra-1a",
		module: "AA7 Module Project: Community Data Analysis (with Davin Lee)",
		heading: "Comparing Community Trends",
		given: "Use fictional monthly library-visit records. Library A has (month,visits) pairs (1,6),(2,8),(3,10),(4,12). Library B has (1,7),(2,8),(3,9),(4,10). Plot all eight points and compare the average rates of change from month 1 to month 4.",
		flawed: "For A, slope=(4-1)/(12-6)=1/2 visit per month. For B, slope=(10-7)/(4-1)=1 visit per month. Therefore B's visits grow faster.",
		questions: [
			"Identify the coordinate-order error and the units of the ratio actually computed for A.",
			"Calculate both rates in visits per month. Write a linear rule matching each library's four records and verify two points in each rule.",
			"Compare the corrected growth rates and predict month 5 under those rules. State the continuation assumption and explain why these fictional records do not establish a cause of the difference."
		]
	},
	{
		course: "algebra-1a",
		module: "AA14 Solving Linear Systems by Elimination",
		heading: "Scaling Entire Equations",
		given: "Solve the system 4x+3y=8 and 5x-4y=10 by elimination. Use multipliers 4 and 3 to create opposite y-coefficients, then check the final ordered pair in both original equations.",
		flawed: "Multiplying gives 16x+12y=8 and 15x-12y=10. Adding gives 31x=18, so x=18/31.",
		questions: [
			"Mark the first invalid equality and explain how multiplying an equation affects its constant term.",
			"Write both correctly scaled equations and add them. Recover y from one original equation after finding x.",
			"Substitute the repaired ordered pair into both originals. Explain why cancellation of the y-terms alone does not validate an elimination calculation."
		]
	},
	{
		course: "algebra-1a",
		module: "Check-In #3",
		heading: "Recovering Intersection Coordinates",
		given: "Find every intersection of y=x^2 and y=-x+2 over the real numbers. Solving for an input identifies possible x-coordinates; each intersection also needs the corresponding y-coordinate satisfying both original rules.",
		flawed: "Set x^2=-x+2, giving x^2+x-2=(x+2)(x-1)=0. The roots are -2 and 1, so the intersections are (-2,-2) and (1,1).",
		questions: [
			"Distinguish the correct factorization from the incorrect ordered-pair conclusion. Identify the first unsupported use of a solved input as an output.",
			"Recover the correct y-value for each root and check each ordered pair in both original equations.",
			"Sketch or tabulate points around the two intersections. Explain why both intersections remain necessary even though one of the originally listed pairs was correct."
		]
	},
	{
		course: "algebra-1b",
		module: "AB5 Solving Quadratics by Factoring",
		heading: "Retaining Every Factored Root",
		given: "Solve x^2-5x-6=0 over all real numbers. There is no physical restriction excluding negative values. A complete solution must retain every value that makes the original polynomial zero.",
		flawed: "Factor to (x-6)(x+1)=0. Divide both sides by x+1 to get x-6=0. Thus x=6 is the only solution.",
		questions: [
			"Identify the division restriction introduced by the proposed step and explain which possible root it removes.",
			"Use the zero-product property without that division to obtain every root.",
			"Verify each root in the original polynomial. Explain why a negative root remains valid here and when a separate contextual restriction could instead exclude it."
		]
	},
	{
		course: "algebra-1b",
		module: "AB18 Direct and Inverse Variation",
		heading: "Choosing the Variation Invariant",
		given: "The quantities x and y vary inversely, with x=6 when y=5 and x!=0. Find x when y=3, then predict y when x=12. The same inverse-variation constant applies to all three pairs.",
		flawed: "The constant is k=y/x=5/6, so y=(5/6)x. At y=3, x=18/5. This preserves the ratio and therefore solves the inverse-variation problem.",
		questions: [
			"Explain which type of variation preserves y/x and identify the invariant actually required here.",
			"Find the correct constant and equation, then calculate the two requested values.",
			"Check the products for the original and corrected pairs. Test the flawed pair x=18/5,y=3 against the required product, and explain what happens to y when x doubles."
		]
	},
	{
		course: "algebra-1b",
		module: "AB22 Master Project: Algebra 1B",
		heading: "Checking Both Inverse Directions",
		given: "A portfolio claims that f(x)=x^2 on all real inputs has inverse g(x)=sqrt(x), whose real domain is x>=0. An inverse must recover every allowed original input as well as every allowed original output.",
		flawed: "The check f(g(9))=(sqrt(9))^2=9 succeeds. Therefore g is the inverse of f on all real numbers; no additional domain condition is needed.",
		questions: [
			"Test the other composition g(f(-3)) and identify the claim that this counterexample disproves.",
			"Restrict f to a domain on which sqrt(x) is its inverse. State the domains and ranges of both functions under that repair.",
			"Verify both compositions using the stated restrictions. Explain how the reflected input-output pairs on the two graphs support the domain choice and why one numerical check alone was insufficient."
		]
	}
] as const;

export function applyAlgebraErrorAnalysisCases(id: string, course: RawCourse) {
	if (id !== "algebra-1a" && id !== "algebra-1b") return;
	for (const entry of algebraErrorAnalysisCases) {
		if (entry.course !== id) continue;
		const module = course.modules.find(
			module => module.title === entry.module
		);
		const matches = module?.supplementalProjects.filter(item =>
			item.title.includes("Modeling or Error Analysis")
		);
		if (!matches || matches.length !== 1) {
			throw new Error(
				`Missing unique error-analysis task in ${entry.module}`
			);
		}
		const check = courseAssetViewerUrl(
			`/course-assets/algebra-1/practice-checks-v1.md#${slugMarkdownHeading(
				entry.heading
			)}`,
			`${entry.heading} self-check`,
			id
		);
		matches[0].content = `**Goal:** Repair the supplied solution and verify the result.\n\n${entry.given}\n\n**Flawed solution**\n\n${entry.flawed}\n\n**Steps:**\n\n${entry.questions
			.map((question, index) => `${index + 1}. ${question}`)
			.join("\n")}\n\n[Project self-check](${check})`;
		matches[0].contentKind = "assignment";
		matches[0].preserveInstructions = true;
	}
}
