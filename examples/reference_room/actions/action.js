class action /* lawsuit */ {
    constructor(group, name='NAMELESS_ACTION', fn=nyi) {
        this.group = group;
        this.name = name;
        this.fn = fn;

        // register myself with the provided group of actions
        this.group[this.name] = this;
    }

    log(...msgs) {
        console.log(`[${this.name}]`, ...msgs);
    }

    run(game, cache, ...args) {
        this.fn(game, cache, ...args);
    }
}

function nyi() {
    console.log(`[actions] "${this.name}" not yet implemented`);
}

export default action;
