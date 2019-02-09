const PLAYER_SIZE = 40;

function Tail(argXpos, argYPos, argType)
{
    this.xPos = argXpos;
    this.yPos = argYPos;
    this.type = argType;
}

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

const gameLogicTail = ({xPos, yPos, dir, tails}) =>{
    
    
    
    if(tails.length > 0)
    {
        let firstType = tails[0].type;
        console.log("Tablica: ", firstType);
        if((dir == "LEFT" && typeMatch(firstType,1,3,4) )//tails[0].type == 1 || tails[0].type == 3 || tails[0].type == 4 || tails[0].type == 10)) 
        || (dir == "RIGTH" && typeMatch(firstType,1,5,6) ) )
        {
             tails.unshift(new Tail(xPos, yPos, 1));
        }
        else if((dir == "UP" && typeMatch(firstType,2,3,5)) || (dir == "DOWN" && typeMatch(firstType,2,4, 6)))
        {
            tails.unshift(new Tail(xPos, yPos, 2));
        }
        else if((dir == "LEFT" && typeMatch(firstType,2,4,6)) || (dir == "UP" && typeMatch(firstType,1,5, 6)))
        {
            tails.unshift(new Tail(xPos, yPos, 3));
        }
        else if((dir == "LEFT" && typeMatch(firstType,2,3,5)) || (dir == "DOWN" && typeMatch(firstType,1,5, 6)))
        {
            tails.unshift(new Tail(xPos, yPos, 4));
        }
        else if((dir == "RIGTH" && typeMatch(firstType,2,4,6)) || (dir == "UP" && typeMatch(firstType,1,3, 4)))
        {
            tails.unshift(new Tail(xPos, yPos, 5));
        }
        else if((dir == "RIGTH" && typeMatch(firstType,2,3,5)) || (dir == "DOWN" && typeMatch(firstType,1,3, 4)))
        {
            tails.unshift(new Tail(xPos, yPos, 6));
        }
        else 
        {
            tails.unshift(new Tail(xPos, yPos, 7)); 
        }
        //tails.pop();
        //koncówka
        if(tails.length == 1)
        {
            if(dir == "UP")
            {
                tails.unshift(new Tail(xPos, yPos, 7));
            }
            else if(dir == "DOWN")
            {
                tails.unshift(new Tail(xPos, yPos, 9));
            }
            else if(dir == "LEFT")
            {
                tails.unshift(new Tail(xPos, yPos, 10));
            }
            else if(dir == "RIGTH")
            {
                tails.unshift(new Tail(xPos, yPos, 8));
            }
        }
        else
        {
            let thirdLastType = tails[tails.length -2].type;
            if((thirdLastType == 2) || (thirdLastType == 4) || (thirdLastType == 6))
            {
                tails.unshift(new Tail(xPos, yPos, 7));
            }
            else if((thirdLastType == 1) || (thirdLastType == 5) || (thirdLastType == 6))
            {
                tails.unshift(new Tail(xPos, yPos, 8));
            }
        }
        tails.pop();
    }
    
    
}
const typeMatch = (argTailType, type1, type2, type3) =>{
    return (argTailType == type1 || argTailType == type2 || argTailType == type3);
}

module.exports = {
    randomNewFruitPos,
    gameLogicPlayerMove,
    gameLogicTail
}