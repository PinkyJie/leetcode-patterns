const { Heap } = require('../_utils');

/**
 *
 * Problem:
 * Given an array of numbers and a number k, find the median of all the k sized
 * sub-arrays (or windows) of the array.
 * https://leetcode.com/problems/sliding-window-median/
 *
 * Example 1:
 * Input: nums=[1, 2, -1, 3, 5], k = 2
 * Output: [1.5, 0.5, 1.0, 4.0]
 * Explanation: Lets consider all windows of size 2:
 *  [1, 2, -1, 3, 5] -> median is 1.5
 *  [1, 2, -1, 3, 5] -> median is 0.5
 *  [1, 2, -1, 3, 5] -> median is 1.0
 *  [1, 2, -1, 3, 5] -> median is 4.0

 *
 * Example 2:
 * Input: nums=[1, 2, -1, 3, 5], k = 3
 * Output: [1.0, 2.0, 3.0]
 * Explanation: Lets consider all windows of size 3:
 *  [1, 2, -1, 3, 5] -> median is 1.0
 *  [1, 2, -1, 3, 5] -> median is 2.0
 *  [1, 2, -1, 3, 5] -> median is 3.0
 *
 *
 * Time: O(nk)
 * Space: O(k) <- 2 heaps
 *
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
function medianOfSlidingWindow(nums, k) {
  const smallerPart = new Heap((a, b) => a - b);
  const largerPart = new Heap((a, b) => b - a);

  const result = [];
  for (let i = 0; i < nums.length; i++) {
    // insert - O(log(k))
    if (smallerPart.size() === 0 || nums[i] <= smallerPart.peek()) {
      smallerPart.push(nums[i]);
    } else {
      largerPart.push(nums[i]);
    }

    // re-balance - O(log(k))
    _reBalanceHeaps(smallerPart, largerPart);

    if (i >= k - 1) {
      // get median
      if (smallerPart.size() === largerPart.size()) {
        result.push((smallerPart.peek() + largerPart.peek()) / 2);
      } else {
        result.push(smallerPart.peek());
      }

      // remove - O(k) removing item requires k
      if (nums[i - k + 1] <= smallerPart.peek()) {
        smallerPart.remove(nums[i - k + 1]);
      } else {
        largerPart.remove(nums[i - k + 1]);
      }
      // re-balance - O(log(k))
      _reBalanceHeaps(smallerPart, largerPart);
    }
  }
  return result;
}

function _reBalanceHeaps(smallerPart, largerPart) {
  if (smallerPart.size() < largerPart.size()) {
    smallerPart.push(largerPart.pop());
  } else if (smallerPart.size() > largerPart.size() + 1) {
    largerPart.push(smallerPart.pop());
  }
}

// Test
console.log(medianOfSlidingWindow([1, 2, -1, 3, 5], 2)); // [1.5, 0.5, 1, 4]
console.log(medianOfSlidingWindow([1, 2, -1, 3, 5], 3)); // [1, 2, 3]
