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

 cityElement.innerHTML = response.data.city;
 currentDateELement.innerHTML = formatDate(currentDate);
 descriptionElement.innerHTML = response.data.condition.description;
 humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
 windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
 temperatureElement.innerHTML = Math.round(temperature);
 iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-icon"/>`;

 getForecast(response.data.city);
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
  function formatDay(timestamp) {
    let date = new Date (timestamp * 1000);
    let days = ["Sun","Mon","Tue","Wed","Thur","Fri","Sat"];

    return days[date.getDay()];
  }

  function getForecast (city){
    let apiKey = "034407t747af2dfd1c31bo02c7fc4156";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    axios(apiUrl).then(displayForecast);
   }

  function displayForecast(response) {
     let forecastHtml = "";
    response.data.daily.forEach(function(day, index) {
      if (index < 5){
        forecastHtml = forecastHtml +
          `
           <div class="forecast-day">
             <div class="forecast-date">${formatDay(day.time)}</div>
             <div>
             <img src ="${day.condition.icon_url}" class="forecast-icon"/>
              </div>
             <div class="weather-forecast-temperatures">
               <div class="forecast-temperature"><strong>${Math.round(day.temperature.maximum)}°</strong></div>
               <div class="forecast-temperature">${Math.round(day.temperature.minimum)}°</div>
              </div>
            </div>
        `;
      }    
    });
    let forecastElement = document.querySelector("#forecast");
   forecastElement.innerHTML = forecastHtml;
  }

  function getLocationAndSetTheme() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
       const lat = position.coords.latitude;
       const lon = position.coords.longitude;
       getSunTimes(lat, lon);
     
    });
   } else {
    console.warn("Geolocation is not supported by this browser.");
   }
  }

  function displaySunTimes(sunriseUTC, sunsetUTC) {
    const sunriseLocal = new Date(sunriseUTC).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const sunsetLocal = new Date(sunsetUTC).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  
    document.querySelector("#sunrise-time").textContent = sunriseLocal;
    document.querySelector("#sunset-time").textContent = sunsetLocal;
  }

  function getSunTimes(lat, lon) {
    const apiUrl =`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lon}&formatted=0`;
  
    axios.get(apiUrl).then((response) => {
      const sunriseUTC = new Date(response.data.results.sunrise);
      const sunsetUTC = new Date(response.data.results.sunset);
      const now = new Date();
  
      displaySunTimes(sunriseUTC, sunsetUTC); 
  
      const isNight = now < sunriseUTC || now > sunsetUTC;
  
      if (isNight) {
        document.body.classList.add("night-mode");
      } else {
        document.body.classList.remove("night-mode");
      }
      console.log(`Sunrise: ${sunriseLocal}, Sunset: ${sunsetLocal}, Night Mode: ${isNight}`);
    }); 
}
 
 let formSearchElement = document.querySelector("#form-search");
 formSearchElement.addEventListener("submit", handleSearchSubmit);


searchCity("Manchester");
getLocationAndSetTheme();
setInterval(getLocationAndSetTheme, 60 * 60 * 1000); 


