const { Heap } = require('../_utils');

/**
 *
 * Problem:
 * Given a string, find if its letters can be rearranged in such a way that no two
 * same characters come next to each other.
 * https://leetcode.com/problems/reorganize-string/
 *
 * Example 1:
 * Input: "aappp"
 * Output: "papap"
 * Explanation: In "papap", none of the repeating characters come next to each other.
 *
 * Example 2:
 * Input: "programming"
 * Output: "rgmrgmpiano" or "gmringmrpoa" or "gmrpagimnor", etc.
 * Explanation: None of the repeating characters come next to each other.
 *
 *
 * Time: O(n log(n))
 * Space: O(n)
 *
 * @param {string} str
 * @return {string}
 */
function reorganizeString(str) {
  /**
   * The main idea is to start arranging the most frequent characters first, and then
   * the least frequent characters, this way we can make sure no same characters are
   * next each other.
   */
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
  let preChar = null;
  const resultArr = [];
  // O(n log(m)) - every character being pop once, push once
  while (maxHeap.size() > 0) {
    const char = maxHeap.pop();
    resultArr.push(char);
    freqMap[char]--;
    /**
     * This `preChar` is the key to maintain no same characters next each other.
     * The straightforward solution for this is to pop() two characters from the
     * heap (e.g. `{a: 3}` and `{b: 2}`), so we can do `abab`, with the remaining
     * "a" we need to pop another character to separate it. With this `preChar`
     * here it can be achieved easily, we pop() "a" and "b", when "b" is popped,
     * "a" was the `preChar`, we only push it back when it still has unused count.
     * Since we push back "a" after adding "b" to the result, it's guaranteed that
     * the next popped "a" will after "b" in the final result.
     *
     * If there's only 1 item left in the heap (e.g. {"d": 2}), after it's being
     * popped and mark as `preChar`, since there's no more items in the heap, the
     * loop will stop immediately. If our result array length is not the same as
     * the original string length, then it's not possible to make sure no same
     * characters next each other.
     *
     */
    if (preChar !== null && freqMap[preChar] > 0) {
      maxHeap.push(preChar);
    }
    preChar = char;
  }
  if (resultArr.length === str.length) {
    return resultArr.join('');
  }
  return '';
}

// Test
console.log(reorganizeString('aappp')); // 'papap'
console.log(reorganizeString('programming')); // 'rgmrgmopin'
console.log(reorganizeString('aapa')); // ''
