document.addEventListener('DOMContentLoaded', function() {
  const membersContainer = document.getElementById('members-container');
  const gridViewBtn = document.getElementById('grid-view');
  const listViewBtn = document.getElementById('list-view');

  let members = [];

  // Fetch members data
  async function fetchMembers() {
    try {
      const response = await fetch('data/members.json');
      members = await response.json();
      displayMembers();
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  }

  // Display members
  function displayMembers() {
    membersContainer.innerHTML = '';
    members.forEach((member, index) => {
      const card = document.createElement('div');
      card.className = 'member-card';
      if (member.membershipLevel === 3) {
        card.classList.add('membership-gold');
      } else if (member.membershipLevel === 2) {
        card.classList.add('membership-silver');
      } else {
        card.classList.add('membership-member');
      }
      const lazy = index > 0 ? ' loading="lazy"' : '';
      const priority = index === 0 ? ' fetchpriority="high"' : '';
      card.innerHTML = `
        <img src="images/${member.image}" alt="${member.name} logo" width="300" height="200"${priority}${lazy}>
        <h3>${member.name}</h3>
        <p><strong>Address:</strong> ${member.address}</p>
        <p><strong>Phone:</strong> ${member.phone}</p>
        <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
        <p><strong>Description:</strong> ${member.description}</p>
        <p><strong>Membership:</strong> ${member.membershipLevel === 3 ? 'Gold' : member.membershipLevel === 2 ? 'Silver' : 'Member'}</p>
      `;
      membersContainer.appendChild(card);
    });
  }

  // Toggle view
  gridViewBtn.addEventListener('click', function() {
    document.body.classList.remove('list-view');
    gridViewBtn.classList.add('active');
    listViewBtn.classList.remove('active');
  });

  listViewBtn.addEventListener('click', function() {
    document.body.classList.add('list-view');
    listViewBtn.classList.add('active');
    gridViewBtn.classList.remove('active');
  });

  fetchMembers();
});