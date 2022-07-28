
//Var declarations for search bar.
let inputCity = document.getElementById("searchBar");
let cityName = inputCity.value;
let searchIcon = document.getElementById("searchIcon");
let recentCitySearches = document.querySelectorAll("p.recentCity");

//Var declarations for stats output.
let temperatureOutput = document.getElementById("temperature");
let cityOutput = document.getElementById("city");
let iconOutput = document.getElementById("weatherIcon");
let adjectiveOutput = document.getElementById("weatherText");
let windOutput = document.getElementById("windSpeedKM");
let humidityOutput = document.getElementById("humidityPorcentage");


//API link-creation vars
let api_url = "https://api.openweathermap.org/data/2.5/weather?q=";
let api_key = "&appid=8d6d613f6cb4621a5c237a580219c44c";
let unit = "&units=metric";


let i = 0;
let start = true;
let finishedStatsChange = true;


//Send input to by pressing enter.
inputCity.addEventListener("keydown", enter=> {

    if ( enter.key == "Enter"){

        //Change city name variable, and call function for upper case.
        cityName = inputCity.value;
        let latestSearch = firstUpperCase(cityName);

        //Update history to show the city name.
        recentCitySearches[i].style.opacity = 0;
        recentCitySearches[i].innerHTML = latestSearch;
        recentCitySearches[i].style.opacity = 1;

        //Clean input text.
        inputCity.value = "";
        cityName = latestSearch;
        i++;

        //Finish api url by adding the city name from input, call getData() function-
        let full_url = api_url + cityName + unit + api_key;
        getData(full_url);

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

       recentCitySearches[i].style.opacity = 0;
       recentCitySearches[i].innerHTML = latestSearch;        
       recentCitySearches[i].style.opacity = 1;
   

    //Clean input text.
    inputCity.value = "";
    i++;
    cityName = latestSearch;

    //Finish api url by adding the city name from input, call getData() function-
    let full_url = api_url + cityName + unit + api_key;
    getData(full_url);
        
    //Execute hideShow()
    hideShow();
    
        
    if ( i > 2 ) {

        i = 0;


    }
})

//Function always make first letter upper case.
function firstUpperCase(cityName){

    //Assign touppercase() to first letter of string, then add the rest of the sentence by using the actual sentence with the first letter sliced. 
    latestSearch = cityName[0].toUpperCase() + cityName.slice(1);

    return latestSearch;
    
}

//Click a city from history and see its weather again. (City 1)
recentCitySearches[0].addEventListener("click", clickHistory=>{

    cityName = recentCitySearches[0].innerText;
    let full_url = api_url + cityName + unit + api_key;
    getData(full_url);



})

//Click a city from history and see its weather again. (City 2)
recentCitySearches[1].addEventListener("click", clickHistory=>{

    cityName = recentCitySearches[1].innerText;
    let full_url = api_url + cityName + unit + api_key;
    getData(full_url);

})

//Click a city from history and see its weather again. (City 3)
recentCitySearches[2].addEventListener("click", clickHistory=>{

    cityName = recentCitySearches[2].innerText;
    let full_url = api_url + cityName + unit + api_key;
    getData(full_url);

})

//Hide initial message and show weather stats.
function hideShow(cityTemperature, cityHumidity, cityWindSpeed, weatherAdjective, weatherIcon){
    
    if ( start == true ){        
      
        let statsHidden = document.querySelectorAll(".fakeDisplayNone");
        
        let initialMessage = document.getElementById("bigPadding");
        initialMessage.classList.add("hidden");
        
        setTimeout(() => {            
                
            initialMessage.classList.add("fakeDisplayNone");
            
            for (let i = 0; i < statsHidden.length; i++) {
                
                statsHidden[i].classList.replace("fakeDisplayNone", "hidden");

            }      
               

            setTimeout(() => {
                
                for (let i = 0; i < statsHidden.length; i++) {
                    
                statsHidden[i].classList.replace("hidden","replaceText");

                }     

            }, 100);
            

        }, 620);


    }

    //If !start then query all stats variables so they're always the same name even if content changes. Hide them, call changeOutput() , and show them again.
    if (start == false){

        let statsReplace = document.querySelectorAll(".replaceText");
        
        for (let i = 0; i < statsReplace.length; i++) {
        
            statsReplace[i].classList.add("hidden");

    }
    
    setTimeout(() => {

        changeOutput(cityTemperature, cityHumidity, cityWindSpeed, weatherAdjective, weatherIcon);

        for (let i = 0; i < statsReplace.length; i++) {
            
            statsReplace[i].classList.remove("hidden");

        }
        
    }, 620);

    }

   start = false;


}

//Change background img depending on city.






//Get info with API.
async function getData(full_url) {

    const api_respone = await fetch(full_url);
    const data = await api_respone.json();

    //Save stats in vars.
    const cityTemperature = data.main.temp;
    const cityHumidity = data.main.humidity;
    const cityWindSpeed = data.wind.speed;
    const weatherAdjective = data.weather[0].description;
    const weatherIcon = data.weather[0].icon;

     //Once all stats are replaced, execute hideShow()
     hideShow(cityTemperature, cityHumidity, cityWindSpeed, weatherAdjective, weatherIcon);

}


//Change weather stats info depending on city
function changeOutput(cityTemperature, cityHumidity, cityWindSpeed, weatherAdjective, weatherIcon) {

    temperatureOutput.innerText = Math.round(cityTemperature)  + "°";
    cityOutput.innerText = cityName;
    iconOutput.src = "http://openweathermap.org/img/wn/" + weatherIcon +"@2x.png";
    adjectiveOutput.innerText = firstUpperCase(weatherAdjective);
    humidityOutput.innerText = Math.round(cityHumidity) + "%";
    windOutput.innerText = Math.round(cityWindSpeed * 3.6) + "km/h";

    finishedStatsChange = true;

}