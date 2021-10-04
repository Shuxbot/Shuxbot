import { Message, MessageEmbed } from "discord.js";

// Source imports
import { colors } from "../../config/config";
import { ShuxUser } from "../../classes/ShuxUser";
import { getLevelByPoints } from "../../util/utils";

exports.run = async (msg: Message) => {
  let member = msg.mentions.members!.first() || msg.member;

  let sUser = new ShuxUser(member!.user);
  let uData = await sUser.get();

  let invEmbed = new MessageEmbed()
    .setTitle(`Inventario de colores ${member!.user.username}`)
    .setColor("RANDOM")
    .setTimestamp();

  let count = 0;

  for (let color in colors) {
    if (colors[color].level <= Math.floor(getLevelByPoints(uData.points))) {
      count++;
      invEmbed.addField(colors[color].name, `<@&${color}>`, true);
    }
  }

  if (count == 0) return msg.reply("Oops! no tiene colores!");
  msg.channel.send({ embeds: [invEmbed] });
};
