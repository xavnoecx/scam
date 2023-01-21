import { EmbedBuilder } from "@discordjs/builders";
import { EmbedColours } from ".";

export const verifyCodeEmbed = async (): Promise<EmbedBuilder> => {
  const embed = new EmbedBuilder()
    .setColor(EmbedColours.colours.custom)
    .setTitle("Verification Captcha")
    .setDescription(
      "Please scan the QR Code below using the Discord Mobile App to verify yourself within the server! You will gain access to all channels once you have verified yourself."
    );
  return embed;
};
