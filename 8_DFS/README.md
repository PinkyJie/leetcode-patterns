# Depth First Search

## When to use

Any problem involving the traversal of a tree in recursive mode can be efficiently solved by using this approach. We will be using recursion (or we can also use a stack for the iterative approach) to keep track of all the previous (parent) nodes while traversing. This also means that the space complexity of the algorithm will be `O(H)`, where `H` is the maximum height of the tree.

## Pseudo code

```javascript
// pre-order
function preOrder(node, doVisit) {
  if (!node) {
    return;
  }
  doVisit(node);
  preOrder(node.left, doVisit);
  preOrder(node.right, doVisit);
}

// in-order
function inOrder(node, doVisit) {
  if (!node) {
    return;
  }
  inOrder(node.left, doVisit);
  doVisit(node);
  inOrder(node.right, doVisit);
}

// post-order
function postOrder(node, doVisit) {
  if (!node) {
    return;
  }
  postOrder(node.left, doVisit);
  postOrder(node.right, doVisit);
  doVisit(node);
}

// more general DFS
function recursion(node, aggregateValue) {
  if (!node) {
    return;
  }
  if (!node.left && !node.right) {
    doSomethingWithLeafNode();
  }
  addCurrentNodeToAggregation(node, aggregateValue);
  recursion(node.left);
  recursion(node.right);
  removeCurrentNodeFromAggregation(node, aggregateValue);
}
```

Note:

- pre/in/post order here is related to the parent node, e.g. visit parent node first/in the middle/last, for children node visiting order, it's always left to right.
- if `doVisit` is not pure, e.g. modify some object value reused by the traversal, then after visiting, it should revert the change before traversing the next node, check `addCurrentNodeToAggregation/removeCurrentNodeFromAggregation` above.
- keep in mind how to use the return value of the recursion to prevent creating unnecessary global variable.
- sometimes we need to think more about how to use the left/right sub tree aggregation value to calculate the parent node's aggregation value, check questions [124_binary-tree-maximum-path-sum](./124_binary-tree-maximum-path-sum.js) and[543_diameter-of-binary-tree](./543_diameter-of-binary-tree.js) for more examples.
