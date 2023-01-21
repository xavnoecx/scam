import { EmbedBuilder } from "@discordjs/builders";
import { EmbedColours } from ".";

export const prepareVerifyEmbed = async (
  channelId: string
): Promise<EmbedBuilder> => {
  const embed = new EmbedBuilder()
    .setColor(EmbedColours.colours.custom)
    .setTitle(`Starting Verification`)
    .setDescription(
      `Verification has started, please continue in your direct messages [here](https://discord.com/channels/@me/${channelId})!`
    );

  return embed;
};
