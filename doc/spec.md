![Hero Engine](https://user-images.githubusercontent.com/3926730/45370277-e1fd9300-b5b5-11e8-80f9-c4249af4d5b2.png)

# Hero Engine Spec

Welcome to the Hero Engine Spec! This document describes the interface between the Hero Engine and [Tiled](https://www.mapeditor.org/), our level editor.  The spec standardizes some definitions, object types, property names, action names, and so on. If you are a **level creator** or an **engine developer**, there are lots of goodies in store below.

For example, if you want a button to cause a door to open, this document describes how to make that happen inside Tiled: on the button, set create a property called `onuse` and set it to `open door0`.  When the button is used, the `onuse` listener activates and runs the command, which causes the door to open.

With naming conventinos like these established, level creators and engine developers are free to work in parallel, knowing that the levels will work with the engine, and the engine with the levels.  Ahh, utopia.

This is a living document, and is being put to the test as we build levels.  It's bound to change as the levels we want to build get more sophisticated, needs change, and limitations of the spec are discovered.  Everyone should feel empowered to suggest and submit changes to this doc.

---

## Want to help?!

Before we get started, the spec needs your contributions!  If you want to contribute to the Hero Engine, or Command Line Heroes: The Game, you can do so right in this document!

It needs:

 - images, diagrams, and screenshots!
 - reports of any section that is confusing, lacking, or incorrect

On with the show!

---

**Table of Contents**
<!-- to update the table of contents, run doctoc on this file.  find doctoc here: https://github.com/thlorenz/doctoc -->

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Chapter](#chapter)
- [Room](#room)
  - [Room's custom Tiled properties](#rooms-custom-tiled-properties)
- [Threshold](#threshold)
  - [Threshold's custom Tiled properties](#thresholds-custom-tiled-properties)
- [ThresholdEnterPosition](#thresholdenterposition)
  - [ThresholdEnterPosition's custom Tiled properties](#thresholdenterpositions-custom-tiled-properties)
- [Object](#object)
  - [Object's custom Tiled properties](#objects-custom-tiled-properties)
- [Actions](#actions)
  - [Listeners and Handlers](#listeners-and-handlers)
  - [Prepackaged Actions](#prepackaged-actions)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## Chapter

A chapter could be thought of as an “episode” or “act”.  It’s a series of Rooms, representing a discrete story arc.

 1. Has one or more [Rooms](#room)
 2. Has a Player object representing the starting position of the player when the chapter begins


## Room

A room could be thought of as a “level”, or a “scene”.  It’s a set of objects placed on top of a background image.

 1. Is a Tiled “Layer Group” which contains all layers for the room
 2. Has a background image (Tiled “Image Layer”) **TODO**
 3. Has an Object layer (Tiled “Object Layer”) containing interactive Objects, Thresholds, and the Player object (but the Player object only appears in one room)
 4. Has one or more Threshold objects (inside the Object layer), representing where the player will be positioned when they enter the room (rooms can have multiple)
 5. Has Sprite/image Objects (inside the Object layer) overlayed on top of the background image, these are the objects that can be interacted with, clicked on, etc

### Room's custom Tiled properties

property name | type | description
:-|:-|:-
player-size | float | the zoom distance, how far away the “camera” should be.  Allows some rooms to be close up and some to be expansive (example: player walking along a mountain ridge, camera distance, or player walking along a narrow hallway, camera closeup)
viewport | string | undecided.  need something to control how the room is drawn on screen, whether it’s fit to the viewport, or zoomed in.  possibly we could use two values: either cover - scale the image to fill all empty space on the screen (like CSS cover), and scrolling only happens in one direction, or crop - the background is more tightly cropped and scrolling happens in both directions.
slope-y | float | how quickly the character gets smaller as they move up the screen
description | string | the description of the room, for easy reference and perhaps for displaying on the screen when you enter it
onenter | string | a pipe-separated list of actions to fire, in order, when the room is entered
onexit | string | a pipe-separated list of actions to fire, in order, when the room is exited



## Threshold

An invisible object that represents an entry and exit point for the Room.

 1. Has a unique Name property

### Threshold's custom Tiled properties

property name | type | description
:-|:-|:-
destination | string | the unique name of the destination Threshold that the player will be sent to when they enter this threshold


## ThresholdEnterPosition

A ThresholdEnterPosition is essentially a door mat, a point that represents where the player sprite should be placed after entering a room through a threshold.  It is visible in Tiled (so creators can position it) but invisible inside the game.

### ThresholdEnterPosition's custom Tiled properties

property name | type | description
:-|:-|:-
threshold | string | the Name of the threshold this EnterPosition is linked to


## Object

An Object is an interactive and/or animated object placed on top of the Room’s background.  An Object can wire up custom actions handlers to react to things like being picked up, being walked past, etc.

### Object's custom Tiled properties

property name | type | description
:-|:-|:-
description | string | a description that will be displayed when the item is viewed
onclick | string | a pipe-separated list of actions to fire when the object is clicked (if not provided, the default is to display the item’s “description” property)
oncreate | string | a pipe-separated list of actions to fire, in order, when the object is created (for example, when a level loads that contains this object, or when a player performs an action that causes the object to be created)
ondestroy | string | a pipe-separated list of actions to fire, in order, when the object is destroyed
ontake | string | the name of an actions to fire when the player picks up the object
onhover | string | a pipe-separated list of actions to fire, in order, when the cursor is hovered over the object
onplayermove | string | a pipe-separated list of actions to fire, in order, when the player moves (useful for causing actions when the player is approaching, passing by, or walking away from, an object)
conversation | file | a yaml file containing a conversation definition.  conversation definition TBD, but it should contain NPC dialog, player dialog choices, anchors for branching dialog, and actions handlers to fire based on dialog choices.


## Actions

Actions are how you bring a static level to life.  In other words, actions are how you trigger state changes in Hero Engine.  When you're building a level in Tiled, you can wire up actions to happen at certain times, for example, an action can turn on a lamp when the player clicks on a light switch.

Running with the light switch example, in Tiled you would give the light switch a property `onuse = "turnon lamp1"` (where `lamp1` is the name of the lamp).  Then, give the lamp a property `onturnon = "show lamp1on"`.  `lamp1on` is the name of a second sprite which starts out hidden, and portrays the lamp with the bulb illuminated.

The way that plays out in the game is that when the player uses the light switch, it triggers the `onuse` handler, `turnon lamp1`.  That in turn triggers the lamp's `onturnon` handler, `show lamp1on`.  With the `lamp1on` sprite revealed, the lamp is now turned on!

With this system of action listeners (like `onuse`) and handlers (like `turnon lamp1`), you can create a network of causes and effects, from the simplest light switch to a complex Rube Goldberg machine.

### Listeners and Handlers

All state changes in the game take the form of action handlers.  Objects, Rooms, Thresholds, etc, can all specify, via custom properties, action to fire when various things take place.  For example, if you wanted an audio file to play when a Room is entered, you would:

 1. Decide on a property name for the audio file, for example “hauntingTune”
 2. Create a custom property on the Room called hauntingTune, (type: file) and point it at the audio file you wish to play
 3. Set the Room’s onenter property (a string) to “playaudio hauntingTune”
 4. If you want the audio to stop playing when the room is exited, set the Room’s onexit property (a string) to “stopaudio hauntingTune” or, if you wish the audio to stop only when exiting through a certain Threshold, set that property on the Threshold instead of the Room

Now, when the room is entered, the audio file automatically play.


### Built-in Actions

command lists the names of the commands as a player would type them on the command line, or as an action handler on an object.  Values of “N/A” mean the 
Below is a table of actions planned to be built-into the engine.  The columns are as follows:
listener lists the Tiled custom property name for any object that wants to listen for the action.
boolean lists the Tiled custom property for an object which determines whether the command can be run on it.

command | listener | boolean | description | examples
:-|:-|:-|:-|:-
look | onlook | canlook | Display the description of an object | (links to examples will go here, when ready)
inspect | oninspect | caninspect | Display a fullscreen view of an object | `inspect room13`
talk | ontalk | cantalk | Begin a conversation | 
take | ontake | cantake | Put an object in your inventory | 
open | onopen | canopen | Open an object | 
close | onclose | canclose | Close an object | 
give | ongive | cangive | Give an object to someone or something | 
use | onuse | canuse | Use an object | 
create | oncreate | N/A | Create an object | 
destroy | ondestroy | N/A | Destroy an object | 
N/A | onhover | N/A | Mouse is hovered over an object | 
playermove | onplayermove | N/A | The player moves | 
move | onmove | canmove | The object is moved | 
hide | onhide | canhide | Hide an object (opposite of show) | 
show | onshow | canshow | Show an object (opposite of hide) | 
playaudio | N/A | N/A | Play an audio file~ | 
stopaudio | N/A | N/A | Stop an audio file | 
stopallaudio | N/A | N/A | Stop all audio files | 
toggle | N/A | N/A | Toggle a boolean property on an object | 
**Rooms only** |  |  |  | 
N/A | onenter | N/A | The room is entered by the player | 
N/A | onexit | N/A | The room is exited | 
