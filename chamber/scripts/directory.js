const navButton = document.querySelector('#ham-btn');
const navLinks = document.querySelector('#nav-bar');


navButton.addEventListener('click', () => {
  navButton.classList.toggle('show');
  navLinks.classList.toggle('show');

});
const gridBtn = document.getElementById('grid-view');
const listBtn = document.getElementById('list-view');
const memberSection = document.getElementById('members');

gridBtn.addEventListener('click', () => {
  memberSection.classList.add('grid');
  memberSection.classList.remove('list');
});

listBtn.addEventListener('click', () => {
  memberSection.classList.add('list');
  memberSection.classList.remove('grid');
});

// ✅ Fetch and Display Members from JSON
async function fetchMembers() {
  try {
    const response = await fetch('data/members.json');
    const data = await response.json();
    displayMembers(data);
  } catch (error) {
    console.error('Error fetching members:', error);
  }
}

function displayMembers(members) {
  memberSection.innerHTML = ''; // Clear content
  members.forEach(member => {
    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
      <img src="${member.image}" alt="${member.name} Logo" loading="lazy">
      <h2>${member.name}</h2>
      <p><strong>${member.tagline || ''}</strong></p>
      <p><strong>Email:</strong> <a href="mailto:${member.email}">${member.email}</a></p>
      <p><strong>Phone:</strong> ${member.phone}</p>
      <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
    `;

    memberSection.appendChild(card);
  });
}

function getMembershipLabel(level) {
  switch (level) {
    case 3: return 'Gold';
    case 2: return 'Silver';
    default: return 'Member';
  }
}

async function loadSpotlightMembers() {
    try {
        const response = await fetch('chamberMembers.json');
        const members = await response.json();

        // Filter only Gold and Silver members
        const goldSilver = members.filter(member =>
            member.membership === 'Gold' || member.membership === 'Silver'
        );

        // Shuffle and pick 2 or 3 members
        const shuffled = goldSilver.sort(() => 0.5 - Math.random());
        const spotlightCount = Math.floor(Math.random() * 2) + 2; // 2 or 3
        const selected = shuffled.slice(0, spotlightCount);

        const membersSection = document.getElementById('members');

        selected.forEach(member => {
            const card = document.createElement('div');
            card.classList.add('card');

            card.innerHTML = `
                <img src="${member.logo}" alt="${member.name} logo">
                <h4>${member.name}</h4>
                <p><strong>Phone:</strong> ${member.phone}</p>
                <p><strong>Address:</strong> ${member.address}</p>
                <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
                <p><strong>Membership Level:</strong> ${member.membership}</p>
            `;

            membersSection.appendChild(card);
        });

    } catch (err) {
        console.error('Failed to load members:', err);
        document.getElementById('members').innerHTML = '<p>Error loading spotlights.</p>';
    }
}

document.addEventListener('DOMContentLoaded', loadSpotlightMembers);

// ✅ Initialize
fetchMembers();