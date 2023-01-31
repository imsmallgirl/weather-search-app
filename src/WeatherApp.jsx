import React, { useContext } from "react";
import UseAnimations from "react-useanimations";
import CountryWeather from "./components/CountryWeather/CountryWeather";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather";
import { WeatherContext } from "./WeatherProvider/WeatherProvider";
import loading from "react-useanimations/lib/loading";

const WeatherApp = () => {
  const { loaded } = useContext(WeatherContext);

  return (
    <>
      {loaded === true ? (
        <div className="container">
          <CountryWeather />
          <CurrentWeather />
        </div>
      ) : (
        <div className="loading-container">
          <UseAnimations animation={loading} size={70} />
        </div>
      )}
    </>
  );
};

export default WeatherApp;
