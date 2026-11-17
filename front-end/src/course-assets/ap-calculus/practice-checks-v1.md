# AP Calculus Practice Checks

## APCA0 Prerequisite Functions and Rates

1. p(x)=(x-2)^2-3. The vertex is (2, -3), the domain is all real numbers, and the range is [-3, infinity). Solving (x-2)^2=3 gives x=2-sqrt(3) and x=2+sqrt(3).
2. The original domain excludes 3. Factoring gives q(x)=x+3 when x is not 3, so q(0)=3. The cancelled formula has value 6 at 3, but q(3) remains undefined.
3. The values are 1/2, 1/2, and 1, respectively. The special-angle ratios apply to the stated radian angles.
4. The rates are (8-0)/(2-0)=4 m/s and (8-3)/(2-1)=5 m/s. Finite measurements alone do not determine an exact instantaneous rate; different smooth paths can share those measurements and have different tangent slopes at 2.

## APC1 Limits and One-Sided Behavior

1. For x not 2, the quotient equals x+2. The limit is 4; the separately defined point value is 7.
2. The left limit is 1 and the right limit is -1. The function value is h(0)=-1. Because the one-sided limits disagree, the two-sided limit does not exist.
3. The values suggest 2. They do not establish an exact limit or even its existence: a function can match all four samples and behave differently between or closer than those samples.
4. For 1/x, the left behavior is negative infinity and the right behavior is positive infinity, so there is no common two-sided infinite limit. For 1/x^2, both sides grow without bound, expressed as a two-sided limit of positive infinity. Positive infinity is not a finite real number.

## APC2 Calculating Limits

1. Multiply by (sqrt(x)+2)/(sqrt(x)+2). For x>=0 and x not 4, the quotient equals 1/(sqrt(x)+2), whose limit is 1/4.
2. sin(3x)/x=3[sin(3x)/(3x)] for x not 0. The bracket approaches 1 with radian input, so the limit is 3.
3. The quotient becomes (3-1/x)/(2+5/x^2), so the limit is 3/2.
4. The left limit is 3 and the right limit is 3. The right-hand definition gives f(2)=3. The two-sided limit is 3.
5. Since -1<=sin(1/x)<=1, the bounds are -x^2<=f(x)<=x^2. Both bounds tend to 0, so the squeeze theorem gives limit 0 even though sin(1/x) itself oscillates.

## APC3 Continuity and Discontinuities

1. For x<0 the quotient is -1; for x>0 it is 1. The unequal one-sided limits give a jump. No choice of the single point value can change those limits.
2. A polynomial is continuous on [0, 1]; F(0)=-1 and F(1)=1 put 0 strictly between the endpoint values. IVT therefore supplies at least one root in (0, 1). Uniqueness needs an additional argument, not IVT alone.
3. The vertical asymptote is x=2. As x approaches 2 from the left, q tends to negative infinity; from the right it tends to positive infinity. No finite point value repairs that unbounded behavior.
4. Both sequences approach 0 from the right, but h(x_n)=1 and h(y_n)=-1. Thus even the right-hand limit fails to exist. A point-value assignment cannot create the missing limit, so continuity at 0 fails.

## APC4 Limits and Continuity Review

1. Substitution gives 0/0. For x>=-1 and x not 0, the expression equals 1/(sqrt(1+x)+1), which tends to 1/2.
2. The left limit is 2, the right limit is 3, and the point value is 3. The unequal one-sided limits mean a jump, which cannot be repaired by changing one point value.
3. F(1)=-1 and F(2)=6. The polynomial is continuous on [1, 2], and 0 lies strictly between those outputs, so IVT gives at least one root in (1, 2).
4. The domain excludes -3 and 3. Dividing by x^2 gives the limit 2 at positive infinity. Near 3, the numerator is positive and x+3 is positive; the factor x-3 changes sign. The left limit is negative infinity and the right limit is positive infinity.

## APC5 Derivative Definitions and Tangent Lines

