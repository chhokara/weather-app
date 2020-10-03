import React, { useEffect, useState } from "react";
import SearchBar from "../SearchBar";
import axios from "axios";
import { getPosition } from "../../functions/geolocation";
import CurrentWeather from "../CurrentWeather";

export default function App() {
  getPosition();

  const lat = localStorage.getItem("latitude");
  const lon = localStorage.getItem("longitude");

  const [coordinates, setCoordinates] = useState({
    lat: lat,
    lng: lon,
  });
  const [weather, setWeather] = useState(null);

  const updateCoords = (latlng) => {
    setCoordinates(latlng);
  };

  // We make a call to weather api every time the coordinates for selected city change
  useEffect(() => {
    const search = async (lat, lon) => {
      const KEY = "a7b37fc8fa9faed677e7e0bd192282ed";
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,daily&appid=${KEY}`
      );
      setWeather(data);
      console.log(data);
    };

    search(coordinates.lat, coordinates.lng);
  }, [coordinates]);

  return (
    <div>
      <SearchBar updateCoords={updateCoords} />
      <CurrentWeather weather={weather} />
    </div>
  );
}
