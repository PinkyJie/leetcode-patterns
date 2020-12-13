/**
 *
 * Problem:
 * Given a set of distinct numbers, find all of its permutations. Permutation is
 * defined as the re-arranging of the elements of the set. For example, {1, 2, 3} has
 * the following six permutations:
 *  {1, 2, 3}
 *  {1, 3, 2}
 *  {2, 1, 3}
 *  {2, 3, 1}
 *  {3, 1, 2}
 *  {3, 2, 1}
 * If a set has ‘n’ distinct elements it will have n! permutations.
 *
 * Example 1:
 * Input: [1,3,5]
 * Output: [1,3,5], [1,5,3], [3,1,5], [3,5,1], [5,1,3], [5,3,1]
 *
 *
 * Time: O(n n!)
 * Space: O(n n!) <- result
 *
 * @param {number[]} nums
 * @return {number[][]}
 */
function findPermutations(nums) {
  const permutations = [];
  const used = new Array(nums.length).fill(false);
  _backtrack(nums, [], permutations, used);
  return permutations;
}

function _backtrack(nums, curList, result, used) {
  if (curList.length === nums.length) {
    // O(n) to copy an array
    result.push(Array.from(curList));
  } else {
    /**
     * Similar as 78_subsets, the difference is when we reach the leaf node
     * (say [1, 2, 3]) and then go up to [1] -> [1, 3] (check explanation of
     * 78_subsets), we need to go backward to visit 2 again to get [1, 3, 2].
     * That's why we make use of a `used` array to maintain which number is
     * used in the recursion.
     */
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) {
        continue;
      }
      curList.push(nums[i]);
      used[i] = true;
      _backtrack(nums, curList, result, used);
      curList.pop();
      used[i] = false;
    }
  }
}

// Test
const result1 = findPermutations([1, 2, 3]);
result1.forEach((i) => console.log(i));
// [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]

const result2 = findPermutations([1, 3, 5]);
result2.forEach((i) => console.log(i));
// [[1, 3, 5], [1, 5, 3], [3, 1, 5], [3, 5, 1], [5, 1, 3], [5, 3, 1]]
