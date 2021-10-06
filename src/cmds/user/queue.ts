import { Message, MessageEmbed } from "discord.js";

// Source imports
import { shuxPlayer } from "../..";
import { shuxSvId } from "../../config/config";

exports.run = (msg: Message) => {
  let q = shuxPlayer.getQueue(shuxSvId);
  if (!q) return msg.reply("No hay canciones reproduciendose");

  if (!q.tracks[0])
    return msg.reply("No hay mas canciones en la lista de reproduccion");

  const musicEmbed = new MessageEmbed()
    .setTitle("Lista de canciones")
    .setColor("RANDOM")
    .setDescription(
      q.tracks
        .map(
          (t, i) =>
            `**${i + 1}**: ${t.title} | Pedido por: ${t.requestedBy.username}`
        )
        .join("\n")
    )
    .setFooter(msg.author.username, msg.author.displayAvatarURL())
    .setTimestamp();

  msg.channel.send({ embeds: [musicEmbed] });
};
