let currentCity = "Piscataway";
let units = "metric";

// Selectors
let city = document.querySelector(".weather-city");
let datetime = document.querySelector(".weather-datetime");
let weather_forecast = document.querySelector('.weather-forecast')
let weather_temperature = document.querySelector('.weather-temperature')
let weather_icon = document.querySelector('.weather-icon')
let weather_minmax = document.querySelector('.weather-minmax')
let weather_realfeel = document.querySelector('.weather_realfeel')
let weather_humidity = document.querySelector('.weather_humidity')
let weather_wind = document.querySelector('.weather_wind')
let weather_pressure = document.querySelector('.weather_pressure')


//Search
document.querySelector(".locationInput")
    .addEventListener('submit', e => {
        e.preventDefault();
        let search = document.querySelector('#locationInput');
        currentCity = search.value;
        getWeather();
        // clear form
       search.value = ""
    });

////////////////////////////////////
// Function to get user's current location
// function getCurrentLocation() {

//     const apiKeyLocation = 'AIzaSyDzu0X8ZTxzN29qRo9tkne8nMmJNHIVvjE';

//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition((position) => {
//             const latitude = position.coords.latitude;
//             const longitude = position.coords.longitude;

//             // Use a reverse geocoding API to get the city based on latitude and longitude
//             fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKeyLocation}`)
//                 .then(res => res.json())
//                 .then(data => {
//                     if (data && data.length > 0) {
//                         currentCity = data[0].name;
//                         getWeather();
//                     }
//                 })
//                 .catch(error => console.error('Error fetching reverse geocoding data:', error));
//         });
//     } else {
//         console.error("Geolocation is not supported by this browser.");
//     }
// }

// // Event listener for the button to get current location
// document.getElementById("getLocationButton").addEventListener('click', () => {
//     getCurrentLocation();
// });

////////////////////////////////////

// Units
document.querySelector(".weather-unit-celsius").addEventListener
('click',() => {
    if(units !== "metric"){
        // change to metric
        units = "metric"
        //get weather forecast
        getWeather()
        // Update unit color
        updateUnitColor();
    }
})

document.querySelector(".weather-unit-fahrenheit").addEventListener
('click',() => {
    if(units !== "imperial"){
        // change to imperial
        units = "imperial"
        //get weather forecast
        getWeather()
        // Update unit color
         updateUnitColor();
    }
})

function updateUnitColor() {
    const celsiusUnit = document.querySelector(".weather-unit-celsius");
    const fahrenheitUnit = document.querySelector(".weather-unit-fahrenheit");

    if (units === "metric") {
        celsiusUnit.style.color = "blue"; // Change to your desired color
        fahrenheitUnit.style.color = ""; // Reset the color
    } else {
        celsiusUnit.style.color = ""; // Reset the color
        fahrenheitUnit.style.color = "red"; // Change to your desired color
    }
}

// Converter for country code to full name
function convertCountryCode(country) {
    let regionNames = new Intl.DisplayNames(["en"], { type: "region" });
    return regionNames.of(country);
}

// Converter for time
function convertTimeStamp(timestamp, timezone) {
    const convertTimeZone = timezone / 3600; // convert sec to hours
    const date = new Date(timestamp * 1000);
    const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        timeZone: `Etc/GMT${convertTimeZone >= 0 ? "-" : "+"}${Math.abs(convertTimeZone)}`,
        hour12: true,
    };
    return date.toLocaleString("en-US", options);
}


function getWeather() {
    const apiKey = '5e35dfd9d7a0a3fb8d51552ef769b739';

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${apiKey}&units=${units}`)
        .then(res => res.json())
        .then(data => {
            city.innerHTML = `${data.name}, ${convertCountryCode(data.sys.country)}`;
            datetime.innerHTML = convertTimeStamp(data.dt, data.timezone);
            weather_forecast.innerHTML = `<h1>${data.weather[0].main}`
            weather_temperature.innerHTML = `${data.main.temp.toFixed()}&#176`
            weather_icon.innerHTML = `<img src = "http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png"/>`        
            weather_minmax.innerHTML = `<p> Min: ${data.main.temp_min.toFixed()}&#176</p><p> Max: ${data.main.temp_max.toFixed()}&#176</p>`
            weather_realfeel.innerHTML = `${data.main.feels_like.toFixed()}&#176`
            weather_humidity.innerHTML = `${data.main.humidity.toFixed()}%`
            weather_wind.innerHTML = `${data.wind.speed}${units === "imperial" ? "mph": "m/s"}`
            weather_pressure.innerHTML = `${data.main.pressure.toFixed()}hPa`



        })
        .catch(error => console.error('Error fetching weather:', error));
}

document.addEventListener('DOMContentLoaded', getWeather);
        