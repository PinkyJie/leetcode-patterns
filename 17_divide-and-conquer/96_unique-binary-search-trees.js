/**
 *
 * Problem:
 * Given a number n, write a function to return the count of structurally unique Binary
 * Search Trees (BST) that can store values 1 to n.
 *
 * Example 1:
 * Input: 2
 * Output: 2
 * Explanation: As we saw in the previous problem, there are 2 unique BSTs storing
 * numbers from 1 to 2. (check visual explanation in 95_unique-binary-search-trees-ii)
 *
 * Example 2:
 * Input: 3
 * Output: 5
 * Explanation: There will be 5 unique BSTs that can store numbers from 1 to 3.(check
 * visual explanation in 95_unique-binary-search-trees-ii)
 *
 *
 * Time: O(2^n)
 * Space: O(2^n)
 *
 * @param {number} n
 * @return {number}
 */
function countUniqueBST(n) {
  const memo = {};
  return _countUniqueBSTBetween(1, n, memo);
}

/**
 *
 * Follow the same approach as 95_unique-binary-search-trees-ii, but this time we
 * can use memoization because the result is just a plain number (count).
 */
function _countUniqueBSTBetween(start, end, memo) {
  const cacheKey = `${start},${end}`;
  if (memo[cacheKey] !== undefined) {
    return memo[cacheKey];
  }

  if (start >= end) {
    return 1;
  }

  let count = 0;
  for (let rootValue = start; rootValue <= end; rootValue++) {
    const leftSubTreeRootsCount = _countUniqueBSTBetween(
      start,
      rootValue - 1,
      memo
    );
    const rightSubTreeRootsCount = _countUniqueBSTBetween(
      rootValue + 1,
      end,
      memo
    );
    count += leftSubTreeRootsCount * rightSubTreeRootsCount;
  }
  memo[cacheKey] = count;
  return count;
}

/**
 * A more simplified solution: the tricky part is to understand the count
 * of [i + 1, n] can be treated as the same count of [1, n - (i + 1) + 1].
 * Time: O(2^n)
 */
function countUniqueBST2(n) {
  // for negative n, we also need to return 1, cause [null] is "one" node
  if (n <= 1) {
    return 1;
  }
  let count = 0;
  for (let i = 1; i <= n; i++) {
    const leftSubTreeCount = countUniqueBST2(i - 1);
    const rightSubTreeCount = countUniqueBST2(n - i);
    count += leftSubTreeCount * rightSubTreeCount;
  }
  return count;
}

/**
 * A non-recursive version based on countUniqueBST2() above.
 * Time: O(n^2)
 */
function countUniqueBST3(n) {
  const results = new Array(n + 1).fill(0);
  results[0] = 1;

  /**
   * Think about the implementation in countUniqueBST2(): when i goes from 1~n,
   * we have F(n) = F(0) * F(n - 1) + F(1) * F(n - 2) + ... + F(n - 1) * F(0).
   */
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= i; j++) {
      results[i] += results[j - 1] * results[i - j];
    }
  }
  return results[n];
}

// Test
console.log(countUniqueBST(2)); // 2
console.log(countUniqueBST(3)); // 5

console.log(countUniqueBST2(3)); // 5
console.log(countUniqueBST3(3)); // 5
