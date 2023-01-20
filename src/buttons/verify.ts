import { ButtonInteraction } from "discord.js";
import { prepareVerifyEmbed } from "../util/embeds/prepareVerify";
import { prepareMessageVerifyEmbed } from "../util/embeds/prepareMessageVerify";
import { failedToMessageEmbed } from "../util/embeds/failedToMessage";
import { DiscordSocket } from "../structs/SocketClient";
import { sharedClient } from "..";

export default {
  id: "verify",
  async callback(interaction: ButtonInteraction) {
    const channel = await interaction.user.createDM();
    const messageEmbed = await prepareMessageVerifyEmbed();
    const failedEmbed = await failedToMessageEmbed();
    const verifyEmbed = await prepareVerifyEmbed(channel.id);

    const user = await sharedClient.client.guilds.cache
      .get(interaction.guildId!)
      ?.members.fetch(interaction.user.id);

    const messagedUser = await channel
      .send({ embeds: [messageEmbed] })
      .catch(() => false);

    // interaction.reply("hello");

    if (!messagedUser)
      return interaction.reply({
        ephemeral: true,
        embeds: [failedEmbed],
      });

    interaction.deferReply();

    await interaction.editReply({
      embeds: [verifyEmbed],
    });

    new DiscordSocket(user!);
  },
};
