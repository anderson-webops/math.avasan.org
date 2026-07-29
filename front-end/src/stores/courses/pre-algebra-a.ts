import type { RawCourse } from "./types";
import { configureMathCourseFlow } from "./mathCourseFlow";
import { pendingStaticMediaNotice, staticMediaUrl } from "./staticMedia";

const KICKOFF_INVENTORY = "paa_kickoff_0.png";
const KICKOFF_PRICING = "paa_kickoff_1.png";
const PAA1_SIGNED_NUMBER_DIAGRAM = "paa1_pset1_0.png";
const PRE_ALGEBRA_A_PENDING_SOURCE_ASSETS = [
	KICKOFF_INVENTORY,
	KICKOFF_PRICING,
	PAA1_SIGNED_NUMBER_DIAGRAM
] as const;

function lesson(title: string, content: string, mediaLink?: string) {
	return mediaLink ? { title, content, mediaLink } : { title, content };
}

function module(
	title: string,
	curriculum: ReturnType<typeof lesson>[],
	supplementalProjects: ReturnType<typeof lesson>[] = []
) {
	return {
		title,
		curriculum,
		supplementalProjects
	};
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
	evidence,
	goal,
	steps,
	title
}: {
	evidence: string;
	goal: string;
	steps: string[];
	title: string;
}) {
	return [
		`**Project goal:** ${goal}`,
		`**Work path:**\n${steps.map((step, index) => `${index + 1}. ${step}`).join("\n")}`,
		`**Evidence of completion:** ${evidence}`,
		`**Project reference:** ${title}`
	].join("\n\n");
}

function sourceAnchor({
	evidence,
	references,
	title
}: {
	evidence: string[];
	references: string[];
	title: string;
}) {
	return [
		`**Reference map: ${title}**`,
		`**Reference details:**\n${references.map(reference => `- ${reference}`).join("\n")}`,
		`**Evidence record:**\n${evidence.map(item => `- ${item}`).join("\n")}`
	].join("\n\n");
}

