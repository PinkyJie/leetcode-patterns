/**
 *
 * Problem:
 * Given an array of sorted numbers and a target sum, find a pair in the array whose sum
 * is equal to the given target. Write a function to return the indices (1-based index)
 * of the two numbers (i.e. the pair) such that they add up to the given target.
 * https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/
 *
 * Example 1:
 * Input: [1, 2, 3, 4, 6], target=6
 * Output: [2, 4]
 * Explanation: The numbers at index 2 and 4 add up to 6: 2+4=6
 *
 * Example 2:
 * Input: [2, 5, 9, 11], target=11
 * Output: [1, 3]
 * Explanation: The numbers at index 1 and 3 add up to 11: 2+9=11
 *
 * Time: O(n)
 * Space: O(1)
 *
 * @param {number[]} sortedArray
 * @param {number} targetSum
 * @return {number[]}
 */
function twoSumIIInputArrayIsSorted(sortedArray, targetSum) {
  let left = 0;
  let right = sortedArray.length - 1;

  while (left < right) {
    const sum = sortedArray[left] + sortedArray[right];
    if (sum === targetSum) {
      return [left + 1, right + 1]; // index is 1-based as requested
    }
    if (sum < targetSum) {
      left++;
    } else {
      right--;
    }
  }
  return [];
}

// Test
console.log(twoSumIIInputArrayIsSorted([1, 2, 3, 4, 6], 6)); // [2, 4]
console.log(twoSumIIInputArrayIsSorted([2, 5, 9, 11], 11)); // [1, 3]
