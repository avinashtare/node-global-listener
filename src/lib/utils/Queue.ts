class Queue<T> {
  private items: T[] = [];

  enqueue(element: T) {
    this.items.push(element);
  }

  dequeue() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items.shift();
  }

  isEmpty() {
    return this.items.length === 0;
  }

  peek() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items[0];
  }

  size() {
    return this.items.length;
  }
}

export default Queue;
