/**
 *
 * Problem:
 * Given two lists of intervals, find the intersection of these two lists. Each list
 * consists of disjoint intervals sorted on their start time.
 * https://leetcode.com/problems/interval-list-intersections/
 *
 * Example 1:
 * Input: arr1=[[1, 3], [5, 6], [7, 9]], arr2=[[2, 3], [5, 7]]
 * Output: [2, 3], [5, 6], [7, 7]
 * Explanation: The output list contains the common intervals between the two lists.
 *
 * Example 2:
 * Input: arr1=[[1, 3], [5, 7], [9, 12]], arr2=[[5, 10]]
 * Output: [5, 7], [9, 10]
 * Explanation: The output list contains the common intervals between the two lists.
 *
 * Time: O(m + n)
 * Space: O(1)
 *
 * @param {number[][]} intervals1
 * @param {number[][]} intervals2
 * @return {number[][]}
 */
function intervalIntersection(intervals1, intervals2) {
  const result = [];
  let i = 0;
  let j = 0;
  while (i < intervals1.length && j < intervals2.length) {
    /**
     * This condition here is equivalent to:
     * !( intervals1[i][1] < intervals2[j][0] || intervals2[j][1] < intervals1[i][0] )
     * which is, `not (two intervals do not overlap)` => "two intervals overlap"
     */
    if (
      intervals1[i][1] >= intervals2[j][0] &&
      intervals2[j][1] >= intervals1[i][0]
    ) {
      result.push([
        Math.max(intervals1[i][0], intervals2[j][0]),
        Math.min(intervals1[i][1], intervals2[j][1]),
      ]);
    }
    /**
     * Regardless of overlap/not overlap, we can always move on to next one, the
     * strategy here is to move the one which finishes earlier (smaller end), because
     * the other one (larger end) is still possible to overlap with next one.
     *
     * If the two intervals do not overlap, this move strategy here is to skip the
     * intervals which are not possible to overlap with others, e.g.
     * intervals1[i] -> [1, 2], intervals2[j] -> [5, 6], intervals1[i] needs to be
     * skipped.
     */
    if (intervals1[i][1] < intervals2[j][1]) {
      i++;
    } else {
      j++;
    }
  }
  return result;
}

const result1 = intervalIntersection(
  [
    [1, 3],
    [5, 6],
    [7, 9],
  ],
  [
    [2, 3],
    [5, 7],
  ]
);
result1.map((i) => console.log(i)); // [[2, 3], [5, 6], [7, 7]]
const result2 = intervalIntersection(
  [
    [1, 3],
    [5, 7],
    [9, 12],
  ],
  [[5, 10]]
);
result2.map((i) => console.log(i)); // [[5, 7], [9, 10]]
