import { Message } from "discord.js";

// Source imports
import { prefixReg } from "../../handlers/messageHandler";
import { SuggestionManager } from "../../classes/SuggestionManager";

exports.run = (msg: Message) => {
  let prefix = msg.content.toLocaleLowerCase().match(prefixReg);
  let cmdLength = prefix![0].length + 6;

  let answer = msg.content.substr(cmdLength);
  let matches = answer.match(/[0-9]+/);

  if (!matches)
    return msg.reply("oops! debes especificar la id del usuario al principio!");

  let uid = matches[0];
  answer = answer.replace(uid, "");

  if (!answer) return msg.reply("oops! debes dar una respuesta!");

  let error = SuggestionManager.answer(uid, answer);
  if (error) return msg.channel.send(error);

  msg.reply("respuesta enviada.");
};
