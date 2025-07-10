const navButton = document.querySelector('#ham-btn');
const navLinks = document.querySelector('#nav-bar');
const lastModified = document.lastModified;
document.getElementById("lastModif").textContent = lastModified;
const currentYear = document.currentYear;
document.getElementById("currentyear").textContent = currentYear;

navButton.addEventListener('click', () => {
    navButton.classList.toggle('show');
    navLinks.classList.toggle('show');

});
