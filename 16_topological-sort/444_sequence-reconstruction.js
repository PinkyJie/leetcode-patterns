/**
 *
 * Problem:
 * Given a sequence originalSeq and an array of sequences, write a method to find if
 * originalSeq can be uniquely reconstructed from the array of sequences. Unique
 * reconstruction means that we need to find if originalSeq is the only sequence such that
 * all sequences in the array are subsequences of it.
 * https://leetcode.com/problems/sequence-reconstruction/ (subscription)
 *
 * Example 1:
 * Input: originalSeq: [1, 2, 3, 4], seqs: [[1, 2], [2, 3], [3, 4]]
 * Output: true
 * Explanation: The sequences [1, 2], [2, 3], and [3, 4] can uniquely reconstruct
 * [1, 2, 3, 4], in other words, all the given sequences uniquely define the order of
 * numbers in the 'originalSeq'.
 *
 * Example 2:
 * Input: originalSeq: [1, 2, 3, 4], seqs: [[1, 2], [2, 3], [2, 4]]
 * Output: false
 * Explanation: The sequences [1, 2], [2, 3], and [2, 4] cannot uniquely reconstruct
 * [1, 2, 3, 4]. There are two possible sequences we can construct from the given
 * sequences:
 *  1) [1, 2, 3, 4]
 *  2) [1, 2, 4, 3]
 *
 *
 * Time: O(V + N) V: the node count of `originalSeq`, N: all numbers in `sequences`
 * Space: O(V + N) <- for `graph` and `result`
 *
 * @param {number[]} originalSeq
 * @param {number[][]} sequences
 * @return {boolean}
 */
function canReconstructUniqueSequence(originalSeq, sequences) {
  /**
   * Similar as the problem 0_topological-sort, the idea here is try to get a sequence
   * order via the `sequences` (edges), while constructing the order, we need to make
   * sure 2 things are happening:
   *  1. there's only one node in `sources` (whose in degree is 0), cause if there are
   * multiple nodes, the sequence won't be unique (consider 0_all-tasks-scheduling-order)
   *  2. once there's a new node added to the result order sequence, compare it with
   * the same index in the `originalSeq` to make sure they are the same
   * If and only if the above 2 conditions are met, the result order sequence can be
   * unique.
   */

  // put +1 here cause the sequence is starting from 1 instead of 0
  const graph = new Array(originalSeq.length + 1)
    .fill(0)
    .map(() => new Array());
  const inDegrees = new Array(originalSeq.length + 1).fill(0);

  // O(n) n: the count of all numbers in the `sequences`
  for (let i = 0; i < sequences.length; i++) {
    // every pair can generate an edge
    for (let j = 0; j < sequences[i].length - 1; j++) {
      const parent = sequences[i][j];
      const child = sequences[i][j + 1];
      graph[parent].push(child);
      inDegrees[child]++;
    }
  }

  const sources = [];
  // O(V)
  for (let i = 1; i < inDegrees.length; i++) {
    if (inDegrees[i] === 0) {
      sources.push(i);
    }
    // early exit
    if (sources.length > 1) {
      return false;
    }
  }

  const result = [];
  // O(V + E) E <= N because every pair can generate an edge
  while (sources.length > 0) {
    // result won't be unique if there are multiple sources
    if (sources.length > 1) {
      return false;
    }
    const node = sources.shift();
    result.push(node);
    // return false immediately if the node is not the same as the original sequence
    if (result[result.length - 1] !== originalSeq[result.length - 1]) {
      return false;
    }
    graph[node].forEach((child) => {
      inDegrees[child]--;
      if (inDegrees[child] === 0) {
        sources.push(child);
      }
    });
  }
  /**
   * Remember to check this after the loop end, because there might not be enough
   * edges to construct the original sequence. For example:
   *  * originalSeq = [1, 2, 3, 4], sequences = [ [1, 2], [2, 3] ]
   */
  return result.length === originalSeq.length;
}

// Test
console.log(
  canReconstructUniqueSequence(
    [1, 2, 3, 4],
    [
      [1, 2],
      [2, 3],
      [3, 4],
    ]
  )
); // true
console.log(
  canReconstructUniqueSequence(
    [1, 2, 3, 4],
    [
      [1, 2],
      [2, 3],
      [2, 4],
    ]
  )
); // false
console.log(
  canReconstructUniqueSequence(
    [3, 1, 4, 2, 5],
    [
      [3, 1, 5],
      [1, 4, 2, 5],
    ]
  )
); // true
