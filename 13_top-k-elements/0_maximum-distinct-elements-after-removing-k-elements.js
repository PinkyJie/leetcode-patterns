const { Heap } = require('../_utils');

/**
 *
 * Problem:
 * Given an array of numbers and a number K, we need to remove K numbers from the
 * array such that we are left with maximum distinct numbers, return the count of
 * maximum distinct numbers.
 *
 * Example 1:
 * Input: [7, 3, 5, 8, 5, 3, 3], and K=2
 * Output: 3
 * Explanation: We can remove two occurrences of 3 to be left with 3 distinct numbers
 * [7, 3, 8], we have to skip 5 because it is not distinct and occurred twice. Another
 * solution could be to remove one instance of '5' and '3' each to be left with three
 * distinct numbers [7, 5, 8], in this case, we have to skip 3 because it occurred twice.
 *
 * Example 2:
 * Input: [1, 2, 3, 3, 3, 3, 4, 4, 5, 5, 5], and K=2
 * Output: 3
 * Explanation: We can remove one occurrence of '4' and '5' to get three distinct
 * numbers.
 *
 *
 * Time: O((m + k) log(m)) <- `m` is the count of non-distinct numbers in the array,
 * the maximum value of `m` is `n/2` (when all numbers in the original array are distinct)
 * Space: O(n) <- for `countMap` and heap
 *
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
function findMaximumDistinctElementsAfterRemovingKElements(nums, k) {
  if (nums.length <= k) {
    return 0;
  }

  const countMap = {};
  // O(n)
  for (let i = 0; i < nums.length; i++) {
    countMap[nums[i]] = (countMap[nums[i]] || 0) + 1;
  }
  let distinctCount = 0;
  const minHeap = new Heap((a, b) => countMap[b] - countMap[a]);
  // O(m log(m)) -> m: non-distinct elements count
  Object.keys(countMap).forEach((num) => {
    /**
     * The main logic here is to put all non-distinct numbers to the minimum heap.
     * Why? Consider the example `countMap = { 7: 1, 3: 3, 5: 2, 8: 1 }`, which number
     * should we remove first? 7 and 8 are already distinct numbers, we shouldn't remove
     * them at the beginning, what we should remove is number 5 because there are only
     * two 5, after removing one it will become distinct.
     * That's why here we only push the non-distinct numbers into the heap and always
     * get the smallest count first.
     */
    if (countMap[num] === 1) {
      distinctCount++;
    } else {
      minHeap.push(Number(num));
    }
  });
  // O(k log(m))
  while (k > 0 && minHeap.size() > 0) {
    const num = minHeap.pop();
    /**
     * How to remove? We should remove as much as possible to make the number distinct,
     * that's why we do `k - (countMap[num] - 1)` here, if the result `k` is larger than
     * 0, then a new distinct number is generated, otherwise the loop will stop, i.e. we
     * already remove k elements.
     */
    k -= countMap[num] - 1;
    if (k > 0) {
      distinctCount++;
    }
  }
  /**
   * Note: if `k > 0`, we still have elements to remove, we need to remove from the
   * distinct element group.
   */
  if (k > 0) {
    return distinctCount - k;
  }
  return distinctCount;
}

// Test
console.log(
  findMaximumDistinctElementsAfterRemovingKElements([7, 3, 5, 8, 5, 3, 3], 2)
); // 3
console.log(
  findMaximumDistinctElementsAfterRemovingKElements(
    [1, 2, 3, 3, 3, 3, 4, 4, 5, 5, 5],
    2
  )
); // 3
