/**
 *
 * Problem:
 * Given a sorted array, create a new array containing squares of  of the input array in
 * the sorted order.
 * https://leetcode.com/problems/squares-of-a-sorted-array/
 *
 * Example 1:
 * Input: [-2, -1, 0, 2, 3]
 * Output: [0, 1, 4, 4, 9]
 *
 * Example 2:
 * Input: [-3, -1, 0, 1, 2]
 * Output: [0 1 1 4 9]
 *
 * Time: O(n)
 * Space: O(1)
 *
 * @param {number[]} sortedArray
 * @return {number[]}
 */
function squaresOfSortedArray(sortedArray) {
  // pointer 1: last negative index
  let negativeIndex = 0;
  // pointer 2: first positive index
  let positiveIndex = 0;

  // find the first positive number
  for (let i = 0; i < sortedArray.length; i++) {
    if (sortedArray[i] >= 0) {
      positiveIndex = i;
      negativeIndex = i - 1;
      break;
    }
  }
  // no positive number found, make `positiveIndex` out of bound
  if (negativeIndex === positiveIndex && positiveIndex === 0) {
    positiveIndex = sortedArray.length;
  }

  const squareSortedArray = [];

  // comparison starts from the middle of the array, small value first
  while (negativeIndex >= 0 && positiveIndex < sortedArray.length) {
    if (sortedArray[positiveIndex] <= Math.abs(sortedArray[negativeIndex])) {
      squareSortedArray.push(
        sortedArray[positiveIndex] * sortedArray[positiveIndex]
      );
      positiveIndex++;
    } else {
      squareSortedArray.push(
        sortedArray[negativeIndex] * sortedArray[negativeIndex]
      );
      negativeIndex--;
    }
  }

  while (negativeIndex >= 0) {
    squareSortedArray.push(
      sortedArray[negativeIndex] * sortedArray[negativeIndex]
    );
    negativeIndex--;
  }

  while (positiveIndex < sortedArray.length) {
    squareSortedArray.push(
      sortedArray[positiveIndex] * sortedArray[positiveIndex]
    );
    positiveIndex++;
  }

  return squareSortedArray;
}

// Test
console.log(squaresOfSortedArray([-2, -1, 0, 2, 3])); // [0, 1, 4, 4, 9]
console.log(squaresOfSortedArray([-3, -1, 0, 1, 2])); // [0 1 1 4 9]

function squaresOfSortedArray1(sortedArray) {
  const squareSortedArray = new Array(sortedArray.length).fill(0);

  let left = 0;
  let right = sortedArray.length - 1;

  /**
   * Without this variable, we can use `.shift` to make sure the new value (larger)
   * will be inserted at the end of the array, but be aware that `.shift()` takes O(n)
   * so it's better to initialize the whole array first and use index to do insertion.
   */
  let nextIndex = squareSortedArray.length - 1;

  // comparison starts from the start and the end of the array, large value first
  while (left <= right) {
    if (Math.abs(sortedArray[left]) >= Math.abs(sortedArray[right])) {
      squareSortedArray[nextIndex] = sortedArray[left] * sortedArray[left];
      left++;
    } else {
      squareSortedArray[nextIndex] = sortedArray[right] * sortedArray[right];
      right--;
    }
    nextIndex--;
  }

  return squareSortedArray;
}

// Test
console.log(squaresOfSortedArray1([-2, -1, 0, 2, 3])); // [0, 1, 4, 4, 9]
console.log(squaresOfSortedArray1([-3, -1, 0, 1, 2])); // [0 1 1 4 9]
