/**
 *
 * Problem:
 * In a non-empty array of integers, every number appears twice except for one, find
 * that single number.
 * https://leetcode.com/problems/single-number/
 *
 * Example 1:
 * Input: [1, 4, 2, 1, 3, 2, 3]
 * Output: 4
 *
 * Example 2:
 * Input: [7, 9, 7]
 * Output: 9
 *
 *
 * Time: O(n)
 * Space: O(1)
 *
 * @param {number[]} nums
 * @return {number}
 */
function findSingleNumber(nums) {
  /**
   * Similar as problem 268_missing-number, we just simply XOR all numbers in the array,
   * the identical numbers will become 0 after XOR, only the single number will remain.
   *
   * Note: we can also solve this problem by storing the count of each number in a map
   * and loop that map after to find whose count is 1, but the downside is it requires
   * additional space for the map.
   */
  let xorResult = 0;
  for (let i = 0; i < nums.length; i++) {
    xorResult ^= nums[i];
  }
  return xorResult;
}

// Test
console.log(findSingleNumber([1, 4, 2, 1, 3, 2, 3])); // 4
console.log(findSingleNumber([7, 9, 7])); // 9
