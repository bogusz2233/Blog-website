console.log("logic lib");

let getCanvansSize;

let fruit = {
    "xPos"  : 0,
    "yPos"  : 0
};

let player ={
    "xPos"  : 0,
    "yPos"  : 0
};

const getFruitPos = () => {
    return fruit;
};

const getPlayertPos = () => {
    return player;
};

const setupLogic = (argGetCanvansSize) =>{
    getCanvansSize = argGetCanvansSize;
    randNewFruitPos();
};

const randNewFruitPos = () =>{
    let {CANVANS_WIDTH, CANVANS_HEIGHT} = getCanvansSize();


    fruit.xPos = Math.floor(Math.random() * CANVANS_WIDTH/40) * 40;
    fruit.yPos = Math.floor(Math.random() * CANVANS_HEIGHT/40) * 40;
    console.log(fruit);
};

module.exports = {
    getFruitPos,
    getPlayertPos,
    setupLogic,
};