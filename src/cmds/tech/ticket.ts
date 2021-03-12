import { Message } from "discord.js";

// Source imports
import { cmdsHelp } from "../../util/cmdsHelp";
import { TicketManager } from "../../classes/TicketManager";

let help = cmdsHelp.ticket;

exports.run = async (msg: Message, _: string[], pLevel: number) => {
  // mods are not allowed to run this command
  if (pLevel == 2) return;

  let user = msg.mentions.users.first();
  if (!user)
    return msg.reply(`Debes mencionar al usuario!
					 uso: ${help.usage}`);

  new TicketManager(user);
};
