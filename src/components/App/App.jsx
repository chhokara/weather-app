import React, { useEffect, useState } from "react";
import axios from "axios";
import { getPosition } from "../../functions/geolocation";
import SideBar from "../SideBar";

export default function App() {
  getPosition();

  const latFromGeolocator = localStorage.getItem("latitude");
  const lonFromGeolocator = localStorage.getItem("longitude");

  const [weather, setWeather] = useState({
    //used when loading initial weather
    current: {
      // object used when loading weather from api
      weather: [
        {
          description: "Loading",
          main: "Loading",
          icon: "10d",
        },
      ],
      temp: 273.15,
    },
  });

  const [location, setLocation] = useState("Vancouver, BC, Canada"); // used for querying unsplash api and showing in sidebar info image
  const [coordinates, setCoordinates] = useState({
    //used for querying the weather api
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
    };
    search(coordinates.lat, coordinates.lng);
  }, [coordinates]);

  //only runs when first rendered
  useEffect(() => {
    const geocodeKEY = "AIzaSyDf9hbU6kjdJJrm2Z1TKXD_PMjNm_D5EJk";
    const search = async (lat, lon) => {
      axios
        .get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&result_type=locality&key=${geocodeKEY}`
        )
        .then((res) => {
          const address = res.data.plus_code.compound_code;
          setLocation(address.substr(address.indexOf(" ") + 1));
        });
    };
    search(coordinates.lat, coordinates.lng);
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <SideBar
        updateCoords={setCoordinates}
        setLocation={setLocation}
        weather={weather}
        location={location}
      />
    </div>
  );
}
