const config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 929,
    physics: {
        default: 'arcade',
        gravity: {
            x: 0
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    },
};

new Phaser.Game(config);
let targetImg;
let movementPoint = 0;
let movementSpeed = 350;

function preload() {
    // load the tileset image which is just a single tile for the background room
    this.load.image('room1_img', '../../assets/images/room1.png');

    // load the tilemap exported from Tiled
    this.load.tilemapTiledJSON('map', '../../assets/tilemaps/justroomimage.json');

    // load the target image that the camera will follow
    this.load.image('target', '../../assets/images/target.png');
}

function create() {
    // parse the tilemap
    let map = this.make.tilemap({
        key: 'map'
    });

    // add the tileset image to the map
    let tiles = map.addTilesetImage('room1', 'room1_img');

    // add the room_map layer to the scene
    map.createStaticLayer('room_map', tiles, 0, 0);

    // set the camera bounds to the edges of the room
    this.cameras.main.setBounds(0, 0, 2400, 929);

    // Camera follows the target image
    targetImg = this.physics.add.image(300, 464.5, 'target');
    this.cameras.main.startFollow(targetImg);
}


let position = 0;
function update() {
    if (this.input.activePointer.isDown) {
        //since the map is larger then the canvas width we need to calculate the scroll x variable 
        let cameraPosition = this.input.activePointer.x + this.cameras.main.scrollX;

        if (targetImg.x > cameraPosition) {
            position = cameraPosition
            targetImg.setVelocityX(-movementSpeed);
        }
        if (targetImg.x < cameraPosition) {
            position = cameraPosition
            targetImg.setVelocityX(movementSpeed);
        }
    }

    //check if object is moving to the right
    if (targetImg.body.velocity.x > 0) {
        if (targetImg.x > position) {
            position = 0
            targetImg.setVelocityX(0)
        }
    } else {
        if (targetImg.x < position) {
            position = 0
            targetImg.setVelocityX(0)
        }

    }

}
