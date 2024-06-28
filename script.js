const apiKey = "73e5b3f84f4f1cf86dbabb91c155c1b2";

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
  
const url = (city)=> `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;


async function getWeatherByLocation(city){
    try{
         const resp = await fetch(url(city), {
             origin: "cros" });
         const respData = await resp.json();
     
           addWeatherToPage(respData);}
    catch{
        alert("no city found")
    }
          
     }
      function addWeatherToPage(data){
          const temp = Ktoc(data.main.temp);

          const weather = document.createElement('div')
          weather.classList.add('weather');

          weather.innerHTML = `
          <h2>${temp}°C</h2><br>
          <small>Feels like ${Math.floor(data.main.feels_like-273.15)}°C</small><br>
          <small>${data.weather[0].main}</small><br>
          <small>Humidity:${data.main.humidity}%</small><br>   
          <small>Pressure:${data.main.pressure}mBar</small><br>   
          <small>Wind Speed:${data.wind.speed}Km/h</small><br>
          
          `;


        //   cleanup 
          main.innerHTML= "";
           main.appendChild(weather);
      };
    

     function Ktoc(K){
         return Math.floor(K - 273.15);
     }



     form.addEventListener('submit',(e) =>{
        e.preventDefault();

        const city = search.value;

        if(city){
            getWeatherByLocation(city)
        }

     });