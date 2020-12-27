/**
 *
 * Problem:
 * Given a Bitonic array, find if a given 'key' is present in it. An array is considered
 * bitonic if it is monotonically increasing and then monotonically decreasing.
 * Monotonically increasing or decreasing means that for any index i in the array
 * `arr[i] != arr[i+1]`. Write a function to return the index of the 'key'. If the 'key'
 * is not present, return -1.
 *
 * Example 1:
 * Input: [1, 3, 8, 4, 3], key=4
 * Output: 3
 *
 * Example 2:
 * Input: [3, 8, 3, 1], key=8
 * Output: 1
 *
 *
 * Time: O(log n)
 * Space: O(1)
 *
 * @param {number[]} nums
 * @param {number} key
 * @return {number}
 */
function searchBitonicArray(nums, key) {
  // find the maximum in the bitonic with 162_bitonic-array-maximum
  let start = 0;
  let end = nums.length;
  while (start < end) {
    const middle = start + Math.floor((end - start) / 2);
    if (middle === nums.length - 1 || nums[middle] > nums[middle + 1]) {
      end = middle;
    } else {
      start = middle + 1;
    }
  }
  // start is the maximum value index
  const maxIndex = start;
  if (nums[maxIndex] === key) {
    return maxIndex;
  }
  if (nums[maxIndex] < key) {
    return -1;
  }
  // binary search between [0, max) - ascending
  start = 0;
  end = maxIndex;
  while (start < end) {
    const middle = start + Math.floor((end - start) / 2);
    if (nums[middle] >= key) {
      end = middle;
    } else {
      start = middle + 1;
    }
  }
  if (nums[start] === key) {
    return start;
  }
  // binary search between [max, nums.length) - descending
  start = maxIndex;
  end = nums.length;
  while (start < end) {
    const middle = start + Math.floor((end - start) / 2);
    if (nums[middle] <= key) {
      end = middle;
    } else {
      start = middle + 1;
    }
  }
  return nums[start] === key ? start : -1;
}

// Test
console.log(searchBitonicArray([1, 3, 8, 4, 3], 4)); // 3
console.log(searchBitonicArray([3, 8, 3, 1], 8)); // 1
console.log(searchBitonicArray([1, 3, 8, 12], 12)); // 3
console.log(searchBitonicArray([10, 9, 8], 10)); // 0
console.log(searchBitonicArray([10, 9, 8], 12)); // -1
