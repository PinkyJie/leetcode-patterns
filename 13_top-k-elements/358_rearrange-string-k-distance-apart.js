const { Heap } = require('../_utils');

/**
 *
 * Problem:
 * Given a string and a number K, find if the string can be rearranged such that the
 * same characters are at least K distance apart from each other.
 * https://leetcode.com/problems/rearrange-string-k-distance-apart/ (subscription)
 *
 * Example 1:
 * Input: "mmpp", K=2
 * Output: "mpmp" or "pmpm"
 * Explanation: All same characters are 2 distance apart.
 *
 * Example 2:
 * Input: "Programming", K=3
 * Output: "rgmPrgmiano" or "gmringmrPoa" or "gmrPagimnor" and a few more
 * Explanation: All same characters are 3 distance apart.
 *
 *
 * Time: O(n log(n))
 * Space: O(n)
 *
 * @param {string} str
 * @param {number} k
 * @return {string}
 */
function rearrangeStringWithKDistanceApart(str, k) {
  const freqMap = {};
  // O(n)
  for (let i = 0; i < str.length; i++) {
    freqMap[str[i]] = (freqMap[str[i]] || 0) + 1;
  }
  const maxHeap = new Heap((a, b) => freqMap[a] - freqMap[b]);
  // O(m log(m)) m: unique character count
  Object.keys(freqMap).forEach((char) => {
    maxHeap.push(char);
  });
  /**
   * The same idea as problem 767_reorganize-string (which we can treat it like `k = 2`).
   * Since k can be any number, so instead of maintaining `preChar` as a single character,
   * we should make it as an array. Because for problem 767, we can follow "pop twice and
   * push back one" approach to make sure no same characters next to each other, for this
   * problem, we need to do "pop k times and push back one", so there will be multiple
   * `preChar` before we can push them back.
   */
  const resultArr = [];
  const preChars = [];
  // O(n log(m)) every character being pop() once and push() once
  while (maxHeap.size() > 0) {
    const char = maxHeap.pop();
    resultArr.push(char);
    freqMap[char]--;
    // only push back when there's already k characters in the result array
    if (resultArr.length >= k) {
      const preChar = preChars.shift();
      if (freqMap[preChar] > 0) {
        maxHeap.push(preChar);
      }
    }
    if (freqMap[char] > 0) {
      preChars.push(char);
    }
  }
  if (resultArr.length === str.length) {
    return resultArr.join('');
  }
  return '';
}

// Test
console.log(rearrangeStringWithKDistanceApart('mmpp', 2)); // 'mpmp'
console.log(rearrangeStringWithKDistanceApart('programming', 3)); // 'rgmorgmapin'
console.log(rearrangeStringWithKDistanceApart('aappa', 3)); // ''
