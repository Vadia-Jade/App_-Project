function refreshWeather(response) {
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;

    temperatureElement.innerHTML = Math.round(temperature);
}
function searchCity(city) {
 let apiKey = "034407t747af2dfd1c31bo02c7fc4156";

 let apiUrl =`https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&unit=metric`;
 axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
   event.preventDefault();
   let searchInput = document.querySelector("#search-input");
   let dataCityElement = document.querySelector("#data-city");
   dataCityElement.innerHTML = searchInput.value;
   searchCity(searchInput.value);
}
let formSearchElement = document.querySelector("#form-search");
formSearchElement.addEventListener("submit", handleSearchSubmit);