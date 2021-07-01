/**
 *
 * Problem:
 * There is a dictionary containing words from an alien language for which we don’t know
 * the ordering of the alphabets. Write a method to find the correct order of the
 * alphabets in the alien language. It is given that the input is a valid dictionary and
 * there exists an ordering among its alphabets.
 * https://leetcode.com/problems/alien-dictionary/ (subscription)
 *
 * Example 1:
 * Input: Words: ["ba", "bc", "ac", "cab"]
 * Output: bac
 * Explanation: Given that the words are sorted lexicographically by the rules of the
 * alien language, so from the given words we can conclude the following ordering among
 * its characters:
 *  1. From "ba" and "bc", we can conclude that 'a' comes before 'c'.
 *  2. From "bc" and "ac", we can conclude that 'b' comes before 'a'
 * From the above two points, we can conclude that the correct character order is: "bac"
 *
 * Example 2:
 * Input: Words: ["ywx", "wz", "xww", "xz", "zyy", "zwz"]
 * Output: ywxz
 * Explanation: From the given words we can conclude the following ordering among its
 * characters:
 *  1. From "ywx" and "wz", we can conclude that 'y' comes before 'w'.
 *  2. From "wz" and "xww", we can conclude that 'w' comes before 'x'.
 *  3. From "xww" and "xz", we can conclude that 'w' comes before 'z'
 *  4. From "xz" and "zyy", we can conclude that 'x' comes before 'z'
 *  5. From "zyy" and "zwz", we can conclude that 'y' comes before 'w'
 * From the above five points, we can conclude that the correct character order is: "ywxz"
 *
 *
 * Time: O(EV)
 *  E: length of `words`, cause every pairs of words might derive a "edge".
 *  V: all appeared characters in the `words` array
 * Space: O(E + V)
 *
 * @param {string[]} words
 * @return {string}
 */
function findAlienDictionaryOrder(words) {
  /**
   * Similar as problem 0_topological-sort, the only trick here is we need to compare
   * the words in the array to derive the "edge" in the graph. Also, the "vertex" of
   * the graph is no longer the number, so that's why we use map to store both `graph`
   * and `inDegrees`.
   */
  const graph = {};
  const inDegrees = {};
  /**
   * Initialize both of `graph` and `inDegrees` to make sure all appeared characters
   * have their own initializations, so that we can easily derive `sources` below like
   * the original problem.
   * Time: O(EV)
   */
  for (let i = 0; i < words.length; i++) {
    for (let j = 0; j < words[i].length; j++) {
      graph[words[i][j]] = [];
      inDegrees[words[i][j]] = 0;
    }
  }

  /**
   * `charOrderMap`: for unique "edge" purpose, for some cases the two different
   * word pair can derive the same order result, e.g. "ba" and "bc" -> "a" > "c",
   * "ac" and "cab" -> "a" > "c", we don't want to store the same "edge" twice,
   * so maintain this map to check.
   */
  const charOrderMap = {};

  // O(E * m) E: the length of `words` array, m: the average length of each word, m <= V
  for (let i = 0; i < words.length - 1; i++) {
    const order = _getOrderFromTwoWords(words[i], words[i + 1]);
    if (order === -1) {
      return '';
    }
    if (order && !charOrderMap[`${order[0]}${order[1]}`]) {
      charOrderMap[`${order[0]}${order[1]}`] = true;
      graph[order[0]].push(order[1]);
      inDegrees[order[1]]++;
    }
  }

  const sources = [];
  // O(V) V: all appeared characters in the `words`
  Object.keys(inDegrees).forEach((char) => {
    if (inDegrees[char] === 0) {
      sources.push(char);
    }
  });

  const result = [];
  // O(V + E)
  while (sources.length > 0) {
    const char = sources.shift();
    result.push(char);
    if (graph[char]) {
      graph[char].forEach((char1) => {
        inDegrees[char1]--;
        if (inDegrees[char1] === 0) {
          sources.push(char1);
        }
      });
    }
  }

  if (result.length !== Object.keys(inDegrees).length) {
    return '';
  }

  return result.join('');
}

/**
 * Compare `word1` and `word2` to find a order between 2 characters.
 *
 * Time: O(m) m: max length of `word1` and `word2`
 *
 * @param {string} word1
 * @param {string} word2
 * @return {string[]}
 */
function _getOrderFromTwoWords(word1, word2) {
  let i = 0;
  let j = 0;
  while (i < word1.length && j < word2.length) {
    if (word1[i] !== word2[j]) {
      return [word1[i], word2[j]];
    }
    i++;
    j++;
  }
  /**
   * Invalid input data, e.g. ["abc", "ab"], "abc" should be "smaller" than "ab".
   */
  if (i < word1.length) {
    return -1;
  }
  /**
   * It can return null if no order can be derived from the above comparison,
   * e.g. "abc" and "abcd", we have no clue for any order.
   */
  return null;
}

// Test
console.log(findAlienDictionaryOrder(['ba', 'bc', 'ac', 'cab'])); // "bac"
console.log(findAlienDictionaryOrder(['cab', 'aaa', 'aab'])); // "cab"
console.log(findAlienDictionaryOrder(['ywx', 'wz', 'xww', 'xz', 'zyy', 'zwz'])); // "ywxz"
