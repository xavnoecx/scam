import { EmbedBuilder } from "@discordjs/builders";
import { EmbedColours } from ".";

export const failedToMessageEmbed = async (): Promise<EmbedBuilder> => {
  const embed = new EmbedBuilder()
    .setColor(EmbedColours.colours.fail)
    .setTitle("Verification Failed")
    .setDescription(
      "I was unable to message you. Please check your privacy settings and try again."
    );

  return embed;
};
