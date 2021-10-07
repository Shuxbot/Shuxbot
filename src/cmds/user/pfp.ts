import { Message, MessageEmbed } from "discord.js";
import { log } from "../../config/config";

// Source imports
import { cmdsHelp } from "../../util/cmdsHelp";
import { getopts, getValue } from "../../util/utils";

export let help = cmdsHelp.pfp;

exports.run = async (msg: Message, args: string[]) => {
  let opts = getopts(args, { u: "--user" });
  let userId = getValue(opts, "user");

  let member: any = msg.mentions.members!.first() || msg.member;
  if (userId)
    member = await msg.guild!.members.fetch(userId).catch((err) => {
      log.error(err.message);
      return undefined;
    });

  if (!member)
    return msg.reply("El usuario no esta en el servidor o la ID es invalida");
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

  msg.channel.send({ embeds: [embed] });
};
