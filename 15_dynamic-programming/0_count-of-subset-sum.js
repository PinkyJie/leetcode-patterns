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
 * are the same (the changing variables are the same), but the actual combinations can
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
 * Space: O(n) <- recursion stack
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
  const memo = new Array(nums.length)
    .fill(0)
    .map(() => new Array(targetSum + 1));
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
 * what is the count of all subsets whose sum can be j.
 *
 * Time: O(mn) m: `targetSum`
 * Space: O(mn) <- for `dp`
 *
 * @param {number[]} nums
 * @param {number} targetSum
 * @return {number}
 */
function countOfSubsetSum3(nums, targetSum) {
  const dp = new Array(nums.length).fill(0).map(() => new Array(targetSum + 1));

  /**
   * If the `targetSum = 0`, and we have only one number (index 0), there's one
   * way to get the target sum, i.e. to skip the number. That's why we have
   * dp[0][0] = 1 here, actually dp[x][0] = 1.
   */
  dp[0][0] = 1;
  /**
   * Row 0 initialization: when we only have one number (index 0), the only way to
   * make sure it's equal to the target sum is to make sure the number itself is
   * equal to the target sum.
   */
  for (let j = 1; j <= targetSum; j++) {
    dp[0][j] = nums[0] === j ? 1 : 0;
  }

  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j <= targetSum; j++) {
      if (j >= nums[i]) {
        dp[i][j] = dp[i - 1][j] + dp[i - 1][j - nums[i]];
      } else {
        dp[i][j] = dp[i - 1][j];
      }
    }
  }

  return dp[nums.length - 1][targetSum];
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
  const dp = new Array(targetSum + 1);

  dp[0] = 1;
  for (let i = 1; i < dp.length; i++) {
    dp[i] = nums[0] === i ? 1 : 0;
  }

  for (let i = 1; i < nums.length; i++) {
    for (let j = targetSum; j >= nums[i]; j--) {
      dp[j] += dp[j - nums[i]];
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
