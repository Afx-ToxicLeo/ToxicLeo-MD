/* Copyright (C) 2022 X-Electra.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
X-Asena - X-Electra
*/

const events = require("../lib/event");
const {
  command,
  isPrivate,
  tiny,
  serif_B,
  clockString,
} = require("../lib");
const { OWNER_NAME, BOT_NAME } = require("../config");
const { hostname, uptime } = require("os");
command(
  {
    pattern: "menu",
    fromMe: isPrivate,
    desc: "Show All commands",
    dontAddCommandList: true,
  },
  async (message,match, { prefix }) => {
    let [date, time] = new Date()
      .toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
      .split(",");
    let menu = `╭━━━━━ᆫ ${BOT_NAME} ᄀ━━━
┃ ⎆  *OWNER* :  ${OWNER_NAME}
┃ ⎆  *PREFIX* : ${prefix}
┃ ⎆  *HOST NAME* :${hostname()}
┃ ⎆  *DATE* : ${date}
┃ ⎆  *TIME* : ${time}
┃ ⎆  *COMMANDS* : ${events.commands.length} 
┃ ⎆  *UPTIME* : ${clockString(uptime())} 
╰━━━━━━━━━━━━━━━
╭╼╾╼╾╼╾╼╾╼╾╼╾╼╾╼\n╽`;
    let cmnd = [];
    let cmd;
    let category = [];
    events.commands.map((command, num) => {
      if (command.pattern) {
        cmd = command.pattern
          .toString()
          .match(/(\W*)([A-Za-züşiğ öç1234567890]*)/)[2];
      }

      if (!command.dontAddCommandList && cmd !== undefined) {
        let type;
        if (!command.type) {
          type = "misc";
        } else {
          type = command.type.toLowerCase();
        }

        cmnd.push({ cmd, type: type });

        if (!category.includes(type)) category.push(type);
      }
    });
    cmnd.sort();
    category.sort().forEach((cmmd) => {
      menu += `\n┠─────〔${cmmd}〕\n╿\n╿╭╼╾╼╾╼╾╼╾╼╾╼╾╼╾╼`;
      let comad = cmnd.filter(({ type }) => type == cmmd);
      comad.forEach(({ cmd }, num) => {
        menu += `\n╿┠ ${cmd.trim()}`;
      });
      menu += `\n╿╰╼╾╼╾╼╾╼╾╼╾╼╾╼╾╼\n╿`;
    });

    menu += `\n╰╼╾╼╾╼╾╼╾╼╾╼╾╼╾╼╾╼`;
    return await message.client.sendMessage(message.jid, {
      image: { url: `https://i.postimg.cc/pXZW2gSv/null-20220918-WA0002.jpg` },
      caption: tiny(menu.toUpperCase()),
      footer: tiny(
        `ToxicLeo Bot\nVersion : ${require("../package.json").version}`
      ),
      buttons: [
        {
          buttonId: `${prefix}ping`,
          buttonText: { displayText: tiny("Ping") },
        },
        {
          buttonId: `${prefix}list`,
          buttonText: { displayText: tiny("List") },
        },
      ],
    });
  }
);
/* Copyright (C) 2022 X-Electra.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
X-Asena - X-Electra
*/

command(
  {
    pattern: "list",
    fromMe: isPrivate,
    desc: "Show All commands",
    dontAddCommandList: true,
  },
  async (message, match, { prefix }) => {
    let menu = `╭───〔 ${tiny("x-asena command list")} 〕────\n`;

    let cmnd = [];
    let cmd, desc;
    events.commands.map((command) => {
      if (command.pattern) {
        cmd = command.pattern
          .toString()
          .match(/(\W*)([A-Za-züşiğ öç1234567890]*)/)[2];
      }
      if (command.desc) {
        desc = command.desc;
      } else {
        desc = false;
      }
      if (!command.dontAddCommandList && cmd !== undefined) {
        cmnd.push({ cmd, desc });
      }
    });
    cmnd.sort();
    cmnd.forEach(({ cmd, desc }, num) => {
      menu += `├ ${(num += 1)} *${tiny(cmd.trim())}*\n`;
      if (desc) menu += `├ ${tiny("use : " + desc)}\n`;
    });
    menu += `╰──────────────────────────`;
    return await message.reply(menu);
  }
);
