# Pre-Calculus B practice checks

## PCTB1 Trigonometry Basics

1. `225 degrees = 5pi/4`; `-pi/3 = -60 degrees`. Examples of positive coterminal angles are 585 degrees (or `13pi/4`) for the first, and 300 degrees (or `5pi/3`) for the second.
2. At 225 degrees the reference angle is 45 degrees; the point is `(-sqrt(2)/2, -sqrt(2)/2)`, so sine and cosine are `-sqrt(2)/2` and tangent is 1. At `-pi/3` the reference angle is `pi/3`; cosine is `1/2`, sine is `-sqrt(3)/2`, and tangent is `-sqrt(3)`. These are quadrants III and IV, respectively.
3. `sec(pi) = -1`, `csc(pi/6) = 2`, and `cot(pi/4) = 1`. The undefined cases divide by `cos(pi/2) = 0` and `sin(0) = 0`.
4. Opposite side `10sin(30 degrees) = 5`; adjacent side `10cos(30 degrees) = 5sqrt(3)`. Their squares sum to 100.
5. `a^2 = 16 + 36 - 48(1/2) = 28`, so `a = 2sqrt(7)`.
6. The sine law requires `sin(B) = 4/a`. At a = 3 this exceeds 1, so no triangle exists. At a = 5, the two B angles are approximately 53.130 and 126.870 degrees, both valid with A = 30 degrees. At a = 10, B is approximately 23.578 degrees or 156.422 degrees; the second makes `A + B > 180 degrees`, so only one triangle exists.

## PCTB2 Graphs of Sine and Cosine

1. Amplitude 3, period pi, midline 1, shift `pi/4` left, range `[-2, 4]`. Quarter-cycle points are `(-pi/4, -2), (0, 1), (pi/4, 4), (pi/2, 1), (3pi/4, -2)`. The negative coefficient makes the cosine cycle begin at its minimum.
2. One equation is `y = 2sin(x) + 1`. Substituting the five x values gives `1, 3, 1, -1, 1`; its amplitude is 2, midline 1, and period `2pi`. Equivalent shifted equations are also valid.
3. Period 12 hours. The maximum is 3.5 m at t = 0 and 12; the minimum is 0.5 m at t = 6. At t = 3 the height is 2 m. The midline is the height halfway between the maximum and minimum.

## PCTB3 Other Trigonometric Graphs

1. Period pi; a branch lies between asymptotes `x = -pi/4` and `x = 3pi/4`, repeated every pi. The zero is `pi/4`, and the three values are `-2, 0, 2`.
2. Secant: exclude `pi/2 + kpi`, period `2pi`, range `(-infinity, -1] union [1, infinity)`. Cosecant: exclude `kpi`, period `2pi`, same range. Cotangent: exclude `kpi`, period pi, range all reals. The values are `-1, 2, 1`. Secant branches sit above cosine's positive peaks or below its negative troughs; cosecant does the same using sine. Cotangent decreases between its consecutive asymptotes and crosses zero at `pi/2 + kpi`.
3. The answers are `-pi/3, 2pi/3, pi/4, pi/6`. Arcsin returns an angle only in `[-pi/2, pi/2]`; `5pi/6` is outside that range but has the same sine as `pi/6`.

## PCTB4 Trigonometric Equations and Identities

1. The expression becomes `tan^2(x)/tan(x) = tan(x)`. Retain `cos(x) != 0` and `sin(x) != 0`; equivalently, exclude all integer multiples of `pi/2`.
2. `sin(75 degrees) = (sqrt(6) + sqrt(2))/4`; `cos(75 degrees) = (sqrt(6) - sqrt(2))/4`; `tan(75 degrees) = 2 + sqrt(3)`. These follow by substituting the exact 45- and 30-degree values into the sum formulas.
3. `sin(22.5 degrees) = sqrt(2 - sqrt(2))/2`; `cos(22.5 degrees) = sqrt(2 + sqrt(2))/2`. Both are positive because 22.5 degrees is in quadrant I.
4. (a) `cos(x) = +/-sqrt(2)/2`, so `x = pi/4, 3pi/4, 5pi/4, 7pi/4`. (b) Factor `sin(x)[2cos(x) - 1] = 0`. The solutions are `0, pi/3, pi, 5pi/3`. Dividing by sine would incorrectly discard 0 and pi.

## PCTB5 Polar Coordinates

