const { buildLinkedList } = require('../_utils');

/**
 *
 * Problem:
 * Given the head of a Singly LinkedList, write a method to return the middle node of
 * the LinkedList. If the total number of nodes in the LinkedList is even, return the
 * second middle node.
 * https://leetcode.com/problems/middle-of-the-linked-list/
 *
 * Example 1:
 * Input: 1 -> 2 -> 3 -> 4 -> 5 -> null
 * Output: 3
 *
 * Example 2:
 * Input: 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> null
 * Output: 4
 *
 * Time: O(n)
 * Space: O(1)
 *
 * @param {ListNode} head
 * @return {ListNode}
 */
function findMiddleOfLinkedList(head) {
  let slowPointer = head;
  let fastPointer = head;
  /**
   * When fast pointer (2-step) reach the end, the slow pointer's position is at
   * the middle of the linked list.
   */
  while (fastPointer && fastPointer.next) {
    slowPointer = slowPointer.next;
    fastPointer = fastPointer.next.next;
  }
  return slowPointer;
}

// Test
const head1 = buildLinkedList([1, 2, 3, 4, 5]);
console.log(findMiddleOfLinkedList(head1).val); // 3

const head2 = buildLinkedList([1, 2, 3, 4, 5, 6]);
console.log(findMiddleOfLinkedList(head2).val); // 4

const head3 = buildLinkedList([1, 2, 3, 4, 5, 6, 7]);
console.log(findMiddleOfLinkedList(head3).val); // 4
