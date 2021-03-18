import { Message } from "discord.js";

// Source imports
import { cmdsHelp } from "../../util/cmdsHelp";
import { ShuxUser } from "../../classes/ShuxUser";

let help = cmdsHelp.rmwarn;

exports.run = async (msg: Message, args: string[]) => {
  let member = msg.mentions.members!.first();

  if (!member) {
    return msg.reply(`Se debe mencionar al usuario
      ${help.usage}`);
  }
  args.shift();

  let amount = Number(args[0]);
  if (isNaN(amount)) return msg.reply("Se debe especificar una cantidad");

  let user = member.user;

  let sUser = new ShuxUser(user);
  let uData = await sUser.get();

  if (uData.warns - amount < 0 || amount <= 0)
    return msg.reply("La cantidad debe ser vaida!");

  sUser.rmWarn(amount).then(() => {
    msg.channel.send(`
      Usuario ${user} ha sido deswarneado
      - Autor: ${msg.author}`);
  });
};
