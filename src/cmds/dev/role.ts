import { Message } from "discord.js";

// Source imports
import {
  getopts,
  getPrivilegeLevel,
  getValue,
  privilegeLevel,
} from "../../util/utils";
import { db } from "../../config/database";
import { cmdsHelp } from "../../util/cmdsHelp";
import { log, refreshData } from "../../config/config";

let help = cmdsHelp.role;

exports.run = async (msg: Message, args: string[]) => {
  let role = msg.mentions.roles.first();

  if (!role) return msg.reply("debes especificar un rol!\n" + help.usage);

  let options = getopts(args, { p: "--perms" });
  let perms: any = getValue(options, "perms");

  if (!perms || perms === "true" || perms === "false")
    return msg.reply("debes especificar bien los permisos\n" + help.usage);

  let authorPrivilege = getPrivilegeLevel(msg.member!);
  let newPrivilege = Number(privilegeLevel[perms]);

  if (authorPrivilege !== 0 && authorPrivilege <= newPrivilege)
    return msg.reply(
      "oops! **NO** tienes autorizacion para darle a alguien estos permisos"
    );

  if (!privilegeLevel[newPrivilege])
    return msg.reply("debes especificar bien los permisos\n" + help.usage);

  db.ref(`server/roles/${role.name.toLocaleLowerCase().replace(/\s/g, "")}`)
    .set({
      id: role.id,
      perms: privilegeLevel[newPrivilege],
    })
    .then(async () => {
      await refreshData("roles");

      log.info(`Se ha agregado un rol
			   - rol: ${role} - id: ${role!.id}
			   - autor: ${msg.author} - id: ${msg.author.id}
			   - permisos:
				 - autor: ${privilegeLevel[authorPrivilege]}
			     - role: ${privilegeLevel[newPrivilege]}`);

      msg.channel.send("Se ha añadido el rol correctamente.");
    })
    .catch((error) => {
      msg.reply("oops! ha ocurrido un error!");
      log.error(error.message);
    });
};
