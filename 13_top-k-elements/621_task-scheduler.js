const { Heap } = require('../_utils');

/**
 *
 * Problem:
 * You are given a list of tasks that need to be run, in any order, on a server. Each task
 * will take one CPU interval to execute but once a task has finished, it has a cooling
 * period during which it can't be run again. If the cooling period for all tasks is K
 * intervals, find the minimum number of CPU intervals that the server needs to finish all
 * tasks. If at any time the server can't execute any task then it must stay idle.
 * https://leetcode.com/problems/task-scheduler
 *
 * Example 1:
 * Input: [a, a, a, b, c, c], K=2
 * Output: 7
 * Explanation: a -> c -> b -> a -> c -> idle -> a
 *
 * Example 2:
 * Input: [a, b, a], K=3
 * Output: 5
 * Explanation: a -> b -> idle -> idle -> a
 *
 *
 * Time: O(n log(n))
 * Space: O(n)
 *
 * @param {string[]} tasks
 * @param {number} k
 * @return {number}
 */
function scheduleTasks(tasks, k) {
  const idle = 'idle';

  const freqMap = {};
  // O(n)
  for (let i = 0; i < tasks.length; i++) {
    freqMap[tasks[i]] = (freqMap[tasks[i]] || 0) + 1;
  }
  const maxHeap = new Heap((a, b) => freqMap[a] - freqMap[b]);
  // O(m log(m)) m: unique task count
  Object.keys(freqMap).forEach((task) => {
    maxHeap.push(task);
  });

  const resultArr = [];
  const preTasks = [];
  // O(n log(m)) every task being pushed once and popped once
  while (maxHeap.size() > 0 || preTasks.length > 0) {
    /**
     * Similar as problem 358_rearrange-string-k-distance-apart, the difference
     * here is we still need to make the loop go on even the heap is empty, as
     * long as we still have unhandled tasks in the `preTasks`.
     */
    if (maxHeap.size() > 0) {
      const task = maxHeap.pop();
      freqMap[task]--;
      if (freqMap[task] === 0) {
        delete freqMap[task];
      }
      resultArr.push(task);
      preTasks.push(task);
    } else {
      /**
       * Heap is empty and can't go on, what we do is just to push "idle" to
       * both the `resultArr` and `preTasks`, to treat this loop's popped task
       * is "idle". Why? We need to fill up the `preTasks` array to make sure it
       * meets the condition below `.length === k + 1`, so it can `shift()` the
       * unhandled task and push it back to heap for processing.
       */
      resultArr.push(idle);
      preTasks.push(idle);
    }
    /**
     * We need this check here to stop the loop, otherwise it will keep adding
     * "idle" to the `preTasks` array above and the loop never stops.
     */
    if (Object.keys(freqMap).length === 0) {
      break;
    }

    /**
     * Note: k = 3 means the same task should be separate by 3 other tasks in the middle.
     * For example, `preTasks = [a, b, c]` and `resultArr = [a, b, c]`, if we push "a" back
     * to the heap at this moment, "a" might be popped at next loop, so result array will
     * be `[a, b, c, a]`, which is not correct. That's why we put the `k + 1` check below.
     */
    if (preTasks.length === k + 1) {
      const preTask = preTasks.shift();
      if (preTask !== idle && freqMap[preTask] > 0) {
        maxHeap.push(preTask);
      }
    }
  }
  return resultArr.length;
}

// Test
console.log(scheduleTasks(['a', 'a', 'a', 'b', 'c', 'c'], 2)); // 7
console.log(scheduleTasks(['a', 'b', 'a'], 3)); // 5
