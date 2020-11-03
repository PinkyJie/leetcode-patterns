const { ListNode } = require('../_utils');

/**
 *
 * Problem:
 * Given the head of a Singly LinkedList, write a method to check if the LinkedList
 * is a palindrome or not. You algorithm should use constant space and the input
 * LinkedList  once the algorithm is finished. The algorithm should have O(N)
 * time complexity where N is the number of nodes in the LinkedList.
 * https://leetcode.com/problems/palindrome-linked-list/
 *
 * Example 1:
 * Input: 2 -> 4 -> 6 -> 4 -> 2 -> null
 * Output: true
 *
 * Example 2:
 * Input: 2 -> 4 -> 6 -> 4 -> 2 -> 2 -> null
 * Output: false
 *
 * Time: O(n)
 * Space: O(1)
 *
 * @param {ListNode} head
 * @return {boolean}
 */
function isPalindromeLinkedList(head) {
  // return true for empty list or single node list
  if (!head || !head.next) {
    return true;
  }

  let slowPointer = head;
  let fastPointer = head;
  // find middle pointer (`slowPointer` is the middle) O(n/2)
  while (fastPointer && fastPointer.next) {
    slowPointer = slowPointer.next;
    fastPointer = fastPointer.next.next;
  }
  // reverse second half of the linked list O(n/2)
  let prev = null;
  let current = slowPointer;
  while (current) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  let result = true;
  // pointer 1: start from beginning
  let startPointer = head;
  // pointer 2: start from last node (`prev` is the last node now after reverse)
  let endPointer = prev;
  // O(n/2)
  while (startPointer && endPointer) {
    if (startPointer.val !== endPointer.val) {
      result = false;
      /**
       * We can't return false directly here, because we need to revert the right
       * half back as the problem description requires (keep linked list as original)
       */
      break;
    }
    startPointer = startPointer.next;
    endPointer = endPointer.next;
  }
  // reverse second half back O(2/n)
  current = prev; // last node
  prev = null;
  while (current) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }

  return result;
}

// Test
const head = new ListNode(2);
head.next = new ListNode(4);
head.next.next = new ListNode(6);
head.next.next.next = new ListNode(6);
head.next.next.next.next = new ListNode(4);

console.log(isPalindromeLinkedList(head)); // true

head.next.next.next.next.next = new ListNode(2);
console.log(isPalindromeLinkedList(head)); // false
