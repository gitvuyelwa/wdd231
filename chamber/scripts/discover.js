document.addEventListener("DOMContentLoaded", () => {
    // Visitor message
    const messageEl = document.getElementById("visitorMessage");
    const lastVisit = localStorage.getItem("lastVisit");
    const now = Date.now();

    if (!lastVisit) {
        messageEl.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const daysPassed = Math.floor((now - parseInt(lastVisit)) / (1000 * 60 * 60 * 24));
        if (daysPassed < 1) {
            messageEl.textContent = "Back so soon! Awesome!";
        } else {
            messageEl.textContent = `You last visited ${daysPassed} day${daysPassed === 1 ? "" : "s"} ago.`;
        }
    }

    localStorage.setItem("lastVisit", now.toString());

    // Fetch and render cards
    fetch("data/attractions.json")
        .then((res) => res.json())
        .then((data) => {
            const grid = document.getElementById("discoverGrid");
            data.forEach((item, index) => {
                const card = document.createElement("div");
                card.className = "card";
                card.style.gridArea = `card${index + 1}`;

                card.innerHTML = `
                    <h2>${item.title}</h2>
                    <figure>
                        <img src="${item.image}" alt="${item.title}" width="300" height="200" loading="lazy" />
                    </figure>
                    <address>${item.address}</address>
                    <p>${item.description}</p>
                    <button>Learn More</button>
                `;
                grid.appendChild(card);
            });
        })
        .catch(err => {
            console.error("Failed to load JSON data:", err);
        });
});

