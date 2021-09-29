import { Message } from "discord.js";

// Source imports
import { db } from "../../config/database";
import { colors } from "../../config/config";
import { cmdsHelp } from "../../util/cmdsHelp";
import { ShuxUser } from "../../classes/ShuxUser";
import { getLevelByPoints } from "../../util/utils";

let help = cmdsHelp.color;

exports.run = async (msg: Message, args: string[]) => {
  let name = args.join("");

  if (!name) return msg.reply("debes especificar el color\n" + help.usage);

  let sUser = new ShuxUser(msg.author);
  let uData = await sUser.get();

  for (let color in colors) {
    if (name == colors[color].name) {
      if (colors[color].level <= Math.floor(getLevelByPoints(uData.points))) {
        let lastColor = uData.color;

        db.ref(sUser.ref)
          .update({ color: color })
          .then(() => {
            if (!msg.guild!.roles.cache.has(color)) {
              return msg.reply("oops! no existe el color en el servidor!");
            }

            if (msg.guild!.roles.cache.has(uData.color)) {
              msg.member!.roles.remove(lastColor);
            }
            msg.member!.roles.add(color);
            msg.reply("se ha actualizado su color!");
          });
      }
    }
  }
};
