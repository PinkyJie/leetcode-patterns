/**
 *
 * Problem:
 * Given an array of characters where each character represents a fruit tree, you are given
 * two baskets and your goal is to put maximum number of fruits in each basket. The only
 * restriction is that each basket can have only one type of fruit.
 * https://leetcode.com/problems/fruit-into-baskets/
 *
 * Example 1:
 * Input: Fruit=['A', 'B', 'C', 'A', 'C']
 * Output: 3
 * Explanation: We can put 2 'C' in one basket and one 'A' in the other from the subarray
 * ['C', 'A', 'C']
 *
 * Example 2:
 * Input: Fruit=['A', 'B', 'C', 'B', 'B', 'C']
 * Output: 5
 * Explanation: We can put 3 'B' in one basket and two 'C' in the other basket. This can be
 * done if we start with the second letter: ['B', 'C', 'B', 'B', 'C']
 *
 * Time: O(n) <- O(n + n)
 * Space: O(n) <- map
 *
 * @param {string[]} fruitTrees
 * @return {number}
 */
function fruitIntoBaskets(fruitTrees) {
  const buckets = 2;

  let windowStart = 0;
  let windowEnd = 0;

  let fruitTypeCountMapInWindow = {};
  let maxFruitCount = 0;

  // O(n) -> `windowEnd` run through all fruit types in the `fruitTrees`
  while (windowEnd < fruitTrees.length) {
    const endFruitType = fruitTrees[windowEnd];
    // Aggregation is the count for each fruit type in the window
    fruitTypeCountMapInWindow[endFruitType] =
      (fruitTypeCountMapInWindow[endFruitType] || 0) + 1;
    windowEnd++;

    /**
     * Keep shrinking the window if the fruit type in the window (key length of
     * `fruitTypeCountMapInWindow`) is larger than k.
     *
     * Note:
     *  * O(n) in total -> `windowStart` run through all fruits in the `fruitTrees` for all
     * the outer loops
     */
    while (Object.keys(fruitTypeCountMapInWindow).length > buckets) {
      const startFruitType = fruitTrees[windowStart];
      fruitTypeCountMapInWindow[startFruitType]--;
      if (fruitTypeCountMapInWindow[startFruitType] === 0) {
        delete fruitTypeCountMapInWindow[startFruitType];
      }
      windowStart++;
    }
    /**
     * Even the `fruitTypeCountMapInWindow` key length is less than `buckets`, we still need
     * to return the result, because bucket might not be used
     *
     * Note: `windowEnd - windowStart` because `windowEnd` is not in window yet
     */
    maxFruitCount = Math.max(maxFruitCount, windowEnd - windowStart);
  }

  return maxFruitCount;
}

// Test
console.log(fruitIntoBaskets(['A', 'B', 'C', 'A', 'C'])); // 3
console.log(fruitIntoBaskets(['A', 'B', 'C', 'B', 'B', 'C'])); // 5
