const { Heap } = require('../_utils');

/**
 *
 * Problem:
 * Given an unsorted array of numbers, find Kth smallest number in it.
 *
 * Example 1:
 * Input: [1, 5, 12, 2, 11, 5], K = 3
 * Output: 5
 * Explanation: The 3rd smallest number is '5', as the first two smaller numbers are
 * [1, 2].
 *
 * Example 2:
 * Input: [1, 5, 12, 2, 11, 5], K = 4
 * Output: 5
 * Explanation: The 4th smallest number is '5', as the first three small numbers are
 * [1, 2, 5].
 *
 *
 * Time: O(n log(k))
 * Space: O(k) <- for heap
 *
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
function findKthSmallestNumberWithHeap(nums, k) {
  /**
   * Similar as problem 215_kth-largest-element-in-an-array, the difference here is we
   * want the Kth smallest number. So same idea then, when we iterate through the whole
   * array, we want to maintain the k smallest numbers in a separate "array", for the
   * remaining numbers:
   *  * if it's smaller than the largest number in the existing "array", it should be
   * part of the k smallest numbers group, so remove the largest number now in the
   * "array" and insert the new number.
   *  * if it's larger than the largest number in the existing "array", do nothing
   * because it won't be the k smallest numbers group as it's already larger than k
   * numbers.
   *
   * According to the above analysis, the "array" should be represented as maximum
   * heap as we need to access the maximum number quickly.
   *
   */
  const maxHeap = new Heap((a, b) => a - b);
  for (let i = 0; i < nums.length; i++) {
    if (i < k) {
      maxHeap.push(nums[i]);
    } else if (nums[i] < maxHeap.peek()) {
      maxHeap.pop();
      maxHeap.push(nums[i]);
    }
  }
  return maxHeap.peek();
}

/**
 * Time: O(n) the original quick sort time complexity is O(n log(n)), where log(n) is
 * the tree depth, for each tree level, it requires O(n) to do partition, but in the
 * quick sort variant, every time we only handle partition for half of the array, so
 * the total partition complexity will be O(n), because:
 *    1/2 + 1/4 + 1/8 + 1/16 + ... + 1/2^n = 1
 * Space: O(n) <- worse case, for recursion stack
 *
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
function findKthSmallestNumberWithQuickSort(nums, k) {
  /**
   * The intuition is: for quick sort, every time a pivot is selected, it will make
   * sure the pivot number will be swapped to its correct location after partition,
   * so after partition if the pivot is at index (k - 1), that's the result we are
   * trying to find, as long as the k-1 pos has the correct sorted number, we can
   * stop the sorting.
   */
  return _quickSort(nums, 0, nums.length - 1, k);
}

function _quickSort(nums, start, end, k) {
  const pos = _partition(nums, start, end);
  if (pos === k - 1) {
    return nums[pos];
  }
  /**
   * Whey only half? If the `pos` is less than k-1, obviously k - 1 will be in the
   * right half, so we don't need to handle the left half.
   */
  if (pos < k - 1) {
    return _quickSort(nums, pos + 1, end, k);
  }
  return _quickSort(nums, start, pos - 1, k);
}

function _partition(nums, start, end) {
  if (start === end) {
    return start;
  }
  const pivotIndex = start + Math.floor(Math.random() * (end - start + 1));
  const pivot = nums[pivotIndex];
  _swap(nums, start, pivotIndex);
  let firstIndexLargerThanPivot = start + 1;
  for (let i = firstIndexLargerThanPivot; i <= end; i++) {
    if (nums[i] < pivot) {
      _swap(nums, i, firstIndexLargerThanPivot);
      firstIndexLargerThanPivot++;
    }
  }
  _swap(nums, start, firstIndexLargerThanPivot - 1);
  return firstIndexLargerThanPivot - 1;
}

function _swap(array, i, j) {
  [array[i], array[j]] = [array[j], array[i]];
}

// Test
console.log(findKthSmallestNumberWithHeap([1, 5, 12, 2, 11, 5], 1)); // 1
console.log(findKthSmallestNumberWithHeap([1, 5, 12, 2, 11, 5], 2)); // 2
console.log(findKthSmallestNumberWithHeap([1, 5, 12, 2, 11, 5], 3)); // 5
console.log(findKthSmallestNumberWithHeap([1, 5, 12, 2, 11, 5], 4)); // 5
console.log(findKthSmallestNumberWithHeap([1, 5, 12, 2, 11, 5], 5)); // 11
console.log(findKthSmallestNumberWithHeap([1, 5, 12, 2, 11, 5], 6)); // 12
console.log(findKthSmallestNumberWithQuickSort([1, 5, 12, 2, 11, 5], 1)); // 1
console.log(findKthSmallestNumberWithQuickSort([1, 5, 12, 2, 11, 5], 2)); // 2
console.log(findKthSmallestNumberWithQuickSort([1, 5, 12, 2, 11, 5], 3)); // 5
console.log(findKthSmallestNumberWithQuickSort([1, 5, 12, 2, 11, 5], 4)); // 5
console.log(findKthSmallestNumberWithQuickSort([1, 5, 12, 2, 11, 5], 5)); // 11
console.log(findKthSmallestNumberWithQuickSort([1, 5, 12, 2, 11, 5], 6)); // 12
