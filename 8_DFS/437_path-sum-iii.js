const { buildTreeBFS } = require('../_utils');

/**
 *
 * Problem:
 * Given a binary tree and a number S, find all paths in the tree such that the sum
 * of all the node values of each path equals S. Please note that the paths can
 * start or end at any node but all paths must follow direction from parent to child
 * (top to bottom).
 * https://leetcode.com/problems/path-sum-iii/
 *
 * Example 1:
 * Input: [1, 7, 9, 6, 5, 2, 3], 12
 * Output: 3
 * Explanation: There are three paths with sum 12: 7 -> 5, 1 -> 9 -> 2, and 9 -> 3
 *
 * Example 2:
 * Input: [12, 7, 1, null, 4, 10, 5], 11
 * Output: 2
 * Explanation: Here are the two paths with sum 11: 7 -> 4 . and 1 -> 10.
 *
 *
 * Time: O(nh) <- for each node it might need to traverse up until root
 * Space: O(h) `curPath` need to store the nodes for the maximum height
 *
 * @param {TreeNode} root
 * @param {number} sum
 * @return {number}
 */
function countPathOfSum(root, sum) {
  return _traverse(root, sum, []);
}

function _traverse(node, sum, curPath) {
  if (!node) {
    return 0;
  }
  curPath.push(node.val);

  /**
   * Why we don't modify the `sum` every time and pass it down to the children
   * nodes? Technically we can do that, but since the path doesn't need to start
   * with the root, so we can't actually reuse the modified sum for each node.
   * So here the logic is, for each visited node, calculate all the sum from
   * itself to all the upwards nodes until we reach root, during this process,
   * if we find a matched sum, plus 1 for the `count`.
   *
   * Is there any duplicate calculation? No, because for each node, it just calculates
   * the sum starting from the node itself (always including the node itself) to
   * the upwards nodes. This also defines the time complexity: O(n * h), for each
   * node, we need to traverse upwards until the root, which is the height of the
   * tree.
   */
  let count = 0;
  let pathSum = 0;
  for (let i = curPath.length - 1; i >= 0; i--) {
    pathSum += curPath[i];
    if (pathSum === sum) {
      console.log(curPath, i);
      count++;
    }
  }

  /**
   * Use the recursion return value to aggregate the count of its children
   * to the parent node, so the final return value for `root` will cover valid
   * count for all its children.
   */
  count += _traverse(node.left, sum, curPath);
  count += _traverse(node.right, sum, curPath);
  curPath.pop();
  return count;
}

// Test
const tree1 = buildTreeBFS([1, 7, 9, 6, 5, 2, 3]);
console.log(countPathOfSum(tree1, 12)); // 3

const tree2 = buildTreeBFS([12, 7, 1, null, 4, 10, 5]);
console.log(countPathOfSum(tree2, 11)); // 2
