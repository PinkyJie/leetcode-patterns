/**
 *
 * Problem:
 * Given an array of unsorted numbers and a target number, find a triplet in the array
 * whose sum is as close to the target number as possible, return the sum of the triplet.
 * If there are more than one such triplet, return the sum of the triplet with the
 * smallest sum.
 * https://leetcode.com/problems/3sum-closest/
 *
 * Example 1:
 * Input: [-2, 0, 1, 2], target=2
 * Output: 1
 * Explanation: The triplet [-2, 1, 2] has the closest sum to the target.
 *
 * Example 2:
 * Input: [-3, -1, 1, 2], target=1
 * Output: 0
 * Explanation: The triplet [-3, 1, 2] has the closest sum to the target.
 *
 * Time: O(n^2) <- O(nlog(n)) + O(n^2)
 * Space: O(n) <- merge sort
 *
 * Note: similar approach as 15_3sum.js, check there for detailed explanation.
 *
 * @param {number[]} array
 * @param {number} targetSum
 * @return {number}
 */
function tripletSumCloseToTarget(array, targetSum) {
  // O(nlog(n))
  array.sort((a, b) => a - b);

  let minSum = Infinity;

  // O(n)
  for (let i = 0; i <= array.length - 3; i++) {
    let left = i + 1;
    let right = array.length - 1;

    // O(n)
    while (left < right) {
      const sum = array[i] + array[left] + array[right];
      if (sum === targetSum) {
        return targetSum;
      }
      if (sum < targetSum) {
        left++;
      } else {
        right--;
      }
      if (
        // 1st condition: find the smallest diff
        Math.abs(targetSum - sum) < Math.abs(targetSum - minSum) ||
        // 2nd condition: find the smaller one if the diff are the same
        (Math.abs(targetSum - sum) === Math.abs(targetSum - minSum) &&
          sum < targetSum)
      ) {
        minSum = sum;
      }
    }
  }

  return minSum;
}

// Test
console.log(tripletSumCloseToTarget([-2, 0, 1, 2], 2)); // 1
console.log(tripletSumCloseToTarget([-3, -1, 1, 2], 1)); // 0
