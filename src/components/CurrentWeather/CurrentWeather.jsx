import React, { useContext } from "react";
import { WeatherContext } from "../../WeatherProvider/WeatherProvider";
import CurrentWeatherTab from "./CurrentWeatherTab";

const CurrentWeather = () => {
  const {
    hereName,
    date,
    text,
    temp_c,
    hereCountry,
    feelslike_c,
    sunset,
    icon,
  } = useContext(WeatherContext);

  return (
    <div className="current">
      <div className="current-top">
        <div>
          <i>
            <img src={icon} alt={text} />
          </i>
          <dl>
            <dt>Today</dt>
            <dd>{date}</dd>
          </dl>
        </div>
        <h3>
          {temp_c}
          <span>℃</span>
        </h3>
        <p>
          {hereName}, {hereCountry}
        </p>
        <ul>
          <li>Feel like {feelslike_c}℃</li>
          <li>Sunset {sunset}</li>
        </ul>
      </div>
      <CurrentWeatherTab />
    </div>
  );
};

export default CurrentWeather;
