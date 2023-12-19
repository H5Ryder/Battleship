// index.js

import createPlayer from "./player.js";
import createGameboard from "./gameboard.js";
import createShip from "./ship.js";
import {
  insertBoardGrid,
  addBoatsToGrid,
  removeHtmlContentByClass,
  setDataHit,
  write,
  changePlayInnerHtml,
  revealBoats,
  removeEventListenersFromPlayerRight
} from "./interface.js";

document.addEventListener("DOMContentLoaded", () => {
  insertBoardGrid("player-left");
  insertBoardGrid("player-right");

  var playButton = document.querySelector(".play");
  playButton.addEventListener("click", main);
});

function main() {
  var playButton = document.querySelector(".play");
  changePlayInnerHtml(playButton);

  //Clear board
  removeHtmlContentByClass("player-left");
  removeHtmlContentByClass("player-right");

  //Generate players
  let human = createPlayer(false, "player-left");
  let bot = createPlayer(true, "player-right");
  let humanTxtClass = "text-left";
  let botTxtClass = "text-right";

  //Load Static DOM Elements
  insertBoardGrid(human.classVal());
  insertBoardGrid(bot.classVal(), gameLoop, true);

  //Load Human Player Boat Positions
  addBoatsToGrid(human.board.boatMap(), human.classVal(), true);
  addBoatsToGrid(bot.board.boatMap(), bot.classVal(), false);

  //Reset text
  write(humanTxtClass, "");
  write(botTxtClass, "");

  function gameLoop(x, y, div) {
    //HUMAN ATTACK!------------------------------------------
    console.log("HUMAN ATTACK!------------------------------------------");

    //Mark attack on DOM & Disable button
    setDataHit(bot.classVal(), { x: x, y: y });

    //bot.board.logBoatMap();

    //Mark attack on gameboard (will also call ship.js)
    if (bot.board.receiveAttack(x, y)) {
      if (bot.board.areAllBoatsSunk()) {
        //Human Wins
        write(humanTxtClass, "I Win!");
        write(botTxtClass, "I Loose!");
        removeEventListenersFromPlayerRight();
        return;
      } else {
        write(humanTxtClass, "I Hit!");
      }

      //It's a hit!
    } else {
      //It's a miss!
      write(humanTxtClass, "Damn miss");
    }

    //BOT ATTACK!---------------------------------------------
    console.log("BOT ATTACK!---------------------------------------------");
    const attackPos = bot.attackAI(human.board.hitMap());
    console.log(`Attack pos bot => ${attackPos.x},${attackPos.y}`);
    setDataHit(human.classVal(), attackPos);

    //human.board.logBoatMap();

    if (human.board.receiveAttack(attackPos.x, attackPos.y)) {
      if (human.board.areAllBoatsSunk()) {
        //Robot Wins
        revealBoats(bot.classVal());
        write(botTxtClass, "I Win!");
        write(humanTxtClass, "I Loose!");
        removeEventListenersFromPlayerRight();
        return;
      } else {
        //It's a hit!

        write(botTxtClass, "I Hit!");

      }

    } else {
      //It's a miss!
      write(botTxtClass, "Damn miss");
    }
  }
}
