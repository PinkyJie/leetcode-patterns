const { Heap } = require('../_utils');

/**
 *
 * Problem:
 * Given N sticks with different lengths, we need to connect these sticks into one big
 * rope with minimum cost. The cost of connecting two sticks is equal to the sum of
 * their lengths.
 * https://leetcode.com/problems/minimum-cost-to-connect-sticks/ (subscription)
 *
 * Example 1:
 * Input: [1, 3, 11, 5]
 * Output: 33
 * Explanation: First connect 1+3(=4), then 4+5(=9), and then 9+11(=20). So the total
 * cost is 33 (4+9+20)
 *
 * Example 2:
 * Input: [3, 4, 5, 6]
 * Output: 36
 * Explanation: First connect 3+4(=7), then 5+6(=11), 7+11(=18). Total cost is
 * 36 (7+11+18)
 *
 *
 * Time: O(n) + O(n log(n))
 * Space: O(n) <- for heap
 *
 * @param {number[]} sticks
 * @return {number}
 */
function findMinCostToConnectSticks(sticks) {
  // O(n) for constructing heap in place
  const minHeap = new Heap((a, b) => b - a, sticks);
  let cost = 0;
  /**
   * To solve this problems, basically we need to always choose the 2 smallest
   * numbers in the array, and push the sum back to array, again to choose 2 smallest
   * numbers.
   *
   * Why use minimum heap here? Every time we get a sum of the two smallest numbers,
   * we need to compare the remaining numbers with this sum and get the 2 smallest
   * numbers. So minimum heap is the most efficient data structure for this purpose.
   */
  while (minHeap.size() > 1) {
    /**
     * For each loop, we pop() 2 numbers and push() back 1 number, so basically the
     * loop with run N times for the whole array, the time complexity will be
     * O(n * 3 * log(n)) => O(n log(n))
     */
    // 2 x O(log(n))
    const sum = minHeap.pop() + minHeap.pop();
    cost += sum;
    if (minHeap.size() > 0) {
      // O(log(n))
      minHeap.push(sum);
    }
  }
  return cost;
}

// Test
console.log(findMinCostToConnectSticks([1, 3, 11, 5])); // 33
console.log(findMinCostToConnectSticks([3, 4, 5, 6])); // 36
