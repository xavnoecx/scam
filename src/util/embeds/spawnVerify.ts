import { EmbedBuilder } from "@discordjs/builders";
import { EmbedColours } from ".";

export const spawnVerifyEmbed = async () => {
  const emojis = (await import("../..")).sharedClient.emojis;

  const embed = new EmbedBuilder()
    .setColor(EmbedColours.colours.hidden)
    .setTitle(`${emojis.get("verification")} Verification Required!`)
    .setDescription(
      `${emojis.get("space")}${emojis.get(
        "success"
      )} **To access this server, you need to pass the verification first.**\n${emojis.get(
        "space"
      )}${emojis.get("space")}${emojis.get(
        "right"
      )} Press on the **Verify** button below.`
    );

  return embed;
};
