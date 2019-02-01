import {keyPressedService, getLastDir} from "./move";
import {getFruitPos, getPlayertPos, setupLogic} from "./logic";
import {setupScreen, gameDraw, getCanvansSize} from "./draw"

console.log("Lib loaded");

const gameLoop = () =>
{
    gameDraw();
}

window.onload = () =>{
    setupScreen(getFruitPos, getPlayertPos);
    setupLogic(getCanvansSize, getLastDir);
};

document.onkeypress = keyPressedService;


setInterval(gameLoop, 1000);

