/**
 *
 * Problem:
 * Given a string, sort it based on the decreasing frequency of its characters.
 * https://leetcode.com/problems/sort-characters-by-frequency/
 *
 * Example 1:
 * Input: "Programming"
 * Output: "rrggmmPiano"
 * Explanation: 'r', 'g', and 'm' appeared twice, so they need to appear before any
 * other character.
 *
 * Example 2:
 * Input: "abcbab"
 * Output: "bbbaac"
 * Explanation: 'b' appeared three times, 'a' appeared twice, and 'c' appeared only once.
 *
 * Note: this problem is similar as 347_top-k-frequent-elements, we can treat this
 * problem as "top n frequent elements" and use the same strategy to solve it. However,
 * we will try to use a different solution here to demonstrate how "counting sort" is
 * used when solving problems related to "frequency".
 *
 * Time: O(n)
 * Space: O(n)
 *
 * @param {string} str
 * @return {string}
 */
function sortCharactersByFrequency(str) {
  const freqMap = {};
  // O(n)
  for (let i = 0; i < str.length; i++) {
    freqMap[str[i]] = (freqMap[str[i]] || 0) + 1;
  }
  const buckets = new Array(str.length + 1);
  // O(m): m is the unique character count
  Object.keys(freqMap).forEach((char) => {
    if (!buckets[freqMap[char]]) {
      buckets[freqMap[char]] = [];
    }
    buckets[freqMap[char]].push(char);
  });
  const result = [];
  /**
   * loop inside loop, but the total time complexity is O(n), cause each character
   * will only be pushed once.
   */
  for (let i = str.length; i > 0; i--) {
    if (buckets[i]) {
      buckets[i].forEach((char) => {
        result.push(char.repeat(i));
      });
    }
  }
  return result.join('');
}

// Test
console.log(sortCharactersByFrequency('Programming')); // 'rrggmmPoain'
console.log(sortCharactersByFrequency('abcbab')); // 'bbbaac'
