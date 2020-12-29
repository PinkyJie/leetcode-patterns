/**
 *
 * Problem:
 * We are given an unsorted array containing numbers taken from the range 1 to n.
 * The array can have duplicates, which means some numbers will be missing. Find all
 * those missing numbers.
 * https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/
 *
 * Example 1:
 * Input: [2, 3, 1, 8, 2, 3, 5, 1]
 * Output: 4, 6, 7
 * Explanation: The array should have all numbers from 1 to 8, due to duplicates 4,
 * 6, and 7 are missing.
 *
 * Example 2:
 * Input: [2, 4, 1, 2]
 * Output: 3
 *
 * Time: O(n)
 * Space: O(1)
 *
 * @param {number[]} nums
 * @return {number[]}
 */
function findAllMissingNumbers(nums) {
  for (let i = 0; i < nums.length; i++) {
    /**
     * Still similar as 0_cyclic-sort, but because we might have duplicates,
     * so when swapping, the 2 positions might have the same number, if that
     * happens, this index's corresponding number is missing, we should skip
     * that index.
     */
    while (nums[i] !== i + 1 && nums[i] !== nums[nums[i] - 1]) {
      _swap(nums, i, nums[i] - 1);
    }
  }
  const result = [];
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== i + 1) {
      result.push(i + 1);
    }
  }
  return result;
}

function _swap(array, i, j) {
  [array[i], array[j]] = [array[j], array[i]];
}

// Test
console.log(findAllMissingNumbers([2, 3, 1, 8, 2, 3, 5, 1])); // [4, 6, 7]
console.log(findAllMissingNumbers([2, 4, 1, 2])); // [3]
