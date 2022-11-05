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


function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = Math.round(
  response.data.main.temp
  );
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

let currentLocationButton = document.querySelector("#currentLocation");
currentLocationButton.addEventListener("click", getCurrentLocation);

let searchForm = document.querySelector("#searchForm");
searchForm.addEventListener("submit", submitSearch);