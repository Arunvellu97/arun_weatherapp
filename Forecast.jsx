// Importing React for creating a component
import React from "react";

// Forecast component receives forecastWeather and location as props
const Forecast = ({ forecastWeather, location }) => {
  return (
     // Main container with margin at the top
    <div className="container mt-5 ">

      {/* Title showing which location's forecast is displayed */}
      <h4 className="text-white text-center">
      Weather Forecast of {location.name},{location.region},{location.country}
      </h4>

      {/* Loop through each day in the forecast data */}
      {forecastWeather.forecastday.map((data, index) => {
        return (
          // Bootstrap Accordion container for collapsible content
          <div
            className="accordion mt-3"
            id="accordionFlushExample"
          >

            {/* One accordion item per forecast day */}
            <div className="accordion-item">

               {/* Accordion header with a clickable button */}
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed" // Collapsed by default
                  type="button"
                  data-bs-toggle="collapse" // Tells Bootstrap to collapse/expand
                  data-bs-target={`#${index}`}  // Unique target ID using index
                  aria-expanded="false" // Accessibility - not expanded
                  aria-controls="flush-collapseOne" // Accessibility - control ID
                >

              {/* Flexbox row inside the accordion button to display date and info */}
                  <div className="d-flex flex-row mb-3 align-items-center">

                    {/* Show forecast date */}
                    <div className="p-2"> Day: {data.date}</div>

                    {/* Show weather icon */}
                    <div className="p-2">
                      <img src={data.day.condition.icon} />
                    </div>

                     {/* Show weather condition text (e.g. Sunny, Rainy) */}
                    <div className="p-2">{data.day.condition.text} </div>

                    {/* Show maximum temperature in Celsius */}
                    <div className="p-2">Max temp: {data.day.maxtemp_c}</div>
                  </div>
                </button>
              </h2>

               {/* Collapsible content area that expands when button is clicked */}
              <div
                id={`${index}`} // ID must match data-bs-target
                className="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample" // Ties all items together
              >

                {/* Accordion body shows hourly temperature and progress bar */}
                <div className="accordion-body">

                   {/* Loop through hourly forecast for the day */}
                  {data.hour.map((data) => {
                    return (
                      <>
                      {/* Show the time and temperature */}
                      <h6>{data.time} max temp: {data.temp_c}</h6>

                      {/* Bootstrap progress bar showing temperature visually */}
                      <div
                      className="progress"
                      role="progressbar"
                      aria-label="Animated striped example"
                      aria-valuenow="75"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                       {/* Progress bar width set to temperature value */}
                      <div
                        className="progress-bar progress-bar-striped progress-bar-animated"
                        style={{width: `${data.temp_c}%`}}
                      ></div>
                    </div>
                      </>
                    );
                  })}
                </div>   {/* End accordion body */}
              </div>  {/* End collapse */}
            </div>  {/* End accordion item */}
          </div>  // End accordion container
        );
      })}
    </div>  // End main container
  );
};

// Exporting the Forecast component so it can be used in other files
export default Forecast;
