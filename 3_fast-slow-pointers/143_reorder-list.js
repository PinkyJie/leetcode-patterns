/**
 *
 * Problem:
 * Given the head of a Singly LinkedList, write a method to modify the LinkedList
 * such that the nodes from the second half of the LinkedList are inserted
 * alternately to the nodes from the first half in reverse order. So if the
 * LinkedList has nodes 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> null, your method should return
 * 1 -> 6 -> 2 -> 5 -> 3 -> 4 -> null. Your algorithm should not use any extra space
 * and the input LinkedList should be modified in-place.
 * https://leetcode.com/problems/reorder-list/
 *
 *
 * Example 1:
 * Input: 2 -> 4 -> 6 -> 8 -> 10 -> 12 -> null
 * Output: 2 -> 12 -> 4 -> 10 -> 6 -> 8 -> null
 *
 * Example 2:
 * Input: 2 -> 4 -> 6 -> 8 -> 10 -> null
 * Output: 2 -> 10 -> 4 -> 8 -> 6 -> null
 *
 * Time: O(n)
 * Space: O(1)
 *
 * @param {ListNode} head
 * @return {void}
 */
function reorderLinkedList(head) {
  // return directly for empty list or single node list
  if (!head || !head.next) {
    return;
  }

  let slowPointer = head;
  let fastPointer = head;
  // find middle node (`slowPointer`) O(n/2)
  while (fastPointer && fastPointer.next) {
    slowPointer = slowPointer.next;
    fastPointer = fastPointer.next.next;
  }
  let startOfSecondHalf = slowPointer.next;
  // middle node is the new end
  slowPointer.next = null;
  // reverse the second half O(n/2)
  let prev = null;
  let current = startOfSecondHalf;
  while (current) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  let currentOfFirstHalf = head;
  // `prev` is the original end node, and the start node of the reversed second half
  let currentOfSecondHalf = prev;
  // O(n/2)
  while (currentOfSecondHalf) {
    // insert into the first half alternatively
    const nextOfFirstHalf = currentOfFirstHalf.next;
    const nextOfSecondHalf = currentOfSecondHalf.next;
    currentOfFirstHalf.next = currentOfSecondHalf;
    currentOfSecondHalf.next = nextOfFirstHalf;
    currentOfFirstHalf = nextOfFirstHalf;
    currentOfSecondHalf = nextOfSecondHalf;
  }
}

function ListNode(val) {
  this.val = val;
  this.next = null;
}

// Test
const head = new ListNode(2);
head.next = new ListNode(4);
head.next.next = new ListNode(6);
head.next.next.next = new ListNode(8);
head.next.next.next.next = new ListNode(10);
head.next.next.next.next.next = new ListNode(12);
reorderLinkedList(head);
const listArray = [];
let current = head;
while (current) {
  listArray.push(current.val);
  current = current.next;
}
console.log(listArray.join(' -> ')); // 2 -> 12 -> 4 -> 10 -> 6 -> 8
