const Promise = require('es6-promise').Promise;
const axiosGet = require("axios").get;
//import {get as axiosGet} from "axios";

// Backend server const:
const SERVER_CONTETN_URL = "https://bogusz-blog.herokuapp.com/HomePageData";
const SERVER_URL = "https://bogusz-blog.herokuapp.com";
const CONTENT_COUNT_QUERY = "askForNumber"; // true/false
const CONTENT_NUM_QUERY = "contentNumber";  // 1,2,3 ...

const addNewPost = (argTitle, argOverloopText, argImgSrc, argImgBackround, argTextDesc, argLinkToPost) => {
    const noText = "(!) Nie można było wczytać tekstu lub został on nie dodany (!)";
    let dataBlock = document.createElement('div'); // main block
    let dataBlockBar = document.createElement('div');
    let titleH2 = document.createElement("h2");
    let overLoop = document.createElement("div");
    let overLoopText = document.createElement("div");
    let dataBlockImg = document.createElement("img");
    let dataBlockDesc = document.createElement("div");
    let dataBlockParag = document.createElement("p");
    //class setup
    dataBlock.className = "dataBlock";
    dataBlockBar.className = "dataBlockBar"
    overLoop.className = "overlay";
    overLoopText.className = "text";
    dataBlockDesc.className = "desc";
    dataBlockImg.className = "dataBlockImg";
    dataBlockDesc.className = "dataBlockDesc";
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

    //desc 
    dataBlockDesc.appendChild(dataBlockParag);
    //img
    if (argImgSrc === undefined) {
        console.log(`${SERVER_CONTETN_URL}/noimage.jpg`);
        dataBlockImg.src = `${SERVER_CONTETN_URL}/noimage.jpg`;
        dataBlockImg.style.background = "#4f5051";
    }
    else {
        dataBlockImg.src = `${SERVER_URL}/${argImgSrc}`;
        dataBlockImg.style.background = argImgBackround;
    }
    dataBlockImg.onerror = function () { onImageError(dataBlockImg) };


    //desc 
    if (argTextDesc != undefined) dataBlockParag.textContent = argTextDesc;
    else {
        dataBlockParag.textContent = noText;
        dataBlockDesc.style.color = "#bf432d";
    }

    //dodanie linku:
    dataBlock.onclick = () => {
        if (argLinkToPost != undefined)
            location.href = argLinkToPost;
    };

    // dodanie stworzonego bloku do kontenera
    let childFirst = document.getElementsByClassName("contentContainer")[0].children[0];
    document.getElementsByClassName("contentContainer")[0].insertBefore(dataBlock, childFirst);//appendChild(dataBlock);
};

const loadAllContentWindow = (argWindowCount) => {
    return new Promise((resolve, reject) => {
        createContet(0, argWindowCount, resolve, reject);
    });
};

const createContet = (argWindowNO, argWindowCount, resolve, reject) => {
    let xmlhttp = new XMLHttpRequest();
    let url = `${SERVER_CONTETN_URL}?${CONTENT_NUM_QUERY}=${argWindowNO}`;
    xmlhttp.open("GET", url, true);
    xmlhttp.onload = () => {
        let jsonResponse = JSON.parse(xmlhttp.responseText);
        addNewPost(jsonResponse.body.title, jsonResponse.body.secondTitle, jsonResponse.body.imgScr, jsonResponse.body.bckImgColor, jsonResponse.body.desc, jsonResponse.body.link);
        if (argWindowNO == argWindowCount - 1) {

            //addDataBlockAnimation();
            resolve(console.log("ALL loaded!"));
        }
        else {
            createContet(argWindowNO + 1, argWindowCount, resolve, reject);
        }

    };
    xmlhttp.onerror = () => reject(xmlhttp.statusText);
    xmlhttp.send();
};

const getConentCount = () => {
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

const createContentContainerView = () => {
    let urlCount = `${SERVER_CONTETN_URL}?${CONTENT_COUNT_QUERY}=true`;
    console.log(axiosGet);
    
    axiosGet(urlCount)
    .then((responseCount) =>{
        let {data: {contentNumber}} = responseCount;
        console.log("Odpowiedz:");
        console.log(contentNumber);

        for(let i=0; i<contentNumber; i++)
        {
            let urlContent = `${SERVER_CONTETN_URL}?${CONTENT_NUM_QUERY}=${i}`;
            axiosGet(urlContent)
            .then(responseContent =>{
                let {data : {body}} = responseContent;
                console.log(body);
                addNewPost(body.title, body.secondTitle, body.imgScr, body.bckImgColor, body.desc, body.link);
            });
        }
    })
    .catch((errorMes) =>{
        console.log("Nie udalo sie wczytać konentu")
    })

    // getConentCount().then((resultCount) => {
    //     //console.log(resultCount);
    //     return loadAllContentWindow(resultCount);
    // }).then((result) => {

    // }).catch((errorMes) => {
    //     console.log(errorMes);
    // });
};

module.exports = {
    createContentContainerView,
};