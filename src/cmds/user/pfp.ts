import { Message, MessageEmbed } from "discord.js";

// Source imports
import { cmdsHelp } from "../../util/cmdsHelp";

export let help = cmdsHelp.pfp;

exports.run = async (msg: Message) => {
  let member = msg.mentions.members!.first() || msg.member;
  let embed = new MessageEmbed()
    .setImage(
      member!.user.displayAvatarURL({
        format: "png",
        dynamic: true,
        size: 1024,
      })!
    )
    .setColor("RANDOM")
    .setFooter(msg.author.username, msg.author.displayAvatarURL())
    .setTimestamp();

  msg.channel.send(embed);
};
