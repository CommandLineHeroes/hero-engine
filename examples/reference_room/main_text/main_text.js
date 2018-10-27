const config = {
    type  : Phaser.AUTO,
    width : 1200,
    height: 929,
    scene : {
        preload: preload,
        create : create,
    },
};

var game = new Phaser.Game(config);
var text = null;
let map = null;
var graphics;

function preload() {
    //TODO: Add Dialog Manager init here
    // load the tileset image which is just a single tile for the background room
    this.load.image('room1_img', '../../assets/images/room1.png');
    this.load.image('window', '../../assets/images/window.png');

    // load the tilemap exported from Tiled
    this.load.tilemapTiledJSON('map', '../../assets/tilemaps/roomwithobject.json');
}

function create() {
    // parse the tilemap
    map = this.make.tilemap({ key: 'map' });

    // add the tileset image to the map
    let tiles = map.addTilesetImage('room1', 'room1_img');
    map.addTilesetImage('window', 'window');

    // add the room_map layer to the scene
    map.createStaticLayer('room_map', tiles, 0, 0);
    // create sprites for the objects layer
    map.createFromObjects('objects', 'window', { key: 'window' });

    this.input.on('pointerup', checkObjectSelection, this);
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
            let points = object.polyline.map((value) => {
                return {
                    x: value.x + object.x,
                    y: value.y + object.y,
                };
            });
            let polygon = new Phaser.Geom.Polygon(points);
            let containsPoint = polygon.contains(x, y);
            if (containsPoint) {
                selectedObject = object;
                break;
            }
        }
        else {
            // not a polygon, so can just check against x,y,width,height
            if (x >= object.x && x <= object.x + object.width
                && y >= object.y - object.height && y <= object.y) {
                selectedObject = object;
                break;
            }
        }
    }
    if (selectedObject) {
        //TODO: Dialog creation should happen here per requirements. We should also destroy or hide any other dialog currently displayed
        //// WARNING: Hardcoding a minimal textbox to display.
        graphics = this.add.graphics({ fillStyle: { color: 0xffffff } });
        let topPadding = 50;
        let leftPadding = 40;
        dialogBox = new Phaser.Geom.Rectangle(config.width-(config.width*11/12), config.height-(config.height*5/16), config.width*5/6, config.width*1/6);
        graphics.fillRectShape(dialogBox);
        var style = {
          font: "24px Arial",
          fill: "#000",
          align: "left",
          wordWrap: { width: 950, useAdvancedWrap: true },
          "backgroundColor" : "#ffffff",
        };
        var text = this.add.text(dialogBox.x+leftPadding, dialogBox.y+topPadding, selectedObject.properties['description'], style);
        console.log('selected object description:' + selectedObject.properties['description']);
    }
}
