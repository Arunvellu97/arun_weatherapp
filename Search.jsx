// Importing required modules from React
import React, { useState, useEffect } from "react";
// Importing Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Importing Axios for API calls
import axios from "axios";
// Importing child components to show weather data
import Current from "./Current";
import Forecast from "./Forecast";
// Importing Bootstrap JS (optional for dropdowns/modal etc.)
import '/node_modules/bootstrap/dist/js/bootstrap';
// Importing weather condition background images
import clear from '/src/assets/weather/clear.jpg';
import cloudy from '/src/assets/weather/cloudy.jpg';
import rain from '/src/assets/weather/rain.jpg';
import snow from '/src/assets/weather/snow.jpg';
import thunder from '/src/assets/weather/thunder.jpg';
import mist from '/src/assets/weather/mist.jpg';



// Defining the Search component
const Search = () => {
   // Hooks for state management
  const [city, setCity] = useState();                      // Stores the input text from user
  const [clickedCity, setClickedCity] = useState();        // Stores the city clicked from suggestions
  const [citySuggestion, setCitySuggestion] = useState();  // Stores list of city suggestions
  const [currentWeather, setCurrent] = useState();         // Stores current weather data
  const [forecastWeather, setForecast] = useState();       // Stores forecast weather data
  const [location, setLocation] = useState();              // Stores location details

    // URL for city autocomplete suggestions from weather API
  const autoCompURL ="https://api.weatherapi.com/v1/search.json?key=83c0b17cb2774eac95723527231501&q=";

   // Function to generate the weather forecast URL for selected city
  const WeatherURL = (city) => `https://api.weatherapi.com/v1/forecast.json?
key=83c0b17cb2774eac95723527231501&q=${city}&days=7&aqi=no&alerts=no`;

 // useEffect will trigger auto-complete fetch when user types more than 3 characters
  useEffect(() => {
    // user can type Minimum four letter to show city
    if (city && city.length > 3) {
      fetchAutoCompAPI();  // Call suggestion API
    }
  }, [city]);    // Dependency: run effect when `city` changes

  
  // Function to call the auto-complete API
  const fetchAutoCompAPI = async () => {
    try {
      const response = await axios.get(autoCompURL + city);     // Fetch city suggestions
      const resp = response.data;                               // Response data from API
      console.log("api call", resp);                            // Debug log
      const cityData = resp.map((data) => {
        return `${data.name},${data.region},${data.country}`;   // Format each suggestion
      });
      setCitySuggestion(cityData);                              // Set suggestions into state
    } catch (e) {
      console.log("error", e);  // Log any errors
    }
  };

   // Handle user selecting a suggested city
  const handleSelectedCity = (city) => {
    console.log("Clicked City", city);   // Debug log
    setClickedCity(city)                 // Store selected city
    fetchWeatherAPI(city);               // Fetch weather data for city
    setCitySuggestion([]);               // Clear suggestions after selection
  };

  // Function to call the weather forecast API
  const fetchWeatherAPI = async (city) => {
    try {
      const response = await axios.get(WeatherURL(city)); // Fetch weather data
      const resp = response.data;                         // Extract response data
      setCurrent(resp.current);                           // Set current weather
      setForecast(resp.forecast);                         // Set forecast
      setLocation(resp.location);                         // Set location
      console.log("Current", resp.current);               // Debug logs
      console.log("Forecast", resp.forecast);
      console.log("Location", resp.location);
    } catch (e) {
      console.log("Weather API error", e);  // Log any errors
    }
  };

   // Function to return background image based on current weather condition
  const GetBackgroundImage = ()=>{
    if (!currentWeather) return clear; // Default image if no weather data yet

    const condition = currentWeather.condition.text.toLowerCase(); // Convert condition text to lowercase

     // Switch-case logic to match weather condition with appropriate image
    switch (true) {
      case condition.includes("cloudy"):
        return cloudy;
      case condition.includes("rain"):
        return rain;
      case condition.includes("snow"):
        return snow;
      case condition.includes("thunder"):
        return thunder;
      case condition.includes("mist"):
      case condition.includes("fog"):   // Fog also returns mist image
        return mist;
      case condition.includes("clear"):
      default:
        return clear;   // Default to clear image
    }
  };

  

  // Main JSX to render the UI
  return (
   <div
  className="container p-5 rounded mt-5 fade-bg"    // Bootstrap styling
  style={{
    backgroundImage: `url(${GetBackgroundImage()})`,  // Set dynamic background image
    backgroundSize: 'cover',     // Cover the container fully
    backgroundPosition: 'center',// Center the background
    backgroundRepeat: 'no-repeat',// Avoid repeating the image
  }}
>
   {/* Input box for user to enter city */}
      <input
        type="text" placeholder="Enter Your City !!!" 
        value={clickedCity}  // Show selected city or empty
        className="form-control text-center"
        onChange={(e) => {
          setCity(e.target.value);  // Update input value
          if (e.target.value===""){
            // If empty input, reset everything
            setCurrent();
            setForecast();
            setLocation();
            setClickedCity();
          }
        }}
      />
       {/* Render city suggestions dynamically */}
      {citySuggestion &&
        citySuggestion.map((city,index) => {
          return (
            <div key={index}
              className="text-center bg-info rounded p-1 bg-opacity-10 border-info border-opacity-25 text-white"
              style={{ cursor: "pointer" }}
              onClick={() => handleSelectedCity(city)} // Handle click on suggestion
            >
              {city}
            </div>
          );
        })}
        
      {/* Render components if weather data is available */}
        {currentWeather && <Current currentWeather={currentWeather} location={location}/>}
        {forecastWeather && <Forecast forecastWeather={forecastWeather} location={location}/>}
    </div>
  );
};

// Export the Search component so it can be used in App.js or elsewhere
export default Search;
