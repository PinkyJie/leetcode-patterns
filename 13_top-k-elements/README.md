# Top K elements

## When to use

Any problem that asks us to find the top/smallest/frequent K elements among a given set falls under this pattern. The best data structure that comes to mind to keep track of K elements is Heap. This pattern will make use of the Heap to solve multiple problems dealing with K elements at a time from a set of given elements.

The "Pseudo code" for this would be the normal push/pop operation for the heap, the things we need to figure out while using the approach:

- Max heap or Min heap?
  - We can always think in this way, push the first K elements in the array to the heap, in order to make the numbers in the heap are the final result, e.g. if we are looking for the top K largest elements, we can assume they are the answer, then for the remaining elements, we only need to push a number to the heap **when it's larger than the smallest number in the heap** (because this number should be the K largest rather than the smallest one), that's why we should use min heap.
  - For top K largest elements related problems, use min heap (check [215_kth-largest-element-in-an-array](./215_kth-largest-element-in-an-array.js) for more explanation)
  - For top K smallest elements related problems, use max heap (check [0_kth-smallest-element-in-an-array](./0_kth-smallest-element-in-an-array.js) for more explanation)
- Pay attention to the comparator used in the heap, sometimes multiple factors need to be taken into consideration (e.g. [13_top-k-elements/895_maximum-frequency-stack](./13_top-k-elements/895_maximum-frequency-stack.js))
