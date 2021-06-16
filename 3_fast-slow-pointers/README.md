# Fast & Slow pointers

## When to use

The Fast & Slow pointer approach, is a pointer algorithm that uses two pointers which move through the array (or sequence/LinkedList) at different speeds. This approach is quite useful when dealing with cyclic LinkedLists or arrays. By moving at different speeds (say, in a cyclic LinkedList), the algorithm proves that the two pointers are bound to meet. The fast pointer should catch the slow pointer once both the pointers are in a cyclic loop.

## Pseudo code

```javascript
let slowPointer = head;
let fastPointer = head;

while (fastPointer && fastPointer.next) {
  slowPointer = slowPointer.next;
  fastPointer = fastPointer.next.next;

  if (slowPointer === fastPointer) {
    // cycle found
  }
}
```

## Common usage for two pointers in the linked list

- fast(2-step) and slow(1-step) pointers, move them at the 2-step and 1-step speed, if they can meet each other, then a cycle exists in the linked list.
- pointer1 (at head) and pointer2 (at K, K is the length of the cycle), move pointer1 and pointer2 at the same speed (1-step), their meeting point is the start node of the cycle. (Why? check [142_linked-list-cycle-ii](./142_linked-list-cycle-ii.js))
- fast(2-step) and slow(1-step) pointers, when fast pointer reaches the end of the linked list, slow pointer is at the middle position of the linked list.
