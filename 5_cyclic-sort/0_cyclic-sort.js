/**
 *
 * Problem:
 * Given an array containing all the number from 1 to n without any duplicates, write
 * a function to sort the array in-place in O(n) and without any extra space.
 *
 * Example 1:
 * Input: [3, 1, 5, 4, 2]
 * Output: [1, 2, 3, 4, 5]
 *
 * Example 2:
 * Input: [2, 6, 4, 3, 1, 5]
 * Output: [1, 2, 3, 4, 5, 6]
 *
 * Time: O(n)
 * Space: O(1)
 *
 * @param {number[]} numbers
 * @return {number[]}
 */
function cyclicSort(numbers) {
  for (let i = 0; i < numbers.length; i++) {
    /**
     * If index i doesn't hold its correct number `i + 1`, swap it to its
     * correct index `number[i] - 1`, keep swapping until number `i + 1` is
     * swapped to index i.
     *
     * Each swap will guarantee that one number is being placed to its correct
     * position, so the sorting can be finished with O(n) time.
     */
    while (numbers[i] != i + 1) {
      _swap(numbers, i, numbers[i] - 1);
    }
  }
  return numbers;
}

function _swap(array, i, j) {
  [array[i], array[j]] = [array[j], array[i]];
}

// Test
console.log(cyclicSort([3, 1, 5, 4, 2])); // [1, 2, 3, 4, 5]
console.log(cyclicSort([2, 6, 4, 3, 1, 5])); // [1, 2, 3, 4, 5, 6]
