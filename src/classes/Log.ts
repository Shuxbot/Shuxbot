import { MessageEmbed, TextChannel } from "discord.js";

// Source imports
import { shuxSvId } from "../config/config";
import { channelType, getChannel, getGuild } from "../util/utils";

/** Logger class */
export class Log {
  /** Whether to log or not */
  public isLoggeable: boolean = false;

  /**
   * Sends a Log to the Logs channel
   * if isLoggeable == true, the channel is in channels object and the guild has a channel with the channel id
   * @async
   * @param {any} log - The message to be logged
   * @returns {void} Nothing
   */

  private log(log: any): void {
    let isEmbed = false;

    if (!this.isLoggeable) return;
    if (typeof MessageEmbed == typeof log) isEmbed = true;

    let logsCh = getChannel(undefined, channelType.logs);
    if (!logsCh) return;

    let guild = getGuild(shuxSvId);
    if (!guild!.channels.cache.has(logsCh.id)) return;

    let logsChannel: any = guild!.channels.cache.find(
      (ch) => ch.id == logsCh!.id && ch.type == "GUILD_TEXT"
    );
    isEmbed ? logsChannel.send({ embeds: [log] }) : logsChannel.send(log);
  }

  /**
   * Sends an INFO log
   * @param {string | MessageEmbed} msg - The message to be logged
   * @returns {void} Nothing
   */

  public info(msg: string | MessageEmbed): void {
    this.log(msg);
  }

  /**
   * Sends a WARN log
   * @param {string} msg - The message to be logged
   * @returns {void} Nothing
   */

  public warn(msg: string): void {
    let warnEmbed = new MessageEmbed()
      .setTitle("ADVERTENCIA")
      .setColor(0xffcd00)
      .setDescription(msg)
      .setTimestamp();

    this.log(warnEmbed);
  }

  /**
   * Sends an ERROR log
   * @param {string} msg - The message to be logged
   * @returns {void} Nothing
   */

  public error(msg: string): void {
    let errorEmbed = new MessageEmbed()
      .setTitle("ERROR")
      .setColor(0xff0000)
      .setDescription(msg)
      .setTimestamp();

    this.log(errorEmbed);
  }
}
