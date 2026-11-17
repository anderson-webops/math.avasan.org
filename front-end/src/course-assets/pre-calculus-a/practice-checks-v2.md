# Pre-Calculus A practice checks

## PCTA1 Piecewise Functions

1. The values are `-1, 0, 1, 5`, respectively. In particular, 0 belongs to the middle rule and 2 to the last rule.
2. At `x = 0`, mark an open `(0, 2)` and a closed `(0, 0)`. At `x = 2`, mark an open `(2, 4)` and a closed `(2, 5)`.
3. At 0 the left-hand value approaches 2, but the right-hand value and `f(0)` are 0. At 2 the left-hand value approaches 4, but the right-hand value and `f(2)` are 5. Both are jumps. The graph increases on `(-infinity, 0)` and `(0, 2)`, and is constant on `[2, infinity)`. The domain is all real numbers.

## PCTA2 Higher-Degree Polynomials

1. `A + B = 3x^3 - x^2 - x + 7`; `A - B = -x^3 - 3x^2 + x - 1`. Subtraction changes the sign of every term in B.
2. Distribution gives `x^4 - 4x^2 + x^2 - 4 = x^4 - 3x^2 - 4`, of degree 4 and leading coefficient 1.
3. `u^2 - 5u + 4 = (u - 1)(u - 4)`, so the factorization is `(x - 1)(x + 1)(x - 2)(x + 2)`. The zeros are `-2, -1, 1, 2`. At 3, both forms give 40.

## PCTA3 Polynomial Division

1. Subtract `x^2(x^2 + 1)` to leave `2x^3 + 2x^2 + 4x + 5`; subtract `2x(x^2 + 1)` to leave `2x^2 + 2x + 5`; subtract `2(x^2 + 1)` to leave `2x + 3`. Thus the quotient is `x^2 + 2x + 2`, remainder `2x + 3`.
2. Synthetic division of `1, -4, 1, 6` by 2 gives quotient `x^2 - 2x - 3`, remainder 0. At 2 the original polynomial is `8 - 16 + 2 + 6 = 0`.
3. Use coefficients `1, 0, 0, -8`. The quotient is `x^2 + 2x + 4`, remainder 0, agreeing with `2^3 - 8 = 0`.
4. Multiplication reconstructs all three dividends. The first remainder has degree 1, less than the divisor's degree 2; the other two remainders are zero.

## PCTA4 Zeros of Polynomials

1. Candidates are `+/-1, +/-2`. `Q(2) = 0`; division leaves `x^3 + x^2 + x + 1 = (x + 1)(x^2 + 1)`. Thus `Q = (x - 2)(x + 1)(x^2 + 1)`, with zeros `2, -1, i, -i`, each of multiplicity 1.
2. `R = (2x - 1)(x - 1)(x + 2)`, giving `1/2, 1, -2`. Expanding the factors recovers `2x^3 + x^2 - 5x + 2`.
3. `S(1) = -1` and `S(2) = 5`, so continuity guarantees a zero in `(1, 2)`. Its only rational candidates are 1 and -1; neither is a zero. The guaranteed zero is irrational.

## PCTA5 Graphing Polynomials

1. Degree 4, leading coefficient -1, both ends downward. Zero -1 has multiplicity 2; 2 and 3 each have multiplicity 1. `q(0) = -6`.
2. Signs on `(-infinity, -1), (-1, 2), (2, 3), (3, infinity)` are `-, -, +, -`. The graph touches at -1 and crosses at 2 and 3.
3. The sample values are `-20, 49/16, -50`. The maximum is `4 - 1 = 3` turning points. The sketch must also pass through `(-1, 0), (2, 0), (3, 0), (0, -6)`.

## PCTA6 Arithmetic and Geometric Sequences

1. `d = -3`; `a_n = 11 - 3n` for `n >= 1`; recursively `a_1 = 8`, `a_n = a_(n-1) - 3` for `n >= 2`. `a_12 = -25`; `S_12 = 12(8 - 25)/2 = -102`.
2. `r = 1/3`; `b_n = 81(1/3)^(n-1)`; recursively `b_1 = 81`, `b_n = b_(n-1)/3`. `b_6 = 1/3`. Adding `81 + 27 + 9 + 3 + 1 + 1/3` gives `S_6 = 364/3`.
3. Since `|1/3| < 1`, the sum is `81/(1 - 1/3) = 243/2`. This is larger than the six-term sum, as all omitted terms are positive.

