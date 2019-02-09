let lastDirKeyChose = "NONE";
let keyWasService = true;
const getDirMove = () => {
    console.log("Góra");
}

const keyPressedService = (argEvent) =>{
    
    if(keyWasService)
    {
        if(argEvent.code === "KeyW")
        {
            lastDirKeyChose ="UP";
            keyWasService = false;
        }else if(argEvent.code === "KeyS")
        {
            lastDirKeyChose ="DOWN";
            keyWasService = false;
        }else if(argEvent.code === "KeyA")
        {
            lastDirKeyChose ="LEFT";
            keyWasService = false;
        }else if(argEvent.code === "KeyD")
        {
            lastDirKeyChose ="RIGHT";
            keyWasService = false;
        }
    }
}

const getLastDir = () =>{
    if(keyWasService)
    {
        lastDirKeyChose = "NONE"
        return lastDirKeyChose;
    }
    else 
    {
        keyWasService = true;
        return lastDirKeyChose;
    }
}
const arrowPressedUp = () => {
    if(keyWasService)
    {
        keyWasService = false;
        lastDirKeyChose = "UP";
    }
};
const arrowPressedDown = () => {
    if(keyWasService)
    {
        keyWasService = false;
        lastDirKeyChose = "DOWN";
    }
};
const arrowPressedLeft = () => {
    if(keyWasService)
    {
        keyWasService = false;
        lastDirKeyChose = "LEFT";
    }
};
const arrowPressedRigth = () => {
    if(keyWasService)
    {
        keyWasService = false;
        lastDirKeyChose = "RIGHT";
    }
};

module.exports = {
    getDirMove,
    keyPressedService,
    getLastDir,
    arrowPressedUp,
    arrowPressedDown,
    arrowPressedLeft,
    arrowPressedRigth,
};