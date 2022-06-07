/*calculate the date*/
function formateDate(datestamp) {
  let date = new Date(datestamp);
  let daysWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "Jan",
    "Feb",
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
  let dayWeek = daysWeek[date.getDay()];
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let month = months[date.getMonth()];
  let numberDate = date.getDate();
  return `${dayWeek} ${hours}:${minutes}, ${month} ${numberDate}`;
}

function showFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemperature = document.querySelectorAll(".temp");
  for (i = 0; i < fahrenheitTemperature.length; i++) {
    fahrenheitTemperature[i].innerHTML = Math.round(
      (fahrenheitTemperature[i].textContent * 9) / 5 + 32
    );
  }
  let conversationToF = document.querySelectorAll("#celsius-fahrenheit");
  for (i = 0; i < conversationToF.length; i++) {
    conversationToF[i].innerHTML = "°F";
  }
  let fahrenheitBold = document.querySelector("#fahrenheit");
  fahrenheitBold.innerHTML = "<strong color='black'>°F</strong>";
  let celsiusSmall = document.querySelector("#celsius");
  celsiusSmall.innerHTML = "°C";
}

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", showFahrenheit);

function showCelsius(event) {
  event.preventDefault();
  let celsiusTemperature = document.querySelectorAll(".temp");
  for (i = 0; i < celsiusTemperature.length; i++) {
    celsiusTemperature[i].innerHTML = Math.round(
      ((celsiusTemperature[i].textContent - 32) * 5) / 9
    );
  }
  let conversationToC = document.querySelectorAll("#celsius-fahrenheit");
  for (i = 0; i < conversationToC.length; i++) {
    conversationToC[i].innerHTML = "°C";
  }
  let celsiusBold = document.querySelector("#celsius");
  celsiusBold.innerHTML = "<strong color='black'>°C</strong>";
  let fahrenheitSmall = document.querySelector("#fahrenheit");
  fahrenheitSmall.innerHTML = "°F";
}
let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", showCelsius);

/* when a user searches for a city (example: New York), 
it should display the name of the city on the result page and 
the current temperature of the city*/

function showTemp(response) {
  console.log(response.data.main.temp);
  document.querySelector(`#bigTemp`).innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(`#min`).innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector(`#max`).innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector(`#descriptonId`).innerHTML =
    response.data.weather[0].description;
  document.querySelector("li.name").innerHTML =
    response.data.name.toUpperCase();
  document.querySelector(`#humidity`).innerHTML = response.data.main.humidity;
  document.querySelector(`#windSpeed`).innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector(`.time`).innerHTML = formateDate(
    response.data.dt * 1000
  );
}

function search(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=be2b1d571d2242daa7cb5a3c859e71bb&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function showCityUrl(event) {
  event.preventDefault();
  let city = document.querySelector(`#search-city`).value.toLowerCase();
  search(city);
}

let tempChange = document.querySelector(`#search-panel`);
tempChange.addEventListener(`submit`, showCityUrl);

// current location
function searchMyLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let yourApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=be2b1d571d2242daa7cb5a3c859e71bb&units=metric`;
  axios.get(yourApiUrl).then(showTemp);
}

function showHomeTemp() {
  navigator.geolocation.getCurrentPosition(searchMyLocation);
}
let button = document.querySelector(`#home`);
button.addEventListener(`click`, showHomeTemp);

search("New York");
