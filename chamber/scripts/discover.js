import discoverData from '../data/discover.mjs';

// Handle visit message
const lastVisit = localStorage.getItem('lastVisit');
const now = Date.now();
const visitInfo = document.getElementById('visit-info');

if (!lastVisit) {
  visitInfo.textContent = 'Welcome! Let us know if you have any questions.';
} else {
  const days = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
  if (days < 1) {
    visitInfo.textContent = 'Back so soon! Awesome!';
  } else {
    const dayWord = days === 1 ? 'day' : 'days';
    visitInfo.textContent = `You last visited ${days} ${dayWord} ago.`;
  }
}
localStorage.setItem('lastVisit', now);

// Build discover cards
const grid = document.querySelector('.discover-grid');
discoverData.forEach((item, index) => {
  const card = document.createElement('div');
  card.className = 'discover-card';
  const isFirstImage = index === 0;
  card.innerHTML = `
    <h2>${item.name}</h2>
    <figure>
      <img src="${item.image}" alt="${item.name}" ${isFirstImage ? 'fetchpriority="high"' : 'loading="lazy"'} width="300" height="200">
    </figure>
    <address>${item.address}</address>
    <p>${item.description}</p>
    <button>Learn More</button>
  `;
  grid.appendChild(card);
});