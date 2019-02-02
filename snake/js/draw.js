//import {getPlayertPos} from "./logic";
let canvansEl;
let contex;

let getFruitPos;    //<<Funckcja do pobrania owocu
let getPlayertPos;

// Color const
const COLOR_BACKGROUND = "#7a969b";
let CANVANS_WIDTH;
let CANVANS_HEIGHT;

//IMG
let HeadImgUp = new Image(40, 40);
let HeadImgDown = new Image(40, 40);
let HeadImgLeft = new Image(40, 40);
let HeadImgRight = new Image(40, 40);
let fruitImg = new Image(40, 40);
let tail1 = new Image(40, 40);
let tail2 = new Image(40, 40);
let tail3 = new Image(40, 40);
let tail4 = new Image(40, 40);
let tail5 = new Image(40, 40);
let tail6 = new Image(40, 40);
let tail7 = new Image(40, 40);
let tail8 = new Image(40, 40);
let tail9 = new Image(40, 40);
let tail10 = new Image(40, 40);

const setupScreen = (argGetFruitFunc, argGetPlayertPos) => {

    canvansEl = document.getElementById("gameCanvans");
    contex = canvansEl.getContext('2d');

    getFruitPos = argGetFruitFunc;
    getPlayertPos = argGetPlayertPos;

    console.log(window.screen.availWidth);
    if(window.screen.availWidth > 10)
    {
        canvansEl.width = 520;
        canvansEl.height = 400;
        CANVANS_WIDTH = 520;
        CANVANS_HEIGHT = 400;
    }
    else
    {
        canvansEl.width = 360;
        canvansEl.height = 320;
        CANVANS_WIDTH = 360;
        CANVANS_HEIGHT = 320;
    }
    backgroundReset();

    //load img:
    HeadImgUp.src = "img/head4.png";
    HeadImgDown.src = "img/head2.png";
    HeadImgLeft.src = "img/head3.png";
    HeadImgRight.src = "img/head1.png";
    fruitImg.src = "img/fruit.png";
    tail1.src = "img/tail1.png";
    tail2.src = "img/tail2.png";
    tail3.src = "img/tail3.png";
    tail4.src = "img/tail4.png";
    tail5.src = "img/tail5.png";
    tail6.src = "img/tail6.png";
    tail7.src = "img/tail7.png";
    tail8.src = "img/tail8.png";
    tail9.src = "img/tail9.png";
    tail10.src = "img/tail10.png";

    console.log("setupScreen()");
};

const gameDraw = () => {
    let fruitPos = getFruitPos();
    let playerPos = getPlayertPos();

    backgroundReset();
    
    contex.drawImage(fruitImg, fruitPos.xPos, fruitPos.yPos);   // rysowanie owocu
    contex.drawImage(HeadImgRight, playerPos.xPos, playerPos.yPos);   // rysowanie owocu
};
// funkcja służąca do resetowanie tla
const backgroundReset  = () => {
    // wyczyszczenie ekranu
    contex.clearRect(0, 0, CANVANS_WIDTH, CANVANS_HEIGHT);
    contex.fillStyle = COLOR_BACKGROUND;
    contex.fillRect(0, 0, CANVANS_WIDTH, CANVANS_HEIGHT);
    
};

const getCanvansSize = () => {
    let windowCanvans = {
        "CANVANS_WIDTH": CANVANS_WIDTH,
        "CANVANS_HEIGHT": CANVANS_HEIGHT,
    };
    return {CANVANS_WIDTH, CANVANS_HEIGHT} 
};
module.exports = {
    setupScreen,
    gameDraw,
    getCanvansSize,
};