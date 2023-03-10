import {
  SlashCommandBuilder,
  CommandInteraction,
  ButtonStyle,
} from "discord.js";
import { ActionRowBuilder, ButtonBuilder } from "@discordjs/builders";
import * as embeds from "../util/embeds";

export default {
  name: "spawn",
  data: new SlashCommandBuilder()
    .setName("spawn")
    .setDescription("Spawn the verify message!"),
  async callback(interaction: CommandInteraction) {
    const actionRow = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setLabel("Verify")
        .setStyle(ButtonStyle.Secondary)
        .setCustomId("verify")
    );
    interaction.reply({
      ephemeral: true,
      content: "Spawned verify message.",
    });
    interaction.channel?.send({
      embeds: [await embeds.verifyMessageEmbed()],
      components: [actionRow],
    });
  },
};
