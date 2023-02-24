// Load the saved history from local storage when the page is loaded
$(document).ready(function() {
    var history = JSON.parse(localStorage.getItem("history")) || [];
    var historyList = $("#historyList");
    for (var i = 0; i < history.length; i++) {
      var city = history[i];
      var list = $("<li>");
      var btn = $("<button>");
      btn.click(function() {
        citySearch($(this).html());
      });
      btn.html(city);
      list.append(btn);
      historyList.append(list);
    }
  });
  
$("#search-button").on("click", function(event) {
event.preventDefault();
citySearch()
});

function citySearch(btnText) {

    $("#forecast").html("");
    $("#today").html("");
    $("#search-input").empty();

    // Get the searched city from the input field or button text
    var input = btnText || $("#search-input").val();

    // Empty the search input field
    $("#search-input").val("");

    // Save the searched city to local storage
    var history = JSON.parse(localStorage.getItem("history")) || [];
    if (!history.includes(input)) {
        history.push(input);
        localStorage.setItem("history", JSON.stringify(history));
    }

    // first API call to get lat and lon for city
    var apiURL = "https://api.openweathermap.org/geo/1.0/direct?q=" + input + "&appid=b55d06cc03c4f56a1f7b3ed3746b5ded";
    
    $.ajax({
        url: apiURL,
        method: "GET"
    }).then(function(response) {
        var lat = response[0].lat;
        var long = response[0].lon;
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + long + "&appid=b55d06cc03c4f56a1f7b3ed3746b5ded";
        console.log(response);

   // second call to API using longitude and latitude retrieved above, to get 5 day weather forecast
    $.ajax({
          url: queryURL,
          method: "GET"
    }).then(function(response) {
         console.log(response);

            var city = response.city.name; 

            //if (!history.includes(city)) {   // if history list doesn't include city this function will run
            // create buttons for city searched in history
            var historyList = $("#historyList"); 
            var btnExists = false;
            $(historyList).find("button").each(function() {
               if ($(this).text() === city) {
                btnExists = true;
                return false; // Exit the loop early if a match is found
                }
            });

              if (!btnExists) {
            // Create a new history button if one doesn't already exist
                var list = $("<li>");
                var btn = $("<button>");
                btn.click(function () { // if button is clicked then citySearch function will be called to show weather for the city
                  citySearch(city)
            });
            $(btn).html(city); //btn text will be city name
            $(list).append(btn); // add btn to list items
            $(historyList).append(list); // add list to history ul area
            
            }

            // add current city and date
            var today = moment(); //todays date 
            //console.log(today);
            var dateFormat = today.format("(DD/MM/YY)");
            var today = $("#today")
            var current = $("<h2>"); // this is where the current city and date need to be displayed
            today.append(current);
            current.append(city + " " + dateFormat);

             // add icon, temperature, humidity and wind speed
            let currentWeatherIcon = response.list[0].weather[0].icon;
            let iconUrl = ("https://openweathermap.org/img/w/" + currentWeatherIcon + ".png");
            var icon = $("<img>").attr("src", iconUrl);

            var tempC = response.list[0].main.temp - 273.15; // convert temperature in Kelvin to degrees celsius

            var temp = $("<div>").text("Temperature: " + tempC.toFixed(2) + " \u2103");
            var humidity = $("<div>").text("Humidity: " + response.list[0].main.humidity + "%");
            var windSpeed = $("<div>").text("Wind speed: " + response.list[0].wind.speed + " KPH");
            today.append(icon, temp, humidity, windSpeed);

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


            // get 5 day forecast, array index [0], [8], [16], [24], [32] for 5 day forecast
            var  newDay = [];
            for (var i = 0; i < response.list.length; i+=8) {
                result = response.list[i];
                newDay.push(result)
            }
                console.log(newDay);
            
            // get weather icon 
            var newDayIcon = [];
               for (var i = 0; i < newDay.length; i++) {
                result = newDay[i].weather[0].icon;
                var weatherIcon = ("https://openweathermap.org/img/w/" + result + ".png");
                newDayIcon.push(weatherIcon)
            }
            console.log(newDayIcon);

            // get temperature for each day
            var newDayTemp= [];
            for (var i = 0; i < newDay.length; i++) {
                    result = newDay[i].main.temp;
                    newDayTemp.push(result)
            }

            //get wind speed for each day
            var newDayWind = [];
            for (var i = 0; i < newDay.length; i++) {
                result = newDay[i].wind.speed;                    
                newDayWind.push(result)
            }

            // get humidity for each day
            var newDayHumidity = [];
            for (var i = 0; i < newDay.length; i++) {
                result = newDay[i].main.humidity;
                newDayHumidity.push(result)
            }


            // set weather icon for each day
        
            $("#day-1 .icon").attr("src", newDayIcon[0]);
            $("#day-2 .icon").attr("src", newDayIcon[1]);
            $("#day-3 .icon").attr("src", newDayIcon[2]);
            $("#day-4 .icon").attr("src", newDayIcon[3]);
            $("#day-5 .icon").attr("src", newDayIcon[4]);

            // Set temperature on forecast cards
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

            // Set wind speed on forecast cards
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
  
            // Set humidity on forecast cards

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