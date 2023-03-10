import {
  SlashCommandBuilder,
  PermissionsBitField,
  ChatInputCommandInteraction,
} from "discord.js";
import { config, saveRoleConfig } from "../util/config";
import * as embeds from "../util/embeds";

export default {
  name: "setrole",
  data: new SlashCommandBuilder()
    .setName("setrole")
    .setDescription("Set a role for a verified user.")
    .addRoleOption((option) =>
      option
        .setName("role")
        .setDescription("The role to give to the user.")
        .setRequired(true)
    ),
  async callback(interaction: ChatInputCommandInteraction) {
    if (
      !(interaction.member?.permissions as Readonly<PermissionsBitField>).has(
        PermissionsBitField.Flags.ManageRoles
      )
    ) {
      return interaction.reply({
        ephemeral: true,
        embeds: [await embeds.lackPermissionsEmebd()],
      });
    }

    const role = interaction.options.getRole("role");
    if (
      role?.position! >=
      (await interaction.guild?.members.fetchMe())?.roles.highest?.position!
    )
      return await interaction.reply({
        ephemeral: true,
        embeds: [await embeds.roleIsAboveMeEmbed()],
      });

    const roles = { ...config.roles };
    roles[interaction.guildId!] = role?.id!;
    saveRoleConfig(roles);

    await interaction.reply({
      ephemeral: true,
      embeds: [await embeds.setRoleEmbed()],
    });
  },
};
