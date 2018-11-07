class action_runner {
    constructor(actions, cache, game) {
        this.actions = actions;
        this.cache = cache;
        this.game = game;
    }
    run(name, ...args) {
        const n = name.toLowerCase();
        if (this.actions.hasOwnProperty(n)) {
            this.actions[n].run(this.game, this.cache, ...args);
        } else {
            console.error(`[action-runner] '${name}' is not an action`);
        }
    }
}

export default action_runner;
