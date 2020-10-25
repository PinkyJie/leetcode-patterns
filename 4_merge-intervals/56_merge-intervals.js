/**
 *
 * Problem:
 * Given a list of intervals, merge all the overlapping intervals to produce a list
 * that has only mutually exclusive intervals.
 * https://leetcode.com/problems/merge-intervals/
 *
 * Example 1:
 * Intervals: [[1,4], [2,5], [7,9]]
 * Output: [[1,5], [7,9]]
 * Explanation: Since the first two intervals [1,4] and [2,5] overlap, we merged them
 * into one [1,5].
 *
 * Example 2:
 * Intervals: [[6,7], [2,4], [5,9]]
 * Output: [[2,4], [5,9]]
 * Explanation: Since the intervals [6,7] and [5,9] overlap, we merged them into one
 * [5,9].
 *
 * Time: O(nlog(n))
 * Space: O(n) <- sorting
 *
 * @param {number[][]} intervals
 * @return {number[][]}
 */
function mergeIntervals(intervals) {
  if (intervals.length === 0) {
    return [];
  }

  // sort the intervals by their start O(nlog(n))
  intervals.sort((a, b) => a[0] - b[0]);

  const result = [intervals[0]];
  // O(n)
  for (let i = 1; i < intervals.length; i++) {
    const lastInterval = result[result.length - 1];
    const newInterval = intervals[i];
    if (newInterval[0] <= lastInterval[1]) {
      // overlap
      lastInterval[1] = Math.max(lastInterval[1], newInterval[1]);
    } else {
      // do not overlap
      result.push(newInterval);
    }
  }

  return result;
}

// Test
const result1 = mergeIntervals([
  [1, 4],
  [2, 5],
  [7, 9],
]);
result1.map((i) => console.log(i)); // [[1,5], [7,9]]
const result2 = mergeIntervals([
  [6, 7],
  [2, 4],
  [5, 9],
]);
result2.map((i) => console.log(i)); // [[2,4], [5,9]]
