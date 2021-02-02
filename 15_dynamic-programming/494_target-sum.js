/**
 *
 * Problem:
 * You are given a set of non-negative numbers and a target sum 'S'. Each number should be
 * assigned either a '+' or '-' sign. We need to find the total ways to assign symbols to
 * make the sum of the numbers equal to the target 'S'.
 * https://leetcode.com/problems/target-sum/
 *
 *
 * Example 1:
 * Input: [1, 1, 2, 3], S=1
 * Output: 3
 * Explanation: The given set has '3' ways to make a sum of '1':
 * +1-1-2+3 & -1+1-2+3 & +1+1+2-3
 *
 * Example 2:
 * Input: [1, 2, 7, 1], S=9
 * Output: 2
 * Explanation: The given set has '2' ways to make a sum of '9': [+1+2+7-1] & [-1+2+7+1]
 */

/**
 *
 * Solution 1: recursive brute force.
 *
 * @param {number[]} nums
 * @param {number} targetSum
 * @return {number}
 */
function findTargetSumWays1(nums, targetSum) {
  return _recursive(nums, targetSum, 0);
}

/**
 *
 * For each number, we have 2 options: make it positive or make it negative, so it's
 * similar as the 0_0-1-knapsack problem (choose or skip). One thing we need to take
 * care here is every number needs to be used, so our exit condition should check both
 * the sum and the currentIndex to make sure it reaches the last number.
 *
 * Time: O(2^n) <- each number has 2 choices
 * Space: O(n) <- recursion stack
 *
 * @param {number[]} nums
 * @param {number} targetSum
 * @param {number} currentIndex
 * @return {number}
 */
function _recursive(nums, targetSum, currentIndex) {
  if (currentIndex === nums.length) {
    return targetSum === 0 ? 1 : 0;
  }
  const positiveCurrentWays = _recursive(
    nums,
    targetSum - nums[currentIndex],
    currentIndex + 1
  );
  const negativeCurrentWays = _recursive(
    nums,
    targetSum + nums[currentIndex],
    currentIndex + 1
  );
  return positiveCurrentWays + negativeCurrentWays;
}

/**
 *
 * Solution 2: top-down dynamic programming with memoization.
 * The only changing variable are again `currentIndex` and `targetSum`, the possible
 * range of `currentIndex` is still `0 ~ n-1`, but the possible range of `targetSum`
 * would be a bit different, it can include negative values: think about if all numbers
 * are negative, the sum will be `-totalSum`, this would be the lower bound, obviously
 * the upper bound would be `totalSum`, so in order to put these values in an array,
 * we need to remap the index to positive index.
 *
 * @param {number[]} nums
 * @param {number} targetSum
 * @return {number}
 */
function findTargetSumWays2(nums, targetSum) {
  let totalSum = 0;
  for (let i = 0; i < nums.length; i++) {
    totalSum += nums[i];
  }

  const memo = new Array(nums.length)
    .fill(0)
    .map(() => new Array(2 * totalSum + 1));
  return _recursiveWithMemo(nums, targetSum, totalSum, 0, memo);
}

/**
 *
 * Time: O(mn) m: 2 * targetSum
 * Space: O(mn) <- for `memo` and recursion stack
 *
 * @param {number[]} nums
 * @param {number} targetSum
 * @param {number} totalSum
 * @param {number} currentIndex
 * @param {number[][]} memo
 * @return {number}
 */
function _recursiveWithMemo(nums, targetSum, totalSum, currentIndex, memo) {
  /**
   * Note we remap `targetSum` index to `targetSum + totalSum` to make sure the range
   * of [-totalSum, totalSum] can be remapped to [0, 2 * totalSum].
   */
  if (typeof memo[currentIndex][targetSum + totalSum] === 'undefined') {
    memo[currentIndex][targetSum + totalSum] = _recursive(
      nums,
      targetSum,
      currentIndex
    );
  }
  return memo[currentIndex][targetSum + totalSum];
}

/**
 *
 * Solution 3: bottom-up dynamic programming.
 * The meaning of `dp[i][j]` is given the first i numbers, how many ways we can find
 * to make its "sum" (with either + or - for each number) to equal to j. Note: the
 * sum here is the original sum (ranged form [-totalSum, totalSum]), but the j here
 * is remapped, we need to do the conversion.
 *
 * Time: O(mn) m: 2 * targetSum
 * Space: O(mn) <- for `dp`
 *
 * @param {number[]} nums
 * @param {number} targetSum
 * @return {number}
 */
