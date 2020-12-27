/**
 *
 * Problem:
 * Given an array of numbers sorted in ascending order, find the element in the array
 * that has the minimum difference with the given key.
 *
 * Example 1:
 * Input: [4, 6, 10], key = 7
 * Output: 6
 * Explanation: The difference between the key '7' and '6' is minimum than any other
 * number in the array
 *
 * Example 2:
 * Input: [4, 6, 10], key = 4
 * Output: 4
 *
 *
 * Time: O(log n)
 * Space: O(1)
 *
 * @param {number[]} nums
 * @param {number[]} key
 * @return {number}
 */
function findMinimumDifferentElement(nums, key) {
  let start = 0;
  let end = nums.length;
  while (start < end) {
    const middle = start + Math.floor((end - start) / 2);
    if (nums[middle] >= key) {
      if (nums[middle] === key) {
        return key;
      }
      end = middle;
    } else {
      start = middle + 1;
    }
  }
  /**
   * Follow the traditional binary search method above, after getting `start`, we want
   * to check the following scenarios:
   *  * if `start` is out of range (e.g. `key` is larger than the largest number
   * in array), then the last number is the answer
   *  * if `key` is not existed, since `start` is the new inserted position, we need to
   * check its previous number and next number to see whose difference is smaller.
   *
   */
  if (start === nums.length) {
    return nums[nums.length - 1];
  }
  // if `start === 0` we treat the `prev` as -Infinity, so it won't be chosen.
  const prev = start > 0 ? nums[start - 1] : -Infinity;
  const next = nums[start];
  if (key - prev < next - key) {
    return prev;
  }
  return next;
}

// Test
console.log(findMinimumDifferentElement([4, 6, 10], 7)); // 6
console.log(findMinimumDifferentElement([4, 6, 10], 4)); // 4
console.log(findMinimumDifferentElement([4, 6, 10], 17)); // 10
console.log(findMinimumDifferentElement([4, 6, 10], 3)); // 4
console.log(findMinimumDifferentElement([1, 3, 8, 10, 15], 12)); // 10
