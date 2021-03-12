import { Message } from "discord.js";

// Source imports
import { log } from "../../config/config";
import { db } from "../../config/database";
import { cmdsHelp } from "../../util/cmdsHelp";
import { ShuxUser } from "../../classes/ShuxUser";

let help = cmdsHelp.setdesc;

exports.run = async (msg: Message, _: string[], args2: string[]) => {
  let desc = args2.join(" ");

  if (!desc)
    return msg.reply("Debes especificar tu descripcion!\n" + help.usage);

  if (desc.length > 200)
    return msg.reply(
      "oops! tu descripcion no puede tener mas de 200 caracteres!"
    );

  let sUser = new ShuxUser(msg.author);
  await sUser.get();

  let ref = sUser.ref;

  db.ref(ref)
    .update({ desc: desc })
    .then(() => {
      msg.reply("se ha actualizado tu descripcion!");
    })
    .catch((error) => {
      msg.reply("oops! ha ocurrido un error!");
      log.error(error.message);
    });
};
