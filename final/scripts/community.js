// Community page functionality
document.addEventListener('DOMContentLoaded', () => {
  // Add timestamp to form before submission
  const form = document.getElementById('story-form');
  const timestampField = document.getElementById('timestamp');

  if (form && timestampField) {
    form.addEventListener('submit', (e) => {
      timestampField.value = new Date().toISOString();
    });
  }

  // Character counter for story content
  const storyTextarea = document.getElementById('story-content');
  if (storyTextarea) {
    const counterDiv = document.createElement('div');
    counterDiv.style.textAlign = 'right';
    counterDiv.style.fontSize = '0.9rem';
    counterDiv.style.color = 'var(--text-gray)';
    counterDiv.style.marginTop = '0.25rem';
    storyTextarea.parentElement.appendChild(counterDiv);

    const updateCounter = () => {
      const length = storyTextarea.value.length;
      counterDiv.textContent = `${length} characters`;
      
      if (length < 100) {
        counterDiv.style.color = '#d32f2f';
      } else if (length < 200) {
        counterDiv.style.color = '#ffc107';
      } else {
        counterDiv.style.color = 'var(--primary-green)';
      }
    };

    storyTextarea.addEventListener('input', updateCounter);
    updateCounter();
  }

  // Form validation helper
  const emailField = document.getElementById('email');
  if (emailField) {
    emailField.addEventListener('blur', () => {
      if (emailField.validity.typeMismatch) {
        emailField.setCustomValidity('Please enter a valid email address (e.g., name@example.com)');
      } else {
        emailField.setCustomValidity('');
      }
    });
  }
});
