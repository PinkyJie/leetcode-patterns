const { buildLinkedList } = require('../_utils');

/**
 *
 * Problem:
 * Given the head of a Singly LinkedList, write a function to determine if the
 * LinkedList has a cycle in it or not.
 * https://leetcode.com/problems/linked-list-cycle/
 *
 * Time: O(n)
 * Space: O(1)
 *
 * @param {ListNode} head
 * @return {boolean}
 */
function detectCycleInLinkedList(head) {
  let slowPointer = head;
  let fastPointer = head;

  /**
   * No need to check the validity of `slowPointer` because if `fastPointer` is valid,
   * then `slowPointer` must be valid.
   */
  while (fastPointer && fastPointer.next) {
    slowPointer = slowPointer.next;
    fastPointer = fastPointer.next.next;

    /**
     * Why? When the fast pointer is approaching the slow pointer from behind we have
     * two possibilities:
     *  1. The fast pointer is one step behind the slow pointer.
     *  2. The fast pointer is two steps behind the slow pointer.
     * All other distances between the fast and slow pointers will reduce to one of
     * these two possibilities. Let’s analyze these scenarios, considering the fast
     * pointer always moves first:
     *  1. If the fast pointer is one step behind the slow pointer: The fast pointer
     * moves two steps and the slow pointer moves one step, and they both meet.
     *  2. If the fast pointer is two steps behind the slow pointer: The fast pointer
     * moves two steps and the slow pointer moves one step. After the moves, the fast
     * pointer will be one step behind the slow pointer, which reduces this scenario
     * to the first scenario. This means that the two pointers will meet in the next
     * iteration.
     */
    if (slowPointer === fastPointer) {
      return true;
    }
  }
  return false;
}

// Test
const head1 = buildLinkedList([1, 2, 3, 4, 5, 6]);
head1.next.next.next.next.next.next = head1.next.next.next;
console.log(detectCycleInLinkedList(head1)); // true

const head2 = buildLinkedList([2, 4, 6, 8, 10]);
console.log(detectCycleInLinkedList(head2)); // false
