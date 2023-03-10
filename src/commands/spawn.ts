import {
  SlashCommandBuilder,
  CommandInteraction,
  ButtonStyle,
  PermissionsBitField,
} from "discord.js";
import { ActionRowBuilder, ButtonBuilder } from "@discordjs/builders";
import * as embeds from "../util/embeds";

export default {
  name: "spawn",
  data: new SlashCommandBuilder()
    .setName("spawn")
    .setDescription("Spawn the verify message!"),
  async callback(interaction: CommandInteraction) {
    if (
      !(interaction.member?.permissions as Readonly<PermissionsBitField>).has(
        PermissionsBitField.Flags.ManageGuild
      )
    ) {
      return interaction.reply({
        ephemeral: true,
        embeds: [await embeds.lackPermissionsEmebd()],
      });
    }
    const actionRow = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setLabel("Verify Here")
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
