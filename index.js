const API_KEY= "";

function renderWeatherInfo(data){
    let newPara=document.createElement('p');
    newPara.textContent=`${data?.main?.temp.toFixed(2)}°C`
    document.body.appendChild(newPara);
}



async function fetchWeather(){
    try{
    // let lalitude=15.3333;
    // let longitude =74.0833;
    let city = "jabalpur";
    const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
   const data= await response.json();
    console.log("weather data" ,data);

    renderWeatherInfo(data);
    }

    catch(err){

    }
}

async function getCustomWeatherDetails(){

    try{
        let lat=28.6066259;
        let lon=77.0601443;
    
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
        const data= await response.json();
        console.log("weather data" ,data);
    }
    catch(err){
         console.log("Error found",err);
    }

}

function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else console.log("no geolocation found");
}

function showPosition(position){
    let lat=position.coords.latitude;
    let lon=position.coords.longitude;

    console.log('lat=',lat);
    console.log('lon=',lon);
}


function showPosition(position){
    const lat=position.coords.latitude;
    const lon=position.coords.longitude;
}