
// Selectors
const displayedTemperature = document.querySelector(".displayed-temperature");
const displayedCity = document.querySelector(".displayed-city");
const displayedTime = document.querySelector(".displayed-time");
const displayedDate = document.querySelector(".displayed-date");
const searchBtn = document.getElementById("search-button");
const enteredCity = document.getElementById("enteredCity");


// Cities on the right Section

const cityChicago = document.getElementById("city-chicago");
const cityIstanbul = document.getElementById("city-istanbul");
const cityNewyork = document.getElementById("city-newyork");
const cityCalifornia = document.getElementById("city-california");



const getSpecificCity = async (city) => {
  
  const key = "e5c7569d601dbed30b62e2b39de234ed";
  const call = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;

  const response = await fetch(call);
  const results = await response.json();

  console.log(results);
  displayedCity.innerHTML = results.name;
  displayedTemperature.innerHTML = `${Math.ceil(results.main.temp)}°`;
};

cityChicago.addEventListener("click", () => getSpecificCity("chicago"));
cityIstanbul.addEventListener("click", () => getSpecificCity("istanbul"));
cityNewyork.addEventListener("click", () => getSpecificCity("new+york"));
cityCalifornia.addEventListener("click", () => getSpecificCity("california"));



//// Search Section //////

const getCurrentWeather = async () => {
  const key = "e5c7569d601dbed30b62e2b39de234ed";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${enteredCity.value}&appid=${key}&units=metric`;

  const response = await fetch(url);
  const results = await response.json();

  console.log(results);
  displayedCity.innerHTML = results.name;
  displayedTemperature.innerHTML = `${Math.ceil(results.main.temp)}°`;
};

searchBtn.addEventListener("click", getCurrentWeather);
