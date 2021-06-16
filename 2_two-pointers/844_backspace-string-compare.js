/**
 *
 * Problem:
 * Given two strings containing backspaces (identified by the character ‘#’), check if the
 * two strings are equal. Note that after backspacing an empty text, the text will
 * continue empty (e.g. "a##" => "", "#" => "")
 * https://leetcode.com/problems/backspace-string-compare/
 *
 * Example 1:
 * Input: str1="xy#z", str2="xzz#"
 * Output: true
 * Explanation: After applying backspaces the strings become "xz" and "xz" respectively.
 *
 * Example 2:
 * Input: str1="xy#z", str2="xyz#"
 * Output: false
 * Explanation: After applying backspaces the strings become "xz" and "xy" respectively.
 *
 * Time: O(m + n)
 * Space: O(1)
 *
 * @param {string} str1
 * @param {string} str2
 * @return {boolean}
 */
function backspaceStringCompare(str1, str2) {
  // Starting from the end of the string, it's easier to consider the "#".
  let i = str1.length - 1;
  let j = str2.length - 1;

  while (i >= 0 || j >= 0) {
    i = _getNextIndex(str1, i);
    j = _getNextIndex(str2, j);

    // both str1 and str2 reach the start of the string
    if (i < 0 && j < 0) {
      return true;
    }

    // only one string reaches the start of the string
    if (i < 0 || j < 0) {
      return false;
    }

    if (str1[i] !== str2[j]) {
      return false;
    }
    // str1[i] === str2[j] => decrease index
    i--;
    j--;
  }
  return true;
}

function _getNextIndex(str, startIndex) {
  let nextIndex = startIndex;
  let backspaceCount = 0;

  while (nextIndex >= 0) {
    if (str[nextIndex] === '#') {
      backspaceCount++;
    } else if (backspaceCount > 0) {
      /**
       * Need to consider this scenario: "a#b##", if we use `nextIndex -= backspaceCount`,
       * the 2nd "#" will be ignored.
       */
      backspaceCount--;
    } else {
      break;
    }
    nextIndex--;
  }
  return nextIndex;
}

// Test
console.log(backspaceStringCompare('xy#z', 'xzz#')); // true
console.log(backspaceStringCompare('xy#z', 'xyz#')); // false
