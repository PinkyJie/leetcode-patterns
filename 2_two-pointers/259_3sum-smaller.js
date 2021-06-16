/**
 *
 * Problem:
 * Given an array arr of unsorted numbers and a target sum, count all triplets in it such
 * that arr[i] + arr[j] + arr[k] < target where i, j, and k are three different indices.
 * Write a function to return the count of such triplets.
 * https://leetcode.com/problems/3sum-smaller/ (subscription)
 *
 * Example 1:
 * Input: [-1, 0, 2, 3], target=3
 * Output: 2
 * Explanation: There are two triplets whose sum is less than the target: [-1, 0, 3],
 * [-1, 0, 2]
 *
 * Example 2:
 * Input: [-1, 4, 2, 1, 3], target=5
 * Output: 4
 * Explanation: There are four triplets whose sum is less than the target: [-1, 1, 4],
 * [-1, 1, 3], [-1, 1, 2], [-1, 2, 3]
 *
 * Time: O(n^2) <- O(nlog(n)) + O(n^2)
 * Space: O(n) <- merge sort
 *
 * Note: similar as 15_3sum.js, check there for detailed explanation.
 *
 * @param {number[]} array
 * @param {number} target
 * @return {number}
 */
function tripletsCountWithSmallerSum(array, target) {
  // O(nlog(n))
  array.sort((a, b) => a - b);

  let count = 0;

  // O(n)
  for (let i = 0; i <= array.length - 3; i++) {
    let left = i + 1;
    let right = array.length - 1;

    // O(n)
    while (left < right) {
      const sum = array[i] + array[left] + array[right];
      if (sum < target) {
        /**
         * If a valid sum is found, since the array is ordered, this `left` can be paired
         * with all numbers between `left`(exclusive) and `right`(inclusive).
         * Example: [-1, 1, 2, 3, 4] with target 5, first loop with i = 0, array[i] = -1,
         * left = 1, right 4, the sum = 4 < 5, so (1,2) (1,3) (1,4) are all valid.
         */
        count += right - left;
        /**
         * After that we still need to move on to see if the valid pair with the next
         * `left`. Use the above example, we need to do `left++` here so we can consider
         * left = 2, right = 4, cause (2,3) is also a valid pair.
         */
        left++;
      } else {
        right--;
      }
    }
  }
  return count;
}

// Test
console.log(tripletsCountWithSmallerSum([-1, 0, 2, 3], 3)); // 2
console.log(tripletsCountWithSmallerSum([-1, 4, 2, 1, 3], 5)); // 4
