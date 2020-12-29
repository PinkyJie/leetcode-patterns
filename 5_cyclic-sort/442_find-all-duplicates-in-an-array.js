/**
 *
 * Problem:
 * We are given an unsorted array containing n numbers taken from the range 1 to n.
 * The array has some numbers appearing twice, find all these duplicate numbers
 * without using any extra space.
 * https://leetcode.com/problems/find-all-duplicates-in-an-array/
 *
 * Example 1:
 * Input: [3, 4, 4, 5, 5]
 * Output: [4, 5]
 *
 * Example 2:
 * Input: [5, 4, 7, 2, 3, 5, 3]
 * Output: [3, 5]
 *
 * Time: O(n)
 * Space: O(1)
 *
 * @param {number[]} nums
 * @return {number[]}
 */
function findAllDuplicateNumbers(nums) {
  for (let i = 0; i < nums.length; i++) {
    /**
     * Similar as 287_find-the-duplicate-number, instead of returning the number
     * directly when the two indices being swapped have the same value, here we
     * push the number into a result array. Note: we can't push the number to the
     * result array in the while loop (e.g. push to result when same value is
     * encountered before swap), cause that might push the same number multiple
     * times, think about this example: [4,3,2,7,8,2,3,1], the result will be
     * [3,3,2] if we do push in the while loop.
     */
    while (nums[i] !== i + 1 && nums[nums[i] - 1] !== nums[i]) {
      _swap(nums, i, nums[i] - 1);
    }
  }
  const result = [];
  // doing this in a separate loop to prevent duplication in the result array
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== i + 1) {
      result.push(nums[i]);
    }
  }
  return result;
}

function _swap(array, i, j) {
  [array[i], array[j]] = [array[j], array[i]];
}

// Test
console.log(findAllDuplicateNumbers([3, 4, 4, 5, 5])); // [4, 5]
console.log(findAllDuplicateNumbers([5, 4, 7, 2, 3, 5, 3])); // [3, 5]
