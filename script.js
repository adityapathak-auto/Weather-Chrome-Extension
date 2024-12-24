const apiKeys = '88ae947baf859540e73e800101371352';

document.addEventListener('DOMContentLoaded', async () => {
    try {
        console.log('Fetching data...');
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?id=1258182&appid=${apiKeys}&units=metric`);
        const data = await response.json();
        
        console.log('Weather data:', data);

        const cityNameElement = document.getElementById("cityName");
        const tempData = document.getElementById("tempData");
        if (cityNameElement && data.city) {
            cityNameElement.textContent = data.city.name;
            console.log('City name updated to:', data.city.name);
        } else {
            console.error('Either cityName element or data.city is missing');
            cityNameElement.textContent = "Data not found";
        }
        if(tempData && data.list){
            tempData.innerHTML = '';
            
            // Create elements for each visibility data point
            data.list.forEach((item, index) => {
                if(index < 3){
                const visibilityDiv = document.createElement('div');
                const lineBreak = document.createElement('hr');
                visibilityDiv.className = 'visibility-item';
                
                // Format the date
                const date = new Date(item.dt * 1000);
                const formattedDate = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
                
                visibilityDiv.innerHTML = `
                    <p>Time: ${formattedDate}</p>
                    <p>Temprature: ${item.main.temp} C</p>
                    <p>Humidity : ${item.main.humidity}  </p>
                    <p>Feels Like : ${item.main.feels_like}  </p>`;

                visibilityDiv.appendChild(lineBreak);
                tempData.appendChild(visibilityDiv);
                }
            });

        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        const cityNameElement = document.getElementById("cityName");
        if (cityNameElement) {
            cityNameElement.textContent = "Error loading data";
        }
    }
});

console.log('Script loaded');