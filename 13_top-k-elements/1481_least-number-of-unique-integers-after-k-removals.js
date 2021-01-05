const { Heap } = require('../_utils');

/**
 *
 * Problem:
 * Given an array of integers and an integer k. Find the least number of unique
 * integers after removing exactly k elements.
 * https://leetcode.com/problems/least-number-of-unique-integers-after-k-removals/
 *
 * Example 1:
 * Input: arr = [5,5,4], k = 1
 * Output: 1
 * Explanation: Remove the single 4, only 5 is left.
 *
 * Example 2:
 * Input: arr = [4,3,1,1,3,3,2], k = 3
 * Output: 2
 * Explanation: Remove 4, 2 and either one of the two 1s or three 3s. 1 and 3 will be
 * left.
 *
 *
 * Time: O((n + k) log(n))
 * Space: O(n)
 *
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
function findLeastNumberOfUniqueIntegersAfterRemovingKElements(nums, k) {
  if (nums.length <= k) {
    return 0;
  }

  const countMap = {};
  for (let i = 0; i < nums.length; i++) {
    countMap[nums[i]] = (countMap[nums[i]] || 0) + 1;
  }
  let uniqueIntegersCount = 0;
  const minHeap = new Heap((a, b) => b - a);
  Object.keys(countMap).forEach((num) => {
    if (countMap[num] === 1) {
      uniqueIntegersCount++;
    } else {
      minHeap.push(countMap[num]);
    }
  });
  /**
   * Similar as the problem 0_maximum-distinct-elements-after-removing-k-elements,
   * the only difference is this problem wants to get the least number after removing.
   * So the strategy is a bit different, we should remove the distinct numbers first
   * because they will decrease the final result directly by removing one. After that
   * we remove the less frequent elements completely (not `count - 1` because we want
   * the least number).
   */
  if (k <= uniqueIntegersCount) {
    /**
     * `k <= uniqueIntegersCount` means we don't even have enough k to remove distinct
     * numbers, so no need to handle the heap, return directly here.
     */
    return minHeap.size() + (uniqueIntegersCount - k);
  }

  // removing all distinct numbers first
  k -= uniqueIntegersCount;
  while (k > 0 && minHeap.size() > 0) {
    const count = minHeap.pop();
    k -= count;
  }
  /**
   * `k === 0` means the last pop() number in the heap just use up all the remaining k,
   * so the heap size should be the result.
   */
  if (k === 0) {
    return minHeap.size();
  }
  /**
   * Otherwise k must be `k < 0` cause `k > 0` means we don't have enough elements in
   * the original array for removing, that will be handled the line 30 above directly.
   * `k < 0` here means the last pop() number is not completely removed, that's why
   * we plus 1 here.
   */
  return minHeap.size() + 1;
}

// Test
console.log(
  findLeastNumberOfUniqueIntegersAfterRemovingKElements([5, 5, 4], 1)
); // 1
console.log(
  findLeastNumberOfUniqueIntegersAfterRemovingKElements(
    [4, 3, 1, 1, 3, 3, 2],
    3
  )
); // 2
