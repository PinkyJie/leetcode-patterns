const { buildTreeBFS } = require('../_utils');

/**
 *
 * Problem:
 * Given a binary tree, find the length of its diameter. The diameter of a tree is
 * the number of nodes on the longest path between any two leaf nodes. The diameter
 * of a tree may or may not pass through the root.
 * Note: The length of path between two nodes is represented by the number of edges
 * between them.
 * https://leetcode.com/problems/diameter-of-binary-tree/
 *
 * Example 1:
 * Input: [1, 2, 3, null, 4, 5, 6]
 * Output: 4
 * Explanation: The diameter of the tree is: [4, 2, 1, 3, 6]
 *
 * Example 2:
 * Input: [1, 2, 3, null, null, 5, 6, 7, 8, 9, null, null, null, null, 10, 11]
 * Output: 7
 * Explanation: The diameter of the tree is: [10, 8, 5, 3, 6, 9, 11]
 *
 *
 * Time: O(n)
 * Space: O(h) <- recursion stack
 *
 * @param {TreeNode} root
 * @return {number}
 */
function diameterOfBinaryTree(root) {
  /**
   * Each recursion needs to run 2 things, we can either make the recursion
   * return an object like this, or use a global variable here out of the
   * recursion.
   */
  return _traverse(root).maxDiameter;
}

function _traverse(node) {
  /**
   * Why we need to return 2 results?
   *  * `curDepth`: The parent node needs to know its children's depth value
   * so that it can calculate the path length passed this node. Since the path
   * length is defined as the edge count, which is equivalent to the depth, so
   * with each node return their current depth, the parent node's path length
   * can be calculate as `leftDepth + rightDepth`. Note: leaf node's depth is 1.
   *  * `maxPathLength`: If each node only return `curDepth`, inside each recursion
   * we only know the current path length, in order to get the maximum of path
   * length between all nodes, we need to either set a global variable to store
   * that, or we return an additional value for each node: maximum path length for
   * this node and all its children, so the `maxPathLength` for root node is the
   * final answer we need.
   */
  if (!node) {
    return {
      curDepth: 0,
      maxPathLength: 0,
    };
  }

  const leftTreeResult = _traverse(node.left);
  const rightTreeResult = _traverse(node.right);

  const curPathLength = leftTreeResult.curDepth + rightTreeResult.curDepth;
  const curDepth =
    1 + Math.max(leftTreeResult.curDepth, rightTreeResult.curDepth);

  return {
    curDepth,
    maxPathLength: Math.max(
      leftTreeResult.maxPathLength,
      rightTreeResult.maxPathLength,
      curPathLength
    ),
  };
}

// Test
const tree1 = buildTreeBFS([1, 2, 3, null, 4, 5, 6]);
console.log(diameterOfBinaryTree(tree1)); // 4

const tree2 = buildTreeBFS([
  1,
  2,
  3,
  null,
  null,
  5,
  6,
  7,
  8,
  9,
  null,
  null,
  null,
  null,
  10,
  11,
]);
console.log(diameterOfBinaryTree(tree2)); // 6
