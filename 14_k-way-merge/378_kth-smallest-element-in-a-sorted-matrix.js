const { Heap } = require('../_utils');

/**
 *
 * Problem:
 * Given an N * N matrix where each row and column is sorted in ascending order, find
 * the Kth smallest element in the matrix.
 * https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/
 *
 * Example 1:
 * Input: Matrix=[
 *  [2, 6, 8],
 *  [3, 7, 10],
 *  [5, 8, 11]
 * ], K=5
 * Output: 7
 * Explanation: The 5th smallest number in the matrix is 7.
 *
 *
 * Time: O((k + n) log(n))
 * Space: O(n) <- for heap
 *
 * @param {number[][]} matrix
 * @param {number} k
 * @return {number}
 */
function kthSmallestNumberInSortedMatrixWithHeap(matrix, k) {
  const n = matrix[0].length;
  const minHeap = new Heap((a, b) => b.value - a.value);
  // O(n log(n))
  for (let i = 0; i < n; i++) {
    if (matrix[i].length > 0) {
      minHeap.push({
        value: matrix[i][0],
        row: i,
        col: 0,
      });
    }
  }
  let count = 0;
  // O(k log(n)) pop()/push() will only happen for k times at most
  while (minHeap.size() > 0) {
    const { value, row, col } = minHeap.pop();
    count++;
    if (count === k) {
      return value;
    }
    const nextCol = col + 1;
    const currentRow = matrix[row];
    if (nextCol < n) {
      minHeap.push({
        value: currentRow[nextCol],
        row,
        col: nextCol,
      });
    }
  }
}

/**
 *
 * Another solution with binary search.
 * Binary search requires the search space is sorted, how does this row/col-based
 * matrix achieve this? The trick is to construct a new array `countArray`, make
 * its index starting from `minValue (matrix[0][0])` to `maxValue (matrix[n-1][n-1])`,
 * calculate the array item value from a function called `count()`, this function will
 * return the count of numbers which are less than or equal to the `value (minValue ~
 * maxValue)`. Obviously, this new `countArray` is sorted, e.g. `count(5) <= count(6)`,
 * the count of the numbers in the matrix <= 5 is definitely smaller or equal to the count
 * of the numbers <= 6. We can do binary search on this new array `countArray`, starting
 * from the index `minValue` to the index `maxValue`.
 *
 * What condition should we search? The problem is asking the kth smallest element, so
 * it should meet `count(answer) === k`, e.g. count of the number less than or equal to
 * this answer should be `k`. However, that's not accurate, let's say if the `answer`
 * number has duplicates in the matrix, the result would be `count(answer) >= k`. For
 * example, if 7 is answer we are looking for, but in the matrix we have:
 * [..., 7, (7), 7, 7, ...], if the `(7)` is the kth one, it will cause `count(7) >= k`.
 * And it's obvious than if `count(middle) >= k`, we should move the new `end` to the
 * `middle`.
 *
 *
 * Time: O(n log(max - min))
 * Space: O(1)
 *
 * @param {number[][]} matrix
 * @param {number} k
 * @return {number}
 */
function kthSmallestNumberInSortedMatrixWithBinarySearch(matrix, k) {
  const n = matrix[0].length;
  let start = matrix[0][0];
  let end = matrix[n - 1][n - 1];

  while (start < end) {
    const middle = start + Math.floor((end - start) / 2);
    const count = countOfNumbersLessOrEqualThan(matrix, middle);
    /**
     * Remember the binary search will make sure the smallest index which meet
     * the "end change" condition is returned. So for this case, the returned
     * `start` will be the smallest number to make sure `count(num) >= k`.
     *
     * How to make sure this `start` is existed in the original matrix? Let's
     * consider an example, if the matrix is like `[..., 7, (7), 7, 9]`, if the
     * 2nd 7 is the kth element which meet `count(7) >= k`, obviously `count(8)`
     * will also meet this condition, and 8 is not existed in the matrix. How
     * to prevent this search from returning 8 as the final result? Remember
     * binary search will return the smallest index which meets the condition,
     * so if both 7 and 8 are qualified and now `middle = 8`, the loop will go
     * on with `end = middle`, and `start` will converge to 7 finally.
     */
    if (count >= k) {
      end = middle;
    } else {
      start = middle + 1;
    }
  }
  return start;
}

/**
 *
 * Give a number `target`, find out how many numbers in the matrix are less than
 * or equal to `target`.
 *
 * Time: O(n)
 *
 * @param {number[][]} matrix
 * @param {number} target
 * @return {number}
 */
function countOfNumbersLessOrEqualThan(matrix, target) {
  const n = matrix[0].length;
  let count = 0;
  let col = n - 1;
  /**
   * How to get this count quickly? We can fully utilise the property here that
   * both row/col are sorted. So we can start from comparing the last number of
   * each row with the `target`:
   *  * if the last number is less than or equal to `target`, then we can add the
   * whole row to the final count, e.g. `count += n`
   *  * if the last number is larger than `target`, we keep decreasing the `col`
   * until it's less than or equal to `target`, and we can add the colum 0~col
   * from this row to the final count, e.g. `count += col + 1`
   * These 2 scenarios can be combined because the 1st scenario we have
   * `col = n - 1`, so it's also `count += col + 1`.
   *
   * This way, we can make sure the nested loop can be finished at most n
   * comparisons: for all the rows, each column is only compared once, that's why
   * we don't need to reset `col` variable for each row.
   */
  for (let row = 0; row < n; row++) {
    while (col >= 0 && matrix[row][col] > target) {
      col--;
    }
    if (col < 0) {
      break;
    }
    count += col + 1;
  }
  return count;
}

// Test
console.log(
  kthSmallestNumberInSortedMatrixWithHeap(
    [
      [2, 6, 8],
      [3, 7, 10],
      [5, 8, 11],
    ],
    5
  )
); // 7

console.log(
  kthSmallestNumberInSortedMatrixWithBinarySearch(
    [
      [2, 6, 8],
      [3, 7, 10],
      [5, 8, 11],
    ],
    5
  )
); // 7
