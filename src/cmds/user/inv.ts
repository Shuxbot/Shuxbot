import { Message, MessageEmbed } from "discord.js";

// Source imports
import { colors } from "../../config/config";
import { ShuxUser } from "../../classes/ShuxUser";
import { getLevelByPoints } from "../../util/utils";

exports.run = async (msg: Message) => {
  let sUser = new ShuxUser(msg.author);
  let uData = await sUser.get();

  let invEmbed = new MessageEmbed()
    .setTitle(`Inventario de colores ${msg.author.username}`)
    .setColor("RANDOM")
    .setTimestamp();

  let count = 0;

  for (let color in colors) {
    if (colors[color].level <= Math.floor(getLevelByPoints(uData.points))) {
      count++;
      invEmbed.addField(color, `<@&${colors[color].id}>`, true);
    }
  }

  if (count == 0) return msg.reply("Oops! no tienes colores!");
  msg.channel.send(invEmbed);
};
