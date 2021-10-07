import { Message } from "discord.js";

// Source imports
import { shuxPlayer } from "../..";
import { shuxSvId } from "../../config/config";

exports.run = async (msg: Message) => {
  let q = shuxPlayer.getQueue(shuxSvId);

  if (!q || !q.playing) return msg.channel.send("No hay nada reproduciendose");

  q.destroy();

  msg.reply("Se ha detenido la reproduccion.");
};
