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
  // every number can be the start of the cycle
  for (let i = 0; i < array.length; i++) {
    let slowIndex = i;
    let fastIndex = i;
    let isForward = array[i] > 0;

    while (true) {
      slowIndex = _getNextIndex(array, slowIndex, isForward);
      // direction is not consistent, `i` can't be start of the cycle
      if (slowIndex === -1) {
        break;
      }
      fastIndex = _getNextIndex(array, fastIndex, isForward);
      // direction is not consistent, `i` can't be start of the cycle
      if (fastIndex === -1) {
        break;
      }
      fastIndex = _getNextIndex(array, fastIndex, isForward);
      // direction is not consistent, `i` can't be start of the cycle
      if (fastIndex === -1) {
        break;
      }
      if (slowIndex === fastIndex) {
        /**
         * Even if a cycle is found, we need to make sure the cycle length
         * is larger than one.
         */
        if (slowIndex === _getNextIndex(array, slowIndex, isForward)) {
          break;
        }
        return true;
      }
    }
  }
  return false;
}

/**
 * Get the next index based on the `currentIndex`, `isForward` here is to check if
 * the next direction is the same as the current direction, if not, return -1.
 */
function _getNextIndex(array, currentIndex, isForward) {
  const step = array[currentIndex];
  if (isForward !== null && step > 0 !== isForward) {
    return -1;
  }
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
