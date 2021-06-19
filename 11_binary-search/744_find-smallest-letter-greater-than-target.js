/**
 *
 * Problem:
 * Given an array of lowercase letters sorted in ascending order, find the smallest
 * letter in the given array greater than a given "key". Assume the given array is a
 * circular list, which means that the last letter is assumed to be connected with the
 * first letter. This also means that the smallest letter in the given array is greater
 * than the last letter of the array and is also the first letter of the array. Write a
 * function to return the next letter of the given "key".
 * https://leetcode.com/problems/find-smallest-letter-greater-than-target/
 *
 * Example 1:
 * Input: ['a', 'c', 'f', 'h'], key = 'f'
 * Output: 'h'
 * Explanation: The smallest letter greater than 'f' is 'h' in the given array.
 *
 * Example 2:
 * Input: ['a', 'c', 'f', 'h'], key = 'm'
 * Output: 'a'
 * Explanation: As the array is assumed to be circular, the smallest letter greater than
 * 'm' is 'a'.
 *
 *
 * Time: O(log n)
 * Space: O(1)
 *
 * @param {string[]} letters
 * @param {string} key
 * @return {string}
 */
function findSmallestLetterGreaterThanTarget(letters, key) {
  let start = 0;
  let end = letters.length;
  while (start < end) {
    const middle = start + Math.floor((end - start) / 2);
    // char can be compared directly here
    if (letters[middle] > key) {
      end = middle;
    } else {
      start = middle + 1;
    }
  }
  /**
   * Follow the binary search, the only difference is here we need to return the
   * "mod" of `start` here. Remember `start` is always the smallest index which
   * can satisfy the "end change condition" (e.g. `letters[middle] > key`, the
   * smallest index which is greater than the target, exactly as the question asked),
   * but remember the index can equal to `letters.length` (example 2 above), that's
   * why "mod" here is required.
   */
  return letters[start % letters.length];
}

// Test
console.log(findSmallestLetterGreaterThanTarget(['a', 'c', 'f', 'h'], 'f')); // 'h'
console.log(findSmallestLetterGreaterThanTarget(['a', 'c', 'f', 'h'], 'm')); // 'a'
