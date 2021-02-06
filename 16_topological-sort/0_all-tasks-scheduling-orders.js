/**
 *
 * Problem:
 * There are N tasks, labeled from 0 to N-1. Each task can have some prerequisite
 * tasks which need to be completed before it can be scheduled. Given the number of tasks
 * and a list of prerequisite pairs, write a method to print all possible ordering of
 * tasks meeting all prerequisites.
 *
 * Example 1:
 * Input: Tasks=3, Prerequisites=[0, 1], [1, 2]
 * Output: [0, 1, 2]
 * Explanation: There is only possible ordering of the tasks.
 *
 * Example 2:
 * Input: Tasks=6, Prerequisites=[2, 5], [0, 5], [0, 4], [1, 4], [3, 2], [1, 3]
 * Output:
 *  1) [0, 1, 4, 3, 2, 5]
 *  2) [0, 1, 3, 4, 2, 5]
 *  3) [0, 1, 3, 2, 4, 5]
 *  4) [0, 1, 3, 2, 5, 4]
 *  5) [1, 0, 3, 4, 2, 5]
 *  6) [1, 0, 3, 2, 4, 5]
 *  7) [1, 0, 3, 2, 5, 4]
 *  8) [1, 0, 4, 3, 2, 5]
 *  9) [1, 3, 0, 2, 4, 5]
 *  10) [1, 3, 0, 2, 5, 4]
 *  11) [1, 3, 0, 4, 2, 5]
 *  12) [1, 3, 2, 0, 5, 4]
 *  13) [1, 3, 2, 0, 4, 5]
 *
 *
 * Time: O(V! * E)
 * Space: O(V! * E) <- for result
 *
 * @param {number} tasks
 * @param {number[][]} prerequisites
 * @return {number[][]}
 */
function findAllTasksSchedulingOrders(tasks, prerequisites) {
  /**
   * Similar as the problem 0_topological-sort, the only difference is: instead of
   * returning the true/false of the scheduling tasks, here we need to return all
   * the possible orders. So basically when we have the `sources` in Step 2
   * (explained in README), we need to use backtrack strategy introduced in
   * 10_subsets category to loop through all the possible task in the `sources`.
   */
  const inDegrees = new Array(tasks).fill(0);
  const graph = new Array(tasks).fill(0).map(() => new Array());

  // O(V + E)
  for (let i = 0; i < prerequisites.length; i++) {
    const [task1, task2] = prerequisites[i];
    graph[task1].push(task2);
    inDegrees[task2]++;
  }

  // O(V)
  const sources = [];
  for (let i = 0; i < inDegrees.length; i++) {
    if (inDegrees[i] === 0) {
      sources.push(i);
    }
  }

  const results = [];
  const used = new Array(tasks).fill(false);
  /**
   * O(V! * (V + E)) - if we don't consider all the orders, the time complexity will
   * be O(V + E) as we discussed in 0_topological-sort. Taking all possible orders
   * into consideration, if `sources` length is K, it can have K! permutations, for
   * each permutation, we need to run through all the logic in the recursion, and
   * the worse case that `sources` can contain `V` tasks.
   */
  _getOrderFromSources(sources, graph, inDegrees, used, [], results);
  return results;
}

/**
 *
 * @param {number[]} sources
 * @param {number[][]} graph
 * @param {number[]} inDegrees
 * @param {boolean[]} used
 * @param {number[]} currentResult
 * @param {number[}[] results
 */
function _getOrderFromSources(
  sources,
  graph,
  inDegrees,
  used,
  currentResult,
  results
) {
  // end condition
  if (currentResult.length === inDegrees.length) {
    results.push(Array.from(currentResult));
    return;
  }
  /**
   * We have multiple choices in `sources`, we can start with any of them, so we
   * follow the strategy of the backtrack (explained in 10_subsets):
   *  1. do choice
   *  2. recursion
   *  3. revert choice
   */
  for (let i = 0; i < sources.length; i++) {
    if (used[i]) {
      continue;
    }
    used[i] = true;
    // the same logic as we use in 0_topological-sort
    const task1 = sources[i];
    currentResult.push(task1);
    graph[task1].forEach((task2) => {
      inDegrees[task2]--;
      if (inDegrees[task2] === 0) {
        sources.push(task2);
      }
    });
    _getOrderFromSources(
      sources,
      graph,
      inDegrees,
      used,
      currentResult,
      results
    );
    // revert all the logic (choices) above before next loop
    graph[task1].forEach((task2) => {
      inDegrees[task2]++;
      // remember to revert the addition for `sources`
      if (inDegrees[task2] === 1) {
        sources.pop();
      }
    });
    currentResult.pop();
    used[i] = false;
  }
}

// Test
console.log(
  findAllTasksSchedulingOrders(3, [
    [0, 1],
    [1, 2],
  ])
); // [[0, 1, 2]]
console.log(
  findAllTasksSchedulingOrders(4, [
    [3, 2],
    [3, 0],
    [2, 0],
    [2, 1],
  ])
); // [[3, 2, 0, 1], [3, 2, 1, 0]]
console.log(
  findAllTasksSchedulingOrders(6, [
    [2, 5],
    [0, 5],
    [0, 4],
    [1, 4],
    [3, 2],
    [1, 3],
  ])
);
// [
//  [0, 1, 4, 3, 2, 5]
//  [0, 1, 3, 4, 2, 5]
//  [0, 1, 3, 2, 4, 5]
//  [0, 1, 3, 2, 5, 4]
//  [1, 0, 3, 4, 2, 5]
//  [1, 0, 3, 2, 4, 5]
//  [1, 0, 3, 2, 5, 4]
//  [1, 0, 4, 3, 2, 5]
//  [1, 3, 0, 2, 4, 5]
//  [1, 3, 0, 2, 5, 4]
//  [1, 3, 0, 4, 2, 5]
//  [1, 3, 2, 0, 5, 4]
//  [1, 3, 2, 0, 4, 5]
// ]
