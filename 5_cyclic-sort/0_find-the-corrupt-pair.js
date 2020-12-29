/**
 *
 * Problem:
 * We are given an unsorted array containing n numbers taken from the range 1 to n.
 * The array originally contained all the numbers from 1 to n, but due to a data
 * error, one of the numbers got duplicated which also resulted in one number going
 * missing. Find both these numbers.
 *
 * Example 1:
 * Input: [3, 1, 2, 5, 2]
 * Output: [2, 4]
 * Explanation: '2' is duplicated and '4' is missing.
 *
 * Example 2:
 * Input: [3, 1, 2, 3, 6, 4]
 * Output: [3, 5]
 * Explanation: '3' is duplicated and '5' is missing.
 *
 * Time: O(n)
 * Space: O(1)
 *
 *
 * @param {number[]} nums
 * @return {number[]}
 */
function findCorruptPair(nums) {
  /**
   * Similar as 287_find-the-duplicate-number, the difference is after finding
   * the number, we can't stop the loop, we need to make sure all the other numbers
   * are being swapped to their correct positions in order to find the missing
   * number below.
   *
   */
  for (let i = 0; i < nums.length; i++) {
    while (nums[i] !== i + 1) {
      if (nums[i] !== nums[nums[i] - 1]) {
        _swap(nums, i, nums[i] - 1);
      } else {
        break;
      }
    }
  }
  /**
   * Find the missing number: after finding the duplicate number, we just need to
   * go through the array and find the number which is not on its correct position,
   * the number itself is the duplicate number, and the position itself can derive
   * the missing number;
   */
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== i + 1) {
      return [nums[i], i + 1];
    }
  }
}

function _swap(array, i, j) {
  [array[i], array[j]] = [array[j], array[i]];
}

// Test
console.log(findCorruptPair([3, 1, 2, 5, 2])); // [2, 4]
console.log(findCorruptPair([3, 1, 2, 3, 6, 4])); // [3, 5]
