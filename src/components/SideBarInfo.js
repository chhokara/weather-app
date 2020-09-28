import React, {useState} from 'react';
import Unsplash, { toJson } from 'unsplash-js';

const unsplash = new Unsplash({
  accessKey: "CVW1RwmJ8xgIjKrZ57eZLbJSteyuxOjcwjKxSsA8V00",
    // Optionally if using a node-fetch polyfill or a version of fetch which supports the timeout option, you can configure the request timeout for all requests
  timeout: 500 // values set in ms
});

export default function SideBarInfo({weather, location}){
    const[pictureSrc, changePic] = useState("å");

    unsplash.search.photos(location.split(",", 1), 1, 1, { orientation: "landscape" }).then(toJson).then(json => { //search unsplash using first location before first ','
        if(json.results[0] !== undefined){
            changePic(json.results[0].urls.small);
        }
    });
    return(
        <div>
            {/* Secondary Weather Descriptions */}
            <div className="my-6 mx-2 font-bold">
                <h3 className="flex items-center">
                    <img className="h-8 w-8" src="https://www.iconfinder.com/data/icons/weather-flat-14/64/weather02-512.png" alt="Secondary Weather Icon"></img>
                    <span className="m-2">{weather.current.weather[0].main}</span>
                </h3>
                <h3 className="flex items-center">
                    <img className="h-8 w-8" src="https://www.iconfinder.com/data/icons/weather-flat-14/64/weather02-512.png" alt="Secondary Weather Icon"></img>
                    <span className="m-2">{weather.current.weather[0].description}</span>
                </h3>
            </div>
            {/* Location Image */}
            <div className="relative flex items-center h-24 mx-2 my-6 rounded-xl overflow-hidden float items-center hover:opacity-75">
                <div className="absolute flex items-center justify-around inset-0">
                    <h2 className="text-white text-xl font-bold text-center">{location}</h2>
                </div>
                <img src={pictureSrc} alt="Location"/>
            </div>
        </div>
    )
}