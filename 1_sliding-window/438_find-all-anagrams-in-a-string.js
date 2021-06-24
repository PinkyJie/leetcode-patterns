/**
 *
 * Problem:
 * Given a string and a pattern, find all anagrams of the pattern in the given string.
 * "Anagram" is actually a Permutation of a string. Write a function to return a list of
 * starting indices of the anagrams of the pattern in the given string.
 * https://leetcode.com/problems/find-all-anagrams-in-a-string/
 *
 * Example 1:
 * Input: String="ppqp", Pattern="pq"
 * Output: [1, 2]
 * Explanation: The two anagrams of the pattern in the given string are "pq" and "qp".
 *
 * Example 2:
 * Input: String="abbcabc", Pattern="abc"
 * Output: [2, 3, 4]
 * Explanation: The three anagrams of the pattern in the given string are "bca", "cab", and
 * "abc".
 *
 * Time: O(n + m)
 * Space: O(m)
 *
 * Note: exactly the same as 567_permutation-in-string.js, see detail explanations there, the
 * only difference is for this problem we need to record the `windowStart` when there's a
 * full match, and continue the loop to find all full matches.
 *
 * @param {string} string
 * @param {string} pattern
 * @return {number[]}
 */
function findAllAnagramsInString(string, pattern) {
  const charCountMapInPattern = {};
  for (let i = 0; i < pattern.length; i++) {
    charCountMapInPattern[pattern[i]] =
      (charCountMapInPattern[pattern[i]] || 0) + 1;
  }
  const expectedMatchCount = Object.keys(charCountMapInPattern).length;

  let windowStart = 0;
  let windowEnd = 0;

  let matchedCharCount = 0;
  const resultIndices = [];

  const charCountMapInWindow = {};
  while (windowEnd < string.length) {
    const endChar = string[windowEnd];
    if (endChar in charCountMapInPattern) {
      charCountMapInWindow[endChar] = (charCountMapInWindow[endChar] || 0) + 1;
      if (charCountMapInWindow[endChar] === charCountMapInPattern[endChar]) {
        matchedCharCount++;
      }
    }
    windowEnd++;

    if (windowEnd >= pattern.length) {
      if (matchedCharCount === expectedMatchCount) {
        resultIndices.push(windowStart);
      }
      const startChar = string[windowStart];
      if (startChar in charCountMapInPattern) {
        if (
          charCountMapInWindow[startChar] === charCountMapInPattern[startChar]
        ) {
          matchedCharCount--;
        }
        charCountMapInWindow[startChar]--;
      }
      windowStart++;
    }
  }

  return resultIndices;
}

// Test
console.log(findAllAnagramsInString('ppqp', 'pq')); // [1, 2]
console.log(findAllAnagramsInString('abbcabc', 'abc')); // [2, 3, 4]
