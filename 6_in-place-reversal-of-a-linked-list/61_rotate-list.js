const { getLinkedList, printLinkedList } = require('../_utils');

/**
 *
 * Problem:
 * Given a linked list, rotate the list to the right by k places, where k is
 * non-negative.
 * https://leetcode.com/problems/rotate-list/
 *
 * Example 1:
 * Input: 1->2->3->4->5->NULL, k = 2
 * Output: 4->5->1->2->3->NULL
 * Explanation:
 * rotate 1 steps to the right: 5->1->2->3->4->NULL
 * rotate 2 steps to the right: 4->5->1->2->3->NULL
 *
 * Example 2:
 * Input: 0->1->2->NULL, k = 4
 * Output: 2->0->1->NULL
 * Explanation:
 * rotate 1 steps to the right: 2->0->1->NULL
 * rotate 2 steps to the right: 1->2->0->NULL
 * rotate 3 steps to the right: 0->1->2->NULL
 * rotate 4 steps to the right: 2->0->1->NULL
 *
 * Time: O(n)
 * Space: O(1)
 *
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
function rotateLinkedList(head, k) {
  if (!head || k === 0) {
    return head;
  }
  /**
   * The basic idea behind this problem is: find the last node of the linked
   * list and connect that to the head node so the linked list become a cycle,
   * then find the correct node (length - k % length), cut the linked list from
   * the node before that one.
   */
  let length = 0;
  let current = head;
  let prev = null;
  /**
   * O(n) get the length of the linked list, note the initial value of the `length`
   * is 0 because when the loop exits, `current` will be null.
   */
  while (current) {
    prev = current;
    current = current.next;
    length++;
  }
  // if k is in multiples of the length, nothing happens after rotation
  if (k % length === 0) {
    return head;
  }

  // connect the last node with head node
  const lastNode = prev;
  lastNode.next = head;

  // find the `length - (k % length)` node and cut
  current = head;
  prev = null;
  let rotateTimes = length - (k % length);
  while (rotateTimes > 0) {
    prev = current;
    current = current.next;
    rotateTimes--;
  }
  prev.next = null;
  return current;
}

// Test
const head1 = getLinkedList([1, 2, 3, 4, 5]);
const newHead1 = rotateLinkedList(head1, 2);
printLinkedList(newHead1); // 4 -> 5 -> 1 -> 2 -> 3

const head2 = getLinkedList([0, 1, 2]);
const newHead2 = rotateLinkedList(head2, 4);
printLinkedList(newHead2); // 2 -> 0 -> 1
