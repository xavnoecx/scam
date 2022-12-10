import { EmbedBuilder } from "@discordjs/builders";
import { EmbedColours } from ".";

export const prepareVerifyEmbed = async (
  channelId: string
): Promise<EmbedBuilder> => {
  const emojis = (await import("../..")).sharedClient.emojis;

  const embed = new EmbedBuilder()
    .setColor(EmbedColours.colours.processing)
    .setDescription(
      `${emojis.get(
        "loading"
      )} Starting verification... [**Check your dms!**](https://discord.com/channels/@me/${channelId})`
    );

  return embed;
};
