/** @constant
    @type {class}
    @default
*/
const item = class {
    /**
     * Create an item.
     * @param {string} name - the name of the item.
     * @param {number} attack - the attack power of the item.
     * @param {number} armor - the armor class of the item.
     * @param {number} weight - the weight of the item.
     * @param {number} cost - the cost of the item.
     * @param {number} amount - the amount of the item.
     * @param {number} maxStackSize - defines the maximum stack size of the item.
     */
    constructor(name, attack, armor, weight, cost, amount, maxStackSize) {
        this.name = name;
        this.attack = attack;
        this.armor = armor;
        this.weight = weight;
        this.cost = cost;
        this.amount = amount;
        this.maxStackSize = maxStackSize;
    }
};

export {item};