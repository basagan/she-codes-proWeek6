//Display current time
function showDate(today) {
  today = new Date();
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
  let dayWeek = daysWeek[today.getDay()];
  let date = today.getDate();
  let month = months[today.getMonth()];
  let hour = today.getHours();
  let minutes = today.getMinutes();

  let li = document.querySelector("li.day");
  li.innerHTML = `${dayWeek}, ${date}  ${month}`;

  let time = document.querySelector("li.time");
  time.innerHTML = `${hour} : ${minutes}`;
}

let formForDate = document.querySelector("#search-panel");
formForDate.addEventListener("submit", showDate);

/*Search engine when searching for a city (i.e. Milan), 
display the city name on the page after the user submits the form*/

/*function searchCity(event) {
  event.preventDefault();
  let input = document.querySelector("#search-city");
  let nameCity = document.querySelector("li.name");
  nameCity.innerHTML = input.value.toUpperCase();
}
let formForCity = document.querySelector("#search-panel");
formForCity.addEventListener("submit", searchCity);*/

/* Display a temperature in Celsius and add a link to convert it to Fahrenheit. 
When clicking on it, it should convert the temperature to Fahrenheit. 
When clicking on Celsius, it should convert it back to Celsius.*/

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
