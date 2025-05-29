const searchBtn = document.getElementById('searchBtn');
const input = document.getElementById('cityName');
let keyPressed = false

input.addEventListener('keypress', function(event){
    if (event.key === 'Enter'){
        keyPressed = true
        event.preventDefault();
        let cityName = document.getElementById('cityName').value;
        fetch( `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=10e1658a02095c5cbd18ed9de631ba59`)
            .then(response => response.json())
            .then(data=>{
                document.getElementById('weather').innerText = `${(Math.round(data.main.temp-273.15))}°C`
                document.getElementById('feelsLike').innerText = `Feels Like: ${(Math.round(data.main.feels_like-273.15))}°C`
                document.getElementById('cityTitle').innerText = data.name
                const timestamp = data.dt*1000;
                const date = new Date(timestamp);
                document.getElementById('time').innerText = `Last Updated: ${date.toLocaleTimeString()}`
                document.getElementById('coverImg').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
                document.getElementById('coverImg').style.display = 'inline-block';
                document.getElementById('weatherDesc').innerText = data.weather[0].description
            })
            
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=10e1658a02095c5cbd18ed9de631ba59`)
            .then(response => response.json())
            .then(data2 => {
                if (data2.cod !== "200") {
                    return;
                }
                const forecasts = data2.list;
                const container = document.getElementById("forecast-cards-container");
                container.innerHTML = ""; 

                for (let i = 0; i < 6; i++) {
                    const forecast = forecasts[i];
                    const date = new Date(forecast.dt_txt);
                    const time = date.toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true
                    });
                    const iconUrl = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`;
                    const temp = `${Math.round(forecast.main.temp - 273.15)}°`;

                    const card = document.createElement('div');
                    card.className = 'forecast-card-item';
                    card.innerHTML = `
                        <div class="forecast-time">${time}</div>
                        <img class="forecast-icon" src="${iconUrl}" alt="icon">
                        <p class="forecast-desc">${forecast.weather[0].description}</p>
                        <div class="forecast-temp">${temp}</div>
                    `;
                    container.appendChild(card);
                }
            })
        if (keyPressed = true){
            document.getElementById(`forecast-card`).style.visibility = 'visible';
        }
    }
});