/**
 *
 * Problem:
 * We are given an array containing n distinct numbers taken from the range 0 to
 * n. Since the array has only n numbers out of the total n+1 numbers, find the
 * missing number.
 * https://leetcode.com/problems/missing-number/
 *
 * Example 1:
 * Input: [4, 0, 3, 1]
 * Output: 2
 *
 * Example 2:
 * Input: [8, 3, 5, 2, 4, 6, 0, 1]
 * Output: 7
 *
 * Time: O(n)
 * Space: O(1)
 *
 * @param {number[]} nums
 * @return {number}
 */
function findMissingNumber(nums) {
  /**
   * The basic idea here is to XOR all numbers from range [0, n] (`n + 1` numbers) and
   * get `xorForRange`, then XOR all numbers from the array and get `xorForArray`, we
   * know the array is missing one number, and all the other numbers are identical in
   * these two arrays, so if we XOR these two result, all identical pairs will result
   * in 0, the answer will be the missing number.
   *
   * Note: the problem can also be solved by array summation, i.e. get the summation of
   * the whole range and minus all the numbers in the array, we can also get the missing
   * number. The time/space complexity is the same as this implementation, the only
   * downside for the summation method is it might be overflowed.
   */
  const n = nums.length;
  // Always use 0 as the initial value of XOR result, because 0 ^ any = any
  let xorForRange = 0;
  for (let i = 0; i <= n; i++) {
    xorForRange ^= i;
  }
  let xorForArray = 0;
  for (let i = 0; i < n; i++) {
    xorForArray ^= nums[i];
  }
  return xorForArray ^ xorForRange;
}

// Test
console.log(findMissingNumber([4, 0, 3, 1])); // 2
console.log(findMissingNumber([8, 3, 5, 2, 4, 6, 0, 1])); // 7
console.log(findMissingNumber([3, 1, 2, 0])); // 4
