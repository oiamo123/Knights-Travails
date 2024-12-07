import PriorityQueue from "./PriorityQueue.js";

class Djikstra {
  constructor(board, start, end) {
    this.board = board;
    this.start = start;
    this.end = end;
    this.moves = [
      [2, 1],
      [1, 2],
      [-1, 2],
      [-2, 1],
      [-2, -1],
      [-1, -2],
      [1, -2],
      [2, -1],
    ];
  }

  getPath() {
    const distance = new Map();
    const visited = new Set(); // To track visited nodes
    const startNode = new Node(this.start[0], this.start[1], 0); // Start node with distance 0

    // Initialize distances for all nodes
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board.length; j++) {
        distance.set(`${i} ${j}`, 9999); // Set all nodes to infinity initially
      }
    }

    distance.set(`${startNode.x} ${startNode.y}`, 0); // Set the starting node's distance to 0

    const queue = new PriorityQueue(
      (node1, node2) => node1.distance < node2.distance
    );

    queue.offer(startNode);

    while (!queue.isEmpty()) {
      const current = queue.poll();

      visited.add(`${current.x} ${current.y}`);

      // If we reached the goal, backtrack the path
      if (current.x === this.end[0] && current.y === this.end[1]) {
        return this.reconstructPath(current);
      }

      // Explore neighbors
      for (let i = 0; i < this.moves.length; i++) {
        const x = current.x + this.moves[i][0];
        const y = current.y + this.moves[i][1];

        // Check if the neighbor is valid
        if (
          x < 0 ||
          y < 0 ||
          x >= this.board.length ||
          y >= this.board[x].length
        ) {
          continue;
        }

        const newDistance = current.distance + 1;

        // Only update the neighbor if we found a shorter path
        if (newDistance < distance.get(`${x} ${y}`)) {
          distance.set(`${x} ${y}`, newDistance); // Update distance for that node
          const neighbour = new Node(x, y, newDistance);
          neighbour.parent = current; // Set the current node as the parent

          // Update queue to ensure the new distance is reflected
          queue.offer(neighbour); // Add the neighbor to the queue
        }
      }
    }

    return []; // Return an empty array if no path is found
  }

  reconstructPath(goalNode) {
    const path = [];
    let currentNode = goalNode;

    while (currentNode !== null) {
      path.unshift([currentNode.x, currentNode.y]);
      currentNode = currentNode.parent;
    }

    return path;
  }
}

class Node {
  constructor(x, y, distance = 0) {
    this.x = x;
    this.y = y;
    this.parent = null;
    this.distance = distance;
  }
}

export default Djikstra;
