import React, { useEffect, useState } from "react";
import axios from "axios";
import { getPosition } from "../../geolocation";
import SideBar from "../SideBar";

export default function App() {
  getPosition();

  const latFromGeolocator = localStorage.getItem("latitude");
  const lonFromGeolocator = localStorage.getItem("longitude");

  const [weather, setWeather] = useState({ //used when loading initial weather
    current:{
      weather:[{
          description:"Rain",
          main: "Rain",
          icon: "10d",
      }],
      temp: 273.15,
  }
  });
  const [location, setLocation] = useState("Vancouver, BC, Canada"); // used for querying unsplash api and showing in sidebar info image
  const [coordinates, setCoordinates] = useState({ //used for querying the weather api
    lat: latFromGeolocator,
    lng: lonFromGeolocator,
  });

  useEffect(()=>{ //runs only when page is first rendered
    getAddress();
  })

  useEffect(() => {
    console.log(weather);
  }, [weather])
  
  useEffect(() => {
    const search = async (lat, lon) => {
      const KEY = "a7b37fc8fa9faed677e7e0bd192282ed";
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,daily&appid=${KEY}`
      );
        setWeather(data);
    };
    const timeOutID = setTimeout(() => {
      search(coordinates.lat, coordinates.lng);
    }, 1000);

    return () => {
      clearTimeout(timeOutID);
    };
  }, [coordinates]);

  function getAddress(){
    const geocodeKEY = 'AIzaSyDf9hbU6kjdJJrm2Z1TKXD_PMjNm_D5EJk';
    const search = async (lat, lon) => {
      axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&result_type=locality&key=${geocodeKEY}`
      ).then(res => {
        const address = res.data.plus_code.compound_code;
        setLocation(address.substr(address.indexOf(" ") + 1));
      });
    };
    search(coordinates.lat, coordinates.lng);
  }

  return(
     <SideBar updateCoords={setCoordinates} setLocation={setLocation} weather={weather} location={location}/>
  )
}
