import { Message } from "discord.js";

// Source imports
import {
  channelType,
  getChannel,
  getopts,
  getValue,
  privilegeLevel,
} from "../../util/utils";

exports.run = (msg: Message, args: string[]) => {
  let options = getopts(args, { r: "--role", c: "--channel" });

  let role = getValue(options, "role");
  let channel = getValue(options, "channel");

  let sendRole = role && role != "false";
  let sendChannel = channel && channel != "false";

  let message = "",
    value,
    ch;

  if (!sendRole && !sendChannel) {
    sendRole = true;
    sendChannel = true;
  }

  if (sendRole) {
    message += "Tipos de roles\n";

    for (let v in privilegeLevel) {
      value = Number(v);
      if (isNaN(value)) break;
      message += `${value} : ${privilegeLevel[value]}\n`;
    }
  }

  if (sendChannel) {
    message += "\nTipos de canales: Tipos en uso = ✅ | Tipos no usados = ❌\n";

    for (let v in channelType) {
      value = Number(v);
      if (isNaN(value)) break;
      else ch = getChannel(undefined, value);
      message += `${value} : ${channelType[value]} - ${ch ? "✅" : "❌"}\n`;
    }
  }
  msg.channel.send(message);
};
