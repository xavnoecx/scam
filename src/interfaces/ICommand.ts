import { SlashCommandBuilder, CommandInteraction } from "discord.js";

export interface ICommand {
  name: string;
  data: SlashCommandBuilder;
  callback: (interaction: CommandInteraction) => void;
}
