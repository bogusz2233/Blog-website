let lastDirKeyChose = "NONE";
const getDirMove = () => {
    console.log("Góra");
}

const keyPressedService = (argEvent) =>{
    
    if(argEvent.code === "KeyW")
    {
        lastDirKeyChose ="UP";
    }else if(argEvent.code === "KeyS")
    {
        lastDirKeyChose ="DOWN";
    }else if(argEvent.code === "KeyA")
    {
        lastDirKeyChose ="LEFT";
    }else if(argEvent.code === "KeyD")
    {
        lastDirKeyChose ="RIGHT";
    }
    console.log(argEvent);
}

const getLastDir = () =>{
    return lastDirKeyChose;
}
module.exports = {
    getDirMove,
    keyPressedService,
    getLastDir,
};