const { buildTreeBFS } = require('../_utils');

/**
 *
 * Problem:
 * Given a binary tree, connect each node with its level order successor. The last
 * node of each level should point to the first node of the next level.
 *
 *
 * Time: O(n)
 * Space: O(n)
 *
 * Note: similar as 116_populating-next-right-pointers-in-each-node, this problem is
 * even simpler: we don't need to know the start of each level, just follow the
 * traditional BFS traversal, and update next accordingly.
 *
 * @param {TreeNode} root
 * @return {TreeNode}
 */
function connectAllLevelNodeSiblings(root) {
  if (!root) {
    return null;
  }

  const queue = [root];
  let prev = null;
  while (queue.length > 0) {
    const node = queue.shift();
    if (prev) {
      prev.next = node;
    }
    prev = node;
    if (node.left) {
      queue.push(node.left);
    }
    if (node.right) {
      queue.push(node.right);
    }
  }
  return root;
}

// Test
const tree1 = buildTreeBFS([1, 2, 3, 4, 5, 6, 7]);
const result1 = connectAllLevelNodeSiblings(tree1);
_printNodesWithNext(result1); // [1, 2, 3, 4, 5, 6, 7]

const tree2 = buildTreeBFS([12, 7, 1, null, 9, 10, 5]);
const result2 = connectAllLevelNodeSiblings(tree2);
_printNodesWithNext(result2); // [12, 7, 1, 9, 10, 5]

function _printNodesWithNext(root) {
  let current = root;
  const values = [];
  while (current) {
    values.push(current.val);
    current = current.next;
  }
  console.log(values);
}
