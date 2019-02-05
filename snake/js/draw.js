const COLOR_BACKGROUND = "#7a969b";

//IMG
var HeadImgUp = new Image(40, 40);
var HeadImgDown = new Image(40, 40);
var HeadImgLeft = new Image(40, 40);
var HeadImgRight = new Image(40, 40);
var fruitImg = new Image(40, 40);
var tail1 = new Image(40, 40);
var tail2 = new Image(40, 40);
var tail3 = new Image(40, 40);
var tail4 = new Image(40, 40);
var tail5 = new Image(40, 40);
var tail6 = new Image(40, 40);
var tail7 = new Image(40, 40);
var tail8 = new Image(40, 40);
var tail9 = new Image(40, 40);
var tail10 = new Image(40, 40);

const drawSetup = () =>{
    HeadImgUp.src = "img/head4.png";
    HeadImgDown.src = "img/head2.png";
    HeadImgLeft.src = "img/head3.png";
    HeadImgRight.src = "img/head1.png";
    fruitImg.src = "img/fruit.png"
    tail1.src = "img/tail1.png"
    tail2.src = "img/tail2.png"
    tail3.src = "img/tail3.png"
    tail4.src = "img/tail4.png"
    tail5.src = "img/tail5.png"
    tail6.src = "img/tail6.png"
    tail7.src = "img/tail7.png"
    tail8.src = "img/tail8.png"
    tail9.src = "img/tail9.png"
    tail10.src = "img/tail10.png"
}
const backgroundReset = (argContex, argWidth, argHeight) => {
    // wyczyszczenie ekranu
    argContex.clearRect(0, 0, argWidth, argHeight);
    argContex.fillStyle = COLOR_BACKGROUND;
    argContex.fillRect(0, 0, argWidth, argHeight);
};

const drawFruit = (argContex, {xPos, yPos}) =>{
    argContex.drawImage(fruitImg, xPos, yPos);
};

const drawPlayer = (argContex, {xPos, yPos, dir}) =>{
    var playerIMG; 
    if(dir === "UP")
    {
        playerIMG = HeadImgUp;
    }
    else if(dir === "DOWN")
    {
        playerIMG = HeadImgDown;
    }
    else if(dir === "LEFT")
    {
        playerIMG = HeadImgLeft;
    }
    else 
    {
        playerIMG = HeadImgRight;
    }
    argContex.drawImage(playerIMG, xPos, yPos);
};

module.exports = {
    drawSetup,
    backgroundReset,
    drawFruit,
    drawPlayer
}