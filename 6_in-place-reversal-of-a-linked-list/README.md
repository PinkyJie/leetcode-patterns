# In-place reversal of a Linked List

## When to use

For problems which requires us to reverse the whole linked list or partial of the linked list (sub list) in-place, i.e. using the existing node objects and without using extra memory.

## Pseudo code

```javascript
let prev = null;
let current = head;
while (current) {
  const next = current.next;
  current.next = prev;
  prev = current;
  current = next;
}
return prev;
```

The key is to remember:

- in every loop we only handle the pointer reversal between `current` node and `prev`, i.e. `current.next = prev`.
- after reversal, the `prev` pointer is the start of the reversed linked list, `current` is the the next pointer of the original end (e.g. `null`)
