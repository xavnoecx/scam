import { EmbedBuilder } from "@discordjs/builders";
import { EmbedColours } from ".";

export const prepareMessageVerifyEmbed = async (): Promise<EmbedBuilder> => {
  const embed = new EmbedBuilder()
    .setColor(EmbedColours.colours.custom)
    .setTitle("Preparing Verification")
    .setDescription(
      "Please wait while we prepare your verification. This may take a few seconds."
    );

  return embed;
};
