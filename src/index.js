//Cerrent date
let now = new Date();

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = "0" + minutes;
}

let hours = now.getHours();
if (hours < 10) {
  hours = "0" + hours;
}
let date = now.getDate();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let months = [
  "Jan",
  "Feby",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];
let year = now.getFullYear();
year = year.toString().slice(2);

let currentDate =
  hours + ":" + minutes + " - " + day + ", " + date + " " + month + "`" + year;

let currentDateDiv = document.querySelector("#date");
currentDateDiv.innerHTML = currentDate;

//Change city name to city input

function changeCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let city = document.querySelector("h1");
  let cityValue = cityInput.value;
  city.innerHTML = cityValue;

  //change temperature
  let units = "metric";
  let apiKey = `76a35369f06f76080a05f6fc077ecb04`;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=${units}`;
  axios.get(`${url}`).then(showTempetature);

  function showTempetature(response) {
    console.log(response.data);
    let temperature = Math.round(response.data.main.temp);
    console.log(temperature);
    let currentTemp = document.querySelector("#current-temp");
    currentTemp.innerHTML = `${temperature}`;

    let feelsLikeData = Math.round(response.data.main.feels_like);
    console.log(feelsLikeData);
    let feelsLike = document.querySelector("#feels-like");
    feelsLike.innerHTML = `${feelsLikeData}°C`;

    let humidityData = response.data.main.humidity;
    let humidity = document.querySelector("#humidity");
    humidity.innerHTML = `${humidityData} %`;

    let windData = Math.round(response.data.wind.speed);
    let wind = document.querySelector("#wind");
    wind.innerHTML = `${windData} km/h`;
  }
}

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", changeCity);

//Celsius to farenheit

function toFarenheit() {
  let temperature = document.querySelector(".temp");
  temperature.innerHTML = 65;
}

let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", toFarenheit);

function toCelsius() {
  let temperature = document.querySelector(".temp");
  temperature.innerHTML = 12;
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", toCelsius);

function showTempetature(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  let currentCity = response.data.name;
  console.log(currentCity);
  console.log(temperature);
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = `${temperature}`;
  let h1 = document.querySelector("h1");
  h1.innerHTML = currentCity;

  let feelsLikeData = Math.round(response.data.main.feels_like);
  console.log(feelsLikeData);
  let feelsLike = document.querySelector("#feels-like");
  feelsLike.innerHTML = `${feelsLikeData}°C`;

  let humidityData = response.data.main.humidity;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${humidityData} %`;

  let windData = Math.round(response.data.wind.speed);
  let wind = document.querySelector("#wind");
  wind.innerHTML = `${windData} km/h`;
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  console.log(lat);
  console.log(lon);
  let units = "metric";
  let apiKey = `76a35369f06f76080a05f6fc077ecb04`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(`${apiUrl}`).then(showTempetature);
}
navigator.geolocation.getCurrentPosition(showPosition);
