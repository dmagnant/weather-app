import React from 'react';
import './styles.css';
import moment from 'moment';
import '.cloudy.svg'

export default function weather({weatherData}) {


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
  else {
    weatherIcon = <img src = "/favicon.ico" alt="default" />;

  }
  return (<div className="main">
      <div className="top">
      {/* display City Name */}
        <p className="header">Weather in: {weatherData.city}</p>
      </div>
      <div className="flex">
      {/* display current Date */}
        <p className="day"> on  {moment().format('dddd')}, <span>{moment().format('LL')}</span></p>
        <div className="flex">
       {/* display Weather information */}
        <p className="conditions">Conditions: {weatherData.conditions}</p>
        {weatherIcon}
        <p className="temp">Temperature: {weatherData.temperature} &deg;F</p>
        <p className="humid">Humidity: {weatherData.humidity} %</p>
        </div>
      </div>
    </div>)
}