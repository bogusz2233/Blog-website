var canvansEl;
var contex;

// screen looking
var CANVANS_WIDTH;
var CANVANS_HEIGHT;

// Do debugu:
const LOG_KEY_PRESSED = true;


// opis strzałek
const UP_ARROW = 38;
const DOWN_ARROW = 40;
const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;
const SPACE = 32;
const R_KEY = 114;
const R_KEY_BIG = 82;

const W_KEY = 119;
const W_KEY_BIG = 87;

const S_KEY = 115;
const S_KEY_BIG = 83;

const A_KEY = 97;
const A_KEY_BIG = 65;

const D_KEY = 100;
const D_KEY_BIG = 68;


//player const
const PLAYER_SIZE = 40;
const PLAYER_MOVE_STEP = PLAYER_SIZE;
const PLATER_DIR_NONE = 0;
const PLAYER_DIR_UP = 1;
const PLAYER_DIR_DOWN = 2;
const PLAYER_DIR_LEFT = 3;
const PLAYER_DIR_RIGTH = 4;

// Player param
var playerXpos = 0;
var playerYpos = 0;
var playerDir = PLATER_DIR_NONE;    //<< kierunek poruszania się gracza
var countTimeFlag = false;          //<< Zmienna określająca czy czas ma być odswiezaby
var gameTime = 0;                   //<< czas w sekundach jaki upłynął od poczatku rozgrywki
var previousSystemTime = 0;         //<< ostatnia sekunda dla której czas zostal zmieniony
var scores = 0;                     //<< punkty zdobyte przez gracza
var keyPressedFlag = false;         //<< zmienna określająca czy przycisk zostal wcisniety i wymaga obslugi

// Fruit param
var fruitXpos = 0;
var fruitYpos = 0;

//tail param
var tailArrayXPos = new Array(0);
var tailArrayYPos = new Array(0);
var tailArrayType = new Array(0);

//tail const
const TAIL_TYPE_LEFT = 0;
const TAIL_TYPE_RIGTH = 1;
const TAIL_TYPE_UP = 2;
const TAIL_TYPE_DOWN = 3;
const TAIL_TYPE_LEFT_UP = 4;
const TAIL_TYPE_LEFT_DOWN = 5;
const TAIL_TYPE_RIGTH_UP = 6;
const TAIL_TYPE_RIGTH_DOWN = 7;
const TAIL_TYPE_UP_RIGTH = 8;
const TAIL_TYPE_UP_LEFT = 9;
const TAIL_TYPE_DOWN_RIGTH = 10;
const TAIL_TYPE_DOWN_LEFT = 11;
// Color const
const COLOR_BACKGROUND = "#7a969b";
const COLOR_PLAYER_HEAD = "#404040";
const COLOR_PLAYER_TAIL = "rgb(200, 200, 224)";
const COLOR_FRUIT = "#ff8c28";

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

// funkcje do przypiecia
setInterval(gameLoop, 200);

