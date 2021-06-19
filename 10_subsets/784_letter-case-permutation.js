/**
 *
 * Problem:
 * Given a string, find all of its permutations preserving the character sequence but
 * changing case.
 * https://leetcode.com/problems/letter-case-permutation/
 *
 * Example 1:
 * Input: "ad52"
 * Output: "ad52", "Ad52", "aD52", "AD52"
 *
 * Example 2:
 * Input: "ab7c"
 * Output: "ab7c", "Ab7c", "aB7c", "AB7c", "ab7C", "Ab7C", "aB7C", "AB7C"
 *
 *
 * Time: O(n 2^n)
 * Space: O(n 2^n) <- result
 *
 * @param {string} str
 * @return {string[]}
 */
function findLetterCaseStringPermutation(str) {
  const permutations = [];
  _backtrack(str, 0, [], permutations);
  return permutations;
}

function _backtrack(str, curIndex, curList, result) {
  if (curList.length === str.length) {
    // O(n) to join array to a string
    result.push(curList.join(''));
    return;
  }

  const curChar = str[curIndex];
  /**
   * Still the same backtrack approach here, the difference is here for each index,
   * we only have 2 choices at most: lowercase and uppercase, for non-string index,
   * there is only one choice. So we construct the choices array first here and loop
   * through it.
   *
   * Time: O(2^n) cause for each index, there's at most 2 choices.
   */
  let choices = [curChar];
  if (!_isNumber(curChar)) {
    choices = [curChar.toLowerCase(), curChar.toUpperCase()];
  }
  for (let i = 0; i < choices.length; i++) {
    curList.push(choices[i]);
    _backtrack(str, curIndex + 1, curList, result);
    curList.pop();
  }
}

function _isNumber(char) {
  return char >= '0' && char <= '9';
}

// Test
console.log(findLetterCaseStringPermutation('ad52'));
// ['ad52', 'Ad52', 'aD52', 'AD52']
console.log(findLetterCaseStringPermutation('ab7c'));
// ['ab7c', 'Ab7c', 'aB7c', 'AB7c', 'ab7C', 'Ab7C', 'aB7C', 'AB7C']
