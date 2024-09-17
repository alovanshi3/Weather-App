const userTab=document.querySelector("[data-userWeather]");
const searchTab=document.querySelector("[data-searchWeather]");
const userContainer=document.querySelector(".weather-container");
const grantAccessContainer=document.querySelector(".grant-location-container")
const searchForm=document.querySelector("[data-searchForm]");
const loadingScreen=document.querySelector(".loading-container");
const userInfoContainer=document.querySelector(".user-info-container");
const grantAccessButton=document.querySelector("[data-grantAccess]");
const searchInput=document.querySelector("[data-searchInput]");
const notFound=document.querySelector(".not-found");

//initially variables needed
let currentTab=userTab;
const API_KEY= "8abbabf8016c636e786d0910631ebe79";
currentTab.classList.add("current-tab");
getfromSessionStorage();

//switch clicked tab
function switchTab(clickedTab){
    if(clickedTab!=currentTab){
        currentTab.classList.remove("current-tab");
        currentTab=clickedTab;
        currentTab.classList.add("current-tab");

        if(!searchForm.classList.contains("active")){
            userInfoContainer.classList.remove("active");
            grantAccessContainer.classList.remove("active");
            //search wala tab is invisible make it visible
            searchForm.classList.add("active");
        }

        else {
            // pahle search tab pr tah abyour tab me a gya hu so make it visible
            searchForm.classList.remove("active");
            userInfoContainer.classList.remove("active");
            // your tab  pr hu to weather bhi visible krna padega so check local storage for coordinates
            getfromSessionStorage();
        }
    }
}

userTab.addEventListener("click",()=>{
    //pass clicked tab as input parameter
    switchTab(userTab);
});

searchTab.addEventListener("click",()=>{
    //pass search clicked tab as input parameter
    switchTab(searchTab);
});

//check if cordinates are already present in storage
function getfromSessionStorage(){
  const localCoordinates =sessionStorage.getItem("user-coordinates"); // it check sessionStorage ke andr koi user-coordinate name ka item hai 
 // if local coordinate not found then display location access window
  if(!localCoordinates){
    grantAccessContainer.classList.add("active");
  }
  // it means coordinate hai then call api and use coordiante to give wethaer detail
  else {
    const coordinates = JSON.parse(localCoordinates);
    fetchUserWeatherInfo(coordinates);
  }
}

async function fetchUserWeatherInfo(coordinates){
       const {lat,lon}=coordinates;
       //make grantcontainer invisible 
       grantAccessContainer.classList.remove("active");
       // make loader visible 
       loadingScreen.classList.add("active");

       //api call
        try{
            const response=await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
            );

            const data=await response.json();
            loadingScreen.classList.remove("active");
            notFound.classList.remove("active");
            userInfoContainer.classList.add("active");
            // data a chuka hai ab render hoga data 
            renderWeatherInfo(data);
        }

        catch(ee){
            loadingScreen.classList.remove("active");
            notFound.classList.add("active");
                //h.w
        }
}

function renderWeatherInfo(weatherInfo){
    // we have to fetch where we want to put the data
  const cityName=document.querySelector("[data-cityName]");
  const countryIcon=document.querySelector("[data-countryIcon]");
  const desc=document.querySelector("[data-weatherDesc]");
  const weatherIcon=document.querySelector("[data-weatherIcon]");
  const temp=document.querySelector("[data-temp]");
  const windspeed=document.querySelector("[data-windspeed]");
  const humidity=document.querySelector("[data-humidity]");
  const cloudiness=document.querySelector("[data-cloudiness]");

  console.log(weatherInfo);
  // getting value from weather into object
  cityName.innerText=weatherInfo?.name;
  countryIcon.src=`https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
  desc.innerText=weatherInfo?.weather?.[0]?.description;
  weatherIcon.src=` https://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`
 // let a= `${weatherInfo?.main?.temp.toFixed(2)} °C`;
  let a=(weatherInfo?.main?.temp)-273.15;
  temp.innerText=`${(weatherInfo?.main?.temp-273.15).toFixed(2)} °C`;
  //temp.textContent=a.toFixed(2)+"°C";
  windspeed.innerText = `${weatherInfo?.wind?.speed} m/s`;
  humidity.innerText = `${weatherInfo?.main?.humidity}%`;
  cloudiness.innerText = `${weatherInfo?.clouds?.all}%`;

}

// it the condition of when getsessionstorage does not have coordinates and u enable the grtand access button to enable the location
// so we have to add event listener to this button to trigger event and give location on
grantAccessButton.addEventListener('click',getLocation);

// this function find current location of user
function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else {
            console.log("no location found");  //h.w
    }
}

  // it  give the position coordinates
function showPosition(position){
    const userCoordinates={
        lat:position.coords.latitude,
        lon:position.coords.longitude,
    }
    // now store the coordinates to use in getsessionstorage at line no 53
    sessionStorage.setItem("user-coordinates",JSON.stringify(userCoordinates));
    // now u get coordinate so u now fetch weather detail
    fetchUserWeatherInfo(userCoordinates);
}


// now u r at  search weather tab where u give city name n want to find 
//weather of that city so u need to add evwent listner while  u submit city name in search bar
searchForm.addEventListener('submit',(e)=>{
     e.preventDefault();
     let cityName=searchInput.value;
     if(cityName==="") return;
     else 
     fetchSearchWeatherInfo(cityName);
});


async function fetchSearchWeatherInfo(cityName){
    loadingScreen.classList.add("active");
    userInfoContainer.classList.remove("active");
    grantAccessContainer.classList.remove("active");

    try{
        const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`);
        const data= await response.json();
        loadingScreen.classList.remove("active");
        notFound.classList.remove("active");
    userInfoContainer.classList.add("active");
        
    renderWeatherInfo(data);

    }

    catch(e){

        loadingScreen.classList.remove("active");
        notFound.classList.add("active");

    }


}




/* pahle switch wala fxn likha and if we r at your weather  tab then
 we need to give weather detailby finding coordinates by getfromsessionstorage 






*/


