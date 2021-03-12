import { MessageEmbed, TextChannel } from "discord.js";

// Source imports
import { getGuild } from "../util/utils";
import { channels, shuxSvId } from "../config/config";

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

  private async log(log: any): Promise<void> {
    if (!this.isLoggeable) return;
    if (!channels.logs) return;

    let guild = getGuild(shuxSvId);
    if (!guild!.channels.cache.has(channels.logs.id)) return;

    let logsChannel = new TextChannel(guild!, { id: channels.logs.id });
    logsChannel.send(log);
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