function findTargetSumWays3(nums, targetSum) {
  let totalSum = 0;
  for (let i = 0; i < nums.length; i++) {
    totalSum += nums[i];
  }

  /**
   * If we don't do this check before the loop, the final result
   * `dp[nums.length - 1][targetSum + totalSum]` might be out of range, and would
   * end up to `undefined`.
   */
  if (targetSum < -totalSum || targetSum > totalSum) {
    return 0;
  }

  const dp = new Array(nums.length)
    .fill(0)
    .map(() => new Array(2 * totalSum + 1));

  /**
   * Initialize row 0: If we only have one number (index 0), the only way to make the
   * sum equal to the target sum is: the number itself is equal to target sum or the
   * negative target sum.
   */
  for (let j = 0; j <= 2 * totalSum; j++) {
    const originalSumBeforeRemap = j - totalSum;
    // edge case: +0 and -0 are considered as two ways
    if (originalSumBeforeRemap === 0 && nums[0] === 0) {
      dp[0][j] = 2;
    } else {
      dp[0][j] = nums[0] === Math.abs(originalSumBeforeRemap) ? 1 : 0;
    }
  }

  /**
   * The index can be confusing here, drawing a table can help us understand. Take
   * the [1,1,2,3] as an example, total sum is 7, so the range can be [-7, 7]
   * originalSum    -7  -6  -5  -4  -3  -2  -1  0  1  2  3   4  5   6   7
   * mappedIndex    0   1   2   3   4   5   6  7  8  9  10  11  12  12  14
   * dp[0] ([1])    0   0   0   0   0   0   1  0  1  0  0   0   0   0   0
   * dp[1] ([1, 1]) 0   0   0   0   0   1   0  2  0  1  0   0   0   0   0
   *
   * We can derive the relationship between dp[i][x] and dp[i - 1][x] easily from
   * the above table:
   *  * dp[0][6] = 1 and dp[0][8] = 1 because only one way to get -1 and 1
   *  * dp[1][5] = 1 because only one way to get -2: [-1, -1]
   *  * dp[1][7] = 2 because two ways to get 0: [-1, 1] and [1, -1]
   *  * dp[1][9] = 1 because only one way to get 2: [1, 1]
   *
   * How to get dp[1][5]? dp[0][6 - '1'] + dp[0][6 + '1']
   * How to get dp[1][7]? dp[0][7 - '1'] + dp[0][7 + '1']
   * How to get dp[1][9]? dp[0][9 - '1'] + dp[0][9 + '1']
   * Note '1' is the next number.
   *
   * So we just need to use the remapped index with the nums[i] to form the formula.
   */
  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j <= 2 * totalSum; j++) {
      /**
       * It's a bit different as other DP problems here, cause we not only need to
       * consider `j - nums[i]`, we also need to consider `j + nums[i]`, to make
       * sure the array index is positive, we need to do 3 conditions check here.
       */
      if (j - nums[i] >= 0 && j + nums[i] <= 2 * totalSum) {
        dp[i][j] = dp[i - 1][j - nums[i]] + dp[i - 1][j + nums[i]];
      } else if (j - nums[i] >= 0) {
        dp[i][j] = dp[i - 1][j - nums[i]];
      } else {
        dp[i][j] = dp[i - 1][j + nums[i]];
      }
    }
  }
  return dp[nums.length - 1][targetSum + totalSum];
}

/**
 *
 * Solution 4: bottom-up dynamic programming with reduced space.
 *
 * Time: O(mn) m: 2 * targetSum
 * Space: O(m) <- for `dp` and `cache`
 *
 * @param {number[]} nums
 * @param {number} targetSum
 * @return {number}
 */
