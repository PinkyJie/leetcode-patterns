const { buildTreeBFS } = require('../_utils');

/**
 *
 * Problem:
 * Given a binary tree, populate an array to represent the averages of all of its
 * levels.
 * https://leetcode.com/problems/average-of-levels-in-binary-tree/
 *
 *
 * Example 1:
 * Input: [1, 2, 3, 4, 5, 6, 7]
 * Output: [1, 2.5, 5.5]
 *
 * Example 2:
 * Input: [12, 7, 1, 9, 2, 10, 5]
 * Output: [12, 4, 6.5]
 *
 *
 * Time: O(n)
 * Space: O(n)
 *
 * @param {TreeNode} root
 * @return {number[]}
 */
function averageOfLevel(root) {
  if (!root) {
    return [];
  }

  const result = [];
  const levelNodes = [root];
  while (levelNodes.length > 0) {
    const levelLength = levelNodes.length;
    let levelSum = 0;
    for (let i = 0; i < levelLength; i++) {
      const node = levelNodes.shift();
      /**
       * Similar as 102_binary-tree-level-order-traversal, the only difference
       * is here we need to store the sum of each level nodes.
       */
      levelSum += node.val;
      if (node.left) {
        levelNodes.push(node.left);
      }
      if (node.right) {
        levelNodes.push(node.right);
      }
    }
    result.push(levelSum / levelLength);
  }
  return result;
}

// Test
const tree1 = buildTreeBFS([1, 2, 3, 4, 5, 6, 7]);
console.log(averageOfLevel(tree1)); // [1, 2.5, 5.5]

const tree2 = buildTreeBFS([12, 7, 1, 9, 2, 10, 5]);
console.log(averageOfLevel(tree2)); // [12, 4, 6.5]
