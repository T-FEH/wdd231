// Weather API integration (using OpenWeatherMap)
const API_KEY = '3e25772ae7fab4023995d86497a09765'; // Replace with actual API key
const CITY = 'Lagos'; // Default city

export async function fetchWeather() {
  const container = document.getElementById('weather-container');
  if (!container) return;

  try {
    // Use OpenWeatherMap API
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Weather API error! status: ${response.status}`);
    }
    
    const data = await response.json();
    displayWeather(data);
    suggestPlanting(data);
    
  } catch (error) {
    console.error('Error fetching weather:', error);
    // Display fallback message
    container.innerHTML = `
      <div class="weather-info">
        <p>Weather data temporarily unavailable</p>
        <p style="font-size: 0.9rem; margin-top: 0.5rem;">
          💡 General tip: Most herbs and vegetables prefer 6-8 hours of sunlight daily
        </p>
      </div>
    `;
  }
}

function displayWeather(data) {
  const container = document.getElementById('weather-container');
  if (!container) return;

  const temp = Math.round(data.main.temp);
  const description = data.weather[0].description;
  const icon = getWeatherIcon(data.weather[0].main);

  container.innerHTML = `
    <div class="weather-info">
      <div class="weather-icon">${icon}</div>
      <h3>${data.name}</h3>
      <p style="font-size: 2rem; font-weight: 700;">${temp}°C</p>
      <p>${description}</p>
    </div>
  `;
}

function getWeatherIcon(condition) {
  const icons = {
    'Clear': '☀️',
    'Clouds': '☁️',
    'Rain': '🌧️',
    'Drizzle': '🌦️',
    'Thunderstorm': '⛈️',
    'Snow': '❄️',
    'Mist': '🌫️',
    'Smoke': '🌫️',
    'Haze': '🌫️',
    'Fog': '🌫️'
  };
  return icons[condition] || '🌤️';
}

function suggestPlanting(data) {
  const temp = data.main.temp;
  let suggestion = '';

  if (temp > 25) {
    suggestion = '🌶️ Great weather for heat-loving plants like peppers and tomatoes!';
  } else if (temp > 15 && temp <= 25) {
    suggestion = '🥬 Perfect weather for leafy greens like lettuce and spinach!';
  } else if (temp > 10 && temp <= 15) {
    suggestion = '🥕 Good conditions for cool-season crops like carrots and kale!';
  } else {
    suggestion = '🌱 Consider indoor herbs or winter-hardy vegetables!';
  }

  const container = document.getElementById('weather-container');
  if (container) {
    const suggestionEl = document.createElement('p');
    suggestionEl.style.marginTop = '1rem';
    suggestionEl.style.padding = '0.75rem';
    suggestionEl.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
    suggestionEl.style.borderRadius = '4px';
    suggestionEl.textContent = suggestion;
    container.appendChild(suggestionEl);
  }
}

// Cache weather data in localStorage
export function cacheWeatherData(data) {
  const cached = {
    data: data,
    timestamp: Date.now()
  };
  localStorage.setItem('weatherCache', JSON.stringify(cached));
}

export function getCachedWeather() {
  const cached = localStorage.getItem('weatherCache');
  if (!cached) return null;

  const parsed = JSON.parse(cached);
  const hoursSinceCache = (Date.now() - parsed.timestamp) / (1000 * 60 * 60);

  // Use cache if less than 1 hour old
  if (hoursSinceCache < 1) {
    return parsed.data;
  }
  return null;
}
