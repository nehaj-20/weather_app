// api key used for weather app:

var apikey = "497087037c5e2130d859a18f853aad93";
var searchkey = " ";
var city = " ";
$(document).ready(function() {
    $("#submit").click(function() {
        var city = $("#city").val();
        if (!isNaN(city)) {
            searchkey = "zip";

        } else {
            searchkey = "q";
        }
        if (location != " ") {
            $.ajax({
                url: "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&APPID=" + apikey,
                type: "GET",
                dataType: "jsonp",
                success: function(data) {
                    var result = outputData(data);
                    $("#outputData").html(result);
                    $("#outputData").val(" ");

                }
            });
        }

    });

});

function outputData(data) {
    return "<div> <h4> Weather in " + data.name + "</h4> " +
        "<img src='http://openweathermap.org/img/w/" + data.weather[0].icon + ".png' width=150px> " +
        "<h4> Weather : " + data.weather[0].main + "<br> " +
        "Description:" + data.weather[0].description + " <br> " +
        "Temperature : " + data.main.temp + " F <br>" +
        "High Temp : " + data.main.temp_max + " F <br>" +
        "Low Temp : " + data.main.temp_min + " F <br>" +
        "Pressure : " + data.main.pressure + " hPa <br>" +
        "Humidity : " + data.main.humidity + " % <br>" +
        "Visibility : " + data.visibility + " meters <br>" +
        "Wind Speed : " + data.wind.speed + " m/sec <br>" +
        "Wind Direction : " + data.wind.deg + " degrees </h4> </div>"
}