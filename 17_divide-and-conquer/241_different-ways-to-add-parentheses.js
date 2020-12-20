/**
 *
 * Problem:
 * Given an expression containing digits and operations (+, -, *), find all possible
 * ways in which the expression can be evaluated by grouping the numbers and
 * operators using parentheses.
 * Note: duplicate number is allowed in the final result.
 * https://leetcode.com/problems/different-ways-to-add-parentheses/
 *
 * Example 1:
 * Input: "1+2*3"
 * Output: 7, 9
 * Explanation: 1+(2*3) => 7 and (1+2)*3 => 9
 *
 * Example 2:
 * Input: "2*3-4-5"
 * Output: 8, -12, 7, -7, -3
 * Explanation: 2*(3-(4-5)) => 8, 2*(3-4-5) => -12, 2*3-(4-5) => 7, 2*(3-4)-5 => -7,
 * (2*3)-4-5 => -3
 *
 *
 * Time: O(n 2^n) n: the count of the operators
 * f(1) -> split by the 1st operator
 * f(n) = f(1)+f(2)+..+f(n-1)+f(n-1)+f(n-2)..+f(1) = 2*(f(1)+f(2)+...+f(n-1))
 * => f(n+1) = 2*(f(1)+f(2)+..+f(n))
 *           = 2*(f(1)+f(2)+...+f(n-1)) + 2f(n)
 *           = f(n)+2f(n)
 *           = 3f(n)
 * => f(n+1) = 3f(n) = 3*3*f(n-1) = ... = 3^(n+1)
 * for each f() problem, we also do `slice`, that's also a O(n)
 *
 * Space: O(n 2^n)
 *
 * @param {string} expression
 * @return {number[]}
 */
function differentWaysToEvaluateExpression(expression) {
  const memo = {};
  return _splitAndCombine(expression, memo);
}

function _splitAndCombine(expression, memo) {
  // use memo to accelerate, after splitting there might be duplicate sub-expressions
  if (memo[expression]) {
    return memo[expression];
  }
  const results = [];
  /**
   * Use a divide-and-conquer approach, think about adding parentheses to an
   * expression, it can wrap any 2 numbers with an operator, that is to say,
   * we can split the expression into 2 parts for each operator, and do it
   * recursively for the split parts, until there's no operators in the expression,
   * for which we can use `parseInt` to get the result.
   *
   * After splitting, each part of the expression can form a array results (if
   * there's no operator in the expression, the result is a one-item array), so
   * we combine these 2 arrays with the split operator, we can get a new combined
   * array, this is all the possible values we can get from the expression.
   *
   *
   *                                2 * 3 - 4 - 5
   *                      /               |             \
   *                     *                -              -
   *                 /       \         /     \        /     \
   *                2      3-4-5     2*3     4-5    2*3-4    5
   *                      /     \                   /    \
   *                     -       -                 *      -
   *                   /  \     /  \             /  \    / \
   *                  3   4-5  3-4  5           2  3-4  2*3 4
   */
  for (let i = 0; i < expression.length; i++) {
    if (_isOperator(expression[i])) {
      const leftResults = _splitAndCombine(expression.slice(0, i), memo);
      const rightResults = _splitAndCombine(expression.slice(i + 1), memo);
      for (let j = 0; j < leftResults.length; j++) {
        for (let k = 0; k < rightResults.length; k++) {
          const num1 = leftResults[j];
          const num2 = rightResults[k];
          switch (expression[i]) {
            case '+':
              results.push(num1 + num2);
              break;
            case '-':
              results.push(num1 - num2);
              break;
            case '*':
              results.push(num1 * num2);
              break;
          }
        }
      }
    }
  }
  if (results.length === 0) {
    memo[expression] = [parseInt(expression)];
  } else {
    memo[expression] = results;
  }
  return memo[expression];
}

function _isOperator(char) {
  return char === '+' || char === '-' || char === '*';
}

// Test
console.log(differentWaysToEvaluateExpression('1+2*3')); // [7, 9]
console.log(differentWaysToEvaluateExpression('2*3-4-5')); // [8, -12, 7, -7, -3]
