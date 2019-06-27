class Storage {
    constructor() {
        this.lockedKeys = new Set();
        this.queue = [];
    }

    isLocked(keys) {
        const toCheck = typeof keys === 'string'
            ? [keys]
            : keys;
        return toCheck.some(key => this.lockedKeys.has(key));
    }

    doLock(keys) {
        if (typeof keys !== 'object') {
            this.lockedKeys.add(keys);
        } else {
            keys.forEach(key => this.lockedKeys.add(key));
        }
    }

    unlock(keys) {
        if (typeof keys !== 'object') {
            this.lockedKeys.delete(keys);
        } else {
            keys.forEach(key => this.lockedKeys.delete(key));
        }
    }

    async waitInQueue({
        keys,
        exec,
    }) {
        return new Promise((resolve) => {
            this.queue.push({
                keys,
                exec,
                resolve,
            });
        });
    }

    async nextInQueue(index = 0) {
        if (this.queue.length < index + 1) return;

        const {
            keys,
            exec,
            resolve,
        } = this.queue[index];
        if (
            this.isLocked(keys)
            || !exec // is running
        ) {
            this.nextInQueue(index + 1);
            return;
        }

        this.doLock(keys);

        this.queue[index] = {
            ...this.queue[index],
            exec: null,
        };

        const result = await exec();

        this.queue.splice(index, 1);

        this.unlock(keys);

        this.nextInQueue();

        resolve(result);
    }

    async lock(keys, exec) {
        if (this.isLocked(keys)) {
            return this.waitInQueue({
                keys,
                exec,
            });
        }

        this.doLock(keys);

        const result = await exec();

        this.unlock(keys);
        this.nextInQueue();

        return result;
    }
}

export default Storage;
