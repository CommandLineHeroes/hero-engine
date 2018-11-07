import action from "./action.js";
import parse from "./action-parser.js";
import ar from "./action-runner.js";

const actions = {};

export default {
    turnon: new action(actions, "turnon", (game, cache, _obj) => {
        const obj = cache.get(_obj);
        console.log(`[actions.turnon] ${obj.name}`);
        if (obj.data.list.onturnon) {
            const cmd = parse(obj.data.list.onturnon);
            actions[cmd.action].run(game, cache, ...cmd.args);
        }
    }),

    use: new action(actions, "use", (game, cache, _obj) => {
        const obj = cache.get(_obj);
        console.log(`[actions.use] ${obj.name} -> ${obj.data.list.onuse}`);
        if (obj.data.list.onuse) {
            const cmd = parse(obj.data.list.onuse);
            actions[cmd.action].run(game, cache, ...cmd.args);
        }
    }),

    setsprite: new action(actions, "setsprite", (game, cache, _obj, sprite) => {
        const obj = cache.get(_obj);
        console.log(`[actions.setsprite] ${obj.name} to ${sprite}`);
        obj.setTexture(sprite);
    })
};
