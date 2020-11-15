const { buildTreeBFS } = require('../_utils');

/**
 *
 * Problem:
 * Given a binary tree and a node, find the level order successor of the given node
 * in the tree. The level order successor is the node that appears right after the
 * given node in the level order traversal.
 *
 *
 * Example 1:
 * Input: [1, 2, 3, 4, 5], 3
 * Output: 4
 *
 * Example 2:
 * Input: [12, 7, 1, null, 9, 10, 5], 9
 * Output: 10
 *
 *
 * Time: O(n)
 * Space: O(n)
 *
 * @param {TreeNode} root
 * @param {number} nodeValue
 * @return {TreeNode}
 */
function levelOrderSuccessor(root, nodeValue) {
  if (!root) {
    return null;
  }

  const queue = [root];
  while (queue.length > 0) {
    const node = queue.shift();
    if (node.left) {
      queue.push(node.left);
    }
    if (node.right) {
      queue.push(node.right);
    }
    /**
     * Follow the traditional BFS traversal process, if the value is found, break
     * the loop. Note here we always push the children nodes to the queue first
     * before breaking, so when the value is found, its successor should already
     * in the queue (unless it's the last node), the first node in the queue is
     * what we want.
     */
    if (node.val === nodeValue) {
      break;
    }
  }
  if (queue.length > 0) {
    return queue[0];
  }
  return null;
}

// Test
const tree1 = buildTreeBFS([1, 2, 3, 4, 5]);
console.log(levelOrderSuccessor(tree1, 3).val); // 4

const tree2 = buildTreeBFS([12, 7, 1, null, 9, 10, 5]);
console.log(levelOrderSuccessor(tree2, 9).val); // 10
