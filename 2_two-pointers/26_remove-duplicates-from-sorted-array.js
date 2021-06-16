/**
 *
 * Problem:
 * Given an array of sorted numbers, remove all duplicates from it. You should not use any
 * extra space; after removing the duplicates in-place return the length of the subarray
 * that has no duplicate in it.
 * https://leetcode.com/problems/remove-duplicates-from-sorted-array/
 *
 * Example 1:
 * Input: [2, 3, 3, 3, 6, 9, 9]
 * Output: 4
 * Explanation: The first four elements after removing the duplicates will be [2, 3, 6, 9].
 *
 * Example 2:
 * Input: [2, 2, 2, 11]
 * Output: 2
 * Explanation: The first two elements after removing the duplicates will be [2, 11].
 *
 * Time: O(n)
 * Space: O(1)
 *
 * @param {number[]} sortedArray
 * @return {number}
 */
function removeDuplicatesFromSortedArray(sortedArray) {
  const n = sortedArray.length;
  if (n <= 1) {
    return n;
  }

  // pointer 1: the index for last non-duplicate number
  let slow = 0;
  // pointer 2: the looping index run through all the numbers in the array
  let fast = 1;
  while (fast < n) {
    /**
     * Only increase `slow` when the current number (`fast`) is not equal to
     * the last number in the non-duplicate array (`slow`)
     */
    if (sortedArray[fast] !== sortedArray[slow]) {
      slow++;
      sortedArray[slow] = sortedArray[fast];
    }
    fast++;
  }
  return slow + 1;
}

// Test
console.log(removeDuplicatesFromSortedArray([2, 3, 3, 3, 6, 9, 9])); // 4
console.log(removeDuplicatesFromSortedArray([2, 2, 2, 11])); // 2
