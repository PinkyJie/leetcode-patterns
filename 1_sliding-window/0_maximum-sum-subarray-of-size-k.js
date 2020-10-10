/**
 *
 * Problem:
 * Given an array of positive numbers and a positive number ‘k’, find the maximum sum of
 * any contiguous subarray of size ‘k’.
 *
 * Example 1:
 * Input: [2, 1, 5, 1, 3, 2], k=3
 * Output: 9
 * Explanation: Subarray with maximum sum is [5, 1, 3].
 *
 * Example 2:
 * Input: [2, 3, 4, 1, 5], k=2
 * Output: 7
 * Explanation: Subarray with maximum sum is [3, 4].
 *
 * Time: O(n)
 * Space: O(1)
 *
 * @param {number[]} array
 * @param {number} k
 * @return {number}
 */
function maximumSumSubarrayOfSizeK(array, k) {
  let windowStart = 0;
  let windowEnd = 0;

  let windowSum = 0;
  let maxWindowSum = -1;

  while (windowEnd < array.length) {
    // Aggregation is the sum of the window
    windowSum += array[windowEnd];
    windowEnd++;

    /**
     * Shrink the window when the window size is larger than k.
     *
     * Note:
     *  * `windowEnd` here is not in the window yet
     *  * we can use `while` here but the loop will run at most once, same as `if`
     */
    if (windowEnd >= k) {
      maxWindowSum = Math.max(maxWindowSum, windowSum);
      windowSum -= array[windowStart];
      windowStart++;
    }
  }

  return maxWindowSum;
}

// Test
console.log(maximumSumSubarrayOfSizeK([2, 1, 5, 1, 3, 2], 3)); // 9
console.log(maximumSumSubarrayOfSizeK([2, 3, 4, 1, 5], 2)); // 7
