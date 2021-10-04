import { Message, MessageEmbed } from "discord.js";

// Source imports
import { cmdsHelp } from "../../util/cmdsHelp";
import { getPrivilegeLevel, privilegeLevel } from "../../util/utils";

let cmdsH: any = cmdsHelp;

exports.run = async (msg: Message, args: string[]) => {
  let cmd = args[0];
  let pLevel = getPrivilegeLevel(msg.member!);

  if (cmd) {
    let help = getCmdHelp(cmd, pLevel);
    if (!help)
      return msg.reply(
        "oops! no tienes permisos para ver ayuda sobre este comando!"
      );
    let embed = new MessageEmbed()
      .setTitle(`Ayuda ${cmd}`)
      .addField("Descripcion:", help!.desc)
      .addField("Uso:", help!.usage)
      .addField("Opciones:", help!.options ? help!.options : "No hay opciones")
      .addField("Permisos:", privilegeLevel[Number(help!.level)])
      .setColor("GREEN")
      .setTimestamp();

    msg.channel.send({ embeds: [embed] });
  } else {
    let embed = new MessageEmbed()
      .setTitle("Ayuda General")
      .setColor("GREEN")
      .setTimestamp();

    for (const name in cmdsHelp) {
      if (cmdsH[name].level >= pLevel) {
        embed.addField(name, cmdsH[name].desc);
      }
    }

    msg.channel.send({ embeds: [embed] });
  }
};

/**
 * Gets the command help object
 * @param {string} cmd - The command
 * @param {number} pLevel - The privilege level
 * @returns {any} The help object or undefined if not found
 */

const getCmdHelp = (
  cmd: string,
  pLevel: number
):
  | { level: string; usage: string; options: string | undefined; desc: string }
  | undefined => {
  if (cmdsH[cmd] && cmdsH[cmd].level >= pLevel) {
    return cmdsH[cmd];
  }
  return undefined;
};
