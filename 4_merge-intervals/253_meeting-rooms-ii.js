const { Heap } = require('../_utils');

/**
 *
 * Problem:
 * Given a list of intervals representing the start and end time of ‘N’ meetings,
 * required to hold all the meetings.
 * https://leetcode.com/problems/meeting-rooms-ii/
 *
 * Example 1:
 * Meetings: [[1,4], [2,5], [7,9]]
 * Output: 2
 * Explanation: Since [1,4] and [2,5] overlap, we need two rooms to hold these two
 * meetings. [7,9] can occur in any of the two rooms later.
 *
 * Example 2:
 * Meetings: [[6,7], [2,4], [8,12]]
 * Output: 1
 * Explanation: None of the meetings overlap, therefore we only need one room to hold
 * all meetings.
 *
 * Time: O(nlog(n))
 * Space: O(n) <- for sorting and the heap
 *
 * @param {number[][]} meetings
 * @return {number}
 */
function minimumMeetingRooms(meetings) {
  /**
   * The key point of solving this problem is: maintain a meeting container,
   * which only contains the meetings which conflict with each other (overlap),
   * every time a new meeting is coming, compare the meetings in the container
   * with the new meeting, the meetings already finish (whose end is less than
   * the new meeting start) can be removed from the container, the maximum size
   * of the container is the minimum meeting rooms we need.
   *
   * What data structure should we use for this container? Since we need to pop
   * the smallest end every time, and we need to do remove/insert very often,
   * after removing/inserting, the minimum end order needs to be maintained
   * correctly. So "minimum heap" is the best data structure.
   */
  // O(nlog(n))
  meetings.sort((a, b) => a[0] - b[0]);
  const smallEndPriorityComparator = (a, b) => b[1] - a[1];
  const itemToId = (a) => `[${a[0]},${a[1]}]`;
  const minHeap = new Heap(smallEndPriorityComparator, itemToId);
  let minMeetingRooms = 1;
  // O(n)
  for (let i = 0; i < meetings.length; i++) {
    while (minHeap.size() > 0 && minHeap.peek()[1] <= meetings[i][0]) {
      // O(log(n))
      minHeap.remove(minHeap.peek());
    }
    // O(log(n))
    minHeap.insert(meetings[i]);
    minMeetingRooms = Math.max(minMeetingRooms, minHeap.size());
  }
  return minMeetingRooms;
}

// Test
console.log(
  minimumMeetingRooms([
    [1, 4],
    [2, 5],
    [7, 9],
  ])
); // 2
console.log(
  minimumMeetingRooms([
    [6, 7],
    [2, 4],
    [8, 12],
  ])
); // 1
