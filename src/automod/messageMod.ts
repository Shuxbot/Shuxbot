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
import { log, warningMessages } from "../config/config";
import { shux } from "..";

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
 * Warns if there's someone flooding with so much messages or walltexts
 * @param {Message} msg - The message object
 * @returns {void} Nothing
 */

const floodMod = (msg: Message): void => {
  let uid = msg.author.id;

  let isNewMember =
    Date.now() - msg.member!.joinedTimestamp! < 1000 * 60 * 60 * 24 * 3
      ? true
      : false;

  let isWalltext = isNewMember
    ? msg.content.length >= 1000
    : msg.content.length >= 1500;

  if (isNewMember && isWalltext) {
    msg
      .member!.ban({
        reason: "flood con walltext, usuario nuevo en el servidor",
      })
      .then((m) => {
        log.warn(`Usuario **${m.user.username}** - ${m} ha sido **BANEADO**
			- Razon: Flood con walltext, usuario nuevo en el servidor
			- Autor: ${shux.user!.username} - AUTOMOD`);
      })
      .catch((err) => log.error(err.message));
    return;
  }

  if (!isNewMember && isWalltext) {
    user.warn("flood con walltext");
    msg.reply("ha sido warneado por hacer Flood con Walltext");
  }

  if (msg.mentions.roles.size >= 3 || msg.mentions.users.size >= 5) {
    user.warn("Massive Mention");
    msg.reply("NO menciones de forma masiva. +1 warn");
  }

  if (!floodMap.has(uid)) {
    floodMap.set(uid, 1);
    setTimeout(async () => {
      floodMap.delete(uid);
    }, 4000);
  }
  floodMap.set(uid, floodMap.get(uid)! + 1);

  if (floodMap.get(uid)! === 4) {
    sendWarningMessage(msg, warningMessages.flood);
  } else if (floodMap.get(uid)! >= 6) {
    user.warn("Flood, 5 o mas mensajes en menos de 4 segundos");
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
    msg.reply(
      "ha sido warneado\n- Estan prohibidas las invitaciones a servidores de Discord"
    );
  }
};
