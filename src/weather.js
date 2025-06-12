function handleSearchSubmit(event){
   event.preventDefault();
   let searchInput = document.querySelector("#search-input");
   let dataCityElement = document.querySelector("#data-city");
   dataCityElement.innerHTML = searchInput.value;
}
let formSearchElement = document.querySelector("#form-search");
formSearchElement.addEventListener("submit", handleSearchSubmit);