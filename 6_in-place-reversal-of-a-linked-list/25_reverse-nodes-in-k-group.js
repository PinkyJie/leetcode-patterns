const { printLinkedList, buildLinkedList } = require('../_utils');

/**
 *
 * Problem:
 * Given the head of a LinkedList and a number k, reverse every k sized sub-list
 * starting from the head. If, in the end, you are left with a sub-list with less
 * than k elements, don't reverse them.
 * https://leetcode.com/problems/reverse-nodes-in-k-group/
 *
 * Time: O(n + k)
 * Space: O(1)
 *
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
function reverseNodesInKGroup(head, k) {
  // used to store the new head node
  let newHead;
  // O(n)
  let current = head;
  let prev = null;
  let nodeCount;
  while (current) {
    nodeCount = 1;
    const endOfLastGroupAfterReversal = prev;
    const startOfCurrentGroup = current;
    /**
     * Similar as 92_reverse-linked-list-ii here, reverse every k nodes in
     * the following loop, after reversal is finished, update the pointers:
     *  * `startOfCurrentGroup` now is the end of the group after reversal, so
     * its next needs to point to `current` (the k+1)
     *  * if `endOfLastGroupAfterReversal` doesn't exist, this is the first k
     * nodes, update the `newHead` as the `prev` (end of the current group)
     *  * if `endOfLastGroupAfterReversal` exists, its next needs to point to
     * `prev` (end of the current group)
     *  * finally update `prev` next round to be `startOfCurrentGroup`, because
     * it is now the end of the current group after reversal
     */
    while (current && nodeCount <= k) {
      const next = current.next;
      current.next = prev;
      prev = current;
      current = next;
      nodeCount++;
    }
    /**
     * if the above loop exits because of the `nodeCount`, the linked list arrives
     * its end and the node count in the last group is less than k, at this moment:
     * current = null, prev = the last node before reversal, and most importantly
     * here we have `startOfCurrentGroup.next = endOfLastGroupAfterReversal` (why?
     * it happens for the 1st loop above for every group). This is useful when we
     * re-reverse the last group (less than k nodes) below.
     */
    if (nodeCount !== k + 1) {
      break;
    }

    startOfCurrentGroup.next = current;
    if (!endOfLastGroupAfterReversal) {
      newHead = prev;
    } else {
      endOfLastGroupAfterReversal.next = prev;
    }
    prev = startOfCurrentGroup;
  }
  if (nodeCount !== k + 1) {
    /**
     * If we have k - 1 nodes left, the loop below actually run k times, remember
     * above we have `startOfCurrentGroup.next = endOfLastGroup`, so besides of
     * the remaining nodes, we also do one more reversal for the connection between
     * `endOfLastGroup` and `startOfCurrentGroup`. For example, [1,2,3,4,5,6,7,8],
     * before the below while loop, we have 6 -> 8 -> 7 -> 6, so the following
     * reversal will do 6 -> 7 -> 8, the connection between 6 -> 8 will be removed
     * because we have current = 8 and we set `prev = null` below.
     */
    current = prev;
    prev = null;
    // O(nodeCount) <- nodeCount <= k
    while (current && nodeCount > 0) {
      const next = current.next;
      current.next = prev;
      prev = current;
      current = next;
      nodeCount--;
    }
  }
  return newHead;
}

// Test
const head1 = buildLinkedList([1, 2, 3, 4, 5, 6, 7, 8]);
const newHead1 = reverseNodesInKGroup(head1, 3);
printLinkedList(newHead1); // 3 -> 2 -> 1 -> 6 -> 5 -> 4 -> 7 -> 8

const head2 = buildLinkedList([1, 2, 3, 4, 5, 6, 7, 8, 9]);
const newHead2 = reverseNodesInKGroup(head2, 3);
printLinkedList(newHead2); // 3 -> 2 -> 1 -> 6 -> 5 -> 4 -> 9 -> 8 -> 7
