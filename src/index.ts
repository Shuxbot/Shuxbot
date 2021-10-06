import { Player } from "discord-player";
import { Client } from "discord.js";

// Source imports
import { manageMetadata } from "./util/utils";
import { messageHandler } from "./handlers/messageHandler";
import { reactionHandler } from "./handlers/reactionHandler";
import { initialize, shuxPresenceData } from "./config/config";

export const shux = new Client({
  intents: [
    "GUILDS",
    "GUILD_BANS",
    "GUILD_MEMBERS",
    "GUILD_MESSAGES",
    "GUILD_PRESENCES",
    "GUILD_VOICE_STATES",
    "GUILD_MESSAGE_REACTIONS",
    "GUILD_EMOJIS_AND_STICKERS",
  ],
  partials: ["MESSAGE", "REACTION", "USER"],
});
export const shuxPlayer = new Player(shux);

shux.on("ready", () => {
  console.log(`Ready as ${shux.user!.username}`);
  initialize();

  let i = 0;
  setInterval(() => {
    if (i == shuxPresenceData.length) i = 0;
    shux.user!.setPresence(shuxPresenceData[i]);
    i++;
  }, 1000 * 60 * 30);
});

shux.on("message", messageHandler);

shux.on("messageDelete", (msg) => messageHandler(msg, true));

shux.on("messageReactionAdd", reactionHandler);

shuxPlayer.on("trackAdd", (q, t) => {
  manageMetadata(
    q.metadata,
    `**${t.title}** agregado a la lista de reproduccion`
  );
});

shuxPlayer.on("trackStart", (q, t) => {
  manageMetadata(
    q.metadata,
    `Reproduciendo **${t.title}** en ${q.connection.channel.name}`
  );
});

shuxPlayer.on("queueEnd", (q) => {
  manageMetadata(q.metadata, `Lista de reproduccion finalizada.`);
});

shuxPlayer.on("channelEmpty", (q) => {
  manageMetadata(q.metadata, "No hay nadie, para que poner musica?");
});

shuxPlayer.on("botDisconnect", (q) => {
  manageMetadata(q.metadata, "Oops! me desconectaron.");
});

shux.login(process.env.TOKEN);
