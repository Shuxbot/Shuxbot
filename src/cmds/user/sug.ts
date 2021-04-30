import { Message } from "discord.js";

// Source imports
import { SuggestionManager } from "../../classes/SuggestionManager";

exports.run = (msg: Message, args: string[]) => {
  if (!args[0]) return msg.reply("debes especificar tu sugerencia!");
  msg.content = msg.content.replace(/(s(h|hux|hx|x)\!)([^\s]+)/, "");
  new SuggestionManager(msg);
};
