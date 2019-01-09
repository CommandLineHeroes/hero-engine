const config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 929,
    physics: {
        default: "arcade",
        gravity: {
            x: 0
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

new Phaser.Game(config);
let map = null;

const STATES = {
    IDLE: "IDLE",
    ROOM_TRANSITION: "ROOM_TRANSITION",
    MOVING: "MOVING"
};

let rooms = [];
let player = {
    state: STATES.IDLE,
    movementSpeed: 600,
    direction: 1
};

function preload() {
    // load the tileset image which is just a single tile for the background room
    this.load.image("room1_img", "../../assets/images/room1.png");
    this.load.image("window", "../../assets/images/window.png");

    // Load the player sprite sheet
    // Added 3px of empty space to each side of each frame of animation to prevent webGL pixel bleeding
    this.load.spritesheet(
        "player_sheet",
        "../../assets/images/player_sheet.png",
        { frameWidth: 78, frameHeight: 103 }
    );

    // load the tilemap exported from Tiled
    this.load.tilemapTiledJSON(
        "map",
        "../../assets/tilemaps/roomwiththreshold.json"
    );

    this.load.image("target", "../../assets/images/target.png");
}

/**
 * Saves the list of room bounds for easy access.
 */
function buildRoomBounds(map) {
    let room_bounds = map.getObjectLayer("room_bounds");
    for (let room of room_bounds.objects) {
        rooms.push(room);
    }
}

/**
 * Find the room bounds that include the given position (x,y).
 */
function getRoomBoundsAtPosition(x, y) {
    let result = null;
    for (let room of rooms) {
        if (
            room.x < x &&
            x < room.x + room.width &&
            room.y < y &&
            y < room.y + room.width
        ) {
            result = room;
            break;
        }
    }
    return result;
}

function create() {
    // parse the tilemap
    map = this.make.tilemap({ key: "map" });

    buildRoomBounds(map);

    // add the tileset image to the map
    let tiles = map.addTilesetImage("room1", "room1_img");
    map.addTilesetImage("window", "window");

    let roomMap = map.getLayer("room_map");
    let roomMap2 = map.getLayer("room_map2");

    // add the room_map layer to the scene
    map.createStaticLayer("room_map", tiles, roomMap.x, roomMap.y);
    map.createStaticLayer("room_map2", tiles, roomMap2.x, roomMap2.y);
    // create sprites for the objects layer
    map.createFromObjects("objects", "window", { key: "window" });

    // Create the player sprite animation config
    let walkConfig = {
        key: "walk",
        frames: this.anims.generateFrameNumbers("player_sheet", {}),
        repeat: -1
    };
    let idleConfig = {
        key: "idle",
        frames: [{ key: "player_sheet", frame: 1 }],
        repeat: -1
    };

    // Create the walk animation
    this.anims.create(walkConfig);
    this.anims.create(idleConfig);

    player.image = this.physics.add.sprite(500, 700, "player");
    //player.image = this.add.sprite(0, 0, "target");

    // Make player a bit bigger
    player.image.scaleX = 2;
    player.image.scaleY = 2;

    // Start the walking animation
    player.image.anims.play("walk");

    moveToRoom(this, { x: 500, y: 700 });

    this.cameras.main.startFollow(player.image);

    this.input.on("pointerup", checkObjectSelection, this);
}

function update() {
    switch (player.state) {
        case STATES.IDLE:
            break;

        case STATES.ROOM_TRANSITION:
            if (
                (player.image.body.velocity.x > 0 &&
                    player.image.x >= player.targetDestination.x) ||
                (player.image.body.velocity.x < 0 &&
                    player.image.x <= player.targetDestination.x) ||
                player.image.body.velocity.x === 0
            ) {
                roomBounds = getRoomBoundsAtPosition(
                    player.thresholdDestination.x,
                    player.thresholdDestination.y
                );

                let cam = this.cameras.main;

                cam.setBounds(
                    roomBounds.x,
                    roomBounds.y,
                    roomBounds.width,
                    roomBounds.height
                );
                cam.pan(
                    player.thresholdDestination.x,
                    player.thresholdDestination.y,
                    "Sine.easeInOut"
                );
                player.state = STATES.IDLE;
                player.image.setVelocityX(0);
                player.image.x = player.thresholdDestination.x;
                this.cameras.main.startFollow(player.image);
            }

            break;

        case STATES.MOVING:
            if (
                (player.image.body.velocity.x > 0 &&
                    player.image.x >= player.targetDestination.x) ||
                (player.image.body.velocity.x < 0 &&
                    player.image.x <= player.targetDestination.x) ||
                player.image.body.velocity.x === 0
            ) {
                player.state = STATES.IDLE;
                player.image.setVelocityX(0);
                player.image.anims.play("idle");
            }

            break;
    }
}

/**
 * Gets a property from an object.
 * object.properties will be an array if there is
 * more than one property on the object, otherwise
 * it will be a JS object.
 */
function getObjectProperty(object, propertyName) {
    let result = null;
    if (Array.isArray(object.properties)) {
        for (let property of object.properties) {
            if (property["name"] === propertyName) {
                result = property["value"];
                break;
            }
        }
    } else {
        result = object.properties[propertyName];
    }
    return result;
}

/**
 * Retrieves an object from the given TileMap layer.
 */
function getObjectByName(objectLayer, objectName) {
    let result = null;

    for (let object of objectLayer.objects) {
        if (object.name === objectName) {
            result = object;
            break;
        }
    }

    return result;
}

/**
 * Moves the camera to the destination, and sets the camera bounds to roomBounds.
 * Moves the player to the destination.
 *
 * Look up which roomBounds include the given destination.
 */
function moveToRoom(_this, destination, thresholdPosition) {
    if (!thresholdPosition) {
        thresholdPosition = destination;
    }
    player.state = STATES.ROOM_TRANSITION;
    player.thresholdDestination = destination;
    player.targetDestination = thresholdPosition;

    player.image.anims.play("walk");

    if (player.image.x < player.targetDestination.x) {
        player.image.setVelocityX(player.movementSpeed);
        if (player.direction === -1) {
            player.direction *= -1;
            player.image.toggleFlipX();
        }
    } else if (player.image.x > player.targetDestination.x) {
        player.image.setVelocityX(-player.movementSpeed);
        if (player.direction === 1) {
            player.direction *= -1;
            player.image.toggleFlipX();
        }
    }
}

/*
 * Move the player to the given destination.
 */
function move(destination) {
    player.state = STATES.MOVING;
    player.targetDestination = destination;
    if (
        !player.image.anims.isPlaying ||
        player.image.anims.currentAnim.key !== "walk"
    ) {
        player.image.anims.play("walk");
    }

    if (player.image.x < player.targetDestination.x) {
        player.image.setVelocityX(player.movementSpeed);
        if (player.direction === -1) {
            player.direction *= -1;
            player.image.toggleFlipX();
        }
    } else if (player.image.x > player.targetDestination.x) {
        player.image.setVelocityX(-player.movementSpeed);
        if (player.direction === 1) {
            player.direction *= -1;
            player.image.toggleFlipX();
        }
    }
}

function checkObjectSelection(pointer) {
    let objectLayer = map.getObjectLayer("objects");
    if (!objectLayer) return;

    // ensure we take the camera position into account
    let x = pointer.x + this.cameras.main.scrollX;
    let y = pointer.y + this.cameras.main.scrollY;

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
        console.log(selectedObject);

        switch (selectedObject.type) {
            case "room_object":
                console.log(
                    "selected object description:" +
                        getObjectProperty(selectedObject, "description")
                );
                break;

            case "threshold":
                let cam = this.cameras.main;

                let objectLayer = map.getObjectLayer("objects");
                let room_bounds = map.getObjectLayer("room_bounds");
                let thresholdDestination = getObjectByName(
                    objectLayer,
                    getObjectProperty(selectedObject, "destination")
                );
                let thresholdPosition = {
                    x: selectedObject.x,
                    y: selectedObject.y
                };

                moveToRoom(this, thresholdDestination, thresholdPosition);
                break;
        }
    } else {
        let clickPosition =
            this.input.activePointer.x + this.cameras.main.scrollX;
        move({ x: clickPosition });
    }
}
