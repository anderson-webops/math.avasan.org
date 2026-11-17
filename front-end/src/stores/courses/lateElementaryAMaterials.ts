import type { ElementaryMaterial } from "./earlyElementaryAMaterials";

export const lateElementaryAMaterials: ElementaryMaterial[] = [
	{
		code: "LEA1",
		method: "Each place is ten times the place to its right: ten ones make a ten, ten tens a hundred, and ten hundreds a thousand. Expanded form shows each place's value. Exchanging pieces changes the piece count while preserving their combined value. If only hundreds, tens and ones are available, a total above one thousand can use more than nine hundred-pieces.",
		worked: "A collection of 125 ones and 18 tens is worth 125 + 180 = 305. Exchange ten ones at a time, then ten tens at a time, to obtain 3 hundreds, no tens and 5 ones. Both collections represent 305.",
		tasks: [
			{
				title: "Prize Money Place-Value Exchange",
				prompt: "A competition prize bag contains 236 one-dollar bills, 57 ten-dollar bills and 3 hundred-dollar bills. Find the total value and exchange it for the fewest bills using only those three denominations. Compare the original and final bill counts and write the value in expanded form.",
				anchor: "prize-money-place-value-exchange"
			}
		],
		practice: {
			prompt: "Exchange 148 ones and 26 tens into hundreds, tens and ones. Find the total.",
			anchor: "lea1-practice"
		},
		challenge: {
			prompt: "Represent 1204 using only hundred-, ten- and one-pieces. Then allow thousand-pieces and compare piece counts.",
			anchor: "lea1-challenge"
		}
	},
	{
		code: "LEA2",
		method: "Compare numbers from the largest place first; the first unequal digit decides which is greater. To round, locate the two multiples of the requested place surrounding the number and choose the nearer one. This course rounds exact halfway cases upward for positive numbers. Keep an estimate separate from the exact quantity. Money can be compared in cents: 14 dollars and 82 cents is 1482 cents.",
		worked: "For 3468 rounded to the nearest hundred, the benchmarks are 3400 and 3500; 3468 is 32 from 3500 and 68 from 3400, so it rounds to 3500. Both 3468 and 3492 round to 3500, although 3468 is exactly 24 smaller.",
		tasks: [
			{
				title: "Party Food Rounding and Store Distance",
				prompt: "Store A is 3218 feet away and charges 14 dollars 82 cents for the party food. Store B is 3253 feet away and charges 14 dollars 50 cents. Round both prices to the nearest dollar and distances to the nearest hundred feet. Find exact differences. Under a rule of choosing the closer store when its extra cost is at most 50 cents, select a store and explain why estimates alone are insufficient.",
				anchor: "party-food-rounding-and-store-distance"
			}
		],
		practice: {
			prompt: "Round 5874 to the nearest ten and hundred. Compare it with 5849 using exact digits.",
			anchor: "lea2-practice"
		},
		challenge: {
			prompt: "Find two different whole numbers that round to 3500 to the nearest hundred, one below and one above 3500.",
			anchor: "lea2-challenge"
		}
	},
	{
		code: "LEA3",
		method: "Align digits by place. Addition combines each column and exchanges groups of ten into the next column. Subtraction exchanges a larger unit when the current column has too few. Record every exchange, especially across zero places. Estimate first and check a difference by adding it to the amount removed.",
		worked: "5637 + 2486 = 8123: the ones produce 13, tens 12 including the carried ten, and hundreds 11 including the carried hundred. For 8000 - 3764, exchange across the zero places to leave 7 thousands, 9 hundreds, 9 tens and 10 ones before removing: the result is 4236.",
		tasks: [
			{
				title: "Millionaire Addition and Subtraction Review",
				prompt: "Use hundreds, tens and ones, grouped into thousands where needed, to solve 6507 + 2748 and 9002 - 4685. Record exchanges and connect them to a written column calculation. Check subtraction by addition.",
				anchor: "millionaire-addition-and-subtraction-review"
			}
		],
		practice: {
			prompt: "Find 4728 + 3659 and 8387 - 3659.",
			anchor: "lea3-practice"
		},
		challenge: {
			prompt: "Find 10000 - 4876. Record each place after exchanging across zeros.",
			anchor: "lea3-challenge"
		}
	},
	{
		code: "LEA4",
		method: "A roster total adds the chosen players' values once each. Keep offense and defense in separate columns before combining. Round only after finding exact totals. A synergy adjustment is an extra score from a stated rule; apply it once when its condition is met. Change one player or position at a time to show which change caused the difference.",
		worked: "A three-player score of 36 + 42 + 28 totals 106. A stated pair bonus of 8 makes 114. Replacing the 28-point player with a 31-point player raises the base by three, but a pair bonus must be checked again if its players change.",
		tasks: [
			{
				title: "Soccer Season Team Skill Draft",
				prompt: "Use this fictional roster table; each pair is offense/defense: Oliver 42/31, Zai 35/44, Malik 48/29, Jessica 31/47, Mary 44/36, Stephany 39/43, Greg 46/30, Edgar 33/48, Samantha 45/38, Cadence 37/41. Team A uses Oliver, Zai, Malik, Jessica and Mary. Team B uses Stephany, Greg, Edgar, Samantha and Cadence. Find each team's offense, defense and combined totals, then round each total to the nearest ten. Compare corresponding exact totals using <, > or =.",
				anchor: "soccer-season-team-skill-draft"
			},
			{
				title: "Soccer Season Synergy Adjustment",
				prompt: "Use this fictional roster table; each pair is offense/defense: Oliver 42/31, Zai 35/44, Malik 48/29, Jessica 31/47, Mary 44/36, Stephany 39/43, Greg 46/30, Edgar 33/48, Samantha 45/38, Cadence 37/41. Use combined offense-plus-defense as the base. These are the complete synergy rules, applied once per listed pair when both are present: Oliver and Zai +12; Jessica and Mary +8; Malik and Edgar -6; Stephany and Greg +10; Samantha and Cadence +5. Other pairs add zero. A separate position bonus gives Greg +4 as attacker and Edgar +3 as defender; other positions add zero. Start with Team A from the draft and no position bonuses. Replace Malik with Greg, then place Greg as attacker. Record the score before the trade, after it and after the position change.",
				anchor: "soccer-season-synergy-adjustment"
			}
		],
		practice: {
			prompt: "A team has base score 248 and one 12-point pair bonus. A trade raises the base by 7 but removes that bonus. Compare scores.",
			anchor: "lea4-practice"
		},
		challenge: {
			prompt: "A roster's exact total is 387. A change adds 6 points. Compare the exact increase with the change in totals rounded to the nearest ten.",
			anchor: "lea4-challenge"
		}
	},
	{
		code: "LEA5",
		method: "Factors are whole numbers that multiply to make a number. List factor pairs systematically until the pairs begin to repeat. A multiple is a whole-number product of a given number. A prime has exactly two positive factors, one and itself; a composite has more than two. One has only one positive factor and is neither prime nor composite.",
		worked: "For 18, pairs are 1 \u00D7 18, 2 \u00D7 9 and 3 \u00D7 6. Factors are 1, 2, 3, 6, 9, 18. Multiples include 18, 36 and 54. Thirteen has only 1 and 13 as positive factors, so it is prime.",
		tasks: [
			{
				title: "Character Factor Arrangement",
				prompt: "Draw every distinct whole-number rectangular array, ignoring rotations, for 8, 18 and 25 characters. List all positive factors of 50 and 90 and their common factors. Classify 2, 3 and 13 as prime or composite, and name two positive multiples of each.",
				anchor: "character-factor-arrangement"
			}
		],
		practice: {
			prompt: "List factor pairs of 24 and explain whether 24 is prime.",
			anchor: "lea5-practice"
		},
		challenge: {
			prompt: "Decide whether every multiple of 4 is also a multiple of 2. Give a reason and a counterexample to the reverse claim.",
			anchor: "lea5-challenge"
		}
	},
	{
		code: "LEA6",
		method: "Split a multi-digit factor into place values, multiply every part by the one-digit factor, then add the partial products. This is the distributive property. A rounded estimate checks the size of the result. State whether a comparison is about the number of groups, group size or total.",
		worked: "6 \u00D7 163 = 6 \u00D7 (100 + 60 + 3) = 600 + 360 + 18 = 978. Rounding 163 to about 160 gives 960, close to the exact result.",
		tasks: [
			{
				title: "Halloween Candy One-Digit Multiplication",
				prompt: "Six friends each receive 3 Snickers in a fictional counting case. Find their combined count. Another friend has three times one friend's 3-piece count; a separate bag has 21 pieces. Compare all three totals. For a second collection, each of six friends has 163 mixed candies. Use partial products to find that collection's total and compare it with an estimate of 1000 candies.",
				anchor: "halloween-candy-one-digit-multiplication"
			}
		],
		practice: {
			prompt: "Find 7 \u00D7 248 with partial products.",
			anchor: "lea6-practice"
		},
		challenge: {
			prompt: "A box holds 198 counters. Find the count in 5 boxes using compensation and check with partial products.",
			anchor: "lea6-challenge"
		}
	},
	{
		code: "LEA7",
		method: "A two-digit multiplier represents tens and ones. Multiply by each place-value part, then add. An area model splits a rectangle into smaller rectangles whose areas are the partial products. Label the tens product with its true value rather than treating a ten as one.",
		worked: "23 \u00D7 14 = 23 \u00D7 (10 + 4) = 230 + 92 = 322. An area model can split both factors: 20 \u00D7 10 + 20 \u00D7 4 + 3 \u00D7 10 + 3 \u00D7 4 = 200 + 80 + 30 + 12.",
		tasks: [
			{
				title: "Birthday Treat Two-Digit Multiplication",
				prompt: "A fictional treat bag has one of each of 11 favorite foods for each of 25 classmates. First model 25 \u00D7 10. Add one more food per classmate to find 25 \u00D7 11, the extra treats needed and the complete total. Use a labeled area model or partial products.",
				anchor: "birthday-treat-two-digit-multiplication"
			}
		],
		practice: {
			prompt: "Find 34 \u00D7 12 with two partial products.",
			anchor: "lea7-practice"
		},
		challenge: {
			prompt: "Compare 25 \u00D7 19 with 25 \u00D7 20. Use the difference to find the first product.",
			anchor: "lea7-challenge"
		}
	},
	{
		code: "LEA8",
		method: "Division finds equal group sizes or group counts. The quotient gives the whole groups, and the remainder is smaller than the divisor. Check dividend = divisor \u00D7 quotient + remainder. A packing question may require one extra partly filled container; a question about full containers counts only complete groups.",
		worked: "122 \u00F7 8 gives 15 remainder 2 because 8 \u00D7 15 = 120 and 122 - 120 = 2. There are 15 full cartons and two loose eggs, or 16 cartons to pack every egg.",
		tasks: [
			{
				title: "Farm Egg Carton Division",
				prompt: "Pack 40 eggs separately into carton sizes of 4, 6 and 8. For each size, find full cartons, loose eggs and cartons needed to pack all eggs. Then choose size 8 for 122 eggs and give the same three answers. Check every quotient and remainder.",
				anchor: "farm-egg-carton-division"
			}
		],
		practice: {
			prompt: "Find 187 \u00F7 6 and interpret it as packing counters into six-counter bags.",
			anchor: "lea8-practice"
		},
		challenge: {
			prompt: "Find a whole-number dividend that gives quotient 12 and remainder 3 when divided by 7. Explain why the remainder is allowed.",
			anchor: "lea8-challenge"
		}
	},
	{
		code: "LEA9",
		method: "An allocation table must account for the entire budget, including any reserve. Long division works place by place even for large whole numbers; verify by multiplying and adding the remainder. A growth multiplier in this course is a fictional arithmetic rule. An exact two-to-one split uses three equal shares: two for the first group and one for the second. If whole dollars do not divide into three shares, keep the smallest reserve needed.",
		worked: "A budget of 100 whole dollars split two-to-one gives 100 \u00F7 3 = 33 remainder 1. Allocate 66 to one group, 33 to the other and reserve 1. The first allocation is exactly double the second, and 66 + 33 + 1 = 100.",
		tasks: [
			{
				title: "Arielle Investment Stage Split",
				prompt: "Use a fictional classroom budget of 5134533 whole dollars. Split it equally among Seed, Series A and Series B stages. Record any remainder and verify that the three stage totals add back to the budget.",
				anchor: "arielle-investment-stage-split"
			},
			{
				title: "Arielle Company Portfolio Choice",
				prompt: "Use this invented stage table, unrelated to current company funding: Seed labels are Xampla, Playco, Air Protein; Series A labels are Bear Flag Robotics, CookUnity, Spoon; Series B labels are Nextmind, Literati, SkyDrive. Within each stage, divide its 1711511-dollar budget as equally as whole dollars allow among its three listed companies. Give the first two listed companies one extra dollar when a remainder requires it. Explain the arithmetic and verify each stage total.",
				anchor: "arielle-company-portfolio-choice"
			},
			{
				title: "Arielle Reinvestment Growth Plan",
				prompt: "Apply these fictional ten-year multipliers to each original 1711511-dollar stage allocation: Seed \u00D72, Series A \u00D77, Series B \u00D719. Find each result and the combined total. Then quadruple the resulting Series B amount. Reallocate that quadrupled amount into Seed and Series A so Seed is exactly twice Series A, using whole dollars and the smallest possible unallocated reserve. Explain why a reserve is necessary.",
				anchor: "arielle-reinvestment-growth-plan"
			}
		],
		practice: {
			prompt: "Share 101 whole funding tokens equally among 4 projects. State the reserve.",
			anchor: "lea9-practice"
		},
		challenge: {
			prompt: "Split 203 whole tokens exactly two-to-one with the smallest reserve. Verify the ratio and budget.",
			anchor: "lea9-challenge"
		}
	},
	{
		code: "check-1",
		method: "Represent quantities before calculating. Expanded form supports place value and regrouping; arrays support factors and multiplication; division checks expose remainders. A rounded answer is an estimate and retains its stated rounding place. A decision must satisfy every budget or grouping condition.",
		worked: "A total of 157 counters in groups of six gives 26 full groups and one left: 6 \u00D7 26 + 1 = 157. Packing all counters needs 27 containers, while counting only full groups gives 26.",
		tasks: [
			{
				title: "Multiplication and Operations Check",
				prompt: "Solve: (1) value of 36 ten-pieces and 12 one-pieces; (2) 3486 rounded to the nearest hundred; (3) 7256 + 1987; (4) 9000 - 4768; (5) all positive factors of 18; (6) 24 \u00D7 13; (7) 157 \u00F7 6 with remainder; (8) whether 1 is prime or composite. Show models or written strategies for at least three answers.",
				anchor: "multiplication-and-operations-check"
			}
		],
		practice: {
			prompt: "Find 256 \u00D7 4 and 1024 \u00F7 4. Check the inverse relationship.",
			anchor: "check-1-practice"
		},
		challenge: {
			prompt: "A remainder record says 80 \u00F7 6 = 12 remainder 8. Repair it and explain the condition it violated.",
			anchor: "check-1-challenge"
		}
	},
	{
		code: "LEA10",
		method: "A point names a location and has no length. A line continues forever in both directions, shown with arrows. A line segment ends at two endpoints; a ray has one endpoint and continues in one direction. Use two labeled points to name a line or segment. In a ray's name, write its endpoint first.",
		worked: "Draw points A and B. Segment AB has endpoints A and B. Ray AB starts at A, passes through B and continues beyond B. Ray BA starts at B and continues in the opposite direction; the two names describe different rays.",
		tasks: [
			{
				title: "Lines, Segments, and Rays Sort",
				prompt: "On paper or a drawing tool, mark A and B three grid spaces apart. Draw a line through both with arrows at both ends, a separate segment AB with two endpoints, and a separate ray AB with endpoint A and an arrow beyond B. Label each and count its endpoints. Compare ray AB with ray BA.",
				anchor: "lines-segments-and-rays-sort"
			}
		],
		practice: {
			prompt: "Draw segment CD and ray CD. Explain which extends beyond D.",
			anchor: "lea10-practice"
		},
		challenge: {
			prompt: "Can a line have length five units? Explain using the distinction between a line and a segment.",
			anchor: "lea10-challenge"
		}
	},
	{
		code: "LEA11",
		method: "An angle measures the turn between two rays from a shared vertex. A full turn is 360\u00B0, a straight angle 180\u00B0, and a right angle 90\u00B0. An acute angle is between 0\u00B0 and 90\u00B0; an obtuse angle is between 90\u00B0 and 180\u00B0. Clockwise turns go right around a compass; counterclockwise turns go left. North, east, south and west are separated by right turns.",
		worked: "Starting north, a clockwise 90\u00B0 turn faces east. A further clockwise 45\u00B0 faces southeast. Turning counterclockwise 180\u00B0 then faces northwest. Track every turn from the current heading, rather than restarting at north.",
		tasks: [
			{
				title: "Compass Turn Angle Route",
				prompt: "Start facing north. Make these turns in order: right 90\u00B0, left 45\u00B0, right 180\u00B0, left 270\u00B0. Draw an arrow after each turn, label the turn sizes and give the final direction. Explain a shorter turn with the same effect as the last left turn.",
				anchor: "compass-turn-angle-route"
			}
		],
		practice: {
			prompt: "Start east, turn right 90\u00B0, then left 180\u00B0. Give each heading.",
			anchor: "lea11-practice"
		},
		challenge: {
			prompt: "An angle is 135\u00B0. Classify it, then find the angle needed to complete a straight angle.",
			anchor: "lea11-challenge"
		}
	},
	{
		code: "LEA12",
		method: "Classify triangles by sides and angles independently. Equilateral means three equal sides; isosceles means at least two equal sides, so equilateral triangles also fit the inclusive isosceles category. Scalene means all sides differ. A right triangle has one 90\u00B0 angle, an obtuse triangle has one angle above 90\u00B0, and an acute triangle has all angles below 90\u00B0. The three interior angles total 180\u00B0.",
		worked: "A triangle with sides 3, 4 and 5 units and a right angle is scalene and right. A triangle with three equal sides has three 60\u00B0 angles, so it is equilateral and acute; under the inclusive definition it is also isosceles.\n\n![Representative scalene right, equilateral acute and isosceles obtuse triangles.](/course-assets/late-elementary-a/triangle-groups-v1.svg)",
		tasks: [
			{
				title: "Triangle Attribute Sort",
				prompt: "Use these supplied cards. A: sides 3,4,5 with a right largest angle. B: sides 4,4,4 with all angles acute. C: sides 5,5,6 with all angles acute. D: sides 3,3,5 with an obtuse largest angle. E: sides 4,5,6 with all angles acute. Sort once by side class and once by angle class. Give all inclusive side labels and one combined description per card.",
				anchor: "triangle-attribute-sort"
			}
		],
		practice: {
			prompt: "A triangle has angles 45\u00B0,45\u00B0,90\u00B0 and two equal sides. Give side and angle classifications.",
			anchor: "lea12-practice"
		},
		challenge: {
			prompt: "Can a triangle contain two obtuse angles? Explain with the angle sum.",
			anchor: "lea12-challenge"
		}
	},
	{
		code: "LEA13",
		method: "Line symmetry means reflection across a line leaves a shape unchanged. A nonsquare rectangle has two symmetry lines, a square four, and a circle has a symmetry line through its center in every direction. Perpendicular lines meet at 90\u00B0. Distinguish a final angle from the turn made to reach it: subtract the final acute angle from the original right angle when turning toward a ceiling.",
		worked: "A light initially perpendicular to a horizontal ceiling makes a 90\u00B0 angle with it. If its final ray makes 23\u00B0 with the ceiling on the left side, the turn from the original downward ray is 90 - 23 = 67\u00B0. The final 23\u00B0 angle and the 67\u00B0 turn have different roles.\n\n![Light starting perpendicular and ending 23 degrees from the ceiling, with a 67 degree turn.](/course-assets/late-elementary-a/light-rotation-v1.svg)",
		tasks: [
			{
				title: "Obtuse Life Shape Photo Collection",
				prompt: "Create a drawn gallery from these supplied descriptions: a 6-by-3 rectangle; a square of side 4; a diamond-shaped nonsquare rhombus with angles 60\u00B0,120\u00B0,60\u00B0,120\u00B0; a regular five-point star outline; a circle; a triangle with sides 3,3,4; a right triangle with sides 3,4,5; and a slanted parallelogram with unequal adjacent sides. Label a rectangle, square, rhombus, star, circle, one-axis symmetry example, no-axis symmetry example, obtuse angle, right triangle and parallelogram. Use drawings as the complete gallery input.",
				anchor: "obtuse-life-shape-photo-collection"
			},
			{
				title: "Gallery Light Angle Setup",
				prompt: "Draw a horizontal ceiling through a light's pivot and an initial ray pointing straight down, perpendicular to the ceiling. Turn the ray toward the left until its smaller angle with the ceiling is 23\u00B0. Mark the original angle, final ceiling angle and the amount turned. Explain which difference gives the rotation.",
				anchor: "gallery-light-angle-setup"
			}
		],
		practice: {
			prompt: "A perpendicular light turns toward the ceiling until its final acute ceiling angle is 35\u00B0. Find the turn.",
			anchor: "lea13-practice"
		},
		challenge: {
			prompt: "Compare a 3-by-5 rectangle with a 4-by-4 square. List their lines of symmetry.",
			anchor: "lea13-challenge"
		}
	},
	{
		code: "LEA14",
		method: "A polygon is a closed shape made of straight segments. A pentagon has five sides, a hexagon six, a heptagon seven and an octagon eight. Its perimeter is the sum of all side lengths. An equilateral polygon has equal sides; a regular polygon also has equal angles. A symmetry line reflects the whole shape onto itself, including any marked internal design.",
		worked: "A regular hexagon has six sides. At three feet per side, its perimeter is 6 \u00D7 3 = 18 feet. A rectangular bed centered on a vertical symmetry line has matching left and right halves.",
		tasks: [
			{
				title: "Puppy Pen Perimeter and Symmetry",
				prompt: "Choose a regular polygon with 4,5,6,7 or 8 sides, each 3 feet long. Draw and label it and calculate the fencing needed for the full boundary. Then draw a rectangular puppy bed with a centered vertical line and add a left-hand feature together with its reflected right-hand copy.",
				anchor: "puppy-pen-perimeter-and-symmetry"
			}
		],
		practice: {
			prompt: "Find the perimeter of a regular pentagon with side 7 cm.",
			anchor: "lea14-practice"
		},
		challenge: {
			prompt: "Two pens each have equal 3-foot sides, and one needs 6 more feet of fencing. How many more sides does it have?",
			anchor: "lea14-challenge"
		}
	},
	{
		code: "LEA15",
		method: "A quadrilateral has four sides. A parallelogram has two pairs of parallel sides; a rectangle adds four right angles. A rhombus has four equal sides, and a square is both a rectangle and a rhombus. Categories overlap. As in Early Elementary B, this course uses the inclusive trapezoid definition of at least one parallel pair.",
		worked: "A square has two parallel pairs, four equal sides and four right angles. It therefore fits parallelogram, rectangle, rhombus, square and quadrilateral categories. A nonsquare rectangle lacks four equal sides.",
		tasks: [
			{
				title: "Quadrilateral Attribute Sort",
				prompt: "Use four cards: A is a 6-by-3 rectangle; B a square of side 4; C a rhombus with four sides of 5 and angles 60\u00B0,120\u00B0,60\u00B0,120\u00B0; D a parallelogram with alternating sides 3 and 5 and angles 60\u00B0,120\u00B0,60\u00B0,120\u00B0. Sort by two parallel pairs, four equal sides, four right angles and rectangle-with-four-equal-sides. List every applicable parallelogram, rectangle, rhombus and square category.",
				anchor: "quadrilateral-attribute-sort"
			}
		],
		practice: {
			prompt: "A parallelogram has four right angles and adjacent side lengths 2 and 5. Name its categories.",
			anchor: "lea15-practice"
		},
		challenge: {
			prompt: "Explain why every square is a rectangle but some rectangles are not squares.",
			anchor: "lea15-challenge"
		}
	},
	{
		code: "LEA16",
		method: "For a rectangular prism, volume is length \u00D7 width \u00D7 depth in cubic units. A pool open at the top has a tiled bottom and four side faces; add their rectangular areas using square units. Its top boundary perimeter is 2 \u00D7 length + 2 \u00D7 width. Choose positive dimensions satisfying the perimeter before comparing area or volume.",
		worked: "A 9-foot-by-6-foot pool has perimeter 30 feet. At depth 2 feet, bottom area is 54 square feet and sides total 2 \u00D7 9 \u00D7 2 + 2 \u00D7 6 \u00D7 2 = 60 square feet. Tile area is 114 square feet; volume is 9 \u00D7 6 \u00D7 2 = 108 cubic feet.",
		tasks: [
			{
				title: "Backyard Pool Area and Volume",
				prompt: "Use a rectangular-prism classroom pool model with top perimeter 30 feet and depth 2 feet. Choose length 9 feet and width 6 feet. Check the perimeter and find tile area for the bottom and all four inside sides, excluding the open top. Find water capacity in cubic feet. Then compare with length 8 feet and width 7 feet at the same depth.",
				anchor: "backyard-pool-area-and-volume"
			}
		],
		practice: {
			prompt: "Find the volume of a 5-by-4-by-3 cm rectangular prism and its bottom area.",
			anchor: "lea16-practice"
		},
		challenge: {
			prompt: "A rectangular open-top box is 6 by 4 by 2 cm. Find the area of material in its bottom and four sides.",
			anchor: "lea16-challenge"
		}
	},
	{
		code: "LEA17",
		method: "A scale connects each drawing length to an actual length. Calculate areas from actual dimensions or convert square units consistently. Nonoverlapping amenity areas add; subtract their sum from total park area to find unused space. For rectangular-prism volume, divide by the product of two known dimensions to recover the third.",
		worked: "A 10-by-8-foot model park has area 80 square feet. Nonoverlapping 3-by-4 and 2-by-5 amenities use 12 + 10 = 22, leaving 58 square feet. A prism with volume 120 cubic feet, width 5 feet and depth 3 feet has length 120 \u00F7 (5 \u00D7 3) = 8 feet.",
		tasks: [
			{
				title: "LA River Elevated Park Plan",
				prompt: "Use a fictional rectangular park plan 20 feet long and 12 feet wide, with scale 1 cm representing 2 feet. A 6-by-4-foot garden sits in the top-left corner; an 8-by-5-foot play space in the top-right corner; a 4-by-3-foot picnic space in the bottom-left corner. Draw these without overlap. Find each area, total used area, remaining area, full outer perimeter and drawing dimensions in centimeters.",
				anchor: "la-river-elevated-park-plan"
			},
			{
				title: "LA River Pool and Hot Tub Volume Plan",
				prompt: "Use classroom rectangular-prism quantities. A pool model has width 260 feet, depth 4 feet and volume 7280 cubic feet. Solve for length. A separate hot-tub model has one fifth that volume and width 91 feet. Choose length 8 feet, solve its depth and verify both volume equations. Treat these as arithmetic model dimensions.",
				anchor: "la-river-pool-and-hot-tub-volume-plan"
			}
		],
		practice: {
			prompt: "A 12-by-10 unit park contains separate 3-by-4 and 2-by-6 unit areas. Find unused area and perimeter.",
			anchor: "lea17-practice"
		},
		challenge: {
			prompt: "A model prism has volume 360 cubic units and width 9. Find two positive whole-number length/depth pairs.",
			anchor: "lea17-challenge"
		}
	},
	{
		code: "check-2",
		method: "Select a representation suited to each quantity: arrows/endpoints for lines, a vertex and rays for angles, side and angle attributes for shapes, boundary sums for perimeter, square faces for area and unit cubes for volume. Keep a final angle separate from an amount turned. Label every answer with its correct type of unit.",
		worked: "A 7-by-4 rectangle has perimeter 22 units and area 28 square units. Making it a prism of depth 2 gives volume 56 cubic units. Three different measurements arise from the same two base lengths.",
		tasks: [
			{
				title: "Geometry and Measurement Check",
				prompt: "Solve: (1) endpoints in a ray and a segment; (2) turn from a perpendicular light to a final 23\u00B0 ceiling angle; (3) direction after a right 45\u00B0 turn from north; (4) classify a triangle with sides 5,5,8 and a supplied obtuse largest angle; (5) perimeter of a regular hexagon with side 3 cm; (6) area and perimeter of a 7-by-4 cm rectangle; (7) volume of a 3-by-4-by-2 cm prism; (8) all applicable square, rectangle, rhombus and parallelogram labels for a square. Explain at least three answers with diagrams or equations.",
				anchor: "geometry-and-measurement-check"
			}
		],
		practice: {
			prompt: "Classify 35\u00B0,90\u00B0,125\u00B0. Find the missing angle if a triangle has 35\u00B0 and 90\u00B0 angles.",
			anchor: "check-2-practice"
		},
		challenge: {
			prompt: "A rectangular prism has base area 24 square cm and volume 120 cubic cm. Find its depth and explain the unit cancellation.",
			anchor: "check-2-challenge"
		}
	}
];
