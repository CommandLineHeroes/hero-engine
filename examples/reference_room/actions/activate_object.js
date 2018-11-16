import actions from './actions.js';
import actionRunner from './action-runner.js';
import objectCache from './cache.js';
import { resolve } from './path.js';

// object to map Tiled's global IDs to sprite names, populated during preload.
const gidMap = {};

class LoadMapScene extends Phaser.Scene {
    constructor() {
        super('LoadMapScene');
    }
    preload() {
        const mapUrl = '../../assets/tilemaps/roomwithobject.json';
        const mapjson = this.load.json('map.json', mapUrl);
    }
    create() {
        this.scene.start('GameScene');
    }
}

class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }
    preload() {
        // load the tilemap exported from Tiled
        const mapUrl = '../../assets/tilemaps/roomwithobject.json';

        // load the map as raw json and as a tilemap.  why?  Phaser's Tilemap
        // *seems* to lose a few data points that we need from the original Tiled
        // json file.

        const mapUrlAbs = resolve(location.pathname, mapUrl);
        const mapjson = this.cache.json.entries.get('map.json');
        // parse the Tiled map json for more things to preload.
        mapjson.tilesets.forEach(tileset => {
            const name = tileset.name;

            gidMap[tileset.firstgid] = name;
            // find type (sprite, spritesheet, etc) of tileset and preload
            // accordingly
            if (tileset.image) {
                const img = resolve(mapUrlAbs, tileset.image);
                this.load.image(`${name}`, img);
            } else if (tileset.tiles) {
                console.log(
                    `TODO: learn how to preload spritesheets based on Tiled json data`
                );
            }
        });

        // this.load.image("room1_img", "/assets/images/room1.png");

        this.load.tilemapTiledJSON('map', mapUrl);
    }
    create() {
        // parse the tilemap
        map = this.make.tilemap({ key: 'map' });

        console.log(`TODO: make object creation automatic.`);

        // add the tileset image to the map
        let tiles = map.addTilesetImage('room1', 'room1');
        let w = map.addTilesetImage('window', 'window');
        let l = map.addTilesetImage('light_switch', 'light_switch');

        // add the room_map layer to the scene
        map.createStaticLayer('room_map', tiles, 0, 0);

        const objectLayer = map.objects.find(ol => ol.name == 'objects');

        if (objectLayer) {
            objectLayer.objects.forEach(o => {
                let gameObj;
                const spriteConfig = {};

                if (o.hasOwnProperty('gid')) {
                    gameObj = map.createFromObjects('objects', o.name, {
                        key: gidMap[o.gid]
                    });
                } else {
                    gameObj = map.createFromObjects('objects', o.name);
                }

                console.log(`creating game object ${o.name}`);

                cache.add(o.name, ...gameObj);
            });
        } else {
            throw new Error(
                'Layer with name "objects" is required by Hero Engine but no such layer was found in the Tiled map.'
            );
        }

        this.input.on('pointerup', checkObjectSelection, this);
    }

    update() {}
}

function checkObjectSelection(pointer) {
    let objectLayer = map.getObjectLayer('objects');
    if (!objectLayer) return;

    // ensure we take the camera position into account
    let x = pointer.x - this.cameras.main.x;
    let y = pointer.y - this.cameras.main.y;

    let selectedObject = null;
    for (let object of objectLayer.objects) {
        // check if object is a polygon
        if (object.hasOwnProperty('polyline')) {
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
        if (selectedObject.properties['description']) {
            console.log(
                'selected object description:' +
                    selectedObject.properties['description']
            );
        } else if (selectedObject.properties['onuse']) {
            ar.run('use', selectedObject);
        }
    }
}

const config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 929,
    scene: [LoadMapScene, GameScene]
};

const game = new Phaser.Game(config);
window.game = game; // for easy debugging
let map = null;

// init object cache, for easy object lookup
const cache = new objectCache('object-cache');

const ar = new actionRunner(actions, cache, game);
