import { Message, MessageEmbed } from "discord.js";

// Source imports
import { cmdsHelp } from "../../util/cmdsHelp";

export let help = cmdsHelp.pfp;

exports.run = async (msg: Message) => {
  let member = msg.mentions.members!.first() || msg.member;

  let embed = new MessageEmbed()
    .setImage(member!.user.displayAvatarURL())
    .setColor("RANDOM");

  msg.channel.send(embed);
};
