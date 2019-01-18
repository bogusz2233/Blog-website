﻿// Backend server const:
const SERVER_CONTETN_URL = "https://bogusz-blog.herokuapp.com/HomePageData";
const CONTENT_COUNT_QUERY = "askForNumber"; // true/false
const CONTENT_NUM_QUERY = "contentNumber";  // 1,2,3 ...

// przy zaladowaniu strony
window.onload = () => {
    //podsuniecie kontentu do góry gdy wyświetlana jest reklama na serwerze
    if (document.getElementById("top_10") != null && document.getElementById("top_10").clientHeight > 20) {
        var container = document.getElementById("contentContainer");
        container.style.marginTop = "50px";
    }
};

// function to create all window and querry that from data base
var createContentContainerView = () =>{

    getConentCount().then((resultCount) =>{
        //console.log(resultCount);
        return loadAllContentWindow(resultCount);
    }).then( (result) =>{

    }).catch( (errorMes) =>{
        console.log(errorMes);
    });
};

/* Add new post:
argTitle - tytuł postu wyswietlany w górnej belce
argOverloopText - tekst który wyświetla sie po najechaniu na post
argImgSrc - sciezka do zdjecia które ma zosta wyświetlone w poscie
argImgBackround - tlo które wyswietla sie pod zdjeciem
argTextDesc - krótki opis postu
argLinkToPost - link do postu
*/
var addNewPost = (argTitle, argOverloopText, argImgSrc, argImgBackround, argTextDesc, argLinkToPost) => {
    const noText = "(!) Nie można było wczytać tekstu lub został on nie dodany (!)";
    let dataBlock = document.createElement('div'); // main block
    let dataBlockBar = document.createElement('div');
    let titleH2 = document.createElement("h2");
    let overLoop = document.createElement("div");
    let overLoopText = document.createElement("div");
    let dataBlockImg = document.createElement("img");
    let dataBlockDesc = document.createElement("div");

    //class setup
    dataBlock.className = "dataBlock";
    dataBlockBar.className = "dataBlockBar"
    overLoop.className = "overlay";
    overLoopText.className = "text";
    dataBlockDesc.className = "desc";

    // main bloc setup
    dataBlock.appendChild(dataBlockBar);
    dataBlock.appendChild(overLoop);
    dataBlock.appendChild(dataBlockImg);
    dataBlock.appendChild(dataBlockDesc);


    // dataBlock bar setup
    titleH2.textContent = argTitle;
    dataBlockBar.appendChild(titleH2);

    //overloop
    overLoopText.textContent = argOverloopText;
    overLoop.appendChild(overLoopText);

    //img
    dataBlockImg.src = argImgSrc;
    dataBlockImg.onerror = function () { onImageError(dataBlockImg) };
    dataBlockImg.style.background = argImgBackround;

    //desc 
    if (argTextDesc != undefined) dataBlockDesc.textContent = argTextDesc;
    else {
        dataBlockDesc.textContent = noText;
        dataBlockDesc.style.color = "#bf432d";
    }
    dataBlockDesc.style.whiteSpace = "pre-wrap";

    //dodanie linku:
    dataBlock.onclick = function () { location.href = argLinkToPost; };

    // dodanie stworzonego bloku do kontenera
    document.getElementById("contentContainer").append(dataBlock); // dodaje dziecko na początku, tak że najwyżej wyświetlany jest ostatni
};

// funkcja wywowyłana podczas błedu
var onImageError = (argDataImg) => {
    argDataImg.src = "img/noimage.jpg";
    argDataImg.style.background = "#4f5051";
}

// Skrypt służący do tego by cofać sie do głównej stron
// arg: timeToBack - liczba gałęzi o ile mamy sie cofnąć w folderach
var goToMain = (timeToBack) => {
    var pathString = "";
    for (var i = 0; i < timeToBack; i++) {
        pathString += "../"
    }
    pathString += "index.html"
    location.href = pathString;
}

// function to check how many content are in base 
var getConentCount = () => {
    return new Promise((resolve, reject) => {
        const xmlhttp = new XMLHttpRequest();
        let url = `${SERVER_CONTETN_URL}?${CONTENT_COUNT_QUERY}=true`;
        xmlhttp.open("GET", url, true);
        xmlhttp.onload = () => {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var jsonResponse = JSON.parse(xmlhttp.responseText);
                if (jsonResponse.messageError == "ALL_OK") {
                    resolve(jsonResponse.contentNumber)
                }
                else {
                    reject("Could not load url");
                }
            }
        };
        xmlhttp.onerror = () => reject(xmlhttp.statusText);
        xmlhttp.send();
    });
};

//function to load one window from base
var createContet = (argWindowNO, argWindowCount,resolve,reject) =>{
    let xmlhttp = new XMLHttpRequest();
    let url = `${SERVER_CONTETN_URL}?${CONTENT_NUM_QUERY}=${argWindowNO}`;
    xmlhttp.open("GET", url, true);
    xmlhttp.onload = () => {
        let jsonResponse = JSON.parse(xmlhttp.responseText);
        addNewPost(jsonResponse.body.title, jsonResponse.body.secondTitle, "img/noimage.jpg", "#000000", jsonResponse.body.desc);
        if(argWindowNO == argWindowCount -1)
        {
            resolve(console.log("ALL loaded!"));
        }
        else
        {
            createContet(argWindowNO + 1,argWindowCount,resolve,reject);
        }
        
    };
    xmlhttp.onerror = () => reject(xmlhttp.statusText);
    xmlhttp.send();
};

//function to load all posts from base
var loadAllContentWindow = (argWindowCount) =>{
    return new Promise((resolve, reject) => {
        createContet(0,argWindowCount, resolve, reject);
    });
};
