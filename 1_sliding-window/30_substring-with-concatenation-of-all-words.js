/**
 *
 * Problem:
 * Given a string and a list of words, find all the starting indices of substrings in the
 * given string that are a concatenation of all the given words exactly once without any
 * overlapping of words. It is given that all words are of the same length.
 * https://leetcode.com/problems/substring-with-concatenation-of-all-words/
 *
 * Example 1:
 * Input: String="catfoxcat", Words=["cat", "fox"]
 * Output: [0, 3]
 * Explanation: The two substring containing both the words are "catfox" & "foxcat".
 *
 * Example 2:
 * Input: String="catcatfoxfox", Words=["cat", "fox"]
 * Output: [3]
 * Explanation: The only substring containing both the words is "catfox".
 *
 * Time: O(m * n * len)
 * Space: O(m + len) <- `substr` creates a new string which will cost `len`
 *
 * Not: the approach we used here is not related to sliding window technically, because
 * we didn't pick up the result of the current move in the next move, e.g. every loop we
 * create a new `visitedWordCountMap` (aggregation).
 *
 * @param {string} string
 * @param {string[]} words
 * @return {number[]}
 */
function substringWithConcatenationOfAllWords(string, words) {
  const wordLength = words[0].length;
  const wordCountMap = {};
  // O(m)
  for (let i = 0; i < words.length; i++) {
    wordCountMap[words[i]] = (wordCountMap[words[i]] || 0) + 1;
  }

  const lastIndex = string.length - wordLength * words.length;
  const resultIndices = [];

  // O(n - m * len)
  for (let startIndex = 0; startIndex <= lastIndex; startIndex++) {
    const visitedWordCountMap = {};
    // O(m)
    for (let i = 0; i < words.length; i++) {
      // O(len)
      const word = string.substr(startIndex + i * wordLength, wordLength);
      // exit loop immediately if word is not existed
      if (!(word in wordCountMap)) {
        break;
      }
      visitedWordCountMap[word] = (visitedWordCountMap[word] || 0) + 1;
      // exit loop immediately if word count is larger than expected
      if (visitedWordCountMap[word] > wordCountMap[word]) {
        break;
      }

      /**
       * Every word can find a match and the for loop finished without breaking,
       * it's guaranteed that this is a valid start index.
       */
      if (i === words.length - 1) {
        resultIndices.push(startIndex);
      }
    }
  }

  return resultIndices;
}

// Test
console.log(substringWithConcatenationOfAllWords('catfoxcat', ['cat', 'fox'])); // [0, 3]
console.log(
  substringWithConcatenationOfAllWords('catcatfoxfox', ['cat', 'fox'])
); // [3]
