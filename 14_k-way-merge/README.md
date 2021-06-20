# K-way merge

This pattern helps us solve problems that involve merging a list of sorted arrays.

## When to use

Whenever we are given K sorted arrays, we can use a Heap to efficiently perform a sorted traversal of all the elements of all arrays. We can push the smallest (first) element of each sorted array into a Min Heap to get the overall minimum. While inserting elements to the Min Heap we keep track of which array the element came from. We can, then, remove the top element from the heap to get the smallest element and push the next element from the same array, to which this smallest element belonged, to the heap. We can repeat this process to make a sorted traversal of all elements.

## Pseudo code

```javascript
// item in heap { value, listIndex, itemIndex }
const minHeap = new Heap((a, b) => b.value - a.value);

for (let i = 0; i < lists.length; i++) {
  minHeap.push({ value: lists[i][0], listIndex: i, itemIndex: 0 });
}

while (minHeap.size() > 0) {
  const item = minHeap.pop();
  const nextItemIndex = item.itemIndex + 1;
  if (nextItemIndex < lists[item.listIndex].length) {
    minHeap.push({
      value: lists[item.listIndex][nextItemIndex],
      listIndex: listIndex,
      itemIndex: nextItemIndex,
    });
  }
}
```

Note: during this process, we can say the heap always contains one element from each array, until the popped element's original array doesn't have any other elements left. This property is useful when we need to calculate something which requires the heap at least contain one element from each array. (e.g. [632_smallest-range-covering-elements-from-k-lists](./632_smallest-range-covering-elements-from-k-lists.js))
