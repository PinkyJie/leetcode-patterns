# Dynamic programming

## When to use

## Pseudo code

Check the code in 0_0-1-knapsack problem, all dynamic programming problems can be solved with the 4 solutions mentioned there.

1. The naive recursion which will end up with a exponential time complexity.
2. If there are duplicate sub-problems in solution 1, then use memoization to reduce the time complexity. The final complexity depends on how many factors we need to consider in the problem, e.g. for 2 factors we can construct a `memo` matrix and reduce the complexity to `O(mn)`.
3. Use the same analysis approach from solution 2, we can get the formulas to calculate the `memo` matrix from bottom to up (smaller index to larger index), thus we don't need to use recursion any more. Note: the time complexity will still be the same as solution 2, the space complexity is also the same expect we don't have recursion stack cost any more.
4. If solution 3's formulas has such properties: the new row values only depends on the previous row values, we can try to reduce the matrix to a single dimension array to reduce the space complexity. Note: the time complexity will still be the same as solution 3.
