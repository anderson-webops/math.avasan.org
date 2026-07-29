import type {
	CourseItemLearningPath,
	RawCourse,
	RawCourseModule
} from "./types";

interface SourceLibraryCourseSpec {
	focus: string;
	name: string;
	modules: string[];
	moduleMetadata?: Record<string, SourceLibraryModuleMetadata>;
	splitSourceActivityAnchors?: boolean;
	sourceActivityAnchors?: Record<string, SourceActivityAnchor[]>;
}

interface SourceActivityAnchor {
	aliases?: string[];
	id?: string;
	learningPath?: CourseItemLearningPath;
	projectLink?: string;
	title: string;
	prompt: string;
	evidence: string[];
}

interface SourceLibraryModuleMetadata {
	conceptLearningPath?: CourseItemLearningPath;
	estimatedTime: string;
	flowNote: string;
	keyBlocks: string[];
}

// Math-only extraction of the four elementary curricula used by math.avasan.org.

type MathSupportSection = "planning" | "verification";

function supportVariantIndex(
	courseFamily: string,
	moduleTitle: string,
	section: MathSupportSection
) {
	const seed = `${courseFamily}|${moduleTitle}|${section}`;
	let hash = 0;

	for (const character of seed) {
		hash = (hash * 31 + character.charCodeAt(0)) >>> 0;
	}

	return hash % 3;
}

function buildMathSupportSectionGuidance(
	courseFamily: string,
	moduleTitle: string,
	section: MathSupportSection
) {
	const title = moduleTitle.replace(/: Implementation Lab$/, "");
	const variant = supportVariantIndex(courseFamily, moduleTitle, section);

	if (section === "planning") {
		const opener = [
			`**${title}** starts with a short map of the idea, evidence, and final product.`,
			`**${title}** is divided into checkpoints that can be reviewed before the full response is complete.`,
			`**${title}** begins with the key evidence and the first complete example.`
		][variant];

		return [
			opener,
			`The **${title}** plan names the known quantities, needed representation, operation or relationship, units or labels, and answer check.`,
			`The work sequence for **${title}** produces a worked example with visible steps, labels, and a reasonableness check before adding depth.`,
			`A complete plan separates required evidence from optional extension. It identifies the first useful example, the evidence source, the expected product, and the point where the work can pause with a readable record.`,
			`Each checkpoint answers three questions: what claim or result is being made, what evidence supports it, and what revision or comparison would make it stronger.`
		].join("\n\n");
	}

	const opener = [
		`**${title}** ends with a concrete evidence review.`,
		`**${title}** compares the expected result with the evidence in the finished work.`,
		`**${title}** is reviewed through evidence, not only whether the final answer looks plausible.`
	][variant];
	const evidenceReview = [
		`The verification note for **${title}** names the expected result, observed result, evidence source, and interpretation. The evidence type fits the work: diagram, equation, table, graph, estimation check, inverse-operation check, or substitution check.`,
		`A useful **${title}** check separates expectation, observation, and interpretation. The conclusion points to diagram, equation, table, graph, estimation check, inverse-operation check, or substitution check that supports it.`,
		`The **${title}** evidence record makes the review reproducible: expected result, actual result, source of evidence, and which representation, calculation, or check supports the answer.`
	][variant];
	const mismatchReview = [
		`When the **${title}** result differs from the expectation, classify the mismatch first: arithmetic slip, missing label, wrong representation, invalid assumption, or answer that fails a reasonableness check. The classification determines the next revision.`,
		`If the **${title}** evidence does not match the target, identify the mismatch before revising the work: arithmetic slip, missing label, wrong representation, invalid assumption, or answer that fails a reasonableness check.`,
		`A mismatch in **${title}** produces a diagnosis before another revision: what failed, why it likely failed, and which smaller evidence check can confirm the next change.`
	][variant];

	return [
		opener,
		`Expected and observed results in **${title}** are compared for given quantities, labels, diagrams, equations, representation choices, calculation checks, and reasonableness evidence.`,
		`The **${title}** record includes the main result, one meaningful contrast case, one revision decision, and one limitation that would guide a later revision.`,
		evidenceReview,
		mismatchReview
	].join("\n\n");
}

function compactTopic(title: string) {
	return title
		.replace(/^[A-Z]{2,}\s*\d+[A-Z]?\s*/i, "")
		.replace(/^[A-Z]{2,}\d+[A-Z]?\s*/i, "")
		.replace(/^Check-in\s+#?(\d+)/i, "Check-In $1")
		.replace(/^Module Project:\s*/i, "")
		.replace(/\s+\(with [^)]+\)/gi, "")
		.replace(/\s{2,}/g, " ")
		.trim();
}