## PCTA7 Area Under a Curve

1. Width `1/2`; left heights `0, 1/4, 1, 9/4` give `L_4 = 7/4`. Right heights `1/4, 1, 9/4, 4` give `R_4 = 15/4`. Since g increases on this interval, `L_4` is a lower bound and `R_4` an upper bound.
2. The squared midpoint heights are `1/16, 9/16, 25/16, 49/16`; hence `M_4 = 21/8`. The trapezoid estimate is `T_4 = (7/4 + 15/4)/2 = 11/4`.
3. Width `1/4` gives `L_8 = 35/16` and `R_8 = 51/16`. The gap shrinks from 2 to 1, tightening the lower and upper bounds. Smaller rectangles follow the curve more closely; a finite estimate is not automatically exact.

## PCTA8 The Binomial Theorem

1. Use `a = 2x`, `b = -1`: `16x^4 - 32x^3 + 24x^2 - 8x + 1`. Both forms give 1 at 0 and at 1. Odd powers of -1 produce the negative terms.
2. `5 - k = 3` gives `k = 2`. The coefficient is `C(5,2) * 2^3 * (-1)^2 = 10 * 8 = 80`.
3. `6 - k = 2` gives `k = 4`. The coefficient is `C(6,4) * 3^4 = 15 * 81 = 1215`.

## PCTA9 Rational Functions

1. Exclude `1, -2`; the simplified form is `(x - 1)/(x + 2) = 1 - 3/(x + 2)`. The hole is `(1, 0)`, vertical asymptote `x = -2`, horizontal asymptote `y = 1`, and y-intercept `(0, -1/2)`. There are no x-intercepts because 1 is excluded. For the sketch, the branch lies above 1 when `x < -2`, and below 1 when `x > -2`, with the hole marked.
2. Exclude 1; `h = 1/(x - 1)` on that domain. There is a vertical asymptote at 1, not a hole, because a factor of `x - 1` remains in the denominator. Horizontal asymptote `y = 0`, y-intercept `(0, -1)`, and no x-intercepts. The branches are negative left of 1 and positive right of 1.

## PCTA10 Rational Function Operations

1. For `x != -1, 1`, the common denominator is `(x - 1)(x + 1)`. The numerator is `(x + 1) + 2(x - 1) = 3x - 1`, giving `(3x - 1)/(x^2 - 1)`.
2. With the same restrictions, `x + 1 = 2(x - 1)` gives `x = 3`. Both sides of the original equation are `1/2` there.
3. `x != 1`. Clearing the denominator gives `x + 1 = 2`, or `x = 1`. That candidate is excluded, so there is no solution.

## PCTA11 Logarithms and Exponents

1. `2t ln(3) = ln(20)`, so `t = ln(20)/[2ln(3)]`, approximately `1.363`.
2. Require `x > 2`. The equation becomes `x(x - 2) = 3`, giving candidates 3 and -1. Only 3 remains; `log_3(1) + log_3(3) = 1` checks it.
3. `2 = 1.08^t`, so `t = ln(2)/ln(1.08)`, approximately `9.006` years. The first whole year is 10: `P(9)` is approximately `999.50`, while `P(10)` is approximately `1079.46`.

## PCTA12 Function Inverses and Composition

1. From `y(x - 3) = 2x + 1`, collect `x(y - 2) = 3y + 1`. Hence `h^(-1)(x) = (3x + 1)/(x - 2)`. The domain of h excludes 3 and its range excludes 2; the inverse's domain excludes 2 and range excludes 3. For `h(h^(-1)(x))`, numerator and denominator simplify to `7x/(x - 2)` and `7/(x - 2)`, giving x for `x != 2`. In the reverse order they become `7x/(x - 3)` and `7/(x - 3)`, giving x for `x != 3`.
2. `f(g(x)) = sqrt(2x + 2)`, domain `x >= -1`, since the inner output must satisfy `2x + 3 >= 1`. `g(f(x)) = 2sqrt(x - 1) + 3`, domain `x >= 1`. The two expressions and domains differ.

## PCTA13 Circles and Ellipses

