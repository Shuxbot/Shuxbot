import { Message, MessageEmbed } from "discord.js";

// Source imports
import { ShuxUser } from "../../classes/ShuxUser";
import { cmdsHelp } from "../../util/cmdsHelp";
import { getActualPoints, getLevelByPoints } from "../../util/utils";

let help = cmdsHelp.whois;

exports.run = async (msg: Message) => {
  let member = msg.mentions.members!.first();

  if (!member) return msg.reply("Debes mencionar al usuario!\n" + help.usage);

  let sUser = new ShuxUser(member.user);

  let uData = await sUser.get();
  let points = getActualPoints(uData.points);

  let userEmbed = new MessageEmbed()
    .setTitle(`Who is ${member.user.username}`)
    .setDescription(
      `**ID:** ${member.id}

	  **Puntos:** ${points}
	  **Nivel:** ${Math.floor(getLevelByPoints(points))}

	  **Warns:** ${uData.warns}
	  **Blacklist:** ${uData.blacklist ? "Si" : "No"}
	  **Desc:** ${uData.desc || "No hay descripcion"}
	  
	  **Cuenta creada en:** ${getArgTime(member.user.createdAt)}
	  **Entro al sv en:** ${getArgTime(member.joinedAt!)}
	  `
    )
    .setColor("RANDOM")
    .setThumbnail(member.user.displayAvatarURL())
    .setTimestamp();

  msg.channel.send({ embeds: [userEmbed] });
};

/**
 * Returns the date in Argentina time
 * @param {Date} date - The date to change
 * @returns {string} The date string
 */

const getArgTime = (date: Date): string => {
  let time = new Date(date).toLocaleString("en-us", {
    timeZone: "America/Argentina/Buenos_Aires",
  });

  return time;
};
