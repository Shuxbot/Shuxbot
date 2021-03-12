import { Message } from "discord.js";

// Source imports
import { log } from "../../config/config";
import { db } from "../../config/database";
import { cmdsHelp } from "../../util/cmdsHelp";
import { Leveling } from "../../classes/Leveling";
import { ShuxUser } from "../../classes/ShuxUser";
import { getLevelByPoints } from "../../util/utils";

export let help = cmdsHelp.showlevel;

exports.run = async (msg: Message) => {
  let sUser = new ShuxUser(msg.author);
  let uData = await sUser.get();

  let showlvl = !uData.showlvl;

  db.ref(sUser.ref)
    .update({ showlvl: showlvl })
    .then(() => {
      Leveling.formatNickname(
        msg.member!,
        Math.floor(getLevelByPoints(uData.points)),
        showlvl
      );
      msg.channel.send(
        `se ha cambiado a ${showlvl ? "mostrar" : "no mostrar"}`
      );
    })
    .catch((error) => {
      log.error(error.message);
      msg.reply("oops! error");
    });
};
