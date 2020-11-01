# Cyclic sort

## When to use

For problems involving arrays containing numbers in a given range (e.g. from 1 to n), to find the duplicate numbers or missing numbers in the array.

### Pseudo code

```javascript
for (let i = 0; i < numbers.length; i++) {
  // keep swapping if index i doesn't hold the correct number
  while (numbers[i] !== i + 1) {
    if (numbers[numbers[i] - 1] !== numbers[i]) {
      _swap(numbers, i, numbers[i] - 1);
    }
  }
}
```

The common strategy is to keep swapping the number on current index to its correct position (index which matches the number) until the correct number (which matches the index) to be swapped to the current index.