1. Adding 9 and 16 gives `(x + 3)^2 + (y - 4)^2 = 25`, so the center is `(-3, 4)` and radius 5. At `(2, 4)`, the original expression is `4 + 16 + 12 - 32 = 0`.
2. Center `(1, -2)`; horizontal major axis, `a = 3`, `b = 2`, `c = sqrt(5)`. Vertices `(-2, -2), (4, -2)`; co-vertices `(1, 0), (1, -4)`; foci `(1 +/- sqrt(5), -2)`. Domain `[-2, 4]`, range `[-4, 0]`. At either vertex the first fraction is 1 and the second is 0.

## PCTA14 Parabolas and Hyperbolas

1. Vertex `(2, -1)`, `p = -3`, focus `(-1, -1)`, directrix `x = 5`, axis `y = -1`, opening left, latus rectum length 12. A point on the graph is equidistant from the focus and directrix.
2. Center `(-1, 2)`, `a = 4`, `b = 3`, `c = 5`; vertices `(-5, 2), (3, 2)`; foci `(-6, 2), (4, 2)`. Asymptotes `y - 2 = +/-(3/4)(x + 1)`. Domain `(-infinity, -5] union [3, infinity)`, range all reals. The branches open left and right, approaching the asymptotes.
3. Substitution gives `2x^2 = 8`, so `x = +/-2` and `y = x`. Points `(2, 2)` and `(-2, -2)` satisfy both equations; mixing opposite signs would violate the line.

## Check-In 1: Polynomial and Sequence Foundations

1. Values `4, 1, 3`. The two rules both approach 1 at the boundary, matching `h(1) = 1`, so it is continuous there.
2. `x(x - 3)(x + 3)`; zeros `-3, 0, 3`.
3. Quotient `x^2 - x + 1`, remainder 0; `(x + 1)(x^2 - x + 1) = x^3 + 1`.
4. `(x^2 - 1)(x^2 + 1)` gives zeros `1, -1, i, -i`.
5. Cubic with negative leading coefficient: left end up, right end down. Touch at `(-2, 0)`, cross at `(1, 0)`, y-intercept `(0, 4)`.
6. `a_15 = 1 + 14(4) = 57`; `S_15 = 15(1 + 57)/2 = 435`. `b_6 = 3(2^5) = 96`; `S_6 = 3(2^6 - 1) = 189`.
7. Width `1/2`; left heights `0, 1` give `L_2 = 1/2`; right heights `1, 2` give `R_2 = 3/2`. The triangle area is `1 * 2/2 = 1`, between the estimates.
8. `C(4,2) x^2(-2)^2 = 24x^2`, so the coefficient is 24.

## Check-In 2: Rational Functions through Conics

1. Exclude `2, -3`; simplify to `(x + 2)/(x + 3)`. Hole `(2, 4/5)`, vertical asymptote `x = -3`, horizontal asymptote `y = 1`, x-intercept `(-2, 0)`, y-intercept `(0, 2/3)`.
2. `(x + 1)/(x - 1)`, retaining `x != 1, -1, -2`. The divisor's denominator excludes -1 and the dividend's denominator excludes 1; the divisor is zero at -2, so that value is also excluded even though it is allowed by the simplified formula.
3. Require `x > 2`. Then `x(x - 2) = 8`, so the candidates are 4 and -2. Only 4 remains; `log_2(4) + log_2(2) = 3`.
4. `t = ln(12)/ln(5)`, approximately `1.544`. Taking logs brings the unknown exponent down as a multiplier when matching integer powers is not useful.
5. `f^(-1)(x) = (x - 7)/4`; both functions have domain and range all reals. The radical requires `4x + 4 >= 0`, so the composite's domain is `[-1, infinity)`.
6. `(x - 1)^2 + (y + 2)^2 = 9`, center `(1, -2)`, radius 3. The ellipse has a vertical major axis, vertices `(0, +/-3)`, and foci `(0, +/-sqrt(5))`.
7. For the parabola, `p = -2`, vertex `(0, 0)`, focus `(0, -2)`, directrix `y = 2`. The hyperbola opens up and down with vertices `(0, +/-3)` and asymptotes `y = +/-(3/2)x`.
8. Substituting 3 for y gives `x^2 = 16`, so the intersections are `(4, 3)` and `(-4, 3)`. Both have `x^2 + y^2 = 16 + 9 = 25` and `y = 3`.
