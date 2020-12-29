/**
 *
 * Problem:
 * Follow up on the 33_search-in-rotated-sorted-array problem, how do we search in a
 * sorted and rotated array that also has duplicates? The return value should be a
 * boolean.
 * https://leetcode.com/problems/search-in-rotated-sorted-array-ii/
 *
 * Example 1:
 * Input: [3, 7, 3, 3, 3], key = 7
 * Output: true
 *
 * Example 2:
 * Input: [2, 5, 6, 0, 0, 1, 2], key = 3
 * Output: false
 *
 *
 * Time: O(n) in worst case, e.g. searching 5 in [3, 3, 3, 3, 3] => n/2, so the average
 * time complexity should be O(log n ~ 2/n) -> O(log n) ~ O(n).
 * Space: O(1)
 *
 * @param {number[]} nums
 * @param {number} key
 * @return {number}
 */
function searchRotatedArrayWithDuplicates(nums, key) {
  let start = 0;
  let end = nums.length - 1;
  while (start <= end) {
    const middle = start + Math.floor((end - start) / 2);
    if (nums[middle] === key) {
      return true;
    }
    /**
     * The only difference from problem 33_search-in-rotated-sorted-array is here.
     * Think about the [3, 7, 3, 3, 3], the 1st loop `middle = 3` and `start = 3`,
     * (`nums[start] === nums[middle]`), in this case, it's guaranteed that we also
     * have `nums[middle] === nums[end]` (otherwise the array is not rotated sorted).
     * So we can't decide which side is sorted for this scenario, all we can do is to
     * increase the `start` and decrease the `end` to shrink the search range (shrink
     * by 2).
     */
    if (nums[start] === nums[middle] && nums[end] === nums[middle]) {
      start++;
      end--;
    } else if (nums[start] <= nums[middle]) {
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
  return false;
}

// Test
console.log(searchRotatedArrayWithDuplicates([3, 7, 3, 3, 3], 7)); // true
console.log(searchRotatedArrayWithDuplicates([2, 5, 6, 0, 0, 1, 2], 3)); // false