1. Rectangular point `(-1, -sqrt(3))`; positive-radius form `(2, 4pi/3)`, with angles equivalent modulo `2pi`.
2. `x^2 + y^2 = 4x`, so `(x - 2)^2 + y^2 = 4`: center `(2, 0)`, radius 2. The radii in the table are `4, 2sqrt(2), 0, -2sqrt(2), -4`; the rectangular points are `(4, 0), (2, 2), (0, 0), (2, -2), (4, 0)`. Negative radius values are essential to this tracing.
3. `1 + i = sqrt(2)[cos(pi/4) + i sin(pi/4)]`. Its cube has modulus `2sqrt(2)` and argument `3pi/4`, giving `-2 + 2i`; expanding `(1 + i)^3` agrees.
4. Use arguments `pi/2 + 2kpi` before dividing by 3. For k = 0, 1, 2 the roots have modulus 2 and arguments `pi/6, 5pi/6, 3pi/2`: `sqrt(3) + i`, `-sqrt(3) + i`, and `-2i`. Each cube is 8i.

## PCTB6 Parametric Equations

1. The points are `(4, -1), (1, 0), (0, 1), (1, 2), (4, 3)` in that order. Since `t = y - 1`, the equation is `x = (y - 1)^2` with `-1 <= y <= 3`. The path moves toward the vertex on the lower branch, then away on the upper branch. Equal x values have different y values; they are not repeated locations.
2. The quarter-period points are `(3, 0), (0, 2), (-3, 0), (0, -2), (3, 0)`. Eliminating t gives `x^2/9 + y^2/4 = 1`, an ellipse traversed counterclockwise. The starting point occurs at t = 0 and `2pi`.

## PCTB7 Vectors

1. Both magnitudes are 5. `p + q = (7, 1)`, `2p - q = (5, -10)`, and `p dot q = 12 - 12 = 0`. The nonzero vectors are perpendicular, so the angle is 90 degrees and the projection is `(0, 0)`.
2. Magnitude 5 km and direction approximately 53.130 degrees north of east. The 7 km component sum measures an east-then-north route, not the diagonal displacement.
3. Magnitude `sqrt(1 + 4 + 4) = 3`. The dot product is `-2 + 2 + 0 = 0`, so the nonzero vectors are perpendicular.

## PCTB8 Matrices Review

1. `A + B = [[3, 2], [2, 7]]`; `A - B = [[-1, 2], [4, 1]]`; `2A = [[2, 4], [6, 8]]`.
2. `AB = [[0, 6], [2, 12]]`, while `BA = [[2, 4], [8, 10]]`. They differ, so order matters.
3. det(A) = -2 and `A^(-1) = [[-2, 1], [3/2, -1/2]]`. The product `A A^(-1)` is `[[1, 0], [0, 1]]`. det(N) = 0, so N has no inverse.
4. AC is 2-by-3: `[[1, 2, 0], [3, 4, 2]]`. CA is undefined because the inner dimensions 3 and 2 do not match.

## PCTB9 Applications of Matrices

1. Subtract twice R1 from R2 to get `[0, -3, -1 | -9]`; subtract R1 from R3 to get `[0, 1, -2 | -4]`. Swap those two rows, then add 3R2 to R3 to obtain `[0, 0, -7 | -21]`. Thus z = 3, y = 2, x = 1. Substitution gives 6, 3, and 2 on the three left sides.
2. Twice the second equation would require `2x + 4y = 8`, contradicting 6. Row reduction gives a zero-coefficient row with a nonzero constant, so there is no solution.
3. The second row is twice the first. There are infinitely many solutions: `y = t`, `x = 3 + 2t`, for every real t.
4. `[[1, -1], [-1, 2]][5, 3]^T = [2, 1]^T`. Check: `2(2) + 1 = 5` and `2 + 1 = 3`.

## PCTB10 Partial Fraction Decomposition

1. `2/(x - 2) + 1/(x + 1)`, with `x != 2, -1`. The recombined numerator is `2(x + 1) + (x - 2) = 3x`.
2. `1/[2(x - 1)] + 2/(x - 1)^2 + 1/[2(x + 1)]`, with `x != 1, -1`. Clearing denominators gives `(1/2)(x^2 - 1) + 2(x + 1) + (1/2)(x - 1)^2 = x^2 + x + 2`.
3. Use `A/(x + 1) + (Bx + C)/(x^2 + 1)`. Coefficient comparison gives A = 1, B = 0, C = 2, so the result is `1/(x + 1) + 2/(x^2 + 1)`. Only real exclusion: x = -1. Recombination gives `x^2 + 1 + 2x + 2` in the numerator.
4. `x + 1 + 2/(x - 1)`, with `x != 1`. Multiplying by `x - 1` gives `x^2 - 1 + 2 = x^2 + 1`.

## PCTB11 Counting and Probability

