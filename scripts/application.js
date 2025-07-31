const navButton = document.querySelector('#ham-btn');
const navLinks = document.querySelector('#nav-bar');
const lastModified = document.lastModified;
document.getElementById("lastModif").textContent = lastModified;
const currentYear = document.currentYear;
document.getElementById("currentyear").textContent = currentYear;

document.getElementById('ham-btn').addEventListener('click', () => {
    document.getElementById('nav-bar').classList.toggle('open');
});
