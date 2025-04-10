// Import React library
import React from "react";

// Create a functional component called "Current", taking "currentWeather" and "location" as props
const Current = ({ currentWeather, location }) => {
  return (
    // Main container with top margin
    <div className="container mt-5">

      {/* // Heading displaying the current location (city, region, country) */}
    <h4 className="text-white text-center">
      Current Weather of {location.name},{location.region},{location.country}
    </h4>

    {/* First row: Weather condition and temperatures */}
      <div className="row mb-4">

    {/* Column 1: Weather condition text and icon */}
        <div className="col-12 col-md-6 col-lg-3 ">
          <div className="card ">
              {/* Display the weather condition text and icon */}
            <p className="card-title">{currentWeather.condition.text}<img
              src={currentWeather.condition.icon}
            /></p>
        </div>          
      </div>

    {/* Column 2: Temperature in Celsius */}
        <div className="col-12 col-md-6 col-lg-3 ">
          <div className="card">
            <div className="card-body">
              <h6 className="card-title">Temp in c : {currentWeather.temp_c}</h6>
            </div>
          </div>          
        </div>

      {/* Column 3: Temperature in Fahrenheit */}
        <div className="col-12 col-md-6 col-lg-3 ">
          <div className="card">
            <div className="card-body">
              <h6 className="card-title">Temp in f : {currentWeather.temp_f}</h6>
            </div>
          </div>          
        </div>

      {/* Column 4: Humidity percentage */}
        <div className="col-12 col-md-6 col-lg-3 ">
          <div className="card">
            <div className="card-body">
              <h6 className="card-title">Humidity : {currentWeather.humidity}</h6>
            </div>
          </div>          
        </div>
      </div>
    
    {/* Second row: Wind details */}
      <div className="row">

    {/* Column 5: Wind degree (angle) */}
        <div className="col-12 col-md-6 col-lg-3 ">
          <div className="card">
            <div className="card-body">
              <h6 className="card-title">Wind degree : {currentWeather.wind_degree}</h6>
            </div>
          </div>          
        </div>

     {/* Column 6: Wind direction (N, NE, E, etc.) */}
        <div className="col-12 col-md-6 col-lg-3">
          <div className="card">
            <div className="card-body">
              <h6 className="card-title">Wind Dir : {currentWeather.wind_dir}</h6>
            </div>
          </div>          
        </div>

     {/* Column 7: Wind speed in kilometers per hour */}
        <div className="col-12 col-md-6 col-lg-3 ">
          <div className="card">
            <div className="card-body">
              <h6 className="card-title">WindSpeed(kph): {currentWeather.wind_kph}</h6>
            </div>
          </div>
        </div>

    {/* Column 8: Wind speed in miles per hour */}
        <div className="col-12 col-md-6 col-lg-3">
          <div className="card">
            <div className="card-body">
              <h6 className="card-title">WindSpeed(mph): {currentWeather.wind_mph}</h6>
            </div>
          </div>          
        </div>
        
      </div>{/* End of second row */}
    </div> // End of main container
  );
};

// Export the Current component so it can be imported and used in other files
export default Current;
