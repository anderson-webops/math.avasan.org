# Algebra 2B Practice Checks

## Logarithms, Sequences and Matrices

1. The equations are x=log_7(378) and x=3.7^28. Real logarithm arguments are positive, so x>0 in the second equation; the stated bases are positive and unequal to 1.

2. Division gives 8.4=e^(0.23t). Taking natural logarithms gives ln(8.4)=0.23t, so t=ln(8.4)/0.23.

3. Since 24=6×2^2, log_7(24)≈0.921+2×0.356=1.633. Since 3=6/2, log_7(3)≈0.921-0.356=0.565. These use product, power and quotient rules with positive arguments.

4. log_2.89(8.3)=ln(8.3)/ln(2.89), approximately 1.99. The denominator is nonzero because 2.89 is not 1.

5. d=4 and the next terms are 19,23,27. a_10=3+4×9=39 and S_10=10(3+39)/2=210.

6. r=7 and the next terms are 1029,7203,50421. The first-four-term sum is 3+21+147+1029=1200.

7. The series is 0.7+0.07+0.007+..., with a_1=0.7 and r=0.1. Since abs(r)<1, the sum is 0.7/(1-0.1)=7/9.

8. The product is [[0,10],[2,20]], a 2-by-2 matrix. For example, its upper-left entry is 1×2+2×(-1)=0.

9. The determinant is 2×3-1×5=1, so the inverse is [[3,-1],[-5,2]]. Multiplication in either order gives [[1,0],[0,1]].

10. The graph shifts right 2 and up 1. Its horizontal asymptote is y=1, domain all real numbers and range y>1; f(2)=2. The inverse is f^(-1)(x)=log_2(x-1)+2 with domain x>1.

## Probability, Regression and Trigonometry

1. P(HHT)=1/8. The two black suits each contain five even ranks, so P(even black)=10/52. Independence gives (1/8)(10/52)=5/208.

2. There are 18 counters initially and 17 after a green draw. P(green then blue)=(6/18)(3/17)=1/17; the second draw uses a conditional probability.

3. P(11,11)=11!=39,916,800 and C(7,2)=7!/(2!5!)=21. An arrangement distinguishes positions, while an unordered selection counts each pair once.

4. The probabilities are 210/250=84%, 210/315=2/3 and 210/433, respectively. Each question specifies a different denominator.

5. The means are 2.5 and 3.5, with Sxx=5,Syy=5,Sxy=4. Thus r=0.8, slope 0.8 and intercept 1.5, giving yhat=0.8x+1.5 and R^2=0.64. These observational values do not by themselves establish causation.

6. The slope predicts a 0.28-unit increase in y per one-unit increase in x; 3.61 is the predicted value at x=0 within the model. r^2=0.6084, about 61% of the observed y variation accounted for by that fitted line with an intercept. It is neither a causal percentage nor the fraction of observations exactly on the line.

7. π/6 radians is 30 degrees. The point is (sqrt(3)/2,1/2) and tangent is (1/2)/(sqrt(3)/2)=1/sqrt(3).

8. sin(-y)=-sin(y)=-x because sine is odd. Cosine is even: cos(-y)=cos(y).

9. Amplitude is 2, period 2, midline y=7 and range [5,9]. Values at 0,1,2 are 9,5,9, respectively.

10. 2x+π=2(x+π/2), so the phase shift is -π/2. Amplitude is 4, period π, midline y=5 and range [1,9].

11. tan(-37 degrees) rounds to -0.754. csc(60 degrees)=2/sqrt(3), which rounds to 1.155. Final rounding uses the exact value rather than a rounded intermediate sine.

12. The solutions are π/6 and 5π/6. Sine is the unit-circle y-coordinate and is positive in quadrants I and II; both points have y=1/2.

## Capstone Growth Stress Test

**Original growth rate: 10%**

| n | E(n) | S(n) |
| ---: | ---: | ---: |
| 0 | 100 | 100 |
| 1 | 110 | 110 |
| 2 | 121 | 120 |

**Changed growth rate: 20%**

| n | E_new(n) | S(n) |
| ---: | ---: | ---: |
| 0 | 100 | 100 |
| 1 | 120 | 110 |
| 2 | 144 | 120 |

The changes in E at n=0,1,2 are 0,10,23, respectively; the changes in S are all zero.

At n=2, the original exponential gives 100(1.10)^2=121, while the arithmetic sequence gives 100+10(2)=120. Their agreement at n=0 and n=1 therefore does not establish identical models. Changing the growth rate affects the exponential parameter; the arithmetic sequence's initial value and common difference remain fixed, so its predictions do not change. This measures sensitivity to the stated change. Choosing a model for an actual situation additionally requires observations and justified assumptions about the process.