1. There are `C(8,3) = 56` committees. Favorable committees number `C(5,2)C(3,1) = 30`; the probability is `30/56 = 15/28`. Order does not create different committees.
2. Without repetition there are `10 * 9 * 8 * 7 = 5040` codes; with repetition there are `10^4 = 10000`. The leading-zero condition is necessary for the first factor to be 10.
3. `A = {2,4,6}`, `B = {4,5,6}`. Union probability is `4/6 = 2/3`; intersection probability is `2/6 = 1/3`; conditional probability is `2/3`. This differs from `P(A) = 1/2`, so they are not independent. They are not mutually exclusive because 4 and 6 belong to both.
4. Replacement restores the original proportions, so the draws are independent and the probability is `(3/5)^2 = 9/25`, compared with `3/10` without replacement.

## PCTB12 Limits and Continuity

1. For x != 3 the expression is x + 3, so the limit is 6 and the original value at 3 is undefined. For example, inputs `2.9, 2.99, 3.01, 3.1` give `5.9, 5.99, 6.01, 6.1`.
2. Both one-sided limits are 2, hence the two-sided limit is 2. But h(1) = 4, so h is not continuous. Redefining h(1) = 2 repairs the removable discontinuity.
3. The left limit is 0 and the right limit is 1. They disagree, so the two-sided limit does not exist; j has a jump.
4. Values approach negative infinity from the left and positive infinity from the right. The graph has a vertical asymptote at x = 1; the incompatible one-sided behavior does not define a finite two-sided limit.

## PCTB13 Rates of Change

1. Average rate `(8 - 1)/(2 - 1) = 7 m/s`. The quotient is `[(1 + h)^3 - 1]/h = 3 + 3h + h^2` for h != 0, tending to `3 m/s`. The tangent is `p - 1 = 3(t - 1)`. The interval's average and the instantaneous rate at its starting point differ.
2. Average rate `(25 - 10)/3 = 5 degrees Celsius per minute`. The difference quotient is constantly 5, so the instantaneous rate at 2 is also 5. A straight-line model has the same slope throughout.
3. The average rate is `(15 - 3)/(3 - 1) = 6 m/s`. This centered secant provides an estimate of the tangent slope at 2. Different curves can pass through the same finite table with different tangent slopes; a formula or finer data would be needed to justify an exact instantaneous rate.

## Check-In 1: Trigonometry Fundamentals

1. Angle `5pi/4`; sine and cosine `-sqrt(2)/2`, tangent 1.
2. Law of cosines: `a^2 = 16 + 36 - 48(1/2) = 28`, so `a = 2sqrt(7)`.
3. Amplitude 3, period pi, midline -1, shift `pi/4` right, range `[-4, 2]`. Quarter-cycle points are `(pi/4, 2), (pi/2, -1), (3pi/4, -4), (pi, -1), (5pi/4, 2)`.
4. Factor `(2sin(x) + 1)(sin(x) - 1) = 0`; solutions `pi/2, 7pi/6, 11pi/6`. For the identity, multiply the left side by `(1 - cos(x))/(1 - cos(x))` where both original sides exist, obtaining `sin(x)(1 - cos(x))/sin^2(x)`. This equals the right side on `sin(x) != 0`, excluding every integer multiple of pi. In particular, the left side's value at 0 does not extend the right side's domain.

## Check-In 1: Polar and Parametric Models

1. Rectangular point `(-1, -sqrt(3))`. `1 + i = sqrt(2)[cos(pi/4) + i sin(pi/4)]`; its cube is `-2 + 2i`.
2. `y = 1 - x/2`, with `-2 <= x <= 4`. Start `(-2, 2)`, end `(4, -1)`; motion is rightward and downward as t increases.

## Check-In 2: Vectors, Matrices, and Partial Fractions

1. `2u - v = (0, 5)` and `u dot v = 2 - 2 = 0`. Both nonzero vectors have magnitude `sqrt(5)`; their angle is 90 degrees.
2. The coefficient matrix is `[[1, 1], [2, 3]]`, determinant 1 and inverse `[[3, -1], [-2, 1]]`. Multiplying by `[5, 13]^T` gives `[2, 3]^T`; the equations check as 5 and 13.
3. `3/(x - 1) + 2/(x + 2)`, with `x != 1, -2`. Recombining gives `3(x + 2) + 2(x - 1) = 5x + 4`.

## Check-In 2: Probability, Limits, and Rates

1. Favorable unordered pairs number `C(4,1)C(3,1) = 12`, out of `C(7,2) = 21`; probability `4/7`.
2. Away from 1 the expression equals x + 1, so its limit is 2. Its assigned value 3 differs; redefining the value at 1 to 2 makes it continuous.
3. Left limit 2, right limit 3, value k(1) = 2. The two-sided limit does not exist, so the graph has a jump.
4. Average rate `(10 - 0)/2 = 5 m/s`. At 2, the quotient is `[p(2 + h) - p(2)]/h = 7 + h`, tending to `7 m/s`. The tangent is `p - 10 = 7(t - 2)`.
