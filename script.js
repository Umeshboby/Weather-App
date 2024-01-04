const api_key = "839accec1f1270d4453bfbd8133dd7f3";
const inputSearch = document.getElementById("inputSearch");
const button = document.getElementById("addBtn");
const weatherDisplay = document.querySelector(".wether-display");
button.addEventListener("click", addCity);

const addedCity = [];
const addedCityWithTemp = [];
const allCards = [];

async function addCity(){
    const city = inputSearch.value;
    try{
        const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;
        const response = await fetch(api);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    const data = await response.json();
    if(addedCity.includes(data.name)){
        alert("City is alredy added");
        return;
    }
    
    const div = document.createElement("div");
    div.classList.add("weather-card");
    div.innerHTML = `
    <div class="weather-info">
    <div class="info-1">
    <p class="temp">${data.main.temp}°</p>
    <p class="coords">H-${data.main.temp_max}°  L-${data.main.temp_min}°</p>
    <p class="city">${data.name}, ${data.sys.country}</p>
</div>
<div class="info-2">
    <img class="img" src="./${data.weather[0].main}.png">
    <p class="condition">${data.weather[0].main}</p>
</div>
</div>
<div class="other-info">
<div class="info-div">
<p class="humidity">Humidity</p>
<p>${data.main.humidity}%</p>
</div>
<div class="info-div">
    <p class="pressure">Pressure</p>
    <p>${data.main.pressure} Pa</p>
    </div>
    <div class="info-div">
    <p class="wind-speed">Wind Speed</p>
    <p>${data.wind.speed}kmph</p>
    </div>
</div>`;

addedCity.push(data.name);
addedCityWithTemp.push([div, data.main.temp]);
console.log(typeof data.main.temp)
sortAndAddCard(addedCityWithTemp);
// weatherDisplay.appendChild(addedCityWithTemp[0][0]);
    }
    catch(error){
        alert("Please check city name");
        console.log(error);
    }
    
inputSearch.value = "";
}

function sortAndAddCard(addedCityWithTemp){
    while(weatherDisplay.firstChild){
        weatherDisplay.removeChild(weatherDisplay.firstChild);
    }
    addedCityWithTemp.sort((a,b)=>{
        return a[1]-b[1];
    });
    for ( let i = 0; i < addedCityWithTemp.length; i++ ){
        weatherDisplay.appendChild(addedCityWithTemp[i][0]);
    }
}


