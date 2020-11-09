const { buildTreeBFS } = require('../_utils');

/**
 *
 * Problem:
 * Find the minimum depth of a binary tree. The minimum depth is the number of nodes
 * along the shortest path from the root node to the nearest leaf node.
 * https://leetcode.com/problems/minimum-depth-of-binary-tree/
 *
 * Example 1:
 * Input: [1, 2, 3, 4, 5]
 * Output: 2
 *
 * Example 2:
 * Input: [12, 7, 1, null, 9, 10, 5, null, null, 11]
 * Output: 3
 *
 *
 * Time: O(n)
 * Space: O(n)
 *
 * @param {TreeNode} root
 * @return {number}
 */
function minimumTreeDepth(root) {
  if (!root) {
    return 0;
  }

  const levelNodes = [root];
  let curDepth = 1;
  while (levelNodes.length > 0) {
    const levelLength = levelNodes.length;
    for (let i = 0; i < levelLength; i++) {
      const node = levelNodes.shift();
      /**
       * The key is to find the 1st left node in the level order traversal,
       * the height for this leaf node is guaranteed to be the minimal depth.
       * The reason is BFS do the traversal level by level, as long as a leaf
       * node is reached, it is the smallest depth. That's the benefit of BFS,
       * if we use DFS here, we need to reach each path from the root to each
       * leaf and get all the depths, then compare them to find the minimum
       * one, that's way less effective.
       */
      if (!node.left && !node.right) {
        return curDepth;
      }
      if (node.left) {
        levelNodes.push(node.left);
      }
      if (node.right) {
        levelNodes.push(node.right);
      }
    }
    curDepth++;
  }
}

// Test
const tree1 = buildTreeBFS([1, 2, 3, 4, 5]);
console.log(minimumTreeDepth(tree1)); // 2

const tree2 = buildTreeBFS([12, 7, 1, null, 9, 10, 5, null, null, 11]);
console.log(minimumTreeDepth(tree2)); // 3
