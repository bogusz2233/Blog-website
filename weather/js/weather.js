import "../../home/sass/home.scss"
import "../sass/weather.scss";

//var Promise = require("bluebird");
import {get as axiosGet} from "axios";
import {Chart} from "chart.js";
const Promise = require('es6-promise').Promise;
//const 
const SERVER_WEATHER_URL = "https://bogusz-blog.herokuapp.com/weather";
const SERVER_QUERY_GET = "get";
const SERVER_QUERY_PLACE = 'place';
const CACHE_TIME_DELAY = 30 * 60 * 1000;    //<< Co 30 minut

window.onload = () =>{
    console.log("window.onload");
    let lastTimeFetch = localStorage.getItem("weather-app-time");
    let actualTime = new Date().getTime();

    if(lastTimeFetch == undefined || actualTime - lastTimeFetch > CACHE_TIME_DELAY)
    {
        console.log("Poszlo zapytanie");
        localStorage.setItem("weather-app-time",actualTime);

        let urlCur = `${SERVER_WEATHER_URL}?${SERVER_QUERY_GET}=currently&${SERVER_QUERY_PLACE}=Bialystok`;
        let urlHour = `${SERVER_WEATHER_URL}?${SERVER_QUERY_GET}=hourly&${SERVER_QUERY_PLACE}=Bialystok`;
        let urlDay = `${SERVER_WEATHER_URL}?${SERVER_QUERY_GET}=daily&${SERVER_QUERY_PLACE}=Bialystok`;

        axiosGet(urlCur)
        .then((response) =>{

            let {data : {body}} = response;
            console.log(response.data);
            let StringData = JSON.stringify(body);
            localStorage.setItem("weather-app-current",StringData);
            setActualWeather(body.currently);
            setApparentTemp(body.currently);
            setPrecip(body.currently);
            return axiosGet(urlHour);
        })
        .then( (result) =>{
            let {data : {body}} = result;
            let StringData = JSON.stringify(body);
            localStorage.setItem("weather-app-hourly",StringData);
            printWeatherChart(body);
            return axiosGet(urlDay);
        })
        .then( (result) =>{
            let {data : {body}} = result;
            let StringData = JSON.stringify(body);
            localStorage.setItem("weather-app-daily",StringData);
            printWeatherDailyChart(body);
        })
        .catch((error) =>{
            console.log(error);
        });
    }
    else
    {
        console.log("Wczytano info z cache'a");
        let bodyCurrent = JSON.parse(localStorage.getItem("weather-app-current"));
        let bodyHourly = JSON.parse(localStorage.getItem("weather-app-hourly"));
        let bodyDaily = JSON.parse(localStorage.getItem("weather-app-daily"));

        setActualWeather(bodyCurrent.currently);
        setApparentTemp(bodyCurrent.currently);
        setPrecip(bodyCurrent.currently);

        printWeatherChart(bodyHourly);
        printWeatherDailyChart(bodyDaily);
    }

    document.getElementById("searchWeather").onclick = () =>{
        let dataPass = document.getElementsByClassName("weatherSearchPlace")[0].value;
        if(dataPass.length === 0)
        {
            alert("Musisz wpisać jakąś nazwe miejscowości");
        }
        else
        {
            loadNewWeatherView(dataPass);
        }
    }
};

// document.getElementById("searchWeather").onclick = () =>{
//     console.log("click"); 
// };
// document.getElementById("searchWeather").onClick = () =>{
//     console.log("click");
//     //loadNewWeatherView("Bialystok");
// };

const loadNewWeatherView = (argPlacaceName) =>{

    let urlCur = `${SERVER_WEATHER_URL}?${SERVER_QUERY_GET}=currently&${SERVER_QUERY_PLACE}=${argPlacaceName}`;
    let urlHour = `${SERVER_WEATHER_URL}?${SERVER_QUERY_GET}=hourly&${SERVER_QUERY_PLACE}=${argPlacaceName}`;
    let urlDay = `${SERVER_WEATHER_URL}?${SERVER_QUERY_GET}=daily&${SERVER_QUERY_PLACE}=${argPlacaceName}`;

    axiosGet(urlCur)
    .then((response) =>{
        var  {data : {body}} = response;
        document.getElementById("placeId").textContent = body.formatted_address;
        setActualWeather(body.currently);
        setApparentTemp(body.currently);
        setPrecip(body.currently);
        return axiosGet(urlHour);
    })
    .then( (result) =>{
            printWeatherChart(result.data.body);
            return axiosGet(urlDay);
    })
    .then( (result) =>{
        printWeatherDailyChart(result.data.body);
    })
    .catch((error) =>{
        console.log(error);
    });
}
var setActualWeather = (argJsonDataWeather) =>
{
    var currentTemp = document.getElementById('currentTemp'); 
    var celsiusNow = converFahrToCels(argJsonDataWeather.temperature);
    currentTemp.textContent =`${celsiusNow}°C`;
}

var setApparentTemp = (argJsonDataWeather) =>{

    var currentTempAparent = document.getElementById('currentTempAparent'); 
    var celsiusNow = converFahrToCels(argJsonDataWeather.apparentTemperature);
   
    currentTempAparent.textContent =`${celsiusNow}°C`;
}

