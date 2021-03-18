export const cmdsHelp = {
  reaction: {
    level: 0,
    usage:
      "sh!reaction --reaction :emoji: --message id #channel @role --remove | --no-remove (opcional)",
    options: `
		--reaction (-r) => indica la reaccion
		--message (-m) => indica la id del mensaje
		--remove (-rm) => al usarse, indica que se debe quitar el rol si se reacciona nuevamente
		--no-remove => es equivalente a no usar --remove
		--ticket (-t) => Abrira un ticket si el usuario que reaccione tiene el rol especificado
		--no-ticket => No abrira tickets al reaccionar, se tenga o no el rol especificado

		Si se agrega algo despues de --remove o --ticket su valor sera falso, por lo tanto no se removera el rol al reaccionar denuevo ni se abriran tickets`,
    desc:
      "Agrega una reaccion a un mensaje X para dar el rol especificado a quien reaccione o para abrir tickets si el que reacciona tiene el rol especificado",
  },
  remove: {
    level: 0,
    usage:
      "sh!remove --reaction :emoji: --message id --role rolename --channel channelname",
    options: `
	    --reaction (-re) => indica la reaccion y es obligatorio si se usa --message
		--message (-m) => indica la id del mensaje y es obligatorio si se usa --reaction
		--role (-r) => indica el rol (se debe indicar el nombre del rol)
		--channel (-c) => indica el canal (se debe indicar el nombre del canal)
	`,
    desc:
      "Elimina informacion (reacciones, roles, canales) de la base de datos",
  },
  refresh: {
    level: 0,
    usage:
      "sh!refresh --reactions --roles --channels (debe haber al menos uno)",
    options: `
	    --reactions (-re) => refresca reacciones
		--roles (-r) => refresca roles
		--channles (-c) => refresca canales
	  `,
    desc:
      "Refresca informacion (obtiene nuevamente la informacion de la base de datos)",
  },
  role: {
    level: 0,
    usage: "sh!role @role --perms mod",
    options: `
	    --perms (-p) => indica que permisos darle al rol

		permisos: dev | admin | mod | tech | user
	  `,
    desc: "Le da X permisos a un rol",
  },
  channel: {
    level: 0,
    usage: "sh!channel #channel --skip (opcional)",
    options: `
	    --skip (-s) => evitar que se tomen acciones de moderacion en el canal
		--no-skip => toma acciones de moderacion en el canal
		--logs (-l) => usar este como el canal de logs
		--shuxcmds (-sc) => usar este como el canal de comandos
		--tickets (-t) => usar esta categoria como la categoria de tickets
	  `,
    desc:
      "Agrega canales a la base de datos e indica si se debe moderar o no en estos",
  },
  addcolor: {
    level: 0,
    usage: "sh!addcolor @color --level X",
    options: "--level => indica el nivel necesario para tener el color",
    desc: "Agrega un color obtenible al llegar a X nivel",
  },
  ban: {
    level: 1,
    usage: "sh!ban @user razon",
    options: undefined,
    desc: "Banea a un usuario",
  },
  rmwarn: {
    level: 1,
    usage: "sh!rmwarn @user cantidad",
    options: undefined,
    desc: "Remueve warns a un usuario",
  },
  blacklist: {
    level: 1,
    usage: "sh!blacklist @user razon",
    options: undefined,
    desc: "Blacklistea o desblacklistea a un usuario",
  },
  warn: {
    level: 2,
    usage: "sh!warn @user razon",
    options: undefined,
    desc: "Warnea a un usuario",
  },
  mute: {
    level: 2,
    usage: "sh!mute @user #channel",
    options: undefined,
    desc: "Mutea a un usuario de un canal",
  },
  whois: {
    level: 2,
    usage: "sh!whois @user",
    options: undefined,
    desc: "Muestra la informacion principal de un usuario",
  },
  ticket: {
    level: 3,
    usage: "sh!ticket @user",
    options: undefined,
    desc: "Abre o cierra un ticket",
  },
  pfp: {
    level: 4,
    usage: "sh!pfp @user (opcional)",
    options: undefined,
    desc: "Muestra tu pfp o la de una persona a la que taguees",
  },
  rank: {
    level: 4,
    usage: "sh!rank @user (opcional)",
    options: undefined,
    desc: "Muestra el nivel y xp de una persona o del autor del mensaje",
  },
  profile: {
    level: 4,
    usage: "sh!profile @user (opcional)",
    options: undefined,
    desc: "Muestra el perfil de un usuario o el del autor del mensaje",
  },
  setdesc: {
    level: 4,
    usage: "sh!setdesc [descripcion, mensaje, link, etc]",
    options: undefined,
    desc: "Cambia la descripcion del perfil",
  },
  showlevel: {
    level: 4,
    usage: "sh!showlevel",
    options: undefined,
    desc: "Agrega o quita el nivel del nombre",
  },
  color: {
    level: 4,
    usage: "sh!color color",
    options: undefined,
    desc: "Elije uno de tus colores para usarlo",
  },
  inv: {
    level: 4,
    usage: "sh!inv",
    options: undefined,
    desc: "Muestra los colores que has desbloqueado",
  },
};
