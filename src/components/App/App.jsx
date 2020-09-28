import React, { useEffect, useState } from "react";
import axios from "axios";
import { getPosition } from "../../geolocation";
import SideBar from "../SideBar";

export default function App() {
  getPosition();

  const latFromGeolocator = localStorage.getItem("latitude");
  const lonFromGeolocator = localStorage.getItem("longitude");

  const [weather, setWeather] = useState({
    current:{
      weather:[{
          description:"Test",
          icon: "10d",
      }]
  }
  });
  const [location, setLocation] = useState("Vancouver, BC, Canada"); // used for querying unsplash api and showing in sidebar info image
  const [coordinates, setCoordinates] = useState({ //used for querying the weather api
    lat: latFromGeolocator,
    lng: lonFromGeolocator,
  });
  
  useEffect(() => {
    const search = async (lat, lon) => {
      const KEY = "a7b37fc8fa9faed677e7e0bd192282ed";
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,daily&appid=${KEY}`
      );
        setWeather(data);
        console.log(data);
    };
    const timeOutID = setTimeout(() => {
      search(coordinates.lat, coordinates.lng);
    }, 1000);

    return () => {
      clearTimeout(timeOutID);
    };
  }, [coordinates]);

  return(
     <SideBar updateCoords={setCoordinates} setLocation={setLocation} weather={weather} location={location}/>
  )
}
