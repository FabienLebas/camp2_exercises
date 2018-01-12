import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import getWeatherForecastFromCoordinates from './forecast.js';
import getCurrentWeatherFromCoordinates from './current.js'
import getCityName from './google.js';
import HoursInput from './HoursInput.js';

const latitude = 50.6410414;
const longitude = 3.1380786;

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      morning: "8",
      afternoon: "18",
      city: "Loading your location",
      current: "Loading current weather",
      forecast: "Loading weather forecast"
    }
  }

  handleInputMorning = (input) => {
    this.setState({
      morning: input,
      afternoon: this.state.afternoon,
      city: this.state.city,
      current: this.state.current,
      forecast: this.state.forecast
    });
  }

  handleInputAfternoon = (input) => {
    this.setState({
      morning: this.state.morning,
      afternoon: input,
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
        <td>{weekday_name}</td>
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

  displayForecast(){
    if(this.state.forecast === "Loading weather forecast"){
      return(
        <tr><td>{this.state.forecast}</td></tr>
      )
    } else {
      let result = this.filterHours(this.state.forecast);
      result = this.removeLastDayIfNotFull(result);
      result = this.removeFirstDayIfNotFull(result);

      console.log("displayForecast");
      console.log(result.map(element => {
        return {
          time: element.FCTTIME.pretty,
          temp: element.temp.metric
        }
      } ));


      return this.daysInside(result).map(dayNumber => {
        const currentDay = this.filter1Day(dayNumber, result);
        return this.displayRow(currentDay[0].FCTTIME.weekday_name, currentDay[0].temp.metric, currentDay[0].icon_url, currentDay[1].temp.metric, currentDay[1].icon_url, this.decideIfBike(currentDay[0], currentDay[1]));
      }
      )
    }
  }

  decideIfBike(dataMorning, dataAfternoon){
    if(dataMorning.fctcode < 8 && dataAfternoon.fctcode < 8 && dataMorning.temp.metric >= 3 && dataAfternoon.temp.metric >=3){ //8 = user limit
      return "http://www.atelierjespers.com/images/pharrell%20williams%20-%20velo%20bleu.jpg";
    }
    return "http://www2.mes-coloriages-preferes.biz/colorino/Images/Large/Vehicules-Voiture-MINI-110563.png";
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Météo</h1>
        </header>
        <h2>{this.state.city}</h2>
        <h1>{this.state.current}°</h1>
        <table>
          <tr>
            <td></td>
            <td></td>
            <HoursInput morning={this.state.morning} afternoon={this.state.afternoon} handleInputMorning={this.handleInputMorning} handleInputAfternoon={this.handleInputAfternoon}/>
          </tr>
          {this.displayForecast()}
        </table>
      </div>
    );
  }
}

export default App;
