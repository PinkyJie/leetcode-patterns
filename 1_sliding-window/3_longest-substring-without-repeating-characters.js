/**
 *
 * Problem:
 * Given a string, find the length of the longest substring without repeating characters.
 * https://leetcode.com/problems/longest-substring-without-repeating-characters/
 *
 * Example 1:
 * Input: String="aabccbb"
 * Output: 3
 * Explanation: The longest substring without any repeating characters is "abc".
 *
 * Example 2:
 * Input: String="abbbb"
 * Output: 2
 * Explanation: The longest substring without any repeating characters is "ab".
 *
 * Time: O(n) <- O(n + n)
 * Space: O(n) <- map
 *
 * @param {string} string
 * @return {number}
 */
function longestSubstringWithoutRepeatingCharacters(string) {
  let windowStart = 0;
  let windowEnd = 0;

  const lastCharIndexMap = {};
  let maxDistinctStringLength = 0;

  // O(n) -> `windowEnd` will run through all characters in the `string`
  while (windowEnd < string.length) {
    const endChar = string[windowEnd];
    /**
     * Note:
     *  * a special strategy is used here to move `windowStart` forward, the traditional
     * way (`windowStart++`) still works but this way is more efficient. When the new
     * character to be added is already in the window, we need to shrink the window to make
     * sure it only contains distinct character, so we need to find the position where the
     * previous `endChar` appears, and move `windowStart` to the next position.
     *  * use `Math.max(windowStart, ...)` here because `lastCharIndexMap[endChar]` might not
     * in the current window now.
     */
    if (endChar in lastCharIndexMap) {
      windowStart = Math.max(windowStart, lastCharIndexMap[endChar] + 1);
    }
    lastCharIndexMap[endChar] = windowEnd;

    windowEnd++;

    // Note: `windowEnd - windowStart` because `windowEnd` is not in window yet
    maxDistinctStringLength = Math.max(
      maxDistinctStringLength,
      windowEnd - windowStart
    );
  }

  return maxDistinctStringLength;
}

// Test
console.log(longestSubstringWithoutRepeatingCharacters('aabccbb')); // 3
console.log(longestSubstringWithoutRepeatingCharacters('abbbb')); // 2
