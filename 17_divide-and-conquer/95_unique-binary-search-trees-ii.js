const { printTreeBFS, TreeNode } = require('../_utils');

/**
 *
 * Problem:
 * Given a number n, write a function to return all structurally unique Binary Search
 * Trees (BST) that can store values 1 to n?
 *
 * Example 1:
 * Input: 2
 * Output: List containing root nodes of all structurally unique BSTs.
 * Explanation: Here are the 2 structurally unique BSTs storing all numbers from 1 to 2:
 *    1        2
 *     \      /
 *      2    1
 *
 * Example 2:
 * Input: 3
 * Output: List containing root nodes of all structurally unique BSTs.
 * Explanation: Here are the 5 structurally unique BSTs storing all numbers from 1 to 3:
 *    1        1         2         3       3
 *     \        \       / \       /       /
 *      2        3     1   3     1       2
 *       \      /                 \     /
 *        3    2                   2   1
 *
 *
 * Time: O(2^n) check analysis in 241_different-ways-to-add-parentheses
 * Space: O(2^n)
 *
 * @param {number} n
 * @return {TreeNode[]}
 */
function findUniqueBST(n) {
  if (n <= 0) {
    return [];
  }
  /**
   * Why don't we use a `memo` here to memoize the sub problems? (There will
   * definitely be duplicate sub problems when split a number range.) The reason
   * is that the memoized result will be a node object which has left and right sub
   * tree, we need to traverse the tree to clone each node which will also cost
   * O(n).
   */
  return _findUniqueBSTBetween(1, n);
}

function _findUniqueBSTBetween(start, end) {
  /**
   * Not a valid BST, because no way to split it further. The result can only
   * be a null node.
   */
  if (start > end) {
    return [null];
  }
  // only possible node is a leaf node with the number itself
  if (start === end) {
    return [new TreeNode(start)];
  }

  const result = [];
  for (let rootValue = start; rootValue <= end; rootValue++) {
    /**
     * Given `rootValue` as the root node, how many possible sub trees it can get.
     * This loop will try to use the number range from `start` to `end`, use each
     * number as root node, and try to split it to 2 parts, obviously,
     *  * range [start, rootValue - 1] will fall under left sub tree, `start` might
     * be larger than `rootValue - 1` (first loop), but it doesn't matter
     *  * range [rootValue + 1, end] will fall under right sub tree, `rootValue + 1`
     * might be larger than `end` (last loop), but it doesn't matter
     *
     * For each split, we can get all the possible sub tree roots, the sub tree
     * roots will be root node's `left` and `right`.
     */
    const leftSubTreeRoots = _findUniqueBSTBetween(start, rootValue - 1);
    const rightSubTreeRoots = _findUniqueBSTBetween(rootValue + 1, end);
    for (let i = 0; i < leftSubTreeRoots.length; i++) {
      for (let j = 0; j < rightSubTreeRoots.length; j++) {
        const root = new TreeNode(rootValue);
        root.left = leftSubTreeRoots[i];
        root.right = rightSubTreeRoots[j];
        result.push(root);
      }
    }
  }
  return result;
}

// Test
const result1 = findUniqueBST(2);
result1.forEach(printTreeBFS);
// [1, null, 2] [2, 1]
const result2 = findUniqueBST(3);
result2.forEach(printTreeBFS);
// [1, null, 2, null, 3] [1, null, 3, 2], [2, 1, 3],
// [3, 1, null, null, 2], [3, 2, null, 1]

/**
 *
 * !!WRONG SOLUTION!!
 * A backtrack approach similar as what we use in 10_subsets section, the choice is
 * to insert the unused number into BST, the revert of the choice is to remove that
 * number from the BST. However this can't detect the duplicate BST, e.g. [1,2,3],
 * when we use 2 as root node first, choosing 3 first then 1 will get the same BST
 * as choosing 1 first then 3.
 */
// eslint-disable-next-line no-unused-vars
function findUniqueBSTBacktrack(n) {
  const result = [];
  const used = new Array(n).fill(false);
  _backtrack(n, null, used, result);
  return result;
}

function _backtrack(n, root, used, result) {
  const allUsed = used.every((item) => item === true);
  if (allUsed) {
    result.push(_cloneNode(root));
    return;
  }
  for (let i = 0; i < n; i++) {
    if (used[i]) {
      continue;
    }
    used[i] = true;
    root = _insertToBST(root, i + 1);
    _backtrack(n, root, used, result);
    root = _deleteFromBST(root, i + 1);
    used[i] = false;
  }
}

function _insertToBST(node, value) {
  if (!node) {
    return new TreeNode(value);
  }
  if (value < node.val) {
    node.left = _insertToBST(node.left, value);
  } else {
    node.right = _insertToBST(node.right, value);
  }
  return node;
}

function _deleteFromBST(node, value) {
  if (!node) {
    return null;
  }
  if (value < node.val) {
    node.left = _deleteFromBST(node.left, value);
    return node;
  }
  if (value > node.val) {
    node.right = _deleteFromBST(node.right, value);
    return node;
  }

  if (!node.left) {
    return node.right;
  }
  if (!node.right) {
    return node.left;
  }

  const largestNodeInLeftSubTree = _findRightMostNode(node.left);
  node.left = _deleteFromBST(node.left, largestNodeInLeftSubTree.val);
  node.val = largestNodeInLeftSubTree.val;
  return node;
}

function _findRightMostNode(node) {
  while (node.right) {
    node = node.right;
  }
  return node;
}

function _cloneNode(node) {
  const clonedNode = new TreeNode(node.val);
  if (node.left) {
    clonedNode.left = _cloneNode(node.left);
  }
  if (node.right) {
    clonedNode.right = _cloneNode(node.right);
  }
  return clonedNode;
}
