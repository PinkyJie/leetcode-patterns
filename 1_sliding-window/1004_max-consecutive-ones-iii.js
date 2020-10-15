/**
 *
 * Problem:
 * Given an array containing 0s and 1s, if you are allowed to replace no more than ‘k’ 0s
 * with 1s, find the length of the longest contiguous subarray having all 1s.
 * https://leetcode.com/problems/max-consecutive-ones-iii/
 *
 * Example 1:
 * Input: Array=[0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1], k=2
 * Output: 6
 * Explanation: Replace the '0' at index 5 and 8 to have the longest contiguous subarray of
 * 1s having length 6.
 *
 * Example 2:
 * Input: Array=[0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 1], k=3
 * Output: 9
 * Explanation: Replace the '0' at index 6, 9, and 10 to have the longest contiguous subarray
 * of 1s having length 9.
 *
 * Time: O(n)
 * Space: O(1)
 *
 * Note: exactly the same as 424_longest-repeating-character-replacement.js, see detail
 * explanations there, the only difference is for this question we only care the count of
 * the "1" (no charCountMap required).
 *
 * @param {number[]} array
 * @param {number} k
 * @return {number}
 */
function maxConsecutiveOnesIII(array, k) {
  let windowStart = 0;
  let windowEnd = 0;

  let oneCountInWindow = 0;
  let historicalMaxOneCount = 0;

  while (windowEnd < array.length) {
    if (array[windowEnd] === 1) {
      oneCountInWindow++;
    }
    historicalMaxOneCount = Math.max(historicalMaxOneCount, oneCountInWindow);
    windowEnd++;

    if (historicalMaxOneCount + k < windowEnd - windowStart) {
      if (array[windowStart] === 1) {
        oneCountInWindow--;
      }
      windowStart++;
    }
  }

  return array.length - windowStart;
}

// Test
console.log(maxConsecutiveOnesIII([0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1], 2)); // 6
console.log(maxConsecutiveOnesIII([0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 1], 3)); // 9
