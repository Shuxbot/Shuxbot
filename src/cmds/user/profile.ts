import { Message, MessageEmbed } from "discord.js";

// Source imports
import { ShuxUser } from "../../classes/ShuxUser";
import { getActualPoints, getLevelByPoints } from "../../util/utils";

exports.run = async (msg: Message) => {
  let member = msg.mentions.members!.first() || msg.member;

  if (!member) return;

  let uData = await new ShuxUser(member.user).get();

  let nick = member.nickname ? member.nickname : member.user.username;

  let points = Math.floor(getActualPoints(uData.points));
  let level = Math.floor(getLevelByPoints(uData.points));
  let warns = uData.warns;
  let desc = uData.desc || "Oops! no hay descripcion!";

  let roles = member.roles.cache.map((r) => r).join(" | ");

  let profileEmbed = new MessageEmbed()
    .setTitle(member.user.username)
    .setDescription(
      `**Nick:** ${nick}

	  **Nivel:** ${level} | **Puntos**: ${points} | **Warns**: ${warns}

	  **Roles:** ${roles}
	  **Descripcion:**
	  ${desc}`
    )
    .setColor("RANDOM")
    .setThumbnail(member.user.displayAvatarURL())
    .setTimestamp();

  msg.channel.send({ embeds: [profileEmbed] });
};
