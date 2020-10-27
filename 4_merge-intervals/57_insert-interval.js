/**
 *
 * Problem:
 * Given a list of non-overlapping intervals sorted by their start time, insert a
 * given interval at the correct position and merge all necessary intervals to
 * produce a list that has only mutually exclusive intervals.
 * https://leetcode.com/problems/insert-interval/
 *
 * Example 1:
 * Input: Intervals=[[1,3], [5,7], [8,12]], New Interval=[4,6]
 * Output: [[1,3], [4,7], [8,12]]
 * Explanation: After insertion, since [4,6] overlaps with [5,7], we merged them into
 * one [4,7].
 *
 * Example 2:
 * Input: Intervals=[[1,3], [5,7], [8,12]], New Interval=[4,10]
 * Output: [[1,3], [4,12]]
 * Explanation: After insertion, since [4,10] overlaps with [5,7] & [8,12], we merged
 * them into [4,12].
 *
 * Time: O(n)
 * Space: O(1)
 *
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
function insertInterval(intervals, newInterval) {
  const result = [];
  /**
   * Only the intervals meets intervals[i][1] >= newInterval[0] or
   * intervals[i][0] <= newInterval[1] can be overlapped with the
   * newInterval, in addition, all these overlapped intervals will
   * be combined into one interval.
   */
  let i = 0;
  while (i < intervals.length && intervals[i][1] < newInterval[0]) {
    result.push(intervals[i]);
    i++;
  }
  let combinedInterval = newInterval;
  while (i < intervals.length && intervals[i][0] <= newInterval[1]) {
    combinedInterval = [
      Math.min(combinedInterval[0], intervals[i][0]),
      Math.max(combinedInterval[1], intervals[i][1]),
    ];
    i++;
  }
  result.push(combinedInterval);
  while (i < intervals.length) {
    result.push(intervals[i]);
    i++;
  }

  return result;
}

// Test
const result1 = insertInterval(
  [
    [1, 3],
    [5, 7],
    [8, 12],
  ],
  [4, 6]
);
result1.forEach((i) => console.log(i)); // [[1,3], [4,7], [8,12]]
const result2 = insertInterval(
  [
    [1, 3],
    [5, 7],
    [8, 12],
  ],
  [4, 10]
);
result2.forEach((i) => console.log(i)); // [[1,3], [4,12]]
