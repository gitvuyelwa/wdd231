// join.js
const timestampInput = document.getElementById('timestamp');
if (timestampInput) {
  const now = new Date().toISOString();
  timestampInput.value = now;
}

// Populate copyright
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModif").textContent = document.lastModified;

// Read query string
const params = new URLSearchParams(window.location.search);

// Display values
document.getElementById("firstName").textContent = params.get("firstname") || "N/A";
document.getElementById("lastName").textContent = params.get("lastname") || "N/A";
document.getElementById("email").textContent = params.get("email") || "N/A";
document.getElementById("phone").textContent = params.get("phone") || "N/A";
document.getElementById("business").textContent = params.get("business") || "N/A";
document.getElementById("timestamp").textContent = params.get("timestamp") || "N/A";
