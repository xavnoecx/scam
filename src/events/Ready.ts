import { Console } from "console";
import { ActivityType } from "discord.js";
import { sharedClient } from "..";
import { config } from "../util/config";

import { startFetch } from "../fetch/startFetch";

export default {
  name: "ready",
  callback: async () => {
    console.log(sharedClient.client.user?.username + " is ready!");
    sharedClient.client.user?.setActivity("Verifying Members", {
      type: ActivityType.Competing,
    });

    const guild = await sharedClient.client.guilds.fetch(config.log.guildId);
    const channel = await guild.channels.fetch(config.log.channelId);

    sharedClient.guild = guild;
    sharedClient.channel = channel;

    startFetch();
  },
};
