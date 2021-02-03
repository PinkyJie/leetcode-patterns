/**
 *
 * Problem:
 * Topological Sort of a directed graph (a graph with unidirectional edges) is a linear
 * ordering of its vertices such that for every directed edge (U, V) from vertex U to
 * vertex V, U comes before V in the ordering. Given a directed graph, find the
 * topological ordering of its vertices.
 *
 * Example 1:
 * Input: Vertices=4, Edges=[3, 2], [3, 0], [2, 0], [2, 1]
 * Output: Following are the two valid topological sorts for the given graph:
 *  1) 3, 2, 0, 1
 *  2) 3, 2, 1, 0
 *
 * Example 2:
 * Input: Vertices=5, Edges=[4, 2], [4, 3], [2, 0], [2, 1], [3, 1]
 * Output: Following are all valid topological sorts for the given graph:
 *  1) 4, 2, 3, 0, 1
 *  2) 4, 3, 2, 0, 1
 *  3) 4, 3, 2, 1, 0
 *  4) 4, 2, 3, 1, 0
 *  5) 4, 2, 0, 3, 1
 *
 *
 * Time: O(V + E) V: count of vertices, E: length of edges
 * Space: O(V + E) <- for `graph` and `inDegrees`
 *
 * @param {number} vertices
 * @param {number[][]} edges
 * @return {number[]}
 */
function topologicalSort(vertices, edges) {
  /**
   * Let's use Example 1 above for analysis, the graph is like:
   *                 3 -----> 2 ----> 1
   *                 |        |
   *                 |        |
   *                  --> 0 <--
   * To find the topological order for this graph, obviously we should start with
   * vertex whose in degree is 0, these kind of the vertices must be before others.
   *
   * Step 1: Build a graph with the input `vertices` and `edges`, and then find the
   * in degrees for all the vertices.
   *
   * So we can start from these vertices with 0 in degree, how to find next? We can
   * remove these vertices from the graph, for example, if we remove 3 in the above
   * graph, it will become:
   *                          2 ----> 1
   *                          |
   *                          |
   *                     0 <--
   *
   * Intuitively, 0 and 2 can be next, so basically we will update the in degrees
   * for all the vertices after removing 3, then keep finding the remaining vertices
   * with 0 in degree.
   *
   * Step 2: Remove the vertex with 0 in degree, update all in degrees and keep finding
   * next 0 in degree vertex, until all vertices are 0 in degree.
   *
   */
  const inDegrees = new Array(vertices).fill(0);
  const graph = new Array(vertices).fill(0).map(() => new Array());

  // O(E)
  for (let i = 0; i < edges.length; i++) {
    const [parent, child] = edges[i];
    graph[parent].push(child);
    inDegrees[child]++;
  }

  // O(V)
  const sources = [];
  for (let i = 0; i < inDegrees.length; i++) {
    if (inDegrees[i] === 0) {
      sources.push(i);
    }
  }

  /**
   * O(V + E) each vertex will be push()/shift() once, and each edge will be visited
   * once to update in degrees array.
   */
  const result = [];
  while (sources.length > 0) {
    const source = sources.shift();
    result.push(source);
    graph[source].forEach((child) => {
      inDegrees[child]--;
      if (inDegrees[child] === 0) {
        sources.push(child);
      }
    });
  }

  /**
   * After the loop above, if the `result` doesn't contain all the vertices, then
   * there must a cycle in the graph, think about the graph below:
   *                 3 -----> 2 <-- 0 <--
   *                          |          |
   *                          |          |
   *                           ---> 1 ---
   * After the loop, `result` will only have 3.
   */
  if (result.length !== vertices) {
    return [];
  }

  return result;
}

// Test
console.log(
  topologicalSort(4, [
    [3, 2],
    [3, 0],
    [2, 0],
    [2, 1],
  ])
);
// [3, 2, 0, 1]
console.log(
  topologicalSort(5, [
    [4, 2],
    [4, 3],
    [2, 0],
    [2, 1],
    [3, 1],
  ])
);
// [4, 2, 3, 0, 1]
