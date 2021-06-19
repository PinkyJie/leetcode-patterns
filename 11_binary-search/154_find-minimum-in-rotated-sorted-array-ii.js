/**
 *
 * Problem:
 * Given an array of numbers which is sorted in ascending order and also rotated by some
 * arbitrary number, find the minimum number in the array. The given array might contain
 * duplicates.
 * https://leetcode.com/problems/find-minimum-in-rotated-sorted-array-ii/
 *
 * Example 1:
 * Input: [3, 3, 7, 3]
 * Output: 3
 *
 * Example 2:
 * Input: [2, 2, 2, 0, 1]
 * Output: 0
 *
 *
 * Time: O(n) in the worst case because we are doing `end--` for curtain condition, the
 * search range is not reduce to half. The average time complexity is O(log n) ~ O(n).
 * Space:
 *
 * @param {number[]} nums
 * @return {number}
 */
function findMinimumInRotatedArray(nums) {
  let start = 0;
  let end = nums.length - 1;
  while (start < end) {
    const middle = start + Math.floor((end - start) / 2);
    if (nums[middle] > nums[end]) {
      start = middle + 1;
    } else if (nums[middle] < nums[end]) {
      end = middle;
    } else {
      /**
       * The only difference from problem 153_find-minimum-in-rotated-sorted-array is
       * here: how to handle the case when `nums[middle] === nums[end]`? Think about
       * this examples: [3, 3, 3, 7, 3, 3] where the duplicate number itself is the
       * minimum one:
       *  * in the 1st loop, `start = 0` (value 3), `end = 5` (value 3), and
       * `middle = 2` (value 3), since the value of `end - 1` is also 3, which means
       * `end` can be excluded now since `end - 1` might be the original array head
       * (i.e. minimum number), so what we need to do is `end--`.
       *  * in the 2nd loop, `start = 0` (value 3), `end = 4` (value 3), and
       * `middle = 2` (value 3), since the value of `end - 1` is 7 which is larger than
       * the `end`, which means the current `end` is the original array head (i.e.
       * minimum number), that's why we can return `end` directly.
       *
       * Note: without this condition check here (e.g. always doing `end--` when
       * `nums[middle] === nums[end]`) can also return the minimum value, but the index
       * is not guaranteed to be the original array head.
       */
      if (nums[end - 1] > nums[end]) {
        return nums[end];
      }
      end--;
    }
  }
  return nums[start];
}

// Test
console.log(findMinimumInRotatedArray([3, 3, 7, 3])); // 3
console.log(findMinimumInRotatedArray([2, 2, 2, 0, 1])); // 0
