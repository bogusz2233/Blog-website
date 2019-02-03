// import '../../css/main/style.css';
// import '../../snake/style.css';
// import "../css/snake.css";
import "../../home/sass/style.scss";
import "../sass/snake.scss";
import "../style.css";
import {keyPressedService, getLastDir} from "./move";
import {getFruitPos, getPlayertPos, setupLogic} from "./logic";
import {setupScreen, gameDraw, getCanvansSize} from "./draw";

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

