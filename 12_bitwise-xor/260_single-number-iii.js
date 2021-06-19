/**
 *
 * Problem:
 * In a non-empty array of numbers, every number appears exactly twice except two
 * numbers that appear only once. Find the two numbers that appear only once.
 * https://leetcode.com/problems/single-number-iii/
 *
 * Example 1:
 * Input: [1, 4, 2, 1, 3, 5, 6, 2, 3, 5]
 * Output: [4, 6]
 *
 * Example 2:
 * Input: [2, 1, 3, 2]
 * Output: [1, 3]
 *
 *
 * Time: O(n)
 * Space: O(1)
 *
 * @param {number[]} nums
 * @return {number[]}
 */
function findTwoSingleNumbers(nums) {
  /**
   * The main idea here is: after XOR all the numbers in the array, what we get is
   * the result of `singleNumber1 ^ singleNumber2`, so how to get the actual numbers
   * from this XOR result? Think about how XOR works, if a result bit is 1, that bit
   * for one number must be 1, and for the other number must be 0. We can utilise this
   * property:
   *  * first find a non-zero bit in the XOR result
   *  * use all numbers from the array to bitwise and (&) with this bit, obviously there
   * can only be 2 results: 0 or the bit itself, the array will be split in 2 groups,
   * the 2 numbers we are trying to search fall in each group (because for that exact
   * bit, one number has 1 and the other has 0)
   *  * XOR all numbers for each group, since in each group all numbers appear twice
   * except the target number, the XOR result for each group is what we are looking for.
   */
  let xorForTwoNumbers = 0;
  for (let i = 0; i < nums.length; i++) {
    xorForTwoNumbers ^= nums[i];
  }
  /**
   * This is a handy way to find the rightmost set bit (the 1st non-zero bit from right
   * side), why? Negative number are represented by 2's complement (invert each bit then
   * plus 1), for example:
   * -6 -> 110 (6) -> 001 + 1 -> 010, then 6 & -6 -> 110 & 010 -> 010 -> 4
   * so 4 is the rightmost set bit for 6.
   *
   * Another naive method is to use while loop to find this:
   * let bitMask = 1;
   * while ((xor & bitMask) === 0) {
   *   bitMask = bitMask << 1;
   * }
   */
  const rightmostSetBit = xorForTwoNumbers & -xorForTwoNumbers;
  let xorWithSetBit0 = 0;
  let xorWithSetBit1 = 0;
  for (let i = 0; i < nums.length; i++) {
    if ((nums[i] & rightmostSetBit) === rightmostSetBit) {
      xorWithSetBit1 ^= nums[i];
    } else {
      xorWithSetBit0 ^= nums[i];
    }
  }
  return [xorWithSetBit0, xorWithSetBit1];
}

// Test
console.log(findTwoSingleNumbers([1, 4, 2, 1, 3, 5, 6, 2, 3, 5])); // [4, 6]
console.log(findTwoSingleNumbers([2, 1, 3, 2])); // [1, 3]
