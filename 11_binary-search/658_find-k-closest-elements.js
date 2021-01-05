/**
 *
 * Problem:
 * Given a sorted number array and two integers K and X, find K closest numbers to
 * X in the array. Return the numbers in the sorted order. X is not necessarily
 * present in the array. The result should also be sorted in ascending order.
 * https://leetcode.com/problems/find-k-closest-elements/
 *
 * Example 1:
 * Input: [5, 6, 7, 8, 9], K = 3, X = 7
 * Output: [6, 7, 8]
 *
 * Example 2:
 * Input: [2, 4, 5, 6, 9], K = 3, X = 6
 * Output: [4, 5, 6]
 *
 *
 * Time: O(log(n - k))
 * Space: O(k) <- result
 *
 * @param {number[]} nums
 * @param {number} k
 * @param {number} x
 * @return {number[]}
 */
function findKClosestElements(nums, k, x) {
  /**
   * First of all, since the original array is sorted, so the result k numbers must
   * be consecutive, so to find these k numbers, actually we just need to find the
   * start of these k numbers. So the problem becomes finding a number in a sorted
   * array, it's obvious binary search can be applied somehow, but what should be the
   * condition? Think about the following scenarios:
   * 1. --- x --- nums[middle] --- --- nums[middle + k] ---
   * 2. --- nums[middle] --- x --- --- nums[middle + k] ---
   * 3. --- nums[middle] --- --- x --- nums[middle + k] ---
   * 4. --- nums[middle] --- --- nums[middle + k] --- x ---
   * These 4 scenarios cover all the possibility of the relationships between `x`,
   * `nums[middle]` and `nums[middle + k]`, the ideal case is `x` should fall in the
   * middle of this `nums[middle] ~ nums[middle + k]` window. To find this ideal
   * `middle`, how should we move this window?
   * 1. x is less than both of them, and we have
   * `x - nums[middle] < nums[middle + k ] - x`, we need to move the window left
   * 2. x is in the middle, and we have
   * `x - nums[middle] < nums[middle + k ] - x`, we need to move the window left
   * 3. x is in the middle, and we have
   * `x - nums[middle] > nums[middle + k ] - x`, we need to move the window right
   * 4. x is larger than both of them, and we have
   * `x - nums[middle] > nums[middle + k ] - x`, we need to move the window right
   * So we can follow the above intuition to construct our binary search, moving
   * left means `end = middle`, moving right move `start = middle + 1`.
   */
  let start = 0;
  // the last possible "k window" start position (not included)
  let end = nums.length - k;
  while (start < end) {
    const middle = start + Math.floor((end - start) / 2);
    /**
     * Can we return `nums.slice(middle, middle + k)` directly if
     * `x - nums[middle] <= nums[middle + k] - x`? The answer is NO! Remember this
     * style of writing binary search will return the smallest index which meets
     * the "end change condition", this is useful if there are duplicate numbers.
     * For this problem specifically, consider example [... 3,3,4,7,7...] with
     * k = 3 and x = 5, [3,4,7] will be the 1st match (which makes the `middle` is
     * exactly in the middle of the window), but it's not the correct answer, we
     * still need to move left to check if the `middle - 1` is also 3 (it is in
     * this case), [3,3,4] is the correct answer.
     */
    if (x - nums[middle] <= nums[middle + k] - x) {
      end = middle;
    } else {
      start = middle + 1;
    }
  }
  return nums.slice(start, start + k);
}

// Test
console.log(findKClosestElements([5, 6, 7, 8, 9], 3, 7)); // [6, 7, 8]
console.log(findKClosestElements([2, 4, 5, 6, 9], 3, 6)); // [4, 5, 6]