//funcja wywolywana przy starcie aplikacji
window.onload = function setupScreen() {

    canvansEl = document.getElementById("canvasId");
    contex = canvansEl.getContext('2d');

    CANVANS_WIDTH = canvansEl.clientWidth;
    CANVANS_HEIGHT = canvansEl.clientHeight;
    // ustawienie szerokosci wyswietlania
    backgroundReset();
    randomNewFruitPos();

    //load img:
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
// game loop:
function gameLoop() {
    gameLogic();
    gameDraw();
}

//**********************************  Logika gry  **********************************
function gameLogic() {
    gameLogicTail();
    gameLogicPlayerMove();
    gameLogicScoresAndTime();
}

//funkcja zarządzająca logiką ogona weza
function gameLogicTail() {
    if (tailArrayType.length < scores) {
        addingNewTail();

    }

    if (tailArrayType.length > 0 && countTimeFlag) {
        // przesuniecie i pozbycie sie ostatniego elementu
        if (tailArrayType.length == scores) {
            tailArrayXPos.shift();
            tailArrayYPos.shift();
            tailArrayType.shift();
        }

        addingNewTail();
    }
}

function addingNewTail() {
    var lastElementIndex = tailArrayType.length - 1;
    tailArrayXPos.push(playerXpos);
    tailArrayYPos.push(playerYpos);
    if (playerDir == PLAYER_DIR_DOWN) {
        if (tailArrayType[lastElementIndex] == TAIL_TYPE_LEFT
            || tailArrayType[lastElementIndex] == TAIL_TYPE_DOWN_LEFT
            || tailArrayType[lastElementIndex] == TAIL_TYPE_UP_LEFT) {
            tailArrayType.push(TAIL_TYPE_LEFT_DOWN);
        }
        else if (tailArrayType[lastElementIndex] == TAIL_TYPE_RIGTH
            || tailArrayType[lastElementIndex] == TAIL_TYPE_DOWN_RIGTH
            || tailArrayType[lastElementIndex] == TAIL_TYPE_UP_RIGTH) {
            tailArrayType.push(TAIL_TYPE_RIGTH_DOWN);
        }
        else {
            tailArrayType.push(TAIL_TYPE_DOWN);
        }

    }
    else if (playerDir == PLAYER_DIR_UP) {
        if (tailArrayType[lastElementIndex] == TAIL_TYPE_LEFT
            || tailArrayType[lastElementIndex] == TAIL_TYPE_DOWN_LEFT
            || tailArrayType[lastElementIndex] == TAIL_TYPE_UP_LEFT) {
            tailArrayType.push(TAIL_TYPE_LEFT_UP);
        }
        else if (tailArrayType[lastElementIndex] == TAIL_TYPE_RIGTH
            || tailArrayType[lastElementIndex] == TAIL_TYPE_DOWN_RIGTH
            || tailArrayType[lastElementIndex] == TAIL_TYPE_UP_RIGTH) {
            tailArrayType.push(TAIL_TYPE_RIGTH_UP);
        }
        else {
            tailArrayType.push(TAIL_TYPE_UP);
        }
    }
    else if (playerDir == PLAYER_DIR_LEFT) {
        if (tailArrayType[lastElementIndex] == TAIL_TYPE_UP
            || tailArrayType[lastElementIndex] == TAIL_TYPE_LEFT_UP
            || tailArrayType[lastElementIndex] == TAIL_TYPE_RIGTH_UP) {
            tailArrayType.push(TAIL_TYPE_UP_LEFT);
        }
        else if (tailArrayType[lastElementIndex] == TAIL_TYPE_DOWN
            || tailArrayType[lastElementIndex] == TAIL_TYPE_LEFT_DOWN
            || tailArrayType[lastElementIndex] == TAIL_TYPE_RIGTH_DOWN) {
            tailArrayType.push(TAIL_TYPE_DOWN_LEFT);
        }
        else {
            tailArrayType.push(TAIL_TYPE_LEFT);
        }
    }
    else if (playerDir == PLAYER_DIR_RIGTH) {
        if (tailArrayType[lastElementIndex] == TAIL_TYPE_UP
            || tailArrayType[lastElementIndex] == TAIL_TYPE_LEFT_UP
            || tailArrayType[lastElementIndex] == TAIL_TYPE_RIGTH_UP) {
            tailArrayType.push(TAIL_TYPE_UP_RIGTH);
        }
        else if (tailArrayType[lastElementIndex] == TAIL_TYPE_DOWN
            || tailArrayType[lastElementIndex] == TAIL_TYPE_LEFT_DOWN
            || tailArrayType[lastElementIndex] == TAIL_TYPE_RIGTH_DOWN) {
            tailArrayType.push(TAIL_TYPE_DOWN_RIGTH);
        }
        else {
            tailArrayType.push(TAIL_TYPE_RIGTH);
        }
    }
}
function gameLogicPlayerMove() {
    // ruch gracza
    if (playerDir == PLAYER_DIR_UP) {
        playerYpos -= PLAYER_MOVE_STEP;
        countTimeFlag = true;
    }
    else if (playerDir == PLAYER_DIR_DOWN) {
        playerYpos += PLAYER_MOVE_STEP;
        countTimeFlag = true;
    }
    else if (playerDir == PLAYER_DIR_LEFT) {
        playerXpos -= PLAYER_MOVE_STEP;
        countTimeFlag = true;
    }
    else if (playerDir == PLAYER_DIR_RIGTH) {
        playerXpos += PLAYER_MOVE_STEP;
        countTimeFlag = true;
    }
    else if (playerDir == PLATER_DIR_NONE) {
        //Zatrzymanie gry 
        countTimeFlag = false;
    }

    // ograniczenie ruchu gracza:
    if (playerXpos < 0) playerXpos = CANVANS_WIDTH - PLAYER_SIZE;
    else if (playerXpos > CANVANS_WIDTH - PLAYER_SIZE) playerXpos = 0;
    else if (playerYpos < 0) playerYpos = CANVANS_HEIGHT - PLAYER_SIZE;
    else if (playerYpos > CANVANS_HEIGHT - PLAYER_SIZE) playerYpos = 0;

    if(keyPressedFlag == true) keyPressedFlag = false;
}

function gameLogicScoresAndTime() {
    // sprawdzenie czy owoc zostal osiagniety:
    if (playerXpos == fruitXpos && playerYpos == fruitYpos) {
        scores++;
        randomNewFruitPos();
    }
    //zliczanie czasu:
    var currentSystemTime = new Date().getSeconds();
    if (countTimeFlag && previousSystemTime != currentSystemTime) {
        previousSystemTime = currentSystemTime;
        gameTime++;
    }
    document.getElementById("scoreValue").textContent = "Punkty: " + scores;
    document.getElementById("timeValue").textContent = "Czas: " + gameTime;
}
//losowanie pozycji owocu
function randomNewFruitPos() {
    var randomMaxXValue = CANVANS_WIDTH / PLAYER_SIZE;
    var randomMaxYValue = CANVANS_HEIGHT / PLAYER_SIZE;

    //losowanie liczby
    var xRandomValue = Math.floor(Math.random() * randomMaxXValue);
    var yRandomValue = Math.floor(Math.random() * randomMaxYValue);

    // ustawienie nowej pozycji owocu na ekranie
    fruitXpos = xRandomValue * PLAYER_SIZE;
    fruitYpos = yRandomValue * PLAYER_SIZE;

    // print fruit pos
    var textToLog = "Pozycja owocu: (" + fruitXpos + ", " + fruitYpos + ")"
    console.log(textToLog);
}

//**********************************  To co sie renderuje  **********************************
function gameDraw() {
    backgroundReset();

    //rysowanie owocu:
    contex.drawImage(fruitImg, fruitXpos, fruitYpos);
    var preLastElementIndex = tailArrayType.length -2;  // drugi od końca element
    //rysowanie ogona
    for (var i = 0; i < tailArrayType.length; i++) {
        if(i == 0)
        {
            if((tailArrayType.length - 1 == 0 && playerDir == PLAYER_DIR_UP)
            || tailArrayType[1] == TAIL_TYPE_UP 
            || tailArrayType[1] == TAIL_TYPE_UP_LEFT
            || tailArrayType[1] == TAIL_TYPE_UP_RIGTH)
            {
                contex.drawImage(tail7, tailArrayXPos[i], tailArrayYPos[i]); 
            }
            else if((tailArrayType.length - 1 == 0 && playerDir == PLAYER_DIR_RIGTH)
            || tailArrayType[1] == TAIL_TYPE_RIGTH
            || tailArrayType[1] == TAIL_TYPE_RIGTH_UP
            || tailArrayType[1] == TAIL_TYPE_RIGTH_DOWN)
            {
                contex.drawImage(tail8, tailArrayXPos[i], tailArrayYPos[i]); 
            }
            else if((tailArrayType.length - 1 == 0 && playerDir == PLAYER_DIR_DOWN)
            || tailArrayType[1] == TAIL_TYPE_DOWN 
            || tailArrayType[1] == TAIL_TYPE_DOWN_LEFT
            || tailArrayType[1] == TAIL_TYPE_DOWN_RIGTH)
            {
                contex.drawImage(tail9, tailArrayXPos[i], tailArrayYPos[i]); 
            }
            else if((tailArrayType.length - 1 == 0 && playerDir == PLAYER_DIR_LEFT)
            || tailArrayType[1] == TAIL_TYPE_LEFT
            || tailArrayType[1] == TAIL_TYPE_LEFT_UP
            || tailArrayType[1] == TAIL_TYPE_LEFT_DOWN)
            {
                contex.drawImage(tail10, tailArrayXPos[i], tailArrayYPos[i]); 
            }
        }
        else if (tailArrayType[i] == TAIL_TYPE_LEFT || tailArrayType[i] == TAIL_TYPE_RIGTH) {
            contex.drawImage(tail1, tailArrayXPos[i], tailArrayYPos[i]);
        }
        else if (tailArrayType[i] == TAIL_TYPE_UP || tailArrayType[i] == TAIL_TYPE_DOWN) {
            contex.drawImage(tail2, tailArrayXPos[i], tailArrayYPos[i]);
        }
        else if (tailArrayType[i] == TAIL_TYPE_LEFT_UP) {
            contex.drawImage(tail5, tailArrayXPos[i], tailArrayYPos[i]);
        }
        else if (tailArrayType[i] == TAIL_TYPE_LEFT_DOWN) {
            contex.drawImage(tail6, tailArrayXPos[i], tailArrayYPos[i]);
        }
        else if (tailArrayType[i] == TAIL_TYPE_RIGTH_UP) {
            contex.drawImage(tail3, tailArrayXPos[i], tailArrayYPos[i]);
        }
        else if (tailArrayType[i] == TAIL_TYPE_RIGTH_DOWN) {
            contex.drawImage(tail4, tailArrayXPos[i], tailArrayYPos[i]);
        }
        else if (tailArrayType[i] == TAIL_TYPE_DOWN_LEFT) {
            contex.drawImage(tail3, tailArrayXPos[i], tailArrayYPos[i]);
        }
        else if (tailArrayType[i] == TAIL_TYPE_DOWN_RIGTH) {
            contex.drawImage(tail5, tailArrayXPos[i], tailArrayYPos[i]);
        }
        else if (tailArrayType[i] == TAIL_TYPE_UP_LEFT) {
            contex.drawImage(tail4, tailArrayXPos[i], tailArrayYPos[i]);
        }
        else if (tailArrayType[i] == TAIL_TYPE_UP_RIGTH) {
            contex.drawImage(tail6, tailArrayXPos[i], tailArrayYPos[i]);
        }
    }

    if (playerDir == PLAYER_DIR_LEFT) {
        contex.drawImage(HeadImgLeft, playerXpos, playerYpos);
    }
    else if (playerDir == PLAYER_DIR_RIGTH) {
        contex.drawImage(HeadImgRight, playerXpos, playerYpos);
    }
    else if (playerDir == PLAYER_DIR_UP) {
        contex.drawImage(HeadImgUp, playerXpos, playerYpos);
    }
    else if (playerDir == PLAYER_DIR_DOWN) {
        contex.drawImage(HeadImgDown, playerXpos, playerYpos);
    }
    else {
        contex.drawImage(HeadImgRight, playerXpos, playerYpos);
    }
}

//**********************************  Obsługa przycisków  **********************************
function keyPressFunction(e) {
    var keyPressed = e.keyCode | e.which;
    if (!keyPressedFlag) {
        if (keyPressed == D_KEY || keyPressed == D_KEY_BIG && !(scores > 0 && playerDir == PLAYER_DIR_LEFT)) {
            playerDir = PLAYER_DIR_RIGTH;
            keyPressedFlag = true;
        }
        else if (keyPressed == A_KEY || keyPressed == A_KEY_BIG && !(scores > 0 && playerDir == PLAYER_DIR_RIGTH)) {
            playerDir = PLAYER_DIR_LEFT;
            keyPressedFlag = true;
        }
        else if (keyPressed == W_KEY || keyPressed == W_KEY_BIG && !(scores > 0 && playerDir == PLAYER_DIR_DOWN)) {
            playerDir = PLAYER_DIR_UP;
            keyPressedFlag = true;
        }
        else if (keyPressed == S_KEY || keyPressed == S_KEY_BIG && !(scores > 0 && playerDir == PLAYER_DIR_UP)) {
            playerDir = PLAYER_DIR_DOWN;
            keyPressedFlag = true;
        }
        else if (keyPressed == SPACE) {
            playerDir = PLATER_DIR_NONE;
        }
        else if (keyPressed == R_KEY || keyPressed == R_KEY_BIG) {
            // zresetowanie gry(!)
            gameReset();
        }
        if (LOG_KEY_PRESSED) console.log("Wcisnieto: " + keyPressed);
    }
}

// resetowanie rozgrywki:
function gameReset() {
    /*
    countTimeFlag = false;
    randomNewFruitPos();
    gameTime = 0;
    scores = 0;
    playerDir = PLATER_DIR_NONE;
    */
    location.href = "snake.html";
}


// funkcja służąca do resetowanie tla
function backgroundReset() {
    // wyczyszczenie ekranu
    contex.clearRect(0, 0, CANVANS_WIDTH, CANVANS_HEIGHT);
    contex.fillStyle = COLOR_BACKGROUND;
    contex.fillRect(0, 0, CANVANS_WIDTH, CANVANS_HEIGHT);
}

