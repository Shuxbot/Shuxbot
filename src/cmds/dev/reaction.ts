import { Message } from "discord.js";

// Source imports
import { db } from "../../config/database";
import { cmdsHelp } from "../../util/cmdsHelp";
import { log, refreshData } from "../../config/config";
import { emojiCounter, getopts, getValue } from "../../util/utils";

export let help = cmdsHelp.reaction;

exports.run = async (msg: Message, args: string[]) => {
  let syntax = `Uso: ${help.usage}`;
  let options = getopts(args, {
    r: "--reaction",
    m: "--message",
    t: "--ticket",
    rm: "--remove",
  });

  let emoji = getValue(options, "reaction");
  let messageId = getValue(options, "message");
  let remove = getValue(options, "remove") == "true";
  let ticket = getValue(options, "ticket") == "true";

  let channel = msg.mentions.channels.first();
  let role = msg.mentions.roles.first();

  let count = 0;

  if (emoji) [count, [emoji]] = emojiCounter(emoji);

  if (count > 1 || count == 0) {
    return msg.reply("Debe haber un emoji\n" + syntax);
  }

  if (!channel) return msg.reply("Se debe taguear el canal.\n" + syntax);
  if (!messageId) return msg.reply("Se debe dar la id del mensaje.\n" + syntax);
  if (!role) return msg.reply("Se debe taguear el rol.\n" + syntax);

  let messages = await channel.messages.fetch();
  let message = messages.get(messageId);

  if (message) message.react(emoji!);
  else {
    return msg.reply(
      `NO se ha encontrado el mensaje con id ${messageId}
	   El mensaje debe ser al menos de los ultimos 50 del canal ${channel}
	   Recuerda dar una id valida!`
    );
  }

  db.ref(`server/reactions/${messageId}/${emoji}`)
    .set({
      role: role.id,
      remove: remove,
      ticket: ticket,
    })
    .then(async () => {
      await refreshData("reactions");

      log.info(`Se ha agregado un rol de reaccion
			   - rol: ${role} - id: ${role!.id}
			   - autor: ${msg.author} - id: ${msg.author.id}
			   - Mensaje: ${messageId}
			   - Canal: ${channel}
			   - Reaccion: ${emoji}
			   - Remover: ${remove}
			   - Ticket: ${ticket}`);

      msg.channel.send("Se ha añadido la reaccion correctamente");
    })
    .catch((error) => {
      msg.reply("oops! ha ocurrido un error!");
      log.error(error.message);
    });
};
