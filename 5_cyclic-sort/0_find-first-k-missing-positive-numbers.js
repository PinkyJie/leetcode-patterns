/**
 *
 * Problem:
 * Given an unsorted array containing numbers and a number ‘k’, find the first ‘k’
 * missing positive numbers in the array.
 *
 * Example 1:
 * Input: [3, -1, 4, 5, 5], k=3
 * Output: [1, 2, 6]
 * Explanation: The smallest missing positive numbers are 1, 2 and 6.
 *
 * Example 2:
 * Input: [2, 3, 4], k=3
 * Output: [1, 5, 6]
 * Explanation: The smallest missing positive numbers are 1, 5 and 6.
 *
 * Time: O(n + k)
 * Space: O(k) <- Set
 *
 * @param {number[]} numbers
 * @param {number} k
 * @return {number[]}
 */
function findFirstKMissingPositiveNumbers(numbers, k) {
  const n = numbers.length;
  // Similar as 41_first-smallest-missing-positive for this part
  for (let i = 0; i < n; i++) {
    while (numbers[i] !== i + 1) {
      if (
        numbers[i] >= 1 &&
        numbers[i] <= n &&
        numbers[i] !== numbers[numbers[i] - 1]
      ) {
        _swap(numbers, i, numbers[i] - 1);
      } else {
        break;
      }
    }
  }
  const result = [];
  /**
   * We need `extraNumbers` to store the "invalid" numbers in the array because
   * these invalid numbers can be the missing positives. Also note here we only
   * push to the `result` when the length is less than k.
   */
  const extraNumbers = new Set();
  for (let i = 0; i < numbers.length; i++) {
    if (result.length < k) {
      if (numbers[i] !== i + 1) {
        extraNumbers.add(numbers[i]);
        result.push(i + 1);
      }
    } else {
      // if `result` already has k items, we are good to go, return it directly
      return result;
    }
  }
  /**
   * If the result length is still less than k, the missing positive will be
   * [n + 1, ...], we start with n+1 and check if the missing number is already
   * inside the `extraNumbers`, if so, we skip it.
   *
   * Time: O(k) because the length of `extraNumbers` and `result` are the same
   * according to line 50-51 above, the nested loop below can only run
   * `k - result.length` (outer while) + `extraNumber.size` (inner while),
   * which is exactly k times.
   */
  let nextMissingNumber = n + 1;
  while (result.length < k) {
    while (extraNumbers.has(nextMissingNumber)) {
      nextMissingNumber++;
    }
    result.push(nextMissingNumber);
    nextMissingNumber++;
  }
  return result;
}

function _swap(array, i, j) {
  [array[i], array[j]] = [array[j], array[i]];
}

// Test
console.log(findFirstKMissingPositiveNumbers([3, -1, 4, 5, 5], 3)); // [1, 2, 6]
console.log(findFirstKMissingPositiveNumbers([2, 3, 4], 3)); // [1, 5, 6]
