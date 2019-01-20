const SERVER_WEATHER_URL = "https://bogusz-blog.herokuapp.com/weather";
const SERVER_QUERY_GET = "get";
const SERVER_QUERY_PLACE = 'place';

window.onload = () =>{
    getCurrentWeatherFromServer("Bogusz Stare 26").then( (result) =>{
        setActualWeather(result);
        setApparentTemp(result);
        setPrecip(result);
    }).catch( (errorMes) =>{
        JsonDataWeather = {};
    });
    
}

var setActualWeather = (argJsonDataWeather) =>
{
    var container = createNewCurrentWeatherContainer();
    container.children[0].textContent = "Teraz:";
    var celsiusNow = converFahrToCels(argJsonDataWeather.currently.temperature);
    container.children[1].textContent =`${celsiusNow}°C`;
}

var setApparentTemp = (argJsonDataWeather) =>{
  
    var container = createNewCurrentWeatherContainer();
    container.children[0].textContent = "Odczuwalna:";
    var celsiusNow = converFahrToCels(argJsonDataWeather.currently.apparentTemperature);
    container.children[1].textContent =`${celsiusNow}°C`;
}

var setPrecip  = (argJsonDataWeather) =>{

    var tempPrecipType;

    var container = document.getElementById("currentWeatherContainer");
    var viewDiv = document.createElement("div");
    var precipText = document.createElement("div");
    var precipType = document.createElement("div");
    var precipInens = document.createElement("div");
    var precipProb = document.createElement("div");

    var viewDiv = document.createElement("div");


    viewDiv.className = "celsiusView";
    precipText.className =  "celsiusText";
    precipType.className =  "precipText";
    precipInens.className =  "precipText";
    precipProb.className =  "precipText";

    precipText.textContent = "Opady:";
    if(argJsonDataWeather.currently.precipType == undefined){
        precipType.textContent = "Typ: brak";
    }
    else{
        precipType.textContent = "Typ: " + argJsonDataWeather.currently.precipType;
    }
   
    precipInens.textContent = "Intensywność: " + argJsonDataWeather.currently.precipIntensity + " mm/h";
    precipProb.textContent ="Prawdopodobieństo: " + (argJsonDataWeather.currently.precipProbability *100).toFixed(0) + "%";

    viewDiv.appendChild(precipText);
    viewDiv.appendChild(precipType);
    viewDiv.appendChild(precipInens);
    viewDiv.appendChild(precipProb);
    container.appendChild(viewDiv);
};

var createNewCurrentWeatherContainer = () =>
{
    var container = document.getElementById("currentWeatherContainer");
    var celsiusDiv = document.createElement("div");

    var celsiusTextDiv = document.createElement("div");
    var celsiusValueDiv = document.createElement("div");

    celsiusDiv.className = "celsiusView";
    celsiusTextDiv.className = "celsiusText";
    celsiusValueDiv.className = "celsiusValue";

    celsiusDiv.appendChild(celsiusTextDiv);
    celsiusDiv.appendChild(celsiusValueDiv);
    container.appendChild(celsiusDiv);

    return celsiusDiv;
}
var getCurrentWeatherFromServer = (argPlace) =>{
    return new Promise((resolve, reject) => {
        const xmlhttp = new XMLHttpRequest();
        let url = `${SERVER_WEATHER_URL}?${SERVER_QUERY_GET}=currently&${SERVER_QUERY_PLACE}=${argPlace}`;

        xmlhttp.open("GET", url, true);
        xmlhttp.onload = () => {
            var jsonResponse = JSON.parse(xmlhttp.responseText);
            resolve(jsonResponse)
        };
        xmlhttp.onerror = () => reject(xmlhttp.statusText);
        xmlhttp.send();
    });
}

var getNewPlaceWeather = () =>{
    // var JsonDataWeather;
    // getCurrentWeatherFromServer("Bogusz Stare 26").then( (result) =>{
    //     setActualWeather(result);
    //     setApparentTemp(result);
    //     setPrecip(result);
    // }).catch( (errorMes) =>{
    //     JsonDataWeather = {};
    // });
    var placeToSearch = document.getElementById("placeToSearch");
    var location = placeToSearch.value;

    if(location.length == 0){
        placeToSearch.placeholder = "Wpisz nazwe miejscowości"
    }else{
        var myNode = document.getElementById("currentWeatherContainer");
        while (myNode.firstChild) {
            myNode.removeChild(myNode.firstChild);
        }
        getCurrentWeatherFromServer(location).then( (result) =>{
            setActualWeather(result);
            setApparentTemp(result);
            setPrecip(result);
            document.getElementById("placeId").textContent = result.formatted_address;
        }).catch( (errorMes) =>{
            JsonDataWeather = {};
        });
    }
    console.log("text :" + location.length);
};

var keyPressedText = (event) => {
    if(event.keyCode == 13)
    {
        getNewPlaceWeather();
    }
}

var converFahrToCels = (argTempConver) =>{
    return ( (argTempConver - 32) * 5 / 9 ).toFixed(1);
}