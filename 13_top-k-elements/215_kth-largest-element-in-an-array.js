const { Heap } = require('../_utils');

/**
 *
 * Problem:
 * Given an unsorted array of numbers, find the Kth largest numbers in it.
 * https://leetcode.com/problems/kth-largest-element-in-an-array/
 *
 * Example 1:
 * Input: [3, 1, 5, 12, 2, 11], K = 3
 * Output: 5
 *
 * Example 2:
 * Input: [5, 12, 11, -1, 12], K = 3
 * Output: 11
 *
 *
 * Time: O(n log(k))
 * Space: O(k) <- for heap
 *
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
function findKthLargestNumber(nums, k) {
  /**
   * The idea here is, when we iterate through the `nums` array, we keep pushing the
   * numbers encountered to an special "array" for the first k numbers, we need to
   * somehow maintain these "array" only contains the k largest numbers while the loop
   * goes on. Let's assume these k numbers are the k largest numbers, they must follow
   * these properties:
   *  * the remaining n-k numbers must be smaller than the smallest number in the
   * "array".
   * So when we process the remaining n-k numbers:
   *  * if the new number encountered is larger than the smallest number in the "array",
   * remove the smallest number and insert the new number.
   *  * if the new number encountered is smaller than the smallest number in the "array",
   * do nothing because it can't be part of the k largest numbers group as it's already
   * smaller than k numbers.
   *
   * Follow the idea above, we need to keep getting the smallest numbers in the "array",
   * so the best data structure of the "array" should be minimum heap.
   *
   * Note: the naive solution would be sort the array first and get the kth numbers,
   * which would cost O(n log(n)), but with heap solution, the cost will only be
   * O(n log(k)).
   */
  const minHeap = new Heap((a, b) => b - a);
  for (let i = 0; i < nums.length; i++) {
    if (i < k) {
      // insert O(log k)
      minHeap.push(nums[i]);
    } else if (nums[i] > minHeap.peek()) {
      // remove O(log k)
      minHeap.pop();
      // insert O(log k)
      minHeap.push(nums[i]);
    }
  }
  return minHeap.peek();
}

// Test
console.log(findKthLargestNumber([3, 1, 5, 12, 2, 11], 3)); // 5
console.log(findKthLargestNumber([5, 12, 11, -1, 12], 3)); // 11
