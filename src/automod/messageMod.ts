import { Message } from "discord.js";

// Source imports
import {
  channelType,
  emojiCounter,
  getChannel,
  getPrivilegeLevel,
  sendWarningMessage,
} from "../util/utils";
import { ShuxUser } from "../classes/ShuxUser";
import { warningMessages } from "../config/config";

let user: ShuxUser;

/**
 * Moderates messages
 * @param {Message} msg - The message object
 * @returns {void} Nothing
 */

export const messageMod = (msg: Message): void => {
  user = new ShuxUser(msg.author);

  let currChannel = getChannel(msg.channel.id, channelType.common);
  if (currChannel && currChannel.skip) return;

  let pLevel = getPrivilegeLevel(msg.member!);
  if (pLevel < 3) return;

  floodMod(msg);
  emojiFloodMod(msg);
  inviteMod(msg);
};

const floodMap: Map<string, number> = new Map();

/**
 * Warns if there's someone flooding with so much messages
 * @param {Message} msg - The message object
 * @returns {void} Nothing
 */

const floodMod = (msg: Message): void => {
  let uid = msg.author.id;

  if (!floodMap.has(uid)) {
    floodMap.set(uid, 1);
    setTimeout(async () => {
      floodMap.delete(uid);
    }, 4000);
  }
  floodMap.set(uid, floodMap.get(uid)! + 1);

  if (floodMap.get(uid)! === 5) {
    sendWarningMessage(msg, warningMessages.flood);
  } else if (floodMap.get(uid)! >= 7) {
    user.warn("Flood");
    msg.reply("prohibido el flood. +1 warn");
  }
};

const emojiMap: Map<string, number> = new Map();

/**
 * Warns if there are so much emojis in a message
 * @param {Message} msg - The message object
 * @returns {void} Nothing
 */

const emojiFloodMod = (msg: Message): void => {
  let uid = msg.author.id;
  let [emojiCount] = emojiCounter(msg.content);

  if (emojiCount >= 6 && emojiCount < 9) {
    sendWarningMessage(msg, warningMessages.emojiFlood);
    if (!emojiMap.has(uid)) {
      emojiMap.set(uid, 1);
      setTimeout(async () => {
        emojiMap.delete(uid);
      }, 10000);
    }

    emojiMap.set(uid, emojiMap.get(uid)! + 1);
    if (emojiMap.get(uid)! > 3) {
      user.warn("Flood con emojis, 3 advertencias");
      msg.reply(
        "se ha advertido 3 veces, prohibido el flood con emojis. +1 warn"
      );
    }
  } else if (emojiCount >= 9) {
    user.warn("Flood con emojis");
    msg.reply("prohibido el flood con emojis. +1 warn");
  }
};

let inviteRegex: RegExp = /(http(s)?:\/\/(www.)?)?(discord.gg|discord.me|discord.link|discord.io|invite.gg|invite.ink)\/\w+/;

/**
 * Warns if message has a Discord invite link
 * @param {Message} msg - The message object
 * @returns {void} Nothing
 */

export const inviteMod = (msg: Message): void => {
  let content = msg.content.replace(/[^a-zA-Z\d:\.\/]/g, "");
  let match = content.match(inviteRegex);

  if (match) {
    user.warn(`Invitacion de discord: ${match[0]}`);
    msg.delete();
    sendWarningMessage(msg, warningMessages.invite);
  }
};
