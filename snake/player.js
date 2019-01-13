const PLAYER_MOVE_STEP = PLAYER_SIZE;
const PLATER_DIR_NONE = 0;
const PLAYER_DIR_UP = 1;
const PLAYER_DIR_DOWN = 2;
const PLAYER_DIR_LEFT = 3;
const PLAYER_DIR_RIGTH = 4;

class Player{
    constructor(xPos,yPos){
        this.xPos = xPos;
        this.yPos = yPos;
        this.playerDir = PLATER_DIR_NONE
        //image setup:
        setupImage();
    }

    setupImage() 
    {
        this.HeadImgUp = new Image(40, 40);
        this.HeadImgDown = new Image(40, 40);
        this.HeadImgLeft = new Image(40, 40);
        this.HeadImgRight = new Image(40, 40);

        this.HeadImgUp.src = "img/head4.png";
        this.HeadImgDown.src = "img/head2.png";
        this.HeadImgLeft.src = "img/head3.png";
        this.HeadImgRight.src = "img/head1.png";
    }

}