function findTargetSumWays4(nums, targetSum) {
  let totalSum = 0;
  for (let i = 0; i < nums.length; i++) {
    totalSum += nums[i];
  }

  if (targetSum < -totalSum || targetSum > totalSum) {
    return 0;
  }

  const dp = new Array(2 * totalSum + 1);
  // initialize row 0
  for (let j = 0; j < dp.length; j++) {
    const originalSumBeforeRemap = j - totalSum;
    if (originalSumBeforeRemap === 0 && nums[0] === 0) {
      dp[j] = 2;
    } else {
      dp[j] = nums[0] === Math.abs(originalSumBeforeRemap) ? 1 : 0;
    }
  }

  let cache = Array.from(dp);
  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j <= 2 * totalSum; j++) {
      if (j - nums[i] >= 0 && j + nums[i] <= 2 * totalSum) {
        dp[j] = cache[j - nums[i]] + cache[j + nums[i]];
      } else if (j - nums[i] >= 0) {
        dp[j] = cache[j - nums[i]];
      } else {
        dp[j] = cache[j + nums[i]];
      }
    }
    cache = Array.from(dp);
  }
  return dp[targetSum + totalSum];
}

/**
 * Solution 5: Smaller sum range.
 * Based on the above analysis, the sum range for DP will be [-totalSum, totalSum],
 * we can shrink this range by utilizing another fact: consider the array can be
 * divided into 2 subsets, one with positive symbol (marked a P) and the other with
 * negative symbol (marked as N), so we have
 *  * `sum(P) + sum(N) = totalSum`
 *  * `sum(P) - sum(N) = targetSum`
 * If we combine these 2 formula together, we have
 *  * `(sum(P) + sum(N)) + (sum(P) - sum(N)) = totalSum + targetSum` =>
 * `2 * sum(P) = totalSum + targetSum`
 * So the problem become the same as 416_partition-equal-subset-sum, e.g. find a
 * subset P whose sum equal to `(totalSum + targetSum)/2`, but instead of returning
 * true/false, this problem we need to return the ways.
 *
 * Time: O(mn) m: (totalSum + targetSum) / 2
 * Space: O(m)
 *
 * @param {number[]} nums
 * @param {number} targetSum
 * @return {number}
 */
function findTargetSumWays5(nums, targetSum) {
  let totalSum = 0;
  for (let i = 0; i < nums.length; i++) {
    totalSum += nums[i];
  }

  if (targetSum > totalSum || (totalSum + targetSum) % 2) {
    return 0;
  }

  const sum = (totalSum + targetSum) / 2;
  const dp = new Array(sum + 1);
  /**
   * A bit counter-intuitive here: remember we are returning the ways to choices
   * to get the sum. If `sum = 0`, whatever `nums[0]` is, we always have a way
   * to make sure its sum is 0, e.g. skip the number and then the sum is 0. But
   * another edge case to consider is: if the `nums[0] = 0` also, then we have
   * 2 ways to get 0 sum, either select it or skip it, in both scenarios the sum
   * is 0, that's why we return 2 for that case.
   */
  for (let j = 0; j <= sum; j++) {
    if (j === 0) {
      dp[0] = nums[0] === 0 ? 2 : 1;
    } else {
      dp[j] = nums[0] === j ? 1 : 0;
    }
  }

  for (let i = 1; i < nums.length; i++) {
    for (let j = sum; j >= nums[i]; j--) {
      dp[j] = dp[j] + dp[j - nums[i]];
    }
  }
  return dp[sum];
}

// Test
console.log(findTargetSumWays1([1, 1, 2, 3], 1)); // 3
console.log(findTargetSumWays1([1, 2, 7, 1], 9)); // 2
console.log(findTargetSumWays2([1, 1, 2, 3], 1)); // 3
console.log(findTargetSumWays2([1, 2, 7, 1], 9)); // 2
console.log(findTargetSumWays3([1, 1, 2, 3], 1)); // 3
console.log(findTargetSumWays3([1, 2, 7, 1], 9)); // 2
console.log(findTargetSumWays4([1, 1, 2, 3], 1)); // 3
console.log(findTargetSumWays4([1, 2, 7, 1], 9)); // 2
console.log(findTargetSumWays5([1, 1, 2, 3], 1)); // 3
console.log(findTargetSumWays5([1, 2, 7, 1], 9)); // 2

console.log(findTargetSumWays1([0, 0, 0, 0, 0, 0, 0, 0, 1], 1)); // 256
console.log(findTargetSumWays2([0, 0, 0, 0, 0, 0, 0, 0, 1], 1)); // 256
console.log(findTargetSumWays3([0, 0, 0, 0, 0, 0, 0, 0, 1], 1)); // 256
console.log(findTargetSumWays4([0, 0, 0, 0, 0, 0, 0, 0, 1], 1)); // 256
console.log(findTargetSumWays5([0, 0, 0, 0, 0, 0, 0, 0, 1], 1)); // 256
