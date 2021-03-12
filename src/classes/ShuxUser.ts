import { Guild, GuildMember, User } from "discord.js";

// Source imports
import { db } from "../config/database";
import { getGuild } from "../util/utils";
import { log, shuxSvId } from "../config/config";

/** ShuxUser Class */
export class ShuxUser {
  /** The GuildMember object for this user*/
  public member: GuildMember | null;

  /** The guild object */
  public readonly guild: Guild | undefined;

  /** The database reference for this user */
  public ref = `users/${this.user.id}`;

  constructor(private user: User) {
    this.guild = getGuild(shuxSvId);
    this.member = this.guild!.member(user);
  }

  /**
   * Sets the reference in the database to the basic new data
   * @returns {object} Basic new data
   */

  public new(): {
    points: number;
    warns: number;
    blacklist: boolean;
    desc: string;
    showlvl: boolean;
    color: string;
  } {
    let data = {
      points: 0,
      warns: 0,
      blacklist: false,
      desc: "",
      showlvl: false,
      color: "",
    };

    db.ref(this.ref)
      .set(data)
      .catch((error) => console.error(error.message));
    return data;
  }

  /**
   * Gets user data.
   * If user has no data, calls this.new()
   * and returns its value
   * @async
   * @returns {any} The user data
   */

  public async get(): Promise<any> {
    const payload = await db.ref(this.ref).once("value");

    if (payload.exists()) {
      return payload.exportVal();
    }

    return this.new();
  }

  /**
   * Locks a channel for this user
   * @async
   * @param {string} chId - The channel id
   * @returns {void} Nothing
   */

  public async lockCh(chId: string): Promise<void> {
    let channel = this.guild!.channels.cache.find((ch) => ch.id === chId);

    if (!channel) return;

    let perms = {
      VIEW_CHANNEL: false,
      READ_MESSAGE_HISTORY: false,
      SEND_MESSAGES: false,

      CONNECT: false,
    };

    let ch = await channel.updateOverwrite(this.user, perms);
    log.info(
      `Se ha **muteado** a ${this.user} - id: ${this.user.id} del canal ${ch} - id: ${ch.id}`
    );
  }

  /**
   * Warns user
   * @async
   * @param {string} reason - The reason the user's being warned
   * @returns {void} Nothing
   */

  public async warn(reason: string): Promise<void> {
    if (!this.member!.kickable) return;

    let uData = await this.get();
    let warns = uData.warns + 1;

    if (warns === 2) {
      this.member!.kick(reason).catch((error) => log.error(error.message));
    } else if (warns >= 3) {
      this.member!.ban({ reason: reason }).catch((error) =>
        log.error(error.message)
      );
    }

    db.ref(this.ref)
      .update({ warns: warns })
      .then(() =>
        log.warn(`${this.user.username} - ${this.user} ha sido warneado
				 - Razon: **${reason}**
				 - Warns actuales: ${warns}`)
      )
      .catch((error) => log.error(error.message));
  }

  /**
   * Remove warns
   * @async
   * @param {number} amount - The amount of warns to remove
   * @returns {void} Nothing
   */

  public async rmWarn(amount: number): Promise<void> {
    let uData = await this.get();
    let warns = uData.warns - amount;

    if (warns <= 0) {
      warns = 0;
    }

    db.ref(this.ref)
      .update({ warns: warns })
      .then(() => {
        log.warn(
          `Se le han retirado ${warns} warns a ${this.user.id} - ${this.user}`
        );
      })
      .catch((error) => log.error(error.message));
  }
}
