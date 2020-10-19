/**
 *
 * Problem:
 * Given an array of unsorted numbers, find all unique triplets in it that add up to zero.
 * Notice that the solution set must not contain duplicate triplets.
 * https://leetcode.com/problems/3sum/
 *
 * Example 1:
 * Input: [-3, 0, 1, 2, -1, 1, -2]
 * Output: [[-3, 1, 2], [-2, 0, 2], [-2, 1, 1], [-1, 0, 1]]
 * Explanation: There are four unique triplets whose sum is equal to zero.
 *
 * Example 2:
 * Input: [-5, 2, -1, -2, 3]
 * Output: [[-5, 2, 3], [-2, -1, 3]]
 * Explanation: There are two unique triplets whose sum is equal to zero.
 *
 * Time: O(n^2) <- O(nlog(n)) + O(n^2)
 * Space: O(n) <- merge sort
 *
 * @param {number[]} array
 * @return {number[]}
 */
function tripletSumToZero(array) {
  // edge case check: no triplets if the array length is less than 3
  if (array.length < 3) {
    return [];
  }

  /**
   * We want to convert this question to the 167_two-sum-ii-input-array-is-sorted, so
   * sort the array first, then we can loop the array, for each loop, pick the current
   * number as the first number, then find the other two numbers in the remaining array
   * (same as 167_two-sum-ii-input-array-is-sorted)
   *
   * Time: O(nlong(n)) fastest sorting
   */
  array.sort((a, b) => a - b);

  const result = [];
  // O(n)
  for (let i = 0; i <= array.length - 3; i++) {
    // If the current number is positive, it's not possible to find the triplets
    if (array[i] > 0) {
      break;
    }

    /**
     * If the current number is the same as previous one, skip it because we don't
     * want duplicate result
     */
    if (i > 0 && array[i] === array[i - 1]) {
      continue;
    }

    /**
     * Same as 167_two-sum-ii-input-array-is-sorted, the only difference is the left
     * pointer always started from `i+1`
     */
    const targetSum = -array[i];
    let left = i + 1;
    let right = array.length - 1;
    // O(n)
    while (left < right) {
      const sum = array[left] + array[right];
      if (sum === targetSum) {
        result.push([array[i], array[left], array[right]]);
        left++;
        right--;
        /**
         * This is the key logic to prevent duplicate result: once we find a match
         * in the remaining array, we should check the next left/right, if
         * they are the same as the last left/right, we should skip it to prevent
         * duplicate result.
         */
        while (left < right && array[left - 1] === array[left]) {
          left++;
        }
        while (right > left && array[right + 1] === array[right]) {
          right--;
        }
      } else if (sum > targetSum) {
        right--;
      } else {
        left++;
      }
    }
  }
  return result;
}

// Test
const result1 = tripletSumToZero([-3, 0, 1, 2, -1, 1, -2]);
// [[-3, 1, 2], [-2, 0, 2], [-2, 1, 1], [-1, 0, 1]]
result1.forEach((i) => console.log(i));
const result2 = tripletSumToZero([-5, 2, -1, -2, 3]);
result2.forEach((i) => console.log(i));
// [[-5, 2, 3], [-2, -1, 3]]
