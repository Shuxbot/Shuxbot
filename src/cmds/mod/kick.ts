import { Message } from "discord.js";

// Source imports
import { log } from "../../config/config";

exports.run = async (msg: Message, args: string[]) => {
  let member = msg.mentions.members!.first();

  if (!member) return msg.reply("Debes mencionar a quien kickear!");

  args.shift();
  let reason: string | undefined = args.join(" ");

  if (member.id == msg.author.id)
    return msg.reply("No puedes kickearte a ti mismo.");

  if (!member.kickable) return msg.reply("El usuario no puede ser kickeado.");

  member
    .kick(reason)
    .then((m) => {
      log.warn(
        `Usuario **${m.user.username}** - ${m} ha sido **BANEADO**
			- Razon: ${reason ? reason : "No se especifica."}
			- Autor: ${msg.author} - ${msg.author.id}`
      );

      msg.channel.send(`${m} - ${m.user.username} ha sido **kickeado**`);
    })
    .catch((error) => {
      log.error(error.message);
      msg.reply("Oops! ha ocurrido un error!");
    });
};
