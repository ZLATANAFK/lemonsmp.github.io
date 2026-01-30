/* ======================================================
   LEMON SMP PLATFORM – FORUM JS
   Fake forum system (client-side)
   - Thread rendering
   - Categories
   - Dynamic UI
   - LocalStorage persistence
   ====================================================== */

/* ===================== FORUM DATA ===================== */
const ForumData = {
  categories: [
    {
      id: "announcements",
      title: "Anunțuri Oficiale",
      threads: [
        {
          title: "Deschiderea oficială Lemon SMP 🍋",
          author: "Mant0ni0",
          content:
            "Serverul Lemon SMP este oficial DESCHIS! Distracție plăcută tuturor!",
          date: "2026-01-10"
        }
      ]
    },
    {
      id: "general",
      title: "Discuții Generale",
      threads: [
        {
          title: "Sugestii pentru server",
          author: "qxerror",
          content:
            "Dacă aveți idei pentru îmbunătățirea serverului, postați aici.",
          date: "2026-01-12"
        }
      ]
    }
  ]
};

/* ===================== INIT ===================== */
document.addEventListener("DOMContentLoaded", () => {
  renderForum();
});

/* ===================== RENDER FORUM ===================== */
function renderForum() {
  const container = document.getElementById("forum-container");
  if (!container) return;

  container.innerHTML = "";

  ForumData.categories.forEach(category => {
    const catEl = document.createElement("div");
    catEl.className = "forum-category";

    const title = document.createElement("h3");
    title.textContent = category.title;

    catEl.appendChild(title);

    category.threads.forEach(thread => {
      const threadEl = document.createElement("div");
      threadEl.className = "forum-thread";

      threadEl.innerHTML = `
        <h4>${thread.title}</h4>
        <p class="forum-meta">de <b>${thread.author}</b> • ${thread.date}</p>
        <p>${thread.content}</p>
      `;

      catEl.appendChild(threadEl);
    });

    container.appendChild(catEl);
  });
}

/* ===================== STORAGE (OPTIONAL EXTEND) ===================== */
function saveForum() {
  localStorage.setItem("lemonsmp_forum", JSON.stringify(ForumData));
}

function loadForum() {
  const saved = localStorage.getItem("lemonsmp_forum");
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      Object.assign(ForumData, parsed);
    } catch (e) {
      console.warn("Forum data corrupted.");
    }
  }
}

/* ===================== DEV LOG ===================== */
console.log("💬 Forum system loaded");
