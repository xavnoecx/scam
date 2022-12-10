import { ButtonInteraction } from "discord.js";

export default {
  id: "help",
  callback: (interation: ButtonInteraction) => {
    interation.reply({
      ephemeral: true,
      content: "https://wickbot.com/support",
    });
  },
};
