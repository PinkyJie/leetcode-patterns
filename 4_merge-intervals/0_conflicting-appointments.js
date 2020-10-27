/**
 *
 * Problem:
 * Given an array of intervals representing ‘N’ appointments, find out if a person
 * can attend all the appointments.
 *
 * Example 1:
 * Appointments: [[1,4], [2,5], [7,9]]
 * Output: false
 * Explanation: Since [1,4] and [2,5] overlap, a person cannot attend both of these
 * appointments.
 *
 * Example 2:
 * Appointments: [[6,7], [2,4], [8,12]]
 * Output: true
 * Explanation: None of the appointments overlap, therefore a person can attend all
 * of them.
 *
 * Time: O(nlog(n))
 * Space: O(n) <- sorting
 *
 * @param {number[][]} appointments
 * @return {boolean}
 */
function canAttendAllAppointments(appointments) {
  // O(nlog(n))
  appointments.sort((a, b) => a[0] - b[0]);
  // O(n)
  for (let i = 1; i < appointments.length; i++) {
    /**
     * After sorting by start, it's guaranteed that current start is equal or greater
     * than the previous start, if the current start is less than the previous end,
     * which means the current interval overlaps with the previous interval.
     */
    if (appointments[i][0] < appointments[i - 1][1]) {
      return false;
    }
  }
  return true;
}

// Test
console.log(
  canAttendAllAppointments([
    [1, 4],
    [2, 5],
    [7, 9],
  ])
); // false
console.log(
  canAttendAllAppointments([
    [6, 7],
    [2, 4],
    [8, 12],
  ])
); // true
