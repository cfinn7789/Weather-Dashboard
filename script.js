var searchbtn = document.getElementById('search-btn');
var weather = document.getElementById('city-name');
var fiveDay = document.getElementById('future');
var savedCities = document.getElementById('saved-cities');

var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
var apiKey = "ad56280ee68f5a64dcaff59cfb66a260";

searchbtn.addEventListener('click', function () {
    var cityName = weather.value.trim();
    forecast(cityName);
});

function forecast(cityName) {
    var apiUrlWithKey = apiUrl + cityName + "&appid=" + apiKey;

    fetch(apiUrlWithKey)
        .then((response) => {
            return response.json();
        })
        .then((data) => currentForecast(data))
        .catch((error) => {
            fiveDay.innerHTML = "Error: " + error.message;
        });
}

function currentForecast(data) {
    if (data.cod === 200) {
        var temperature = data.main.temp;
        var description = data.weather[0].description;
        var weatherInfo = "Temperature: " + temperature + "°C<br>Description: " + description;

        var currentDate = new Date().toLocaleString();
        weatherInfo += "<br>Current Date: " + currentDate;

        fiveDay.innerHTML = weatherInfo;
    } else {
        fiveDay.innerHTML = "City not found";
    }
}