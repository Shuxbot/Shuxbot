<h1 align="center"> SHUXBOT </h1>

<p align="center">Shux Team Discord Bot</p>

<p align="center">
  <a href="https://discord.gg/6y7Fh8x">
    <img src="https://discordapp.com/api/guilds/392414185633611776/widget.png?style=shield" alt="Shux Team Discord Server">
  </a>
</p>
<p align="center">
  <a href="https://github.com/firebase/firebase-admin-node">
    <img src="https://img.shields.io/badge/firebase-admin-yellow?style=flat-square" alt="Firebase admin">
  </a>
  <a href="https://github.com/prettier/prettier">
    <img src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square" alt="Prettier">
  </a>
  <a href="https://github.com/discordjs/discord.js">
    <img src="https://img.shields.io/badge/discord-js-yellow?style=flat-square" alt="Discord.js">
  </a>
</p>

## Social (Shux Team)

[Twitter](https://twitter.com/shuxteam)<br>
[Youtube](https://www.youtube.com/channel/UCt7GNv0mKwyu3SzltispROw)<br>
[Instagram](https://www.instagram.com/shuxteam)

## About

Shuxbot is a moderation bot with leveling and tickets system, made to accomplish the main necessities of Shux Team's Discord server.

- Written in TypeScript using Node.js
- Currently hosted on Heroku

## Features

##### Moderation

- Basic commands as kick, ban, mute and blacklist
- Flood
- Discord invite links
- Log reports in a custom channel
- Custom channel for commands
  - If set normal users will only be able to run commands in that channel

##### Privilege level for commands usage

- Levels: user (4), tech (3), mod (2), admin (1), dev (0)
- Add your own commands

  - Add a new file with the command as name and the extension .ts
  - Basic command structure:

  ```ts
  import { Message } from "discord.js";

  exports.run = (msg: Message, args: string[]) => {
    /* here goes your code */
  };
  ```

##### Tickets system (reaction and command)

##### Reaction roles

##### Leveling

## Installation

- Clone this repository<br>
  `$ git clone https://github.com/afriguez/shuxbot.git`

- Change directory<br>
  `$ cd shuxbot/`

- Install dependencies<br>
  `$ npm install`

- Environment<br>
  Shuxbot uses 3 main .env variables

  ```
  TOKEN=YOUR_BOT_TOKEN
  GUILD=THE_GUILD_ID
  DB_URL=https://YOUR_FIREBASE_DATABASE.firebaseio.com
  ```

  Then you'll need the service account provided by Firebase<br>
  `$ cp path/to/your/yourServiceAccount.json shuxbot/serviceAccount.json`

Once installed use `$ npm run build` to transpile and `$ npm start` to run the bot

## LICENSE

This repository is under the [MIT license](https://choosealicense.com/licenses/mit/). **Read it [here](https://github.com/afriguez/shuxbot/blob/main/LICENSE.md)**
