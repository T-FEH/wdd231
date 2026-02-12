import { loadPlants, filterPlants, openPlantModal, getRecentlyViewed } from './plants.js';

let allPlants = [];

// Initialize resources page
document.addEventListener('DOMContentLoaded', async () => {
  // Load all plants
  allPlants = await loadPlants();
  displayPlants(allPlants);
  updatePlantCount(allPlants.length);

  // Display recently viewed
  displayRecentlyViewed();

  // Setup filters
  setupFilters();
});

function displayPlants(plants) {
  const grid = document.getElementById('plants-grid');
  if (!grid) return;

  if (plants.length === 0) {
    grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">No plants match your filters. Try adjusting your selections.</p>';
    return;
  }

  grid.innerHTML = '';
  
  plants.forEach(plant => {
    const card = document.createElement('div');
    card.className = 'plant-card';
    card.innerHTML = `
      <span class="category">${plant.category}</span>
      <h3>${plant.name}</h3>
      <p class="difficulty ${plant.difficulty}">Difficulty: ${plant.difficulty}</p>
      <p><strong>☀️ Sunlight:</strong> ${plant.sunlight}</p>
      <p><strong>💧 Water:</strong> ${plant.waterFrequency}</p>
      <p><strong>📏 Space:</strong> ${plant.spaceRequired}</p>
      <p><strong>⏱️ Harvest:</strong> ${plant.harvestTime}</p>
      <p><strong>📅 Season:</strong> ${plant.season}</p>
    `;
    
    card.addEventListener('click', () => {
      openPlantModal(plant);
      // Refresh recently viewed after modal opens
      setTimeout(displayRecentlyViewed, 100);
    });
    
    grid.appendChild(card);
  });
}

function setupFilters() {
  const categoryFilter = document.getElementById('category-filter');
  const difficultyFilter = document.getElementById('difficulty-filter');
  const seasonFilter = document.getElementById('season-filter');
  const resetBtn = document.getElementById('reset-filters');

  const applyFilters = () => {
    const filters = {
      category: categoryFilter?.value || '',
      difficulty: difficultyFilter?.value || '',
      season: seasonFilter?.value || ''
    };

    const filtered = filterPlants(allPlants, filters);
    displayPlants(filtered);
    updatePlantCount(filtered.length);
  };

  categoryFilter?.addEventListener('change', applyFilters);
  difficultyFilter?.addEventListener('change', applyFilters);
  seasonFilter?.addEventListener('change', applyFilters);

  resetBtn?.addEventListener('click', () => {
    if (categoryFilter) categoryFilter.value = '';
    if (difficultyFilter) difficultyFilter.value = '';
    if (seasonFilter) seasonFilter.value = '';
    displayPlants(allPlants);
    updatePlantCount(allPlants.length);
  });
}

function updatePlantCount(count) {
  const countEl = document.getElementById('plant-count');
  if (countEl) {
    countEl.textContent = `Showing ${count} plant${count !== 1 ? 's' : ''}`;
  }
}

function displayRecentlyViewed() {
  const recent = getRecentlyViewed();
  const container = document.getElementById('recent-plants');
  
  if (!container) return;

  if (recent.length === 0) {
    container.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">No recently viewed plants yet. Click on plants above to view details!</p>';
    return;
  }

  container.innerHTML = '';
  
  recent.forEach(plant => {
    const card = document.createElement('div');
    card.className = 'plant-card';
    card.innerHTML = `
      <span class="category">${plant.category}</span>
      <h3>${plant.name}</h3>
      <p class="difficulty ${plant.difficulty}">Difficulty: ${plant.difficulty}</p>
      <p><strong>Harvest:</strong> ${plant.harvestTime}</p>
    `;
    
    card.addEventListener('click', () => openPlantModal(plant));
    container.appendChild(card);
  });
}
