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
  let forecastElement = document.querySelector("#weather-forecast-temperatures");

  let forecastHTML = `<div class="row">`;

  let days= ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  days.forEach(function(day){
     forecastHTML = forecastHTML + 
  `
            <div class="col-2">
                <dive class="weather-forecast-date">
                ${day}
               </dive>
                <img src="http://openweathermap.org/img/wn/50d@2x.png" alt="" width="50"/> <br/>
                <div class="weather-forecast-temperature">
                <span class="weather-temp-high">
                   <strong>28</strong> 
                </span><strong>&#176</strong>
                    |
                <span class="weather-temp-low">
                    22
                </span>&#176
                </div>
            </div>
`;
})

forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates){
  let apiKey = "880be6f76144feab4c58ddbc72edd9b8";
  let apiUrl = 
  `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeatherCondition(response) {
  let iconElement = document.querySelector("#weathericon");

  document.querySelector("#city").innerHTML = response.data.name;

  celsiusTemp = response.data.main.temp;
 
  document.querySelector("#temp").innerHTML = Math.round(celsiusTemp);

  document.querySelector("#description").innerHTML = response.data.weather[0].description;

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;

  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed)

  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord)

}
function searchLocation(position) {
  let apiKey = "880be6f76144feab4c58ddbc72edd9b8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${
  position.coords.latitude
  }&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

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
  let apiKey = "880be6f76144feab4c58ddbc72edd9b8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
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
let apiKey = "880be6f76144feab4c58ddbc72edd9b8";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayWeatherCondition);

let fahrenheitLink = document.querySelector("#fahrenheitLink");
fahrenheitLink.addEventListener("click", showFahrenheitTemp)

let celsiusLink = document.querySelector("#celsiusLink")
celsiusLink.addEventListener("click", showCelsiusTemp);
