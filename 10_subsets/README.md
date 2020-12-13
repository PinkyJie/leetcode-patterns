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

These questions are all related to choices, we can think about the process as a decision tree (check explanation in 78_subsets), every step we have some choices to choose, we go downwards first to choose one choice each step, after reaching the leaf (all choices are chosen at one branch), then we go upward again to choose other choices.
