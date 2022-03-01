//Feature 1: Display current date
let appDate = document.querySelector(".today-date");

let formatDate = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[formatDate.getDay()];
let months = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec"
];
let month = months[formatDate.getMonth()];
let year = formatDate.getFullYear();
let date = formatDate.getDate();
let hours = formatDate.getHours();
if (hours < 10 ) {
  hours = `0${hours}`;
}
let minutes = formatDate.getMinutes();
if (minutes < 10 ) {
  minutes = `0${minutes}`;
}

appDate.innerHTML = `Last updated: ${day} ${month} ${date}, ${year} | ${hours}:${minutes} | In Celcius`;

// Formate the time for sunrise and sunset
function formatHoursSun(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
   if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
   if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`
}
//format days for forecast
 function formatDay(timestamp) {
   let date = new Date(timestamp * 1000);
   let day = date.getDay();
   let days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
   return days[day];
  }


// repeat the weather 5-day forecast
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast");


let forecastHTML = `<div class="row">`;
forecast.forEach(function (forecastDay, index){
  if (index < 6) {
forecastHTML = forecastHTML + `
        <div class="col-2">
          <div class="days-future">
            ${formatDay(forecastDay.dt)}
          </div>
          <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="forecast-icon" width="45">
          <div class="forecast-temp-max">
            ${Math.round(forecastDay.temp.max)}°
            </div>
            <div class="forecast-temp-min">
            ${Math.round(forecastDay.temp.min)}° 
            </div>
            </div>` ; 
}})
        forecastHTML = forecastHTML + `</div>`;
        forecastElement.innerHTML = forecastHTML;
}

function displayAirQuality(response) {
  document.querySelector("#air-quality").innerHTML = response.data.list.main.aqi;
}

//api with the lat and lon info from getForecast within the function showWeather step 2
function getForecast(coordinates) {
  let apiKey = "86e2f0ff3a54fd7933e9adb20d0d5090";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

// get coordinates for Air information
function getAirInfo(coordinates) {
  let apiKey = "86e2f0ff3a54fd7933e9adb20d0d5090";
  let apiUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayAirQuality);
}

//Feature show the weather data

function showWeather(response) {
  document.querySelector("H1").innerHTML = response.data.name;
  document.querySelector("#actual-temp").innerHTML =`${Math.round(
    response.data.main.temp
  )}°` ;
  document.querySelector("#wdescription").innerHTML = response.data.weather[0].description;
  document.querySelector("#max-temperature").innerHTML = `${Math.round(
    response.data.main.temp_max
  )}°`;
  document.querySelector("#min-temperature").innerHTML = `${Math.round(
    response.data.main.temp_min
  )}°`;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#feeling").innerHTML = Math.round(response.data.main.feels_like);
  document.querySelector("#sunrise").innerHTML = formatHoursSun(response.data.sys.sunrise * 1000);
  document.querySelector("#sunset").innerHTML = formatHoursSun(
    response.data.sys.sunset *1000
  );
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt",response.data.weather[0].description);

// Addition of another API that obtains the forecast with lat and lon step 1 -- it is within showWeather

getForecast(response.data.coord);
getAirInfo(response.data.coord);

}

function search(city) {
  //make an API call to open weather API
  //display the city and temp
 let apiKey = "86e2f0ff3a54fd7933e9adb20d0d5090";
 let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city-input").value;
  search(city);  
 }

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("Paris");
displayForecast();
