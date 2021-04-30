import { GuildChannel, Message } from "discord.js";

// Source imports
import { db } from "../../config/database";
import { cmdsHelp } from "../../util/cmdsHelp";
import { log, refreshData } from "../../config/config";
import { getopts, getValue } from "../../util/utils";

let help = cmdsHelp.channel;

exports.run = async (msg: Message, args: string[]) => {
  let channel:
    | GuildChannel
    | string
    | undefined = msg.mentions.channels.first();
  let options = getopts(args, {
    s: "--skip",
    c: "--channel",
    t: "--type",
  });
  if (!channel) channel = getValue(options, "channel");
  else channel = channel.id;

  let type = Number(getValue(options, "type"));
  let skip = getValue(options, "skip") == "true";

  if (!channel)
    return msg.reply(
      "debes especificar la ID o taguear al canal!\n" + help.usage
    );
  if (isNaN(type))
    return msg.reply("oops! el tipo debe ser numerico!!!\n" + help.usage);

  db.ref(`server/channels/${channel}`)
    .set({
      type: type,
      skip: skip,
    })
    .then(async () => {
      await refreshData("channels");

      log.info(`Se ha agregado un canal
			   - canal: <#${channel}> - id: ${channel}
			   - autor: ${msg.author} - id: ${msg.author.id}
			   - skip: ${skip}
			   - type: ${type}`);
    })
    .catch((error) => {
      msg.reply("oops! ha ocurrido un error");
      log.error(error.message);
    });
};
