import React, { useEffect, useState } from "react";
import SearchBar from "../SearchBar";
import axios from "axios";
import { getPosition } from "../../geolocation";

export default function App() {
  getPosition();

  const lat = localStorage.getItem("latitude");
  const lon = localStorage.getItem("longitude");

  const [coordinates, setCoordinates] = useState({
    lat: lat,
    lng: lon,
  });

  const updateCoords = (latlng) => {
    setCoordinates(latlng);
  };

  useEffect(() => {
    const search = async (lat, lon) => {
      const KEY = "a7b37fc8fa9faed677e7e0bd192282ed";
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,daily&appid=${KEY}`
      );

      console.log(data);
    };
    const timeOutID = setTimeout(() => {
      search(coordinates.lat, coordinates.lng);
    }, 1000);

    return () => {
      clearTimeout(timeOutID);
    };
  }, [coordinates]);

  return <SearchBar updateCoords={updateCoords} />;
}
