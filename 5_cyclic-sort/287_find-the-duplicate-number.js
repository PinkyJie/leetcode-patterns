/**
 *
 * Problem:
 * We are given an unsorted array containing n+1 numbers taken from the range 1 to
 * n. The array has only one duplicate but it can be repeated multiple times. Find
 * that duplicate number without using any extra space. You are, however, allowed to
 * modify the input array.
 * https://leetcode.com/problems/find-the-duplicate-number/
 *
 * Example 1:
 * Input: [1, 4, 4, 3, 2]
 * Output: 4
 *
 * Example 2:
 * Input: [2, 1, 3, 3, 5, 4]
 * Output: 3
 *
 * Time: O(n)
 * Space: O(1)
 *
 * @param {number[]} numbers
 * @return {number}
 */
function findDuplicateNumber(numbers) {
  for (let i = 0; i < numbers.length; i++) {
    while (numbers[i] !== i + 1) {
      /**
       * Similar as 448_find-all-numbers-disappeared-in-an-array, during swapping
       * if the target position has the same number as the current index, than that
       * number must be a duplicate number.
       */
      if (numbers[numbers[i] - 1] === numbers[i]) {
        return numbers[i];
      }
      _swap(numbers, i, numbers[i] - 1);
    }
  }
}

function _swap(array, i, j) {
  [array[i], array[j]] = [array[j], array[i]];
}

/**
 *
 * How to do this without modifying the array?
 *
 * We can think about the array as a linked list, take `[1, 4, 4, 3, 2]` as an
 * example, array can be treated as a map whose key is the index, value is the
 * number on that index, so we have map:
 *  0 -> 1, 1 -> 4, 2 -> 4, 3 -> 3, 4 -> 2
 * if we use the value as the next index, we can get a linked list:
 *  0 -> 1 -> 4 -> 2 -> 4
 * we can see there is a cycle in the linked list because of the duplicate number,
 * and the duplicate number is the start of the cycle.
 * So the problem is converted to "How to find the cycle start in a linked list",
 * this can be easily solved by fast/slow points approach mentioned in
 * 142_linked-list-cycle-ii.
 *
 * Time: O(n)
 * Space: O(1)
 *
 * @param {number[]} numbers
 * @return {number}
 */
function findDuplicateNumberWithoutModify(numbers) {
  let slowPointer = 0;
  let fastPointer = 0;
  while (true) {
    slowPointer = numbers[slowPointer];
    fastPointer = numbers[numbers[fastPointer]];
    if (slowPointer === fastPointer) {
      break;
    }
  }
  // find the cycle length
  let cycleLength = 1;
  let current = slowPointer;
  current = numbers[current];
  while (current !== slowPointer) {
    current = numbers[current];
    cycleLength++;
  }
  // find cycle start
  let pointer1 = 0;
  let pointer2 = 0;
  while (cycleLength > 0) {
    pointer2 = numbers[pointer2];
    cycleLength--;
  }
  while (pointer1 !== pointer2) {
    pointer1 = numbers[pointer1];
    pointer2 = numbers[pointer2];
  }
  // pointer itself is the value (except 1st pointer is 0)
  return pointer1;
}

// Test
console.log(findDuplicateNumber([1, 4, 4, 3, 2])); // 4
console.log(findDuplicateNumber([2, 1, 3, 3, 5, 4])); // 3

console.log(findDuplicateNumberWithoutModify([1, 4, 4, 3, 2])); // 4
console.log(findDuplicateNumberWithoutModify([2, 1, 3, 3, 5, 4])); // 3
