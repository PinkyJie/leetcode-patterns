/**
 *
 * Problem:
 * Given an array containing 0s, 1s and 2s, sort the array in-place. You should treat
 * numbers of the array as objects, hence, we can’t count 0s, 1s, and 2s to recreate the
 * array. The flag of the Netherlands consists of three colors: red, white and blue; and
 * since our input array also consists of three different numbers that is why it is called
 * Dutch National Flag problem.
 *
 * Example 1:
 * Input: [1, 0, 2, 1, 0]
 * Output: [0 0 1 1 2]
 *
 * Example 2:
 * Input: [2, 2, 0, 1, 2, 0]
 * Output: [0 0 1 2 2 2]
 *
 * Time: O(n)
 * Space: O(1)
 *
 * @param {number[]} colorArray
 * @return {number[]}
 */
function sortColors(colorArray) {
  // pointer 1: next available index for 0
  let nextIndexForZero = 0;
  // pointer 2: next available index for 2
  let nextIndexForTwo = colorArray.length - 1;
  /**
   * The target is to make sure:
   * [0, nextIndexForZero] => 0
   * (nextIndexForZero, nextIndexForTwo) => 1
   * [nextIndexForTwo, ...] => 2
   * By default, we consider all numbers occupied 1's position, the the loop variable i
   * here is correct if its value is 1.
   */
  let i = 0;
  while (i <= nextIndexForTwo) {
    if (colorArray[i] === 0) {
      /**
       * For 0, swap it to the next available index, then it's safe to do `i++` because
       * we have (i >= nextIndexForZero), the number on `nextIndexForZero` is processed
       * in the previous loop already, so it can't be 2.
       */
      _swap(colorArray, i, nextIndexForZero);
      nextIndexForZero++;
      i++;
    } else if (colorArray[i] === 2) {
      /**
       * For 2, swap it to the next available index, then we shouldn't do `i++` because
       * the number on `nextIndexForTwo` is not processed, can be 0 possibly.
       */
      _swap(colorArray, i, nextIndexForTwo);
      nextIndexForTwo--;
    } else {
      /**
       * For 1, since 1 should be in the position of [nextIndexForZero, nextIndexForTwo],
       * we already know (i >= nextIndexForZero) above and the while loop will enforce
       * (i <= nextIndexForTow), so it's okay to do `i++` without any swapping.
       */
      i++;
    }
  }

  return colorArray;
}

function _swap(array, i, j) {
  [array[i], array[j]] = [array[j], array[i]];
}

// Test
console.log(sortColors([1, 0, 2, 1, 0])); // [0 0 1 1 2]
console.log(sortColors([2, 2, 0, 1, 2, 0])); // [0 0 1 2 2 2]
