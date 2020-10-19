/**
 *
 * Problem:
 * Given an array, find the length of the smallest subarray in it which when sorted
 * will sort the whole array.
 *
 * Example 1:
 * Input: [1, 2, 5, 3, 7, 10, 9, 12]
 * Output: 5
 * Explanation: We need to sort only the subarray [5, 3, 7, 10, 9] to make the whole
 * array sorted
 *
 * Example 2:
 * Input: [1, 3, 2, 0, -1, 7, 10]
 * Output: 5
 * Explanation: We need to sort only the subarray [1, 3, 2, 0, -1] to make the whole
 * array sorted
 *
 * Time: O(n)
 * Space: O(1)
 *
 * @param {number[]} array
 * @return {number}
 */
function shortestUnsortedContinuousSubarray(array) {
  let left = 0;
  let right = array.length - 1;

  // Find 1st `left` to meet left > left + 1 (unsorted)
  while (left < array.length - 1 && array[left] <= array[left + 1]) {
    left++;
  }
  // fully sorted
  if (left === array.length - 1) {
    return [];
  }

  // Find 1st `right` to meet right < right - 1 (unsorted)
  while (right > 0 && array[right] >= array[right - 1]) {
    right--;
  }

  // fully reversely sorted
  if (left === 0 && right === array.length - 1) {
    return array.length;
  }

  /**
   * Those left/right are just candidates, we need to find the min/max between
   * left and right, and then:
   *  * find the first `index1` in [0, left - 1] to meet index1 <= min
   *  * find the first `index2` in [right + 1, array.length - 1] to meet index2 >= max
   *  * `index1` and `index2` are the boundary for the subarray
   */
  let min = Infinity;
  let max = -Infinity;
  for (let i = left; i <= right; i++) {
    min = Math.min(array[i], min);
    max = Math.max(array[i], max);
  }

  /**
   * Do not use binary search below, even the search range is guaranteed to be
   * sorted, but binary search can't handle the duplicate number. For example:
   * finding 2 in [2, 2, 2, 3] will return index 0, but what we need is index 2.
   * If we want to use binary search in this scenario, consider lower_bound() and
   * upper_bound(), that is: use upper_bound() for finding `left`, use lower_bound()
   * for finding `right`.
   */

  // find min in [0, left - 1]
  while (left > 0 && array[left - 1] > min) {
    left--;
  }

  // find max in [right + 1, array.length - 1]
  while (right < array.length && array[right + 1] < max) {
    right++;
  }

  return right - left + 1;
}

// Test
console.log(shortestUnsortedContinuousSubarray([1, 2, 5, 3, 7, 10, 9, 12])); // 5
console.log(shortestUnsortedContinuousSubarray([1, 3, 2, 0, -1, 7, 10])); // 5
