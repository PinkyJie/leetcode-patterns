/**
 *
 * Problem:
 * Given two integer arrays to represent weights and profits of N items, we need to find
 * a subset of these items which will give us maximum profit such that their cumulative
 * weight is not more than a given number C. Each item can only be selected once, which
 * means either we put an item in the knapsack or we skip it.
 *
 * Items: { Apple, Orange, Banana, Melon }
 * Weights: { 2, 3, 1, 4 }
 * Profits: { 4, 5, 3, 7 }
 * Knapsack capacity: 5
 *
 * Apple + Orange (total weight 5) => 9 profit
 * Apple + Banana (total weight 3) => 7 profit
 * Orange + Banana (total weight 4) => 8 profit
 * Banana + Melon (total weight 5) => 10 profit  -> highest profit
 *
 */

/**
 *
 * Solution 1: recursive brute-force way.
 *
 * @param {number[]} weights
 * @param {number[]} profits
 * @param {number} capacity
 * @return {number}
 */
function knapsack1(weights, profits, capacity) {
  return _recursive(weights, profits, capacity, 0);
}

/**
 *
 * We can think about the whole process as a decision tree. For example,
 *    Item:     A   B   C
 *    Weights:  1   2   3
 *    Profits:  1   6   10
 *    Capacity: 3
 * Since the selection order doesn't matter, we can start from A, for all 3 items,
 * we can either select it to the final group or skip it, so this decision tree can
 * be described as a binary tree:
 *                              selected (weights, profits)
 *                                       [] (0,0)
 *                      /                                \
 *                    [A] (1,1)                          [] (0,0)
 *             /              \                  /                 \
 *           [A,B] (3,7)      [A] (1,1)        [B] (2,6)           []  (0,0)
 *           /   \          /     \          /      \            /     \
 *      [A,B,C]   [A,B]   [A,C]    [A]     [B,C]    [B]        [C]     []
 *      (6,17)    (3,7)   (4,13)   (1,1)   (5,16)   (2,6)      (3,10)  (0,0)
 *        X                X                 X
 * We can easily find the final selected group should be [C], the maximum profit is 10.
 *
 *
 * Time: O(2^n) <- for each item we can either select it or skip it, so 2 options
 * Space: O(n) <- for recursive stack, recursion will run n depth (DFS), as
 * `currentIndex` is increased by 1 each time
 *
 * @param {number[]} weights
 * @param {number[]} profits
 * @param {number} capacity
 * @param {number} currentIndex
 * @returns {number}
 */
function _recursive(weights, profits, capacity, currentIndex) {
  if (currentIndex >= weights.length || capacity <= 0) {
    return 0;
  }
  let profitWithCurrent = 0;
  if (weights[currentIndex] <= capacity) {
    profitWithCurrent =
      profits[currentIndex] +
      _recursive(
        weights,
        profits,
        capacity - weights[currentIndex],
        currentIndex + 1
      );
  }
  const profitWithoutCurrent = _recursive(
    weights,
    profits,
    capacity,
    currentIndex + 1
  );
  return Math.max(profitWithCurrent, profitWithoutCurrent);
}

/**
 *
 * Solution 2: top-down dynamic programming with memoization.
 * Why we call it "top-down", because when we calculate all the possible combination
 * of `index/capacity`, we starting from the the original `capacity` first, which
 * means `capacity` will be decreased for each recursion, so it's from "top" of the
 * capacity down to the bottom.
 *
 * @param {number[]} weights
 * @param {number[]} profits
 * @param {number} capacity
 * @return {number}
 */
function knapsack2(weights, profits, capacity) {
  // use matrix to store all `index/capacity` combination
  const memo = new Array(weights.length)
    .fill(0)
    .map(() => new Array(capacity + 1));
  return _recursiveWithMemo(weights, profits, capacity, 0, memo);
}

/**
 *
 * From the above solution 1, we can easily identify that each call of `_recursive`
 * the only changing variables are `currentIndex` and `capacity`, if we redraw the
 * above decision tree with these 2 variables, it will be like this:
 *
 *                              selected (currentIndex, capacity)
 *                                       [] (0,3)
 *                      /                                \
 *                    [A] (0,2)                          [] (0,3)
 *             /              \                  /                 \
 *           [A,B] (1,0)      [A] (1,2)        [B] (1,1)           []  (1,3)
 *           /   \          /     \          /      \            /     \
 *      [A,B,C]   [A,B]   [A,C]    [A]     [B,C]    [B]        [C]     []
 *      (2,-3)    (2,0)   (2,-1)   (2,2)   (2,-2)   (2,1)      (2,0)  (2,3)
 *
 * We can see when we selected [A, B] or [C], we get the same `(currentIndex, capacity)`
 * combination, so if we have more items after C, we kind of need to call the `_recursive`
 * twice with the same parameters. That's where memoization comes into play! If we maintain
 * a cache to store the result of each calculated combination for `currentIndex/capacity`,
 * and we can pick up the cache directly if the combination is encountered in future. This
 * will boost up our performance a lot.
 *
 * Time: O(mn) m: capacity <- cause with `memo` all we need to do is to calculate all
 * the possible combination of `index/capacity`, which will be exactly `mn`.
 * Space: O(mn) <- for `memo` and recursive stack
 *
 *
 * @param {number[]} weights
 * @param {number[]} profits
 * @param {number} capacity
 * @param {number} currentIndex
 * @param {number[][]} memo
 * @returns {number}
 */
