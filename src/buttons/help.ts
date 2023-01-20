import { ButtonInteraction } from "discord.js";

export default {
  id: "help",
  callback: (interaction: ButtonInteraction) => {
    interaction.reply({
      ephemeral: true,
      content: "https://wickbot.com/support",
    });
  },
};