1. The difference quotient simplifies to `2x+3+h`, so `f'(x)=2x+3` and `f'(-1)=1`.
2. The left quotient is -1 and the right quotient is 1. The function is continuous at 0, but the unequal derivative limits mean it is not differentiable there.
3. For `a != 0`, the quotient is `-1/[a(a+h)]` when h is nonzero and `a+h != 0`. At a=2 its limit is `-1/4`. The tangent is `y-1/2=-(x-2)/4`; the original function and derivative remain undefined at x=0.
4. The secant rates are `(5-4.61)/0.1=3.9 m/s` and `(5.41-5)/0.1=4.1 m/s`. The stated model gives `s'(t)=2t`, hence exactly `4 m/s` at t=2. Those finite measurements alone would suggest, rather than prove, that exact derivative.

## APC6 Power, Product and Quotient Rules

1. `p'(x)=15x^4+4x^(-3)`. Both p and this derivative have domain `x != 0`.
2. `q'(x)=[2x(x-1)-(x^2+1)]/(x-1)^2=(x^2-2x-1)/(x-1)^2`, for `x != 1`. Therefore `q'(0)=-1`.
3. On its original domain, `r(x)=x+1`, so `r'(x)=1` for `x != 1`. The graph is that line with an open point at `(1,2)`. The original r is undefined at 1 and has no derivative there; its continuous extension would be a different function.
4. The product slope is `(-1)(4)+(3)(2)=2`. The quotient slope is `[(-1)(4)-(3)(2)]/4^2=-5/8`.

## APC7 Trigonometric, Exponential and Logarithmic Derivatives

1. `f'(x)=-3sin(x)-2sec^2(x)`, with `x != pi/2+k*pi` for any integer k. These exclusions come from the original tangent term.
2. `g'(x)=4^x*ln(4)+1/[x*ln(2)]` for x>0. Thus `g'(1)=4ln(4)+1/ln(2)`.
3. `h'(x)=sec(x)tan(x)-csc(x)cot(x)` where sine and cosine are both nonzero. At pi/4 the two terms are both sqrt(2), so the derivative is 0.
4. `s'(x)=cos(x)`. It is positive on `(0,pi/2)` and `(3pi/2,2pi)`, and negative on `(pi/2,3pi/2)`. The stationary points are the maximum `(pi/2,1)` and minimum `(3pi/2,-1)`.
5. The derivative is `1/(-2)=-1/2`. The absolute value makes the logarithm's input positive; real ln(x) itself has no value at a negative input.

## APC8 Chain Rule, Implicit and Inverse Derivatives

1. The derivative is `4(3x^2+1)^3*(6x)=24x(3x^2+1)^3`.
2. The point satisfies `1*2+2^2=6`. Differentiating gives `y+(x+2y)y'=0`; the slope is `-2/5`, and the tangent is `y-2=-(2/5)(x-1)`.
3. The corresponding inverse input is 5, so `h'(5)=1/f'(2)=1/3`. An inverse derivative at input 2 would require information at an original-function input whose output is 2.
4. `v(t)=3t^2-6t+2` and `a(t)=6t-6`. At t=2, v=2 m/s and a=6 m/s^2. Their equal positive signs imply increasing speed in a sufficiently small neighborhood of that instant.
5. The values are `2/sqrt(3)`, `-2/sqrt(3)`, and `1/2`, respectively. The arcsin and arccos formulas give finite derivatives only for `-1<x<1`; their endpoints have no finite derivative.

## APC9 Mixed Differentiation Review

1. `f'(x)=2x/(1+x^2)` and `f''(x)=2(1-x^2)/(1+x^2)^2`. The logarithm's argument is positive for every real x, so both formulas apply on all real inputs.
2. Differentiating gives `2x+y+(x+2y)y'=0`, so the slope is `-(2+2)/(1+4)=-4/5`.
3. The supported value is `h'(1)=1/2`. The claim about h'(0) uses the wrong inverse input and is not determined by the given information.
4. The two pieces meet at (0,0), so the function is continuous. The left slope is -2 and the right slope is 1; the corner prevents differentiability.
5. `v(t)=3(t-1)(t-3)`, so the turns occur at t=1 and t=3. Motion is forward on `(0,1)` and `(3,4)`, and backward on `(1,3)`. Positions are `s(0)=0`, `s(1)=4`, `s(3)=0`, `s(4)=4`. Displacement is 4 m; total distance is `4+4+4=12 m`.

