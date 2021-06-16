/**
 *
 * Problem:
 * Given a string and a pattern, find the smallest substring in the given string which has
 * all the characters of the given pattern.
 * https://leetcode.com/problems/minimum-window-substring/
 *
 * Example 1:
 * Input: String="aabdec", Pattern="abc"
 * Output: "abdec"
 * Explanation: The smallest substring having all characters of the pattern is "abdec"
 *
 * Example 2:
 * Input: String="abdbca", Pattern="abc"
 * Output: "bca"
 * Explanation: The smallest substring having all characters of the pattern is "bca".
 *
 * Time: O(n) <- O(m + n + n + n)
 * Space: O(m) <- map
 *
 * @param {string} string
 * @param {string} pattern
 * @return {string}
 */
function minimumWindowSubstring(string, pattern) {
  const charCountMapInPattern = {};
  // O(m)
  for (let i = 0; i < pattern.length; i++) {
    charCountMapInPattern[pattern[i]] =
      (charCountMapInPattern[pattern[i]] || 0) + 1;
  }
  const expectedMatchCount = Object.keys(charCountMapInPattern).length;

  let windowStart = 0;
  let windowEnd = 0;

  let matchedCharCount = 0;
  let minWindowLength = string.length + 1;
  let minWindowStart;

  // O(n) `windowEnd` run through all the characters in the `string`
  while (windowEnd < string.length) {
    const endChar = string[windowEnd];
    windowEnd++;
    if (endChar in charCountMapInPattern) {
      charCountMapInPattern[endChar]--;
      if (charCountMapInPattern[endChar] === 0) {
        matchedCharCount++;
      }
    }

    /**
     * Keep shrinking the window if the substring in the window can cover the pattern,
     * during shrinking, we try to find the minimum length of the substring.
     *
     * O(n) in total -> `windowStart` run through all the characters in the `string` for
     * all the outer loop
     */
    while (matchedCharCount === expectedMatchCount) {
      if (windowEnd - windowStart < minWindowLength) {
        minWindowLength = windowEnd - windowStart;
        minWindowStart = windowStart;
      }

      const startChar = string[windowStart];
      windowStart++;
      if (startChar in charCountMapInPattern) {
        if (charCountMapInPattern[startChar] === 0) {
          matchedCharCount--;
        }
        charCountMapInPattern[startChar]++;
      }
    }
  }

  if (minWindowLength === string.length + 1) {
    return '';
  }

  // O(n)
  return string.slice(minWindowStart, minWindowStart + minWindowLength);
}

// Test
console.log(minimumWindowSubstring('aabdec', 'abc')); // 'abdec'
console.log(minimumWindowSubstring('abdbca', 'abc')); // 'bca'
