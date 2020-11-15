const { buildTreeBFS, TreeNode } = require('../_utils');

/**
 *
 * Problem:
 * Given a binary tree, connect each node with its level order successor. The last
 * node of each level should point to a null node.
 * https://leetcode.com/problems/populating-next-right-pointers-in-each-node-ii/
 *
 *
 * Time: O(n)
 * Space: O(n)
 *
 * @param {TreeNode} root
 * @return {TreeNode}
 */
function connectLevelNodeSibling(root) {
  if (!root) {
    return null;
  }
  const levelNodes = [root];
  while (levelNodes.length > 0) {
    let prevNode = null;
    const levelLength = levelNodes.length;
    for (let i = 0; i < levelLength; i++) {
      const node = levelNodes.shift();
      /**
       * The key logic is here: maintain a prevNode, for the beginning of each
       * level, set it to null, and update it when we traverse each node.
       */
      if (prevNode) {
        prevNode.next = node;
      }
      prevNode = node;
      if (node.left) {
        levelNodes.push(node.left);
      }
      if (node.right) {
        levelNodes.push(node.right);
      }
    }
  }
  return root;
}

/**
 * O(1) space solution which does not require storing all level nodes.
 */
function connectLevelNodeSiblingWithConstantSpace(root) {
  let levelStart = root;
  while (levelStart) {
    /**
     * A dummy node which represent the node before the first node of each level,
     * so its next is always pointed to the first node of each level.
     */
    const dummyNodeBeforeNextLevelStart = new TreeNode(-1);
    /**
     * This variable acts as a pointer to move `dummyNodeBeforeNextLevelStart`
     * forward, who will connect the nodes on the next level. In each loop
     * below, it will always point to the last child node of the `current`, so
     * when `current` moves to next at the end of the loop, we can rely on this
     * variable as the role of "prev" in the next loop.
     */
    let nextLevelNode = dummyNodeBeforeNextLevelStart;

    let current = levelStart;
    while (current) {
      if (current.left) {
        nextLevelNode.next = current.left;
        nextLevelNode = nextLevelNode.next;
      }
      if (current.right) {
        nextLevelNode.next = current.right;
        nextLevelNode = nextLevelNode.next;
      }
      current = current.next;
    }
    levelStart = dummyNodeBeforeNextLevelStart.next;
  }
  return root;
}

/**
 * If the tree is a perfect binary tree (where each node must have 2 children expect
 * the leaf nodes), the above solution can be simplified further.
 * https://leetcode.com/problems/populating-next-right-pointers-in-each-node/
 *
 */
function connectLevelNodeSiblingForPerfectBinaryTree(root) {
  let levelStart = root;
  while (levelStart) {
    let current = levelStart;
    while (current) {
      if (current.left) {
        // left node's next must be right node
        current.left.next = current.right;
      }
      if (current.right && current.next) {
        // right node's next must be next node's left
        current.right.next = current.next.left;
      }
      current = current.next;
    }
    // go to next level, because left node is always existed expect leaf node
    levelStart = levelStart.left;
  }
  return root;
}

// Test
const tree1 = buildTreeBFS([1, 2, 3, 4, 5, 6, 7]);
const result1 = connectLevelNodeSibling(tree1);
_printTreeLevelNodesWithNext(result1); // [1] [2, 3] [4, 5, 6, 7]

const tree2 = buildTreeBFS([12, 7, 1, null, 9, 10, 5]);
const result2 = connectLevelNodeSibling(tree2);
_printTreeLevelNodesWithNext(result2); // [12] [7, 1] [9, 10, 5]

const tree3 = buildTreeBFS([1, 2, 3, 4, 5, 6, 7]);
const result3 = connectLevelNodeSiblingForPerfectBinaryTree(tree3);
_printTreeLevelNodesWithNext(result3); // [1] [2, 3] [4, 5, 6, 7]

const tree4 = buildTreeBFS([12, 7, 1, null, 9, 10, 5]);
const result4 = connectLevelNodeSiblingWithConstantSpace(tree4);
_printTreeLevelNodesWithNext(result4); // [12] [7, 1] [9, 10, 5]

function _printTreeLevelNodesWithNext(root) {
  let levelStart = root;
  while (levelStart) {
    const levelValues = [];
    let current = levelStart;
    levelStart = null;
    while (current) {
      levelValues.push(current.val);
      if (!levelStart) {
        levelStart = current.left || current.right;
      }
      current = current.next;
    }
    console.log(levelValues);
  }
}
