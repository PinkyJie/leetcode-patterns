/**
 *
 * Problem:
 * Given an infinite sorted array (or an array with unknown size), find if a given
 * number "key" is present in the array. Write a function to return the index of the
 * "key" if it is present in the array, otherwise return -1. Since it is not possible to
 * define an array with infinite (unknown) size, you will be provided with an interface
 * `ArrayReader` to read elements of the array. `ArrayReader.get(index)` will return the
 * number at index; if the array's size is smaller than the index, it will return
 * `Integer.MAX_VALUE`.
 * https://leetcode.com/problems/search-in-a-sorted-array-of-unknown-size/ (subscription)
 *
 * Example 1:
 * Input: [4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30], key = 16
 * Output: 6
 * Explanation: The key is present at index '6' in the array.
 *
 * Example 2:
 * Input: [4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30], key = 11
 * Output: -1
 * Explanation: The key is not present in the array.
 *
 *
 * Time: O(log n)
 * Space: O(1)
 *
 * @param {ArrayReader} reader
 * @param {number} key
 * @return {number}
 */
function searchInUnknownSizeArray(reader, key) {
  let start = 0;
  let end = 1;
  /**
   * The trick part here is we need to find the search range first, starting form [0, 1),
   * until we can find a `end` which is larger than the `key`.
   */
  while (reader.get(end) <= key) {
    // if we luckily find the `key`, return the index directly
    if (reader.get(end) === key) {
      return end;
    }
    const newStart = end + 1;
    /**
     * Every time we double the search range here to accelerate, `end + 1` is the new
     * start and the new end will be the `originalRange * 2`. This is to make sure the
     * searching range loop here can be finished in O(log n).
     */
    end += (end - start + 1) * 2;
    start = newStart;
  }

  // traditional binary search
  while (start < end) {
    const middle = start + Math.floor((end - start) / 2);
    if (reader.get(middle) >= key) {
      end = middle;
    } else {
      start = middle + 1;
    }
  }
  return reader.get(start) === key ? start : -1;
}

class ArrayReader {
  constructor(arr) {
    this.arr = arr;
  }

  get(index) {
    if (index >= this.arr.length) return Number.MAX_SAFE_INTEGER;
    return this.arr[index];
  }
}

// Test
const reader1 = new ArrayReader([
  4,
  6,
  8,
  10,
  12,
  14,
  16,
  18,
  20,
  22,
  24,
  26,
  28,
  30,
]);
console.log(searchInUnknownSizeArray(reader1, 16)); // 6
console.log(searchInUnknownSizeArray(reader1, 11)); // -1
const reader2 = new ArrayReader([1, 3, 8, 10, 15]);
console.log(searchInUnknownSizeArray(reader2, 15)); // 4
console.log(searchInUnknownSizeArray(reader2, 200)); // -1
