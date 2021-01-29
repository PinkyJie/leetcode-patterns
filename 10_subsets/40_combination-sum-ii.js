/**
 *
 * Problem:
 * Given a collection of candidate numbers (`candidates`) and a target number
 * (`target`), find all unique combinations in `candidates` where the candidate numbers
 * sum to `target`. Each number in `candidates` may only be used once in the combination.
 * Note: The solution set must not contain duplicate combinations.
 * https://leetcode.com/problems/combination-sum-ii/
 *
 * Example 1:
 * Input: candidates = [10,1,2,7,6,1,5], target = 8
 * Output:
 * [
 *   [1,1,6],
 *   [1,2,5],
 *   [1,7],
 *   [2,6]
 * ]
 *
 * Example 2:
 * Input: candidates = [2,5,2,1,2], target = 5
 * Output:
 * [
 *   [1,2,2],
 *   [5]
 * ]
 *
 *
 * Time: O(n 2^n)
 * Space: O(2^n) <- result
 *
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
function combinationSum2(candidates, target) {
  // O(n * log(n))
  candidates.sort((a, b) => a - b);
  const combinations = [];
  _backtrack(candidates, target, 0, [], combinations);
  return combinations;
}

/**
 *
 * @param {number[]} candidates
 * @param {number} target
 * @param {number} currentIndex
 * @param {number[]} currentArr
 * @param {number[][]} combinations
 */
function _backtrack(
  candidates,
  target,
  currentIndex,
  currentArr,
  combinations
) {
  /**
   * Similar to the problem 90_subset-ii, the only difference here is for all
   * the combinations we need to check their sum against this `target`, only
   * push it to the final result when the sum is equal to `target`.
   */
  if (target === 0) {
    // O(n) to copy an array
    combinations.push(Array.from(currentArr));
    return;
  }
  if (target < 0) {
    return;
  }
  for (let i = currentIndex; i < candidates.length; i++) {
    if (i > currentIndex && candidates[i] === candidates[i - 1]) {
      continue;
    }
    currentArr.push(candidates[i]);
    _backtrack(
      candidates,
      target - candidates[i],
      i + 1,
      currentArr,
      combinations
    );
    currentArr.pop();
  }
}

// Test
console.log(combinationSum2([10, 1, 2, 7, 6, 1, 5], 8));
// [ [1,1,6], [1,2,5], [1,7], [2,6] ]
console.log(combinationSum2([2, 5, 2, 1, 2], 5));
// [ [1,2,2], [5] ]
