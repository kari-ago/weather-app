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

appDate.innerHTML = `Last updated: ${day} ${month} ${date}, ${year} | ${hours}:${minutes}`;

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

// repeat the weather 5-day forecast
function displayForecast(response) {
  let forecastElement = document.querySelector("#weather-forecast");

let days = ["Mon","Tue","Wed","Thu", "Fri","Sat"];
let forecastHTML = `<div class="row">`;
days.forEach(function(day){
forecastHTML = forecastHTML + `
        <div class="col-2">
          <div class="days-future">
            ${day}
          </div>
          <img src="https://ssl.gstatic.com/onebox/weather/48/partly_cloudy.png" alt="forecast-icon" width="45">
          <div class="forecast-temp-max">
            12°
            </div>
            <div class="forecast-temp-min">
            10°
            </div>
            </div>`  
})
        forecastHTML = forecastHTML + `</div>`;
        forecastElement.innerHTML = forecastHTML;
}

//api with the lat and lon info from getForecast within the function showWeather
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "86e2f0ff3a54fd7933e9adb20d0d5090";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

//Feature show the weather data

function showWeather(response) {
  console.log(response.data);
  console.log(response.data.name);
  document.querySelector("H1").innerHTML = response.data.name;
  document.querySelector("#actual-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#wdescription").innerHTML = response.data.weather[0].description;
  document.querySelector("#max-temperature").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#min-temperature").innerHTML = Math.round(
    response.data.main.temp_min
  );
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

// Addition of another API that obtains the forecast with lat and lon

getForecast(response.data.coord);

}

function search(city) {
  //make an API call to open weather API
  //display the city and temp
 let apiKey = "86e2f0ff3a54fd7933e9adb20d0d5090";
 let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  console.log(axios);
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

function showFarenheitTemp(event) {
  event.preventDefault();
  let farenheitTemp = document.querySelector("#actual-temp");
}

let farenheitLink = document.querySelector("#farenheit-temp");
farenheitLink.addEventListener("click",showFarenheitTemp);
