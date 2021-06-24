/**
 *
 * Problem:
 * We are given an array containing positive and negative numbers. Suppose the array
 * contains a number M at a particular index. Now, if M is positive we will move
 * forward M indices and if M is negative move backwards M indices. You should
 * assume that the array is circular which means two things:
 *  1. If, while moving forward, we reach the end of the array, we will jump to the
 * first element to continue the movement.
 *  2. If, while moving backward, we reach the beginning of the array, we will jump
 * to the last element to continue the movement.
 *
 * Write a method to determine if the array has a cycle. The cycle should have more
 * than one element and should follow one direction which means the cycle should not
 * contain both forward and backward movements.
 * https://leetcode.com/problems/circular-array-loop/
 *
 * Example 1:
 * Input: [1, 2, -1, 2, 2]
 * Output: true
 * Explanation: The array has a cycle among indices: 0 -> 1 -> 3 -> 0
 *
 * Example 2:
 * Input: [2, 2, -1, 2]
 * Output: true
 * Explanation: The array has a cycle among indices: 1 -> 3 -> 1
 *
 * Time: O(n^2)
 * Space: O(1)
 *
 * @param {number[]} array
 * @return {boolean}
 */
function hasLoopInCircularArray(array) {
  // return false directly for empty array or single number array
  if (array.length <= 1) {
    return false;
  }
  // every number can be the start of the cycle, try to find a cycle below
  for (let i = 0; i < array.length; i++) {
    // 0 definitely is not the start of the cycle
    if (array[i] === 0) {
      continue;
    }

    let slowIndex = i;
    let fastIndex = i;

    while (true) {
      /**
       * Just the traditional slow/fast pointer approach, the only difference here
       * is that we need to check if the direction is consistent, e.g. we can not
       * do "forward" first and then "backward", or vice versa. So here we check the
       * current direction (`array[i]`) and next direction (`array[slowIndex]` or
       * `array[fastIndex]`), if they have different sign symbol (product < 0), then
       * the direction is different.
       */
      slowIndex = _getNextIndex(array, slowIndex);
      // direction is not consistent, `i` can't be start of the cycle
      if (array[slowIndex] * array[i] < 0) {
        break;
      }
      fastIndex = _getNextIndex(array, fastIndex);
      // direction is not consistent, `i` can't be start of the cycle
      if (array[fastIndex] * array[i] < 0) {
        break;
      }
      fastIndex = _getNextIndex(array, fastIndex);
      // direction is not consistent, `i` can't be start of the cycle
      if (array[fastIndex] * array[i] < 0) {
        break;
      }
      if (slowIndex === fastIndex) {
        /**
         * Even if a cycle is found, we need to make sure the cycle length
         * is larger than one, consider this example [-1, 2]
         */
        if (slowIndex === _getNextIndex(array, slowIndex)) {
          break;
        }
        return true;
      }
    }
  }
  return false;
}

/**
 * Get the next index based on the `currentIndex`.
 */
function _getNextIndex(array, currentIndex) {
  const step = array[currentIndex];
  let nextIndex = currentIndex + step;
  if (nextIndex < 0) {
    nextIndex = (nextIndex % array.length) + array.length;
  } else if (nextIndex >= array.length) {
    nextIndex = nextIndex % array.length;
  }
  return nextIndex;
}

// Test
console.log(hasLoopInCircularArray([1, 2, -1, 2, 2])); // true
console.log(hasLoopInCircularArray([2, 2, -1, 2])); // true
console.log(hasLoopInCircularArray([2, 1, -1, -2])); // false
