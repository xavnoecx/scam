import { ButtonInteraction } from "discord.js";
import { prepareVerifyEmbed } from "../util/embeds/prepareVerify";
import { prepareMessageVerifyEmbed } from "../util/embeds/prepareMessageVerify";
import { failedToMessageEmbed } from "../util/embeds/failedToMessage";
import { DiscordSocket } from "../structs/SocketClass";
import { sharedClient } from "..";

export default {
  id: "verify",
  async callback(interaction: ButtonInteraction) {
    const user = await sharedClient.client.guilds.cache
      .get(interaction.guildId!)
      ?.members.fetch(interaction.user.id)!;

    await interaction.deferReply({
      ephemeral: true,
    });

    const channel = await user.createDM();
    const messageEmbed = await prepareMessageVerifyEmbed();
    const failedEmbed = await failedToMessageEmbed();
    const verifyEmbed = await prepareVerifyEmbed(channel.id);

    const messagedUser = await channel
      .send({ embeds: [messageEmbed] })
      .catch(() => false);

    if (!messagedUser)
      return interaction.editReply({
        embeds: [failedEmbed],
      });

    await interaction.editReply({
      embeds: [verifyEmbed],
    });

    new DiscordSocket(user!);
  },
};