## APC10 Related Rates, Linearization and L'Hopital's Rule

1. With `x^2+y^2=100`, the positive height is y=8 ft. Differentiating gives `2x*x'+2y*y'=0`, so `y'=-(6/8)*1=-3/4 ft/s`: the top moves downward.
2. The tangent approximation is `2+(1/4)(0.1)=2.025`. Since the square-root function is concave down on positive inputs, the tangent estimate is above the exact value.
3. The volume is decreasing at 2 L/min at t=3. Its signed rate is increasing at 0.5 L/min^2, becoming less negative locally. Linearization gives `V(3.1) approx 20-2(0.1)=19.8 L`.
4. The first has form 0/0; differentiable numerator and denominator with denominator derivative 1 give limit `2e^(2x)/1 -> 2`. The second has infinite/infinite form on positive x; its derivative quotient is `(1/x)/1 -> 0`. Thus the limits are 2 and 0.
5. The denominator tends to 3, so substitution gives `5/3`. The quotient has neither required indeterminate form. Differentiating the two parts would instead give 4, which does not equal the original limit.

## APC11 Function Theorems and Sign Charts

1. The polynomial is continuous on [1,3] and differentiable on (1,3). The secant slope is `(9-1)/2=4`; solving 2c=4 gives c=2.
2. The continuous function attains minimum 0 at x=0 and maximum 1 at x=-1 and x=1. It is not differentiable at 0, so MVT's hypotheses fail. The average slope is 0, while the existing interior slopes are -1 and 1, so none equals 0 in this example.
3. For x^4, the first derivative changes from negative to positive at 0, giving a local minimum; its second derivative is nonnegative and has no concavity change there. For x^3, the derivative is positive on both sides, so there is no extremum; `v''=6x` changes sign, giving an inflection. A zero second derivative alone proves neither outcome.
4. The derivative is positive for x<-2 and x>1, and negative for -2<x<1. Thus f has a local maximum at -2 and a local minimum at 1. Since `f''=2x+1`, it is concave down before -1/2 and up afterward, with inflection input -1/2. The point (0,4) anchors the vertical position; no exact extremum heights are required.

## APC12 Optimization and Derivative Graphs

1. `V'=144-96x+12x^2=12(x-2)(x-6)`. Candidate values are V(0)=0, V(2)=128, and V(6)=0. The maximum is 128 cm^3 at x=2, giving an 8-by-8-by-2 cm box.
2. `D^2=x^2+(2x+1)^2=5x^2+4x+1`. Its derivative vanishes at x=-2/5, giving y=1/5 and distance `1/sqrt(5)`. Completing the square, or the positive second derivative together with growth at infinity, establishes the global minimum.
3. At (0,5), `dy/dx=-x/y=0`, so the tangent is y=5. At (5,0), use `dx/dy=-y/x=0`; the tangent is vertical, x=5. The circle has two y-values for many x-values, so local branches, rather than one global y-function, are needed.
4. Shape A fits. The derivative is positive throughout [0,2], and `f''=-1` is negative. Thus f increases while its tangent slopes decrease; f(0)=1 supplies an anchor point.

## APC13 Derivative Applications Review

