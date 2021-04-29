import { Message } from "discord.js";

// Source imports
import {
  channelType,
  getChannel,
  getPrivilegeLevel,
  privilegeLevel,
  sendWarningMessage,
} from "../util/utils";
import { Leveling } from "../classes/Leveling";
import { messageMod } from "../automod/messageMod";
import { EasterEggs } from "../classes/EasterEggs";
import { warningMessages } from "../config/config";

const prefixReg: RegExp = /(s(h|hux|hx|x)\!)/;

/**
 * Handles messages
 * @param {Message} msg - The message to be handled
 * @returns {void} Nothing
 */

export const messageHandler = (msg: Message): void => {
  if (msg.author.bot || msg.channel.type !== "text") return;
  messageMod(msg);
  new EasterEggs(msg);
  new Leveling(msg);

  // commands
  let content = msg.content.toLocaleLowerCase();
  let prefix = content.match(prefixReg);
  if (!prefix) return;

  let pLevel = getPrivilegeLevel(msg.member!);
  let cmdsChannel = getChannel(undefined, channelType.cmds);

  if (pLevel > 2 && cmdsChannel) {
    if (msg.guild!.channels.cache.has(cmdsChannel.id)) {
      if (msg.channel.id !== cmdsChannel.id) {
        sendWarningMessage(msg, warningMessages.wrongChannel.cmds);
        return;
      }
    }
  }

  let [cmd, ...args] = content.slice(prefix[0].length).trim().split(" ");
  let [, ...args2] = msg.content.slice(prefix[0].length).trim().split(" ");

  args = args.filter((arg) => /\S/.test(arg));
  args2 = args2.filter((arg) => /\S/.test(arg));

  runCommand(msg, args, args2, cmd, pLevel);
};

/**
 * Runs commands
 * @param {Message} msg - The message object
 * @param {string[]} args - The lowerCase arguments
 * @param {string[]} args2 - The arguments
 * @param {string} cmd - The command
 * @param {privilegeLevel} pLevel - Privilege level
 * @returns {void} Nothing
 */

const runCommand = (
  msg: Message,
  args: string[],
  args2: string[],
  cmd: string,
  pLevel: privilegeLevel
): void => {
  try {
    let file = require(`../cmds/${privilegeLevel[pLevel]}/${cmd}.js`);
    if (cmd == "ticket") {
      file.run(msg, args, pLevel);
    } else file.run(msg, args, args2);
  } catch (e) {
    if (pLevel < 4) {
      runCommand(msg, args, args2, cmd, pLevel + 1);
    }
  }
};
