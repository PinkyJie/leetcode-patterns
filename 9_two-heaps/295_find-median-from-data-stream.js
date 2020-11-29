const { Heap } = require('../_utils');

/**
 *
 * Problem:
 * Design a class to calculate the median of a number stream. The class should have
 * the following two methods:
 *  * addNum(int num): stores the number in the class
 *  * findMedian(): returns the median of all numbers inserted in the class
 * If the count of numbers inserted in the class is even, the median will be the
 * average of the middle two numbers.
 * https://leetcode.com/problems/find-median-from-data-stream/
 *
 * Example 1:
 * 1. addNum(3)
 * 2. addNum(1)
 * 3. findMedian() -> output: 2
 * 4. addNum(5)
 * 5. findMedian() -> output: 3
 * 6. addNum(4)
 * 7. findMedian() -> output: 3.5
 *
 */

/**
 * initialize your data structure here.
 */
var MedianOfAStream = function () {
  /**
   * The main logic for this is to split the number stream into two sections:
   * the smaller part and the larger part, if the number count is even, the
   * two parts have the same size, otherwise one part has 1 more number than
   * the other, here we assume the smaller part might have 1 more number than
   * the larger part (we can also assume larger part has 1 more, either way
   * works).
   *
   * To get the median number, what we are interested is the largest number
   * in the smaller part and the smallest number in the larger part, to get
   * these 2 numbers quickly, Heap is the best structure, we can store the smaller
   * part in a minHeap and store the larger part in a maxHeap, so their heap
   * top should be the 2 numbers we are interested.
   */
  this.smallerPart = new Heap((a, b) => a - b);
  this.largerPart = new Heap((a, b) => b - a);
};

/**
 *
 * Time: O(log(n))
 *
 * @param {number} num
 * @return {void}
 */
MedianOfAStream.prototype.addNum = function (num) {
  /**
   * Since we assume the smaller part might have 1 more number than the larger
   * part, so we always insert the new number to the smaller part when it's empty.
   * Also if it has numbers, we only do insertion when the number belongs to the
   * smaller part, e.g. smaller than the maxHeap top.
   */
  if (this.smallerPart.size() === 0 || num <= this.smallerPart.peek()) {
    this.smallerPart.push(num);
  } else {
    this.largerPart.push(num);
  }

  /**
   * After the above insertion, the 2 heaps might not be "balanced", the "balanced"
   * scenario here is:
   *  * either the smaller part has the same size as the larger part
   *  * or the smaller part has 1 more number than the larger part
   *
   * If the above 2 conditions can't be maintained, we need to remove number from
   * one heap and insert into another heap to re-balance.
   */
  if (this.smallerPart.size() > this.largerPart.size() + 1) {
    this.largerPart.push(this.smallerPart.pop());
  } else if (this.largerPart.size() > this.smallerPart.size()) {
    this.smallerPart.push(this.largerPart.pop());
  }
};

/**
 * Time: O(1)
 *
 * @return {number}
 */
MedianOfAStream.prototype.findMedian = function () {
  if (this.largerPart.size() === this.smallerPart.size()) {
    return (this.largerPart.peek() + this.smallerPart.peek()) / 2;
  }
  /**
   * We assume the smaller part has 1 more number than the larger part, so
   * if the size is not equal (stream has odd count), the smaller part heap
   * top must be the median.
   */
  return this.smallerPart.peek();
};

// Test
var medianOfAStream = new MedianOfAStream();
medianOfAStream.addNum(3);
medianOfAStream.addNum(1);
console.log(medianOfAStream.findMedian()); // 2
medianOfAStream.addNum(5);
console.log(medianOfAStream.findMedian()); // 3
medianOfAStream.addNum(4);
console.log(medianOfAStream.findMedian()); // 3.5
