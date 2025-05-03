"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Queue {
    constructor() {
        this.items = [];
    }
    enqueue(element) {
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
exports.default = Queue;
