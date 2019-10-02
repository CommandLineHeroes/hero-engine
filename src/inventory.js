import { item } from './item.js';

/** @constant
    @type {class}
    @default
*/
const inventory = class {
    /**
     * Create an inventory for items.
     * @param {number} maxItems - defines the maximum items allowed in the inventory.
     */
    constructor(maxItems) {
        this.items = [];
        this.maxItems = maxItems;
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
                } else if (
                    this.items.length >= this.maxItems + 1
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

/** @constant
    @type {class}
    @default
*/
const container = class {
    /**
     * Create a container that holds an inventory.
     */
    constructor() {
        this.inventory = inventory;
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

export { inventory, container };
