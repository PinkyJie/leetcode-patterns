# Merge intervals

## When to use

This pattern describes an efficient technique to deal with overlapping intervals. In a lot of problems involving intervals, we either need to find overlapping intervals or merge intervals if they overlap.

## Key concepts

Given two intervals ("a" and "b"), there will be six different ways the two intervals can relate to each other:

1. "a" and "b" do not overlap

```
    |_____| |_____|
       a       b
```

2. "a" and "b" overlap, "b" ends after "a"

```
    |_____|     a
       |_____|  b
```

3. "a" completely overlaps "b"

```
    |_______|   a
     |_____|    b
```

4. "a" and "b" overlap, "a" ends after "b"

```
       |_____|  a
    |_____|     b
```

5. "a" and "b" do not overlap

```
    |_____| |_____|
       b       a
```

6. "a" completely overlaps "b"

```
     |_____|    a
    |_______|   b
```

To easily check if the two intervals overlap, we can think about the not overlap condition first, and then do a `not`:

```javascript
// do not overlap
end1 < start2 || end2 < start1; // scenario 1 and 5
// overlap
!(end1 < start2 || end2 < start1); // =>
end1 >= start2 && end2 >= start1;
```

The common strategy is to sort all the intervals by their "start" first, if two intervals are overlapped, we can calculate:

- merged interval: [ Math.min(start1, start2), Math.max(end1, end2) ]
- intersection: [ Math.max(start1, start2), Math.min(end1, end2) ]

To calculate the overlapped interval count at any time (e.g. calculate the max overlapped interval count for all time), the most common data structure we use is the minimum heap: before inserting a new interval, we remove all intervals from the heap whose end time is smaller than the start time of the interval to be inserted.
