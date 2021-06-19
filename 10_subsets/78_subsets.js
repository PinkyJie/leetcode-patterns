/**
 *
 * Problem:
 * Given a set with distinct elements, find all of its distinct subsets.
 * https://leetcode.com/problems/subsets/
 *
 * Example 1:
 * Input: [1, 3]
 * Output: [], [1], [3], [1,3]
 *
 * Example 2:
 * Input: [1, 5, 3]
 * Output: [], [1], [5], [3], [1,5], [1,3], [5,3], [1,5,3]
 *
 *
 * Time: O(n 2^n)
 * Space: O(n 2^n) <- result
 *
 * @param {number[]} nums
 * @return {number[][]}
 */
function findSubsets(nums) {
  const subsets = [[]];
  /**
   * This is like a BFS, starting form an empty [] in the final subsets, for each
   * number, we concat the number with all the items in the subsets. If we think
   * the whole process as a tree, the constructing of the final subsets is like
   * BFS of the tree.
   *
   *                                     []
   *                           /                 \
   *  processing 1            []                 [1]
   *                     /         \         /         \
   *  processing 5      []         [5]      [1]       [1,5]
   *                   / \        /   \     / \        /   \
   *  processing 3   []   [3]   [5]  [5,3] [1] [1,5] [1,5] [1,5,3]
   *
   * We can also notice the total time complexity is O(2^n), cause the processing of
   * each number will increase the result sets double.
   *
   */
  for (let i = 0; i < nums.length; i++) {
    const curLength = subsets.length;
    for (let j = 0; j < curLength; j++) {
      // O(n) for concat because a new array is constructed
      subsets.push(subsets[j].concat(nums[i]));
    }
  }
  return subsets;
}

/**
 * A more general solution with backtracking, if we think the whole process as
 * a tree, the constructing of the subsets is like DFS of the tree.
 *
 *
 *                                   []
 *                      /             |            \
 *                    [1]            [5]           [3]
 *                  /     \           |
 *                [1,5]   [1,3]     [5,3]
 *                  |
 *               [1,5,3]
 *
 * Each edge of the above tree represents a decision, the tree can be treated
 * as a decision tree:
 *  * starting from the empty [], the options we can choose for next is 1, 5, 3
 * which are represented as 3 branches
 *  * if we choose 1 as next (1st branch [1]), the remaining options are 5, 3
 *  * if we choose 5 ([1, 5]), the only next option is 3
 *  * the same decision can be applied to 2nd branch and 3rd branch, for 3rd
 * branch, after choose 3, no option left because 3 is the last number
 *
 * The reason why this is like DFS is: after choosing 1 at level 1, it keeps going
 * down towards that branch until reaching [1, 5, 3], then no options left, it goes
 * up to the parent [1, 5], since 3 is already chosen, no options left, then it goes
 * up to [1], since 5 is chosen, 3 is still available, that's why it goes to [1, 3].
 */
function findSubsetsBacktrack(nums) {
  const subsets = [];
  _backtrack(nums, [], 0, subsets);
  return subsets;
}

function _backtrack(nums, curList, startIndex, result) {
  // O(n) to copy an array
  result.push(Array.from(curList));
  for (let i = startIndex; i < nums.length; i++) {
    // make decision
    curList.push(nums[i]);
    _backtrack(nums, curList, i + 1, result);
    /**
     * The tricky part of understanding this is to think through when is the first
     * pop() happened, take [1, 5, 3] as an example, when `i + 1 === nums.length`,
     * (i = 2), `_backtrack()` will return immediately (after pushing to `result`),
     * then pop() runs. At this moment, `startIndex = 2` and `i = 2`, after pop()
     * `curList = [1, 5]`, the backtrack() call for `startIndex = 2` will end
     * (because the for loop ends), the recursion goes back to its parent call
     * (startIndex = 1, i = 1), then 2nd pop() runs, after that `curList = [1]`
     * and `startIndex = 1` and `i = 2`, then `curList` will be [1, 3]. So the first
     * 2 pop() happen together, the tree traverse from level 3 to level 1.
     */
    // revoke decision
    curList.pop();
  }
}

// Test
const result1 = findSubsets([1, 3]);
result1.forEach((i) => console.log(i)); // [[], [1], [3] [1, 3]]

const result2 = findSubsets([1, 5, 3]);
result2.forEach((i) => console.log(i)); // [[], [1], [5], [1,5], [3], [1,3], [5,3], [1,5,3]]

const result3 = findSubsetsBacktrack([1, 5, 3]);
result3.forEach((i) => console.log(i)); // [[], [1], [1, 5], [1, 5, 3], [1,3], [5], [5,3], [3]]
