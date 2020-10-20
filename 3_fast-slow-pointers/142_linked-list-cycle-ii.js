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

  while (fastPointer && fastPointer.next) {
    slowPointer = slowPointer.next;
    fastPointer = fastPointer.next.next;

    if (slowPointer === fastPointer) {
      let cycleLength = 1;
      slowPointer = slowPointer.next;
      /**
       * Find cycle length: keep `fastPointer` at its meeting position, keep moving
       * `slowPointer` at 1-step speed until it meets `fastPointer` again.
       */
      while (slowPointer !== fastPointer) {
        slowPointer = slowPointer.next;
        cycleLength++;
      }
      /**
       * How to find the start of the cycle: Think about we put the pointer1 at head,
       * put the pointer2 at position `cycleLength`, so pointer1 needs to move
       * `n - cycleLength` to reach the start of the cycle, at the same time, the
       * distance between pointer2 and the end (one node before cycle start) is also
       * `n - cycleLength`, so the two pointers will meet at the cycle start after
       * `n - cycleLength` moves.
       */
      let pointer1 = head;
      let pointer2 = head;
      while (cycleLength > 0) {
        pointer2 = pointer2.next;
        cycleLength--;
      }
      while (pointer1 !== pointer2) {
        pointer1 = pointer1.next;
        pointer2 = pointer2.next;
      }
      return pointer1;
    }
  }
  return null;
}

function ListNode(val) {
  this.val = val;
  this.next = null;
}

// Test
const head = new ListNode(1);
head.next = new ListNode(2);
head.next.next = new ListNode(3);
head.next.next.next = new ListNode(4);
head.next.next.next.next = new ListNode(5);
head.next.next.next.next.next = new ListNode(6);

head.next.next.next.next.next.next = head.next.next;
console.log(findCycleStartInLinkedList(head).val); // 3

head.next.next.next.next.next.next = head.next.next.next;
console.log(findCycleStartInLinkedList(head).val); // 4

head.next.next.next.next.next.next = head;
console.log(findCycleStartInLinkedList(head).val); // 1
