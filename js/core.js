/* ======================================================
   LEMON SMP PLATFORM – CORE JS
   Handles:
   - Intro screen
   - SPA navigation
   - Applications logic
   - LocalStorage
   - Stats updates
   ====================================================== */

/* ===================== GLOBAL STATE ===================== */
const AppState = {
  currentPage: "home",
  requests: {
    unban: [],
    staff: [],
    media: []
  },
  stats: {
    players: 42,
    uptime: "99.9%",
    totalRequests: 0
  }
};

/* ===================== INTRO SCREEN ===================== */
window.addEventListener("load", () => {
  const intro = document.getElementById("intro-screen");

  setTimeout(() => {
    if (intro) {
      intro.style.display = "none";
    }
  }, 2800);

  loadFromStorage();
  updateStatsUI();
  bindNavigation();
  bindForms();
});

/* ===================== NAVIGATION (SPA) ===================== */
function bindNavigation() {
  const navItems = document.querySelectorAll(".nav-links li");

  navItems.forEach(item => {
    item.addEventListener("click", () => {
      const target = item.dataset.page;
      if (target) {
        navigateTo(target);
      }
    });
  });
}

function navigateTo(pageId) {
  if (pageId === AppState.currentPage) return;

  document.querySelectorAll(".page").forEach(page => {
    page.classList.remove("active");
  });

  const targetPage = document.getElementById(pageId);
  if (targetPage) {
    targetPage.classList.add("active");
    AppState.currentPage = pageId;
  }

  document.querySelectorAll(".nav-links li").forEach(li => {
    li.classList.remove("active");
    if (li.dataset.page === pageId) {
      li.classList.add("active");
    }
  });
}

/* ===================== FORMS ===================== */
function bindForms() {
  const unbanForm = document.getElementById("unban-form");
  const staffForm = document.getElementById("staff-form");
  const mediaForm = document.getElementById("media-form");

  if (unbanForm) {
    unbanForm.addEventListener("submit", e => {
      e.preventDefault();
      handleFormSubmit("unban", unbanForm);
    });
  }

  if (staffForm) {
    staffForm.addEventListener("submit", e => {
      e.preventDefault();
      handleFormSubmit("staff", staffForm);
    });
  }

  if (mediaForm) {
    mediaForm.addEventListener("submit", e => {
      e.preventDefault();
      handleFormSubmit("media", mediaForm);
    });
  }
}

function handleFormSubmit(type, form) {
  const data = {};
  const inputs = form.querySelectorAll("input, textarea");

  inputs.forEach(input => {
    data[input.placeholder] = input.value;
  });

  data.date = new Date().toISOString();

  AppState.requests[type].push(data);
  AppState.stats.totalRequests++;

  saveToStorage();
  updateStatsUI();

  form.reset();
  alert(`Cererea ${type.toUpperCase()} a fost trimisă cu succes!`);
}

/* ===================== STORAGE ===================== */
function saveToStorage() {
  localStorage.setItem("lemonsmp_state", JSON.stringify(AppState));
}

function loadFromStorage() {
  const saved = localStorage.getItem("lemonsmp_state");
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      Object.assign(AppState, parsed);
    } catch (e) {
      console.warn("LocalStorage corrupted, resetting.");
    }
  }
}

/* ===================== STATS ===================== */
function updateStatsUI() {
  const playersEl = document.getElementById("players");
  const requestsEl = document.getElementById("requests");

  if (playersEl) {
    playersEl.innerText = AppState.stats.players;
  }

  if (requestsEl) {
    requestsEl.innerText = AppState.stats.totalRequests;
  }
}

/* ===================== FAKE LIVE PLAYER COUNT ===================== */
setInterval(() => {
  const delta = Math.floor(Math.random() * 3) - 1;
  AppState.stats.players = Math.max(10, AppState.stats.players + delta);
  updateStatsUI();
}, 4000);

/* ===================== DEBUG (DEV TOOL) ===================== */
console.log("🍋 Lemon SMP Platform initialized");
