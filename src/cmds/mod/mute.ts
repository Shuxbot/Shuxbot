import { Message } from "discord.js";

// Source imports
import { cmdsHelp } from "../../util/cmdsHelp";
import { ShuxUser } from "../../classes/ShuxUser";

let help = cmdsHelp.mute;

exports.run = (msg: Message) => {
  let member = msg.mentions.members!.first();
  let channel = msg.mentions.channels.first();

  if (!member) return msg.reply("Debes mencionar al usuario\n" + help.usage);
  if (!channel) return msg.reply("Debes mencionar el canal\n" + help.usage);

  new ShuxUser(member.user).lockCh(channel.id).then(() => {
    msg.channel.send(
      `${member!.user} - ${
        member!.user.username
      } ha sido **MUTEADO** del canal ${channel}`
    );
  });
};