var setPrecip  = (argJsonDataWeather) =>{

    var precipType = document.getElementById("precipType");
    var precipInens = document.getElementById('precipInens');
    var precipProb = document.getElementById('precipProb');

    if(argJsonDataWeather.precipType == undefined){

            precipType.textContent = "Typ: brak";
    }else{

        precipType.textContent = "Typ: " + argJsonDataWeather.precipType;     
    }

    precipInens.textContent = "Intensywność: " + argJsonDataWeather.precipIntensity + " mm/h";
    precipProb.textContent ="Prawdopodobieństo: " + (argJsonDataWeather.precipProbability *100).toFixed(0) + "%";

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
    let url = `${SERVER_WEATHER_URL}?${SERVER_QUERY_GET}=${argGetType}&${SERVER_QUERY_PLACE}=${argPlace}`;
    console.log(url);
    return new Promise((resolve, reject) => {
        if('ActiveXObject' in window){
            return new ActiveXObject('Msxml2.XMLHTTP');
         }
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.overrideMimeType("application/json");  
       // xmlhttp.responseType = 'json';
       

        xmlhttp.open("GET", url, true);
        xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
        xmlhttp.onload = () => {
            var jsonResponse = JSON.parse(xmlhttp.responseText);
         
            resolve(jsonResponse)
        };
        xmlhttp.onerror = () => reject(xmlhttp.statusText);
        xmlhttp.send();
    });
};

var getNewPlaceWeather = () =>{
    var placeToSearch = document.getElementsByClassName("weatherSearchPlace")[0];
    var location = placeToSearch.value;

    if(location.length == 0){
        placeToSearch.placeholder = "Wpisz nazwe miejscowości"
    }else{
        getWeatherFromServer(location,"currently").then( (result) =>{
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
           // JsonDataWeather = {};
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

    var xAxesLabelSize=5;
    var yAxesLavelSize=7;
    var legendLabels=7;
    if(window.screen.availWidth > 750)
    {
        xAxesLabelSize = 12;
        yAxesLavelSize = 14;
        legendLabels=16;
    }
    else if(window.screen.availWidth > 620)
    {
        xAxesLabelSize = 10;
        yAxesLavelSize = 12;
        legendLabels=14;
    }
    else if(window.screen.availWidth > 430)
    {
        xAxesLabelSize = 8;
        legendLabels=10;
        yAxesLavelSize = 9;
    }
    else
    {
        legendLabels=8;
        xAxesLabelSize = 5;
        yAxesLavelSize = 7;
    }
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
            legend: {
                labels: {
                    // This more specific font property overrides the global property
                    fontSize: legendLabels,
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        fontSize: yAxesLavelSize
                    }
                }],
                xAxes: [{
                    ticks: {
                        beginAtZero:true,
                        fontSize: xAxesLabelSize,
                        padding: 5,
                        maxRotation: 0
                    }
                }]
            }
        }
    });
    console.log(myChart.config);
}

var printWeatherDailyChart= (argResultdaily) =>{

    var xAxesLabelSize=5;
    var yAxesLavelSize=7;
    var legendLabels=7;
    if(window.screen.availWidth > 750)
    {
        xAxesLabelSize = 12;
        yAxesLavelSize = 14;
        legendLabels=16;
    }
    else if(window.screen.availWidth > 620)
    {
        xAxesLabelSize = 10;
        yAxesLavelSize = 12;
        legendLabels=12;
    }
    else if(window.screen.availWidth > 430)
    {
        xAxesLabelSize = 7;
        legendLabels=9;
        yAxesLavelSize = 9;
    }
    else
    {
        legendLabels=6;
        xAxesLabelSize = 4;
        yAxesLavelSize = 6;
    }
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
            legend: {
                labels: {
                    // This more specific font property overrides the global property
                    fontSize: legendLabels,
                    boxWidth: 20
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        fontSize: yAxesLavelSize
                    }
                }],
                xAxes: [{
                    ticks: {
                        beginAtZero:true,
                        fontSize: xAxesLabelSize,
                        padding: 5,
                        maxRotation: 0
                    }
                }]
            }
        }
    });
}

var weatherScrollAnim = () => {
    if((window.screen.width > 500 && (window.screen.width < window.screen.height))
        ||(window.screen.height >500 && (window.screen.width > window.screen.height)) )
    {
    ScrollReveal().reveal('.weatherContainer, #dailyChart', {
        delay: 300,
        duration: 2500,
        viewFactor: 0.4,
        reset: true,
        distance: '1000px',
        origin: 'left',
        easing: 'cubic-bezier(0.5, 0, 0, 1)',
        opacity: 0
    });
    ScrollReveal().reveal('#hourlyChart', {
        delay: 300,
        duration: 2500,
        viewFactor: 0.4,
        reset: true,
        distance: '1000px',
        origin: 'rigth',
        easing: 'cubic-bezier(0.5, 0, 0, 1)',
        opacity: 0
    });

    ScrollReveal().reveal('#conetnConteiner h1', {
        delay: 300,
        duration: 2500,
        viewFactor: 0.4,
        reset: true,
        distance: '500px',
        origin: 'bottom',
        easing: 'cubic-bezier(0.5, 0, 0, 1)',
        opacity: 0
    });
    }
}