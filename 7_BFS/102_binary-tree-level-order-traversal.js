const { buildTreeBFS } = require('../_utils');

/**
 *
 * Problem:
 * Given a binary tree, populate an array to represent its level-by-level traversal.
 * You should populate the values of all nodes of each level from left to right in
 * separate sub-arrays.
 * https://leetcode.com/problems/binary-tree-level-order-traversal/
 *
 * Example 1:
 * Input: [1, 2, 3, 4, 5, 6, 7]
 * Output: [[1], [2, 3], [4, 5, 6, 7]]
 *
 * Example 2:
 * Input: [12, 7, 1, null, 9, 10, 5]
 * Output: [[12], [7, 1], [9, 10, 5]]
 *
 * Time: O(n) <- need to traverse the whole tree, each node is visited exactly once
 * Space: O(n) <- the maximum node number of any level, i.e. n/2
 *
 * @param {TreeNode} root
 * @return {number[][]}
 */
function levelOrderTraverse(root) {
  if (!root) {
    return [];
  }

  const result = [];
  let levelNodes = [root];
  while (levelNodes.length > 0) {
    const levelLength = levelNodes.length;
    const values = [];
    for (let i = 0; i < levelLength; i++) {
      const node = levelNodes.shift();
      values.push(node.val);
      if (node.left) {
        levelNodes.push(node.left);
      }
      if (node.right) {
        levelNodes.push(node.right);
      }
    }
    result.push(values);
  }
  return result;
}

// Test
const tree1 = buildTreeBFS([1, 2, 3, 4, 5, 6, 7]);
const result1 = levelOrderTraverse(tree1);
result1.forEach((i) => console.log(i)); // [[1], [2, 3], [4, 5, 6, 7]]

const tree2 = buildTreeBFS([12, 7, 1, null, 9, 10, 5]);
const result2 = levelOrderTraverse(tree2);
result2.forEach((i) => console.log(i)); // [[12], [7, 1], [9, 10, 5]]
