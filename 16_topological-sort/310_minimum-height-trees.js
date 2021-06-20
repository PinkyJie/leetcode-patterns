/**
 *
 * Problem:
 * We are given an undirected graph that has characteristics of a k-ary tree. In such a
 * graph, we can choose any node as the root to make a k-ary tree. The root (or the tree)
 * with the minimum height will be called Minimum Height Tree (MHT). There can be multiple
 * MHTs for a graph. In this problem, we need to find all those roots which give us MHTs.
 * Write a method to find all MHTs of the given graph and return a list of their roots.
 * Note: The height of a rooted tree is the number of edges on the longest downward path
 * between the root and a leaf.
 * https://leetcode.com/problems/minimum-height-trees/
 *
 * Example 1:
 * Input: vertices: 5, Edges: [[0, 1], [1, 2], [1, 3], [2, 4]]
 * Output:[1, 2]
 * Explanation: Choosing '1' or '2' as roots give us MHTs. In the below diagram, we can
 * see that the height of the trees with roots '1' or '2' is three which is minimum.
 *
 *             0           1            2         3         4
 *             |         / | \         / \        |         |
 *             1        0  2  3       1   4       1         2
 *            / \          |         / \         / \        |
 *           2   3         4        3   0       0   2       1
 *           |                                      |      / \
 *           4                                      4     0   3
 *
 *  height:    3           2            2         3         3
 *
 * Example 2:
 * Input: vertices: 4, Edges: [[0, 1], [0, 2], [2, 3]]
 * Output:[0, 2]
 * Explanation: Choosing '0' or '2' as roots give us MHTs. In the below diagram, we can
 * see that the height of the trees with roots '0' or '2' is three which is minimum.
 *
 *
 * Time: O(V + E)
 * Space: O(V + E) <- for `graph` and `degrees`
 *
 * @param {number} vertices
 * @param {number[][]} edges
 * @return {number[]}
 */
function findMinHeightTrees(vertices, edges) {
  /**
   * From the above example illustration, we can clearly see the minimum height trees are
   * always rooted as the nodes which have larger degrees, which means leaf nodes whose
   * degree is 0 can't be root of MHT. With this in mind, what we can do is starting from
   * the leaf nodes as `sources`, keep removing them and update the `degrees` of other
   * connected nodes, and push them back to the `sources` until there are only 1 or 2
   * nodes left in the `sources`, those will be the roots of the MHT.
   */
  const graph = new Array(vertices).fill(0).map(() => new Array());
  const degrees = new Array(vertices).fill(0);

  // O(E)
  for (let i = 0; i < edges.length; i++) {
    const [vertex1, vertex2] = edges[i];
    /**
     * Similar as the 0_topological-sort problem, the difference here is the graph
     * is undirected, so we need to construct the `graph` and `degrees` in both ways.
     */
    graph[vertex1].push(vertex2);
    graph[vertex2].push(vertex1);
    degrees[vertex1]++;
    degrees[vertex2]++;
  }

  /**
   * A bit different with the the 0_topological-sort problem which starts from the 0
   * "in degree" nodes, here we start from the "leaves", as explained above, this is
   * because "leaves" nodes can not give us MHT.
   */
  const leaves = [];
  // O(V)
  for (let i = 0; i < degrees.length; i++) {
    if (degrees[i] === 1) {
      leaves.push(i);
    }
  }

  let totalNodes = vertices;
  // O(V + E) each node will be shift()/push() once, each edge will be visited once
  while (totalNodes > 2) {
    /**
     * Why 2 here? If there's only 1 node left after removing all leaves, obviously
     * that one will be the final root, but when there are 2 leaves left, there's only
     * one edge between them, which means both of them can be roots, they will have
     * the same heights.
     */
    const leavesCount = leaves.length;
    totalNodes -= leavesCount;
    for (let i = 0; i < leavesCount; i++) {
      const leaf = leaves.shift();
      graph[leaf].forEach((node) => {
        degrees[node]--;
        // put the leaves nodes back to the `sources`
        if (degrees[node] === 1) {
          leaves.push(node);
        }
      });
    }
  }
  return leaves;
}

// Test
console.log(
  findMinHeightTrees(5, [
    [0, 1],
    [1, 2],
    [1, 3],
    [2, 4],
  ])
); // [1, 2]
console.log(
  findMinHeightTrees(4, [
    [0, 1],
    [0, 2],
    [2, 3],
  ])
); // [0, 2]
console.log(
  findMinHeightTrees(4, [
    [0, 1],
    [1, 2],
    [1, 3],
  ])
); // [1]
