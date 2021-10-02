import { Message } from "discord.js";
import { log } from "../config/config";
import { db } from "../config/database";

// Source imports
import { ShuxUser } from "./ShuxUser";
import { getLevelByPoints, getPointsByLevel, probability } from "../util/utils";

/** Easter eggs Class */
export class EasterEggs {
  /** String array with links to Asuka Langley gifs */
  private asuka = [
    "https://tenor.com/view/asuka-gif-20292417",
    "https://tenor.com/view/asuka-evangelion-irritated-bruh-gif-19369335",
    "https://tenor.com/view/feliz-jueves-asuka-feliz-jueves-asuka-jueves-gif-18184379",
    "https://tenor.com/view/shinji-asuka-neon-genesis-evangelion-smirk-anime-gif-15115499",
    "https://tenor.com/view/evangelion-neon-genesis-evangelion-neon-genesis-asuka-shinji-gif-19953445",
  ];

  /** String array with links to Rei Chikita imgs */
  private rei = [
    "https://cdn.discordapp.com/attachments/728384734585028641/819412793001377792/156790385_913388956086172_2917913976425002494_o.png",
    "https://cdn.discordapp.com/attachments/728384734585028641/819414790727794728/2020-10-10_19.png",
    "https://cdn.discordapp.com/attachments/728384734585028641/819414869894889503/d20efd68-c5dc-442b-9ea4-3ca2b4c85583.png",
  ];

  constructor(private msg: Message) {
    let content = msg.content.toLowerCase();

    if (content === "feliz jueves" && new Date().getDay() == 4)
      this.happyThursday();

    if (content === "beigod" || content === "beido waifu") this.beigod();
    if (content === "beidou best waifu" || content === "beigod best waifu")
      this.beigod(true);
  }

  /**
   * Sends an Asuka Langley gif!
   *
   * 20% prob to get an Asuka Langley gif
   * 1% prob to get a Rei Chikita gif
   * @returns {void} Nothing
   */

  private happyThursday(): void {
    if (probability(0.2)) {
      let gif = Math.floor(Math.random() * this.asuka.length);
      this.msg.channel.send(this.asuka[gif]);
    } else if (probability(0.01)) {
      let img = Math.floor(Math.random() * this.rei.length);
      this.msg.channel.send(this.rei[img]);
    }
  }

  /* String array with gifs and messages */
  private beidou = [
    "Beidou god.",
    "https://tenor.com/view/genshin-impact-beidou-gif-22152043",
    "https://tenor.com/view/beidou-genshin-impact-lol-meme-gif-20601800",
    "https://tenor.com/view/beidou-genshin-genshin-impact-electro-gif-22199160",
    "https://tenor.com/view/mihoyo-genshin-genshinimpact-beidou-hot-gif-22072978",
    "Si.",
  ];

  /**
   * Sends messages, gifs and gives levels
   * 1% prob to get a message and 10 levels
   * 5% prob to get a gif
   */

  private beigod(cultured = false): void {
    let phrases = [
      "Por fin, alguien cuto",
      "Veo que entiendes lo que es bueno",
      "Vaya, una persona sabia",
      "Ojito, le sabe le sabe",
    ];
    let comp = [
      ", ten un regalo",
      ", ahi va un regalo",
      ", ten esto",
      ", ten, te doy esto",
    ];

    if (probability(0.01) && cultured) {
      let sUser = new ShuxUser(this.msg.author);
      sUser.get().then((uData) => {
        let points = Number(uData.points);
        let level = getLevelByPoints(points);

        let newLevel = Math.round(level) + 10;
        let newPoints = getPointsByLevel(newLevel);

        db.ref(sUser.ref)
          .update({ points: newPoints })
          .then(() => {
            let msg = phrases[Math.floor(Math.random() * phrases.length)];
            msg += comp[Math.floor(Math.random() * comp.length)];
            this.msg.reply(msg + ": **+10 niveles**");
          })
          .catch((err) => log.error(err.message));
      });
    }
    if (probability(0.25) && !cultured) {
      let msg = this.beidou[Math.floor(Math.random() * this.beidou.length)];
      this.msg.channel.send(msg);
    }
  }
}