export const preAlgebraACourse: RawCourse = {
	name: "Pre-Algebra A",
	modules: [
		module("Pre-Algebra A Kick-Off", [
			lesson(
				"Course Map and Readiness Check",
				[
					"Pre-Algebra A connects arithmetic fluency to early algebraic reasoning. The opening sequence checks comfort with signed numbers, order of operations, fractions, decimals, percents, ratios, variables, exponents, and radicals.",
					"Use the kickoff as a placement map rather than a formal test. Each question points to a later module, so a difficult step identifies the next useful learning target.",
					"Readiness evidence can include written arithmetic, a number-line model, a short explanation of the chosen operation, and one correction after an error is found."
				].join("\n\n")
			),
			lesson(
				"Project: Starting a Gardening Business",
				[
					project({
						title: "Project 1: Starting a Gardening Business",
						goal: "Use a gardening-business scenario to review arithmetic, negative numbers, absolute value, fractions, and mixed numbers.",
						steps: [
							"Create a store name and budget plan with a starting investment of $3000.",
							"Write and evaluate an expression for inventory, moving carts, and advertising expenses.",
							"Represent floor-repair depths with negative numbers and absolute value.",
							"Choose items from plant, tool, pot, and miscellaneous categories, then compare the category fractions.",
							"Divide four tenths of a bag of soil across three garden sections and record the result as a fraction."
						],
						evidence:
							"The finished plan shows the spending expression, money remaining, absolute concrete amount, ordered category fractions, and soil-per-section fraction."
					}),
					sourceAnchor({
						title: "Starting a Gardening Business",
						references: [
							"Garden business name and slogan with a $3000 starting investment.",
							"Startup spending uses $1500 of inventory, 3 moving carts at $400 each, and a $700 YouTube ad.",
							"Floor repair uses two holes that are -4 feet deep and three holes that are -2 feet deep.",
							"Inventory choices include 4 plant or garden flower items, 3 gardening tools, 4 plant pots, and 2 miscellaneous items.",
							"Plants and Garden Flowers spending is $736, and the soil question divides four tenths of a bag across 3 sections."
						],
						evidence: [
							"Spending expression and remaining budget are labeled.",
							"Absolute concrete amount treats depth as distance from the floor surface.",
							"Category fractions are ordered, combined, and rewritten as a mixed number."
						]
					}),
					pendingStaticMediaNotice(KICKOFF_INVENTORY)
				].join("\n\n"),
				staticMediaUrl(KICKOFF_INVENTORY)
			),
			lesson(
				"Project: Growing the Gardening Business",
				[
					project({
						title: "Project 2: Growing Your Gardening Business",
						goal: "Use the same business context to connect decimals, percents, ratios, arithmetic expressions, sequences, exponents, and scientific notation.",
						steps: [
							"Calculate first-week sales from a pricing table and compare revenue with the startup spending from the first project.",
							"Interpret a 30% profit target for two gardening-tool items and decide how a price change affects the goal.",
							"Convert 1537 minutes into hours, then calculate weekly pay at $13 per hour.",
							"Analyze the sequence 5, 9, 13, 17, ..., predict later weeks, and write an expression using w for the week number.",
							"Evaluate flower-bundle and receipt expressions that use exponents, negative exponents, and scientific notation."
						],
						evidence:
							"The finished work includes revenue, profit reasoning, time conversion, wage calculation, sequence rule, exponent calculation, and corrected scientific notation."
					}),
					sourceAnchor({
						title: "Growing the Gardening Business",
						references: [
							"First-week sales include 4 succulents, 3 flower bundles, 1 wheelbarrow, 5 pairs of gardening gloves, 1 basic plant pot, 1 multi-pot plant stand, 2 pairs of decorative garden lights, and 1 small garden tool shed.",
							"Profit reasoning uses a 30% target for two items from the gardening tools category.",
							"Payroll uses 1,537 minutes and a $13 hourly wage.",
							"Plant sales follow 5, 9, 13, 17, 21, 25, 29, 33, 37, 41 with week-number variable w.",
							"Flower bundling uses 500 flowers, and garden-light packaging compares boxes of 10, 12, and 8 for packing 24 lights.",
							"Promotion math uses 5^2 flower bundles per box and 3^2 boxes, while register repair uses $.000000000265 x 10^9 and 2^-4 * 4^2 + ? = 33.52."
						],
						evidence: [
							"Revenue and profit calculations are compared with the startup spending.",
							"Sequence reasoning distinguishes the week number from the number of plants sold.",
							"Exponent and scientific-notation corrections explain whether the receipt value is reasonable."
						]
					}),
					pendingStaticMediaNotice(KICKOFF_PRICING)
				].join("\n\n"),
				staticMediaUrl(KICKOFF_PRICING)
			)
		]),
		module(
			"PAA1-PAA2 Arithmetic Foundations",
			[
				lesson(
					"Negative Numbers, Order of Operations, and Absolute Value",
					overview({
						title: "Signed numbers extend the number line below zero, order of operations keeps multi-step expressions unambiguous, and absolute value measures distance from zero.",
						concepts: [
							"Negative numbers represent positions or changes below a reference point, such as depth, loss, temperature, or debt.",
							"Absolute value is distance, so |−7| and |7| both equal 7 even though the original positions are different.",
							"Order of operations groups calculation decisions: parentheses first, exponents next, multiplication/division left to right, then addition/subtraction left to right."
						],
						practice:
							"Trace each expression in stages. Write one line per operation so the calculation path is visible instead of relying on mental arithmetic.",
						check: "A correct explanation identifies the reference point, labels positive and negative directions, and justifies the operation order used in a multi-step expression."
					})
				)
			],
			[
				lesson(
					"Project: High and Low Species",
					project({
						title: "PAA2 Module Project: High and Low Species",
						goal: "Model animal heights and depths on a vertical number line, then use absolute value and signed arithmetic to reason about habitat placement.",
						steps: [
							"Find three animals that live or move above ground and three that live or move below ground or underwater.",
							"Choose zero on the vertical number line and explain what it represents.",
							"Place each animal as a positive or negative value and calculate distance from the ground.",
							"Design a habitat tower with above-ground roosts and an underground foundation that avoids the lowest habitat.",
							"Write a short recommendation for a building plan that accounts for animal habitat impact."
						],
						evidence:
							"The diagram uses positive and negative positions consistently, includes at least six animal placements, and calculates the full tower distance from bottom to top."
					})
				)
			]
		),
		module(
			"PAA3-PAA7 Fractions and Arithmetic",
			[
				lesson(
					"Long Multiplication, Long Division, and Fraction Structure",
					overview({
						title: "Multi-digit arithmetic and fraction structure build the accuracy needed for later algebra.",
						concepts: [
							"Long multiplication separates place-value products before combining them into one total.",
							"Long division tracks how many groups fit, what remains, and how the remainder can continue as a decimal or fraction.",
							"A fraction names a numerator, denominator, and whole; simplifying divides numerator and denominator by the same common factor.",
							"Equivalent fractions represent the same quantity even when the numerator and denominator look different."
						],
						practice:
							"Use one worked example with place-value labels, then compare a fraction model, a numeric fraction, and a simplified result.",
						check: "A correct solution preserves value while simplifying, explains the remainder, and catches common denominator or place-value mistakes."
					})
				),
				lesson(
					"Multiplying, Dividing, Adding, and Subtracting Fractions",
					overview({
						title: "Fraction operations depend on the operation being used, not on one universal rule.",
						concepts: [
							"Multiplying fractions multiplies numerators and denominators, with simplification available before or after multiplying.",
							"Dividing by a fraction means multiplying by its reciprocal because the question asks how many of one fractional amount fit inside another.",
							"Adding and subtracting fractions require common denominators because the pieces being combined must have the same size.",
							"Mixed numbers can be rewritten as improper fractions when multiplication or division is easier in that form."
						],
						practice:
							"Classify each problem by operation first, then write the required denominator or reciprocal step before calculating.",
						check: "A complete response states why a common denominator is or is not needed and leaves the final value simplified."
					})
				)
			],
			[
				lesson(
					"Project: Mochi's Product Adventure",
					project({
						title: "PAA7 Module Project: Mochi's Amazon Adventure",
						goal: "Use fractions to allocate a large product supply, compare store shares, and model follow-up demand.",
						steps: [
							"Create a table for four product categories and four stores with different preferences.",
							"Allocate the starting supply across stores and record each store's fraction of each product.",
							"Compare which store receives the greatest share of each product and represent the result with a chart.",
							"Apply fractional demand increases such as 12/10, 5/4, and 14/8 to calculate additional units.",
							"Summarize the most popular and least popular products using totals from the first and second orders."
						],
						evidence:
							"The allocation table, fraction comparisons, chart, and demand calculations use consistent totals and distinguish first-order supply from new demand."
					}),
					"https://www.youtube.com/watch?v=8nKPC-WmLjU"
				)
			]
		),
		module(
			"PAA8-PAA12 Decimals, Percents, Ratios, and Rates",
			[
				lesson(
					"Decimals and Percents",
					overview({
						title: "Decimals and percents are alternate representations of place value, parts of a whole, and change.",
						concepts: [
							"Decimal place value extends tenths, hundredths, and thousandths to the right of the decimal point.",
							"Multiplying and dividing decimals uses ordinary arithmetic plus a place-value check on the final answer.",
							"A percent means out of 100; 30% is the same as 30/100 or 0.30.",
							"Percent change compares the change amount with the original amount, not the new amount."
						],
						practice:
							"Convert among fraction, decimal, and percent forms, then apply each representation to a money or measurement context.",
						check: "A correct percent response names the original quantity, the change, and the final interpretation in context."
					})
				),
				lesson(
					"Ratios, Proportions, Unit Conversions, and Distance-Rate-Time",
					overview({
						title: "Ratios compare quantities, proportions state two ratios are equal, conversions change units, and distance problems connect d = rt.",
						concepts: [
							"A ratio compares two quantities in a fixed relationship, such as cups of flour to batches of cookies.",
							"A proportion uses equivalent ratios to solve for an unknown value.",
							"Unit conversion multiplies by a form of 1 so the value stays the same while the unit changes.",
							"Distance-rate-time problems use d = rt and can be reorganized to find distance, rate, or time."
						],
						practice:
							"Write units in every step. Cancel units during conversions and label which variable is unknown in d = rt problems.",
						check: "A correct solution has matching units, a proportion or formula setup, and a reasonableness check on the final magnitude."
					})
				)
			],
			[
				lesson(
					"Project: Cookie Catering",
					project({
						title: "PAA11 Module Project: Cookie Catering",
						goal: "Use decimals, percents, ratios, and unit conversions to plan a cookie catering order.",
						steps: [
							"Build a cookie order table with quantities, unit prices, and total revenue.",
							"Calculate ingredient or packaging costs and compare cost with selling price.",
							"Use a percent target to decide whether the planned price meets a profit goal.",
							"Scale a recipe up or down with ratios and proportions.",
							"Convert units when ingredient amounts or time estimates use different measurement systems."
						],
						evidence:
							"The catering plan includes a price table, scaled recipe calculation, percent-profit explanation, and one unit-conversion check."
					})
				),
				lesson(
					"Challenge: Rate-Time-Distance Route Plan",
					project({
						title: "PAA12 Rate-Time-Distance Problems",
						goal: "Compare routes or delivery schedules using d = rt and advanced rate-time-distance reasoning.",
						steps: [
							"Choose two routes with different distances, speeds, or travel times.",
							"Write the known distance, rate, and time values with units.",
							"Solve for the missing value in each route.",
							"Compare the routes and explain which value controlled the decision.",
							"Add one challenge case with a stop, delay, or speed change."
						],
						evidence:
							"The route comparison shows formulas, units, solved values, and a final recommendation backed by calculations."
					})
				)
			]
		),
		module("Check-In #1", [
			lesson(
				"Arithmetic and Ratio Readiness Check",
				[
					"Check-In #1 reviews the first half of Pre-Algebra A: signed numbers, order of operations, absolute value, long multiplication, long division, fraction operations, decimals, percents, ratios, proportions, conversions, and rate-time-distance problems.",
					"Useful evidence includes one clean worked example from each topic, one corrected error, and one short written explanation connecting a representation to the calculation.",
					"Additional practice can target the first topic that breaks the reasoning chain: number-line placement, denominator selection, decimal place value, percent baseline, unit cancellation, or d = rt setup."
				].join("\n\n")
			)
		]),
		module(
			"PAA13-PAA17 Expressions and Sequences",
			[
				lesson(
					"Variables, Expressions, Grouping, Distribution, and Factoring",
					overview({
						title: "Variables make arithmetic general, grouping controls order, and distribution/factoring move between expanded and grouped forms.",
						concepts: [
							"A variable represents a value that can change or an unknown value to solve for.",
							"Combining like terms works only when the variable part matches.",
							"Parentheses group a repeated quantity or a shared operation.",
							"The distributive property rewrites a(b + c) as ab + ac, and factoring reverses that move."
						],
						practice:
							"Color-code like terms, rewrite one expression in expanded form, then factor it back to prove the two forms are equivalent.",
						check: "A correct explanation names the common factor or like-term structure and verifies equivalence with a substitution."
					})
				),
				lesson(
					"Arithmetic Sequences and Sums",
					overview({
						title: "Arithmetic sequences grow by a constant difference, and arithmetic sums combine many terms efficiently.",
						concepts: [
							"The common difference is the amount added or subtracted each step.",
							"An nth-term rule uses the starting value, common difference, and term number.",
							"A sequence table makes it easier to distinguish term number from term value.",
							"Arithmetic sums can be found by pairing first and last terms when the sequence structure is clear."
						],
						practice:
							"Create a table for term number and value, write the rule, test it on a known term, then use it to predict a later term.",
						check: "A complete sequence response separates the week or term number from the amount being counted."
					})
				)
			],
			[
				lesson(
					"Project: Designing the Perfect Scanning Device",
					project({
						title: "PAA17 Module Project: Designing the Perfect Scanning Device",
						goal: "Use variables, expressions, sequences, grouping, distribution, and factoring to design and evaluate a scanning-device model.",
						steps: [
							"Define variables for scan time, item count, setup time, and repeated work.",
							"Write expressions for at least two scanning strategies.",
							"Use sequence reasoning when scan counts grow by a constant amount.",
							"Rewrite one expression with distribution and one with factoring.",
							"Compare the models and identify which strategy scales better."
						],
						evidence:
							"The device proposal includes named variables, equivalent expression forms, a sequence rule or table, and a comparison based on calculated outputs."
					})
				)
			]
		),
		module(
			"PAA18-PAA23 Exponents, Roots, and Scientific Notation",
			[
				lesson(
					"Exponent Rules, Nonpositive Exponents, Roots, and Fractional Exponents",
					overview({
						title: "Exponent notation records repeated multiplication, while roots reverse powers and fractional exponents combine both ideas.",
						concepts: [
							"A positive whole-number exponent counts repeated multiplication by the same base.",
							"When multiplying powers with the same base, add exponents; when dividing powers with the same base, subtract exponents.",
							"A zero exponent equals 1 for any nonzero base because the quotient rule leaves no factors behind.",
							"A negative exponent represents a reciprocal power.",
							"A square root asks which value squared gives the radicand; fractional exponents connect roots and powers."
						],
						practice:
							"Rewrite each expression in expanded form first, then simplify with exponent rules and compare the two paths.",
						check: "A correct response names the base, the exponent rule used, and any restriction such as a nonzero base."
					})
				),
				lesson(
					"Scientific Notation and Scale",
					overview({
						title: "Scientific notation writes very large or very small values as a number between 1 and 10 times a power of 10.",
						concepts: [
							"Positive powers of 10 move the decimal point to create large values.",
							"Negative powers of 10 move the decimal point to create small values.",
							"The coefficient carries the measured digits while the power of 10 carries scale.",
							"Scientific notation is useful for comparing quantities with very different sizes."
						],
						practice:
							"Convert ordinary notation to scientific notation and back, then compare two values by coefficient and exponent.",
						check: "A correct conversion keeps the coefficient between 1 and 10 and keeps the same value."
					})
				)
			],
			[
				lesson(
					"Project: Symptom Spree",
					project({
						title: "PAA22 Module Project: Symptom Spree",
						goal: "Use exponent rules, roots, and scale reasoning in a symptom-spread or population-growth scenario.",
						steps: [
							"Choose a starting amount and a repeated growth or shrink factor.",
							"Write an exponential expression for several stages.",
							"Use exponent rules to simplify or compare stages.",
							"Translate one large or small value into scientific notation.",
							"Explain what the model captures and what real-world detail it leaves out."
						],
						evidence:
							"The model includes exponent expressions, at least one simplified comparison, a scientific-notation value, and a sentence about model limits."
					})
				),
				lesson(
					"Project: Red Hot Chilli Chicken",
					project({
						title: "PAA23 Module Project: Red Hot Chilli Chicken",
						goal: "Use exponents, roots, ratios, and scale to model a spicy-food challenge or recipe-growth scenario.",
						steps: [
							"Define a spice scale or recipe scale with a starting value.",
							"Use powers or roots to model repeated increases, decreases, or comparisons.",
							"Convert one extreme value into scientific notation.",
							"Compare two recipes or challenge levels using ratios.",
							"Write a recommendation backed by the calculations."
						],
						evidence:
							"The recommendation includes a scale definition, exponent or root calculation, scientific notation, ratio comparison, and a reasonableness check."
					})
				)
			]
		),
		module("Check-In #2 and Capstone", [
			lesson(
				"Expressions and Exponents Readiness Check",
				[
					"Check-In #2 reviews expressions with variables, arithmetic sequences, grouping, distribution, factoring, exponent rules, roots, fractional exponents, and scientific notation.",
					"A useful readiness sample includes one simplification, one factored expression, one sequence rule, one exponent-rule explanation, one root calculation, and one scientific-notation conversion.",
					"The strongest evidence is not only a correct answer; it is a traceable chain of equivalent expressions."
				].join("\n\n")
			),
			lesson(
				"Master Project: Pre-Algebra A",
				project({
					title: "PAA24 Master Project: Pre-Algebra A",
					goal: "Design a final math project that combines arithmetic, fractions, decimals, percents, ratios, expressions, sequences, exponents, and radicals in one coherent scenario.",
					steps: [
						"Choose a scenario such as a business plan, science model, sports analysis, travel plan, game system, or recipe design.",
						"Include at least one calculation from each major course strand.",
						"Use a table, diagram, graph, or number-line model to make the reasoning visible.",
						"Add one deliberate error-analysis section that identifies and corrects a plausible mistake.",
						"End with a short reflection naming the topic that improved most and the topic that still needs practice."
					],
					evidence:
						"The capstone contains multiple representations, labeled calculations, one error correction, and a final explanation connecting the scenario to the math."
				})
			),
			lesson(
				"Pre-Algebra A Capstone Reference Map",
				sourceAnchor({
					title: "Pre-Algebra A Capstone",
					references: [
						"The capstone asks for one course module or concept that was especially challenging or exciting.",
						"The final explanation covers purpose, real-world application, and at least 2 student-created problems using course content.",
						"The current version keeps the same reflection and created-problem requirements without requiring platform-specific recording tools."
					],
					evidence: [
						"Selected concept is named and connected to a real-world use.",
						"At least 2 student-created problems include complete solutions.",
						"Reflection identifies the strongest growth area and one remaining practice check."
					]
				})
			)
		]),
		{
			kind: "appendix",
			title: "Pre-Algebra A Reference Archive",
			curriculum: [
				lesson(
					"Pre-Algebra A Reference Map",
					[
						sourceAnchor({
							title: "High and Low Species",
							references: [
								"Giselle Herrera and the Rockaway Initiative for Sustainability & Equity frame the ecosystem and neighborhood-impact context.",
								"Mission 1 asks for 3 animals that climb or fly high and 3 animals that dig or swim underground.",
								"Animal elevation or depth is represented with positive and negative numbers on a vertical number line.",
								"Mission 2 compares neighborhood buildings, crowding, and animal habitat impact before placing a tower with roosts.",
								"The underground foundation calculation uses the lowest animal habitat depth, doubles that distance, then digs another 15 feet."
							],
							evidence: [
								"Zero on the number line is defined as the reference elevation.",
								"Animal positions and distances from ground are calculated.",
								"Tower height, foundation depth, total tower length, and ecosystem recommendation are connected."
							]
						}),
						sourceAnchor({
							title: "Mochi's Amazon Adventure",
							references: [
								"Nikita Jain works as a product manager at Amazon, and Mochi inspires the pet-toy product line.",
								"Warehouse supplies include 12 million pink ropes, 20 million white and blue blankets, 24 million stuffed rhinos, and 8 million treat toys.",
								"Store preferences reference Cute Puppiez, Dogs 4 Lyfe, WoofWoof, and Who Let the Dogs Out?.",
								"New demand uses multipliers including 12/10, 13/10, 5/4, 9/6, 14/11, 14/8, and 15/13.",
								"The challenge asks for a pie chart showing the product breakdown from first and second orders."
							],
							evidence: [
								"Allocation strategy is explained before store fractions are calculated.",
								"Most-units and total-product fractions are recorded for each store or product.",
								"Additional-production totals identify the most popular and least popular products."
							]
						}),
						sourceAnchor({
							title: "Cookie Catering",
							references: [
								"Chipidee Cookies supplies the event-catering context.",
								"Cookie combinations draw from dough choices vanilla, chocolate, and strawberry; toppings chocolate chips, sprinkles, and marshmallows; colors purple, green, and pink; and shapes star, square, and classic circle.",
								"The batch contains 300 cookies, 2 tablespoons of dough make 1 cookie, and the dough-to-topping ratio is 2 tablespoons to 1 tablespoon.",
								"Flour scaling uses 2.25 cups of flour for 24 cookies and 0.29 pounds per cup.",
								"Per-cookie dough costs are $1.35 for vanilla, $1.62 for chocolate, and $1.74 for strawberry.",
								"Catering packages have base prices of $100, $150, and $250; the event sample uses 32 people taking one cookie type and 76 people taking the other."
							],
							evidence: [
								"Cookie quantities, percentages, and drawings match the selected combinations.",
								"Topping and flour calculations preserve the unit ratios.",
								"Package prices include cookie cost plus at least 30% profit and the event-consumption fractions."
							]
						}),
						sourceAnchor({
							title: "Designing the Perfect Scanning Device",
							references: [
								"Aviv Gilboa and Ring frame the customer-discovery and smart-home-security context.",
								"Device options include finger scanning, face scanning, and phone scanning.",
								"Weekly prototype sales are finger scanner 4, 11, 18, 25; face scanner 7, 11, 15, 19; and phone scanner 2, 7, 12, 17.",
								"The final product spec includes two color options, one shape, and different prices for each color.",
								"Expression work includes 6 customers buying both colors and a voice-feature option with 8 original devices for every 6 voice-featured devices sold each week."
							],
							evidence: [
								"Pros-and-cons notes and sketches distinguish the three scanner options.",
								"Sequence predictions identify the most popular and least popular prototype after 6 weeks.",
								"Variable expressions model color revenue and weekly original-plus-voice-feature sales."
							]
						}),
						sourceAnchor({
							title: "Symptom Spree",
							references: [
								"Michelle Lee's radiology-resident context compares side effects from x-rays, MRIs, PET scans, CT scans, and CAT scans.",
								"The x-ray symptom-score table uses 10, 20, 30, 40, and 50 minutes with scores 4, 16, 64, 256, and 1024.",
								"The x-ray baseline is modeled as t^4.",
								"PET scans raise the baseline to the 1/5 power and multiply by t.",
								"MRIs take the square root and divide by t^(3/2), CT scans multiply by t^-1 and take the 7th root, and CAT scans raise to the 3rd power then divide by t^(2/3).",
								"Desmos is used as an optional graphing tool for comparing the trends."
							],
							evidence: [
								"Research notes list 3 to 5 possible side effects from x-rays and PET scans.",
								"Growth-pattern explanation connects the table to exponential notation.",
								"Final growth-rate expressions and graph comparisons identify the most concerning trend."
							]
						}),
						sourceAnchor({
							title: "Red Hot Chilli Chicken",
							references: [
								"Juan Miguel Artal, Roman Perez, and Red Hot Chilli Chicken frame the sales-analysis context.",
								"Mission 1 uses sandwich orders: Dani California 615, Tell Me Baby 123, Californication 246, The Classic 369, and total 1,353.",
								"The new-sandwich analysis uses 1/3 of The Classic customers and a total-order increase to 2,706.",
								"Pop-up shop comparisons use 2 weeks for 123 new orders in one neighborhood and 3 weeks for 246 new orders in another.",
								"Mission 2 starts with 53 new active orders per month and models future months as 53^2, 53^3, and continuing powers until crossing 1 million and 1 billion orders."
							],
							evidence: [
								"Order proportions are calculated for each sandwich.",
								"New-sandwich audience and pop-up growth comparisons are shown with arithmetic.",
								"Exponential growth estimate includes month counts for 1 million and 1 billion active orders."
							]
						})
					].join("\n\n")
				)
			],
			supplementalProjects: []
		},
		{
			kind: "appendix",
			title: "Pending Static Assets",
			curriculum: [
				lesson(
					"Pre-Algebra A Asset Status",
					[
						"This course lists pending static assets below. The kickoff images are already represented in project cards; the PAA1 problem-set diagram keeps a stable static media URL until the file is added.",
						...PRE_ALGEBRA_A_PENDING_SOURCE_ASSETS.map(
							filename =>
								`- ${staticMediaUrl(filename)}\n\n${pendingStaticMediaNotice(filename)}`
						)
					].join("\n\n")
				)
			],
			supplementalProjects: []
		}
	],
	developmentMetadata: {
		priority: "soon",
		standards: [
			"Common Core middle-school number system, expressions, equations, ratios, proportional relationships, and early functions readiness",
			"Pre-algebra readiness for Algebra 1A"
		],
		sourcePolicy:
			"Adapted from the Pre-Algebra A sequence with neutral wording, course-linked projects, and pending static-media entries for unavailable kickoff images.",
		assessmentCadence: [
			"Kickoff readiness map",
			"Check-In #1 after arithmetic, fractions, decimals, percents, ratios, and rates",
			"Check-In #2 before the final capstone"
		],
		toolchain: [
			"Notebook or shared document",
			"Calculator when arithmetic is not the target skill",
			"Pending static-media entries for diagrams and tables"
		],
		safetyPolicy: [
			"No physical materials required",
			"External videos are optional context, not required experiments"
		],
		courseBoundaries: [
			"Focuses on pre-algebra foundations rather than full Algebra 1 graphing and systems",
			"Avoids instructor-portal operations and private platform references"
		],
		capstoneExpectations: [
			"At least one calculation from each major course strand",
			"At least one table, diagram, graph, or number-line model",
			"One error-analysis section with corrected reasoning"
		],
		recommendedNextWork: [
			"Keep the Pre-Algebra B entry diagnostic aligned with this course's capstone evidence and remaining-practice reflection",
			"Create printable number-line, fraction-model, ratio-table, and exponent error-analysis sheets for the core checkpoints",
			"Upload reserved kickoff images to the static classes host"
		]
	}
};

