import { Message } from "discord.js";

// Source imports
import { SuggestionManager } from "../../classes/SuggestionManager";
import { prefixReg } from "../../handlers/messageHandler";

exports.run = (msg: Message, args: string[]) => {
  if (!args[0]) return msg.reply("debes especificar tu sugerencia!");

  let prefix = msg.content.toLocaleLowerCase().match(prefixReg);
  let cmdLength = prefix![0].length + 3;

  msg.content = msg.content.substr(cmdLength);
  new SuggestionManager(msg);
};
