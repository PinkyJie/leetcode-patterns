const { Heap } = require('../_utils');

/**
 *
 * Problem:
 * Given k sorted arrays, find the smallest range that includes at least one number from
 * each of the k lists.
 * https://leetcode.com/problems/smallest-range-covering-elements-from-k-lists/
 *
 * Example 1:
 * Input: L1=[1, 5, 8], L2=[4, 12], L3=[7, 8, 10]
 * Output: [4, 7]
 * Explanation: The range [4, 7] includes 5 from L1, 4 from L2 and 7 from L3.
 *
 * Example 2:
 * Input: L1=[1, 9], L2=[4, 12], L3=[7, 10, 16]
 * Output: [9, 12]
 * Explanation: The range [9, 12] includes 9 from L1, 12 from L2 and 10 from L3.
 *
 *
 * Time: O((k + n) log(k))
 * Space: O(k) <- for heap
 *
 * @param {number[][]} lists
 * @return {number[]}
 */
function findSmallestRange(lists) {
  /**
   * Think about the problem from this perspective: firstly get the 1st number from
   * each list and put them together, now we have numbers from each array and we have
   * the smallest number (range left) and largest number (range right) there, so we can
   * get a initial range. How to make this range get smaller? One way is to remove the
   * smallest number and then push another larger number from the same list. Note that
   * these steps are exactly same as "merge k sorted lists". So if we use a minimum heap
   * here, we can easily get the smallest number, but how to get the largest number in a
   * minimum heap? Obviously there's no heap specific function for that purpose, what we
   * can do is to maintain another variable to store largest number when pushing new
   * numbers into the heap, then after every pushing we can compare the new range with the
   * existing smallest range.
   */
  // item in heap [ number, listIndex, itemIndex ]
  const minHeap = new Heap((a, b) => b[0] - a[0]);
  let maxInHeap = -Infinity;
  // O(k log(k))
  for (let i = 0; i < lists.length; i++) {
    maxInHeap = Math.max(maxInHeap, lists[i][0]);
    minHeap.push([lists[i][0], i, 0]);
  }
  let smallestRange = [minHeap.peek()[0], maxInHeap];
  // O(n log(k)) every number will be pushed and popped once
  while (minHeap.size() > 0) {
    const [, listIndex, itemIndex] = minHeap.pop();
    const list = lists[listIndex];
    // `itemIndex` is like the pointer, we need this to get the next number
    const nextItemIndex = itemIndex + 1;
    if (nextItemIndex < list.length) {
      minHeap.push([list[nextItemIndex], listIndex, nextItemIndex]);
      /**
       * We only update `maxInHeap` for every push(), why don't we also update it for
       * every pop()? Because the heap will always contain k numbers to cover each list.
       * every time we pop a number, it must be the smallest number in the heap, so it's
       * not possible the maximum number being popped out.
       */
      maxInHeap = Math.max(maxInHeap, list[nextItemIndex]);
      if (maxInHeap - minHeap.peek()[0] < smallestRange[1] - smallestRange[0]) {
        smallestRange = [minHeap.peek()[0], maxInHeap];
      }
    } else {
      /**
       * Why we break the loop here? If the list which contains the popped number doesn't
       * have any remaining numbers, we have nothing to push to the heap, which means the
       * heap can't contain k numbers to cover each list, so we can quit the loop
       * immediately.
       */
      break;
    }
  }
  return smallestRange;
}

// Test
console.log(
  findSmallestRange([
    [1, 5, 8],
    [4, 12],
    [7, 8, 10],
  ])
); // [4, 7]
console.log(
  findSmallestRange([
    [1, 9],
    [4, 12],
    [7, 10, 16],
  ])
); // [9, 12]
