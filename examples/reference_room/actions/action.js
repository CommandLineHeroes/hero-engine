class Action /* lawsuit! */ {
    constructor(name = "NAMELESS_ACTION", fn = nyi) {
        this.name = name;
        this.fn = fn;
    }

    log(...msgs) {
        console.log(`[${this.name}]`, ...msgs);
    }

    run(game, cache, ...args) {
        this.fn(game, cache, ...args);
    }
}

function nyi() {
    console.log(`[actions] action "${this.name}" not yet implemented`);
}

export default Action;
