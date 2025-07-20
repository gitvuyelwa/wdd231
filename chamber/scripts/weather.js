
const weatherSection = document.getElementById('weather');
const forecastSection = document.querySelector('.forecast');
const membersSection = document.getElementById('members');
const API_KEY = 'c39bfa0f99eec65be6af1447f0bdad3b';
const CITY = 'Johannesburg';
const MEMBER_JSON = 'members.json'; // Example: local or hosted JSON

// Weather Fetch
async function fetchWeather() {
    try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${CITY}&units=metric&appid=${API_KEY}`);
        const data = await res.json();

        const current = data.list[0];
        const currentHTML = `
            <p>${CITY}</p>
            <p>Temperature: ${current.main.temp.toFixed(1)}°C</p>
            <p>${current.weather[0].description}</p>
        `;
        weatherSection.innerHTML += currentHTML;

        const forecastDays = data.list.filter((item, index) => index % 8 === 0).slice(1, 4);
        let forecastHTML = '<ul>';
        forecastDays.forEach(day => {
            const date = new Date(day.dt_txt).toLocaleDateString();
            forecastHTML += `<li><strong>${date}</strong>: ${day.main.temp.toFixed(1)}°C</li>`;
        });
        forecastHTML += '</ul>';
        forecastSection.innerHTML += forecastHTML;

    } catch (error) {
        weatherSection.innerHTML += '<p>Unable to load weather data.</p>';
    }
}

// Member Spotlight
async function loadMembers() {
    try {
        const res = await fetch(MEMBER_JSON);
        const members = await res.json();

        const goldSilver = members.filter(m => m.membership === 'Gold' || m.membership === 'Silver');
        const random = goldSilver.sort(() => 0.5 - Math.random()).slice(0, 3);

        random.forEach(member => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <img src="${member.logo}" alt="${member.name} logo">
                <h4>${member.name}</h4>
                <p><strong>Phone:</strong> ${member.phone}</p>
                <p><strong>Address:</strong> ${member.address}</p>
                <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
                <p><strong>Level:</strong> ${member.membership}</p>
            `;
            membersSection.appendChild(card);
        });
    } catch (error) {
        membersSection.innerHTML = '<p>Error loading members.</p>';
    }
}

// Toggle View
document.getElementById('grid-view').addEventListener('click', () => {
    membersSection.className = 'grid-view';
});
document.getElementById('list-view').addEventListener('click', () => {
    membersSection.className = 'list-view';
});

fetchWeather();
loadMembers();
