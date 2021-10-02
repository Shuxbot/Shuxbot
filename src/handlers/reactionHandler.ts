import { MessageReaction, PartialUser, User } from "discord.js";

// Source imports
import { reactions } from "../config/config";
import { TicketManager } from "../classes/TicketManager";

/**
 * Handles reactions
 * @async
 * @param {MessageReaction} reaction - The reaction object
 * @param {User} user - The user object
 * @returns {void} Nothing
 */

export const reactionHandler = async (
  reaction: MessageReaction,
  user: User | PartialUser
): Promise<void> => {
  let member = await reaction.message.guild!.members.fetch(user.id);
  user = member.user;

  if (user.bot) return;

  let msgId = reactions[reaction.message.id];

  if (msgId) {
    let reactionEmoji = msgId[reaction.emoji.name];

    if (reactionEmoji) {
      let hasRole = member.roles.cache.has(reactionEmoji.role);

      if (reactionEmoji.ticket) {
        if (hasRole) {
          new TicketManager(user);
        }
        reaction.users.remove(user);
        return;
      }
      if (reactionEmoji.remove) {
        if (hasRole) {
          member.roles.remove(reactionEmoji.role);
          reaction.users.remove(user);
          return;
        }
      }
      member.roles.add(reactionEmoji.role);
    }
    reaction.users.remove(user);
  }
};
