const { Heap } = require('../_utils');

/**
 *
 * Problem:
 * Given an unsorted array of numbers, find Kth smallest number in it.
 *
 * Example 1:
 * Input: [1, 5, 12, 2, 11, 5], K = 3
 * Output: 5
 * Explanation: The 3rd smallest number is '5', as the first two smaller numbers are
 * [1, 2].
 *
 * Example 2:
 * Input: [1, 5, 12, 2, 11, 5], K = 4
 * Output: 5
 * Explanation: The 4th smallest number is '5', as the first three small numbers are
 * [1, 2, 5].
 *
 *
 * Time: O(n log(k))
 * Space: O(k) <- for heap
 *
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
function findKthSmallestNumber(nums, k) {
  /**
   * Similar as problem 215_kth-largest-element-in-an-array, the difference here is we
   * want the Kth smallest number. So same idea then, when we iterate through the whole
   * array, we want to maintain the k smallest numbers in a separate "array", for the
   * remaining numbers:
   *  * if it's smaller than the largest number in the existing "array", it should be
   * part of the k smallest numbers group, so remove the largest number now in the
   * "array" and insert the new number.
   *  * if it's larger than the largest number in the existing "array", do nothing
   * because it won't be the k smallest numbers group as it's already larger than k
   * numbers.
   *
   * According to the above analysis, the "array" should be represented as maximum
   * heap as we need to access the maximum number quickly.
   *
   */
  const maxHeap = new Heap((a, b) => a - b);
  for (let i = 0; i < nums.length; i++) {
    if (i < k) {
      maxHeap.push(nums[i]);
    } else if (nums[i] < maxHeap.peek()) {
      maxHeap.pop();
      maxHeap.push(nums[i]);
    }
  }
  return maxHeap.peek();
}

// Test
console.log(findKthSmallestNumber([1, 5, 12, 2, 11, 5], 1)); // 1
console.log(findKthSmallestNumber([1, 5, 12, 2, 11, 5], 2)); // 2
console.log(findKthSmallestNumber([1, 5, 12, 2, 11, 5], 3)); // 5
console.log(findKthSmallestNumber([1, 5, 12, 2, 11, 5], 4)); // 5
console.log(findKthSmallestNumber([1, 5, 12, 2, 11, 5], 5)); // 11
console.log(findKthSmallestNumber([1, 5, 12, 2, 11, 5], 6)); // 12
