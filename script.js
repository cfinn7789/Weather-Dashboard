var searchbtn = document.getElementById('search-btn');
var weather = document.getElementById('city-name');
var fiveDay = document.getElementById('future');
var savedCities = document.getElementById('saved-cities');

var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
var apiKey = "ad56280ee68f5a64dcaff59cfb66a260";
var searchedCities = [];

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
        .then((data) => {
            if (data.cod === 200) {
                currentForecast(data);
                searchedCities.push(cityName);
                updateSavedCities();
            } else {
                fiveDay.innerHTML = "City not found";
            }
        })
        .catch((error) => {
            fiveDay.innerHTML = "Error: " + error.message;
        });
};


function currentForecast(data) {
    if (data.cod === 200) {
        var temperatureInKelvin = data.main.temp;
        var temperatureInFahrenheit = ((temperatureInKelvin - 273.15) * 9/5 + 32).toFixed(2);
        var description = data.weather[0].description;
        var weatherInfo = "Temperature: " + temperatureInFahrenheit + "°F<br>Description: " + description;

        var currentDate = new Date().toLocaleString();
        weatherInfo += "<br>Current Date: " + currentDate;

        fiveDay.innerHTML = weatherInfo;
    } else {
        fiveDay.innerHTML = "City not found";
    }
};

function updateSavedCities() {
    savedCities.innerHTML = "";

    searchedCities.forEach(function (city) {
        var cityElement = document.createElement("div");
        cityElement.textContent = city;
        savedCities.appendChild(cityElement);
    });
}
