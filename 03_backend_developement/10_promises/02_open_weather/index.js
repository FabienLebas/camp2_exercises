const fetch = require("node-fetch");
const openWeatherId = process.env.openWeatherId;

function getCurrentWeatherByCityName(city, country_code){
  return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country_code}&APPID=${openWeatherId}&units=metric`)
    .then(response => response.json())
    .then(object => object.main.temp)
    .then(temperature => {
      console.log(temperature);
      return parseInt(temperature, 10);
    })
    .catch(error => console.warn(error))
  ;
}

//getCurrentWeatherByCityName("Paris", "fr");

function getCurrentWeatherByCoordinates(lat, lon){
  return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${openWeatherId}&units=metric`)
    .then(response => response.json())
    .then(object => object.main.temp)
    .then(temperature => {
      console.log(temperature);
      return parseInt(temperature, 10);
    })
    .catch(error => console.warn(error))
  ;
}

//getCurrentWeatherByCoordinates(32.661343, 51.680374);

module.exports = {
  getCurrentWeatherByCityName: getCurrentWeatherByCityName,
  getCurrentWeatherByCoordinates: getCurrentWeatherByCoordinates
};
