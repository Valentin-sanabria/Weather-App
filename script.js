
//Var declarations for search bar.
let inputCity = document.getElementById("searchBar");
let cityName = inputCity.value;
let searchIcon = document.getElementById("searchIcon");
let recentCitySearches = document.querySelectorAll("p.recentCity");

//Var declarations for stats output.
let temperatureOutput = document.getElementById("temperature");
let cityOutput = document.getElementById("city");
let windOutput = document.getElementById("windSpeedKM");
let humidityOutput = document.getElementById("humidityPorcentage");


//API link-creation vars
let api_url = "https://api.openweathermap.org/data/2.5/weather?q=";
let api_key = "&appid=8d6d613f6cb4621a5c237a580219c44c";
let unit = "&units=metric";


let i = 0;

//Send input to by pressing enter.
inputCity.addEventListener("keydown", enter=> {

    if ( enter.key == "Enter"){

        //Change city name variable, and call function for upper case.
        cityName = inputCity.value;
        let latestSearch = firstUpperCase(cityName);

        //Update history to show the city name.
        recentCitySearches[i].innerHTML = latestSearch;
        //Clean input text.
        inputCity.value = "";
        cityName = latestSearch;
        i++;

        //Finish api url by adding the city name from input, call getData() function-
        let full_url = api_url + cityName + unit + api_key;
        getData(full_url)
    

        if ( i > 2 ) {
    
            i = 0;
    
    
        }
    }

})

//Send input to by clicking search icon instead of pressing enter.
searchIcon.addEventListener("click", search=>{

    
    //Change city name variable, and call function for upper case.
    cityName = inputCity.value;
    let latestSearch = firstUpperCase(cityName);

    //Update history to show the city name.
    recentCitySearches[i].innerHTML = latestSearch;
    //Clean input text.
    inputCity.value = "";
    i++;
    cityName = latestSearch;

    //Finish api url by adding the city name from input, call getData() function-
    let full_url = api_url + cityName + unit + api_key;
    getData(full_url)
    
        
    if ( i > 2 ) {

        i = 0;


    }
})

//Function always make first letter upper case.
function firstUpperCase(cityName){

    //Assing touppercase() to first letter of string, then add the rest of the sentence by using the actual sentence with the first letter sliced. 
    latestSearch = cityName[0].toUpperCase() + cityName.slice(1);
    cityName = latestSearch;

    return latestSearch;
    
}

//Change background img depending on city.


//Get info with API.
async function getData(full_url) {

    const api_respone = await fetch(full_url);
    const data = await api_respone.json();
    console.log(data);

    //Save temperature in var.
    const cityTemperature = data.main.temp;
    const cityHumidity = data.main.humidity;
    const cityWindSpeed = data.wind.speed;
    console.log("temperature: " + cityTemperature);
    
    changeOutput(cityTemperature, cityHumidity, cityWindSpeed);

}

//Change weather info depending on city

function changeOutput(cityTemperature, cityHumidity, cityWindSpeed) {

    temperatureOutput.innerText = cityTemperature + "°";
    cityOutput.innerText = cityName;
    humidityOutput.innerText = cityHumidity + "%";
    windOutput.innerText = cityWindSpeed + "km/h";

}