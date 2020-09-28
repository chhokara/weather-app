import React, {useState} from 'react';
import Unsplash, { toJson } from 'unsplash-js';

const unsplash = new Unsplash({
  accessKey: "CVW1RwmJ8xgIjKrZ57eZLbJSteyuxOjcwjKxSsA8V00",
    // Optionally if using a node-fetch polyfill or a version of fetch which supports the timeout option, you can configure the request timeout for all requests
  timeout: 500 // values set in ms
});

export default function SideBarInfo({weather, location}){
    const[pictureSrc, changePic] = useState("https://images.unsplash.com/photo-1543788303-c15e49305bc6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80");

    unsplash.search.photos(location.split(",", 1), 1, 1, { orientation: "landscape" }).then(toJson).then(json => {
        // Your code
        if(json.results[0] !== undefined){
            changePic(json.results[0].urls.small);
        }
        console.log(pictureSrc);
    });
    return(
        <div>
            <div className="my-6 mx-2 font-bold">
                <h3 className="flex items-center">
                    <img className="h-8 w-8" src="https://www.iconfinder.com/data/icons/weather-flat-14/64/weather02-512.png" alt="Secondary Weather Icon"></img>
                    <span className="m-2">{weather.current.weather[0].description}</span>
                </h3>
                <h3 className="flex items-center">
                    <img className="h-8 w-8" src="https://www.iconfinder.com/data/icons/weather-flat-14/64/weather02-512.png" alt="Secondary Weather Icon"></img>
                    <span className="m-2">Rain - 30%</span>
                </h3>
            </div>
            <div className="h-24 mx-2 my-6 rounded-xl overflow-hidden float items-center">
                <div className="absolute text-white text-xl text-center m-8 mx-12 font-bold">{location}</div>
                <img className="-my-12" src={pictureSrc} alt="Location"/>
            </div>
        </div>
    )
}