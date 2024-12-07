class PriorityQueue {
  constructor(comperator) {
    this.queue = [];
    this.comperator = comperator === undefined ? (a, b) => a < b : comperator;
  }

  // 1, 3, 8, 5
  poll() {
    if (this.queue.length === 0) {
      return null; // Return null when the queue is empty
    }

    const root = this.queue[0];
    if (this.queue.length === 1) {
      this.queue.pop(); // If there's only one element, just remove it
    } else {
      this.queue[0] = this.queue.pop(); // Move the last element to the root
      this.heapifyDown(0); // Heapify down to restore the heap property
    }
    return root;
  }

  offer(item) {
    this.queue.push(item); // Use push for adding items
    this.heapifyUp(this.queue.length - 1);
  }

  // Helper functions
  heapifyUp(index) {
    if (!this.hasParent(index)) {
      return; // Base case: no parent means we're at the root
    }

    const parentIndex = this.getParentIndex(index);
    if (this.comperator(this.queue[index], this.getParent(index))) {
      this.swap(index, parentIndex);
      this.heapifyUp(parentIndex); // Recur on the parent
    }
  }

  heapifyDown(index) {
    if (!this.hasLeftChild(index)) {
      return; // Base case: no children means we're at a leaf
    }

    let smallerChildIndex = this.getLeftChildIndex(index);
    if (
      this.hasRightChild(index) &&
      this.comperator(this.getRightChild(index), this.getLeftChild(index))
    ) {
      smallerChildIndex = this.getRightChildIndex(index);
    }

    if (this.comperator(this.queue[smallerChildIndex], this.queue[index])) {
      this.swap(index, smallerChildIndex);
      this.heapifyDown(smallerChildIndex); // Recur on the smaller child
    }
  }

  swap(index1, index2) {
    const temp = this.queue[index1];
    this.queue[index1] = this.queue[index2];
    this.queue[index2] = temp;
  }

  hasLeftChild(index) {
    return index * 2 + 1 < this.queue.length;
  }

  hasRightChild(index) {
    return index * 2 + 2 < this.queue.length;
  }

  hasParent(index) {
    return this.getParentIndex(index) >= 0;
  }

  getLeftChild(index) {
    return this.queue[this.getLeftChildIndex(index)];
  }

  getRightChild(index) {
    return this.queue[this.getRightChildIndex(index)];
  }

  getParent(index) {
    return this.queue[this.getParentIndex(index)];
  }

  getLeftChildIndex(index) {
    return index * 2 + 1;
  }

  getRightChildIndex(index) {
    return index * 2 + 2;
  }

  getParentIndex(index) {
    return Math.floor((index - 1) / 2);
  }

  isEmpty() {
    return this.queue.length === 0;
  }

  toString() {
    console.log(queue);
  }
}

export default PriorityQueue;
