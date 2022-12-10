import { Message } from "discord.js";

export default {
  name: "messageCreate",
  callback: async (message: Message) => {
    console.log(message.content);
  },
};
