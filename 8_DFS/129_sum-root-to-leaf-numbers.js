const { buildTreeBFS } = require('../_utils');

/**
 *
 * Problem:
 * Given a binary tree where each node can only have a digit (0-9) value, each
 * root-to-leaf path will represent a number. Find the total sum of all the numbers
 * represented by all paths.
 * https://leetcode.com/problems/sum-root-to-leaf-numbers/
 *
 * Example 1:
 * Input: [1, 7, 9, null, null, 2, 9]
 * Output: 408
 * Explanation: The sum of all path numbers: 17 + 192 + 199
 *
 * Example 2:
 * Input: [1, 0, 1, null, 1, 6, 5]
 * Output: 332
 * Explanation: The sum of all path numbers: 101 + 116 + 115
 *
 *
 * Time: O(n)
 * Space: O(h) <- recursion stack
 *
 * @param {TreeNode} root
 * @return {number}
 */
function sumOfRootToLeafNumbers(root) {
  return _traverse(root, 0);
}

function _traverse(node, curSum) {
  if (!node) {
    return 0;
  }
  /**
   * Similar as 113_path-sum-ii, the only differences is here the `doVisit` is to
   * treat the path as a number.
   */
  curSum = curSum * 10 + node.val;
  if (!node.left && !node.right) {
    return curSum;
  }
  /**
   * What's the return value of the `_traverse` here?
   *
   * For each node passed in, we get `leftValue/rightValue` at the end, so at that
   * moment we must finish visiting the node, so the very first time when we have
   * both `leftValue` and `rightValue`, it just finishes visiting the left child and
   * the right child of a level (h - 1) node, so the sum will be the two path numbers
   * which passes that node. For example, the example 1 tree above, the first node
   * being fully visited (both left/right children has been visited) is the node 9,
   * at that moment, leftValue=192, rightValue=199.
   *
   * Note: utilise the return value of the recursion can prevent creating unnecessary
   * global variables, for example, if we ignore the return value, we need to maintain
   * a `totalSum` and add number to that variable every time we reach the leaf node.
   */
  const leftValue = _traverse(node.left, curSum);
  // console.log('after left:', leftValue);
  const rightValue = _traverse(node.right, curSum);
  // console.log('after right:', leftValue, rightValue);
  return leftValue + rightValue;
}

// Test
const tree1 = buildTreeBFS([1, 7, 9, null, null, 2, 9]);
console.log(sumOfRootToLeafNumbers(tree1)); // 408

const tree2 = buildTreeBFS([1, 0, 1, null, 1, 6, 5]);
console.log(sumOfRootToLeafNumbers(tree2)); // 332
