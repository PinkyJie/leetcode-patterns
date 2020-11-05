const { printLinkedList, getLinkedList } = require('../_utils');

/**
 *
 * Problem:
 * Given the head of a Singly LinkedList, reverse the LinkedList. Write a function to
 * return the new head of the reversed LinkedList.
 * https://leetcode.com/problems/reverse-linked-list/
 *
 *
 * Time: O(n)
 * Space: O(1)
 *
 * @param {ListNode} head
 * @return {ListNode}
 */
function reverseLinkedList(head) {
  let prev = null;
  let current = head;
  while (current) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  return prev;
}

/**
 * Do the reversion in the recursive manner.
 */
function reverseLinkedListRecursively(head) {
  return _reverse(head, null);
}

function _reverse(current, prev) {
  // set the the stop condition first
  if (!current) {
    return prev;
  }

  const next = current.next;
  current.next = prev;
  /**
   * Return the recursive call at last so the deepest call result can be
   * returned to outer function (e.g. `reverseLinkedListRecursively`)
   */
  return _reverse(next, current);
}

// Test

// loop
const head1 = getLinkedList([2, 4, 6, 8, 10]);
const newHead1 = reverseLinkedList(head1);
printLinkedList(newHead1); // 10 -> 8 -> 6 -> 4 -> 2

// recursion
const head2 = new getLinkedList([1, 3, 5, 7, 9]);
const newHead2 = reverseLinkedListRecursively(head2);
printLinkedList(newHead2); // 9 -> 7 -> 5 -> 3 -> 1
