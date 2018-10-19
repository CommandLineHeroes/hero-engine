const config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 929,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

new Phaser.Game(config);
let targetImg;
let direction = 8;

function preload() {
    // load the tileset image which is just a single tile for the background room
    this.load.image('room1_img', '../../assets/images/room1.png');

    // load the tilemap exported from Tiled
    this.load.tilemapTiledJSON(
        'map',
        '../../assets/tilemaps/justroomimage.json'
    );

    // load the target image that the camera will follow
    this.load.image('target', '../../assets/images/target.png');
}

function create() {
    // parse the tilemap
    let map = this.make.tilemap({ key: 'map' });

    // add the tileset image to the map
    let tiles = map.addTilesetImage('room1', 'room1_img');

    // add the room_map layer to the scene
    map.createStaticLayer('room_map', tiles, 0, 0);

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
    } else if (targetImg.x < 300) {
        direction *= -1;
    }

    targetImg.x += direction;
}
