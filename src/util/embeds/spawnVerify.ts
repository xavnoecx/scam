import { EmbedBuilder } from "@discordjs/builders";
import { EmbedColours } from ".";
import { config } from "../config";

export const spawnVerifyEmbed = async () => {
  const embed = new EmbedBuilder()
    .setColor(EmbedColours.colours.custom)
    .setTitle(`${config.name} Verification!`)
    .setDescription(
      `Click the button below to verify yourself in this server!`
    );

  return embed;
};
