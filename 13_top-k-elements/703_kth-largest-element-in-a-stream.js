const { Heap } = require('../_utils');

/**
 *
 * Problem:
 * Design a class to efficiently find the Kth largest element in a stream of numbers.
 * The class should have the following two things:
 *  * The constructor of the class should accept an integer array containing initial
 * numbers from the stream and an integer K.
 *  * The class should expose a function add(int num) which will store the given number
 * and return the Kth largest number.
 * https://leetcode.com/problems/kth-largest-element-in-a-stream/
 *
 * Example 1:
 * Input: [3, 1, 5, 12, 2, 11], K = 4
 *  1. Calling add(6) should return '5'.
 *  2. Calling add(13) should return '6'.
 *  3. Calling add(4) should still return '6'.
 *
 */
class KthLargestNumberInStream {
  /**
   *
   * Time: O(n log(n))
   * Space: O(k)
   *
   * @param {number} k
   * @param {number[]} nums
   */
  constructor(k, nums) {
    this.minHeap = new Heap((a, b) => b - a);
    /**
     * Similar as problem 215_kth-largest-element-in-an-array, the difference here is
     * when we initialize the class here, `nums.length` might be smaller than `k`,
     * that's why we store `k` on the instance cause it will be used in the below `add`
     * function.
     */
    this.k = k;
    for (let i = 0; i < nums.length; i++) {
      if (i < k) {
        this.minHeap.push(nums[i]);
      } else if (nums[i] > this.minHeap.peek()) {
        this.minHeap.pop();
        this.minHeap.push(nums[i]);
      }
    }
  }

  /**
   *
   * Time: O(log(k))
   *
   * @param {number} val
   */
  add(val) {
    /**
     * If the heap size is smaller than `k`, it will fall in the above `i < k` condition,
     * so we need to push it into the heap anyway. The other logic is the same as the
     * logic above in the `constructor()` because heap already has `k` size.
     */
    if (this.minHeap.size() < this.k) {
      this.minHeap.push(val);
    } else if (val > this.minHeap.peek()) {
      this.minHeap.pop();
      this.minHeap.push(val);
    }
    return this.minHeap.peek();
  }
}

// Test
const kthLargestNumber = new KthLargestNumberInStream(4, [3, 1, 5, 12, 2, 11]);
console.log(kthLargestNumber.add(6)); // 5
console.log(kthLargestNumber.add(13)); // 6
console.log(kthLargestNumber.add(4)); // 6
