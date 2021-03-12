import { Message } from "discord.js";

// Source imports
import { cmdsHelp } from "../../util/cmdsHelp";
import { refreshData } from "../../config/config";
import { getopts, getValue } from "../../util/utils";

export let help = cmdsHelp.refresh;

exports.run = (msg: Message, args: string[]) => {
  let options = getopts(args, {
    r: "--roles",
    re: "--reactions",
    c: "--channels",
  });

  let roles = getValue(options, "roles");
  let reactions = getValue(options, "reactions");
  let channels = getValue(options, "channels");

  if (!roles && !reactions && !channels) return msg.reply(`Uso: ${help.usage}`);

  if (roles) {
    refreshData("roles");
  }
  if (reactions) {
    refreshData("reactions");
  }
  if (channels) {
    refreshData("channels");
  }

  msg.channel.send("Se han actualizado los datos.");
};
