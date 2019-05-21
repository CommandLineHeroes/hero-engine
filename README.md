![Hero Engine](https://user-images.githubusercontent.com/3926730/45370277-e1fd9300-b5b5-11e8-80f9-c4249af4d5b2.png)

# Arcade Game Focus

In addition to the Hero Engine and adventure game, we are also making a fast paced arcade game called "CLH Bash".  The core devs are focusing our time on this game right now so if you're interested in contributing head over to:

**[Command Line Heros: Bash!](https://github.com/CommandLineHeroes/clh-bash)**

# Hero Engine

The Hero Engine aims to be an open-source HTML5 adventure game creation engine based on [Tiled](https://www.mapeditor.org/) and [Phaser3](https://phaser.io/).

We're calling it a meta-engine because it is not a full game engine on it's own, but a layer on top of Phaser3 that makes it easy to create [Adventure Games](https://en.wikipedia.org/wiki/Adventure_game).
The engine will provide game developers with an integration between Tiled and Phaser3 that will allow for easy adventure-game-like level creation.  As well as common functions and UI elements that are common among all
adventure games.  If you're not sure what an adventure game is, [Monkey Island](https://en.wikipedia.org/wiki/The_Secret_of_Monkey_Island), is a great example of the adventure game genre.

This engine will be used to create "Command Line Heroes: The Game" announced on [Episode 1](https://www.redhat.com/en/command-line-heroes/season-2/press-start) of Season 2 of the [Command Line Heroes Podcast](https://www.redhat.com/en/command-line-heroes).  See more about the game [below](#command-line-heroes-the-game).

We are creating a new engine because we couldn't find any existing open source HTML5 adventure game creators out there. But if you know of any open source adventure game engines for the web let us know!

## Install

    npm install

## Examples

    npm run examples

## Docker

    docker-compose up

Examples of the game will be at http://localhost:3000 and the Browsersync UI will be at http://localhost:3001.

## Contribute

Everyone is invited to contribute to this project.  All types of contributions are welcome.  We share the same inclusivity values of the [P5.js community](https://p5js.org/community/).

Before we can start work on the actual Command Line Heroes adventure game we need to complete at least the first two milestones listed below.  The best way you can help right now is by working on one of the [issues](https://github.com/CommandLineHeroes/hero-engine/issues) in the Reference Room milestone.

We are also learning Phaser3 and Tiled as we go so the The Reference Room is a proof of concept for the base level features we need for a bare bones adventure game organized into a series of examples.

### Milestones

1. [Reference Room](https://github.com/CommandLineHeroes/hero-engine/milestone/1) - Base level room
2. UI Functions - common functions across adventure games
3. Advanced functions - Dialogs, command line interpreter, transitions

### Guides & Docs

This project is built on top of two main tools: Tiled and Phaser3. Here are some useful guides and docs for each.

Tutorials:
* [Tiled tutorial series](https://www.youtube.com/watch?v=ZwaomOYGuYo)
* [Phaser3 Tutorial](https://phaser.io/tutorials/making-your-first-phaser-3-game)
* [Phaser3 Examples](https://labs.phaser.io/)

Docs:
* [Tiled Docs](https://doc.mapeditor.org/en/stable/)
* [Phaser3 Docs](https://photonstorm.github.io/phaser3-docs/index.html)


### How to get Help

1. Post a question in the repo [issues](https://github.com/CommandLineHeroes/hero-engine/issues)
2. Ask a question in real-time in our [public Discord server](https://discord.gg/rpnmpVj)
3. Send a tweet to one of the twitter links below [social](#social)

## Community

Join our [public Discord server](https://discord.gg/rpnmpVj)!

## Social

 - Jared Sprague [@caramelcode](https://twitter.com/caramelcode)
 - Michael Clayton [@mwcz](https://twitter.com/mwcz)
 - [Command Line Heroes](https://www.redhat.com/en/command-line-heroes)
 - [#CommandLinePod](https://twitter.com/hashtag/CommandLinePod?src=hash)

## Command Line Heroes: The Game

The Hero Engine is being built alongside *Command Line Heroes: The Game*, an adventure game based on themes from the [Command Line Heroes](https://www.redhat.com/en/command-line-heroes) podcast.

* Future git repo for the game: [clh-the-game](https://github.com/CommandLineHeroes/clh-the-game)
* Interview about the game: https://www.redhat.com/en/blog/command-line-heroes-game
