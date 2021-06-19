/**
 *
 * Problem:
 * Given an array of numbers which is sorted in ascending order and also rotated by some
 * arbitrary number, find the minimum number in the array. You can assume that the given
 * array does not have any duplicates.
 * https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/
 *
 * Example 1:
 * Input: [10, 15, 1, 3, 8]
 * Output: 1
 *
 * Example 2:
 * Input: [4, 5, 7, 9, 10, -1, 2]
 * Output: -1
 *
 *
 * Time:
 * Space:
 *
 * @param {number[]} nums
 * @return {number}
 */
function findMinimumInRotatedArray(nums) {
  let start = 0;
  // we need to use `nums.length - 1` because we access `nums[end]` in the loop
  let end = nums.length - 1;
  // we need to sue `start < end` because we use `end = middle` in the loop
  while (start < end) {
    const middle = start + Math.floor((end - start) / 2);
    if (nums[middle] > nums[end]) {
      /**
       * [middle, end] is not sorted, so the minimum number must fall in the right part.
       * Why `middle + 1` here? Because `nums[middle] > nums[end]`, so `middle` is not
       * possible to be the minimum (at least it's larger than `end`).
       */
      start = middle + 1;
    } else {
      /**
       * Why `end = middle` here? Because when `nums[middle] <= nums[end]`, this part
       * is sorted, so `middle` is still a possible candidate for the minimum number.
       */
      end = middle;
    }
  }
  /**
   * Can the final value of `start` out of range (i.e. `start === nums.length`)? It's
   * not possible here cause the initial value of `end` is `nums.length - 1` and the loop
   * condition is `while (start < end)`.
   */
  return nums[start];
}

// Test
console.log(findMinimumInRotatedArray([10, 15, 1, 3, 8])); // 1
console.log(findMinimumInRotatedArray([4, 5, 7, 9, 10, -1, 2])); // -1
