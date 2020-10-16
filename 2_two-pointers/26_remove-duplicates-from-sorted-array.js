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
  // pointer 1: the next available index for inserting non-duplicate number
  let nextAvailableIndex = 1;

  // pointer 2: the looping index run through all the numbers in the array
  for (let i = 1; i < sortedArray.length; i++) {
    /**
     * Only increase `nextAvailableIndex` when the current number is not equal to
     * the last number in the non-duplicate array (`sortedArray[nextAvailableIndex - 1]`)
     */
    if (sortedArray[nextAvailableIndex - 1] !== sortedArray[i]) {
      sortedArray[nextAvailableIndex] = sortedArray[i];
      nextAvailableIndex++;
    }
  }
  return nextAvailableIndex;
}

// Test
console.log(removeDuplicatesFromSortedArray([2, 3, 3, 3, 6, 9, 9])); // 4
console.log(removeDuplicatesFromSortedArray([2, 2, 2, 11])); // 2
