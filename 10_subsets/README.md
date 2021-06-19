# Subsets

## When to use

A huge number of coding interview problems involve dealing with Permutations and Combinations of a given set of elements. This pattern describes an efficient backtracking approach to handle all these problems.

## Pseudo code

```javascript
function backtrack(startIndex) {
  if (shouldEnd()) {
    handleResult();
    return;
  }

  for (let i = startIndex; i < choices.length; i++) {
    doChoice(i);
    used[i] = true;
    backtrack(i + 1);
    revertChoice(i);
    used[i] = false;
  }
}
```

These questions are all related to choices, we can think about the process as a decision tree (check explanation in [78_subsets](./78_subsets.js)), every step we have some choices to choose, we go downwards first to choose one choice each step, after reaching the leaf (all choices are chosen at one branch), then we go upward again to choose other choices.

The key difference between the subset/permutation/combination problems is the loop variable `i` above, take `[1, 2, 3]` as input array:

- `subset`: the final result is `[ [], [1], [1, 2], [1, 2, 3], [2], [2, 3], [3] ]`, `i` should start with `startIndex` because once 1 is processed (starting from 1), 1 won't be appeared again when we process 2, and every time we hit `backtrack` the result should be pushed to the final array. In addition, no `used` is required because `i` starts from `startIndex`.
- `permutation`: the final result is `[ [1, 2, 3], [1, 3, 2], [2, 1, 3]. [2, 3, 1], [3, 1, 2], [3, 2, 1] ]`, `i` should always start from index 0, cause once 1 is processed, it can still be appeared when we process 2. `used` is required because `i` always starts from 0, we need to know if `i` is already used or not. In addition, result is only needed to be handled when it contains 3 numbers in it.
- `combination`: the final result is `[ [1, 2], [2, 3], [1, 3] ]` if we are trying to find the combination of 2. This is pretty similar as `subsets`, the only difference is we need to handle result when it already contains 2 numbers in it.
