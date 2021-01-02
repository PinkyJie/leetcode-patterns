const { Heap } = require('../_utils');

/**
 *
 * Problem:
 * Given an array of points in the a 2D plane, find K closest points to the origin
 * (0, 0). Here, the distance between two points on a plane is the Euclidean distance.
 * https://leetcode.com/problems/k-closest-points-to-origin/
 *
 * Example 1:
 * Input: points = [[1,2],[1,3]], K = 1
 * Output: [[1,2]]
 * Explanation: The Euclidean distance between (1, 2) and the origin is sqrt(5). The
 * Euclidean distance between (1, 3) and the origin is sqrt(10). Since sqrt(5) < sqrt(10)
 * therefore (1, 2) is closer to the origin.
 *
 * Example 2:
 * Input: point = [[1, 3], [3, 4], [2, -1]], K = 2
 * Output: [[1, 3], [2, -1]]
 *
 *
 * Time: O(n log(k))
 * Space: O(k) <- for heap
 *
 * @param {number[][]} points
 * @param {number} k
 * @return {number[][]}
 */
function findKClosestPointsToOrigin(points, k) {
  /**
   * Similar as the problem 0_kth-smallest-element-in-an-array, the difference here
   * is we need to store the index in the heap together with the distance (comparison
   * factor).
   */
  const maxHeap = new Heap((a, b) => a[1] - b[1]);
  for (let i = 0; i < points.length; i++) {
    const distance = _getDistance(points[i]);
    if (i < k) {
      // item in heap: [ index, distance ]
      maxHeap.push([i, distance]);
    } else if (distance < maxHeap.peek()[1]) {
      maxHeap.pop();
      maxHeap.push([i, distance]);
    }
  }
  const array = maxHeap.toArray();
  return array.map((item) => points[item[0]]);
}

function _getDistance(point) {
  return point[0] * point[0] + point[1] * point[1];
}

// Test
const result1 = findKClosestPointsToOrigin(
  [
    [1, 2],
    [1, 3],
  ],
  1
);
result1.forEach((i) => console.log(i)); // [[1, 2]]

const result2 = findKClosestPointsToOrigin(
  [
    [1, 3],
    [3, 4],
    [2, -1],
  ],
  2
);
result2.forEach((i) => console.log(i)); // [[1, 3], [2, -1]]
