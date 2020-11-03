const { printLinkedList, ListNode } = require('../_utils');

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
const head1 = new ListNode(2);
head1.next = new ListNode(4);
head1.next.next = new ListNode(6);
head1.next.next.next = new ListNode(8);
head1.next.next.next.next = new ListNode(10);
const newHead1 = reverseLinkedList(head1);
printLinkedList(newHead1); // 10 -> 8 -> 6 -> 4 -> 2

// recursion
const head2 = new ListNode(1);
head2.next = new ListNode(3);
head2.next.next = new ListNode(5);
head2.next.next.next = new ListNode(7);
head2.next.next.next.next = new ListNode(9);
const newHead2 = reverseLinkedListRecursively(head2);
printLinkedList(newHead2); // 9 -> 7 -> 5 -> 3 -> 1
