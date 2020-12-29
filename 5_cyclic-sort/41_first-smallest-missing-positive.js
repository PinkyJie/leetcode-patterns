/**
 *
 * Problem:
 * Given an unsorted array containing numbers, find the smallest missing positive
 * number in it.
 * https://leetcode.com/problems/first-missing-positive/
 *
 * Example 1:
 * Input: [-3, 1, 5, 4, 2]
 * Output: 3
 * Explanation: The smallest missing positive number is '3'
 *
 * Example 2:
 * Input: [3, -2, 0, 1, 2]
 * Output: 4
 *
 * Time: O(n)
 * Space: O(1)
 *
 * @param {number[]} nums
 * @return {number}
 */
function findSmallestMissingPositive(nums) {
  const n = nums.length;
  for (let i = 0; i < n; i++) {
    /**
     * Similar as 448_find-all-numbers-disappeared-in-an-array, the difference is
     * here we treat all numbers out of the 1~n range as invalid numbers (skip
     * them in the loop), so for the array after swap, the 1st mismatched number will
     * be the smallest positive missing number.
     */
    while (nums[i] !== i + 1) {
      if (nums[i] !== nums[nums[i] - 1] && nums[i] >= 1 && nums[i] <= n) {
        _swap(nums, i, nums[i] - 1);
      } else {
        break;
      }
    }
  }
  for (let i = 0; i < n; i++) {
    if (nums[i] !== i + 1) {
      return i + 1;
    }
  }
  // if there's no mismatched number, then n+1 would be the result
  return n + 1;
}

function _swap(array, i, j) {
  [array[i], array[j]] = [array[j], array[i]];
}

// Test
console.log(findSmallestMissingPositive([-3, 1, 5, 4, 2])); // 3
console.log(findSmallestMissingPositive([3, -2, 0, 1, 2])); // 4
