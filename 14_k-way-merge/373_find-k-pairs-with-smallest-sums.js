const { Heap } = require('../_utils');

/**
 *
 * Problem:
 * Given two sorted arrays in ascending order, find K pairs with the smallest sum where
 * each pair consists of numbers from both the arrays.
 * https://leetcode.com/problems/find-k-pairs-with-smallest-sums/
 *
 * Example 1:
 * Input: nums1 = [1,7,11], nums2 = [2,4,6], k = 3
 * Output: [[1,2],[1,4],[1,6]]
 * Explanation: The first 3 pairs are returned from the sequence:
 * [1,2],[1,4],[1,6],[7,2],[7,4],[11,2],[7,6],[11,4],[11,6]
 *
 * Example 2:
 * Input: nums1 = [1,1,2], nums2 = [1,2,3], k = 2
 * Output: [1,1],[1,1]
 * Explanation: The first 2 pairs are returned from the sequence:
 * [1,1],[1,1],[1,2],[2,1],[1,2],[2,2],[1,3],[1,3],[2,3]
 *
 *
 * Time: O(k^2 log(k))
 * Space: O(k) <- for heap
 *
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k
 * @return {number[]}
 */
function findKPairsWithSmallestSums(nums1, nums2, k) {
  // item in heap: [ pair, sum ]
  const maxHeap = new Heap((a, b) => a[1] - b[1]);
  /**
   * Similar as the problem 13_top-k-elements/0_kth-smallest-element-in-an-array,
   * the difference here is we only need to push the first k elements from each array
   * at most, because those pairs can definitely cover the results. Why? Because both
   * of the arrays are sorted.
   */
  const length1 = Math.min(nums1.length, k);
  const length2 = Math.min(nums2.length, k);
  // O(k^2 log(k))
  for (let i = 0; i < length1; i++) {
    for (let j = 0; j < length2; j++) {
      const sum = nums1[i] + nums2[j];
      if (maxHeap.size() < k) {
        maxHeap.push([[nums1[i], nums2[j]], sum]);
      } else if (sum < maxHeap.peek()[1]) {
        maxHeap.pop();
        maxHeap.push([[nums1[i], nums2[j]], sum]);
      } else {
        /**
         * Once we find the `sum` is larger than the heap top, we can break the inner
         * loop immediately, cause `nums2` is sorted, we know the remaining numbers
         * from `nums2` will all make the `sum` larger than the heap top (which will
         * be ignored).
         *
         * Note: we can't break the outer loop, cause the next `i` combined with the
         * previous `j` (smaller `j` before the `break`) can still be a valid candidate.
         */
        break;
      }
    }
  }
  return maxHeap.toArray().map((item) => item[0]);
}

/**
 *
 * We can also think about this problem as "Merge 2 sorted lists", here the "list" is
 * not the original array, instead we need to construct a list with pairs. Take the
 * input nums1 = [1, 2, 3] and nums2 = [4, 5, 6, 7], k = 3 as example, the pairs can be
 * constructed to multiple sorted arrays:
 *    list1: [1, 4], [1, 5], [1, 6], [1, 7]
 *    list2: [2, 4], [2, 5], [2, 6], [2, 7]
 *    list3: [3, 4], [3, 5], [3, 6], [3, 7]
 * So the question changes to "find the top k smallest elements in the above 3 sorted
 * (by summation) list", then we can apply the same approach we use in the problem
 * 0_kth-smallest-number-in-m-sorted-lists.
 *
 *
 * Time: O(k log(k))
 * Space: O(k) <- for heap
 *
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k
 * @return {number[]}
 */
function findKPairsWithSmallestSums2(nums1, nums2, k) {
  if (nums1.length === 0 || nums2.length === 0) {
    return [];
  }
  // item in heap [number1 (from `nums1`), number2 (from nums2), index for number2]
  const minHeap = new Heap((a, b) => b[0] + b[1] - a[0] - a[1]);
  const length1 = Math.min(nums1.length, k);
  // O(k log(k))
  for (let i = 0; i < length1; i++) {
    minHeap.push([nums1[i], nums2[0], 0]);
  }
  const results = [];
  // O(k log(k))
  while (minHeap.size() > 0) {
    const item = minHeap.pop();
    results.push([item[0], item[1]]);
    if (results.length === k) {
      break;
    }
    /**
     * 3rd position of the item is like the linked list pointer, we need to store
     * that in the heap to know what the next number in `nums2` to choose.
     */
    const nextNumber2Index = item[2] + 1;
    if (nextNumber2Index < nums2.length) {
      minHeap.push([item[0], nums2[nextNumber2Index], nextNumber2Index]);
    }
  }
  return results;
}

// Test
console.log(findKPairsWithSmallestSums([1, 7, 11], [2, 4, 6], 3));
// [1,6], [1,2], [1,4]
console.log(findKPairsWithSmallestSums([1, 1, 2], [1, 2, 3], 2));
// [1,1], [1,1]

console.log(findKPairsWithSmallestSums2([1, 7, 11], [2, 4, 6], 3));
// [1,2], [1,4], [1,6]
console.log(findKPairsWithSmallestSums2([1, 1, 2], [1, 2, 3], 2));
// [1,1], [1,1]
