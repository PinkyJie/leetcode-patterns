/**
 *
 * Problem:
 * Given a set of positive integer numbers, find if we can partition it into two subsets
 * such that the sum of elements in both subsets is equal.
 * https://leetcode.com/problems/partition-equal-subset-sum/
 *
 * Example 1:
 * Input: [1, 2, 3, 4]
 * Output: true
 * Explanation: The given set can be partitioned into two subsets with equal sum: [1, 4] &
 * [2, 3]
 *
 * Example 2:
 * Input: [1, 1, 3, 4, 7]
 * Output: true
 * Explanation: The given set can be partitioned into two subsets with equal sum:
 * [1, 3, 4] & [1, 7]
 *
 *
 * Note: the problem can be transformed to: given a number array, check if we can find a
 * subset whose sum will be half of the total sum of the array. Obviously, if the total
 * sum is not even number, we can return false directly, cause the array only contains
 * integer.
 */

/**
 *
 * Solution 1: recursive brute force.
 *
 * @param {number[]} nums
 * @return {boolean}
 */
function canPartitionToEqualSum1(nums) {
  let totalSum = 0;
  for (let i = 0; i < nums.length; i++) {
    totalSum += nums[i];
  }
  // return false directly if the total sum is not even
  if (totalSum % 2) {
    return false;
  }
  return _recursive(nums, totalSum / 2, 0);
}

/**
 *
 * Time: O(2^n) <- for each number, we can choose to select or skip, 2 options.
 * Space: O(n) <- for recursion stack
 *
 * @param {*} nums
 * @param {*} targetSum
 * @param {*} currentIndex
 * @return {boolean}
 */
function _recursive(nums, targetSum, currentIndex) {
  /**
   * Exit condition:
   *  * return true directly if we got 0 target sum, cause the half sum subset is found
   *  * return false when either there's no remaining numbers or the sum of the existing
   * subset is already larger than the target sum.
   */
  if (targetSum === 0) {
    return true;
  }
  if (currentIndex >= nums.length || targetSum < 0) {
    return false;
  }

  /**
   * For each number, we can choose to select it or skip it, with this in mind,
   * we call the `_recursive` for these 2 options, we return `true` immediately
   * if the 1st options is viable.
   */
  const selectCurrent = _recursive(
    nums,
    targetSum - nums[currentIndex],
    currentIndex + 1
  );
  if (selectCurrent) {
    return true;
  }
  const skipCurrent = _recursive(nums, targetSum, currentIndex + 1);
  return skipCurrent;
}

/**
 *
 * Solution 2: top-down dynamic programming with memoization.
 *
 * @param {number[]} nums
 * @return {boolean}
 */
function canPartitionToEqualSum2(nums) {
  let totalSum = 0;
  for (let i = 0; i < nums.length; i++) {
    totalSum += nums[i];
  }
  // return false directly if the total sum is not even
  if (totalSum % 2) {
    return false;
  }
  const memo = new Array(nums.length)
    .fill(0)
    .map(() => new Array(totalSum / 2 + 1));
  return _recursiveWithMemo(nums, totalSum / 2, 0, memo);
}

/**
 *
 * Time: O(mn) m: target sum
 * Space: O(mn) <- for `memo` and recursion stack
 *
 * @param {*} nums
 * @param {*} targetSum
 * @param {*} currentIndex
 * @param {number[][]} memo
 * @return {boolean}
 */
function _recursiveWithMemo(nums, targetSum, currentIndex, memo) {
  if (typeof memo[currentIndex][targetSum] === 'undefined') {
    memo[currentIndex][targetSum] = _recursive(nums, targetSum, currentIndex);
  }
  return memo[currentIndex][targetSum];
}

/**
 *
 * Solution 3: bottom-up dynamic programming.
 *
 * Time: O(mn) m: target sum <- loop to populate `dp`
 * Space: O(mn) <- for the `dp`
 *
 * @param {number[]} nums
 * @return {boolean}
 */
function canPartitionToEqualSum3(nums) {
  let totalSum = 0;
  for (let i = 0; i < nums.length; i++) {
    totalSum += nums[i];
  }
  // return false directly if the total sum is not even
  if (totalSum % 2) {
    return false;
  }
  const targetSum = totalSum / 2;
  const dp = new Array(nums.length).fill(0).map(() => new Array(targetSum + 1));

  /**
   * Initialize row 0: if we only have 1 number (index 0), if it's equal to the target
   * sum, then the result is true, otherwise the result is false obviously cause there's
   * no other numbers to fill the target sum.
   */
  for (let j = 0; j <= targetSum; j++) {
    dp[0][j] = nums[0] === j;
  }
  // early return: if we find a `targetSum` column equal to true, return directly
  if (dp[0][targetSum]) {
    return true;
  }

  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j <= targetSum; j++) {
      if (j >= nums[i]) {
        dp[i][j] = dp[i - 1][j] || dp[i - 1][j - nums[i]];
      } else {
        dp[i][j] = dp[i - 1][j];
      }
    }
    // early return: if we find a `targetSum` column equal to true, return directly
    if (dp[i][targetSum]) {
      return true;
    }
  }
  return dp[nums.length - 1][targetSum];
}

/**
 *
 * Solution 4: bottom-up dynamic programming with reduced space.
 *
 * Time: O(mn) m: target sum <- loop to populate `dp`
 * Space: O(m) <- for the `dp`
 *
 * @param {number[]} nums
 * @return {boolean}
 */
function canPartitionToEqualSum4(nums) {
  let totalSum = 0;
  for (let i = 0; i < nums.length; i++) {
    totalSum += nums[i];
  }
  // return false directly if the total sum is not even
  if (totalSum % 2) {
    return false;
  }
  const targetSum = totalSum / 2;
  const dp = new Array(targetSum + 1);

  for (let i = 0; i < dp.length; i++) {
    dp[i] = nums[0] === i;
  }
  // early return: if we find a `targetSum` column equal to true, return directly
  if (dp[targetSum]) {
    return true;
  }

  for (let i = 1; i < nums.length; i++) {
    for (let j = targetSum; j >= nums[i]; j--) {
      dp[j] = dp[j] || dp[j - nums[i]];
    }
    // early return: if we find a `targetSum` column equal to true, return directly
    if (dp[targetSum]) {
      return true;
    }
  }
  return dp[targetSum];
}

// Test
console.log(canPartitionToEqualSum1([1, 2, 3, 4])); // true
console.log(canPartitionToEqualSum1([1, 1, 3, 4, 7])); // true
console.log(canPartitionToEqualSum1([2, 3, 4, 6])); // false
console.log(canPartitionToEqualSum2([1, 1, 3, 4, 7])); // true
console.log(canPartitionToEqualSum3([1, 1, 3, 4, 7])); // true
console.log(canPartitionToEqualSum4([1, 1, 3, 4, 7])); // true
