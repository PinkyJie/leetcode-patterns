# Bitwise XOR

XOR is a logical bitwise operator that returns 0 (false) if both bits are the same and returns 1 (true) otherwise. In other words, it only returns 1 if exactly one bit is set to 1 out of the two bits in comparison.

Some useful properties of XOR operation:

- Taking XOR of a number with itself returns 0, e.g.

```javascript
1 ^ 1 = 0;
29 ^ 29 = 0;
```

- Taking XOR of a number with 0 returns the same number, e.g.

```javascript
1 ^ 0 = 1;
31 ^ 0 = 31;
```

- XOR is Associative & Commutative, which means:

```javascript
a ^ b ^ c = a ^ (b ^ c);
a ^ b = b ^ a;
```

## When to use

XOR is especially useful to solve the following problems:

- handle the "Missing numbers in a range" problems, because XOR can eliminate the duplicate pair easily.
- change 1 to 0 and change 0 to 1, because we have `1 ^ 1 = 0` and `0 ^ 1 = 1`.

Note: other useful bitwise operations:

- get rightmost set bit: `n & (-n)`, e.g. `10` -> `110` (binary) -> `2` (first 1 bit from the right side)
