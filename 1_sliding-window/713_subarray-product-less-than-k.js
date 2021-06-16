/**
 *
 * Problem:
 * Given an array with positive numbers and a target number, find all of its contiguous
 * subarrays whose product is less than the target number, output the count.
 * https://leetcode.com/problems/subarray-product-less-than-k/
 *
 * Example 1:
 * Input: [2, 5, 3, 10], k=30
 * Output: 6
 * Explanation: There are six contiguous subarrays [2], [5], [2, 5], [3], [5, 3], [10]
 * whose product is less than the k.
 *
 * Example 2:
 * Input: [8, 2, 6, 5], k=50
 * Output: 7
 * Explanation: There are seven contiguous subarrays [8], [2], [8, 2], [6], [2, 6], [5],
 * [6, 5] whose product is less than the k.
 *
 * Time: O(n)
 * Space: O(1)
 *
 *
 * @param {number[]} array
 * @param {number} k
 * @return {number}
 */
function subarrayProductLessThanK(array, k) {
  let windowStart = 0;
  let windowEnd = 0;

  let windowProduct = 1;
  let count = 0;

  // O(n) <- `windowEnd` will run through all numbers in the array
  while (windowEnd < array.length) {
    windowProduct *= array[windowEnd];
    windowEnd++;

    /**
     * Shrink the window when the product is larger than k, we put
     * `windowStart < windowEnd` cause we need to make sure there's at least one number
     * in the window (remember `windowEnd` is not inside the window yet).
     *
     * Time: O(n) in total -> `windowStart` run through all the number for all the outer
     * loop.
     */
    while (windowProduct >= k && windowStart < windowEnd) {
      windowProduct /= array[windowStart];
      windowStart++;
    }
    /**
     * Every time a valid window is found, we need to check how many subarrays inside the
     * window, which is actually the widow size, For example:
     * 1. for cases when a new number is added to the window
     * previous window: [1, 2] (current subarrays [1] [2] [1, 2])
     * current window: [1, 2, 3], 3 is newly added, then the new subarrays are [3] [2, 3]
     * [1, 2, 3]
     * 2. for cases when a existing number is removed from the window
     * previous window: [1, 2, 5] (5 is the newly added number which breaks)
     * current window: [2, 5], 1 is removed, then the new subarrays are [5], [5, 2]
     *
     * Actually, to calculate the count of the newly added subarrays, we always start from
     * the `windowEnd`, and `unshift` one number before it until we reach `windowStart`.
     */
    count += windowEnd - windowStart;
  }

  return count;
}

// Test
console.log(subarrayProductLessThanK([2, 5, 3, 10], 30)); // 6
console.log(subarrayProductLessThanK([8, 2, 6, 5], 50)); // 7
