const { buildTreeBFS } = require('../_utils');

/**
 *
 * Problem:
 * Given a binary tree and a number S, find all paths from root-to-leaf such that
 * the sum of all the node values of each path equals S.
 * https://leetcode.com/problems/path-sum-ii/
 *
 * Example 1:
 * Input: [1, 7, 9, 4, 5, 2, 7], 12
 * Output: [ [1, 7, 4], [1, 9, 2] ]
 *
 * Example 2:
 * Input: [12, 7, 1, null, 4, 10, 5], 23
 * Output: [ [12, 7, 4], [12, 1, 10] ]
 *
 *
 * Time: O(n^2) <- for each leaf, we might call `concat()`, which is a O(h)
 * Space: O(h) (log(n) ~ n) <- `curPath` variable, without considering the
 * return value space
 *
 * @param {TreeNode} root
 * @param {number} sum
 * @return {number[][]}
 */
function getAllPathsWithSum(root, sum) {
  const result = [];
  _traverse(root, sum, [], result);
  return result;
}

function _traverse(node, targetSum, curPath, result) {
  if (!node) {
    return;
  }
  if (!node.left && !node.right && targetSum === node.val) {
    /**
     * We reuse `curPath` to reduce the space complexity, so only one array
     * is created for the whole traversal, that's why we need to copy that
     * before pushing to the final result, otherwise it will be modified by
     * the following traversal.
     *
     * Note: `concat` is a O(n) operation, because it needs to copy all the
     * items inside.
     */
    result.push(curPath.concat(node.val));
    return;
  }
  /**
   * Similar as 112_path-sum, the differences here are:
   *  1. we need to find all the paths, so no `||` below because we need to
   * traverse all the nodes
   *  2. we need to save all the visited paths, so another variable `curPath`
   * is created here.
   *
   * The `doVisit` here is to put the current node value into the `curPath`,
   * since `curPath` is an object (array), so at the end of the current node
   * traversal, we need to revert the change, that's why we need the `pop()`
   * at the end.
   */
  curPath.push(node.val);
  _traverse(node.left, targetSum - node.val, curPath, result);
  _traverse(node.right, targetSum - node.val, curPath, result);
  curPath.pop();
}

// Test
const tree1 = buildTreeBFS([1, 7, 9, 4, 5, 2, 7]);
const result1 = getAllPathsWithSum(tree1, 12);
result1.forEach((i) => console.log(i)); // [ [1, 7, 4], [1, 9, 2] ]

const tree2 = buildTreeBFS([12, 7, 1, null, 4, 10, 5]);
const result2 = getAllPathsWithSum(tree2, 23);
result2.forEach((i) => console.log(i)); // [ [12, 7, 4], [12, 1, 10] ]
