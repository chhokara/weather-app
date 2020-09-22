import { useState, useEffect } from "react";
import axios from "axios";

export const useWeather = (lat, lon) => {
  const [weather, setWeather] = useState("");
  useEffect(() => {
    search(lat, lon);
  }, [lat, lon]);

  const search = async (lat, lon) => {
    const KEY = "a7b37fc8fa9faed677e7e0bd192282ed";

    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,daily&appid=${KEY}`
    );

    setWeather(data);
  };

  return [weather, search];
};
