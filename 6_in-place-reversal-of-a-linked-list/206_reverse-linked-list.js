const { printLinkedList, buildLinkedList } = require('../_utils');

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
  // set the stop condition first
  if (!head || !head.next) {
    return head;
  }
  // reverse from next to the end, return the end
  const end = reverseLinkedListRecursively(head.next);
  /**
   * Use example to illustrate: 1 -> 2 -> 3 -> 4 -> 5 -> null, at first head = 1,
   * after we do reverse from 2 to null, it will be 5 -> 4 -> 3 -> 2 -> null, but
   * 1 -> 2 is still there, so `head.next` is still 2, we need to reverse 1 -> 2
   * to 2 -> 1, so `head.next.next = head`, at the same time we need to do 1 -> null,
   * so `head.next = null`
   */
  head.next.next = head;
  head.next = null;
  return end;
}

// Test

// loop
const head1 = buildLinkedList([2, 4, 6, 8, 10]);
const newHead1 = reverseLinkedList(head1);
printLinkedList(newHead1); // 10 -> 8 -> 6 -> 4 -> 2

// recursion
const head2 = new buildLinkedList([1, 3, 5, 7, 9]);
const newHead2 = reverseLinkedListRecursively(head2);
printLinkedList(newHead2); // 9 -> 7 -> 5 -> 3 -> 1
