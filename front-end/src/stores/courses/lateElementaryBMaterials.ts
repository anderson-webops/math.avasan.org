import type { ElementaryMaterial } from "./earlyElementaryAMaterials";

export const lateElementaryBMaterials: ElementaryMaterial[] = [
	{
		code: "LEB1",
		method: "A fraction names equal parts of a fixed whole: the denominator counts its equal parts and the numerator counts selected parts. Multiplying or dividing both numbers by the same nonzero number changes the partition but preserves the amount. A model must keep the same whole and equal-size pieces.",
		worked: "One half of a 20-counter collection is 10 counters. Splitting each half into three equal parts gives 3/6 of the same whole, still one half. Numerically 1/2 = 2/4 = 3/6 = 10/20.",
		tasks: [
			{
				title: "Hot Dog Contest Equivalent Fractions",
				prompt: "Each of five fictional contestants receives a plate of 20 equal-size hot dogs. Compare one half of a plate, 10 hot dogs, 10/20 of a plate, 2/4 and 3/6 of a plate. Draw each plate and give three further fractions equivalent to one half. Explain which fractions describe regrouped equal portions rather than single hot dogs.",
				anchor: "hot-dog-contest-equivalent-fractions"
			}
		],
		practice: {
			prompt: "Rewrite 3/4 with denominator 12 and explain the repartition.",
			anchor: "leb1-practice"
		},
		challenge: {
			prompt: "Can 2/3 and 4/6 describe different lengths? Give an example and state when equivalent fractions have equal amounts.",
			anchor: "leb1-challenge"
		}
	},
	{
		code: "LEB2",
		method: "Compare fractions of the same whole. Equal denominators make numerator comparison direct; otherwise use equivalent fractions with a common denominator or a number line. A larger denominator alone does not imply a larger fraction. Ordered lengths need units.",
		worked: "For 2/3 and 3/4, use twelfths: 8/12 < 9/12, so 2/3 < 3/4. Both are above one half, but that benchmark alone does not decide their order.",
		tasks: [
			{
				title: "Chore Ribbon Fraction Ordering",
				prompt: "Three chores need ribbon in shortest-to-longest order: label a jar, tie a parcel, decorate a basket. First compare 3/4 meter with 1/4 meter. Then order the available 7/8-meter, 2/3-meter and 4/5-meter ribbons and assign one to each chore. Draw a common number line.",
				anchor: "chore-ribbon-fraction-ordering"
			}
		],
		practice: {
			prompt: "Order 5/6, 3/4 and 7/12 from least to greatest.",
			anchor: "leb2-practice"
		},
		challenge: {
			prompt: "Find one fraction strictly between 2/3 and 3/4.",
			anchor: "leb2-challenge"
		}
	},
	{
		code: "LEB3",
		method: "Add or subtract equal-size fractional units. Rewrite unlike denominators using a common denominator, then combine numerators while keeping that denominator. A correction removes an earlier amount; an added distance increases the completed total. Check that a race fraction stays between zero and one.",
		worked: "3/8 + 1/4 = 3/8 + 2/8 = 5/8. Removing an incorrectly credited 1/16 gives 10/16 - 1/16 = 9/16. Adding denominators would change the size of the units.",
		tasks: [
			{
				title: "Relay Race Fraction Progress",
				prompt: "A relay starts at zero. Runner 1 completes 1/4 of the race, then another 1/8. A measurement correction removes 1/16 from the credited distance. A replacement runner adds 1/4; Runner 3 adds 3/16 before stopping. Shade a 16-part track after every update. Find the completed fraction and the distance a final runner must cover.",
				anchor: "relay-race-fraction-progress"
			}
		],
		practice: {
			prompt: "Calculate 2/3 + 1/6 and then subtract 1/4.",
			anchor: "leb3-practice"
		},
		challenge: {
			prompt: "A runner claims 3/5 + 1/2 = 4/7 of a race. Correct the operation and interpret the result.",
			anchor: "leb3-challenge"
		}
	},
	{
		code: "LEB4",
		method: "Multiplying by a fraction selects that fraction of an amount. In an area model, partition a whole in two directions; the overlap gives the product. Multiplying numerators counts selected small parts and multiplying denominators counts all small parts. Two positive fractions below one have a product smaller than either factor.",
		worked: "Two thirds of one half is 2/3 × 1/2 = 2/6 = 1/3. Divide a rectangle into three columns and two rows; selecting two columns within one row marks two of six equal cells.",
		tasks: [
			{
				title: "Fraction of a Fraction Models",
				prompt: "For the same-size rectangular whole in every case, draw and label 1/2 of 1/2, 1/3 of 1/3, 2/3 of 1/4 and 2/5 of 1/2. Partition in two directions, count the overlap and write each simplified product. Explain the connection between of and multiplication.",
				anchor: "fraction-of-a-fraction-models"
			}
		],
		practice: {
			prompt: "Find 3/4 of 2/3 using a 4-by-3 area grid.",
			anchor: "leb4-practice"
		},
		challenge: {
			prompt: "Compare 3/4 × 1/2 with 3/4 × 2. Explain why one shrinks and the other grows.",
			anchor: "leb4-challenge"
		}
	},
	{
		code: "LEB5",
		method: "Division asks how many groups of a specified size fit an amount, or how large one equal share is. To divide by a nonzero fraction, multiply by its reciprocal: this rescales the group size to one. Verify with divisor × quotient = dividend. A fractional number of boxes can describe capacity even when a purchase needs whole boxes.",
		worked: "A 3/4-pie amount divided into 1/8-pie portions gives (3/4) ÷ (1/8) = (3/4) × 8 = 6 portions. In eighths, six eighths divided by one eighth is six.",
		tasks: [
			{
				title: "Pie Box Fraction Division",
				prompt: "One box holds six equal slices, one of each flavor; each slice is 1/8 of an identical whole pie. Find the pie amount in a full box, half a box and two thirds of a box. Then divide 1/2 pie into 1/8-pie servings and divide 1 whole pie by the full-box pie amount. Distinguish box-equivalent capacity from whole boxes needed to hold all the pie.",
				anchor: "pie-box-fraction-division"
			}
		],
		practice: {
			prompt: "How many 1/6-liter servings fit 2/3 liter?",
			anchor: "leb5-practice"
		},
		challenge: {
			prompt: "Share 3/4 of a pie equally among three people, then find how many 1/8-pie servings each share contains.",
			anchor: "leb5-challenge"
		}
	},
	{
		code: "LEB6",
		method: "A part-to-original fraction compares a current quantity with its stated baseline. Savings must be subtracted before computing the current fraction. A recipe scale multiplies every ingredient by the same factor while preserving units and ratios. A named classroom scenario is evidence for its arithmetic, not a current company report.",
		worked: "If a fictional cost falls from 12 units to 9, current/original is 9/12 = 3/4 and savings/original is 3/12 = 1/4. A recipe scaled from 4 to 12 cups of flour multiplies all ingredients by three.",
		tasks: [
			{
				title: "Angela Tesla Footprint Report",
				prompt: "In this fictional classroom report, Angela compares last-year emissions of 175,000 tons with current emissions of 130,000 tons. Last-year operating costs were 9 million dollars and this year saves 3 million dollars. Find current/original and savings/original fractions for emissions and cost. Mark the current fractions on number lines from 0 to 1.",
				anchor: "angela-tesla-footprint-report"
			},
			{
				title: "Carbon Lighthouse Chiffon Cake Ratios",
				prompt: "Use this fictional scaling exercise with 36 cups of flour. For each cup of flour, use 1/48 cup baking powder, 2 eggs, 1/2 cup sugar, 1/4 cup oil, 2/3 cup milk, 1/12 cup chosen flavor ingredient and 1/288 cup salt. Choose one flavor: cocoa for chocolate, vanilla mixture, strawberry puree, matcha mixture, cardamom mixture or lemon mixture. Make a complete ingredient table and show three multiplications.",
				anchor: "carbon-lighthouse-chiffon-cake-ratios"
			}
		],
		practice: {
			prompt: "A fictional baseline of 80 units falls to 60. Find current and saved fractions.",
			anchor: "leb6-practice"
		},
		challenge: {
			prompt: "A mixture uses 2/3 cup milk per cup flour. How much milk is needed for 9/2 cups flour?",
			anchor: "leb6-challenge"
		}
	},
	{
		code: "LEB7",
		method: "Decimal places continue the base-ten pattern: tenths, hundredths and thousandths. Each place is one tenth of the place to its left. Money uses dollars and hundredths of a dollar; one dime is 0.10 dollar and one penny is 0.01 dollar. Preserve the place value when exchanging coins.",
		worked: "247 pennies are 247 hundredths of a dollar, or 2.47 dollars. Thirty-five dimes are 35 tenths, or 3.50 dollars. Their sum is 5.97 dollars.",
		tasks: [
			{
				title: "Phone Savings Decimal Exchange",
				prompt: "Savings contain 9,450 pennies and 4,561 dimes. Convert each collection to dollars, add the savings and compare with a fictional phone price of 549.95 dollars including all charges. Find the remaining money or shortfall. Show why 4,561 dimes are divided by ten rather than one hundred.",
				anchor: "phone-savings-decimal-exchange"
			}
		],
		practice: {
			prompt: "Write 308 hundredths and 47 tenths as decimals and add them.",
			anchor: "leb7-practice"
		},
		challenge: {
			prompt: "Is 4.50 equal to 4.5? Explain using place value.",
			anchor: "leb7-challenge"
		}
	},
	{
		code: "LEB8",
		method: "Align decimal places when comparing; trailing zeros can expose equal-sized units. To round, find the neighboring multiples of the target place and choose the nearer one. Positive exact-halfway values round upward in this course. Rank race durations from smaller to larger because less time is faster.",
		worked: "1.264 is 1.2640 and 1.28 is 1.2800, so 1.264 < 1.28. To the nearest tenth, 1.264 is 1.3 because it is past the halfway point 1.25.",
		tasks: [
			{
				title: "Race Time Decimal Ranking",
				prompt: "Four fictional short-sprint durations are 1.21, 1.28, 1.3 and 1.264 seconds. Rank them fastest to slowest, round each original value to one decimal place, and propose two possible times for an additional runner who would finish strictly third among the five runners. Use the exact values when ranking.",
				anchor: "race-time-decimal-ranking"
			}
		],
		practice: {
			prompt: "Order 2.09, 2.9 and 2.105 and round each to the nearest tenth.",
			anchor: "leb8-practice"
		},
		challenge: {
			prompt: "Find two different decimals that both round to 1.3 to the nearest tenth but lie on opposite sides of 1.3.",
			anchor: "leb8-challenge"
		}
	},
	{
		code: "LEB9",
		method: "For addition and subtraction, align equal decimal places. Multiplication by a unit price gives a cost; division by that price recovers the quantity. Track currency and mass separately. Round money only at the stated payment step, and verify a budget by adding change back to the payment.",
		worked: "At 2.40 dollars per kilogram, 1.5 kilograms costs 1.5 × 2.40 = 3.60 dollars. A 4.25-dollar subtotal plus 0.35 tax is 4.60; change from 10 dollars is 5.40.",
		tasks: [
			{
				title: "Birthday Salsa Decimal Budget",
				prompt: "The list is 2.5 kg tomatoes at 2.40 dollars/kg, 0.75 kg onion at 1.60 dollars/kg, 3 limes at 0.79 dollar each, and jalapenos at 4.00 dollars/kg. The register subtotal is 10.97 dollars before tax. Recover the jalapeno cost and mass and decide whether 0.35 kg was purchased. Add 0.83 dollar tax and find change from 20 dollars.",
				anchor: "birthday-salsa-decimal-budget"
			}
		],
		practice: {
			prompt: "Buy 1.25 kg at 3.20 dollars/kg and add 0.40 tax. Find change from 5 dollars.",
			anchor: "leb9-practice"
		},
		challenge: {
			prompt: "A 0.6-kg item costs 2.70 dollars. Recover the price per kilogram.",
			anchor: "leb9-challenge"
		}
	},
	{
		code: "LEB10",
		method: "Tables supply values and category definitions before arithmetic begins. A threshold gap is zero for values already meeting it. A strict pass requires a final total greater than the target. Audience categories may overlap across different dimensions; keep age and audience-label totals distinct. Fictional viewing counts describe this sample only.",
		worked: "A counter at 94 needs more than six to pass 100. If each action adds four, one action reaches 98 and two reach 102; two actions are needed. Reaching a target and passing it are different conditions.",
		tasks: [
			{
				title: "Rahul YouTube Views Table",
				prompt: "Use these fictional video counts: Career 23,400; Interview 18,200; App Demo 12,700; Study Plan 9,480; Design Notes 3,830. Rank the videos, total their views and compute each gap to the exercise threshold of 20,000 views. Express their total as a fraction of an exact 178,000-view channel snapshot. This threshold is a classroom rule.",
				anchor: "rahul-youtube-views-table"
			},
			{
				title: "Facebook Sharing Growth Goal",
				prompt: "A later fictional channel snapshot is 178.603k views, where k means one thousand. Each friend sharing once adds exactly 1.2k views in this arithmetic model. Find the fewest whole shares needed to pass 200,000 views. Verify the count immediately below and the chosen count.",
				anchor: "facebook-sharing-growth-goal"
			},
			{
				title: "Video Demographics Fraction Analysis",
				prompt: "Use a fictional 3,830-view table. Columns are kids/teens, adults: male-labeled 600, 1400; female-labeled 500, 1000; another self-described label 130, 200. Categories within each dimension are disjoint. Find fractions of all views that are male-labeled, another label, adults and female-labeled adults. Then find female-labeled adults as a fraction of adult views. Suggest one future-video experiment without inferring interests from a label.",
				anchor: "video-demographics-fraction-analysis"
			}
		],
		practice: {
			prompt: "Three fictional videos have 12,500, 20,000 and 22,500 views. Find their total and gaps to 20,000.",
			anchor: "leb10-practice"
		},
		challenge: {
			prompt: "A counter starts at 80 and each share adds 5. How many shares reach 100? How many pass it?",
			anchor: "leb10-challenge"
		}
	},
	{
		code: "check-1",
		method: "A check-in samples each skill with explicit inputs. Keep a fixed whole for fraction models and align places for decimals. Show a representation and one inverse or estimate check. A wrong answer identifies the particular operation to review before attempting a changed case.",
		worked: "For 3/4 - 1/6, twelfths give 9/12 - 2/12 = 7/12. Check by adding 1/6 back. For 2.4 - 0.75, write 2.40 - 0.75 = 1.65.",
		tasks: [
			{
				title: "Fractions and Decimals Check",
				prompt: "Complete these independent cases: rewrite 3/5 with denominator 20; compare 5/8 and 2/3; find 3/4 + 1/6 and 5/6 - 1/4; calculate (2/3)(3/4) and (3/4) ÷ (1/8); write 47 hundredths as a decimal; order 0.7, 0.68, 0.705; round 2.675 to hundredths using the course rule; calculate 3.6 + 0.85 and change from 10 dollars after a 4.75-dollar purchase. Draw one fraction model and check one operation inversely.",
				anchor: "fractions-and-decimals-check"
			}
		],
		practice: {
			prompt: "Find 1/2 + 2/5 and 2.50 - 0.85.",
			anchor: "check-1-practice"
		},
		challenge: {
			prompt: "Explain why 1/2 + 1/3 is not 2/5 using sixths.",
			anchor: "check-1-challenge"
		}
	},
	{
		code: "LEB11",
		method: "A conversion multiplies by a ratio representing one. Convert every quantity in a ranking to the same unit first. Use 12 inches per foot, 100 centimeters per meter, 1000 grams per kilogram and 60 seconds per minute. For the mixed-system exercise use the declared approximation 1 pound ≈ 0.454 kilogram; retain that approximation label.",
		worked: "5 feet 8 inches = 5 × 12 + 8 = 68 inches. One minute 45 seconds = 60 + 45 = 105 seconds. The whole-number minute and leftover seconds must both be included.",
		tasks: [
			{
				title: "Guinness Unit Conversion Rankings",
				prompt: "Use fictional event data. Heights: Lana 5 ft 6 in, Rich 67 in, Gary 5 ft 8 in, Trey 64 in; Oliver 1.72 m, Kara 165 cm, Jack 1 m 80 cm, Amelia 168 cm. Lifts: Derek 150 lb, Paul 72 kg; use 1 lb ≈ 0.454 kg. Planks: Ethel 120 s, George 2 min 10 s, Steven 1 min 55 s, Carl 125 s. Rank each group from smallest to largest in one common unit and identify the longest plank.",
				anchor: "guinness-unit-conversion-rankings"
			}
		],
		practice: {
			prompt: "Convert 2.35 m to centimeters and 3 min 8 s to seconds.",
			anchor: "leb11-practice"
		},
		challenge: {
			prompt: "A comparison claims 1.8 meters is shorter than 175 centimeters because 1.8 < 175. Correct it.",
			anchor: "leb11-challenge"
		}
	},
	{
		code: "LEB12",
		method: "Standardized plans label both original and converted units. A declared approximate conversion produces an approximate result. Keep exact fractions where a repeating decimal is unnecessary. A route interval is a distance between markers; the starting point is not an extra traveled interval.",
		worked: "Using 1 mile = 1.61 kilometers for this exercise, 250 miles = 402.5 kilometers. Stops every 50 miles through 250 occur at 50, 100, 150, 200 and 250: five traveled intervals after the start.",
		tasks: [
			{
				title: "Israel Argo AI Blueprint Conversion",
				prompt: "A fictional vehicle blueprint lists 2,900 lb mass, 6.25 ft width, 17 ft length and 5 ft height. Provide both records: ounces and yards, then kilograms and meters. Use 16 oz/lb, 3 ft/yd, 0.3048 m/ft and approximately 0.454 kg/lb. Label approximate mass separately from the exact dimensional conversions.",
				anchor: "israel-argo-ai-blueprint-conversion"
			},
			{
				title: "Autonomous Test Drive Stop Map",
				prompt: "A fictional route runs from mile 0 to mile 1000. Mark the start and a scheduled stop every 125 miles, including the destination. Use the classroom conversion 1 mile = 1.61 km to give every marker in kilometers. Count stops after departure and explain the count of markers versus intervals.",
				anchor: "autonomous-test-drive-stop-map"
			}
		],
		practice: {
			prompt: "Convert 9 feet to yards and meters using the given factors.",
			anchor: "leb12-practice"
		},
		challenge: {
			prompt: "Stops occur every 80 miles on a 400-mile route, including the destination. How many stops follow departure?",
			anchor: "leb12-challenge"
		}
	},
	{
		code: "LEB13",
		method: "An expression records operations on quantities. Parentheses preserve a sequence when a whole intermediate result must be scaled. Evaluate parentheses, then multiplication/division from left to right, then addition/subtraction from left to right. Equal-precedence operations share the same level.",
		worked: "To add 3 to a die value of 4 and then double the result, write (4 + 3) × 2 = 14. The expression 4 + 3 × 2 equals 10 and represents a different sequence.",
		tasks: [
			{
				title: "Dice and Coin Score Expressions",
				prompt: "Use a recorded die value 5 in round 1: subtract 1, double, add 4, multiply by 3 and divide by 2. Round 2 uses die value 4: heads adds 6 before multiplying by 3; tails subtracts 2 before multiplying by 3. Write expressions and totals for both outcomes. In the heads case this total is second place; third has 7 fewer points and first has 9 more. Find all three scores.",
				anchor: "dice-and-coin-score-expressions"
			}
		],
		practice: {
			prompt: "Evaluate (8 + 4) ÷ 3 × 2 and 8 + 4 ÷ 2.",
			anchor: "leb13-practice"
		},
		challenge: {
			prompt: "Evaluate 24 ÷ 6 × 2 and explain the order.",
			anchor: "leb13-challenge"
		}
	},
	{
		code: "LEB14",
		method: "Decompose a factor into hundreds, tens and ones and add partial products. Unit conversion may supply another factor, such as twelve donuts per dozen. Keep weekly retail counts separate from monthly catering counts unless a question combines the same period and categories.",
		worked: "124 × 23 = 124 × 20 + 124 × 3 = 2480 + 372 = 2852. The partial products show why the tens row is shifted one place.",
		tasks: [
			{
				title: "Donut Shop Production Plan",
				prompt: "A fictional shop serves 326 customers per day, one donut each, for seven days. Separately, a month has 289 catering orders of one dozen donuts each. Exactly half the catering donuts are frosted, with 123 sprinkles each. Find weekly retail donuts, monthly catering donuts, frosted catering donuts and their total sprinkles. Keep the time periods separate.",
				anchor: "donut-shop-production-plan"
			}
		],
		practice: {
			prompt: "Calculate 247 × 36 using partial products.",
			anchor: "leb14-practice"
		},
		challenge: {
			prompt: "There are 125 boxes of 24 pencils. Find the total and check with an alternative grouping.",
			anchor: "leb14-challenge"
		}
	},
	{
		code: "LEB15",
		method: "Estimate a quotient, divide by place value, and check dividend = divisor × quotient + remainder with remainder smaller than divisor. A partial parking row or pizza still requires one whole row or pizza. Money shared equally may use hundredths even when the whole-dollar division has a remainder.",
		worked: "For 250 ÷ 24, ten groups use 240 and leave 10: quotient 10 remainder 10. A packing task requiring all 250 objects needs eleven boxes of capacity 24, not ten.",
		tasks: [
			{
				title: "Birthday Party Division Budget",
				prompt: "A fictional party has 378 guests and 192 cars. Parking rows hold 7 cars. Each guest needs one serving: a 78-dollar large pizza feeds 12 guests and a 95-dollar extra-large pizza feeds 18. Buy only one pizza size per plan and round quantities up. Compare the two plans. Separately split 1570 dollars equally across 25 entertainment services. Find parking rows, last-row occupancy, pizza quantities/costs and payment per service.",
				anchor: "birthday-party-division-budget"
			}
		],
		practice: {
			prompt: "Pack 487 counters into boxes of 24. Find full boxes, remainder and boxes needed for all counters.",
			anchor: "leb15-practice"
		},
		challenge: {
			prompt: "Share 126 dollars equally among 24 people. State each share and verify the total.",
			anchor: "leb15-challenge"
		}
	},
	{
		code: "LEB16",
		method: "The coordinate plane has a horizontal x-axis, a vertical y-axis and origin (0,0). An ordered pair (x,y) gives horizontal movement first and vertical movement second. In this first-quadrant map, each train stop is one unit east and each bus stop one unit north. A point names a location; an axis route specifies a path.",
		worked: "From the origin to (3,4), travel three units east and four north. Reversing the coordinates gives (4,3), a different point. Both lie above and to the right of the origin.",
		tasks: [
			{
				title: "Town Map Coordinate Routes",
				prompt: "Use this complete fictional map: home (0,0), park (3,4), school (6,2), library (2,7), plaza (8,11). The horizontal axis counts eastbound train stops and the vertical axis northbound bus stops, each starting at zero. Plot and label all five points. Give east-then-north directions from home, and count axis-route steps to each destination.",
				anchor: "town-map-coordinate-routes"
			}
		],
		practice: {
			prompt: "Plot (2,5) and (5,2). Describe each from the origin.",
			anchor: "leb16-practice"
		},
		challenge: {
			prompt: "A rectangle has vertices (1,1),(5,1),(5,4),(1,4). Find side lengths and area.",
			anchor: "leb16-challenge"
		}
	},
	{
		code: "LEB17",
		method: "A table pairs time with a modeled quantity. An additive pattern changes by a fixed difference; a multiplicative pattern changes by a fixed factor. State the time unit and the observed domain. A discrete doubling table need not contain every intermediate value, and extending a fictional rule does not validate a real animal growth forecast.",
		worked: "A quantity starting at 3 and doubling at whole-month records gives 3,6,12,24. A quantity starting at 20 and falling by 2 per week gives 20,18,16,14. Their plots have different change patterns.",
		tasks: [
			{
				title: "Zoo Animal Growth Coordinate Tables",
				prompt: "Use fictional arithmetic models. Charlie starts at 1 pound at month 0 and doubles at each whole-month record through month 6. Kondo starts at 145 pounds at week 0 and loses 5 pounds per week; define two months as exactly eight weeks for this exercise. Make both tables and plot time horizontally. Does a Charlie record equal 24 pounds? Bracket it if not. When does Kondo reach 100 pounds, and is that within the eight-week table?",
				anchor: "zoo-animal-growth-coordinate-tables"
			}
		],
		practice: {
			prompt: "A fictional quantity starts at 5 and doubles for four whole steps. List steps 0–4.",
			anchor: "leb17-practice"
		},
		challenge: {
			prompt: "A quantity starts at 90 and loses 4 per step. At what whole step does it first fall below 60?",
			anchor: "leb17-challenge"
		}
	},
	{
		code: "LEB18",
		method: "Use a declared circular-track toy model: fixed radius, constant speed and no gravity. Take π = 3.14 and one classroom AU = 98 million miles; this AU is a fictional course constant. Circumference C = 2πr; period = C/speed. Convert hours to days by dividing by 24. On the same circle, a faster follower closes the initial arc gap at the speed difference. Different concentric circles do not intersect.",
		worked: "For radius 1 classroom AU, C = 6.28 AU = 615440000 miles. At 60000 mph, one lap takes 10257⅓ hours, or about 427.39 days. These results follow the supplied toy constants rather than a real orbit prediction.",
		tasks: [
			{
				title: "Chanh Tesla Orbit Measurement",
				prompt: "Open the [Tesla-Retriever experiment](/tesla-retriever) and use its fictional circular-track model with center (0,0). Tesla starts at (2,0) classroom AU and moves counterclockwise at 60000 mph on radius 2 AU. Sketch the circle, label its four axis crossings, and calculate circumference in AU and miles, lap time in hours and days. Use π = 3.14 and 98000000 miles per classroom AU.",
				anchor: "chanh-tesla-orbit-measurement"
			},
			{
				title: "Tesla-Retriever Intercept Simulation",
				prompt: "Open the [Tesla-Retriever experiment](/tesla-retriever). Use the supplied circular-track model with π = 3.14 and 98000000 miles per classroom AU. Tesla starts at (2,0), radius 2 AU, at 60000 mph. Choose a TR9000 starting radius from 0.5–3 AU; it starts on the negative x-axis at 60000 mph. Predict whether the tracks can meet. Advance time, record both coordinates, and change TR9000 speed in 150-mph increments. Compare an equal-speed trial, a different-radius trial, and a radius-2 trial at 60150 mph. Estimate the first intercept point and time, then compare the observed result with your calculation from the initial half-circumference gap and speed difference. Show positions before and at the intercept. Explain the model limits.",
				anchor: "tesla-retriever-intercept-simulation"
			},
			{
				title: "Orbit Speed Comparison",
				prompt: "Use the same toy constants, and declare the trial speed rule v = 60000/r mph, where r is the numerical radius in classroom AU. Compare speeds and periods for r = 2 and r = 0.5. Separately compare a fictional Earth track at r = 1 and 60000 mph with a fictional Mars track at r = 1.6 and the given 50000 mph; these comparison speeds are separate supplied inputs. Find each period in days and explain which comparisons follow the trial rule.",
				anchor: "orbit-speed-comparison"
			}
		],
		practice: {
			prompt: "Under the same toy constants, find circumference in miles for radius 0.5 classroom AU.",
			anchor: "leb18-practice"
		},
		challenge: {
			prompt: "Two objects travel on one 100-mile circular track in the same direction. The follower starts 20 miles behind, at 35 mph, while the leader moves at 30 mph. Find first catch time.",
			anchor: "leb18-challenge"
		}
	},
	{
		code: "check-2",
		method: "Use units, an expression and a labeled representation for each case. Interpret remainders in context and distinguish a point from a route. Verify a pattern prediction by substituting its time value into the stated rule. A check-in answer identifies the operation and its reason.",
		worked: "For a 3-by-5 rectangle on a coordinate grid, area is 15 square units even if its lower-left vertex changes. Converting 2.5 meters to 250 centimeters changes the number and unit together while preserving length.",
		tasks: [
			{
				title: "Units, Expressions, and Coordinates Check",
				prompt: "Solve independently: convert 2.4 m to cm and 3 min 15 s to seconds; evaluate (18 + 6) ÷ 4 × 3; find 236 × 24; pack 485 counters in boxes of 24 and state boxes needed; plot (4,7) and give east-then-north directions; for vertices (1,2),(6,2),(6,5),(1,5), find area; for the fictional weekly rule 120 - 5w, find weeks 0,4,8 and when the value reaches 75. Show one inverse check and one labeled drawing.",
				anchor: "units-expressions-and-coordinates-check"
			}
		],
		practice: {
			prompt: "Convert 1.75 meters to centimeters and calculate 125 × 16.",
			anchor: "check-2-practice"
		},
		challenge: {
			prompt: "A square has vertices (2,2),(6,2),(6,6),(2,6). Translate all points three units east. Give new vertices and compare area.",
			anchor: "check-2-challenge"
		}
	}
];
