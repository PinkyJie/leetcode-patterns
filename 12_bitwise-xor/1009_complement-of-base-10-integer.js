/**
 *
 * Problem:
 * Every non-negative integer N has a binary representation, for example, 8 can be
 * represented as "1000" in binary and 7 as "0111" in binary. The complement of a binary
 * representation is the number in binary that we get when we change every 1 to a 0 and
 * every 0 to a 1. For example, the binary complement of "1010" is "0101". For a given
 * positive number N in base-10, return the complement of its binary representation as a
 * base-10 integer.
 * https://leetcode.com/problems/complement-of-base-10-integer/
 *
 * Example 1:
 * Input: 8
 * Output: 7
 * Explanation: 8 is 1000 in binary, its complement is 0111 in binary, which is 7 in
 * base-10.
 *
 * Example 2:
 * Input: 10
 * Output: 5
 * Explanation: 10 is 1010 in binary, its complement is 0101 in binary, which is 5 in
 * base-10.
 *
 *
 * Time: O(b)
 * Space: O(1)
 *
 * @param {number} num
 * @return {number}
 */
function findComplementOfBase10Integer(num) {
  /**
   * The main idea here is to find the full 1 digit in all the bits of binary
   * representation of `num`, and then use XOR to get the complement, because XOR
   * has this property: `num ^ complement = 1111...` => `num ^ 1111... = complement`.
   * So the problem become how to get the bit count of the original `num`. We can simply
   * use the while loop here to move the 1 left forward by one bit each time.
   */
  let bitCount = 0;
  // this is exactly the same as `Math.pow(2, bitCount) - 1`
  while ((1 << bitCount) - 1 < num) {
    bitCount++;
  }
  // `(1 << bitCount) - 1)` is the full 1 digit binary
  return ((1 << bitCount) - 1) ^ num;
}

// Test
console.log(findComplementOfBase10Integer(8)); // 7
console.log(findComplementOfBase10Integer(10)); // 5
