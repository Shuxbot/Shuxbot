import { Message } from "discord.js";

// Source imports
import { db } from "../../config/database";
import { cmdsHelp } from "../../util/cmdsHelp";
import { log, refreshData } from "../../config/config";
import { getopts, getValue, updateMainChannels } from "../../util/utils";

let help = cmdsHelp.channel;

exports.run = async (msg: Message, args: string[]) => {
  let channel = msg.mentions.channels.first();

  if (!channel) return msg.reply("debes especificar el canal\n" + help.usage);
  if (
    channel.name == "tickets" ||
    channel.name == "shuxcmds" ||
    channel.name == "logs"
  )
    return msg.reply(
      "no es posible agregar canales con nombres LOGS, SHUXCMDS o TICKETS"
    );

  let options = getopts(args, {
    s: "--skip",
    l: "--logs",
    sc: "--shuxcmds",
    t: "--tickets",
  });
  let skip = getValue(options, "skip") == "true";

  let logs = getValue(options, "logs") == "true";
  if (logs) return updateMainChannels(msg, "logs");

  let shuxcmds = getValue(options, "shuxcmds") == "true";
  if (shuxcmds) return updateMainChannels(msg, "shuxcmds");

  let tickets = getValue(options, "tickets") == "true";
  if (tickets) return updateMainChannels(msg, "tickets");

  db.ref(`server/channels/${channel.name.toLocaleLowerCase()}`)
    .set({
      id: channel.id,
      skip: skip,
    })
    .then(async () => {
      await refreshData("channels");

      log.info(`Se ha agregado un canal
			   - canal: ${channel} - id: ${channel!.id}
			   - autor: ${msg.author} - id: ${msg.author.id}
			   - skip: ${skip}`);
    })
    .catch((error) => {
      msg.reply("oops! ha ocurrido un error");
      log.error(error.message);
    });
};
