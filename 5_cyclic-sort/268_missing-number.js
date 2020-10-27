/**
 *
 * Problem:
 * We are given an array containing n distinct numbers taken from the range 0 to
 * n. Since the array has only n numbers out of the total n+1 numbers, find the
 * missing number.
 * https://leetcode.com/problems/missing-number/
 *
 * Example 1:
 * Input: [4, 0, 3, 1]
 * Output: 2
 *
 * Example 2:
 * Input: [8, 3, 5, 2, 4, 6, 0, 1]
 * Output: 7
 *
 * Time: O(n)
 * Space: O(1)
 *
 * @param {number[]} numbers
 * @return {number}
 */
function findMissingNumber(numbers) {
  const n = numbers.length;
  for (let i = 0; i < n; i++) {
    /**
     * Similar as the problem 0_cyclic-sort, the only difference here:
     *  * the number starts from 0, so index i's correct number is number[i]
     *  * we can't handle number n because the array length is n (holds 0~n),
     * so after swapping, either number n is at it's wrong position (the array
     * contains n), or all numbers are at its correct position (the array does
     * not contain n)
     */
    while (numbers[i] !== i && numbers[i] < n) {
      _swap(numbers, i, numbers[i]);
    }
  }
  for (let i = 0; i < n; i++) {
    if (numbers[i] === n) {
      return i;
    }
  }
  return n;
}

function _swap(array, i, j) {
  [array[i], array[j]] = [array[j], array[i]];
}

// Test
console.log(findMissingNumber([4, 0, 3, 1])); // 2
console.log(findMissingNumber([8, 3, 5, 2, 4, 6, 0, 1])); // 7
console.log(findMissingNumber([3, 1, 2, 0])); // 4
