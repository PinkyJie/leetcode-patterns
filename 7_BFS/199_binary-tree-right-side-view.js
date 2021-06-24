const { buildTreeBFS } = require('../_utils');

/**
 *
 * Problem:
 * Given a binary tree, return an array containing nodes in its right view. The right
 * view of a binary tree is the set of nodes visible when the tree is seen from the
 * right side.
 * https://leetcode.com/problems/binary-tree-right-side-view/
 *
 * Example 1:
 * Input: [1, 2, 3, 4, 5, 6, 7]
 * Output: [1, 3, 7]
 *
 * Example 2:
 * Input: [12, 7, 1, null, 9, 10, 5, 3]
 * Output: [12, 1, 5, 3]
 *
 *
 * Time: O(n)
 * Space: O(n)
 *
 * @param {TreeNode} root
 * @return {number[]}
 */
function rightViewOfBinaryTree(root) {
  if (!root) {
    return [];
  }
  const result = [];
  const levelNodes = [root];
  while (levelNodes.length > 0) {
    const levelLength = levelNodes.length;
    for (let i = 0; i < levelLength; i++) {
      const node = levelNodes.shift();
      if (node.left) {
        levelNodes.push(node.left);
      }
      if (node.right) {
        levelNodes.push(node.right);
      }
      /**
       * The key logic is here: the right view of the tree actually contains the last
       * node for each level (similarly the left view of the tree contains the first
       * node for each level), so here we just do the normal BFS level traversal, and
       * put the last node's value into the result array.
       */
      if (i === levelLength - 1) {
        result.push(node.val);
      }
    }
  }
  return result;
}

/**
 * A recursive solution which does not require storing all level nodes. The key
 * logic is to do DFS traversal but visiting the right node first, because we need
 * to add the rightmost node to the result array.
 */
function rightViewOfBinaryTreeRecursive(root) {
  const values = [];
  _rightView(root, 0, values);
  return values;
}

function _rightView(node, depth, values) {
  if (!node) {
    return;
  }
  console.log(node.val);
  /**
   * When to put the node value to the result array? If the result array's length
   * is equal to the current depth, that means for this depth (0 based), the node
   * value is not pushed yet. So this check can make sure for a level, only the
   * first visited node will be pushed, since we starting from the right child,
   * the first visited node is guaranteed to be the rightmost node.
   */
  if (values.length === depth) {
    values.push(node.val);
  }
  _rightView(node.right, depth + 1, values);
  _rightView(node.left, depth + 1, values);
}

// Test
const tree1 = buildTreeBFS([1, 2, 3, 4, 5, 6, 7]);
console.log(rightViewOfBinaryTree(tree1)); // [1, 3, 7]
console.log(rightViewOfBinaryTreeRecursive(tree1)); // [1, 3, 7]

const tree2 = buildTreeBFS([12, 7, 1, null, 9, 10, 5, 3]);
console.log(rightViewOfBinaryTree(tree2)); // [12, 1, 5, 3]
console.log(rightViewOfBinaryTreeRecursive(tree2)); // [12, 1, 5, 3]
