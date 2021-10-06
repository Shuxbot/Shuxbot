import { Guild, GuildMember, Message } from "discord.js";
// Source imports
import { shux } from "..";
import { db } from "../config/database";
import { channels, log, roles } from "../config/config";

/** Enum with the privilege levels */
export enum privilegeLevel {
  dev = 0,
  admin = 1,
  mod = 2,
  tech = 3,
  user = 4,
}

/** RegExp to search emojis */
export const emojiReg = new RegExp(
  /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c\ude32-\ude3a]|[\ud83c\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/,
  "g"
);

export const svEmojiReg = new RegExp(/(<.{0,}?[:](.+?)[:]([0-9]+)>)/, "g");

/**
 * Sends a warning messages
 * @async
 * @param {Message} msg - The msg to take the channel where the warning will be sent
 * @param {string[]} warningMsgs - Array of warning messages
 * @returns {Promise<void>} Nothing
 */

export const sendWarningMessage = async (
  msg: Message,
  warningMsgs: string[]
): Promise<void> => {
  let warnMsgIndex = Math.floor(Math.random() * warningMsgs.length);

  let warningMsg = await msg.channel.send(warningMsgs[warnMsgIndex]);
  setTimeout(
    () => warningMsg.delete().catch((error) => log.error(error.message)),
    10000
  );
};

/**
 * Returns the GUILD object for the specified ID
 * @param {string} id - The guild id
 * @returns {Guild | undefined} The guild object
 */

export const getGuild = (id: string): Guild | undefined => {
  return shux.guilds.cache.find((sv) => sv.id == id);
};

/**
 * Gets data from database
 * @async
 * @param {string} ref - Data reference
 * @returns {any} The data
 */

export const getFromDB = async (ref: string): Promise<any> => {
  const payload = await db.ref(ref).once("value");

  if (payload.exists()) {
    return payload.exportVal();
  } else {
    log.error(
      `Error obteniendo informacion
	  - Referencia: ${ref}`
    );
    return {};
  }
};

/**
 * Counts emojis in a string
 * @param {string} str - String to search emojis
 * @returns {[number, string[]]} Array [emojiCount, emojis]
 */

export const emojiCounter = (str: string): [number, string[]] => {
  let matches,
    matches2,
    emojis: string[] = [],
    emojiCount = 0;

  do {
    matches = emojiReg.exec(str);
    matches2 = svEmojiReg.exec(str);

    if (matches) {
      emojis.push(matches[0]);
      emojiCount++;
    }
    if (matches2) {
      emojis.push(matches2[0]);
      emojiCount++;
    }
  } while (matches || matches2);

  return [emojiCount, emojis];
};

/**
 * Gets options from an array of strings
 * @param {string[]} argv - The array
 * @param {object} shortOpts - The short options object as
 * 'shortOption': '--longOption'
 * @returns {string[]} An array with the options and the values
 * as ['option', 'value', 'option', 'value']
 */

export const getopts = (
  argv: string[],
  shortOpts: { [key: string]: string }
): string[] => {
  let resArr: string[] = [];

  argv.forEach((value, i) => {
    if (value.startsWith("--no-")) {
      resArr.push(value.substring(5));
      resArr.push("false");

      return;
    }

    // short options
    let shortOption = shortOpts[value.substring(1)];

    if (shortOption) {
      value = shortOption;
    }

    // normal options
    if (value.startsWith("--")) {
      resArr.push(value.substring(2));
      let nextValue = argv[i + 1];

      if (nextValue) {
        if (nextValue.startsWith("-")) {
          resArr.push("true");
        } else {
          resArr.push(nextValue);
        }
      } else {
        resArr.push("true");
      }
    }
  });

  return resArr;
};

/**
 * Gets the value for the specified option
 * Returns undefined if the option doesn't exist
 * @param {string[]} arr - The array returned from getopts();
 * @param {string} option - The option to search for
 * @returns {string} The value for the specified option
 */

export const getValue = (arr: string[], option: string): string | undefined => {
  return arr.find((_, i) => arr[i - 1] == option);
};

/**
 * Gets the GuildMember privilege level
 * @param {GuildMember} member - The GuildMember object
 * @returns {number} The privilege level
 */

export const getPrivilegeLevel = (member: GuildMember): number => {
  let pLevel = 4;

  if (member.permissions.has("ADMINISTRATOR")) return 0;

  for (const r in roles) {
    if (member!.roles.cache.has(r)) {
      if (Number(privilegeLevel[roles[r].perms]) < pLevel)
        pLevel = Number(privilegeLevel[roles[r].perms]);
    }
  }

  return pLevel;
};

/**
 * Returns true or false based on probability
 * @param {number} x - Probability, .1, .5, etc
 * @returns {boolean} result
 */

export const probability = (x: number): boolean => {
  return Math.random() < x;
};

/**
 * Removes a specified reference from database
 * @async
 * @param {string} ref - The reference to remove
 * @returns {string} A message saying the result
 */

export const remove = async (ref: string): Promise<string> => {
  let msg = await db
    .ref(ref)
    .remove()
    .then(() => {
      log.warn(
        `Se ha removido una referencia!
		  - referencia: ${ref}`
      );
      return "Se ha removido correctamente.";
    })
    .catch((error) => {
      log.error(error.message);
      return "Oops! ha ocurrido un error";
    });

  return msg;
};

/**
 * Gets user level based on points
 * @param {number} points - The user points
 * @returns {number} The user level
 */

export const getLevelByPoints = (points: number): number => {
  return 2 * Math.sqrt(points);
};

/**
 * Gets user points based on level
 * @param {number} level - The user level
 * @returns {number} The user points
 */

export const getPointsByLevel = (lvl: number): number => {
  return lvl ** 2 / 4;
};

/**
 * Gets user points different from zero
 * @param {number} points - The user points
 * @returns {number} Real points
 */

export const getActualPoints = (points: number): number => {
  return Math.floor(points < 1 ? 1 : points);
};

/** Channel types enum */
export enum channelType {
  common,
  logs,
  cmds,
  tickets,
  admin,
  suggestions,
}

/**
 * Returns the first channel that meets the condition
 * chId == id || type == ch.type
 * @param {channelType} type - The channel type
 * @returns {{ id: string, type: number; skip: boolean }} the channel ID
 */

export const getChannel = (
  id: string = "",
  type: channelType
): { id: string; type: number; skip: boolean } | null => {
  for (let chId in channels) {
    if (chId == id || channels[chId].type == type) {
      let channel = {
        id: chId,
        type: channels[chId].type,
        skip: channels[chId].skip,
      };
      return channel;
    }
  }
  return null;
};

/**
 * Manages metadata
 * @param {any} metadata - Metadata
 * @param {string} message - The message to be sent
 * @returns void - nothing
 */

export const manageMetadata = (metadata: any, message: string): void => {
  metadata.send(message);
};
