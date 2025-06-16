function refreshWeather(response) {
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windSpeedElement = document.querySelector("#wind-speed");  
    let currentDateELement = document.querySelector("#current-date");
    let currentDate = new Date();
    let iconElement = document.querySelector("#icon");

    currentDateELement.innerHTML = formatDate(currentDate);
    cityElement.innerHTML = response.data.city;
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
    temperatureElement.innerHTML = Math.round(temperature);
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-icon"/>`;
}
function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days [date.getDay()];
    if (minutes < 10) {
        minutes = `0${minutes}`;
      } if (hours < 10) {
        hours = `0${hours}`;
      };
  
    return `${day} ${hours}:${minutes}`;
}
function searchCity(city) {
 let apiKey = "034407t747af2dfd1c31bo02c7fc4156";

 let apiUrl =`https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&unit=metric`;
 axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
   event.preventDefault();
   let searchInput = document.querySelector("#search-input");
 
   searchCity(searchInput.value);
  }
  
  function displayForecast() {
    let forecastElement = document.querySelector("#forecast");
    let days = ["Tue", "Wed", "Thur", "Fri", "Sat"];
    let forecastHtml = "";
    days.forEach(function(day) {
      forecastHtml = forecastHtml +
          `
           <div class="forecast-day">
             <div class="forecast-date">${day}</div>
             <div class="forecast-icon">☀️</div>
             <div class="weather-forecast-temperatures">
               <div class="forecast-temperature"><strong>16°</strong></div>
               <div class="forecast-temperature">9°</div>
              </div>
            </div>
          `;
    });
   
   forecastElement.innerHTML = forecastHtml;
  }

let formSearchElement = document.querySelector("#form-search");
formSearchElement.addEventListener("submit", handleSearchSubmit);
displayForecast();
