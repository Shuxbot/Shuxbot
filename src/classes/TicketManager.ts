import { GuildChannel, User } from "discord.js";

// Source imports
import { ShuxUser } from "./ShuxUser";
import { log, ticketMessage } from "../config/config";
import {channelType, getChannel} from "../util/utils";

/** Ticket Manager Class */
export class TicketManager {
  /** ShuxUser object */
  private shuxUser: ShuxUser;

  /** The ticket (guildChannel) object */
  private ticket: GuildChannel | undefined;

  constructor(user: User) {
    this.shuxUser = new ShuxUser(user);
    this.ticket = this.search();

    if (this.ticket) {
      this.delete();
    } else {
      this.create();
    }
  }

  /**
   * Searchs for a ticket
   * Returns undefined if the channel is not found
   * @returns {GuildChannel | undefined} The guild channel object
   */

  private search(): GuildChannel | undefined {
    let user = this.shuxUser;

    let ticket = user.guild!.channels.cache.find(
      (ch) => ch.name == user.member!.id
    );

    return ticket;
  }

  /**
   * Deletes a ticket
   * @returns {void} Nothing
   */

  private delete(): void {
    this.ticket!.delete().then(() => {
      log.info(`Ticket ${this.shuxUser.member!.id} cerrado.`);
    });
  }

  /**
   * Creates a ticket
   * A channel with name = user.id
   * Permissions, same as the parent category + the user
   * @returns {void} Nothing
   */

  private create(): void {
    let guild = this.shuxUser.guild;
	let ticketsCategory = getChannel(undefined, channelType.tickets)

    if (!ticketsCategory)
      return log.error("No hay una categoria para tickets especificada");

    let category = guild!.channels.cache.find(
      (ch) => ch.type === "category" && ch.id === ticketsCategory!.id
    );

    if (!category) {
      log.error(`NO se encontró la categoria tickets.

				  Para agregarla a la base de datos utilice:
				  - **sh!channel category-id --type 3**`);
      return;
    }

    guild!.channels
      .create(this.shuxUser.member!.id, {
        type: "text",
        parent: category,
      })
      .then((ch) => {
        ch.updateOverwrite(this.shuxUser.member!.user, {
          VIEW_CHANNEL: true,
          READ_MESSAGE_HISTORY: true,
          SEND_MESSAGES: true,
          ATTACH_FILES: true,
          EMBED_LINKS: true,
        });

        ch.send(`${this.shuxUser.member!.user}${ticketMessage}`);
        log.info(`Ticket ${ch} - ${ch.name} abierto.`);
      });
  }
}
