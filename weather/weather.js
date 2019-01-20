const SERVER_WEATHER_URL = "https://bogusz-blog.herokuapp.com/weather";
const SERVER_QUERY_GET = "get";
const SERVER_QUERY_PLACE = 'place';

window.onload = () =>{
    getWeatherFromServer("Bogusz Stare 26","currently").then( (result) =>{
        setActualWeather(result);
        setApparentTemp(result);
        setPrecip(result);
        return getWeatherFromServer("Bogusz Stare 26","hourly");
    }).then( (result) =>{
        printWeatherChart(result.hourly);
        return getWeatherFromServer("Bogusz Stare 26","daily");
    }).then( (result) =>{
        printWeatherDailyChart(result.daily);
    })
    .catch( (errorMes) =>{
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
var getWeatherFromServer = (argPlace, argGetType) =>{
    return new Promise((resolve, reject) => {
        const xmlhttp = new XMLHttpRequest();
        let url = `${SERVER_WEATHER_URL}?${SERVER_QUERY_GET}=${argGetType}&${SERVER_QUERY_PLACE}=${argPlace}`;

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
    var placeToSearch = document.getElementById("placeToSearch");
    var location = placeToSearch.value;

    if(location.length == 0){
        placeToSearch.placeholder = "Wpisz nazwe miejscowości"
    }else{
        getWeatherFromServer(location,"currently").then( (result) =>{
            var myNode = document.getElementById("currentWeatherContainer");
            while (myNode.firstChild) {
                myNode.removeChild(myNode.firstChild);
            }
            setActualWeather(result);
            setApparentTemp(result);
            setPrecip(result);
            document.getElementById("placeId").textContent = result.formatted_address;
            return getWeatherFromServer(location, "hourly");
        }).then( (result) =>{
            printWeatherChart(result.hourly);
            return getWeatherFromServer(location,"daily");
        }).then( (result) =>{
            printWeatherDailyChart(result.daily);
        })
        .catch( (errorMes) =>{
            JsonDataWeather = {};
        });
    }
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

var printWeatherChartTest = () => {
    var charContex = document.getElementById("weatherChart").getContext('2d');
    var myChart = new Chart(charContex, {
        type: 'line',
        data: {
            labels: [11231231132155515, 11231231132155513, 112312311321555133, 112312311321555134, 5, 6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40],
            datasets: [{
                label: 'Temperatura',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
            
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
}

var printWeatherChart= (argResultHourly) =>{
    var xValue, yValue;
    xValue = new Array();
    yValue = new Array();
    for(var i=0; i<argResultHourly.length; i++)
    {
        yValue.push(converFahrToCels(argResultHourly[i].temperature));
    }
    for(var i=0; i<argResultHourly.length; i++)
    {
        let timeResult = new Date(argResultHourly[i].time * 1000);
        let timeString = `${timeResult.getHours()}:${timeResult.getMinutes()}0`;
        console.log(timeString);
        xValue.push(timeString);
    }
    var charContex = document.getElementById("hourlyChart").getContext('2d');
    var myChart = new Chart(charContex, {
        type: 'line',
        data: {
            labels: xValue,
            datasets: [{
                label: 'Temperatura',
                data: yValue,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
}

var printWeatherDailyChart= (argResultdaily) =>{
    var xValue, maxValue, minValue;
    xValue = new Array();
    maxValue = new Array();
    minValue = new Array();
    var weekday = new Array(7);
    weekday[0] =  "Niedziela";
    weekday[1] = "Poniedziałek";
    weekday[2] = "Wtorek";
    weekday[3] = "Środa";
    weekday[4] = "Czwartek";
    weekday[5] = "Piątek";
    weekday[6] = "Sobota";
    for(var i=0; i<argResultdaily.length; i++)
    {
        maxValue.push(converFahrToCels(argResultdaily[i].temperatureHigh));
        minValue.push(converFahrToCels(argResultdaily[i].temperatureLow))
        let timeResult = new Date(argResultdaily[i].time * 1000).getDay();
        xValue.push(weekday[timeResult]);
    }
    var charContex = document.getElementById("dailyChart").getContext('2d');
    var myChart = new Chart(charContex, {
        type: 'line',
        data: {
            labels: xValue,
            datasets: [{
                label: 'Temperatura maksymalna',
                data: maxValue,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                
                ],
                borderWidth: 1
            },
            {
                label: 'Temperatura Minimalna',
                data: minValue,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
}