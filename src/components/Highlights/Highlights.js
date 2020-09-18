import React from "react";

import UVIndex from "./UVIndex";
import WindStatus from "./WindStatus";
import SunRiseSet from "./SunRiseSet";
import Humidity from "./Humidity";
import Visibility from "./Visibility";
import AirQual from "./AirQual";

export default function Highlights() {
  return (
    <div className="m-10 w-7/12 h-full p-5 bg-gray-300">
      <h2 className="text-lg text-purple-black font-extrabold">
        Today's Highlights
      </h2>
      <div className="flex flex-wrap">
        <UVIndex />
        <WindStatus />
        <SunRiseSet />
        <Humidity />
        <Visibility />
        <AirQual />
      </div>
    </div>
  );
}
