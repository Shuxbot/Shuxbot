export const cmdsHelp = {
  reaction: {
    level: 0,
    usage: "sh!reaction -r :emoji: -m msgId #channel @role",
    options: `
		--reaction (-r) => Reaccion
		--message (-m) => Id del mensaje
		--remove (-rm) => Remover el rol al reaccionar denuevo
		--no-remove => No quitar el rol al reaccionar denuevo
		--ticket (-t) => Abrira un ticket si el usuario que reaccione tiene el rol especificado
		--no-ticket => No abrira tickets al reaccionar, se tenga o no el rol especificado`,
    desc: "Agrega una reaccion a un mensaje para dar el rol especificado a quien reaccione o para abrir tickets si el que reacciona tiene el rol especificado",
  },
  remove: {
    level: 0,
    usage: "sh!remove -r :emoji: -m id -r name -c id",
    options: `
	  --reaction (-re) => Reaccion
	  --message (-m) => Id del mensaje (obligatorio al usar -re)
	  --role (-r) => Nombre del rol
	  --channel (-c) => Id del canal`,
    desc: "Elimina informacion de la base de datos",
  },
  refresh: {
    level: 0,
    usage: "sh!refresh -re -r -c",
    options: `
	  --reactions (-re) => Reacciones
	  --channles (-c) => Canales
	  --roles (-r) => Roles`,
    desc: "Refresca informacion",
  },
  role: {
    level: 0,
    usage: "sh!role @role -p mod",
    options: `--perms (-p) => Permisos

	  * Para ver los permisos utiliza "sh!types"`,
    desc: "Le da permisos a un rol",
  },
  channel: {
    level: 0,
    usage: "sh!channel #channel -s",
    options: `
	  --skip (-s) => No tomar acciones de moderacion
	  --no-skip => Tomar acciones de moderacion
	  --channel (-c) => Al no poder taguear el canal se indica la id con este parametro
	  --type (-t) => Tipo de canal

	  * Para ver los tipos utiliza "sh!types"`,
    desc: "Agrega canales a la base de datos",
  },
  addcolor: {
    level: 0,
    usage: "sh!addcolor @color -l nivel",
    options: "--level (-l) => Nivel para desbloquear el color",
    desc: "Agrega un color obtenible al llegar al nivel especificado",
  },
  types: {
    level: 0,
    usage: "sh!types",
    options: `
	  --channel (-c) => Mostrar solo tipos de canal
	  --role (-r) => Mostrar solo tipos de rol

	  * Si se usan ambos o no se usa ninguno se enviaran todos los tipos
		`,
    desc: "Muestra los tipos de canales y roles",
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
  answer: {
    level: 1,
    usage: "sh!answer user-id respuesta",
    options: undefined,
    desc: "Responde a la sugerencia de un usuario",
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
  kick: {
    level: 2,
    usage: "sh!kick @user reason",
    options: undefined,
    desc: "Kickea a un usuario del servidor",
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
  sug: {
    level: 4,
    usage: "sh!sug sugerencia",
    options: undefined,
    desc: "Envia una sugerencia",
  },
};
