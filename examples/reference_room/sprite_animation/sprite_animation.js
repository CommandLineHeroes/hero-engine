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
let direction = 8;
let player;

function preload() {
    // load the tileset image which is just a single tile for the background room
    this.load.image('room1_img', '../../assets/images/room1.png');
    this.load.image('wall_terminal_img', '../../assets/images/terminal_5x.png');

    // Load the player sprite sheet
    this.load.spritesheet('player_sheet', '../../assets/images/player_sheet.png', { frameWidth: 72, frameHeight: 97 });

    // load the tilemap exported from Tiled
    this.load.tilemapTiledJSON('map', '../../assets/tilemaps/animated_room.json');

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

    // Create the player sprite animation config
    let config = {
        key   : 'walk',
        frames: this.anims.generateFrameNumbers('player_sheet', {}),
        repeat: -1,
    };

    // Create the walk animation
    this.anims.create(config);

    // Create the player sprite
    player = this.add.sprite(300, 700, 'player');

    // Make player a bit bigger
    player.scaleX = 4;
    player.scaleY = 4;

    // Start the walking animation
    player.anims.play('walk');

    // Camera follows the target image
    this.cameras.main.startFollow(player);
}

function update() {
    // Move the target image back and forth across the room
    if (player.x >= 2000) {
        direction *= -1;
        player.toggleFlipX(); // make him face the right way
    }
    else if (player.x < 300) {
        direction *= -1;
        player.toggleFlipX();
    }

    player.x += direction;
}
