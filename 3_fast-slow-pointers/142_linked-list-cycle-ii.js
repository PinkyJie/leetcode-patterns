const { buildLinkedList } = require('../_utils');

/**
 *
 * Problem:
 * Given the head of a Singly LinkedList that contains a cycle, write a function to
 * find the starting node of the cycle.
 * https://leetcode.com/problems/linked-list-cycle-ii/
 *
 * Time: O(n)
 * Space: O(1)
 *
 * @param {ListNode} head
 * @return {ListNode}
 */
function findCycleStartInLinkedList(head) {
  let slowPointer = head;
  let fastPointer = head;

  let hasCycle = false;
  while (fastPointer && fastPointer.next) {
    slowPointer = slowPointer.next;
    fastPointer = fastPointer.next.next;
    if (slowPointer === fastPointer) {
      hasCycle = true;
      break;
    }
  }
  if (!hasCycle) {
    return null;
  }
  /**
   * Consider the linked list as this:
   * head   (k1)   start of cycle
   *    o----------o-------o----
   *               |  (k2) meet |
   *                ------------
   *
   * slowPointerPath: slow = k1 (between "head" and "start of cycle") + k2 (between
   * "start of cycle" and "meet point")
   * fastPointerPath: fast = k1 + k2 + (cycle length - k2) = k1 + k2 + cycle length
   *
   * While at the same time, we have fast = 2(k1 + k2), so we can deduce:
   * cycle length = k1 + k2, so the distance between "meet point" and "start of cycle"
   * is also k1 (cycle length - k2).
   *
   * Then what we need to do is just put pointer1 at "head", put pointer2 at the meet
   * point (`slow`), they will meet after they both finish k1 steps, which is exactly
   * the "start of cycle".
   */
  let pointer1 = head;
  let pointer2 = slowPointer;
  while (pointer1 !== pointer2) {
    pointer1 = pointer1.next;
    pointer2 = pointer2.next;
  }
  return pointer1;
}

// Test
const head = buildLinkedList([1, 2, 3, 4, 5, 6]);

head.next.next.next.next.next.next = head.next.next;
console.log(findCycleStartInLinkedList(head).val); // 3

head.next.next.next.next.next.next = head.next.next.next;
console.log(findCycleStartInLinkedList(head).val); // 4

head.next.next.next.next.next.next = head;
console.log(findCycleStartInLinkedList(head).val); // 1
