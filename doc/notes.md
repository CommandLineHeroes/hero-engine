# NOTES



## Tiled Object Templates

Tiled has support for reusable object definitions called Templates.  It might be really nice to create object templates with all the custom properties already filled out (all defaulting to false, no event listeners, etc).  Should reduce the amount of typing and error-prone copy-pasting.


## Adding a SINGLE image to Tiled (not a multi-frame spritesheet)

Either drag the image onto the "Tilesets" region, or click the New Tileset button.  For the 'Type' dropdown, choose the option 'Based on Tileset Image'.  Tile width and Tile height should be set to match the image's width and height.


## Scribbles & Notes

Phaser 3 has a function called setCollisionByProperty for layers which // Any tile with the collides property set to true (in Tiled) will be set to collide

Example:

    layer.setCollisionByProperty({ collides: true });

Means that any object in Tiled with a “collides” property set to “true” will be collided with by the 


For dialog: look at NPM package rpg-dialog or write our own (npm-package doesn’t allow giving arguments to handler functions)

