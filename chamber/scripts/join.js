document.addEventListener('DOMContentLoaded', function() {
  // Set timestamp
  const timestampField = document.getElementById('timestamp');
  const now = new Date();
  timestampField.value = now.toISOString();

  // Handle form submission
  const form = document.getElementById('join-form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      console.log('Form submitted');
      
      // Get form values
      const fname = document.getElementById('fname').value.trim();
      const lname = document.getElementById('lname').value.trim();
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const business = document.getElementById('business').value.trim();
      const timestamp = document.getElementById('timestamp').value;
      
      // Validate required fields
      if (!fname || !lname || !email || !phone || !business) {
        alert('Please fill in all required fields.');
        return;
      }
      
      // Build query string
      const queryString = `fname=${encodeURIComponent(fname)}&lname=${encodeURIComponent(lname)}&email=${encodeURIComponent(email)}&phone=${encodeURIComponent(phone)}&business=${encodeURIComponent(business)}&timestamp=${encodeURIComponent(timestamp)}`;
      
      console.log('Navigating with query string:', queryString);
      
      // Navigate to thank you page with query string
      window.location.href = `thankyou.html?${queryString}`;
    });
  }

  // Modal functions using event delegation
  document.addEventListener('click', function(e) {
    // Open modal
    if (e.target.classList.contains('modal-trigger')) {
      e.preventDefault();
      const modalId = e.target.getAttribute('data-modal');
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.style.display = 'block';
      }
    }
    
    // Close modal
    if (e.target.classList.contains('close')) {
      const modalId = e.target.getAttribute('data-modal');
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.style.display = 'none';
      }
    }
    
    // Close modal on outside click
    if (e.target.classList.contains('modal')) {
      e.target.style.display = 'none';
    }
  });
});</content>
<parameter name="filePath">/home/tife/wdd231/chamber/scripts/join.js