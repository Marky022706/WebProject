// 🎉 EventEase - Clean & Simplified JS Version
// By your langga 💙

// ----- Select Elements -----
const monthSelect = document.getElementById('monthSelect');
const daySelect = document.getElementById('daySelect');
const searchBtn = document.getElementById('searchBtn');
const eventsGrid = document.getElementById('eventsGrid');
const logoutBtn = document.getElementById('logoutBtn');
const logoutModal = document.getElementById('logoutModal');
const confirmLogout = document.getElementById('confirmLogout');
const cancelLogout = document.getElementById('cancelLogout');
const logoutSuccessModal = document.getElementById('logoutSuccessModal');
const okLogout = document.getElementById('okLogout');

// ----- Events Database with Emojis -----
const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const events = {
  "0-1": { name: "🎆 New Year Celebration", details: "Welcome the year with fireworks, food, and fun! 🎇" },
  "1-14": { name: "💖 Valentine’s Day", details: "Celebrate love and friendship with chocolates and smiles!" },
  "2-17": { name: "🍀 St. Patrick’s Day", details: "Wear green and join the parade with joy and cheer!" },
  "3-22": { name: "🌍 Earth Day", details: "Let’s care for our planet—tree planting & clean-up drives!" },
  "4-12": { name: "👩‍👧 Mother’s Day", details: "A special day to honor and love our moms dearly! 💐" },
  "5-16": { name: "👨‍👧 Father’s Day", details: "Time to appreciate our awesome dads! 🛠️❤️" },
  "6-15": { name: "🎤 Summer Concert", details: "Join us for a night of music, lights, and laughter!" },
  "7-20": { name: "🤝 Friendship Day", details: "Celebrate your besties and share happy moments together!" },
  "8-31": { name: "🎃 Halloween Party", details: "Dress up, join the games, and enjoy spooky treats!" },
  "11-25": { name: "🎄 Christmas Celebration", details: "Holiday spirit with gifts, songs, and smiles everywhere!" }
};

// ----- Populate Days -----
function populateDays(month, year = 2025) {
  const days = new Date(year, month + 1, 0).getDate();
  daySelect.innerHTML = "";
  for (let i = 1; i <= days; i++) {
    const opt = document.createElement("option");
    opt.value = i;
    opt.textContent = i < 10 ? `0${i}` : i;
    daySelect.appendChild(opt);
  }
}

// ----- Display Events -----
function displayEvents() {
  const month = parseInt(monthSelect.value);
  const monthEvents = Object.entries(events)
    .filter(([key]) => parseInt(key.split("-")[0]) === month)
    .map(([key, val]) => {
      const day = parseInt(key.split("-")[1]);
      return { month, day, ...val };
    });

  eventsGrid.innerHTML = "";

  if (monthEvents.length === 0) {
    eventsGrid.innerHTML = `<p class="no-event">😔 No events for ${monthNames[month]}</p>`;
  } else {
    monthEvents.forEach(event => {
      const card = `
        <div class="event-card">
          <div class="date-display">
            <div class="month">${monthNames[event.month]}</div>
            <div class="day">${event.day.toString().padStart(2, "0")}</div>
          </div>
          <div class="event-info">
            <h3>${event.name}</h3>
            <p>${event.details}</p>
          </div>
        </div>`;
      eventsGrid.innerHTML += card;
    });
  }

  animateCards();
}

// ----- Animate Cards -----
function animateCards() {
  document.querySelectorAll('.event-card').forEach((card, i) => {
    card.style.opacity = 0;
    setTimeout(() => {
      card.style.transition = "0.4s ease";
      card.style.opacity = 1;
      card.style.transform = "translateY(0)";
    }, i * 100);
  });
}

// ----- Logout Modal -----
logoutBtn.addEventListener('click', () => logoutModal.style.display = 'flex');
cancelLogout.addEventListener('click', () => logoutModal.style.display = 'none');

confirmLogout.addEventListener('click', () => {
  logoutModal.style.display = 'none';
  logoutSuccessModal.style.display = 'flex';
});

okLogout.addEventListener('click', () => {
  logoutSuccessModal.style.display = 'none';
  window.location.href = "index.html";
});

// ----- Active Nav Animation -----
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    document.querySelectorAll(".nav-links a").forEach(l => l.classList.remove("active"));
    link.classList.add("active");
  });
});

// ----- Search Button -----
searchBtn.addEventListener("click", displayEvents);

// ----- Initialize -----
populateDays(7);
displayEvents();
