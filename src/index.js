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

//Forecast

function getForecast(coordinates) {
  let apiKey = `76a35369f06f76080a05f6fc077ecb04`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

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
    celsiusTemperature = response.data.main.temp;

    let currentCity = response.data.name;
    let h1 = document.querySelector("h1");
    h1.innerHTML = currentCity;

    let temperature = Math.round(response.data.main.temp);
    let currentTemp = document.querySelector("#current-temp");
    currentTemp.innerHTML = `${temperature}°C`;

    let feelsLikeData = Math.round(response.data.main.feels_like);
    let feelsLike = document.querySelector("#feels-like");
    feelsLike.innerHTML = `${feelsLikeData}°C`;

    let humidityData = response.data.main.humidity;
    let humidity = document.querySelector("#humidity");
    humidity.innerHTML = `${humidityData} %`;

    let windData = Math.round(response.data.wind.speed);
    let wind = document.querySelector("#wind");
    wind.innerHTML = `${windData} km/h`;

    let icon = document.querySelector("#icon");
    let iconElement = response.data.weather[0].icon;
    icon.setAttribute(
      "src",
      `https://raw.githubusercontent.com/peevaliz/my-weather-project-/main/src/${iconElement}.png`
    );
    icon.setAttribute("alt", response.data.weather[0].description);

    getForecast(response.data.coord);
  }
}

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", changeCity);

function showTempetature(response) {
  celsiusTemperature = response.data.main.temp;

  let temperature = Math.round(response.data.main.temp);
  let currentCity = response.data.name;
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = `${temperature}°C`;
  let h1 = document.querySelector("h1");
  h1.innerHTML = currentCity;

  let feelsLikeData = Math.round(response.data.main.feels_like);
  let feelsLike = document.querySelector("#feels-like");
  feelsLike.innerHTML = `${feelsLikeData}°C`;

  let humidityData = response.data.main.humidity;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${humidityData} %`;

  let windData = Math.round(response.data.wind.speed);
  let wind = document.querySelector("#wind");
  wind.innerHTML = `${windData} km/h`;

  let icon = document.querySelector("#icon");
  let iconElement = response.data.weather[0].icon;
  icon.setAttribute(
    "src",
    `https://raw.githubusercontent.com/peevaliz/my-weather-project-/main/src/${iconElement}.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = `76a35369f06f76080a05f6fc077ecb04`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(`${apiUrl}`).then(showTempetature);
}
navigator.geolocation.getCurrentPosition(showPosition);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
          <div class="col-2">
            <p class="card-day">${formatDay(forecastDay.dt)}</p>
            <img src="https://raw.githubusercontent.com/peevaliz/my-weather-project-/main/src/${
              forecastDay.weather[0].icon
            }.png" alt="" class="day-img"/>
            <h5>${Math.round(forecastDay.temp.max)}°C</h5>
          </div>
`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

displayForecast();
