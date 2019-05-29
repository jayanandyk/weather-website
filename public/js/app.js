console.log('client side js running');

const weatherForm = document.getElementById('weather-form');
const locationinput = document.getElementById('location-input');
const messageOne = document.getElementById('para-1');
const messageTwo = document.getElementById('para-2');
const weatherHeader = document.getElementById('weather-header-tag');
const humidityTag = document.getElementById('humidity-tag');
const windSpeedTag = document.getElementById('windSpeed-tag');
const windGustTag = document.getElementById('windGust-tag');
const uvIndexTag = document.getElementById('uvIndex-tag');
const visibilityTag = document.getElementById('visibility-tag');



weatherForm.addEventListener('submit', (e)=> {
    e.preventDefault();
    const { value } = locationinput;
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    weatherHeader.textContent = '';
    humidityTag.textContent = '';
    windSpeedTag.textContent = '';
    windGustTag.textContent = '';
    uvIndexTag.textContent = '';
    visibilityTag.textContent = '';
            
    fetch(`/weather?address=${value}`).then((res)=>{
        res.json().then((data)=> {
            if(data.error) {
                messageOne.textContent = data.error;
            } else {
                console.log(data);
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
                weatherHeader.textContent = "Weather Info :";
                humidityTag.textContent = `Humidity - ${data.humidity}`;
                windSpeedTag.textContent = `Wind Speed - ${data.windSpeed}`;
                windGustTag.textContent = `Wind Gust - ${data.windGust}`;
                uvIndexTag.textContent = `UV Index - ${data.uvIndex}`;
                visibilityTag.textContent = `Visibility - ${data.visibility}`;
            }
        });
    });
});
