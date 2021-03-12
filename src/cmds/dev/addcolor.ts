import { Message } from "discord.js";

// Source imports
import { db } from "../../config/database";
import { cmdsHelp } from "../../util/cmdsHelp";
import { getopts, getValue } from "../../util/utils";
import { log, refreshData } from "../../config/config";

let help = cmdsHelp.addcolor;

exports.run = async (msg: Message, args: string[]) => {
  let role = msg.mentions.roles.first();
  if (!role) return msg.reply("debes especificar un rol\n" + help.usage);

  let options = getopts(args, { l: "--level" });
  let level = Number(getValue(options, "level"));

  if (!level) return msg.reply("el nivel debe ser un numero!");

  db.ref(`server/roles/${role.name.toLocaleLowerCase().replace(/\s/g, "")}`)
    .set({
      id: role.id,
      perms: "color",
      level: level,
    })
    .then(async () => {
      await refreshData("roles");

      log.info(`Se ha agregado un color
			   - rol: ${role} - id: ${role!.id}
			   - autor: ${msg.author} - id: ${msg.author.id}
			   - nivel para obtener el color: ${level}`);
      msg.reply("se ha agregado correctamente.");
    })
    .catch((error) => {
      msg.reply("oops! ha ocurrido un error!");
      log.error(error.message);
    });
};
