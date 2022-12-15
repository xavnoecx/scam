import { EmbedBuilder } from "@discordjs/builders";
import { EmbedColours } from ".";

export const failedToMessageEmbed = async (): Promise<EmbedBuilder> => {
  const emojis = (await import("../..")).sharedClient.emojis;

  const embed = new EmbedBuilder()
    .setColor(EmbedColours.colours.fail)
    .setDescription(
      `${emojis.get(
        "cancel"
      )} **I wasn't able to DM you.. Open your DMs and try to reverify.**`
    );

  return embed;
};
