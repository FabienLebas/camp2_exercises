const fetch = require("node-fetch");
const weather = require("../02_open_weather");
const googleAPIKey = process.env.googleAPIKey;

function getWeatherFromText (text){
  return fetch(encodeURI(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${text}&key=${googleAPIKey}`))
    .then(response => response.json())
    .then(object => {
      return {lat: object.results[0].geometry.location.lat,
        lng: object.results[0].geometry.location.lng
      };
    })
    .then(coordinates => weather.getCurrentWeatherByCoordinates(coordinates.lat, coordinates.lng))
    .catch(error => console.warn(error))
  ;
}

//getWeatherFromText("Decathlon campus");

module.exports = getWeatherFromText;
