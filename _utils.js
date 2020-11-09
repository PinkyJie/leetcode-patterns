class Heap {
  constructor(comparator, itemToId) {
    this._array = [null];
    this._itemToIndexMap = {};
    this._comparator = comparator;
    this._itemToId = itemToId;
  }

  _debug() {
    this._array.slice(1).forEach((i) => console.log(i));
  }

  size() {
    return this._array.length - 1;
  }

  peek() {
    return this._array[1];
  }

  _getParentIndex(index) {
    return Math.floor(index / 2);
  }

  _hasParent(index) {
    return this._getParentIndex(index) > 0;
  }

  _getLeftChildIndex(index) {
    return index * 2;
  }

  _hasLeftChild(index) {
    return this._getLeftChildIndex(index) < this._array.length;
  }

  _getRightChildIndex(index) {
    return index * 2 + 1;
  }

  _hasRightChild(index) {
    return this._getRightChildIndex(index) < this._array.length;
  }

  _siftUp(index) {
    while (this._hasParent(index)) {
      const parentIndex = this._getParentIndex(index);
      if (this._comparator(this._array[parentIndex], this._array[index]) < 0) {
        this._itemToIndexMap[this._itemToId(this._array[parentIndex])] = index;
        this._itemToIndexMap[this._itemToId(this._array[index])] = parentIndex;
        _swap(this._array, parentIndex, index);
        index = parentIndex;
      } else {
        break;
      }
    }
  }

  _siftDown(index) {
    while (this._hasLeftChild(index)) {
      let highPriorityChildIndex = this._getLeftChildIndex(index);
      if (this._hasRightChild(index)) {
        const rightChildIndex = this._getRightChildIndex(index);
        if (
          this._comparator(
            this._array[highPriorityChildIndex],
            this._array[rightChildIndex]
          ) < 0
        ) {
          highPriorityChildIndex = rightChildIndex;
        }
      }
      if (
        this._comparator(
          this._array[index],
          this._array[highPriorityChildIndex]
        ) < 0
      ) {
        this._itemToIndexMap[
          this._itemToId(this._array[index])
        ] = highPriorityChildIndex;
        this._itemToIndexMap[
          this._itemToId(this._array[highPriorityChildIndex])
        ] = index;
        _swap(this._array, index, highPriorityChildIndex);
        index = highPriorityChildIndex;
      } else {
        break;
      }
    }
  }

  insert(item) {
    this._array.push(item);
    this._itemToIndexMap[this._itemToId(item)] = this._array.length - 1;
    this._siftUp(this._array.length - 1);
  }

  remove(item) {
    const index = this._itemToIndexMap[this._itemToId(item)];
    delete this._itemToIndexMap[this._itemToId(item)];
    const lastItem = this._array.pop();
    if (this.size() > 0) {
      this._array[index] = lastItem;
      this._itemToIndexMap[this._itemToId(lastItem)] = index;
      this._siftDown(index);
    }
  }
}

function _swap(array, i, j) {
  [array[i], array[j]] = [array[j], array[i]];
}

function ListNode(val) {
  this.val = val;
  this.next = null;
}

function printLinkedList(head) {
  const listArray = [];
  let current = head;
  while (current) {
    listArray.push(current.val);
    current = current.next;
  }
  console.log(listArray.join(' -> '));
}

function buildLinkedList(array) {
  const head = new ListNode(array[0]);
  let current = head;
  for (let i = 1; i < array.length; i++) {
    const node = new ListNode(array[i]);
    current.next = node;
    current = node;
  }
  return head;
}

function TreeNode(val) {
  this.val = val;
  this.left = null;
  this.right = null;
}

function buildTreeBFS(array) {
  const root = new TreeNode(array[0]);
  const parentQueue = [root];
  let i = 1;
  while (i < array.length) {
    const parent = parentQueue.shift();
    if (array[i] !== null) {
      parent.left = new TreeNode(array[i]);
      parentQueue.push(parent.left);
    }
    i++;
    if (i < array.length && array[i] !== null) {
      parent.right = new TreeNode(array[i]);
      parentQueue.push(parent.right);
    }
    i++;
  }
  return root;
}

function printTreeBFS(root) {
  const array = [root.val];
  const parentQueue = [root];
  while (parentQueue.length > 0) {
    const parent = parentQueue.shift();
    if (parent.left) {
      array.push(parent.left.val);
      parentQueue.push(parent.left);
    } else {
      array.push(null);
    }
    if (parent.right) {
      array.push(parent.right.val);
      parentQueue.push(parent.right);
    } else {
      array.push(null);
    }
  }
  while (array[array.length - 1] === null) {
    array.pop();
  }
  console.log(array);
}

exports.Heap = Heap;

exports.ListNode = ListNode;
exports.printLinkedList = printLinkedList;
exports.buildLinkedList = buildLinkedList;

exports.TreeNode = TreeNode;
exports.printTreeBFS = printTreeBFS;
exports.buildTreeBFS = buildTreeBFS;
