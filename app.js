
// Selectors
const displayedTemperature = document.querySelector(".displayed-temperature");
const displayedCity = document.querySelector(".displayed-city");
const displayedDate = document.querySelector(".displayed-date");
const displayedHumidity = document.querySelector('.displayed-humidity');
const displayedWind = document.querySelector('.displayed-wind');
const displayedStatus = document.querySelector('.displayed-status');
const displayedDescription = document.querySelector('.displayed-description');
const searchBtn = document.getElementById("search-button");
const enteredCity = document.getElementById("enteredCity");


// Cities on the right Section

const cityChicago = document.getElementById("city-chicago");
const cityIstanbul = document.getElementById("city-istanbul");
const cityNewyork = document.getElementById("city-newyork");
const cityTokyo = document.getElementById("city-tokyo");

// Change Background

const changeBackground = (status) => {
  if(status === 'Clear') {
    document.body.style.background = "url(./images/sunny.jpeg)"
    document.body.style.backgroundSize = "cover"
  } else if(status === 'Clouds') {
    document.body.style.background = "url(./images/cloudy.jpeg)"
    document.body.style.backgroundSize = "cover"
  } else if(status === 'Rain') {
    document.body.style.background = "url(./images/rainy.jpeg)"
    document.body.style.backgroundSize = "cover"
  } else if(status === 'Snow') {
    document.body.style.background = "url(./images/snowy.jpeg)"
    document.body.style.backgroundSize = "cover"
  }
}



const getTimeFromCityName = async (cityName) => {
  const apiKey = '08a6f24e3b4f446fa3a11025a722e1c2';
  const timezoneUrl = `https://api.ipgeolocation.io/timezone?apiKey=${apiKey}&location=${cityName}`;

  const response = await fetch(timezoneUrl);
  const results = await response.json();
  const fullDate = results.date_time_txt;

  return {fullDate}
}

// Right Side City Selection

const getSpecificCity = async (city1, city2 = 'chicago') => {
  
  const key = "e5c7569d601dbed30b62e2b39de234ed";
  const call = `https://api.openweathermap.org/data/2.5/weather?q=${city1 || city2}&appid=${key}&units=imperial`;

  const response = await fetch(call);
  const results = await response.json();

  const timeAndDateRelated = await getTimeFromCityName(city1, city2 = 'chicago');


  displayedCity.innerHTML = results.name;
  displayedTemperature.innerHTML = `${Math.ceil(results.main.temp)}°`;
  displayedHumidity.innerHTML = `${results.main.humidity}%`
  displayedWind.innerHTML = `${Math.ceil(results.wind.speed)} mph`
  displayedStatus.innerHTML = results.weather[0].main;
  displayedDescription.innerHTML = results.weather[0].description;
  displayedDate.innerHTML = timeAndDateRelated.fullDate;

  changeBackground(displayedStatus.innerHTML);

};

cityChicago.addEventListener("click", () => getSpecificCity("chicago"));
cityIstanbul.addEventListener("click", () => getSpecificCity("istanbul"));
cityNewyork.addEventListener("click", () => getSpecificCity("new+york"));
cityTokyo.addEventListener("click", () => getSpecificCity("tokyo"));

//// Search Section //////

const getCurrentWeather = async () => {
  const key = "e5c7569d601dbed30b62e2b39de234ed";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${enteredCity.value}&appid=${key}&units=imperial`;

  const timeAndDateRelated = await getTimeFromCityName(enteredCity.value);

  const response = await fetch(url);
  const results = await response.json();

  displayedCity.innerHTML = results.name;
  displayedTemperature.innerHTML = `${Math.ceil(results.main.temp)}°`;
  displayedHumidity.innerHTML = `${results.main.humidity}%`
  displayedWind.innerHTML = `${Math.ceil(results.wind.speed)} mph`
  displayedStatus.innerHTML = results.weather[0].main;
  displayedDescription.innerHTML = results.weather[0].description;
  displayedDate.innerHTML = `${timeAndDateRelated.fullDate}`;

  changeBackground(displayedStatus.innerHTML);
  enteredCity.value = "";
};

getSpecificCity();
searchBtn.addEventListener("click", getCurrentWeather);
