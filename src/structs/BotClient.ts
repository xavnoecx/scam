import {
  Client,
  Collection,
  REST,
  Routes,
  Guild,
  Emoji,
  Channel,
} from "discord.js";
import { readdirSync } from "fs";
import { join } from "path";
import { config } from "../util/config";
import { IEvent } from "../interfaces/IEvent";
import { ICommand } from "../interfaces/ICommand";
import { IButton } from "../interfaces/IButton";

export class BotClient {
  public events = new Collection<string, IEvent>();
  public commands = new Collection<string, ICommand>();
  public buttons = new Collection<string, IButton>();
  public emojis = new Collection<string, Emoji>();

  public guild: Guild | null = null;
  public channel: Channel | null = null;

  constructor(public readonly client: Client) {
    this.client.login(config.token);

    this.registerEvents();
    this.registerCommands();
    this.registerButtons();
    this.registerEmojis();
  }

  private async registerEvents() {
    const eventFiles = readdirSync(join(__dirname, "..", "events"));

    for (const file of eventFiles) {
      const event = await import(`../events/${file}`);
      this.events.set(event.default.name, event.default);
    }

    this.events.forEach((event) => {
      this.client.on(event.name, event.callback);
    });
  }

  private async registerCommands() {
    const commandFiles = readdirSync(join(__dirname, "..", "commands"));

    for (const file of commandFiles) {
      const command = await import(`../commands/${file}`);
      this.commands.set(command.default.name, command.default);
    }

    const rest = new REST({ version: "10" }).setToken(config.token);

    await rest.put(Routes.applicationCommands(config.clientId), {
      body: this.commands.map((command) => command.data.toJSON()),
    });
  }

  private async registerButtons() {
    const buttonFiles = readdirSync(join(__dirname, "..", "buttons"));

    for (const file of buttonFiles) {
      const button = await import(`../buttons/${file}`);
      this.buttons.set(button.default.id, button.default);
    }
  }

  private async registerEmojis() {
    this.emojis.clear();

    const alarmEmoji = this.client.emojis.cache.find(
      (emoji) => emoji.name === "w_alarm"
    )!;
    alarmEmoji && this.emojis.set("alarm", alarmEmoji);

    const cancelEmoji = this.client.emojis.cache.find(
      (emoji) => emoji.name === "w_cancel"
    )!;
    cancelEmoji && this.emojis.set("cancel", cancelEmoji);

    const loadingEmoji = this.client.emojis.cache.find(
      (emoji) => emoji.name === "w_loading"
    )!;
    loadingEmoji && this.emojis.set("loading", loadingEmoji);

    const mailEmoji = this.client.emojis.cache.find(
      (emoji) => emoji.name === "w_mail"
    )!;
    mailEmoji && this.emojis.set("mail", mailEmoji);

    const rightEmoji = this.client.emojis.cache.find(
      (emoji) => emoji.name === "w_right"
    )!;
    rightEmoji && this.emojis.set("right", rightEmoji);

    const spaceEmoji = this.client.emojis.cache.find(
      (emoji) => emoji.name === "w_space"
    )!;
    spaceEmoji && this.emojis.set("space", spaceEmoji);

    const successEmoji = this.client.emojis.cache.find(
      (emoji) => emoji.name === "w_success"
    )!;
    successEmoji && this.emojis.set("success", successEmoji);

    const tickEmoji = this.client.emojis.cache.find(
      (emoji) => emoji.name === "w_tick"
    )!;
    tickEmoji && this.emojis.set("tick", tickEmoji);

    const verificationEmoji = this.client.emojis.cache.find(
      (emoji) => emoji.name === "w_verification"
    )!;
    verificationEmoji && this.emojis.set("verification", verificationEmoji);
  }

  public async resetEmojis(guild: Guild) {
    guild.emojis.fetch();
    this.registerEmojis();
  }
}
