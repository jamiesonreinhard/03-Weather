// TODO: Write your JS code in here
import $ from 'jquery';
import 'select2';

const cities = ["Amsterdam", "Bali", "Barcelona", "Belo Horizonte", "Berlin", "Bordeaux", "Brussels", "Buenos Aires", "Casablanca", "Chengdu", "Copenhagen", "Kyoto", "Lausanne", "Lille", "Lisbon", "London", "Lyon", "Madrid", "Marseille", "Melbourne", "Mexico", "Milan", "Montréal", "Nantes", "Oslo", "Paris", "Rio de Janeiro", "Rennes", "Rome", "São Paulo", "Seoul", "Shanghai", "Shenzhen", "Singapore", "Stockholm", "Tel Aviv", "Tokyo"];

$('#city-input').select2({ data: cities, width: '100%' });

const apiKey = '0ca0b42ad7f2b70c30a2b34588c7c174';
const weatherLocation = document.getElementById('weather-location');
const todaysDate = document.getElementById('todays-date');
const weatherNow = document.getElementById('weather-now');
const tempNow = document.getElementById('temp-now');

const dateFunction = () => {
  const today = new Date();
  const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
  const dateTime = `${date} ${time}`;
  return dateTime;
};

const displayCurrentWeather = (data) => {
  const city = data.name;
  const country = data.sys.country;
  const weather = data.weather[0].description;
  const temp = data.main.temp;
  console.log(weather);
  weatherLocation.innerText = `Weather in ${city}, ${country}`;
  todaysDate.innerText = dateFunction();
  weatherNow.innerText = weather;
  tempNow.innerText = `${temp}° C`;
};

const fetchCurrentWeather = (query) => {
  fetch(`http://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(displayCurrentWeather);
};

const fetchWeatherByCoordinates = (data) => {
  const latitude = data.coords.latitude;
  const longitude = data.coords.longitude;
  fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`)
    .then(response => response.json())
    .then(displayCurrentWeather);
};

const queryForm = document.getElementById('query-form');

queryForm.addEventListener('submit', (event) => {
  const cityInput = document.getElementById('city-input').value;
  event.preventDefault();
  fetchCurrentWeather(cityInput || "Mexico City");
});

const currentLocationButton = document.getElementById('current-location-button');

currentLocationButton.addEventListener('click', (event) => {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition((data) => {
    fetchWeatherByCoordinates(data);
    console.log(data);  
  });
});
