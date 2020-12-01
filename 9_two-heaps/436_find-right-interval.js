const { Heap } = require('../_utils');

/**
 *
 * Problem:
 * Given an array of intervals, find the next interval of each interval. In a list of
 * intervals, for an interval `i` its next interval `j` will have the smallest
 * `start` greater than or equal to the `end` of `i`. Write a function to return an
 * array containing indices of the next interval of each input interval. If there is
 * no next interval of a given interval, return -1. It is given that none of the
 * intervals have the same start point.
 * https://leetcode.com/problems/find-right-interval/
 *
 * Example 1:
 * Input: Intervals [[2,3], [3,4], [5,6]]
 * Output: [1, 2, -1]
 * Explanation: The next interval of [2,3] is [3,4] having index 1. Similarly, the
 * next interval of [3,4] is [5,6] having index 2. There is no next interval for [5,
 * 6] hence we have -1.
 *
 * Example 2:
 * Input: Intervals [[3,4], [1,5], [4,6]]
 * Output: [2, -1, -1]
 * Explanation: The next interval of [3,4] is [4,6] which has index 2. There is no
 * next interval for [1,5] and [4,6].
 *
 *
 * Time: O(nlog(n))
 * Space: O(n)
 *
 * @param {number[][]} intervals
 * @return {number[]}
 */
function findRightInterval(intervals) {
  /**
   * Why using 2 min heaps? For each interval, we need to find another interval
   * with the "smallest" start greater than its end. This requirement indicates
   * at least we need a min heap for interval start. Then what about interval end
   * heap? If we start with the largest interval end first (e.g. max heap), when
   * we find the corresponding interval start in another heap (keep pop()), the
   * smaller ones will be all pop out, it's not easy to match the next interval
   * end. So we need to start from the smallest interval end, this also requires
   * a min heap for interval end.
   */
  const minStartHeap = new Heap((a, b) => b.value - a.value);
  const minEndHeap = new Heap((a, b) => b.value - a.value);

  // Time: O(n * log(n))
  for (let i = 0; i < intervals.length; i++) {
    const startItem = {
      value: intervals[i][0],
      index: i,
    };
    minStartHeap.push(startItem);
    const endItem = {
      value: intervals[i][1],
      index: i,
    };
    minEndHeap.push(endItem);
  }

  const result = new Array(intervals.length).fill(-1);
  // Time: O(n * log(n))
  while (minEndHeap.size() > 0) {
    const end = minEndHeap.pop();
    /**
     * The main logic here is for each interval end, make sure the interval
     * start heap always contains all the valid results, then the top one is the
     * optimal result we need.
     */
    while (minStartHeap.size() > 0 && minStartHeap.peek().value < end.value) {
      minStartHeap.pop();
    }
    if (minStartHeap.size() === 0) {
      break;
    }
    result[end.index] = minStartHeap.peek().index;
  }
  return result;
}

// Test
console.log(
  findRightInterval([
    [2, 3],
    [3, 4],
    [5, 6],
  ])
); // [1, 2, -1]
console.log(
  findRightInterval([
    [3, 4],
    [1, 5],
    [4, 6],
  ])
); // [2, -1, -1]

console.log(
  findRightInterval([
    [1, 12],
    [2, 9],
    [3, 10],
    [13, 14],
    [15, 16],
    [16, 17],
  ])
); // [3, 3, 3, 4, 5, -1]
