import Action from './action.js';
import Logger from './logger.js';

const logger = new Logger('actions');

export default class Actions {
    /**
     * Constructor for an Actions object.
     *
     * @param {Phaser.Game} game a reference to the Phaser game
     * @param {Object} cache a cache object for easily looking up Phaser objects by name
     */
    constructor(game, cache) {
        this.game = game;
        this.cache = cache;
        this.actions = {};
    }

    /**
     * Add a new action.  This takes an action name and a function that implements the action.
     *
     * The handler functions' first two arguments must be:
     *
     *  - `game`, a reference to the Phaser.Game instance
     *  - `cache`, a reference to a cache object that can be used for easily looking up Tiled objects by name
     *
     * Any number of extra arguments may be passed in as well, depending on the
     * needs of the action, but the first two must be `game` and `cache`.
     *
     * @param {String} name the action's name
     * @param {Function} fn the function that performs the action's duties
     * @return {Action} the action object that was just created
     */
    add(name, fn) {
        this.actions[name.toLowerCase()] = new Action(name, fn);
    }

    /**
     * Get an action by name, if it exists.  Returns `undefined` if the action doesn't exist.
     *
     * @param {String} name the name of the action
     * @return {Action|undefined} the action object, or undefined
     */
    get(name) {
        return this.actions[name.toLowerCase()];
    }

    /**
     * Remove an action.
     *
     * @param {String} name the name of the action
     */
    remove(name) {
        delete this.actions[name.toLowerCase()];
    }

    /**
     * Run an action by name, with optional args.
     *
     * @param {String} name the name of the action
     * @param {Object} args extra arguments to be passed along to the action
     */
    async run(name, ...args) {
        const action = this.get(name);
        if (action) {
            action.run(this.game, this.cache, ...args);
        } else {
            logger.log(`action '${name}' not found`);
        }
    }

    /**
     * Run a command line (such as an action handler, or a command the user typed into the CLI).
     *
     * @param {String} cmd the command to be executed
     * @example eval("turnon lamp1")
     */
    async eval(cmd) {
        logger.log(`parsing '${cmd}'`);
        const [actionName, ...args] = cmd.split(/\s+/);
        await this.run(actionName, ...args);
    }
}
