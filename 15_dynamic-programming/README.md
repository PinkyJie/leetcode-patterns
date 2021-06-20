# Dynamic programming

## When to use

Dynamic programming is the common strategy used for optimization problems, e.g. problems asking for minimum/maximum values.

## Pseudo code

The keys of dynamic programming can be summarized as:

1. **state**: what states are changing during the optimization?
2. **transition**: what choices are available for each state, and how to state transit?
3. **base state**: what is the base case of the state?

```javascript
base[0][0][...] = baseCase;
for (const state1 of choices1) {
  for (const state2 of choices2) {
    ...
    dp[state1][state2][...] = transition(dp[...][...][...]);
  }
}
```

All dynamic programming problems can be solved with the 4 solutions mentioned there. (Check [0_0-1-knapsack](./0_0-1-knapsack.js) for details.)

1. The naive recursion which will end up with a exponential time complexity.
2. If there are duplicate sub-problems in solution 1, then use memoization to reduce the time complexity. The final complexity depends on how many states we need to consider in the problem, e.g. for 2 states we can construct a `memo` matrix and reduce the complexity to `O(mn)`.
3. Use the same analysis approach from solution 2, we can get the transition function to calculate the `memo` matrix from bottom to up (smaller index to larger index), thus we don't need to use recursion any more. Note: the time complexity will still be the same as solution 2, the space complexity is also the same expect we don't have recursion stack cost any more.
4. If solution 3's transition function has such properties: the new row values only depends on the previous row values, we can try to reduce the matrix to a single dimension array to reduce the space complexity. Note: the time complexity will still be the same as solution 3.
