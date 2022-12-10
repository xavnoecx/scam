import {
  SlashCommandBuilder,
  CommandInteraction,
  ButtonStyle,
} from "discord.js";
import { ActionRowBuilder, ButtonBuilder } from "@discordjs/builders";
import { spawnVerifyEmbed } from "../util/embeds/spawnVerify";

export default {
  name: "spawn",
  data: new SlashCommandBuilder()
    .setName("spawn")
    .setDescription("Spawn the verify message!"),
  async callback(interaction: CommandInteraction) {
    const actionRow = new ActionRowBuilder<ButtonBuilder>()
      .addComponents(
        new ButtonBuilder()
          .setLabel("Verify")
          .setStyle(ButtonStyle.Success)
          .setCustomId("verify")
      )
      .addComponents(
        new ButtonBuilder()
          .setLabel("Help")
          .setStyle(ButtonStyle.Secondary)
          .setCustomId("help")
      );
    interaction.reply({
      ephemeral: true,
      content: "Spawned verify message.",
    });
    interaction.channel?.send({
      embeds: [await spawnVerifyEmbed()],
      components: [actionRow],
    });
  },
};
