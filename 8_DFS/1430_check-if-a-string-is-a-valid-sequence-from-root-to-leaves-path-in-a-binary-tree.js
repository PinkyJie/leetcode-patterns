const { buildTreeBFS } = require('../_utils');

/**
 *
 * Problem:
 * Given a binary tree and a number sequence, find if the sequence is present as a
 * root-to-leaf path in the given tree.
 * https://leetcode.com/problems/check-if-a-string-is-a-valid-sequence-from-root-to-leaves-path-in-a-binary-tree/
 *
 * Example 1:
 * Input: [1, 7, 9, null, null, 2, 9], [1, 9, 9]
 * Output: true
 *
 * Example 2:
 * Input: [1, 0, 1, null, 1, 6, 5], [1, 0, 7]
 * Output: false
 *
 *
 * Time: O(n)
 * Space: O(h) <- recursion stack
 *
 * @param {TreeNode} root
 * @param {number[]} sequence
 * @return {boolean}
 */
function hasPathWithGiveSequence(root, sequence) {
  if (!root) {
    return sequence.length === 0;
  }
  return _traverse(root, sequence, 0);
}

function _traverse(node, sequence, curIndex) {
  /**
   * Similar as 112_path-sum, but here we need to check more invalid conditions:
   *  * `curIndex` can't be larger than the `sequence` length
   *  * `curIndex` of sequence must be equal to the current node value
   */
  if (!node || curIndex >= sequence.length || sequence[curIndex] !== node.val) {
    return false;
  }
  if (!node.left && !node.right) {
    /**
     * When we reach the leaf node, the sequence must also be ended, otherwise
     * it's also invalid.
     */
    return curIndex === sequence.length - 1;
  }

  return (
    _traverse(node.left, sequence, curIndex + 1) ||
    _traverse(node.right, sequence, curIndex + 1)
  );
}

// Test
const tree1 = buildTreeBFS([1, 7, 9, null, null, 2, 9]);
console.log(hasPathWithGiveSequence(tree1, [1, 9, 9])); // true

const tree2 = buildTreeBFS([1, 0, 1, null, 1, 6, 5]);
console.log(hasPathWithGiveSequence(tree2, [1, 0, 7])); // false
