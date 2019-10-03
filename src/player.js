/** @constant
    @type {class}
    @default
*/
const player = class {
    /**
     * Create a player.
     * @param {string} name - the name of the player.
     * @param {number} inventory - the default inventory of the player.
     */
    constructor(name, inventory) {
        this.name = name;
        this.inventory = inventory;
    }
};

export { player };
