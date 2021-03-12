import { Message } from "discord.js";

// Source imports
import { cmdsHelp } from "../../util/cmdsHelp";
import { ShuxUser } from "../../classes/ShuxUser";

let help = cmdsHelp.rmwarn;

exports.run = (msg: Message, args: string[]) => {
  let member = msg.mentions.members!.first();

  if (!member) {
    return msg.reply(`Se debe mencionar al usuario
      ${help.usage}`);
  }
  args.shift();

  let amount = Number(args[0]);
  if (isNaN(amount)) return msg.reply("Se debe especificar una cantidad");

  let user = member.user;
  new ShuxUser(user).rmWarn(amount).then(() => {
    msg.channel.send(`
      Usuario ${user} ha sido deswarneado
      - Autor: ${msg.author}`);
  });
};
