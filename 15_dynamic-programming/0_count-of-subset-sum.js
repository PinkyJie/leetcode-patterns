/**
 *
 * Problem:
 * Given a set of positive numbers, find the total number of subsets whose sum is equal to
 * a given number. Note: duplication is also counted (check Example 1).
 *
 * Example 1:
 * Input: [1, 1, 2, 3], S=4
 * Output: 3
 * Explanation: The given set has '3' subsets whose sum is '4': [1, 1, 2], [1, 3], [1, 3]
 * Note that we have two similar sets [1, 3], because we have two '1' in our input.
 *
 * Example 2:
 * Input: [1, 2, 7, 1, 5], S=9
 * Output: 3
 * Explanation: The given set has '3' subsets whose sum is '9': [2, 7], [1, 7, 1],
 * [1, 2, 1, 5]
 *
 *
 * Note: this problem is very similar as 10_subsets/40_combination-sum-ii, but that problem
 * we need to get all the actual combinations, not the count, so even the sub-problems
 * are the same (the changing states are the same), but the actual combinations can
 * be different, so that's why for that problem dynamic programming is not appropriate.
 *
 */

/**
 *
 * Solution 1: recursive brute force.
 *
 * @param {number[]} nums
 * @param {number} targetSum
 * @return {number}
 */
function countOfSubsetSum1(nums, targetSum) {
  return _recursive(nums, targetSum, 0);
}

/**
 *
 * Similar as the problem 416_partition-equal-subset-sum, the only difference here
 * is we need to return the count, so if we have a match return 1, otherwise return
 * 0, for one `currentIndex`, the final count would be the sum of the count when it's
 * selected and the count of it's skipped.
 *
 * Time: O(2^n) <- each number can either be selected or skipped
 * Space: O(nm) m: targetSum <- recursion stack
 *
 * @param {number[]} nums
 * @param {number} targetSum
 * @param {number} currentIndex
 * @return {number}
 */
function _recursive(nums, targetSum, currentIndex) {
  if (targetSum === 0) {
    return 1;
  }
  if (currentIndex === nums.length || targetSum < 0) {
    return 0;
  }
  const selectCurrentCount = _recursive(
    nums,
    targetSum - nums[currentIndex],
    currentIndex + 1
  );
  const skipCurrentCount = _recursive(nums, targetSum, currentIndex + 1);
  return selectCurrentCount + skipCurrentCount;
}

/**
 *
 * Solution 2: top-down dynamic programming with memoization.
 *
 * @param {number[]} nums
 * @param {number} targetSum
 * @return {number}
 */
function countOfSubsetSum2(nums, targetSum) {
  const n = nums.length;
  const memo = new Array(n).fill(0).map(() => new Array(targetSum + 1));
  return _recursiveWithMemo(nums, targetSum, 0, memo);
}

/**
 *
 * The only changing variables are `currentIndex` and `targetSum`, so use two-dimension
 * `memo` to prevent duplication sub-problems.
 *
 * Time: O(mn) m: `targetSum`
 * Space: O(mn) <- for `memo` and recursion stack
 *
 * @param {number[]} nums
 * @param {number} targetSum
 * @param {number} currentIndex
 * @param {number[][]} memo
 * @return {number}
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
 * The meaning of `dp[i][j]` here is given the first i numbers in the array,
 * what is the count of all subsets whose sum equals to j.
 *
 * Time: O(mn) m: `targetSum`
 * Space: O(mn) <- for `dp`
 *
 * @param {number[]} nums
 * @param {number} targetSum
 * @return {number}
 */
function countOfSubsetSum3(nums, targetSum) {
  const n = nums.length;
  const dp = new Array(n + 1)
    .fill(0)
    .map(() => new Array(targetSum + 1).fill(0));

  /**
   * If the `targetSum = 0`, and we don't have any numbers, there's one way to
   * get the target sum, that's why we have dp[0][0] = 1 here. For the remaining
   * columns in the row 0, there's no way to make the sum to be >0, so they should
   * be 0 (default value initialized above)
   */
  dp[0][0] = 1;
  for (let i = 1; i <= n; i++) {
    for (let j = 0; j <= targetSum; j++) {
      if (j >= nums[i - 1]) {
        dp[i][j] = dp[i - 1][j] + dp[i - 1][j - nums[i - 1]];
      } else {
        dp[i][j] = dp[i - 1][j];
      }
    }
  }

  return dp[n][targetSum];
}

/**
 *
 * Solution 4: bottom-up dynamic programming with reduced space.
 *
 * Time: O(mn) m: `targetSum`
 * Space: O(m) <- for `dp`
 *
 * @param {number[]} nums
 * @param {number} targetSum
 * @return {number}
 */
function countOfSubsetSum4(nums, targetSum) {
  const n = nums.length;
  const dp = new Array(targetSum + 1).fill(0);

  dp[0] = 1;
  for (let i = 1; i <= n; i++) {
    for (let j = targetSum; j >= nums[i - 1]; j--) {
      dp[j] += dp[j - nums[i - 1]];
    }
  }

  return dp[targetSum];
}

// Test
console.log(countOfSubsetSum1([1, 1, 2, 3], 4)); // 3
console.log(countOfSubsetSum1([1, 2, 7, 1, 5], 9)); // 3
console.log(countOfSubsetSum2([1, 1, 2, 3], 4)); // 3
console.log(countOfSubsetSum2([1, 2, 7, 1, 5], 9)); // 3
console.log(countOfSubsetSum3([1, 1, 2, 3], 4)); // 3
console.log(countOfSubsetSum3([1, 2, 7, 1, 5], 9)); // 3
console.log(countOfSubsetSum4([1, 1, 2, 3], 4)); // 3
console.log(countOfSubsetSum4([1, 2, 7, 1, 5], 9)); // 3
