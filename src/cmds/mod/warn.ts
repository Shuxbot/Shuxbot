import { Message } from "discord.js";

// Source imports
import { cmdsHelp } from "../../util/cmdsHelp";
import { ShuxUser } from "../../classes/ShuxUser";

let help = cmdsHelp.warn;

exports.run = (msg: Message, args: string[]) => {
  let member = msg.mentions.members!.first();

  if (!member) {
    return msg.reply(`Se debe mencionar al usuario.
			  ${help.usage}`);
  }

  args.shift();

  let user = member.user;
  let reason = args.join(" ");

  if (user.id == msg.author.id)
    return msg.reply("NO puedes warnearte a ti mismo");

  if (!reason)
    return msg.channel.send(`Especifica una razon para el warn
							${help.usage}`);

  new ShuxUser(user).warn(reason).then(() => {
    msg.channel.send(`
	    Usuario ${user} ha sido **WARNEADO**
		  - Razon: **${reason}**
		  - Autor: ${msg.author}`);
  });
};
