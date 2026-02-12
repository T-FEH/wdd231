// Submission page - display form data
document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const dataDisplay = document.getElementById('submission-data');

  if (!dataDisplay) return;

  // Extract and display form data
  const formData = {
    'Name': params.get('name') || 'Not provided',
    'City, State': params.get('city') || 'Not provided',
    'Email': params.get('email') || 'Not provided',
    'Garden Type': formatGardenType(params.get('gardenType')) || 'Not provided',
    'Years of Experience': params.get('experience') || '0',
    'Story Title': params.get('storyTitle') || 'Untitled',
    'Story Content': params.get('storyContent') || 'No story provided',
    'Newsletter Subscription': params.get('subscribe') === 'yes' ? 'Yes' : 'No',
    'Consent to Share': params.get('consent') === 'yes' ? 'Yes' : 'No',
    'Submitted': formatDate(params.get('timestamp'))
  };

  let html = '';
  for (const [label, value] of Object.entries(formData)) {
    if (label === 'Story Content') {
      html += `
        <div class="data-row full-width">
          <div>
            <div class="data-label">${label}:</div>
            <div style="margin-top: 0.5rem; line-height: 1.6;">${value}</div>
          </div>
        </div>
      `;
    } else {
      html += `
        <div class="data-row">
          <span class="data-label">${label}:</span>
          <span>${value}</span>
        </div>
      `;
    }
  }

  dataDisplay.innerHTML = html;
});

function formatGardenType(type) {
  const types = {
    'balcony': 'Balcony/Patio',
    'windowsill': 'Windowsill/Indoor',
    'rooftop': 'Rooftop',
    'backyard': 'Backyard/Yard',
    'community': 'Community Garden',
    'other': 'Other'
  };
  return types[type] || type;
}

function formatDate(isoString) {
  if (!isoString) return 'Just now';
  
  const date = new Date(isoString);
  return date.toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}
