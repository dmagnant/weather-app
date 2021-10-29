import React, { useEffect, useState } from "react";
import Weather from './weather';
import { Dimmer, Loader } from 'semantic-ui-react';
import './styles.css';
import SearchBox from "./searchbox";

export default function App() {

  const [latitude, setLatitude] = useState([]);
  const [longitude, setLongitude] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
      navigator.geolocation.getCurrentPosition(function(position) {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });
    
      getWeather(latitude, longitude)
      .then(weather => {
        setWeatherData(weather);
        setError(null);
      })
      .catch(err => {
        setError(err.message);
      });

      function getWeather() {
        return fetch(`https://api.openweathermap.org/data/2.5/weather/?lat=${latitude}&lon=${longitude}&units=imperial&appid=d8cc8d40f54cda7ed28d7b58ae3a2e3e`)
          .then(res => handleResponse(res))
          .then(weather => {
            if (Object.entries(weather).length) {
              const mappedData = mapWeather(weather);
              return mappedData;
            }
          });
      }
  }, [latitude,longitude, error])


  function handleResponse(response) {
    if (response.ok) {
      return response.json();
    } else {
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
return (
  <div className="App">
    {(typeof weatherData != 'undefined') ? (
      <div>
        <Weather weatherData={weatherData}/>
        <SearchBox/>
      </div>
    ): (
      <div>
        <Dimmer active>
          <Loader>Loading..</Loader>
        </Dimmer>
      </div>
    )}
  </div>
);
}