declare class PriorityQueue<T extends Object> {
    private _queue;
    private _size;
    private _comparator;
    constructor(initialCapacity?: number, comparator?: Function);
    private grow;
    private siftup;
    /**
     * siftup of heap
     */
    private siftupUsingComparator;
    private siftupComparable;
    private sink;
    private sinkUsingComparator;
    private sinkComparable;
    private indexOf;
    add(item: T): boolean;
    poll(): T | null;
    peek(): T | null;
    contains(item: T): boolean;
    clear(): void;
    size(): number;
    empty(): boolean;
    toArray(): Array<T>;
    toString(): string;
    [Symbol.iterator](): {
        next: () => {
            done: boolean;
            value: T;
        };
    };
}

export { PriorityQueue, PriorityQueue as default };
