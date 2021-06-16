const { printLinkedList, buildLinkedList } = require('../_utils');

/**
 *
 * Problem:
 * Given the head of a LinkedList and two positions "p" and "q" (1-based), reverse the
 * LinkedList from position "p" to "q".
 * https://leetcode.com/problems/reverse-linked-list-ii/
 *
 *
 * Time: O(q)
 * Space: O(1)
 *
 * @param {ListNode} head
 * @param {number} p
 * @param {number} q
 * @return {ListNode}
 */
function reverseSubLinkedList(head, p, q) {
  /**
   * Corner case check, if p === q, no need to do anything.
   */
  if (p === q) {
    return head;
  }

  let i = 1;
  let current = head;
  let prev = null;
  // O(p)
  while (i < p) {
    // why `<`? use real example to help understand
    prev = current;
    current = current.next;
    i++;
  }
  // store the node before p because we need to modify its next pointer after reversal
  const copyOfNodeBeforeP = prev;
  const copyOfNodeP = current;
  // O(q - p)
  while (i <= q) {
    // why `<=`? use real example to help understand
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
    i++;
  }
  // `current` is the node after q
  copyOfNodeP.next = current;
  /**
   * Corner case check: if the node before p is not existed, which means p is the
   * head node, we can return `prev` (q) directly, if it's existed, we need to modify
   * its next pointer to point to `prev` (q).
   */
  if (copyOfNodeBeforeP) {
    copyOfNodeBeforeP.next = prev;
    return head;
  }
  return prev;
}

// Test
const head = buildLinkedList([1, 2, 3, 4, 5]);
const newHead = reverseSubLinkedList(head, 2, 4);
printLinkedList(newHead); // 1 -> 4 -> 3 -> 2 -> 5
