const { Heap } = require('../_utils');

/**
 *
 * Problem:
 * Design a class that simulates a Stack data structure, implementing the following two
 * operations:
 *  * push(int num): Pushes the number num on the stack.
 *  * pop(): Returns the most frequent number in the stack. If there is a tie, return the
 * number which was pushed later.
 * https://leetcode.com/problems/maximum-frequency-stack/
 *
 * Example 1:
 * Input: ["FreqStack","push","push","push","push","push","push","pop","pop","pop","pop"],
 *        [[],[5],[7],[5],[7],[4],[5],[],[],[],[]]
 * Output: [null,null,null,null,null,null,null,5,7,5,4]
 * Explanation: After making six .push operations, the stack is [5,7,5,7,4,5] from bottom
 * to top. Then:
 *
 * pop() -> returns 5, as 5 is the most frequent.
 * The stack becomes [5,7,5,7,4].
 *
 * pop() -> returns 7, as 5 and 7 is the most frequent, but 7 is closest to the top.
 * The stack becomes [5,7,5,4].
 *
 * pop() -> returns 5.
 * The stack becomes [5,7,4].
 *
 * pop() -> returns 4.
 * The stack becomes [5,7].
 *
 */
class FrequencyStack1 {
  /**
   * It's intuitive to use heap here, because for each pop() we need to get the highest
   * frequency number quickly, which means for each push() we should maintain a structure
   * to get the highest frequency number easily.
   */
  constructor() {
    /**
     * Space: O(n) <- heap
     */
    this.currentIndex = 0;
    this.freqMap = {};
    // item in heap: { val, freq, index }
    this.maxHeap = new Heap((a, b) => {
      /**
       * The comparator here contains 2 parts according to the requirement, one is the
       * frequency, but when the frequency are the same, we need to consider the inserted
       * time, the one which was inserted later (larger index) has the high priority.
       */
      if (a.freq === b.freq) {
        return a.index - b.index;
      }
      return a.freq - b.freq;
    });
  }

  /**
   *
   * Time: O(log(n))
   *
   * @param {number} num
   * @return void
   */
  push(num) {
    this.freqMap[num] = (this.freqMap[num] || 0) + 1;
    this.maxHeap.push({
      val: num,
      freq: this.freqMap[num],
      index: this.currentIndex,
    });
    /**
     * Remember to increase the index after each insertion cause this is a key
     * part for ordering in the heap.
     */
    this.currentIndex++;
  }

  /**
   *
   * Time: O(log(n))
   *
   * @return {number}
   */
  pop() {
    const result = this.maxHeap.pop().val;
    this.freqMap[result]--;
    /**
     * `this.currentIndex` should never be decreased, because even after a lot of
     * pop(), we don't want the next push() has smaller index.
     */
    return result;
  }
}

class FrequencyStack2 {
  /**
   * Not that intuitive but more efficient solution. Besides the frequency map (key is
   * number and value is the frequency), we also maintain another opposite map (key is
   * the frequency, and value is the number array), and then maintain a variable to
   * record the maximum frequency. This way, for every pop() we can get the number
   * array for maximum frequency directly, and since it's an array, it will maintain
   * the inserted order freely, so what we need is just to pop the last one.
   */
  constructor() {
    /**
     * Space: O(n)
     */
    this.maxFreq = -1;
    this.freqToNumMap = {};
    this.numToFreqMap = {};
  }

  /**
   *
   * Time: O(1)
   *
   * @param {number} num
   * @return void
   */
  push(num) {
    this.numToFreqMap[num] = (this.numToFreqMap[num] || 0) + 1;
    if (!this.freqToNumMap[this.numToFreqMap[num]]) {
      this.freqToNumMap[this.numToFreqMap[num]] = [];
    }
    this.freqToNumMap[this.numToFreqMap[num]].push(num);
    this.maxFreq = Math.max(this.maxFreq, this.numToFreqMap[num]);
  }

  /**
   *
   * Time: O(1)
   *
   * @return {number}
   */
  pop() {
    const result = this.freqToNumMap[this.maxFreq].pop();
    this.numToFreqMap[result]--;
    // remember to decrease `maxFreq` if the corresponding array is empty after pop()
    if (this.freqToNumMap[this.maxFreq].length === 0) {
      /**
       * Why `maxFreq--` works? How to make sure there exists a number array for
       * `maxFreq--`? Imagine now the max frequency is 5. After popping the number
       * with frequency 5, the map entry for frequency 5 is empty. It is guaranteed
       * that there should be a number with frequency 4 (the one we just popped,
       * whose frequency will subtract 1 from 5). This is also the maximum possible
       * max frequency at this stage.
       */
      this.maxFreq--;
    }
    return result;
  }
}

// Test
const freqStack1 = new FrequencyStack1();
freqStack1.push(5);
freqStack1.push(7);
freqStack1.push(5);
freqStack1.push(7);
freqStack1.push(4);
freqStack1.push(5);
console.log(freqStack1.pop()); // 5
console.log(freqStack1.pop()); // 7
console.log(freqStack1.pop()); // 5
console.log(freqStack1.pop()); // 4

const freqStack2 = new FrequencyStack2();
freqStack2.push(5);
freqStack2.push(7);
freqStack2.push(5);
freqStack2.push(7);
freqStack2.push(4);
freqStack2.push(5);
console.log(freqStack2.pop()); // 5
console.log(freqStack2.pop()); // 7
console.log(freqStack2.pop()); // 5
console.log(freqStack2.pop()); // 4
