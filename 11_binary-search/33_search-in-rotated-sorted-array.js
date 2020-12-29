/**
 *
 * Problem:
 * Given an array of numbers which is sorted in ascending order and also rotated by some
 * arbitrary number, find if a given 'key' is present in it. Write a function to return
 * the index of the 'key' in the rotated array. If the 'key' is not present, return -1.
 * You can assume that the given array does not have any duplicates.
 * https://leetcode.com/problems/search-in-rotated-sorted-array/
 *
 * Example 1:
 * Input: [10, 15, 1, 3, 8], key = 15
 * Output: 1
 * Explanation: '15' is present in the array at index '1'.
 *
 * Example 2:
 * Input: [4, 5, 7, 9, 10, -1, 2], key = 10
 * Output: 4
 * Explanation: '10' is present in the array at index '4'.
 *
 *
 * Time: O(log n)
 * Space: O(1)
 *
 * @param {number[]} nums
 * @param {number} key
 * @return {number}
 */
function searchRotatedArray(nums, key) {
  let start = 0;
  /**
   * Why not `end = nums.length` and `start < end`? Because in the loop we need to
   * use the value `nums[end]`, we need to make sure `end` is always a valid index,
   * otherwise additional check is required.
   */
  let end = nums.length - 1;
  while (start <= end) {
    const middle = start + Math.floor((end - start) / 2);
    if (nums[middle] === key) {
      return middle;
    }
    /**
     * The trick part is here, how to always split the search range into 2 sections
     * with the rotated array? The core logic here is to compare the `middle` value
     * with the `start` value:
     *  * if `middle` value is bigger, then at least [start, middle] part is sorted,
     * so we can quickly check if `key` falls in this section, if so, change `end`,
     * otherwise change `start` because key is in the other section.
     *  * otherwise if `middle` value is smaller, then obviously [middle, end] is
     * sorted, so similarly we check if `key` falls in the sorted section and change
     * `start/end` accordingly.
     */
    if (nums[middle] >= nums[start]) {
      // [start, middle] is sorted
      if (key >= nums[start] && key < nums[middle]) {
        end = middle - 1;
      } else {
        start = middle + 1;
      }
    } else {
      // [middle, end] is sorted
      if (key > nums[middle] && key <= nums[end]) {
        start = middle + 1;
      } else {
        end = middle - 1;
      }
    }
  }
  return -1;
}

// Test
console.log(searchRotatedArray([10, 15, 1, 3, 8], 15)); // 1
console.log(searchRotatedArray([10, 15, 1, 3, 8], 8)); // 4
console.log(searchRotatedArray([10, 15, 1, 3, 8], 17)); // -1
console.log(searchRotatedArray([10, 15, 1, 3, 8], 5)); // -1
console.log(searchRotatedArray([4, 5, 7, 9, 10, -1, 2], 10)); // 4
