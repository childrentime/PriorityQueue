Object.defineProperty(exports, '__esModule', { value: true });

var _computedKey;
_computedKey = Symbol.iterator;
class PriorityQueue {
    grow() {
        const oldCapacity = this._size;
        // Double size if small; else grow by 50%
        const newCapacity = oldCapacity + (oldCapacity < 64 ? oldCapacity + 2 : oldCapacity >> 1);
        if (!Number.isSafeInteger(newCapacity)) {
            throw new Error('capacity out of range');
        }
        this._queue.length = newCapacity;
    }
    siftup(k, item) {
        if (this._comparator !== null) {
            this.siftupUsingComparator(k, item);
        } else {
            this.siftupComparable(k, item);
        }
    }
    /**
   * siftup of heap
   */ siftupUsingComparator(k, item) {
        while(k > 0){
            // find the parent
            let parent = k - 1 >>> 1;
            let e = this._queue[parent];
            // compare item with it parent, if item's priority less, break siftup and insert
            if (this._comparator(item, e) >= 0) {
                break;
            }
            // if item's priority more, make it's parent sink and proceed siftup
            this._queue[k] = e;
            k = parent;
        }
        // if k === 0, then we directly insert it
        this._queue[k] = item;
    }
    siftupComparable(k, item) {
        while(k > 0){
            let parent = k - 1 >>> 1;
            let e = this._queue[parent];
            if (item.toString().localeCompare(e.toString()) >= 0) {
                break;
            }
            this._queue[k] = e;
            k = parent;
        }
        this._queue[k] = item;
    }
    sink(k, item) {
        if (this._comparator !== null) {
            this.sinkUsingComparator(k, item);
        } else {
            this.sinkComparable(k, item);
        }
    }
    sinkUsingComparator(k, item) {
        let half = this._size >>> 1;
        while(k < half){
            let child = (k << 1) + 1;
            let object = this._queue[child];
            let right = child + 1;
            // compare left right child, assgn child the bigger one
            if (right < this._size && this._comparator(object, this._queue[right]) > 0) {
                object = this._queue[child = right];
            }
            //compare item and child if bigger is item, break
            if (this._comparator(item, object) <= 0) {
                break;
            }
            this._queue[k] = object;
            k = child;
        }
        this._queue[k] = item;
    }
    sinkComparable(k, item) {
        let half = this._size >>> 1;
        while(k < half){
            let child = (k << 1) + 1;
            let object = this._queue[child];
            let right = child + 1;
            if (right < this._size && object.toString().localeCompare(this._queue[right].toString())) {
                object = this._queue[child = right];
            }
            if (item.toString().localeCompare(object.toString()) <= 0) {
                break;
            }
            this._queue[k] = object;
            k = child;
        }
        this._queue[k] = item;
    }
    indexOf(item) {
        for(let i = 0; i < this._queue.length; i++){
            if (this._queue[i] === item) {
                return i;
            }
        }
        return -1;
    }
    add(item) {
        let i = this._size;
        if (i >= this._queue.length) {
            this.grow();
        }
        this._size = i + 1;
        if (i === 0) {
            this._queue[0] = item;
        } else {
            this.siftup(i, item);
        }
        return true;
    }
    poll() {
        if (this._size === 0) {
            return null;
        }
        let s = --this._size;
        let result = this._queue[0];
        let x = this._queue[s];
        this._queue.slice(s, 1);
        if (s !== 0) {
            this.sink(0, x);
        }
        return result;
    }
    peek() {
        return this._size === 0 ? null : this._queue[0];
    }
    contains(item) {
        return this.indexOf(item) !== -1;
    }
    clear() {
        for (let item of this._queue){
            item = null;
        }
        this._size = 0;
    }
    size() {
        return this._size;
    }
    empty() {
        return this._size === 0;
    }
    toArray() {
        return this._queue.filter((item)=>item);
    }
    toString() {
        return this.toArray().toString();
    }
    [_computedKey]() {
        let i = 0;
        return {
            next: ()=>{
                return {
                    done: i == this._size,
                    value: this._queue[i++]
                };
            }
        };
    }
    constructor(initialCapacity, comparator){
        this._size = 0;
        const cap = initialCapacity != null ? initialCapacity : 11;
        const com = comparator != null ? comparator : null;
        if (cap < 1) {
            throw new Error('initial capacity must be greater than or equal to 1');
        }
        this._queue = new Array(cap);
        this._comparator = com;
    }
}

exports.PriorityQueue = PriorityQueue;
exports.default = PriorityQueue;
