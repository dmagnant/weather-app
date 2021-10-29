import React from 'react';
import './styles.css';
import moment from 'moment';
import '.cloudy.svg'

export default function weather({weatherData}) {

  return (<div className="main">
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

    </div>)
}