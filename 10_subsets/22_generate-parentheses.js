/**
 *
 * Problem:
 * For a given number N, write a function to generate all combination of ‘N’ pairs
 * of balanced parentheses.
 * https://leetcode.com/problems/generate-parentheses/
 *
 * Example 1:
 * Input: N=2
 * Output: (()), ()()
 *
 * Example 2:
 * Input: N=3
 * Output: ((())), (()()), (())(), ()(()), ()()()
 *
 *
 * Time: O(n 2^n)
 * Space: O(n 2^n) <- result
 *
 * @param {number} num
 * @return {string[]}
 */
function generateParentheses(num) {
  const parentheses = [];
  _backtrack(num, ['('], 1, 0, parentheses);
  return parentheses;
}

function _backtrack(num, curList, openCount, closeCount, result) {
  if (curList.length === 2 * num) {
    // O(n) to join array to string
    result.push(curList.join(''));
    return;
  }
  /**
   * When we construct the `choices` array (see README), we need to consider
   * the valid options based on the current `openCount` (count of `(`) and
   * `closeCount` (count of `)`):
   *  1. if `openCount < num`, we can still append `(`, because the maximum
   * `(` can not exceed `num`.
   *  2. if `closeCount < openCount`, we can still append `)`, because the
   * maximum `)` in any time can't exceed `(`, otherwise it won't be valid
   *
   * Rough time estimation: every position we have 2 choices, so it would be
   * 2^(2n) -> O(2^n)
   */
  if (openCount < num) {
    curList.push('(');
    _backtrack(num, curList, openCount + 1, closeCount, result);
    curList.pop();
  }
  if (closeCount < openCount) {
    curList.push(')');
    _backtrack(num, curList, openCount, closeCount + 1, result);
    curList.pop();
  }
}

// Test
console.log(generateParentheses(2));
// [ '(())', '()()' ]
console.log(generateParentheses(3));
// [ '((()))', '(()())', '(())()', '()(())', '()()()' ]
