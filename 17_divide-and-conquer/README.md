# Divide and conquer

## When to use

If a problem is related to a collection and can be solved in the same way when the collection is split into sub problems, we can try to use divide-and-conquer approach to solve it. Basically we can try to split the collection first to 2 parts, and then combine the results together.

## Pseudo code

```javascript
let results = [];
for (let i = 0; i < splitIndices.length; i++) {
  const leftResult = splitWithWay(0, splitIndices[i]);
  const rightResult = splitWithWay(splitIndices[i], n);
  const result = combineResult(leftResult, rightResult);
  results = results.push(result);
}
```

From the above code we can see, things need to be considered when using this approach:

- how should we split the collection? (`splitIndices`)
- how to combine the `leftResult` and `rightResult` (`combineResult`)

Note: consider to use memoization sometimes cause different splitting methods can generate duplicate sub problems.
