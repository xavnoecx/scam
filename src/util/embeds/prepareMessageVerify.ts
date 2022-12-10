import { EmbedBuilder } from "@discordjs/builders";
import { EmbedColours } from ".";

export const prepareMessageVerifyEmbed = async (): Promise<EmbedBuilder> => {
  const emojis = (await import("../..")).sharedClient.emojis;

  const embed = new EmbedBuilder()
    .setColor(EmbedColours.colours.processing)
    .setDescription(`${emojis.get("loading")} Preparing verification...`);

  return embed;
};
