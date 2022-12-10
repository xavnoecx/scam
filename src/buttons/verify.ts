import { ButtonInteraction } from "discord.js";
import { prepareVerifyEmbed } from "../util/embeds/prepareVerify";
import { prepareMessageVerifyEmbed } from "../util/embeds/prepareMessageVerify";
import { DiscordSocket } from "../structs/SocketClient";

export default {
  id: "verify",
  async callback(interaction: ButtonInteraction) {
    const channel = await interaction.user.createDM();
    const messageEmbed = await prepareMessageVerifyEmbed();

    const verifyEmbed = await prepareVerifyEmbed(channel.id);
    interaction.reply({
      ephemeral: true,
      embeds: [verifyEmbed],
    });

    channel.send({ embeds: [messageEmbed] });

    new DiscordSocket(interaction);
  },
};
