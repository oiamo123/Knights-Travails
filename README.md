Knight's Travails is a project aimed at solving the problem of finding the shortest path for a knight in a game of chess from one square to another.
The knight moves in "L" shapes (e.g., two squares up and one square to the right, or two squares left and one square down). Given a starting position, the knight can reach any position on the board.
This project employs Dijkstra's Algorithm and a custom-built priority queue that supports an optional comparator for flexible usage.

The scripts are as follows:
Alert.js
  - Manages the alert displayed on the right side of the screen.
  - This functionality is used in both index.js and Board.js, making it a standalone class.
    
Board.js:
  - Handles board generation, placement of the starting and ending points, and clearing the board.
    
Dijkstra.js:
  - The core of the project.
  - Defines allowed moves for the knight and includes the algorithm for calculating the shortest path from point A to point B.

Icons.js:
  - Contains the SVG's for icons

PriorityQueue.js:
  - Implements a priority queue with offer and poll methods.
  - The queue is a min-heap by default but supports an optional comparator for custom object comparisons or max-heap behavior.
      - The comparator uses a callback (e.g., (a, b) => a < b) to define comparison criteria.
      - For example:

        if (this.comperator(this.queue[index], this.getParent(index))) {
          this.swap(index, parentIndex);
          this.heapifyUp(parentIndex);
        }
        
      - Index-based navigation follows the rules:
        - Left child: 2n + 1
        - Right child: 2n + 2
        - Parent: (n - 1) / 2
      - This structure ensures flexibility for various use cases.

index.js / App
  - Manages overall application functionality: starting, resetting, and cycling through moves (next/previous).

As for going forward, I might implement proper chess notation. I'm excited to continue learning about data structures and algorithms as well as move into ML and AI via google's course.
