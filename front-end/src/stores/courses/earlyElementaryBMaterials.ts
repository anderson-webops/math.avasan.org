import type { ElementaryMaterial } from "./earlyElementaryAMaterials";

export const earlyElementaryBMaterials: ElementaryMaterial[] = [
	{
		code: "EEB1",
		method: "A digit's position tells its value: a hundred contains ten tens, and a ten contains ten ones. Write each number as hundreds, tens and ones. Add like places. Exchange ten ones for a ten or ten tens for a hundred. For subtraction, exchange a larger unit when the smaller place has too few. Check a difference by adding it to the amount removed.",
		worked: "For 246 + 178, add 200 + 100 = 300, 40 + 70 = 110 and 6 + 8 = 14. Their total is 424. Check by subtracting: 424 - 178 = 246. An estimate of 250 + 180 = 430 is close.",
		tasks: [
			{
				title: "Millionaire Block Strategy Review",
				prompt: "Represent 119 and 232 with hundreds, tens and ones, or expanded form. Find 119 + 232 and 232 - 119. Name every exchange and check the difference by addition.",
				anchor: "millionaire-block-strategy-review"
			}
		],
		practice: {
			prompt: "Find 367 + 258 and 625 - 258 with place-value work.",
			anchor: "eeb1-practice"
		},
		challenge: {
			prompt: "Find 800 - 357. Explain both exchanges across zero places.",
			anchor: "eeb1-challenge"
		}
	},
	{
		code: "EEB2",
		method: "Decomposition splits a number into place-value parts. Compensation changes a number to a nearby easy number, then corrects that change. A running total carries the previous total into the next step. Write gains as additions and penalties as subtractions; keep the meaning of each score unit when exchanging ones, tens and hundreds.",
		worked: "To find 398 + 157, first use 400 + 157 = 557. The first number was increased by two, so subtract two: 555. Decomposition gives 398 + 100 + 50 + 7 = 555 as well.",
		tasks: [
			{
				title: "Skee-Ball Record Challenge",
				prompt: "Use this classroom scoring rule: outer hole +1 point, inner +10, bullseye +100, missed hole -10, outside the play area -100. Round 1: 3 outer, 2 inner, 1 bullseye. Round 2: 4 outer, 3 inner, 2 bullseyes, 1 miss. Round 3: 5 inner, 1 bullseye, 1 outside. Round 4: 6 outer, 2 inner, 1 bullseye, 1 miss. Round 5: 4 inner, 3 bullseyes, 1 miss, 1 outside. Start at zero. Find each round score, running totals and the difference from the 870-point record. Compare two strategies for one addition.",
				anchor: "skee-ball-record-challenge"
			}
		],
		practice: {
			prompt: "Find 497 + 126 by decomposition and compensation.",
			anchor: "eeb2-practice"
		},
		challenge: {
			prompt: "A score is 650. A round adds 198 points and loses 49. Find the final score using nearby hundreds or tens.",
			anchor: "eeb2-challenge"
		}
	},
	{
		code: "EEB3",
		method: "Multiplication counts equal groups: groups multiplied by items per group gives the total. Division can find either the number of groups or the size of each group. An array has equal rows and columns. Related facts use the same three numbers; seven groups of six total 42, so 42 divided into sixes gives seven groups.",
		worked: "Draw four rows of six counters. There are 4 \u00D7 6 = 24 counters. Sharing those counters into four equal groups gives 24 \u00F7 4 = 6 in each; making groups of six gives 24 \u00F7 6 = 4 groups.",
		tasks: [
			{
				title: "Recycling Game Show Score Sheet",
				prompt: "Small boxes earn 2 points, medium 4 and large 6 in this classroom game. Find the scores for 4 small boxes and 5 small boxes. Compare 7 small plus 1 medium with 1 large plus 5 small. Find the number of 6-point boxes needed for 42 points. Draw an equal-groups model for one answer.",
				anchor: "recycling-game-show-score-sheet"
			}
		],
		practice: {
			prompt: "Draw 5 groups of 7. Write the multiplication and both related division facts.",
			anchor: "eeb3-practice"
		},
		challenge: {
			prompt: "There are 56 points from only 4-point boxes. Find the box count; then regroup the same points into 7-point boxes.",
			anchor: "eeb3-challenge"
		}
	},
	{
		code: "EEB4",
		method: "Commutativity switches multiplication's factors: a \u00D7 b = b \u00D7 a. Associativity changes grouping in three factors: (a \u00D7 b) \u00D7 c = a \u00D7 (b \u00D7 c). Distribution splits a group size: a \u00D7 (b + c) = a \u00D7 b + a \u00D7 c. Division reverses multiplication, but changing division's order or grouping can change the answer.",
		worked: "Three rows of seven can be split into three rows of five and three rows of two: 3 \u00D7 7 = 3 \u00D7 5 + 3 \u00D7 2 = 15 + 6 = 21. Rotating the original array gives 7 \u00D7 3, still 21. In contrast, 12 \u00F7 3 = 4 while 3 \u00F7 12 is not four.",
		tasks: [
			{
				title: "Twenty-Seven Character Array Properties",
				prompt: "Draw 27 characters as 3 rows of 9 and as 9 rows of 3. Compare (3 \u00D7 3) \u00D7 3 with 3 \u00D7 (3 \u00D7 3). Add 2 characters to every row of the 3-row array and write a distributive equation. Finally arrange 15 characters in groups of 5 and write the inverse multiplication check.",
				anchor: "twenty-seven-character-array-properties"
			}
		],
		practice: {
			prompt: "Split 6 \u00D7 8 into 6 \u00D7 5 and 6 \u00D7 3. Name the property.",
			anchor: "eeb4-practice"
		},
		challenge: {
			prompt: "Compare 24 \u00F7 6 with 6 \u00F7 24. Explain whether the commutative property applies to division.",
			anchor: "eeb4-challenge"
		}
	},
	{
		code: "EEB5",
		method: "Identify the number of equal groups, each group size and the total. Use multiplication when both group values are known; divide the total by the known group value to find the missing one. State what a remainder means in the story. A labeled picture helps distinguish pieces of food from plates, people or packages.",
		worked: "Six plates hold three pieces each, so 6 \u00D7 3 = 18 pieces. If each guest needs two pieces, 18 \u00F7 2 = 9 guests can be served. Nine is a count of guests, not a count of plates.",
		tasks: [
			{
				title: "Cookout Equal Groups and Missing Amounts",
				prompt: "Serve exactly 20 people two food pieces each. Each box contains 8 pieces. Find the pieces and boxes needed, then set up one plate per person. After half the plates are taken, find plates and pieces left and write a repeated-addition equation. Dessert comes in boxes of 5 ice cream sandwiches; each person gets one. Finally share 100 goody-bag items equally among the 20 people.",
				anchor: "cookout-equal-groups-and-missing-amounts"
			}
		],
		practice: {
			prompt: "Six tables seat 4 people each. Each person receives 3 counters. Find people and counters.",
			anchor: "eeb5-practice"
		},
		challenge: {
			prompt: "There are 29 sandwiches, and each picnic box holds 4. Find full boxes, leftover sandwiches and boxes needed to pack all sandwiches.",
			anchor: "eeb5-challenge"
		}
	},
	{
		code: "EEB6",
		method: "Evaluate parentheses first, then multiplication and division from left to right, then addition and subtraction from left to right. A turn-by-turn change acts on the current score, so use parentheses when combining successive changes into one expression. Division in this board game is allowed only when the result is a whole number; the supplied rule leaves the score unchanged otherwise.",
		worked: "8 + 3 \u00D7 4 = 8 + 12 = 20, while (8 + 3) \u00D7 4 = 11 \u00D7 4 = 44. In the first expression only three is multiplied; in the second the entire sum is multiplied. For 24 \u00F7 3 \u00D7 2, work left to right: 8 \u00D7 2 = 16.",
		tasks: [
			{
				title: "Board Game Expression Tracker",
				prompt: "Draw six numbered spaces. Their score effects are 1: add 4; 2: multiply by 2; 3: subtract 3; 4: divide by 2; 5: add 6; 6: multiply by 3. Start before space 1 with score 8. Supplied die rolls are 1, 1, 2, 1, 1; apply only the space landed on. Record each position, score and a single parenthesized expression for the full game. On a separate turn, try space 4 with score 15; an inexact whole-number division leaves the score unchanged. Compare 8 + 4 \u00D7 2 with (8 + 4) \u00D7 2.",
				anchor: "board-game-expression-tracker"
			}
		],
		practice: {
			prompt: "Evaluate 18 \u00F7 3 + 2 \u00D7 4 and (18 \u00F7 3 + 2) \u00D7 4.",
			anchor: "eeb6-practice"
		},
		challenge: {
			prompt: "Evaluate 36 \u00F7 3 \u00D7 2. Explain why doing 3 \u00D7 2 first would change the expression.",
			anchor: "eeb6-challenge"
		}
	},
	{
		code: "EEB7",
		method: "A multiple of ten is a whole number of tens. Multiplying a whole number by ten changes each unit into a group of ten. Use a known fact with tens: 4 \u00D7 30 means four groups of three tens, or twelve tens. The result 120 follows from place value, which also explains the final zero.",
		worked: "6 \u00D7 4 = 24 ones. Therefore 6 \u00D7 40 = 24 tens = 240. The number of groups stays six; each group becomes ten times as large.",
		tasks: [
			{
				title: "Multiples of Ten Block Comparison",
				prompt: "Use 3 as the starting number. Draw or describe block models for 3 \u00D7 2, 3 \u00D7 4 and 3 \u00D7 6. Then compare 3 \u00D7 20, 3 \u00D7 40 and 3 \u00D7 60. Explain what each single block represents in the second row.",
				anchor: "multiples-of-ten-block-comparison"
			}
		],
		practice: {
			prompt: "Use 7 \u00D7 3 to find 7 \u00D7 30.",
			anchor: "eeb7-practice"
		},
		challenge: {
			prompt: "Compare 4 \u00D7 50 with 5 \u00D7 40. Give a place-value explanation.",
			anchor: "eeb7-challenge"
		}
	},
	{
		code: "EEB8",
		method: "A rate states an amount for one unit or interval. Four weeks contain 4 \u00D7 7 = 28 days; six weeks contain 42. Count complete intervals before multiplying an amount by their number. Multiply quantity by price only after matching the units. A half is one of two equal parts: 23 divided by two is eleven wholes and one half. Two days at eleven and a half units per day use 23 units.",
		worked: "An item used every two days has 28 \u00F7 2 = 14 complete intervals in four weeks. At three counters per interval it needs 14 \u00D7 3 = 42 counters. At 5 cents each, the cost is 210 cents, or two dollars and ten cents.",
		tasks: [
			{
				title: "Fritz Four-Week Dosage Budget",
				prompt: "All medicine names, schedules and prices in this table belong to a fictional arithmetic case. For a 28-day trip, Vitamin D uses 1 pill daily at 30 cents per pill; Iron uses 2 pills per 2-day interval at 10 cents per pill; CoQ10 uses 1 pill daily at 20 cents per pill. The fictional steroid rule is 1 milligram per kilogram per day, with a 16-kilogram case weight and 5 cents per milligram. Find each quantity, each cost in cents and the combined cost. Treat the 28 days as 14 complete two-day intervals.",
				anchor: "fritz-four-week-dosage-budget"
			},
			{
				title: "Fritz Updated Dosage Plan",
				prompt: "Continue only the fictional arithmetic case. An Iron bottle holds 96 pills; each 3-day interval uses 3 pills, taken at the interval's start. Find the number of complete intervals and days covered. A separate revised steroid rule uses 1 milligram per 2 kilograms per day for a 23-kilogram case weight. Find the daily amount as wholes and halves, then the total over 42 days. Pair the days to keep the total calculation in whole numbers.",
				anchor: "fritz-updated-dosage-plan"
			}
		],
		practice: {
			prompt: "A classroom machine uses 3 tokens every 2 days. Find tokens for 14 days and the cost at 4 cents per token.",
			anchor: "eeb8-practice"
		},
		challenge: {
			prompt: "A machine uses 5 half-units per day for 8 days. Find the total in whole units using pairs of days.",
			anchor: "eeb8-challenge"
		}
	},
	{
		code: "check-1",
		method: "Choose operations by the quantities in the question. Place value supports addition and subtraction; equal groups support multiplication and division. Keep units on totals, use parentheses to show grouping, and verify an answer with an inverse operation or another model. Review a skill when its model or explanation is missing.",
		worked: "For 6 trays with 4 cups on each, 6 \u00D7 4 = 24 cups. After 7 are removed, 24 - 7 = 17 cups. The combined expression is 6 \u00D7 4 - 7; adding back seven checks the second step.",
		tasks: [
			{
				title: "Operations and Multiplication Check",
				prompt: "Solve and show a model or named strategy for at least three answers: (1) 468 + 257; (2) 803 - 468; (3) 7 groups of 8; (4) 63 items in groups of 9; (5) split 4 \u00D7 7 into 4 \u00D7 5 and 4 \u00D7 2; (6) 9 + 3 \u00D7 6; (7) (9 + 3) \u00D7 6; (8) 8 \u00D7 40. Label counts where a story is given.",
				anchor: "operations-and-multiplication-check"
			}
		],
		practice: {
			prompt: "Find 396 + 205 and 48 \u00F7 6. Check both.",
			anchor: "check-1-practice"
		},
		challenge: {
			prompt: "A task requires 45 counters in groups of 6. Explain two interpretations of the remainder.",
			anchor: "check-1-challenge"
		}
	},
	{
		code: "EEB9",
		method: "Time measures duration; capacity measures liquid volume; mass measures how much matter an object contains. One hour is 60 minutes, one liter is 1000 milliliters, and one kilogram is 1000 grams. A cup's volume depends on the cup: use its marked milliliters rather than assuming every cup is exactly one fourth of a liter. Make estimates with a named unit before calculating.",
		worked: "From 7:30 to 8:00 is 30 minutes, then to 8:15 is another 15: a 45-minute duration. Four measuring cups each marked 250 milliliters hold 4 \u00D7 250 = 1000 milliliters, exactly one liter for those specified cups.",
		tasks: [
			{
				title: "Storm Cleanup Measurement Plan",
				prompt: "A leak starts at 7:30 a.m. and stops at 8:15. One 1-liter bottle fills during every completed 15-minute interval. List the completion times and total liters. A measuring cup is marked 250 milliliters; find how many such cups fill one bottle. In this supplied estimate table, one paper sheet has mass 5 grams, one textbook 500 grams and one pizza 1 kilogram. Compare 20 sheets, 2 textbooks and 1 pizza in grams, then choose sensible units for each.",
				anchor: "storm-cleanup-measurement-plan"
			}
		],
		practice: {
			prompt: "Find the minutes from 9:50 to 10:20. Compare 2 liters with three 500-milliliter bottles.",
			anchor: "eeb9-practice"
		},
		challenge: {
			prompt: "A cup is marked 200 milliliters. Find how many fill 1 liter and explain why four of these cups are insufficient.",
			anchor: "eeb9-challenge"
		}
	},
	{
		code: "EEB10",
		method: "Area counts unit squares covering a surface with no gaps or overlaps. A rectangle with equal rows has area length multiplied by width. Label area with square units. Split a composite shape into nonoverlapping rectangles and add their areas, or subtract a cutout from a surrounding rectangle. An estimate states which partial squares were included.",
		worked: "A 6-by-4 rectangle covers 24 unit squares. Removing a 2-by-2 corner removes four squares, leaving an L-shaped region of 24 - 4 = 20 square units. Count only the surface that remains.",
		tasks: [
			{
				title: "House Decoration Square-Unit Designs",
				prompt: "Draw these rectangular decorations on square-unit grids: a 3-by-4 mat, 5-by-5 picture, 2-by-8 shelf cover and 6-by-3 banner. Label each area. A separate gift-wrap shape is a 6-by-4 rectangle with a 2-by-2 corner removed. Find its area by subtraction and by splitting the remaining shape into two nonoverlapping rectangles.",
				anchor: "house-decoration-square-unit-designs"
			}
		],
		practice: {
			prompt: "Find the area of a 7-by-6 rectangle, then remove a 2-by-3 corner.",
			anchor: "eeb10-practice"
		},
		challenge: {
			prompt: "Make two different rectangles with area 24 square units, using whole-number side lengths. Explain why they cover equal areas.",
			anchor: "eeb10-challenge"
		}
	},
	{
		code: "EEB11",
		method: "Equal allocation divides a total into equal shares. Large quantities can use a named unit: 87 million is 87 groups of one million, so dividing 87 by three finds the number of million-unit groups in each share. A recommendation also needs a criterion and supplied evidence. For a building budget, find area first, then multiply square units by the price per square unit.",
		worked: "Thirty-six classroom funding tokens shared among three projects give 36 \u00F7 3 = 12 each. Two nonoverlapping rooms measuring 4 by 3 and 2 by 3 have area 12 + 6 = 18 square units. At 10 tokens per square unit, their cost is 180 tokens.",
		tasks: [
			{
				title: "Pear Investment Allocation",
				prompt: "Use invented classroom records for three scenario labels: Xampla has 8 successful trials out of 10 and an estimated next test cost of 6 million dollars; Bear Flag Robotics has 9 of 10 and a cost of 8 million; Nextmind has 7 of 10 and a cost of 5 million. These are fictional case data. Share 87 million dollars equally among the three. Separately recommend a project under this rule: at least 8 successful trials and a next test cost no higher than 7 million. Show the two decisions independently.",
				anchor: "pear-investment-allocation"
			},
			{
				title: "Bear Flag Factory Area Budget",
				prompt: "Use this text blueprint: the factory consists of a 6-yard-by-4-yard rectangle and an attached 2-yard-by-3-yard rectangle sharing an edge, with no overlap. Draw the parts and find total area. The classroom cost is 10 dollars per square yard. Find total cost and check it by pricing each rectangle separately.",
				anchor: "bear-flag-factory-area-budget"
			}
		],
		practice: {
			prompt: "Share 72 funding tokens among 3 projects, then price a 5-by-4 square-unit room at 3 tokens per square unit.",
			anchor: "eeb11-practice"
		},
		challenge: {
			prompt: "One plan has 4 successful trials and cost 6 tokens; another has 5 successful trials and cost 9. Under a minimum of 5 successes and a maximum cost of 8, decide whether either qualifies.",
			anchor: "eeb11-challenge"
		}
	},
	{
		code: "EEB12",
		method: "A fraction names equal parts of a specified whole. The denominator counts all equal parts; the numerator counts selected parts. One of four equal parts is one fourth, written 1/4. Unequal pieces cannot each be called a fourth merely because there are four pieces. State the whole each time, especially when comparing different shapes.",
		worked: "A rectangle divided into two rows of five equal squares has ten parts. Shading two gives 2/10. Shading five gives 5/10, which covers the same amount as one half of that rectangle.",
		tasks: [
			{
				title: "Mars Fraction Expedition",
				prompt: "Draw a circular planet and divide it into four equal quarters. Shade three explored quarters and name what remains. Draw a regular hexagon as six equal triangles from its center and select one. Draw a rectangle as 2 rows of 5 equal squares and shade two. Draw a regular octagon with eight equal center triangles and select one. A plant sample is split into two equal parts; keep one. An oxygen-tank diagram starts 3/4 full and uses 1/4 of the whole tank. Label every selected or remaining fraction.",
				anchor: "mars-fraction-expedition"
			}
		],
		practice: {
			prompt: "Partition a rectangle into 8 equal parts. Shade 3; name shaded and unshaded fractions.",
			anchor: "eeb12-practice"
		},
		challenge: {
			prompt: "A picture has four pieces, but one piece covers half the whole. Explain why all four cannot be labeled fourths.",
			anchor: "eeb12-challenge"
		}
	},
	{
		code: "EEB13",
		method: "A number line places fractions at distances from zero. Divide the interval from 0 to 1 into equal lengths; count intervals rather than tick marks. Splitting every part in half doubles both the part count and the number of pieces representing an unchanged amount. On equal wholes, fewer larger pieces can represent more than the same count of smaller pieces.",
		worked: "Cut a unit length into three thirds, then halve each third. There are six sixths. The point 1/3 is also 2/6 because both are the same distance from zero. Four sixths is 2/3, beyond the half-way point 3/6.",
		tasks: [
			{
				title: "Foot-Long Sandwich Number Lines",
				prompt: "Both sandwiches are exactly one foot long. Draw number lines from 0 to 1 foot. Cut sandwich A into thirds and halve each piece; cut B into fourths and halve each piece. Mark every new tick. Eat four small pieces from each sandwich. Name the fraction eaten and remaining in each and decide which amount eaten is larger.",
				anchor: "foot-long-sandwich-number-lines"
			}
		],
		practice: {
			prompt: "Mark 0, 1/4, 2/4, 3/4 and 1 on a number line. Halve every interval and give another fraction name for 3/4.",
			anchor: "eeb13-practice"
		},
		challenge: {
			prompt: "Use twelfths to compare 2/3 and 1/2. Find their distance apart.",
			anchor: "eeb13-challenge"
		}
	},
	{
		code: "EEB14",
		method: "A table organizes counts by category. A picture graph's key states the value of each symbol, so divide a count by that value to find the symbol count. A bar graph uses equal intervals and a labeled axis. A measurement line plot places one mark per observation above its value, including repeated measurements.",
		worked: "A picture key of one symbol for four animals makes 12 animals equal three symbols. If another section has eight animals, it needs two symbols. A line plot of lengths 1, 1, 2 uses two marks above one and one above two.",
		tasks: [
			{
				title: "Zoo Anniversary Scaled Graphs",
				prompt: "The three event sections are North, Center and South. Animal A counts are 20, 5, 15; use one symbol for 5 animals. Animal B counts are 16, 8, 12; use one symbol for 4 animals. Make both picture graphs and a combined bar graph with a labeled count axis. Find the highest and lowest combined sections and their difference.",
				anchor: "zoo-anniversary-scaled-graphs"
			},
			{
				title: "Zoo Straw Measurement Line Plot",
				prompt: "Each of these is one observed straw piece, in inches: 1, 1 1/2, 1 3/4, 1/2, 2 1/4. Draw a line plot from 0 to 2 1/2 in quarter-inch intervals. Mark every piece and count those at least 1 1/2 inches long.",
				anchor: "zoo-straw-measurement-line-plot"
			}
		],
		practice: {
			prompt: "Make a picture graph for counts 6, 10, 4 using one symbol for two items. Find the total.",
			anchor: "eeb14-practice"
		},
		challenge: {
			prompt: "Plot lengths 1/2, 1, 1, 1 1/2 and 2 inches. Find the most frequent length and the count at least one inch.",
			anchor: "eeb14-challenge"
		}
	},
	{
		code: "EEB15",
		method: "Perimeter is the total distance around a boundary. Add every outer side once and label the result with a length unit. Opposite sides of a rectangle are equal, so its perimeter is length + width + length + width. Area measures covered surface in square units; equal areas can have different perimeters.",
		worked: "A 5-by-3 rectangle has area 15 square units and perimeter 5 + 3 + 5 + 3 = 16 units. A 15-by-1 rectangle also covers 15 square units, but its perimeter is 32 units.",
		tasks: [
			{
				title: "Camping Perimeter Layout",
				prompt: "Draw camp rectangles 6 meters by 4 meters and 8 meters by 3 meters. Find each area and the LED strip length needed to trace each full boundary. A separate triangular campfire barrier has three sides of 4 meters each. Find its perimeter. Compare the rectangle areas and strip lengths.",
				anchor: "camping-perimeter-layout"
			}
		],
		practice: {
			prompt: "A rectangle measures 7 cm by 2 cm. Find area and perimeter with different unit labels.",
			anchor: "eeb15-practice"
		},
		challenge: {
			prompt: "List all whole-number rectangles of area 24 square meters, ignoring rotations. Which needs the least boundary strip?",
			anchor: "eeb15-challenge"
		}
	},
	{
		code: "EEB16",
		method: "A quadrilateral is a closed four-sided polygon. Parallel sides remain the same distance apart and do not meet when extended. A rectangle has four right angles; a rhombus has four equal sides; a square has both properties and belongs to both groups. This course uses the inclusive definition of trapezoid: at least one pair of parallel sides. Under that convention, rectangles also count as trapezoids.",
		worked: "A square with side 3 cm is a quadrilateral, rectangle and rhombus because it has four sides, four right angles and four equal sides. A 5-by-2 rectangle is not a square because its adjacent sides have different lengths. One shape can belong to several groups.",
		tasks: [
			{
				title: "Four-Sided Object Scavenger Hunt",
				prompt: "Use these three supplied outlines, or compare actual objects with the same stated attributes: A is a square with side 4 cm; B is a 6-by-3 cm rectangle; C has exactly one pair of parallel sides, with bases 6 and 4 cm and two equal sloping sides. Sketch each and label all justified categories. Explain shared and different attributes; use the stated inclusive trapezoid convention.",
				anchor: "four-sided-object-scavenger-hunt"
			}
		],
		practice: {
			prompt: "A rhombus has four equal sides and two opposite acute angles. Decide whether it is a square and explain.",
			anchor: "eeb16-practice"
		},
		challenge: {
			prompt: "Describe a rectangle that is also a rhombus. Explain why the description forces a square.",
			anchor: "eeb16-challenge"
		}
	},
	{
		code: "EEB17",
		method: "Compare a filled fraction with one half using the same whole. If twice the filled amount is less than capacity, the container is below half; equality is exactly half. For a robot choice, compute footprint as rectangular length times width and check every supplied movement, floor and load constraint before choosing.",
		worked: "A container with capacity eight and current amount three is 3/8 full. Twice three is six, below eight, so it is below half. Four of eight would be exactly half. A 3-by-2 footprint has area six square units; its area alone does not determine whether it can carry a required load.",
		tasks: [
			{
				title: "Amazon Warehouse Restock Survey",
				prompt: "Use invented classroom warehouse records; units are equal-sized storage sections. Fresh holds 3 of 8 sections, Books 4 of 8, Electronics 1 of 4, Home & Kitchen 5 of 8 and Pet Supplies 2 of 6. Restock every warehouse strictly below half capacity. Give each filled fraction, identify the restock list and recommend a first priority using the lowest fraction as the rule.",
				anchor: "amazon-warehouse-restock-survey"
			},
			{
				title: "Warehouse Robot Area Proposal",
				prompt: "Use this fictional comparison table. Standard Rover is 2 m long by 2 m wide, carries 8 kg and works on wood. Grab-a-Tron is 3 m long by 2 m wide, carries 16 kg and works on wood. R.A.Z.E is 4 m long by 1 m wide, carries 20 kg and requires a magnetic metal floor. The warehouse has a wood floor, 3-meter-wide straight aisles and 12-kg crates. Width at most 3 m fits in this simplified model. Calculate all footprints, select a qualifying robot and suggest a change that addresses a stated constraint.",
				anchor: "warehouse-robot-area-proposal"
			}
		],
		practice: {
			prompt: "A container holds 4 of 10 equal sections. Decide whether it is below half, then find the area of a 4-by-2 unit robot.",
			anchor: "eeb17-practice"
		},
		challenge: {
			prompt: "Containers hold 3/6, 4/8 and 5/12. Which meet a strictly-below-half restock rule?",
			anchor: "eeb17-challenge"
		}
	},
	{
		code: "check-2",
		method: "Choose a representation matched to the question: a timeline for duration, unit squares for area, boundary lengths for perimeter, equal shares or a number line for fractions, and a labeled graph for counts. Include the whole for every fraction and the scale for every graph. Check a recommendation against every stated condition.",
		worked: "A 4-by-3 rectangle has area 12 square units and perimeter 14 units. Shading six of its twelve unit squares shades 6/12 = 1/2. These describe surface, boundary and share of the same drawing with different units.",
		tasks: [
			{
				title: "Measurement, Fraction, Data, and Geometry Check",
				prompt: "Solve: (1) minutes from 10:40 to 11:15; (2) milliliters in four cups each marked 250 mL; (3) area and perimeter of a 7-by-3 cm rectangle; (4) fraction shaded when three of eight equal parts are shaded; (5) number of symbols for 18 animals at three per symbol; (6) compare 3/8 and 1/2; (7) list all applicable square, rectangle and rhombus labels for a square; (8) decide whether a 2-meter-wide robot carrying at most 10 kg qualifies for 12-kg crates in a 3-meter aisle. Explain two answers with models.",
				anchor: "measurement-fraction-data-and-geometry-check"
			}
		],
		practice: {
			prompt: "Find the area and perimeter of a 6-by-2 meter rectangle. Shade one fourth on a matching grid.",
			anchor: "check-2-practice"
		},
		challenge: {
			prompt: "A rectangle has perimeter 20 cm and whole-number sides. Find two possible areas and explain why perimeter alone does not fix area.",
			anchor: "check-2-challenge"
		}
	}
];
