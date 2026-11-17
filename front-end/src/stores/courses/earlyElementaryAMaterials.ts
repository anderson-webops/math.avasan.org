export interface ElementaryTask {
	title: string;
	prompt: string;
	anchor: string;
}
export interface ElementaryMaterial {
	code: string;
	method: string;
	worked: string;
	practice: { prompt: string; anchor: string };
	challenge: { prompt: string; anchor: string };
	tasks: ElementaryTask[];
}
export const earlyElementaryAMaterials: ElementaryMaterial[] = [
	{
		code: "EEA1",
		method: "Addition joins groups; subtraction finds what is left or the difference between groups. A number bond shows a whole split into two parts. Count objects one at a time, then check that the parts add to the whole. Moving an object between two boxes changes both box counts but keeps their combined total the same.",
		worked: "To find 8 + 7, split 7 into 2 and 5. Then 8 + 2 makes 10, and 10 + 5 = 15. Taking away 7 from 15 leaves 8, so 15 - 7 = 8 checks the bond.",
		tasks: [
			{
				title: "Ladybug Number Bond Cases",
				prompt: "There are 15 ladybugs and two empty boxes. Put six ladybugs in Box A and the rest in Box B. Draw and label both groups. Move one ladybug from B to A and write the new equation. Then split all 15 as evenly as possible between the boxes, leaving one ladybug in the net.",
				anchor: "ladybug-bonds"
			}
		],
		practice: {
			prompt: "Draw 14 counters in two boxes with six in the first box. How many belong in the second? Move two counters from the second box to the first and write the new bond.",
			anchor: "eea1-practice"
		},
		challenge: {
			prompt: "Share 17 counters equally between two boxes, leaving one counter outside. Draw the groups and write a repeated-addition equation.",
			anchor: "eea1-challenge"
		}
	},
	{
		code: "EEA2",
		method: "A ten is a group of ten ones. Write a two-digit number as tens and ones. Add tens to tens and ones to ones; exchange ten ones for one ten when needed. For subtraction, exchange a ten for ten ones when there are too few ones to remove.",
		worked: "For 47 + 28, 4 tens + 2 tens = 6 tens and 7 ones + 8 ones = 15 ones. Exchange ten of those ones for one ten: 7 tens and 5 ones = 75. Check 75 - 28 by exchanging one ten: 6 tens and 15 ones minus 2 tens and 8 ones leaves 47.",
		tasks: [
			{
				title: "Starfish Tank Regrouping",
				prompt: "Tank A starts with 22 starfish and Tank B with 16. Move A's two extra ones and B's six extra ones into empty Tank C so A and B contain only full groups of ten. Record all three counts and their total. Then move two starfish from C back to A. Compare A with B and C combined.",
				anchor: "starfish-tanks"
			}
		],
		practice: {
			prompt: "Show 36 + 27 with tens and ones. Check the result by subtracting 27.",
			anchor: "eea2-practice"
		},
		challenge: {
			prompt: "A tank holds 62 fish. Move 18 fish to a second tank. Show the regrouping and explain why the combined count stays 62.",
			anchor: "eea2-challenge"
		}
	},
	{
		code: "EEA3",
		method: "A word problem names quantities and asks for an unknown. Draw a box or group for each known quantity, label what changes, and choose addition for joining or subtraction for taking away or comparing. Keep different categories separate until a question asks for their combined total.",
		worked: "A bag has nine red counters and four blue counters. Three red counters are shared. Red becomes 9 - 3 = 6; blue stays 4. The new total is 6 + 4 = 10 counters. Keeping the categories separate prevents subtracting the shared counters twice.",
		tasks: [
			{
				title: "Birthday Candy Bag Model",
				prompt: "Bag A has eight fruity and six chocolate candies. Bag B has five fruity and seven chocolate candies. Combine the bags, then share two fruity candies and four chocolate candies. A late birthday bag brings ten candies, including two fruity candies; all the others are chocolate. Draw the categories and find the final fruity, chocolate, and total counts.",
				anchor: "birthday-bags"
			}
		],
		practice: {
			prompt: "A bag holds eight fruity and six chocolate candies. Give away three fruity candies, then receive two chocolate candies. Find each final count and the total.",
			anchor: "eea3-practice"
		},
		challenge: {
			prompt: "A box has 18 crayons. Seven are blue and five are green; the rest are red. Give away two red crayons. How many red crayons and how many total crayons remain?",
			anchor: "eea3-challenge"
		}
	},
	{
		code: "EEA4",
		method: "A budget is the largest amount available to spend. Add chosen prices and subtract the total from the budget. Check that spending plus the amount left equals the original budget. On a grid, opposite moves cancel their changes in position while both still count as jumps. Check horizontal and vertical movement separately.",
		worked: "A 100-point budget with prices 20 and 30 uses 50 points and leaves 50. Three right jumps followed by one left jump use four jumps and end two squares to the right of the start.",
		tasks: [],
		practice: {
			prompt: "A character has a 100-point budget. Hair costs 10 points, a suit 35, and an extra 15. Find the cost and the amount left. Replace the suit with a 45-point suit and compare.",
			anchor: "eea4-practice"
		},
		challenge: {
			prompt: "A grid is four squares across and three up. From the bottom-left corner, make a route with exactly six right, two left, four up and one down jumps. Stay inside the grid and finish at the top-right corner.",
			anchor: "eea4-challenge"
		}
	},
	{
		code: "EEA5",
		method: "Length is the distance between endpoints. Start a ruler at zero, not at the edge of the ruler. Name the unit with every measurement. Twelve inches equal one foot; three feet or 36 inches equal one yard. One hundred centimeters equal one meter. Use the same unit before comparing two lengths.",
		worked: "An object starts at the 3-inch mark and ends at the 11-inch mark. Its length is 11 - 3 = 8 inches. A 24-inch path is two feet because 12 + 12 = 24. Two feet is shorter than one yard, which is three feet.",
		tasks: [
			{
				title: "Indiana Jones Length Expedition",
				prompt: "Draw a one-yard path and label its endpoints 0 and 36 inches. Put the bug at 6 inches, fruit at 12, gem at 24, and tree at 36. Find the distance from bug to fruit and from fruit to tree, then express the fruit-to-tree distance in feet. In a separate metric sketch, draw a 2-centimeter bug beside an 8-centimeter fruit. Label each unit.",
				anchor: "length-expedition"
			}
		],
		practice: {
			prompt: "A ribbon begins at 4 cm and ends at 19 cm on a ruler. Find its length. Compare a two-meter rope with a 150-centimeter rope.",
			anchor: "eea5-practice"
		},
		challenge: {
			prompt: "A bug is 2 cm long and a fruit is 8 cm long. Place them end to end without overlap. Find the total in centimeters and the gap left in a 15-centimeter box.",
			anchor: "eea5-challenge"
		}
	},
	{
		code: "EEA6",
		method: "Lengths join and separate like positions on a number line. Add segment lengths when pieces are joined without overlap. Subtract a known part from the whole to find a missing part. Compare measurements by subtracting the smaller reading from the larger reading; the difference is a length, not a new endpoint.",
		worked: "A rope is 32 inches long. Cut off 11 inches and then 7 inches. Eighteen inches have been removed, leaving 32 - 18 = 14 inches. The check is 11 + 7 + 14 = 32 inches.",
		tasks: [
			{
				title: "Yarn Quilt Length Equations",
				prompt: "Join yarn pieces measuring 11, 12, 15, and 7 inches with no overlap. Cut 20 inches from the joined yarn. Find the length of the remaining piece and check it by addition. A separate quilt strip has a correct length of 68 inches but a mistaken record of 81 inches. How many inches too large is the record?",
				anchor: "quilt-yarn"
			}
		],
		practice: {
			prompt: "Join ribbons of 13, 18, and 9 cm. Cut off 16 cm. Find the original joined length and the amount left.",
			anchor: "eea6-practice"
		},
		challenge: {
			prompt: "A measuring tape starts at 9 inches under one endpoint and reads 34 inches at the other. Someone reports 34 inches as the object's length. Correct the measurement and explain the mistake.",
			anchor: "eea6-challenge"
		}
	},
	{
		code: "EEA7",
		method: "A number line can show a long object and changes to its remaining length. Mark the scale first and keep every change in the same unit. After each donation or meal, subtract that amount from the latest remainder. An equal share can be checked by repeatedly adding the same share until it reaches the whole.",
		worked: "A 40-meter sandwich loses 8 meters to a donation and 12 meters to a meal. The remaining length is 40 - 8 - 12 = 20 meters. Four equal shares of 5 meters work because 5 + 5 + 5 + 5 = 20.",
		tasks: [
			{
				title: "Akshay Sandwich Number Line",
				prompt: "A fictional record attempt plans a 96-meter sandwich from four consecutive sections: cheese 24 m, vegetable 18 m, egg 30 m, and bean 24 m. Order the section lengths from shortest to longest. Draw a number line from 0 to 96 with a mark every 6 m and label the endpoint of each section in the stated sandwich order.",
				anchor: "sandwich-plan"
			},
			{
				title: "Sandwich Sharing Record",
				prompt: "Start with the same 96-meter sandwich. On Monday donate 12 m. On Tuesday five people eat 3, 5, 4, 2, and 6 m. On Wednesday divide the remaining length equally among four groups. Record the remaining length after each day and check all four Wednesday shares by addition.",
				anchor: "sandwich-sharing"
			}
		],
		practice: {
			prompt: "A 48-meter sandwich has 9 meters donated and 15 eaten. Find the remaining length and split it into four equal shares.",
			anchor: "eea7-practice"
		},
		challenge: {
			prompt: "Compare two sharing plans for a 60-meter sandwich. Plan A donates 12 meters then divides the rest equally among four groups. Plan B gives 15 meters to each of four groups. Explain where every meter goes.",
			anchor: "eea7-challenge"
		}
	},
	{
		code: "EEA8",
		method: "The places in a three-digit number are hundreds, tens, and ones. Ten ones can be exchanged for one ten, and ten tens for one hundred. A zero holds an empty place; 206 has no tens, while 260 has six tens. Expanded form shows the value of each digit. To estimate to the nearest hundred, compare the distances to the hundred below and the hundred above, then choose the nearer one.",
		worked: "216 = 200 + 10 + 6 means two hundreds, one ten, and six ones. Trading its two hundreds for twenty tens gives 21 tens and six ones. One thousand is ten hundreds or one hundred tens.",
		tasks: [
			{
				title: "Penguin Place Value Grouping",
				prompt: "A text count records 100 penguins on Ice A, 100 on Ice B, 10 on Ice C, and 6 on Ice D. First estimate to the nearest hundred, then find the exact total. Draw the count using hundreds, tens, and ones. Rewrite 216 using only tens and ones. How many groups of ten make 1000?",
				anchor: "penguin-groups"
			}
		],
		practice: {
			prompt: "Write 407 in expanded form. Explain how it differs from 470 using hundreds, tens, and ones.",
			anchor: "eea8-practice"
		},
		challenge: {
			prompt: "Show 380 with hundreds and tens, then trade one hundred for tens. Show two different groupings with the same total.",
			anchor: "eea8-challenge"
		}
	},
	{
		code: "EEA9",
		method: "Addition and subtraction within 200 use the same place-value exchanges as smaller numbers. One hundred is ten tens. Align equal places or keep an expanded-form record so a ten is not accidentally added as a one. Check a subtraction by adding the removed amount to the remainder. For a nearest-ten estimate, choose the nearer multiple of ten: 68 is closer to 70 than 60. For an exact halfway case, use the stated rounding rule.",
		worked: "For 126 - 38, exchange one ten: 126 = 100 + 10 + 16. Remove 30 + 8 by also exchanging the hundred into tens as needed: 11 tens and 16 ones minus 3 tens and 8 ones leaves 8 tens and 8 ones, or 88. Check 88 + 38 = 126.",
		tasks: [
			{
				title: "Bookshelf Regrouping Record",
				prompt: "A classroom shelf has 68 story books, 47 science books, and 19 reading books. Estimate the total by rounding each count to a nearby ten, then find the exact total. Make full groups of ten within each category and move leftover books to an extras shelf. Record the four shelf counts. Finally add 23 history books from storage and find the new total.",
				anchor: "bookshelf-counts"
			}
		],
		practice: {
			prompt: "Compute 87 + 56 using tens and ones, then check the sum by subtracting 56.",
			anchor: "eea9-practice"
		},
		challenge: {
			prompt: "A shelf has 153 books. Remove 47, then add 29. Use a running total and a second calculation to check the final count.",
			anchor: "eea9-challenge"
		}
	},
	{
		code: "EEA10",
		method: "For a story with several events, record a starting total and update it after each event. State whether each change joins, removes, or compares quantities. A goal is reached only when the final total is at least the target. Checking just an earlier total can give the wrong decision.",
		worked: "Start with 80 tickets, earn 25, and spend 30. The record is 80 + 25 = 105, then 105 - 30 = 75. A 100-ticket goal has not been reached; 100 - 75 = 25 more tickets are needed.",
		tasks: [
			{
				title: "Arcade Ticket Goal Tracker",
				prompt: "Start with 85 tickets and earn 40 before lunch. A small prize costs 150 tickets. Lunch costs 20 tickets for a sandwich and 15 for juice; buy both. Then receive a 30-ticket gift and earn 12, 18, 20, 15, and 15 tickets in five games. Keep a running ledger. Before lunch, how many more tickets are needed for the small prize? Can the final balance buy the 200-ticket mega prize?",
				anchor: "arcade-ledger"
			}
		],
		practice: {
			prompt: "Start with 65 tickets. Earn 28 and spend 17. Find the final total and the number still needed for a 100-ticket prize.",
			anchor: "eea10-practice"
		},
		challenge: {
			prompt: "A 150-ticket goal is checked after earning 40 tickets from a starting 95. A later purchase costs 25 tickets. Explain why an earned-ticket total alone is insufficient.",
			anchor: "eea10-challenge"
		}
	},
	{
		code: "EEA11",
		method: "For three-digit operations, work with hundreds, tens, and ones. In subtraction, a place with too few units needs an exchange from the next place. If that place is zero, exchange from farther left first. Every exchange keeps the number's total value unchanged.",
		worked: "For 503 - 278, exchange one hundred to get 4 hundreds, 10 tens, and 3 ones. Exchange one of those tens to get 4 hundreds, 9 tens, and 13 ones. Remove 2 hundreds, 7 tens, and 8 ones: 225 remains. Check 225 + 278 = 503.",
		tasks: [
			{
				title: "Millionaire Base-Ten Challenge",
				prompt: "Solve this supplied quiz using base-ten drawings or expanded form: 246 + 137; 508 + 286; 730 - 248; and 602 - 175. For one subtraction, show every exchange. Choose one result to check with the inverse operation.",
				anchor: "base-ten-quiz"
			}
		],
		practice: {
			prompt: "Calculate 368 + 247 and check with subtraction.",
			anchor: "eea11-practice"
		},
		challenge: {
			prompt: "Solve 700 - 286. Show the exchanges across the zero tens and ones.",
			anchor: "eea11-challenge"
		}
	},
	{
		code: "EEA12",
		method: "Decomposition splits a number into easier parts. Compensation changes a calculation to a nearby easy one, then adjusts for that change. Compare methods by checking that they give the same answer. A running score must include every gain and penalty in order.",
		worked: "For 398 + 156, decomposition gives 398 + 100 + 50 + 6 = 554. Compensation gives 400 + 156 - 2 = 554: adding two to 398 made the problem easier, so two must be removed at the end.",
		tasks: [
			{
				title: "Skee-Ball Team Score Ledger",
				prompt: "The team starts at 0. Each outer-ring hit earns 10 points, inner-ring hit 20, and bullseye 50. A miss earns 0; a ball outside the play area loses 10. Round 1 has 3 outer hits, 2 inner hits, and 1 bullseye. Round 2 has 2 outer, 3 inner, and 2 bullseyes. Round 3 has 1 outer, 2 inner, 3 bullseyes, and 1 outside ball. Round 4 has 2 outer, 2 inner, 2 bullseyes, and 2 misses. Round 5 has 1 outer, 3 inner, 4 bullseyes, and 1 outside ball. Record each round and running total, then compare the final score with the 870-point record.",
				anchor: "skee-ball-scores"
			}
		],
		practice: {
			prompt: "Calculate 497 + 126 by decomposition and compensation.",
			anchor: "eea12-practice"
		},
		challenge: {
			prompt: "A score is 640. Add 98, subtract 49, and add 11. Compare an event-by-event ledger with a net-change calculation.",
			anchor: "eea12-challenge"
		}
	},
	{
		code: "EEA13",
		method: "A data table pairs a label with a count. Compare counts by their largest place first, add them to find a combined total, and subtract from a target to find the amount still needed. Fictional follower counts are classroom data, not statements about current creators. No social-media account or platform use is needed.",
		worked: "Counts of 180, 240, and 150 are ordered 240, 180, 150. Their total is 570. For a target of 1000, a creator with 240 needs 1000 - 240 = 760 more. Check 240 + 760 = 1000.",
		tasks: [
			{
				title: "TikTok Creator Follower Analysis",
				prompt: "Use this fictional table: River has 240 followers, Sky 210, Jo 180, Kai 150, and Val 120. Order all five from most to fewest. Find their combined total, then calculate how many more followers each needs to reach the core target of 1000. Show an addition check for one gap.",
				anchor: "creator-counts"
			},
			{
				title: "Melody Test Launch Data",
				prompt: "In the core classroom case, Melody starts with 173 fictional followers. New followers are 37 on Monday, 93 on Tuesday, 134 on Wednesday, and 158 on Thursday. Describe a fictional video idea, then calculate the new followers gained and the final count. Keep a day-by-day ledger; no posting is part of this task.",
				anchor: "launch-ledger"
			}
		],
		practice: {
			prompt: "Three fictional creators have 125, 240, and 185 followers. Order the counts, find their total, and find how many more the first creator needs to reach 500.",
			anchor: "eea13-practice"
		},
		challenge: {
			prompt: "Large-number extension: each place to the left is ten times the next. One thousand thousands is a million; one thousand millions is a billion. Compute the original larger launch case 673 + 37 + 93 + 334 + 158. For a separate target of 1,000,000,000, calculate the gap from 240 by subtracting 200 first, then 40.",
			anchor: "eea13-challenge"
		}
	},
	{
		code: "check-1",
		method: "A mixed check asks which method fits each problem. Label the known numbers and the unknown before choosing an operation. For a length, name the unit; for a comparison, compare the largest place first. Use an inverse operation or a diagram to check at least one answer.",
		worked: "A backpack holds an 18-inch rope and a 27-inch rope. The total length is 45 inches. Cutting 16 inches leaves 29 inches; 29 + 16 = 45 checks the change. The unit stays inches throughout.",
		tasks: [
			{
				title: "Addition, Length, and Place Value Check",
				prompt: "Solve these supplied checks: (1) A backpack holds 18 red balls and 7 blue balls; 9 balls are removed. Find the number left. (2) A circle picture has 12 counters; 5 are covered. How many are visible? (3) Join ropes of 27 and 35 inches, then cut away 18 inches. Find the remainder. (4) A ball rolls 34 cm and then 29 cm. Find the distance. (5) Compare 406 and 460 and write both in expanded form. (6) Find 368 + 247 and 700 - 286. Show a model or named strategy for at least two answers.",
				anchor: "check-in-one"
			}
		],
		practice: {
			prompt: "Solve 47 + 28, 92 - 36, and 304 + 185. Write 326 in expanded form and compare 326 with 362.",
			anchor: "check-1-practice"
		},
		challenge: {
			prompt: "Two students estimate 198 + 205 as 200 + 200. One reports 400 as the exact answer. Find the exact sum and explain the proper role of the estimate.",
			anchor: "check-1-challenge"
		}
	},
	{
		code: "EEA14",
		method: "Equal groups contain the same number of objects. Repeated addition finds their combined total. A number is even when all objects can be paired with none left; an odd number leaves one unpaired. When sharing into equal groups, show any leftovers instead of hiding them.",
		worked: "Four groups of three counters give 3 + 3 + 3 + 3 = 12. Twelve is even because it makes six pairs. Thirteen has the same six pairs and one leftover, so it is odd.",
		tasks: [
			{
				title: "Kickball Equal Groups",
				prompt: "A kickball roster starts with 21 players. Split it equally into three teams and record each team size. Three more players arrive; add one to each team and record the new roster and team sizes. In a separate score example, five players each score four points. Draw the groups and find the total.",
				anchor: "kickball-groups"
			}
		],
		practice: {
			prompt: "Arrange 18 counters into three equal groups. Write the repeated-addition equation and decide whether 18 is even or odd.",
			anchor: "eea14-practice"
		},
		challenge: {
			prompt: "Share 23 counters equally among five boxes, leaving as few outside as possible. Show the repeated addition and the leftover count.",
			anchor: "eea14-challenge"
		}
	},
	{
		code: "EEA15",
		method: "Rows run across an array and columns run down it. A rectangle partitioned into equal rows and columns has equal-sized cells. Count one row, then repeatedly add that count once per row. Count by columns as a second check. Equal shares require equal numbers of the same-sized cells. Each of two groups with the same count contains half the total.",
		worked: "Three rows of four squares contain 4 + 4 + 4 = 12 squares. Four columns of three give 3 + 3 + 3 + 3 = 12 too. Six squares can be good spaces and six bad spaces because 6 + 6 = 12.\n\n![Three rows of four equal squares, numbered one through twelve.](/course-assets/early-elementary-a/equal-array-v1.svg)",
		tasks: [
			{
				title: "Board Game Rectangle Partitions",
				prompt: "Draw a board four rows high and six columns wide using equal-sized squares. Count the spaces by rows and by columns. Color half good spaces and half bad spaces. Then design a board with three rows and five columns and decide whether it can have equal numbers of good and bad spaces while using every space.",
				anchor: "board-arrays"
			}
		],
		practice: {
			prompt: "Draw four rows of five equal squares. Count the cells by rows and then columns. Split them equally into good and bad spaces.",
			anchor: "eea15-practice"
		},
		challenge: {
			prompt: "A board has three rows of five equal squares. Can all its squares be split equally between two colors? Explain with pairs.",
			anchor: "eea15-challenge"
		}
	},
	{
		code: "EEA16",
		method: "A clock has twelve hour numbers. Each step between neighboring numbers represents five minutes for the long minute hand. The short hour hand moves gradually between hour numbers. Half past means thirty minutes after the hour; quarter until means fifteen minutes before the next hour. Use a timeline for elapsed time, crossing hour boundaries in small steps. A.m. is before noon; p.m. begins at noon.",
		worked: "At 8:30 a.m., the minute hand points to 6 and the hour hand is halfway from 8 to 9. Quarter until 10 is 9:45: the minute hand points to 9 and the hour hand is between 9 and 10, closer to 10. From 8:30 to 9:45 is one hour and fifteen minutes.\n\n![8:30 a.m.: minute hand at six and hour hand halfway from eight to nine.](/course-assets/early-elementary-a/clock-0830-v1.svg)\n\n![9:45 a.m.: minute hand at nine and hour hand between nine and ten.](/course-assets/early-elementary-a/clock-0945-v1.svg)",
		tasks: [
			{
				title: "Deserted Island Time Record",
				prompt: "A fictional island trip starts at 7:30 a.m. Rescue was scheduled for quarter until 10 that morning, but a delay adds 40 minutes. Draw and label clocks for 8:30 a.m. and quarter until 10. Find the planned rescue time, actual rescue time, and total elapsed time from 7:30 a.m. Show the hour crossings on a timeline.",
				anchor: "island-clocks"
			}
		],
		practice: {
			prompt: "Show 10:15 and 10:50 on clocks. Find the time elapsed between them.",
			anchor: "eea16-practice"
		},
		challenge: {
			prompt: "An activity starts at 11:40 a.m. and lasts 35 minutes. Find its ending time and label a.m. or p.m.",
			anchor: "eea16-challenge"
		}
	},
	{
		code: "EEA17",
		method: "For this course, U.S. coins have these values: a penny is one cent, nickel five, dime ten, and quarter twenty-five. One dollar is one hundred cents. Add money in cents first, then write dollars and remaining cents. Exchanging coins or bills changes the number of pieces but preserves their total value. Write cents with two digits after the decimal point: five cents is $0.05 and one dollar is $1.00.",
		worked: "Two quarters, one dime, and three pennies have 25 + 25 + 10 + 3 = 63 cents, written $0.63. A 100-cent bill exchanged for four quarters still has value $1.00.",
		tasks: [
			{
				title: "Grocery Coin Exchange",
				prompt: "The purse contains 3 quarters, 7 dimes, 10 nickels, and 20 pennies. Find its value in cents and dollars. Grocery prices are apple 35 cents, bread 80 cents, carrot 25 cents, and milk 60 cents. Find the cost of all four items and the money left. Show one coin combination for the apple, and exchange the original purse for fewer pieces using $1 bills, quarters, dimes, nickels, and pennies.",
				anchor: "grocery-coins"
			}
		],
		practice: {
			prompt: "An item costs 47 cents. Pay with one $1 bill. Find the change and give one coin combination using quarters, dimes, nickels, and pennies.",
			anchor: "eea17-practice"
		},
		challenge: {
			prompt: "Buy items costing 65 and 85 cents and pay $2.00. Find the change and show it in two different coin combinations.",
			anchor: "eea17-challenge"
		}
	},
	{
		code: "EEA18",
		method: "Data are recorded observations. A category names what is counted. Make a table with one count per category, then use a bar or picture display with a stated scale. Compare bar lengths or counts only when they use the same scale. Update the same categories when new objects are added.",
		worked: "A table shows spoons 8, forks 6, and knives 4. With one picture standing for two utensils, draw four spoon pictures, three fork pictures, and two knife pictures. Spoons exceed knives by 8 - 4 = 4 utensils.",
		tasks: [
			{
				title: "Kitchen Utensil Data Display",
				prompt: "Use the supplied counts: 8 spoons, 5 knives, and 9 forks. Make a table and a bar chart using one square for one utensil. Then add 2 spoons, 4 knives, and 3 forks and update the same display. Find both totals and the difference between the largest and smallest updated categories. An optional second survey can use observed household counts.",
				anchor: "utensil-data"
			}
		],
		practice: {
			prompt: "A collection has five red, eight blue, and three green counters. Make a table and one-square-per-counter bar display. Find the total and the difference between largest and smallest categories.",
			anchor: "eea18-practice"
		},
		challenge: {
			prompt: "A picture graph uses one full symbol for two objects. A row shows three full symbols and one half symbol. Find the count and explain why the half symbol matters.",
			anchor: "eea18-challenge"
		}
	},
	{
		code: "EEA19",
		method: "A polygon is a closed flat shape with straight sides. A triangle has three sides and three corners; a quadrilateral has four of each. A circle has a curved boundary and no straight sides or corners. Halves, thirds, and fourths divide one whole into two, three, or four equal shares. Merely drawing the right number of pieces does not make them equal.",
		worked: "Cut a rectangular cake with two equally spaced parallel cuts to make three equal strips. Each strip is one third. A square cake cut halfway across and halfway down has four equal quarters. A large piece and a tiny piece are not halves just because there are two pieces.\n\n![Equal halves of a circle, thirds of a rectangle, and fourths of a square.](/course-assets/early-elementary-a/equal-shares-v1.svg)",
		tasks: [
			{
				title: "Bakery Dessert Shape Fractions",
				prompt: "A bakery has one circular pie, one rectangular cake, and one square ice-cream cake. Describe each shape using straight sides, corners, or a curved boundary. Draw a cut through the center of the pie for two equal shares, two equally spaced parallel cuts across the rectangular cake for three equal shares, and two halfway cuts in perpendicular directions across the square cake for four equal shares. Label the shares.",
				anchor: "bakery-shares"
			}
		],
		practice: {
			prompt: "Draw a triangle, rectangle, and circle. State the number of straight sides and corners in each. Divide a separate rectangle into four equal strips.",
			anchor: "eea19-practice"
		},
		challenge: {
			prompt: "A rectangle is split into four strips, but one strip is twice as wide as each of the others. Explain why the pieces are not fourths and describe a correction.",
			anchor: "eea19-challenge"
		}
	},
	{
		code: "EEA20",
		method: "A comparison table uses the same measure and unit for each option. A budget limit and a minimum battery requirement are separate tests; an option must pass both. A chart can show a pattern but does not guarantee that a future design can achieve it. This is a fictional product-data comparison, not a purchase endorsement. At most means no greater than; at least means no less than.",
		worked: "For fictional phones A and B, A costs $300 with eight battery hours, while B costs $350 with ten. A requirement of at most $360 and at least ten hours accepts B and rejects A. Cost alone would miss the battery requirement.",
		tasks: [
			{
				title: "Devyn iPhone Data Charts",
				prompt: "Use these fictional prototype records, not real iPhone specifications: A costs $300, lasts 8 battery hours, and receives 12 satisfied votes out of 20; B costs $350, lasts 10 hours, and receives 16 of 20; C costs $400, lasts 12 hours, and receives 14 of 20. Create separate price, battery-life, and satisfaction charts with labeled scales. Devyn's limits are at most $360 and at least 10 battery hours. Which prototype meets both? Explain what the votes support and propose one clearly labeled future design target.",
				anchor: "phone-data"
			},
			{
				title: "Launch Party Array Cuts",
				prompt: "Draw two square trays. Partition the brownie tray into three equal-height rows and five equal-width columns, and the cake tray into four equal-height rows and five equal-width columns. Count the equal-area pieces by repeated addition. How many straight grid lines are needed inside each tray? The pieces may be rectangles even though the trays are square.",
				anchor: "party-arrays"
			}
		],
		practice: {
			prompt: "Prototype P costs $280 with nine battery hours; Q costs $320 with eleven. With a $330 budget and a minimum of ten hours, choose a qualifying prototype and explain both tests.",
			anchor: "eea20-practice"
		},
		challenge: {
			prompt: "A third prototype costs $400 with twelve hours. Compare it with Q under the same requirements. Explain why the longest battery life alone does not decide.",
			anchor: "eea20-challenge"
		}
	},
	{
		code: "check-2",
		method: "A final mixed check combines equal groups, arrays, time, money, measurement, data, and shapes. State which quantity a number represents before calculating. Draw an array or timeline when it makes the reasoning easier to inspect. A self-check confirms both the number and its unit.",
		worked: "Three groups of four counters total twelve. A 45-cent item paid with 100 cents leaves 55 cents. Starting at 2:20 p.m. and waiting thirty-five minutes gives 2:55 p.m. Different representations fit these different questions.",
		tasks: [
			{
				title: "Multiplication, Measurement, Data, and Shape Check",
				prompt: "Complete these supplied checks: (1) Decide whether 17 is even or odd and draw pairs. (2) Count four rows of six equal squares and split the cells equally between two colors. (3) Add lengths 48 and 27 cm. (4) Find the value of 2 quarters, 3 dimes, and 4 pennies. (5) A picture graph uses one star for two books; rows have 4 and 6 stars. Find both counts and their difference. (6) Find the time 25 minutes after 9:40 a.m. (7) Draw three equal strips in a rectangle and name one share. (8) A switch needs at least 500 pounds of load. Crates weigh 185, 160, and 120 pounds. Find the load and the minimum extra weight needed.",
				anchor: "check-in-two"
			}
		],
		practice: {
			prompt: "Solve: four groups of three; 75 cm plus 28 cm; change from $1 for a 65-cent item; and the ending time thirty minutes after 3:45 p.m.",
			anchor: "check-2-practice"
		},
		challenge: {
			prompt: "A display uses one star for two books and shows five stars. Someone reports five books. Correct the count, then split the books equally among two shelves.",
			anchor: "check-2-challenge"
		}
	}
];
