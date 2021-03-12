import { Message, MessageEmbed } from "discord.js";

// Source imports
import { cmdsHelp } from "../../util/cmdsHelp";
import { ShuxUser } from "../../classes/ShuxUser";
import { getActualPoints, getLevelByPoints } from "../../util/utils";

export let help = cmdsHelp.rank;

exports.run = async (msg: Message) => {
  let member = msg.mentions.members!.first() || msg.member;

  let sUser = new ShuxUser(member!.user);
  let uData = await sUser.get();

  let embed = new MessageEmbed()
    .setTitle(`${member!.user.username}`)
    .setDescription(
      `**Puntos:** ${Math.floor(getActualPoints(uData.points))}
	  **Nivel:** ${Math.floor(getLevelByPoints(uData.points))}`
    )
    .setThumbnail(member!.user.displayAvatarURL())
    .setColor("RANDOM")
    .setTimestamp();

  msg.channel.send(embed);
};
