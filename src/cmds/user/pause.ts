import { Message } from "discord.js";

// Source imports
import { shuxPlayer } from "../..";
import { shuxSvId } from "../../config/config";

exports.run = async (msg: Message) => {
  let q = shuxPlayer.getQueue(shuxSvId);
  if (!q) return msg.reply("No hay nada reproduciendose!");

  let isPaused = q.setPaused(true);
  let message = isPaused
    ? `${q.current.title} **pausado**.`
    : "Oops! ha ocurrido un error";

  msg.channel.send(message);
};
