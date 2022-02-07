//Feature 1: Display current date
let appDate = document.querySelector(".today-date");

let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
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
let month = months[now.getMonth()];
let year = now.getFullYear();
let date = now.getDate();
let hours = now.getHours();
if (hours < 10 ) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10 ) {
  minutes = `0${minutes}`;
}

appDate.innerHTML = `Today is ${day} ${month} ${date}, ${year} | ${hours}:${minutes}`;

//Feature 2: Add a search engine, when searching for a city (i.e. Paris), display the city name on the page after the user submits the form.
// id="search-city-input" "search-form":form id
//ask how to .toUpperCase()

function showWeather(response) {
  console.log(response.data);
  console.log(response.data.name);
  document.querySelector("H1").innerHTML = response.data.name;
  document.querySelector("#actual-temp").innerHTML = Math.round(
    response.data.main.temp
  );
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
  document.querySelector("#sunrise").innerHTML = Math.round(
    response.data.sys.sunrise
  );
  document.querySelector("#sunset").innerHTML = Math.round(
    response.data.sys.sunset
  );
}

function showCity(event) {
  event.preventDefault();
  //make an API call to open weather API
  //display the city and temp
  let apiKey = "86e2f0ff3a54fd7933e9adb20d0d5090";
  let city = document.querySelector("#search-city-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  console.log(axios);
  axios.get(apiUrl).then(showWeather);
  //then create the function showWeather above
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", showCity);
