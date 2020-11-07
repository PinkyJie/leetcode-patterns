const { buildLinkedList, printLinkedList } = require('../_utils');

/**
 *
 * Problem:
 * Given the head of a LinkedList and a number k, reverse every alternating k
 * sized sub-list starting from the head. If, in the end, you are left with a
 * sub-list with less than k elements, reverse it too.
 *
 * Time: O(n)
 * Space: O(1)
 *
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
function reverseAlternateKNodes(head, k) {
  let newHead;
  let current = head;
  let prev = null;
  while (current) {
    const endOfLastGroupAfterReversal = prev;
    const startOfCurrentGroup = current;
    let nodeCount = 1;
    while (current && nodeCount <= k) {
      const next = current.next;
      current.next = prev;
      prev = current;
      current = next;
      nodeCount++;
    }
    startOfCurrentGroup.next = current;
    if (!endOfLastGroupAfterReversal) {
      newHead = prev;
    } else {
      endOfLastGroupAfterReversal.next = prev;
    }

    /**
     * The above section is exactly the same as 25_reverse-nodes-in-k-group,
     * the only difference is we don't need to update `prev` because that will
     * be updated below: the next k nodes doesn't need to be reversed.
     */
    while (current && nodeCount <= 2 * k) {
      prev = current;
      current = current.next;
      nodeCount++;
    }
  }
  return newHead;
}

// Test
const head1 = buildLinkedList([1, 2, 3, 4, 5, 6, 7, 8]);
const newHead1 = reverseAlternateKNodes(head1, 3);
printLinkedList(newHead1); // 3 -> 2 -> 1 -> 4 -> 5 -> 6 -> 8 -> 7

const head2 = buildLinkedList([1, 2, 3, 4, 5, 6, 7, 8, 9]);
const newHead2 = reverseAlternateKNodes(head2, 2);
printLinkedList(newHead2); // 2 -> 1 -> 3 -> 4 -> 6 -> 5 -> 7 -> 8 -> 9
