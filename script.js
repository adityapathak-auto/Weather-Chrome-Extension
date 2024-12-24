const apiKeys = '5796abbde9106b7da4febfae8c44c232';
let cityName;

const getLocation = ()=>{
    navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        console.log("post",position);
        console.log(position.coords.latitude, position.coords.longitude);
        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
          );
          const data = await response.json();
           const cityName = data.address.city || 
                      data.address.town || 
                      data.address.village || 
                      'Unknown';
    const cityNameElement = document.getElementById("cityName");
      if (cityNameElement && cityName) {
        cityNameElement.textContent = cityName;
        console.log("city",cityName);
      }
      });
      
        
    

}
getLocation();
document.addEventListener('DOMContentLoaded', async () => {
    let data;
    try {
        console.log('Fetching data...');
        navigator.geolocation.getCurrentPosition(async (position) => {
         const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKeys}`);
        
         data = await response.json();
         console.log('Weather data:', data);
         const tempData = document.getElementById("tempData");
         
        if(tempData && data.hourly){
            tempData.innerHTML = '';
            
            // Create elements for each visibility data point
            data.hourly.forEach((item, index) => {
                if(index < 3){
                const visibilityDiv = document.createElement('div');
                const lineBreak = document.createElement('hr');
                visibilityDiv.className = 'visibility-item';
                
                // Format the date
                const date = new Date(item.dt * 1000);
                const formattedDate = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
                
                visibilityDiv.innerHTML = `
                    <p>Time: ${formattedDate}</p>
                    <p>Temprature: ${item.temp} °C</p>
                    <p>Humidity : ${item.humidity}  </p>
                    <p>Feels Like : ${item.feels_like} °C  </p>`;

                visibilityDiv.appendChild(lineBreak);
                tempData.appendChild(visibilityDiv);
                }
            });

        }
        });
        
        

        //const cityNameElement = document.getElementById("cityName");
        
    } catch (error) {
        console.error('Error fetching weather data:', error);
        const cityNameElement = document.getElementById("cityName");
        if (cityNameElement) {
            cityNameElement.textContent = "Error loading data";
        }
    }
});

console.log('Script loaded');