import { Message } from "discord.js";

// Source imports
import { probability } from "../util/utils";

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
    if (
      msg.content.toLowerCase() === "feliz jueves" &&
      new Date().getDay() == 4
    )
      this.happyThursday();
  }

  /**
   * Sends an Asuka Langley gif!
   *
   * 3% prob to get an Asuka Langley gif
   * 0.1% prob to get a Rei Chikita gif
   * @returns {void} Nothing
   */

  private happyThursday(): void {
    if (probability(0.3)) {
      let gif = Math.floor(Math.random() * this.asuka.length);
      this.msg.channel.send(this.asuka[gif]);
      return;
    } else if (probability(0.01)) {
      let img = Math.floor(Math.random() * this.rei.length);
      this.msg.channel.send(this.rei[img]);
      return;
    }
  }
}
