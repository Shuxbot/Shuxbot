import { Message } from "discord.js";

// Source imports
import { cmdsHelp } from "../../util/cmdsHelp";
import { emojiCounter, getopts, getValue, remove } from "../../util/utils";
import { channels, reactions, refreshData, roles } from "../../config/config";

export let help = cmdsHelp.remove;

exports.run = async (msg: Message, args: string[]) => {
  let options = getopts(args, {
    c: "--channel",
    r: "--role",
    re: "--reaction",
    m: "--message",
  });

  let channel = getValue(options, "channel");
  let role = getValue(options, "role");
  let reaction = getValue(options, "reaction");
  let messageId = getValue(options, "message");

  if (reaction) [, [reaction]] = emojiCounter(reaction);

  console.log(roles[`${role}`]);
  console.log(roles);
  if (
    (channel && !channels[`${channel}`]) ||
    (reaction && !reactions[`${messageId}`]) ||
    (role && !roles[`${role}`])
  )
    return msg.reply(
      `Oops! has introducido mal los datos!
	   - Uso: ${help.usage}

	   Si el error persiste, refresca la informacion del bot.`
    );

  channel = await check("server/channels", channel);
  reaction = await check(`server/reactions/${messageId}`, reaction);
  role = await check("server/roles", role);

  let message = "";

  if (channel || reaction || role) {
    if (channel) {
      message += `${channel} - canal\n`;
      refreshData("channels");
    }
    if (reaction) {
      message += `${reaction} - reaccion\n`;
      refreshData("reactions");
    }
    if (role) {
      message += `${role} - rol`;
      refreshData("roles");
    }
  } else message += `Uso: ${help.usage}`;

  msg.channel.send(message);
};

/**
 * Checks if the data is correct
 * @async
 * @param {string} ref - The database reference
 * @param {string | undefined} data - The data to be checked
 * @returns {string | undefined} A message or undefined
 */

const check = async (
  ref: string,
  data: string | undefined
): Promise<string | undefined> => {
  if (data && data !== "true" && data !== "false") {
    let result = await remove(`${ref}/${data}`);
    return result;
  }
  return undefined;
};
