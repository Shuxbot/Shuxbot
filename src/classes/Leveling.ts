import {
  GuildMember,
  Message,
  MessageEmbed,
  TextChannel,
  User,
} from "discord.js";

// Source imports
import { ShuxUser } from "./ShuxUser";
import { db } from "../config/database";
import { colors } from "../config/config";
import { channels, log } from "../config/config";
import { getActualPoints, getLevelByPoints } from "../util/utils";

/** Leveling class */
export class Leveling {
  constructor(msg: Message) {
    let sUser = new ShuxUser(msg.author);

    sUser.get().then((uData) => {
      if (uData.blacklist === true) return;

      let points = uData.points;
      let newPoints = points + msg.content.length * 0.003;

      db.ref(sUser.ref)
        .update({
          points: newPoints,
        })
        .then((_) => {
          let level = Math.floor(getLevelByPoints(points));
          let newLevel = Math.floor(getLevelByPoints(newPoints));

          if (newLevel > level) {
            for (let color in colors) {
              if (colors[color].level == newLevel) {
                msg.reply(`Ha desbloqueado un nuevo color! (${color})`);
              }
            }

            Leveling.formatNickname(msg.member!, newLevel, uData.showlvl);
            let replyChannel: any = msg.channel;

            if (channels.shuxcmds) {
              if (msg.guild!.channels.cache.has(channels.shuxcmds.id)) {
                replyChannel = new TextChannel(msg.guild!, {
                  id: channels.shuxcmds.id,
                });
              }
            }

            let lvlUpEmbed = this.getLevelEmbed(
              msg.author,
              newPoints,
              newLevel
            );

            replyChannel
              .send(msg.author.toString())
              .then(() => {
                replyChannel.send(lvlUpEmbed);
              })
              .catch((error: any) => {
                log.error(error.message);
              });
          }
        });
    });
  }

  /**
   * Returns an embed with the new level info
   * @param {User} author - The user who leveled up
   * @param {number} points - The user points
   * @param {number} level - The user level
   * @returns {MessageEmbed} The MessageEmbed
   */

  private getLevelEmbed(
    author: User,
    points: number,
    level: number
  ): MessageEmbed {
    let lvlEmbed = new MessageEmbed()
      .setTitle(`${author.username}, has subido de nivel!`)
      .setDescription(
        `**Puntos:** ${Math.floor(getActualPoints(points))}
		**Nivel:** ${level}`
      )
      .setColor("RANDOM")
      .setThumbnail(author.displayAvatarURL())
      .setTimestamp();

    return lvlEmbed;
  }

  /**
   * Formats guild member nickname
   * @param {GuildMember} member - The GuildMember object
   * @param {number} level - The level
   * @param {boolean} showlevel - Wether to show or not the level in the nickname
   * @returns {void} Nothing
   */

  public static formatNickname(
    member: GuildMember,
    level: number,
    showlevel: boolean
  ): void {
    if (!member.manageable) return;

    let username: string = member.user.username;
    let nickname: string = member.nickname!;

    if (username.length > 25) {
      username = username.slice(0, 25);
    }

    let formattedNickname: string;

    if (showlevel) {
      formattedNickname = `${username} - ${Math.floor(level)}`;
    } else {
      formattedNickname = '';
    }

    if (nickname) {
      if (nickname === formattedNickname) return;
    }

    // update nickname
    member.setNickname(formattedNickname).catch((err) => {
      console.error(err);
      log.error(`Error al intentar cambiar el nick:
			 - User: ${member.user} / ${member.user.username}
			 - Error: ${err.message}
			`);
    });
  }
}
