const { Heap } = require('../_utils');

/**
 *
 * Problem:
 * Given an array, find the sum of all numbers between the K1'th and K2'th smallest
 * elements (not inclusive) of that array.
 *
 * Example 1:
 * Input: [1, 3, 12, 5, 15, 11], and K1=3, K2=6
 * Output: 23
 * Explanation: The 3rd smallest number is 5 and 6th smallest number 15. The sum of
 * numbers coming between 5 and 15 is 23 (11+12).
 *
 * Example 2:
 * Input: [3, 5, 8, 7], and K1=1, K2=4
 * Output: 12
 * Explanation: The sum of the numbers between the 1st smallest number (3) and the 4th
 * smallest number (8) is 12 (5+7).
 *
 *
 * Time: O((n + k2 - k1) log(k2))
 * Space: O(k2)
 *
 * @param {number[]} nums
 * @param {number} k1
 * @param {number} k2
 * @return {number}
 */
function sumOfElementsBetweenK1AndK2(nums, k1, k2) {
  /**
   * Very similar as the problem 0_kth-smallest-element-in-an-array, here we need to
   * find the smallest k2 numbers in the array, so follow the same approach, use
   * maximum heap we can get the smallest k2 numbers in the heap, pop() `k2 - k1 -1`
   * numbers and then we can get the final sum.
   *
   * Note: the naive solution would be sort the array and do the sum calculation, which
   * will cost O(n log(n) + (k2 - k1)), which is slower than this approach.
   */
  const maxHeap = new Heap((a, b) => a - b);
  // O(n log(k2))
  for (let i = 0; i < nums.length; i++) {
    if (i < k2 - 1) {
      maxHeap.push(nums[i]);
    } else if (nums[i] < maxHeap.peek()) {
      maxHeap.pop();
      maxHeap.push(nums[i]);
    }
  }
  let sum = 0;
  // O((k2 - k1) log(k2))
  while (k2 - 1 > k1) {
    sum += maxHeap.pop();
    k2--;
  }
  return sum;
}

// Test
console.log(sumOfElementsBetweenK1AndK2([1, 3, 12, 5, 15, 11], 3, 6)); // 23
console.log(sumOfElementsBetweenK1AndK2([3, 5, 8, 7], 1, 4)); // 12