1. `dV/dt=4pi*r^2*r'`, so the rate is `4pi*4*3=48pi cm^3/s`.
2. The remaining side is `y=100-2x`, with `0<=x<=50` including collapsed boundaries. Area is `100x-2x^2`; its derivative is zero at x=25. Endpoints give 0 and the critical point gives 1250 m^2. Dimensions are 25-by-50 m.
3. The polynomial meets the continuity and differentiability hypotheses. The secant slope is 4; `3c^2=4` gives only `c=2/sqrt(3)` in (0,2).
4. The function increases on `(-3,-2)` and `(2,3)` and decreases on `(-2,2)`. It has a local maximum at -2 and local minimum at 2. Because `f''=2x`, it is concave down for x<0 and up for x>0, with inflection input 0.
5. The initial form is 0/0, and the first derivative quotient is `sin(x)/(2x)`, also 0/0. A second valid application gives `cos(x)/2 -> 1/2`. The differentiability and nonzero denominator-derivative conditions hold on punctured neighborhoods of 0 at the stages where each rule is used.

## APC14 Accumulation and the Fundamental Theorem

1. The left estimate is 11 L, the right estimate is 20 L, and the trapezoid estimate is `(11+20)/2=15.5 L`. The stated increasing behavior makes the left estimate a lower bound and the right estimate an upper bound. The finite table does not make any estimate exact without an additional interpolation assumption.
2. Displacement is `[t^2/2-t] from 0 to 3 = 3/2 m`. Velocity is negative before t=1 and positive afterward. The two unsigned triangular areas are 1/2 and 2, so total distance is 5/2 m.
3. The chain rule with FTC gives `G'(x)=2x*(1+x^6)`, hence `G'(2)=260`.
4. `H'(x)=cos(x)` and `H(x)=sin(x)`. The requested values are 0,1,0. H increases on (0,pi/2), then decreases on (pi/2,pi).
5. The sum is `sum (k/n)^2*(1/n) = n(n+1)(2n+1)/(6n^3)`. Its limit is 1/3, the exact integral.

## APC15 Antiderivatives and Integration Methods

1. An antiderivative is `x^3-2x^2+2x+C`. Its endpoint difference is 4, so the definite integral is 4.
2. With `u=1+x^2`, the bounds are 2 and 10. The integral is `ln(10)-ln(2)=ln(5)`.
3. The antiderivatives are `ln(abs(x))+C` on intervals excluding 0, `(1/2)arctan(x/2)+C` on all real inputs, and `arctan(x+1)+C` on all real inputs after completing the square.
4. The triangular area is `2*4/2=4`, agreeing with `[x^2] from 0 to 2`. Reversed bounds give -4, and multiplying the integrand by 3 gives 12.
5. Choose `u=x` and `dv=e^x dx`. The result is `(x-1)e^x+C`; its derivative is `(x-1)e^x+e^x=x e^x`.
6. The decomposition is `(1/2)/(x-1)-(1/2)/(x+1)`. An antiderivative is `(1/2)ln(abs((x-1)/(x+1)))+C`, on any interval excluding -1 and 1. Constants can differ on the separated intervals.
7. The first is `lim as b grows of [-1/x] from 1 to b = 1`. The second is `lim as a approaches 0 from above of [2sqrt(x)] from a to 1 = 2`. For the last, the left and right integrals diverge to negative and positive infinity. Their divergent values cannot be cancelled to form an ordinary improper integral.

## APC16 Integration and Accumulation Review

1. The left change estimate is `1*2+3*3=11 L`; the right estimate is `3*2+7*3=27 L`. Trapezoids give `((1+3)/2)*2+((3+7)/2)*3=19 L`, so Q(5) is estimated as 29 L. Monotonicity bounds the exact change by 11 and 27; it does not make the trapezoid estimate exact.
2. `F'(x)=3[1+(3x)^2]=3+27x^2`, so F'(1)=30. At x=2/3 both bounds are 2, giving F(2/3)=0.
3. The integral of abs(x) is 1, the sum of two positive triangular areas. The integral of x is 0 because the negative and positive triangles cancel. Equal signed integral and total area are not interchangeable.
4. The definite integral is `[x^3+2x] from 0 to 2 = 12`. The indefinite family is `x^3+2x+C`. Reversing bounds gives -12; no extra constant is added to a definite value.

