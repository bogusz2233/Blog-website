import "../../home/sass/home.scss"
import "../sass/snake.scss";
import "../style.css";

import {keyPressedService, getLastDir,arrowPressedUp, 
        arrowPressedDown, arrowPressedLeft, arrowPressedRigth} from "./move";

import {drawSetup, backgroundReset, drawPlayer, drawFruit} from "./draw";
import {randomNewFruitPos, gameLogicPlayerMove, gameLogicTail} from "./logic"

const CANVANS_WIDTH = 440;
const CANVANS_HEIGHT = 320;

let canvansEl, contex;
let gameTime = 0;
let timeStart = new Date().getTime();
let scoreValue;

let fruit = {
    "xPos"  : 40,
    "yPos"  : 40
};

let player ={
    "xPos"  : 0,
    "yPos"  : 0,
    "dir"   : "NONE",
    "points": 0,
    "tails" : new Array()
};

function Tail(argXpos, argYPos, argType)
{
    this.xPos = argXpos;
    this.yPos = argYPos;
    this.type = argType;
}
console.log("Lib loaded");

const gameLoop = () =>
{
    gameLogic(player, fruit);
 
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

    timeValue = document.getElementById("timeValue");
    scoreValue = document.getElementById("scoreValue");
    
};



const gameDraw = () =>{
    let timeActual = new Date().getTime();
    let diffrenceTime = (timeStart);
    backgroundReset(contex, CANVANS_WIDTH, CANVANS_HEIGHT);
    drawPlayer(contex, player);
    drawFruit(contex, fruit);
    timeValue.textContent = `Czas: ${((timeActual - timeStart)/1000).toFixed(0)}`;
};

const gameLogic = () =>{
    gameLogicTail(player);
    gameLogicPlayerMove(player, fruit, CANVANS_WIDTH, CANVANS_HEIGHT, getLastDir());
    
    
    if(fruit.xPos == player.xPos && fruit.yPos == player.yPos)
    {
        let newObj = new Tail(player.xPos, player.yPos, 1);
        fruit = randomNewFruitPos(player, CANVANS_WIDTH, CANVANS_HEIGHT);
        document.getElementById("scoreValue").textContent = `Punkty: ${++player.points}`;
        player.tails.unshift(newObj);
        console.log(player.tails);
    }
};

setInterval(gameLoop, 400);

