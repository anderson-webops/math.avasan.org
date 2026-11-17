# Algebra 2A Practice Checks

## Complex Numbers and Quadratics

1. sqrt(-25)=5i and i^27=i^3=-i, so the expression is 5i-4i=i. The equation z^2=-25 has both z=5i and z=-5i; the principal square root is 5i.

2. The numerator is (4-3i)(2-i)=5-10i. Since 1/(-5i)=i/5, the quotient is (5-10i)i/5=2+i. Multiplying the result by -5i recovers 5-10i.

3. x^2+3x-10=(x+5)(x-2), so x=-5 or x=2. Substitution gives 25-15-10=0 and 4+6-10=0.

4. 2x^2-5x-12=(2x+3)(x-4), so x=-3/2 or x=4. The middle terms -8x+3x combine to -5x.

5. x^2-20x+100=(x-10)^2. The root is 10 with multiplicity 2, and expansion gives x^2-20x+100.

6. x^2-10x=-18 becomes (x-5)^2=7, so x=5 plus or minus sqrt(7). Both values satisfy the original equation.

7. The vertex is (0,0). The parabola opens downward and is wider than y=x^2 because abs(-1/2)<1. Its real domain is all real numbers and its range is y<=0.

8. Reflection gives y=-x^2+5. Replacing x by x-3 for the right shift gives y=-(x-3)^2+5, with vertex (3,5).

## Polynomials, Division and Graph Features

1. Descending order gives 2x^7-36x^2+7x. The degree is 7 and leading term 2x^7.

2. Group 2x^3(6x+1)-5(6x+1)=(6x+1)(2x^3-5). Multiplication gives the four original terms.

3. 8x^3-200x=8x(x^2-25)=8x(x-5)(x+5). Zeros -5,0,5 each have multiplicity 1, so the graph crosses the x-axis at each.

4. The quotient is -9x^3+3x^2-2x+2 and remainder 0. Multiplication by x+1 gives -9x^4-6x^3+x^2+0x+2. The original quotient excludes x=-1.

5. The factorization is 2(x+2)(x+1)(x-4). Roots -2,-1,4 are simple, totaling 3 roots. f(x) has one sign change, and f(-x) two, consistent with one positive and two negative roots.

6. Reflection across the y-axis gives f(-x)=-x^3+2x+1. Reflection across the x-axis gives -f(x)=-x^3+2x-1.

7. The squared term is nonnegative, so the global minimum is 1/2 at x=-1 and x=1; the range is [1/2,infinity). The degree is 4, allowing at most 3 turning points. The two minima and the local maximum (0,2) give exactly those three.

## Rational, Radical and Piecewise Functions

1. A horizontal asymptote describes end behavior and can be crossed. Here y=0 is the horizontal asymptote and f(0)=0, so the graph meets it at (0,0).

2. The domain excludes x=-1/4. The vertical asymptote is x=-1/4 and horizontal asymptote y=1/4. The x-intercept is (2,0) and the y-intercept (0,-2).

3. The factors give (x-5)(x+2)/((x-5)(x+1)), excluding x=-1 and x=5. The simplified expression is (x+2)/(x+1). The hole is (5,7/6), the vertical asymptote x=-1 and the zero x=-2.

4. The expression becomes (x+1)/(x+2) while retaining x!=-2,2. Its valid zero is -1. The cancelled value 2 is excluded from the original function and therefore cannot be one of its zeros.

5. The allowed solution is x=8: sqrt(9)=sqrt(16)-1=3. At x=0 the two sides are 1 and -1, so 0 is extraneous. Retaining the sign conditions after isolation prevents accepting it.

6. The second tier gives 22/2.75=8 bags. C(4)=14 dollars and C(5)=13.75 dollars. At the threshold, the lower price applies to all five bags; this is an all-unit discount rather than a lower charge for only the fifth bag.

7. Continuity requires 9+2c=6c+1, giving c=2. Both expressions then have boundary value 13.

8. Factoring and multiplying by the reciprocal gives (a+2)/(2a+1). Retain a!=-1/2,1/2,2: the original denominators exclude the first two values and the divisor is zero at 2, even though the final simplified expression has a finite value there.

## Capstone Domain Stress Test

Factoring gives f(x)=(x-1)(x+1)/(x-1)=x+1 only where x!=1. The original denominator still excludes 1.

**Initial interval [-2,2]**

| Input | f(x) | g(x) |
| ---: | ---: | ---: |
| 0 | 1 | 1 |
| 1 | Undefined | 2 |
| 2 | 3 | 3 |

**Changed interval [1,3]**

| Input | f(x) | g(x) |
| ---: | ---: | ---: |
| 1 | Undefined | 2 |
| 2 | 3 | 3 |
| 3 | 4 | 4 |

Initially f has domain [-2,1) union (1,2], while g has domain [-2,2]. After the interval change, f has domain (1,3] and g has domain [1,3]. Both agree wherever f is defined, but g also supplies a value at the hole. Matching algebraic formulas after cancellation do not restore an excluded input. A capstone comparison should likewise retain each original restriction and check its new boundary explicitly.
