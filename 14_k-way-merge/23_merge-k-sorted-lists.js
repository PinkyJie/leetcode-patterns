const { Heap, buildLinkedList, printLinkedList } = require('../_utils');

/**
 *
 * Problem:
 * Given an array of K sorted LinkedLists, merge them into one sorted list.
 * https://leetcode.com/problems/merge-k-sorted-lists/
 *
 * Example 1:
 * Input: L1=[2, 6, 8], L2=[3, 6, 7], L3=[1, 3, 4]
 * Output: [1, 2, 3, 3, 4, 6, 6, 7, 8]
 *
 * Example 2:
 * Input: L1=[5, 8, 9], L2=[1, 7]
 * Output: [1, 5, 7, 8, 9]
 *
 *
 * Note: the naive solution is to keep merging 2 lists until all the lists are
 * merged. Let's assume we have k lists, each list have n/k nodes (n nodes in total).
 * Merging 2 lists cost 2n/k time complexity, then we need to merge this 2n/k nodes
 * list with the next n/k nodes lists, so the cost will be 3n/k. Keep going and the
 * last merge will be (k-1)n/k nodes list with the n/k nodes list, so it will cost
 * n. The total time complexity will be: (2 + ... + k) * n/k = O(k^2 * n/k) = O(nk),
 * while our heap solution only costs O(n log(k)).
 *
 * Time: O(n log(k))
 * Space: k <- for heap
 *
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
function mergeKSortedLists(lists) {
  const minHeap = new Heap((a, b) => b.val - a.val);
  /**
   * Step 1: put the first node in each list into the heap, so the heap peak is
   * guaranteed to be the smallest node in all k lists.
   * Time: O(k log(k))
   */
  for (let i = 0; i < lists.length; i++) {
    if (lists[i]) {
      minHeap.push(lists[i]);
    }
  }
  // corner case, e.g. `lists` itself is empty, or all the sub lists are empty
  if (minHeap.size() === 0) {
    return [];
  }
  const newHeadNode = minHeap.peek();
  let preNode = null;
  /**
   * Step 2: keep popping nodes from the heap, every time we pop one node out, we push
   * the next node of it into the heap. When the node popped out has no next, there
   * won't be new nodes being pushed into the heap, so the heap size will decrease, doing
   * this until the heap is empty.
   * Time: O(n log(k)) -> each node being pushed once and popped once
   */
  while (minHeap.size() > 0) {
    const node = minHeap.pop();
    if (preNode) {
      preNode.next = node;
    }
    if (node.next) {
      minHeap.push(node.next);
    }
    preNode = node;
  }
  return newHeadNode;
}

// Test
const list1 = buildLinkedList([2, 6, 8]);
const list2 = buildLinkedList([3, 6, 7]);
const list3 = buildLinkedList([1, 3, 4]);
const mergedList1 = mergeKSortedLists([list1, list2, list3]);
printLinkedList(mergedList1); // 1 -> 2 -> 3 -> 3 -> 4 -> 6 -> 6 -> 7 -> 8

const list4 = buildLinkedList([5, 8, 9]);
const list5 = buildLinkedList([1, 7]);
const mergedList2 = mergeKSortedLists([list4, list5]);
printLinkedList(mergedList2); // 1 -> 5 -> 7 -> -> 9
