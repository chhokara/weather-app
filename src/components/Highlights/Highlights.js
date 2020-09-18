import React from "react";

import UVIndex from "./UVIndex";
import WindStatus from "./WindStatus";
import SunRiseSet from "./SunRiseSet";
import Humidity from "./Humidity";
import Visibility from "./Visibility";
import AirQual from "./AirQual";

export default function Highlights() {
  return (
    <div className="m-5 bg-red-300">
      <h2>Today's Highlights</h2>
      <UVIndex />
      <WindStatus />
      <SunRiseSet />
      <Humidity />
      <Visibility />
      <AirQual />
    </div>
  );
}
