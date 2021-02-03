# Topological sort

Topological Sort is used to find a linear ordering of elements that have dependencies on each other. For example, if event B is dependent on event A, A comes before B in topological ordering.

## When to use

When the problem is asking for the order of dependent vertices in a directed graph, or the problem itself can be represented as directed graph.

## Pseudo code

```javascript
// Step 1: build a graph and calculate in degrees
const inDegrees = new Array(vertices).fill(0);
const graph = new Array(vertices).fill(0).map(() => new Array());
for (let i = 0; i < edges.length; i++) {
  const [parent, child] = edges[i];
  graph[parent].push(child);
  inDegrees[child]++;
}

// Step 2: find the initial 0 in degree vertices as start
const sources = [];
for (let i = 0; i < inDegrees.length; i++) {
  if (inDegrees[i] === 0) {
    sources.push(i);
  }
}

// Step 3: keep removing the 0 in degree vertices and update in degrees
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

// Step 4: If there's a cycle, topological sort is not possible
if (result.length !== vertices) {
  return [];
}

return result;
```
