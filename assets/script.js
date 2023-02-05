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
            <div class="card text-white bg-dark mb-3" id="day-1">
                <div class="card-body">
                    <h4 class="card-title">Date</h4>
                    <p></p>
                </div>
            </div>   
            <div class="card text-white bg-dark mb-3" id="day-2">
                <div class="card-body">
                   <h4 class="card-title">Date</h4>
                   <p></p>
                </div>
            </div>
            <div class="card text-white bg-dark mb-3" id="day-3">
                <div class="card-body">
                   <h4 class="card-title">Date</h4>
                   <p></p>
                </div>
            </div>
            <div class="card text-white bg-dark mb-3" id="day-4">
                <div class="card-body">
                   <h4 class="card-title">Date</h4>
                   <p></p>
                </div>
            </div>
            <div class="card text-white bg-dark mb-3" id="day-5">
                <div class="card-body">
                   <h4 class="card-title">Date</h4>
                   <p></p>
                </div>
            </div>
        </div>
    </div>
</div>
`
$("#forecast").append(forecast);

// array index [0], [8], [16], [24], [32] for 5 day forecast
// var  newDay = [];
//  for (var i = 0; i < response.list.length; i+=8) {
//     //console.log(response.list[i].dt_txt);
    
//     result = response.list[i];

//      newDay.push(result)
//     // console.log(newDay.dt_txt);
//     // console.log(newDay.main.temp);
//     // console.log(newDay.wind.speed);
//     // console.log(newDay.main.humidity);
//  }
//  console.log(newDay);
//  console.log(newDay[0].dt_txt);

// var newDayTemp= [];
//  for (var i = 0; i < newDay.length; i++) {
//      result = newDay[i].main.temp;
//      console.log(result);
//      newDayTemp.push(result)
//   }

//   console.log(newDayTemp);
//      var newDayTemp1 = newDayTemp[0];
//      console.log(newDayTemp1);
//      $("#day-1.").text(newDayDate1);

//      var newDayTemp2 = newDayTemp[1];
//      console.log(newDayDate2);
//      $("#day-2").text(newDayTemp2);

//      var newDayTemp3 = newDayTemp[2];
//      console.log(newDayDate3);
//      $("#day-3").text(newDayTemp3);

//      var newDayTemp4 = newDayTemp[3];
//      console.log(newDayDate4);
//      $("#day-4").text(newDayTemp4);

//      var newDayTemp5 = newDayTemp[4];
//      console.log(newDayDate5);
//      $("#day-5").text(newDayTemp5);

    // var newDayTemp = newDay.main.temp;
    // console.log(newDayTemp);

    // var newDayWind = newDay.wind.speed;
    // console.log(newDayWind);

    // var newDayHumidity = newDay.main.humidity;
    // console.log(newDayHumidity);

    let day1 = moment();
    $("#day-1 h4").text(day1.format("(DD/MM/YY)"));
    console.log(day1);

    let day2  = moment().add(1,'days');
    $("#day-2 h4").text(day2.format("(DD/MM/YY)"));

    let day3 = moment().add(2, 'days');
    $("#day-3 h4").text(day3.format("(DD/MM/YY)"));

    let day4 = moment().add(3, 'days');
    $("#day-4 h4").text(day4.format("(DD/MM/YY)"));

    let day5 = moment().add(4, 'days');
    $("#day-5 h4").text(day5.format("(DD/MM/YY)"));




});



        });
  });
