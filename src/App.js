import React from "react";
import  WeatherProvider from "./WeatherProvider/WeatherProvider";
import WeatherApp from "./WeatherApp";
import "./style.scss"

function App() {

  return (
    <WeatherProvider>
      <WeatherApp />
    </WeatherProvider>
  );
}

export default App;
