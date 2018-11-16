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

/** @constant
    @type {class}
    @default
*/
const inventory = class {
    /**
     * Create an inventory for items.
     */
    constructor() {
        this.items = [];
    }

    /**
     * Add an item to the inventory.
     * @param {class} item - the item to be manipulated.
     * @return {string} - a message if an item cannot be added.
     */
    add_item(item) {
        if (item !== null) {
            if (this.items[item.name]) {
                if (
                    this.items[item.name].amount >=
                    this.items[item.name].maxStackSize
                ) {
                    return 'No more of this item can be carried.';
                } else {
                    this.items[item.name].amount += 1;
                }
            } else {
                this.items[item.name] = item;
            }
        }
    }

    /**
     * Remove an item from the inventory.
     * @param {class} item - the item to be manipulated.
     */
    remove_item(item) {
        if (item !== null) {
            if (this.items[item.name]) {
                this.items[item.name].amount -= 1;
            }
        }
    }

    /**
     * @return {number} the items in the inventory.
     */
    display_items() {
        return Object.keys(this.items).join(', ');
    }
};

/**
 * Some Tests
 */
const sword = new item('Sword', 5, 1, 3, 10, 1, 1);
const potion = new item('Potion', 0, 0, 1, 3, 10);
const heroInventory = new inventory();

heroInventory.add_item(sword);
heroInventory.add_item(potion);

/**
 * Expect 1 potion and 1 sword
 */
console.log(heroInventory.display_items());

/**
 * Expect that not all of these potions can be added
 */
for (let i = 0; i < 10; i++) {
    heroInventory.add_item(potion);
}

/**
 * Expect that the sword cannot be removed if it's not in the inventory
 */
for (let i = 0; i < 2; i++) {
    heroInventory.remove_item(sword);
}

/**
 * Expect 10 potions and 0 swords.
 */
console.log(heroInventory.display_items());
