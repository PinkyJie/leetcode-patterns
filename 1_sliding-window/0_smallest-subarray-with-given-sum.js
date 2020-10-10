/**
 *
 * Problem:
 * Given an array of positive numbers and a positive number ‘S’, find the length
 * of the smallest contiguous subarray whose sum is greater than or equal to ‘S’.
 * Return 0, if no such subarray exists.
 *
 * Example 1:
 * Input: [2, 1, 5, 2, 3, 2], S=7
 * Output: 2
 * Explanation: The smallest subarray with a sum great than or equal to '7' is [5, 2].
 *
 * Example 2:
 * Input: [2, 1, 5, 2, 8], S=7
 * Output: 1
 * Explanation: The smallest subarray with a sum greater than or equal to '7' is [8].
 *
 * Time: O(n) <- O(n + n)
 * Space: O(1)
 *
 * @param {number[]} array
 * @param {number} targetSum
 * @return {number}
 */
function smallestSubarrayWithGiveSum(array, targetSum) {
  let windowStart = 0;
  let windowEnd = 0;

  let minWindowCount = array.length + 1;
  let windowSum = 0;

  // O(n) -> `windowEnd` run through all indices
  while (windowEnd < array.length) {
    // Aggregation is the sum of the window
    windowSum += array[windowEnd];
    windowEnd++;

    /**
     * Keep shrinking the window if the sum is larger than `targetSum`.
     *
     * Note:
     *  * `windowCount =  windowEnd - windowStart` because `windowEnd` is not in window yet
     *  * O(n) in total -> `windowStart` run through all indices for all the outer loops
     */
    while (windowSum >= targetSum) {
      minWindowCount = Math.min(minWindowCount, windowEnd - windowStart);
      windowSum -= array[windowStart];
      windowStart++;
    }
  }

  return minWindowCount === array.length + 1 ? 0 : minWindowCount;
}

// Test
console.log(smallestSubarrayWithGiveSum([2, 1, 5, 2, 3, 2], 7)); // 2
console.log(smallestSubarrayWithGiveSum([2, 1, 5, 2, 8], 7)); // 1