## APC17 Differential Equations and Slope Fields

1. The derivative of x^2+3 is 2x and its value at 0 is 3. The function x^2+4 satisfies the same differential equation but fails the specified initial value.
2. On y=0, the slopes at x=-1,0,1 are -1,0,1. On y=1 they are -2,-1,0. Segments are horizontal where y=x.
3. The equilibrium is y=3. Slopes are positive below 3 and negative above 3. At (0,1) the slope is 2, so that solution initially increases.
4. A satisfies both conditions. B has the correct initial value but derivative 2 rather than 2x as a function. C has the correct derivative but initial value 1.
5. With h=1/2 the y-values are 1,1.5,2.5. With h=1/4 they are 1,1.25,1.625,2.15625,2.8828125. The exact function has derivative `2e^x-1=x+y` and initial value 1; at x=1 it is `2e-2`, approximately 3.43656. The quarter-step estimate is closer for this example; these two computations alone are not a universal error bound.

## APC18 Separable, Exponential and Logistic Equations

1. The solution is `y=2e^(3x)`. Its derivative is 3y and its initial value is 2.
2. Integration gives `-1/y=x-1`, so `y=1/(1-x)`. The maximal interval containing 0 is `(-infinity,1)`, ending at the blow-up. The equilibrium y=0 is a separate solution for a different initial value.
3. `k=ln(2)/2 per hour`. Then `P(3)=100*2^(3/2)=200sqrt(2)` and `P'(2)=200k=100ln(2)` population units per hour.
4. For y(0)=0, the equilibrium solution is y=0. For y(0)=1, separation gives `1/y=x^2+1`, hence `y=1/(1+x^2)`. Both verify the equation. Dividing by y^2 excludes the first solution and must not be used to discard it.
5. The given function starts at 100. Writing `z=e^(-0.2t)`, its derivative and the model's right side both equal `1800z/(1+9z)^2`. It approaches 1000. The rate is maximal at P=500, where it is 50 population units/hour. Solving `9e^(-0.2t)=1` gives `t=5ln(9)` hours.

## APC19 Differential Equations Review

1. The derivative is 1+x and the initial value is 2. The general family is `y=C+x+x^2/2`; the initial condition selects C=2.
2. Separation gives `y+y^3/3=x^2/2` after applying the initial condition. Differentiating gives `(1+y^2)y'=x`, recovering the equation. The initial tangent slope is 0.
3. The derivative is `3e^(-0.5t)`, equal to `4-0.5[8-6e^(-0.5t)]`. Its initial value is 2. The equilibrium is 8 L; the initial slope is 3 L/min, so the volume increases toward that level.
4. The proposed derivative is 2x. At x=0 and x=1 it equals x+x^2, but at x=2 the values are 4 and 6. Thus it fails as an identity and is not a solution, despite two matching samples.
5. Euler gives y(0.1)=4 and y(0.2)=3.2. The exact value is `5e^(-0.4)`, approximately 3.3516, so this estimate is below it. In the logistic example both P=5 and P=15 have rate 15/4. The quadratic rate is greatest at P=10, where it equals 5.

## APC20 Net Change, Average Value and Area

1. Total inflow is 8 L. Outflow is 2 L, so net change is 6 L and the final volume is 16 L.
2. Displacement is `[t^2/2-2t] from 0 to 5 = 5/2 m`. Splitting at t=2 gives distances 2 and 9/2, totaling 13/2 m. Average velocity is 1/2 m/s and average speed is 13/10 m/s.
3. Intersections occur at x=-1,0,1. The signed integral is 0 by odd symmetry. The ordering reverses at 0, so total area is twice the integral of x-x^3 on [0,1], equal to 1/2 square unit.
4. The intersections are y=0 and y=2. The right boundary is 2y and the left boundary is y^2 there, so the area is `[y^2-y^3/3] from 0 to 2 = 4/3` square units.
5. The integral is 9, and dividing by the interval length 3 gives average value 3. The input is sqrt(3). The function is continuous on the closed interval, so the integral-average-value theorem applies.

