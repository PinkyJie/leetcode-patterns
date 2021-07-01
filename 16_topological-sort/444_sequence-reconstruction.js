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
  // use map here because we don't know how many vertices are there in `sequences`
  const graph = new Map();
  const inDegrees = new Map();

  // O(n) n: the count of all numbers in the `sequences`
  for (let i = 0; i < sequences.length; i++) {
    if (sequences[i].length === 1) {
      /**
       * Sometimes there's only one vertex in the sequence, we need to handle
       * that gracefully here, e.g. add it into `graph` and set its in-degree
       * to 0.
       */
      if (!graph.has(sequences[i][0])) {
        graph.set(sequences[i][0], []);
      }
      if (!inDegrees.has(sequences[i][0])) {
        inDegrees.set(sequences[i][0], 0);
      }
    }
    // every pair can generate an edge
    for (let j = 0; j < sequences[i].length - 1; j++) {
      const parent = sequences[i][j];
      const child = sequences[i][j + 1];
      /**
       * Since `graph` and `inDegrees` are both map, we need to initialize
       * both of the `parent` vertex as well as the `child` vertex.
       */
      if (!graph.has(parent)) {
        graph.set(parent, []);
      }
      if (!graph.has(child)) {
        graph.set(child, []);
      }
      graph.get(parent).push(child);
      if (!inDegrees.has(parent)) {
        inDegrees.set(parent, 0);
      }
      if (!inDegrees.has(child)) {
        inDegrees.set(child, 0);
      }
      inDegrees.set(child, inDegrees.get(child) + 1);
    }
  }

  const sources = [];
  // O(V)
  for (const [vertex, inDegree] of inDegrees) {
    if (inDegree === 0) {
      sources.push(vertex);
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
    /**
     * Return false immediately:
     *  * if the current length is already longer than the original sequence
     *  * if the node is not the same as the original sequence
     */
    const curLen = result.length - 1;
    if (
      curLen >= originalSeq.length ||
      result[curLen] !== originalSeq[curLen]
    ) {
      return false;
    }
    graph.get(node).forEach((child) => {
      inDegrees.set(child, inDegrees.get(child) - 1);
      if (inDegrees.get(child) === 0) {
        sources.push(child);
      }
    });
  }
  /**
   * Remember to check this after the loop end, because there might not be enough
   * edges to construct the original sequence, e.g.
   *  * originalSeq = [1, 2, 3, 4], sequences = [ [1, 2], [2, 3] ]
   * Or there might be too many additional non-connected edges, e.g.
   *  * originalSeq = [1], sequences = [ [1], [2, 3] [3, 2] ]
   */
  return result.length === originalSeq.length && result.length === graph.size;
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
