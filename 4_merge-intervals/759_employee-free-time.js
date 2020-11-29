const { Heap } = require('../_utils');

/**
 *
 * Problem:
 * For K employees, we are given a list of intervals representing the working hours
 * of each employee. Our goal is to find out if there is a free interval that is
 * common to all employees. You can assume that each list of employee working hours
 * is sorted on the start time.
 * https://leetcode.com/problems/employee-free-time/
 *
 * Example 1:
 * Input: Employee Working Hours=[[[1,3], [5,6]], [[2,3], [6,8]]]
 * Output: [3,5]
 * Explanation: Both the employees are free between [3,5].
 *
 * Example 2:
 * Input: Employee Working Hours=[[[1,3], [9,12]], [[2,4]], [[6,8]]]
 * Output: [4,6], [8,9]
 * Explanation: All employees are free between [4,6] and [8,9].
 *
 * Time: O(nlog(k)) <- n is the number of the total intervals
 * Space: O(k) <- heap
 *
 * @param {number[][]} schedules
 * @return {number[][]}
 */
function findEmployeeFreeTime(schedules) {
  if (schedules.length === 0) {
    return [];
  }

  /**
   * For this problem, the naive way is to combine all the intervals into
   * one and sort them by the start (smaller start comes first), and then
   * [lastIntervalEnd, nextIntervalStart] is the free time we want.
   *
   * This is pretty similar as the "merge K ordered arrays" problem:
   * the most efficient solution is to maintain a minimum heap, first
   * insert all arrays' 1st item into the heap, the heap top is the smallest
   * item, then remove the heap top, and insert the next item which belongs
   * to the same array as the removed item, keep doing this remove/insert
   * until the heap is empty.
   *
   * Similarly, for this problem, we first insert all the schedules' 1st
   * interval into the heap (together with the employee index and its array
   * index, so we know which one to insert after it's removed), instead of
   * finding one smaller start interval each time, we need to find two
   * intervals, because what we want is to always merge the two smallest
   * start intervals.
   */
  const smallStartPriorityComparator = (a, b) => b[0][0] - a[0][0];
  const itemToId = (a) => `[[${a[0][0]},${a[0][1]}],${a[1]},${a[2]}]`;
  const minHeap = new Heap(smallStartPriorityComparator, itemToId);
  // O(k)
  for (let i = 0; i < schedules.length; i++) {
    // O(log(k))
    minHeap.push([schedules[i][0], i, 0]);
  }

  const result = [];
  let lastSchedule = minHeap.peek()[0];
  // O(nlog(k)) <- every interval is being inserted and removed
  while (minHeap.size() > 0) {
    const currentSchedule = minHeap.pop();
    /**
     * This comparison won't run for 1st loop, because for 1st loop,
     * `lastSchedule` is the `currentSchedule`, so for 1st loop, it
     * will insert another interval into the heap directly, the comparison
     * starts from the 2nd loop.
     */
    if (currentSchedule[0][0] > lastSchedule[1]) {
      // no overlap, record the free time
      result.push([lastSchedule[1], currentSchedule[0][0]]);
    }
    /**
     * Regardless of overlap or not, always use the interval with larger
     * end as the `lastInterval`, because we need to use `lastInterval` to
     * compare with the next smaller start interval to get the possible free
     * time.
     */
    if (currentSchedule[0][1] > lastSchedule[1]) {
      lastSchedule = currentSchedule[0];
    }

    const employeeSchedule = schedules[currentSchedule[1]];
    if (currentSchedule[2] + 1 < employeeSchedule.length) {
      minHeap.push([
        employeeSchedule[currentSchedule[2] + 1],
        currentSchedule[1],
        currentSchedule[2] + 1,
      ]);
    }
  }
  return result;
}

// Test
const result1 = findEmployeeFreeTime([
  [
    [1, 3],
    [5, 6],
  ],
  [
    [2, 3],
    [6, 8],
  ],
]);
result1.forEach((i) => console.log(i)); //[[3, 5]]
const result2 = findEmployeeFreeTime([
  [
    [1, 3],
    [9, 12],
  ],
  [[2, 4]],
  [[6, 8]],
]);
result2.forEach((i) => console.log(i)); //[[4, 6], [8, 9]]