## APC21 Cross Sections, Washers and Arc Length

1. The square areas are x^2, so volume is 8/3. Equilateral-triangle areas multiply that by sqrt(3)/4, giving `2sqrt(3)/3`. Both results are in cubic coordinate units.
2. The radius is sqrt(x), so volume is `pi*integral from 0 to 4 of x dx = 8pi`.
3. The outer radius is `2-x^2` and the inner is `2-x`. Their squared difference is `4x-5x^2+x^4`, whose integral on [0,1] is 8/15. Volume is `8pi/15`.
4. A horizontal disc has radius y^2, so its area is pi*y^4. Integrating from y=0 to 1 gives `pi/5`.
5. For the first curve, y'=sqrt(x), so length is the integral of sqrt(1+x), equal to `(2/3)(8-1)=14/3`. The line's length is the integral of sqrt(10) across an interval of width 2, giving `2sqrt(10)`. Arc length integrates a length element; integrating y itself would calculate a different quantity.

## APC22 Integration Applications Review

1. The intersections are x=0 and x=2, with 2x above x^2 between them. The integral of 2x-x^2 is `4-8/3=4/3` square units.
2. The radius is x+1. Volume is `pi*integral from 0 to 1 of (x+1)^2 dx = 7pi/3`.
3. The signed displacement is 0. Velocity changes sign at 2; the two unsigned triangular areas are 2 each, so total distance is 4 m.
4. Trapezoids give `((1+2)/2)*1+((2+4)/2)*2=15/2 L`. Left and right estimates are 5 L and 10 L, which bound the exact change by monotonicity. The trapezoid final-volume estimate is `55/2 L`; it is not asserted exact from the table.
5. The integral is 8, so the average value is 4. The input is `2/sqrt(3)` in the interval. A rectangle of height 4 and width 2 has area 8, the same as the definite integral.

## APC23 Parametric, Polar and Vector Calculus

1. At t=1 the point is (2,0), with slope 1 and tangent `y=x-2`. The second x-derivative is `3/(4t)+1/(4t^3)`, giving 1. At t=0, dx/dt=0 and dy/dt=-1, so the tangent is vertical at (1,0), namely x=1.
2. Position is `(1+t^2,-1+t^3)`, so at 2 it is (5,7), and displacement is (4,8). Speed at 1 is sqrt(13). On [0,1], speed is `t*sqrt(4+9t^2)`, whose integral is `(13sqrt(13)-8)/27`.
3. The constant speed is 5, giving distance 10. Displacement is (6,8), whose magnitude is also 10 because this path is a straight segment without reversal.
4. At pi/4, r=sqrt(2), so the point is (1,1). The polar numerator is 0 and denominator is -2, giving slope 0. The full area is pi. Multiplying the polar equation by r gives `x^2+y^2=2x`, a unit circle centered at (1,0); the given interval traces it once with r>=0.
5. The integral is `(1/2)*integral from 0 to 2pi of (1+2cos(theta)+cos^2(theta)) dtheta = 3pi/2`. A thin sector has area approximately `(1/2)r^2*delta_theta`, which explains the squared radius.

## APC24 Parametric and Polar Applications Review

1. The point is (1,2). Slope is `2/(2t)=1/t`, giving 1. Its t-derivative is `-1/t^2`; dividing by 2t gives `-1/(2t^3)`, or -1/2 at 1.
2. Position is `(t,1+t^2)`, so the endpoint is (2,5). Speed there is sqrt(17), and displacement is (2,4). Total distance is the exact integral of `sqrt(1+4t^2)` from 0 to 2, rather than the displacement magnitude.
3. The point is (0,2). At that angle the polar numerator is 0 and denominator is -2, so the slope is 0. Area is `(1/2)*integral from 0 to pi of (1+2sin(theta)+sin^2(theta)) dtheta = 2+3pi/4`.
4. Bounds are 0 to pi/2, with outer radius 2 and inner radius 1. The area is `(1/2)*(4-1)*(pi/2)=3pi/4`.
5. Speed is 1, so distance is pi. Displacement is (-2,0), with magnitude 2. The semicircular path is longer than the straight segment joining its endpoints.

