document.addEventListener('DOMContentLoaded', function() {
  // Set copyright year
  const currentYear = new Date().getFullYear();
  document.getElementById('copyright-year').textContent = currentYear;

  // Set last modified
  document.getElementById('lastModified').textContent = document.lastModified;
});