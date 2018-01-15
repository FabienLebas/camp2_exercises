import React, { Component } from 'react';
import './App.css';
import getWeatherForecastFromCoordinates from './forecast.js';
import getCurrentWeatherFromCoordinates from './current.js'
import getCityName from './google.js';
import HoursInput from './HoursInput.js';
import TempInput from './TempInput.js';

const latitude = 50.6410414;
const longitude = 3.1380786;

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      morning: "8",
      afternoon: "18",
      tempmin: 3,
      tempmax: 27,
      city: "Loading your location",
      current: "Loading current weather",
      forecast: "Loading weather forecast"
    }
  }

  handleInputMorning = (input) => {
    this.setState({
      morning: input,
      afternoon: this.state.afternoon,
      tempmin: this.state.tempmin,
      tempmax: this.state.tempmax,
      city: this.state.city,
      current: this.state.current,
      forecast: this.state.forecast
    });
  }

  handleInputAfternoon = (input) => {
    this.setState({
      morning: this.state.morning,
      afternoon: input,
      tempmin: this.state.tempmin,
      tempmax: this.state.tempmax,
      city: this.state.city,
      current: this.state.current,
      forecast: this.state.forecast
    });
  }

  handleInputTempMin = (input) => {
    this.setState({
      morning: this.state.morning,
      afternoon: this.state.afternoon,
      tempmin: input,
      tempmax:this.state.tempmax,
      city: this.state.city,
      current: this.state.current,
      forecast: this.state.forecast
    });
  }

  handleInputTempMax = (input) => {
    this.setState({
      morning: this.state.morning,
      afternoon: this.state.afternoon,
      tempmin: this.state.tempmin,
      tempmax:input,
      city: this.state.city,
      current: this.state.current,
      forecast: this.state.forecast
    });
  }

  componentDidMount(){
    getCityName(latitude, longitude)
      .then(returnedCity => {
        this.setState({
          morning: this.state.morning,
          afternoon: this.state.afternoon,
          tempmin: this.state.tempmin,
          tempmax: this.state.tempmax,
          city: returnedCity.city,
          current: this.state.current,
          forecast: this.state.forecast
        })
      });
    getCurrentWeatherFromCoordinates(latitude, longitude)
      .then(currentWeather => {
        this.setState({
          morning: this.state.morning,
          afternoon: this.state.afternoon,
          tempmin: this.state.tempmin,
          tempmax: this.state.tempmax,
          city: this.state.city,
          current: currentWeather,
          forecast: this.state.forecast
        })
      })
    getWeatherForecastFromCoordinates(latitude, longitude, this.state.morning, this.state.afternoon)
      .then(forecastResult => {
        console.log("Initial");
        console.log(forecastResult.map(element => {
          return {
            time: element.FCTTIME.pretty,
            temp: element.temp.metric
          }
        } ));
        this.setState({
          morning: this.state.morning,
          afternoon: this.state.afternoon,
          tempmin: this.state.tempmin,
          tempmax: this.state.tempmax,
          city: this.state.city,
          current: this.state.current,
          forecast: forecastResult
        })
      });
  }

  filter1Day(dayNumber, forecast){
    return forecast.filter(element => element.FCTTIME.mday === dayNumber);
  }

  daysInside(forecast){
    const notUniques = forecast.map(element => element.FCTTIME.mday);
    let uniques = [];
    for (let i=0; i < notUniques.length; i++){
      if(!uniques.includes(notUniques[i])){
        uniques.push(notUniques[i]);
      }
    }
    return uniques;
  }

  displayRow(weekday_name, morningTemp, morningIcon, afternoonTemp, afternoonIcon, bikeIcon){
    return (
      <tr>
        <td scope="row">{weekday_name}</td>
        <td><img class="card-img-top decisionImage" src={bikeIcon} alt="Bike image cap"/></td>
        <td>{morningTemp}°<br/>
            <img class="card-img-top icon" src={morningIcon} alt="Morning Weather icon" />
        </td>
        <td>{afternoonTemp}°<br/>
            <img class="card-img-top icon" src={afternoonIcon} alt="Afternoon Weather icon" />
        </td>
      </tr>
    )
  }

  filterHours(forecast){
    return forecast.filter(hourForecast => hourForecast.FCTTIME.hour === this.state.morning || hourForecast.FCTTIME.hour === this.state.afternoon );
  }

  removeLastDayIfNotFull(forecast){
    if(forecast[forecast.length - 1].FCTTIME.mday !== forecast[forecast.length - 2].FCTTIME.mday){
      forecast.pop();
    }
    return forecast;
  }

  removeFirstDayIfNotFull(forecast){
    if(forecast[0].FCTTIME.mday !== forecast[1].FCTTIME.mday){
      forecast.shift();
    }
    return forecast;
  }

  tomorrowOrToday(weekday){
    const today = new Date();
    const day = today.getDay();
    const testDays = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
    if(weekday === testDays[day]){
      return "aujourd'hui";
    } else if (weekday === testDays[day + 1]){
      return "demain";
    } else {
    return weekday;
    }
  }

  displayForecast(){
    if(this.state.forecast === "Loading weather forecast"){
      return(
        <tr><td scope="row">{this.state.forecast}</td></tr>
      )
    } else {
      let result = this.filterHours(this.state.forecast);
      result = this.removeLastDayIfNotFull(result);
      result = this.removeFirstDayIfNotFull(result);
      return this.daysInside(result).map(dayNumber => {
        const currentDay = this.filter1Day(dayNumber, result);
        return this.displayRow(this.tomorrowOrToday(currentDay[0].FCTTIME.weekday_name), currentDay[0].temp.metric, currentDay[0].icon_url, currentDay[1].temp.metric, currentDay[1].icon_url, this.decideIfBike(currentDay[0], currentDay[1]));
      }
      )
    }
  }

  decideIfBike(dataMorning, dataAfternoon){
    if(dataMorning.fctcode < 8 &&
       dataAfternoon.fctcode < 8 &&
       dataMorning.temp.metric >= this.state.tempmin &&
       dataAfternoon.temp.metric >=this.state.tempmin &&
       dataMorning.temp.metric <= this.state.tempmax &&
       dataAfternoon.temp.metric <= this.state.tempmax
      ){
      return "http://www.atelierjespers.com/images/pharrell%20williams%20-%20velo%20bleu.jpg";
    }
    return "http://www2.mes-coloriages-preferes.biz/colorino/Images/Large/Vehicules-Voiture-MINI-110563.png";
  }

  render() {
    return (
      <div className="App jumbotron jumbotron-fluid">
        <nav className="navbar navbar-dark bg-info">
          <a href="/whoweare.html">
            <span className="navbar-brand mb-0 h1">Bike or Car? <span className="beta">beta</span></span>
          </a>
          <a href="/">
            <i className="fa fa-refresh" aria-hidden="true"></i>
          </a>
        </nav>
        <div className="container">
          <h2 className="display-5 text-center font-weight-normal">{this.state.city}</h2>
          <p className="text-center">description, vent x km/h de ...</p>
          <h1 className="display-5 text-center font-weight-normal">{this.state.current}°</h1>
        </div>
        <div className="container">
          <table className="table">
            <thead>
              <tr>
                <td></td>
                <TempInput min={this.state.tempmin} max={this.state.tempmax} handleInputTempMin={this.handleInputTempMin} handleInputTempMax={this.handleInputTempMax}/>
                <HoursInput morning={this.state.morning} afternoon={this.state.afternoon} handleInputMorning={this.handleInputMorning} handleInputAfternoon={this.handleInputAfternoon}/>
              </tr>
            </thead>
            <tbody>
              {this.displayForecast()}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;
