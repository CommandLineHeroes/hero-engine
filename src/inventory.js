/** @constant
    @type {class}
    @default
*/
const item = class {
    /**
     * Create an item.
     * @name - the name of the item.
     * @attack - the attack power of the item.
     * @armor - the armor class of the item.
     * @weight - the weight of the item.
     * @cost - the cost of the item.
     * @amount - the amount of the item.
     * @maxStackSize - defines the maximum stack size of the item.
     */
    constructor(name, attack, armor, weight, cost, amount = 1, maxStackSize = 1) {
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
     */
    add_item(item) {
        if (item !== null) {
            if (this.items[item.name]) {
                this.items[item.name].amount += 1 ;
            } else {
                this.items[item.name] = item;
            }
        }
    }
    
     /**
      * Remove an item from the inventory.
      */
    remove_item(item) {
        if (item !== null) {
            if (this.items[item.name]) {
                this.items[item.name].amount -= 1 ;
            } 
        }
    }

    /**
     * Display the items in the inventory.
     */
    display_items() {
        return this.items.join;
    }
};
