import { BotClient } from "./structs/BotClient";
import { Client, GatewayIntentBits } from "discord.js";

export const sharedClient = new BotClient(
  new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildMembers,
    ],
  })
);
