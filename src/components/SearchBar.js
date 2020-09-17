import React from "react";
import {getPosition} from "./../geolocation"
import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete'; 

export default function SearchBar() {
  getPosition();
  const [address, setAddress] = React.useState("");
  const handleSelect = async value => {};
  return (
    <div className="m-12 flex">
      <svg className="h-6 w-6 m-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>

      {/* source: https://www.youtube.com/watch?v=uJYqQdnw8LE */}
      <PlacesAutocomplete
      value={address}
      onChange={setAddress}
      onSelect={handleSelect}>{({ getInputProps, suggestions, getSuggestionItemProps, loading})=>(
        <div>
          <input className="h-10 outline-none placeholder-primary placeholder-opacity-100 overflow-hidden" {...getInputProps({ placeholder: "Search for places..."})}/>
            <div>
              {loading ? <div>...loading</div>: null}
              
              {suggestions.slice(0,4).map((suggestion, index) => {
                return <div  key={index} {...getSuggestionItemProps(suggestion)}>{suggestion.description}</div>
              })}
            </div>
        </div>
      )}</PlacesAutocomplete>

      {/* Display Location Button*/}
      <button className="h-8 w-8 p-1 bg-gray-200 rounded-full" onClick={() => {
          let latitude = localStorage.getItem('latitude');
          let longitude = localStorage.getItem('longitude');
          alert("Position: " + latitude + ", " + longitude);
        }}>

        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg> 
      </button> 
      {/* Search Button used to test autocomplete  (delete before reaching dev branch)*/}
      <button className="mx-2 px-4 h-8 bg-blue-100 rounded-full hover:bg-blue-200">Search</button>
    </div>
  );
}