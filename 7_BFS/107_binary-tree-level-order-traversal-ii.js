const { buildTreeBFS } = require('../_utils');

/**
 *
 * Problem:
 * Given a binary tree, populate an array to represent its level-by-level traversal
 * in reverse order, i.e., the lowest level comes first. You should populate the
 * values of all nodes in each level from left to right in separate sub-arrays.
 * https://leetcode.com/problems/binary-tree-level-order-traversal-ii/
 *
 * Example 1:
 * Input: [1, 2, 3, 4, 5, 6, 7]
 * Output: [[4, 5, 6, 7], [2, 3], [1]]
 *
 * Example 2:
 * Input: [12, 7, 1, null, 9, 10, 5]
 * Output: [[9, 10, 5], [7, 1], [12]]
 *
 * Time: O(n)
 * Space: O(n)
 *
 * @param {TreeNode} root
 * @return {number[][]}
 */
function reversedLevelOrderTraverse(root) {
  if (!root) {
    return [];
  }

  const result = [];
  const levelNodes = [root];
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
    /**
     * Similar as 102_binary-tree-level-order-traversal, the only difference here
     * is the following line: instead of pushing the values to the end of the array,
     * we use `unshift` to add the values to the start of the array.
     *
     * Note: `unshift` can be slow for array (actually O(n)), try to use the linked
     * list or recursive method below.
     */
    result.unshift(values);
  }
  return result;
}

function reversedLevelOrderTraverseRecursive(root) {
  if (!root) {
    return [];
  }

  const result = [];
  _traverse([root], result);
  return result;
}

function _traverse(nodes, result) {
  if (nodes.length === 0) {
    return;
  }

  const length = nodes.length;
  const values = [];
  for (let i = 0; i < length; i++) {
    const node = nodes.shift();
    values.push(node.val);
    if (node.left) {
      nodes.push(node.left);
    }
    if (node.right) {
      nodes.push(node.right);
    }
  }
  _traverse(nodes, result);
  result.push(values);
}

// Test
const tree1 = buildTreeBFS([1, 2, 3, 4, 5, 6, 7]);
const result1 = reversedLevelOrderTraverse(tree1);
const result11 = reversedLevelOrderTraverseRecursive(tree1);
result1.forEach((i) => console.log(i)); // [[4, 5, 6, 7], [2, 3], [1]]
result11.forEach((i) => console.log(i)); // [[4, 5, 6, 7], [2, 3], [1]]

const tree2 = buildTreeBFS([12, 7, 1, null, 9, 10, 5]);
const result2 = reversedLevelOrderTraverse(tree2);
const result22 = reversedLevelOrderTraverseRecursive(tree2);
result2.forEach((i) => console.log(i)); // [[9, 10, 5], [7, 1], [12]]
result22.forEach((i) => console.log(i)); // [[9, 10, 5], [7, 1], [12]]
