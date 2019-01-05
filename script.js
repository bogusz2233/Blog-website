window.onload = function onloadScript() {
    if(document.getElementById("top_10") != null && document.getElementById("top_10").clientHeight > 20)
    {
        var container = document.getElementById("contentContainer");
        container.style.marginTop = "50px";
    }

}

function letPlaySnake() {
    location.href = "snake/snake.html";
}

// Skrypt służący do tego by cofać sie do głównej stron
// arg: timeToBack - liczba gałęzi o ile mamy sie cofnąć w folderach
function goToMain(timeToBack)
{
    var pathString ="";
    for(var i=0; i<timeToBack;i++)
    {
        pathString +="../"
    }
    pathString += "index.html"
    location.href = pathString;
}