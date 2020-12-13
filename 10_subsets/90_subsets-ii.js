/**
 *
 * Problem:
 * Given a set of numbers that might contain duplicates, find all of its distinct
 * subsets.
 * https://leetcode.com/problems/subsets-ii/
 *
 * Example 1:
 * Input: [1, 3, 3]
 * Output: [], [1], [3], [1,3], [3,3], [1,3,3]
 *
 * Example 2:
 * Input: [1, 5, 3, 3]
 * Output: [], [1], [5], [3], [1,5], [1,3], [5,3], [1,5,3], [3,3], [1,3,3], [3,3,5],
 * [1,5,3,3]
 *
 *
 * Time:O(n 2^n)
 * Space: O(n 2^n) <- result
 *
 * @param {number[]} nums
 * @return {number[][]}
 */
function findSubsetsWithDuplicates(nums) {
  // O(n * log(n))
  nums.sort((a, b) => a - b);
  const subsets = [];
  _backtrack(nums, [], 0, subsets);
  return subsets;
}

function _backtrack(nums, curResult, startIndex, result) {
  // O(n) to copy an array
  result.push(Array.from(curResult));
  for (let i = startIndex; i < nums.length; i++) {
    /**
     * This is similar as 78_subsets problem, the only difference here is we need
     * to skip the consecutive duplicates. For example, [1, 3, 3], we first process
     * 1 and get [1], and then process the first 3 and get [1, 3], and then second 3
     * [1, 3, 3] (refer to the tree in 78_subsets), then back to [1, 3], then
     * back to [1], at this moment (`startIndex = 0` and `i = 2`), if we process i = 2
     * we will get duplicate record [1, 3], so the logic here to skip this one.
     *
     * So basically when we need to check `i` and `i - 1` when `i > startIndex`, but
     * when `i === startIndex`, we still need to process the duplicates, think about
     * [3, 3].
     *
     * Note: in order to make it work, we need to sort the array to make sure the
     * duplicates always appear together.
     */
    if (i > startIndex && nums[i] === nums[i - 1]) {
      continue;
    }
    curResult.push(nums[i]);
    _backtrack(nums, curResult, i + 1, result);
    curResult.pop();
  }
}

// Test
const result1 = findSubsetsWithDuplicates([1, 3, 3]);
result1.forEach((i) => console.log(i)); // [[], [1], [1,3], [1,3,3], [3], [3,3]]

const result2 = findSubsetsWithDuplicates([1, 5, 3, 3]);
result2.forEach((i) => console.log(i)); // [[], [1], [1,5], [1,5,3], [1,5,3,3], [1,3], [1,3,3], [5], [5,3], [5,3,3], [3], [3,3]]
