class cache {
    constructor() {
        this.store = {};
    }
    add(name, data) {
        if (this.store.hasOwnProperty(name)) {
            console.warn(`[cache] duplicate objects with the name '${name}', actions may target the wrong object.`);
        } else {
            this.store[name] = data;
        }
    }
    get(obj) {
        // look up either by 'name' property (for Phaser objects) or by the raw
        // parameter, typically a string.  simplifies calls.
        return this.store[obj.name || obj];
    }
    remove(name) {
        delete this.store[name];
    }
}

export default cache;
