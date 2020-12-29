# Binary search

## When to use

whenever we are given a **sorted** Array or LinkedList or Matrix, and we are asked to find a certain element, the best algorithm we can use is the Binary Search.

## Pseudo code

There are multiple ways to write binary search function, here I use the `[start, end)` style (the search range does not include end), this seems not correct at first, e.g. if `arr[middle] === target`, then the loop still runs and `end = middle` will bypass `middle` (because end is not included). However, the `start` will keep approaching the correct `middle` when the loop goes on, and will finally stops at `middle` when loops end. This seems counter-intuitive at first, but the benefit here is the resulted `start` will be the correct position to insert the `target` even it's not existed in the original array. In addition, we can think the final `start` as the smallest index in the array which can make `arr[middle] >= target` true, i.e. the smallest index to make sure the "end change condition" true, this is very useful when we need to use the binary search variation.

```javascript
function binarySearch(sortedArr, target) {
  let start = 0;
  let end = sortedArr.length;
  while (start < end) {
    const middle = start + Math.floor((end - start) / 2);
    if (sortedArr[middle] >= target) {
      end = middle;
    } else {
      start = middle + 1;
    }
  }
  return start;
}
```

Note1: sometimes the initial value of `end` (e.g. `end = sortedArr.length - 1`) and the while loop condition equality (e.g. `while (start <= end)`) can be confusing, when to use which? We can think about this question from this perspective:

- if we need to access `sortedArr[end]` in the loop, we need to make sure `end` is always a valid index, so the initial value of `end` should be `sortedArr.length - 1`.
- if we use `end = middle` or `start = middle` in the loop, which means for curtain scenarios we can't exclude `middle` index, then we can't use `while (start <= end)` because it will end up infinite loop.

Note2: for rotated sorted array related questions, it's always a good idea to compare `middle` with either `start` or `end`, because at least one section is sorted.
