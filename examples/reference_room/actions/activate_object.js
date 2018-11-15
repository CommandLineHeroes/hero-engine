import actions from "./actions.js";
import actionRunner from "./action-runner.js";
import objectCache from "./cache.js";
import { resolve } from "./path.js";

class LoadMapScene extends Phaser.Scene {
    constructor() {
        super("LoadMapScene");
    }
    preload() {
        const mapUrl = "../../assets/tilemaps/roomwithobject.json";
        const mapjson = this.load.json("map.json", mapUrl);
    }
    create() {
        this.scene.start("GameScene");
    }
}

class GameScene extends Phaser.Scene {
    constructor() {
        super("GameScene");
    }
    preload() {
        // load the tileset image which is just a single tile for the background room
        // this.load.image("room1_img", "../../assets/images/room1.png");
        // this.load.image("window", "../../assets/images/window.png");
        // this.load.image("light_switch", "../../assets/images/button.png");
        // this.load.image("light_off", "../../assets/images/light_off.png");
        // this.load.image("light_on", "../../assets/images/light_on.png");

        // load the tilemap exported from Tiled
        const mapUrl = "../../assets/tilemaps/roomwithobject.json";

        // load the map as raw json and as a tilemap.  why?  Phaser's Tilemap
        // *seems* to lose a few data points that we need from the original Tiled
        // json file.

        const mapUrlAbs = resolve(location.pathname, mapUrl);
        const mapjson = this.cache.json.entries.get("map.json");
        // parse the Tiled map json for more things to preload.
        mapjson.tilesets.forEach(tileset => {
            // find type (sprite, spritesheet, etc) of tileset and preload
            // accordingly
            if (tileset.image) {
                const img = resolve(mapUrlAbs, tileset.image);
                // console.log(`preloading ${tileset.name} ${img}`);
                this.load.image(`${tileset.name}`, img);
                console.log(`this.load.image('${tileset.name}', '${img}')`);
            } else if (tileset.tiles) {
                console.log(
                    `TODO: learn how to preload spritesheets based on Tiled json data`
                );
            }
        });

        // this.load.image("room1_img", "/assets/images/room1.png");

        this.load.tilemapTiledJSON("map", mapUrl);
    }
    create() {
        // parse the tilemap
        map = this.make.tilemap({ key: "map" });
        // window.map = map;
        // window.mapjson = this.cache.json.entries.get("map.json");

        // add the tileset image to the map
        let tiles = map.addTilesetImage("room1", "room1");
        let w = map.addTilesetImage("window", "window");
        let l = map.addTilesetImage("light_switch", "light_switch");

        // add the room_map layer to the scene
        map.createStaticLayer("room_map", tiles, 0, 0);

        // create sprites for the objects layer
        const window1 = map.createFromObjects("objects", "window1", {
            key: "window"
        });
        const window2 = map.createFromObjects("objects", "window2", {
            key: "window"
        });
        const light_switch = map.createFromObjects("objects", "light_switch", {
            key: "light_switch"
        });
        const ceiling_light = map.createFromObjects(
            "objects",
            "ceiling_light",
            {
                key: "light_off"
            }
        );

        // cache objects for easy lookup later
        for (let object of [
            ...window1,
            ...window2,
            ...light_switch,
            ...ceiling_light
        ]) {
            cache.add(object.name, object);
        }

        this.input.on("pointerup", checkObjectSelection, this);
    }
}

function checkObjectSelection(pointer) {
    let objectLayer = map.getObjectLayer("objects");
    if (!objectLayer) return;

    // ensure we take the camera position into account
    let x = pointer.x - this.cameras.main.x;
    let y = pointer.y - this.cameras.main.y;

    let selectedObject = null;
    for (let object of objectLayer.objects) {
        // check if object is a polygon
        if (object.hasOwnProperty("polyline")) {
            // each point on the polyline is relative to it's parent object's position,
            // so need to map them to world values
            let points = object.polyline.map(value => {
                return {
                    x: value.x + object.x,
                    y: value.y + object.y
                };
            });
            let polygon = new Phaser.Geom.Polygon(points);
            let containsPoint = polygon.contains(x, y);
            if (containsPoint) {
                selectedObject = object;
                break;
            }
        } else {
            // not a polygon, so can just check against x,y,width,height
            if (
                x >= object.x &&
                x <= object.x + object.width &&
                y >= object.y - object.height &&
                y <= object.y
            ) {
                selectedObject = object;
                break;
            }
        }
    }
    if (selectedObject) {
        if (selectedObject.properties["description"]) {
            console.log(
                "selected object description:" +
                    selectedObject.properties["description"]
            );
        } else if (selectedObject.properties["onuse"]) {
            ar.run("use", selectedObject);
        }
    }
}

const config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 929,
    // scene: {
    //     preload: preload,
    //     create: create
    // }
    // scene: [LoadMapScene, gameScene]
    scene: [LoadMapScene, GameScene]
};

const game = new Phaser.Game(config);
window.game = game; // for easy debugging
let map = null;

// init object cache, for easy object lookup
const cache = new objectCache("object-cache");

const ar = new actionRunner(actions, cache, game);
