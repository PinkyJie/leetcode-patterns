/**
 *
 * Problem:
 * Given an array of numbers sorted in ascending order, find the range of a given
 * number "key". The range of the "key" will be the first and last position of the
 * "key" in the array. Write a function to return the range of the "key". If the
 * "key" is not present return [-1, -1].
 *
 * Example 1:
 * Input: [4, 6, 6, 6, 9], key = 6
 * Output: [1, 3]
 *
 * Example 2:
 * Input: [1, 3, 8, 10, 15], key = 12
 * Output: [-1, -1]
 *
 *
 * Time: O(log n)
 * Space: O(1)
 *
 * @param {number[]} nums
 * @param {number} key
 * @return {number[]}
 */
function findNumberRange(nums, key) {
  let start1 = 0;
  let end1 = nums.length;
  while (start1 < end1) {
    const middle1 = start1 + Math.floor((end1 - start1) / 2);
    if (nums[middle1] >= key) {
      end1 = middle1;
    } else {
      start1 = middle1 + 1;
    }
  }
  /**
   * `start1` is the smallest index which can satisfy `nums[middle1] >= key`, e.g.
   * the first position of the `key`. If it's not equal to key, which means the `key`
   * is not existed.
   */
  if (nums[start1] !== key) {
    return [-1, -1];
  }
  /**
   * If the next index of `start1` is not equal to `key`, which mean `key` is unique
   * in the array, we can return directly.
   */
  if (nums[start1 + 1] !== key) {
    return [start1, start1];
  }

  let start2 = 0;
  let end2 = nums.length;
  while (start2 < end2) {
    const middle2 = start2 + Math.floor((end2 - start2) / 2);
    if (nums[middle2] > key) {
      end2 = middle2;
    } else {
      start2 = middle2 + 1;
    }
  }
  /**
   * `start2` is the smallest index which can satisfy `nums[middle2] > key`, e.g.
   * the first position which is greater than `key`, so `start2 - 1` is the last
   * position of the `key`.
   */
  return [start1, start2 - 1];
}

// Test
console.log(findNumberRange([4, 6, 6, 6, 9], 6)); // [1, 3]
console.log(findNumberRange([1, 3, 8, 10, 15], 12)); // [-1, -1]
console.log(findNumberRange([1, 3, 8, 10, 15], 10)); // [3, 3]
