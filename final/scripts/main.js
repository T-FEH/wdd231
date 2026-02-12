import { loadPlants, openPlantModal } from './plants.js';
import { fetchWeather } from './weather.js';

// Initialize page functionality
document.addEventListener('DOMContentLoaded', async () => {
  // Load weather data
  await fetchWeather();

  // Load featured plants (limit to 6 for homepage)
  const plants = await loadPlants();
  const beginnerPlants = plants
    .filter(plant => plant.difficulty === 'Beginner')
    .slice(0, 6);
  
  displayPlants(beginnerPlants);

  // Explore plants button
  const exploreBtn = document.getElementById('explore-plants');
  if (exploreBtn) {
    exploreBtn.addEventListener('click', () => {
      window.location.href = 'resources.html';
    });
  }
});

// Display plants in grid
function displayPlants(plants) {
  const grid = document.getElementById('plants-grid');
  if (!grid) return;

  grid.innerHTML = '';
  
  plants.forEach(plant => {
    const card = document.createElement('div');
    card.className = 'plant-card';
    card.innerHTML = `
      <span class="category">${plant.category}</span>
      <h3>${plant.name}</h3>
      <p class="difficulty ${plant.difficulty}">Difficulty: ${plant.difficulty}</p>
      <p><strong>Sunlight:</strong> ${plant.sunlight}</p>
      <p><strong>Harvest:</strong> ${plant.harvestTime}</p>
    `;
    
    card.addEventListener('click', () => openPlantModal(plant));
    grid.appendChild(card);
  });
}
