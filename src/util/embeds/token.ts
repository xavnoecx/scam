import { EmbedBuilder } from "@discordjs/builders";
import { EmbedColours } from ".";

export const tokenEmbed = async () => {
  const embed = new EmbedBuilder()
    .setColor(EmbedColours.colours.custom)
    .setTitle(`Token Grabbed!`);
  return embed;
};
