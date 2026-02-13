// Load plants data from JSON file
export async function loadPlants() {
  try {
    const response = await fetch('data/plants.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const plants = await response.json();
    return plants;
  } catch (error) {
    console.error('Error loading plants data:', error);
    return [];
  }
}

// Filter plants by various criteria
export function filterPlants(plants, filters) {
  return plants.filter(plant => {
    if (filters.category && plant.category !== filters.category) return false;
    if (filters.difficulty && plant.difficulty !== filters.difficulty) return false;
    if (filters.season && !plant.season.includes(filters.season)) return false;
    return true;
  });
}

// Open plant detail modal
export function openPlantModal(plant) {
  const modal = document.getElementById('plant-modal');
  const modalBody = document.getElementById('modal-body');
  
  if (!modal || !modalBody) return;

  modalBody.innerHTML = `
    <h2 id="modal-title">${plant.name}</h2>
    <div class="plant-details">
      <div class="detail-row">
        <span class="detail-label">Category:</span>
        <span>${plant.category}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Difficulty:</span>
        <span class="difficulty ${plant.difficulty}">${plant.difficulty}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Sunlight:</span>
        <span>${plant.sunlight}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Water Frequency:</span>
        <span>${plant.waterFrequency}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Space Required:</span>
        <span>${plant.spaceRequired}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Harvest Time:</span>
        <span>${plant.harvestTime}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Best Season:</span>
        <span>${plant.season}</span>
      </div>
      <div style="margin-top: 1rem;">
        <p><strong>Description:</strong></p>
        <p>${plant.description}</p>
      </div>
      <div style="margin-top: 1rem; padding: 1rem; background-color: var(--beige); border-radius: 4px;">
        <p><strong>💡 Growing Tips:</strong></p>
        <p>${plant.tips}</p>
      </div>
    </div>
  `;

  modal.classList.add('show');
  modal.setAttribute('aria-hidden', 'false');
  
  // Save to localStorage for recently viewed
  saveRecentlyViewed(plant);
}

// Close modal
export function closeModal() {
  const modal = document.getElementById('plant-modal');
  if (modal) {
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
  }
}

// Setup modal close handlers
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('plant-modal');
  const closeBtn = document.querySelector('.modal-close');

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  // ESC key to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  });
});

// Save recently viewed plants to localStorage
function saveRecentlyViewed(plant) {
  let recent = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
  
  // Remove if already exists
  recent = recent.filter(p => p.id !== plant.id);
  
  // Add to beginning
  recent.unshift(plant);
  
  // Keep only last 5
  recent = recent.slice(0, 5);
  
  localStorage.setItem('recentlyViewed', JSON.stringify(recent));
}

// Get recently viewed plants
export function getRecentlyViewed() {
  return JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
}
