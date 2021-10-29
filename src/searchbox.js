import React, { useState } from 'react';
import moment from 'moment';


export default function SearchBox() {

  const [weatherData, setWeatherData] = useState([]);
  const [error, setError] = useState(null);
  const { search } = window.location;
  const query = new URLSearchParams(search).get('s');

function getWeather() {
  return fetch(`https://api.openweathermap.org/data/2.5/weather/?q=${query}&units=imperial&appid=87eb04e63a1d2d86f382d92a06242e9c`)
    .then(res => handleResponse(res))
    .then(weather => {
      if (Object.entries(weather).length) {
        const mappedData = mapWeather(weather);
        return mappedData;
      }
    });
}

function handleResponse(response) {
if (response.ok) {
    return response.json();
  } 
  else {
    throw new Error("Please Enable your Location in your browser!");
  }
}

function mapWeather(data) {
  const mappedWeather = {
    date: data.dt * 1000, // convert from seconds to milliseconds
    conditions: data.weather[0].main,
    temperature: Math.round(data.main.temp),
    city: data.name,
    weather: data.weather.main,
    humidity: data.main.humidity,
  };
    return mappedWeather;
  }
if (query != null){
  getWeather()
  .then(weather => {
    setWeatherData(weather);
    setError(null);
  })
  .catch(err => {
    setError(err.message);
  });
}

  return (
    <div>
      <form className="searchbox">
        <input 
        type="search" 
        placeholder="enter city name"
        name="s"
        />
        <button type="submit">Get Weather</button>
    </form>
    <div className="main">
    <div className="top">
      <p className="header">Current weather in: {weatherData.city}</p>
    </div>
    <div className="flex">
      <p className="day">{moment().format('dddd')}, <span>{moment().format('LL')}</span></p>
      <div className="flex">
        <p className="conditions">Conditions: {weatherData.conditions}</p>
      </div>
    </div>

    <div className="flex">
      <p className="temp">Temperature: {weatherData.temperature} &deg;F</p>
      <p className="temp">Humidity: {weatherData.humidity} %</p>
    </div>
  </div>
  </div>)
}
