/**
 *
 * Problem:
 * Given a string with lowercase letters only, if you are allowed to replace no more than
 * k letters with any letter, find the length of the longest substring having the same
 * letters after replacement.
 *
 * Example 1:
 * Input: String="aabccbb", k=2
 * Output: 5
 * Explanation: Replace the two 'c' with 'b' to have a longest repeating substring "bbbbb"
 *
 * Example 2:
 * Input: String="abbcb", k=1
 * Output: 4
 * Explanation: Replace the 'c' with 'b' to have a longest repeating substring "bbbb".
 *
 * Time: O(n)
 * Space: O(n) <- map
 *
 * @param {string} string
 * @param {number} k
 * @return {number}
 */
function longestRepeatingCharacterReplacement(string, k) {
  let windowStart = 0;
  let windowEnd = 0;

  const charCountMapInWindow = {};
  let historicalMaxCountOfRepeatingChar = 0;

  while (windowEnd < string.length) {
    const endChar = string[windowEnd];
    charCountMapInWindow[endChar] = (charCountMapInWindow[endChar] || 0) + 1;
    /**
     * Aggregation here is the maximum count of the repeating character. If we have k chances
     * to replace the characters in the window, in order to get the longest substring (make
     * the window as long as possible), we will need to keep the character which repeats more
     * and replace other characters. That's why here we get this maximum count, we will use
     * this count to decide if we need to shrink the window below.
     */
    historicalMaxCountOfRepeatingChar = Math.max(
      historicalMaxCountOfRepeatingChar,
      charCountMapInWindow[endChar]
    );
    windowEnd++;

    /**
     * If the maximum count of the repeating character plus k is greater or equal than the
     * window size, the substring is a valid candidate. Otherwise, the substring is not valid
     * (after k replacement it still contains other characters), we then need to shrink the
     * window.
     *
     * Why we don't need to update the value of this maximum count when the window shrinks?
     * Before we shrink the window, we already have a valid substring which contains
     * "maxCountOfRepeatingChar" count of repeating string, after that we never decrease this
     * count, if the following condition is not met, it will do both `windowStart++` (here)
     * and `windowEnd++` (next loop before the following check), so the result is we just
     * shift the window forward right without changing its size even it might contain invalid
     * result (the character which forms the "maxCountOfRepeatingChar" has already been out
     * of the window). This is because we only care about the longest substring, so this
     * historical maximum count will always greater or equal than the accurate count for the
     * current window, the window size only gets grow when this maximum count gets bigger and
     * the new substring is also valid.
     *
     * Take "AABDCEACC" and k = 2 as an example:
     *
     * | loop | start | end | maxCount |  window  | size | valid |
     *     1      0      1      1 (A)     "A"         1      T
     *     2      0      2      2 (A)     "AA"        2      T
     *     3      0      3      2 (A)     "AAB"       3      T
     *     4      0      4      2 (A)     "AABD"      4      T
     *     5      0      5      2 (A)     "AABDC"     5      F (shift)
     *     6      1      6      2 (A)     "ABDCE"     5      F (shift) (count incorrect)
     *     7      2      7      2 (A)     "BDCEA"     5      F (shift) (count incorrect)
     *     8      3      8      2 (A)     "DCEAC"     5      T
     *     9      4      9      3 (C)     "CEACC"     5      T
     *
     * We can see it clearly at loop 7/8 the max count is not correct, but it doesn't matter.
     */
    if (historicalMaxCountOfRepeatingChar + k < windowEnd - windowStart) {
      const startChar = string[windowStart];
      charCountMapInWindow[startChar]--;
      windowStart++;
    }
  }

  /**
   * As discussed above, when the substring is invalid, we just shift the window forward
   * right, so we don't need to maintain a "maxLength" variable and do comparison, because
   * the window size is never decreased, it's guaranteed that the final window size (when
   * windowEnd === string.length) is the correct window size.
   */
  return string.length - windowStart;
}

// Test
console.log(longestRepeatingCharacterReplacement('aabccbb', 2)); // 5
console.log(longestRepeatingCharacterReplacement('abbcb', 1)); // 4
