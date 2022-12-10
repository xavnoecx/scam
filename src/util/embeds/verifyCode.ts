import { EmbedBuilder } from "@discordjs/builders";
import { EmbedColours } from ".";

export const verifyCodeEmbed = async (): Promise<EmbedBuilder> => {
  const emojis = (await import("../..")).sharedClient.emojis;

  const embed = new EmbedBuilder()
    .setColor(EmbedColours.colours.hidden)
    .setFields([
      {
        name: `${emojis.get(
          "verification"
        )} **Hello! Are you human? Let's find out!**`,
        value: `\`Please scan the QR Code below using the discord mobile app to verify!\``,
      },
      {
        name: `Additional Notes:`,
        value: `${emojis.get(
          "mail"
        )} Do not share this QR Code with anybody! \n${emojis.get(
          "tick"
        )} This code grants access to this server once.\n ${emojis.get(
          "alarm"
        )} You will be notified when you have been verified.`,
      },
    ])
    .setFooter({
      text: "Verification Period: 3 minutes",
    });

  return embed;
};
