import "../../home/sass/home.scss"
import "../sass/snake.scss";
import "../style.css";

import {keyPressedService, getLastDir,arrowPressedUp, 
        arrowPressedDown, arrowPressedLeft, arrowPressedRigth} from "./move";

import {drawSetup, backgroundReset, drawPlayer, drawFruit} from "./draw";
import {randomNewFruitPos, gameLogicPlayerMove} from "./logic"

const CANVANS_WIDTH = 400;
const CANVANS_HEIGHT = 360;

let canvansEl, contex;

let fruit = {
    "xPos"  : 40,
    "yPos"  : 40
};

let player ={
    "xPos"  : 0,
    "yPos"  : 0,
    "dir"   : "NONE"
};

console.log("Lib loaded");

const gameLoop = () =>
{
    gameLogic();
    gameDraw();
}

window.onload = () =>{
    canvansEl = document.getElementById("gameCanvans");
    contex = canvansEl.getContext('2d');

    canvansEl.width = CANVANS_WIDTH;
    canvansEl.height = CANVANS_HEIGHT;

    fruit = randomNewFruitPos(player, CANVANS_WIDTH, CANVANS_HEIGHT);

    drawSetup();

    document.onkeypress = keyPressedService;
    document.getElementsByClassName("arrow--up")[0].onclick = arrowPressedUp;
    document.getElementsByClassName("arrow--down")[0].onclick  = arrowPressedDown;
    document.getElementsByClassName("arrow--left")[0].onclick  = arrowPressedLeft;
    document.getElementsByClassName("arrow--right")[0].onclick  = arrowPressedRigth;
};



const gameDraw = () =>{
    backgroundReset(contex, CANVANS_WIDTH, CANVANS_HEIGHT);
    drawPlayer(contex, player);
    drawFruit(contex, fruit);
};

const gameLogic = () =>{
    gameLogicPlayerMove(player, fruit, CANVANS_WIDTH, CANVANS_HEIGHT, getLastDir());
};

setInterval(gameLoop, 400);

