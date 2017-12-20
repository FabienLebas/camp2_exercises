const express = require("express");
const app = express();
const fetch = require("node-fetch");
const openWeatherId = process.env.openWeatherId;

const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log("Server listening on port:" + port);
});

function getCurrentWeather(city, country){
  return fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${openWeatherId}&units=metric&lang=fr`)
    .then(response => response.json())
    .then(weatherGlobal => {
      const result = {
        city: weatherGlobal.name,
        temperature: Math.round(weatherGlobal.main.temp),
        descriptions: weatherGlobal.weather.map(object => object.description),
        iconURLs: weatherGlobal.weather.map(object => `http://openweathermap.org/img/w/${object.icon}.png` )
      };
      return result;
    })
    .catch(error => {
      console.warn(error);
    })
  ;
}

function displayCards(descriptions, iconURLs){
  let result ="";
  for (let i=0; i<descriptions.length; i++){
    result += `<div class="card">
                <img class="card-img-top w-50" src=${iconURLs[i]} alt="Card image cap">
                <div class="card-body">
                <p class="card-text">${descriptions[i]}</p>
                </div>
              </div>`;
  }
  return result;
}

app.get(`/:param`, function (request, result) {
    getCurrentWeather(request.params.param, "fr")
    .then(weatherObject => result.send(`
      <!doctype html>
      <html lang="en">
      <head>
        <title>${weatherObject.city}</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossorigin="anonymous">
        <style>
          .jumbotron{
            background-color: white;
          }
        </style>
        </head>
      <body>
      <div class="jumbotron jumbotron-fluid">
        <div class="container">
        <div class="container col-4 offset-8">
          <form>
            <div class="form-row">
              <div>
                <input type="text" class="form-control" placeholder="Ville" id="newCity">
              </div>
              <button type="button" class="btn btn-primary" id="go">Changer de ville</button>
            </div>
          </form>
        </div>
          <h1 class="display-3">${weatherObject.city}</h1>
          <p class="lead">${weatherObject.temperature}°C</p>
          <div class="card-group col-4">${displayCards(weatherObject.descriptions, weatherObject.iconURLs)}</div>
        </div>
      </div>




      <script>
       const myInput = document.getElementById("newCity");
        const myButton = document.getElementById("go");
        myButton.addEventListener("click", () => {
          window.location.href = "http://localhost:3000/" + myInput.value;
        });
      </script>
      <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js" integrity="sha384-vFJXuSJphROIrBnz7yo7oB41mKfc8JzQZiCq4NCceLEaO4IHwicKwpJf9c9IpFgh" crossorigin="anonymous"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js" integrity="sha384-alpBpkh1PFOepccYVYDB4do5UnbKysX5WZXm3XxPqe5iKTfUKjNkCk9SaVuEZflJ" crossorigin="anonymous"></script>
      </body>
      </html>
      `
    ));
});



function getCurrentWeatherByCoordinates(lat, lng){
  return fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&APPID=${openWeatherId}&units=metric&lang=fr`)
    .then(response => response.json())
    .then(weatherGlobal => {
      const result = {
        city: weatherGlobal.name,
        temperature: Math.round(weatherGlobal.main.temp),
        descriptions: weatherGlobal.weather.map(object => object.description),
        iconURLs: weatherGlobal.weather.map(object => `http://openweathermap.org/img/w/${object.icon}.png` )
      };
      return result;
    })
    .catch(error => {
      console.warn(error);
    })
  ;
}


app.get("/", function (request, result) {
  result.send(`
    <!doctype html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossorigin="anonymous">
    </head>
    <body>
      <p>Click the button to get your coordinates.</p>
      <button onclick="getLocation()">Try It</button>
      <p id="demo"></p>
      <script>
      var x = document.getElementById("demo");
      navigator.geolocation.getCurrentPosition(showPosition);

      function getLocation() {
          if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(showPosition);
          } else {
              x.innerHTML = "Geolocation is not supported by this browser.";
          }
      }

      function showPosition(position) {
          x.innerHTML = "Latitude: " + position.coords.latitude +
          "<br>Longitude: " + position.coords.longitude;
      }

      </script>
      <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js" integrity="sha384-vFJXuSJphROIrBnz7yo7oB41mKfc8JzQZiCq4NCceLEaO4IHwicKwpJf9c9IpFgh" crossorigin="anonymous"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js" integrity="sha384-alpBpkh1PFOepccYVYDB4do5UnbKysX5WZXm3XxPqe5iKTfUKjNkCk9SaVuEZflJ" crossorigin="anonymous"></script>
    </body>
    </html>
    `);


});