function _recursiveWithMemo(weights, profits, capacity, currentIndex, memo) {
  if (typeof memo[currentIndex][capacity] === 'undefined') {
    memo[currentIndex][capacity] = _recursive(
      weights,
      profits,
      capacity,
      currentIndex
    );
  }
  return memo[currentIndex][capacity];
}

/**
 *
 * Solution 3: bottom-up dynamic programming.
 * Similar as "Solution 2" above, we still want to calculate all the possible combination
 * of `index/capacity`, but instead of starting from the largest `capacity` value, we
 * start with the smallest one (e.g. `0` for capacity), that is, we do it in the
 * "bottom-up" way.
 *
 * Time: O(mn) m: capacity
 * Space: O(mn) <- for `dp` array
 *
 * @param {number[]} weights
 * @param {number[]} profits
 * @param {number} capacity
 * @return {number}
 */
function knapsack3(weights, profits, capacity) {
  const n = weights.length;
  /**
   *
   * The key of bottom-up approach is to analyse the relationship between dp[i] and
   * dp[i-1], because we need to derive dp[i] from `dp[i-1]`. Think bout the `dp` here
   * as the same thing as the `memo` above, so the meaning of `dp[i][j]` is "with the
   * first i items and the capacity j, the maximum profit is?". So the
   * `dp[n - 1][capacity]` will be the final result we want.
   *
   * With that in mind, how to reach `dp[i][j]` with `dp[i - 1][j]` or `dp[i][j -1]`
   * or `dp[i - 1][j - 1]`, etc. (might be a lot of to consider depending on the
   * problem)? we can think about this form the same point as above:
   *  * if we select item i: `dp[i][j] = profits[i] + dp[i - 1][j - weights[i]]`
   *  * if we skip item i: `dp[i][j] = dp[i - 1][j]`
   * Then the actual dp[i][j] is the max value of the above two.
   */
  const dp = new Array(n).fill(0).map(() => new Array(capacity + 1));
  /**
   * In order to make the above 2 formulas work, we need to make sure the array index
   * is not negative during the loop:
   *  * for loop variable `i`, we need to set up dp[0][0], cause `i` in the loop needs
   * to be at least `>= 1`
   *  * for loop variable `j`, we need to make sure that `j >= weights[i]`
   */
  dp[0][0] = 0; // max profit is 0 because there's no capacity, actually dp[x][0] = 0
  for (let i = 1; i < n; i++) {
    for (let j = 1; j <= capacity; j++) {
      if (j >= weights[i]) {
        dp[i][j] = Math.max(profits[i] + dp[i - 1][j - weights[i]]);
      } else {
        dp[i][j] = dp[i - 1][j];
      }
    }
  }
  return dp[n - 1][capacity];
}

/**
 *
 * Solution 4: bottom-up dynamic programming with reduced space.
 * Similar as "Solution 3" above, but if we look the formulas we get above closely
 * in solution 3, we can easily find out that when we calculate `dp[i][x]`, the only
 * thing we need is `dp[i-1][y]`, if we think of `dp` as a matrix, we can conclude
 * that: in order to populate row i, all we need is the values in row i - 1. Since
 * we are doing this in a bottom-up way, so row i - 1 will always be populated before
 * row i. So if update the value in place at row i - 1 when we populate row i, we don't
 * need a matrix to store all of these, the dimension can be reduced by 1: we only need
 * an array with `capacity` length.
 *
 * Time: O(mn) m: capacity
 * Space: O(m) <- for `dp` array
 *
 * @param {number[]} weights
 * @param {number[]} profits
 * @param {number} capacity
 * @return {number}
 */
function knapsack4(weights, profits, capacity) {
  const n = weights.length;
  const dp = new Array(capacity + 1).fill(0);
  /**
   * In order to make sure index is not negative, we need to populate the above
   * array with the "index 0"(e.g. row 0 in the matrix context). If we only have
   * one item 0, the maximum profit would be: if capacity is allowed (capacity is
   * larger than item 0's weight), we should always choose to select item 0, thus
   * we can get the maximum profit (profit of item 0).
   */
  for (let i = 0; i < dp.length; i++) {
    if (weights[0] <= i) {
      dp[i] = profits[0];
    }
  }
  for (let i = 1; i < n; i++) {
    /**
     * Why we staring from the largest capacity first?
     *  * because noticing when we calculate `dp[j]`, we need to use the value
     * from last round `dp[j - weights[i]]`, since weight will always to positive
     * number, which means in oder to calculate `dp[j]`, we need to keep the value
     * from the array whose index is smaller than `j`, thus we do loop for j from
     * larger index to smaller index.
     * Why we ignore scenarios when `j < weights[i]`?
     *  * because when `j > weights[i]`, dp[j]'s value would simply reuse the
     * last row's value (`dp[i][j] = dp[i - 1][j]` in matrix's context), which
     * means dp[j] will keep its existing value (cause the in-place update
     * strategy), thus we can ignore.
     */
    for (let j = capacity; j >= weights[i]; j--) {
      dp[j] = Math.max(dp[j], profits[i] + dp[j - weights[i]]);
    }
  }
  return dp[capacity];
}

// Test
const weights = [1, 2, 3, 5];
const profits = [1, 6, 10, 16];
console.log(knapsack1(weights, profits, 7)); // 22
console.log(knapsack2(weights, profits, 7)); // 22
console.log(knapsack3(weights, profits, 7)); // 22
console.log(knapsack4(weights, profits, 7)); // 22
