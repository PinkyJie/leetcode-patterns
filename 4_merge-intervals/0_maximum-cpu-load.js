const { Heap } = require('../_utils');

/**
 *
 * Problem:
 * We are given a list of Jobs. Each job has a Start time, an End time, and a CPU
 * load when it is running. Our goal is to find the maximum CPU load at any time if
 * all the jobs are running on the same machine.
 *
 * Example 1:
 * Jobs: [[1,4,3], [2,5,4], [7,9,6]]
 * Output: 7
 * Explanation: Since [1,4,3] and [2,5,4] overlap, their maximum CPU load (3+4=7)
 * will be when both the jobs are running at the same time i.e., during the time
 * interval (2,4).
 *
 * Example 2:
 * Jobs: [[6,7,10], [2,4,11], [8,12,15]]
 * Output: 15
 * Explanation: None of the jobs overlap, therefore we will take the maximum load of
 * any job which is 15.
 *
 * Time: O(nlog(n))
 * Space: O(n) <- sorting and heap
 *
 * Note: this problem is exactly the same as 253_meeting-rooms-ii, check there for
 * detailed explanation. The only difference is: instead of the size of the container,
 * this problem needs to calculate the load of the all jobs in the containers. Keep
 * in mind, the container only stores the jobs which are overlapped.
 *
 * @param {number[][]} jobs
 * @return {number}
 */
function maximumCPULoad(jobs) {
  // O(nlog(n))
  jobs.sort((a, b) => a[0] - b[0]);
  const smallEndPriorityComparator = (a, b) => b[1] - a[1];
  const itemToId = (a) => `[${a[0]},${a[1]},${a[2]}]`;
  const minHeap = new Heap(smallEndPriorityComparator, itemToId);
  let maxLoad = 0;
  let currentLoad = 0;
  // O(n)
  for (let i = 0; i < jobs.length; i++) {
    while (minHeap.size() > 0 && minHeap.peek()[1] < jobs[i][0]) {
      // O(log(n))
      const top = minHeap.pop();
      currentLoad -= top[2];
    }
    // O(log(n))
    minHeap.push(jobs[i]);
    currentLoad += jobs[i][2];
    maxLoad = Math.max(maxLoad, currentLoad);
  }
  return maxLoad;
}

// Test
console.log(
  maximumCPULoad([
    [1, 4, 3],
    [2, 5, 4],
    [7, 9, 6],
  ])
); // 7
console.log(
  maximumCPULoad([
    [6, 7, 10],
    [2, 4, 11],
    [8, 12, 15],
  ])
); // 15
