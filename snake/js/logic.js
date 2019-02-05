const PLAYER_SIZE = 40;

const randomNewFruitPos = (argPlayer, argWidth, argheight) =>{

    var randomMaxXValue = argWidth / PLAYER_SIZE;
    var randomMaxYValue = argheight / PLAYER_SIZE;
    var countRandTime = 1;
    //losowanie liczby
    var xRandomValue = Math.floor(Math.random() * randomMaxXValue);
    var yRandomValue = Math.floor(Math.random() * randomMaxYValue);

    // ustawienie nowej pozycji owocu na ekranie
    fruitXpos = xRandomValue * PLAYER_SIZE;
    fruitYpos = yRandomValue * PLAYER_SIZE;
  
    // print fruit pos
    var textToLog = "Pozycja owocu: (" + fruitXpos + ", " + fruitYpos + "), losowano: " + countRandTime + " razy";
    console.log(textToLog);
    return {
        "xPos" : fruitXpos, 
        "yPos" : fruitYpos};
}

const gameLogicPlayerMove = (argPlayer, argFruit, argWidth, argHeight, argMoveDir) =>{
    if(argMoveDir !=="NONE")
    {
        argPlayer.dir = argMoveDir;
    }

    if(argPlayer.dir == "UP")
    {
        argPlayer.yPos -= PLAYER_SIZE;
    }
    else if(argPlayer.dir == "DOWN")
    {
        argPlayer.yPos += PLAYER_SIZE;
    }
    else if(argPlayer.dir == "LEFT")
    {
        argPlayer.xPos -= PLAYER_SIZE;
    }
    else if(argPlayer.dir == "RIGHT")
    {
        argPlayer.xPos += PLAYER_SIZE;
    }
 

    if(argPlayer.xPos > argWidth - PLAYER_SIZE) argPlayer.xPos = 0;
    else if(argPlayer.xPos < 0) argPlayer.xPos = argWidth - PLAYER_SIZE;
    else if(argPlayer.yPos > argHeight - PLAYER_SIZE) argPlayer.yPos = 0;
    else if(argPlayer.yPos < 0) argPlayer.yPos = argHeight - PLAYER_SIZE;
};
module.exports = {
    randomNewFruitPos,
    gameLogicPlayerMove
}