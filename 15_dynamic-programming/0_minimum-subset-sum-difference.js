/**
 *
 * Problem:
 * Given a set of positive numbers, partition the set into two subsets with minimum
 * difference between their subset sums.
 *
 * Example 1:
 * Input: [1, 2, 3, 9]
 * Output: 3
 * Explanation: We can partition the given set into two subsets where minimum absolute
 * difference between the sum of numbers is '3'. Following are the two subsets:
 * [1, 2, 3] & [9].
 *
 * Example 2:
 * Input: [1, 2, 7, 1, 5]
 * Output: 0
 * Explanation: We can partition the given set into two subsets where minimum absolute
 * difference between the sum of number is '0'. Following are the two subsets:
 * [1, 2, 5] & [7, 1].
 *
 */

/**
 *
 * Solution 1: recursive brute force.
 *
 * @param {number[]} nums
 * @return {number}
 */
function minimumSubsetSumDiff1(nums) {
  const n = nums.length;
  let totalSum = 0;
  for (let i = 0; i < n; i++) {
    totalSum += nums[i];
  }
  return _recursive(nums, totalSum, 0, 0);
}

/**
 *
 * Consider we have two subsets S1 and S2, we have `S1 + S2 = totalSum`, if we assume
 * S1's sum is less than S2, we can get `S2 - diff + S2 = totalSum`, what we are trying
 * to find is the minimum diff in the formula: `-diff = totalSum - 2 * S2`. So the basic
 * idea is follow the same solution of "0-1 knapsack" problem, for each number we can
 * choose to select or skip, for every choice we calculate the `diff` based on the above
 * formula.
 *
 * Time: O(2^n)
 * Space: O(nm) m: totalSum
 *
 * @param {number[]} nums
 * @param {number} totalSum
 * @param {number} currentSum
 * @param {number} currentIndex
 * @return {number}
 */
function _recursive(nums, totalSum, currentSum, currentIndex) {
  /**
   * Exit condition: since we have `-diff = totalSum - 2 * S2` above, since
   * `diff > 0`, so the stop condition should be when the
   * `totalSum - 2 * currentSum` value first hit negative.
   *
   * Note: we can also do `diff = totalSum - 2 * S1`, then when the value turns
   * to negative, we need to remove the last number added from the subset. The
   * `S2` way here is just easier for coding (e.g no need to remove).
   */
  if (totalSum - 2 * currentSum <= 0 || currentIndex === nums.length) {
    return Math.abs(totalSum - 2 * currentSum);
  }

  // select current number into S2
  const selectCurrent = _recursive(
    nums,
    totalSum,
    currentSum + nums[currentIndex],
    currentIndex + 1
  );
  // skip current number for S2, which means this number is selected by S1
  const skpCurrent = _recursive(nums, totalSum, currentSum, currentIndex + 1);
  return Math.min(selectCurrent, skpCurrent);
}

/**
 *
 * Solution 2: top-down dynamic programming with memoization.
 *
 * @param {number[]} nums
 * @return {number}
 */
function minimumSubsetSumDiff2(nums) {
  const n = nums.length;
  let totalSum = 0;
  for (let i = 0; i < n; i++) {
    totalSum += nums[i];
  }
  const memo = new Array(n).fill(0).map(() => new Array(totalSum + 1));
  return _recursiveWithMemo(nums, totalSum, 0, 0, memo);
}

/**
 *
 * Time: O(mn) m: total sum
 * Space: O(mn)
 *
 * @param {number[]} nums
 * @param {number} totalSum
 * @param {number} currentSum
 * @param {number} currentIndex
 * @param {number[][]} memo
 * @return {number}
 */
function _recursiveWithMemo(nums, totalSum, currentSum, currentIndex, memo) {
  if (typeof memo[currentIndex][currentSum] === 'undefined') {
    memo[currentIndex][currentSum] = _recursive(
      nums,
      totalSum,
      currentSum,
      currentIndex,
      memo
    );
  }
  return memo[currentIndex][currentSum];
}

