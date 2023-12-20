class MinHeap {
  constructor() {
    this.heap = [];
  }

  push(value) {
    this.heap.push(value);
    this.heapifyUp();
  }

  pop() {
    if (this.isEmpty()) {
      return null;
    }

    if (this.heap.length === 1) {
      return this.heap.pop();
    }

    const root = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown();
    return root;
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  heapifyUp() {
    let currentIndex = this.heap.length - 1;
    while (currentIndex > 0) {
      const parentIndex = Math.floor((currentIndex - 1) / 2);
      if (this.heap[parentIndex] <= this.heap[currentIndex]) {
        break;
      }
      [this.heap[parentIndex], this.heap[currentIndex]] = [
        this.heap[currentIndex],
        this.heap[parentIndex],
      ];
      currentIndex = parentIndex;
    }
  }

  heapifyDown() {
    let currentIndex = 0;
    while (true) {
      const leftChildIndex = 2 * currentIndex + 1;
      const rightChildIndex = 2 * currentIndex + 2;
      let smallestChildIndex = currentIndex;

      if (
        leftChildIndex < this.heap.length &&
        this.heap[leftChildIndex] < this.heap[smallestChildIndex]
      ) {
        smallestChildIndex = leftChildIndex;
      }

      if (
        rightChildIndex < this.heap.length &&
        this.heap[rightChildIndex] < this.heap[smallestChildIndex]
      ) {
        smallestChildIndex = rightChildIndex;
      }

      if (smallestChildIndex === currentIndex) {
        break;
      }

      [this.heap[currentIndex], this.heap[smallestChildIndex]] = [
        this.heap[smallestChildIndex],
        this.heap[currentIndex],
      ];
      currentIndex = smallestChildIndex;
    }
  }
}

function mincost(arr) {
  // Create a MinHeap instance
  const minHeap = new MinHeap();

  // Populate the min heap with initial rope lengths
  arr.forEach((ropeLength) => {
    minHeap.push(ropeLength);
  });

  // Initialize the total cost
  let totalCost = 0;

  // Continue until there is only one rope left in the heap
  while (!minHeap.isEmpty()) {
    // Extract the two smallest ropes from the heap
    const rope1 = minHeap.pop();
    const rope2 = minHeap.pop();

    // Calculate the cost of connecting the two ropes
    const cost = rope1 + rope2;

    // Add the cost to the total cost
    totalCost += cost;

    // Add the connected rope back to the heap
    minHeap.push(cost);
  }

  return totalCost;
}

module.exports = mincost;
