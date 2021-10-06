import { Message, MessageEmbed, TextChannel, User } from "discord.js";

// Source imports
import { log, shuxSvId } from "../config/config";
import { channelType, getChannel, getGuild } from "../util/utils";

/* Suggestion Manager class */
export class SuggestionManager {
  /** The user object */
  private user: User;
  private msg: Message;

  constructor(msg: Message) {
    this.user = msg.author;
    this.msg = msg;
    this.send();
  }

  /**
   * Sends the suggestion to the admin channel
   * @returns {void} nothing
   */
  private send(): void {
    let msg = this.msg,
      user = this.user,
      adminCh = getChannel(undefined, channelType.admin);

    if (!adminCh) {
      msg.reply("oops! aun no se ha configurado esta funcion!");
      return;
    }

    const suggestionEmbed = new MessageEmbed()
      .setTitle(`Sugerencia - ${user.id}`)
      .setDescription(msg.content)
      .setColor("RANDOM")
      .setFooter(
        `Sugerido por: ${user.username}`,
        this.user.displayAvatarURL()
      );

    let sv = getGuild(shuxSvId);
    if (!sv!.channels.cache.has(adminCh.id)) {
      msg.reply(
        "oops! ha ocurrido un error, por favor contacta a un adminstrador!"
      );
      log.error(
        `Canal administracion al cual se envian las sugerencias
		  - Esta en la base de datos pero no en el servidor!`
      );
      return;
    }

    let textChannel: any = sv!.channels.cache.find(
      (ch) => ch.id == adminCh!.id && ch.type == "GUILD_TEXT"
    );
    textChannel!.send({ embeds: [suggestionEmbed] });
    msg.reply("se ha recibido su sugerencia, gracias por ayudarnos a mejorar!");
  }

  /**
   * Sends a message to the suggestions channel and returns null
   * if there's no error, or a string if there's an error
   * @param {string} userId - The user id
   * @param {string} answer - The answer to be sent
   * @returns {null | string} null - if there's no error
   */

  public static answer(userId: string, answer: string): null | string {
    let suggestCh = getChannel(undefined, channelType.suggestions);
    if (!suggestCh) {
      return "No hay canal de sugerencias especificado!";
    }

    let sv = getGuild(shuxSvId);
    let member = sv!.members.cache.find((m) => m.id == userId);

    if (!member) {
      return "No se ha encontrado al usuario en el servidor.";
    }
    if (!sv!.channels.cache.has(suggestCh.id)) {
      return "No se ha encontrado el canal de sugerencias.";
    }

    let user = member.user;
    const answerEmbed = new MessageEmbed()
      .setAuthor(user.username, user.displayAvatarURL())
      .setDescription(answer)
      .setColor("RANDOM")
      .setFooter(`Respuesta - ${user.username} - ${user.id}`)
      .setTimestamp();

    let textChannel: any = sv!.channels.cache.find(
      (ch) => ch.id == suggestCh!.id && ch.type == "GUILD_TEXT"
    );
    textChannel.send(user.toString());
    textChannel.send({ embeds: [answerEmbed] });
    return null;
  }
}
