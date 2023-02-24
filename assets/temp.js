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

//localStorage.setItem("history",  JSON.stringify(city));

const history = JSON.parse(localStorage.getItem("history")) || [];
console.log(history);

// when hsitory retrieved from local storage this function will run to make buttons in hsitorylist area
history.forEach(function(city) {  
    var historyList = $("#historyList");
                console.log(historyList);
                var list = $("<li>");
                var btn = $("<button>");
                btn.click(function () {
                    citySearch(city)
                })
                $(btn).html(city);
                $(list).append(btn);
                $(historyList).append(list);

                const historyStorage = JSON.parse(localStorage.getItem("history"));
                historyStorage.push(city)
                localStorage.setItem("history",  JSON.stringify(historyStorage));
}
)

$("#search-button").on("click", function(event) {
event.preventDefault()
citySearch()
  });

  function citySearch(btnText) {

$("#forecast").html("");
$("#today").html("");
$("#search-input").empty();

    // first API call 
    var input = btnText || $("#search-input").val();
    var apiURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + input + "&appid=b55d06cc03c4f56a1f7b3ed3746b5ded";

    
$.ajax({
    url: apiURL,
    method: "GET"
  }).then(function(response) {

    console.log(response);

    var lat = response[0].lat;
    

    var long = response[0].lon;


    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + long + "&appid=b55d06cc03c4f56a1f7b3ed3746b5ded";
    console.log(queryURL);

   // second call to API using longitude and latitude retrieved above, to get 5 day weather forecast
    $.ajax({
                url: queryURL,
                method: "GET"
              }).then(function(response) {
        
            console.log(response);


            
// city name 
            var city = response.city.name; 
            console.log(city);

            if (!history.includes(city)) {
                // declaring variables
                var historyList = $("#historyList");
                console.log(historyList);
                var list = $("<li>");
                var btn = $("<button>");
                btn.click(function () { // if button is clicked then citySearch function will be called to show weather for the city
                    citySearch(city)
                })
                $(btn).html(city); //btn text will be city name
                $(list).append(btn); // add btn to list items
                $(historyList).append(list); // add list to history ul area
                //list.append(city);

                const historyStorage = JSON.parse(localStorage.getItem("history"));
                historyStorage.push(city)
                localStorage.setItem("history",  JSON.stringify(historyStorage));
            }


           
            

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
                    <img class="icon"></img>
                    <ul class="text">
                        <li class="temp"></li>
                        <li class="wind"></li>
                        <li class="humidity"></li>
                    </ul>

                </div>
            </div>   
            <div class="card text-white bg-dark mb-3" id="day-2">
                <div class="card-body">
                   <h4 class="card-title">Date</h4>
                   <img class="icon"></img>
                   <ul class="text">
                        <li class="temp"></li>
                        <li class="wind"></li>
                        <li class="humidity"></li>
                    </ul>
                </div>
            </div>
            <div class="card text-white bg-dark mb-3" id="day-3">
                <div class="card-body">
                   <h4 class="card-title">Date</h4>
                   <img class="icon"></img>
                   <ul class="text">
                        <li class="temp"></li>
                        <li class="wind"></li>
                        <li class="humidity"></li>
                    </ul>
                </div>
            </div>
            <div class="card text-white bg-dark mb-3" id="day-4">
                <div class="card-body">
                   <h4 class="card-title">Date</h4>
                   <img class="icon"></img>
                   <ul class="text">
                        <li class="temp"></li>
                        <li class="wind"></li>
                        <li class="humidity"></li>
                    </ul>
                </div>
            </div>
            <div class="card text-white bg-dark mb-3" id="day-5">
                <div class="card-body">
                   <h4 class="card-title">Date</h4>
                   <img class="icon"></img>
                   <ul class="text">
                        <li class="temp"></li>
                        <li class="wind"></li>
                        <li class="humidity"></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
`
$("#forecast").append(forecast);

// get weather icon 
let currentWeatherIcon = response.list[0].weather[0].icon;
// console.log(currentWeatherIcon);
let iconUrl = ("http://openweathermap.org/img/w/" + currentWeatherIcon + ".png");
// console.log(iconUrl);

$(".icon").attr("src", iconUrl);


// array index [0], [8], [16], [24], [32] for 5 day forecast
 var  newDay = [];
 for (var i = 0; i < response.list.length; i+=8) {
    //console.log(response.list[i].dt_txt);
    
    result = response.list[i];

     newDay.push(result)
 }
 console.log(newDay);


// set temperature for each day
var newDayTemp= [];
 for (var i = 0; i < newDay.length; i++) {
     result = newDay[i].main.temp;
     //console.log(result);
     newDayTemp.push(result)
  }
//set wind speed for each day
  var newDayWind = [];
 for (var i = 0; i < newDay.length; i++) {
     result = newDay[i].wind.speed;
     //console.log(result);
     newDayWind.push(result)
  }

// set humidity for each day
  var newDayHumidity = [];
 for (var i = 0; i < newDay.length; i++) {
     result = newDay[i].main.humidity;
     //console.log(result);
     newDayHumidity.push(result)
 }

   
     var newDay1 = newDayTemp[0];
     $("#day-1 .temp").text("Temp: " + newDay1);
   
     var newDay2 = newDayTemp[1];
     $("#day-2 .temp").text("Temp: " + newDay2);

     var newDay3 = newDayTemp[2];
     $("#day-3 .temp").text("Temp: " + newDay3);

     var newDay4 = newDayTemp[3];
     $("#day-4 .temp").text("Temp: " + newDay4);

     var newDay5 = newDayTemp[4];
     $("#day-5 .temp").text("Temp: " + newDay5);

     

  var newDayWind1 = newDayWind[0];

  $("#day-1 .wind").append("Wind: " + newDayWind1);

  var newDayWind2 = newDayWind[1];
  $("#day-2 .wind").append("Wind: " + newDayWind2);

  var newDayWind3 = newDayWind[2];
  $("#day-3 .wind").append("Wind: " + newDayWind3);

  var newDayWind4 = newDayWind[3];
  $("#day-4 .wind").append("Wind: " + newDayWind4);

  var newDayWind5 = newDayWind[4];
  $("#day-5 .wind").append("Wind: " + newDayWind5);
  
 

  var newDayHumidity1 = newDayHumidity[0];

  $("#day-1 .humidity").append("Humidity: " + newDayHumidity1);

  var newDayHumidity2 = newDayHumidity[1];
  $("#day-2 .humidity").append("Humidity: " + newDayHumidity2);

  var newDayHumidity3 = newDayHumidity[2];
  $("#day-3 .humidity").append("Humidity: " + newDayHumidity3);

  var newDayHumidity4 = newDayHumidity[3];
  $("#day-4 .humidity").append("Humidity: " + newDayHumidity4);

  var newDayHumidity5 = newDayHumidity[4];
  $("#day-5 .humidity").append("Humidity: " + newDayHumidity5);

// set date on forecast cards

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
  }
