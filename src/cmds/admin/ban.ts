import { Message } from "discord.js";

// Source imports
import { log } from "../../config/config";
import { cmdsHelp } from "../../util/cmdsHelp";

export let help = cmdsHelp.ban;

exports.run = async (msg: Message, args: string[]) => {
  let member = msg.mentions.members!.first();

  if (!member) return msg.reply("Debes mencionar a quien banear!");

  args.shift();
  let reason = args.join(" ");

  if (member.id == msg.author.id)
    return msg.reply("NO puedes banearte a ti mismo!");

  if (!reason) return msg.channel.send("Debes especificar una razon!");
  if (!member.bannable) return msg.reply("El usuario no puede ser baneado.");

  member
    .ban({ reason: reason })
    .then((m) => {
      log.warn(
        `Usuario **${m.user.username}** - ${m} ha sido **BANEADO**

	- Razon: ${reason}
	- Autor: ${msg.author} - ${msg.author.id}`
      );

      msg.channel.send(`${m} - ${m.user.username} ha sido **BANEADO**`);
    })
    .catch((error) => {
      log.error(error.message);
      msg.reply("Oops! ha ocurrido un error!");
    });
};
