const item = class {
    constructor(name, attack, armor, weight, cost) {
        this.name = name;
        this.attack = attack;
        this.armor = armor;
        this.weight = weight;
        this.cost = cost;
    }
};

const inventory = class {
    constructor() {
        this.items = [];
    }

    add_item(item) {
        this.items[item.name] = item;
    }

    display_items() {
        return this.items.join;
    }

};
