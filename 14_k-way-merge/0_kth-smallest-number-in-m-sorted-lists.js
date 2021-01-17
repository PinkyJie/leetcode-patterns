const { Heap } = require('../_utils');

/**
 *
 * Problem:
 * Given M sorted arrays, find the Kth smallest number among all the arrays.
 *
 * Example 1:
 * Input: L1=[2, 6, 8], L2=[3, 6, 7], L3=[1, 3, 4], K=5
 * Output: 4
 * Explanation: The 5th smallest number among all the arrays is 4, this can be verified
 * from the merged list of all the arrays: [1, 2, 3, 3, 4, 6, 6, 7, 8]
 *
 * Example 2:
 * Input: L1=[5, 8, 9], L2=[1, 7], K=3
 * Output: 7
 * Explanation: The 3rd smallest number among all the arrays is 7.
 *
 *
 * Time: O((k + m) log(m))
 * Space: O(m) <- for heap
 *
 * @param {number[][]} lists
 * @param {number} k
 * @return {number}
 */
function kthSmallestNumberInMSortedLists(lists, k) {
  /**
   * Similar as the problem 23_merge-k-sorted-lists, the difference here is:
   *  * the input array is a nested number array, not array of linked lists, so we need to
   * store both the `listIndex` and `itemIndex` because we don't have `.next` to find the
   * next element of the current popped one
   *  * we only need to pop() k elements because the problem is asking kth smallest number
   */
  const minHeap = new Heap((a, b) => b.value - a.value);
  // O(m log(m))
  for (let i = 0; i < lists.length; i++) {
    if (lists[i].length > 0) {
      minHeap.push({
        value: lists[i][0],
        listIndex: i,
        itemIndex: 0,
      });
    }
  }
  let count = 0;
  // O(k log(m)) pop()/push() will only happen for k times at most
  while (minHeap.size() > 0) {
    const { value, listIndex, itemIndex } = minHeap.pop();
    count++;
    if (count === k) {
      return value;
    }
    const nextItemIndex = itemIndex + 1;
    const currentList = lists[listIndex];
    if (nextItemIndex < currentList.length) {
      minHeap.push({
        value: currentList[nextItemIndex],
        listIndex,
        itemIndex: nextItemIndex,
      });
    }
  }
}

// Test
console.log(
  kthSmallestNumberInMSortedLists(
    [
      [2, 6, 8],
      [3, 6, 7],
      [1, 3, 4],
    ],
    5
  )
); // 4
console.log(
  kthSmallestNumberInMSortedLists(
    [
      [5, 8, 9],
      [1, 7],
    ],
    3
  )
); // 7
