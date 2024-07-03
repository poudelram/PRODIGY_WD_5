const apiKey = '6e22bc446b13d75e189d11d0e16680c0';

async function getWeatherByLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            const weatherData = await fetchWeatherDataByCoords(latitude, longitude);
            displayWeather(weatherData);
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

async function getWeatherByInput() {
    const location = document.getElementById('locationInput').value;
    if (location) {
        const weatherData = await fetchWeatherDataByLocation(location);
        displayWeather(weatherData);
    } else {
        alert('Please enter a location.');
    }
}

async function fetchWeatherDataByCoords(latitude, longitude) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);
    return response.json();
}

async function fetchWeatherDataByLocation(location) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`);
    return response.json();
}

function displayWeather(data) {
    if (data.cod === 200) {
        const weatherInfo = `
            <p><strong>Location:</strong> ${data.name}</p>
            <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
            <p><strong>Weather:</strong> ${data.weather[0].description}</p>
            <p><strong>Humidity:</strong> ${data.main.humidity} %</p>
            <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
        `;
        document.getElementById('weatherInfo').innerHTML = weatherInfo;
    } else {
        document.getElementById('weatherInfo').innerHTML = `<p>${data.message}</p>`;
    }
}
