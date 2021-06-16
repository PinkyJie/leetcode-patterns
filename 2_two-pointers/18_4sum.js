/**
 *
 * Problem:
 * Given an array of unsorted numbers and a target number, find all unique quadruplets in
 * it, whose sum is equal to the target number. Notice that the solution set must not
 * contain duplicate quadruplets.
 * https://leetcode.com/problems/4sum/
 *
 * Example 1:
 * Input: [4, 1, 2, -1, 1, -3], target=1
 * Output: [[-3, -1, 1, 4], [-3, 1, 1, 2]]
 * Explanation: Both the quadruplets add up to the target.
 *
 * Example 2:
 * Input: [2, 0, -1, 1, -2, 2], target=2
 * Output: [[-2, 0, 2, 2], [-1, 0, 1, 2]]
 * Explanation: Both the quadruplets add up to the target.
 *
 * Time: O(n^3) <- O(nlog(n)) + O(n^3)
 * Space: O(n) <- merge sort
 *
 * Note: similar as 15_3sum.js, check the detailed explanation there.
 *
 * @param {number[]} array
 * @param {number} targetSum
 * @return {number[][]}
 */
function quadrupleSumToTarget(array, targetSum) {
  // O(nlog(n))
  array.sort((a, b) => a - b);

  const result = [];

  // O(n)
  for (let i = 0; i <= array.length - 4; i++) {
    if (i > 0 && array[i] === array[i - 1]) {
      continue;
    }

    // O(n)
    for (let j = i + 1; j <= array.length - 3; j++) {
      /**
       * Can't use `j > 0` here, because j is always larger than 0, what we want to
       * skip is when j is at least at its 2nd position (1st position is i + 1)
       */
      if (j > i + 1 && array[j] === array[j - 1]) {
        continue;
      }

      let left = j + 1;
      let right = array.length - 1;

      // O(n)
      while (left < right) {
        const num1 = array[left];
        const num2 = array[right];
        const sum = array[i] + array[j] + num1 + num2;
        if (sum === targetSum) {
          result.push([array[i], array[j], array[left], array[right]]);
          left++;
          right--;
          while (left < right && array[left] === num1) {
            left++;
          }
          while (left < right && array[right] === num2) {
            right--;
          }
        } else if (sum < targetSum) {
          while (left < right && array[left] === num1) {
            left++;
          }
        } else {
          while (left < right && array[right] === num2) {
            right--;
          }
        }
      }
    }
  }

  return result;
}

// Test
const result1 = quadrupleSumToTarget([4, 1, 2, -1, 1, -3], 1);
// [[-3, -1, 1, 4], [-3, 1, 1, 2]]
result1.forEach((i) => console.log(i));
const result2 = quadrupleSumToTarget([2, 0, -1, 1, -2, 2], 2);
// [[-2, 0, 2, 2], [-1, 0, 1, 2]]
result2.forEach((i) => console.log(i));
