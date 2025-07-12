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
      <p><strong>Membership Level:</strong> ${getMembershipLabel(member.membership)}</p>
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

// ✅ Initialize
fetchMembers();