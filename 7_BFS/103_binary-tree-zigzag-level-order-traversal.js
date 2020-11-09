const { buildTreeBFS } = require('../_utils');

/**
 *
 * Problem:
 * Given a binary tree, populate an array to represent its zigzag level order
 * traversal. You should populate the values of all nodes of the first level from
 * left to right, then right to left for the next level and keep alternating in the
 * same manner for the following levels.
 * https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/
 *
 * Example 1:
 * Input: [1, 2, 3, 4, 5, 6, 7]
 * Output: [[1], [3, 2], [4, 5, 6, 7]]
 *
 * Example 2:
 * Input: [12, 7, 1, null, 9, 10, 5, null, null, 20, 17]
 * Output: [[12], [1, 7], [9, 10, 5], [17, 20]]
 *
 * Time: O(n)
 * Space: O(n)
 *
 * @param {TreeNode} root
 * @return {number[][]}
 */
function zigzagLevelOrderTraverse(root) {
  if (!root) {
    return [];
  }

  const result = [];
  const levelNodes = [root];
  let leftToRight = true;
  while (levelNodes.length > 0) {
    const levelLength = levelNodes.length;
    const values = [];
    for (let i = 0; i < levelLength; i++) {
      const node = levelNodes.shift();
      /**
       * Similar as 102_binary-tree-level-order-traversal, the only difference is
       * here we need to maintain another flag to decide the order, if the order is
       * from left to right, use `push` to add at the end, otherwise use `unshift`
       * to add the start. Then flip the flag after each level.
       */
      if (leftToRight) {
        values.push(node.val);
      } else {
        values.unshift(node.val);
      }
      if (node.left) {
        levelNodes.push(node.left);
      }
      if (node.right) {
        levelNodes.push(node.right);
      }
    }
    result.push(values);
    leftToRight = !leftToRight;
  }
  return result;
}

// Test
const tree1 = buildTreeBFS([1, 2, 3, 4, 5, 6, 7]);
const result1 = zigzagLevelOrderTraverse(tree1);
result1.forEach((i) => console.log(i)); // [[1], [3, 2], [4, 5, 6, 7]]

const tree2 = buildTreeBFS([12, 7, 1, null, 9, 10, 5, null, null, 20, 17]);
const result2 = zigzagLevelOrderTraverse(tree2);
result2.forEach((i) => console.log(i)); // [[12], [1, 7], [9, 10, 5], [17, 20]]
