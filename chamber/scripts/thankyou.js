document.addEventListener('DOMContentLoaded', function() {
  const urlParams = new URLSearchParams(window.location.search);
  console.log('Thank you page loaded');
  console.log('Full URL:', window.location.href);
  console.log('URL Params:', urlParams.toString());

  const fname = urlParams.get('fname');
  const lname = urlParams.get('lname');
  const email = urlParams.get('email');
  const phone = urlParams.get('phone');
  const business = urlParams.get('business');
  const timestamp = urlParams.get('timestamp');

  console.log('Retrieved values:', { fname, lname, email, phone, business, timestamp });

  document.getElementById('fname-display').textContent = fname || 'N/A';
  document.getElementById('lname-display').textContent = lname || 'N/A';
  document.getElementById('email-display').textContent = email || 'N/A';
  document.getElementById('phone-display').textContent = phone || 'N/A';
  document.getElementById('business-display').textContent = business || 'N/A';

  if (timestamp) {
    const date = new Date(timestamp);
    document.getElementById('timestamp-display').textContent = date.toLocaleString();
  } else {
    document.getElementById('timestamp-display').textContent = 'N/A';
  }
});