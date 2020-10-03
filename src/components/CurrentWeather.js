import React, { useRef } from "react";
import { toFahrenheit } from "../functions/fahrenheit";
import "../css/CurrentWeather.css";
import { datetime } from "../functions/datetime";

export default function CurrentWeather({ weather }) {
  const imgRef = useRef();
  const tempRef = useRef();
  const timeRef = useRef();

  // When CurrentWeather is first rendered, weather is null
  if (weather) {
    const icon = weather.current.weather[0].icon;
    imgRef.current.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${icon}@2x.png`
    );
    const updatedTemp = toFahrenheit(weather.current.temp);
    tempRef.current.textContent = updatedTemp;
    timeRef.current.textContent = datetime(weather.current.dt);
  }
  return (
    <div className="current-weather">
      <img
        ref={imgRef}
        src="http://openweathermap.org/img/wn/02d@2x.png"
        className="temperature-icon"
        alt="icon"
      />
      <div className="temperature">
        <div className="degree-section">
          <h2 ref={tempRef} className="temperature-degree">
            34
          </h2>
          <span>°F</span>
        </div>
        <span ref={timeRef}>Monday, 16:00</span>
      </div>
    </div>
  );
}
