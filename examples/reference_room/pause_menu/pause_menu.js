let targetImg;
let direction = 8;
let paused = false;

var PauseMenu = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: function PauseMenu() {
        Phaser.Scene.call(this, { key: "pauseMenu" });
    },

    preload: function() {
        // Load images
    },

    create: function() {
        var that = this;
        var resume_label = this.add
            .text(100, 20, "Resume", { font: "24px Arial", fill: "#fff" })
            .setInteractive()
            .on("pointerdown", () => {
                that.scene.resume("gameScene");
                resume_label.setAlpha(0);
            });
        resume_label.setScrollFactor(0);
    }
});

var GameScene = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: function PauseMenu() {
        Phaser.Scene.call(this, { key: "gameScene" });
    },

    preload: function() {
        // load the tileset image which is just a single tile for the background room
        this.load.image("room1_img", "../../assets/images/room1.png");

        // load the tilemap exported from Tiled
        this.load.tilemapTiledJSON(
            "map",
            "../../assets/tilemaps/justroomimage.json"
        );

        // load the target image that the camera will follow
        this.load.image("target", "../../assets/images/target.png");
    },

    create: function() {
        // parse the tilemap
        let map = this.make.tilemap({ key: "map" });

        // add the tileset image to the map
        let tiles = map.addTilesetImage("room1", "room1_img");

        // add the room_map layer to the scene
        map.createStaticLayer("room_map", tiles, 0, 0);

        // set the camera bounds to the edges of the room
        this.cameras.main.setBounds(0, 0, 2400, 929);

        // Camera follows the target image
        targetImg = this.add.image(300, 464.5, "target");
        this.cameras.main.startFollow(targetImg);

        var that = this;
        var pause_label = this.add
            .text(1100, 20, "Pause", { font: "24px Arial", fill: "#fff" })
            .setInteractive()
            .on("pointerdown", () => {
                that.scene.pause();
                that.scene.launch("pauseMenu");
            });
        pause_label.setScrollFactor(0);
    },
    update: function() {
        // Move the target image back and forth across the room
        if (targetImg.x >= 2000) {
            direction *= -1;
        } else if (targetImg.x < 300) {
            direction *= -1;
        }

        targetImg.x += direction;
    }
});

const config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 929,
    scene: [GameScene, PauseMenu]
};

var game = new Phaser.Game(config);
