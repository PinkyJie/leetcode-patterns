# Two heaps

## When to use

In many problems, where we are given a set of elements such that we can divide them into two parts. To solve the problem, we are interested in knowing the smallest element in one part and the biggest element in the other part. This pattern is an efficient approach to solve such problems.

This pattern uses two Heaps to solve these problems; A Min Heap to find the smallest element and a Max Heap to find the biggest element.

## Typical use cases

1. Find the median: split the number group into 2 sections, put the smaller part into a max heap, and put the larger part into a min heap, thus the median number will be calculated by the top of the max heap and the top of the min heap.

- assume the smaller part can have one more items than the larger part, this is to cater the scenario when the whole group has odd counts
- keep in mind to do re-balancer after push/pop items from the heaps, make sure the length of the larger part equal or one less than the smaller part

2. Optimization problems which involves 2 factors: put 1 factor in a heap and put the other 1 factor in another heap.

- the key logic is for one item in heap1, put all eligible items for it into heap2, to make heap2 top is the optimal result we need
- the 2 heaps can be one max and one min, or two mins, or two maxs according to the requirements, but usually the common strategy is to keep pop() the ineligible items in heap2 to make sure it only contains eligible items
