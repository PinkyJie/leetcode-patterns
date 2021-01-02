const { Heap } = require('../_utils');

/**
 *
 * Problem:
 * Given an unsorted array of numbers, find the top K frequently occurring numbers in
 * it.
 * https://leetcode.com/problems/top-k-frequent-elements/
 *
 * Example 1:
 * Input: [1, 3, 5, 12, 11, 12, 11], K = 2
 * Output: [12, 11]
 * Explanation: Both '11' and '12' appeared twice.

 *
 * Example 2:
 * Input: [5, 12, 11, 3, 11], K = 2
 * Output: [11, 5] or [11, 12] or [11, 3]
 * Explanation: Only '11' appeared twice, all other numbers appeared once.
 *
 *
 * Time: O(n) + O(n log(k))
 * Space: O(n) <- for heap and `freqMap`
 *
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
function findTopKFrequentElements(nums, k) {
  const freqMap = {};
  for (let i = 0; i < nums.length; i++) {
    freqMap[nums[i]] = (freqMap[nums[i]] || 0) + 1;
  }
  /**
   * Similar as the problem 215_kth-largest-element-in-an-array, the difference here is
   * we need to store both the number and its frequency (comparison factor) in the heap.
   */
  const minHeap = new Heap((a, b) => b[1] - a[1]);
  Object.keys(freqMap).forEach((num, index) => {
    if (index < k) {
      // note map's key is string, that's why we need to do conversion here
      minHeap.push([Number(num), freqMap[num]]);
    } else if (freqMap[num] > minHeap.peek()[1]) {
      minHeap.pop();
      minHeap.push([Number(num), freqMap[num]]);
    }
  });
  const array = minHeap.toArray();
  return array.map((item) => item[0]);
}

// Test
console.log(findTopKFrequentElements([1, 3, 5, 12, 11, 12, 11], 2)); // [11, 12]
console.log(findTopKFrequentElements([5, 12, 11, 3, 11], 2)); // [5, 11]
