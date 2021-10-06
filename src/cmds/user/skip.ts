import { Message } from "discord.js";

// Source imports
import { shuxPlayer } from "../../";
import { shuxSvId } from "../../config/config";

exports.run = async (msg: Message) => {
  let q = shuxPlayer.getQueue(shuxSvId);
  if (!q || !q.playing) return msg.reply("No hay nada reproduciendose.");

  let hasBeenSkipped = q.skip();
  let message = hasBeenSkipped
    ? `Cancion **${q.current.title}** ha sido saltada`
    : "Oops! ha ocurrido un error!";

  msg.channel.send(message);
};
