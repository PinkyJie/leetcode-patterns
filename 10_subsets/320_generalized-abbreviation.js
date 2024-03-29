/**
 *
 * Problem:
 * Given a word, write a function to generate all of its unique generalized
 * abbreviations. Generalized abbreviation of a word can be generated by replacing
 * each substring of the word by the count of characters in the substring. Take the
 * example of "ab" which has four substrings: "", "a", "b", and "ab". After replacing
 * these substrings in the actual word by the count of characters we get all the
 * generalized abbreviations: "2", "a1", "1b", and "ab".
 * https://leetcode.com/problems/generalized-abbreviation/ (subscription)
 *
 * Example 1:
 * Input: "BAT"
 * Output: "BAT", "BA1", "B1T", "B2", "1AT", "1A1", "2T", "3"
 *
 * Example 2:
 * Input: "code"
 * Output: "code", "cod1", "co1e", "co2", "c1de", "c1d1", "c2e", "c3", "1ode",
 * "1od1", "1o1e", "1o2", "2de", "2d1", "3e", "4"
 *
 *
 * Time: O(n 2^n)
 * Space: O(n 2^n) <- result
 *
 * @param {string} str
 * @return {string[]}
 */
function generateGeneralizedAbbreviation(str) {
  const abbreviations = [];
  _backtrack(str, 0, [], abbreviations);
  return abbreviations;
}

function _backtrack(str, curIndex, curList, result) {
  if (curIndex === str.length) {
    // O(n) to join array to string
    result.push(curList.join(''));
    return;
  }
  let choices = [str[curIndex]];
  // if last char is a number, we can't choose number for next choice
  if (!(curList.length > 0 && _isNumber(curList[curList.length - 1]))) {
    const numberChoices = new Array(str.length - curIndex)
      .fill(0)
      .map((_, index) => index + 1);
    choices = choices.concat(numberChoices);
  }
  /**
   * How to calculate the time complexity? Think in this way: for each character
   * in the string, we can choose either to take it or use a number to represent
   * it, so basically for each position, we have 2 choices, so roughly it's O(2^n).
   */
  for (let i = 0; i < choices.length; i++) {
    curList.push(choices[i]);
    if (i === 0) {
      // char
      _backtrack(str, curIndex + 1, curList, result);
    } else {
      // number
      _backtrack(str, curIndex + choices[i], curList, result);
    }
    curList.pop();
  }
}

function _isNumber(char) {
  /**
   * `char > '0' && char < '9'` won't work because if `word.length >= 10`, then
   * `char` could be a double digit string.
   */
  return !Number.isNaN(parseInt(char));
}

// Test
console.log(generateGeneralizedAbbreviation('BAT'));
// [ 'BAT', 'BA1', 'B1T', 'B2', '1AT', '1A1', '2T', '3' ]
console.log(generateGeneralizedAbbreviation('code'));
// [ 'code', 'cod1', 'co1e', 'co2', 'c1de', 'c1d1', 'c2e', 'c3', '1ode', '1od1', '1o1e', '1o2', '2de', '2d1', '3e', '4' ]
