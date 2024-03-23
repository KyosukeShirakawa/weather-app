const locationValue = document.querySelector('#location');
const submitBtn = document.querySelector('#submit-btn');

// weather information container
const city = document.querySelector('#city');
const country = document.querySelector('#country');
const time = document.querySelector('#time');
const condition = document.querySelector('#condition');
const temperature = document.querySelector('#temperature');
const feelsLike = document.querySelector('#feelsLike');
const humidity = document.querySelector('#humidity');

let weatherInfo;


submitBtn.addEventListener('click', handleSubmit);

async function handleSubmit(e) {
  e.preventDefault();
  let location = locationValue.value;
  await processFetchedData(location);
  render();
  locationValue.innerHTML = ''
}

function render() {
  city.textContent = weatherInfo.city;
  country.textContent = weatherInfo.country;
  time.textContent = weatherInfo.time;
  condition.textContent = weatherInfo.condition;
  temperature.textContent = weatherInfo.temperature;
  feelsLike.textContent = weatherInfo.feelsLike;
  humidity.textContent = weatherInfo.humidity;

}


async function fetchWeather(location) {
  
  const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=202374e28e364339901232211242003&q=${location}`, {mode:'cors'});
  const weather = await response.json();
  return weather
}

async function processFetchedData(loc) {
  let weather = await fetchWeather(loc);
  let locInfo = weather.location;
  let currInfo = weather.current;
  let info = {
    city: locInfo.name,
    country: locInfo.country,
    time: locInfo.localtime,
    condition: currInfo.condition.text,
    temperature: currInfo.temp_c,
    feelsLike: currInfo.feelslike_c,
    humidity: currInfo.humidity
  }
  weatherInfo = info;



}