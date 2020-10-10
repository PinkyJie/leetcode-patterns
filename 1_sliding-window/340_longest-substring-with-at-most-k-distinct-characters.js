/**
 *
 * Problem:
 * Given a string, find the length of the longest substring in it with no more than
 * K distinct characters.
 * https://leetcode.com/problems/longest-substring-with-at-most-k-distinct-characters/
 *
 * Example 1:
 * Input: String="araaci", K=2
 * Output: 4
 * Explanation: The longest substring with no more than '2' distinct characters is "araa".
 *
 * Example 2:
 * Input: String="araaci", K=1
 * Output: 2
 * Explanation: The longest substring with no more than '1' distinct characters is "aa".
 *
 * Time: O(n) <- O(n + n)
 * Space: O(n) <- map
 *
 * @param {string} string
 * @param {number} k
 * @return {number}
 */
function LongestSubstringWithAtMostKDistinctCharacters(string, k) {
  let windowStart = 0;
  let windowEnd = 0;

  let maxDistinctStringLength = 0;
  const charCountMapInWindow = {};

  // O(n) -> `windowEnd` run through all characters in the `string`
  while (windowEnd < string.length) {
    const endChar = string[windowEnd];
    // Aggregation is the count for distinct character in the window
    charCountMapInWindow[endChar] = (charCountMapInWindow[endChar] || 0) + 1;
    windowEnd++;

    /**
     * Keep shrinking the window if the distinct characters in the window (key length of
     * `charCountMapInWindow`) is larger than k.
     *
     * Note:
     *  * O(n) in total -> `windowStart` run through all characters in the `string` for all
     * the outer loops
     */
    while (Object.keys(charCountMapInWindow).length > k) {
      const startChar = string[windowStart];
      charCountMapInWindow[startChar]--;
      if (charCountMapInWindow[startChar] === 0) {
        delete charCountMapInWindow[startChar];
      }
      windowStart++;
    }

    /**
     * Even the `charCountMapInWindow` key length is less than `k` (which means we can't get
     * k characters), we still need to return the result.
     *
     * Note: `windowEnd - windowStart` because `windowEnd` is not in window yet
     */
    maxDistinctStringLength = Math.max(
      maxDistinctStringLength,
      windowEnd - windowStart
    );
  }

  return maxDistinctStringLength;
}

// Test
console.log(LongestSubstringWithAtMostKDistinctCharacters('araaci', 2)); // 4
console.log(LongestSubstringWithAtMostKDistinctCharacters('araaci', 1)); // 2
