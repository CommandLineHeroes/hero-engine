export default class cache {
    /**
     * Create a cache object.
     */
    constructor() {
        this.store = {};
    }

    /**
     * Add a named object to the cache.
     *
     * @param {String} name the name of the object being added
     * @param {Object} data the payload of the cache, whatever data needs to be cached
     */
    add(name, data) {
        if (this.store.hasOwnProperty(name)) {
            console.warn(
                `[cache] duplicate objects with the name '${name}', actions may target the wrong object.`
            );
        } else {
            this.store[name] = data;
        }
    }

    /**
     * Get an object from the cache, either by name or by passing in an object with a `.name` property.
     *
     * @param {String} obj the name of the object
     * @param {Object} obj.name or optionally, an object with a `.name` property
     */
    get(obj) {
        // look up either by 'name' property (for Phaser objects) or by the raw
        // parameter, typically a string.  simplifies calls.
        return this.store[obj.name || obj];
    }

    /**
     * Remove an object from the cache.
     *
     * @param {String} name the name of the object to remove
     */
    remove(name) {
        delete this.store[name];
    }
}
