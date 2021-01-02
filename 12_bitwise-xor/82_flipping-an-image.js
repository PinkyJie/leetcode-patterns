/**
 *
 * Problem:
 * Given a binary matrix representing an image, we want to flip the image horizontally,
 * then invert it. To flip an image horizontally means that each row of the image is
 * reversed. For example, flipping [0, 1, 1] horizontally results in [1, 1, 0]. To
 * invert an image means that each 0 is replaced by 1, and each 1 is replaced by 0. For
 * example, inverting [1, 1, 0] results in [0, 0, 1].
 * https://leetcode.com/problems/flipping-an-image/
 *
 * Example 1:
 * Input: [
 *  [1,0,1],
 *  [1,1,1],
 *  [0,1,1]
 * ]
 * Output: [
 *   [0,1,0],
 *   [0,0,0],
 *   [0,0,1]
 * ]
 * Explanation: First reverse each row: [[1,0,1],[1,1,1],[1,1,0]]. Then, invert the
 * image: [[0,1,0],[0,0,0],[0,0,1]]
 *
 *
 * Example 2:
 * Input: [
 *  [1,1,0,0],
 *  [1,0,0,1],
 *  [0,1,1,1],
 *  [1,0,1,0]
 * ]
 * Output: [
 *   [1,1,0,0],
 *   [0,1,1,0],
 *   [0,0,0,1],
 *   [1,0,1,0]
 * ]
 * Explanation: First reverse each row: [[0,0,1,1],[1,0,0,1],[1,1,1,0],[0,1,0,1]]. Then
 * invert the image: [[1,1,0,0],[0,1,1,0],[0,0,0,1],[1,0,1,0]]
 *
 * Time: O(n^2)
 * Space: O(n^2) <- result
 *
 * @param {number[][]} matrix
 * @return {number[][]}
 */
function flipAndInvertImage(matrix) {
  /**
   * The idea is simple, just reverse each row and invert it (XOR with 1 to invert
   * because 1^1 = 0, 0^1 = 1).
   */
  const n = matrix.length;
  const middle = Math.floor((n - 1) / 2);
  for (let i = 0; i < n; i++) {
    /**
     * One trick we did here is for each row the loop only needs to run half row
     * and we combine the reverse with invert into one step.
     */
    for (let j = 0; j <= middle; j++) {
      [matrix[i][j], matrix[i][n - 1 - j]] = [
        matrix[i][n - 1 - j] ^ 1,
        matrix[i][j] ^ 1,
      ];
    }
  }
  return matrix;
}

// Test
const result1 = flipAndInvertImage([
  [1, 0, 1],
  [1, 1, 1],
  [0, 1, 1],
]);
result1.forEach((i) => console.log(i));
// [[0,1,0],[0,0,0],[0,0,1]]
const result2 = flipAndInvertImage([
  [1, 1, 0, 0],
  [1, 0, 0, 1],
  [0, 1, 1, 1],
  [1, 0, 1, 0],
]);
result2.forEach((i) => console.log(i));
// [[1,1,0,0],[0,1,1,0],[0,0,0,1],[1,0,1,0]]
