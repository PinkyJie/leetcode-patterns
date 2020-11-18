const { buildTreeBFS } = require('../_utils');

/**
 *
 * Problem:
 * Given a binary tree and a number S, find if the tree has a path from
 * root-to-leaf such that the sum of all the node values of that path equals S.
 * https://leetcode.com/problems/path-sum/
 *
 * Example 1:
 * Input: [1, 2, 3, 4, 5, 6, 7], 10
 * Output: true
 *
 * Example 2:
 * Input: [12, 7, 1, null, 9, 10, 5], 16
 * Output: false
 *
 *
 * Time: O(n)
 * Space: O(h) (log(n) ~ n) <- recursion stack (height)
 *
 * @param {TreeNode} root
 * @param {number} sum
 * @return {boolean}
 */
function hasPathSum(root, sum) {
  if (!root) {
    return false;
  }
  /**
   * Do the check for each leaf node.
   */
  if (!root.left && !root.right) {
    return sum === root.val;
  }
  /**
   * This is technically pre-order traversal, the `doVisit` here is to subtract
   * the current node value from the target sum. After visiting left child, we
   * should restore the sum to its original value before visiting right child
   * (because now the "root" is the parent), that's why we pass the same
   * `sum - root.val` for both children here.
   */
  return (
    hasPathSum(root.left, sum - root.val) ||
    /**
     * Use "||" here because we want the traversal to stop immediately once we
     * find a matched path, e.g. no need to traverse the right half.
     */
    hasPathSum(root.right, sum - root.val)
  );
}

// Test
const tree1 = buildTreeBFS([1, 2, 3, 4, 5, 6, 7]);
console.log(hasPathSum(tree1, 10)); // true

const tree2 = buildTreeBFS([12, 7, 1, null, 9, 10, 5]);
console.log(hasPathSum(tree2, 16)); // false
