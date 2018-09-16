const config = {
    type  : Phaser.AUTO,
    width : 1200,
    height: 929,
    scene : {
        preload: preload,
        create : create,
        update : update,
    },
};

new Phaser.Game(config);
let targetImg;
let direction = 8;

function preload() {
    // load the tileset image which is just a single tile for the background room
    this.load.image('room1_img', '../../assets/images/room1.png');
    this.load.image('wall_terminal_img', '../../assets/images/terminal_5x.png');

    // load the tilemap exported from Tiled
    this.load.tilemapTiledJSON('map', '../../assets/tilemaps/animated_room.json');

    // load the target image that the camera will follow
    this.load.image('target', '../../assets/images/target.png');

    // Load the Animated Tiles Plugin: https://github.com/nkholski/phaser-animated-tiles
    this.load.scenePlugin('animatedTiles', AnimatedTiles, 'animatedTiles', 'animatedTiles');
}

function create() {
    // parse the tilemap
    let map = this.make.tilemap({ key: 'map' });

    // add the tileset image to the map
    let room_tileset = map.addTilesetImage('room1', 'room1_img');
    let wall_terminal_tileset = map.addTilesetImage('wall_terminal', 'wall_terminal_img');

    // add the room_map layer to the scene
    map.createStaticLayer('room_map', room_tileset, 0, 0);

    map.createDynamicLayer('clickable', wall_terminal_tileset, 0, 0);

    // We got the map. Tell animated tiles plugin to loop through the tileset properties and get ready.
    // We don't need to do anything beyond this point for animated tiles to work.
    this.sys.animatedTiles.init(map);

    // set the camera bounds to the edges of the room
    this.cameras.main.setBounds(0, 0, 2400, 929);

    // Camera follows the target image
    targetImg = this.add.image(300, 464.5, 'target');
    this.cameras.main.startFollow(targetImg);
}

function update() {
    // Move the target image back and forth across the room
    if (targetImg.x >= 2000) {
        direction *= -1;
    }
    else if (targetImg.x < 300) {
        direction *= -1;
    }

    targetImg.x += direction;
}
