let now = new Date ();

let h2 = document.querySelector("h4");

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[now.getDay()];

h2.innerHTML = `${day} ${hours}:${minutes}`;

function displayForecast(response){
  
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#weather-forecast-temperatures");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function(forecastDay, index){
    if(index < 6){
     forecastHTML = forecastHTML + 
  `
            <div class="col-2">
                <div class="weather-forecast-date">
                ${formatTime(forecastDay.time)}
               </div>
                <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${forecastDay.condition.icon}.png" alt="" width="50"/> <br/>
                <div class="weather-forecast-temperature">
                <span class="weather-temp-high">
                   <strong>${Math.round(forecastDay.temperature.maximum)}</strong> 
                </span><strong>&#176</strong>
                    |
                <span class="weather-temp-low">
                    ${Math.round(forecastDay.temperature.minimum)}
                </span>&#176
                </div>
            </div>
`;}
});

forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;
} 

function formatTime(timeStamp){
  let date = new Date(timeStamp * 1000);
  let day = date.getDay();

  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  return days[day];
}

function getForecast(Coordinates){
  let apiKey = "904614d4t1a13od039be3fd670fed7af";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${Coordinates.longitude}&lat=${Coordinates.latitude}&key=${apiKey}&units=metric`;
 

  axios.get(apiUrl).then(displayForecast);
}

function displayWeatherCondition(response) {
  let iconElement = document.querySelector("#weathericon");

  document.querySelector("#city").innerHTML = response.data.city;

  celsiusTemp = response.data.temperature.current;
 
  document.querySelector("#temp").innerHTML = Math.round(celsiusTemp);

  document.querySelector("#description").innerHTML = response.data.condition.description;

  document.querySelector("#humidity").innerHTML = response.data.temperature.humidity;

  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
                                  
  iconElement.setAttribute("src", response.data.condition.icon_url);
  iconElement.setAttribute("alt", response.data.condition.description);

  getForecast(response.data.coordinates)


}
function searchLocation(city) {
  let apiKey = "904614d4t1a13od039be3fd670fed7af";
  let apiUrl =  `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}


function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function submitSearch(event) {
  event.preventDefault();
  let city = document.querySelector("#searchTextInput").value;
  searchCity(city);
}

function searchCity(city) {
  let apiKey = "904614d4t1a13od039be3fd670fed7af";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function showFahrenheitTemp(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

function showCelsiusTemp(event) {
  event.preventDefault();
    celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}

let currentLocationButton = document.querySelector("#currentLocation");
currentLocationButton.addEventListener("click", getCurrentLocation);

let celsiusTemp = null;


let searchForm = document.querySelector("#searchForm");
searchForm.addEventListener("submit", submitSearch);

let city = "Hershey";
let apiKey = "904614d4t1a13od039be3fd670fed7af";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
axios.get(apiUrl).then(displayWeatherCondition);

let fahrenheitLink = document.querySelector("#fahrenheitLink");
fahrenheitLink.addEventListener("click", showFahrenheitTemp)

let celsiusLink = document.querySelector("#celsiusLink")
celsiusLink.addEventListener("click", showCelsiusTemp);
