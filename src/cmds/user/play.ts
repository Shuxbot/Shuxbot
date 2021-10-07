import { QueryType } from "discord-player";
import { Message } from "discord.js";

// Source imports
import { shuxPlayer } from "../..";
import { shuxSvId } from "../../config/config";
import { getGuild } from "../../util/utils";

exports.run = async (msg: Message, args: string[]) => {
  if (!args[0]) return msg.reply("debes indicar una cancion!");

  let res = await shuxPlayer.search(args.join(" "), {
    requestedBy: msg.member!,
    searchEngine: QueryType.AUTO,
  });

  if (!res || !res.tracks.length) return msg.reply("No se encontraron resultados");

  let q = shuxPlayer.createQueue(getGuild(shuxSvId)!, {
    metadata: msg.channel,
  });

  try {
    if (q.connection) q.connect(msg.member!.voice.channel!);
  } catch {
    shuxPlayer.deleteQueue(shuxSvId);
    return msg.channel.send("No puedo entrar al canal de voz");
  }

  msg.channel.send(
    `Cargando la ${res.playlist ? "lista de reproduccion" : "cancion..."}`
  );

  res.playlist ? q.addTracks(res.tracks) : q.addTrack(res.tracks[0]);

  if (!q.playing) q.play();
};
