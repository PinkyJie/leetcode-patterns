# Sliding window

## When to use

For problems which requires calculation/counting among all the contiguous sub arrays, we can try to maintain a sliding window with fixed size or dynamic size.

## Pseudo code

```javascript
let windowStart = 0;
let windowEnd = 0;

// the initial value of aggregation on the sliding window [windowStart, windowEnd)
let aggregationOnWindow = xxx;

while (windowEnd < array.length) {
  // do something on `aggregationOnWindow` to update after adding `windowEnd`
  update(aggregationOnWindow, array[windowEnd]);
  // increase the window size by adding the `windowEnd`
  windowEnd++;

  // check if the window needs to shrink
  while (needsShrink()) {
    // do something on `aggregationOnWindow` to update after removing `windowStart`
    update(aggregationOnWindow, array[windowStart]);
    // decrease the window size by removing the `windowStart`
    windowStart++;
  }
}
```

Based on the code above, for different problems we need to figure out 2 questions:

- when to shrink the window
- how to update the aggregation value
- when to read the final aggregation value
  - if the `needShrink()` is a strict condition, e.g. the logic inside runs only the window itself is not valid, then aggregation value should be read after the inner while loop
  - if the `needShrink()` is a loose condition, e.g. the logic inside runs when the window itself is valid or larger (invalid), then aggregation value should be read inside the inner while loop