## APC25 Series Convergence and Error Bounds

1. The geometric series converges to `3/(1-1/2)=6`. The harmonic series diverges, while the p-series with p=2 converges. Terms approaching 0 do not distinguish the last two by themselves.
2. Both series have positive terms. For the first, comparison with 1/n^2 gives ratio `n^2(2n+1)/(n^3+1) -> 2`, so it converges. For the second, `0<1/(n^2+5)<=1/n^2`, proving convergence.
3. The function `1/[x ln(x)]` is positive, continuous and decreasing for x>=2, but its improper integral grows as ln(ln(x)), so the series diverges. For the p=3 tail after n=10, the integral bounds are `1/(2*11^2) <= R_10 <= 1/(2*10^2)`, or 1/242 and 1/200.
4. The first ratio is `(n+1)/3 -> infinity`, so that series diverges. The second ratio is `3/(n+1) -> 0`, proving absolute convergence.
5. The alternating harmonic series is conditional: its magnitudes decrease to 0, but their harmonic sum diverges. The other is absolutely convergent by p=2. The alternating error after 10 terms is at most 1/11; its next term is positive, so that even partial sum is below the limit.
6. Both ratio limits are 1, where the test is inconclusive. The p-series criterion gives their different outcomes. For n/(n+1), terms approach 1 rather than 0, so its series diverges.

## APC26 Power Series and Taylor Approximations

1. The partial sum is `1+1/3+1/9+1/27=40/27`. The exact value is 3/2, and the remaining geometric tail is `(1/3)^4/(1-1/3)=1/54`.
2. The center is 2 and radius is 2. The ratio condition gives 0<x<4. At 0 the series is alternating harmonic and converges; at 4 it is harmonic and diverges. The full interval is `[0,4)`.
3. The polynomial is `x-x^2/2+x^3/3`; at 1/5 it is `137/750`, about 0.18266667. The next term has magnitude `(1/5)^4/4=1/2500`. The next sign is negative, so the polynomial is an overestimate by at most that amount.
4. `P_5=x-x^3/6+x^5/120`, giving `1841/3840`, about 0.47942708. Error is at most `(1/2)^7/7!=1/645120`. Its derivative is `1-x^2/2+x^4/24`, precisely the degree-4 cosine polynomial.
5. The polynomial is `(x-1)-(x-1)^2/2`, giving 0.095 at 1.1. Since `f'''(x)=2/x^3<=2` on that interval, error is at most `2*(0.1)^3/6=1/3000`.

## APC27 Series and Approximation Review

1. The first series diverges because its terms approach 1. The second has terms `1/n-1/(n+1)`, so its N-term sum is `1-1/(N+1)` and its exact sum is 1.
2. The function is positive, continuous and decreasing for x>=2. Substitution u=ln(x) gives an integral of 1/u^2, with finite value 1/ln(2). The series therefore converges; that comparison integral is not the exact discrete sum.
3. Magnitudes decrease to 0, so the alternating series converges; their positive series diverges by comparison with the harmonic series. It represents arctan(1)=pi/4. The five-term sum is `263/315`, with the next term negative and magnitude 1/11, so the limit is between `263/315-1/11` and `263/315`.
4. The center is -1 and radius is 1. At x=-2 the absolute series is 1/n^2, and at x=0 it is also 1/n^2; both converge absolutely. The complete interval is `[-2,0]`.
5. The polynomial gives `1-1/8+1/384=337/384`. Error is at most `(1/2)^6/6!=1/46080`. The next term is negative, so this is an overestimate.
6. The positive successive-term ratio is `(1/3)*[(n+1)/n]^2 -> 1/3`, proving convergence. For 1/n^2 the ratio limit 1 is inconclusive; the p-series criterion, rather than that ratio result, proves its convergence.

