import React, { useState, useEffect } from 'react';
import moment from 'moment';


export default function SearchBox() {

  const [weatherData, setWeatherData] = useState([]);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState();

  useEffect(() => {
    // obtain search query
    const { search } = window.location;
    setQuery(new URLSearchParams(search).get('s'));
    
      // call get Weather function using coordinates
      getWeather()
      .then(weather => {
        setWeatherData(weather);
        setError(null);
      })
      .catch(err => {
        setError(err.message);
      });

// use query to call API based on city name
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
}, [query,error])

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


let weatherIcon = null;

  if (weatherData.conditions === 'Clouds') {
    weatherIcon = <img src = "/clouds.png" alt="cloudy" />;
  }
  else if (weatherData.conditions === 'Rain') {
    weatherIcon = <img src = "/rain.jpg" alt="rain" />;
  }
  else if (weatherData.conditions === 'Snow') {
    weatherIcon = <img src = "/snow.jpg" alt="snow" />;
  }
  else if (weatherData.conditions === 'Drizzle') {
    weatherIcon = <img src = "/drizzle.png" alt="drizzle" />;
  }
  else if (weatherData.conditions === 'Mist') {
    weatherIcon = <img src = "/mist.png" alt="mist" />;
  }
  else if (weatherData.conditions === 'Haze') {
    weatherIcon = <img src = "/mist.png" alt="mist" />;
  }
  else {
    weatherIcon = <img src = "/favicon.ico" alt="default" />;
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
        {weatherIcon}
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
