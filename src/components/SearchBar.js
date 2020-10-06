import React, { useState } from "react";
import axios from "axios";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

//search bar component
// - uses googles autocomplete and geocode API's to get location
// - queries weather api using location

export default function SearchBar({ updateCoords, setLocation }) {
  const [AutocompleteLocation, setAutocompleteLocation] = useState(""); //used so app does not query weather api every keystroke, only when setLocation is called

  function getAddress() {
    const lat = localStorage.getItem("latitude");
    const lon = localStorage.getItem("longitude");
    updateCoords({
      lat: lat,
      lng: lon,
    });
    const geocodeKEY = "AIzaSyDf9hbU6kjdJJrm2Z1TKXD_PMjNm_D5EJk";
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&result_type=locality&key=${geocodeKEY}`
      )
      .then((res) => {
        const address = res.data.plus_code.compound_code;
        setLocation(address.substr(address.indexOf(" ") + 1));
      });
  }

  const handleSelect = async (value) => {
    alert("Selected Location: " + value);
    const results = await geocodeByAddress(value);
    const latlng = await getLatLng(results[0]);
    setLocation(value);
    updateCoords(latlng);
    setAutocompleteLocation(value);
  };

  return (
    <div className="flex items-center">
      <div className="w-6">
        <svg
          className="h-6 m-2"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* source: https://www.youtube.com/watch?v=uJYqQdnw8LE */}
      <PlacesAutocomplete
        highlightFirstSuggestion={true}
        searchOptions={{ types: ["(cities)"] }}
        value={AutocompleteLocation}
        onChange={setAutocompleteLocation}
        onSelect={handleSelect}
      >
        {AutocompleteBlock}
      </PlacesAutocomplete>

      {/* Display Location Button*/}
      <button
        className="h-8 p-1 bg-gray-200 hover:bg-gray-300 rounded-full"
        onClick={() => {
          getAddress();
        }}
      >
        <svg
          className="h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </button>
    </div>
  );
}

const AutocompleteBlock = ({
  getInputProps,
  suggestions,
  getSuggestionItemProps,
  loading,
}) => (
  <div className="flex-grow">
    <input
      className="h-10 bg-transparent outline-none placeholder-primary placeholder-opacity-100 overflow-hidden flex-grow"
      {...getInputProps({ placeholder: "Search for places..." })}
    />
    <div className="bg-white max-w-12 rounded-md absolute shadow-xl">
      {suggestions.slice(0, 4).map((suggestion, index) => {
        const style = {
          backgroundColor: suggestion.active ? "#edf2f7" : "#fff",
        };

        return (
          <div
            className="px-4 py-1 rounded-md"
            key={index}
            {...getSuggestionItemProps(suggestion, { style })}
          >
            {suggestion.description}
          </div>
        );
      })}
    </div>
  </div>
);
