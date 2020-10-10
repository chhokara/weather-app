import React, { useEffect } from "react";
import SearchBar from "./SearchBar";
import SideBarInfo from "./SideBarInfo";
import Clock from "react-live-clock";

export default function SideBar({
  location,
  setLocation,
  weather,
  updateCoords,
}) {
  
  let mainIconSrc = `/icons/${weather.current.weather[0].icon}.png`;
  let tempCelcius = Math.round(weather.current.temp - 273.15);  

  useEffect(() => {
    // eslint-disable-next-line
    mainIconSrc = `/icons/${weather.current.weather[0].icon}.png`;
  }, [weather]);
  return (
    <div className="w-full h-full bg-gray-200">
      {" "}
      {/* Delete div before merging with dev*/}
      <div className="m-0 p-6 w-2/7 h-screen bg-white">
        <SearchBar
          location={location}
          setLocation={setLocation}
          updateCoords={updateCoords}
        />
        <div>
          <img className="h-64 w-64" src={mainIconSrc} alt="Main Icon"></img>
        </div>
        <div className="w-full -mt-8 pb-6 text-left border-b">
          <h1 className="text-8xl mx-8 ">{tempCelcius + "º"}</h1>
          <h3 className="text-2xl mx-6">
            <span>
              <Clock
                format={"dddd"}
                ticking={true}
                timezone={weather.timezone}
              />
            </span>
            {", "}
            <span className="text-gray-500">
              <Clock
                format={"HH:mm"}
                ticking={true}
                timezone={weather.timezone}
              />
            </span>
          </h3>
        </div>
        <SideBarInfo weather={weather} location={location} />
      </div>
    </div>
  );
}
