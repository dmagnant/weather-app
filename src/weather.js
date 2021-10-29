import React from 'react';
import './styles.css';
import moment from 'moment';
import '.cloudy.svg'

export default function weather({weatherData}) {

  return (<div className="main">
      <div className="top">
        <p className="header">Weather in: {weatherData.city}</p>
      </div>
      <div className="flex">
        <p className="day"> on  {moment().format('dddd')}, <span>{moment().format('LL')}</span></p>
        <div className="flex">
        <p className="conditions">Conditions: {weatherData.conditions}</p>
        <p className="temp">Temperature: {weatherData.temperature} &deg;F</p>
        <p className="temp">Humidity: {weatherData.humidity} %</p>
        </div>
      </div>
    </div>)
}