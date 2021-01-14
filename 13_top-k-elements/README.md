# Top K elements

## When to use

Any problem that asks us to find the top/smallest/frequent K elements among a given set falls under this pattern. The best data structure that comes to mind to keep track of K elements is Heap. This pattern will make use of the Heap to solve multiple problems dealing with K elements at a time from a set of given elements.

The "Pseudo code" for this would be the normal push/pop operation for the heap, the things we need to figure out while using the approach:

- max heap or min heap
  - for top k largest elements related problem, use min heap (check 215_kth-largest-element-in-an-array.js for more explanation)
  - for top k smallest elements problem, use max heap (check 0_kth-smallest-element-in-an-array.js for more explanation)
- pay attention to the comparator used in the heap, sometimes multiple factors need to be taken into consideration
