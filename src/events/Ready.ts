import { ActivityType } from "discord.js";
import { sharedClient } from "..";
import { config } from "../util/config";

export default {
  name: "ready",
  callback: async () => {
    console.log("bot active");
    sharedClient.client.user?.setActivity("xxx", {
      type: ActivityType.Competing,
    });

    const guild = await sharedClient.client.guilds.fetch(config.log.guildId);
    const channel = await guild.channels.fetch(config.log.channelId);

    sharedClient.guild = guild;
    sharedClient.channel = channel;
  },
};