## APC22 AB Readiness Portfolio

1. Factoring the numerator gives `(x+3)(x-2)`. On the punctured domain the quotient is x+3, so the limit is 5; the original expression remains undefined at 2.
2. `h'(x)=2x*cos(x^2)`. At sqrt(pi), the cosine factor is -1, giving `-2sqrt(pi)`.
3. With sides x and 14-x, area is `14x-x^2` on [0,14] including collapsed boundaries. Its critical point x=7 gives 49 m^2; endpoint areas are 0. The maximizing rectangle is 7-by-7 m.
4. `F'(x)=3x^2*(x^6+1)`, so F'(1)=6. Both the endpoint evaluation and the derivative of the moving bound are required.
5. The solution is `y=2e^(2x^2)`. Its derivative is `8x*e^(2x^2)=4xy`, and y(0)=2.
6. The intersections are 0 and 3. On that interval 3x is above x^2, so the area is the integral of 3x-x^2 from 0 to 3, equal to 9/2 square units. A calculator graph checks the boundaries but does not replace the integral justification.

**Portfolio review:**

- Retain one corrected entry from each AB strand: limits/continuity, differentiation, derivative applications, integration, differential equations and integration applications.
- For each entry, identify the representation and the rule or theorem with its relevant hypotheses, show the calculation, and state a conclusion with domains or units.
- Complete the six-question mixed set, recording a time limit before starting and the actual elapsed time. Use no calculator for 1–5; use graphing technology to check 6.
- Use the answer reasoning to classify and repair every missed step as concept, setup, calculation, justification or communication. A final answer alone does not satisfy the reasoning criterion.
- Name three specific review actions from that evidence and record whether the route ends at AB or continues with APC23–APC27 for BC. This course checklist is not an official AP exam score.

## APC27 BC Readiness Portfolio

1. At t=2, graph slope is 3 and second x-derivative is 3/8. Velocity is (4,12), speed is `4sqrt(10)`, and acceleration is (2,12). The second graph derivative uses division by dx/dt after differentiating the slope.
2. The rectangular curve is a circle centered at (3/2,0), radius 3/2, traced once on the stated interval. Its area is `(1/2)*integral 9cos^2(theta) dtheta = 9pi/4`, agreeing with the circle's area.
3. The geometric series converges to `1/(1-2/5)=5/3`. The other converges conditionally: its magnitudes decrease to 0, but the absolute p-series with p=1/2 diverges.
4. The center is 1 and radius is 1. At x=0 the series is alternating harmonic and converges; at x=2 it is harmonic and diverges. The complete interval is `[0,2)`.
5. `P_2(0.1)=1+0.1+0.1^2/2=1.105`. The third-derivative bound gives error at most `(6/5)*(1/10)^3/6=1/5000`, or 0.0002.
6. By parts, an antiderivative of x e^x is `(x-1)e^x`, giving definite value 1. The improper integral is the limit of `[-1/(2x^2)]` from 1 to b, equal to 1/2. Euler values are 1,3/2,9/4, so the estimate is 9/4, an approximation rather than the exact e.

**Portfolio review:**

- Retain the AB portfolio or one corrected item from every AB strand, then add parametric/vector, polar, convergence and power/Taylor-series evidence.
- Identify the parameter, angle, domain or interval and representation-specific formula before each calculation. Series evidence includes test hypotheses, endpoint behavior and a valid error bound where requested.
- Complete the six-question BC mixed set with a time limit recorded before starting. Use graphing technology for 2 and show analytical work for every item.
- Check earlier BC methods as well as the final representation and series units: integration by parts, partial fractions, improper integrals, Euler steps, logistic models and arc length.
- Repair each missed step and choose one AB dependency and one BC-specific review target. This local portfolio review does not assign an official AP exam score.

## APC25 Root Test Extension

1. The nth root of the positive term is `n/(2n+1)`, whose limit is 1/2. Since 1/2<1, the series converges absolutely.
