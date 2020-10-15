/**
 *
 * Problem:
 * Given a string and a pattern, find out if the string contains any permutation of the
 * pattern.
 * https://leetcode.com/problems/permutation-in-string/
 *
 * Example 1:
 * Input: Pattern="abc", String="oidbcaf"
 * Output: true
 * Explanation: The string contains "bca" which is a permutation of the given pattern.
 *
 * Example 2:
 * Input: Pattern="dc", String="odicf"
 * Output: false
 * Explanation: No permutation of the pattern is present in the given string as a substring.
 *
 * Time: O(m + n) <- O(m) + O(n)
 * Space: O(m) <- map
 *
 * @param {string} pattern
 * @param {string} string
 * @return {boolean}
 */
function permutationInString(pattern, string) {
  const charCountMapInPattern = {};
  // O(m) m -> pattern length
  for (let i = 0; i < pattern.length; i++) {
    charCountMapInPattern[pattern[i]] =
      (charCountMapInPattern[pattern[i]] || 0) + 1;
  }
  const expectedMatchCount = Object.keys(charCountMapInPattern).length;

  let windowStart = 0;
  let windowEnd = 0;

  /**
   * The aggregation is the character count in the window, we can maintain something
   * like `charCountMapInWindow` and compare the two maps, but that will cost O(m) for
   * each comparison. A more efficient way used here is to update the original map:
   *  * decrease the count if the window has the character
   *  * increase the count if the window slide out and the character is removed
   *  * if `charCountMapInPattern[char] === 0`, that means one match is happening, we
   * can maintain a variable `matchedCharCount` to see how many characters are matched
   *  * compare that `matchedCharCount` with the key length of `charCountMapInPattern`
   * to see if there's a full match
   */
  let matchedCharCount = 0;

  // O(n) - `windowEnd` run through all the characters in the `string`
  while (windowEnd < string.length) {
    const endChar = string[windowEnd];
    if (endChar in charCountMapInPattern) {
      charCountMapInPattern[endChar]--;
      /**
       * Do not delete the key even if the count is 0, because we need to use this info
       * below to see if we need to decrease `matchedCharCount`.
       */
      if (charCountMapInPattern[endChar] === 0) {
        matchedCharCount++;
        if (matchedCharCount === expectedMatchCount) {
          return true;
        }
      }
    }
    windowEnd++;

    /**
     * Shrink the window when the window size is the same as the pattern length, cause in
     * order for the string to contain the pattern, at least the window needs to have the
     * same length as pattern.
     */
    if (windowEnd >= pattern.length) {
      const startChar = string[windowStart];
      if (startChar in charCountMapInPattern) {
        /**
         * When `charCountMapInPattern[startChar] === 0`, it means the `startChar` is
         * already a success match, but we slide the window forward right, so `startChar`
         * will be moved out of the window, that's why we need to decrease `matchedCharCount`.
         */
        if (charCountMapInPattern[startChar] === 0) {
          matchedCharCount--;
        }
        charCountMapInPattern[startChar]++;
      }
      windowStart++;
    }
  }
  return false;
}

// Test
console.log(permutationInString('abc', 'oidbcaf')); // true
console.log(permutationInString('dc', 'odicf')); // false
