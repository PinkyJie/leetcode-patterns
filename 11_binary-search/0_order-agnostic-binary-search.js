/**
 *
 * Problem:
 * Given a sorted array of numbers, find if a given number key is present in the array.
 * Though we know that the array is sorted, we don't know if it's sorted in ascending or
 * descending order. You should assume that the array can have duplicates. Write a
 * function to return the index of the key if it is present in the array, otherwise
 * return -1.
 *
 * Example 1:
 * Input: [1, 2, 3, 3, 5, 6, 7], key = 5
 * Output: 4
 *
 * Example 2:
 * Input: [10, 6, 4], key = 10
 * Output: 0
 *
 *
 * Time: O(log n)
 * Space: O(1)
 *
 * @param {number[]} arr
 * @param {number} key
 * @return {number}
 */
function binarySearchWithUnknownOrder(arr, key) {
  const isAscending = arr[0] < arr[arr.length - 1];
  let start = 0;
  let end = arr.length;
  while (start < end) {
    const middle = start + Math.floor((end - start) / 2);
    if (isAscending) {
      if (arr[middle] >= key) {
        end = middle;
      } else {
        start = middle + 1;
      }
    } else {
      if (arr[middle] <= key) {
        end = middle;
      } else {
        start = middle + 1;
      }
    }
  }
  return arr[start] === key ? start : -1;
}

// Test
console.log(binarySearchWithUnknownOrder([1, 2, 3, 3, 5, 6, 7], 5)); // 4
console.log(binarySearchWithUnknownOrder([10, 6, 4], 10)); // 0
console.log(binarySearchWithUnknownOrder([10, 8, 4], 3)); // -1
