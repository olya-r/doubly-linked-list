const Node = require('./node');

class LinkedList {
    constructor() {
        this.clear();
    }

    append(data) {
        const node = new Node(data);
        if (this.length == 0) {
            this._head = node;
            this._tail = node;
        }
        else {
            this._tail.next = node;
            node.prev = this._tail;
            this._tail = node;
        }
        ++this.length;

        return this;
    }

    prepend(data) {
        const node = new Node(data);
        if (this.length == 0) {
            this._head = node;
            this._tail = node;
        }
        else {
            this._head.prev = node;
            node.next = this._head;
            this._head = node;
        }
        ++this.length;

        return this;
    }

    head() {
        return this._head && this._head.data;
    }

    tail() {
        return this._tail && this._tail.data;
    }

    at(index) {
        return this.nodeAt(index).data;
    }

    nodeAt(index) {
        let node = this._head;
        for (let i = 0; i < index; ++i) {
            node = node.next;
        }

        return node;
    }

    insertAt(index, data) {
        if (index == 0) {
            return this.prepend(data);
        }

        if (index == this.lenght - 1) {
            return this.append(data);
        }

        const before = this.nodeAt(index);

        const node = new Node(data);
        node.prev = before.prev;
        node.next = before;
        node.prev.next = node;
        node.next.prev = node;
        ++this.length;

        return this;
    }

    isEmpty() {
        return this.length == 0;
    }

    clear() {
        this._head = this._tail = null;
        this.length = 0;

        return this;
    }

    deleteAt(index) {
        const node = this.nodeAt(index);

        if (node.prev) {
            node.prev.next = node.next;
        }
        else {
            this._head = node.next;
        }

        if (node.next) {
            node.next.prev = node.prev;
        }
        else {
            this._tail = node.prev;
        }

        --this.length;

        return this;
    }

    reverse() {
        if (this.length <= 1) {
            return this;
        }

        let node = this._head;
        while (node) {
            let next = node.next;
            [node.prev, node.next] = [node.next, node.prev];
            node = next;
        }

        [this._head, this._tail] = [this._tail, this._head];

        return this;
    }

    indexOf(data) {
        let node = this._head;
        for (let i = 0; i < this.length; ++i) {
            if (node.data == data) {
                return i;
            }

            node = node.next;
        }

        return -1;
    }
}

module.exports = LinkedList;
