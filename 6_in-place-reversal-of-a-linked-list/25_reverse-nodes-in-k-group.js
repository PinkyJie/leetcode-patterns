const { printLinkedList, buildLinkedList } = require('../_utils');

/**
 *
 * Problem:
 * Given the head of a LinkedList and a number k, reverse every k sized sub-list
 * starting from the head. If, in the end, you are left with a sub-list with less
 * than k elements, don't reverse them.
 * https://leetcode.com/problems/reverse-nodes-in-k-group/
 *
 * Time: O(n)
 * Space: O(1)
 *
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
function reverseNodesInKGroup(head, k) {
  // used to store the new head node
  let newHead = null;
  // O(n)
  let start = head;
  let end = head;
  let nodeCount = 0;
  // used to store the end node of the last K group after reversal
  let endOfLastGroupAfterReversal = null;
  while (end) {
    // O(k)
    while (nodeCount < k && end) {
      end = end.next;
      nodeCount++;
    }

    /**
     * only do reversal between `start` and `end` when `nodeCount === k`
     */
    if (nodeCount === k) {
      // O(k)
      const newStart = _reverse(start, end);
      if (!newHead) {
        newHead = newStart;
      } else {
        // connect last k group's end to the new start
        endOfLastGroupAfterReversal.next = newStart;
      }
      // update variable for next k group
      endOfLastGroupAfterReversal = start;
      start = end;
      nodeCount = 0;
    } else {
      /**
       * This is required because in the `_reverse()` below, after reversal
       * the end node's next will be null.
       */
      endOfLastGroupAfterReversal.next = start;
    }
  }
  return newHead;
}

/**
 * Do it recursively.
 */
function reverseNodesInKGroupRecursive(head, k) {
  let start = head;
  let end = start;
  for (let i = 0; i < k; i++) {
    if (!end) {
      return start;
    }
    end = end.next;
  }

  const newHead = _reverse(start, end);
  start.next = reverseNodesInKGroupRecursive(end, k);
  return newHead;
}

/**
 *
 * Reverse the linked list from node p (inclusive) and node q (exclusive).
 *
 * @param {ListNode} p
 * @param {ListNode} q
 * @return {ListNode}
 */
function _reverse(p, q) {
  let prev = null;
  let current = p;
  while (current !== q) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  return prev;
}

// Test
const head1 = buildLinkedList([1, 2, 3, 4, 5, 6, 7, 8]);
const newHead1 = reverseNodesInKGroup(head1, 3);
const newHead11 = reverseNodesInKGroupRecursive(head1, 3);
printLinkedList(newHead1); // 3 -> 2 -> 1 -> 6 -> 5 -> 4 -> 7 -> 8
printLinkedList(newHead11); // 3 -> 2 -> 1 -> 6 -> 5 -> 4 -> 7 -> 8

const head2 = buildLinkedList([1, 2, 3, 4, 5, 6, 7, 8, 9]);
const newHead2 = reverseNodesInKGroup(head2, 3);
const newHead22 = reverseNodesInKGroupRecursive(head2, 3);
printLinkedList(newHead2); // 3 -> 2 -> 1 -> 6 -> 5 -> 4 -> 9 -> 8 -> 7
printLinkedList(newHead22); // 3 -> 2 -> 1 -> 6 -> 5 -> 4 -> 9 -> 8 -> 7