/**
 *
 * Solution 3: bottom-up dynamic programming.
 * How to derive the formula from row `i - 1` to row `i`? From the above solutions
 * we know that the changing states are `currentIndex` and `currentSum`, since
 * we are trying to make `totalSum - 2 * currentSum` as small as possible, the
 * possible range for `currentSum` here will be 0 ~ totalSum / 2, the best scenario
 * is we can find a subset to make sure `currentSum` can equal to `totalSum / 2`, if
 * not, we will try to find the sum which as close to `totalSum / 2` as possible. So
 * here the meaning behind `dp[i][currentSum]` would be: given first `i` numbers,
 * weather or not we can find a subset to make sure the sum can be `currentSum`, so
 * the value should be a boolean.
 *
 * Time: O(mn) m: total sum
 * Space: O(mn)
 *
 * @param {number[]} nums
 * @return {number}
 */
function minimumSubsetSumDiff3(nums) {
  const n = nums.length;
  let totalSum = 0;
  for (let i = 0; i < n; i++) {
    totalSum += nums[i];
  }
  const maxSum = Math.floor(totalSum / 2);
  const dp = new Array(n + 1)
    .fill(0)
    .map(() => new Array(maxSum + 1).fill(false));
  dp[0][0] = true;
  for (let i = 1; i <= n; i++) {
    for (let j = 0; j <= maxSum; j++) {
      if (j >= nums[i - 1]) {
        dp[i][j] = dp[i - 1][j] || dp[i - 1][j - nums[i - 1]];
      } else {
        dp[i][j] = dp[i - 1][j];
      }
    }
  }
  /**
   * What are we looking for here? Given the first n numbers, we want the current
   * sum to be `maxSum` above, if it's not possible, we will do `maxSum--` and keep
   * going to find the first match.
   */
  for (let j = maxSum; j >= 0; j--) {
    if (dp[n][j] === true) {
      return totalSum - 2 * j;
    }
  }
}

/**
 *
 * Solution 4: bottom-up dynamic programming with reduced space.
 *
 * Time: O(mn) m: total sum
 * Space: O(m)
 *
 * @param {number[]} nums
 * @return {number}
 */
function minimumSubsetSumDiff4(nums) {
  const n = nums.length;
  let totalSum = 0;
  for (let i = 0; i < n; i++) {
    totalSum += nums[i];
  }
  const maxSum = Math.floor(totalSum / 2);
  const dp = new Array(maxSum + 1).fill(false);
  dp[0] = true;
  for (let i = 1; i <= n; i++) {
    for (let j = maxSum; j >= nums[i - 1]; j--) {
      dp[j] = dp[j] || dp[j - nums[i - 1]];
    }
  }
  for (let j = dp.length - 1; j >= 0; j--) {
    if (dp[j] === true) {
      return totalSum - 2 * j;
    }
  }
}

// Test
console.log(minimumSubsetSumDiff1([1, 2, 3, 9])); // 3
console.log(minimumSubsetSumDiff1([1, 2, 7, 1, 5])); // 0
console.log(minimumSubsetSumDiff1([1, 3, 100, 4])); // 92
console.log(minimumSubsetSumDiff2([1, 2, 3, 9])); // 3
console.log(minimumSubsetSumDiff2([1, 2, 7, 1, 5])); // 0
console.log(minimumSubsetSumDiff2([1, 3, 100, 4])); // 92
console.log(minimumSubsetSumDiff3([1, 2, 3, 9])); // 3
console.log(minimumSubsetSumDiff3([1, 2, 7, 1, 5])); // 0
console.log(minimumSubsetSumDiff3([1, 3, 100, 4])); // 92
console.log(minimumSubsetSumDiff4([1, 2, 3, 9])); // 3
console.log(minimumSubsetSumDiff4([1, 2, 7, 1, 5])); // 0
console.log(minimumSubsetSumDiff4([1, 3, 100, 4])); // 92
