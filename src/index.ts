import { Client } from "discord.js";

// Source imports
import { initialize } from "./config/config";
import { messageHandler } from "./handlers/messageHandler";
import { reactionHandler } from "./handlers/reactionHandler";

export const shux = new Client({ partials: ["MESSAGE", "REACTION", "USER"] });

shux.on("ready", () => {
  console.log(`Ready as ${shux.user!.username}`);
  initialize();
});

shux.on("message", messageHandler);

shux.on("messageDelete", (msg) => messageHandler(msg, true));

shux.on("messageUpdate", (msg) => messageHandler(msg, false, true));

shux.on("messageReactionAdd", reactionHandler);

shux.login(process.env.TOKEN);
