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
function reorganizeString1(str) {
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

/**
 *
 * Another solution with better time complexity.
 *
 * Time: O(n)
 * Space: O(n) <- for `freqMap` and `buckets`
 *
 * @param {string} str
 * @return {string}
 */
function reorganizeString2(str) {
  const freqMap = {};
  // O(n)
  for (let i = 0; i < str.length; i++) {
    freqMap[str[i]] = (freqMap[str[i]] || 0) + 1;
  }
  // use bucket sort to sort the characters by its frequency
  const buckets = new Array(str.length + 1);
  let maxCount = -1;
  // O(m) m: unique character count
  Object.keys(freqMap).forEach((char) => {
    maxCount = Math.max(maxCount, freqMap[char]);
    if (!buckets[freqMap[char]]) {
      buckets[freqMap[char]] = [];
    }
    buckets[freqMap[char]].push(char);
  });
  /**
   * This is essential here, if a single character's count is larger than half
   * the string length, the below solution can't handle that. Think about the
   * example "aaaaaa", it won't return "" if we don't have the check there.
   */
  if (maxCount > Math.floor((str.length + 1) / 2)) {
    return '';
  }
  /**
   * The idea here is also starting to arrange the most frequent character first.
   * Say the most frequent one is "a" and "b", we will arrange them in the result
   * string array like this:
   *  pos: 0   1   2   3   4   5   6   7   8
   *       a       a       a       b       b
   * By doing this it's guaranteed that no same characters appear next each other.
   * When we hit the end of the result array (e.g. pos 8 for "b"), if we still have
   * available "b", obviously we should put it at pos 1. So the intuition is to put
   * characters on 0, 2, 4, 6, 8 first, and then 1, 3, 5, 7, 9. We only restart from
   * position 1 if we hit the end.
   */
  const resultArr = new Array(str.length);
  let pos = 0;
  // O(n) every character being pushed to the result array once
  for (let count = buckets.length; count > 0; count--) {
    if (!buckets[count]) {
      continue;
    }
    while (buckets[count].length > 0) {
      const char = buckets[count].shift();
      for (let i = 0; i < count; i++) {
        // if the position is already occupied by others, it fails
        if (resultArr[pos]) {
          return '';
        }
        resultArr[pos] = char;
        pos += 2;
        // this will only happen once (after 02468, we do 13579)
        if (pos >= str.length) {
          pos = 1;
        }
      }
    }
  }
  return resultArr.join('');
}

// Test
console.log(reorganizeString1('aappp')); // 'papap'
console.log(reorganizeString1('programming')); // 'rgmrgmoapin'
console.log(reorganizeString1('aapa')); // ''
console.log(reorganizeString2('aappp')); // 'papap'
console.log(reorganizeString2('programming')); // 'rprogagimnm'
console.log(reorganizeString2('aapa')); // ''
