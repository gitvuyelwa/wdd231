const navButton = document.querySelector('#ham-btn');
const navLinks = document.querySelector('#nav-bar');
const lastModified = document.lastModified;
document.getElementById("lastModif").textContent = lastModified;


navButton.addEventListener('click', () => {
    navButton.classList.toggle('show');
    navLinks.classList.toggle('show');

});

//index buttons
function toggleContent(id) {
  const content = document.getElementById(id);
  const allContents = document.querySelectorAll('.content');

  allContents.forEach(section => {
    section.style.display = section.id === id && section.style.display !== 'block'
      ? 'block'
      : 'none';
  });
}
//Progress bar
function updateProgress(fromUser = false) {
  const startDateInput = document.getElementById('startDate');
  const countdownText = document.getElementById('countdownText');
  const progressBar = document.getElementById('progressBar');

  let startDateValue = startDateInput.value;

  // If the user just changed it, save it to localStorage
  if (fromUser && startDateValue) {
    localStorage.setItem('75hardStartDate', startDateValue);
  } else if (!startDateValue) {
    // If the input is empty, try to load from localStorage
    const savedDate = localStorage.getItem('75hardStartDate');
    if (savedDate) {
      startDateValue = savedDate;
      startDateInput.value = savedDate;
    }
  }

  if (!startDateValue) {
    countdownText.innerText = '';
    progressBar.style.width = '0%';
    return;
  }

  const startDate = new Date(startDateValue);
  const today = new Date();
  const diffTime = today - startDate;
  const daysPassed = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;

  if (daysPassed < 1) {
    countdownText.innerText = `You haven't started yet.`;
    progressBar.style.width = '0%';
    return;
  }

  if (daysPassed > 75) {
    countdownText.innerText = `🎉 Challenge Completed!`;
    progressBar.style.width = '100%';
    return;
  }

  const daysLeft = 75 - daysPassed;
  const progress = (daysPassed / 75) * 100;

  countdownText.innerText = `Day ${daysPassed} of 75 (${daysLeft} days left)`;
  progressBar.style.width = `${progress}%`;
}

// Load progress when the page loads
window.onload = function () {
  updateProgress();
};
//reset button
function resetChallenge() {
  localStorage.removeItem('75hardStartDate');
  document.getElementById('startDate').value = '';
  document.getElementById('countdownText').innerText = '';
  document.getElementById('progressBar').style.width = '0%';
}
//Workout Plan
const workouts = {
  Monday: "45-minute outdoor run + core strengthening",
  Tuesday: "45-minute gym session: weight training (upper body)",
  Wednesday: "45-minute outdoor walk + yoga/stretching",
  Thursday: "45-minute gym session: weight training (lower body)",
  Friday: "45-minute outdoor cycling + full body mobility exercises",
  Saturday:"45-minute jog + HIIT",
  Sunday: "REST DAY"
};

function showWorkout(day) {
  const workoutDisplay = document.getElementById('workoutDisplay');
  workoutDisplay.innerHTML = `<strong>${day} Workout:</strong> <br> ${workouts[day]}`;
   const buttons = document.querySelectorAll('.weekday-btn');
  buttons.forEach(btn => {
    btn.classList.toggle('active', btn.textContent === day);
  });
}
// ==== DOM Loaded Event ====
window.addEventListener('DOMContentLoaded', () => {
  // Load progress on page load
  updateProgress();

  // Add event listener to startDate input
  const startDateInput = document.getElementById('startDate');
  if (startDateInput) {
    startDateInput.addEventListener('change', () => updateProgress(true));
  }

  // Add event listener to reset button
  const resetBtn = document.querySelector('.reset-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', resetChallenge);
  }

  // Add event listeners to weekday buttons
  const weekdayButtons = document.querySelectorAll('.weekday-btn');
  weekdayButtons.forEach(button => {
    const day = button.textContent;
    button.addEventListener('click', () => showWorkout(day));
  });
});