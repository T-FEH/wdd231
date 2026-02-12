// Navigation toggle
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('nav');

  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      nav.classList.toggle('open');
      const isOpen = nav.classList.contains('open');
      hamburger.setAttribute('aria-expanded', isOpen);
    });
  }

  // Update copyright year
  const yearSpan = document.getElementById('currentYear');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Update last modified date
  const modifiedSpan = document.getElementById('lastModified');
  if (modifiedSpan) {
    modifiedSpan.textContent = document.lastModified;
  }
});
