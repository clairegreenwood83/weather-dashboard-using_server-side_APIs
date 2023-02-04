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
*/
$("#search-button").on("click", function(event) {
event.preventDefault();
    // first API call 
    //var APIkey = "691a958d16daf945d877297a7abdd2a7";

    var city = $("#search-input").val(); // what user enters to input box #search-input 
    console.log(city);

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

    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + long + "&appidb55d06cc03c4f56a1f7b3ed3746b5ded";
    console.log(apiURL);

    // find where to append city .append(city);

    $.ajax({
                url: queryURL,
                method: "GET"
              }).then(function(response) {
        
            
          
          });
        });
  });