function topicKeywords(topic: string) {
	const stopWords = new Set([
		"a",
		"an",
		"and",
		"for",
		"in",
		"my",
		"of",
		"on",
		"part",
		"the",
		"to",
		"with",
		"your"
	]);
	const words = topic
		.replace(/[#:&/(),]/g, " ")
		.split(/\s+/)
		.map(word => word.trim())
		.filter(word => word.length > 2 && !stopWords.has(word.toLowerCase()));

	return [...new Set(words)].slice(0, 5);
}

const mathDomainFrame = {
	artifact:
		"worked math record with diagrams, equations, labels, and a reasonableness check",
	checks: [
		"Each number has a label or unit when context matters.",
		"The representation matches the operation or relationship being used.",
		"The final answer is checked with estimation, substitution, inverse operation, or a second representation."
	],
	process:
		"Translate the situation into a diagram, equation, table, or model before calculating. Keep intermediate steps visible so an arithmetic mistake can be found without restarting the whole problem.",
	transfer:
		"Change one number, unit, shape, graph feature, or condition and compare which parts of the solution method stay the same."
} as const;

function conceptContent(spec: SourceLibraryCourseSpec, moduleTitle: string) {
	const topic = compactTopic(moduleTitle);
	const keywords = topicKeywords(topic);
	const frame = mathDomainFrame;

	return `
**Concept path:** ${topic} is the central focus for this part of ${spec.name}. It connects to ${spec.focus}. The module record is a ${frame.artifact}, not just a completed answer.

Core topics in this module:

1. **Vocabulary and model**  
   Define the important terms in plain language, connect them to a simple example, and include one non-example so the boundary of the idea is clear.${keywords.length ? ` Key terms to watch include ${keywords.join(", ")}.` : ""}

2. **Worked example**  
   Break a typical problem, passage, speech outline, business case, or number scenario into smaller pieces. The record includes the known information, the decision point, and the evidence that supports the answer.

3. **Transfer task**  
   Change one detail from the worked example. The comparison makes the transferable rule visible instead of treating the first example as a script to copy.

4. **Evidence check**
   ${frame.process}

**Evidence checklist:**

${frame.checks.map(check => `- ${check}`).join("\n")}
	`.trim();
}

function practiceContent(spec: SourceLibraryCourseSpec, moduleTitle: string) {
	const topic = compactTopic(moduleTitle);
	const frame = mathDomainFrame;
	const planning = buildMathSupportSectionGuidance(
		spec.name,
		topic,
		"planning"
	);

	return [
		`**Goal:** Create a short ${spec.name} practice record for ${topic} with one typical case and one changed case.`,
		`**Setup:** Name the goal, the starting information, and the form of evidence needed. The expected product is a ${frame.artifact}.`,
		[
			"**Process:**",
			"1. Record the givens, constraints, audience, source text, numbers, or starting state.",
			"2. Build the first solution or draft with visible intermediate reasoning.",
			"3. Run a second case with one changed detail and compare the result.",
			"4. Write a short explanation of which rule, model, or evidence controlled the final answer."
		].join("\n"),
		[
			"**Completion evidence:**",
			...frame.checks.map(check => `- ${check}`)
		].join("\n"),
		planning
	].join("\n\n");
}

function extensionContent(spec: SourceLibraryCourseSpec, moduleTitle: string) {
	const topic = compactTopic(moduleTitle);
	const frame = mathDomainFrame;
	const verification = buildMathSupportSectionGuidance(
		spec.name,
		topic,
		"verification"
	);

	return [
		`**Goal:** Extend ${topic} in ${spec.name} by changing one constraint, audience, number set, passage detail, scenario, or design choice.`,
		`**Transfer move:** ${frame.transfer}`,
		[
			"**Extension choices:**",
			"1. Add a more difficult input, passage detail, model constraint, or audience requirement.",
			"2. Compare two solution methods, drafts, explanations, or recommendations and name the better fit for the goal.",
			"3. Turn the final answer into a short presentation, annotated example, table, diagram, or revision note.",
			"4. Add one reflection explaining what evidence would make the result more reliable."
		].join("\n"),
		"The extension keeps the original idea recognizable while testing whether the method still works under a new condition. The response includes the changed condition, the expected effect, the actual result, and one revision that would make the explanation or product stronger.",
		verification
	].join("\n\n");
}

function createSourceActivityAnchorItems(
	spec: SourceLibraryCourseSpec,
	moduleTitle: string
) {
	const anchors = spec.sourceActivityAnchors?.[moduleTitle];
	if (!anchors?.length) return [];

	const topic = compactTopic(moduleTitle);
	if (spec.splitSourceActivityAnchors) {
		return anchors
			.filter(anchor => (anchor.learningPath ?? "core") === "core")
			.map(anchor => ({
				...(anchor.id ? { id: anchor.id } : {}),
				...(anchor.aliases?.length ? { aliases: anchor.aliases } : {}),
				title: anchor.title,
				content: [
					`**Project goal:** ${anchor.prompt}`,
					"**Completion evidence:**",
					...anchor.evidence.map(item => `- ${item}`)
				].join("\n"),
				learningPath: "core" as const,
				...(anchor.projectLink
					? { projectLink: anchor.projectLink }
					: {})
			}));
	}

	return [
		{
			title: `Source Activity Anchors: ${topic}`,
			content: [
				"The original source course used the concrete activity anchors below. This neutral version keeps the scenario structure, decision practice, and evidence requirements while removing platform-specific submission steps.",
				...anchors.map((anchor, index) =>
					[
						`${index + 1}. **${anchor.title}**`,
						anchor.prompt,
						"Evidence record:",
						...anchor.evidence.map(item => `- ${item}`)
					].join("\n")
				)
			].join("\n\n")
		}
	];
}

function createSourceActivityPracticeItems(
	spec: SourceLibraryCourseSpec,
	moduleTitle: string
) {
	if (!spec.splitSourceActivityAnchors) return [];

	return (spec.sourceActivityAnchors?.[moduleTitle] ?? [])
		.filter(anchor => (anchor.learningPath ?? "core") !== "core")
		.map(anchor => ({
			...(anchor.id ? { id: anchor.id } : {}),
			...(anchor.aliases?.length ? { aliases: anchor.aliases } : {}),
			title: anchor.title,
			content: [
				`**Project goal:** ${anchor.prompt}`,
				"**Completion evidence:**",
				...anchor.evidence.map(item => `- ${item}`)
			].join("\n"),
			learningPath: anchor.learningPath ?? ("choice" as const),
			...(anchor.projectLink ? { projectLink: anchor.projectLink } : {})
		}));
}

function createSourceLibraryModule(
	spec: SourceLibraryCourseSpec,
	moduleTitle: string
): RawCourseModule {
	const topic = compactTopic(moduleTitle);
	const metadata = spec.moduleMetadata?.[moduleTitle];
	const splitAnchors = Boolean(spec.splitSourceActivityAnchors);

	return {
		title: moduleTitle,
		...(metadata?.estimatedTime
			? { estimatedTime: metadata.estimatedTime }
			: {}),
		...(metadata?.keyBlocks?.length
			? { keyBlocks: [...metadata.keyBlocks] }
			: {}),
		curriculum: [
			{
				title: `Concepts: ${topic}`,
				content: [
					conceptContent(spec, moduleTitle),
					metadata?.flowNote
						? `**Course flow:** ${metadata.flowNote}`
						: ""
				]
					.filter(Boolean)
					.join("\n\n"),
				...(splitAnchors
					? {
							learningPath:
								metadata?.conceptLearningPath ??
								("core" as const)
						}
					: {})
			},
			...createSourceActivityAnchorItems(spec, moduleTitle)
		],
		supplementalProjects: [
			...createSourceActivityPracticeItems(spec, moduleTitle),
			{
				title: `Practice Map: ${topic}`,
				content: practiceContent(spec, moduleTitle),
				...(splitAnchors ? { learningPath: "choice" as const } : {})
			},
			{
				title: `Extension Review: ${topic}`,
				content: extensionContent(spec, moduleTitle),
				...(splitAnchors ? { learningPath: "challenge" as const } : {})
			}
		]
	};
}

function createSourceLibraryCourse(spec: SourceLibraryCourseSpec): RawCourse {
	return {
		name: spec.name,
		modules: spec.modules.map(moduleTitle =>
			createSourceLibraryModule(spec, moduleTitle)
		)
	};
}

const earlyElementaryAMathSourceAnchors: Record<
	string,
	SourceActivityAnchor[]
> = {
	"EEA1 Addition and Subtraction within 20": [
		{
			title: "Ladybug Number Bond Cases",
			prompt: "Use the ladybug-box scenario to make different combinations that total 15. Move one ladybug between boxes, then create an equal-share case with one ladybug left in the net.",
			evidence: [
				"Drawing, frame, or table showing two addends that total 15.",
				"Updated equation after one ladybug moves from one box to the other.",
				"Equal-share equation with the leftover ladybug represented clearly."
			]
		}
	],
	"EEA2 Addition and Subtraction within 100": [
		{
			title: "Starfish Tank Regrouping",
			prompt: "Use the starfish-tank scenario with 22 starfish in one tank and 16 in another. Group by tens, move leftovers into smaller tanks, then compare one tank against the combined amount in the other tanks.",
			evidence: [
				"Total starfish count from the starting tanks.",
				"Regrouped representation separating tens and leftover ones.",
				"Subtraction comparison after two starfish move back into Tank A."
			]
		}
	],
	"EEA3 Representing Word Problems": [
		{
			title: "Birthday Candy Bag Model",
			prompt: "Model two birthday candy bags with fruity and chocolate candies, then update the model after sharing candy and receiving a late birthday bag.",
			evidence: [
				"Separate counts for fruity candy and chocolate candy in the first two bags.",
				"Updated drawing or equation after sharing 2 fruity candies and 4 chocolate candies.",
				"Final total after adding the late birthday bag with 10 candies and 2 fruity pieces."
			]
		}
	],
	"EEA4 Module Project: Escape the Game": [
		{
			title: "Escape the Game Character Budget",
			prompt: "Design a video-game character with a 100-point budget. Choose hair, suit, and extra features from the original point table, then calculate points used and points left.",
			evidence: [
				"Character name and selected specs from each category.",
				"Addition equation for total points used.",
				"Subtraction equation for points remaining from the 100-point budget."
			]
		},
		{
			title: "Liang Escape Route Grid",
			prompt: "Plan a grid route from the bottom-left corner to the top-right corner. The route uses at least 20 right jumps, 15 left jumps, 30 up jumps, and 5 down jumps.",
			evidence: [
				"Route sketch or coordinate-step list from start to exit.",
				"Jump totals for right, left, up, and down directions.",
				"Total jump count with evidence that every movement rule was met."
			]
		}
	],
	"EEA5 Measuring and Estimating Length in Standard Units": [
		{
			title: "Indiana Jones Length Expedition",
			prompt: "Use the jungle-expedition scenario to compare inches, feet, yards, centimeters, and meters. Place the fruit, bug, tree, and gem along a one-yard path and answer distance questions.",
			evidence: [
				"Path model showing 36 inches as one yard.",
				"Object lengths marked in inches, centimeters, or meters with comparisons.",
				"Report answering distance in feet and comparing one foot with one yard."
			]
		}
	],
	"EEA6 Relating Addition and Subtraction to Length": [
		{
			title: "Yarn Quilt Length Equations",
			prompt: "Use the mini-quilt yarn scenario to add 11-inch, 12-inch, 15-inch, and 7-inch pieces, then subtract 20 inches to find the last piece length.",
			evidence: [
				"Number-line or ruler model for each yarn segment.",
				"Addition equations for total yarn before the final piece.",
				"Subtraction equation for the final piece and a check of the 68-to-81-inch measurement error."
			]
		}
	],
	"EEA7 Module Project: The Longest Sandwich in California": [
		{
			title: "Akshay Sandwich Number Line",
			prompt: "Plan a 96-meter sandwich by choosing ingredients, measuring each ingredient, ordering lengths from smallest to largest, and placing the sandwich on a 0-to-96-meter number line.",
			evidence: [
				"Ingredient list with lengths and units.",
				"Ordered list from smallest ingredient length to largest ingredient length.",
				"Number line from 0 meters to 96 meters showing the sandwich plan."
			]
		},
		{
			title: "Sandwich Sharing Record",
			prompt: "Track the record-setting sandwich after donation and party sharing. Account for Monday donation, Tuesday eating totals, and Wednesday split of the remaining sandwich.",
			evidence: [
				"Equation for sandwich length left after Monday's donation.",
				"Tuesday total eaten from the five people in the scenario and length remaining.",
				"Wednesday equal split calculation for the final remaining sandwich."
			]
		}
	],
	"EEA8 Understanding Place Value": [
		{
			title: "Penguin Place Value Grouping",
			prompt: "Use the penguin counting scenario to estimate first, then group penguins by tens and hundreds. Write totals in expanded form and reason about how many tens make 1,000.",
			evidence: [
				"Estimate and exact count comparison.",
				"Groups of ten, groups of ten tens, and leftovers recorded separately.",
				"Expanded form for 216 and a written pattern for reaching 1,000."
			]
		}
	],
	"EEA9 Adding and Subtracting within 200": [
		{
			title: "Bookshelf Regrouping Record",
			prompt: "Use the classroom-bookshelf scenario to estimate book totals, regroup books by tens, reorganize reading books, and add 23 history books from storage.",
			evidence: [
				"Estimate and exact total for the starting shelves.",
				"Regrouped equation after extras move to the extra-books shelf.",
				"Updated equation after adding 23 history books and one rewritten equivalent expression."
			]
		}
	],
	"EEA10 Representing Advanced Word Problems": [
		{
			title: "Arcade Ticket Goal Tracker",
			prompt: "Track arcade tickets through the prize goal, lunch purchases, a 30-ticket gift, and five final games. Decide whether the 200-ticket mega prize is reachable.",
			evidence: [
				"Ticket total before lunch and tickets still needed for the first goal.",
				"Lunch item choices with ticket cost and remaining tickets.",
				"Final ticket total after the five games and conclusion about the 200-ticket prize."
			]
		}
	],
	"EEA11 Adding and Subtracting within 1000": [
		{
			title: "Millionaire Base-Ten Challenge",
			prompt: "Use the Who Wants To Be A Millionaire-style question set to solve addition and subtraction within 1,000 with base-ten blocks or equivalent place-value records.",
			evidence: [
				"Problem setup separating hundreds, tens, and ones.",
				"Work record showing regrouping or decomposition when needed.",
				"Final answer checked against the place-value representation."
			]
		}
	],
	"EEA12 Strategies to Add and Subtract within 1000": [
		{
			title: "Skee-Ball Team Score Ledger",
			prompt: "Use the five-round skee-ball scenario to track points gained and lost from outer-ring holes, inner-ring holes, bullseyes, misses, and balls outside the play area. Keep the running score visible after each round so additions, penalties, trades, and the final record comparison can be checked without recalculating the entire game.",
			evidence: [
				"Round-by-round score ledger with gains and penalties.",
				"Base-ten or expanded-form representation of the running score after at least two rounds.",
				"Final comparison with the 870-point record, including the exact number of points over or under the record."
			]
		}
	],
	"EEA13 Module Project: Going TikTok Famous": [
		{
			title: "TikTok Creator Follower Analysis",
			prompt: "Use Melody's creator table to order the top five TikTok creators, total their follower counts, and calculate how many followers each creator needs to reach one billion.",
			evidence: [
				"Creators ordered from most followers to fewest followers.",
				"Combined follower total for the top five creators.",
				"Difference from one billion followers for each creator."
			]
		},
		{
			title: "Melody Test Launch Data",
			prompt: "Design a video idea for Melody's test launch, then track new followers gained from Monday through Thursday and add them to the starting 673 followers.",
			evidence: [
				"Video idea with one reason it could attract viewers or followers.",
				"New-follower total from 37, 93, 334, and 158.",
				"Final follower count after adding the new followers to 673."
			]
		}
	],
	"Check-in #1": [
		{
			title: "Addition, Length, and Place Value Check",
			prompt: "Use the check-in problems to demonstrate sums and differences, length-unit addition and subtraction, place value comparison, expanded form, and operations within 1,000.",
			evidence: [
				"Backpacking, circle, rope, and ball-distance problems solved with diagrams or equations.",
				"Place value comparisons using greater-than, less-than, or equal signs.",
				"Addition and subtraction within 1,000 with the strategy named."
			]
		}
	],
	"EEA14 Working with Equal Groups": [
		{
			title: "Kickball Equal Groups",
			prompt: "Use the kickball roster scenario to divide players into equal teams, update the roster when three more players arrive, and connect five groups of four points to repeated addition.",
			evidence: [
				"Roster count before and after the three late arrivals.",
				"Team split showing whether the teams are equal at each stage.",
				"Repeated-addition equation for five players each scoring four points."
			]
		}
	],
	"EEA15 Partitioning Rectangles": [
		{
			title: "Board Game Rectangle Partitions",
			prompt: "Design a rectangular board game by partitioning a rectangle into rows and columns of equal-sized squares. Count the spaces and decide whether good and bad spaces can be split evenly.",
			evidence: [
				"Rectangle partitioned into equal rows and columns.",
				"Addition or array count for total squares.",
				"Good-space and bad-space count with an explanation of equal or unequal splitting."
			]
		}
	],
	"EEA16 Time": [
		{
			title: "Deserted Island Time Record",
			prompt: "Use the deserted-island scenario to distinguish a.m. and p.m., analog and digital clocks, half past, quarter until, elapsed time, and a 40-minute delay.",
			evidence: [
				"Examples of a.m. and p.m. based on time-of-day clues.",
				"Analog and digital clock readings for 8:30 and quarter until 10.",
				"Elapsed-time calculation from 7:30 a.m. to rescue time plus the 40-minute delay."
			]
		}
	],
	"EEA17 Money": [
		{
			title: "Grocery Coin Exchange",
			prompt: "Use the grocery-store scenario to represent item prices with dollars and coins, add up to four selected items, and exchange leftover coins for fewer coins or bills.",
			evidence: [
				"Coin combinations for selected grocery item prices.",
				"Total cost for up to four chosen items.",
				"Coin-exchange record for 3 quarters, 7 dimes, 10 nickels, and 20 pennies."
			]
		}
	],
	"EEA18 Visualizing Data": [
		{
			title: "Kitchen Utensil Data Display",
			prompt: "Collect kitchen utensil counts for spoons, knives, and forks, choose a visual display, then update the display after adding 3 forks, 2 spoons, and 4 knives.",
			evidence: [
				"Original utensil counts by category.",
				"Graph, table, or picture display showing all utensil categories.",
				"Updated counts and comparison of largest and smallest categories after the new set."
			]
		}
	],
	"EEA19 Polygons and Circles": [
		{
			title: "Bakery Dessert Shape Fractions",
			prompt: "Use the bakery dessert scenario to describe dessert shapes, then divide pies and ice cream cakes into two, three, and four equal parts for different party groups.",
			evidence: [
				"Shape observations naming sides, curves, corners, or equal parts.",
				"Partition drawings or descriptions for halves, thirds, and fourths.",
				"Explanation of how the parts stay equal for each dessert."
			]
		}
	],
	"EEA20 Module Project: The Next Hit iPhone": [
		{
			title: "Devyn iPhone Data Charts",
			prompt: "Use Devyn's iPhone table to create charts for initial price, battery life, and customer satisfaction. Use the displays to recommend price and battery-life choices for a future iPhone.",
			evidence: [
				"Chart or table for initial price by model.",
				"Chart or table for battery life and satisfaction by model.",
				"Recommendation for a future price and battery-life target with data evidence."
			]
		},
		{
			title: "Launch Party Array Cuts",
			prompt: "Use the launch-party dessert scenario to split square trays into exactly 15 brownies for the product team and 20 cake slices for the engineering team.",
			evidence: [
				"Array or partition plan for 15 equal brownie pieces.",
				"Array or partition plan for 20 equal cake pieces.",
				"Explanation connecting rows and columns to multiplication or repeated addition."
			]
		}
	],
	"Check-in #2": [
		{
			title: "Multiplication, Measurement, Data, and Shape Check",
			prompt: "Use the second check-in to demonstrate even and odd reasoning, arrays, equal groups, length, money, data displays, time, shapes, fractions, and final subtraction.",
			evidence: [
				"Even or odd, equal-sum, array, and rectangle-area responses with reasoning.",
				"Length, money, and picture-graph responses with labels and units.",
				"Time, shape, equal-parts, and 500-pound switch problems solved with visible work."
			]
		}
	]
};

const earlyElementaryBMathSourceAnchors: Record<
	string,
	SourceActivityAnchor[]
> = {
	"EEB1 Adding and Subtracting within 1000": [
		{
			title: "Millionaire Block Strategy Review",
			prompt: "Use the Who Wants To Be A Millionaire-style number-pieces activity to represent 119 and 232, then solve 119 + 232 and 232 - 119 with place-value blocks or expanded form.",
			evidence: [
				"Block or expanded-form representation for 119 and 232.",
				"Addition work for 119 + 232 with regrouping named when it occurs.",
				"Subtraction work for 232 - 119 with borrowing or decomposition visible."
			]
		}
	],
	"EEB2 Strategies to Add and Subtract within 1000": [
		{
			title: "Skee-Ball Record Challenge",
			prompt: "Track the five-round skee-ball score where outer rings are 1 point, inner rings are 10 points, bullseyes are 100 points, missed holes lose 10 points, and balls outside the play area lose 100 points.",
			evidence: [
				"Running score after each round, including gains and penalties.",
				"Place-value or number-block trade record that simplifies the score when possible.",
				"Final comparison against the 870-point record with exact difference."
			]
		}
	],
	"EEB3 Multiplying and Dividing within 100": [
		{
			title: "Recycling Game Show Score Sheet",
			prompt: "Use the recycling game show to compare box collections across rounds. Represent small, medium, and large boxes as different point values, write multiplication equations, and use division to recover a missing box count.",
			evidence: [
				"Round 1 score for 4 boxes and 5 boxes when each box is worth 2 points.",
				"Comparison between 7 small boxes plus 1 medium box and 1 large box plus 5 small boxes.",
				"Equation explaining how many 6-point boxes make a 42-point score."
			]
		}
	],
	"EEB4 Properties of Multiplication and Division": [
		{
			title: "Twenty-Seven Character Array Properties",
			prompt: "Arrange 27 characters in rows and columns, then rearrange the same total to show commutativity. Add a related group to model the distributive property, then use 15 characters in groups of 5 to connect division and multiplication.",
			evidence: [
				"Two arrays for 27 with matching multiplication equations.",
				"Three-factor expression and grouping comparison for associativity.",
				"Distributive expression and inverse division/multiplication pair for 15 and 5."
			]
		}
	],
	"EEB5 Multiplication and Division Word Problems": [
		{
			title: "Cookout Equal Groups and Missing Amounts",
			prompt: "Plan a cookout main dish for about 20 people, place two pieces of food on each plate, update the table after half the plates are gone, then solve dessert and goody-bag missing-quantity problems.",
			evidence: [
				"Box, plate, or array model showing enough food for 20 people.",
				"Repeated-addition equation for the pieces of food left after half the plates are gone.",
				"Missing-value work for ice cream sandwiches and 100 goody-bag items."
			]
		}
	],
	"EEB6 Applying the Four Operations": [
		{
			title: "Board Game Expression Tracker",
			prompt: "Use the four-operations board game to record each dice roll and space effect as one expression. Apply multiplication and division before addition and subtraction, handle whole-number division limits, and compare parentheses placements.",
			evidence: [
				"Turn-by-turn expression record tied to spaces moved on the board.",
				"At least one evaluated expression showing operation order.",
				"Parentheses comparison showing whether the score changes when grouping changes."
			]
		}
	],
	"EEB7 Multiples of 10": [
		{
			title: "Multiples of Ten Block Comparison",
			prompt: "Choose a number from 1 to 9, multiply it by single-digit factors, then compare each representation with the related factor that has a zero added. Repeat with x2, x4, and x6 to describe groups of ten.",
			evidence: [
				"Top-row number-block models for the original single-digit multiplications.",
				"Bottom-row models for the related multiples of 10.",
				"Pattern statement explaining how adding a zero changes the place-value representation."
			]
		}
	],
	"EEB8 Module Project: Using Science For Good": [
		{
			title: "Fritz Four-Week Dosage Budget",
			prompt: "Use Fritz's Duchenne Muscular Dystrophy medicine table to calculate Vitamin D, Iron, CoQ10, and steroid amounts for a four-week trip. Include pill counts, steroid milligrams from kilograms of body weight, and total estimated cost.",
			evidence: [
				"Four-week quantity calculation for each medicine.",
				"Steroid dosage using 16 kilograms and 1 milligram per kilogram.",
				"Cost total using the per-pill and per-milligram prices."
			]
		},
		{
			title: "Fritz Updated Dosage Plan",
			prompt: "Use the updated medicine table to determine how long a 96-pill Iron bottle lasts at 3 pills every 3 days, then calculate six weeks of steroids using Fritz's new 23-kilogram weight and the revised ratio.",
			evidence: [
				"Days covered by the 96-pill Iron bottle.",
				"Steroid milligrams needed per day from 1 milligram per 2 kilograms.",
				"Six-week steroid total for the new 23-kilogram weight."
			]
		}
	],
	"Check-in #1": [
		{
			title: "Operations and Multiplication Check",
			prompt: "Use the first check-in to demonstrate addition and subtraction within 1,000, multiplication and division within 100, multiplication properties, word-problem representation, four-operation expressions, and multiples of 10.",
			evidence: [
				"Place-value addition and subtraction work with regrouping when needed.",
				"Multiplication, division, and missing-value problems represented by equations or arrays.",
				"Operation-order, property, and multiples-of-10 explanations with labeled work."
			]
		}
	],
	"EEB9 Units of Measurement": [
		{
			title: "Storm Cleanup Measurement Plan",
			prompt: "Use the storm-cleanup scenario to reason about time, liters, cups, grams, kilograms, and container choice. Track the leak from 7:30 a.m. to 8:15 a.m., compare 1 liter with 4 cups, and estimate weights for paper, textbooks, and pizza.",
			evidence: [
				"Timeline for leak checks, bottle filling, and textbook distribution.",
				"Unit comparison between liters and cups, plus grams and kilograms.",
				"Measurement choices justified for paper weights, textbook stacks, and pizza weight."
			]
		}
	],
	"EEB10 Area": [
		{
			title: "House Decoration Square-Unit Designs",
			prompt: "Choose four square or rectangular house decorations, model each with square units under 100, then estimate the area of a non-rectangular gift by decomposing or enclosing it with square units.",
			evidence: [
				"Four decoration names with square-unit area models.",
				"Multiplication equation for each rectangular area.",
				"Non-rectangular estimate that combines multiplication and addition."
			]
		}
	],
	"EEB11 Module Project: Investing for the Future": [
		{
			title: "Pear Investment Allocation",
			prompt: "Use Mar Hershenson's Pear investment scenario to distribute $87 million among Xampla, Bear Flag Robotics, and Nextmind. Compare equal allocation with a reasoned recommendation for which company has the strongest growth case.",
			evidence: [
				"Equal funding amount for three companies from $87 million.",
				"Selected company and evidence-based reason for the recommendation.",
				"Clear distinction between equal allocation and preferred investment choice."
			]
		},
		{
			title: "Bear Flag Factory Area Budget",
			prompt: "Use the Bear Flag Robotics factory blueprint to calculate total square-yard area, then multiply by $10 per square yard to estimate the factory cost.",
			evidence: [
				"Factory area split into rectangles or counted square-yard sections.",
				"Total area in square yards.",
				"Factory cost calculation at $10 per square yard."
			]
		}
	],
	"EEB12 Partitioning Shapes": [
		{
			title: "Mars Fraction Expedition",
			prompt: "Use the Mars mission path to partition the planet into fourths, collect a hexagon rock, shade two tenths of a rectangular liquid sample, and describe oxygen-tank levels as fractions.",
			evidence: [
				"Planet partition showing one fourth, later explored portions, and the last section.",
				"Hexagon, rectangle, and octagon samples partitioned into equal pieces.",
				"Fraction statements for rock piece, liquid sample, plant half, and oxygen level."
			]
		}
	],
	"EEB13 Fractions as Numbers": [
		{
			title: "Foot-Long Sandwich Number Lines",
			prompt: "Draw two foot-long sandwiches with number lines from 0 to 1 foot. Cut the sandwiches into different fractions, split each part again, then compare how much of each sandwich is eaten.",
			evidence: [
				"Two number lines with halves, thirds, or fourths marked correctly.",
				"Updated tick marks after each part is cut in half.",
				"Fractions eaten and remaining after 4 pieces from each sandwich are eaten."
			]
		}
	],
	"EEB14 Represent and Interpret Data": [
		{
			title: "Zoo Anniversary Scaled Graphs",
			prompt: "Use the zoo anniversary scenario to organize two animal types across three event sections. Create scaled picture graphs for 20, 5, 15 and 16, 8, 12, then combine totals in a bar graph.",
			evidence: [
				"Section labels and scaled picture graph for the first animal.",
				"Second scaled picture graph using a different scale or sticker value.",
				"Combined bar graph identifying the highest and lowest section totals."
			]
		},
		{
			title: "Zoo Straw Measurement Line Plot",
			prompt: "Represent collected straw pieces on a measurement line: 1 inch, 1 and a half inches, 1 and 3 quarters inches, half an inch, and 2 and one quarter inches. Decide how many pieces are at least 1 and a half inches.",
			evidence: [
				"Line plot or number-line record with every straw length represented.",
				"Counts for each fractional inch length.",
				"Total number of straws kept at 1 and a half inches or longer."
			]
		}
	],
	"EEB15 Perimeter": [
		{
			title: "Camping Perimeter Layout",
			prompt: "Use the camping-trip setup to design two rectangular camp spaces with the same area and different side lengths, calculate LED light-strip perimeter for each, then add an equal-side triangular campfire barrier.",
			evidence: [
				"Two labeled rectangles with equal area and different dimensions.",
				"Perimeter calculation for each rectangular camp space.",
				"Triangular barrier dimensions and total distance around the campfire."
			]
		}
	],
	"EEB16 Quadrilaterals": [
		{
			title: "Four-Sided Object Scavenger Hunt",
			prompt: "Use a scavenger-hunt record to compare at least three four-sided objects. Identify rectangles, squares, rhombuses, trapezoids, parallel sides, shared attributes, and unique attributes.",
			evidence: [
				"Drawings or descriptions of at least three four-sided objects.",
				"Similarity and difference notes for side lengths, angles, and parallel sides.",
				"Labels for rectangle, square, rhombus, trapezoid, or other quadrilateral categories."
			]
		}
	],
	"EEB17 Module Project: 2001: A Warehouse Odyssey": [
		{
			title: "Amazon Warehouse Restock Survey",
			prompt: "Use Akshit Mehta's warehouse survey to decide which Amazon Fresh, Books, Electronics, Home & Kitchen, and Pet Supplies warehouses are below half capacity and need restocking.",
			evidence: [
				"Half-capacity comparison for each warehouse.",
				"List of warehouses that need restocking.",
				"Priority recommendation with a fraction or capacity reason."
			]
		},
		{
			title: "Warehouse Robot Area Proposal",
			prompt: "Choose between Standard Rover, Grab-a-Tron, and R.A.Z.E for warehouse use. Calculate robot area from rectangular dimensions and connect the chosen model's movement, load, or magnetic constraints to the recommendation.",
			evidence: [
				"Area calculation for the selected robot model.",
				"Reason for choosing the robot based on warehouse needs.",
				"Customization idea that improves the robot's warehouse usefulness."
			]
		}
	],
	"Check-in #2": [
		{
			title: "Measurement, Fraction, Data, and Geometry Check",
			prompt: "Use the second check-in to demonstrate measurement units, area, fractions, data displays, perimeter, quadrilateral attributes, and multi-step project reasoning.",
			evidence: [
				"Unit, area, and fraction responses with labels and diagrams.",
				"Data display or interpretation response using a scale or measurement line.",
				"Perimeter and quadrilateral responses naming side, angle, and parallel-side evidence."
			]
		}
	]
};

const lateElementaryAMathSourceAnchors: Record<string, SourceActivityAnchor[]> =
	{
		"LEA1 Place Value": [
			{
				title: "Prize Money Place-Value Exchange",
				prompt: "Use the competition prize bag with 236 one-dollar bills, 57 ten-dollar bills, and 3 hundred-dollar bills to calculate the total value, then trade the money into the smallest number of hundreds, tens, and ones possible.",
				evidence: [
					"Expanded-form or place-value record for 236 ones, 57 tens, and 3 hundreds.",
					"Total prize value written in standard form.",
					"Exchange record comparing the original bag with the simplified hundreds, tens, and ones."
				]
			}
		],
		"LEA2 Comparing and Rounding": [
			{
				title: "Party Food Rounding and Store Distance",
				prompt: "Use the party-food scenario to compare exact and rounded costs, then compare store distances of 3,218 feet and 3,253 feet to decide which option is closer and whether the price difference matters.",
				evidence: [
					"Rounded estimate for the $14.82 food purchase and comparison with about $15.",
					"Comparison of 3,218 feet and 3,253 feet using place value.",
					"Decision statement that uses both distance and cost evidence."
				]
			}
		],
		"LEA3 Addition and Subtraction": [
			{
				title: "Millionaire Addition and Subtraction Review",
				prompt: "Use the Who Wants To Be A Millionaire number-pieces review to model multi-digit addition and subtraction with hundreds, tens, and ones before writing the standard algorithm.",
				evidence: [
					"Place-value model for each addend or minuend.",
					"Addition or subtraction work showing regrouping when needed.",
					"Check step that connects the number-pieces model to the written algorithm."
				]
			}
		],
		"LEA4 Module Project: Soccer Season": [
			{
				title: "Soccer Season Team Skill Draft",
				prompt: "Use Chandan Lodha's 5v5 soccer draft to choose five players, add offensive and defensive skill points, round totals to the nearest ten, and compare teams with >, <, or =.",
				evidence: [
					"Selected five-player roster with offensive and defensive totals.",
					"Rounded team totals to the nearest ten.",
					"Comparison against another roster or Chandan's team using inequality symbols."
				]
			},
			{
				title: "Soccer Season Synergy Adjustment",
				prompt: "Use the synergy table with Oliver, Zai, Malik, Jessica, Mary, Stephany, Greg, Edgar, Samantha, and Cadence to trade players, change positions, and explain how the total score changes.",
				evidence: [
					"Original team score before any trade or position change.",
					"Updated score after applying at least one synergy adjustment.",
					"Explanation of whether the new roster is stronger, weaker, or tied."
				]
			}
		],
		"LEA5 Factors and Multiples": [
			{
				title: "Character Factor Arrangement",
				prompt: "Arrange 8, 18, and 25 characters into equal rows and columns, then use the arrangements to list factors, identify multiples, and compare factor patterns for 2, 3, 13, 50, and 90.",
				evidence: [
					"Array or rectangle arrangements for 8, 18, and 25.",
					"Factor lists for 50 and 90 with shared factors identified.",
					"Pattern statement about prime, composite, factor, or multiple relationships."
				]
			}
		],
		"LEA6 Multiplication by One-Digit Numbers": [
			{
				title: "Halloween Candy One-Digit Multiplication",
				prompt: "Use the Halloween candy scenario with six friends, Snickers, and groups of hundreds, tens, and ones to model one-digit multiplication and decide whether a 1,000-candy estimate is reasonable.",
				evidence: [
					"Multiplication model for six friends and 3 Snickers each.",
					"Comparison with a friend who has 3 times as many or 21 pieces.",
					"Place-value multiplication record and reasonableness check for 1,000 candies."
				]
			}
		],
		"LEA7 Multiplication by Two-Digit Numbers": [
			{
				title: "Birthday Treat Two-Digit Multiplication",
				prompt: "Use the birthday treat-bag scenario with 11 favorite foods and 25 classmates to compare 25 x 10 with 25 x 11, then calculate the total number of treats needed.",
				evidence: [
					"Partial-product or area model for 25 x 10.",
					"Updated calculation for 25 x 11.",
					"Sentence explaining how the extra group changes the total."
				]
			}
		],
		"LEA8 Division by One-Digit Numbers": [
			{
				title: "Farm Egg Carton Division",
				prompt: "Use the farm egg scenario to pack 40 eggs into cartons of 4, 6, and 8, then pack 122 eggs into a chosen carton size and interpret any remainder.",
				evidence: [
					"Division work for 40 eggs with 4-, 6-, and 8-egg cartons.",
					"Explanation of full cartons and leftover eggs.",
					"122-egg plan with quotient, remainder, and carton-size decision."
				]
			}
		],
		"LEA9 Module Project: Invest-a-thon": [
			{
				title: "Arielle Investment Stage Split",
				prompt: "Use Arielle Zuckerberg's Invest-a-thon scenario to split $5,134,533 evenly among Seed, Series A, and Series B companies, then decide how to handle any money left over.",
				evidence: [
					"Division calculation for three investment stages.",
					"Remainder or leftover-money statement.",
					"Stage allocation table with equal amounts clearly labeled."
				]
			},
			{
				title: "Arielle Company Portfolio Choice",
				prompt: "Choose companies such as Xampla, Bear Flag Robotics, Nextmind, Playco, CookUnity, Air Protein, Spoon, Literati, or SkyDrive, then justify the Seed, Series A, and Series B portfolio choices with arithmetic and written reasoning.",
				evidence: [
					"Selected companies grouped by funding stage.",
					"Funding amount per company in each selected stage.",
					"Reasoning that connects company choice, stage, and available budget."
				]
			},
			{
				title: "Arielle Reinvestment Growth Plan",
				prompt: "Model the 10-year prediction where Seed doubles, Series A grows 7 times, and Series B grows 19 times. Then quadruple the Series B investment and reallocate it so the Seed total is double the Series A total.",
				evidence: [
					"Growth expression for Seed, Series A, and Series B.",
					"Quadrupled Series B total.",
					"Reinvestment split that makes Seed funding double Series A funding."
				]
			}
		],
		"Check-in #1": [
			{
				title: "Multiplication and Operations Check",
				prompt: "Use the first check-in to demonstrate place value, comparison, rounding, addition, subtraction, factors, multiples, one-digit multiplication, two-digit multiplication, division, and project-based multi-step arithmetic.",
				evidence: [
					"Place-value, rounding, and comparison problems solved with labels.",
					"Addition, subtraction, multiplication, and division work with visible regrouping or remainders.",
					"Factor, multiple, and project-style reasoning written in complete math statements."
				]
			}
		],
		"LEA10 Lines": [
			{
				title: "Lines, Segments, and Rays Sort",
				prompt: "Use the GeoGebra-style drawing task to create and label a line, a line segment, and a ray, then compare what continues forever and what has endpoints.",
				evidence: [
					"One labeled line with arrows in both directions.",
					"One labeled line segment with two endpoints.",
					"One labeled ray with one endpoint and one continuing direction."
				]
			}
		],
		"LEA11 Angles": [
			{
				title: "Compass Turn Angle Route",
				prompt: "Use the hiking compass route to track north, south, east, west, right turns, left turns, 90-degree turns, 45-degree turns, 180-degree turns, and 270-degree turns.",
				evidence: [
					"Route diagram or ordered list of compass directions.",
					"Angle labels for each turn in degrees.",
					"Final direction after the full route is traced."
				]
			}
		],
		"LEA12 Triangles": [
			{
				title: "Triangle Attribute Sort",
				prompt: "Sort triangle cards into three groups twice: once by side lengths and once by angle type. Use the same triangles for both sorts so the comparison shows that one shape can be classified in multiple valid ways depending on the attribute being examined.",
				evidence: [
					"Triangle groups based on side lengths.",
					"Triangle groups based on angles.",
					"Comparison explaining how the same triangle can belong to different categories.",
					"One example triangle described with both a side-length category and an angle category."
				]
			}
		],
		"LEA13 Module Project: An Obtuse Life": [
			{
				title: "Obtuse Life Shape Photo Collection",
				prompt: "Use Bill Lee's gallery-photo scenario to identify rectangles, squares, diamonds, a star, a circle, one line of symmetry, an obtuse angle, a right triangle, no lines of symmetry, and a parallelogram.",
				evidence: [
					"Shape collection or sketch with each required geometry feature labeled.",
					"Symmetry notes for examples with one line, no lines, or multiple lines.",
					"Angle and triangle labels that distinguish right and obtuse examples."
				]
			},
			{
				title: "Gallery Light Angle Setup",
				prompt: "Use the art-gallery lighting setup to place a light perpendicular to the ceiling, then rotate it left until it is 23 degrees from the ceiling and describe the new angle relationship.",
				evidence: [
					"Diagram of the original perpendicular light position.",
					"Rotation record showing the 23-degree adjustment.",
					"Explanation of how the angle changed from a right angle."
				]
			}
		],
		"LEA14 Polygons and Perimeter": [
			{
				title: "Puppy Pen Perimeter and Symmetry",
				prompt: "Design a puppy pen with 4 to 8 equal sides where each side is 3 feet long, calculate the fencing needed, then design a puppy bed with line symmetry.",
				evidence: [
					"Chosen polygon with side count and side length labeled.",
					"Perimeter calculation for the full pen.",
					"Puppy-bed design with at least one line of symmetry marked."
				]
			}
		],
		"LEA15 Quadrilaterals": [
			{
				title: "Quadrilateral Attribute Sort",
				prompt: "Sort quadrilaterals by two pairs of parallel sides, four equal sides, four right angles, and rectangles with four equal sides, then explain which categories can overlap.",
				evidence: [
					"Sorted quadrilateral groups with category labels.",
					"At least one example that fits more than one category.",
					"Explanation using side lengths, right angles, and parallel sides."
				]
			}
		],
		"LEA16 Area and Volume": [
			{
				title: "Backyard Pool Area and Volume",
				prompt: "Use the backyard pool scenario with a rectangular pool perimeter of 30 feet. Choose length, width, and depth, then calculate tile area for the sides and bottom and water volume in cubic feet.",
				evidence: [
					"Length and width pair that gives a 30-foot perimeter.",
					"Tile-area calculation for the bottom and side faces.",
					"Volume calculation using length, width, and depth."
				]
			}
		],
		"LEA17 Module Project: The LA River Master Plan": [
			{
				title: "LA River Elevated Park Plan",
				prompt: "Use Dana McKinney's L.A. River master-plan scenario to design an elevated park, split amenities into rectangles, calculate each amenity area, find remaining area, and calculate the park perimeter.",
				evidence: [
					"Park diagram with rectangular amenities labeled.",
					"Area calculation for each amenity and total used area.",
					"Remaining area and perimeter calculation for the park."
				]
			},
			{
				title: "LA River Pool and Hot Tub Volume Plan",
				prompt: "Use the pool volume data where width is 260 feet, depth is 4 feet, and volume is 7,280 cubic feet to solve for length. Then design a hot tub with one-fifth the capacity and width 91 feet.",
				evidence: [
					"Pool-length calculation from 7,280 cubic feet, 260 feet, and 4 feet.",
					"Hot-tub volume as one-fifth of the pool capacity.",
					"Possible hot-tub length and depth pair using the 91-foot width."
				]
			}
		],
		"Check-in #2": [
			{
				title: "Geometry and Measurement Check",
				prompt: "Use the second check-in to demonstrate lines, rays, segments, angles, triangles, polygons, perimeter, quadrilaterals, area, volume, and multi-step geometry reasoning.",
				evidence: [
					"Line, angle, triangle, and polygon responses with labels.",
					"Perimeter, area, and volume calculations with units.",
					"Quadrilateral and project-style reasoning that names the relevant geometric attributes."
				]
			}
		]
	};

const lateElementaryBMathSourceAnchors: Record<string, SourceActivityAnchor[]> =
	{
		"LEB1 Equivalent Fractions": [
			{
				title: "Hot Dog Contest Equivalent Fractions",
				prompt: "Use the hot dog eating contest with 5 contestants and 20 hot dogs per plate to compare one half, 10 hot dogs, ten twentieths, two fourths, and three sixths. Represent each amount visually, then add three more equivalent fractions for the same amount.",
				evidence: [
					"Visual model showing 20 hot dogs for each contestant.",
					"Comparison explaining that the listed amounts are equivalent.",
					"Three additional equivalent fractions for one half of 20."
				]
			}
		],
		"LEB2 Comparing and Ordering Fractions": [
			{
				title: "Chore Ribbon Fraction Ordering",
				prompt: "Use the chore ribbon scenario to compare 3/4 meter with 1/4 meter, then order 7/8 meter, 2/3 meter, and 4/5 meter from shortest to longest so each chore assignment is justified by fraction size.",
				evidence: [
					"Comparison of 3/4 meter and 1/4 meter with a diagram or common denominator.",
					"Ordered list for 7/8, 2/3, and 4/5.",
					"Chore assignment explanation tied to shortest, middle, and longest ribbon."
				]
			}
		],
		"LEB3 Adding and Subtracting Fractions": [
			{
				title: "Relay Race Fraction Progress",
				prompt: "Use the relay race track to add completed race fractions after the first runner, an extra 1/8 of the race, a replacement runner, and a third runner who completes 3/16 before stopping.",
				evidence: [
					"Race diagram shaded after each runner's completed distance.",
					"Fraction addition and subtraction work with common denominators.",
					"Final equivalent fractions that represent the whole completed race."
				]
			}
		],
		"LEB4 Multiplying Fractions": [
			{
				title: "Fraction of a Fraction Models",
				prompt: "Draw food or area models for one half of one half, one third of one third, two thirds of one fourth, and 2/5 x 1/2. Use the models to explain why the word 'of' connects to multiplication.",
				evidence: [
					"Area or food model for each fraction-of-a-fraction case.",
					"Multiplication expression matched to each visual model.",
					"Pattern statement connecting 'of' to multiplying numerators and denominators."
				]
			}
		],
		"LEB5 Dividing Fractions": [
			{
				title: "Pie Box Fraction Division",
				prompt: "Use the six-flavor pie-box scenario to determine what fraction of a pie fits in one full box, one half box, and two thirds of a box. Record each case as a division or multiplication expression.",
				evidence: [
					"Drawing of one pie box with six different pie slices.",
					"Expression for one full box, half a box, and two thirds of a box.",
					"Pattern statement explaining how the box fraction changes the amount of pie."
				]
			}
		],
		"LEB6 Module Project: Saving the Environment One Cake at a Time": [
			{
				title: "Angela Tesla Footprint Report",
				prompt: "Use Angela Kwok's Carbon Lighthouse report for Tesla to compare 175,000 tons of carbon emissions with 130,000 tons and $9 million in costs with a $3 million savings. Reduce each fraction and place the current-year values on number lines.",
				evidence: [
					"Reduced fraction for current carbon emissions compared with last year.",
					"Reduced fraction for current operating cost compared with last year.",
					"Two number lines showing the current-year carbon and cost positions relative to 1."
				]
			},
			{
				title: "Carbon Lighthouse Chiffon Cake Ratios",
				prompt: "Use the Carbon Lighthouse celebration cake recipe with 36 cups of flour. Calculate baking powder, eggs, sugar, vegetable oil, milk, special ingredient, and salt from the listed ratios, then identify the selected flavor add-in.",
				evidence: [
					"Ingredient table scaled from 36 cups of flour.",
					"Special ingredient amount for the chosen chocolate, vanilla, strawberry, matcha, cardamom, or lemon flavor.",
					"Ratio calculation for at least three ingredients shown step by step."
				]
			}
		],
		"LEB7 Place Value with Decimals": [
			{
				title: "Phone Savings Decimal Exchange",
				prompt: "Use the phone savings scenario with 9,450 pennies and 4,561 dimes to trade coins into dollar amounts, add the total, and decide whether the amount is enough for a phone.",
				evidence: [
					"Pennies converted to dollars and cents.",
					"Dimes converted to dollars and cents.",
					"Total savings amount with a phone-purchase decision."
				]
			}
		],
		"LEB8 Comparing and Rounding Decimals": [
			{
				title: "Race Time Decimal Ranking",
				prompt: "Use the runner times 1.21, 1.28, 1.3, and 1.264 seconds to rank the runners from fastest to slowest, round each time to one decimal place, and propose two possible third-place times.",
				evidence: [
					"Fastest-to-slowest order using decimal place value.",
					"Rounded newspaper results with one digit after the decimal.",
					"Two possible times that fit a third-place finish."
				]
			}
		],
		"LEB9 Decimal Operations": [
			{
				title: "Birthday Salsa Decimal Budget",
				prompt: "Use the salsa shopping list to calculate tomato, onion, lime, jalapeno, the $10.97 register total before tax, $0.83 tax, total cost, and change from a 20-dollar bill. Keep each decimal operation aligned to the relevant units and prices.",
				evidence: [
					"Tomato, onion, lime, and jalapeno cost calculations.",
					"Decision about whether 0.35 kilograms of jalapenos were purchased.",
					"Final total after $0.83 tax and change from $20."
				]
			}
		],
		"LEB10 Module Project: From Facebook to YouTube": [
			{
				title: "Rahul YouTube Views Table",
				prompt: "Use Rahul Pandey's YouTube table to order the five videos by views, calculate total top-video views, identify which videos are below the 20,000-view monetization threshold, and compare the top-five total with about 178,000 channel views.",
				evidence: [
					"Ordered video list from most views to least views.",
					"Additional views needed for each video under 20,000 views.",
					"Fraction comparing top-five views with total channel views."
				]
			},
			{
				title: "Facebook Sharing Growth Goal",
				prompt: "Use the Facebook sharing plan where Rahul starts at 178.603k channel views and each friend adds 1.2k views. Calculate how many shares are needed to pass 200,000 total views.",
				evidence: [
					"Difference between 200,000 and 178,603 views.",
					"Division by 1,200 views per share.",
					"Whole-number share count that actually passes the goal."
				]
			},
			{
				title: "Video Demographics Fraction Analysis",
				prompt: "Use the 3,830-view demographics table with male, female, they, kids or teens, and adults to write fractions for selected audience groups and recommend a future-video strategy using the data.",
				evidence: [
					"Fractions for male viewers, other viewers, adults, and female adults.",
					"Reduced or interpreted fractions with total 3,830 as the denominator when appropriate.",
					"Recommendation connected directly to the demographic table."
				]
			}
		],
		"Check-in #1": [
			{
				title: "Fractions and Decimals Check",
				prompt: "Use the first check-in to demonstrate equivalent fractions, fraction comparison, fraction addition and subtraction, fraction multiplication and division, decimal place value, decimal comparison, rounding, and decimal operations.",
				evidence: [
					"Fraction models and operations with visible denominators.",
					"Decimal comparisons and rounded values with place names.",
					"Multi-step word problems solved with labeled units."
				]
			}
		],
		"LEB11 Customary and Metric Units": [
			{
				title: "Guinness Unit Conversion Rankings",
				prompt: "Use the Guinness record event to rank U.S. heights, U.K. heights, weightlifting amounts, and plank times after converting each group into common units.",
				evidence: [
					"U.S. height conversions for Lana, Rich, Gary, and Trey.",
					"Metric height conversions for Oliver, Kara, Jack, and Amelia.",
					"Weight and time rankings for Derek, Paul, Ethel, George, Steven, and Carl."
				]
			}
		],
		"LEB12 Module Project: From Factory Line to Test Drive": [
			{
				title: "Israel Argo AI Blueprint Conversion",
				prompt: "Use Israel Kositsky's Argo AI blueprint with a 2,900-pound, 6.25-foot-wide, 17-foot-long, 5-foot-high car to convert the design for Volkswagen production in either ounces and yards or metric kilograms and meters.",
				evidence: [
					"Weight conversion from 2,900 pounds to the selected target unit.",
					"Width, length, and height conversions from feet to the selected target unit.",
					"Short standardization note comparing imperial and metric production records."
				]
			},
			{
				title: "Autonomous Test Drive Stop Map",
				prompt: "Use the 1,000-mile autonomous test-drive goal with gas stops every 125 miles. Create a number-line or map record for the Ford route in miles and the Volkswagen route in kilometers using 1 mile = 1.61 kilometers.",
				evidence: [
					"Gas-stop markers every 125 miles through 1,000 miles.",
					"Kilometer equivalents for the route or each major stop.",
					"Final route record that distinguishes miles from kilometers."
				]
			}
		],
		"LEB13 Numerical Expressions": [
			{
				title: "Dice and Coin Score Expressions",
				prompt: "Use the two-round dice and coin game to write expressions for round 1, round 2, total score, third place, and first place. Include parentheses where the order of operations controls the result.",
				evidence: [
					"Round 1 expression using the die roll, subtraction, doubling, addition, multiplication, and division.",
					"Round 2 expression for the heads and tails cases.",
					"Top-three score expressions showing second place, third place, and first place."
				]
			}
		],
		"LEB14 Multiplying by Two and Three Digit Numbers": [
			{
				title: "Donut Shop Production Plan",
				prompt: "Use the donut shop internship to calculate weekly donuts for 326 daily customers, monthly catering donuts from 289 dozen-order requests, and sprinkles for the special frosted donuts.",
				evidence: [
					"326 customers multiplied across one week.",
					"289 dozen catering orders converted to donuts.",
					"Sprinkle total using half the catering donuts and 123 sprinkles per frosted donut."
				]
			}
		],
		"LEB15 Dividing by Two Digit Numbers": [
			{
				title: "Birthday Party Division Budget",
				prompt: "Use the birthday party setup with 378 guests, 192 cars, 7 parking spaces per row, $78 large pizzas, $95 extra-large pizzas, and a $1,570 entertainment budget split across 25 services.",
				evidence: [
					"Parking-row calculation with quotient and remainder interpreted.",
					"Large-pizza versus extra-large-pizza cost comparison for 378 guests.",
					"Equal service-payment amount from a $1,570 budget."
				]
			}
		],
		"LEB16 The Coordinate Plane": [
			{
				title: "Town Map Coordinate Routes",
				prompt: "Use the town map to describe eastbound train stops and northbound bus stops from home to the park, school, library, and town plaza at train stop 8 and bus stop 11.",
				evidence: [
					"Coordinate-style directions for the park, school, and library.",
					"Town plaza location from train stop 8 and bus stop 11.",
					"Explanation connecting horizontal movement to x-values and vertical movement to y-values."
				]
			}
		],
		"LEB17 Patterns, Figures and Shapes in the Coordinate Plane": [
			{
				title: "Zoo Animal Growth Coordinate Tables",
				prompt: "Use Charlie the emperor penguin and Kondo the giant panda to create coordinate tables and plots: Charlie starts at 1 pound and doubles monthly through month 6, while Kondo starts at 145 pounds and loses 5 pounds per week.",
				evidence: [
					"Charlie weight table and coordinate plot through month 6.",
					"Kondo weekly weight table and coordinate plot for two months.",
					"Predictions for when Charlie reaches 24 pounds and Kondo reaches 100 pounds."
				]
			}
		],
		"LEB18 Module Project: Chanh's Space Adventure": [
			{
				title: "Chanh Tesla Orbit Measurement",
				prompt: "Use Chanh Nguyen's Tesla-Retriever 9000 setup to sketch Tesla's orbit, record Tesla coordinates, calculate orbit radius and circumference in astronomical units, convert circumference using 98 million miles per AU, and calculate orbital period from speed.",
				evidence: [
					"Orbit sketch with Tesla coordinates and radius estimate.",
					"Circumference calculation in AU and miles.",
					"Period calculation using circumference, speed, and 24 hours per day."
				]
			},
			{
				title: "Tesla-Retriever Intercept Simulation",
				prompt: "Use the orbit simulator to choose a starting radius between 0.5 and 3 AU for the TR9000, compare Tesla and TR9000 speeds, adjust speed in 150 mph increments, and estimate the intercept point.",
				evidence: [
					"Chosen TR9000 starting radius with reason.",
					"Tesla and TR9000 speed comparison before adjustments.",
					"Estimated intercept coordinate, speed, and radius after the simulation."
				]
			},
			{
				title: "Orbit Speed Comparison",
				prompt: "Use the bonus orbit cases at 2 AU and 0.5 AU to compare speed and period, then apply the same reasoning to Earth at 1 AU and Mars at 1.6 AU with Mars moving at 50,000 mph.",
				evidence: [
					"Recorded speeds for the 2 AU and 0.5 AU trial orbits.",
					"Comparison explaining which orbit is faster and which has a longer period.",
					"Mars period calculation using 1.6 AU, 50,000 mph, and the period formula."
				]
			}
		],
		"Check-in #2": [
			{
				title: "Units, Expressions, and Coordinates Check",
				prompt: "Use the second check-in to demonstrate unit conversion, numerical expressions, multi-digit multiplication, two-digit division, coordinate-plane graphing, patterns, figures, and project-style coordinate reasoning.",
				evidence: [
					"Unit conversions with common target units.",
					"Expression, multiplication, and division work with visible order and remainders.",
					"Coordinate-plane and pattern responses with labeled axes or ordered pairs."
				]
			}
		]
	};

const earlyElementaryAModuleMetadata: Record<
	string,
	SourceLibraryModuleMetadata
> = {
	"EEA1 Addition and Subtraction within 20": {
		estimatedTime: "2 sessions · 35–45 minutes each",
		keyBlocks: [
			"number bond",
			"make ten",
			"addition / subtraction",
			"equation",
			"visual proof"
		],
		flowNote:
			"Build, draw, and write each fact family before relying on mental answers. The ladybug case is complete when the model and equation agree, including the leftover case."
	},
	"EEA2 Addition and Subtraction within 100": {
		estimatedTime: "2 sessions · 35–45 minutes each",
		keyBlocks: [
			"tens / ones",
			"compose / decompose",
			"within 100",
			"estimate",
			"inverse check"
		],
		flowNote:
			"Use base-ten grouping before symbolic regrouping. Compare an estimate with the exact result and check subtraction by adding back."
	},
	"EEA3 Representing Word Problems": {
		estimatedTime: "2 sessions · 35–45 minutes each",
		keyBlocks: [
			"known / unknown",
			"drawing",
			"equation",
			"operation choice",
			"answer statement"
		],
		flowNote:
			"Represent each story with a drawing or bar model, an equation with the unknown in the correct position, and a sentence that answers the actual question."
	},
	"EEA4 Module Project: Escape the Game": {
		estimatedTime: "2–3 sessions · 35–45 minutes each",
		keyBlocks: [
			"100-point budget",
			"constraint",
			"coordinate steps",
			"running total",
			"verification"
		],
		flowNote:
			"Treat the two activities as one constraint project: verify the character budget first, then verify every directional jump and total on the escape route."
	},
	"EEA5 Measuring and Estimating Length in Standard Units": {
		estimatedTime: "2 sessions · 35–45 minutes each",
		keyBlocks: [
			"inch / foot / yard",
			"centimeter / meter",
			"ruler start point",
			"estimate",
			"unit label"
		],
		flowNote:
			"Estimate before measuring, start at zero, and attach a unit to every result. Compare customary and metric examples without mixing units in one calculation."
	},
	"EEA6 Relating Addition and Subtraction to Length": {
		estimatedTime: "2 sessions · 35–45 minutes each",
		keyBlocks: [
			"number line",
			"length sum",
			"length difference",
			"unknown segment",
			"unit check"
		],
		flowNote:
			"Model segments on a number line before writing equations. Use the total and known pieces to solve the missing length, then check that all units match."
	},
	"EEA7 Module Project: The Longest Sandwich in California": {
		estimatedTime: "2–3 sessions · 35–45 minutes each",
		keyBlocks: [
			"0–96 number line",
			"ordered lengths",
			"multi-step subtraction",
			"equal share",
			"meter label"
		],
		flowNote:
			"Keep one 96-meter model through planning, donation, eating, and sharing. Record each change so the remaining length never has to be guessed."
	},
	"EEA8 Understanding Place Value": {
		estimatedTime: "2 sessions · 35–45 minutes each",
		keyBlocks: [
			"hundreds / tens / ones",
			"expanded form",
			"compare",
			"regroup",
			"1,000"
		],
		flowNote:
			"Build numbers with grouped objects or base-ten models, then connect the model to expanded and standard form. Explain how ten of one unit becomes one of the next unit."
	},
	"EEA9 Adding and Subtracting within 200": {
		estimatedTime: "2 sessions · 35–45 minutes each",
		keyBlocks: [
			"place-value strategy",
			"regrouping",
			"within 200",
			"estimate",
			"inverse check"
		],
		flowNote:
			"Use a place-value model and one written strategy for each calculation. Compare the exact total with an estimate and use the inverse operation to check."
	},
	"EEA10 Representing Advanced Word Problems": {
		estimatedTime: "2 sessions · 35–45 minutes each",
		keyBlocks: [
			"multi-step story",
			"operation plan",
			"unknown",
			"running record",
			"reasonableness"
		],
		flowNote:
			"Pause after each event in the ticket story, update one running record, and explain why the next operation matches the change before calculating."
	},
	"EEA11 Adding and Subtracting within 1000": {
		estimatedTime: "2–3 sessions · 35–45 minutes each",
		keyBlocks: [
			"hundreds / tens / ones",
			"regrouping",
			"within 1,000",
			"written strategy",
			"inverse check"
		],
		flowNote:
			"Connect base-ten or expanded-form work to a written strategy. Name every regrouping and check the result with the inverse operation."
	},
	"EEA12 Strategies to Add and Subtract within 1000": {
		estimatedTime: "2–3 sessions · 35–45 minutes each",
		keyBlocks: [
			"decomposition",
			"compensation",
			"expanded form",
			"running total",
			"strategy comparison"
		],
		flowNote:
			"Compare at least two valid strategies on the same score change. Keep a round-by-round ledger and explain which strategy is easiest to verify."
	},
	"EEA13 Module Project: Going TikTok Famous": {
		estimatedTime: "2–3 sessions · 35–45 minutes each",
		keyBlocks: [
			"read a table",
			"order numbers",
			"add totals",
			"subtract from a target",
			"interpret data"
		],
		flowNote:
			"Use the creator scenario only as a follower-count data table; no social-media account or platform use is needed. Verify ordering, totals, and differences from the stated target."
	},
	"Check-in #1": {
		estimatedTime: "1–2 sessions · 35–45 minutes each",
		keyBlocks: [
			"operation choice",
			"place value",
			"length unit",
			"visual model",
			"strategy explanation"
		],
		flowNote:
			"Collect one model, equation, unit-aware result, and strategy explanation. Use missed evidence to choose review instead of assigning every extra activity."
	},
	"EEA14 Working with Equal Groups": {
		estimatedTime: "2 sessions · 35–45 minutes each",
		keyBlocks: [
			"equal groups",
			"repeated addition",
			"array",
			"even / odd",
			"leftover"
		],
		flowNote:
			"Build equal groups with objects or drawings, connect them to repeated addition, and make any leftover visible instead of hiding it in the equation."
	},
	"EEA15 Partitioning Rectangles": {
		estimatedTime: "2 sessions · 35–45 minutes each",
		keyBlocks: [
			"equal squares",
			"rows",
			"columns",
			"array count",
			"partition"
		],
		flowNote:
			"Partition one rectangle into equal rows and columns, count the same total two ways, and explain how the array supports repeated addition."
	},
	"EEA16 Time": {
		estimatedTime: "2 sessions · 35–45 minutes each",
		keyBlocks: [
			"analog / digital",
			"a.m. / p.m.",
			"half past",
			"quarter until",
			"elapsed time"
		],
		flowNote:
			"Match analog and digital times before solving elapsed-time stories. Use a timeline for the rescue and delay so start, change, and end times stay visible."
	},
	"EEA17 Money": {
		estimatedTime: "2 sessions · 35–45 minutes each",
		keyBlocks: [
			"coin value",
			"count money",
			"dollar notation",
			"equivalent amount",
			"make change"
		],
		flowNote:
			"Build each amount with coins, record it in dollars and cents, then trade for an equivalent amount with fewer pieces and verify the value did not change."
	},
	"EEA18 Visualizing Data": {
		estimatedTime: "2 sessions · 35–45 minutes each",
		keyBlocks: [
			"category",
			"table",
			"picture graph",
			"compare counts",
			"update data"
		],
		flowNote:
			"Collect and label categories before choosing a display. Update the same display after new utensils arrive and use it to answer comparison questions."
	},
	"EEA19 Polygons and Circles": {
		estimatedTime: "2 sessions · 35–45 minutes each",
		keyBlocks: [
			"side / corner / curve",
			"polygon",
			"circle",
			"equal parts",
			"halves / thirds / fourths"
		],
		flowNote:
			"Describe shapes by visible attributes, then partition examples into equal shares. A fraction name is accepted only when the parts are equal."
	},
	"EEA20 Module Project: The Next Hit iPhone": {
		estimatedTime: "2–3 sessions · 35–45 minutes each",
		keyBlocks: [
			"read a data table",
			"chart",
			"compare measures",
			"array partition",
			"evidence-based recommendation"
		],
		flowNote:
			"Use the phone table as a neutral product-data comparison, not a purchase endorsement. Support the recommendation with charts, then verify the party arrays separately."
	},
	"Check-in #2": {
		estimatedTime: "1–2 sessions · 35–45 minutes each",
		keyBlocks: [
			"equal groups",
			"time / money",
			"data display",
			"shape / equal parts",
			"visible reasoning"
		],
		flowNote:
			"Collect one equal-groups model, one time or money record, one data interpretation, and one shape or fraction explanation before choosing targeted review."
	}
};

const earlyElementaryBModuleMetadata: Record<
	string,
	SourceLibraryModuleMetadata
> = {
	"EEB1 Adding and Subtracting within 1000": {
		estimatedTime: "2 sessions · 35–45 minutes each",
		keyBlocks: [
			"hundreds / tens / ones",
			"expanded form",
			"regrouping",
			"estimate",
			"inverse check"
		],
		flowNote:
			"Build each number with place-value blocks or expanded form before calculating. Name every regrouping, compare with an estimate, and check subtraction by adding back."
	},
	"EEB2 Strategies to Add and Subtract within 1000": {
		estimatedTime: "2 sessions · 35–45 minutes each",
		keyBlocks: [
			"decomposition",
			"compensation",
			"place-value trade",
			"running score",
			"strategy comparison"
		],
		flowNote:
			"Keep one round-by-round score ledger, solve at least one change with two strategies, and explain which strategy makes the regrouping easiest to verify."
	},
	"EEB3 Multiplying and Dividing within 100": {
		estimatedTime: "2 sessions · 35–45 minutes each",
		keyBlocks: [
			"equal groups",
			"array",
			"multiplication",
			"division",
			"unknown factor"
		],
		flowNote:
			"Build or draw equal groups before writing equations. Connect each multiplication fact to a related division fact and make the missing quantity visible."
	},
	"EEB4 Properties of Multiplication and Division": {
		estimatedTime: "2 sessions · 35–45 minutes each",
		keyBlocks: [
			"commutative",
			"associative",
			"distributive",
			"inverse operations",
			"array proof"
		],
		flowNote:
			"Rearrange the same objects instead of memorizing property names alone. Label what changes in each array and what total must remain invariant."
	},
	"EEB5 Multiplication and Division Word Problems": {
		estimatedTime: "2 sessions · 35–45 minutes each",
		keyBlocks: [
			"known / unknown",
			"equal-groups model",
			"equation",
			"operation choice",
			"answer statement"
		],
		flowNote:
			"Identify the group size, number of groups, and total before choosing an operation. Show the unknown in a model and finish with a sentence tied to the story."
	},
	"EEB6 Applying the Four Operations": {
		estimatedTime: "2 sessions · 35–45 minutes each",
		keyBlocks: [
			"four operations",
			"order of operations",
			"parentheses",
			"whole-number division",
			"step trace"
		],
		flowNote:
			"Record one expression per turn, evaluate one operation at a time, and compare two parentheses placements so the effect of grouping is visible."
	},
	"EEB7 Multiples of 10": {
		estimatedTime: "1–2 sessions · 35–45 minutes each",
		keyBlocks: [
			"factor",
			"multiple of 10",
			"place-value shift",
			"block model",
			"pattern statement"
		],
		flowNote:
			"Compare each single-digit product with its related multiple-of-ten product using blocks and equations. Describe the place-value change rather than relying on an add-a-zero shortcut alone."
	},
	"EEB8 Module Project: Using Science For Good": {
		estimatedTime: "2–3 sessions · 35–45 minutes each",
		keyBlocks: [
			"read a fixed table",
			"repeated interval",
			"unit rate",
			"multi-step total",
			"reasonableness check"
		],
		flowNote:
			"Treat every medicine name and number as a closed, fictional arithmetic table. Do not infer, recommend, or apply any dosage to a real person; verify only the stated rates, intervals, units, and totals."
	},
	"Check-in #1": {
		estimatedTime: "1–2 sessions · 35–45 minutes each",
		keyBlocks: [
			"place value",
			"multiplication / division",
			"property model",
			"expression",
			"visible explanation"
		],
		flowNote:
			"Collect one place-value strategy, one multiplication or division model, one property explanation, and one evaluated expression. Assign only the review connected to missing evidence."
	},
	"EEB9 Units of Measurement": {
		estimatedTime: "2 sessions · 35–45 minutes each",
		keyBlocks: [
			"elapsed time",
			"capacity",
			"mass",
			"estimate",
			"unit choice"
		],
		flowNote:
			"Estimate first, then choose and label a sensible unit before calculating. Use a timeline for elapsed time and keep capacity and mass comparisons separate."
	},
	"EEB10 Area": {
		estimatedTime: "2 sessions · 35–45 minutes each",
		keyBlocks: [
			"square unit",
			"rows / columns",
			"multiplication",
			"decompose",
			"estimate"
		],
		flowNote:
			"Tile or draw rectangular regions before using multiplication. For an irregular region, show how enclosing or decomposing it supports a reasonable square-unit estimate."
	},
	"EEB11 Module Project: Investing for the Future": {
		estimatedTime: "2–3 sessions · 35–45 minutes each",
		keyBlocks: [
			"equal allocation",
			"area decomposition",
			"unit cost",
			"compare options",
			"evidence-based choice"
		],
		flowNote:
			"Use the company scenario only for classroom arithmetic and evidence comparison, not real investment advice. Separate the equal-allocation calculation from the hypothetical recommendation, then verify the factory area and cost."
	},
	"EEB12 Partitioning Shapes": {
		estimatedTime: "2 sessions · 35–45 minutes each",
		keyBlocks: [
			"equal parts",
			"unit fraction",
			"numerator / denominator",
			"shape partition",
			"fraction statement"
		],
		flowNote:
			"Partition each whole into equal parts before naming a fraction. Match every numerator and denominator to a visible shaded or selected region."
	},
	"EEB13 Fractions as Numbers": {
		estimatedTime: "2 sessions · 35–45 minutes each",
		keyBlocks: [
			"0 to 1 number line",
			"equal intervals",
			"unit fraction",
			"equivalent fractions",
			"compare fractions"
		],
		flowNote:
			"Mark 0 and 1 first, divide the distance into equal intervals, and connect each physical sandwich cut to an exact point on the number line."
	},
	"EEB14 Represent and Interpret Data": {
		estimatedTime: "2–3 sessions · 35–45 minutes each",
		keyBlocks: [
			"table",
			"scale",
			"picture graph",
			"bar graph",
			"measurement line plot"
		],
		flowNote:
			"Organize the values in a table before choosing a graph and state what one symbol or interval represents. Answer comparison questions directly from the completed display."
	},
	"EEB15 Perimeter": {
		estimatedTime: "2 sessions · 35–45 minutes each",
		keyBlocks: [
			"side length",
			"perimeter",
			"area contrast",
			"same area / different shape",
			"unit label"
		],
		flowNote:
			"Trace and label every outer side before adding. Compare two rectangles with equal area to show why area does not determine perimeter."
	},
	"EEB16 Quadrilaterals": {
		estimatedTime: "2 sessions · 35–45 minutes each",
		keyBlocks: [
			"four sides",
			"parallel sides",
			"right angle",
			"shape hierarchy",
			"attribute evidence"
		],
		flowNote:
			"Classify each object from visible side and angle evidence, then place it in every quadrilateral category that applies instead of forcing one exclusive label."
	},
	"EEB17 Module Project: 2001: A Warehouse Odyssey": {
		estimatedTime: "2–3 sessions · 35–45 minutes each",
		keyBlocks: [
			"capacity fraction",
			"compare to one half",
			"rectangular area",
			"design constraint",
			"validated recommendation"
		],
		flowNote:
			"Complete the capacity comparison before prioritizing restocks, then calculate robot area and test the recommendation against the stated movement and load constraints."
	},
	"Check-in #2": {
		estimatedTime: "1–2 sessions · 35–45 minutes each",
		keyBlocks: [
			"measurement unit",
			"area / perimeter",
			"fraction model",
			"data display",
			"quadrilateral evidence"
		],
		flowNote:
			"Collect one unit-aware measurement, one area or perimeter model, one fraction representation, one data interpretation, and one shape classification before choosing targeted review."
	}
};

const lateElementaryAModuleMetadata: Record<
	string,
	SourceLibraryModuleMetadata
> = {
	"LEA1 Place Value": {
		estimatedTime: "2 sessions · 40–50 minutes each",
		keyBlocks: [
			"ones / tens / hundreds",
			"expanded form",
			"exchange",
			"standard form",
			"equivalent value"
		],
		flowNote:
			"Represent the prize money before combining it, then exchange equivalent groups until the number uses the fewest place-value pieces. Verify that every exchange preserves total value."
	},
	"LEA2 Comparing and Rounding": {
		estimatedTime: "2 sessions · 40–50 minutes each",
		keyBlocks: [
			"compare digits",
			"rounding place",
			"benchmark",
			"estimate / exact",
			"decision evidence"
		],
		flowNote:
			"Mark the rounding place and benchmark values before rounding. Keep exact cost and distance separate from their estimates, then use both in the final comparison."
	},
	"LEA3 Addition and Subtraction": {
		estimatedTime: "2 sessions · 40–50 minutes each",
		keyBlocks: [
			"place-value model",
			"regrouping",
			"standard algorithm",
			"estimate",
			"inverse check"
		],
		flowNote:
			"Model the operation with place-value pieces first, connect each trade to the written algorithm, and use estimation or the inverse operation to check the result."
	},
	"LEA4 Module Project: Soccer Season": {
		estimatedTime: "2–3 sessions · 40–50 minutes each",
		keyBlocks: [
			"roster table",
			"multi-digit total",
			"rounding",
			"inequality",
			"synergy adjustment"
		],
		flowNote:
			"Build one auditable roster table, calculate exact and rounded totals, then change one player or position at a time so every synergy adjustment can be traced."
	},
	"LEA5 Factors and Multiples": {
		estimatedTime: "2 sessions · 40–50 minutes each",
		keyBlocks: [
			"array",
			"factor pair",
			"multiple",
			"prime / composite",
			"common factor"
		],
		flowNote:
			"Build arrays before listing factors and pair every factor with its partner. Use the completed lists to distinguish factors, multiples, prime numbers, and composite numbers."
	},
	"LEA6 Multiplication by One-Digit Numbers": {
		estimatedTime: "2 sessions · 40–50 minutes each",
		keyBlocks: [
			"place-value product",
			"partial products",
			"regrouping",
			"estimate",
			"reasonableness"
		],
		flowNote:
			"Decompose the multi-digit factor by place value, record each partial product, and compare the exact total with an estimate before accepting it."
	},
	"LEA7 Multiplication by Two-Digit Numbers": {
		estimatedTime: "2–3 sessions · 40–50 minutes each",
		keyBlocks: [
			"area model",
			"partial products",
			"distributive property",
			"two-digit factor",
			"estimate"
		],
		flowNote:
			"Start with an area model or decomposition, label every partial product, and explain how the extra group changes 25 × 10 into 25 × 11."
	},
	"LEA8 Division by One-Digit Numbers": {
		estimatedTime: "2 sessions · 40–50 minutes each",
		keyBlocks: [
			"equal groups",
			"quotient",
			"remainder",
			"interpretation",
			"multiplication check"
		],
		flowNote:
			"Represent equal groups before using a written division strategy. Interpret the remainder in the carton context and check the quotient with multiplication."
	},
	"LEA9 Module Project: Invest-a-thon": {
		estimatedTime: "3 sessions · 40–50 minutes each",
		keyBlocks: [
			"equal allocation",
			"remainder",
			"growth multiplier",
			"reallocation constraint",
			"scenario justification"
		],
		flowNote:
			"Treat all companies, multipliers, and projections as a fictional classroom dataset, not investment advice. Keep equal allocation, hypothetical selection, growth, and reallocation as separately verified stages."
	},
	"Check-in #1": {
		estimatedTime: "1–2 sessions · 40–50 minutes each",
		keyBlocks: [
			"place value / rounding",
			"operations",
			"factor / multiple",
			"multiplication / division",
			"visible verification"
		],
		flowNote:
			"Collect one place-value or rounding explanation, one multi-digit operation, one factor or multiple model, and one multiplication or division check. Use the evidence gaps to select review."
	},
	"LEA10 Lines": {
		estimatedTime: "1–2 sessions · 40–50 minutes each",
		keyBlocks: ["point", "line", "line segment", "ray", "endpoint / arrow"],
		flowNote:
			"Draw and label each figure with endpoints and arrows before comparing definitions. The drawing and the vocabulary explanation must agree."
	},
	"LEA11 Angles": {
		estimatedTime: "2 sessions · 40–50 minutes each",
		keyBlocks: [
			"vertex / rays",
			"degree",
			"right / acute / obtuse",
			"clockwise / counterclockwise",
			"final direction"
		],
		flowNote:
			"Trace each compass turn from a visible starting direction, label its degree measure and direction, and verify the final heading after the full route."
	},
	"LEA12 Triangles": {
		estimatedTime: "2 sessions · 40–50 minutes each",
		keyBlocks: [
			"side-length class",
			"angle class",
			"right / acute / obtuse",
			"equilateral / isosceles / scalene",
			"multiple classification"
		],
		flowNote:
			"Sort the same triangles once by side lengths and once by angles. Describe at least one triangle with both classifications to make the two attribute systems distinct."
	},
	"LEA13 Module Project: An Obtuse Life": {
		estimatedTime: "2–3 sessions · 40–50 minutes each",
		keyBlocks: [
			"shape attributes",
			"symmetry",
			"angle type",
			"perpendicular",
			"rotation"
		],
		flowNote:
			"Use classroom-provided images, object sketches, or original diagrams; no one needs to photograph people or private spaces. Label every requested feature, then trace the lighting rotation from 90 degrees."
	},
	"LEA14 Polygons and Perimeter": {
		estimatedTime: "2 sessions · 40–50 minutes each",
		keyBlocks: [
			"polygon",
			"equal sides",
			"perimeter",
			"line symmetry",
			"unit label"
		],
		flowNote:
			"Label each side before calculating the puppy-pen perimeter, then test the bed design by folding or reflecting it across the marked line of symmetry."
	},
	"LEA15 Quadrilaterals": {
		estimatedTime: "2 sessions · 40–50 minutes each",
		keyBlocks: [
			"parallel sides",
			"equal sides",
			"right angles",
			"quadrilateral hierarchy",
			"overlapping categories"
		],
		flowNote:
			"Classify each quadrilateral from visible side and angle evidence and place it in every category that applies. Explain category overlap instead of choosing only one name."
	},
	"LEA16 Area and Volume": {
		estimatedTime: "2–3 sessions · 40–50 minutes each",
		keyBlocks: [
			"perimeter constraint",
			"surface area",
			"face decomposition",
			"volume",
			"square / cubic units"
		],
		flowNote:
			"Choose dimensions that satisfy the 30-foot perimeter first, label every face used for tile area, and keep square-unit and cubic-unit calculations separate."
	},
	"LEA17 Module Project: The LA River Master Plan": {
		estimatedTime: "3 sessions · 40–50 minutes each",
		keyBlocks: [
			"scaled plan",
			"area decomposition",
			"remaining area",
			"perimeter",
			"unknown dimension / volume"
		],
		flowNote:
			"Build one labeled plan with a stated scale, verify used and remaining area, and then solve the pool and hot-tub dimensions with volume equations that preserve units."
	},
	"Check-in #2": {
		estimatedTime: "1–2 sessions · 40–50 minutes each",
		keyBlocks: [
			"line / angle",
			"triangle / polygon",
			"quadrilateral evidence",
			"perimeter / area",
			"volume with units"
		],
		flowNote:
			"Collect one labeled line or angle model, one shape classification, one perimeter or area calculation, and one volume calculation. Select review from missing evidence rather than assigning every option."
	}
};

const lateElementaryBModuleMetadata: Record<
	string,
	SourceLibraryModuleMetadata
> = {
	"LEB1 Equivalent Fractions": {
		estimatedTime: "2 sessions · 40–50 minutes each",
		keyBlocks: [
			"same whole",
			"equal parts",
			"equivalent fraction",
			"visual model",
			"multiply / divide by one"
		],
		flowNote:
			"Keep the whole fixed at 20, represent each fraction with equal parts, and explain why multiplying or dividing numerator and denominator by the same value preserves the amount."
	},
	"LEB2 Comparing and Ordering Fractions": {
		estimatedTime: "2 sessions · 40–50 minutes each",
		keyBlocks: [
			"same whole",
			"benchmark fraction",
			"common denominator",
			"number line",
			"ordered comparison"
		],
		flowNote:
			"Compare fractions only after confirming the same whole. Use a benchmark, common denominator, or number line, then connect the ordering to the ribbon assignment."
	},
	"LEB3 Adding and Subtracting Fractions": {
		estimatedTime: "2–3 sessions · 40–50 minutes each",
		keyBlocks: [
			"common denominator",
			"equivalent fraction",
			"add / subtract",
			"track model",
			"whole-distance check"
		],
		flowNote:
			"Shade the race distance after every change, rewrite fractions with a common denominator, and check that the final distance remains between zero and one whole race."
	},
	"LEB4 Multiplying Fractions": {
		estimatedTime: "2 sessions · 40–50 minutes each",
		keyBlocks: [
			"fraction of a fraction",
			"area model",
			"overlap",
			"numerator product",
			"denominator product"
		],
		flowNote:
			"Draw the first fraction in one direction and the second in another, identify the overlap, and connect that region to the multiplication expression."
	},
	"LEB5 Dividing Fractions": {
		estimatedTime: "2 sessions · 40–50 minutes each",
		keyBlocks: [
			"measurement division",
			"unit fraction",
			"groups in an amount",
			"visual model",
			"multiplication check"
		],
		flowNote:
			"Use the pie box to ask how many equal portions fit, label the size of one portion, and verify each division result with a related multiplication statement."
	},
	"LEB6 Module Project: Saving the Environment One Cake at a Time": {
		estimatedTime: "2–3 sessions · 40–50 minutes each",
		keyBlocks: [
			"ratio",
			"reduced fraction",
			"number line",
			"scale recipe",
			"unit label"
		],
		flowNote:
			"Treat all company, emissions, cost, and recipe values as a fixed classroom dataset rather than current factual claims. Reduce and plot the report ratios, then scale the recipe with units visible."
	},
	"LEB7 Place Value with Decimals": {
		estimatedTime: "2 sessions · 40–50 minutes each",
		keyBlocks: [
			"tenths / hundredths",
			"coin exchange",
			"decimal notation",
			"add decimals",
			"comparison"
		],
		flowNote:
			"Convert pennies and dimes into dollars with place-value exchanges before adding. Treat the phone price only as a comparison target, not a product recommendation."
	},
	"LEB8 Comparing and Rounding Decimals": {
		estimatedTime: "2 sessions · 40–50 minutes each",
		keyBlocks: [
			"align place values",
			"compare decimals",
			"rounding place",
			"benchmark",
			"interval reasoning"
		],
		flowNote:
			"Align decimal places before ranking, mark the rounding digit and benchmark values, and justify proposed third-place times as values inside the correct interval."
	},
	"LEB9 Decimal Operations": {
		estimatedTime: "2–3 sessions · 40–50 minutes each",
		keyBlocks: [
			"decimal addition",
			"decimal subtraction",
			"decimal multiplication",
			"unit price",
			"change check"
		],
		flowNote:
			"Record quantity, unit price, and item cost in one table, align decimal points, and check that subtotal plus tax plus change reconciles with the amount paid."
	},
	"LEB10 Module Project: From Facebook to YouTube": {
		estimatedTime: "3 sessions · 40–50 minutes each",
		keyBlocks: [
			"aggregate data table",
			"order decimals",
			"threshold difference",
			"fraction of total",
			"data-based recommendation"
		],
		flowNote:
			"Use only the supplied aggregate counts; no account, posting, sharing, platform access, or personal data collection is required. Verify the ordering, threshold, growth, and demographic calculations before making a hypothetical content recommendation."
	},
	"Check-in #1": {
		estimatedTime: "1–2 sessions · 40–50 minutes each",
		keyBlocks: [
			"equivalent / ordered fractions",
			"fraction operations",
			"decimal place value",
			"rounding",
			"decimal operations"
		],
		flowNote:
			"Collect one visual fraction model, one fraction operation, one decimal comparison or rounding explanation, and one labeled decimal calculation. Select review from the missing evidence."
	},
	"LEB11 Customary and Metric Units": {
		estimatedTime: "2 sessions · 40–50 minutes each",
		keyBlocks: [
			"conversion factor",
			"equivalent measure",
			"customary unit",
			"metric unit",
			"ranking"
		],
		flowNote:
			"Choose one common unit before ranking each group, write the conversion factor as an equality, and keep height, weight, and time comparisons in separate tables."
	},
	"LEB12 Module Project: From Factory Line to Test Drive": {
		estimatedTime: "2–3 sessions · 40–50 minutes each",
		keyBlocks: [
			"blueprint dimensions",
			"unit conversion",
			"number-line stops",
			"miles / kilometers",
			"assumption check"
		],
		flowNote:
			"Treat the vehicle and route as a unit-conversion model, not an autonomous-driving safety analysis. State each conversion factor, label every route unit, and verify the final distance in both systems."
	},
	"LEB13 Numerical Expressions": {
		estimatedTime: "2 sessions · 40–50 minutes each",
		keyBlocks: [
			"operation order",
			"parentheses",
			"expression",
			"step trace",
			"score comparison"
		],
		flowNote:
			"Translate each game rule into one expression, evaluate one operation at a time, and compare alternate parentheses placements before ranking scores."
	},
	"LEB14 Multiplying by Two and Three Digit Numbers": {
		estimatedTime: "2–3 sessions · 40–50 minutes each",
		keyBlocks: [
			"area model",
			"partial products",
			"multi-digit multiplication",
			"unit conversion",
			"estimate"
		],
		flowNote:
			"Decompose each factor, label partial products, convert dozens before combining quantities, and compare the production total with an estimate."
	},
	"LEB15 Dividing by Two Digit Numbers": {
		estimatedTime: "2–3 sessions · 40–50 minutes each",
		keyBlocks: [
			"two-digit divisor",
			"quotient",
			"remainder",
			"interpretation",
			"multiplication check"
		],
		flowNote:
			"Estimate the quotient, show each division step, interpret remainders in the parking and pizza contexts, and verify each result with multiplication."
	},
	"LEB16 The Coordinate Plane": {
		estimatedTime: "2 sessions · 40–50 minutes each",
		keyBlocks: [
			"x-axis / y-axis",
			"origin",
			"ordered pair",
			"horizontal / vertical",
			"route description"
		],
		flowNote:
			"Label the axes and origin before plotting, read horizontal movement before vertical movement, and verify every destination as an ordered pair."
	},
	"LEB17 Patterns, Figures and Shapes in the Coordinate Plane": {
		estimatedTime: "2–3 sessions · 40–50 minutes each",
		keyBlocks: [
			"input / output table",
			"coordinate pair",
			"additive pattern",
			"multiplicative pattern",
			"prediction check"
		],
		flowNote:
			"Build each animal table before plotting, name whether the pattern is additive or multiplicative, and check predictions by extending the same rule."
	},
	"LEB18 Module Project: Chanh's Space Adventure": {
		estimatedTime: "3 sessions · 40–50 minutes each",
		keyBlocks: [
			"coordinate orbit sketch",
			"radius / circumference",
			"unit conversion",
			"speed / period",
			"simulation assumption"
		],
		flowNote:
			"Treat the orbit work as a simplified toy model using only the stated radii, speeds, and conversion constants, not a real orbital prediction. Record assumptions, units, and each simulation adjustment before comparing results."
	},
	"Check-in #2": {
		estimatedTime: "1–2 sessions · 40–50 minutes each",
		keyBlocks: [
			"unit conversion",
			"numerical expression",
			"multiplication / division",
			"coordinate pair",
			"pattern explanation"
		],
		flowNote:
			"Collect one verified conversion, one evaluated expression, one multi-digit operation, one plotted coordinate, and one pattern explanation before assigning targeted review."
	}
};

const elementaryMathCourses = {
	earlyElementaryA: createSourceLibraryCourse({
		name: "Early Elementary A: Discovering Numbers, Operations, and Measurement",
		focus: "addition, subtraction, word problems, length, place value, equal groups, rectangles, time, money, data, polygons, circles, and visual math explanations",
		splitSourceActivityAnchors: true,
		moduleMetadata: earlyElementaryAModuleMetadata,
		sourceActivityAnchors: earlyElementaryAMathSourceAnchors,
		modules: [
			"EEA1 Addition and Subtraction within 20",
			"EEA2 Addition and Subtraction within 100",
			"EEA3 Representing Word Problems",
			"EEA4 Module Project: Escape the Game",
			"EEA5 Measuring and Estimating Length in Standard Units",
			"EEA6 Relating Addition and Subtraction to Length",
			"EEA7 Module Project: The Longest Sandwich in California",
			"EEA8 Understanding Place Value",
			"EEA9 Adding and Subtracting within 200",
			"EEA10 Representing Advanced Word Problems",
			"EEA11 Adding and Subtracting within 1000",
			"EEA12 Strategies to Add and Subtract within 1000",
			"EEA13 Module Project: Going TikTok Famous",
			"Check-in #1",
			"EEA14 Working with Equal Groups",
			"EEA15 Partitioning Rectangles",
			"EEA16 Time",
			"EEA17 Money",
			"EEA18 Visualizing Data",
			"EEA19 Polygons and Circles",
			"EEA20 Module Project: The Next Hit iPhone",
			"Check-in #2"
		]
	}),
	earlyElementaryB: createSourceLibraryCourse({
		name: "Early Elementary B: Exploring Arithmetic, Fractions, and Geometry",
		focus: "multi-digit operations, multiplication, division, word problems, measurement, area, fractions, data, perimeter, quadrilaterals, and geometric explanation",
		splitSourceActivityAnchors: true,
		moduleMetadata: earlyElementaryBModuleMetadata,
		sourceActivityAnchors: earlyElementaryBMathSourceAnchors,
		modules: [
			"EEB1 Adding and Subtracting within 1000",
			"EEB2 Strategies to Add and Subtract within 1000",
			"EEB3 Multiplying and Dividing within 100",
			"EEB4 Properties of Multiplication and Division",
			"EEB5 Multiplication and Division Word Problems",
			"EEB6 Applying the Four Operations",
			"EEB7 Multiples of 10",
			"EEB8 Module Project: Using Science For Good",
			"Check-in #1",
			"EEB9 Units of Measurement",
			"EEB10 Area",
			"EEB11 Module Project: Investing for the Future",
			"EEB12 Partitioning Shapes",
			"EEB13 Fractions as Numbers",
			"EEB14 Represent and Interpret Data",
			"EEB15 Perimeter",
			"EEB16 Quadrilaterals",
			"EEB17 Module Project: 2001: A Warehouse Odyssey",
			"Check-in #2"
		]
	}),
	lateElementaryA: createSourceLibraryCourse({
		name: "Late Elementary A: Investigating Multiplication, Division, and Geometry",
		focus: "place value, rounding, whole-number operations, factors, multiples, multiplication, division, lines, angles, triangles, polygons, perimeter, area, and volume",
		splitSourceActivityAnchors: true,
		moduleMetadata: lateElementaryAModuleMetadata,
		sourceActivityAnchors: lateElementaryAMathSourceAnchors,
		modules: [
			"LEA1 Place Value",
			"LEA2 Comparing and Rounding",
			"LEA3 Addition and Subtraction",
			"LEA4 Module Project: Soccer Season",
			"LEA5 Factors and Multiples",
			"LEA6 Multiplication by One-Digit Numbers",
			"LEA7 Multiplication by Two-Digit Numbers",
			"LEA8 Division by One-Digit Numbers",
			"LEA9 Module Project: Invest-a-thon",
			"Check-in #1",
			"LEA10 Lines",
			"LEA11 Angles",
			"LEA12 Triangles",
			"LEA13 Module Project: An Obtuse Life",
			"LEA14 Polygons and Perimeter",
			"LEA15 Quadrilaterals",
			"LEA16 Area and Volume",
			"LEA17 Module Project: The LA River Master Plan",
			"Check-in #2"
		]
	}),
	lateElementaryB: createSourceLibraryCourse({
		name: "Late Elementary B: Mastering Fractions, Decimals, Units, and Coordinates",
		focus: "fractions, decimals, unit conversion, numerical expressions, multi-digit multiplication and division, coordinate planes, patterns, figures, and geometric reasoning",
		splitSourceActivityAnchors: true,
		moduleMetadata: lateElementaryBModuleMetadata,
		sourceActivityAnchors: lateElementaryBMathSourceAnchors,
		modules: [
			"LEB1 Equivalent Fractions",
			"LEB2 Comparing and Ordering Fractions",
			"LEB3 Adding and Subtracting Fractions",
			"LEB4 Multiplying Fractions",
			"LEB5 Dividing Fractions",
			"LEB6 Module Project: Saving the Environment One Cake at a Time",
			"LEB7 Place Value with Decimals",
			"LEB8 Comparing and Rounding Decimals",
			"LEB9 Decimal Operations",
			"LEB10 Module Project: From Facebook to YouTube",
			"Check-in #1",
			"LEB11 Customary and Metric Units",
			"LEB12 Module Project: From Factory Line to Test Drive",
			"LEB13 Numerical Expressions",
			"LEB14 Multiplying by Two and Three Digit Numbers",
			"LEB15 Dividing by Two Digit Numbers",
			"LEB16 The Coordinate Plane",
			"LEB17 Patterns, Figures and Shapes in the Coordinate Plane",
			"LEB18 Module Project: Chanh's Space Adventure",
			"Check-in #2"
		]
	})
} as const;

export const earlyElementaryMathACourse =
	elementaryMathCourses.earlyElementaryA;
export const earlyElementaryMathBCourse =
	elementaryMathCourses.earlyElementaryB;
export const lateElementaryMathACourse = elementaryMathCourses.lateElementaryA;
export const lateElementaryMathBCourse = elementaryMathCourses.lateElementaryB;
