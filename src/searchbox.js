import React, { useState } from 'react';
import moment from 'moment';


export default function SearchBox() {

  const [weatherData, setWeatherData] = useState([]);
  const [error, setError] = useState(null);

  // obtain search query
  const { search } = window.location;
  const query = new URLSearchParams(search).get('s');

// use query to call API based on city name
function getWeather() {
  return fetch(`https://api.openweathermap.org/data/2.5/weather/?q=${query}&units=imperial&appid=3c74293c5d07baca71da399bc558efee`)
    .then(res => handleResponse(res))
    .then(weather => {
      if (Object.entries(weather).length) {
        const mappedData = mapWeather(weather);
        return mappedData;
      }
    });
}

  // handle the response from API
function handleResponse(response) {
if (response.ok) {
    return response.json();
  } 
}

// map weather data from json to be able to display it later
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
        placeholder="search weather by city name"
        name="s"
        />
        {/* once search button is clicked, execute Weather Search */}
        <button type="submit">Get Weather</button>
    </form>
      {(query != null) ? (
    <div className="main">
    <div className="top">
    <p className="header">Weather in: {weatherData.city}</p>
    </div>
    <div className="flex">
    <p className="day"> on  {moment().format('dddd')}, <span>{moment().format('LL')}</span></p>
      <div className="flex">
        <p className="conditions">Conditions: {weatherData.conditions}</p>
        <p className="temp">Temperature: {weatherData.temperature} &deg;F</p>
        <p className="humid">Humidity: {weatherData.humidity} %</p>
      </div>
    </div>
  </div>
      )
      :
      (
        <div></div>
      )}
  </div>
  )
}