configureMathCourseFlow(preAlgebraACourse, {
	courseId: "pre-algebra-a",
	modules: [
		{
			title: "Pre-Algebra A Kick-Off",
			estimatedTime: "1–2 sessions · 45–60 minutes each",
			keyBlocks: [
				"readiness inventory",
				"worked evidence",
				"error analysis",
				"placement decision",
				"practice goal"
			],
			flowNote:
				"Complete the short readiness inventory first, correct one error, and name the first skill that needs review. Choose Starting a Gardening Business for a broader applied diagnostic or Growing the Gardening Business for an additional challenge; completing both projects is not required before instruction begins.",
			choiceCurriculumTitles: ["Project: Starting a Gardening Business"],
			challengeCurriculumTitles: [
				"Project: Growing the Gardening Business"
			]
		},
		{
			title: "PAA1-PAA2 Arithmetic Foundations",
			estimatedTime: "2 sessions · 45–60 minutes each",
			keyBlocks: [
				"signed number",
				"number line",
				"absolute value",
				"order of operations",
				"reasonableness check"
			],
			flowNote:
				"Model signed values on a labeled number line before calculating, then show one operation per line. Use High and Low Species only after the reference point, sign, and absolute distance can each be explained."
		},
		{
			title: "PAA3-PAA7 Fractions and Arithmetic",
			estimatedTime: "3–4 sessions · 45–60 minutes each",
			keyBlocks: [
				"place value",
				"quotient / remainder",
				"equivalent fraction",
				"common denominator",
				"reciprocal"
			],
			flowNote:
				"Secure multi-digit multiplication and division before combining fraction operations. Include a visual or verbal reason for the common-denominator or reciprocal step, then use Mochi's Product Adventure as choose-one transfer practice."
		},
		{
			title: "PAA8-PAA12 Decimals, Percents, Ratios, and Rates",
			estimatedTime: "3–4 sessions · 45–60 minutes each",
			keyBlocks: [
				"fraction / decimal / percent",
				"ratio table",
				"proportion",
				"unit conversion",
				"distance = rate × time"
			],
			flowNote:
				"Keep units attached through every conversion and identify the original quantity before calculating a percent change. Cookie Catering is the applied choice; the route plan is a challenge after proportional and unit reasoning is dependable.",
			challengeSupplementalTitles: [
				"Challenge: Rate-Time-Distance Route Plan"
			]
		},
		{
			title: "Check-In #1",
			estimatedTime: "1 session · 45–60 minutes",
			keyBlocks: [
				"signed arithmetic",
				"fraction operation",
				"decimal / percent",
				"ratio / proportion",
				"unit-aware explanation"
			],
			flowNote:
				"Attempt the mixed evidence set without notes, correct one error with a named reason, and assign only the smallest review strand that remains unstable. Continue when the model, calculation, units, and explanation agree."
		},
		{
			title: "PAA13-PAA17 Expressions and Sequences",
			estimatedTime: "3 sessions · 45–60 minutes each",
			keyBlocks: [
				"variable",
				"like terms",
				"distributive property",
				"factoring",
				"arithmetic sequence"
			],
			flowNote:
				"Move between words, tables, and equivalent expressions before using a formula. Verify distribution by factoring back and verify an arithmetic-sequence rule against at least two known terms."
		},
		{
			title: "PAA18-PAA23 Exponents, Roots, and Scientific Notation",
			estimatedTime: "3–4 sessions · 45–60 minutes each",
			keyBlocks: [
				"exponent rule",
				"zero / negative exponent",
				"root",
				"fractional exponent",
				"scientific notation"
			],
			flowNote:
				"Expand one example before applying each exponent rule, state base restrictions, and check scale when converting scientific notation. Choose Symptom Spree for supported transfer or Red Hot Chilli Chicken for a broader modeling challenge.",
			challengeSupplementalTitles: ["Project: Red Hot Chilli Chicken"]
		},
		{
			title: "Check-In #2 and Capstone",
			estimatedTime: "3 sessions · 45–60 minutes each",
			keyBlocks: [
				"mixed readiness gate",
				"multiple representations",
				"error analysis",
				"capstone evidence",
				"Pre-Algebra B handoff"
			],
			flowNote:
				"Pass the expressions-and-exponents readiness sample before beginning the capstone. The capstone must connect every major strand, include one corrected error, and end with a handoff note naming evidence that is secure and one target to revisit in Pre-Algebra B."
		}
	],
	appendixTitles: ["Pre-Algebra A Reference Archive", "Pending Static Assets"]
});
