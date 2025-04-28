import React, { useState } from "react";
import axios from "axios";

export default function SearchEngine() {
  let [city, setCity] = useState("");
  let [loaded, setLoaded] = useState(false);
  let [weather, setWeather] = useState({});
  let form = (
    <form onSubmit={showCityTemp}>
      <input type="search" onChange={updateCity} />
      <input type="submit" value="Search" />
    </form>
  );
  function showCityTemp(event) {
    event.preventDefault();
    let apiKey = "50fa4024e3b1d5eac2f51ab18a47e997";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(showTemperature);
  }
  function showTemperature(response) {
    setLoaded(true);
    setWeather({
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
    });
  }
  function updateCity(event) {
    setCity(event.target.value);
  }
  if (loaded) {
    return (
      <div>
        {form}
        <ul>
          <li>Temperature: {Math.round(weather.temperature)}ºC </li>
          <li>{weather.description} </li>
          <li>humidity: {weather.humidity}% </li>
          <li>wind: {weather.wind}mph </li>
          <li>
            <img src={weather.icon} alt="icon of weather elements" />
          </li>
        </ul>
      </div>
    );
  } else {
    return form;
  }
}
