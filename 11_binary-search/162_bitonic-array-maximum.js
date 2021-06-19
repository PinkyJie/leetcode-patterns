/**
 *
 * Problem:
 * Find the maximum index in a given Bitonic array. An array is considered bitonic if it
 * is monotonically increasing and then monotonically decreasing. Monotonically
 * increasing or decreasing means that for any index i in the array `arr[i] != arr[i+1]`.
 * https://leetcode.com/problems/find-peak-element/
 *
 * Example 1:
 * Input: [1, 3, 8, 12, 4, 2]
 * Output: 3
 * Explanation: The maximum number in the input bitonic array is '12'.
 *
 * Example 2:
 * Input: [3, 8, 3, 1]
 * Output: 1
 *
 *
 * Time: O(log n)
 * Space: O(1)
 *
 * @param {number[]} nums
 * @return {number}
 */
function findBitonicArrayMaximum(nums) {
  let start = 0;
  let end = nums.length;
  while (start < end) {
    const middle = start + Math.floor((end - start) / 2);
    /**
     * We are trying to find the 1st element who is larger than its next, that is,
     * the smallest index whose value is larger than its next. For binary search,
     * if the `middle` is larger than its next, then we need to continue search in the
     * left part (i.e. to change `end`), that's why we use
     * `nums[middle] > nums[middle + 1]` below. Also remember that the binary search
     * will return `start` as the smallest index which can make the "end change
     * condition" true, that's exactly what we are looking for.
     *
     * Note: we need to cater a special condition here: if `middle` is the last index
     * we should also change `end` because there's no next element, or we can consider
     * the next element is -Infinity.
     */
    if (middle === nums.length - 1 || nums[middle] > nums[middle + 1]) {
      end = middle;
    } else {
      start = middle + 1;
    }
  }
  /**
   * `start` won't be `nums.length` because when `middle` is the last element above,
   * we change `end` directly, that will guarantee `middle + 1 (nums.length)` won't
   * be a valid candidate for the final `start`, that's why we don't need to check
   * `start === nums.length ? start - 1 : start` here.
   */
  return start;
}

// Test
console.log(findBitonicArrayMaximum([1, 3, 8, 12, 4, 2])); // 3
console.log(findBitonicArrayMaximum([3, 8, 3, 1])); // 1
console.log(findBitonicArrayMaximum([1, 3, 8, 12])); // 3
console.log(findBitonicArrayMaximum([10, 9, 8])); // 0
