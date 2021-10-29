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

  // get location coordinates
  useEffect(() => {
      navigator.geolocation.getCurrentPosition(function(position) {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });
    
      // call get Weather function using coordinates
      getWeather(latitude, longitude)
      .then(weather => {
        setWeatherData(weather);
        setError(null);
      })
      .catch(err => {
        setError(err.message);
      });

      // call the API to obtain weather information
      function getWeather() {
        return fetch(`https://api.openweathermap.org/data/2.5/weather/?lat=${latitude}&lon=${longitude}&units=imperial&appid=87eb04e63a1d2d86f382d92a06242e9c`)
          .then(res => handleResponse(res))
          .then(weather => {
            if (Object.entries(weather).length) {
              const mappedData = mapWeather(weather);
              return mappedData;
            }
          });
      }
  }, [latitude,longitude, error])

  // handle the response / throw error if location is not enabled
  function handleResponse(response) {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Please Enable your Location in your browser!");
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

// if weather data is avaialble, display it and searchbox
return (
  <div className="App">
    {(typeof weatherData != 'undefined') ? (
      <div>
        <Weather weatherData={weatherData}/>
        <SearchBox/>
      </div>
    ): (
      // otherwise, display loading screen
      <div>
        <Dimmer active>
          <Loader>Loading..</Loader>
        </Dimmer>
      </div>
    )}
  </div>
);
}