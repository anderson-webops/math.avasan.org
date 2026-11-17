import type { RawCourse } from "./types";
import {
	courseAssetViewerUrl,
	slugMarkdownHeading
} from "@/modules/courseAssetSourcesPrealgebra";
import { assertMathCourseBindings } from "./prealgebraGeometryBindings";

export const preAlgebraACaseData = [
	{
		code: "signed-arithmetic",
		title: "Signed Arithmetic and Operation Order",
		target: "Negative Numbers, Order of Operations, and Absolute Value",
		methods:
			"Adding a positive number moves right on a number line; adding a negative number moves left. Subtracting a number adds its opposite, so a-b=a+(-b). Multiplying or dividing numbers with equal signs gives a positive result; unequal signs give a negative result. Division by zero is undefined. Absolute value is distance from zero, so abs(-7)=7. Evaluate parentheses, then powers, then multiplication and division from left to right, then addition and subtraction from left to right. Multiplication does not automatically precede division.",
		worked: "For -7+3×(4-6)^2, the parentheses give -2, squaring gives 4, multiplication gives 12, and the final sum is 5. Separately, -18/3×2=(-6)×2=-12. A depth changing from -5 meters to -2 meters changes by -2-(-5)=3 meters upward, although the final position remains below zero.",
		problems: [
			"A lift starts at floor -4, rises 7 floors and then descends 5 floors. Find its final floor, its distance from floor 0 and its total distance traveled. Explain which quantity can be negative.",
			"Evaluate -8+2×(3-7)^2 and -24/4×3, writing the operation order explicitly. Identify the incorrect rule in a solution that multiplies 4×3 before dividing the second expression.",
			"Compare abs(-9)-abs(4) with abs(-9-4). Calculate both and explain why moving absolute-value bars across a subtraction changes the expression."
		],
		checks: "Each calculation shows the grouped quantity before applying a power. Signs distinguish position, change and distance; multiplication and division follow their written left-to-right order. The final explanation checks both the numerical result and its meaning in the lift or number-line model.",
		moduleTitle: "PAA1-PAA2 Arithmetic Foundations",
		moduleId: "pre-algebra-a-paa1-paa2-arithmetic-foundations",
		readingId:
			"pre-algebra-a-paa1-paa2-arithmetic-foundations-curriculum-negative-numbers-order-of-operations-and-absolute-value",
		aliases: []
	},
	{
		code: "place-value",
		title: "Place Value, Division and Equivalent Fractions",
		target: "Long Multiplication, Long Division, and Fraction Structure",
		methods:
			"Break a whole number into place-value parts before multiplying. In long division, each quotient digit records how many divisor groups fit at that place; divide, multiply back, subtract and bring down the next digit. For whole-number division with positive divisor d, dividend=d×quotient+remainder with 0<=remainder<d. The remainder becomes remainder/d when a fractional answer is appropriate. A fraction has a nonzero denominator. Dividing its numerator and denominator by the same nonzero factor preserves its value. A mixed number w+n/d equals (wd+n)/d.",
		worked: "247×36=247×30+247×6=7410+1482=8892. For 938/24, 24×39=936 with remainder 2, so 938=24×39+2 and the exact quotient is 39+2/24=39 1/12. The check uses the original dividend. Also 42/56=(42/14)/(56/14)=3/4, and 5 2/3=(5×3+2)/3=17/3.",
		problems: [
			"Calculate 306×24 by separating the tens and ones of 24. Show both partial products and use an estimate to check the scale of the answer.",
			"Divide 827 by 18. Give the whole-number quotient and remainder, then an exact mixed-number answer. Verify dividend=divisor×quotient+remainder and check the remainder is smaller than 18.",
			"Simplify 54/72 using a common factor. Convert 4 3/5 to an improper fraction and convert 29/6 to a mixed number, showing the whole-number part in each conversion."
		],
		checks: "Partial products retain their place values, including zero digits. Every division result reconstructs the original dividend with a valid remainder. Simplification applies the same factor to numerator and denominator, and a mixed-number conversion preserves both the whole part and the fractional remainder.",
		moduleTitle: "PAA3-PAA7 Fractions and Arithmetic",
		moduleId: "pre-algebra-a-paa3-paa7-fractions-and-arithmetic",
		readingId:
			"pre-algebra-a-paa3-paa7-fractions-and-arithmetic-curriculum-long-multiplication-long-division-and-fraction-structure",
		aliases: []
	},
	{
		code: "fraction-operations",
		title: "Fraction Operations",
		target: "Multiplying, Dividing, Adding, and Subtracting Fractions",
		methods:
			"For addition or subtraction, rewrite fractions with a common nonzero denominator; then add or subtract numerators and retain that denominator. For multiplication, multiply numerators and denominators and cancel common factors in the product. For division by a nonzero fraction c/d, multiply by d/c: (a/b)/(c/d)=(a/b)×(d/c). The divisor must be nonzero. Convert mixed numbers to improper fractions before multiplying or dividing. Cancellation applies to factors in products, not to separate terms across a plus or minus sign.",
		worked: "3/4+5/6=9/12+10/12=19/12=1 7/12. In contrast, (3/4)/(5/6)=(3/4)×(6/5)=18/20=9/10; this asks how many groups of size 5/6 fit in 3/4. For 2 1/3×3/7, rewrite 2 1/3 as 7/3 and obtain (7/3)×(3/7)=1.",
		problems: [
			"Compute 5/6-1/4 and 2/3+3/5. For each, name a common denominator and leave the exact result simplified. Explain why adding or subtracting the original denominators would not preserve the size of the pieces.",
			"Compute (7/8)×(4/21) and (3/5)/(9/10). Show cancellation only between multiplicative factors and identify the nonzero divisor in the division problem.",
			"A recipe uses 1 1/2 cups of flour per batch. With 3 3/4 cups available, find how many batches are possible as an exact number. Also report the number of complete batches and the flour remaining after those batches."
		],
		checks: "The operation determines whether a common denominator or a reciprocal is required. Exact answers remain simplified, and a quotient in batches is distinguished from the number of whole batches. The explanation checks the result against the original ingredient quantities and their units.",
		moduleTitle: "PAA3-PAA7 Fractions and Arithmetic",
		moduleId: "pre-algebra-a-paa3-paa7-fractions-and-arithmetic",
		readingId:
			"pre-algebra-a-paa3-paa7-fractions-and-arithmetic-curriculum-multiplying-dividing-adding-and-subtracting-fractions",
		aliases: []
	},
	{
		code: "decimals-percents",
		title: "Decimals, Percents and Percent Change",
		target: "Decimals and Percents",
		methods:
			"Adding or subtracting decimals aligns place values. To multiply, first multiply as whole numbers and then account for the total decimal places in both factors. To divide by a decimal, multiply both dividend and divisor by the same power of 10 until the divisor is a whole number. A percent means a fraction of 100, so p%=p/100. Percent change is (new-original)/original×100%, requiring a nonzero original amount. A discount subtracts a fraction of the original price; sales tax adds a fraction of the stated taxable price.",
		worked: "2.4×0.06=144/1000=0.144. For 8.4/0.35, multiply both numbers by 100 to obtain 840/35=24. A 15% discount on $80 removes 0.15×80=$12 and leaves $68. The signed percent change is (68-80)/80×100%=-15%; the dollar change and the percent change use different units.",
		problems: [
			"Convert 3/8 into a decimal and a percent. Then find 37.5% of 64 using an exact fraction or decimal, explaining why the two forms give the same answer.",
			"Calculate 0.72×0.5 and 6.3/0.09. Use place value or an equivalent division to justify each calculation, and give a short estimate to reject an answer off by a power of 10.",
			"A $50 item has a 20% discount, followed by 5% sales tax on the discounted price. Find the final price. Explain why directly subtracting 20 and adding 5 as if they were dollar amounts is incorrect."
		],
		checks: "Each percentage is converted to a fraction or decimal before multiplication. The original amount is explicit in a percent-change calculation, and successive changes use the correct current base. Money is labeled in dollars and decimal placement is checked by a numerical estimate.",
		moduleTitle: "PAA8-PAA12 Decimals, Percents, Ratios, and Rates",
		moduleId: "pre-algebra-a-paa8-paa12-decimals-percents-ratios-and-rates",
		readingId:
			"pre-algebra-a-paa8-paa12-decimals-percents-ratios-and-rates-curriculum-decimals-and-percents",
		aliases: []
	},
	{
		code: "ratios-rates",
		title: "Ratios, Proportions, Conversions and Rates",
		target: "Ratios, Proportions, Unit Conversions, and Distance-Rate-Time",
		methods:
			"A ratio compares named quantities in a fixed order. Multiplying both parts by the same positive factor gives an equivalent ratio. A proportion states that two ratios are equal; clear denominators or multiply both sides by a common nonzero factor. A unit rate divides one quantity by another and retains both units. Unit-conversion factors equal 1, such as 60 minutes/1 hour. For constant speed, distance=rate×time; solve rate=distance/time or time=distance/rate when the divisor is nonzero. Different travel segments require separate distances and times.",
		worked: "A recipe uses 3 cups for 8 servings. For 20 servings, multiply by 20/8 to obtain 7.5 cups. At 45 miles per hour for 90 minutes, first convert 90 minutes×(1 hour/60 minutes)=1.5 hours, then compute 45×1.5=67.5 miles. A 12-mile trip at 8 miles per hour takes 12/8=1.5 hours, not 1.5 minutes.",
		problems: [
			"Four notebooks cost $10 at a constant unit price. Find the price per notebook and the cost of seven notebooks. Write the ratio with its units and explain the assumption that makes the proportional model valid.",
			"Convert 2.4 kilometers to meters using 1000 meters=1 kilometer. A cyclist covers that distance in 8 minutes; find speed in meters per minute and kilometers per hour.",
			"A delivery travels 18 miles at 36 miles per hour, stops for 15 minutes, then travels 12 miles at 24 miles per hour. Find total distance, elapsed time and average speed including the stop. Explain why averaging 36 and 24 misses the stop."
		],
		checks: "Ratios preserve the order of the named quantities and all conversion factors cancel the intended units. Constant-speed formulas are applied to each moving segment separately. An average speed uses total distance divided by the complete elapsed time, including any stated stop.",
		moduleTitle: "PAA8-PAA12 Decimals, Percents, Ratios, and Rates",
		moduleId: "pre-algebra-a-paa8-paa12-decimals-percents-ratios-and-rates",
		readingId:
			"pre-algebra-a-paa8-paa12-decimals-percents-ratios-and-rates-curriculum-ratios-proportions-unit-conversions-and-distance-rate-time",
		aliases: []
	},
	{
		code: "expressions",
		title: "Equivalent Expressions and Factoring",
		target: "Variables, Expressions, Grouping, Distribution, and Factoring",
		methods:
			"An expression names a value; an equation asserts equality. Substitute a number for every occurrence of a variable, retaining parentheses around a negative value. Like terms have identical variable factors and exponents, so 3x+2x=5x but 3x+2x^2 cannot combine that way. Distribution gives a(b+c)=ab+ac, including a negative multiplier. Factoring extracts a common factor from every term. Two expressions are equivalent when they agree for every allowed input; one matching substitution can check a calculation but cannot prove equivalence in general.",
		worked: "-3(2x-5)+4x=-6x+15+4x=-2x+15. At x=-2, this is -2(-2)+15=19; the original gives -3(-9)-8=19 as a check. Factoring 12x+18 extracts the greatest common whole-number factor 6: 12x+18=6(2x+3). Distributing 6 back recovers both original terms.",
		problems: [
			"Simplify 4(3x-2)-5x+6. Evaluate both the original and simplified forms at x=-1, retaining the sign of every term and explaining why the two calculations must agree.",
			"Factor 15y+25 using its greatest common whole-number factor, then distribute to check. Explain why taking a factor from only one term would change the expression.",
			"A scanner needs 12 seconds to start and 3 seconds per item. Write the time for n items, find the time for 20 items and compare two separate runs of 10 items with one run of 20. State which repeated quantity causes the difference."
		],
		checks: "Every rewrite preserves all terms and signs; only like terms are combined. A factor multiplies the entire parenthesized expression. Variables and units are defined before substitution, and a model comparison distinguishes one-time setup from work repeated for each item or each run.",
		moduleTitle: "PAA13-PAA17 Expressions and Sequences",
		moduleId: "pre-algebra-a-paa13-paa17-expressions-and-sequences",
		readingId:
			"pre-algebra-a-paa13-paa17-expressions-and-sequences-curriculum-variables-expressions-grouping-distribution-and-factoring",
		aliases: []
	},
	{
		code: "sequences",
		title: "Arithmetic Sequences and Sums",
		target: "Arithmetic Sequences and Sums",
		methods:
			"An arithmetic sequence has constant difference d between successive terms. If a1 is the first term and counting starts at n=1, then an=a1+(n-1)d. The factor n-1 counts changes after the first term. For n positive whole-number terms, Sn=n(a1+an)/2 because pairing the first and last terms gives the same total as pairing the second and next-to-last. The sum counts accumulated amounts, while an is only one term. A sequence with changing differences does not automatically follow this formula.",
		worked: "For 5,9,13,17,..., a1=5 and d=4, so an=5+4(n-1)=4n+1. The twentieth term is 81. The sum of the first 20 terms is 20(5+81)/2=860. The formula gives 5 at n=1 and 9 at n=2, verifying its starting index; 860 is a cumulative total, not the twentieth term.",
		problems: [
			"For -2,1,4,7,..., write the nth-term formula with n=1 at the first term. Find the tenth term and the sum of the first ten terms, and identify which result is a single term.",
			"A weekly record begins 4,11,18,25,... . Find week 6 and the total for weeks 1 through 6. Show the common difference and check the formula against at least two listed weeks.",
			"Decide whether 2,4,8,16,... is arithmetic. Explain what happens to the successive differences and whether a1+(n-1)d with one constant d can model all four terms."
		],
		checks: "The starting index is stated and the formula recovers two given terms. A later-term answer remains separate from an accumulated sum. The arithmetic-sum formula is used only after verifying a constant difference, including when the first term or difference is negative.",
		moduleTitle: "PAA13-PAA17 Expressions and Sequences",
		moduleId: "pre-algebra-a-paa13-paa17-expressions-and-sequences",
		readingId:
			"pre-algebra-a-paa13-paa17-expressions-and-sequences-curriculum-arithmetic-sequences-and-sums",
		aliases: []
	},
	{
		code: "exponents-roots",
		title: "Exponents, Roots and Domain Restrictions",
		target: "Exponent Rules, Nonpositive Exponents, Roots, and Fractional Exponents",
		methods:
			"For the same base, a^m×a^n=a^(m+n), a^m/a^n=a^(m-n) when the denominator is nonzero, and (a^m)^n=a^(mn) for integer exponents. For a!=0, a^0=1 and a^(-n)=1/a^n. Parentheses determine the base: (-3)^2=9, but -3^2=-(3^2)=-9. The principal square root is nonnegative: sqrt(49)=7, while solving x^2=49 gives x=7 or x=-7. For real x, sqrt(x^2)=abs(x). For a positive base, a^(m/n) means the nth root raised to m, with positive integer n. Real even roots require a nonnegative radicand.",
		worked: "2^3×2^(-5)=2^(-2)=1/4. Also 16^(3/4)=(fourth root of 16)^3=2^3=8, and 25^(3/2)=(sqrt(25))^3=125. sqrt((-5)^2)=sqrt(25)=5, not -5. Roots do not distribute over addition: sqrt(9+16)=5, whereas sqrt(9)+sqrt(16)=7.",
		problems: [
			"Evaluate 3^4/3^6 and (2^3)^2. State the exponent rule used in each, and distinguish multiplying exponents in a power of a power from adding them in a product of like-base powers.",
			"Calculate sqrt(144), then solve x^2=144 over the real numbers. Evaluate sqrt((-8)^2) and explain why the principal-root answer is nonnegative even though the inner input was negative.",
			"Evaluate 81^(3/4) and 5^0. Explain why 0^(-2) is undefined, and give the real-domain restriction for sqrt(t) without extending that restriction to odd roots."
		],
		checks: "Each rule names its base and any nonzero or real-domain restriction. Parentheses retain a negative base correctly. Principal roots, solutions of squared equations and fractional powers are interpreted separately, with exact values preserved instead of an unsupported sign cancellation.",
		moduleTitle: "PAA18-PAA23 Exponents, Roots, and Scientific Notation",
		moduleId:
			"pre-algebra-a-paa18-paa23-exponents-roots-and-scientific-notation",
		readingId:
			"pre-algebra-a-paa18-paa23-exponents-roots-and-scientific-notation-curriculum-exponent-rules-nonpositive-exponents-roots-and-fractional-exponents",
		aliases: []
	},
	{
		code: "scientific-notation",
		title: "Scientific Notation and Scale",
		target: "Scientific Notation and Scale",
		methods:
			"For a nonzero real quantity, normalized scientific notation is c×10^k with integer k and 1<=abs(c)<10. Negative quantities use a negative coefficient; zero can be written as 0 but has no normalized nonzero coefficient. Moving a decimal to the left to form c gives a positive exponent; moving it to the right gives a negative exponent. To multiply, multiply coefficients and add powers of 10, then normalize again if needed. To compare positive quantities, first compare exponents, then coefficients when exponents match.",
		worked: "0.00052=5.2×10^(-4), since multiplying 5.2 by 1/10000 gives 0.00052. Also -730000=-7.3×10^5. The product (3×10^4)(2×10^(-7))=6×10^(-3)=0.006. One million is 10^6 and one billion is 10^9; the latter is 10^3=1000 times the former.",
		problems: [
			"Write 0.0000024 and -91000000 in normalized scientific notation. Expand each result back into ordinary notation to check that the sign and magnitude are unchanged.",
			"Calculate (4×10^5)(3×10^(-2)). Normalize the coefficient and explain how the adjustment changes the power of 10 while preserving the product.",
			"Compare 7.2×10^6 with 9×10^5. Identify the larger positive quantity and calculate its ratio to the smaller, explaining why comparing only the coefficients gives the wrong ordering."
		],
		checks: "The normalized coefficient has absolute value at least 1 and below 10, retaining the sign of the original quantity. A reverse conversion checks each exponent. Comparisons include both coefficient and scale, and products are normalized after coefficient arithmetic and exponent arithmetic are complete.",
		moduleTitle: "PAA18-PAA23 Exponents, Roots, and Scientific Notation",
		moduleId:
			"pre-algebra-a-paa18-paa23-exponents-roots-and-scientific-notation",
		readingId:
			"pre-algebra-a-paa18-paa23-exponents-roots-and-scientific-notation-curriculum-scientific-notation-and-scale",
		aliases: []
	}
];
export const preAlgebraAReviewData = [
	{
		moduleTitle: "Pre-Algebra A Kick-Off",
		target: "Course Map and Readiness Check",
		title: "Pre-Algebra A Entry Review",
		problems: [
			"Find -6+9 and abs(-6), identifying which is a sum and which is a distance.",
			"Compute 2/3+1/6 and convert the result to a decimal rounded to two places.",
			"Find 25% of 80 and scale a recipe from 4 servings to 10 using its 2 cups of flour.",
			"Simplify 3x+2x+4 and evaluate it at x=2.",
			"Evaluate 2^3 and sqrt(81), then write 45000 in scientific notation."
		]
	},
	{
		moduleTitle: "Check-In #1",
		target: "Arithmetic and Ratio Readiness Check",
		title: "Arithmetic and Ratio Review",
		problems: [
			"Evaluate -3+2×(5-1) and explain the operation order.",
			"Compute (5/6)/(2/3) and 7/10-1/4, retaining exact simplified results.",
			"A $60 price falls by 15%. Find the new price and identify the original amount in the percent calculation.",
			"A 6-serving recipe needs 1.5 cups of flour. Find the flour for 14 servings and convert that amount to tablespoons using 16 tablespoons=1 cup.",
			"Travel 42 miles at 28 miles per hour, then stop for 30 minutes. Find elapsed time and average speed for the complete trip."
		]
	},
	{
		moduleTitle: "Check-In #2 and Capstone",
		target: "Expressions and Exponents Readiness Check",
		title: "Expressions and Exponents Review",
		problems: [
			"Simplify 5(2x-3)-4x+7 and evaluate at x=-2.",
			"Factor 18a+24 with the greatest common whole-number factor and verify by distribution.",
			"For the arithmetic sequence 3,8,13,..., find the twelfth term and the sum of the first twelve terms, with n=1 at the first term.",
			"Evaluate 2^(-3)×2^5 and 64^(2/3). Distinguish sqrt(36) from the solutions of y^2=36.",
			"Multiply (6×10^(-4))(5×10^7), normalize the result and write it in ordinary notation."
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
		`/course-assets/pre-algebra-a/practice-checks-v1.md#${slugMarkdownHeading(
			heading
		)}`,
		`${heading} self-check`
	)})`;
}
export function addPreAlgebraACases(course: RawCourse) {
	assertMathCourseBindings(course);
	for (const unit of preAlgebraACaseData) {
		const module = course.modules.find(
			item => item.title === unit.moduleTitle
		);
		const reading = module?.curriculum.find(
			item => item.title === unit.target
		);
		if (!module || !reading)
			throw new Error(`Missing Pre-Algebra A reading ${unit.target}`);
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
	for (const review of preAlgebraAReviewData) {
		const module = course.modules.find(
			item => item.title === review.moduleTitle
		);
		const item = module?.curriculum.find(
			item => item.title === review.target
		);
		if (!item)
			throw new Error(`Missing Pre-Algebra A review ${review.target}`);
		item.content += `\n\n**Mixed set:**\n\n${numbered(
			review.problems
		)}\n\n${selfCheck(review.title)}`;
		item.preserveInstructions = true;
	}
}
