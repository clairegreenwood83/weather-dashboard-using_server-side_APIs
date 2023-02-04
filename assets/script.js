// URL to weather api api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
// API key b55d06cc03c4f56a1f7b3ed3746b5ded

// When a user searches for a city they are presented with current and future conditions for that city and that city is added to the search history
// When a user views the current weather conditions for that city they are presented with:

// The city name
// The date
// An icon representation of weather conditions
// The temperature
// The humidity
// The wind speed

// When a user view future weather conditions for that city they are presented with a 5-day forecast that displays:

// The date
// An icon representation of weather conditions
// The temperature
// The humidity

// When a user click on a city in the search history they are again presented with current and future conditions for that city

/* pseudocode
1. when search button clicked: weather conditions viewed & city is added to search history 
    - search button click event linked to a function that makes first API call which retrieves city data.
    - city saved to search history.
    - longitude and latitude data extracted from city data array and saved to variables.
    - longitude and latitude data entered into second API call to retrieve weather data for 5 day forecast.
*/
$("#search-button").on("click", function(event) {
event.preventDefault();
    // first API call 
    //var APIkey = "691a958d16daf945d877297a7abdd2a7";

    var city = $("#search-input").val(); // what user enters to input box #search-input 
    console.log(city);

    $("#history").append(city);

    var apiURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=b55d06cc03c4f56a1f7b3ed3746b5ded";
    
    
$.ajax({
    url: apiURL,
    method: "GET"
  }).then(function(response) {

    console.log(response);

    var lat = response[0].lat;
    console.log(lat);

    var long = response[0].lon;
    console.log(long);

    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + long + "&appid=b55d06cc03c4f56a1f7b3ed3746b5ded";
    console.log(queryURL);

   // second call to API using longitude and latitude retrieved above, to get 5 day weather forecast
    $.ajax({
                url: queryURL,
                method: "GET"
              }).then(function(response) {
        
            console.log(response);

// current city and date added

            var today = moment(); //todays date 
            console.log(today);
            var dateFormat = today.format("(DD/MM/YY)");

            var today = $("#today")
            current = $("<h2>"); // this is where the current city and date need to be displayed
            today.append(current);
            current.append(city + " " + dateFormat);

// temperature, humidity and wind speed added
// convert temperature in Kelvin to degrees celsius
var tempC = response.list[0].main.temp - 273.15;

var temp = $("<div>").text("Temperature: " + tempC.toFixed(2) + " \u2103");
var humidity = $("<div>").text("Humidity: " + response.list[0].main.humidity + "%");
var windSpeed = $("<div>").text("Wind speed: " + response.list[0].wind.speed + " KPH");

today.append(temp, humidity, windSpeed);

// create Bootstrap cards for 5 day forecast
var forecast = `
<h3> 5-Day Forecast </h3>
<div class="container">
    <div class="row">
        <div class="card-deck">
            <div class="card">
                <div class="card-body">
                    <h4 class="card-title">Date</h4>
                    <p>Forecast</p>
                </div>
            </div>   
            <div class="card">
                <div class="card-body">
                   <h4 class="card-title">Date</h4>
                   <p>Forecast</p>
                </div>
            </div>
            <div class="card">
                <div class="card-body">
                   <h4 class="card-title">Date</h4>
                   <p>Forecast</p>
                </div>
            </div>
            <div class="card">
                <div class="card-body">
                   <h4 class="card-title">Date</h4>
                   <p>Forecast</p>
                </div>
            </div>
            <div class="card">
                <div class="card-body">
                   <h4 class="card-title">Date</h4>
                   <p>Forecast</p>
                </div>
            </div>
        </div>
    </div>
</div>
`
$("#forecast").append(forecast);

//.addClass("card").addClass("text-white").addClass("bg-dark").addClass("mb-3");

// use bootstrap to create a card for each day for forecast
// create a container inside of section #forecast
// create a row within container
// create class="col-lg"
/* <div class="card text-white bg-dark mb-3" style="max-width: 18rem;">
  <div class="card-header">Header</div>
  <div class="card-body">
    <h5 class="card-title">Dark card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
</div> */

          });
        });
  });

