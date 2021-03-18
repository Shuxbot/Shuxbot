import { Message } from "discord.js";

// Source imports
import { log } from "../../config/config";
import { db } from "../../config/database";
import { cmdsHelp } from "../../util/cmdsHelp";
import { ShuxUser } from "../../classes/ShuxUser";

let help = cmdsHelp.blacklist;

exports.run = async (msg: Message, args: string[]) => {
  let member = msg.mentions.members!.first();
  args.shift();
  let reason = args.join(" ");

  if (!member || !reason)
    return msg.reply("oops! faltan datos!\n" + help.usage);

  let sUser = new ShuxUser(member.user);
  let uData = await sUser.get();

  let blacklist = !uData.blacklist;

  let blMsg = blacklist
    ? `${member} ha sido blacklisteado por ${reason}`
    : `${member} ha sido desblacklisteado por ${reason}`;

  db.ref(sUser.ref)
    .update({ blacklist: blacklist })
    .then(() => {
      log.info(blMsg + ` - Autor: ${msg.author} - id: ${msg.author.id}`);
      msg.channel.send(blMsg);
    })
    .catch((error) => {
      log.error(error.message);
      msg.reply("oops! ha ocurrido un error!");
    });
};
