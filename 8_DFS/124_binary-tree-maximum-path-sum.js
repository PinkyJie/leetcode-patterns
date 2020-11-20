const { buildTreeBFS } = require('../_utils');

/**
 *
 * Problem:
 * Find the path with the maximum sum in a given binary tree. Write a function that
 * returns the maximum sum. A path can be defined as a sequence of nodes between any
 * two nodes and doesn’t necessarily pass through the root. The path must contain at
 * least one node.
 * https://leetcode.com/problems/binary-tree-maximum-path-sum/
 *
 * Example 1:
 * Input: [1, 2, 3, null, 4, 5, 6]
 * Output: 16
 * Explanation: The path with maximum sum is: [4, 2, 1, 3, 6]
 *
 * Example 2:
 * Input: [1, 2, 3, 1, 3, 5, 6, null, null, null, null, 7, 8, 9]
 * Output: 31
 * Explanation:  The path with maximum sum is: [8, 5, 3, 6, 9]
 *
 *
 * Time: O(n)
 * Space: O(h)
 *
 * @param {TreeNode} root
 * @return {number}
 */
function maxPathSum(root) {
  /**
   * The structure is similar as 543_diameter-of-binary-tree, the only difference
   * is the return value for the recursion.
   */
  return _traverse(root).maxPathSum;
}

function _traverse(node) {
  if (!node) {
    return {
      curPathSum: 0,
      /**
       * This `maxPathSum` can't be 0, cause the node in the tree might contain
       * negative values, so make the default `maxPathSum` as -Infinity.
       */
      maxPathSum: -Infinity,
    };
  }

  const leftTreeResult = _traverse(node.left);
  const rightTreeResult = _traverse(node.right);

  /**
   * `curPathSum` means the maximum path sum between all the paths which pass this
   * node, so there can only be 3 different scenarios:
   *  1. the node itself is the maximum (both left/right values are negative)
   *  2. the node with the left child is the maximum
   *  3. the node with the right child is the maximum
   *
   * This value needs to be used by its parent, so it can't include both left
   * right children.
   */
  const curPathSum = Math.max(
    node.val + Math.max(leftTreeResult.curPathSum, rightTreeResult.curPathSum),
    /**
     * Why 0 is required here? This is used to ignore the negative node in the
     * final path:
     *  * for negative leaf node, its left/right child `curPathSum` are both 0,
     * if we don't have this 0 here, the `curPathSum` for the leaf node will be
     * negative, we want to ignore that node in the path.
     *  * if a parent's both left/right child values are negative, obviously the
     * `curPathSum` shouldn't include both of the children, with the 0 here it
     * will make sure its left/right sub tree `curPathSum` will be 0.
     */
    0
  );

  /**
   * `maxPathSum` holds the maximum path sum for all the paths under this node
   * including all the children nodes. So it needs to take these scenarios into
   * consideration:
   *  1. current node value + left sub tree current sum + right sub tree current sum
   *  2. `maxPathSum` from left sub tree
   *  3. `maxPathSum` from right sub tree
   */
  const maxPathSum = Math.max(
    node.val + leftTreeResult.curPathSum + rightTreeResult.curPathSum,
    leftTreeResult.maxPathSum,
    rightTreeResult.maxPathSum
  );

  return {
    curPathSum,
    maxPathSum,
  };
}

// Test
const tree1 = buildTreeBFS([1, 2, 3, null, 4, 5, 6]);
console.log(maxPathSum(tree1)); // 16

const tree2 = buildTreeBFS([
  1,
  2,
  3,
  1,
  3,
  5,
  6,
  null,
  null,
  null,
  null,
  7,
  8,
  9,
]);
console.log(maxPathSum(tree2)); // 31
