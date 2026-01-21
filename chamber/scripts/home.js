document.addEventListener('DOMContentLoaded', function() {
  // Weather API
  const apiKey = '3e25772ae7fab4023995d86497a09765'; // Replace with actual API key
  const city = 'Lagos';
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  async function fetchWeather() {
    try {
      const [currentResponse, forecastResponse] = await Promise.all([
        fetch(weatherUrl),
        fetch(forecastUrl)
      ]);
      if (!currentResponse.ok || !forecastResponse.ok) {
        console.log('Current response status:', currentResponse.status, currentResponse.statusText);
        console.log('Forecast response status:', forecastResponse.status, forecastResponse.statusText);
        throw new Error('Weather API request failed. Check your API key.');
      }
      const currentData = await currentResponse.json();
      const forecastData = await forecastResponse.json();

      displayWeather(currentData, forecastData);
    } catch (error) {
      console.error('Error fetching weather:', error);
      document.getElementById('weather-info').innerHTML = '<p>Weather data unavailable. Please check your API key.</p>';
    }
  }

  function displayWeather(current, forecast) {
    const weatherDiv = document.getElementById('weather-info');
    const temp = Math.round(current.main.temp);
    const desc = current.weather[0].description;
    const forecastList = forecast.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 3);

    let html = `<p>Current: ${temp}°C, ${desc}</p><h3>3-Day Forecast:</h3>`;
    forecastList.forEach(day => {
      const date = new Date(day.dt * 1000).toDateString();
      const dayTemp = Math.round(day.main.temp);
      html += `<p>${date}: ${dayTemp}°C</p>`;
    });
    weatherDiv.innerHTML = html;
  }

  // Spotlights
  async function fetchSpotlights() {
    try {
      const response = await fetch('data/members.json');
      const members = await response.json();
      const eligible = members.filter(member => member.membershipLevel === 2 || member.membershipLevel === 3);
      const spotlights = eligible.sort(() => 0.5 - Math.random()).slice(0, 3);
      displaySpotlights(spotlights);
    } catch (error) {
      console.error('Error fetching spotlights:', error);
    }
  }

  function displaySpotlights(spotlights) {
    const container = document.getElementById('spotlights-container');
    container.innerHTML = '';
    spotlights.forEach(member => {
      const card = document.createElement('div');
      card.className = 'spotlight-card';
      card.innerHTML = `
        <img src="images/${member.image}" alt="${member.name} logo" width="300" height="200">
        <h3>${member.name}</h3>
        <p><strong>Address:</strong> ${member.address}</p>
        <p><strong>Phone:</strong> ${member.phone}</p>
        <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
        <p><strong>Membership:</strong> ${member.membershipLevel === 3 ? 'Gold' : 'Silver'}</p>
      `;
      container.appendChild(card);
    });
  }

  fetchWeather();
  fetchSpotlights();
});