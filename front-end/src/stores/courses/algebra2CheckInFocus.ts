interface CheckInFocus {
	representation: string;
	routine: string;
	trap: string;
	model: string;
	error: string;
	check: string;
}

const focuses: Record<string, Record<string, CheckInFocus>> = {
	"algebra-2a": {
		"check-in #1": {
			representation:
				"comparison of complex arithmetic with complex-plane coordinates, quadratic factors, completed squares and parabola features",
			routine:
				"checking complex-number arithmetic, quadratic method choice, root multiplicity and graph transformations with the supplied review problems",
			trap: "an incorrect power of i, a lost conjugate, a repeated root counted twice as distinct, or a reflection applied to only one term",
			model: "a supplied complex-arithmetic or quadratic-transformation case",
			error: "a complex-number simplification or quadratic solution that loses a sign, a root or the transformation order",
			check: "substituting roots, expanding factors, checking the real and imaginary parts, and comparing the transformed vertex"
		},
		"check-in #2": {
			representation:
				"movement between polynomial coefficients, a division table, factored form, root multiplicities and graph features",
			routine:
				"checking polynomial degree, division, zeros, multiplicity and end behavior with the supplied review problems",
			trap: "a missing zero coefficient, the wrong synthetic-division sign, a lost remainder or a root multiplicity confused with distinct zeros",
			model: "a supplied polynomial factorization, division or graph-feature case",
			error: "a polynomial calculation that fails reconstruction or a graph claim that conflicts with the factors or leading term",
			check: "reconstructing the dividend, substituting a proposed zero, and checking the leading term and root multiplicities against the graph"
		},
		"check-in #3": {
			representation:
				"comparison of factored rational expressions, original domain restrictions, radical-equation steps and piecewise tables",
			routine:
				"checking rational restrictions, radical equations and piecewise boundaries with the supplied review problems",
			trap: "a cancelled input restored to the domain, an extraneous squared root, the wrong boundary branch or an all-unit discount treated as incremental",
			model: "a supplied rational-domain, radical-equation, bag-discount or piecewise-continuity case",
			error: "a simplified expression that loses an original exclusion or a piecewise calculation that uses the wrong condition",
			check: "substituting candidates in the original expression, comparing boundary values, and testing the stated domain and discount rule"
		}
	},
	"algebra-2b": {
		"check-in #1": {
			representation:
				"movement between logarithmic and exponential forms, indexed sequence terms, finite or infinite sums and matrix products",
			routine:
				"checking logarithms, exponential models, arithmetic and geometric sequences, matrix multiplication and inverses with the supplied review problems",
			trap: "a nonpositive logarithm argument, a mismatched sequence index, an unjustified infinite sum or a matrix product with its factors reversed",
			model: "a supplied exponential-growth, sequence or matrix-calculation case",
			error: "a logarithm transformation that loses the domain, a sequence sum with the wrong term count or an inverse used on the wrong side",
			check: "substituting in the original exponential, listing early sequence terms, and verifying matrix dimensions and the identity product"
		},
		"check-in #2": {
			representation:
				"comparison of probability sample spaces and conditional tables, paired-data regression calculations, unit-circle positions and trigonometric graphs",
			routine:
				"checking probability assumptions, counting, regression interpretation and trigonometric values and transformations with the supplied review problems",
			trap: "a conditional probability with the wrong denominator, a causal claim from correlation, degree and radian units mixed, or an incorrect trigonometric period",
			model: "a supplied bag-draw, survey-table, regression or periodic-function case",
			error: "a probability calculation with unstated replacement, a regression interpretation beyond its evidence or a trigonometric graph with the wrong scale",
			check: "enumerating a small sample space, checking the conditional subgroup or residual calculation, and testing unit-circle values and one graph cycle"
		}
	}
};

export function algebra2CheckInFocus(courseId: string, moduleTitle: string) {
	return focuses[courseId]?.[moduleTitle.trim().toLowerCase()] ?? null;
}
