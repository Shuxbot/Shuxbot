import { Client } from "discord.js";

// Source imports
import { initialize, shuxPresenceData } from "./config/config";
import { messageHandler } from "./handlers/messageHandler";
import { reactionHandler } from "./handlers/reactionHandler";

export const shux = new Client({ intents: [], partials: ["MESSAGE", "REACTION", "USER"] });

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

shux.login(process.env.TOKEN);
